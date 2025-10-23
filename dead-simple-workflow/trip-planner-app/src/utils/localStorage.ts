import type { ItineraryMetadata } from '../types/itinerary';

const HISTORY_KEY = 'itinerary_history';
const MAX_HISTORY_ITEMS = 10;

export function getHistory(): ItineraryMetadata[] {
  try {
    const historyJson = localStorage.getItem(HISTORY_KEY);
    if (!historyJson) {
      return [];
    }
    return JSON.parse(historyJson) as ItineraryMetadata[];
  } catch (error) {
    console.error('Error reading history from localStorage:', error);
    return [];
  }
}

export function saveToHistory(
  destination: string,
  partyInfo: string,
  month: string,
  days: number,
  markdown: string
): void {
  try {
    const history = getHistory();

    const newEntry: ItineraryMetadata = {
      destination,
      partyInfo,
      month,
      days,
      generatedAt: new Date().toISOString(),
      markdown
    };

    // Add new itinerary to the beginning of the array
    history.unshift(newEntry);

    // Keep only the last MAX_HISTORY_ITEMS
    const limitedHistory = history.slice(0, MAX_HISTORY_ITEMS);

    localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));
  } catch (error) {
    console.error('Error saving to history:', error);
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing history:', error);
  }
}
