---
doc_id: backend-server-architecture
title: "Backend Server Architecture"
description: "Architecture documentation for the Node.js/Express backend server that spawns Claude CLI processes"
keywords: [backend, server, express, architecture, spawn, claude-cli, markdown]
relevance: "Use this document to understand the backend server architecture, why CLI execution moved to the server, and how the request/response flow works."
created: 2025-10-17
updated: 2025-10-17
---

# Backend Server Architecture

## Introduction

The Travel Itinerary Generator uses a dual-server architecture with a clear separation between frontend and backend responsibilities. This document explains the backend server architecture, including why CLI execution moved from the browser to the server, how the Express server is structured, and the complete request/response flow.

### Migration Context

**Previous Architecture (POC)**: The application attempted to execute Claude CLI commands directly from the browser using `execAsync`. This approach was fundamentally incompatible with how browsers and child processes work - browsers cannot spawn local CLI processes for security reasons.

**Current Architecture (Production-Ready)**: A Node.js/Express backend server handles all Claude CLI execution using `child_process.spawn` with proper stdin handling. The frontend makes HTTP requests to the backend, which spawns Claude CLI processes and returns markdown responses.

**Why This Migration Was Necessary**:
1. **Browser Limitations**: Browsers cannot execute local system commands or spawn child processes
2. **Security Model**: Running CLI tools requires access to the local filesystem and system binaries
3. **Process Management**: Proper spawn usage with stdin handling requires server-side Node.js runtime
4. **Architectural Clarity**: Clear separation of concerns between UI (frontend) and data generation (backend)

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     User's Browser                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │          Frontend (React + Vite)                      │  │
│  │          Port: 5273                                   │  │
│  │  - ItineraryForm: Captures user input                │  │
│  │  - HTTPApiClient: Makes fetch() requests             │  │
│  │  - ItineraryDisplay: Renders markdown                │  │
│  └────────────────────┬──────────────────────────────────┘  │
└─────────────────────────┼──────────────────────────────────┘
                          │ HTTP POST /api/itinerary
                          │ { destination, partyInfo, month, days }
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              Backend Server (Node.js + Express)             │
│              Port: 3001                                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  API Routes (/api/itinerary)                          │  │
│  │  - Request validation                                 │  │
│  │  - Calls claudeCliService                             │  │
│  │  - Returns { markdown: string }                       │  │
│  └────────────────────┬──────────────────────────────────┘  │
│                       │                                     │
│  ┌────────────────────▼──────────────────────────────────┐  │
│  │  claudeCliService                                     │  │
│  │  - Builds prompt from parameters                      │  │
│  │  - spawn('claude', ['-p', prompt])                    │  │
│  │  - childProcess.stdin.end() IMMEDIATELY               │  │
│  │  - Collects stdout chunks                             │  │
│  │  - Returns markdown string                            │  │
│  └────────────────────┬──────────────────────────────────┘  │
└─────────────────────────┼──────────────────────────────────┘
                          │ spawn command
                          ▼
                  ┌──────────────────┐
                  │   Claude CLI     │
                  │   (External)     │
                  │   - Generates    │
                  │   - Returns MD   │
                  └──────────────────┘
```

## Backend Server Components

### 1. Express Server Entry Point (`server/index.js`)

The main server file initializes the Express application and configures middleware.

**Responsibilities**:
- Initialize Express app
- Configure CORS middleware to allow frontend origin (port 5273)
- Mount API routes
- Set up global error handling middleware
- Start HTTP server on port 3001
- Log all requests for debugging

**Key Configuration**:
```javascript
const express = require('express');
const cors = require('cors');
const itineraryRoutes = require('./routes/itinerary');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:5273', // Frontend dev server
  credentials: true
}));

