/**
 * Error Handler Service Test Suite
 *
 * Tests covering API error handling, validation error handling, unknown error handling,
 * error logging, and configuration flag behavior.
 */

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { ErrorHandlerService, ApiError, ValidationError } from './ErrorHandlerService';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    service = new ErrorHandlerService();
    // Mock console.error to capture logging
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.error after each test
    consoleErrorSpy.mockRestore();
  });

  describe('handleApiError', () => {
    test('should handle network errors with connection message', () => {
      const networkError = new Error('Network request failed');
      networkError.name = 'NetworkError';

      const message = service.handleApiError(networkError);

      expect(message).toBe('Unable to connect to the server. Please check your internet connection and try again.');
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    test('should handle fetch errors', () => {
      const fetchError = new Error('Failed to fetch');

      const message = service.handleApiError(fetchError);

      expect(message).toBe('Unable to connect to the server. Please check your internet connection and try again.');
    });

    test('should handle timeout errors', () => {
      const timeoutError = new Error('Request timeout');

      const message = service.handleApiError(timeoutError);

      expect(message).toBe('Unable to connect to the server. Please check your internet connection and try again.');
    });

    test('should handle 400 Bad Request', () => {
      const error = new ApiError('Bad request', 400);

      const message = service.handleApiError(error);

      expect(message).toBe('Invalid request. Please check your input and try again.');
    });

    test('should handle 401 Unauthorized', () => {
      const error = new ApiError('Unauthorized', 401);

      const message = service.handleApiError(error);

      expect(message).toBe('Authentication required. Please sign in and try again.');
    });

    test('should handle 403 Forbidden', () => {
      const error = new ApiError('Forbidden', 403);

      const message = service.handleApiError(error);

      expect(message).toBe('You do not have permission to perform this action.');
    });

    test('should handle 404 Not Found', () => {
      const error = new ApiError('Not found', 404);

      const message = service.handleApiError(error);

      expect(message).toBe('The requested resource was not found.');
    });

    test('should handle 429 Too Many Requests', () => {
      const error = new ApiError('Rate limit exceeded', 429);

      const message = service.handleApiError(error);

      expect(message).toBe('Too many requests. Please wait a moment and try again.');
    });

    test('should handle generic 4xx errors', () => {
      const error = new ApiError('Client error', 422);

      const message = service.handleApiError(error);

      expect(message).toBe('Invalid request. Please check your input and try again.');
    });

    test('should handle 500 Internal Server Error', () => {
      const error = new ApiError('Internal server error', 500);

      const message = service.handleApiError(error);

      expect(message).toBe('The server is experiencing issues. Please try again later.');
    });

    test('should handle 503 Service Unavailable', () => {
      const error = new ApiError('Service unavailable', 503);

      const message = service.handleApiError(error);

      expect(message).toBe('The server is experiencing issues. Please try again later.');
    });

    test('should handle generic HTTP errors', () => {
      const error = new Error('HTTP error occurred');

      const message = service.handleApiError(error);

      expect(message).toBe('The server encountered an error. Please try again later.');
    });

    test('should handle unknown errors', () => {
      const error = new Error('Something went wrong');

      const message = service.handleApiError(error);

      expect(message).toBe('An unexpected error occurred. Please try again.');
    });

    test('should handle non-Error objects', () => {
      const error = { message: 'Not an Error object' };

      const message = service.handleApiError(error);

      expect(message).toBe('An unexpected error occurred. Please try again.');
    });
  });

  describe('handleValidationError', () => {
    test('should format single validation error', () => {
      const error = new ValidationError('Validation failed', ['Name is required']);

      const message = service.handleValidationError(error);

      expect(message).toBe('Please correct the following: Name is required');
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    test('should format multiple validation errors', () => {
      const error = new ValidationError('Validation failed', [
        'Name is required',
        'Email must be valid',
        'Age must be a number'
      ]);

      const message = service.handleValidationError(error);

      expect(message).toContain('Please correct the following:');
      expect(message).toContain('Name is required');
      expect(message).toContain('Email must be valid');
      expect(message).toContain('Age must be a number');
    });

    test('should limit displayed errors to 3 and show remaining count', () => {
      const error = new ValidationError('Validation failed', [
        'Error 1',
        'Error 2',
        'Error 3',
        'Error 4',
        'Error 5'
      ]);

      const message = service.handleValidationError(error);

      expect(message).toContain('Error 1');
      expect(message).toContain('Error 2');
      expect(message).toContain('Error 3');
      expect(message).toContain('and 2 more');
      expect(message).not.toContain('Error 4');
    });

    test('should handle ValidationError without errors array', () => {
      const error = new ValidationError('Validation failed');

      const message = service.handleValidationError(error);

      // ValidationError extends Error, so it gets handled by the Error branch
      expect(message).toBe('Please check your input: Validation failed');
    });

    test('should handle generic Error objects', () => {
      const error = new Error('Invalid input');

      const message = service.handleValidationError(error);

      expect(message).toBe('Please check your input: Invalid input');
    });

    test('should handle unknown error types', () => {
      const error = 'String error';

      const message = service.handleValidationError(error);

      expect(message).toBe('Please check your input and try again.');
    });
  });

  describe('logError', () => {
    test('should log Error objects with context', () => {
      const error = new Error('Test error');

      service.logError(error, 'Test Context');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('[Test Context]')
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Error: Test error')
      );
    });

    test('should log Error objects without context', () => {
      const error = new Error('Test error');

      service.logError(error);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('[Error]')
      );
    });

    test('should log ApiError with status code', () => {
      const error = new ApiError('API failed', 404);

      service.logError(error, 'API');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('[API]')
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Status Code: 404')
      );
    });

    test('should log ValidationError with errors array', () => {
      const error = new ValidationError('Validation failed', ['Error 1', 'Error 2']);

      service.logError(error, 'Validation');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('[Validation]')
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Validation errors:'),
        ['Error 1', 'Error 2']
      );
    });

    test('should log unknown error types', () => {
      const error = { custom: 'error' };

      service.logError(error, 'Unknown');

      // console.error is called with a combined string and the error object
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('[Unknown] Unknown error:'),
        error
      );
    });
  });

  describe('custom error types', () => {
    test('ApiError should be instanceof Error', () => {
      const error = new ApiError('Test', 404);

      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe('ApiError');
      expect(error.statusCode).toBe(404);
    });

    test('ApiError should store original error', () => {
      const originalError = new Error('Original');
      const apiError = new ApiError('Wrapped', 500, originalError);

      expect(apiError.originalError).toBe(originalError);
    });

    test('ValidationError should be instanceof Error', () => {
      const error = new ValidationError('Test', ['Error 1']);

      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe('ValidationError');
      expect(error.errors).toEqual(['Error 1']);
    });
  });

  describe('error message quality', () => {
    test('should never expose technical details to users', () => {
      const error = new Error('Internal: Database connection failed at line 42');

      const message = service.handleApiError(error);

      expect(message).not.toContain('line 42');
      expect(message).not.toContain('Database');
      expect(message).not.toContain('Internal:');
    });

    test('should provide actionable messages for user errors', () => {
      const error = new ApiError('Bad request', 400);

      const message = service.handleApiError(error);

      expect(message.toLowerCase()).toContain('check');
      expect(message.toLowerCase()).toContain('try again');
    });

    test('should be concise and clear', () => {
      const error = new ApiError('Internal server error', 500);

      const message = service.handleApiError(error);

      expect(message.length).toBeLessThan(100);
      expect(message).toBeTruthy();
    });
  });
});
