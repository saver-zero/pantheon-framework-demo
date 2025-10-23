import type { ItineraryResponse, ItineraryMetadata } from '../../types/itinerary';

export interface IItineraryService {
  generateItinerary(
    destination: string,
    partyInfo: string,
    month: string,
    days: number
  ): Promise<ItineraryResponse>;

  getHistory(): ItineraryMetadata[];

  saveToHistory(
    destination: string,
    partyInfo: string,
    month: string,
    days: number,
    markdown: string
  ): void;
}
