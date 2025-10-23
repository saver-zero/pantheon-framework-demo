import type { IItineraryService } from './IItineraryService';
import type { ItineraryResponse } from '../types/itinerary';
import { HISTORY_KEY, MAX_HISTORY } from '../utils/constants';

export class CLIApiClient implements IItineraryService {
  private readonly apiUrl: string;

  constructor(apiUrl: string = 'http://localhost:3001/api/generate') {
    this.apiUrl = apiUrl;
  }

  async generateItinerary(
    destination: string,
    partyInfo: string,
    month: string,
    days: number
  ): Promise<ItineraryResponse> {
    const prompt = this.buildPrompt(destination, partyInfo, month, days);

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${errorText}`);
      }

      const responseText = await response.text();

      // Wrap plain text response in ItineraryResponse structure
      const itinerary: ItineraryResponse = {
        destination,
        party_info: partyInfo,
        month,
        days,
        itinerary: [],
        rawText: responseText,
      };

      this.saveToHistory(itinerary);
      return itinerary;
    } catch (error) {
      console.error('Error generating itinerary:', error);
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Failed to generate itinerary'
      );
    }
  }

  getHistory(): ItineraryResponse[] {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error retrieving history:', error);
      return [];
    }
  }

  saveToHistory(itinerary: ItineraryResponse): void {
    try {
      const history = this.getHistory();
      history.unshift(itinerary);

      if (history.length > MAX_HISTORY) {
        history.pop();
      }

      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving to history:', error);
    }
  }

  private buildPrompt(
    destination: string,
    partyInfo: string,
    month: string,
    days: number
  ): string {
    return `Create a ${days}-day travel itinerary for ${destination} for ${partyInfo} visiting in ${month}.

Include time periods (morning/afternoon/evening/night/late_night) only when relevant.
Each time period should include attractions, descriptions, what to do, and where to eat.
Make the itinerary appropriate for the party demographic and the time of year.
Consider seasonal events, weather conditions, and appropriate activities for ${month}.`;
  }

  private parseResponse(jsonString: string): ItineraryResponse {
    try {
      const parsed = JSON.parse(jsonString);
      this.validateResponse(parsed);
      return parsed as ItineraryResponse;
    } catch (error) {
      console.error('Error parsing response:', error);
      throw new Error('Invalid itinerary response format');
    }
  }

  private validateResponse(data: unknown): void {
    if (!data || typeof data !== 'object') {
      throw new Error('Response is not an object');
    }

    const response = data as Record<string, unknown>;

    if (!response.destination || typeof response.destination !== 'string') {
      throw new Error('Invalid or missing destination');
    }

    if (!response.party_info || typeof response.party_info !== 'string') {
      throw new Error('Invalid or missing party_info');
    }

    if (!response.month || typeof response.month !== 'string') {
      throw new Error('Invalid or missing month');
    }

    if (!response.days || typeof response.days !== 'number') {
      throw new Error('Invalid or missing days');
    }

    if (!Array.isArray(response.itinerary)) {
      throw new Error('Invalid or missing itinerary array');
    }
  }
}
