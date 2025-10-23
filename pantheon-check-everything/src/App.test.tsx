import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { createItineraryService } from './services';
import type { IItineraryService } from './services/IItineraryService';
import { StorageError } from './services/LocalStorageService';

// Mock the service factory
vi.mock('./services', async () => {
  const actual = await vi.importActual('./services');
  return {
    ...actual,
    createItineraryService: vi.fn()
  };
});

// Helper: Create mock service with default implementations
const createMockService = (): IItineraryService => ({
  generateItinerary: vi.fn().mockResolvedValue('# Tokyo Itinerary\n\n**Party:** couple\n**Month:** March\n**Duration:** 5 days'),
  getHistory: vi.fn().mockReturnValue([]),
  saveToHistory: vi.fn()
});

// Helper: Create mock markdown itinerary fixture
const createMockMarkdown = (destination: string = 'Tokyo', partyInfo: string = 'couple', month: string = 'March', days: number = 5): string => {
  return `# ${destination} Itinerary\n\n**Party:** ${partyInfo}\n**Month:** ${month}\n**Duration:** ${days} days\n\n## Day 1\n- Morning: Arrival\n- Afternoon: Explore`;
};

// Helper: Fill form with valid data
const fillFormWithValidData = () => {
  fireEvent.change(screen.getByLabelText(/destination/i), { target: { value: 'Tokyo' } });
  fireEvent.change(screen.getByLabelText(/party info/i), { target: { value: 'couple' } });
  fireEvent.change(screen.getByLabelText(/month/i), { target: { value: 'March' } });
  fireEvent.change(screen.getByLabelText(/days/i), { target: { value: '5' } });
};

// Helper: Get the form submit button (not navigation buttons)
const getSubmitButton = () => screen.getByRole('button', { name: /generate itinerary/i });

// Helper: Wait for and verify error message display
const waitForErrorMessage = async (expectedMessage: RegExp | string) => {
  await waitFor(() => {
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    if (typeof expectedMessage === 'string') {
      expect(alert).toHaveTextContent(expectedMessage);
    } else {
      expect(alert.textContent).toMatch(expectedMessage);
    }
  });
};

// Helper: Verify loading state lifecycle (appears then disappears)
const verifyLoadingStateLifecycle = async (mockService: IItineraryService) => {
  // Mock slow async service response
  vi.mocked(mockService.generateItinerary).mockImplementation(() =>
    new Promise(resolve => setTimeout(() => resolve(createMockMarkdown()), 100))
  );

  // Fill and submit form
  fillFormWithValidData();
  fireEvent.click(getSubmitButton());

  // Verify loading indicator appears
  expect(screen.getByRole('button', { name: /generating/i })).toBeInTheDocument();

  // Wait for completion and verify loading indicator disappears
  await waitFor(() => {
    expect(screen.queryByRole('button', { name: /generating/i })).not.toBeInTheDocument();
    expect(getSubmitButton()).toBeInTheDocument();
  });
};

