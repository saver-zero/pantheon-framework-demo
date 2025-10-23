import { vi } from 'vitest';
import { EventEmitter } from 'events';

/**
 * Mock implementation of child_process.spawn for testing backend Claude CLI service.
 * Simulates the spawn event-based API with stdin, stdout, stderr streams and exit events.
 */

export interface MockChildProcess extends EventEmitter {
  stdin: {
    end: ReturnType<typeof vi.fn>;
    write: ReturnType<typeof vi.fn>;
  };
  stdout: EventEmitter;
  stderr: EventEmitter;
  kill: ReturnType<typeof vi.fn>;
}

export interface SpawnMockOptions {
  stdout?: string;
  stderr?: string;
  exitCode?: number;
  delay?: number;
  shouldFail?: boolean;
  failureError?: Error;
}

/**
 * Creates a mock child process that simulates spawn behavior.
 *
 * @param options Configuration for the mock process behavior
 * @returns Mock child process with event emitters
 */
export const createMockChildProcess = (options: SpawnMockOptions = {}): MockChildProcess => {
  const {
    stdout = '',
    stderr = '',
    exitCode = 0,
    delay = 0,
    shouldFail = false,
    failureError = new Error('spawn ENOENT')
  } = options;

  const mockProcess = new EventEmitter() as MockChildProcess;
  mockProcess.stdin = {
    end: vi.fn(),
    write: vi.fn()
  };
  mockProcess.stdout = new EventEmitter();
  mockProcess.stderr = new EventEmitter();
  mockProcess.kill = vi.fn();

  // Simulate async stdout/stderr data and exit events
  setTimeout(() => {
    if (shouldFail) {
      mockProcess.emit('error', failureError);
    } else {
      if (stdout) {
        // Emit stdout in chunks to simulate real behavior
        const chunks = stdout.match(/.{1,100}/g) || [stdout];
        chunks.forEach((chunk, index) => {
          setTimeout(() => {
            mockProcess.stdout.emit('data', Buffer.from(chunk));
          }, delay * index);
        });
      }
      if (stderr) {
        mockProcess.stderr.emit('data', Buffer.from(stderr));
      }
      setTimeout(() => {
        mockProcess.emit('exit', exitCode);
      }, delay * ((stdout.match(/.{1,100}/g)?.length || 1) + 1));
    }
  }, 10);

  return mockProcess;
};

/**
 * Creates a mock spawn function for testing.
 *
 * @param mockProcess The mock child process to return
 * @returns Mock spawn function compatible with child_process.spawn
 */
export const createMockSpawn = (mockProcess: MockChildProcess) => {
  return vi.fn(() => mockProcess);
};

/**
 * Helper to create a spawn mock that returns markdown itinerary.
 */
export const createSuccessfulSpawnMock = (markdown: string) => {
  const mockProcess = createMockChildProcess({
    stdout: markdown,
    exitCode: 0,
    delay: 10
  });
  return createMockSpawn(mockProcess);
};

/**
 * Helper to create a spawn mock that fails with an error.
 */
export const createFailedSpawnMock = (error: Error = new Error('spawn ENOENT')) => {
  const mockProcess = createMockChildProcess({
    shouldFail: true,
    failureError: error
  });
  return createMockSpawn(mockProcess);
};

/**
 * Helper to create a spawn mock that times out (never exits).
 */
export const createTimeoutSpawnMock = () => {
  const mockProcess = new EventEmitter() as MockChildProcess;
  mockProcess.stdin = {
    end: vi.fn(),
    write: vi.fn()
  };
  mockProcess.stdout = new EventEmitter();
  mockProcess.stderr = new EventEmitter();
  mockProcess.kill = vi.fn();

  // Never emit exit event to simulate timeout
  return createMockSpawn(mockProcess);
};

/**
 * Helper to create a spawn mock that exits with non-zero code.
 */
export const createNonZeroExitSpawnMock = (exitCode: number = 1, stderr: string = 'Command failed') => {
  const mockProcess = createMockChildProcess({
    exitCode,
    stderr,
    delay: 10
  });
  return createMockSpawn(mockProcess);
};
