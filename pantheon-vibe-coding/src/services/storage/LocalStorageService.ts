import { ItineraryResponse } from '../../types';

/**
 * Service for managing itinerary history persistence using browser LocalStorage.
 * Implements error handling, size limits, and validation for reliable data access.
 */
export class LocalStorageService {
  private readonly storageKey = 'itinerary_history';
  private readonly maxItems = 10;

  /**
   * Retrieves all itineraries from history.
   * Returns empty array on any errors to prevent application crashes.
   *
   * @returns Array of stored itineraries, or empty array if none exist or on error
   */
  getHistory(): ItineraryResponse[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) {
        return [];
      }

      const parsed = JSON.parse(stored);

      // Validate that parsed data is an array
      if (!Array.isArray(parsed)) {
        console.error('Invalid history data structure: expected array');
        return [];
      }

      // Basic validation that items have expected structure
      const validated = parsed.filter((item: any) => {
        return (
          item &&
          typeof item === 'object' &&
          typeof item.destination === 'string' &&
          typeof item.party_info === 'string' &&
          typeof item.month === 'string' &&
          typeof item.days === 'number' &&
          (typeof item.itinerary === 'string' || Array.isArray(item.itinerary))
        );
      });

      return validated;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }

  /**
   * Saves a new itinerary to history.
   * Adds to front of array, enforces size limit, and handles quota errors.
   *
   * @param itinerary - The itinerary to save
   * @throws Error if save fails after retry attempts
   */
  saveToHistory(itinerary: ItineraryResponse): void {
    try {
      const history = this.getHistory();

      // Add new itinerary to front
      history.unshift(itinerary);

      // Enforce size limit
      const trimmedHistory = history.slice(0, this.maxItems);

      this.saveHistory(trimmedHistory);
    } catch (error) {
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        console.warn('Storage quota exceeded, attempting to clear oldest items');

        // Retry with fewer items
        try {
          const history = this.getHistory();
          history.unshift(itinerary);
          const reducedHistory = history.slice(0, Math.floor(this.maxItems / 2));
          this.saveHistory(reducedHistory);
        } catch (retryError) {
          console.error('Failed to save after reducing history size:', retryError);
          throw new Error('Unable to save itinerary: storage quota exceeded');
        }
      } else {
        console.error('Error saving to localStorage:', error);
        throw new Error('Failed to save itinerary to history');
      }
    }
  }

  /**
   * Deletes an itinerary from history at the specified index.
   *
   * @param index - The index of the itinerary to delete
   */
  deleteFromHistory(index: number): void {
    try {
      const history = this.getHistory();

      if (index < 0 || index >= history.length) {
        console.warn(`Invalid index ${index} for history deletion`);
        return;
      }

      history.splice(index, 1);
      this.saveHistory(history);
    } catch (error) {
      console.error('Error deleting from localStorage:', error);
      throw new Error('Failed to delete itinerary from history');
    }
  }

  /**
   * Clears all itineraries from history.
   */
  clearHistory(): void {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      throw new Error('Failed to clear history');
    }
  }

  /**
   * Internal helper to save history array to localStorage.
   *
   * @param history - The history array to save
   * @throws Error if save fails
   */
  private saveHistory(history: ItineraryResponse[]): void {
    const serialized = JSON.stringify(history);
    localStorage.setItem(this.storageKey, serialized);
  }
}
