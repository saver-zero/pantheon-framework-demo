import { useState } from 'react';
import type { FormEvent } from 'react';
import { MONTHS } from '../types/itinerary';
import type { Month } from '../types/itinerary';

interface ItineraryFormProps {
  onSubmit: (
    destination: string,
    partyInfo: string,
    month: string,
    days: number
  ) => void;
  isLoading: boolean;
}

export function ItineraryForm({ onSubmit, isLoading }: ItineraryFormProps) {
  const [destination, setDestination] = useState('');
  const [partyInfo, setPartyInfo] = useState('');
  const [month, setMonth] = useState<Month>(MONTHS[0]);
  const [days, setDays] = useState(3);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!destination.trim()) {
      newErrors.destination = 'Destination is required';
    }

    if (!partyInfo.trim()) {
      newErrors.partyInfo = 'Party information is required';
    }

    if (days < 1 || days > 30) {
      newErrors.days = 'Trip duration must be between 1 and 30 days';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(destination, partyInfo, month, days);
  };

  return (
    <form onSubmit={handleSubmit} className="itinerary-form">
      <div className="form-group">
        <label htmlFor="destination">
          Destination
          <span className="required">*</span>
        </label>
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="e.g., Tokyo, Paris, France, Disney World"
          disabled={isLoading}
          className={errors.destination ? 'error' : ''}
        />
        {errors.destination && (
          <span className="error-message">{errors.destination}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="partyInfo">
          Party Information
          <span className="required">*</span>
        </label>
        <input
          type="text"
          id="partyInfo"
          value={partyInfo}
          onChange={(e) => setPartyInfo(e.target.value)}
          placeholder="e.g., late 20s Gen Z couple, family of four with 12-year-old boy"
          disabled={isLoading}
          className={errors.partyInfo ? 'error' : ''}
        />
        {errors.partyInfo && (
          <span className="error-message">{errors.partyInfo}</span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="month">
            Month of Travel
            <span className="required">*</span>
          </label>
          <select
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value as Month)}
            disabled={isLoading}
          >
            {MONTHS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="days">
            Trip Duration (days)
            <span className="required">*</span>
          </label>
          <input
            type="number"
            id="days"
            min="1"
            max="30"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value, 10))}
            disabled={isLoading}
            className={errors.days ? 'error' : ''}
          />
          {errors.days && <span className="error-message">{errors.days}</span>}
        </div>
      </div>

      <button type="submit" className="submit-button" disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Itinerary'}
      </button>
    </form>
  );
}
