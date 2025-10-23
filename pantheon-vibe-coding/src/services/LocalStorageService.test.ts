/**
 * LocalStorage Service Test Suite
 *
 * Tests covering successful operations, quota exceeded handling, invalid data scenarios,
 * and size limit enforcement.
 */

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { LocalStorageService } from './LocalStorageService';
import type { ItineraryResponse } from '../types';

/**
 * Helper function to create valid test itinerary data
 */
function createTestItinerary(destination: string, days: number = 3): ItineraryResponse {
  return {
    destination,
    party_info: 'Solo traveler',
    month: 'June',
    days,
    itinerary: Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      morning: [
        {
          attraction: 'Test Attraction',
          attraction_description: 'A test attraction',
          what_to_do: ['Activity 1', 'Activity 2'],
          where_to_eat: 'Test Restaurant'
        }
      ],
      afternoon: null,
      evening: null
    }))
  };
}

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Restore all mocks before each test
    vi.restoreAllMocks();
    service = new LocalStorageService();
  });

  afterEach(() => {
    // Restore all mocks after each test
    vi.restoreAllMocks();
  });

  describe('getHistory', () => {
    test('should return empty array when storage is empty', () => {
      const history = service.getHistory();
      expect(history).toEqual([]);
    });

    test('should return stored itineraries', () => {
      const itinerary1 = createTestItinerary('Paris');
      const itinerary2 = createTestItinerary('Tokyo');

      service.saveToHistory(itinerary1);
      service.saveToHistory(itinerary2);

      const history = service.getHistory();
      expect(history).toHaveLength(2);
      expect(history[0].destination).toBe('Tokyo'); // Most recent first
      expect(history[1].destination).toBe('Paris');
    });

    test('should return empty array if localStorage throws error', () => {
      // Mock localStorage.getItem to throw error
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('Storage unavailable');
      });

      const history = service.getHistory();
      expect(history).toEqual([]);
    });

    test('should handle corrupted JSON data gracefully', () => {
      // Manually set corrupted data
      localStorage.setItem('itinerary_history', '{invalid json}');

      const history = service.getHistory();
      expect(history).toEqual([]);
    });

    test('should filter out invalid itinerary data', () => {
      const validItinerary = createTestItinerary('Paris');
      const invalidItinerary = { destination: 'Invalid', missing: 'required fields' };

      // Mock console.warn to suppress validation warnings during test
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Manually save mixed valid and invalid data
      localStorage.setItem(
        'itinerary_history',
        JSON.stringify([validItinerary, invalidItinerary])
      );

      const history = service.getHistory();
      expect(history).toHaveLength(1);
      expect(history[0].destination).toBe('Paris');

      // Restore console
      consoleWarnSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });

    test('should clear storage if data is not an array', () => {
      // Mock console.warn to suppress warning during test
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      // Manually set non-array data
      localStorage.setItem('itinerary_history', JSON.stringify({ not: 'an array' }));

      const history = service.getHistory();
      expect(history).toEqual([]);
      expect(localStorage.getItem('itinerary_history')).toBeNull();

      // Restore console
      consoleWarnSpy.mockRestore();
    });
  });

  describe('saveToHistory', () => {
    test('should save itinerary to empty storage', () => {
      const itinerary = createTestItinerary('Rome');
      service.saveToHistory(itinerary);

      const history = service.getHistory();
      expect(history).toHaveLength(1);
      expect(history[0].destination).toBe('Rome');
    });

    test('should add new itinerary at the beginning', () => {
      const itinerary1 = createTestItinerary('Paris');
      const itinerary2 = createTestItinerary('Tokyo');

      service.saveToHistory(itinerary1);
      service.saveToHistory(itinerary2);

      const history = service.getHistory();
      expect(history[0].destination).toBe('Tokyo');
      expect(history[1].destination).toBe('Paris');
    });

    test('should enforce MAX_HISTORY_ITEMS limit (10 items)', () => {
      // Save 11 itineraries
      for (let i = 1; i <= 11; i++) {
        service.saveToHistory(createTestItinerary(`City${i}`));
      }

      const history = service.getHistory();
      expect(history).toHaveLength(10); // Should only keep 10
      expect(history[0].destination).toBe('City11'); // Most recent
      expect(history[9].destination).toBe('City2'); // 10th item
    });

    test('should handle quota exceeded error by clearing oldest items', () => {
      // Mock console.warn to suppress warning during test
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      // Add some existing itineraries first
      const existingItinerary = createTestItinerary('Existing');
      service.saveToHistory(existingItinerary);

      // Mock localStorage.setItem to throw QuotaExceededError on first call, then succeed
      let callCount = 0;
      const originalSetItem = Storage.prototype.setItem.bind(localStorage);

      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(function(this: Storage, key: string, value: string) {
        callCount++;
        if (callCount === 1) {
          const error = new DOMException('Storage quota exceeded', 'QuotaExceededError');
          throw error;
        }
        // Call original implementation for subsequent calls
        return originalSetItem(key, value);
      });

      const newItinerary = createTestItinerary('New');
      service.saveToHistory(newItinerary);

      const history = service.getHistory();
      expect(history[0].destination).toBe('New'); // New item should be saved

      // Restore console
      consoleWarnSpy.mockRestore();
    });
  });

  describe('deleteFromHistory', () => {
    test('should delete itinerary at valid index', () => {
      const itinerary1 = createTestItinerary('Paris');
      const itinerary2 = createTestItinerary('Tokyo');
      const itinerary3 = createTestItinerary('London');

      service.saveToHistory(itinerary1);
      service.saveToHistory(itinerary2);
      service.saveToHistory(itinerary3);

      service.deleteFromHistory(1); // Delete Tokyo (middle item)

      const history = service.getHistory();
      expect(history).toHaveLength(2);
      expect(history[0].destination).toBe('London');
      expect(history[1].destination).toBe('Paris');
    });

    test('should handle invalid index gracefully (negative)', () => {
      const itinerary = createTestItinerary('Paris');
      service.saveToHistory(itinerary);

      service.deleteFromHistory(-1);

      const history = service.getHistory();
      expect(history).toHaveLength(1); // Nothing deleted
    });

    test('should handle invalid index gracefully (out of bounds)', () => {
      const itinerary = createTestItinerary('Paris');
      service.saveToHistory(itinerary);

      service.deleteFromHistory(10);

      const history = service.getHistory();
      expect(history).toHaveLength(1); // Nothing deleted
    });

    test('should delete first item correctly', () => {
      const itinerary1 = createTestItinerary('Paris');
      const itinerary2 = createTestItinerary('Tokyo');

      service.saveToHistory(itinerary1);
      service.saveToHistory(itinerary2);

      service.deleteFromHistory(0);

      const history = service.getHistory();
      expect(history).toHaveLength(1);
      expect(history[0].destination).toBe('Paris');
    });

    test('should delete last item correctly', () => {
      const itinerary1 = createTestItinerary('Paris');
      const itinerary2 = createTestItinerary('Tokyo');

      service.saveToHistory(itinerary1);
      service.saveToHistory(itinerary2);

      service.deleteFromHistory(1);

      const history = service.getHistory();
      expect(history).toHaveLength(1);
      expect(history[0].destination).toBe('Tokyo');
    });
  });

  describe('clearHistory', () => {
    test('should clear all itinerary history', () => {
      service.saveToHistory(createTestItinerary('Paris'));
      service.saveToHistory(createTestItinerary('Tokyo'));
      service.saveToHistory(createTestItinerary('London'));

      service.clearHistory();

      const history = service.getHistory();
      expect(history).toEqual([]);
    });

    test('should handle clearing empty storage', () => {
      service.clearHistory();

      const history = service.getHistory();
      expect(history).toEqual([]);
    });
  });

  describe('quota exceeded handling', () => {
    test('should recursively clear items until save succeeds', () => {
      // Mock console.warn and console.error to suppress logging during test
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Add some existing itineraries first
      service.saveToHistory(createTestItinerary('City1'));
      service.saveToHistory(createTestItinerary('City2'));
      service.saveToHistory(createTestItinerary('City3'));

      // Mock to fail first 3 times, then succeed
      let callCount = 0;
      const originalSetItem = Storage.prototype.setItem.bind(localStorage);

      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(function(this: Storage, key: string, value: string) {
        callCount++;
        if (callCount <= 3) {
          const error = new DOMException('Storage quota exceeded', 'QuotaExceededError');
          throw error;
        }
        return originalSetItem(key, value);
      });

      const newItinerary = createTestItinerary('NewCity');
      service.saveToHistory(newItinerary);

      // Should eventually succeed
      const history = service.getHistory();
      expect(history[0].destination).toBe('NewCity');

      // Restore console
      consoleWarnSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });

    test('should throw error if quota exceeded with no history to clear', () => {
      // Mock console.warn and console.error to suppress logging during test
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Mock localStorage.setItem to always throw QuotaExceededError
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        const error = new DOMException('Storage quota exceeded', 'QuotaExceededError');
        throw error;
      });

      const itinerary = createTestItinerary('Paris');

      expect(() => service.saveToHistory(itinerary)).toThrow('Storage quota exceeded');

      // Restore console
      consoleWarnSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });
  });

  describe('error handling', () => {
    test('should handle localStorage unavailable in getHistory', () => {
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('localStorage is not available');
      });

      const history = service.getHistory();
      expect(history).toEqual([]);
    });

    test('should throw error for non-quota errors in saveToHistory', () => {
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('Some other error');
      });

      const itinerary = createTestItinerary('Paris');

      expect(() => service.saveToHistory(itinerary)).toThrow('Some other error');
    });

    test('should throw error for errors in deleteFromHistory', () => {
      // Mock console.error to suppress error logging during test
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      service.saveToHistory(createTestItinerary('Paris'));

      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('Delete error');
      });

      expect(() => service.deleteFromHistory(0)).toThrow();

      // Restore console
      consoleErrorSpy.mockRestore();
    });

    test('should throw error for errors in clearHistory', () => {
      vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new Error('Clear error');
      });

      expect(() => service.clearHistory()).toThrow('Clear error');
    });
  });
});
