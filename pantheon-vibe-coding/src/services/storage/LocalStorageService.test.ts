import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LocalStorageService } from './LocalStorageService';
import { ItineraryResponse } from '../../types';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let mockLocalStorage: { [key: string]: string };

  const createMockItinerary = (destination: string, days: number): ItineraryResponse => ({
    destination,
    party_info: 'test party',
    month: 'January',
    days,
    itinerary: `# ${destination} Travel Itinerary\n\n${Array.from({ length: days }, (_, i) => `## Day ${i + 1}\n### Morning\n- Test Attraction\n- Activity 1\n- Activity 2\n\n### Afternoon\n- Free time\n\n### Evening\n- Dinner at Test Restaurant`).join('\n\n')}`,
  });

  beforeEach(() => {
    // Reset mock localStorage
    mockLocalStorage = {};

    // Mock localStorage methods
    global.localStorage = {
      getItem: vi.fn((key: string) => mockLocalStorage[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        mockLocalStorage[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete mockLocalStorage[key];
      }),
      clear: vi.fn(() => {
        mockLocalStorage = {};
      }),
      key: vi.fn(),
      length: 0,
    };

    service = new LocalStorageService();
  });

  describe('getHistory', () => {
    it('returns empty array when no history exists', () => {
      const history = service.getHistory();
      expect(history).toEqual([]);
    });

    it('retrieves stored itineraries successfully', () => {
      const mockItinerary = createMockItinerary('Tokyo', 3);
      mockLocalStorage['itinerary_history'] = JSON.stringify([mockItinerary]);

      const history = service.getHistory();

      expect(history).toHaveLength(1);
      expect(history[0]).toEqual(mockItinerary);
    });

    it('returns empty array when stored data is invalid JSON', () => {
      mockLocalStorage['itinerary_history'] = 'invalid json {';

      const history = service.getHistory();

      expect(history).toEqual([]);
    });

    it('returns empty array when stored data is not an array', () => {
      mockLocalStorage['itinerary_history'] = JSON.stringify({ not: 'an array' });

      const history = service.getHistory();

      expect(history).toEqual([]);
    });

    it('filters out items with invalid structure', () => {
      const validItinerary = createMockItinerary('Paris', 2);
      const invalidItem = { invalid: 'structure' };

      mockLocalStorage['itinerary_history'] = JSON.stringify([
        validItinerary,
        invalidItem,
        validItinerary,
      ]);

      const history = service.getHistory();

      expect(history).toHaveLength(2);
      expect(history[0]).toEqual(validItinerary);
      expect(history[1]).toEqual(validItinerary);
    });

    it('validates required fields in stored items', () => {
      const validItinerary = createMockItinerary('London', 3);
      const missingDestination = { ...validItinerary, destination: undefined };
      const missingPartyInfo = { ...validItinerary, party_info: undefined };
      const missingMonth = { ...validItinerary, month: undefined };
      const missingDays = { ...validItinerary, days: undefined };
      const missingItinerary = { ...validItinerary, itinerary: undefined };

      mockLocalStorage['itinerary_history'] = JSON.stringify([
        validItinerary,
        missingDestination,
        missingPartyInfo,
        missingMonth,
        missingDays,
        missingItinerary,
      ]);

      const history = service.getHistory();

      // Only the valid itinerary should be returned
      expect(history).toHaveLength(1);
      expect(history[0]).toEqual(validItinerary);
    });

    it('handles localStorage access errors gracefully', () => {
      global.localStorage.getItem = vi.fn(() => {
        throw new Error('localStorage access denied');
      });

      const history = service.getHistory();

      expect(history).toEqual([]);
    });

    it('accepts itineraries with string itinerary field', () => {
      const stringBasedItinerary: ItineraryResponse = {
        destination: 'Paris',
        party_info: '2 adults',
        month: 'May',
        days: 3,
        itinerary: '# Paris Travel Itinerary\n\n## Day 1\n### Morning\n- Visit Eiffel Tower\n\n### Afternoon\n- Louvre Museum',
      };

      mockLocalStorage['itinerary_history'] = JSON.stringify([stringBasedItinerary]);

      const history = service.getHistory();

      expect(history).toHaveLength(1);
      expect(history[0]).toEqual(stringBasedItinerary);
      expect(typeof history[0].itinerary).toBe('string');
    });

    it('maintains backward compatibility with legacy array-based itineraries', () => {
      const legacyItinerary: any = {
        destination: 'Tokyo',
        party_info: 'family',
        month: 'April',
        days: 2,
        itinerary: [
          {
            day: 1,
            morning: [
              {
                attraction: 'Senso-ji Temple',
                attraction_description: 'Ancient Buddhist temple',
                what_to_do: ['Visit temple', 'Explore market'],
                where_to_eat: 'Local ramen shop',
              },
            ],
            afternoon: null,
            evening: null,
          },
          {
            day: 2,
            morning: [
              {
                attraction: 'Tokyo Tower',
                attraction_description: 'Iconic landmark',
                what_to_do: ['Observation deck', 'Photos'],
                where_to_eat: 'Tower restaurant',
              },
            ],
            afternoon: null,
            evening: null,
          },
        ],
      };

      mockLocalStorage['itinerary_history'] = JSON.stringify([legacyItinerary]);

      const history = service.getHistory();

      expect(history).toHaveLength(1);
      expect(history[0]).toEqual(legacyItinerary);
      expect(Array.isArray(history[0].itinerary)).toBe(true);
    });

    it('supports mixed string and array formats in the same history', () => {
      const stringItinerary: ItineraryResponse = {
        destination: 'London',
        party_info: 'solo',
        month: 'June',
        days: 3,
        itinerary: '# London Itinerary\n\n## Day 1\n- British Museum',
      };

      const arrayItinerary: any = {
        destination: 'Rome',
        party_info: 'couple',
        month: 'September',
        days: 2,
        itinerary: [
          {
            day: 1,
            morning: [
              {
                attraction: 'Colosseum',
                attraction_description: 'Ancient arena',
                what_to_do: ['Tour'],
                where_to_eat: 'Trattoria',
              },
            ],
            afternoon: null,
            evening: null,
          },
        ],
      };

      mockLocalStorage['itinerary_history'] = JSON.stringify([stringItinerary, arrayItinerary]);

      const history = service.getHistory();

      expect(history).toHaveLength(2);
      expect(history[0]).toEqual(stringItinerary);
      expect(history[1]).toEqual(arrayItinerary);
      expect(typeof history[0].itinerary).toBe('string');
      expect(Array.isArray(history[1].itinerary)).toBe(true);
    });
  });

  describe('saveToHistory', () => {
    it('saves a new itinerary to empty history', () => {
      const itinerary = createMockItinerary('Berlin', 4);

      service.saveToHistory(itinerary);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'itinerary_history',
        JSON.stringify([itinerary])
      );
    });

    it('appends multiple itineraries to history without replacement', () => {
      const itinerary1 = createMockItinerary('Paris', 3);
      const itinerary2 = createMockItinerary('Tokyo', 5);
      const itinerary3 = createMockItinerary('London', 4);
      const itinerary4 = createMockItinerary('New York', 7);

      // Save multiple itineraries sequentially
      service.saveToHistory(itinerary1);
      service.saveToHistory(itinerary2);
      service.saveToHistory(itinerary3);
      service.saveToHistory(itinerary4);

      const history = service.getHistory();

      // Verify all itineraries are retained
      expect(history).toHaveLength(4);

      // Verify reverse chronological order (most recent first)
      expect(history[0]).toEqual(itinerary4);
      expect(history[1]).toEqual(itinerary3);
      expect(history[2]).toEqual(itinerary2);
      expect(history[3]).toEqual(itinerary1);

      // Verify oldest itinerary is not lost
      expect(history.find((i) => i.destination === 'Paris')).toBeDefined();
      expect(history.find((i) => i.destination === 'Tokyo')).toBeDefined();
      expect(history.find((i) => i.destination === 'London')).toBeDefined();
      expect(history.find((i) => i.destination === 'New York')).toBeDefined();
    });

    it('adds new itinerary to the front of history', () => {
      const itinerary1 = createMockItinerary('Rome', 3);
      const itinerary2 = createMockItinerary('Madrid', 5);

      mockLocalStorage['itinerary_history'] = JSON.stringify([itinerary1]);

      service.saveToHistory(itinerary2);

      const history = service.getHistory();
      expect(history[0]).toEqual(itinerary2);
      expect(history[1]).toEqual(itinerary1);
    });

    it('enforces maximum of 10 items in history', () => {
      const itineraries = Array.from({ length: 10 }, (_, i) =>
        createMockItinerary(`City${i}`, 2)
      );
      mockLocalStorage['itinerary_history'] = JSON.stringify(itineraries);

      const newItinerary = createMockItinerary('NewCity', 3);
      service.saveToHistory(newItinerary);

      const history = service.getHistory();

      // Should have exactly 10 items
      expect(history).toHaveLength(10);
      // New item should be first
      expect(history[0]).toEqual(newItinerary);
      // Oldest item (City9) should be removed
      expect(history.find((i) => i.destination === 'City9')).toBeUndefined();
    });

    it('handles QuotaExceededError by reducing history size', () => {
      const itineraries = Array.from({ length: 10 }, (_, i) =>
        createMockItinerary(`City${i}`, 2)
      );
      mockLocalStorage['itinerary_history'] = JSON.stringify(itineraries);

      // First call to setItem throws QuotaExceededError
      let callCount = 0;
      global.localStorage.setItem = vi.fn((key: string, value: string) => {
        callCount++;
        if (callCount === 1) {
          const error: any = new Error('QuotaExceededError');
          error.name = 'QuotaExceededError';
          throw error;
        }
        // Second call succeeds
        mockLocalStorage[key] = value;
      });

      const newItinerary = createMockItinerary('NewCity', 3);
      service.saveToHistory(newItinerary);

      // Should have called setItem twice (once failed, once succeeded with reduced history)
      expect(localStorage.setItem).toHaveBeenCalledTimes(2);

      const history = service.getHistory();
      // History should be reduced to half (5 items including new one)
      expect(history).toHaveLength(5);
      expect(history[0]).toEqual(newItinerary);
    });

    it('throws error when QuotaExceededError retry also fails', () => {
      mockLocalStorage['itinerary_history'] = JSON.stringify([]);

      // Always throw QuotaExceededError
      global.localStorage.setItem = vi.fn(() => {
        const error: any = new Error('QuotaExceededError');
        error.name = 'QuotaExceededError';
        throw error;
      });

      const newItinerary = createMockItinerary('NewCity', 3);

      expect(() => service.saveToHistory(newItinerary)).toThrow(
        'Unable to save itinerary: storage quota exceeded'
      );
    });

    it('throws error on other localStorage errors', () => {
      mockLocalStorage['itinerary_history'] = JSON.stringify([]);

      global.localStorage.setItem = vi.fn(() => {
        throw new Error('Some other error');
      });

      const newItinerary = createMockItinerary('NewCity', 3);

      expect(() => service.saveToHistory(newItinerary)).toThrow(
        'Failed to save itinerary to history'
      );
    });
  });

  describe('deleteFromHistory', () => {
    it('deletes itinerary at specified index', () => {
      const itineraries = [
        createMockItinerary('City1', 2),
        createMockItinerary('City2', 3),
        createMockItinerary('City3', 4),
      ];
      mockLocalStorage['itinerary_history'] = JSON.stringify(itineraries);

      service.deleteFromHistory(1);

      const history = service.getHistory();
      expect(history).toHaveLength(2);
      expect(history[0].destination).toBe('City1');
      expect(history[1].destination).toBe('City3');
    });

    it('handles invalid index gracefully', () => {
      const itineraries = [createMockItinerary('City1', 2)];
      mockLocalStorage['itinerary_history'] = JSON.stringify(itineraries);

      // Should not throw for invalid indices
      service.deleteFromHistory(-1);
      service.deleteFromHistory(10);

      const history = service.getHistory();
      // History should remain unchanged
      expect(history).toHaveLength(1);
    });

    it('throws error on localStorage failure', () => {
      mockLocalStorage['itinerary_history'] = JSON.stringify([
        createMockItinerary('City1', 2),
      ]);

      global.localStorage.setItem = vi.fn(() => {
        throw new Error('localStorage error');
      });

      expect(() => service.deleteFromHistory(0)).toThrow(
        'Failed to delete itinerary from history'
      );
    });
  });

  describe('clearHistory', () => {
    it('removes all history from localStorage', () => {
      const itineraries = [
        createMockItinerary('City1', 2),
        createMockItinerary('City2', 3),
      ];
      mockLocalStorage['itinerary_history'] = JSON.stringify(itineraries);

      service.clearHistory();

      expect(localStorage.removeItem).toHaveBeenCalledWith('itinerary_history');
      expect(mockLocalStorage['itinerary_history']).toBeUndefined();
    });

    it('handles localStorage errors', () => {
      global.localStorage.removeItem = vi.fn(() => {
        throw new Error('localStorage error');
      });

      expect(() => service.clearHistory()).toThrow('Failed to clear history');
    });
  });
});
