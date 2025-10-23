import { exec } from 'child_process';
import { promisify } from 'util';
import { IItineraryService } from './IItineraryService';
import { ItineraryResponse } from '../../types/itinerary';
import { getHistory, saveToHistory as saveToLocalStorage } from '../../utils/localStorage';

const execAsync = promisify(exec);

export class CLIApiClient implements IItineraryService {
  private readonly PROMPT_TEMPLATE = `Create a {days}-day travel itinerary for {destination} for {party_info} visiting in {month}.

Return ONLY valid JSON with the specified structure below.
Include time periods (morning/afternoon/evening/night/late_night) only when relevant.
Each time period should include attractions, descriptions, what to do, and where to eat.
Make the itinerary appropriate for the party demographic and the time of year.
Consider seasonal events, weather conditions, and appropriate activities for {month}.

JSON Schema:
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["destination", "party_info", "month", "days", "itinerary"],
  "properties": {
    "destination": {
      "type": "string"
    },
    "party_info": {
      "type": "string"
    },
    "month": {
      "type": "string"
    },
    "days": {
      "type": "number"
    },
    "itinerary": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["day", "morning", "afternoon", "evening"],
        "properties": {
          "day": {
            "type": "number"
          },
          "morning": { "$ref": "#/$defs/timePeriod" },
          "afternoon": { "$ref": "#/$defs/timePeriod" },
          "evening": { "$ref": "#/$defs/timePeriod" },
          "night": { "$ref": "#/$defs/timePeriod" },
          "late_night": { "$ref": "#/$defs/timePeriod" }
        }
      }
    }
  },
  "$defs": {
    "timePeriod": {
      "type": ["array", "null"],
      "items": {
        "type": "object",
        "required": ["attraction", "attraction_description", "what_to_do", "where_to_eat"],
        "properties": {
          "attraction": {
            "type": "string"
          },
          "attraction_description": {
            "type": "string"
          },
          "what_to_do": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "minItems": 1
          },
          "where_to_eat": {
            "type": "string"
          }
        }
      }
    }
  }
}`;

  async generateItinerary(
    destination: string,
    partyInfo: string,
    month: string,
    days: number
  ): Promise<ItineraryResponse> {
    const prompt = this.PROMPT_TEMPLATE
      .replace('{destination}', destination)
      .replace('{party_info}', partyInfo)
      .replace('{month}', month)
      .replace(/{days}/g, days.toString())
      .replace('{month}', month);

    try {
      const command = `claude -p "${prompt.replace(/"/g, '\\"')}"`;
      const { stdout, stderr } = await execAsync(command, {
        timeout: 30000,
        maxBuffer: 1024 * 1024 * 10
      });

      if (stderr) {
        console.warn('CLI stderr:', stderr);
      }

      const itinerary = JSON.parse(stdout) as ItineraryResponse;

      // Save to history after successful generation
      this.saveToHistory(itinerary);

      return itinerary;
    } catch (error) {
      console.error('Error generating itinerary:', error);
      throw new Error('Failed to generate itinerary. Please try again.');
    }
  }

  getHistory(): ItineraryResponse[] {
    return getHistory();
  }

  saveToHistory(itinerary: ItineraryResponse): void {
    saveToLocalStorage(itinerary);
  }
}
