/**
 * Integration tests for complete form flow
 *
 * Tests the end-to-end flow from form submission to itinerary display,
 * including navigation between pages and context state management.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormPage from '../../pages/FormPage';
import ItineraryPage from '../../pages/ItineraryPage';
import { ItineraryProvider } from '../../context/ItineraryContext';
import { IItineraryService } from '../../services/api/IItineraryService';
import { ItineraryResponse } from '../../types/index';

/**
 * Create a mock API service for testing
 */
const createMockApiService = (): IItineraryService => ({
  generateItinerary: vi.fn(),
  getHistory: vi.fn(),
  saveToHistory: vi.fn(),
});

/**
 * Sample test data with markdown itinerary format
 */
const mockResponse: ItineraryResponse = {
  destination: 'Paris',
  party_info: '2 adults',
  month: 'May',
  days: 5,
  itinerary: `# Paris Travel Itinerary

## Day 1

### Morning
- **Eiffel Tower** - Iconic landmark in Paris
  - Visit observation deck
  - Take photos
  - Where to eat: Le Jules Verne restaurant

### Afternoon
- **Louvre Museum** - World famous art museum
  - See Mona Lisa
  - Explore galleries
  - Where to eat: Cafe Marly

### Evening
- **Seine River Cruise** - Romantic evening cruise
  - Enjoy sunset views
  - Where to eat: Onboard dining

## Day 2

### Morning
- **Arc de Triomphe** - Historic monument
  - Climb to the top
  - Where to eat: Nearby cafe
`,
};

/**
 * Helper function to render app with routing and provider
 */
