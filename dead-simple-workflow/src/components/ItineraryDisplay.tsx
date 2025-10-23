import { ItineraryResponse } from '../types/itinerary';
import DayCard from './DayCard';

interface ItineraryDisplayProps {
  itinerary: ItineraryResponse;
}

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ itinerary }) => {
  return (
    <div className="itinerary-display">
      <div className="itinerary-header">
        <h1>{itinerary.destination}</h1>
        <p className="party-info">{itinerary.party_info}</p>
        <p className="trip-details">
          {itinerary.days} {itinerary.days === 1 ? 'day' : 'days'} in {itinerary.month}
        </p>
      </div>

      <div className="days">
        {itinerary.itinerary.map((day) => (
          <DayCard key={day.day} day={day} />
        ))}
      </div>
    </div>
  );
};

export default ItineraryDisplay;
