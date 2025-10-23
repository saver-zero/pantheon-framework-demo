import { ItineraryRequest } from '../types/types.js';

/**
 * PromptBuilder constructs structured AI prompts from user inputs.
 * Embeds JSON schema and seasonal context to ensure consistent, properly formatted responses.
 */
export class PromptBuilder {
  /**
   * Builds a complete prompt for AI itinerary generation.
   *
   * @param request - The user's itinerary request parameters
   * @returns A formatted prompt string ready for AI processing
   */
  static buildPrompt(request: ItineraryRequest): string {
    const { destination, partyInfo, month, days } = request;

    return `Create a ${days}-day travel itinerary for ${destination} for ${partyInfo} visiting in ${month}.

Include time periods (morning/afternoon/evening/night/late_night) only when relevant.
Each time period should include attractions, descriptions, what to do, and where to eat.
Make the itinerary appropriate for the party demographic and the time of year.
Consider seasonal events, weather conditions, and appropriate activities for ${month}.`;
  }
}
