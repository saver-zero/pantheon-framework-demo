/**
 * ApiClientFactory creates the appropriate API client implementation
 * based on environment configuration
 *
 * Note: CLIApiClient uses dynamic import to avoid bundling Node.js modules in browser builds
 */

import { IItineraryService } from './IItineraryService';
import { HTTPApiClient } from './HTTPApiClient';

export class ApiClientFactory {
  /**
   * Creates and returns the appropriate API client implementation
   * based on VITE_BACKEND_MODE environment variable
   * @returns IItineraryService implementation (CLIApiClient or HTTPApiClient)
   * @throws Error if backend mode is invalid or unknown
   */
  static create(): IItineraryService {
    const backendMode = import.meta.env.VITE_BACKEND_MODE || 'cli';

    console.log(`ApiClientFactory: Creating API client with backend mode: ${backendMode}`);

    switch (backendMode) {
      case 'cli':
        throw new Error(
          'CLI mode is not supported in browser environments. ' +
          'The CLIApiClient requires Node.js child_process module which is not available in browsers. ' +
          'Please set VITE_BACKEND_MODE=http in your .env file and start the backend server.'
        );
      case 'http':
        return new HTTPApiClient();
      default:
        throw new Error(
          `Invalid backend mode: ${backendMode}. Valid options are: 'cli', 'http'`
        );
    }
  }
}
