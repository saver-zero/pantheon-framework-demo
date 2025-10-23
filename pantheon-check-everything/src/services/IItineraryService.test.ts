import { describe, it, expect, vi } from 'vitest';
import type { IItineraryService } from './IItineraryService';
import type { Itinerary } from '../types/itinerary';

describe('IItineraryService Interface Contract', () => {
  describe('interface method signatures', () => {
    it('should enforce generateItinerary method with correct signature', async () => {
      // Arrange - Create mock implementation of IItineraryService
      const mockItinerary: Itinerary = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 3,
        itinerary: [
          {
            day: 1,
            morning: null,
            afternoon: null,
            evening: null
          }
        ]
      };

      const mockService: IItineraryService = {
        generateItinerary: vi.fn().mockResolvedValue(mockItinerary),
        getHistory: vi.fn().mockReturnValue([]),
        saveToHistory: vi.fn()
      };

      // Act - Call with correct parameter types
      const result = await mockService.generateItinerary('Tokyo', 'couple', 'March', 3);

      // Assert
      expect(mockService.generateItinerary).toHaveBeenCalledWith('Tokyo', 'couple', 'March', 3);
      expect(result).toEqual(mockItinerary);

      // TypeScript would reject incorrect parameter types:
      // mockService.generateItinerary(123, 'couple', 'March', 3); // Error: destination must be string
      // mockService.generateItinerary('Tokyo', 456, 'March', 3); // Error: partyInfo must be string
      // mockService.generateItinerary('Tokyo', 'couple', 'March', '3'); // Error: days must be number
    });

    it('should enforce getHistory method returns Itinerary array', () => {
      // Arrange
      const mockHistory: Itinerary[] = [
        {
          destination: 'Paris',
          party_info: 'family',
          month: 'June',
          days: 5,
          itinerary: []
        }
      ];

      const mockService: IItineraryService = {
        generateItinerary: vi.fn(),
        getHistory: vi.fn().mockReturnValue(mockHistory),
        saveToHistory: vi.fn()
      };

      // Act
      const history = mockService.getHistory();

      // Assert
      expect(Array.isArray(history)).toBe(true);
      expect(history).toHaveLength(1);
      expect(history[0].destination).toBe('Paris');

      // TypeScript would reject incorrect return types:
      // const invalidService: IItineraryService = {
      //   generateItinerary: vi.fn(),
      //   getHistory: vi.fn().mockReturnValue('not an array'), // Error: must return Itinerary[]
      //   saveToHistory: vi.fn()
      // };
    });

    it('should enforce saveToHistory method signature', () => {
      // Arrange
      const mockItinerary: Itinerary = {
        destination: 'London',
        party_info: 'solo',
        month: 'September',
        days: 4,
        itinerary: []
      };

      const mockService: IItineraryService = {
        generateItinerary: vi.fn(),
        getHistory: vi.fn().mockReturnValue([]),
        saveToHistory: vi.fn()
      };

      // Act
      mockService.saveToHistory(mockItinerary);

      // Assert
      expect(mockService.saveToHistory).toHaveBeenCalledWith(mockItinerary);

      // TypeScript would reject incorrect parameter types:
      // mockService.saveToHistory('not an itinerary'); // Error: parameter must be Itinerary
      // mockService.saveToHistory({ invalid: 'object' }); // Error: must match Itinerary structure
    });

    it('should require all three methods in implementation', () => {
      // This test validates that TypeScript enforces complete interface implementation
      // The following would cause TypeScript errors if uncommented:

      // Missing generateItinerary
      // const incomplete1: IItineraryService = {
      //   getHistory: vi.fn().mockReturnValue([]),
      //   saveToHistory: vi.fn()
      // };

      // Missing getHistory
      // const incomplete2: IItineraryService = {
      //   generateItinerary: vi.fn(),
      //   saveToHistory: vi.fn()
      // };

      // Missing saveToHistory
      // const incomplete3: IItineraryService = {
      //   generateItinerary: vi.fn(),
      //   getHistory: vi.fn().mockReturnValue([])
      // };

      // Assert - Complete implementation compiles
      const completeService: IItineraryService = {
        generateItinerary: vi.fn(),
        getHistory: vi.fn().mockReturnValue([]),
        saveToHistory: vi.fn()
      };

      expect(completeService).toBeDefined();
    });

    it('should enforce Promise return type for generateItinerary', async () => {
      // Arrange
      const mockItinerary: Itinerary = {
        destination: 'Rome',
        party_info: 'couple',
        month: 'May',
        days: 7,
        itinerary: []
      };

      const mockService: IItineraryService = {
        generateItinerary: vi.fn().mockResolvedValue(mockItinerary),
        getHistory: vi.fn().mockReturnValue([]),
        saveToHistory: vi.fn()
      };

      // Act - Must await Promise
      const promise = mockService.generateItinerary('Rome', 'couple', 'May', 7);

      // Assert
      expect(promise).toBeInstanceOf(Promise);
      const result = await promise;
      expect(result).toEqual(mockItinerary);

      // TypeScript would reject non-Promise return:
      // const invalidService: IItineraryService = {
      //   generateItinerary: () => mockItinerary, // Error: must return Promise<Itinerary>
      //   getHistory: vi.fn().mockReturnValue([]),
      //   saveToHistory: vi.fn()
      // };
    });

    it('should enforce void return type for saveToHistory', () => {
      // Arrange
      const mockItinerary: Itinerary = {
        destination: 'Barcelona',
        party_info: 'friends',
        month: 'August',
        days: 6,
        itinerary: []
      };

      let capturedItinerary: Itinerary | null = null;
      const mockService: IItineraryService = {
        generateItinerary: vi.fn(),
        getHistory: vi.fn().mockReturnValue([]),
        saveToHistory: vi.fn((itinerary: Itinerary) => {
          capturedItinerary = itinerary;
          // Must return void, not a value
        })
      };

      // Act
      const result = mockService.saveToHistory(mockItinerary);

      // Assert - Return value is void (undefined)
      expect(result).toBeUndefined();
      expect(capturedItinerary).toEqual(mockItinerary);

      // TypeScript would reject non-void return:
      // const invalidService: IItineraryService = {
      //   generateItinerary: vi.fn(),
      //   getHistory: vi.fn().mockReturnValue([]),
      //   saveToHistory: (itinerary: Itinerary) => itinerary // Error: must return void
      // };
    });
  });

  describe('service abstraction pattern', () => {
    it('should allow swapping implementations without changing component code', async () => {
      // Arrange - Create two different implementations
      const cliImplementation: IItineraryService = {
        generateItinerary: vi.fn().mockResolvedValue({
          destination: 'CLI Generated',
          party_info: 'couple',
          month: 'March',
          days: 3,
          itinerary: []
        }),
        getHistory: vi.fn().mockReturnValue([]),
        saveToHistory: vi.fn()
      };

      const httpImplementation: IItineraryService = {
        generateItinerary: vi.fn().mockResolvedValue({
          destination: 'HTTP Generated',
          party_info: 'couple',
          month: 'March',
          days: 3,
          itinerary: []
        }),
        getHistory: vi.fn().mockReturnValue([]),
        saveToHistory: vi.fn()
      };

      // Act - Same component code works with both implementations
      const useService = async (service: IItineraryService) => {
        return await service.generateItinerary('Tokyo', 'couple', 'March', 3);
      };

      // Assert - Both implementations satisfy the contract
      await expect(useService(cliImplementation)).resolves.toBeDefined();
      await expect(useService(httpImplementation)).resolves.toBeDefined();
    });
  });
});
