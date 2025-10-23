import React from 'react';

/**
 * Props for the ErrorDisplay component
 */
export interface ErrorDisplayProps {
  /**
   * The error message to display to the user
   */
  errorMessage: string;

  /**
   * The type of error which determines the color styling
   * - 'error': Red color for critical errors
   * - 'warning': Orange color for warnings
   * - 'info': Blue color for informational messages
   * @default 'error'
   */
  errorType?: 'error' | 'warning' | 'info';

  /**
   * Optional callback function to retry the failed operation
   * When provided, a "Retry" button will be rendered
   */
  onRetry?: () => void;

  /**
   * Optional className for style overrides
   */
  className?: string;
}

/**
 * ErrorDisplay Component
 *
 * Centralized error display component that provides consistent error messaging
 * with proper accessibility support and visual feedback.
 *
 * Features:
 * - Accessibility: Uses role='alert' and aria-live='polite' for screen readers
 * - Visual feedback: Color-coded based on error type (error/warning/info)
 * - Optional retry: Conditionally renders retry button when callback provided
 *
 * @example
 * ```tsx
 * <ErrorDisplay
 *   errorMessage="Failed to generate itinerary"
 *   errorType="error"
 *   onRetry={() => handleRetry()}
 * />
 * ```
 */
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  errorMessage,
  errorType = 'error',
  onRetry,
  className
}) => {
  // Color mapping based on error type
  const colorMap = {
    error: '#c62828',   // Red
    warning: '#f57c00', // Orange
    info: '#1976d2'     // Blue
  };

  const color = colorMap[errorType];

  return (
    <div
      role="alert"
      aria-live="polite"
      className={className}
      style={{
        color,
        margin: '1rem 0px'
      }}
    >
      {errorMessage}
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginLeft: '1rem',
            padding: '0.5rem 1rem',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
};
