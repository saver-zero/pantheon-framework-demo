import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LocalStorageService } from './LocalStorageService';
import {
  validMarkdownItinerary,
  minimalMarkdownItinerary,
  markdownWithSpecialCharacters,
  emptyMarkdown
} from '../test/fixtures/markdownFixtures';

describe('LocalStorageService with Markdown', () => {
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

  describe('saveItinerary and getHistory with markdown strings', () => {
    it('should save markdown string and retrieve it from localStorage', () => {
      // Arrange
      const service = new LocalStorageService('test-itinerary-key', 10);
      mockLocalStorage.getItem.mockReturnValue(null);

      // Act
      service.saveItinerary(validMarkdownItinerary);

      // Assert - Verify localStorage.setItem was called with JSON-stringified array of strings
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'test-itinerary-key',
        JSON.stringify([validMarkdownItinerary])
      );

      // Mock getItem to return the saved data
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify([validMarkdownItinerary]));

      // Act - Retrieve history
      const history = service.getHistory();

      // Assert - Verify getHistory returns string array
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('test-itinerary-key');
      expect(history).toEqual([validMarkdownItinerary]);
      expect(history).toHaveLength(1);
      expect(typeof history[0]).toBe('string');
    });

    it('should handle multiple markdown strings in history', () => {
      // Arrange
      const service = new LocalStorageService('test-key', 10);

      let storedData: string[] = [];
      mockLocalStorage.getItem.mockImplementation(() => JSON.stringify(storedData));
      mockLocalStorage.setItem.mockImplementation((key: string, value: string) => {
        storedData = JSON.parse(value);
      });

      // Act - Save multiple markdown itineraries
      service.saveItinerary(validMarkdownItinerary);
      service.saveItinerary(minimalMarkdownItinerary);
      service.saveItinerary(markdownWithSpecialCharacters);

      // Assert
      const history = service.getHistory();
      expect(history).toHaveLength(3);
      expect(history.every(item => typeof item === 'string')).toBe(true);
      expect(history[0]).toContain('London'); // Most recent
      expect(history[1]).toContain('Paris');
      expect(history[2]).toContain('Tokyo'); // Oldest
    });
  });

  describe('markdown string serialization', () => {
    it('should correctly serialize markdown with newlines', () => {
      // Arrange
      const service = new LocalStorageService('test-key', 10);
      mockLocalStorage.getItem.mockReturnValue(null);

      // Act
      service.saveItinerary(validMarkdownItinerary);

      // Assert - Verify newlines are preserved in JSON
      const setItemCall = mockLocalStorage.setItem.mock.calls[0];
      const savedValue = setItemCall[1] as string;
      const parsed = JSON.parse(savedValue);

      expect(parsed[0]).toContain('\n');
      expect(parsed[0]).toContain('# Tokyo Itinerary');
      expect(parsed[0]).toContain('## Day 1');
    });

    it('should correctly deserialize markdown with newlines', () => {
      // Arrange
      const service = new LocalStorageService('test-key', 10);
      const storedData = JSON.stringify([validMarkdownItinerary]);
      mockLocalStorage.getItem.mockReturnValue(storedData);

      // Act
      const history = service.getHistory();

      // Assert
      expect(history[0]).toBe(validMarkdownItinerary);
      expect(history[0]).toContain('\n');
      expect(history[0].split('\n').length).toBeGreaterThan(10);
    });

    it('should handle markdown with special characters during serialization', () => {
      // Arrange
      const service = new LocalStorageService('test-key', 10);
      mockLocalStorage.getItem.mockReturnValue(null);

      // Act
      service.saveItinerary(markdownWithSpecialCharacters);

      // Assert
      mockLocalStorage.getItem.mockReturnValue(
        mockLocalStorage.setItem.mock.calls[0][1] as string
      );
      const history = service.getHistory();

      expect(history[0]).toContain('"The Queen\'s official residence"');
      expect(history[0]).toContain('(10:45 AM)');
      expect(history[0]).toContain('5.5 million items!');
    });

    it('should handle markdown with unicode characters', () => {
      // Arrange
      const markdownWithUnicode = `# Tokyo - 東京

## Day 1

### Morning
- Visit 浅草寺 (Sensō-ji)
- Try 寿司 (sushi)
- Price: ¥2000
`;

      const service = new LocalStorageService('test-key', 10);
      mockLocalStorage.getItem.mockReturnValue(null);

      // Act
      service.saveItinerary(markdownWithUnicode);

      // Assert
      mockLocalStorage.getItem.mockReturnValue(
        mockLocalStorage.setItem.mock.calls[0][1] as string
      );
      const history = service.getHistory();

      expect(history[0]).toContain('東京');
      expect(history[0]).toContain('浅草寺');
      expect(history[0]).toContain('¥');
    });

    it('should handle empty markdown string', () => {
      // Arrange
      const service = new LocalStorageService('test-key', 10);
      mockLocalStorage.getItem.mockReturnValue(null);

      // Act
      service.saveItinerary(emptyMarkdown);

      // Assert
      const setItemCall = mockLocalStorage.setItem.mock.calls[0];
      const savedValue = setItemCall[1] as string;
      const parsed = JSON.parse(savedValue);

      expect(parsed).toEqual(['']);
      expect(parsed[0]).toBe('');
    });
  });

  describe('maximum item enforcement with markdown', () => {
    it('should enforce 10-item maximum for markdown strings', () => {
      // Arrange
      const service = new LocalStorageService('test-key', 10);

      let storedData: string[] = [];
      mockLocalStorage.getItem.mockImplementation(() => JSON.stringify(storedData));
      mockLocalStorage.setItem.mockImplementation((key: string, value: string) => {
        storedData = JSON.parse(value);
      });

      // Act - Add 12 markdown itineraries
      for (let i = 1; i <= 12; i++) {
        const markdown = `# Place ${i}\n\n## Day 1\n\nItinerary for place ${i}`;
        service.saveItinerary(markdown);
      }

      // Assert
      const finalCall = mockLocalStorage.setItem.mock.calls[mockLocalStorage.setItem.mock.calls.length - 1];
      const savedData = JSON.parse(finalCall[1] as string);
      expect(savedData).toHaveLength(10);

      // Most recent should be first
      expect(savedData[0]).toContain('Place 12');
      expect(savedData[9]).toContain('Place 3');

      // Oldest items removed
      const allContent = savedData.join('');
      expect(allContent).not.toContain('Place 1');
      expect(allContent).not.toContain('Place 2');
    });
  });

  describe('quota error handling with markdown', () => {
    it('should handle QuotaExceededError with markdown strings', () => {
      // Arrange
      const service = new LocalStorageService('test-key', 10);

      const existingHistory: string[] = [];
      for (let i = 1; i <= 10; i++) {
        existingHistory.push(`# Place ${i}\n\nItinerary content`);
      }

      let storedData: string[] = existingHistory;
      mockLocalStorage.getItem.mockImplementation(() => JSON.stringify(storedData));

      let callCount = 0;
      mockLocalStorage.setItem.mockImplementation((key: string, value: string) => {
        callCount++;
        if (callCount === 1) {
          const error = new DOMException('QuotaExceededError', 'QuotaExceededError');
          Object.defineProperty(error, 'name', { value: 'QuotaExceededError' });
          throw error;
        }
        storedData = JSON.parse(value);
      });

      const newMarkdown = '# New Place\n\nNew itinerary content';

      // Act
      service.saveItinerary(newMarkdown);

      // Assert
      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(3);

      const finalCall = mockLocalStorage.setItem.mock.calls[2];
      const savedData = JSON.parse(finalCall[1] as string);

      expect(savedData.length).toBe(8);
      expect(savedData[0]).toContain('New Place');
    });

    it('should handle very large markdown strings and quota errors', () => {
      // Arrange
      const service = new LocalStorageService('test-key', 10);

      // Create a very large markdown string
      const largeMarkdown = `# Large Itinerary\n\n${'## Day\n\n### Activity\n- Detail\n\n'.repeat(1000)}`;

      let storedData: string[] = [];
      mockLocalStorage.getItem.mockImplementation(() => JSON.stringify(storedData));

      let callCount = 0;
      mockLocalStorage.setItem.mockImplementation((key: string, value: string) => {
        callCount++;
        if (callCount === 1) {
          const error = new DOMException('QuotaExceededError', 'QuotaExceededError');
          Object.defineProperty(error, 'name', { value: 'QuotaExceededError' });
          throw error;
        }
        storedData = JSON.parse(value);
      });

      // Act
      service.saveItinerary(largeMarkdown);

      // Assert - Should handle large markdown and recover from quota error
      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(3);
      const finalData = JSON.parse(mockLocalStorage.setItem.mock.calls[2][1] as string);
      expect(finalData[0]).toContain('Large Itinerary');
    });
  });

  describe('error handling for corrupted markdown data', () => {
    it('should return empty array when no markdown history exists', () => {
      // Arrange
      const service = new LocalStorageService('test-key', 10);
      mockLocalStorage.getItem.mockReturnValue(null);

      // Act
      const history = service.getHistory();

      // Assert
      expect(history).toEqual([]);
      expect(history).toHaveLength(0);
    });

    it('should handle corrupted JSON gracefully', () => {
      // Arrange
      const service = new LocalStorageService('test-key', 10);
      const invalidJSON = '{invalid json data}';
      mockLocalStorage.getItem.mockReturnValue(invalidJSON);

      // Act
      const history = service.getHistory();

      // Assert
      expect(history).toEqual([]);
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test-key');
    });

    it('should handle valid JSON but not string array', () => {
      // Arrange
      const service = new LocalStorageService('test-key', 10);
      const validJSONButNotArray = JSON.stringify({ key: 'value' });
      mockLocalStorage.getItem.mockReturnValue(validJSONButNotArray);

      // Act
      const history = service.getHistory();

      // Assert
      expect(history).toEqual([]);
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test-key');
    });
  });

  describe('markdown-specific edge cases', () => {
    it('should preserve markdown formatting in storage', () => {
      // Arrange
      const markdownWithFormatting = `# **Bold Title**

## _Italic Section_

- Regular list
- **Bold item**
- *Italic item*
- ~~Strikethrough~~

\`\`\`
Code block
\`\`\`

> Blockquote`;

      const service = new LocalStorageService('test-key', 10);
      mockLocalStorage.getItem.mockReturnValue(null);

      // Act
      service.saveItinerary(markdownWithFormatting);

      // Assert
      mockLocalStorage.getItem.mockReturnValue(
        mockLocalStorage.setItem.mock.calls[0][1] as string
      );
      const history = service.getHistory();

      expect(history[0]).toContain('**Bold Title**');
      expect(history[0]).toContain('_Italic Section_');
      expect(history[0]).toContain('~~Strikethrough~~');
      expect(history[0]).toContain('```');
      expect(history[0]).toContain('>');
    });

    it('should handle markdown with URLs and links', () => {
      // Arrange
      const markdownWithLinks = `# Itinerary

## Resources

- [Visit Tokyo](https://tokyo.jp)
- [Book Hotel](https://example.com/book?id=123&date=2024)
- Email: info@example.com
- Website: www.example.com`;

      const service = new LocalStorageService('test-key', 10);
      mockLocalStorage.getItem.mockReturnValue(null);

      // Act
      service.saveItinerary(markdownWithLinks);

      // Assert
      mockLocalStorage.getItem.mockReturnValue(
        mockLocalStorage.setItem.mock.calls[0][1] as string
      );
      const history = service.getHistory();

      expect(history[0]).toContain('[Visit Tokyo](https://tokyo.jp)');
      expect(history[0]).toContain('?id=123&date=2024');
      expect(history[0]).toContain('@');
    });
  });
});
