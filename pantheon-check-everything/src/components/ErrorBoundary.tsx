import React, { Component, ReactNode } from 'react';
import { ErrorDisplay } from './ErrorDisplay';
import { ERROR_MESSAGES } from '../constants/errorMessages';

/**
 * Props for the ErrorBoundary component
 */
interface ErrorBoundaryProps {
  /**
   * Optional custom fallback message to display when an error is caught
   * @default ERROR_MESSAGES.BOUNDARY_ERROR
   */
  fallbackMessage?: string;

  /**
   * Child components to be wrapped by the error boundary
   */
  children: ReactNode;
}

/**
 * State for the ErrorBoundary component
 */
interface ErrorBoundaryState {
  /**
   * Whether an error has been caught
   */
  hasError: boolean;

  /**
   * The error object that was caught
   */
  error: Error | null;
}

/**
 * ErrorBoundary Component
 *
 * React Error Boundary that catches rendering errors in child components
 * and displays a fallback UI instead of crashing the entire application.
 *
 * Features:
 * - Catches errors in component lifecycle methods, render, and constructors
 * - Logs detailed error information to console for debugging
 * - Displays user-friendly error message with ErrorDisplay component
 * - Provides reload functionality for error recovery
 *
 * Usage:
 * Wrap components that might throw errors during rendering
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  /**
   * Static lifecycle method called when an error is thrown
   * Updates state to trigger fallback UI rendering
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  /**
   * Lifecycle method called after an error is caught
   * Logs error details to console for debugging visibility
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  /**
   * Handles page reload for error recovery
   */
  handleReload = (): void => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Render fallback UI using ErrorDisplay component
      const message = this.props.fallbackMessage || ERROR_MESSAGES.BOUNDARY_ERROR;

      return (
        <ErrorDisplay
          errorMessage={message}
          errorType="error"
          onRetry={this.handleReload}
        />
      );
    }

    // Render children when no error
    return this.props.children;
  }
}
