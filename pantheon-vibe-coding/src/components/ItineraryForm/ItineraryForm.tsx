/**
 * ItineraryForm Component
 *
 * Presentation component for itinerary generation form.
 * Collects user inputs for destination, party information, month of travel, and trip duration.
 *
 * Uses useItineraryForm hook for form state management and validation.
 * Uses useItinerary context for triggering itinerary generation and accessing loading states.
 *
 * Features:
 * - Client-side validation with field-specific error messages
 * - Loading state display during generation
 * - Error message display for API errors
 * - Form reset after successful submission
 */

import React from 'react';
import { useItineraryForm } from '../../hooks/useItineraryForm';
import { useItinerary } from '../../context/ItineraryContext';
import { MIN_DAYS, MAX_DAYS } from '../../hooks/FormConstants';
import './ItineraryForm.css';

/**
 * ItineraryForm component
 *
 * Renders the itinerary generation form with four input fields:
 * 1. Destination (text input)
 * 2. Party Information (text input)
 * 3. Month of Travel (select dropdown)
 * 4. Trip Duration (number input)
 *
 * @example
 * ```tsx
 * <ItineraryForm />
 * ```
 */
export const ItineraryForm: React.FC = () => {
  // Form state management hook
  const { values, setters, errors, validate, reset, MONTH_OPTIONS } = useItineraryForm();

  // Context for API operations and global state
  const { generateItinerary, isLoading, error: contextError } = useItinerary();

  /**
   * Handles form submission
   *
   * Validates form data, triggers itinerary generation, and resets form on success.
   * Prevents default form submission behavior.
   *
   * @param e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form inputs
    if (!validate()) {
      return;
    }

    // Build itinerary request from form values
    const request = {
      destination: values.destination,
      partyInfo: values.partyInfo,
      month: values.month,
      days: values.days
    };

    // Trigger itinerary generation
    await generateItinerary(request);

    // Reset form on successful generation (only if no error)
    if (!contextError) {
      reset();
    }
  };

  return (
    <div className="itinerary-form-container">
      <form className="itinerary-form" onSubmit={handleSubmit}>
        <h2>Plan Your Trip</h2>

        {/* Destination input */}
        <div className="form-field">
          <label htmlFor="destination">Destination</label>
          <input
            id="destination"
            type="text"
            value={values.destination}
            onChange={(e) => setters.setDestination(e.target.value)}
            placeholder="e.g., Paris, France"
            disabled={isLoading}
            aria-invalid={!!errors.destination}
            aria-describedby={errors.destination ? 'destination-error' : undefined}
          />
          {errors.destination && (
            <span id="destination-error" className="error-message">
              {errors.destination}
            </span>
          )}
        </div>

        {/* Party information input */}
        <div className="form-field">
          <label htmlFor="partyInfo">Party Information</label>
          <input
            id="partyInfo"
            type="text"
            value={values.partyInfo}
            onChange={(e) => setters.setPartyInfo(e.target.value)}
            placeholder="e.g., 2 adults and 1 child (age 8)"
            disabled={isLoading}
            aria-invalid={!!errors.partyInfo}
            aria-describedby={errors.partyInfo ? 'partyInfo-error' : undefined}
          />
          {errors.partyInfo && (
            <span id="partyInfo-error" className="error-message">
              {errors.partyInfo}
            </span>
          )}
        </div>

        {/* Month selection dropdown */}
        <div className="form-field">
          <label htmlFor="month">Month of Travel</label>
          <select
            id="month"
            value={values.month}
            onChange={(e) => setters.setMonth(e.target.value)}
            disabled={isLoading}
            aria-invalid={!!errors.month}
            aria-describedby={errors.month ? 'month-error' : undefined}
          >
            <option value="">Select a month</option>
            {MONTH_OPTIONS.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          {errors.month && (
            <span id="month-error" className="error-message">
              {errors.month}
            </span>
          )}
        </div>

        {/* Trip duration input */}
        <div className="form-field">
          <label htmlFor="days">Trip Duration (days)</label>
          <input
            id="days"
            type="number"
            value={values.days}
            onChange={(e) => setters.setDays(parseInt(e.target.value, 10) || 0)}
            min={MIN_DAYS}
            max={MAX_DAYS}
            disabled={isLoading}
            aria-invalid={!!errors.days}
            aria-describedby={errors.days ? 'days-error' : undefined}
          />
          {errors.days && (
            <span id="days-error" className="error-message">
              {errors.days}
            </span>
          )}
        </div>

        {/* Context error display */}
        {contextError && (
          <div className="context-error" role="alert">
            {contextError}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="submit-button"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Itinerary'}
        </button>

        {/* Loading indicator */}
        {isLoading && (
          <div className="loading-indicator" role="status" aria-live="polite">
            <div className="spinner"></div>
            <p>Creating your personalized itinerary...</p>
          </div>
        )}
      </form>
    </div>
  );
};
