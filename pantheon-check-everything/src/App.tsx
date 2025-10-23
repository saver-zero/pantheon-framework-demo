import { useState } from 'react';
import {
  createItineraryService,
  ItineraryServiceProvider,
} from './services';
import { ItineraryForm } from './components/ItineraryForm';
import { ItineraryDisplay } from './components/ItineraryDisplay';
import { HistoryView } from './components/HistoryView';
import { ErrorDisplay } from './components/ErrorDisplay';
import { ERROR_MESSAGES } from './constants/errorMessages';

/**
 * App Component - Orchestration Container
 *
 * This component serves as the main orchestration hub for the itinerary generation flow.
 * It manages the complete lifecycle from form submission through service calls,
 * history persistence, and UI state updates.
 *
 * State Machine:
 * - idle: No generation in progress, no error (may or may not have itinerary from previous generation)
 * - loading: Generation in progress (isLoading=true, error=null)
 * - success: Generation completed successfully (isLoading=false, error=null, currentItinerary set)
 * - error: Generation failed (isLoading=false, error set, currentItinerary unchanged from previous state)
 *
 * State Transitions:
 * 1. idle -> loading: User submits form, handleGenerate starts
 * 2. loading -> success: Service call succeeds, history saved
 * 3. loading -> error: Service call fails or other error occurs
 * 4. success -> loading: User submits form again for new generation
 * 5. error -> loading: User retries after error
 *
 * Response Format:
 * - Services now return markdown strings instead of JSON Itinerary objects
 * - Backend Claude CLI generates markdown-formatted itineraries
 * - Frontend renders markdown using react-markdown component
 * - This ensures separation of concerns and enables flexible content formatting
 */
function App() {
  // Create service instance once on mount using useState initializer
  // Function initializer ensures createItineraryService is called only once
  const [service] = useState(() => createItineraryService());

  // State for currently displayed itinerary (markdown string)
  // Represents the last successfully generated itinerary in markdown format
  // null = no itinerary has been generated yet
  const [currentItinerary, setCurrentItinerary] = useState<string | null>(null);

  // State for error messages from orchestration-level failures
  // null = no error, string = user-friendly error message
  // Error state and itinerary display are mutually exclusive per generation attempt
  const [error, setError] = useState<string | null>(null);

  // State for error type (error, warning, info) to control ErrorDisplay styling
  // 'warning' for graceful degradation (StorageError), 'error' for blocking errors
  const [errorType, setErrorType] = useState<'error' | 'warning' | 'info'>('error');

  // State for tracking async generation in progress
  // true = loading, false = idle/completed/error
  // Drives loading indicator display and coordinates with form component
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // State for managing active view (form or history)
  // 'form' = itinerary generation form view (default)
  // 'history' = saved itineraries history view
  const [activeView, setActiveView] = useState<'form' | 'history'>('form');

  /**
   * Handle itinerary generation from form component
   *
   * This callback receives an already-generated markdown itinerary from the form.
   * The form component calls service.generateItinerary which generates the itinerary
   * and automatically saves it to history via HTTPApiClient. This callback receives
   * the markdown string for state management only.
   *
   * Flow:
   * 1. Set loading state (idle -> loading transition)
   * 2. Clear any previous error state (state guard)
   * 3. Update current itinerary state (loading -> success transition)
   * 4. Handle errors with categorization (loading -> error transition)
   * 5. Cleanup loading state in finally block
   *
   * Graceful Degradation:
   * - StorageError from service layer: Display itinerary despite history save failure
   * - Other errors: Maintain previous itinerary, show error message
   *
   * State Management:
   * - App component is the orchestration container responsible for all state management
   * - Does not re-throw errors to form component - handles all errors internally
   * - Ensures loading state is always cleared in finally block (no early returns)
   */
  const handleGenerate = async (markdown: string) => {
    // State Transition: idle/success/error -> loading
    setIsLoading(true);

    try {
      // State Guard: Clear error state for clean retry experience
      // Prevents error from previous attempt from persisting
      setError(null);

      // State Transition: loading -> success
      // Update state with markdown itinerary
      // Note: markdown is already generated and saved to history by service layer
      setCurrentItinerary(markdown);
    } catch (err) {
      // Error categorization for user-friendly feedback
      // Check for StorageError first to enable graceful degradation
      if (err instanceof Error && err.name === 'StorageError') {
        // Graceful Degradation: Storage failure doesn't prevent itinerary display
        // State Transition: loading -> success (with warning)
        setCurrentItinerary(markdown);
        setError(ERROR_MESSAGES.STORAGE_FAILED);
        setErrorType('warning'); // Use warning type for graceful degradation
        // Don't re-throw - allow graceful degradation
        console.error('Storage error in handleGenerate:', err);
        // Don't return early - let finally block clear loading state
      } else {
        // State Transition: loading -> error
        // Maintain previous itinerary state (don't clear it)
        setErrorType('error'); // Use error type for blocking errors
        if (err instanceof ServiceError) {
          // Service errors indicate backend communication failure
          setError(ERROR_MESSAGES.SERVICE_ERROR(err.message));
        } else if (err instanceof Error) {
          // Generic Error with message
          setError(ERROR_MESSAGES.GENERIC_ERROR(err.message));
        } else {
          // Unknown error types - provide safe fallback message
          setError(ERROR_MESSAGES.UNEXPECTED_ERROR);
        }

        // Log errors for debugging
        console.error('Error in handleGenerate:', err);
      }
    } finally {
      // State Cleanup: Ensure loading state is cleared
      // This happens in both success and error paths
      // No early returns before this point ensures loading state is always cleared
      setIsLoading(false);
    }
  };

  return (
    <ItineraryServiceProvider service={service}>
      <div className="App app-container" aria-busy={isLoading}>
        <h1>Travel Itinerary Generator</h1>

        {/* Navigation controls for switching between views */}
        <nav role="navigation" className="nav-container">
          <button
            onClick={() => setActiveView('form')}
            disabled={activeView === 'form'}
            className={`nav-button ${activeView === 'form' ? 'nav-button--active' : ''}`}
          >
            Generate New Trip
          </button>
          <button
            onClick={() => setActiveView('history')}
            disabled={activeView === 'history'}
            className={`nav-button ${activeView === 'history' ? 'nav-button--active' : ''}`}
          >
            View History
          </button>
        </nav>

        {/* Main content area - conditional rendering based on active view */}
        <main className="container">
          {activeView === 'form' ? (
            <>
              <ItineraryForm onGenerate={handleGenerate} />

              {/* Loading indicator display - positioned between form and content */}
              {isLoading && (
                <div role="status" aria-live="polite" className="loading-indicator">
                  Generating your itinerary...
                </div>
              )}

              {/* Error display with accessibility support */}
              {error && (
                <ErrorDisplay errorMessage={error} errorType={errorType} />
              )}

              {/* Itinerary display after successful generation */}
              {currentItinerary && <ItineraryDisplay markdown={currentItinerary} />}
            </>
          ) : (
            <HistoryView />
          )}
        </main>
      </div>
    </ItineraryServiceProvider>
  );
}

export default App;
