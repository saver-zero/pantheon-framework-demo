/**
 * LocalStorage Service
 *
 * Provides persistent client-side storage for itinerary history with automatic
 * quota management, size limits, and graceful error handling.
 */

import { ValidationService } from './ValidationService';
import { ItineraryResponseSchema, type ItineraryResponse } from '../types';

/**
 * Configuration constants
 */
const STORAGE_KEY = 'itinerary_history';
const MAX_HISTORY_ITEMS = 10;

/**
 * LocalStorageService class
 *
 * Manages persistent storage of itinerary history with quota exceeded handling,
 * data validation, and size limit enforcement.
 */
export class LocalStorageService {
  private validationService: ValidationService;

  constructor() {
    this.validationService = new ValidationService();
  }

  /**
   * Retrieves itinerary history from localStorage
   *
   * @returns Array of validated ItineraryResponse objects, or empty array if unavailable
   */
  getHistory(): ItineraryResponse[] {
    try {
      const rawData = localStorage.getItem(STORAGE_KEY);

      if (!rawData) {
        return [];
      }

      const parsedData = JSON.parse(rawData);

      // Validate that parsedData is an array
      if (!Array.isArray(parsedData)) {
        console.warn('LocalStorage data is not an array, clearing storage');
        this.clearHistory();
        return [];
      }

      // Validate each item and filter out invalid entries
      const validatedHistory = parsedData
        .map(item => this.isValidItinerary(item))
        .filter((item): item is ItineraryResponse => item !== null);

      return validatedHistory;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }

  /**
   * Saves a new itinerary to history
   *
   * @param itinerary - ItineraryResponse object to save
   */
  saveToHistory(itinerary: ItineraryResponse): void {
    try {
      const history = this.getHistory();

      // Add new itinerary at the beginning
      history.unshift(itinerary);

      // Enforce MAX_HISTORY_ITEMS limit
      const limitedHistory = history.slice(0, MAX_HISTORY_ITEMS);

      this.writeToStorage(limitedHistory);
    } catch (error) {
      if (this.isQuotaExceededError(error)) {
        console.warn('Storage quota exceeded, clearing oldest items');
        this.handleQuotaExceeded(itinerary);
      } else {
        console.error('Error saving to localStorage:', error);
        throw error;
      }
    }
  }

  /**
   * Deletes an itinerary from history by index
   *
   * @param index - Index of the itinerary to delete
   */
  deleteFromHistory(index: number): void {
    try {
      const history = this.getHistory();

      if (index < 0 || index >= history.length) {
        console.warn(`Invalid index ${index} for deletion`);
        return;
      }

      history.splice(index, 1);
      this.writeToStorage(history);
    } catch (error) {
      console.error('Error deleting from localStorage:', error);
      throw error;
    }
  }

  /**
   * Clears all itinerary history from storage
   */
  clearHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      throw error;
    }
  }

  /**
   * Validates an itinerary object using ValidationService
   *
   * @param data - Data to validate as ItineraryResponse
   * @returns Validated ItineraryResponse or null if invalid
   */
  private isValidItinerary(data: unknown): ItineraryResponse | null {
    const result = this.validationService.validate(data, ItineraryResponseSchema);

    if (result.success && result.data) {
      return result.data;
    }

    console.warn('Invalid itinerary data found in storage:', result.errors);
    return null;
  }

  /**
   * Writes history array to localStorage
   *
   * @param history - Array of ItineraryResponse objects to write
   */
  private writeToStorage(history: ItineraryResponse[]): void {
    const serialized = JSON.stringify(history);
    localStorage.setItem(STORAGE_KEY, serialized);
  }

  /**
   * Handles quota exceeded error by clearing oldest items and retrying
   *
   * @param itinerary - ItineraryResponse to save after cleanup
   */
  private handleQuotaExceeded(itinerary: ItineraryResponse): void {
    const history = this.getHistory();

    if (history.length === 0) {
      // No history to clear, storage might be completely full
      console.error('Cannot save itinerary: storage quota exceeded with no history to clear');
      throw new Error('Storage quota exceeded');
    }

    // Remove oldest item (last in array)
    history.pop();

    // Add new itinerary at the beginning
    history.unshift(itinerary);

    try {
      this.writeToStorage(history);
    } catch (retryError) {
      if (this.isQuotaExceededError(retryError)) {
        // Recursively try again with fewer items
        this.handleQuotaExceeded(itinerary);
      } else {
        throw retryError;
      }
    }
  }

  /**
   * Checks if an error is a QuotaExceededError
   *
   * @param error - Error to check
   * @returns True if error is quota exceeded
   */
  private isQuotaExceededError(error: unknown): boolean {
    return (
      error instanceof DOMException &&
      (error.name === 'QuotaExceededError' ||
       error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
    );
  }
}
