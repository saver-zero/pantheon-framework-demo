import type { ItineraryResponse } from '../types/itinerary';

interface HistoryViewProps {
  history: ItineraryResponse[];
  onSelectItinerary: (itinerary: ItineraryResponse) => void;
}

export function HistoryView({ history, onSelectItinerary }: HistoryViewProps) {
  if (history.length === 0) {
    return (
      <div className="history-view">
        <h3>History</h3>
        <p className="empty-history">
          No itineraries generated yet. Create your first itinerary above!
        </p>
      </div>
    );
  }

  return (
    <div className="history-view">
      <h3>History</h3>
      <p className="history-subtitle">Last {history.length} itineraries</p>
      <div className="history-list">
        {history.map((itinerary, index) => (
          <HistoryItem
            key={index}
            itinerary={itinerary}
            onClick={() => onSelectItinerary(itinerary)}
          />
        ))}
      </div>
    </div>
  );
}

function HistoryItem({
  itinerary,
  onClick,
}: {
  itinerary: ItineraryResponse;
  onClick: () => void;
}) {
  return (
    <button className="history-item" onClick={onClick}>
      <div className="history-item-main">
        <span className="history-destination">{itinerary.destination}</span>
        <span className="history-duration">
          {itinerary.days} {itinerary.days === 1 ? 'day' : 'days'}
        </span>
      </div>
      <div className="history-item-details">
        <span className="history-party">{itinerary.party_info}</span>
        <span className="history-month">{itinerary.month}</span>
      </div>
    </button>
  );
}
