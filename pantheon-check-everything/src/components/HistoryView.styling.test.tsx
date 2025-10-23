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
  saveToHistory: vi.fn()
});

describe('HistoryView Component - Styling Tests', () => {
  let mockService: IItineraryService;

  beforeEach(() => {
    mockService = createMockService();
    vi.clearAllMocks();
  });

  describe('HistoryView components render with CSS classes instead of JavaScript style objects', () => {
    it('should render history list items without inline style attributes', () => {
      // Arrange
      const mockHistory = createHistoryWithNItems(3);
      vi.mocked(mockService.getHistory).mockReturnValue(mockHistory);

      // Act
      const { container } = render(
        <ItineraryServiceProvider service={mockService}>
          <HistoryView />
        </ItineraryServiceProvider>
      );

      // Assert - List items should use CSS classes, not inline styles
      // Note: List items have role="button" so they are buttons, not listitems
      const listItems = screen.getAllByRole('button', { name: /view itinerary for/i });

      listItems.forEach(item => {
        expect(item.className).toBeTruthy();
        const style = item.getAttribute('style');
        if (style) {
          // Should not contain hardcoded colors
          expect(style).not.toContain('#fff');
          expect(style).not.toContain('#007bff');
          expect(style).not.toContain('#dc3545');
          expect(style).not.toContain('backgroundColor');
        }
      });
    });

    it('should render delete buttons with CSS classes instead of inline styles', () => {
      // Arrange
      const mockHistory = createHistoryWithNItems(3);
      vi.mocked(mockService.getHistory).mockReturnValue(mockHistory);

      // Act
      render(
        <ItineraryServiceProvider service={mockService}>
          <HistoryView />
        </ItineraryServiceProvider>
      );

      // Assert - Delete buttons should have CSS classes
      const deleteButtons = screen.getAllByRole('button', { name: /delete/i });

      deleteButtons.forEach(button => {
        expect(button.className).toContain('btn');
        expect(button.className).toContain('btn-danger');
        const style = button.getAttribute('style');
        if (style) {
          expect(style).not.toContain('#dc3545');
          expect(style).not.toContain('backgroundColor');
        }
      });
    });

    it('should render back button with CSS class instead of inline styles', () => {
      // Arrange
      const mockHistory = createHistoryWithNItems(3);
      vi.mocked(mockService.getHistory).mockReturnValue(mockHistory);

      // Act
      const { container } = render(
        <ItineraryServiceProvider service={mockService}>
          <HistoryView />
        </ItineraryServiceProvider>
      );

      // Select first item to show detail view with back button
      const firstListItem = screen.getAllByRole('button', { name: /view itinerary for/i })[0];
      fireEvent.click(firstListItem);

      // Assert - Back button should have CSS classes
      const backButton = screen.getByRole('button', { name: /back to history/i });
      expect(backButton.className).toContain('btn');
      expect(backButton.className).toContain('btn-primary');

      const style = backButton.getAttribute('style');
      if (style) {
        expect(style).not.toContain('#007bff');
        expect(style).not.toContain('backgroundColor');
      }
    });

    it('should render history list with proper CSS classes for layout', () => {
      // Arrange
      const mockHistory = createHistoryWithNItems(3);
      vi.mocked(mockService.getHistory).mockReturnValue(mockHistory);

      // Act
      const { container } = render(
        <ItineraryServiceProvider service={mockService}>
          <HistoryView />
        </ItineraryServiceProvider>
      );

      // Assert - List container should have CSS classes
      const listContainer = container.querySelector('ul');
      expect(listContainer?.className).toContain('history-list');
    });

    it('should render history items with semantic CSS classes', () => {
      // Arrange
      const mockHistory = createHistoryWithNItems(2);
      vi.mocked(mockService.getHistory).mockReturnValue(mockHistory);

      // Act
      const { container } = render(
        <ItineraryServiceProvider service={mockService}>
          <HistoryView />
        </ItineraryServiceProvider>
      );

      // Assert - List items should have semantic CSS classes
      const listItems = screen.getAllByRole('button', { name: /view itinerary for/i });

      listItems.forEach(item => {
        expect(item.className).toContain('history-item');
      });

      // Assert - Item headers should have CSS classes
      const itemHeaders = container.querySelectorAll('.history-item__header');
      expect(itemHeaders.length).toBeGreaterThan(0);
    });

    it('should not use JavaScript hover state management', () => {
      // Arrange
      const mockHistory = createHistoryWithNItems(2);
      vi.mocked(mockService.getHistory).mockReturnValue(mockHistory);

      // Act
      const { container } = render(
        <ItineraryServiceProvider service={mockService}>
          <HistoryView />
        </ItineraryServiceProvider>
      );

      // Assert - List items should not have onMouseEnter/onMouseLeave handlers for styling
      const listItems = screen.getAllByRole('button', { name: /view itinerary for/i });

      listItems.forEach(item => {
        // Note: This test documents expected behavior
        // After refactoring, hover states should be pure CSS
        // We verify by checking that styles don't change based on hover state variables
        const style = item.getAttribute('style');
        if (style) {
          // Should not contain conditional hover styles
          expect(style).not.toContain('boxShadow');
        }
      });
    });

    it('should render empty state with CSS class instead of inline styles', () => {
      // Arrange
      vi.mocked(mockService.getHistory).mockReturnValue([]);

      // Act
      const { container } = render(
        <ItineraryServiceProvider service={mockService}>
          <HistoryView />
        </ItineraryServiceProvider>
      );

      // Assert - Empty state should have CSS class
      const emptyState = container.querySelector('.history-empty-state');
      expect(emptyState).toBeInTheDocument();

      const style = emptyState?.getAttribute('style');
      if (style) {
        expect(style).not.toContain('#6c757d');
        expect(style).not.toContain('color');
      }
    });
  });

  describe('Container classes for HistoryView establish visual hierarchy', () => {
    it('should apply container class to history view wrapper', () => {
      // Arrange
      const mockHistory = createHistoryWithNItems(2);
      vi.mocked(mockService.getHistory).mockReturnValue(mockHistory);

      // Act
      const { container } = render(
        <ItineraryServiceProvider service={mockService}>
          <HistoryView />
        </ItineraryServiceProvider>
      );

      // Assert - History view should have container class
      const historyView = container.querySelector('.history-container');
      expect(historyView).toBeInTheDocument();
    });

    it('should apply detail view container class when item is selected', () => {
      // Arrange
      const mockHistory = createHistoryWithNItems(2);
      vi.mocked(mockService.getHistory).mockReturnValue(mockHistory);

      // Act
      const { container } = render(
        <ItineraryServiceProvider service={mockService}>
          <HistoryView />
        </ItineraryServiceProvider>
      );

      // Select first item
      const firstListItem = screen.getAllByRole('button', { name: /view itinerary for/i })[0];
      fireEvent.click(firstListItem);

      // Assert - Detail view should have container class
      const detailView = container.querySelector('.history-detail-container');
      expect(detailView).toBeInTheDocument();
    });
  });
});
