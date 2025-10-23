/**
 * HistoryItem Component
 *
 * Renders a single history entry in summary format displaying key information
 * (destination, party info, month, days) and provides interactive elements
 * for selection and deletion.
 */

import React from 'react';
import { ItineraryResponse } from '../types';
import './HistoryItem.css';

/**
 * Props interface for HistoryItem component
 */
export interface HistoryItemProps {
  itinerary: ItineraryResponse;
  index: number;
  onSelect: (itinerary: ItineraryResponse) => void;
  onDelete: (index: number) => void;
}

/**
 * HistoryItem component renders a single history entry with summary information
 */
export const HistoryItem: React.FC<HistoryItemProps> = ({
  itinerary,
  index,
  onSelect,
  onDelete,
}) => {
  const { destination, party_info, month, days } = itinerary;

  const handleClick = () => {
    onSelect(itinerary);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const confirmed = window.confirm(
      `Are you sure you want to delete this itinerary for ${destination}?`
    );
    if (confirmed) {
      onDelete(index);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="history-item"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View itinerary for ${destination}, ${month}, ${days} days`}
    >
      <div className="history-item__content">
        <h3 className="history-item__destination">{destination}</h3>
        <div className="history-item__details">
          <span className="history-item__detail">
            <strong>Party:</strong> {party_info}
          </span>
          <span className="history-item__detail">
            <strong>Month:</strong> {month}
          </span>
          <span className="history-item__detail">
            <strong>Duration:</strong> {days} {days === 1 ? 'day' : 'days'}
          </span>
        </div>
      </div>
      <button
        className="history-item__delete-btn"
        onClick={handleDelete}
        aria-label={`Delete ${destination} itinerary`}
        type="button"
      >
        Delete
      </button>
    </div>
  );
};

export default HistoryItem;
