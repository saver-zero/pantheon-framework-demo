import { spawn } from 'child_process';

// Configurable timeout for Claude CLI execution
// Default: 60000ms (60 seconds)
// Can be overridden via CLAUDE_TIMEOUT_MS environment variable
const TIMEOUT_MS = parseInt(process.env.CLAUDE_TIMEOUT_MS || '60000', 10);

function buildPrompt(destination, partyInfo, month, days) {
  return `Create a ${days}-day travel itinerary for ${destination} for ${partyInfo} visiting in ${month}.

Include time periods (morning/afternoon/evening/night/late_night) only when relevant.
Each time period should include attractions, descriptions, what to do, and where to eat.
Make the itinerary appropriate for the party demographic and the time of year.
Consider seasonal events, weather conditions, and appropriate activities for ${month}.`;
}

export async function generateItinerary({ destination, partyInfo, month, days }) {
  const prompt = buildPrompt(destination, partyInfo, month, days);
  const escapedPrompt = prompt.replace(/"/g, '\\"').replace(/\n/g, ' ');
  const command = `claude --model haiku -p "${escapedPrompt}" --disallowedTools "Read Glob Grep Task Bash"`
    + ` --append-system-prompt "You are a travel itinerary generator. Do not read any files or explore the project. Your sole job is to generate a structured markdown text output immediately given travel info."`;

  return new Promise((resolve, reject) => {
    const childProcess = spawn(command, {
            shell: true,
            windowsHide: true,
          });

    childProcess.stdin.end();

    let stdout = '';
    let stderr = '';

    childProcess.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    childProcess.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    const timeout = setTimeout(() => {
      childProcess.kill();
      reject(new Error(`Claude CLI execution timed out after ${TIMEOUT_MS}ms`));
    }, TIMEOUT_MS);

    childProcess.on('error', (error) => {
      clearTimeout(timeout);
      reject(new Error(`Failed to spawn Claude CLI: ${error.message}`));
    });

    childProcess.on('exit', (code) => {
      clearTimeout(timeout);

      if (code !== 0) {
        reject(new Error(`Claude CLI exited with code ${code}: ${stderr}`));
        return;
      }

      if (!stdout.trim()) {
        reject(new Error(`Claude CLI returned empty response`));
        return;
      }

      resolve(stdout);
    });
  });
}
