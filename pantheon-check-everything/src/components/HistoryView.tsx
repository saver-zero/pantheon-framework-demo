import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useItineraryService } from '../services/ItineraryServiceContext';
import { ErrorDisplay } from './ErrorDisplay';
import { ItineraryDisplay } from './ItineraryDisplay';
import { extractItineraryMetadata } from '../utils/markdownParser';

/**
 * HistoryView Component
 *
 * Displays a list of previously generated itineraries from local storage.
 * Implements list-detail pattern where users can select an itinerary from the list
 * to view its full details using the ItineraryDisplay component.
 *
 * Features:
 * - Retrieves history from IItineraryService on component mount
 * - Displays empty state when no history exists
 * - Shows list of itinerary summaries with metadata (destination, days, month)
 * - Allows selection to view full itinerary details
 * - Provides delete functionality with confirmation
 * - Handles storage errors gracefully with ErrorDisplay
 */
export const HistoryView: React.FC = () => {
  // State management
  const [history, setHistory] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Service access via context
  const service = useItineraryService();

  // Memoized metadata extraction to prevent redundant regex operations
  const historyMetadata = useMemo(() => {
    return history.map(markdown => extractItineraryMetadata(markdown));
  }, [history]);

  // Retrieve history on component mount
  useEffect(() => {
    try {
      setIsLoading(true);
      const historyData = service.getHistory();
      setHistory(historyData);
    } catch (err) {
      setError('Failed to load history. Please try again later.');
      console.error('Error loading history:', err);
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  // Handle delete with confirmation and storage persistence
  const handleDelete = useCallback((index: number) => {
    const metadata = historyMetadata[index];
    const confirmed = window.confirm(
      `Are you sure you want to delete the itinerary for ${metadata.destination}?`
    );

    if (confirmed) {
      try {
        // Attempt storage update first to ensure consistency
        service.deleteFromHistory(index);
        
        // Update local state only after successful storage update
        const updatedHistory = history.filter((_, i) => i !== index);
        setHistory(updatedHistory);

        // Reset selection if deleted item was selected
        if (selectedIndex === index) {
          setSelectedIndex(null);
        } else if (selectedIndex !== null && selectedIndex > index) {
          // Adjust selected index if it was after the deleted item
          setSelectedIndex(selectedIndex - 1);
        }
      } catch (err) {
        setError('Failed to delete itinerary. Please try again.');
        console.error('Error deleting itinerary:', err);
      }
    }
  }, [history, historyMetadata, selectedIndex, service]);

  // Handle keyboard events for accessibility
  const handleListItemKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedIndex(index);
    }
  }, []);

  const handleDeleteKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      handleDelete(index);
    }
  }, [handleDelete]);

  // Error state rendering
  if (error) {
    return <ErrorDisplay errorMessage={error} />;
  }

  // Loading state rendering
  if (isLoading) {
    return (
      <div className="history-empty-state">
        <p>Loading history...</p>
      </div>
    );
  }

  // Detail view rendering when item is selected
  if (selectedIndex !== null && history[selectedIndex]) {
    return (
      <div className="history-detail-container">
        <button
          onClick={() => setSelectedIndex(null)}
          className="btn btn-primary"
          aria-label="Back to History"
        >
          Back to History
        </button>
        <ItineraryDisplay markdown={history[selectedIndex]} />
      </div>
    );
  }

  // Empty state rendering
  if (history.length === 0) {
    return (
      <div className="history-empty-state">
        <p>No itineraries saved yet. Generate your first trip plan to see it here!</p>
      </div>
    );
  }

  // List view rendering
  return (
    <div className="history-container">
      <h2 className="history-heading">Saved Itineraries</h2>
      <ul className="history-list">
        {history.map((_, index) => {
          const metadata = historyMetadata[index];
          const position = index === 0 ? 'Most recent' : `#${index + 1}`;

          return (
            <li
              key={index}
              onClick={() => setSelectedIndex(index)}
              onKeyDown={(e) => handleListItemKeyDown(index, e)}
              className="history-item"
              role="button"
              tabIndex={0}
              aria-label={`View itinerary for ${metadata.destination}`}
            >
              <div className="history-item__container">
                <div className="history-item__header">
                  <strong className="history-item__destination">{metadata.destination}</strong>
                  <span className="history-item__position">{position}</span>
                </div>
                <div className="history-item__details">
                  {metadata.days && <span>{metadata.days} days</span>}
                  {metadata.month && <span> • {metadata.month}</span>}
                  {metadata.timestamp && <span> • Generated: {metadata.timestamp}</span>}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering list item click
                    handleDelete(index);
                  }}
                  onKeyDown={(e) => handleDeleteKeyDown(index, e)}
                  className="btn btn-danger"
                  aria-label={`Delete itinerary for ${metadata.destination}`}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};