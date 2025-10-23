/**
 * Type definitions for backend request/response handling
 */

import { ItineraryResponse } from '../schemas/itinerarySchemas.js';

/**
 * Represents the user's itinerary request input (from frontend form)
 * Uses camelCase for frontend form inputs
 */
export interface ItineraryRequest {
  destination: string;
  partyInfo: string;
  month: string;
  days: number;
}

// Re-export ItineraryResponse for convenience
export type { ItineraryResponse };