// Parse JSON request bodies
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Mount routes
app.use('/api/itinerary', itineraryRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
```

**Design Decisions**:
- **Port 3001**: Chosen to avoid conflicts with common development ports (3000, 5173, 5273)
- **CORS Configuration**: Explicitly allows frontend origin with credentials
- **JSON Middleware**: Parses request bodies automatically
- **Logging**: All requests logged for debugging and monitoring
- **Error Handler**: Catches unhandled errors and returns consistent error responses

### 2. API Routes (`server/routes/itinerary.js`)

Defines the HTTP endpoints for itinerary operations.

**Endpoints**:
- `POST /api/itinerary`: Generate a new itinerary

**Request Validation**:
- Validates required fields: `destination`, `partyInfo`, `month`, `days`
- Validates `days` is a positive number
- Returns HTTP 400 for validation failures

**Response Format**:
```javascript
{
  "markdown": "# Tokyo Itinerary\n\n## Day 1\n\n..."
}
```

**Example Implementation**:
```javascript
const express = require('express');
const router = express.Router();
const claudeCliService = require('../services/claudeCliService');

router.post('/', async (req, res) => {
  try {
    const { destination, partyInfo, month, days } = req.body;

    // Validate request
    if (!destination || !partyInfo || !month || !days) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (typeof days !== 'number' || days <= 0) {
      return res.status(400).json({ error: 'days must be a positive number' });
    }

    // Generate itinerary
    const markdown = await claudeCliService.generateItinerary(
      destination,
      partyInfo,
      month,
      days
    );

    res.json({ markdown });
  } catch (error) {
    console.error('Error generating itinerary:', error);
    res.status(500).json({ error: 'Failed to generate itinerary', message: error.message });
  }
});

module.exports = router;
```

### 3. Claude CLI Service (`server/services/claudeCliService.js`)

Encapsulates all Claude CLI spawn logic with proper process management.

**Critical Implementation Details**:
1. **Use spawn, NOT exec**: `child_process.spawn` must be used instead of `exec` or `execAsync`
2. **Immediately end stdin**: `childProcess.stdin.end()` MUST be called right after spawn
3. **Collect stdout chunks**: Concatenate data events to build complete markdown
4. **60-second timeout**: Kill process if it runs longer than 60 seconds
5. **Error handling**: Handle spawn errors, timeouts, and non-zero exit codes

**Why These Details Matter**:
- **spawn vs exec**: `spawn` provides stream-based I/O which Claude CLI requires
- **stdin.end()**: Claude CLI will hang indefinitely if stdin is not closed
- **Chunk collection**: stdout emits data in chunks; must be concatenated
- **Timeout**: Prevents hung processes from consuming resources
- **Exit code**: Non-zero exit codes indicate CLI errors

**Example Service Implementation**:
```javascript
const { spawn } = require('child_process');

function buildPrompt(destination, partyInfo, month, days) {
  return `Generate a detailed ${days}-day travel itinerary for ${destination} for ${partyInfo} traveling in ${month}.

Format the itinerary as markdown with the following structure:
- Use ## headings for each day (e.g., ## Day 1)
- Use ### headings for time periods (e.g., ### Morning, ### Afternoon)
- Use bullet points for activities
- Include specific attraction names, descriptions, and dining recommendations
- Be detailed and specific to the destination

Return ONLY the markdown content, no code fences or JSON.`;
}

function generateItinerary(destination, partyInfo, month, days) {
  return new Promise((resolve, reject) => {
    const prompt = buildPrompt(destination, partyInfo, month, days);

    // Spawn Claude CLI process
    const childProcess = spawn('claude', ['-p', prompt]);

    // CRITICAL: End stdin immediately (Claude CLI requirement)
    childProcess.stdin.end();

    let stdout = '';
    let stderr = '';

    // Collect stdout chunks
    childProcess.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    // Collect stderr for error reporting
    childProcess.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    // Handle process exit
    childProcess.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Claude CLI exited with code ${code}: ${stderr}`));
      } else if (!stdout.trim()) {
        reject(new Error('Claude CLI returned empty response'));
      } else {
        resolve(stdout.trim());
      }
    });

    // Handle spawn errors
    childProcess.on('error', (error) => {
      reject(new Error(`Failed to spawn Claude CLI: ${error.message}`));
    });

    // 60-second timeout
    setTimeout(() => {
      childProcess.kill();
      reject(new Error('Claude CLI execution timed out after 60 seconds'));
    }, 60000);
  });
}

module.exports = { generateItinerary };
```

## Request/Response Flow

### Complete Flow Diagram

```
1. User fills out form and clicks "Generate Itinerary"
   ↓
2. ItineraryForm calls service.generateItinerary(...)
   ↓
3. HTTPApiClient makes POST request to http://localhost:3001/api/itinerary
   - Vite proxy forwards /api/itinerary to localhost:3001
   - Request body: { destination, partyInfo, month, days }
   ↓
4. Express server receives request at POST /api/itinerary route
   ↓
5. Route handler validates request parameters
   - If invalid: Return HTTP 400 with error message
   - If valid: Continue to step 6
   ↓
6. Route handler calls claudeCliService.generateItinerary(...)
   ↓
7. claudeCliService builds prompt string from parameters
   ↓
8. Service spawns Claude CLI: spawn('claude', ['-p', prompt])
   ↓
9. Service immediately calls childProcess.stdin.end()
   ↓
10. Claude CLI executes and generates markdown itinerary
   ↓
11. Service collects stdout chunks via data events
   ↓
12. Claude CLI exits with code 0 (success)
   ↓
13. Service resolves Promise with complete markdown string
   ↓
14. Route handler wraps markdown in response: { markdown: "..." }
   ↓
15. Express sends HTTP 200 response with JSON body
   ↓
16. HTTPApiClient receives response and extracts data.markdown
   ↓
17. HTTPApiClient returns markdown string to ItineraryForm
   ↓
18. ItineraryForm updates state: setItinerary(markdown)
   ↓
19. React re-renders ItineraryDisplay with markdown prop
   ↓
20. ReactMarkdown component renders markdown as HTML
   ↓
21. User sees formatted itinerary in browser
```

### Timing Characteristics

- **Typical Request Duration**: 10-30 seconds (depends on Claude CLI response time)
- **Timeout Limit**: 60 seconds
- **Frontend Loading State**: Shows "Generating itinerary..." during request
- **Backend Logging**: Logs request start, CLI execution duration, and completion

## Error Handling Strategy

### Backend Error Types

1. **Validation Errors (HTTP 400)**:
   - Missing required fields
   - Invalid data types (days not a number)
   - Out of range values (days <= 0)

2. **Spawn Errors (HTTP 500)**:
   - Claude CLI not found in PATH
   - Permission denied to execute CLI
   - System resource limitations

3. **Timeout Errors (HTTP 500)**:
   - CLI execution exceeds 60 seconds
   - Process killed to prevent resource exhaustion

4. **CLI Errors (HTTP 500)**:
   - Non-zero exit code from Claude CLI
   - Empty response from CLI
   - Malformed output

### Error Response Format

All errors return JSON with consistent structure:
```javascript
{
  "error": "Brief error category",
  "message": "Detailed error message for debugging"
}
```

### Frontend Error Handling

- HTTPApiClient checks `response.ok` before parsing JSON
- Displays user-friendly error messages in ItineraryForm
- Logs detailed error information to console for debugging

## Development vs Production Configuration

### Development Environment

- **Frontend**: `http://localhost:5273` (Vite dev server)
- **Backend**: `http://localhost:3001` (Express server)
- **Proxy**: Vite proxies `/api` requests to backend
- **CORS**: Configured to allow `localhost:5273` origin
- **Logging**: Verbose logging to console
- **Error Handling**: Detailed error messages for debugging

### Production Environment

- **Frontend**: Static files served by web server or CDN
- **Backend**: Express server behind load balancer
- **CORS**: Configured to allow production frontend domain
- **Logging**: Structured logging to file or monitoring service
- **Error Handling**: Generic error messages to users, detailed logs server-side

### Environment Variables

**Backend**:
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment mode ('development' or 'production')

**Frontend**:
- `VITE_BACKEND_URL`: Backend API URL (empty in development for relative URLs)

## Troubleshooting Guide

### Common Issues and Solutions

**Issue**: "claude: command not found" error when generating itinerary
- **Root Cause**: Claude CLI is not installed or not in system PATH
- **Solution**:
  1. Verify installation: `claude --version` in terminal
  2. If not installed, follow Claude CLI installation guide
  3. Add Claude CLI binary directory to system PATH
  4. Restart backend server after PATH changes

**Issue**: Itinerary generation times out after 60 seconds
- **Root Cause**: CLI command execution exceeds timeout limit
- **Investigation**:
  1. Check network connectivity (Claude CLI may require internet)
  2. Try simpler prompt with fewer days to test if complexity is the issue
  3. Check backend server terminal logs for CLI execution duration
  4. Monitor system resource usage (CPU, memory) during execution
- **Solution**:
  - Reduce trip duration in form (try 2-3 days instead of 7+)
  - Increase timeout in `claudeCliService.js` if consistently timing out
  - Check Claude CLI documentation for performance tuning

**Issue**: Backend server returns errors or malformed responses
- **Root Cause**: CLI returned unexpected output or backend failed to process it
- **Debugging Steps**:
  1. Check backend server terminal logs for error messages
  2. Look for spawn errors, timeout messages, or stderr output from Claude CLI
  3. Verify Claude CLI is authenticated correctly
  4. Test Claude CLI directly: `claude -p "Generate a simple markdown itinerary"`
  5. Check backend logs for raw output to see what CLI actually returned
- **Solution**: Review logs for specific error, verify CLI credentials, ensure stdin.end() is being called

**Issue**: CORS errors in browser console
- **Root Cause**: Backend server not allowing frontend origin
- **Solution**:
  1. Verify backend server is running on port 3001
  2. Check CORS configuration in `server/index.js`
  3. Ensure origin is set to `http://localhost:5273`
  4. Restart backend server after CORS configuration changes

## Related Documentation

- **[Claude CLI Integration](./claude-cli-integration.md)**: Technical details of spawn usage and prompt engineering
- **[Getting Started Guide](../getting-started.md)**: Setup instructions for development environment
- **[Service Interface Documentation](../domain-model/service-interface.md)**: Frontend service layer that calls backend API
- **[System Architecture Diagrams](../system-architecture/)**: Visual representations of component interactions
