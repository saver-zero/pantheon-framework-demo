// Barrel export file for services
export { HTTPApiClient } from './HTTPApiClient';
export type { IItineraryService } from './IItineraryService';
export {
  ItineraryServiceProvider,
  useItineraryService,
} from './ItineraryServiceContext';
export { LocalStorageService, StorageError } from './LocalStorageService';

// Factory functions
import { HTTPApiClient } from './HTTPApiClient';
import type { IItineraryService } from './IItineraryService';
import { LocalStorageService } from './LocalStorageService';
import { getServiceConfig } from '../config/serviceConfig';

/**
 * Creates a fully configured IItineraryService implementation.
 *
 * This factory function:
 * - Reads configuration from getServiceConfig() to get backend URL and storage settings
 * - Instantiates LocalStorageService for history persistence
 * - Returns HTTPApiClient configured to communicate with the backend server
 *
 * Note: CLI mode is no longer supported as CLI execution has moved to the backend server.
 * The application now always uses HTTPApiClient which communicates with the backend.
 *
 * @returns HTTPApiClient implementation configured for current environment
 *
 * @example
 * const service = createItineraryService(); // Returns HTTPApiClient
 */
export function createItineraryService(): IItineraryService {
  const config = getServiceConfig();

  // Validate backend URL for production builds
  if (import.meta.env.PROD && !config.backendUrl) {
    throw new Error(
      'VITE_BACKEND_URL must be configured for production builds. ' +
      'Set the environment variable to your deployed backend server URL.'
    );
  }

  // Validate backend URL is absolute in production
  if (import.meta.env.PROD && config.backendUrl && !config.backendUrl.startsWith('http')) {
    throw new Error(
      `Invalid VITE_BACKEND_URL: "${config.backendUrl}". ` +
      'Production backend URL must be an absolute URL starting with http:// or https://'
    );
  }

  // Log warning in development mode when using proxy
  if (import.meta.env.DEV && !config.backendUrl) {
    console.log('[ServiceFactory] Using Vite proxy mode (relative URLs)');
  }

  // Instantiate LocalStorageService for history persistence
  const storage = new LocalStorageService(config.storageKey, config.maxItems);

  // Create HTTPApiClient with backend URL from configuration
  const service = new HTTPApiClient(storage, config.backendUrl);
  console.log(`[ServiceFactory] Using HTTPApiClient (backend: ${config.backendUrl || 'proxy'})`);

  return service;
}
