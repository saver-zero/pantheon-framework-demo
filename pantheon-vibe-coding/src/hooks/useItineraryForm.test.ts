/**
 * Unit tests for useItineraryForm hook
 */

import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useItineraryForm } from './useItineraryForm';
import { DEFAULT_DAYS, MONTH_OPTIONS } from './FormConstants';

describe('useItineraryForm', () => {
  describe('initial state', () => {
    it('initializes with empty strings for text fields', () => {
      const { result } = renderHook(() => useItineraryForm());

      expect(result.current.values.destination).toBe('');
      expect(result.current.values.partyInfo).toBe('');
      expect(result.current.values.month).toBe('');
    });

    it('initializes days with DEFAULT_DAYS constant', () => {
      const { result } = renderHook(() => useItineraryForm());

      expect(result.current.values.days).toBe(DEFAULT_DAYS);
    });

    it('initializes with empty errors object', () => {
      const { result } = renderHook(() => useItineraryForm());

      expect(result.current.errors).toEqual({});
    });

    it('provides MONTH_OPTIONS constant', () => {
      const { result } = renderHook(() => useItineraryForm());

      expect(result.current.MONTH_OPTIONS).toEqual(MONTH_OPTIONS);
      expect(result.current.MONTH_OPTIONS.length).toBe(12);
    });
  });

  describe('setters', () => {
    it('updates destination when setDestination is called', () => {
      const { result } = renderHook(() => useItineraryForm());

      act(() => {
        result.current.setters.setDestination('Paris');
      });

      expect(result.current.values.destination).toBe('Paris');
    });

    it('updates partyInfo when setPartyInfo is called', () => {
      const { result } = renderHook(() => useItineraryForm());

      act(() => {
        result.current.setters.setPartyInfo('2 adults, 1 child');
      });

      expect(result.current.values.partyInfo).toBe('2 adults, 1 child');
    });

    it('updates month when setMonth is called', () => {
      const { result } = renderHook(() => useItineraryForm());

      act(() => {
        result.current.setters.setMonth('May');
      });

      expect(result.current.values.month).toBe('May');
    });

    it('updates days when setDays is called', () => {
      const { result } = renderHook(() => useItineraryForm());

      act(() => {
        result.current.setters.setDays(7);
      });

      expect(result.current.values.days).toBe(7);
    });
  });

  describe('validation', () => {
    it('returns true for valid form data', () => {
      const { result } = renderHook(() => useItineraryForm());

      act(() => {
        result.current.setters.setDestination('Tokyo');
        result.current.setters.setPartyInfo('2 adults');
        result.current.setters.setMonth('June');
        result.current.setters.setDays(5);
      });

      let isValid = false;
      act(() => {
        isValid = result.current.validate();
      });

      expect(isValid).toBe(true);
      expect(result.current.errors).toEqual({});
    });

    it('returns false and sets errors when destination is missing', () => {
      const { result } = renderHook(() => useItineraryForm());

      act(() => {
        result.current.setters.setDestination('');
        result.current.setters.setPartyInfo('2 adults');
        result.current.setters.setMonth('June');
        result.current.setters.setDays(5);
      });

      let isValid = true;
      act(() => {
        isValid = result.current.validate();
      });

      expect(isValid).toBe(false);
      expect(result.current.errors.destination).toBeTruthy();
    });

    it('returns false and sets errors when partyInfo is missing', () => {
      const { result } = renderHook(() => useItineraryForm());

      act(() => {
        result.current.setters.setDestination('Paris');
        result.current.setters.setPartyInfo('');
        result.current.setters.setMonth('June');
        result.current.setters.setDays(5);
      });

      let isValid = true;
      act(() => {
        isValid = result.current.validate();
      });

      expect(isValid).toBe(false);
      expect(result.current.errors.partyInfo).toBeTruthy();
    });

    it('returns false and sets errors when month is missing', () => {
      const { result } = renderHook(() => useItineraryForm());

      act(() => {
        result.current.setters.setDestination('Paris');
        result.current.setters.setPartyInfo('2 adults');
        result.current.setters.setMonth('');
        result.current.setters.setDays(5);
      });

      let isValid = true;
      act(() => {
        isValid = result.current.validate();
      });

      expect(isValid).toBe(false);
      expect(result.current.errors.month).toBeTruthy();
    });

    it('returns false and sets errors when days is below minimum', () => {
      const { result } = renderHook(() => useItineraryForm());

      act(() => {
        result.current.setters.setDestination('Paris');
        result.current.setters.setPartyInfo('2 adults');
        result.current.setters.setMonth('June');
        result.current.setters.setDays(0);
      });

      let isValid = true;
      act(() => {
        isValid = result.current.validate();
      });

      expect(isValid).toBe(false);
      expect(result.current.errors.days).toBeTruthy();
    });

    it('returns false and sets errors when days exceeds maximum', () => {
      const { result } = renderHook(() => useItineraryForm());

      act(() => {
        result.current.setters.setDestination('Paris');
        result.current.setters.setPartyInfo('2 adults');
        result.current.setters.setMonth('June');
        result.current.setters.setDays(31);
      });

      let isValid = true;
      act(() => {
        isValid = result.current.validate();
      });

      expect(isValid).toBe(false);
      expect(result.current.errors.days).toBeTruthy();
    });

    it('returns false and sets multiple errors when multiple fields are invalid', () => {
      const { result } = renderHook(() => useItineraryForm());

      // Leave all required fields empty
      act(() => {
        result.current.setters.setDestination('');
        result.current.setters.setPartyInfo('');
        result.current.setters.setMonth('');
        result.current.setters.setDays(0);
      });

      let isValid = true;
      act(() => {
        isValid = result.current.validate();
      });

      expect(isValid).toBe(false);
      expect(Object.keys(result.current.errors).length).toBeGreaterThan(0);
    });

    it('clears errors when validation passes after previous failure', () => {
      const { result } = renderHook(() => useItineraryForm());

      // First validation fails
      act(() => {
        result.current.setters.setDestination('');
        result.current.validate();
      });

      expect(result.current.errors.destination).toBeTruthy();

      // Fix the issue
      act(() => {
        result.current.setters.setDestination('Paris');
        result.current.setters.setPartyInfo('2 adults');
        result.current.setters.setMonth('June');
        result.current.setters.setDays(5);
      });

      // Validate again in a separate act to ensure state has updated
      act(() => {
        result.current.validate();
      });

      expect(result.current.errors).toEqual({});
    });
  });

  describe('reset', () => {
    it('clears all fields when reset is called', () => {
      const { result } = renderHook(() => useItineraryForm());

      // Set all fields
      act(() => {
        result.current.setters.setDestination('Paris');
        result.current.setters.setPartyInfo('2 adults');
        result.current.setters.setMonth('June');
        result.current.setters.setDays(7);
      });

      // Reset
      act(() => {
        result.current.reset();
      });

      expect(result.current.values.destination).toBe('');
      expect(result.current.values.partyInfo).toBe('');
      expect(result.current.values.month).toBe('');
      expect(result.current.values.days).toBe(DEFAULT_DAYS);
    });

    it('clears errors when reset is called', () => {
      const { result } = renderHook(() => useItineraryForm());

      // Trigger validation error
      act(() => {
        result.current.validate();
      });

      expect(Object.keys(result.current.errors).length).toBeGreaterThan(0);

      // Reset
      act(() => {
        result.current.reset();
      });

      expect(result.current.errors).toEqual({});
    });
  });
});
