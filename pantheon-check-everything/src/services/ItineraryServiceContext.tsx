/**
 * React Context for IItineraryService Dependency Injection
 *
 * Provides IItineraryService instance throughout the component tree without
 * prop drilling. Components use useItineraryService hook to access the service.
 */

import { createContext, useContext, ReactNode } from 'react';
import type { IItineraryService } from './IItineraryService';

/**
 * Context holding IItineraryService instance
 *
 * Default value is null to enforce proper Provider usage.
 * useItineraryService hook will throw if used outside Provider.
 */
const ItineraryServiceContext = createContext<IItineraryService | null>(null);

/**
 * Provider component props
 */
interface ItineraryServiceProviderProps {
  /** Service instance to provide to child components */
  service: IItineraryService;
  /** Child components that can access the service via useItineraryService */
  children: ReactNode;
}

/**
 * Provider component that makes IItineraryService available to child components
 *
 * @param props.service - IItineraryService instance to inject
 * @param props.children - Child components that can access the service
 *
 * @example
 * const service = createItineraryService();
 *
 * <ItineraryServiceProvider service={service}>
 *   <App />
 * </ItineraryServiceProvider>
 */
export function ItineraryServiceProvider({
  service,
  children,
}: ItineraryServiceProviderProps) {
  if (!service) {
    throw new Error(
      'ItineraryServiceProvider requires a valid service instance. ' +
      'Ensure createItineraryService() is called and passed to the provider.'
    );
  }

  return (
    <ItineraryServiceContext.Provider value={service}>
      {children}
    </ItineraryServiceContext.Provider>
  );
}

/**
 * Hook to access IItineraryService from React components
 *
 * Must be used within ItineraryServiceProvider. Throws descriptive error
 * if called outside provider context.
 *
 * @returns IItineraryService instance injected via provider
 * @throws Error if used outside ItineraryServiceProvider
 *
 * @example
 * function ItineraryForm() {
 *   const service = useItineraryService();
 *   const handleSubmit = async () => {
 *     const itinerary = await service.generateItinerary(...);
 *   };
 * }
 */
export function useItineraryService(): IItineraryService {
  const service = useContext(ItineraryServiceContext);

  if (!service) {
    throw new Error(
      'useItineraryService must be used within ItineraryServiceProvider. ' +
      'Wrap your component tree with <ItineraryServiceProvider service={...}>.'
    );
  }

  return service;
}
