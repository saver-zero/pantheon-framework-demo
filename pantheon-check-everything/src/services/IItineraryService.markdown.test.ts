import { describe, it, expect, vi } from 'vitest';
import type { IItineraryService } from './IItineraryService';
import { validMarkdownItinerary, minimalMarkdownItinerary } from '../test/fixtures/markdownFixtures';

describe('IItineraryService Markdown Interface Contract', () => {
  describe('interface method signatures for markdown', () => {
    it('should enforce generateItinerary returns Promise<string> with markdown content', async () => {
      // Arrange - Create mock implementation returning markdown string
      const mockService: IItineraryService = {
        generateItinerary: vi.fn().mockResolvedValue(validMarkdownItinerary),
        getHistory: vi.fn().mockReturnValue([]),
        saveToHistory: vi.fn()
      };

      // Act
      const result = await mockService.generateItinerary('Tokyo', 'couple', 'March', 3);

      // Assert
      expect(mockService.generateItinerary).toHaveBeenCalledWith('Tokyo', 'couple', 'March', 3);
      expect(typeof result).toBe('string');
      expect(result).toBe(validMarkdownItinerary);
      expect(result).toContain('# Tokyo Itinerary');
      expect(result).toContain('## Day 1');
    });

    it('should enforce getHistory returns string array of markdown', () => {
      // Arrange
      const mockHistory: string[] = [
        validMarkdownItinerary,
        minimalMarkdownItinerary
      ];

      const mockService: IItineraryService = {
        generateItinerary: vi.fn(),
        getHistory: vi.fn().mockReturnValue(mockHistory),
        saveToHistory: vi.fn()
      };

      // Act
      const history = mockService.getHistory();

      // Assert
      expect(Array.isArray(history)).toBe(true);
      expect(history).toHaveLength(2);
      expect(typeof history[0]).toBe('string');
      expect(typeof history[1]).toBe('string');
      expect(history[0]).toContain('Tokyo');
      expect(history[1]).toContain('Paris');
    });

    it('should enforce saveToHistory accepts string parameter', () => {
      // Arrange
      const mockService: IItineraryService = {
        generateItinerary: vi.fn(),
        getHistory: vi.fn().mockReturnValue([]),
        saveToHistory: vi.fn()
      };

      // Act
      mockService.saveToHistory(validMarkdownItinerary);

      // Assert
      expect(mockService.saveToHistory).toHaveBeenCalledWith(validMarkdownItinerary);
      expect(typeof validMarkdownItinerary).toBe('string');
    });

    it('should handle markdown with various formatting features', async () => {
      // Arrange
      const markdownWithFormatting = `# **Bold** Itinerary

## Day 1

### Morning
- Visit *temple*
- **Important**: Bring cash
- ~~Cancelled activity~~

### Afternoon
> Note: Weather dependent

1. First activity
2. Second activity

\`\`\`
Code block if needed
\`\`\`

[Link text](https://example.com)
`;

      const mockService: IItineraryService = {
        generateItinerary: vi.fn().mockResolvedValue(markdownWithFormatting),
        getHistory: vi.fn().mockReturnValue([]),
        saveToHistory: vi.fn()
      };

      // Act
      const result = await mockService.generateItinerary('Tokyo', 'couple', 'March', 3);

      // Assert
      expect(typeof result).toBe('string');
      expect(result).toContain('**Bold**');
      expect(result).toContain('*temple*');
      expect(result).toContain('~~Cancelled');
      expect(result).toContain('> Note:');
    });
  });

  describe('markdown string operations', () => {
    it('should handle empty markdown string', async () => {
      // Arrange
      const mockService: IItineraryService = {
        generateItinerary: vi.fn().mockResolvedValue(''),
        getHistory: vi.fn().mockReturnValue([]),
        saveToHistory: vi.fn()
      };

      // Act
      const result = await mockService.generateItinerary('Tokyo', 'couple', 'March', 3);

      // Assert
      expect(result).toBe('');
      expect(typeof result).toBe('string');
    });

    it('should preserve markdown line breaks and whitespace', async () => {
      // Arrange
      const markdownWithWhitespace = `# Title

## Section

Content with

multiple

line breaks.
`;

      const mockService: IItineraryService = {
        generateItinerary: vi.fn().mockResolvedValue(markdownWithWhitespace),
        getHistory: vi.fn().mockReturnValue([]),
        saveToHistory: vi.fn()
      };

      // Act
      const result = await mockService.generateItinerary('Tokyo', 'couple', 'March', 3);

      // Assert
      expect(result).toBe(markdownWithWhitespace);
      expect(result.split('\n\n')).toHaveLength(4); // Multiple blank lines preserved
    });

    it('should handle markdown with special characters', async () => {
      // Arrange
      const markdownWithSpecialChars = `# Tokyo - "The City"

## Day 1: Culture & History

- Visit temple (historic)
- Cost: 500 yen ($5)
- Rating: 4.5/5 stars
- Note: Don't forget!

### Where to eat
- Restaurant "Sushi Ya" (best in area)
- Address: 1-2-3 Shibuya, Tokyo
`;

      const mockService: IItineraryService = {
        generateItinerary: vi.fn().mockResolvedValue(markdownWithSpecialChars),
        getHistory: vi.fn().mockReturnValue([]),
        saveToHistory: vi.fn()
      };

      // Act
      const result = await mockService.generateItinerary('Tokyo', 'couple', 'March', 3);

      // Assert
      expect(result).toContain('"The City"');
      expect(result).toContain('$5');
      expect(result).toContain('4.5/5');
      expect(result).toContain('(historic)');
    });

    it('should handle markdown with unicode characters', async () => {
      // Arrange
      const markdownWithUnicode = `# Tokyo Itinerary

## Day 1: 東京

### Morning
- Visit 浅草寺 (Sensō-ji Temple)
- Try 寿司 (sushi) for lunch
- Shopping in 渋谷 (Shibuya)

### Where to eat
- Restaurant: すし屋 (Sushi-ya)
- Price: ¥2000-3000
`;

      const mockService: IItineraryService = {
        generateItinerary: vi.fn().mockResolvedValue(markdownWithUnicode),
        getHistory: vi.fn().mockReturnValue([]),
        saveToHistory: vi.fn()
      };

      // Act
      const result = await mockService.generateItinerary('Tokyo', 'couple', 'March', 3);

      // Assert
      expect(result).toContain('東京');
      expect(result).toContain('浅草寺');
      expect(result).toContain('¥');
    });
  });

  describe('service abstraction with markdown', () => {
    it('should allow swapping implementations that return markdown strings', async () => {
      // Arrange - Different implementations returning markdown
      const cliImplementation: IItineraryService = {
        generateItinerary: vi.fn().mockResolvedValue('# CLI Generated\n\nMarkdown from CLI'),
        getHistory: vi.fn().mockReturnValue([]),
        saveToHistory: vi.fn()
      };

      const httpImplementation: IItineraryService = {
        generateItinerary: vi.fn().mockResolvedValue('# HTTP Generated\n\nMarkdown from HTTP'),
        getHistory: vi.fn().mockReturnValue([]),
        saveToHistory: vi.fn()
      };

      // Act - Same component code works with both
      const useService = async (service: IItineraryService) => {
        return await service.generateItinerary('Tokyo', 'couple', 'March', 3);
      };

      const cliResult = await useService(cliImplementation);
      const httpResult = await useService(httpImplementation);

      // Assert
      expect(typeof cliResult).toBe('string');
      expect(typeof httpResult).toBe('string');
      expect(cliResult).toContain('CLI Generated');
      expect(httpResult).toContain('HTTP Generated');
    });

    it('should maintain history as array of markdown strings', () => {
      // Arrange
      const history = [
        '# Tokyo\n\nDay 1 itinerary',
        '# Paris\n\nDay 1 itinerary',
        '# London\n\nDay 1 itinerary'
      ];

      const mockService: IItineraryService = {
        generateItinerary: vi.fn(),
        getHistory: vi.fn().mockReturnValue(history),
        saveToHistory: vi.fn()
      };

      // Act
      const result = mockService.getHistory();

      // Assert
      expect(result).toHaveLength(3);
      expect(result.every(item => typeof item === 'string')).toBe(true);
      expect(result[0]).toContain('Tokyo');
      expect(result[1]).toContain('Paris');
      expect(result[2]).toContain('London');
    });
  });

  describe('no JSON parsing requirement', () => {
    it('should not attempt to parse markdown as JSON', async () => {
      // Arrange
      const mockService: IItineraryService = {
        generateItinerary: vi.fn().mockResolvedValue(validMarkdownItinerary),
        getHistory: vi.fn().mockReturnValue([]),
        saveToHistory: vi.fn()
      };

      // Act
      const result = await mockService.generateItinerary('Tokyo', 'couple', 'March', 3);

      // Assert - Markdown is not valid JSON
      expect(() => JSON.parse(result)).toThrow();
      expect(typeof result).toBe('string');
    });

    it('should handle markdown that happens to contain JSON-like text', async () => {
      // Arrange
      const markdownWithJSONText = `# Itinerary

## Example Response Format

The old format was:
\`\`\`json
{
  "destination": "Tokyo",
  "days": 3
}
\`\`\`

But now we use markdown!
`;

      const mockService: IItineraryService = {
        generateItinerary: vi.fn().mockResolvedValue(markdownWithJSONText),
        getHistory: vi.fn().mockReturnValue([]),
        saveToHistory: vi.fn()
      };

      // Act
      const result = await mockService.generateItinerary('Tokyo', 'couple', 'March', 3);

      // Assert - Should return markdown as-is, not try to extract JSON
      expect(result).toBe(markdownWithJSONText);
      expect(result).toContain('```json');
      expect(typeof result).toBe('string');
    });
  });
});
