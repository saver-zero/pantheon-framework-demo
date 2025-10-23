/**
 * Validation Service
 *
 * Provides runtime validation for API responses and form inputs using Zod schemas.
 * This service validates external data at system boundaries to ensure data integrity.
 */

import { z } from 'zod';
import {
  ItineraryRequestSchema,
  ItineraryResponseSchema,
  type ItineraryRequest,
  type ItineraryResponse
} from '../types';

/**
 * Configuration constants
 */
const LOG_ERRORS = true;

/**
 * Validation result type
 */
export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: string[];
}

/**
 * ValidationService class
 *
 * Provides methods for validating data against Zod schemas with formatted error messages.
 */
export class ValidationService {
  /**
   * Generic validation method that accepts unknown data and a Zod schema
   *
   * @param data - Unknown data to validate
   * @param schema - Zod schema to validate against
   * @returns ValidationResult with success/failure and parsed data or errors
   */
  validate<T>(data: unknown, schema: z.ZodSchema<T>): ValidationResult<T> {
    const result = schema.safeParse(data);

    if (result.success) {
      return {
        success: true,
        data: result.data
      };
    } else {
      const errors = this.formatZodErrors(result.error);

      if (LOG_ERRORS) {
        console.error('Validation failed:', errors);
      }

      return {
        success: false,
        errors
      };
    }
  }

  /**
   * Validates form input specifically for itinerary requests
   *
   * @param formData - Form data to validate
   * @returns ValidationResult with parsed ItineraryRequest or errors
   */
  validateFormInput(formData: unknown): ValidationResult<ItineraryRequest> {
    return this.validate(formData, ItineraryRequestSchema);
  }

  /**
   * Validates API response data
   *
   * @param responseData - API response data to validate
   * @returns ValidationResult with parsed ItineraryResponse or errors
   */
  validateApiResponse(responseData: unknown): ValidationResult<ItineraryResponse> {
    return this.validate(responseData, ItineraryResponseSchema);
  }

  /**
   * Formats Zod errors into user-friendly error messages
   *
   * @param error - Zod error object
   * @returns Array of formatted error messages
   */
  private formatZodErrors(error: z.ZodError): string[] {
    if (!error || !error.issues || !Array.isArray(error.issues)) {
      return ['Validation failed with unknown error'];
    }

    return error.issues.map(err => {
      const path = err.path.length > 0 ? err.path.join('.') : 'root';
      return `${path}: ${err.message}`;
    });
  }
}

/**
 * Export schemas for external use
 */
export { ItineraryRequestSchema, ItineraryResponseSchema };
