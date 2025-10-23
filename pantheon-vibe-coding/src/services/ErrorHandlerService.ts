/**
 * Error Handler Service
 *
 * Provides centralized error management and user-friendly error message formatting.
 * Translates technical errors into actionable user messages.
 */

/**
 * Configuration constants
 */
const SHOW_TECHNICAL_DETAILS = false;
const ERROR_LOGGING_ENABLED = true;

/**
 * Custom error type for API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Custom error type for validation errors
 */
export class ValidationError extends Error {
  constructor(
    message: string,
    public errors?: string[]
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * ErrorHandlerService class
 *
 * Centralizes error handling, provides user-friendly messages, and logs technical details.
 */
export class ErrorHandlerService {
  /**
   * Handles API and network errors with user-friendly messages
   *
   * @param error - The error to handle
   * @returns User-friendly error message
   */
  handleApiError(error: unknown): string {
    if (ERROR_LOGGING_ENABLED) {
      this.logError(error, 'API Error');
    }

    // Network error (no connection)
    if (this.isNetworkError(error)) {
      return 'Unable to connect to the server. Please check your internet connection and try again.';
    }

    // API error with status code
    if (error instanceof ApiError && error.statusCode) {
      return this.formatApiErrorByStatus(error.statusCode);
    }

    // Generic HTTP error
    if (error instanceof Error && error.message.includes('HTTP')) {
      return 'The server encountered an error. Please try again later.';
    }

    // Unknown error
    return 'An unexpected error occurred. Please try again.';
  }

  /**
   * Handles validation errors with user-friendly messages
   *
   * @param error - The validation error to handle
   * @returns User-friendly error message
   */
  handleValidationError(error: unknown): string {
    if (ERROR_LOGGING_ENABLED) {
      this.logError(error, 'Validation Error');
    }

    if (error instanceof ValidationError && error.errors && error.errors.length > 0) {
      return this.formatValidationErrors(error.errors);
    }

    if (error instanceof Error) {
      return `Please check your input: ${error.message}`;
    }

    return 'Please check your input and try again.';
  }

  /**
   * Logs error details for debugging
   *
   * @param error - The error to log
   * @param context - Additional context about where the error occurred
   */
  logError(error: unknown, context?: string): void {
    if (!ERROR_LOGGING_ENABLED) {
      return;
    }

    const prefix = context ? `[${context}]` : '[Error]';

    if (error instanceof Error) {
      console.error(`${prefix} ${error.name}: ${error.message}`);

      if (SHOW_TECHNICAL_DETAILS && error.stack) {
        console.error('Stack trace:', error.stack);
      }

      // Log additional details for custom errors
      if (error instanceof ApiError && error.statusCode) {
        console.error(`Status Code: ${error.statusCode}`);
      }

      if (error instanceof ValidationError && error.errors) {
        console.error('Validation errors:', error.errors);
      }
    } else {
      console.error(`${prefix} Unknown error:`, error);
    }
  }

  /**
   * Checks if an error is a network error (no connection)
   *
   * @param error - The error to check
   * @returns True if error is a network error
   */
  private isNetworkError(error: unknown): boolean {
    if (error instanceof Error) {
      const message = error.message.toLowerCase();
      return (
        message.includes('network') ||
        message.includes('fetch') ||
        message.includes('connection') ||
        message.includes('timeout') ||
        error.name === 'NetworkError' ||
        error.name === 'FetchError'
      );
    }
    return false;
  }

  /**
   * Formats API error message based on HTTP status code
   *
   * @param statusCode - HTTP status code
   * @returns User-friendly error message
   */
  private formatApiErrorByStatus(statusCode: number): string {
    // 4xx: Client errors - user action needed
    if (statusCode >= 400 && statusCode < 500) {
      switch (statusCode) {
        case 400:
          return 'Invalid request. Please check your input and try again.';
        case 401:
          return 'Authentication required. Please sign in and try again.';
        case 403:
          return 'You do not have permission to perform this action.';
        case 404:
          return 'The requested resource was not found.';
        case 429:
          return 'Too many requests. Please wait a moment and try again.';
        default:
          return 'Invalid request. Please check your input and try again.';
      }
    }

    // 5xx: Server errors - system issues
    if (statusCode >= 500) {
      return 'The server is experiencing issues. Please try again later.';
    }

    // Other status codes
    return 'An error occurred. Please try again.';
  }

  /**
   * Formats validation errors into a user-friendly message
   *
   * @param errors - Array of validation error messages
   * @returns Formatted error message
   */
  private formatValidationErrors(errors: string[]): string {
    if (errors.length === 1) {
      return `Please correct the following: ${errors[0]}`;
    }

    const errorList = errors.slice(0, 3).join('; ');
    const remaining = errors.length > 3 ? ` and ${errors.length - 3} more` : '';

    return `Please correct the following: ${errorList}${remaining}`;
  }
}
