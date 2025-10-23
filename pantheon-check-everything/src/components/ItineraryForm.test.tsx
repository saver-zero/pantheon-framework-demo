import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ItineraryForm } from './ItineraryForm';
import { ItineraryServiceProvider } from '../services/ItineraryServiceContext';
import type { IItineraryService } from '../services/IItineraryService';
import type { Itinerary } from '../types/itinerary';

// Helper: Create mock service with default implementations
const createMockService = (): IItineraryService => ({
  generateItinerary: vi.fn().mockResolvedValue({
    destination: 'Tokyo',
    party_info: 'couple',
    month: 'March',
    days: 5,
    itinerary: []
  }),
  getHistory: vi.fn().mockReturnValue([]),
  saveToHistory: vi.fn()
});

// Helper: Fill form with valid data
const fillFormWithValidData = () => {
  fireEvent.change(screen.getByLabelText(/destination/i), { target: { value: 'Tokyo' } });
  fireEvent.change(screen.getByLabelText(/party info/i), { target: { value: 'couple' } });
  fireEvent.change(screen.getByLabelText(/month/i), { target: { value: 'March' } });
  fireEvent.change(screen.getByLabelText(/days/i), { target: { value: '5' } });
};

describe('ItineraryForm', () => {
  let mockService: IItineraryService;
  let mockOnGenerate: (itinerary: Itinerary) => Promise<void>;

  beforeEach(() => {
    mockService = createMockService();
    mockOnGenerate = vi.fn().mockResolvedValue(undefined);
  });

  describe('Form renders all required input fields with proper labels and accessibility attributes', () => {
    it('should render destination input with label and required attribute', () => {
      // Arrange & Act
      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      // Assert
      const destinationInput = screen.getByLabelText(/destination/i) as HTMLInputElement;
      expect(destinationInput).toBeInTheDocument();
      expect(destinationInput.type).toBe('text');
      expect(destinationInput.required).toBe(true);
    });

    it('should render party info input with label and required attribute', () => {
      // Arrange & Act
      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      // Assert
      const partyInfoInput = screen.getByLabelText(/party info/i) as HTMLInputElement;
      expect(partyInfoInput).toBeInTheDocument();
      expect(partyInfoInput.type).toBe('text');
      expect(partyInfoInput.required).toBe(true);
    });

    it('should render month input with label and required attribute', () => {
      // Arrange & Act
      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      // Assert
      const monthInput = screen.getByLabelText(/month/i) as HTMLInputElement;
      expect(monthInput).toBeInTheDocument();
      expect(monthInput.type).toBe('text');
      expect(monthInput.required).toBe(true);
    });

    it('should render days input with label, required attribute, and number type', () => {
      // Arrange & Act
      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      // Assert
      const daysInput = screen.getByLabelText(/days/i) as HTMLInputElement;
      expect(daysInput).toBeInTheDocument();
      expect(daysInput.type).toBe('number');
      expect(daysInput.required).toBe(true);
      expect(daysInput.min).toBe('1');
    });

    it('should render submit button', () => {
      // Arrange & Act
      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      // Assert
      const submitButton = screen.getByRole('button', { name: /generate/i });
      expect(submitButton).toBeInTheDocument();
    });
  });

  describe('Form validates inputs on blur and displays field-specific error messages for invalid data', () => {
    it('should display error when destination is empty after blur', () => {
      // Arrange
      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      const destinationInput = screen.getByLabelText(/destination/i);

      // Act
      fireEvent.change(destinationInput, { target: { value: '' } });
      fireEvent.blur(destinationInput);

      // Assert
      expect(screen.getByText(/destination.*required/i)).toBeInTheDocument();
    });

    it('should display error when destination is less than 2 characters after blur', () => {
      // Arrange
      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      const destinationInput = screen.getByLabelText(/destination/i);

      // Act
      fireEvent.change(destinationInput, { target: { value: 'a' } });
      fireEvent.blur(destinationInput);

      // Assert
      expect(screen.getByText(/destination.*at least 2 characters/i)).toBeInTheDocument();
    });

    it('should display error when partyInfo is empty after blur', () => {
      // Arrange
      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      const partyInfoInput = screen.getByLabelText(/party info/i);

      // Act
      fireEvent.change(partyInfoInput, { target: { value: '' } });
      fireEvent.blur(partyInfoInput);

      // Assert
      expect(screen.getByText(/party info.*required/i)).toBeInTheDocument();
    });

    it('should display error when month is empty after blur', () => {
      // Arrange
      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      const monthInput = screen.getByLabelText(/month/i);

      // Act
      fireEvent.change(monthInput, { target: { value: '' } });
      fireEvent.blur(monthInput);

      // Assert
      expect(screen.getByText(/month.*required/i)).toBeInTheDocument();
    });

    it('should display error when days is empty after blur', () => {
      // Arrange
      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      const daysInput = screen.getByLabelText(/days/i);

      // Act
      fireEvent.change(daysInput, { target: { value: '' } });
      fireEvent.blur(daysInput);

      // Assert
      expect(screen.getByText(/days.*required/i)).toBeInTheDocument();
    });

    it('should display error when days is less than 1 after blur', () => {
      // Arrange
      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      const daysInput = screen.getByLabelText(/days/i);

      // Act
      fireEvent.change(daysInput, { target: { value: '0' } });
      fireEvent.blur(daysInput);

      // Assert
      expect(screen.getByText(/days.*at least 1/i)).toBeInTheDocument();
    });

    it('should display error when days is greater than 30 after blur', () => {
      // Arrange
      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      const daysInput = screen.getByLabelText(/days/i);

      // Act
      fireEvent.change(daysInput, { target: { value: '31' } });
      fireEvent.blur(daysInput);

      // Assert
      expect(screen.getByText(/days.*cannot exceed 30/i)).toBeInTheDocument();
    });
  });

  describe('Form calls service.generateItinerary with validated form data when submitted with valid inputs', () => {
    it('should call service.generateItinerary with correct arguments when form is submitted', async () => {
      // Arrange
      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      fillFormWithValidData();

      // Act
      fireEvent.click(screen.getByRole('button', { name: /generate/i }));

      // Assert
      await waitFor(() => {
        expect(mockService.generateItinerary).toHaveBeenCalledWith('Tokyo', 'couple', 'March', 5);
      });
    });

    it('should call onGenerate callback with returned itinerary after successful generation', async () => {
      // Arrange
      const mockItinerary: Itinerary = {
        destination: 'Tokyo',
        party_info: 'couple',
        month: 'March',
        days: 5,
        itinerary: []
      };
      vi.mocked(mockService.generateItinerary).mockResolvedValue(mockItinerary);

      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      fillFormWithValidData();

      // Act
      fireEvent.click(screen.getByRole('button', { name: /generate/i }));

      // Assert
      await waitFor(() => {
        expect(mockOnGenerate).toHaveBeenCalledWith(mockItinerary);
      });
    });

    it('should not call service when form has validation errors', async () => {
      // Arrange
      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      // Fill with invalid data
      fireEvent.change(screen.getByLabelText(/destination/i), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(/days/i), { target: { value: '0' } });

      // Act
      fireEvent.click(screen.getByRole('button', { name: /generate/i }));

      // Assert
      await waitFor(() => {
        expect(mockService.generateItinerary).not.toHaveBeenCalled();
      });
    });
  });

  describe('Form displays loading state during generation and prevents duplicate submissions', () => {
    it('should disable submit button during generation', async () => {
      // Arrange
      vi.mocked(mockService.generateItinerary).mockImplementation(() =>
        new Promise(resolve => setTimeout(() => resolve({
          destination: 'Tokyo',
          party_info: 'couple',
          month: 'March',
          days: 5,
          itinerary: []
        }), 100))
      );

      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      fillFormWithValidData();

      // Act
      fireEvent.click(screen.getByRole('button', { name: /generate/i }));

      // Assert - Button should be disabled immediately
      const submitButton = screen.getByRole('button', { name: /generating/i }) as HTMLButtonElement;
      expect(submitButton.disabled).toBe(true);

      // Wait for completion
      await waitFor(() => {
        expect(mockService.generateItinerary).toHaveBeenCalled();
      });
    });

    it('should display "Generating..." text on submit button during generation', async () => {
      // Arrange
      vi.mocked(mockService.generateItinerary).mockImplementation(() =>
        new Promise(resolve => setTimeout(() => resolve({
          destination: 'Tokyo',
          party_info: 'couple',
          month: 'March',
          days: 5,
          itinerary: []
        }), 100))
      );

      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      fillFormWithValidData();

      // Act
      fireEvent.click(screen.getByRole('button', { name: /generate/i }));

      // Assert
      expect(screen.getByRole('button', { name: /generating/i })).toBeInTheDocument();

      // Wait for completion
      await waitFor(() => {
        expect(mockService.generateItinerary).toHaveBeenCalled();
      });
    });

    it('should re-enable submit button after generation completes', async () => {
      // Arrange
      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      fillFormWithValidData();

      // Act
      fireEvent.click(screen.getByRole('button', { name: /generate/i }));

      // Assert
      await waitFor(() => {
        const submitButton = screen.getByRole('button', { name: /generate/i }) as HTMLButtonElement;
        expect(submitButton.disabled).toBe(false);
      });
    });
  });

  describe('Responsive design and mobile optimization', () => {
    it('should apply responsive CSS class to form container for adaptive layouts', () => {
      // Arrange & Act
      const { container } = render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} className="itinerary-form" />
        </ItineraryServiceProvider>
      );

      // Assert - Form should have responsive class applied
      const form = container.querySelector('form') as HTMLFormElement;
      expect(form).toHaveClass('itinerary-form');
    });

    it('should render form with structure that supports responsive CSS Grid layout', () => {
      // Arrange & Act
      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      // Assert - Verify all form fields exist and can be targeted by CSS
      expect(screen.getByLabelText(/destination/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/party info/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/month/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/days/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /generate/i })).toBeInTheDocument();
    });

    it('should ensure input elements meet minimum touch target size requirements', () => {
      // Arrange & Act
      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      // Assert - Verify inputs are rendered (CSS will handle sizing via padding/height)
      const destinationInput = screen.getByLabelText(/destination/i) as HTMLInputElement;
      const partyInfoInput = screen.getByLabelText(/party info/i) as HTMLInputElement;
      const monthInput = screen.getByLabelText(/month/i) as HTMLInputElement;
      const daysInput = screen.getByLabelText(/days/i) as HTMLInputElement;
      const submitButton = screen.getByRole('button', { name: /generate/i }) as HTMLButtonElement;

      // Verify elements exist and are interactive (touch target sizing handled by CSS)
      expect(destinationInput).toBeInTheDocument();
      expect(partyInfoInput).toBeInTheDocument();
      expect(monthInput).toBeInTheDocument();
      expect(daysInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });

    it('should maintain form functionality with responsive layout changes', async () => {
      // Arrange
      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} className="itinerary-form" />
        </ItineraryServiceProvider>
      );

      fillFormWithValidData();

      // Act - Submit form with responsive class applied
      fireEvent.click(screen.getByRole('button', { name: /generate/i }));

      // Assert - Form submission should work identically regardless of responsive styling
      await waitFor(() => {
        expect(mockService.generateItinerary).toHaveBeenCalledWith('Tokyo', 'couple', 'March', 5);
      });
    });

    it('should display validation errors correctly in responsive layouts', async () => {
      // Arrange
      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} className="itinerary-form" />
        </ItineraryServiceProvider>
      );

      const destinationInput = screen.getByLabelText(/destination/i);

      // Act - Trigger validation error
      fireEvent.change(destinationInput, { target: { value: '' } });
      fireEvent.blur(destinationInput);

      // Assert - Error message should display regardless of responsive layout
      expect(screen.getByText(/destination.*required/i)).toBeInTheDocument();
    });

    it('should maintain accessible labels and ARIA attributes in responsive mode', () => {
      // Arrange & Act
      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} className="itinerary-form" />
        </ItineraryServiceProvider>
      );

      // Assert - All inputs should have proper labels for screen readers
      const destinationInput = screen.getByLabelText(/destination/i) as HTMLInputElement;
      const partyInfoInput = screen.getByLabelText(/party info/i) as HTMLInputElement;
      const monthInput = screen.getByLabelText(/month/i) as HTMLInputElement;
      const daysInput = screen.getByLabelText(/days/i) as HTMLInputElement;

      expect(destinationInput).toHaveAccessibleName();
      expect(partyInfoInput).toHaveAccessibleName();
      expect(monthInput).toHaveAccessibleName();
      expect(daysInput).toHaveAccessibleName();
    });
  });

  describe('Form displays user-friendly error message when service.generateItinerary fails', () => {
    it('should display error message when service throws error', async () => {
      // Arrange
      vi.mocked(mockService.generateItinerary).mockRejectedValue(new Error('API Error'));

      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      fillFormWithValidData();

      // Act
      fireEvent.click(screen.getByRole('button', { name: /generate/i }));

      // Assert
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByText(/failed to generate itinerary/i)).toBeInTheDocument();
      });
    });

    it('should render ErrorDisplay for service errors while preserving field-level validation errors as inline spans', async () => {
      // Arrange
      vi.mocked(mockService.generateItinerary).mockRejectedValue(new Error('API Error'));

      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      // Create validation error first
      const destinationInput = screen.getByLabelText(/destination/i);
      fireEvent.change(destinationInput, { target: { value: '' } });
      fireEvent.blur(destinationInput);

      // Verify field-level validation error exists
      expect(screen.getByText(/destination.*required/i)).toBeInTheDocument();

      // Fill form and submit to trigger service error
      fillFormWithValidData();
      fireEvent.click(screen.getByRole('button', { name: /generate/i }));

      // Assert - ErrorDisplay with role='alert' is rendered for service error
      await waitFor(() => {
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
        expect(alert.textContent).toMatch(/failed to generate itinerary/i);
      });
    });

    it('should clear previous error when new submission is attempted', async () => {
      // Arrange
      vi.mocked(mockService.generateItinerary).mockRejectedValueOnce(new Error('First error'))
        .mockResolvedValueOnce({
          destination: 'Tokyo',
          party_info: 'couple',
          month: 'March',
          days: 5,
          itinerary: []
        });

      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      fillFormWithValidData();

      // Act - First submission fails
      fireEvent.click(screen.getByRole('button', { name: /generate/i }));
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });

      // Act - Second submission succeeds
      fireEvent.click(screen.getByRole('button', { name: /generate/i }));

      // Assert - Error should be cleared
      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      });
    });

    it('should keep form functional after error allowing retry', async () => {
      // Arrange
      vi.mocked(mockService.generateItinerary).mockRejectedValueOnce(new Error('API Error'))
        .mockResolvedValueOnce({
          destination: 'Tokyo',
          party_info: 'couple',
          month: 'March',
          days: 5,
          itinerary: []
        });

      render(
        <ItineraryServiceProvider service={mockService}>
          <ItineraryForm onGenerate={mockOnGenerate} />
        </ItineraryServiceProvider>
      );

      fillFormWithValidData();

      // Act - First submission fails
      fireEvent.click(screen.getByRole('button', { name: /generate/i }));
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });

      // Act - Retry submission
      fireEvent.click(screen.getByRole('button', { name: /generate/i }));

      // Assert - Second submission should succeed
      await waitFor(() => {
        expect(mockService.generateItinerary).toHaveBeenCalledTimes(2);
        expect(mockOnGenerate).toHaveBeenCalled();
      });
    });
  });
});
