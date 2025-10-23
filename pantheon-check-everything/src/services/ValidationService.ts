import { z } from 'zod';
import type { Activity, TimePeriod, Day, Itinerary } from '../types/itinerary';

/**
 * ActivitySchema validates the structure of a single attraction with details.
 * All fields are required per the PRD specification.
 * - attraction: Name of the attraction
 * - attraction_description: Description of the attraction
 * - what_to_do: Non-empty array of activities (min 1 item required)
 * - where_to_eat: Restaurant or dining recommendation
 */
const ActivitySchema: z.ZodType<Activity> = z.object({
  attraction: z.string(),
  attraction_description: z.string(),
  what_to_do: z.array(z.string()).min(1),
  where_to_eat: z.string(),
});

/**
 * TimePeriodSchema validates activities for a specific time of day.
 * Can be an array of Activity objects or null (no activities planned).
 * Undefined is not valid per the TypeScript definition.
 */
const TimePeriodSchema: z.ZodType<TimePeriod> = z.array(ActivitySchema).nullable();

/**
 * DaySchema validates a single day in the itinerary with time-based periods.
 * Required fields: day (number), morning, afternoon, evening
 * Optional fields: night, late_night
 */
const DaySchema: z.ZodType<Day> = z.object({
  day: z.number(),
  morning: TimePeriodSchema,
  afternoon: TimePeriodSchema,
  evening: TimePeriodSchema,
  night: TimePeriodSchema.optional(),
  late_night: TimePeriodSchema.optional(),
});

/**
 * ItinerarySchema validates the complete trip itinerary response.
 * All fields are required per the PRD specification:
 * - destination: Trip destination
 * - party_info: Information about the travel party
 * - month: Travel month
 * - days: Number of days (as number, not string)
 * - itinerary: Array of Day objects
 */
const ItinerarySchema: z.ZodType<Itinerary> = z.object({
  destination: z.string(),
  party_info: z.string(),
  month: z.string(),
  days: z.number(),
  itinerary: z.array(DaySchema),
});

/**
 * ValidationError is thrown when data validation fails.
 * Preserves detailed Zod error information for debugging.
 */
export class ValidationError extends Error {
  public readonly errors: z.ZodIssue[];

  constructor(message: string, errors: z.ZodIssue[]) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;

    // Maintains proper stack trace for where error was thrown (V8 only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}

/**
 * ValidationService implements the Schema Validation at Boundaries pattern.
 * Validates external data (AI responses, API responses) before internal usage
 * to prevent runtime errors from malformed data structures.
 *
 * The service uses Zod for runtime validation, ensuring data matches the
 * expected TypeScript types defined in src/types/itinerary.ts.
 */
export class ValidationService {
  /**
   * Validates itinerary data against the ItinerarySchema.
   *
   * This method should be called at system boundaries (e.g., after receiving
   * AI-generated responses or API data) before passing data to UI components.
   *
   * @param data - Unknown data to validate (typically from external sources)
   * @returns Validated and typed Itinerary object
   * @throws ValidationError when data does not match the expected schema
   *
   * @example
   * ```typescript
   * const validator = new ValidationService();
   * try {
   *   const itinerary = validator.validateItinerary(unknownData);
   *   // itinerary is now typed as Itinerary and safe to use
   * } catch (error) {
   *   if (error instanceof ValidationError) {
   *     console.error('Validation failed:', error.zodErrors);
   *   }
   * }
   * ```
   */
  validateItinerary(data: unknown): Itinerary {
    try {
      return ItinerarySchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Build detailed error message including field paths
        const fieldPaths = error.issues.map(err => err.path.join('.')).join(', ');
        const message = `Itinerary validation failed: ${fieldPaths}`;
        throw new ValidationError(message, error.issues);
      }
      throw error;
    }
  }
}
