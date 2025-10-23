import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());

const PROMPT_TEMPLATE_PATH = process.env.PROMPT_TEMPLATE_PATH || './prompts/itinerary-prompt.txt';

function loadPromptTemplate() {
  try {
    const templatePath = join(__dirname, PROMPT_TEMPLATE_PATH);
    return readFileSync(templatePath, 'utf-8');
  } catch (error) {
    console.error('Failed to load prompt template:', error);
    throw new Error('Prompt template not found');
  }
}

function populatePromptTemplate(template, data) {
  return template
    .replace(/\{\{destination\}\}/g, data.destination)
    .replace(/\{\{party_info\}\}/g, data.partyInfo)
    .replace(/\{\{travel_month\}\}/g, data.travelMonth)
    .replace(/\{\{days\}\}/g, data.days.toString());
}

function executeCLI(prompt) {
  return new Promise((resolve, reject) => {
    const escapedPrompt = prompt.replace(/"/g, '\\"').replace(/\n/g, ' ');
    const command = `claude --model haiku -p "${escapedPrompt}" --disallowedTools "Read Glob Grep Task Bash"`
      + ` --append-system-prompt "You are a travel itinerary generator. Do not read any files or explore the project. Your sole job is to generate a structured markdown text output immediately given travel info."`;

    console.log('Executing command: ', command);
    const process = spawn(command, {
      shell: true,
      windowsHide: true,
      timeout: 30000
    });

    let stdout = '';
    let stderr = '';

    process.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    process.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    // Close stdin immediately to signal no more input
    process.stdin.end();

    process.on('close', (code) => {
      if (code === 0) {
        resolve(stdout.trim());
      } else {
        reject({
          code,
          message: stderr || 'CLI execution failed',
          stdout
        });
      }
    });

    process.on('error', (error) => {
      reject({
        message: 'Failed to execute CLI command',
        details: error.message
      });
    });
  });
}

app.post('/api/generate-itinerary', async (req, res) => {
  try {
    const { destination, partyInfo, travelMonth, days } = req.body;

    if (!destination || destination.trim().length < 3) {
      return res.status(400).json({ error: 'Destination must be at least 3 characters' });
    }

    if (!partyInfo || partyInfo.trim().length === 0) {
      return res.status(400).json({ error: 'Party information is required' });
    }

    if (!travelMonth || travelMonth.trim().length === 0) {
      return res.status(400).json({ error: 'Travel month is required' });
    }

    const daysNum = parseInt(days);
    if (isNaN(daysNum) || daysNum < 1 || daysNum > 7 || daysNum !== parseFloat(days)) {
      return res.status(400).json({ error: 'Days must be an integer between 1 and 7' });
    }

    const template = loadPromptTemplate();
    const prompt = populatePromptTemplate(template, {
      destination,
      partyInfo,
      travelMonth,
      days: daysNum
    });

    const itinerary = await executeCLI(prompt);

    if (!itinerary || itinerary.trim() === '') {
      return res.status(500).json({ error: 'Received empty response from AI' });
    }

    res.json({ itinerary });

  } catch (error) {
    console.error('Error generating itinerary:', error);

    if (error.code === 'ENOENT') {
      return res.status(500).json({
        error: 'CLI execution failed',
        details: 'Claude CLI not found. Please ensure Claude CLI is installed and in PATH.'
      });
    }

    res.status(500).json({
      error: 'CLI execution failed',
      details: error.message || 'Unknown error occurred'
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Using prompt template: ${PROMPT_TEMPLATE_PATH}`);
});
