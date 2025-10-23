import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LocalStorageService } from './LocalStorageService';
import type { Itinerary } from '../types/itinerary';

describe('LocalStorageService', () => {
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

    vi.clearAllMocks();
  });

  describe('saveItinerary and getHistory', () => {
    it('should save itinerary and retrieve it from browser localStorage', () => {
      // Arrange
      const testItinerary: Itinerary = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 3,
        itinerary: [
          {
            day: 1,
            morning: [
              {
                attraction: 'Senso-ji Temple',
                attraction_description: 'Historic temple',
                what_to_do: ['Visit temple', 'Shop at Nakamise'],
                where_to_eat: 'Street food stalls'
              }
            ],
            afternoon: null,
            evening: null
          }
        ]
      };

      const service = new LocalStorageService('test-itinerary-key', 10);

      // Mock getItem to return empty array initially
      mockLocalStorage.getItem.mockReturnValue(null);

      // Act
      service.saveItinerary(testItinerary);

      // Assert - Verify localStorage.setItem was called with correct key and JSON-stringified array
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'test-itinerary-key',
        JSON.stringify([testItinerary])
      );

      // Mock getItem to return the saved data
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify([testItinerary]));

      // Act - Retrieve history
      const history = service.getHistory();

      // Assert - Verify getHistory returns the saved itinerary
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('test-itinerary-key');
      expect(history).toEqual([testItinerary]);
      expect(history).toHaveLength(1);
    });
  });

  describe('maximum item enforcement', () => {
    it('should enforce 10-item maximum by removing oldest items when limit is exceeded', () => {
      // Arrange
      const service = new LocalStorageService('test-key', 10);

      // Mock getItem to track the history as items are added
      let storedData: Itinerary[] = [];
      mockLocalStorage.getItem.mockImplementation(() => JSON.stringify(storedData));
      mockLocalStorage.setItem.mockImplementation((key: string, value: string) => {
        storedData = JSON.parse(value);
      });

      // Act - Add 12 itineraries
      for (let i = 1; i <= 12; i++) {
        const itinerary: Itinerary = {
          destination: `Place ${i}`,
          party_info: 'solo',
          month: 'January',
          days: 1,
          itinerary: []
        };
        service.saveItinerary(itinerary);
      }

      // Assert - Verify the final localStorage.setItem call contains only 10 items
      const finalCall = mockLocalStorage.setItem.mock.calls[mockLocalStorage.setItem.mock.calls.length - 1];
      const savedData = JSON.parse(finalCall[1] as string);
      expect(savedData).toHaveLength(10);

      // Verify the array contains the most recent 10 items (items 3-12)
      // Most recent should be first (item 12), oldest kept should be last (item 3)
      expect(savedData[0].destination).toBe('Place 12');
      expect(savedData[9].destination).toBe('Place 3');

      // Verify oldest items (1-2) are removed
      const destinations = savedData.map((item: Itinerary) => item.destination);
      expect(destinations).not.toContain('Place 1');
      expect(destinations).not.toContain('Place 2');
    });
  });

  describe('quota error handling', () => {
    it('should handle QuotaExceededError by clearing 3 oldest items and retrying', () => {
      // Arrange
      const service = new LocalStorageService('test-key', 10);

      // Start with 10 items already in storage
      const existingHistory: Itinerary[] = [];
      for (let i = 1; i <= 10; i++) {
        existingHistory.push({
          destination: `Place ${i}`,
          party_info: 'solo',
          month: 'January',
          days: 1,
          itinerary: []
        });
      }

      // Track storage state across calls
      let storedData: Itinerary[] = existingHistory;
      mockLocalStorage.getItem.mockImplementation(() => JSON.stringify(storedData));

      // Mock setItem to throw QuotaExceededError on first call, then succeed and update state on subsequent calls
      let callCount = 0;
      mockLocalStorage.setItem.mockImplementation((key: string, value: string) => {
        callCount++;
        if (callCount === 1) {
          const error = new DOMException('QuotaExceededError', 'QuotaExceededError');
          Object.defineProperty(error, 'name', { value: 'QuotaExceededError' });
          throw error;
        }
        // Subsequent calls succeed and update stored data
        storedData = JSON.parse(value);
      });

      const newItinerary: Itinerary = {
        destination: 'New Place',
        party_info: 'couple',
        month: 'February',
        days: 2,
        itinerary: []
      };

      // Act
      service.saveItinerary(newItinerary);

      // Assert - Verify setItem was called three times:
      // 1. First attempt fails with QuotaExceededError
      // 2. clearOldestItems saves truncated history (cleanup)
      // 3. Retry succeeds with new item added
      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(3);

      // Verify the final call has the new item with reduced history
      const finalCall = mockLocalStorage.setItem.mock.calls[2];
      const savedData = JSON.parse(finalCall[1] as string);

      // Should have 8 items: original 10, minus 3 oldest, plus 1 new = 8
      expect(savedData.length).toBe(8);
      expect(savedData[0].destination).toBe('New Place'); // Most recent item first
    });

    it('should throw StorageError when quota error persists during cleanup', () => {
      // Arrange
      const service = new LocalStorageService('test-key', 10);

      // Start with 10 items already in storage
      const existingHistory: Itinerary[] = [];
      for (let i = 1; i <= 10; i++) {
        existingHistory.push({
          destination: `Place ${i}`,
          party_info: 'solo',
          month: 'January',
          days: 1,
          itinerary: []
        });
      }

      let storedData: Itinerary[] = existingHistory;
      mockLocalStorage.getItem.mockImplementation(() => JSON.stringify(storedData));

      // Mock setItem to always throw QuotaExceededError (even during cleanup)
      mockLocalStorage.setItem.mockImplementation((key: string, value: string) => {
        const error = new DOMException('QuotaExceededError', 'QuotaExceededError');
        Object.defineProperty(error, 'name', { value: 'QuotaExceededError' });
        throw error;
      });

      const newItinerary: Itinerary = {
        destination: 'New Place',
        party_info: 'couple',
        month: 'February',
        days: 2,
        itinerary: []
      };

      // Act & Assert - Should throw StorageError when cleanup itself fails with quota error
      expect(() => service.saveItinerary(newItinerary)).toThrow('Failed to save truncated history during quota cleanup');
    });

    it('should throw StorageError when retry fails after successful cleanup', () => {
      // Arrange
      const service = new LocalStorageService('test-key', 10);

      // Start with 10 items already in storage
      const existingHistory: Itinerary[] = [];
      for (let i = 1; i <= 10; i++) {
        existingHistory.push({
          destination: `Place ${i}`,
          party_info: 'solo',
          month: 'January',
          days: 1,
          itinerary: []
        });
      }

      let storedData: Itinerary[] = existingHistory;
      mockLocalStorage.getItem.mockImplementation(() => JSON.stringify(storedData));

      // Mock setItem to fail on first call (initial save), succeed on second call (cleanup),
      // then fail again on third call (retry)
      let callCount = 0;
      mockLocalStorage.setItem.mockImplementation((key: string, value: string) => {
        callCount++;
        if (callCount === 1 || callCount === 3) {
          // Fail on initial attempt and retry attempt
          const error = new DOMException('QuotaExceededError', 'QuotaExceededError');
          Object.defineProperty(error, 'name', { value: 'QuotaExceededError' });
          throw error;
        }
        // Succeed on cleanup (second call)
        storedData = JSON.parse(value);
      });

      const newItinerary: Itinerary = {
        destination: 'New Place',
        party_info: 'couple',
        month: 'February',
        days: 2,
        itinerary: []
      };

      // Act & Assert - Should throw StorageError after retry limit exceeded
      expect(() => service.saveItinerary(newItinerary)).toThrow('Failed to save itinerary after quota cleanup retry');
    });
  });

  describe('error handling for missing or corrupted data', () => {
    it('should return empty array when no history exists', () => {
      // Arrange
      const service = new LocalStorageService('test-key', 10);
      mockLocalStorage.getItem.mockReturnValue(null);

      // Act
      const history = service.getHistory();

      // Assert
      expect(history).toEqual([]);
      expect(history).toHaveLength(0);
    });

    it('should return empty array when data is corrupted and clean up bad data', () => {
      // Arrange
      const service = new LocalStorageService('test-key', 10);
      const invalidJSON = '{invalid json data}';
      mockLocalStorage.getItem.mockReturnValue(invalidJSON);

      // Act
      const history = service.getHistory();

      // Assert - Should return empty array
      expect(history).toEqual([]);
      expect(history).toHaveLength(0);

      // Assert - Should call removeItem to clear corrupted data
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test-key');
    });

    it('should return empty array when data is valid JSON but not an array', () => {
      // Arrange
      const service = new LocalStorageService('test-key', 10);
      const validJSONButNotArray = JSON.stringify({ key: 'value' });
      mockLocalStorage.getItem.mockReturnValue(validJSONButNotArray);

      // Act
      const history = service.getHistory();

      // Assert - Should return empty array
      expect(history).toEqual([]);
      expect(history).toHaveLength(0);

      // Assert - Should call removeItem to clear invalid data
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test-key');
    });
  });

  describe('clearHistory', () => {
    it('should clear all history when clearHistory is called', () => {
      // Arrange
      const service = new LocalStorageService('test-key', 10);

      // Act
      service.clearHistory();

      // Assert - Verify localStorage.removeItem was called with the correct storage key
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test-key');

      // Mock empty state after clear
      mockLocalStorage.getItem.mockReturnValue(null);

      // Assert - Verify subsequent getHistory returns empty array
      const history = service.getHistory();
      expect(history).toEqual([]);
    });
  });

  describe('constructor validation', () => {
    it('should throw error when storageKey is empty string', () => {
      // Arrange & Act & Assert
      expect(() => new LocalStorageService('', 10)).toThrow('storageKey must be a non-empty string');
    });

    it('should throw error when storageKey is whitespace only', () => {
      // Arrange & Act & Assert
      expect(() => new LocalStorageService('   ', 10)).toThrow('storageKey must be a non-empty string');
    });

    it('should throw error when maxItems is zero', () => {
      // Arrange & Act & Assert
      expect(() => new LocalStorageService('test-key', 0)).toThrow('maxItems must be a positive integer');
    });

    it('should throw error when maxItems is negative', () => {
      // Arrange & Act & Assert
      expect(() => new LocalStorageService('test-key', -1)).toThrow('maxItems must be a positive integer');
    });

    it('should throw error when maxItems is not an integer', () => {
      // Arrange & Act & Assert
      expect(() => new LocalStorageService('test-key', 10.5)).toThrow('maxItems must be a positive integer');
    });
  });
});
