/**
 * ItineraryDisplay Component (DEPRECATED)
 *
 * Main component that renders the complete itinerary structure including metadata
 * and day-by-day breakdown.
 *
 * @deprecated This component is deprecated as of T012. Use MarkdownItineraryDisplay instead.
 * This component expects the itinerary field to be a Day[] array (structured JSON).
 * The new backend returns markdown strings, so this component is only maintained for:
 * - Backward compatibility with historical data in local storage
 * - Testing purposes (ItineraryTestPage)
 *
 * For all new itineraries, use MarkdownItineraryDisplay which renders markdown content.
 *
 * @see MarkdownItineraryDisplay for the current implementation
 */

import React from 'react';
import { ItineraryResponse } from '../../types';
import DayDisplay from './DayDisplay';
import './ItineraryDisplay.css';

/**
 * Props interface for ItineraryDisplay component
 *
 * @deprecated Use MarkdownItineraryDisplay instead
 */
interface ItineraryDisplayProps {
  itinerary: ItineraryResponse;
}

/**
 * ItineraryDisplay component renders the complete generated itinerary
 *
 * @deprecated Use MarkdownItineraryDisplay for new implementations
 * @param {ItineraryDisplayProps} props - Component props
 * @returns {JSX.Element} Rendered component with structured day display
 */
const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ itinerary }) => {
  const { destination, party_info, month, days, itinerary: itineraryDays } = itinerary;

  return (
    <section className="itinerary-display">
      <header className="itinerary-display__metadata">
        <div className="itinerary-display__metadata-item">
          <div className="itinerary-display__metadata-label">Destination</div>
          <div className="itinerary-display__metadata-value">{destination}</div>
        </div>
        <div className="itinerary-display__metadata-item">
          <div className="itinerary-display__metadata-label">Party</div>
          <div className="itinerary-display__metadata-value">{party_info}</div>
        </div>
        <div className="itinerary-display__metadata-item">
          <div className="itinerary-display__metadata-label">Month</div>
          <div className="itinerary-display__metadata-value">{month}</div>
        </div>
        <div className="itinerary-display__metadata-item">
          <div className="itinerary-display__metadata-label">Duration</div>
          <div className="itinerary-display__metadata-value">{days} {days === 1 ? 'day' : 'days'}</div>
        </div>
      </header>
      <main className="itinerary-display__days">
        {itineraryDays.map((day, index) => (
          <DayDisplay key={`day-${day.day}-${index}`} day={day} />
        ))}
      </main>
    </section>
  );
};

export default ItineraryDisplay;
