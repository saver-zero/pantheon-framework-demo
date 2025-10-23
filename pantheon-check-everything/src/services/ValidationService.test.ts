import { describe, it, expect } from 'vitest';
import { ValidationService, ValidationError } from './ValidationService';
import type { Itinerary } from '../types/itinerary';

describe('ValidationService', () => {
  const validator = new ValidationService();

  describe('Valid itinerary data passes validation', () => {
    it('should accept complete valid itinerary and return typed Itinerary object', () => {
      // Arrange
      const validItinerary = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 3,
        itinerary: [
          {
            day: 1,
            morning: [
              {
                attraction: 'Senso-ji Temple',
                attraction_description: 'Historic Buddhist temple in Asakusa',
                what_to_do: ['Visit temple grounds', 'Shop at Nakamise Street', 'Take photos'],
                where_to_eat: 'Traditional ramen shop nearby'
              }
            ],
            afternoon: [
              {
                attraction: 'Tokyo Skytree',
                attraction_description: 'Tallest structure in Japan',
                what_to_do: ['Visit observation deck'],
                where_to_eat: 'Skytree Town restaurants'
              }
            ],
            evening: null
          },
          {
            day: 2,
            morning: null,
            afternoon: null,
            evening: [
              {
                attraction: 'Shibuya Crossing',
                attraction_description: 'Famous intersection',
                what_to_do: ['Experience the crossing', 'Visit Hachiko statue'],
                where_to_eat: 'Izakaya in Shibuya'
              }
            ],
            night: [
              {
                attraction: 'Roppongi Hills',
                attraction_description: 'Entertainment district',
                what_to_do: ['Nightlife'],
                where_to_eat: 'Fine dining'
              }
            ],
            late_night: null
          },
          {
            day: 3,
            morning: null,
            afternoon: null,
            evening: null
          }
        ]
      };

      // Act
      const result = validator.validateItinerary(validItinerary);

      // Assert
      expect(result).toEqual(validItinerary);
      expect(result.destination).toBe('Tokyo');
      expect(result.party_info).toBe('couple');
      expect(result.days).toBe(3);
      expect(result.itinerary).toHaveLength(3);
    });

    it('should accept itinerary with all time periods as null', () => {
      // Arrange
      const validItinerary = {
        destination: 'Paris',
        party_info: 'family',
        month: 'June',
        days: 2,
        itinerary: [
          {
            day: 1,
            morning: null,
            afternoon: null,
            evening: null
          },
          {
            day: 2,
            morning: null,
            afternoon: null,
            evening: null,
            night: null,
            late_night: null
          }
        ]
      };

      // Act
      const result = validator.validateItinerary(validItinerary);

      // Assert
      expect(result).toEqual(validItinerary);
      expect(result.itinerary[0].morning).toBeNull();
      expect(result.itinerary[1].night).toBeNull();
    });

    it('should accept itinerary with minimal what_to_do array (single item)', () => {
      // Arrange
      const validItinerary = {
        destination: 'London',
        party_info: 'solo',
        month: 'September',
        days: 1,
        itinerary: [
          {
            day: 1,
            morning: [
              {
                attraction: 'British Museum',
                attraction_description: 'World-famous museum',
                what_to_do: ['Visit exhibits'],
                where_to_eat: 'Museum cafe'
              }
            ],
            afternoon: null,
            evening: null
          }
        ]
      };

      // Act
      const result = validator.validateItinerary(validItinerary);

      // Assert
      expect(result).toEqual(validItinerary);
      expect(result.itinerary[0].morning![0].what_to_do).toHaveLength(1);
    });
  });

  describe('Missing required fields are rejected with clear error messages', () => {
    it('should reject itinerary missing destination field', () => {
      // Arrange
      const invalidData = {
        // missing destination
        party_info: 'couple',
        month: 'March',
        days: 3,
        itinerary: []
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
      expect(() => validator.validateItinerary(invalidData)).toThrow(/destination/i);
    });

    it('should reject itinerary missing party_info field', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        // missing party_info
        month: 'March',
        days: 3,
        itinerary: []
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
      expect(() => validator.validateItinerary(invalidData)).toThrow(/party_info/i);
    });

    it('should reject itinerary missing month field', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 'couple',
        // missing month
        days: 3,
        itinerary: []
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
      expect(() => validator.validateItinerary(invalidData)).toThrow(/month/i);
    });

    it('should reject itinerary missing days field', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        // missing days
        itinerary: []
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
      expect(() => validator.validateItinerary(invalidData)).toThrow(/days/i);
    });

    it('should reject itinerary missing itinerary field', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 3
        // missing itinerary array
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
      expect(() => validator.validateItinerary(invalidData)).toThrow(/itinerary/i);
    });

    it('should reject Day missing day number field', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 1,
        itinerary: [
          {
            // missing day number
            morning: null,
            afternoon: null,
            evening: null
          }
        ]
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
      expect(() => validator.validateItinerary(invalidData)).toThrow(/day/i);
    });

    it('should reject Day missing morning field', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 1,
        itinerary: [
          {
            day: 1,
            // missing morning
            afternoon: null,
            evening: null
          }
        ]
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
      expect(() => validator.validateItinerary(invalidData)).toThrow(/morning/i);
    });

    it('should reject Day missing afternoon field', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 1,
        itinerary: [
          {
            day: 1,
            morning: null,
            // missing afternoon
            evening: null
          }
        ]
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
      expect(() => validator.validateItinerary(invalidData)).toThrow(/afternoon/i);
    });

    it('should reject Day missing evening field', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 1,
        itinerary: [
          {
            day: 1,
            morning: null,
            afternoon: null
            // missing evening
          }
        ]
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
      expect(() => validator.validateItinerary(invalidData)).toThrow(/evening/i);
    });

    it('should reject Activity missing attraction field', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 1,
        itinerary: [
          {
            day: 1,
            morning: [
              {
                // missing attraction
                attraction_description: 'Description',
                what_to_do: ['Visit'],
                where_to_eat: 'Restaurant'
              }
            ],
            afternoon: null,
            evening: null
          }
        ]
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
      expect(() => validator.validateItinerary(invalidData)).toThrow(/attraction/i);
    });

    it('should reject Activity missing attraction_description field', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 1,
        itinerary: [
          {
            day: 1,
            morning: [
              {
                attraction: 'Temple',
                // missing attraction_description
                what_to_do: ['Visit'],
                where_to_eat: 'Restaurant'
              }
            ],
            afternoon: null,
            evening: null
          }
        ]
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
      expect(() => validator.validateItinerary(invalidData)).toThrow(/attraction_description/i);
    });

    it('should reject Activity missing what_to_do field', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 1,
        itinerary: [
          {
            day: 1,
            morning: [
              {
                attraction: 'Temple',
                attraction_description: 'Description',
                // missing what_to_do
                where_to_eat: 'Restaurant'
              }
            ],
            afternoon: null,
            evening: null
          }
        ]
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
      expect(() => validator.validateItinerary(invalidData)).toThrow(/what_to_do/i);
    });

    it('should reject Activity missing where_to_eat field', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 1,
        itinerary: [
          {
            day: 1,
            morning: [
              {
                attraction: 'Temple',
                attraction_description: 'Description',
                what_to_do: ['Visit']
                // missing where_to_eat
              }
            ],
            afternoon: null,
            evening: null
          }
        ]
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
      expect(() => validator.validateItinerary(invalidData)).toThrow(/where_to_eat/i);
    });
  });

  describe('Invalid data types are rejected with type mismatch errors', () => {
    it('should reject itinerary with destination as number instead of string', () => {
      // Arrange
      const invalidData = {
        destination: 123, // wrong type
        party_info: 'couple',
        month: 'March',
        days: 3,
        itinerary: []
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
    });

    it('should reject itinerary with party_info as number instead of string', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 456, // wrong type
        month: 'March',
        days: 3,
        itinerary: []
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
    });

    it('should reject itinerary with month as number instead of string', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 3, // wrong type
        days: 3,
        itinerary: []
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
    });

    it('should reject itinerary with days as string instead of number', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: '3', // wrong type
        itinerary: []
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
    });

    it('should reject itinerary with itinerary as object instead of array', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 3,
        itinerary: { day: 1 } // wrong type - should be array
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
    });

    it('should reject Day with day as string instead of number', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 1,
        itinerary: [
          {
            day: '1', // wrong type
            morning: null,
            afternoon: null,
            evening: null
          }
        ]
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
    });

    it('should reject Day with time period as string instead of array or null', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 1,
        itinerary: [
          {
            day: 1,
            morning: 'morning activities', // wrong type
            afternoon: null,
            evening: null
          }
        ]
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
    });

    it('should reject Activity with what_to_do as string instead of array', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 1,
        itinerary: [
          {
            day: 1,
            morning: [
              {
                attraction: 'Temple',
                attraction_description: 'Description',
                what_to_do: 'Visit temple', // wrong type - should be array
                where_to_eat: 'Restaurant'
              }
            ],
            afternoon: null,
            evening: null
          }
        ]
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
    });

    it('should reject Activity with attraction as number instead of string', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 1,
        itinerary: [
          {
            day: 1,
            morning: [
              {
                attraction: 123, // wrong type
                attraction_description: 'Description',
                what_to_do: ['Visit'],
                where_to_eat: 'Restaurant'
              }
            ],
            afternoon: null,
            evening: null
          }
        ]
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
    });
  });

  describe('Edge cases with null and empty values are handled correctly', () => {
    it('should accept null time periods as valid', () => {
      // Arrange
      const validData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 1,
        itinerary: [
          {
            day: 1,
            morning: null,
            afternoon: null,
            evening: null,
            night: null,
            late_night: null
          }
        ]
      };

      // Act & Assert
      expect(() => validator.validateItinerary(validData)).not.toThrow();
      const result = validator.validateItinerary(validData);
      expect(result.itinerary[0].morning).toBeNull();
      expect(result.itinerary[0].night).toBeNull();
    });

    it('should accept empty activity array as valid TimePeriod', () => {
      // Arrange
      const validData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 1,
        itinerary: [
          {
            day: 1,
            morning: [], // empty array is valid
            afternoon: null,
            evening: null
          }
        ]
      };

      // Act & Assert
      expect(() => validator.validateItinerary(validData)).not.toThrow();
      const result = validator.validateItinerary(validData);
      expect(result.itinerary[0].morning).toEqual([]);
    });

    it('should reject undefined time period for required fields', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 1,
        itinerary: [
          {
            day: 1,
            morning: undefined, // undefined not allowed, must be null or array
            afternoon: null,
            evening: null
          }
        ]
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
    });

    it('should reject empty what_to_do array due to min(1) constraint', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 1,
        itinerary: [
          {
            day: 1,
            morning: [
              {
                attraction: 'Temple',
                attraction_description: 'Description',
                what_to_do: [], // empty array violates min(1)
                where_to_eat: 'Restaurant'
              }
            ],
            afternoon: null,
            evening: null
          }
        ]
      };

      // Act & Assert
      expect(() => validator.validateItinerary(invalidData)).toThrow(ValidationError);
    });

    it('should accept empty itinerary array', () => {
      // Arrange
      const validData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 0,
        itinerary: [] // empty itinerary is structurally valid
      };

      // Act & Assert
      expect(() => validator.validateItinerary(validData)).not.toThrow();
      const result = validator.validateItinerary(validData);
      expect(result.itinerary).toEqual([]);
    });

    it('should accept optional night and late_night as undefined', () => {
      // Arrange
      const validData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 1,
        itinerary: [
          {
            day: 1,
            morning: null,
            afternoon: null,
            evening: null
            // night and late_night are optional and omitted
          }
        ]
      };

      // Act & Assert
      expect(() => validator.validateItinerary(validData)).not.toThrow();
      const result = validator.validateItinerary(validData);
      expect(result.itinerary[0].night).toBeUndefined();
      expect(result.itinerary[0].late_night).toBeUndefined();
    });
  });

  describe('Nested validation errors provide detailed context', () => {
    it('should provide path information for nested Activity field errors', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 1,
        itinerary: [
          {
            day: 1,
            morning: [
              {
                attraction: 'Temple',
                attraction_description: 'Description',
                // missing what_to_do field
                where_to_eat: 'Restaurant'
              }
            ],
            afternoon: null,
            evening: null
          }
        ]
      };

      // Act & Assert
      try {
        validator.validateItinerary(invalidData);
        expect.fail('Should have thrown ValidationError');
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        const validationError = error as ValidationError;
        expect(validationError.message).toContain('what_to_do');
        expect(validationError.errors).toBeDefined();
        expect(validationError.errors.length).toBeGreaterThan(0);
      }
    });

    it('should provide path information for deeply nested Day field errors', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 2,
        itinerary: [
          {
            day: 1,
            morning: null,
            afternoon: null,
            evening: null
          },
          {
            day: '2', // wrong type at index 1
            morning: null,
            afternoon: null,
            evening: null
          }
        ]
      };

      // Act & Assert
      try {
        validator.validateItinerary(invalidData);
        expect.fail('Should have thrown ValidationError');
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        const validationError = error as ValidationError;
        expect(validationError.errors).toBeDefined();
        expect(validationError.errors.length).toBeGreaterThan(0);
      }
    });

    it('should preserve Zod error details in ValidationError', () => {
      // Arrange
      const invalidData = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March'
        // missing days and itinerary
      };

      // Act & Assert
      try {
        validator.validateItinerary(invalidData);
        expect.fail('Should have thrown ValidationError');
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        const validationError = error as ValidationError;
        expect(validationError.errors).toBeDefined();
        expect(validationError.errors.length).toBeGreaterThan(0);
        expect(validationError.message).toBeTruthy();
      }
    });

    it('should provide clear error message for multiple validation failures', () => {
      // Arrange
      const invalidData = {
        destination: 123, // wrong type
        party_info: 'couple',
        month: 'March',
        days: '3', // wrong type
        itinerary: 'not an array' // wrong type
      };

      // Act & Assert
      try {
        validator.validateItinerary(invalidData);
        expect.fail('Should have thrown ValidationError');
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        const validationError = error as ValidationError;
        expect(validationError.errors).toBeDefined();
        expect(validationError.errors.length).toBeGreaterThanOrEqual(3);
      }
    });
  });

  describe('ValidationError class', () => {
    it('should extend Error class', () => {
      // Arrange
      const invalidData = { incomplete: 'data' };

      // Act & Assert
      try {
        validator.validateItinerary(invalidData);
        expect.fail('Should have thrown ValidationError');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(ValidationError);
      }
    });

    it('should have meaningful error message', () => {
      // Arrange
      const invalidData = { incomplete: 'data' };

      // Act & Assert
      try {
        validator.validateItinerary(invalidData);
        expect.fail('Should have thrown ValidationError');
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        const validationError = error as ValidationError;
        expect(validationError.message).toBeTruthy();
        expect(validationError.message.length).toBeGreaterThan(0);
      }
    });

    it('should store original Zod errors for debugging', () => {
      // Arrange
      const invalidData = { incomplete: 'data' };

      // Act & Assert
      try {
        validator.validateItinerary(invalidData);
        expect.fail('Should have thrown ValidationError');
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        const validationError = error as ValidationError;
        expect(validationError.errors).toBeDefined();
        expect(Array.isArray(validationError.errors)).toBe(true);
      }
    });
  });
});
