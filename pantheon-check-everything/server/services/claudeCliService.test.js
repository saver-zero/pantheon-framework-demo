import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { validMarkdownItinerary } from '../../src/test/fixtures/markdownFixtures.js';
import {
  createSuccessfulSpawnMock,
  createFailedSpawnMock,
  createTimeoutSpawnMock,
  createNonZeroExitSpawnMock,
  createMockChildProcess
} from '../../src/test/mocks/spawnMock.js';

// Mock child_process module
vi.mock('child_process', () => ({
  spawn: vi.fn()
}));

// Import after mocking
import { spawn } from 'child_process';
import { generateItinerary } from './claudeCliService.js';

describe('claudeCliService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('spawn usage and stdin handling', () => {
    it('should call spawn with correct arguments', async () => {
      // Arrange
      const mockSpawn = createSuccessfulSpawnMock(validMarkdownItinerary);
      vi.mocked(spawn).mockImplementation(mockSpawn);

      // Act
      await generateItinerary('Tokyo', 'couple', 'March', 3);

      // Assert
      expect(spawn).toHaveBeenCalledWith('claude', expect.arrayContaining(['-p']));
    });

    it('should immediately call stdin.end() after spawn', async () => {
      // Arrange
      const mockProcess = createMockChildProcess({
        stdout: validMarkdownItinerary,
        exitCode: 0,
        delay: 10
      });
      vi.mocked(spawn).mockReturnValue(mockProcess);

      // Act
      await generateItinerary('Tokyo', 'couple', 'March', 3);

      // Assert
      expect(mockProcess.stdin.end).toHaveBeenCalled();
      // Verify stdin.end was called before or immediately after spawn
      expect(vi.mocked(spawn).mock.invocationCallOrder[0])
        .toBeLessThanOrEqual(mockProcess.stdin.end.mock.invocationCallOrder[0]);
    });

    it('should not write to stdin before ending it', async () => {
      // Arrange
      const mockProcess = createMockChildProcess({
        stdout: validMarkdownItinerary,
        exitCode: 0,
        delay: 10
      });
      vi.mocked(spawn).mockReturnValue(mockProcess);

      // Act
      await generateItinerary('Tokyo', 'couple', 'March', 3);

      // Assert
      expect(mockProcess.stdin.write).not.toHaveBeenCalled();
      expect(mockProcess.stdin.end).toHaveBeenCalled();
    });
  });

  describe('stdout data collection', () => {
    it('should collect and concatenate stdout chunks into markdown string', async () => {
      // Arrange
      const mockSpawn = createSuccessfulSpawnMock(validMarkdownItinerary);
      vi.mocked(spawn).mockImplementation(mockSpawn);

      // Act
      const result = await generateItinerary('Tokyo', 'couple', 'March', 3);

      // Assert
      expect(result).toBe(validMarkdownItinerary);
      expect(typeof result).toBe('string');
    });

    it('should handle multiple stdout data events and concatenate them', async () => {
      // Arrange
      const part1 = '# Tokyo Itinerary\n\n## Day 1\n\n';
      const part2 = '### Morning\n- Visit temple\n\n';
      const part3 = '### Afternoon\n- Shopping';
      const fullMarkdown = part1 + part2 + part3;

      const mockProcess = createMockChildProcess({
        stdout: fullMarkdown,
        exitCode: 0,
        delay: 5
      });
      vi.mocked(spawn).mockReturnValue(mockProcess);

      // Act
      const result = await generateItinerary('Tokyo', 'couple', 'March', 3);

      // Assert
      expect(result).toBe(fullMarkdown);
    });

    it('should return markdown directly without JSON parsing', async () => {
      // Arrange
      const markdown = '# Simple Itinerary\n\nJust plain text, no JSON structure.';
      const mockSpawn = createSuccessfulSpawnMock(markdown);
      vi.mocked(spawn).mockImplementation(mockSpawn);

      // Act
      const result = await generateItinerary('Paris', 'solo', 'June', 2);

      // Assert
      expect(result).toBe(markdown);
      // Verify it's not trying to parse as JSON
      expect(() => JSON.parse(result)).toThrow();
    });
  });

  describe('error handling', () => {
    it('should handle spawn failures and throw error', async () => {
      // Arrange
      const spawnError = new Error('spawn ENOENT');
      const mockSpawn = createFailedSpawnMock(spawnError);
      vi.mocked(spawn).mockImplementation(mockSpawn);

      // Act & Assert
      await expect(generateItinerary('Tokyo', 'couple', 'March', 3))
        .rejects.toThrow();
    });

    it('should handle non-zero exit codes and include stderr', async () => {
      // Arrange
      const stderr = 'Claude CLI error: invalid prompt';
      const mockSpawn = createNonZeroExitSpawnMock(1, stderr);
      vi.mocked(spawn).mockImplementation(mockSpawn);

      // Act & Assert
      await expect(generateItinerary('Tokyo', 'couple', 'March', 3))
        .rejects.toThrow();
    });

    it('should collect stderr for error messages', async () => {
      // Arrange
      const stderr = 'Warning: prompt may be too long';
      const mockProcess = createMockChildProcess({
        stdout: validMarkdownItinerary,
        stderr: stderr,
        exitCode: 0,
        delay: 10
      });
      vi.mocked(spawn).mockReturnValue(mockProcess);

      // Act
      const result = await generateItinerary('Tokyo', 'couple', 'March', 3);

      // Assert - Should still succeed but stderr was captured
      expect(result).toBe(validMarkdownItinerary);
    });
  });

  describe('timeout handling', () => {
    it('should implement timeout for long-running processes', async () => {
      // Arrange
      const mockSpawn = createTimeoutSpawnMock();
      vi.mocked(spawn).mockImplementation(mockSpawn);

      // Use fake timers
      vi.useFakeTimers();

      // Act
      const promise = generateItinerary('Tokyo', 'couple', 'March', 3);

      // Advance time past timeout (60 seconds)
      vi.advanceTimersByTime(61000);

      // Assert
      await expect(promise).rejects.toThrow(/timeout/i);

      // Cleanup
      vi.useRealTimers();
    });

    it('should kill child process on timeout', async () => {
      // Arrange
      const mockProcess = createMockChildProcess({
        stdout: '',
        exitCode: 0,
        delay: 100000 // Very long delay
      });
      vi.mocked(spawn).mockReturnValue(mockProcess);

      // Use fake timers
      vi.useFakeTimers();

      // Act
      const promise = generateItinerary('Tokyo', 'couple', 'March', 3);
      vi.advanceTimersByTime(61000);

      // Assert
      await expect(promise).rejects.toThrow();
      expect(mockProcess.kill).toHaveBeenCalled();

      // Cleanup
      vi.useRealTimers();
    });
  });

  describe('prompt generation', () => {
    it('should include destination, party info, month, and days in prompt', async () => {
      // Arrange
      const mockSpawn = createSuccessfulSpawnMock(validMarkdownItinerary);
      vi.mocked(spawn).mockImplementation(mockSpawn);

      // Act
      await generateItinerary('Tokyo', 'couple', 'March', 3);

      // Assert
      const spawnArgs = vi.mocked(spawn).mock.calls[0];
      const promptArg = spawnArgs[1];
      const promptIndex = promptArg.indexOf('-p');
      expect(promptIndex).toBeGreaterThanOrEqual(0);

      const prompt = promptArg[promptIndex + 1];
      expect(prompt).toContain('Tokyo');
      expect(prompt).toContain('couple');
      expect(prompt).toContain('March');
      expect(prompt).toContain('3');
    });

    it('should explicitly request markdown format in prompt', async () => {
      // Arrange
      const mockSpawn = createSuccessfulSpawnMock(validMarkdownItinerary);
      vi.mocked(spawn).mockImplementation(mockSpawn);

      // Act
      await generateItinerary('Tokyo', 'couple', 'March', 3);

      // Assert
      const spawnArgs = vi.mocked(spawn).mock.calls[0];
      const promptArg = spawnArgs[1];
      const promptIndex = promptArg.indexOf('-p');
      const prompt = promptArg[promptIndex + 1];

      expect(prompt.toLowerCase()).toMatch(/markdown|md/);
    });

    it('should not include JSON schema or structure requirements in prompt', async () => {
      // Arrange
      const mockSpawn = createSuccessfulSpawnMock(validMarkdownItinerary);
      vi.mocked(spawn).mockImplementation(mockSpawn);

      // Act
      await generateItinerary('Tokyo', 'couple', 'March', 3);

      // Assert
      const spawnArgs = vi.mocked(spawn).mock.calls[0];
      const promptArg = spawnArgs[1];
      const promptIndex = promptArg.indexOf('-p');
      const prompt = promptArg[promptIndex + 1];

      expect(prompt.toLowerCase()).not.toContain('json');
      expect(prompt.toLowerCase()).not.toContain('schema');
    });
  });
});
