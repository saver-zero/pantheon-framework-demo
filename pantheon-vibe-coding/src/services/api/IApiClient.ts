/**
 * API Client Interface
 *
 * This interface defines the contract for API client implementations.
 * It enables abstraction between different backend strategies (CLI-based POC vs HTTP-based production).
 * All implementations must satisfy this interface to ensure seamless switching between backends.
 */

import { ItineraryResponse, ItineraryRequest } from '../../types';

/**
 * Interface contract for API client implementations
 */
export interface IApiClient {
  /**
   * Generates a travel itinerary based on user preferences
   *
   * @param request - User's itinerary request including destination, party info, month, and days
   * @returns Promise resolving to a complete ItineraryResponse object
   * @throws Error if itinerary generation fails
   */
  generateItinerary(request: ItineraryRequest): Promise<ItineraryResponse>;
}
