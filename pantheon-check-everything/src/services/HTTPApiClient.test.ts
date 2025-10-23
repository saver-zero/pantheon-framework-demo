import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HTTPApiClient } from './HTTPApiClient';
import { LocalStorageService } from './LocalStorageService';

// Mock fetch globally
global.fetch = vi.fn();

describe('HTTPApiClient', () => {
  let client: HTTPApiClient;
  let mockStorage: LocalStorageService;
  let mockLocalStorage: {
    getItem: ReturnType<typeof vi.fn>;
    setItem: ReturnType<typeof vi.fn>;
    removeItem: ReturnType<typeof vi.fn>;
    clear: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    // Arrange: Create fresh localStorage mock for each test
    mockLocalStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn()
    };

    // Mock the global localStorage object
    Object.defineProperty(global, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });

    // Create mock dependencies
    mockStorage = new LocalStorageService('test-key', 10);

    // Create HTTPApiClient with mock dependencies (storage first, then backendUrl)
    client = new HTTPApiClient(mockStorage, 'http://localhost:3001');

    vi.clearAllMocks();
  });

  describe('HTTPApiClient makes HTTP requests to backend server', () => {
    it('should make POST request to /api/itinerary and return markdown', async () => {
      // Arrange
      const mockMarkdown = '# Tokyo Itinerary\n\n**Party:** couple\n**Month:** March\n**Duration:** 3 days';
      vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        headers: {
          get: (name: string) => name === 'content-type' ? 'application/json' : null
        },
        json: async () => ({ markdown: mockMarkdown })
      } as Response);

      mockLocalStorage.getItem.mockReturnValue(null);

      // Act
      const result = await client.generateItinerary('Tokyo', 'couple', 'March', 3);

      // Assert
      expect(result).toBe(mockMarkdown);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/itinerary',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            destination: 'Tokyo',
            partyInfo: 'couple',
            month: 'March',
            days: 3
          })
        })
      );
    });

    it('should delegate getHistory to LocalStorageService', () => {
      // Arrange
      const mockHistory = ['# Paris\n\nItinerary', '# London\n\nItinerary'];
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockHistory));

      // Act
      const result = client.getHistory();

      // Assert
      expect(result).toEqual(mockHistory);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('test-key');
    });

    it('should delegate saveToHistory to LocalStorageService', () => {
      // Arrange
      const markdown = '# Paris Itinerary\n\nTest';
      mockLocalStorage.getItem.mockReturnValue(null);

      // Act
      client.saveToHistory(markdown);

      // Assert
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    });

    it('should handle HTTP errors gracefully', async () => {
      // Arrange
      vi.mocked(global.fetch).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        headers: {
          get: (name: string) => name === 'content-type' ? 'application/json' : null
        },
        json: async () => ({})
      } as Response);

      // Act & Assert
      await expect(
        client.generateItinerary('Tokyo', 'couple', 'March', 3)
      ).rejects.toThrow();
    });
  });

  describe('HTTPApiClient implements IItineraryService interface', () => {
    it('should have all required IItineraryService methods', () => {
      // Assert - Verify all interface methods are present
      expect(typeof client.generateItinerary).toBe('function');
      expect(typeof client.getHistory).toBe('function');
      expect(typeof client.saveToHistory).toBe('function');
    });

    it('should have generateItinerary method with correct signature', async () => {
      // Arrange
      const mockMarkdown = '# Test';
      vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        headers: {
          get: (name: string) => name === 'content-type' ? 'application/json' : null
        },
        json: async () => ({ markdown: mockMarkdown })
      } as Response);

      mockLocalStorage.getItem.mockReturnValue(null);

      // Assert - Verify method exists and is async (returns Promise)
      const result = client.generateItinerary('Tokyo', 'couple', 'March', 3);
      expect(result).toBeInstanceOf(Promise);

      // Verify it resolves to a string
      await expect(result).resolves.toBe(mockMarkdown);
    });
  });
});
