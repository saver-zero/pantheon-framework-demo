import { useContext } from 'react';
import { ItineraryContext, ItineraryContextType } from '../context/ItineraryContext';

/**
 * Custom hook to access the ItineraryContext.
 *
 * This hook provides a clean API for components to access the itinerary state,
 * history, loading states, and methods for generating itineraries.
 *
 * @throws {Error} If used outside of an ItineraryProvider
 * @returns {ItineraryContextType} The itinerary context value
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { currentItinerary, generateItinerary, isLoading } = useItinerary();
 *   // Use the context values...
 * }
 * ```
 */
export function useItinerary(): ItineraryContextType {
  const context = useContext(ItineraryContext);

  if (context === undefined) {
    throw new Error(
      'useItinerary must be used within an ItineraryProvider. ' +
      'Wrap your component tree with <ItineraryProvider> to use this hook.'
    );
  }

  return context;
}
