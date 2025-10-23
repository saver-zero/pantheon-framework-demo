import { describe, it, expect, beforeEach, vi } from 'vitest';
import { HTTPApiClient } from './HTTPApiClient';
import { ItineraryRequest, ItineraryResponse } from '../../types';

// Mock fetch globally
global.fetch = vi.fn();

// Mock LocalStorageService
vi.mock('../storage/LocalStorageService', () => ({
  LocalStorageService: vi.fn().mockImplementation(() => ({
    getHistory: vi.fn(() => []),
    saveToHistory: vi.fn(),
  })),
}));

// Mock import.meta.env
vi.stubEnv('VITE_BACKEND_URL', 'http://localhost:3000');

describe('HTTPApiClient', () => {
  let client: HTTPApiClient;
  const mockFetch = global.fetch as any;

  const validMarkdownItinerary = `# Tokyo Travel Itinerary

## Day 1
### Morning
- Visit Senso-ji Temple
- Explore Nakamise shopping street

### Afternoon
- Tokyo Skytree observation deck

### Evening
- Dinner in Asakusa district
`;

  const mockRequest: ItineraryRequest = {
    destination: 'Tokyo',
    partyInfo: 'family with two young children',
    month: 'April',
    days: 3,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    client = new HTTPApiClient();
  });

  describe('generateItinerary', () => {
    it('successfully generates itinerary with valid markdown response', async () => {
      // Mock successful fetch with markdown response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ itinerary: validMarkdownItinerary }),
      });

      const result = await client.generateItinerary(mockRequest);

      expect(result.destination).toBe('Tokyo');
      expect(result.party_info).toBe('family with two young children');
      expect(result.month).toBe('April');
      expect(result.days).toBe(3);
      expect(result.itinerary).toBe(validMarkdownItinerary);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/itinerary',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });

    it('throws error when itinerary field is missing from response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}), // Missing itinerary field
      });

      await expect(client.generateItinerary(mockRequest)).rejects.toThrow(
        'Invalid response structure: missing itinerary field'
      );
    });

    it('throws error when itinerary is not a string', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ itinerary: 123 }), // Wrong type
      });

      await expect(client.generateItinerary(mockRequest)).rejects.toThrow(
        'Invalid response structure: itinerary must be a string'
      );
    });

    it('throws error when itinerary content is empty', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ itinerary: '' }),
      });

      await expect(client.generateItinerary(mockRequest)).rejects.toThrow(
        'Invalid response: itinerary content is empty or contains only whitespace'
      );
    });

    it('throws error when itinerary contains only whitespace', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ itinerary: '   \n\t  ' }),
      });

      await expect(client.generateItinerary(mockRequest)).rejects.toThrow(
        'Invalid response: itinerary content is empty or contains only whitespace'
      );
    });

    it('handles 400 Bad Request error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: async () => ({ message: 'Invalid destination' }),
      });

      await expect(client.generateItinerary(mockRequest)).rejects.toThrow(
        'Invalid request data: Invalid destination'
      );
    });

    it('handles 504 Gateway Timeout error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 504,
        statusText: 'Gateway Timeout',
        json: async () => ({}),
      });

      await expect(client.generateItinerary(mockRequest)).rejects.toThrow(
        'Request timed out. The AI is taking too long to respond. Please try again with a simpler request.'
      );
    });

    it('handles 503 Service Unavailable error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 503,
        statusText: 'Service Unavailable',
        json: async () => ({}),
      });

      await expect(client.generateItinerary(mockRequest)).rejects.toThrow(
        'Backend service is unavailable. Please ensure the backend server is running and Claude CLI is properly installed.'
      );
    });

    it('handles 502 Bad Gateway error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 502,
        statusText: 'Bad Gateway',
        json: async () => ({}),
      });

      await expect(client.generateItinerary(mockRequest)).rejects.toThrow(
        'Invalid response format from AI. The response could not be parsed correctly. Please try again.'
      );
    });

    it('handles 422 Unprocessable Entity error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 422,
        statusText: 'Unprocessable Entity',
        json: async () => ({ message: 'Validation failed' }),
      });

      await expect(client.generateItinerary(mockRequest)).rejects.toThrow(
        'Response validation failed: Validation failed'
      );
    });

    it('handles 500 Internal Server Error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => ({ message: 'Server crashed' }),
      });

      await expect(client.generateItinerary(mockRequest)).rejects.toThrow(
        'Server error: Server crashed'
      );
    });

    it('handles network error', async () => {
      mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

      await expect(client.generateItinerary(mockRequest)).rejects.toThrow(
        'Network error: Unable to connect to backend server. Please ensure the backend is running at http://localhost:3000'
      );
    });

    it('handles non-JSON error response gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => {
          throw new Error('Not JSON');
        },
      });

      await expect(client.generateItinerary(mockRequest)).rejects.toThrow(
        'Server error: HTTP 500: Internal Server Error'
      );
    });

    it('saves successful response to history', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ itinerary: validMarkdownItinerary }),
      });

      const mockLocalStorageService = (client as any).localStorageService;
      const saveSpy = vi.spyOn(mockLocalStorageService, 'saveToHistory');

      await client.generateItinerary(mockRequest);

      expect(saveSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          destination: 'Tokyo',
          party_info: 'family with two young children',
          month: 'April',
          days: 3,
          itinerary: validMarkdownItinerary,
        })
      );
    });

    it('constructs ItineraryResponse with metadata from request', async () => {
      const customRequest: ItineraryRequest = {
        destination: 'Paris',
        partyInfo: 'solo traveler',
        month: 'June',
        days: 5,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ itinerary: '# Paris Itinerary\n\nDay 1...' }),
      });

      const result = await client.generateItinerary(customRequest);

      expect(result.destination).toBe('Paris');
      expect(result.party_info).toBe('solo traveler');
      expect(result.month).toBe('June');
      expect(result.days).toBe(5);
    });
  });

  describe('getHistory', () => {
    it('retrieves history from localStorage service', async () => {
      const mockHistory: ItineraryResponse[] = [
        {
          destination: 'Tokyo',
          party_info: 'family',
          month: 'April',
          days: 3,
          itinerary: '# Tokyo Itinerary',
        },
      ];
      const mockLocalStorageService = (client as any).localStorageService;
      mockLocalStorageService.getHistory = vi.fn(() => mockHistory);

      const result = await client.getHistory();

      expect(result).toEqual(mockHistory);
      expect(mockLocalStorageService.getHistory).toHaveBeenCalledTimes(1);
    });

    it('handles history retrieval errors', async () => {
      const mockLocalStorageService = (client as any).localStorageService;
      mockLocalStorageService.getHistory = vi.fn(() => {
        throw new Error('localStorage error');
      });

      await expect(client.getHistory()).rejects.toThrow(
        'Failed to retrieve history: localStorage error'
      );
    });
  });

  describe('saveToHistory', () => {
    it('saves itinerary to localStorage service', async () => {
      const mockItinerary: ItineraryResponse = {
        destination: 'Tokyo',
        party_info: 'family',
        month: 'April',
        days: 3,
        itinerary: '# Tokyo Itinerary',
      };

      const mockLocalStorageService = (client as any).localStorageService;
      mockLocalStorageService.saveToHistory = vi.fn();

      await client.saveToHistory(mockItinerary);

      expect(mockLocalStorageService.saveToHistory).toHaveBeenCalledWith(
        mockItinerary
      );
    });

    it('handles save errors', async () => {
      const mockItinerary: ItineraryResponse = {
        destination: 'Tokyo',
        party_info: 'family',
        month: 'April',
        days: 3,
        itinerary: '# Tokyo Itinerary',
      };

      const mockLocalStorageService = (client as any).localStorageService;
      mockLocalStorageService.saveToHistory = vi.fn(() => {
        throw new Error('Storage quota exceeded');
      });

      await expect(client.saveToHistory(mockItinerary)).rejects.toThrow(
        'Failed to save history: Storage quota exceeded'
      );
    });
  });

  describe('constructor', () => {
    it('throws error when VITE_BACKEND_URL is not defined', () => {
      vi.stubEnv('VITE_BACKEND_URL', undefined);

      expect(() => new HTTPApiClient()).toThrow(
        'VITE_BACKEND_URL environment variable is not defined. Please configure it in your .env file to use HTTP mode.'
      );

      // Restore for other tests
      vi.stubEnv('VITE_BACKEND_URL', 'http://localhost:3000');
    });
  });
});
