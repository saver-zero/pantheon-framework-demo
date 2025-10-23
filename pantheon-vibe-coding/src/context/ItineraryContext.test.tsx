import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ItineraryProvider, ItineraryContext } from './ItineraryContext';
import { useContext } from 'react';
import type { IItineraryService } from '../services/api/IItineraryService';
import type { ItineraryRequest, ItineraryResponse } from '../types';

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

const mockItineraryResponse: ItineraryResponse = {
  destination: 'Paris',
  party_info: '2 adults',
  month: 'May',
  days: 3,
  itinerary: [
    {
      day: 1,
      morning: [
        {
          attraction: 'Eiffel Tower',
          attraction_description: 'Iconic landmark in Paris',
          what_to_do: ['Visit observation deck', 'Take photos'],
          where_to_eat: 'Le Jules Verne restaurant',
        },
      ],
      afternoon: null,
      evening: null,
      night: null,
      late_night: null,
    },
  ],
};

const TestConsumer = () => {
  const context = useContext(ItineraryContext);
  if (!context) throw new Error('Must be used within provider');

  return (
    <div>
      <div data-testid="loading">{String(context.isLoading)}</div>
      <div data-testid="error">{context.error || 'null'}</div>
      <div data-testid="current">{context.currentItinerary?.destination || 'null'}</div>
      <div data-testid="history-count">{context.history.length}</div>
      <button onClick={() => context.generateItinerary({
        destination: 'Paris',
        partyInfo: '2 adults',
        month: 'May',
        days: 5,
      })}>Generate</button>
      <button onClick={context.loadHistory}>Load History</button>
      <button onClick={context.clearError}>Clear Error</button>
    </div>
  );
};

describe('ItineraryContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct default state', () => {
    render(
      <ItineraryProvider>
        <TestConsumer />
      </ItineraryProvider>
    );

    expect(screen.getByTestId('loading')).toHaveTextContent('false');
    expect(screen.getByTestId('error')).toHaveTextContent('null');
    expect(screen.getByTestId('current')).toHaveTextContent('null');
    expect(screen.getByTestId('history-count')).toHaveTextContent('0');
  });

  it('should generate itinerary successfully and update state', async () => {
    (mockApiClient.generateItinerary as ReturnType<typeof vi.fn>).mockResolvedValue(mockItineraryResponse);
    (mockApiClient.getHistory as ReturnType<typeof vi.fn>).mockResolvedValue([mockItineraryResponse]);

    render(
      <ItineraryProvider>
        <TestConsumer />
      </ItineraryProvider>
    );

    const generateButton = screen.getByText('Generate');
    generateButton.click();

    await waitFor(() => {
      expect(screen.getByTestId('current')).toHaveTextContent('Paris');
    });

    expect(mockApiClient.generateItinerary).toHaveBeenCalledWith({
      destination: 'Paris',
      partyInfo: '2 adults',
      month: 'May',
      days: 5,
    });
  });

  it('should set error message when generateItinerary fails', async () => {
    const errorMessage = 'API Error: Failed to generate itinerary';
    (mockApiClient.generateItinerary as ReturnType<typeof vi.fn>).mockRejectedValue(new Error(errorMessage));

    render(
      <ItineraryProvider>
        <TestConsumer />
      </ItineraryProvider>
    );

    const generateButton = screen.getByText('Generate');
    generateButton.click();

    await waitFor(() => {
      expect(screen.getByTestId('error')).not.toHaveTextContent('null');
    });
  });

  it('should load history from API client', async () => {
    const mockHistory = [mockItineraryResponse, { ...mockItineraryResponse, destination: 'London' }];
    (mockApiClient.getHistory as ReturnType<typeof vi.fn>).mockResolvedValue(mockHistory);

    render(
      <ItineraryProvider>
        <TestConsumer />
      </ItineraryProvider>
    );

    const loadHistoryButton = screen.getByText('Load History');
    loadHistoryButton.click();

    await waitFor(() => {
      expect(screen.getByTestId('history-count')).toHaveTextContent('2');
    });

    expect(mockApiClient.getHistory).toHaveBeenCalled();
  });

  it('should clear error state when clearError is called', async () => {
    (mockApiClient.generateItinerary as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Test error'));

    render(
      <ItineraryProvider>
        <TestConsumer />
      </ItineraryProvider>
    );

    const generateButton = screen.getByText('Generate');
    generateButton.click();

    await waitFor(() => {
      expect(screen.getByTestId('error')).not.toHaveTextContent('null');
    });

    const clearButton = screen.getByText('Clear Error');
    clearButton.click();

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('null');
    });
  });

  it('should set loading state during API call', async () => {
    let resolveGenerate: (value: ItineraryResponse) => void;
    const generatePromise = new Promise<ItineraryResponse>((resolve) => {
      resolveGenerate = resolve;
    });

    (mockApiClient.generateItinerary as ReturnType<typeof vi.fn>).mockReturnValue(generatePromise);

    render(
      <ItineraryProvider>
        <TestConsumer />
      </ItineraryProvider>
    );

    const generateButton = screen.getByText('Generate');
    generateButton.click();

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('true');
    });

    resolveGenerate!(mockItineraryResponse);

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });
  });

  it('should load initial history on mount', async () => {
    const mockHistory = [mockItineraryResponse];
    (mockApiClient.getHistory as ReturnType<typeof vi.fn>).mockResolvedValue(mockHistory);

    render(
      <ItineraryProvider>
        <TestConsumer />
      </ItineraryProvider>
    );

    await waitFor(() => {
      expect(mockApiClient.getHistory).toHaveBeenCalled();
    });
  });
});
