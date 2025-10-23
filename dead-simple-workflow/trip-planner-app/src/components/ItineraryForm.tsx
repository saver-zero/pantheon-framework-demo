import { useState } from 'react';
import './ItineraryForm.css';

interface ItineraryFormProps {
  onSubmit: (destination: string, partyInfo: string, month: string, days: number) => void;
  isLoading?: boolean;
}

const ItineraryForm: React.FC<ItineraryFormProps> = ({ onSubmit, isLoading = false }) => {
  const [destination, setDestination] = useState('');
  const [partyInfo, setPartyInfo] = useState('');
  const [month, setMonth] = useState('January');
  const [days, setDays] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(destination, partyInfo, month, days);
  };

  return (
    <form onSubmit={handleSubmit} className="itinerary-form">
      <div className="form-group">
        <label htmlFor="destination">Destination</label>
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="e.g., Tokyo, Paris, Disney World"
          required
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="partyInfo">Party Information</label>
        <input
          type="text"
          id="partyInfo"
          value={partyInfo}
          onChange={(e) => setPartyInfo(e.target.value)}
          placeholder="e.g., family of four with 12-year-old boy"
          required
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="month">Month</label>
        <select
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          disabled={isLoading}
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="days">Trip Duration (days)</label>
        <input
          type="number"
          id="days"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          min={1}
          max={30}
          required
          disabled={isLoading}
        />
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Itinerary'}
      </button>
    </form>
  );
};

export default ItineraryForm;
