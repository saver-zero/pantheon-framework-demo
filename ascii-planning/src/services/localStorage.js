import { v4 as uuidv4 } from 'uuid';

const HISTORY_INDEX_KEY = 'history_index';
const ITINERARY_KEY_PREFIX = 'itinerary_';
const MAX_HISTORY_ITEMS = 10;

export class LocalStorageService {
  static saveItinerary(itineraryData) {
    const id = uuidv4();
    const itinerary = {
      id,
      destination: itineraryData.destination,
      partyInfo: itineraryData.partyInfo,
      travelMonth: itineraryData.travelMonth,
      days: itineraryData.days,
      generatedAt: new Date().toISOString(),
      generationDuration: itineraryData.generationDuration,
      itineraryMarkdown: itineraryData.itineraryMarkdown
    };

    try {
      const historyIndex = this.getHistoryIndex();

      if (historyIndex.length >= MAX_HISTORY_ITEMS) {
        const oldestId = historyIndex.shift();
        localStorage.removeItem(`${ITINERARY_KEY_PREFIX}${oldestId}`);
      }

      historyIndex.push(id);
      localStorage.setItem(HISTORY_INDEX_KEY, JSON.stringify(historyIndex));
      localStorage.setItem(`${ITINERARY_KEY_PREFIX}${id}`, JSON.stringify(itinerary));

      return itinerary;
    } catch (error) {
      console.error('Failed to save itinerary to LocalStorage:', error);
      throw new Error('Storage quota exceeded or storage unavailable');
    }
  }

  static getHistoryIndex() {
    try {
      const index = localStorage.getItem(HISTORY_INDEX_KEY);
      return index ? JSON.parse(index) : [];
    } catch (error) {
      console.error('Failed to retrieve history index:', error);
      return [];
    }
  }

  static getAllItineraries() {
    const historyIndex = this.getHistoryIndex();
    const itineraries = [];

    for (const id of historyIndex) {
      try {
        const itineraryJson = localStorage.getItem(`${ITINERARY_KEY_PREFIX}${id}`);
        if (itineraryJson) {
          const itinerary = JSON.parse(itineraryJson);

          if (this.validateItinerary(itinerary)) {
            itineraries.push(itinerary);
          }
        }
      } catch (error) {
        console.error(`Failed to parse itinerary ${id}:`, error);
      }
    }

    return itineraries.reverse();
  }

  static getItineraryById(id) {
    try {
      const itineraryJson = localStorage.getItem(`${ITINERARY_KEY_PREFIX}${id}`);
      if (itineraryJson) {
        const itinerary = JSON.parse(itineraryJson);
        return this.validateItinerary(itinerary) ? itinerary : null;
      }
      return null;
    } catch (error) {
      console.error(`Failed to retrieve itinerary ${id}:`, error);
      return null;
    }
  }

  static validateItinerary(itinerary) {
    return (
      itinerary &&
      typeof itinerary.id === 'string' &&
      typeof itinerary.destination === 'string' &&
      itinerary.destination.length > 0 &&
      typeof itinerary.days === 'number' &&
      itinerary.days >= 1 &&
      itinerary.days <= 7 &&
      typeof itinerary.travelMonth === 'string' &&
      typeof itinerary.generatedAt === 'string' &&
      typeof itinerary.generationDuration === 'number' &&
      itinerary.generationDuration >= 0 &&
      typeof itinerary.itineraryMarkdown === 'string'
    );
  }

  static clearAll() {
    const historyIndex = this.getHistoryIndex();
    for (const id of historyIndex) {
      localStorage.removeItem(`${ITINERARY_KEY_PREFIX}${id}`);
    }
    localStorage.removeItem(HISTORY_INDEX_KEY);
  }
}
