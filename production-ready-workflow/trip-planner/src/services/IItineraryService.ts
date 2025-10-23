import type { ItineraryResponse } from '../types/itinerary';

export interface IItineraryService {
  generateItinerary(
    destination: string,
    partyInfo: string,
    month: string,
    days: number
  ): Promise<ItineraryResponse>;

  getHistory(): ItineraryResponse[];

  saveToHistory(itinerary: ItineraryResponse): void;
}
