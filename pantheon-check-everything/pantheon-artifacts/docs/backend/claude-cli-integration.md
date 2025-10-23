---
doc_id: backend-claude-cli-integration
title: "Claude CLI Integration Guide"
description: "Technical guide for integrating Claude CLI with spawn, covering process lifecycle, prompt engineering, and error handling"
keywords: [claude-cli, spawn, child_process, stdin, stdout, prompt-engineering, markdown, error-handling]
relevance: "Use this document when implementing or debugging Claude CLI spawn integration, writing prompts for markdown output, or troubleshooting process management issues."
created: 2025-10-17
updated: 2025-10-17
---

# Claude CLI Integration Guide

## Overview

This document provides technical guidance for integrating Claude CLI into the backend server using Node.js `child_process.spawn`. It covers the critical details of spawn usage, why `stdin.end()` must be called immediately, how to handle stdout/stderr streams, prompt engineering for markdown output, and comprehensive error handling strategies.

## Why spawn? Why not exec?

### The Problem with exec and execAsync

Many developers instinctively reach for `child_process.exec` or `util.promisify(exec)` (execAsync) when running CLI commands in Node.js. However, these functions are **fundamentally incompatible** with Claude CLI.

**Why exec Doesn't Work**:
1. **Buffer Limitations**: `exec` buffers all output in memory. For large responses (long itineraries), this can hit buffer limits.
2. **No Stream Control**: `exec` doesn't provide access to stdin/stdout/stderr streams, preventing proper process management.
3. **Stdin Handling**: `exec` doesn't allow closing stdin, which Claude CLI requires to begin processing.
4. **Timeout Behavior**: `exec` timeout kills the process but doesn't gracefully handle partial output.

**The spawn Solution**:
- **Stream-Based**: Provides direct access to stdin, stdout, and stderr as streams
- **Memory Efficient**: Processes data as it arrives rather than buffering everything
- **Process Control**: Allows fine-grained control over process lifecycle
- **stdin Management**: Enables immediately ending stdin, which Claude CLI requires

### Technical Comparison

```javascript
// WRONG: This will NOT work with Claude CLI
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

async function generateItinerary(prompt) {
  // This approach fails because:
  // 1. stdin is not explicitly closed
  // 2. Claude CLI waits indefinitely for stdin closure
  // 3. Process hangs until timeout
  const { stdout } = await execAsync(`claude -p "${prompt}"`);
  return stdout;
}

// CORRECT: This works with Claude CLI
const { spawn } = require('child_process');

function generateItinerary(prompt) {
  return new Promise((resolve, reject) => {
    const childProcess = spawn('claude', ['-p', prompt]);

    // CRITICAL: End stdin immediately
    childProcess.stdin.end();

    let stdout = '';
    childProcess.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    childProcess.on('exit', (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });
  });
}
```

## The Critical Importance of stdin.end()

### Why stdin.end() is Required

Claude CLI reads the prompt from stdin when using the `-p` flag with spawn. After receiving the prompt string as an argument, the CLI waits for stdin to close before beginning processing. If stdin is not explicitly closed, the process will hang indefinitely.

**What Happens**:
1. `spawn('claude', ['-p', prompt])` starts the CLI process
2. Claude CLI receives the prompt argument
3. CLI checks if stdin has additional input
4. **If stdin is open**: CLI waits for more input (hangs forever)
5. **If stdin.end() is called**: CLI recognizes end of input and begins processing

### Correct Placement

```javascript
const childProcess = spawn('claude', ['-p', prompt]);

// IMMEDIATELY after spawn - this is the FIRST thing you do
childProcess.stdin.end();

// Then set up stream handlers
childProcess.stdout.on('data', (data) => {
  // ...
});
```

**Common Mistake**:
```javascript
const childProcess = spawn('claude', ['-p', prompt]);

childProcess.stdout.on('data', (data) => {
  stdout += data.toString();
});

// WRONG: stdin.end() called too late, after setting up handlers
// Process may already be hanging
childProcess.stdin.end();
```

**Best Practice**: Call `stdin.end()` on the line immediately following `spawn()`.

