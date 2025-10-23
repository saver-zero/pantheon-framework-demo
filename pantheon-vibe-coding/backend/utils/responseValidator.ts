/**
 * Response validation utility for validating plain text markdown CLI responses
 */

/**
 * Validates a plain text markdown response from the CLI
 *
 * @param data - The plain text markdown string to validate
 * @returns The validated markdown string
 * @throws Error if validation fails with detailed error information
 */
export function validateItineraryResponse(data: unknown): string {
  // Ensure response is a string
  if (typeof data !== 'string') {
    throw new Error('Response validation failed: Response must be a string');
  }

  // Trim whitespace for validation
  const trimmedData = data.trim();

  // Ensure response is non-empty
  if (trimmedData.length === 0) {
    throw new Error('Response validation failed: Response cannot be empty');
  }

  // Check minimum length (reasonable markdown response should have at least 50 characters)
  const MIN_LENGTH = 50;
  if (trimmedData.length < MIN_LENGTH) {
    throw new Error(`Response validation failed: Response too short (minimum ${MIN_LENGTH} characters)`);
  }

  // Check maximum length to prevent unreasonably large responses (100KB)
  const MAX_LENGTH = 100000;
  if (trimmedData.length > MAX_LENGTH) {
    throw new Error(`Response validation failed: Response too long (maximum ${MAX_LENGTH} characters)`);
  }

  // Optional: Check for markdown indicators (headers, lists, etc.) to ensure it's formatted content
  const hasMarkdownIndicators = /[#*-]/.test(trimmedData);
  if (!hasMarkdownIndicators) {
    throw new Error('Response validation failed: Response does not appear to contain markdown formatting');
  }

  return trimmedData;
}
