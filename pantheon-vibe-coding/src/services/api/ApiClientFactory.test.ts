import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ApiClientFactory } from './ApiClientFactory';
import { CLIApiClient } from './CLIApiClient';

// Mock CLIApiClient to avoid actual CLI operations in tests
vi.mock('./CLIApiClient', () => ({
  CLIApiClient: vi.fn().mockImplementation(() => ({
    generateItinerary: vi.fn(),
    getHistory: vi.fn(),
    saveToHistory: vi.fn(),
  })),
}));

describe('ApiClientFactory', () => {
  let originalEnv: any;

  beforeEach(() => {
    vi.clearAllMocks();
    // Store original import.meta.env
    originalEnv = import.meta.env;
  });

  describe('create', () => {
    it('returns CLIApiClient when backend mode is "cli"', () => {
      // Mock import.meta.env
      import.meta.env = {
        ...originalEnv,
        VITE_BACKEND_MODE: 'cli',
      };

      const client = ApiClientFactory.create();

      expect(client).toBeInstanceOf(Object);
      expect(CLIApiClient).toHaveBeenCalledTimes(1);
    });

    it('defaults to "cli" mode when VITE_BACKEND_MODE is not set', () => {
      // Mock import.meta.env without VITE_BACKEND_MODE
      import.meta.env = {
        ...originalEnv,
        VITE_BACKEND_MODE: undefined,
      };

      const client = ApiClientFactory.create();

      expect(client).toBeInstanceOf(Object);
      expect(CLIApiClient).toHaveBeenCalledTimes(1);
    });

    it('throws descriptive error for "http" mode (not yet implemented)', () => {
      import.meta.env = {
        ...originalEnv,
        VITE_BACKEND_MODE: 'http',
      };

      expect(() => ApiClientFactory.create()).toThrow(
        'HTTPApiClient is not yet implemented'
      );
      expect(() => ApiClientFactory.create()).toThrow('VITE_BACKEND_MODE=cli');
    });

    it('throws descriptive error for invalid backend mode', () => {
      import.meta.env = {
        ...originalEnv,
        VITE_BACKEND_MODE: 'invalid-mode',
      };

      expect(() => ApiClientFactory.create()).toThrow('Invalid backend mode: invalid-mode');
      expect(() => ApiClientFactory.create()).toThrow("Valid options are: 'cli', 'http'");
    });

    it('throws error for empty string backend mode', () => {
      import.meta.env = {
        ...originalEnv,
        VITE_BACKEND_MODE: '',
      };

      // Empty string should default to 'cli'
      const client = ApiClientFactory.create();
      expect(CLIApiClient).toHaveBeenCalledTimes(1);
    });

    it('returns client implementing IItineraryService interface', () => {
      import.meta.env = {
        ...originalEnv,
        VITE_BACKEND_MODE: 'cli',
      };

      const client = ApiClientFactory.create();

      // Verify client has all required methods from IItineraryService
      expect(client).toHaveProperty('generateItinerary');
      expect(client).toHaveProperty('getHistory');
      expect(client).toHaveProperty('saveToHistory');
      expect(typeof client.generateItinerary).toBe('function');
      expect(typeof client.getHistory).toBe('function');
      expect(typeof client.saveToHistory).toBe('function');
    });

    it('logs backend mode selection to console', () => {
      const consoleLogSpy = vi.spyOn(console, 'log');

      import.meta.env = {
        ...originalEnv,
        VITE_BACKEND_MODE: 'cli',
      };

      ApiClientFactory.create();

      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('ApiClientFactory')
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('cli'));

      consoleLogSpy.mockRestore();
    });

    it('is case-sensitive for backend mode values', () => {
      import.meta.env = {
        ...originalEnv,
        VITE_BACKEND_MODE: 'CLI', // uppercase
      };

      // Should treat uppercase as invalid mode
      expect(() => ApiClientFactory.create()).toThrow('Invalid backend mode: CLI');
    });

    it('creates new instance on each call', () => {
      import.meta.env = {
        ...originalEnv,
        VITE_BACKEND_MODE: 'cli',
      };

      const client1 = ApiClientFactory.create();
      const client2 = ApiClientFactory.create();

      // Each call should create a new instance
      expect(CLIApiClient).toHaveBeenCalledTimes(2);
      expect(client1).not.toBe(client2);
    });
  });
});