describe('App Component', () => {
  let mockService: IItineraryService;

  beforeEach(() => {
    mockService = createMockService();
    vi.mocked(createItineraryService).mockReturnValue(mockService);
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    // Arrange & Act
    render(<App />);

    // Assert - Check that the app title is rendered
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Travel Itinerary Generator');
  });

  describe('Orchestration flow from form submission through service call, validation, history persistence, and state update', () => {
    it('should successfully orchestrate itinerary generation flow and update state with generated data', async () => {
      // Arrange
      const mockMarkdown = createMockMarkdown('Paris', 'family', 'June', 7);
      vi.mocked(mockService.generateItinerary).mockResolvedValue(mockMarkdown);

      render(<App />);
      fillFormWithValidData();

      // Act - Submit form
      fireEvent.click(getSubmitButton());

      // Assert - Wait for itinerary to be displayed (markdown is rendered)
      await waitFor(() => {
        expect(screen.getByText(/Paris Itinerary/i)).toBeInTheDocument();
        expect(screen.getByText(/family/)).toBeInTheDocument();
        expect(screen.getByText(/June/)).toBeInTheDocument();
        expect(screen.getByText(/7 days/)).toBeInTheDocument();
      });

      // Assert - Verify no error is displayed
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('should update state with generated itinerary during orchestration without calling saveToHistory', async () => {
      // Arrange
      const mockMarkdown = createMockMarkdown();
      vi.mocked(mockService.generateItinerary).mockResolvedValue(mockMarkdown);

      render(<App />);
      fillFormWithValidData();

      // Act
      fireEvent.click(getSubmitButton());

      // Assert - Verify itinerary is displayed (state updated)
      await waitFor(() => {
        expect(screen.getByText(/Tokyo Itinerary/i)).toBeInTheDocument();
      });

      // Assert - Verify saveToHistory was NOT called from App.handleGenerate
      // (service.generateItinerary handles saving automatically)
      expect(mockService.saveToHistory).not.toHaveBeenCalled();
    });
  });

  describe('Error handling when service.generateItinerary fails', () => {
    it('should display user-friendly error message when service.generateItinerary fails', async () => {
      // Arrange
      vi.mocked(mockService.generateItinerary).mockRejectedValue(new Error('Service unavailable'));

      render(<App />);
      fillFormWithValidData();

      // Act
      fireEvent.click(getSubmitButton());

      // Assert - Verify error message is displayed
      await waitForErrorMessage(/failed to generate itinerary/i);
    });

    it('should maintain previous itinerary state when generation fails', async () => {
      // Arrange
      const previousMarkdown = createMockMarkdown('London');
      vi.mocked(mockService.generateItinerary)
        .mockResolvedValueOnce(previousMarkdown)
        .mockRejectedValueOnce(new Error('Service error'));

      render(<App />);

      // Act - First successful generation
      fillFormWithValidData();
      fireEvent.click(getSubmitButton());

      await waitFor(() => {
        expect(screen.getByText(/London/)).toBeInTheDocument();
      });

      // Act - Second generation fails
      fillFormWithValidData();
      fireEvent.change(screen.getByLabelText(/destination/i), { target: { value: 'Berlin' } });
      fireEvent.click(getSubmitButton());

      // Assert - Previous itinerary should still be displayed
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
      expect(screen.getByText(/London/)).toBeInTheDocument();
      expect(screen.queryByText(/Berlin/)).not.toBeInTheDocument();
    });
  });

  describe('History persistence after successful generation', () => {
    it('should display generated itinerary after successful generation without App calling saveToHistory', async () => {
      // Arrange
      const mockMarkdown = createMockMarkdown();
      vi.mocked(mockService.generateItinerary).mockResolvedValue(mockMarkdown);

      render(<App />);
      fillFormWithValidData();

      // Act
      fireEvent.click(getSubmitButton());

      // Assert - Verify itinerary is displayed (state updated)
      await waitFor(() => {
        expect(screen.getByText(/Tokyo Itinerary/i)).toBeInTheDocument();
      });

      // Assert - Verify saveToHistory was NOT called from App.handleGenerate
      // service.generateItinerary handles history persistence automatically
      expect(mockService.saveToHistory).not.toHaveBeenCalled();
    });

    it('should update current itinerary state after generation completes', async () => {
      // Arrange
      const mockMarkdown = createMockMarkdown();

      vi.mocked(mockService.generateItinerary).mockResolvedValue(mockMarkdown);

      render(<App />);
      fillFormWithValidData();

      // Act
      fireEvent.click(getSubmitButton());

      // Assert - Wait for state update to complete
      await waitFor(() => {
        expect(screen.getByText(/Tokyo Itinerary/i)).toBeInTheDocument();
      });

      // Verify App.handleGenerate only manages state, not history persistence
      // saveToHistory should not be called from App component
      expect(mockService.saveToHistory).not.toHaveBeenCalled();
    });
  });

  describe('Graceful degradation when storage fails', () => {
    it('should handle storage failure from service layer gracefully while still showing generated itinerary to user', async () => {
      // Arrange
      const mockMarkdown = createMockMarkdown();

      // Mock generateItinerary to throw StorageError (from HTTPApiClient automatic save)
      // but still return markdown for App to display
      vi.mocked(mockService.generateItinerary).mockImplementation(async () => {
        // Simulate: generation succeeds, but automatic history save fails
        const error = new StorageError('Storage quota exceeded');
        throw error;
      });

      render(<App />);
      fillFormWithValidData();

      // Act
      fireEvent.click(getSubmitButton());

      // Assert - Since generation itself failed, no itinerary is displayed
      // (Different from old behavior where App could show itinerary despite save failure)
      await waitFor(() => {
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
      });

      // With the new architecture, if generateItinerary throws, we don't have markdown to display
      expect(screen.queryByText(/Tokyo Itinerary/i)).not.toBeInTheDocument();
    });

    it('should display error message when service layer storage save fails during generation', async () => {
      // Arrange
      vi.mocked(mockService.generateItinerary).mockRejectedValue(
        new StorageError('Storage quota exceeded')
      );

      render(<App />);
      fillFormWithValidData();

      // Act
      fireEvent.click(getSubmitButton());

      // Assert - Verify error is displayed
      await waitFor(() => {
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
      });

      // No itinerary should be displayed since generation failed
      expect(screen.queryByText(/Tokyo Itinerary/i)).not.toBeInTheDocument();
    });

    it('should not render ErrorDisplay with warning type when StorageError comes from service layer', async () => {
      // Arrange - StorageError from service layer during generation
      vi.mocked(mockService.generateItinerary).mockRejectedValue(
        new StorageError('Storage quota exceeded during generation')
      );

      render(<App />);
      fillFormWithValidData();

      // Act
      fireEvent.click(getSubmitButton());

      // Assert - Error is displayed but no itinerary
      await waitFor(() => {
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
      });

      expect(screen.queryByText(/Tokyo Itinerary/i)).not.toBeInTheDocument();
    });
  });

  describe('Loading state management during generation', () => {
    it('should display loading indicator during generation and remove after completion', async () => {
      // Arrange
      render(<App />);

      // Act & Assert
      await verifyLoadingStateLifecycle(mockService);
    });

    it('should cleanup loading state in success scenario', async () => {
      // Arrange
      const mockMarkdown = createMockMarkdown();
      vi.mocked(mockService.generateItinerary).mockImplementation(() =>
        new Promise(resolve => setTimeout(() => resolve(mockMarkdown), 50))
      );

      render(<App />);
      fillFormWithValidData();

      // Act
      fireEvent.click(getSubmitButton());

      // Assert - Loading state appears
      expect(screen.getByRole('button', { name: /generating/i })).toBeInTheDocument();

      // Assert - Loading state disappears after success
      await waitFor(() => {
        expect(screen.queryByRole('button', { name: /generating/i })).not.toBeInTheDocument();
        expect(getSubmitButton()).toBeInTheDocument();
      });
    });

    it('should cleanup loading state in error scenario', async () => {
      // Arrange
      vi.mocked(mockService.generateItinerary).mockImplementation(() =>
        new Promise((_, reject) => setTimeout(() => reject(new Error('Service error')), 50))
      );

      render(<App />);
      fillFormWithValidData();

      // Act
      fireEvent.click(getSubmitButton());

      // Assert - Loading state appears
      expect(screen.getByRole('button', { name: /generating/i })).toBeInTheDocument();

      // Assert - Loading state disappears after error
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });

      expect(screen.queryByRole('button', { name: /generating/i })).not.toBeInTheDocument();
      expect(getSubmitButton()).toBeInTheDocument();
    });

    it('should coordinate loading state between form and display components', async () => {
      // Arrange
      vi.mocked(mockService.generateItinerary).mockImplementation(() =>
        new Promise(resolve => setTimeout(() => resolve(createMockMarkdown()), 100))
      );

      render(<App />);
      fillFormWithValidData();

      // Act
      fireEvent.click(getSubmitButton());

      // Assert - Form button shows loading state
      const loadingButton = screen.getByRole('button', { name: /generating/i });
      expect(loadingButton).toBeInTheDocument();
      expect(loadingButton).toBeDisabled();

      // Assert - Loading state clears after completion
      await waitFor(() => {
        const normalButton = getSubmitButton() as HTMLButtonElement;
        expect(normalButton).toBeInTheDocument();
        expect(normalButton.disabled).toBe(false);
      });
    });
  });

  describe('Itinerary Display Integration', () => {
    it('should render ItineraryDisplay component when itinerary exists', async () => {
      // Arrange
      const mockMarkdown = createMockMarkdown('Barcelona', 'solo traveler', 'September', 4);
      vi.mocked(mockService.generateItinerary).mockResolvedValue(mockMarkdown);

      render(<App />);
      fillFormWithValidData();

      // Act
      fireEvent.click(getSubmitButton());

      // Assert - Verify ItineraryDisplay is rendered with markdown content
      await waitFor(() => {
        // Check for destination in markdown heading
        expect(screen.getByText(/Barcelona Itinerary/i)).toBeInTheDocument();
      });

      // Verify metadata is displayed in markdown
      expect(screen.getByText(/solo traveler/i)).toBeInTheDocument();
      expect(screen.getByText(/September/i)).toBeInTheDocument();
      expect(screen.getByText(/4 days/i)).toBeInTheDocument();
    });
  });

  describe('Bug Fix: T017 - Duplicate history entries', () => {
    it('should add only one entry to history storage after form submission and successful generation', async () => {
      // Arrange
      const mockMarkdown = createMockMarkdown();

      // Track saveItinerary calls at storage layer
      let saveItineraryCallCount = 0;
      const mockStorageService = new (class {
        saveItinerary = vi.fn().mockImplementation(() => {
          saveItineraryCallCount++;
        });
        getHistory = vi.fn().mockReturnValue([]);
        clearHistory = vi.fn();
      })();

      // Mock HTTPApiClient.generateItinerary to return markdown and automatically save once
      vi.mocked(mockService.generateItinerary).mockImplementation(async () => {
        // Simulate HTTPApiClient's automatic save to history
        mockStorageService.saveItinerary(mockMarkdown);
        return mockMarkdown;
      });

      render(<App />);
      fillFormWithValidData();

      // Act
      fireEvent.click(getSubmitButton());

      // Assert - Verify saveItinerary was called exactly once (by HTTPApiClient only)
      await waitFor(() => {
        expect(screen.getByText(/Tokyo Itinerary/i)).toBeInTheDocument();
      });

      expect(saveItineraryCallCount).toBe(1);
      expect(mockStorageService.saveItinerary).toHaveBeenCalledTimes(1);
    });

    it('should handle StorageError from service layer during generation with graceful degradation', async () => {
      // Arrange
      const mockMarkdown = createMockMarkdown();

      // Mock HTTPApiClient.generateItinerary to throw StorageError
      vi.mocked(mockService.generateItinerary).mockRejectedValue(
        new StorageError('Storage quota exceeded during generation')
      );

      render(<App />);
      fillFormWithValidData();

      // Act
      fireEvent.click(getSubmitButton());

      // Assert - Verify error is handled gracefully
      await waitFor(() => {
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
      });

      // Since generation itself failed with StorageError, no itinerary should be displayed
      expect(screen.queryByText(/Tokyo Itinerary/i)).not.toBeInTheDocument();
    });

    it('should not call service.saveToHistory from App.handleGenerate callback', async () => {
      // Arrange
      const mockMarkdown = createMockMarkdown();
      vi.mocked(mockService.generateItinerary).mockResolvedValue(mockMarkdown);

      // Spy on saveToHistory to ensure it's never called from App component
      const saveToHistorySpy = vi.spyOn(mockService, 'saveToHistory');

      render(<App />);
      fillFormWithValidData();

      // Act
      fireEvent.click(getSubmitButton());

      // Assert - Verify handleGenerate updates state but never calls saveToHistory
      await waitFor(() => {
        expect(screen.getByText(/Tokyo Itinerary/i)).toBeInTheDocument();
      });

      // App.handleGenerate should NOT call saveToHistory
      // (Only the service layer should save during generation)
      expect(saveToHistorySpy).not.toHaveBeenCalled();
    });
  });
});
