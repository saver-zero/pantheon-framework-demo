import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HistoryView } from './HistoryView';
import { ItineraryServiceProvider } from '../services/ItineraryServiceContext';
import type { IItineraryService } from '../services/IItineraryService';
import { createHistoryWithNItems } from '../test/fixtures/historyFixtures';

// Helper: Create mock service with default implementations
const createMockService = (): IItineraryService => ({
  generateItinerary: vi.fn(),
  getHistory: vi.fn().mockReturnValue([]),
  saveToHistory: vi.fn(),
  deleteFromHistory: vi.fn()
});

describe('HistoryView', () => {
  let mockService: IItineraryService;

  beforeEach(() => {
    mockService = createMockService();
    vi.clearAllMocks();
  });

  describe('HistoryView retrieves itinerary history from IItineraryService on mount and displays list of summaries', () => {
    it('should call getHistory on mount and display list items with extracted metadata', () => {
      // Arrange
      const mockHistory = createHistoryWithNItems(3);
      vi.mocked(mockService.getHistory).mockReturnValue(mockHistory);

      // Act
      render(
        <ItineraryServiceProvider service={mockService}>
          <HistoryView />
        </ItineraryServiceProvider>
      );

      // Assert - getHistory was called once on mount
      expect(mockService.getHistory).toHaveBeenCalledTimes(1);

      // Assert - list items are rendered
      const listItems = screen.getAllByRole('button', { name: /View itinerary for/i });
      expect(listItems.length).toBe(3);

      // Assert - metadata is extracted and displayed (destination)
      expect(screen.getByText(/Tokyo/i)).toBeInTheDocument();
      expect(screen.getByText(/Paris/i)).toBeInTheDocument();
      expect(screen.getByText(/New York City/i)).toBeInTheDocument();
    });
  });

  describe('HistoryView displays empty state message when no history exists', () => {
    it('should display empty state message when getHistory returns empty array', () => {
      // Arrange
      vi.mocked(mockService.getHistory).mockReturnValue([]);

      // Act
      render(
        <ItineraryServiceProvider service={mockService}>
          <HistoryView />
        </ItineraryServiceProvider>
      );

      // Assert - empty state message is displayed
      expect(screen.getByText(/no itineraries saved yet/i)).toBeInTheDocument();

      // Assert - no list items are rendered
      const listItems = screen.queryAllByRole('listitem');
      expect(listItems.length).toBe(0);
    });
  });

  describe('Clicking a list item sets selected itinerary and renders detail view using ItineraryDisplay', () => {
    it('should render ItineraryDisplay with selected markdown when list item is clicked', () => {
      // Arrange
      const mockHistory = createHistoryWithNItems(3);
      vi.mocked(mockService.getHistory).mockReturnValue(mockHistory);

      render(
        <ItineraryServiceProvider service={mockService}>
          <HistoryView />
        </ItineraryServiceProvider>
      );

      // Act - click on first list item
      const firstListItem = screen.getAllByRole('button', { name: /View itinerary for/i })[0];
      fireEvent.click(firstListItem);

      // Assert - ItineraryDisplay renders the selected markdown
      // The first item is Tokyo with "Senso-ji Temple" in the content
      expect(screen.getByText(/Senso-ji Temple/i)).toBeInTheDocument();

      // Assert - back button appears
      expect(screen.getByRole('button', { name: /back to history/i })).toBeInTheDocument();
    });
  });

  describe('Delete button removes itinerary from history and updates display', () => {
    it('should remove itinerary when delete button is clicked and confirmed', () => {
      // Arrange
      const mockHistory = createHistoryWithNItems(3);
      vi.mocked(mockService.getHistory).mockReturnValue(mockHistory);

      // Mock window.confirm to return true
      const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

      render(
        <ItineraryServiceProvider service={mockService}>
          <HistoryView />
        </ItineraryServiceProvider>
      );

      // Verify initial state has 3 items
      expect(screen.getAllByRole('button', { name: /View itinerary for/i }).length).toBe(3);

      // Act - click delete button for first item
      const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
      fireEvent.click(deleteButtons[0]);

      // Assert - list now shows 2 items
      const remainingItems = screen.getAllByRole('button', { name: /View itinerary for/i });
      expect(remainingItems.length).toBe(2);

      // Assert - verify the correct item was removed (Tokyo should be gone)
      expect(screen.queryByText(/Tokyo/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Paris/i)).toBeInTheDocument();
      expect(screen.getByText(/New York City/i)).toBeInTheDocument();

      confirmSpy.mockRestore();
    });
  });

  describe('HistoryView handles storage errors gracefully by displaying error message', () => {
    it('should display ErrorDisplay when getHistory throws an error', () => {
      // Arrange
      vi.mocked(mockService.getHistory).mockImplementation(() => {
        throw new Error('Storage corrupted');
      });

      // Act
      render(
        <ItineraryServiceProvider service={mockService}>
          <HistoryView />
        </ItineraryServiceProvider>
      );

      // Assert - ErrorDisplay component is rendered with error message
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/failed to load history/i)).toBeInTheDocument();

      // Assert - list is not rendered when error occurs
      const listItems = screen.queryAllByRole('listitem');
      expect(listItems.length).toBe(0);
    });
  });
});
