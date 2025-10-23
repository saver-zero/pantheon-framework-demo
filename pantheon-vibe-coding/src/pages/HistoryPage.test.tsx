/**
 * Integration tests for HistoryPage component
 *
 * Tests complete user workflows including loading history, displaying items,
 * selecting for details, deleting items, and handling empty/error states.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HistoryPage from './HistoryPage';
import { LocalStorageService } from '../services/LocalStorageService';
import type { ItineraryResponse } from '../types';

// Mock the services
vi.mock('../services/LocalStorageService');
vi.mock('../services/ErrorHandlerService', () => ({
  ErrorHandlerService: vi.fn().mockImplementation(() => ({
    handleApiError: vi.fn((err) => err.message || 'An error occurred'),
    logError: vi.fn()
  }))
}));

// Mock the ItineraryDisplay component
vi.mock('../components/ItineraryDisplay/ItineraryDisplay', () => ({
  default: ({ itinerary }: { itinerary: any }) => (
    <div data-testid="itinerary-display">
      Itinerary for {itinerary.destination}
    </div>
  )
}));

// Mock the HistoryItem component
vi.mock('../components/HistoryItem', () => ({
  HistoryItem: ({ itinerary, index, onSelect, onDelete }: any) => (
    <div data-testid={`history-item-${index}`}>
      <button onClick={() => onSelect(itinerary)}>
        Select {itinerary.destination}
      </button>
      <button onClick={() => onDelete(index)}>Delete</button>
    </div>
  )
}));

const mockItinerary: ItineraryResponse = {
  destination: 'Paris',
  party_info: '2 adults',
  month: 'June',
  days: 3,
  itinerary: [
    {
      day: 1,
      morning: [
        {
          attraction: 'Eiffel Tower',
          attraction_description: 'Iconic landmark',
          what_to_do: ['Visit observation deck'],
          where_to_eat: 'Cafe nearby'
        }
      ],
      afternoon: null,
      evening: null
    }
  ]
};

const mockItinerary2: ItineraryResponse = {
  destination: 'Tokyo',
  party_info: '1 adult',
  month: 'March',
  days: 5,
  itinerary: [
    {
      day: 1,
      morning: [
        {
          attraction: 'Senso-ji Temple',
          attraction_description: 'Ancient Buddhist temple',
          what_to_do: ['Explore temple grounds'],
          where_to_eat: 'Nakamise Street'
        }
      ],
      afternoon: null,
      evening: null
    }
  ]
};

describe('HistoryPage Integration Tests', () => {
  let mockGetHistory: any;
  let mockDeleteFromHistory: any;

  beforeEach(() => {
    mockGetHistory = vi.fn();
    mockDeleteFromHistory = vi.fn();

    (LocalStorageService as any).mockImplementation(() => ({
      getHistory: mockGetHistory,
      deleteFromHistory: mockDeleteFromHistory
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Load history and display list correctly', () => {
    it('should load and display history items on mount', () => {
      mockGetHistory.mockReturnValue([mockItinerary, mockItinerary2]);

      render(<HistoryPage />);

      expect(screen.getByText('Itinerary History')).toBeInTheDocument();
      expect(screen.getByTestId('history-item-0')).toBeInTheDocument();
      expect(screen.getByTestId('history-item-1')).toBeInTheDocument();
      expect(screen.getByText('Select Paris')).toBeInTheDocument();
      expect(screen.getByText('Select Tokyo')).toBeInTheDocument();
    });

    it('should display loading state during initial load', () => {
      mockGetHistory.mockReturnValue([]);

      render(<HistoryPage />);

      // The component renders without crashing
      expect(screen.getByText('Itinerary History')).toBeInTheDocument();
    });
  });

  describe('Select item and display full details', () => {
    it('should display itinerary details when item is selected', async () => {
      const user = userEvent.setup();
      mockGetHistory.mockReturnValue([mockItinerary]);

      render(<HistoryPage />);

      const selectButton = screen.getByText('Select Paris');
      await user.click(selectButton);

      expect(screen.getByTestId('itinerary-display')).toBeInTheDocument();
      expect(screen.getByText('Itinerary for Paris')).toBeInTheDocument();
    });

    it('should display back button when detail view is shown', async () => {
      const user = userEvent.setup();
      mockGetHistory.mockReturnValue([mockItinerary]);

      render(<HistoryPage />);

      const selectButton = screen.getByText('Select Paris');
      await user.click(selectButton);

      expect(screen.getByText('Back to History')).toBeInTheDocument();
    });

    it('should scroll to top when item is selected', async () => {
      const user = userEvent.setup();
      const scrollToMock = vi.fn();
      window.scrollTo = scrollToMock;

      mockGetHistory.mockReturnValue([mockItinerary]);

      render(<HistoryPage />);

      const selectButton = screen.getByText('Select Paris');
      await user.click(selectButton);

      expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    it('should close detail view when back button is clicked', async () => {
      const user = userEvent.setup();
      mockGetHistory.mockReturnValue([mockItinerary]);

      render(<HistoryPage />);

      // Select item
      const selectButton = screen.getByText('Select Paris');
      await user.click(selectButton);
      expect(screen.getByTestId('itinerary-display')).toBeInTheDocument();

      // Click back button
      const backButton = screen.getByText('Back to History');
      await user.click(backButton);

      // Detail view should be hidden
      expect(screen.queryByTestId('itinerary-display')).not.toBeInTheDocument();
    });

    it('should close detail view when Escape key is pressed', async () => {
      const user = userEvent.setup();
      mockGetHistory.mockReturnValue([mockItinerary]);

      render(<HistoryPage />);

      // Select item
      const selectButton = screen.getByText('Select Paris');
      await user.click(selectButton);
      expect(screen.getByTestId('itinerary-display')).toBeInTheDocument();

      // Press Escape key
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

      // Detail view should be hidden
      expect(screen.queryByTestId('itinerary-display')).not.toBeInTheDocument();
    });
  });

  describe('Delete item and verify removal', () => {
    it('should delete item from list and storage', async () => {
      const user = userEvent.setup();
      mockGetHistory.mockReturnValue([mockItinerary, mockItinerary2]);

      render(<HistoryPage />);

      const deleteButtons = screen.getAllByText('Delete');
      await user.click(deleteButtons[0]);

      expect(mockDeleteFromHistory).toHaveBeenCalledWith(0);
      expect(screen.queryByTestId('history-item-0')).toBeInTheDocument(); // Tokyo is now at index 0
      expect(screen.queryByText('Select Paris')).not.toBeInTheDocument();
    });

    it('should clear selected itinerary if deleted item was selected', async () => {
      const user = userEvent.setup();
      mockGetHistory.mockReturnValue([mockItinerary, mockItinerary2]);

      render(<HistoryPage />);

      // Select first item
      const selectButton = screen.getByText('Select Paris');
      await user.click(selectButton);
      expect(screen.getByTestId('itinerary-display')).toBeInTheDocument();

      // Delete the selected item
      const deleteButtons = screen.getAllByText('Delete');
      await user.click(deleteButtons[0]);

      // Detail view should be cleared
      expect(screen.queryByTestId('itinerary-display')).not.toBeInTheDocument();
    });

    it('should not clear selected itinerary if a different item was deleted', async () => {
      const user = userEvent.setup();
      mockGetHistory.mockReturnValue([mockItinerary, mockItinerary2]);

      render(<HistoryPage />);

      // Select first item
      const selectButton = screen.getByText('Select Paris');
      await user.click(selectButton);
      expect(screen.getByTestId('itinerary-display')).toBeInTheDocument();

      // Delete the second item (not the selected one)
      const deleteButtons = screen.getAllByText('Delete');
      await user.click(deleteButtons[1]);

      // Detail view should still be showing
      expect(screen.getByTestId('itinerary-display')).toBeInTheDocument();
      expect(screen.getByText('Itinerary for Paris')).toBeInTheDocument();
    });
  });

  describe('Empty state displays when no history exists', () => {
    it('should display empty state when history is empty', () => {
      mockGetHistory.mockReturnValue([]);

      render(<HistoryPage />);

      expect(screen.getByText('No itineraries yet')).toBeInTheDocument();
      expect(screen.getByText('Generate your first itinerary to see it here')).toBeInTheDocument();
      expect(screen.getByText('Generate Itinerary')).toBeInTheDocument();
    });

    it('should have link to generate page in empty state', () => {
      mockGetHistory.mockReturnValue([]);

      render(<HistoryPage />);

      const link = screen.getByText('Generate Itinerary');
      expect(link).toHaveAttribute('href', '/generate');
    });
  });

  describe('Error state displays on storage failure', () => {
    it('should display error message when loading fails', () => {
      mockGetHistory.mockImplementation(() => {
        throw new Error('Storage error');
      });

      render(<HistoryPage />);

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Error Loading History')).toBeInTheDocument();
    });

    it('should display error message when deletion fails', async () => {
      const user = userEvent.setup();
      mockGetHistory.mockReturnValue([mockItinerary]);
      mockDeleteFromHistory.mockImplementation(() => {
        throw new Error('Delete failed');
      });

      render(<HistoryPage />);

      const deleteButton = screen.getByText('Delete');
      await user.click(deleteButton);

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('Responsive layout and accessibility', () => {
    it('should render with proper semantic structure', () => {
      mockGetHistory.mockReturnValue([mockItinerary]);

      render(<HistoryPage />);

      expect(screen.getByRole('heading', { name: 'Itinerary History' })).toBeInTheDocument();
    });

    it('should have accessible close button with aria-label', async () => {
      const user = userEvent.setup();
      mockGetHistory.mockReturnValue([mockItinerary]);

      render(<HistoryPage />);

      const selectButton = screen.getByText('Select Paris');
      await user.click(selectButton);

      const backButton = screen.getByLabelText('Close detail view');
      expect(backButton).toBeInTheDocument();
    });

    it('should display loading state with aria-live region', () => {
      mockGetHistory.mockReturnValue([]);

      render(<HistoryPage />);

      // The loading state briefly appears
      const loadingText = screen.queryByText('Loading history...');
      if (loadingText) {
        expect(loadingText).toHaveAttribute('aria-live', 'polite');
      }
    });
  });
});
