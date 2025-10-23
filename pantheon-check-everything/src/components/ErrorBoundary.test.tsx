import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import React from 'react';

// Test component that throws an error during render
const ThrowError: React.FC<{ shouldThrow: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error from child component');
  }
  return <div>Normal child content</div>;
};

describe('ErrorBoundary', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Spy on console.error to verify error logging
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('ErrorBoundary catches rendering errors from child components and displays fallback UI instead of crashing', () => {
    it('should catch error thrown by child component and display fallback UI', () => {
      // Arrange & Act
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Assert - Fallback UI is shown
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(alert.textContent).toMatch(/rendering error occurred/i);
    });

    it('should log error to console when error is caught', () => {
      // Arrange & Act
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Assert - console.error was called
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should not render children when error is caught', () => {
      // Arrange & Act
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Assert - Normal child content is not shown
      expect(screen.queryByText('Normal child content')).not.toBeInTheDocument();
    });

    it('should render children normally when no error occurs', () => {
      // Arrange & Act
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      );

      // Assert - Normal child content is shown
      expect(screen.getByText('Normal child content')).toBeInTheDocument();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('should display fallback UI with error message from ERROR_MESSAGES constant', () => {
      // Arrange & Act
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Assert - Error message comes from ERROR_MESSAGES.BOUNDARY_ERROR
      const alert = screen.getByRole('alert');
      expect(alert.textContent).toMatch(/rendering error occurred.*reload/i);
    });
  });

  describe('ErrorBoundary reload button resets error state and allows recovery by reloading page', () => {
    it('should render reload button in fallback UI', () => {
      // Arrange & Act
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Assert
      const reloadButton = screen.getByRole('button', { name: /retry/i });
      expect(reloadButton).toBeInTheDocument();
    });

    it('should call window.location.reload when reload button is clicked', () => {
      // Arrange - Mock window.location.reload
      const originalLocation = window.location;
      delete (window as any).location;
      window.location = { ...originalLocation, reload: vi.fn() };

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Act
      const reloadButton = screen.getByRole('button', { name: /retry/i });
      fireEvent.click(reloadButton);

      // Assert
      expect(window.location.reload).toHaveBeenCalledTimes(1);

      // Cleanup
      window.location = originalLocation;
    });
  });
});
