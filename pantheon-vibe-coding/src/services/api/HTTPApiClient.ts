import { IItineraryService } from './IItineraryService';
import { ItineraryRequest, ItineraryResponse } from '../../types/index';
import { LocalStorageService } from '../storage/LocalStorageService';

/**
 * HTTPApiClient implements IItineraryService by making HTTP requests to the backend server
 * This enables the application to work in browser environments where child_process is unavailable
 */
export class HTTPApiClient implements IItineraryService {
  private readonly baseUrl: string;
  private readonly localStorageService: LocalStorageService;

  constructor() {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;

    if (!baseUrl) {
      throw new Error(
        'VITE_BACKEND_URL environment variable is not defined. ' +
        'Please configure it in your .env file to use HTTP mode.'
      );
    }

    this.baseUrl = baseUrl;
    this.localStorageService = new LocalStorageService();
  }

  /**
   * Generates a new itinerary by sending HTTP POST request to backend API
   * @param request - User's travel preferences and requirements
   * @returns Promise resolving to the generated itinerary
   * @throws Error if HTTP request fails, network error occurs, or response validation fails
   */
  async generateItinerary(request: ItineraryRequest): Promise<ItineraryResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/itinerary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination: request.destination,
          partyInfo: request.partyInfo,
          month: request.month,
          days: request.days,
        }),
      });

      // Check if response is successful
      if (!response.ok) {
        // Try to parse error message from response
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch {
          // If error response is not JSON, use status text
        }

        // Translate HTTP status codes to user-friendly messages
        if (response.status === 400) {
          throw new Error(`Invalid request data: ${errorMessage}`);
        } else if (response.status === 504) {
          throw new Error(
            'Request timed out. The AI is taking too long to respond. ' +
            'Please try again with a simpler request.'
          );
        } else if (response.status === 503) {
          throw new Error(
            'Backend service is unavailable. Please ensure the backend server is running ' +
            'and Claude CLI is properly installed.'
          );
        } else if (response.status === 502) {
          throw new Error(
            'Invalid response format from AI. The response could not be parsed correctly. ' +
            'Please try again.'
          );
        } else if (response.status === 422) {
          throw new Error(`Response validation failed: ${errorMessage}`);
        } else if (response.status === 500) {
          throw new Error(`Server error: ${errorMessage}`);
        } else {
          throw new Error(errorMessage);
        }
      }

      // Parse successful response - backend returns {itinerary: 'markdown string'}
      const backendResponse = await response.json();

      // Validate that itinerary field exists and is a non-empty string
      if (!backendResponse.itinerary) {
        throw new Error(
          'Invalid response structure: missing itinerary field'
        );
      }

      if (typeof backendResponse.itinerary !== 'string') {
        throw new Error(
          'Invalid response structure: itinerary must be a string'
        );
      }

      const markdownContent = backendResponse.itinerary.trim();
      if (markdownContent.length === 0) {
        throw new Error(
          'Invalid response: itinerary content is empty or contains only whitespace'
        );
      }

      // Construct ItineraryResponse with markdown content and metadata from request
      const itineraryResponse: ItineraryResponse = {
        destination: request.destination,
        party_info: request.partyInfo,
        month: request.month,
        days: request.days,
        itinerary: markdownContent
      };

      // Save successful response to history
      await this.saveToHistory(itineraryResponse);

      return itineraryResponse;

    } catch (error: any) {
      // Log error for debugging
      console.error('Error generating itinerary via HTTP:', error);

      // Handle network errors separately from HTTP errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error(
          'Network error: Unable to connect to backend server. ' +
          'Please ensure the backend is running at ' + this.baseUrl
        );
      }

      // Re-throw with original message for other errors
      throw error;
    }
  }

  /**
   * Retrieves previously generated itineraries from local storage
   * @returns Promise resolving to array of historical itineraries (most recent first)
   * @throws Error if history retrieval fails
   */
  async getHistory(): Promise<ItineraryResponse[]> {
    try {
      return this.localStorageService.getHistory();
    } catch (error: any) {
      console.error('Error retrieving history:', error);
      throw new Error(
        `Failed to retrieve history: ${error.message || 'Unknown error'}`
      );
    }
  }

  /**
   * Saves an itinerary to local storage history
   * @param itinerary - The itinerary to save
   * @returns Promise resolving when save is complete
   * @throws Error if save operation fails or storage quota exceeded
   */
  async saveToHistory(itinerary: ItineraryResponse): Promise<void> {
    try {
      this.localStorageService.saveToHistory(itinerary);
    } catch (error: any) {
      console.error('Error saving to history:', error);
      throw new Error(
        `Failed to save history: ${error.message || 'Unknown error'}`
      );
    }
  }
}
