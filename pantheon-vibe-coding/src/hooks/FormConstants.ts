/**
 * Form Constants
 *
 * Shared constants for form configuration and validation.
 * These values are used across the itinerary form component and hook.
 */

/**
 * Month options for the month selector
 * Full month names for user-friendly display
 */
export const MONTH_OPTIONS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
] as const;

/**
 * Trip duration constraints
 */
export const MIN_DAYS = 1;
export const MAX_DAYS = 30;
export const DEFAULT_DAYS = 5;
