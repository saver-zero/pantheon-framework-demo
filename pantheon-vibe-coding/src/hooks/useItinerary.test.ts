import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useItinerary } from './useItinerary';
import { ItineraryProvider } from '../context/ItineraryContext';
import type { IItineraryService } from '../services/api/IItineraryService';

const mockApiClient: IItineraryService = {
  generateItinerary: vi.fn(),
  getHistory: vi.fn(),
  saveToHistory: vi.fn(),
};

vi.mock('../services/api/ApiClientFactory', () => ({
  ApiClientFactory: {
    create: () => mockApiClient,
  },
}));

describe('useItinerary', () => {
  it('should return context value when used within provider', () => {
    const { result } = renderHook(() => useItinerary(), {
      wrapper: ItineraryProvider,
    });

    expect(result.current).toBeDefined();
    expect(result.current.currentItinerary).toBeNull();
    expect(result.current.history).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.generateItinerary).toBe('function');
    expect(typeof result.current.loadHistory).toBe('function');
    expect(typeof result.current.clearError).toBe('function');
  });

  it('should throw error when used outside provider', () => {
    expect(() => {
      renderHook(() => useItinerary());
    }).toThrow('useItinerary must be used within an ItineraryProvider');
  });

  it('should provide helpful error message when used outside provider', () => {
    let errorMessage = '';

    try {
      renderHook(() => useItinerary());
    } catch (error) {
      errorMessage = (error as Error).message;
    }

    expect(errorMessage).toContain('useItinerary');
    expect(errorMessage).toContain('ItineraryProvider');
  });
});
