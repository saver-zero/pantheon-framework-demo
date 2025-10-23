import type { IItineraryService } from './IItineraryService';
import type { ItineraryResponse, ItineraryMetadata } from '../../types/itinerary';
import { getHistory, saveToHistory as saveToLocalStorage } from '../../utils/localStorage';

export class CLIApiClient implements IItineraryService {
  private readonly API_URL = 'http://localhost:3201/api/generate';
  private readonly PROMPT_TEMPLATE = `Create a {days}-day travel itinerary for {destination} for {party_info} visiting in the month of {month}.

Include time periods (morning/afternoon/evening/night/late_night) only when relevant.
Each time period should include attractions, descriptions, what to do, and where to eat.
Make the itinerary appropriate for the party demographic and the time of year.
Consider seasonal events, weather conditions, and appropriate activities for the month of {month}.`;

  async generateItinerary(
    destination: string,
    partyInfo: string,
    month: string,
    days: number
  ): Promise<ItineraryResponse> {
    const prompt = this.PROMPT_TEMPLATE
      .replace('{destination}', destination)
      .replace('{party_info}', partyInfo)
      .replace(/{month}/g, month)
      .replace(/{days}/g, days.toString());

    try {
      // Create timeout promise (30 seconds)
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error('Request timed out. The itinerary generation is taking too long. Please try again.'));
        }, 40000);
      });

      // Race between fetch and timeout
      const response = await Promise.race([
        fetch(this.API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
        }),
        timeoutPromise
      ]);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate itinerary');
      }

      const data = await response.json();
      const itinerary: ItineraryResponse = { markdown: data.markdown };

      // Save to history after successful generation
      this.saveToHistory(destination, partyInfo, month, days, data.markdown);

      return itinerary;
    } catch (error) {
      console.error('Error generating itinerary:', error);
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Failed to generate itinerary. Please try again.'
      );
    }
  }

  getHistory(): ItineraryMetadata[] {
    return getHistory();
  }

  saveToHistory(
    destination: string,
    partyInfo: string,
    month: string,
    days: number,
    markdown: string
  ): void {
    saveToLocalStorage(destination, partyInfo, month, days, markdown);
  }
}
