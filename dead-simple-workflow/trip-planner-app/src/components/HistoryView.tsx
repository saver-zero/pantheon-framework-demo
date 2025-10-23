import type { IItineraryService } from '../services/api/IItineraryService';
import MarkdownItineraryDisplay from './MarkdownItineraryDisplay';
import './HistoryView.css';

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
        {history.map((entry, index) => (
          <div key={index} className="history-item">
            <div className="history-metadata">
              <h3>{entry.destination}</h3>
              <p className="metadata-details">
                {entry.partyInfo} • {entry.days} days • {entry.month} • Generated: {new Date(entry.generatedAt).toLocaleDateString()}
              </p>
            </div>
            <MarkdownItineraryDisplay markdown={entry.markdown} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryView;
