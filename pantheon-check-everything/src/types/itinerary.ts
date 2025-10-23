/**
 * @deprecated This file contains type definitions for the legacy JSON-based itinerary structure.
 * As of the markdown migration (T015), the application no longer uses these typed objects at runtime.
 * Itinerary data is now returned as plain markdown strings from the backend.
 * These types are preserved for reference and documentation purposes only.
 */

/**
 * Activity represents a single attraction with details for a specific time period.
 * Matches the PRD JSON schema for timePeriod items.
 * @deprecated No longer used - itineraries are now markdown strings
 */
export interface Activity {
  attraction: string;
  attraction_description: string;
  what_to_do: string[];
  where_to_eat: string;
}

/**
 * TimePeriod represents activities for a specific time of day.
 * Can be null if no activities are planned for that period.
 * Matches the PRD JSON schema timePeriod type.
 * @deprecated No longer used - itineraries are now markdown strings
 */
export type TimePeriod = Activity[] | null;

/**
 * Day represents a single day in the itinerary with time-based activity periods.
 * Matches the PRD JSON schema Day structure.
 * @deprecated No longer used - itineraries are now markdown strings
 */
export interface Day {
  day: number;
  morning: TimePeriod;
  afternoon: TimePeriod;
  evening: TimePeriod;
  night?: TimePeriod;
  late_night?: TimePeriod;
}

/**
 * Itinerary represents the complete trip itinerary response.
 * Matches the PRD JSON schema root object.
 * @deprecated No longer used - itineraries are now markdown strings
 */
export interface Itinerary {
  destination: string;
  party_info: string;
  month: string;
  days: number;
  itinerary: Day[];
}
