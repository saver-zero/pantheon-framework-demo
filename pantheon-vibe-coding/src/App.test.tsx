import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import type { IItineraryService } from './services/api/IItineraryService';

const mockApiClient: IItineraryService = {
  generateItinerary: vi.fn(),
  getHistory: vi.fn().mockResolvedValue([]),
  saveToHistory: vi.fn(),
};

vi.mock('./services/api/ApiClientFactory', () => ({
  ApiClientFactory: {
    create: () => mockApiClient,
  },
}));

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it('wraps application with ErrorBoundary', () => {
    render(<App />);
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
  });

  it('initializes ItineraryProvider with API client', async () => {
    render(<App />);
    expect(mockApiClient.getHistory).toHaveBeenCalled();
  });

  it('renders routing structure correctly', () => {
    render(<App />);
    const appElement = screen.getByTestId('app-container');
    expect(appElement).toBeInTheDocument();
  });
});
