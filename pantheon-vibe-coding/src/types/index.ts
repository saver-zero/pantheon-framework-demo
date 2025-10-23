/**
 * Core TypeScript interfaces and Zod schemas for the Travel Itinerary Generator application
 */

import { z } from 'zod';

/**
 * Zod schema for a single activity within a time period
 */
export const TimePeriodActivitySchema = z.object({
  attraction: z.string(),
  attraction_description: z.string(),
  what_to_do: z.array(z.string()).min(1),
  where_to_eat: z.string()
});

/**
 * Represents a single activity within a time period
 */
export type TimePeriodActivity = z.infer<typeof TimePeriodActivitySchema>;

/**
 * Zod schema for a time period (can contain multiple activities or be null)
 */
export const TimePeriodSchema = z.array(TimePeriodActivitySchema).nullable();

/**
 * Represents a time period (can contain multiple activities or be null)
 */
export type TimePeriod = z.infer<typeof TimePeriodSchema>;

/**
 * Zod schema for a single day in the itinerary
 */
export const DaySchema = z.object({
  day: z.number(),
  morning: TimePeriodSchema,
  afternoon: TimePeriodSchema,
  evening: TimePeriodSchema,
  night: TimePeriodSchema.optional(),
  late_night: TimePeriodSchema.optional()
});

/**
 * Represents a single day in the itinerary
 */
export type Day = z.infer<typeof DaySchema>;

/**
 * Zod schema for the user's itinerary request input (form data)
 * Uses camelCase for frontend form inputs
 */
export const ItineraryRequestSchema = z.object({
  destination: z.string().min(1, 'Destination is required'),
  partyInfo: z.string().min(1, 'Party information is required'),
  month: z.string().min(1, 'Month of travel is required'),
  days: z.number().min(1, 'Trip duration must be at least 1 day').max(30, 'Trip duration must not exceed 30 days')
});

/**
 * Represents the user's itinerary request input (form data)
 * Uses camelCase for frontend form inputs
 */
export type ItineraryRequest = z.infer<typeof ItineraryRequestSchema>;

/**
 * Zod schema for the complete itinerary response from the API
 * Uses snake_case to match AI response structure
 *
 * IMPORTANT: As of T012, the backend now returns plain text markdown in the itinerary field
 * instead of structured Day array. The itinerary field contains markdown-formatted
 * travel itinerary content that should be rendered using a markdown renderer like react-markdown.
 *
 * Expected markdown format:
 * ```markdown
 * # Destination Travel Itinerary
 *
 * ## Day 1
 * ### Morning
 * - Activity 1
 * - Activity 2
 *
 * ### Afternoon
 * - Activity 3
 * ```
 *
 * Backward compatibility: Legacy Day-related types are preserved below for reading
 * historical itineraries from local storage that may still use the old structured format.
 */
export const ItineraryResponseSchema = z.object({
  destination: z.string(),
  party_info: z.string(),
  month: z.string(),
  days: z.number(),
  itinerary: z.string() // Markdown string, not Day[] array
});

/**
 * Represents the complete itinerary response from the API
 * Uses snake_case to match AI response structure
 *
 * FIELD DETAILS:
 * - destination: The travel destination (e.g., "Paris", "Tokyo")
 * - party_info: Information about the traveling party (e.g., "2 adults", "family with children")
 * - month: The month of travel (e.g., "May", "December")
 * - days: Number of days in the itinerary (1-30)
 * - itinerary: Markdown-formatted string containing the complete travel itinerary
 *
 * MIGRATION NOTES:
 * The itinerary field changed from Day[] to string in T012. This allows the backend
 * to return flexible markdown content instead of requiring strict JSON structure.
 * Historical data using the old Day[] format can still be read using the legacy
 * Day-related types defined below.
 */
export type ItineraryResponse = z.infer<typeof ItineraryResponseSchema>;
