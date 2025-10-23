import { spawn } from 'child_process';

console.log('Testing with spawn and explicit stdin close...');

const child = spawn('claude.cmd', ['-p', 'say hi'], {
  shell: true,
  windowsHide: true,
});

let stdout = '';
let stderr = '';

child.stdout.on('data', (data) => {
  stdout += data.toString();
  console.log('Got stdout chunk:', data.toString());
});

child.stderr.on('data', (data) => {
  stderr += data.toString();
  console.log('Got stderr chunk:', data.toString());
});

// Close stdin immediately
child.stdin.end();

child.on('close', (code) => {
  console.log('Process closed with code:', code);
  console.log('Final stdout:', stdout);
  console.log('Final stderr:', stderr);
});

child.on('error', (error) => {
  console.error('Process error:', error);
});

// Timeout after 20 seconds
setTimeout(() => {
  console.log('Timeout reached, killing process');
  child.kill();
}, 20000);
