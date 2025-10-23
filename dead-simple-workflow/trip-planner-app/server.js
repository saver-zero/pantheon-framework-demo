import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';

const app = express();
const PORT = 3201;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;
  let responseSent = false;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const escapedPrompt = prompt.replace(/"/g, '\\"').replace(/\n/g, ' ');
    const command = `claude --model haiku -p "${escapedPrompt}" --disallowedTools "Read Glob Grep Task Bash"`
      + ` --append-system-prompt "You are a travel itinerary generator. Do not read any files or explore the project. Your sole job is to generate a structured markdown text output immediately given travel info."`;
    console.log('Executing command: ', command);
    const claudeProcess = spawn(command, {
      shell: true,
      windowsHide: true
    });

    claudeProcess.stdin.end();

    let stdout = '';
    let stderr = '';

    claudeProcess.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    claudeProcess.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    claudeProcess.on('exit', (code) => {
      if (stderr) {
        console.error('Claude CLI stderr:', stderr);
      }

      if (code !== 0) {
        console.error(`Claude CLI exited with code ${code}`);
        if (responseSent) return;
        responseSent = true;
        return res.status(500).json({
          error: 'Failed to generate itinerary',
          details: `Process exited with code ${code}`
        });
      }

      console.log('Claude CLI completed successfully');
      if (responseSent) return;
      responseSent = true;
      res.json({ markdown: stdout.trim() });
    });

    claudeProcess.on('error', (error) => {
      console.error('Error spawning Claude CLI:', error);
      if (responseSent) return;
      responseSent = true;
      res.status(500).json({
        error: 'Failed to spawn Claude CLI process',
        details: error.message
      });
    });

    setTimeout(() => {
      if (!claudeProcess.killed) {
        claudeProcess.kill();
        if (responseSent) return;
        responseSent = true;
        res.status(500).json({
          error: 'Request timeout',
          details: 'Claude CLI process exceeded 30 second timeout'
        });
      }
    }, 30000);

  } catch (error) {
    console.error('Error executing Claude CLI:', error);
    if (responseSent) return;
    responseSent = true;
    res.status(500).json({
      error: 'Failed to generate itinerary',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log('Ready to handle itinerary generation requests');
});
