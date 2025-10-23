/**
 * Zod validation schemas for itinerary data structures
 * These schemas provide runtime validation of API responses
 */

import { z } from 'zod';

/**
 * Schema for a single activity within a time period
 */
export const TimePeriodActivitySchema = z.object({
  attraction: z.string().min(1, 'Attraction name is required'),
  attraction_description: z.string().min(1, 'Attraction description is required'),
  what_to_do: z.array(z.string()).min(1, 'At least one activity is required'),
  where_to_eat: z.string().min(1, 'Dining recommendation is required'),
});

/**
 * Schema for a time period (array of activities or null)
 */
export const TimePeriodSchema = z.array(TimePeriodActivitySchema).nullable();

/**
 * Schema for a single day in the itinerary
 */
export const DaySchema = z.object({
  day: z.number().int().positive('Day number must be a positive integer'),
  morning: TimePeriodSchema,
  afternoon: TimePeriodSchema,
  evening: TimePeriodSchema,
  night: TimePeriodSchema.optional(),
  late_night: TimePeriodSchema.optional(),
});

/**
 * Schema for the complete itinerary response
 */
export const ItineraryResponseSchema = z.object({
  destination: z.string().min(1, 'Destination is required'),
  party_info: z.string().min(1, 'Party information is required'),
  month: z.string().min(1, 'Month is required'),
  days: z.number().int().positive('Number of days must be a positive integer'),
  itinerary: z.array(DaySchema).min(1, 'Itinerary must have at least one day'),
});

/**
 * Inferred TypeScript types from Zod schemas
 */
export type TimePeriodActivity = z.infer<typeof TimePeriodActivitySchema>;
export type TimePeriod = z.infer<typeof TimePeriodSchema>;
export type Day = z.infer<typeof DaySchema>;
export type ItineraryResponse = z.infer<typeof ItineraryResponseSchema>;
