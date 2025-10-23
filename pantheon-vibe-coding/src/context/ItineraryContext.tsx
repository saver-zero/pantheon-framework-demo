/**
 * ItineraryContext
 *
 * Global context for sharing itinerary data, history, loading states, and errors across the application.
 * Provides ItineraryProvider component that manages API client initialization, state management,
 * and exposes methods for generating itineraries and loading history.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ItineraryRequest, ItineraryResponse } from '../types';
import { IItineraryService } from '../services/api/IItineraryService';
import { ApiClientFactory } from '../services/api/ApiClientFactory';
import { ErrorHandlerService } from '../services/ErrorHandlerService';
import { ValidationService } from '../services/ValidationService';

/**
 * Context value interface defining the shape of the itinerary context
 * @property {ItineraryResponse | null} currentItinerary - Currently displayed itinerary or null if none
 * @property {ItineraryResponse[]} history - List of previously generated itineraries from local storage
 * @property {boolean} isLoading - Indicates whether an API call is currently in progress
 * @property {string | null} error - User-friendly error message or null if no error
 * @property {function} generateItinerary - Method to generate a new itinerary from user input
 * @property {function} loadHistory - Method to refresh the history list from storage
 * @property {function} clearError - Method to clear the current error state
 */
export interface ItineraryContextType {
  currentItinerary: ItineraryResponse | null;
  history: ItineraryResponse[];
  isLoading: boolean;
  error: string | null;
  generateItinerary: (params: ItineraryRequest) => Promise<void>;
  loadHistory: () => Promise<void>;
  clearError: () => void;
}

/**
 * Create the itinerary context with default undefined value
 * Consumer components must use this context within ItineraryProvider
 */
export const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

/**
 * Props for ItineraryProvider component
 */
interface ItineraryProviderProps {
  children: ReactNode;
}

/**
 * ItineraryProvider component wraps the application to provide itinerary context
 * Initializes API client, manages global state, and provides methods for itinerary operations
 *
 * @example
 * <ItineraryProvider>
 *   <App />
 * </ItineraryProvider>
 */
export const ItineraryProvider: React.FC<ItineraryProviderProps> = ({ children }) => {
  // Initialize API client using factory pattern (only once on mount)
  const [apiClient] = useState<IItineraryService>(() => ApiClientFactory.create());

  // Initialize service instances
  const [errorHandler] = useState<ErrorHandlerService>(() => new ErrorHandlerService());
  const [validator] = useState<ValidationService>(() => new ValidationService());

  // State management
  const [currentItinerary, setCurrentItinerary] = useState<ItineraryResponse | null>(null);
  const [history, setHistory] = useState<ItineraryResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Generates a new itinerary based on user input
   * Validates input, calls API client, and updates state
   */
  const generateItinerary = async (params: ItineraryRequest): Promise<void> => {
    try {
      // Clear previous error and set loading state
      setError(null);
      setIsLoading(true);

      // Validate request using ValidationService
      const validationResult = validator.validateFormInput(params);
      if (!validationResult.success) {
        throw new Error(validationResult.errors?.join(', ') || 'Invalid input');
      }

      // Call API client to generate itinerary
      const result = await apiClient.generateItinerary(validationResult.data!);

      // Update currentItinerary with result on success
      setCurrentItinerary(result);

      // Refresh history after successful generation
      await loadHistory();
    } catch (err) {
      // Handle errors using ErrorHandlerService
      const errorMessage = errorHandler.handleApiError(err);
      setError(errorMessage);
      errorHandler.logError(err, 'generateItinerary');
    } finally {
      // Set isLoading to false in finally block
      setIsLoading(false);
    }
  };

  /**
   * Loads history from API client
   * Handles errors silently without setting error state
   */
  const loadHistory = async (): Promise<void> => {
    try {
      // Call apiClient.getHistory()
      const historyData = await apiClient.getHistory();

      // Update history state with result
      setHistory(historyData);
    } catch (err) {
      // Handle errors gracefully without setting error state (silent fail)
      // Log errors to console for debugging
      console.error('Failed to load history:', err);
    }
  };

  /**
   * Clears the current error state
   * Can be called from components to dismiss error messages
   */
  const clearError = (): void => {
    setError(null);
  };

  /**
   * Load initial history on mount
   * Effect runs once when provider mounts
   */
  useEffect(() => {
    loadHistory();
  }, []); // Empty dependency array ensures effect only runs once on mount

  /**
   * Create context value object with all properties and methods
   */
  const value: ItineraryContextType = {
    currentItinerary,
    history,
    isLoading,
    error,
    generateItinerary,
    loadHistory,
    clearError,
  };

  return (
    <ItineraryContext.Provider value={value}>
      {children}
    </ItineraryContext.Provider>
  );
};

/**
 * Custom hook to use the itinerary context
 * Throws an error if used outside of ItineraryProvider
 */
export const useItinerary = (): ItineraryContextType => {
  const context = useContext(ItineraryContext);
  if (context === undefined) {
    throw new Error('useItinerary must be used within an ItineraryProvider');
  }
  return context;
};

/**
 * Alias for useItinerary for backward compatibility
 */
export const useItineraryContext = useItinerary;

export default ItineraryProvider;
