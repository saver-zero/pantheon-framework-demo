import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    console.log('Executing claude command...');
    console.log('Prompt:', prompt);
    const escapedPrompt = prompt.replace(/"/g, '\\"').replace(/\n/g, ' ');
    const command = `claude --model haiku -p "${escapedPrompt}" --disallowedTools "Read Glob Grep Task Bash"`
      + ` --append-system-prompt "You are a travel itinerary generator. Do not read any files or explore the project. Your sole job is to generate a structured markdown text output immediately given travel info."`;

    const result = await new Promise((resolve, reject) => {
      const child = spawn(command, {
        shell: true,
        windowsHide: true,
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      // Close stdin immediately to signal no more input
      child.stdin.end();

      child.on('close', (code) => {
        if (code === 0) {
          resolve({ stdout, stderr });
        } else {
          reject(new Error(`Process exited with code ${code}`));
        }
      });

      child.on('error', (error) => {
        reject(error);
      });

      // Timeout after 60 seconds
      setTimeout(() => {
        child.kill();
        reject(new Error('Command timeout'));
      }, 300000);
    });

    if (result.stderr) {
      console.error('Command stderr:', result.stderr);
    }

    console.log('Command completed successfully:\n', result.stdout);
    res.type('text/plain').send(result.stdout);
  } catch (error) {
    console.error('Error executing command:', error);
    res.status(500).type('text/plain').send(`Error: ${error.message}`);
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Ready to generate itineraries!');
});