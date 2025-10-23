/**
 * Service Configuration Module
 *
 * Provides centralized configuration for the itinerary service layer.
 * Reads from Vite environment variables and provides type-safe access
 * to configuration values.
 */
import { STORAGE_KEYS } from '../constants/storage';

/**
 * Application configuration interface
 */
export interface AppConfig {
  /** API mode selection: CLI for POC/development, HTTP for production */
  apiMode: 'CLI' | 'HTTP';
  /** Local storage key for persisting itinerary data */
  storageKey: string;
  /** Maximum number of itineraries to store in local storage */
  maxItems: number;
  /** Backend API base URL for HTTP mode */
  backendUrl: string;
}

/**
 * Retrieves service configuration from environment variables
 *
 * Reads VITE_API_MODE from import.meta.env and validates it against
 * allowed values. Defaults to CLI mode if not set or invalid.
 *
 * @returns {AppConfig} Typed configuration object
 */
export function getServiceConfig(): AppConfig {
  const rawApiMode = import.meta.env.VITE_API_MODE;

  let apiMode: 'CLI' | 'HTTP' = 'CLI'; // Default to CLI mode

  if (rawApiMode === 'CLI' || rawApiMode === 'HTTP') {
    apiMode = rawApiMode;
  } else if (rawApiMode) {
    console.warn(
      `Invalid VITE_API_MODE value: "${rawApiMode}". Must be "CLI" or "HTTP". Defaulting to "CLI".`
    );
  }

  // In development, use empty string for relative URLs (Vite proxy)
  // In production, use the environment variable or default
  const backendUrl = import.meta.env.VITE_BACKEND_URL || '';

  return {
    apiMode,
    storageKey: STORAGE_KEYS.ITINERARY_HISTORY,
    maxItems: 10,
    backendUrl
  };
}
