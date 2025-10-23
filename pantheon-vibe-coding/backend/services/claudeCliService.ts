/**
 * ClaudeCliService executes Claude CLI commands server-side.
 * Handles command construction, execution, timeout, and error handling.
 */

import { spawn } from 'child_process';
import { PromptBuilder } from '../utils/promptBuilder.js';
import { ItineraryRequest } from '../types/types.js';

export class ClaudeCliService {
  /**
   * Executes Claude CLI command with the given itinerary request.
   * Constructs prompt, spawns process, and returns plain text markdown response.
   *
   * @param request - User's itinerary request parameters
   * @returns Promise resolving to plain text markdown from CLI response
   * @throws Error for timeout, command-not-found, execution failures
   */
  static async executeCliCommand(request: ItineraryRequest): Promise<string> {
    const timeoutMs = parseInt(process.env.CLAUDE_CLI_TIMEOUT_MS || '40000', 10);

    return new Promise((resolve, reject) => {
      try {
        // Step 1: Construct prompt using PromptBuilder
        const prompt = PromptBuilder.buildPrompt(request);

        const escapedPrompt = prompt.replace(/"/g, '\\"').replace(/\n/g, ' ');
        const command = `claude --model haiku -p "${escapedPrompt}" --disallowedTools "Read Glob Grep Task Bash"`
        + ` --append-system-prompt "You are a travel itinerary generator. Do not read any files or explore the project. Your sole job is to generate a structured markdown text output immediately given travel info."`;

        console.log('Executing Claude CLI command:\n', command);

        // Step 4: Spawn the child process
        const childProcess = spawn(command, {
            shell: true,
            windowsHide: true,
          });

        // Buffers for stdout and stderr
        let stdoutBuffer = '';
        let stderrBuffer = '';

        // Step 5: Close stdin immediately to signal no input expected
        childProcess.stdin.end();

        // Step 6: Aggregate stdout data
        childProcess.stdout.setEncoding('utf-8');
        childProcess.stdout.on('data', (chunk: string) => {
          stdoutBuffer += chunk;
        });

        // Step 7: Capture stderr for error diagnostics
        childProcess.stderr.setEncoding('utf-8');
        childProcess.stderr.on('data', (chunk: string) => {
          stderrBuffer += chunk;
        });

        // Step 8: Implement timeout mechanism
        const timeoutHandle = setTimeout(() => {
          childProcess.kill();
          reject(new Error(
            `CLI command timed out after ${timeoutMs / 1000} seconds. ` +
            'The itinerary generation is taking longer than expected. Please try again.'
          ));
        }, timeoutMs);

        // Step 9: Handle process exit
        childProcess.on('exit', (code, signal) => {
          clearTimeout(timeoutHandle);

          if (code === 0) {
            // Success - return trimmed stdout
            const trimmedOutput = stdoutBuffer.trim();
            console.log('CLI response captured successfully: ', trimmedOutput);
            resolve(trimmedOutput);
          } else {
            // Failure - include exit code and stderr in error
            const exitInfo = code !== null ? `exit code ${code}` : `signal ${signal}`;
            const errorMessage = `CLI execution failed with ${exitInfo}.` +
              (stderrBuffer ? ` Error output: ${stderrBuffer}` : '');
            reject(new Error(errorMessage));
          }
        });

        // Step 10: Handle spawn errors (e.g., command not found)
        childProcess.on('error', (error: any) => {
          clearTimeout(timeoutHandle);

          if (error.code === 'ENOENT') {
            reject(new Error(
              'Claude CLI command not found. Please ensure claude CLI is installed and available in your PATH.'
            ));
          } else {
            reject(new Error(
              `CLI spawn failed: ${error.message}. ` +
              'Please check that claude CLI is properly configured.'
            ));
          }
        });

      } catch (error) {
        // Handle any synchronous errors during setup
        if (error instanceof Error) {
          reject(error);
        } else {
          reject(new Error('An unexpected error occurred during CLI command execution'));
        }
      }
    });
  }
}
