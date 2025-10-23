/**
 * Error Messages Constants
 *
 * Centralized error messages for consistent user-facing messaging
 * across the application. Extracting these constants:
 * - Prevents hardcoded magic strings
 * - Enables consistent messaging
 * - Supports future internationalization
 * - Improves maintainability
 */

export const ERROR_MESSAGES = {
  STORAGE_FAILED: 'Your itinerary was generated successfully, but history save failed. You can still view your itinerary below.',
  VALIDATION_FAILED: 'The API returned invalid data. Please try again. If the problem persists, contact support.',
  SERVICE_ERROR: (message: string) => `Failed to generate itinerary: ${message}`,
  GENERIC_ERROR: (message: string) => `An error occurred: ${message}`,
  UNEXPECTED_ERROR: 'An unexpected error occurred. Please try again.',
  /**
   * Error message displayed by ErrorBoundary when a rendering error is caught
   */
  BOUNDARY_ERROR: 'A rendering error occurred. Please reload the page.',
  /**
   * Suggestion message for retrying after errors
   */
  RETRY_SUGGESTION: 'Please try again. If the problem persists, contact support.',
} as const;
