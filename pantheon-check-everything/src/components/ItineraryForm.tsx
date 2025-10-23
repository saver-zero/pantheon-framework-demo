import React, { useState } from 'react';
import { useItineraryService } from '../services/ItineraryServiceContext';
import {
  validateDestination,
  validatePartyInfo,
  validateMonth,
  validateDays,
} from '../utils/formValidation';
import { ErrorDisplay } from './ErrorDisplay';

// FormData interface for internal state
interface FormData {
  destination: string;
  partyInfo: string;
  month: string;
  days: string;
}

// ValidationErrors interface for error state
interface ValidationErrors {
  destination?: string;
  partyInfo?: string;
  month?: string;
  days?: string;
}

// Component props interface
interface ItineraryFormProps {
  onGenerate: (markdown: string) => Promise<void>;
  className?: string;
}

export const ItineraryForm: React.FC<ItineraryFormProps> = ({ onGenerate, className }) => {
  // Form field state
  const [destination, setDestination] = useState<string>('');
  const [partyInfo, setPartyInfo] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [days, setDays] = useState<string>('1');

  // Loading and error state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Get service instance from context
  const service = useItineraryService();

  // Helper to update single field error
  const setFieldError = (field: keyof ValidationErrors, errorMessage: string | null) => {
    setValidationErrors((prev) => {
      if (errorMessage === null) {
        const { [field]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [field]: errorMessage };
    });
  };

  // onBlur validation handlers
  const handleDestinationBlur = () => {
    const errorMessage = validateDestination(destination);
    setFieldError('destination', errorMessage);
  };

  const handlePartyInfoBlur = () => {
    const errorMessage = validatePartyInfo(partyInfo);
    setFieldError('partyInfo', errorMessage);
  };

  const handleMonthBlur = () => {
    const errorMessage = validateMonth(month);
    setFieldError('month', errorMessage);
  };

  const handleDaysBlur = () => {
    const errorMessage = validateDays(days);
    setFieldError('days', errorMessage);
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous error state on new submission attempt
    setError(null);

    // Validate all fields
    const destinationError = validateDestination(destination);
    const partyInfoError = validatePartyInfo(partyInfo);
    const monthError = validateMonth(month);
    const daysError = validateDays(days);

    // Aggregate all validation errors
    const errors: ValidationErrors = {};
    if (destinationError) errors.destination = destinationError;
    if (partyInfoError) errors.partyInfo = partyInfoError;
    if (monthError) errors.month = monthError;
    if (daysError) errors.days = daysError;

    // If any errors exist, update state and return early
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Clear validation errors if all fields are valid
    setValidationErrors({});

    // Set loading state before service call
    setIsLoading(true);

    try {
      // Parse days string to number
      const daysNumber = parseInt(days, 10);

      // Call service.generateItinerary with validated data
      // Returns markdown string instead of Itinerary object
      const markdown = await service.generateItinerary(
        destination,
        partyInfo,
        month,
        daysNumber
      );

      // Invoke onGenerate callback with generated markdown
      await onGenerate(markdown);

    } catch (err) {
      // Handle errors from service or onGenerate callback
      if (err instanceof Error) {
        setError(`Failed to generate itinerary: ${err.message}`);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      // Always set loading to false in finally block
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className ? className : 'itinerary-form'}>
      <div className="form-field form-field--destination">
        <label htmlFor="destination" className="form-label">
          Destination
        </label>
        <input
          type="text"
          id="destination"
          className="form-input"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          onBlur={handleDestinationBlur}
          aria-invalid={!!validationErrors.destination}
          aria-describedby={validationErrors.destination ? 'destination-error' : undefined}
          required
        />
        {validationErrors.destination && (
          <span id="destination-error" className="form-error" role="alert">
            {validationErrors.destination}
          </span>
        )}
      </div>

      <div className="form-field form-field--party-info">
        <label htmlFor="partyInfo" className="form-label">
          Party Info
        </label>
        <input
          type="text"
          id="partyInfo"
          className="form-input"
          value={partyInfo}
          onChange={(e) => setPartyInfo(e.target.value)}
          onBlur={handlePartyInfoBlur}
          aria-invalid={!!validationErrors.partyInfo}
          aria-describedby={validationErrors.partyInfo ? 'partyInfo-error' : undefined}
          required
        />
        {validationErrors.partyInfo && (
          <span id="partyInfo-error" className="form-error" role="alert">
            {validationErrors.partyInfo}
          </span>
        )}
      </div>

      <div className="form-field form-field--month">
        <label htmlFor="month" className="form-label">
          Month
        </label>
        <input
          type="text"
          id="month"
          className="form-input"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          onBlur={handleMonthBlur}
          aria-invalid={!!validationErrors.month}
          aria-describedby={validationErrors.month ? 'month-error' : undefined}
          required
        />
        {validationErrors.month && (
          <span id="month-error" className="form-error" role="alert">
            {validationErrors.month}
          </span>
        )}
      </div>

      <div className="form-field form-field--days">
        <label htmlFor="days" className="form-label">
          Days
        </label>
        <input
          type="number"
          id="days"
          className="form-input"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          onBlur={handleDaysBlur}
          aria-invalid={!!validationErrors.days}
          aria-describedby={validationErrors.days ? 'days-error' : undefined}
          min="1"
          required
        />
        {validationErrors.days && (
          <span id="days-error" className="form-error" role="alert">
            {validationErrors.days}
          </span>
        )}
      </div>

      {error && <ErrorDisplay errorMessage={error} errorType="error" />}

      <button type="submit" className="btn btn-primary form-submit" disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Itinerary'}
      </button>
    </form>
  );
};