## Stream Handling: stdout and stderr

### Collecting stdout Data

stdout emits data in chunks. You must concatenate these chunks to build the complete response.

```javascript
let stdout = '';

childProcess.stdout.on('data', (data) => {
  stdout += data.toString();
});

// When process exits, stdout contains complete response
childProcess.on('exit', (code) => {
  if (code === 0) {
    resolve(stdout.trim()); // trim whitespace
  }
});
```

**Key Points**:
- Data arrives in chunks (not all at once)
- Use `data.toString()` to convert Buffer to string
- Concatenate chunks with `+=` operator
- Trim final result to remove leading/trailing whitespace

### Handling stderr

stderr contains error messages and warnings from Claude CLI.

```javascript
let stderr = '';

childProcess.stderr.on('data', (data) => {
  stderr += data.toString();
});

childProcess.on('exit', (code) => {
  if (code !== 0) {
    reject(new Error(`CLI error (exit code ${code}): ${stderr}`));
  }
});
```

**When stderr is Used**:
- Authentication errors
- Network connectivity issues
- Invalid prompt format
- CLI internal errors
- Warning messages (even on successful execution)

**Best Practice**: Always collect stderr for debugging, even if exit code is 0.

## Process Lifecycle and Events

### Event Flow

```
1. spawn() called
   ↓
2. 'spawn' event emitted (process started)
   ↓
3. stdin.end() called (close input stream)
   ↓
4. stdout 'data' events emitted (collect chunks)
   ↓
5. stderr 'data' events emitted (collect errors)
   ↓
6. 'close' event emitted (streams closed)
   ↓
7. 'exit' event emitted (process terminated)
   - code: 0 for success, non-zero for error
```

### Complete Event Handling Example

```javascript
function generateItinerary(prompt) {
  return new Promise((resolve, reject) => {
    const childProcess = spawn('claude', ['-p', prompt]);
    childProcess.stdin.end();

    let stdout = '';
    let stderr = '';
    let processStarted = false;

    // Track process startup
    childProcess.on('spawn', () => {
      processStarted = true;
      console.log('Claude CLI process started');
    });

    // Collect stdout chunks
    childProcess.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    // Collect stderr for error reporting
    childProcess.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    // Handle successful exit
    childProcess.on('exit', (code, signal) => {
      console.log(`Process exited with code ${code}, signal ${signal}`);

      if (code === 0) {
        if (!stdout.trim()) {
          reject(new Error('Claude CLI returned empty response'));
        } else {
          resolve(stdout.trim());
        }
      } else {
        reject(new Error(`CLI exited with code ${code}: ${stderr || 'Unknown error'}`));
      }
    });

    // Handle spawn errors (e.g., command not found)
    childProcess.on('error', (error) => {
      if (!processStarted) {
        reject(new Error(`Failed to spawn Claude CLI: ${error.message}. Is Claude CLI installed and in PATH?`));
      } else {
        reject(new Error(`Process error: ${error.message}`));
      }
    });

    // Timeout after 60 seconds
    const timeout = setTimeout(() => {
      console.log('Process timeout - killing child process');
      childProcess.kill('SIGTERM');
      reject(new Error('Claude CLI execution timed out after 60 seconds'));
    }, 60000);

    // Clear timeout on exit
    childProcess.on('exit', () => {
      clearTimeout(timeout);
    });
  });
}
```

## Prompt Engineering for Markdown Output

### Design Goals

The prompt must instruct Claude to:
1. Generate markdown-formatted text (not JSON)
2. Follow a consistent heading structure
3. Include specific details (attraction names, activities, dining)
4. Return only markdown content (no code fences or wrappers)

### Effective Prompt Template

```javascript
function buildPrompt(destination, partyInfo, month, days) {
  return `Generate a detailed ${days}-day travel itinerary for ${destination} for ${partyInfo} traveling in ${month}.

