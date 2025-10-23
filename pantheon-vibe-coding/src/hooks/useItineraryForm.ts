/**
 * useItineraryForm Custom Hook
 *
 * Encapsulates form state management, validation logic, and submission handling
 * for the itinerary generation form.
 *
 * This hook separates business logic from presentation, making form logic
 * reusable and testable independently of the UI component.
 */

import { useState } from 'react';
import { ValidationService } from '../services/ValidationService';
import { MONTH_OPTIONS, DEFAULT_DAYS } from './FormConstants';

/**
 * Form field values
 */
export interface ItineraryFormValues {
  destination: string;
  partyInfo: string;
  month: string;
  days: number;
}

/**
 * Form field setters
 */
export interface ItineraryFormSetters {
  setDestination: (value: string) => void;
  setPartyInfo: (value: string) => void;
  setMonth: (value: string) => void;
  setDays: (value: number) => void;
}

/**
 * Form errors (field name -> error message)
 */
export type ItineraryFormErrors = Record<string, string>;

/**
 * Return type for useItineraryForm hook
 */
export interface UseItineraryFormReturn {
  /** Current form field values */
  values: ItineraryFormValues;

  /** Setters for each form field */
  setters: ItineraryFormSetters;

  /** Current validation errors (empty if no errors) */
  errors: ItineraryFormErrors;

  /** Validates current form values and updates error state */
  validate: () => boolean;

  /** Resets form to initial state */
  reset: () => void;

  /** Available month options */
  MONTH_OPTIONS: readonly string[];
}

/**
 * Custom hook for managing itinerary form state and validation
 *
 * Provides form state management, validation using ValidationService,
 * and reset functionality. Keeps business logic separate from presentation.
 *
 * @returns Form values, setters, errors, and utility methods
 *
 * @example
 * ```tsx
 * function MyForm() {
 *   const { values, setters, errors, validate, reset } = useItineraryForm();
 *
 *   const handleSubmit = () => {
 *     if (validate()) {
 *       // Submit form data
 *       console.log(values);
 *     }
 *   };
 *
 *   return (
 *     <form>
 *       <input value={values.destination} onChange={e => setters.setDestination(e.target.value)} />
 *       {errors.destination && <span>{errors.destination}</span>}
 *     </form>
 *   );
 * }
 * ```
 */
export const useItineraryForm = (): UseItineraryFormReturn => {
  // Form field state
  const [destination, setDestination] = useState<string>('');
  const [partyInfo, setPartyInfo] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [days, setDays] = useState<number>(DEFAULT_DAYS);

  // Validation errors state
  const [errors, setErrors] = useState<ItineraryFormErrors>({});

  // Validation service instance
  const validationService = new ValidationService();

  /**
   * Validates current form values
   *
   * Uses ValidationService to validate form data against ItineraryRequestSchema.
   * Updates error state with validation errors.
   *
   * @returns True if validation passes, false otherwise
   */
  const validate = (): boolean => {
    const formData = {
      destination,
      partyInfo,
      month,
      days
    };

    const result = validationService.validateFormInput(formData);

    if (result.success) {
      // Clear errors on successful validation
      setErrors({});
      return true;
    } else {
      // Convert error array to field-specific errors
      const newErrors: ItineraryFormErrors = {};

      if (result.errors) {
        result.errors.forEach(error => {
          // Parse errors in format "fieldName: message"
          const colonIndex = error.indexOf(':');
          if (colonIndex > -1) {
            const field = error.substring(0, colonIndex).trim();
            const message = error.substring(colonIndex + 1).trim();
            newErrors[field] = message;
          } else {
            // Fallback for errors without field prefix
            newErrors['general'] = error;
          }
        });
      }

      setErrors(newErrors);
      return false;
    }
  };

  /**
   * Resets form to initial state
   *
   * Clears all form fields and validation errors.
   */
  const reset = (): void => {
    setDestination('');
    setPartyInfo('');
    setMonth('');
    setDays(DEFAULT_DAYS);
    setErrors({});
  };

  // Return hook interface
  return {
    values: {
      destination,
      partyInfo,
      month,
      days
    },
    setters: {
      setDestination,
      setPartyInfo,
      setMonth,
      setDays
    },
    errors,
    validate,
    reset,
    MONTH_OPTIONS
  };
};
