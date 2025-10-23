import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorDisplay } from './ErrorDisplay';

describe('ErrorDisplay', () => {
  describe('ErrorDisplay component renders error message with correct accessibility attributes and styling based on error type', () => {
    it('should render error message with role alert and aria-live polite', () => {
      // Arrange & Act
      render(<ErrorDisplay errorMessage="Something went wrong" errorType="error" />);

      // Assert
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent('Something went wrong');
      expect(alert).toHaveAttribute('aria-live', 'polite');
    });

    it('should render with error type styling (red color)', () => {
      // Arrange & Act
      render(<ErrorDisplay errorMessage="Error occurred" errorType="error" />);

      // Assert
      const alert = screen.getByRole('alert');
      expect(alert).toHaveStyle({ color: '#c62828' });
    });

    it('should render with warning type styling (orange color)', () => {
      // Arrange & Act
      render(<ErrorDisplay errorMessage="Warning message" errorType="warning" />);

      // Assert
      const alert = screen.getByRole('alert');
      expect(alert).toHaveStyle({ color: '#f57c00' });
    });

    it('should render with info type styling (blue color)', () => {
      // Arrange & Act
      render(<ErrorDisplay errorMessage="Info message" errorType="info" />);

      // Assert
      const alert = screen.getByRole('alert');
      expect(alert).toHaveStyle({ color: '#1976d2' });
    });

    it('should default to error type when errorType is not provided', () => {
      // Arrange & Act
      render(<ErrorDisplay errorMessage="Default error" />);

      // Assert
      const alert = screen.getByRole('alert');
      expect(alert).toHaveStyle({ color: '#c62828' });
    });
  });

  describe('ErrorDisplay conditionally renders retry button when onRetry callback provided and button triggers callback on click', () => {
    it('should render retry button when onRetry callback is provided', () => {
      // Arrange
      const mockOnRetry = vi.fn();

      // Act
      render(<ErrorDisplay errorMessage="Error" errorType="error" onRetry={mockOnRetry} />);

      // Assert
      const retryButton = screen.getByRole('button', { name: /retry/i });
      expect(retryButton).toBeInTheDocument();
    });

    it('should not render retry button when onRetry callback is not provided', () => {
      // Arrange & Act
      render(<ErrorDisplay errorMessage="Error" errorType="error" />);

      // Assert
      const retryButton = screen.queryByRole('button', { name: /retry/i });
      expect(retryButton).not.toBeInTheDocument();
    });

    it('should call onRetry callback when retry button is clicked', () => {
      // Arrange
      const mockOnRetry = vi.fn();
      render(<ErrorDisplay errorMessage="Error" errorType="error" onRetry={mockOnRetry} />);

      // Act
      const retryButton = screen.getByRole('button', { name: /retry/i });
      fireEvent.click(retryButton);

      // Assert
      expect(mockOnRetry).toHaveBeenCalledTimes(1);
    });

    it('should call onRetry callback multiple times when retry button is clicked multiple times', () => {
      // Arrange
      const mockOnRetry = vi.fn();
      render(<ErrorDisplay errorMessage="Error" errorType="error" onRetry={mockOnRetry} />);

      // Act
      const retryButton = screen.getByRole('button', { name: /retry/i });
      fireEvent.click(retryButton);
      fireEvent.click(retryButton);

      // Assert
      expect(mockOnRetry).toHaveBeenCalledTimes(2);
    });
  });
});