Format the itinerary as markdown with the following structure:
- Use ## headings for each day (e.g., ## Day 1, ## Day 2)
- Use ### headings for time periods (e.g., ### Morning, ### Afternoon, ### Evening)
- Use bullet points (-) for activities and details
- Include specific attraction names, descriptions, and dining recommendations
- Be detailed and specific to the destination and travel party
- Consider the month/season when making recommendations

Structure each day's time periods as follows:
### Morning
- Main attraction with description
- Activities to do at this location
- Dining recommendation for breakfast/brunch

### Afternoon
- Main attraction with description
- Activities to do at this location
- Dining recommendation for lunch

### Evening
- Main attraction with description
- Activities to do at this location
- Dining recommendation for dinner

Return ONLY the markdown content. Do NOT wrap it in code fences (\`\`\`markdown) or JSON. Start directly with the day headings.

Generate the itinerary now.`;
}
```

### Prompt Engineering Best Practices

1. **Be Explicit About Format**: Clearly state "markdown" and "no code fences"
2. **Provide Structure Examples**: Show heading levels and bullet point usage
3. **Specify Content Requirements**: "Include specific attraction names", not just "include attractions"
4. **Contextual Instructions**: Mention month/season so Claude considers weather, events, etc.
5. **Clear Boundaries**: "Return ONLY markdown" prevents JSON wrapping or extra commentary
6. **Imperative Ending**: "Generate the itinerary now" signals the end of instructions

### Common Prompt Issues

**Problem**: Claude returns markdown wrapped in code fences
```markdown
```markdown
## Day 1
...
```
```
**Solution**: Add explicit instruction "Do NOT wrap in code fences. Start directly with day headings."

**Problem**: Claude returns JSON instead of markdown
```json
{ "itinerary": "..." }
```
**Solution**: Remove any mention of JSON in prompt. Emphasize markdown format repeatedly.

**Problem**: Generic, non-specific attractions
```markdown
### Morning
- Visit popular attraction
- Have breakfast
```
**Solution**: Prompt instructions: "Include SPECIFIC attraction names (e.g., 'Tokyo Tower', 'Senso-ji Temple')"

## Error Handling Patterns

### Error Categories and Handling

```javascript
function generateItinerary(prompt) {
  return new Promise((resolve, reject) => {
    const childProcess = spawn('claude', ['-p', prompt]);
    childProcess.stdin.end();

    let stdout = '';
    let stderr = '';

    childProcess.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    childProcess.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    childProcess.on('exit', (code) => {
      if (code === 0) {
        // Success case - validate response
        const trimmed = stdout.trim();

        if (!trimmed) {
          return reject(new Error('EMPTY_RESPONSE: Claude CLI returned empty output'));
        }

        if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
          console.warn('Warning: Response looks like JSON, expected markdown');
        }

        resolve(trimmed);
      } else {
        // Non-zero exit code
        const errorMessage = stderr || 'Unknown CLI error';

        if (errorMessage.includes('authentication') || errorMessage.includes('API key')) {
          reject(new Error(`AUTH_ERROR: ${errorMessage}`));
        } else if (errorMessage.includes('network') || errorMessage.includes('connection')) {
          reject(new Error(`NETWORK_ERROR: ${errorMessage}`));
        } else if (errorMessage.includes('rate limit')) {
          reject(new Error(`RATE_LIMIT_ERROR: ${errorMessage}`));
        } else {
          reject(new Error(`CLI_ERROR (exit ${code}): ${errorMessage}`));
        }
      }
    });

    childProcess.on('error', (error) => {
      // Spawn error - CLI not found or permission denied
      if (error.code === 'ENOENT') {
        reject(new Error('COMMAND_NOT_FOUND: Claude CLI is not installed or not in PATH'));
      } else if (error.code === 'EACCES') {
        reject(new Error('PERMISSION_DENIED: Cannot execute Claude CLI (check permissions)'));
      } else {
        reject(new Error(`SPAWN_ERROR: ${error.message}`));
      }
    });

    // Timeout handling
    const timeout = setTimeout(() => {
      childProcess.kill('SIGTERM');

      // Give process 5 seconds to gracefully terminate
      setTimeout(() => {
        if (!childProcess.killed) {
          childProcess.kill('SIGKILL'); // Force kill
        }
      }, 5000);

      reject(new Error('TIMEOUT_ERROR: Process exceeded 60 second limit'));
    }, 60000);

    childProcess.on('exit', () => {
      clearTimeout(timeout);
    });
  });
}
```

### Error Categorization

| Error Type | Prefix | Retryable | User Action Required |
|------------|--------|-----------|----------------------|
| `EMPTY_RESPONSE` | N/A | Yes (may be transient) | None - retry automatically |
| `AUTH_ERROR` | Authentication | No | User must configure Claude CLI credentials |
| `NETWORK_ERROR` | Network | Yes | Check internet connection |
| `RATE_LIMIT_ERROR` | Rate limit | Yes (with backoff) | Wait and retry |
| `CLI_ERROR` | General | Maybe | Check error message details |
| `COMMAND_NOT_FOUND` | ENOENT | No | Install Claude CLI |
| `PERMISSION_DENIED` | EACCES | No | Fix file permissions |
| `SPAWN_ERROR` | General | No | System-level issue |
| `TIMEOUT_ERROR` | Timeout | Yes | Reduce complexity or increase timeout |

### Logging Strategy

```javascript
// At service level
console.log('[Claude CLI] Generating itinerary:', { destination, days, partyInfo, month });
console.log('[Claude CLI] Prompt length:', prompt.length, 'characters');