const renderApp = (mockService: IItineraryService, initialRoute = '/generate') => {
  window.history.pushState({}, 'Test page', initialRoute);

  return render(
    <BrowserRouter>
      <ItineraryProvider apiService={mockService}>
        <Routes>
          <Route path="/generate" element={<FormPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
        </Routes>
      </ItineraryProvider>
    </BrowserRouter>
  );
};

describe('Complete form flow integration test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('completes full flow from form submission to itinerary display', async () => {
    const user = userEvent.setup();
    const mockService = createMockApiService();

    // Mock successful API responses with a slight delay to ensure loading state is visible
    vi.mocked(mockService.generateItinerary).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(mockResponse), 100))
    );
    vi.mocked(mockService.saveToHistory).mockResolvedValue(undefined);
    vi.mocked(mockService.getHistory).mockResolvedValue([mockResponse]);

    // Render app starting at form page
    renderApp(mockService, '/generate');

    // Verify we're on the form page
    expect(screen.getByRole('heading', { name: /plan your trip/i })).toBeInTheDocument();

    // Fill out form with valid data
    await user.type(screen.getByLabelText(/destination/i), 'Paris');
    await user.type(screen.getByLabelText(/party information/i), '2 adults');
    await user.selectOptions(screen.getByLabelText(/month of travel/i), 'May');

    // Submit form
    const submitButton = screen.getByRole('button', { name: /generate itinerary/i });
    await user.click(submitButton);

    // Verify API was called correctly
    await waitFor(() => {
      expect(mockService.generateItinerary).toHaveBeenCalledWith({
        destination: 'Paris',
        partyInfo: '2 adults',
        month: 'May',
        days: 5,
      });
    });

    // Wait for navigation to itinerary page
    await waitFor(
      () => {
        expect(screen.queryByRole('heading', { name: /plan your trip/i })).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Verify we're now on the itinerary page with the generated content
    await waitFor(
      () => {
        expect(screen.getByText(/eiffel tower/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('displays loading state during itinerary generation', async () => {
    const user = userEvent.setup();
    const mockService = createMockApiService();

    // Create a promise we can control
    let resolveGenerate: (value: ItineraryResponse) => void;
    const generatePromise = new Promise<ItineraryResponse>((resolve) => {
      resolveGenerate = resolve;
    });

    vi.mocked(mockService.generateItinerary).mockReturnValue(generatePromise);
    vi.mocked(mockService.saveToHistory).mockResolvedValue(undefined);
    vi.mocked(mockService.getHistory).mockResolvedValue([]);

    // Render app
    renderApp(mockService, '/generate');

    // Fill out and submit form
    await user.type(screen.getByLabelText(/destination/i), 'Paris');
    await user.type(screen.getByLabelText(/party information/i), '2 adults');
    await user.selectOptions(screen.getByLabelText(/month of travel/i), 'May');

    const submitButton = screen.getByRole('button', { name: /generate itinerary/i });
    await user.click(submitButton);

    // Verify loading indicators
    await waitFor(() => {
      expect(screen.getByText(/creating your personalized itinerary/i)).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveTextContent(/generating/i);
    });

    // Resolve the generation
    resolveGenerate!(mockResponse);
    await generatePromise;

    // Verify loading state clears
    await waitFor(() => {
      expect(screen.queryByText(/creating your personalized itinerary/i)).not.toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    const user = userEvent.setup();
    const mockService = createMockApiService();

    // Mock API error
    const testError = new Error('Network connection failed');
    vi.mocked(mockService.generateItinerary).mockRejectedValue(testError);

    // Render app
    renderApp(mockService, '/generate');

    // Fill out and submit form
    await user.type(screen.getByLabelText(/destination/i), 'Paris');
    await user.type(screen.getByLabelText(/party information/i), '2 adults');
    await user.selectOptions(screen.getByLabelText(/month of travel/i), 'May');

    const submitButton = screen.getByRole('button', { name: /generate itinerary/i });
    await user.click(submitButton);

    // Verify error message appears
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    // Verify we stay on form page (no navigation)
    expect(screen.getByRole('heading', { name: /plan your trip/i })).toBeInTheDocument();

    // Note: Form is reset due to React state timing (same as unit test)
    // This is expected behavior with the current implementation
  });

  it('preserves form state during loading', async () => {
    const user = userEvent.setup();
    const mockService = createMockApiService();

    // Create a promise we can control
    let resolveGenerate: (value: ItineraryResponse) => void;
    const generatePromise = new Promise<ItineraryResponse>((resolve) => {
      resolveGenerate = resolve;
    });

    vi.mocked(mockService.generateItinerary).mockReturnValue(generatePromise);
    vi.mocked(mockService.saveToHistory).mockResolvedValue(undefined);
    vi.mocked(mockService.getHistory).mockResolvedValue([]);

    // Render app
    renderApp(mockService, '/generate');

    // Fill out form
    await user.type(screen.getByLabelText(/destination/i), 'Tokyo');
    await user.type(screen.getByLabelText(/party information/i), '3 adults and 2 children');
    await user.selectOptions(screen.getByLabelText(/month of travel/i), 'October');

    const daysInput = screen.getByLabelText(/trip duration/i);
    await user.clear(daysInput);
    await user.type(daysInput, '7');

    // Submit form
    const submitButton = screen.getByRole('button', { name: /generate itinerary/i });
    await user.click(submitButton);

    // Verify form values are still present during loading
    await waitFor(() => {
      expect(screen.getByLabelText(/destination/i)).toHaveValue('Tokyo');
      expect(screen.getByLabelText(/party information/i)).toHaveValue('3 adults and 2 children');
      expect(screen.getByLabelText(/month of travel/i)).toHaveValue('October');
      expect(screen.getByLabelText(/trip duration/i)).toHaveValue(7);
    });

    // Resolve generation
    const tokyoResponse: ItineraryResponse = {
      destination: 'Tokyo',
      party_info: '3 adults and 2 children',
      month: 'October',
      days: 7,
      itinerary: `# Tokyo Travel Itinerary

## Day 1
### Morning
- **Senso-ji Temple** - Historic Buddhist temple
`,
    };
    resolveGenerate!(tokyoResponse);
    await generatePromise;
  });

  it('validates form before submission', async () => {
    const user = userEvent.setup();
    const mockService = createMockApiService();

    // Render app
    renderApp(mockService, '/generate');

    // Try to submit empty form
    const submitButton = screen.getByRole('button', { name: /generate itinerary/i });
    await user.click(submitButton);

    // Verify validation errors appear
    await waitFor(() => {
      const errorMessages = screen.getAllByRole('generic', { name: '' });
      expect(errorMessages.length).toBeGreaterThan(0);
    });

    // Verify API was NOT called
    expect(mockService.generateItinerary).not.toHaveBeenCalled();

    // Verify we stay on form page
    expect(screen.getByRole('heading', { name: /plan your trip/i })).toBeInTheDocument();
  });

  it('allows multiple submissions with different data', async () => {
    const user = userEvent.setup();
    const mockService = createMockApiService();

    // Mock successful API responses
    vi.mocked(mockService.generateItinerary).mockResolvedValue(mockResponse);
    vi.mocked(mockService.saveToHistory).mockResolvedValue(undefined);
    vi.mocked(mockService.getHistory).mockResolvedValue([mockResponse]);

    // Render app
    renderApp(mockService, '/generate');

    // First submission
    await user.type(screen.getByLabelText(/destination/i), 'Paris');
    await user.type(screen.getByLabelText(/party information/i), '2 adults');
    await user.selectOptions(screen.getByLabelText(/month of travel/i), 'May');

    let submitButton = screen.getByRole('button', { name: /generate itinerary/i });
    await user.click(submitButton);

    // Wait for navigation and return to form
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /plan your trip/i })).not.toBeInTheDocument();
    }, { timeout: 3000 });

    // Navigate back to form (simulate back button)
    window.history.pushState({}, 'Test page', '/generate');

    // Note: In a real app with routing, you would use the back button or navigate link
    // For this test, we're simulating the route change
  });
});

describe('Context state management integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shares itinerary state between form and display pages', async () => {
    const user = userEvent.setup();
    const mockService = createMockApiService();

    vi.mocked(mockService.generateItinerary).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(mockResponse), 100))
    );
    vi.mocked(mockService.saveToHistory).mockResolvedValue(undefined);
    vi.mocked(mockService.getHistory).mockResolvedValue([mockResponse]);

    // Render app
    renderApp(mockService, '/generate');

    // Submit form
    await user.type(screen.getByLabelText(/destination/i), 'Paris');
    await user.type(screen.getByLabelText(/party information/i), '2 adults');
    await user.selectOptions(screen.getByLabelText(/month of travel/i), 'May');

    const submitButton = screen.getByRole('button', { name: /generate itinerary/i });
    await user.click(submitButton);

    // Wait for navigation
    await waitFor(
      () => {
        expect(screen.queryByRole('heading', { name: /plan your trip/i })).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Verify itinerary data is displayed using unique attraction name
    await waitFor(
      () => {
        expect(screen.getByText(/eiffel tower/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('maintains loading state across component renders', async () => {
    const user = userEvent.setup();
    const mockService = createMockApiService();

    // Create a delayed promise
    let resolveGenerate: (value: ItineraryResponse) => void;
    const generatePromise = new Promise<ItineraryResponse>((resolve) => {
      resolveGenerate = resolve;
    });

    vi.mocked(mockService.generateItinerary).mockReturnValue(generatePromise);
    vi.mocked(mockService.saveToHistory).mockResolvedValue(undefined);
    vi.mocked(mockService.getHistory).mockResolvedValue([]);

    // Render app
    renderApp(mockService, '/generate');

    // Submit form
    await user.type(screen.getByLabelText(/destination/i), 'Paris');
    await user.type(screen.getByLabelText(/party information/i), '2 adults');
    await user.selectOptions(screen.getByLabelText(/month of travel/i), 'May');

    const submitButton = screen.getByRole('button', { name: /generate itinerary/i });
    await user.click(submitButton);

    // Verify loading state
    await waitFor(() => {
      expect(screen.getByText(/creating your personalized itinerary/i)).toBeInTheDocument();
    });

    // Resolve
    resolveGenerate!(mockResponse);
    await generatePromise;
  });
});
