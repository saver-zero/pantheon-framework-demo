import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

console.log('Testing claude.cmd execution...');

try {
  const { stdout, stderr } = await execAsync('claude.cmd -p "say hi"', {
    maxBuffer: 10 * 1024 * 1024,
    timeout: 20000,
    shell: true,
  });

  console.log('SUCCESS!');
  console.log('stdout:', stdout);
  if (stderr) {
    console.log('stderr:', stderr);
  }
} catch (error) {
  console.error('FAILED!');
  console.error('Error:', error.message);
  console.error('Code:', error.code);
  if (error.killed) {
    console.error('Process was killed (timeout)');
  }
}