// During execution
childProcess.on('spawn', () => {
  console.log('[Claude CLI] Process spawned successfully');
});

const startTime = Date.now();
childProcess.on('exit', (code) => {
  const duration = Date.now() - startTime;
  console.log(`[Claude CLI] Process exited with code ${code} after ${duration}ms`);
});

// On success
console.log('[Claude CLI] Response length:', stdout.length, 'characters');

// On error
console.error('[Claude CLI] Error:', error.message);
console.error('[Claude CLI] stderr:', stderr);
```

## Testing and Debugging

### Manual CLI Testing

Test Claude CLI directly to isolate issues:

```bash
# Test basic execution
claude -p "Generate a simple markdown itinerary"

# Test with exact prompt from code
claude -p "Generate a detailed 2-day travel itinerary for Tokyo for a couple traveling in March.

Format the itinerary as markdown with the following structure:
..."

# Check exit code
echo $?  # 0 = success, non-zero = error
```

### Debugging Checklist

1. **Verify Installation**:
   ```bash
   which claude  # Should show path to CLI binary
   claude --version  # Should show version number
   ```

2. **Check PATH Configuration**:
   ```bash
   echo $PATH  # Verify Claude CLI directory is included
   ```

3. **Test Authentication**:
   ```bash
   claude -p "Hello"  # Should return response without auth errors
   ```

4. **Monitor Process Execution**:
   - Add detailed logging to spawn handler
   - Log stdin.end() call
   - Log each stdout chunk
   - Log final concatenated output

5. **Check for Hanging Processes**:
   ```bash
   ps aux | grep claude  # Look for orphaned CLI processes
   ```

6. **Validate Prompt Format**:
   - Copy exact prompt from logs
   - Test manually with `claude -p "..."`
   - Check for special characters or quotes causing issues

### Common Debugging Scenarios

**Scenario**: Process hangs and never completes
- **Check**: Is `stdin.end()` being called?
- **Check**: Are event handlers registered before stdin.end()?
- **Action**: Add logging to confirm stdin.end() executes

**Scenario**: Empty stdout but exit code 0
- **Check**: Is Claude CLI outputting to stderr instead?
- **Check**: Is response being buffered differently?
- **Action**: Log stderr contents, check for unexpected behavior

**Scenario**: Random timeouts
- **Check**: System resource usage during execution
- **Check**: Network latency to Claude API
- **Action**: Increase timeout, reduce prompt complexity

## Related Documentation

- **[Backend Server Architecture](./server-architecture.md)**: Overall backend architecture and request flow
- **[Getting Started Guide](../getting-started.md)**: Development environment setup including Claude CLI installation
- **[Service Interface Documentation](../domain-model/service-interface.md)**: Frontend service contract
