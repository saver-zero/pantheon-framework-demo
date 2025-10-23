/**
 * Custom error class for storage-related failures that are not quota-related.
 * Provides type-safe error discrimination and preserves original error context.
 */
export class StorageError extends Error {
  public readonly cause?: unknown;

  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = 'StorageError';
    this.cause = cause;
  }
}

/**
 * LocalStorageService manages browser localStorage for itinerary history with automatic
 * size management and quota error handling.
 *
 * This service enforces a configurable maximum item limit to prevent localStorage quota
 * exceeded errors. When the limit is reached, oldest items are automatically removed to
 * maintain the specified maximum. If a quota exceeded error occurs during save operations,
 * the service automatically cleans up the oldest items and retries the save once.
 *
 * Stores markdown-formatted itinerary strings instead of structured objects.
 *
 * @example
 * const storage = new LocalStorageService('itinerary-history', 10);
 * storage.saveItinerary(markdownString);
 * const history = storage.getHistory();
 */
export class LocalStorageService {
  constructor(private readonly storageKey: string, private readonly maxItems: number) {
    if (!storageKey || storageKey.trim().length === 0) {
      throw new Error('storageKey must be a non-empty string');
    }
    if (!Number.isInteger(maxItems) || maxItems < 1) {
      throw new Error('maxItems must be a positive integer');
    }
  }

  /**
   * Saves a markdown itinerary to browser localStorage history.
   *
   * Adds the markdown string to the front of the history array and enforces the maximum
   * item limit. If a QuotaExceededError occurs, automatically clears the 3 oldest items
   * and retries the save operation once.
   *
   * Maximum retry attempts is explicitly limited to 1 to prevent infinite recursion.
   *
   * @param markdown - The markdown itinerary string to save to history
   * @param retryCount - Internal recursion depth counter to prevent infinite retry loops (max: 1)
   * @throws {StorageError} If saving fails for reasons other than quota exceeded, or if retry limit exceeded
   */
  saveItinerary(markdown: string, retryCount: number = 0): void {
    const MAX_RETRY_COUNT = 1;

    // Explicit maximum retry count check to prevent infinite recursion
    if (retryCount > MAX_RETRY_COUNT) {
      throw new StorageError('Failed to save after maximum retries');
    }

    const history = this.getHistory();
    history.unshift(markdown);
    if (history.length > this.maxItems) {
      history.length = this.maxItems;
    }
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(history));
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        if (retryCount >= 1) {
          throw new StorageError('Failed to save itinerary after quota cleanup retry', error);
        }
        this.clearOldestItems(3);
        this.saveItinerary(markdown, retryCount + 1);
      } else {
        throw new StorageError('Failed to save itinerary to localStorage', error);
      }
    }
  }

  /**
   * Retrieves the complete itinerary history from browser localStorage.
   *
   * Returns an empty array if no history exists, if the data is corrupted, or if parsing
   * fails. Corrupted data is automatically removed from localStorage to prevent future
   * errors.
   *
   * @returns An array of markdown itinerary strings from most recent to oldest, or empty
   *          array if no history exists or data is corrupted
   */
  getHistory(): string[] {
    const data = localStorage.getItem(this.storageKey);
    if (data === null || data === undefined) {
      return [];
    }
    try {
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) {
        console.error('LocalStorageService: Stored data is not an array', {
          storageKey: this.storageKey,
          dataType: typeof parsed,
          dataLength: data.length
        });
        localStorage.removeItem(this.storageKey);
        return [];
      }
      return parsed;
    } catch (error) {
      console.error('LocalStorageService: Failed to parse stored data', {
        storageKey: this.storageKey,
        dataLength: data.length,
        error
      });
      localStorage.removeItem(this.storageKey);
      return [];
    }
  }

  /**
   * Clears all itinerary history from browser localStorage.
   *
   * Removes the entire history data from localStorage. Subsequent calls to getHistory
   * will return an empty array until new itineraries are saved.
   */
  clearHistory(): void {
    localStorage.removeItem(this.storageKey);
  }

  /**
   * Deletes an itinerary from storage by index.
   *
   * Removes the itinerary at the specified index from history.
   * Maintains the order of remaining items.
   *
   * @param index - Zero-based index of the itinerary to delete
   * @throws {StorageError} If deletion fails for any reason
   */
  deleteFromHistory(index: number): void {
    try {
      const history = this.getHistory();
      if (index >= 0 && index < history.length) {
        history.splice(index, 1);
        localStorage.setItem(this.storageKey, JSON.stringify(history));
      }
    } catch (error) {
      throw new StorageError('Failed to delete itinerary from localStorage', error);
    }
  }

  private clearOldestItems(count: number): void {
    const history = this.getHistory();
    if (history.length > count) {
      history.length = history.length - count;
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(history));
      } catch (error) {
        if (error instanceof DOMException && error.name === 'QuotaExceededError') {
          throw new StorageError('Failed to save truncated history during quota cleanup', error);
        }
        throw new StorageError('Failed to clear oldest items from localStorage', error);
      }
    }
  }
}
