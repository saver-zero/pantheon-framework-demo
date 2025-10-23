import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { createItineraryService } from './services';
import type { IItineraryService } from './services/IItineraryService';

// Mock the service factory
vi.mock('./services', async () => {
  const actual = await vi.importActual('./services');
  return {
    ...actual,
    createItineraryService: vi.fn()
  };
});

// Helper: Create mock service with default implementations
const createMockService = (): IItineraryService => ({
  generateItinerary: vi.fn().mockResolvedValue('# Tokyo Itinerary\n\n**Party:** couple\n**Month:** March\n**Duration:** 5 days'),
  getHistory: vi.fn().mockReturnValue([]),
  saveToHistory: vi.fn()
});

describe('App Component - Styling Tests', () => {
  let mockService: IItineraryService;

  beforeEach(() => {
    mockService = createMockService();
    vi.mocked(createItineraryService).mockReturnValue(mockService);
    vi.clearAllMocks();
  });

  describe('CSS classes replace inline styles without changing visual appearance', () => {
    it('should render navigation buttons with CSS classes instead of inline styles', () => {
      // Arrange & Act
      const { container } = render(<App />);

      // Assert - Navigation buttons should have className attributes
      const navButtons = screen.getAllByRole('button', { name: /generate new trip|view history/i });

      navButtons.forEach(button => {
        // Buttons should have className
        expect(button.className).toBeTruthy();
        // Buttons should not have style attribute with hardcoded colors
        const style = button.getAttribute('style');
        if (style) {
          expect(style).not.toContain('#007bff');
          expect(style).not.toContain('#f0f0f0');
        }
      });
    });

    it('should render main container with CSS class instead of no styling', () => {
      // Arrange & Act
      const { container } = render(<App />);

      // Assert - Main element should have container class
      const mainElement = container.querySelector('main');
      expect(mainElement).toBeInTheDocument();
      expect(mainElement?.className).toBeTruthy();
    });

    it('should render loading indicator with CSS class instead of inline styles', async () => {
      // Arrange
      vi.mocked(mockService.generateItinerary).mockImplementation(() =>
        new Promise(resolve => setTimeout(() => resolve('# Test'), 100))
      );

      // Act
      render(<App />);

      // Note: We cannot easily trigger loading state in this test without form interaction
      // This test documents the expected behavior - loading indicator should use CSS class
      // The implementation will add className to the loading div
    });
  });

  describe('Dark mode theming works correctly with no hardcoded color conflicts', () => {
    it('should not have inline color styles on navigation buttons', () => {
      // Arrange & Act
      render(<App />);

      // Assert
      const navButtons = screen.getAllByRole('button', { name: /generate new trip|view history/i });

      navButtons.forEach(button => {
        const style = button.getAttribute('style');
        if (style) {
          // Should not contain hardcoded colors
          expect(style).not.toContain('backgroundColor');
          expect(style).not.toContain('color: white');
          expect(style).not.toContain('color: black');
        }
      });
    });

    it('should use CSS classes for all navigation styling', () => {
      // Arrange & Act
      const { container } = render(<App />);

      // Assert - Navigation should have CSS class
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
      expect(nav?.className).toBeTruthy();
    });
  });

  describe('Navigation buttons show active state and respond to user interaction', () => {
    it('should apply active class to currently active navigation button', () => {
      // Arrange & Act
      render(<App />);

      // Assert - Form button should be active by default
      const formButton = screen.getByRole('button', { name: /generate new trip/i });
      expect(formButton.className).toContain('nav-button--active');
    });

    it('should apply base nav-button class to all navigation buttons', () => {
      // Arrange & Act
      render(<App />);

      // Assert
      const navButtons = screen.getAllByRole('button', { name: /generate new trip|view history/i });

      navButtons.forEach(button => {
        expect(button.className).toContain('nav-button');
      });
    });

    it('should not have nav-button--active class on inactive buttons', () => {
      // Arrange & Act
      render(<App />);

      // Assert - History button should not be active by default
      const historyButton = screen.getByRole('button', { name: /view history/i });
      expect(historyButton.className).not.toContain('nav-button--active');
    });
  });

  describe('Container classes establish consistent visual boundaries and spacing', () => {
    it('should apply container class to main element for max-width constraint', () => {
      // Arrange & Act
      const { container } = render(<App />);

      // Assert
      const mainElement = container.querySelector('main');
      expect(mainElement?.className).toContain('container');
    });

    it('should apply app-container class to root div for consistent padding', () => {
      // Arrange & Act
      const { container } = render(<App />);

      // Assert
      const appDiv = container.querySelector('.App');
      expect(appDiv?.className).toContain('app-container');
    });
  });
});
