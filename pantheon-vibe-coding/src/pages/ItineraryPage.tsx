import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useItinerary } from '../context/ItineraryContext';
import MarkdownItineraryDisplay from '../components/ItineraryDisplay/MarkdownItineraryDisplay';
import ErrorBoundary from '../components/ErrorBoundary';
import './ItineraryPage.css';

const ItineraryPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentItinerary } = useItinerary();

  // Handle print functionality
  const handlePrint = () => {
    window.print();
  };

  // Display message if no itinerary exists
  if (!currentItinerary) {
    return (
      <div className="empty-state">
        <h1>Your Travel Itinerary</h1>
        <p>No itinerary available. Please generate one first to see your personalized travel plan.</p>
        <button className="action-button primary" onClick={() => navigate('/generate')}>
          Generate Your First Itinerary
        </button>
      </div>
    );
  }

  // Display the itinerary using ItineraryDisplay component with error boundary
  return (
    <div className="itinerary-page">
      <div className="itinerary-page-header">
        <h1 className="itinerary-page-title">Your Travel Itinerary</h1>
        <div className="itinerary-actions">
          {/* Pass navigation state to indicate user-initiated navigation, preventing
              automatic redirect back to itinerary page */}
          <button
            className="action-button"
            onClick={() => navigate('/generate', { state: { fromItineraryPage: true } })}
            aria-label="Go back to form to generate new itinerary"
          >
            Back to Form
          </button>
          <button
            className="action-button"
            onClick={handlePrint}
            aria-label="Print this itinerary"
          >
            Print
          </button>
        </div>
      </div>
      <ErrorBoundary>
        <MarkdownItineraryDisplay itinerary={currentItinerary} />
      </ErrorBoundary>
    </div>
  );
};

export default ItineraryPage;
