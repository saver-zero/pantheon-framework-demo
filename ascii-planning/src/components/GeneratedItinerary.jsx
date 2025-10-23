import ReactMarkdown from 'react-markdown';

export function GeneratedItinerary({ itinerary, onNewItinerary }) {
  const { destination, partyInfo, travelMonth, days, itineraryMarkdown, generatedAt } = itinerary;

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="generated-itinerary">
      <div className="itinerary-header">
        <div className="itinerary-header-content">
          <h2>{destination} - {days} Day{days > 1 ? 's' : ''}</h2>
          <div className="itinerary-metadata">
            <p><strong>Party:</strong> {partyInfo}</p>
            <p><strong>Travel Month:</strong> {travelMonth}</p>
            <p className="generated-date">Generated: {formatDate(generatedAt)}</p>
          </div>
        </div>
        <div className="itinerary-header-actions">
          <button
            className="new-itinerary-button"
            onClick={onNewItinerary}
          >
            New Itinerary
          </button>
        </div>
      </div>

      <div className="itinerary-content">
        <ReactMarkdown>{itineraryMarkdown}</ReactMarkdown>
      </div>
    </div>
  );
}
