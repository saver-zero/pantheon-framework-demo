/**
 * ErrorBoundary Component
 *
 * React error boundary for gracefully handling rendering errors in child components.
 * Catches JavaScript errors anywhere in the child component tree, logs errors,
 * and displays a fallback UI instead of crashing the entire component tree.
 */

import React, { Component, ReactNode } from 'react';

/**
 * Props for the ErrorBoundary component
 * @property {ReactNode} children - Child components to be wrapped by the error boundary
 * @property {ReactNode} [fallback] - Optional custom fallback UI to display when an error occurs
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * State for the ErrorBoundary component
 * @property {boolean} hasError - Indicates whether an error has been caught
 * @property {Error | null} error - The caught error object, if any
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  /**
   * Static lifecycle method that updates state when an error is thrown
   * @param {Error} error - The error that was thrown
   * @returns {ErrorBoundaryState} Updated state with hasError set to true
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Lifecycle method called after an error is caught
   * Logs error details to the console for debugging purposes
   * @param {Error} error - The error that was thrown
   * @param {React.ErrorInfo} errorInfo - Additional error information including component stack
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to console for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  /**
   * Handles refresh button click by reloading the page
   */
  handleRefresh = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI when an error occurs
      return (
        <div style={styles.container}>
          <h1 style={styles.heading}>Something went wrong</h1>
          <p style={styles.message}>
            We encountered an unexpected error. Please try refreshing the page.
          </p>
          <button onClick={this.handleRefresh} style={styles.button}>
            Refresh Page
          </button>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={styles.details}>
              <summary>Error Details (Development Only)</summary>
              <pre style={styles.errorText}>{this.state.error.toString()}</pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    textAlign: 'center' as const,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: '2rem',
    color: '#d32f2f',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '2rem',
    maxWidth: '500px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '1rem',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  details: {
    marginTop: '2rem',
    textAlign: 'left' as const,
    maxWidth: '600px',
  },
  errorText: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '4px',
    overflow: 'auto',
    fontSize: '0.875rem',
  },
};

export default ErrorBoundary;
