/**
 * Backend abstraction service for itinerary operations.
 *
 * Enables swapping between CLI and HTTP implementations without component changes.
 * Inject via React Context, never import implementations directly.
 * All implementations must handle errors consistently.
 *
 * @example
 * ```tsx
 * const service = useItineraryService();
 * const markdown = await service.generateItinerary('Tokyo', 'couple', 'March', 5);
 * ```
 */
export interface IItineraryService {
  /**
   * Generates a new itinerary from user inputs.
   *
   * Returns markdown-formatted content instead of structured objects.
   * Implementations should handle errors and timeouts.
   *
   * @param destination - Destination city or location
   * @param partyInfo - Information about the traveling party
   * @param month - Month of travel
   * @param days - Number of days for the trip
   * @returns Promise resolving to markdown-formatted itinerary string
   */
  generateItinerary(
    destination: string,
    partyInfo: string,
    month: string,
    days: number
  ): Promise<string>;

  /**
   * Retrieves stored itinerary history.
   *
   * Returns empty array if no history exists.
   * Most recent itinerary should be first in array.
   * Maximum history size is 10 items.
   *
   * @returns Array of previously generated markdown itinerary strings
   */
  getHistory(): string[];

  /**
   * Persists markdown itinerary to storage.
   *
   * Implementation must enforce 10-item limit.
   * New items should be added to front of history.
   *
   * @param markdown - The markdown itinerary string to save
   */
  saveToHistory(markdown: string): void;

  /**
   * Deletes an itinerary from storage by index.
   *
   * Removes the itinerary at the specified index from history.
   * Maintains the order of remaining items.
   *
   * @param index - Zero-based index of the itinerary to delete
   */
  deleteFromHistory(index: number): void;
}
