/**
 * ValidationService Test Suite
 *
 * Comprehensive tests covering validation success and failure scenarios.
 */

import { describe, test, expect, beforeEach, vi } from 'vitest';
import { ValidationService } from './ValidationService';
import type { ItineraryRequest, ItineraryResponse } from '../types';

describe('ValidationService', () => {
  let validationService: ValidationService;

  beforeEach(() => {
    validationService = new ValidationService();
    vi.clearAllMocks();
  });

  describe('validateFormInput', () => {
    test('successfully validates valid form input', () => {
      const validFormData: ItineraryRequest = {
        destination: 'Tokyo',
        partyInfo: 'Solo traveler',
        month: 'March',
        days: 7
      };

      const result = validationService.validateFormInput(validFormData);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(validFormData);
      expect(result.errors).toBeUndefined();
    });

    test('fails validation when destination is missing', () => {
      const invalidFormData = {
        partyInfo: 'Solo traveler',
        month: 'March',
        days: 7
      };

      const result = validationService.validateFormInput(invalidFormData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.some(err => err.includes('destination'))).toBe(true);
      expect(result.data).toBeUndefined();
    });

    test('fails validation when destination is empty string', () => {
      const invalidFormData = {
        destination: '',
        partyInfo: 'Solo traveler',
        month: 'March',
        days: 7
      };

      const result = validationService.validateFormInput(invalidFormData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.some(err => err.includes('Destination is required'))).toBe(true);
    });

    test('fails validation when partyInfo is missing', () => {
      const invalidFormData = {
        destination: 'Tokyo',
        month: 'March',
        days: 7
      };

      const result = validationService.validateFormInput(invalidFormData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.some(err => err.includes('partyInfo'))).toBe(true);
    });

    test('fails validation when month is missing', () => {
      const invalidFormData = {
        destination: 'Tokyo',
        partyInfo: 'Solo traveler',
        days: 7
      };

      const result = validationService.validateFormInput(invalidFormData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.some(err => err.includes('month'))).toBe(true);
    });

    test('fails validation when days is less than 1', () => {
      const invalidFormData = {
        destination: 'Tokyo',
        partyInfo: 'Solo traveler',
        month: 'March',
        days: 0
      };

      const result = validationService.validateFormInput(invalidFormData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.some(err => err.includes('at least 1 day'))).toBe(true);
    });

    test('fails validation when days exceeds 30', () => {
      const invalidFormData = {
        destination: 'Tokyo',
        partyInfo: 'Solo traveler',
        month: 'March',
        days: 31
      };

      const result = validationService.validateFormInput(invalidFormData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.some(err => err.includes('not exceed 30 days'))).toBe(true);
    });

    test('fails validation when days is not a number', () => {
      const invalidFormData = {
        destination: 'Tokyo',
        partyInfo: 'Solo traveler',
        month: 'March',
        days: 'seven'
      };

      const result = validationService.validateFormInput(invalidFormData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.some(err => err.includes('days'))).toBe(true);
    });
  });

  describe('validateApiResponse', () => {
    test('successfully validates valid API response', () => {
      const validResponse: ItineraryResponse = {
        destination: 'Tokyo',
        party_info: 'Solo traveler',
        month: 'March',
        days: 3,
        itinerary: [
          {
            day: 1,
            morning: [
              {
                attraction: 'Senso-ji Temple',
                attraction_description: 'Ancient Buddhist temple',
                what_to_do: ['Visit temple grounds', 'Shop at Nakamise'],
                where_to_eat: 'Asakusa restaurants'
              }
            ],
            afternoon: null,
            evening: [
              {
                attraction: 'Tokyo Skytree',
                attraction_description: 'Tallest tower in Japan',
                what_to_do: ['Visit observation deck'],
                where_to_eat: 'Skytree restaurants'
              }
            ],
            night: null
          }
        ]
      };

      const result = validationService.validateApiResponse(validResponse);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(validResponse);
      expect(result.errors).toBeUndefined();
    });

    test('successfully validates response with optional night and late_night periods', () => {
      const validResponse: ItineraryResponse = {
        destination: 'Tokyo',
        party_info: 'Solo traveler',
        month: 'March',
        days: 1,
        itinerary: [
          {
            day: 1,
            morning: null,
            afternoon: null,
            evening: null,
            night: [
              {
                attraction: 'Night attraction',
                attraction_description: 'Description',
                what_to_do: ['Activity'],
                where_to_eat: 'Restaurant'
              }
            ],
            late_night: [
              {
                attraction: 'Late night attraction',
                attraction_description: 'Description',
                what_to_do: ['Activity'],
                where_to_eat: 'Restaurant'
              }
            ]
          }
        ]
      };

      const result = validationService.validateApiResponse(validResponse);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(validResponse);
    });

    test('fails validation when destination is missing', () => {
      const invalidResponse = {
        party_info: 'Solo traveler',
        month: 'March',
        days: 3,
        itinerary: []
      };

      const result = validationService.validateApiResponse(invalidResponse);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.some(err => err.includes('destination'))).toBe(true);
    });

    test('fails validation when itinerary is not an array', () => {
      const invalidResponse = {
        destination: 'Tokyo',
        party_info: 'Solo traveler',
        month: 'March',
        days: 3,
        itinerary: 'not an array'
      };

      const result = validationService.validateApiResponse(invalidResponse);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.some(err => err.includes('itinerary'))).toBe(true);
    });

    test('fails validation when day structure is invalid', () => {
      const invalidResponse = {
        destination: 'Tokyo',
        party_info: 'Solo traveler',
        month: 'March',
        days: 1,
        itinerary: [
          {
            day: 'not a number',
            morning: null,
            afternoon: null,
            evening: null
          }
        ]
      };

      const result = validationService.validateApiResponse(invalidResponse);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });

    test('fails validation when time period activity is missing required fields', () => {
      const invalidResponse = {
        destination: 'Tokyo',
        party_info: 'Solo traveler',
        month: 'March',
        days: 1,
        itinerary: [
          {
            day: 1,
            morning: [
              {
                attraction: 'Temple',
                attraction_description: 'Description'
                // Missing what_to_do and where_to_eat
              }
            ],
            afternoon: null,
            evening: null
          }
        ]
      };

      const result = validationService.validateApiResponse(invalidResponse);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });

    test('fails validation when what_to_do is empty array', () => {
      const invalidResponse = {
        destination: 'Tokyo',
        party_info: 'Solo traveler',
        month: 'March',
        days: 1,
        itinerary: [
          {
            day: 1,
            morning: [
              {
                attraction: 'Temple',
                attraction_description: 'Description',
                what_to_do: [],
                where_to_eat: 'Restaurant'
              }
            ],
            afternoon: null,
            evening: null
          }
        ]
      };

      const result = validationService.validateApiResponse(invalidResponse);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.some(err => err.includes('what_to_do'))).toBe(true);
    });
  });

  describe('error formatting', () => {
    test('formats multiple validation errors correctly', () => {
      const invalidFormData = {
        destination: '',
        partyInfo: '',
        month: '',
        days: 0
      };

      const result = validationService.validateFormInput(invalidFormData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors!.length).toBeGreaterThan(0);

      result.errors!.forEach(error => {
        expect(error).toContain(':');
        expect(typeof error).toBe('string');
      });
    });

    test('error messages are user-friendly and actionable', () => {
      const invalidFormData = {
        destination: '',
        partyInfo: 'Solo traveler',
        month: 'March',
        days: 7
      };

      const result = validationService.validateFormInput(invalidFormData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.some(err => err.includes('required'))).toBe(true);
    });
  });

  describe('console logging', () => {
    test('logs validation errors to console when LOG_ERRORS is true', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const invalidFormData = {
        destination: '',
        partyInfo: 'Solo traveler',
        month: 'March',
        days: 7
      };

      validationService.validateFormInput(invalidFormData);

      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });
});
