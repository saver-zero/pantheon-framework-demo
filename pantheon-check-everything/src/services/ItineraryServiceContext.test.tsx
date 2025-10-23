import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ItineraryServiceProvider, useItineraryService } from './ItineraryServiceContext';
import type { IItineraryService } from './IItineraryService';
import type { Itinerary } from '../types/itinerary';

describe('ItineraryServiceContext', () => {
  // Create a mock service for testing
  const createMockService = (): IItineraryService => ({
    generateItinerary: vi.fn().mockResolvedValue({
      destination: 'Tokyo',
      party_info: 'couple',
      month: 'March',
      days: 2,
      itinerary: []
    }),
    getHistory: vi.fn().mockReturnValue([]),
    saveToHistory: vi.fn()
  });

  describe('React Context provides service instance to components', () => {
    it('should provide service instance through ItineraryServiceProvider', () => {
      // Arrange
      const mockService = createMockService();
      let capturedService: IItineraryService | null = null;

      // Create a test component that consumes the context
      const TestComponent = () => {
        capturedService = useItineraryService();
        return <div>Test Component</div>;
      };

      // Act - Render component wrapped in provider
      render(
        <ItineraryServiceProvider service={mockService}>
          <TestComponent />
        </ItineraryServiceProvider>
      );

      // Assert - Verify service was provided to component
      expect(capturedService).toBe(mockService);
      expect(capturedService).not.toBeNull();
    });

    it('should allow multiple components to access the same service instance', () => {
      // Arrange
      const mockService = createMockService();
      const capturedServices: (IItineraryService | null)[] = [];

      // Create multiple test components
      const TestComponent1 = () => {
        capturedServices.push(useItineraryService());
        return <div>Component 1</div>;
      };

      const TestComponent2 = () => {
        capturedServices.push(useItineraryService());
        return <div>Component 2</div>;
      };

      // Act - Render multiple components wrapped in provider
      render(
        <ItineraryServiceProvider service={mockService}>
          <TestComponent1 />
          <TestComponent2 />
        </ItineraryServiceProvider>
      );

      // Assert - Verify both components received the same service instance
      expect(capturedServices).toHaveLength(2);
      expect(capturedServices[0]).toBe(mockService);
      expect(capturedServices[1]).toBe(mockService);
      expect(capturedServices[0]).toBe(capturedServices[1]);
    });
  });

  describe('useItineraryService hook retrieves service correctly', () => {
    it('should return service instance when called inside provider', () => {
      // Arrange
      const mockService = createMockService();
      let receivedService: IItineraryService | null = null;

      const TestComponent = () => {
        receivedService = useItineraryService();
        return <div data-testid="test-component">Service Loaded</div>;
      };

      // Act
      render(
        <ItineraryServiceProvider service={mockService}>
          <TestComponent />
        </ItineraryServiceProvider>
      );

      // Assert - Verify hook returned the provided service
      expect(receivedService).toBe(mockService);
      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });

    it('should throw descriptive error when used outside provider', () => {
      // Arrange
      const TestComponent = () => {
        useItineraryService();
        return <div>Should not render</div>;
      };

      // Suppress console.error for this test since we expect an error
      const originalError = console.error;
      console.error = vi.fn();

      // Act & Assert - Verify calling hook outside provider throws error
      expect(() => render(<TestComponent />)).toThrow();

      // Verify error message is descriptive
      try {
        render(<TestComponent />);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        const err = error as Error;
        expect(err.message).toMatch(/provider|context/i);
      }

      // Restore console.error
      console.error = originalError;
    });

    it('should allow components to call service methods through hook', async () => {
      // Arrange
      const mockService = createMockService();
      const TestComponent = () => {
        const service = useItineraryService();

        return (
          <div>
            <button
              data-testid="generate-btn"
              onClick={() => service.generateItinerary('Tokyo', 'couple', 'March', 2)}
            >
              Generate
            </button>
            <button
              data-testid="history-btn"
              onClick={() => service.getHistory()}
            >
              Get History
            </button>
          </div>
        );
      };

      // Act
      render(
        <ItineraryServiceProvider service={mockService}>
          <TestComponent />
        </ItineraryServiceProvider>
      );

      const generateBtn = screen.getByTestId('generate-btn');
      const historyBtn = screen.getByTestId('history-btn');

      // Simulate button clicks
      generateBtn.click();
      historyBtn.click();

      // Assert - Verify service methods were called
      expect(mockService.generateItinerary).toHaveBeenCalledWith('Tokyo', 'couple', 'March', 2);
      expect(mockService.getHistory).toHaveBeenCalled();
    });
  });

  describe('Provider validates service is not null', () => {
    it('should throw error when service prop is null', () => {
      // Arrange
      const TestComponent = () => <div>Test</div>;

      // Suppress console.error for this test since we expect an error
      const originalError = console.error;
      console.error = vi.fn();

      // Act & Assert - Verify provider throws when service is null
      expect(() =>
        render(
          <ItineraryServiceProvider service={null as unknown as IItineraryService}>
            <TestComponent />
          </ItineraryServiceProvider>
        )
      ).toThrow();

      // Restore console.error
      console.error = originalError;
    });

    it('should throw error when service prop is undefined', () => {
      // Arrange
      const TestComponent = () => <div>Test</div>;

      // Suppress console.error for this test since we expect an error
      const originalError = console.error;
      console.error = vi.fn();

      // Act & Assert - Verify provider throws when service is undefined
      expect(() =>
        render(
          <ItineraryServiceProvider service={undefined as unknown as IItineraryService}>
            <TestComponent />
          </ItineraryServiceProvider>
        )
      ).toThrow();

      // Restore console.error
      console.error = originalError;
    });
  });
});
