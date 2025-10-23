/**
 * IItineraryService interface defines the contract for all API client implementations
 * Both CLIApiClient and HTTPApiClient must implement this interface
 */

import { ItineraryRequest, ItineraryResponse } from '../../types/index';

export interface IItineraryService {
  /**
   * Generates a new itinerary based on user input
   * @param request - User's travel preferences and requirements
   * @returns Promise resolving to the generated itinerary
   * @throws Error if generation fails, CLI execution fails, or response validation fails
   */
  generateItinerary(request: ItineraryRequest): Promise<ItineraryResponse>;

  /**
   * Retrieves previously generated itineraries from history
   * @returns Promise resolving to array of historical itineraries (most recent first)
   * @throws Error if history retrieval fails
   */
  getHistory(): Promise<ItineraryResponse[]>;

  /**
   * Saves an itinerary to history
   * @param itinerary - The itinerary to save
   * @returns Promise resolving when save is complete
   * @throws Error if save operation fails or storage quota exceeded
   */
  saveToHistory(itinerary: ItineraryResponse): Promise<void>;
}
