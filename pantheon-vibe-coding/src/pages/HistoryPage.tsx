import React, { useState, useEffect } from 'react';
import type { ItineraryResponse } from '../types';
import { LocalStorageService } from '../services/LocalStorageService';
import { ErrorHandlerService } from '../services/ErrorHandlerService';
import { HistoryItem } from '../components/HistoryItem';
import MarkdownItineraryDisplay from '../components/ItineraryDisplay/MarkdownItineraryDisplay';
import './HistoryPage.css';

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<ItineraryResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [selectedItinerary, setSelectedItinerary] = useState<ItineraryResponse | null>(null);

  const storageService = new LocalStorageService();
  const errorHandler = new ErrorHandlerService();

  useEffect(() => {
    const loadHistory = () => {
      setLoading(true);
      setError('');

      try {
        const historyData = storageService.getHistory();
        setHistory(historyData);
      } catch (err) {
        errorHandler.logError(err, 'Loading History');
        const errorMessage = errorHandler.handleApiError(err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  // Handle Escape key to close detail view
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedItinerary) {
        setSelectedItinerary(null);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [selectedItinerary]);

  // Handle itinerary selection
  const handleSelectItinerary = (itinerary: ItineraryResponse) => {
    setSelectedItinerary(itinerary);
    // Scroll to top to show details
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle itinerary deletion
  const handleDeleteItinerary = (index: number) => {
    try {
      storageService.deleteFromHistory(index);

      // Update local state by filtering out deleted item
      const updatedHistory = history.filter((_, i) => i !== index);
      setHistory(updatedHistory);

      // Clear selected itinerary if it was the deleted one
      if (selectedItinerary && history[index] === selectedItinerary) {
        setSelectedItinerary(null);
      }
    } catch (err) {
      errorHandler.logError(err, 'Deleting History Item');
      const errorMessage = errorHandler.handleApiError(err);
      setError(errorMessage);
    }
  };

  // Loading state
  const renderLoadingState = () => (
    <div className="loading-state">
      <div className="loading-spinner" />
      <p className="loading-text" aria-live="polite">Loading history...</p>
    </div>
  );

  // Empty state
  const renderEmptyState = () => (
    <div className="empty-state">
      <h2>No itineraries yet</h2>
      <p>Generate your first itinerary to see it here</p>
      <a href="/generate" className="empty-state-cta">
        Generate Itinerary
      </a>
    </div>
  );

  // Error state
  const renderErrorState = () => (
    <div className="error-state" role="alert">
      <h3>Error Loading History</h3>
      <p>{error}</p>
      <a href="/" className="error-state-link">
        Return Home
      </a>
    </div>
  );

  // History list rendering
  const renderHistoryList = () => (
    <div className="history-grid">
      {history.map((itinerary, index) => (
        <HistoryItem
          key={index}
          itinerary={itinerary}
          index={index}
          onSelect={handleSelectItinerary}
          onDelete={handleDeleteItinerary}
        />
      ))}
    </div>
  );

  // Handle closing detail view
  const handleCloseDetail = () => {
    setSelectedItinerary(null);
  };

  // Selected itinerary detail view
  const renderSelectedItinerary = () => {
    if (!selectedItinerary) return null;

    return (
      <section
        className="itinerary-detail"
        role="region"
        aria-label="Selected itinerary details"
      >
        <button
          onClick={handleCloseDetail}
          className="close-detail-button"
          aria-label="Close detail view"
        >
          Back to History
        </button>
        <MarkdownItineraryDisplay itinerary={selectedItinerary} />
      </section>
    );
  };

  return (
    <div className="history-page-container">
      <h1 className="history-page-title">Itinerary History</h1>

      {/* Selected itinerary detail view displayed at top */}
      {selectedItinerary && renderSelectedItinerary()}

      {loading && renderLoadingState()}
      {error && renderErrorState()}
      {!loading && history.length === 0 && !error && renderEmptyState()}
      {!loading && history.length > 0 && !error && renderHistoryList()}
    </div>
  );
};

export default HistoryPage;
