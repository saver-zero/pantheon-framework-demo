import { IItineraryService } from '../services/api/IItineraryService';
import ItineraryDisplay from './ItineraryDisplay';

interface HistoryViewProps {
  apiClient: IItineraryService;
}

const HistoryView: React.FC<HistoryViewProps> = ({ apiClient }) => {
  const history = apiClient.getHistory();

  if (history.length === 0) {
    return (
      <div className="history-view">
        <h1>History</h1>
        <p className="empty-message">No itineraries generated yet. Create your first itinerary to see it here.</p>
      </div>
    );
  }

  return (
    <div className="history-view">
      <h1>History</h1>
      <p className="history-count">Showing {history.length} of last 10 itineraries</p>

      <div className="history-list">
        {history.map((itinerary, index) => (
          <div key={index} className="history-item">
            <ItineraryDisplay itinerary={itinerary} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryView;
