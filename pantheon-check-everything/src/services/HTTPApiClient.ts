import type { IItineraryService } from './IItineraryService';
import type { LocalStorageService } from './LocalStorageService';

/**
 * HTTPApiClient implements IItineraryService using backend HTTP API.
 *
 * This implementation communicates with the backend server to generate itineraries
 * and uses LocalStorageService for history persistence. Key characteristics:
 * - Makes HTTP POST requests to /api/itinerary endpoint
 * - Handles markdown-formatted responses instead of JSON objects
 * - Provides proper error handling for network failures
 * - Delegates history management to LocalStorageService
 *
 * @example
 * const storage = new LocalStorageService('itinerary-history', 10);
 * const client = new HTTPApiClient(storage, 'http://localhost:3001');
 * const markdown = await client.generateItinerary('Tokyo', 'couple', 'March', 3);
 */
export class HTTPApiClient implements IItineraryService {
  /**
   * Creates an HTTPApiClient instance with injected dependencies.
   *
   * @param storage - LocalStorageService for history persistence
   * @param backendUrl - Base URL of the backend API server
   */
  constructor(
    private readonly storage: LocalStorageService,
    private readonly backendUrl: string
  ) {}

  /**
   * Generates an itinerary by calling the backend HTTP API.
   *
   * Makes a POST request to the backend server with form data and returns
   * the markdown-formatted itinerary response. Automatically saves the result
   * to local storage history.
   *
   * @param destination - Travel destination (e.g., 'Tokyo', 'Paris')
   * @param partyInfo - Travel party description (e.g., 'couple in late 20s')
   * @param month - Travel month (e.g., 'March', 'June')
   * @param days - Number of days for the trip
   * @returns Promise resolving to markdown-formatted itinerary string
   * @throws {Error} On network failures or HTTP error responses
   */
  async generateItinerary(
    destination: string,
    partyInfo: string,
    month: string,
    days: number
  ): Promise<string> {
    try {
      // Use relative URL for Vite proxy in development, absolute for production
      const url = this.backendUrl ? `${this.backendUrl}/api/itinerary` : '/api/itinerary';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination,
          partyInfo,
          month,
          days
        })
      });

      if (!response.ok) {
        // Validate Content-Type before attempting to parse JSON
        const contentType = response.headers.get('content-type');
        const errorData = contentType?.includes('application/json')
          ? await response.json().catch(() => ({}))
          : {};
        throw new Error(
          errorData.error || `HTTP error ${response.status}: ${response.statusText}`
        );
      }

      // Validate Content-Type before parsing JSON to detect backend misconfigurations
      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        throw new Error(`Invalid response format: expected JSON, got ${contentType || 'unknown'}`);
      }

      const data = await response.json();

      if (!data.markdown || typeof data.markdown !== 'string' || !data.markdown.trim()) {
        throw new Error('Invalid response: markdown content is empty');
      }

      const markdown = data.markdown;
      this.storage.saveItinerary(markdown);

      return markdown;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to generate itinerary: ${error.message}`);
      }
      throw new Error('Failed to generate itinerary: Unknown error');
    }
  }

  /**
   * Retrieves itinerary history from local storage.
   *
   * Delegates to the injected LocalStorageService to retrieve stored
   * markdown itinerary strings.
   *
   * @returns Array of markdown itinerary strings (most recent first)
   */
  getHistory(): string[] {
    return this.storage.getHistory();
  }

  /**
   * Saves a markdown itinerary to local storage history.
   *
   * Delegates to the injected LocalStorageService. The service enforces
   * the 10-item maximum and maintains most-recent-first ordering.
   *
   * @param markdown - The markdown itinerary string to save
   */
  saveToHistory(markdown: string): void {
    this.storage.saveItinerary(markdown);
  }

  /**
   * Deletes an itinerary from local storage history by index.
   *
   * Delegates to the injected LocalStorageService to remove the itinerary
   * at the specified index from history.
   *
   * @param index - Zero-based index of the itinerary to delete
   */
  deleteFromHistory(index: number): void {
    this.storage.deleteFromHistory(index);
  }
}
