import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createItineraryService } from './index';
import { HTTPApiClient } from './HTTPApiClient';
import type { IItineraryService } from './IItineraryService';

// Mock child_process for CLIApiClient tests - must be hoisted
const { mockExec } = vi.hoisted(() => {
  return { mockExec: vi.fn() };
});
vi.mock('child_process', async (importOriginal) => {
  const actual = await importOriginal<typeof import('child_process')>();
  return {
    ...actual,
    exec: mockExec
  };
});

// Mock getServiceConfig to control configuration in tests
vi.mock('../config/serviceConfig', () => ({
  getServiceConfig: vi.fn(() => ({
    apiMode: 'HTTP',
    backendUrl: 'http://localhost:3001',
    storageKey: 'test-itinerary-history',
    maxItems: 10
  }))
}));

describe('createItineraryService', () => {
  let mockLocalStorage: {
    getItem: ReturnType<typeof vi.fn>;
    setItem: ReturnType<typeof vi.fn>;
    removeItem: ReturnType<typeof vi.fn>;
    clear: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    // Arrange: Create fresh localStorage mock for each test
    mockLocalStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn()
    };

    // Mock the global localStorage object
    Object.defineProperty(global, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });

    vi.clearAllMocks();
  });

  describe('Factory creates HTTPApiClient in all cases (after backend migration)', () => {
    it('should create HTTPApiClient instance regardless of apiMode', async () => {
      // Arrange
      const { getServiceConfig } = await import('../config/serviceConfig');
      vi.mocked(getServiceConfig).mockReturnValue({
        apiMode: 'HTTP',
        backendUrl: 'http://localhost:3001',
        storageKey: 'test-key',
        maxItems: 10
      });

      mockLocalStorage.getItem.mockReturnValue(null);

      // Act
      const service = createItineraryService();

      // Assert - Verify returned instance is HTTPApiClient (CLI execution moved to backend)
      expect(service).toBeInstanceOf(HTTPApiClient);

      // Assert - Verify it has all IItineraryService methods
      expect(typeof service.generateItinerary).toBe('function');
      expect(typeof service.getHistory).toBe('function');
      expect(typeof service.saveToHistory).toBe('function');
    });

    it('should create HTTPApiClient instance even when apiMode is CLI (deprecated mode)', async () => {
      // Arrange
      const { getServiceConfig } = await import('../config/serviceConfig');
      vi.mocked(getServiceConfig).mockReturnValue({
        apiMode: 'CLI',
        backendUrl: 'http://localhost:3001',
        storageKey: 'test-key',
        maxItems: 10
      });

      // Act
      const service = createItineraryService();

      // Assert - Verify returned instance is HTTPApiClient (apiMode no longer affects factory)
      expect(service).toBeInstanceOf(HTTPApiClient);
    });
  });

  describe('Factory always creates HTTPApiClient (HTTP is now the only mode)', () => {
    it('should create HTTPApiClient instance', async () => {
      // Arrange
      const { getServiceConfig } = await import('../config/serviceConfig');
      vi.mocked(getServiceConfig).mockReturnValue({
        apiMode: 'HTTP',
        backendUrl: 'http://localhost:3001',
        storageKey: 'test-key',
        maxItems: 10
      });

      // Act
      const service = createItineraryService();

      // Assert - Verify returned instance satisfies IItineraryService interface
      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(HTTPApiClient);
      expect(typeof service.generateItinerary).toBe('function');
      expect(typeof service.getHistory).toBe('function');
      expect(typeof service.saveToHistory).toBe('function');
    });

    it('should return IItineraryService type satisfying the interface', async () => {
      // Arrange
      const { getServiceConfig } = await import('../config/serviceConfig');

      // Act - Create service instance
      vi.mocked(getServiceConfig).mockReturnValue({
        apiMode: 'HTTP',
        backendUrl: 'http://localhost:3001',
        storageKey: 'test-key',
        maxItems: 10
      });
      const service: IItineraryService = createItineraryService();

      // Assert - Verify it satisfies IItineraryService interface
      expect(service).toBeDefined();

      // Verify all required methods are present
      expect(typeof service.generateItinerary).toBe('function');
      expect(typeof service.getHistory).toBe('function');
      expect(typeof service.saveToHistory).toBe('function');
    });
  });

  describe('Factory injects the same dependencies into client implementations', () => {
    it('should inject LocalStorageService into HTTPApiClient', async () => {
      // Arrange
      const { getServiceConfig } = await import('../config/serviceConfig');
      vi.mocked(getServiceConfig).mockReturnValue({
        apiMode: 'HTTP',
        backendUrl: 'http://localhost:3001',
        storageKey: 'custom-key',
        maxItems: 5
      });

      mockLocalStorage.getItem.mockReturnValue(JSON.stringify([
        '# Paris Itinerary\n\n**Party:** solo\n**Month:** June\n**Duration:** 1 days'
      ]));

      // Act - Create service instance
      const service = createItineraryService();

      // Assert - Verify service can retrieve history (proves LocalStorageService was injected)
      const history = service.getHistory();
      expect(history).toHaveLength(1);
      expect(history[0]).toContain('Paris');
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('custom-key');
    });

    it('should create new dependency instances for each factory call', async () => {
      // Arrange
      const { getServiceConfig } = await import('../config/serviceConfig');
      vi.mocked(getServiceConfig).mockReturnValue({
        apiMode: 'HTTP',
        backendUrl: 'http://localhost:3001',
        storageKey: 'test-key',
        maxItems: 10
      });

      mockLocalStorage.getItem.mockReturnValue(null);

      // Act - Create two service instances
      const service1 = createItineraryService();
      const service2 = createItineraryService();

      // Assert - Verify both are separate instances
      expect(service1).not.toBe(service2);
      expect(service1).toBeInstanceOf(HTTPApiClient);
      expect(service2).toBeInstanceOf(HTTPApiClient);
    });

    it('should use correct configuration values from getServiceConfig', async () => {
      // Arrange
      const { getServiceConfig } = await import('../config/serviceConfig');
      const customConfig = {
        apiMode: 'HTTP' as const,
        backendUrl: 'http://localhost:3001',
        storageKey: 'my-custom-storage-key',
        maxItems: 15
      };
      vi.mocked(getServiceConfig).mockReturnValue(customConfig);

      mockLocalStorage.getItem.mockReturnValue(null);

      // Act
      const service = createItineraryService();

      // Assert - Call getHistory which will use the injected LocalStorageService
      service.getHistory();

      // Verify localStorage.getItem was called with the custom storageKey
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('my-custom-storage-key');
    });
  });
});
