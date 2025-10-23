import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ItineraryDisplay } from './ItineraryDisplay';
import {
  validMarkdownItinerary,
  minimalMarkdownItinerary,
  emptyMarkdown,
  malformedMarkdown,
  markdownWithSpecialCharacters,
  markdownWithGFM
} from '../test/fixtures/markdownFixtures';

describe('ItineraryDisplay with Markdown Rendering', () => {
  describe('markdown rendering with react-markdown', () => {
    it('should render markdown content using ReactMarkdown component', () => {
      // Act
      render(<ItineraryDisplay markdown={validMarkdownItinerary} />);

      // Assert - Verify markdown headings are rendered as HTML headings
      expect(screen.getByRole('heading', { name: /Tokyo Itinerary - 3 Days/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Day 1: Exploring Central Tokyo/i })).toBeInTheDocument();
    });

    it('should render markdown lists as HTML lists', () => {
      // Act
      render(<ItineraryDisplay markdown={validMarkdownItinerary} />);

      // Assert - Verify list items are rendered
      expect(screen.getByText(/Senso-ji Temple/i)).toBeInTheDocument();
      expect(screen.getByText(/Tokyo Skytree/i)).toBeInTheDocument();
      expect(screen.getByText(/Shibuya Crossing/i)).toBeInTheDocument();
    });

    it('should render markdown bold text as strong elements', () => {
      // Act
      const { container } = render(<ItineraryDisplay markdown={validMarkdownItinerary} />);

      // Assert - Check for strong tags (bold text)
      const strongElements = container.querySelectorAll('strong');
      expect(strongElements.length).toBeGreaterThan(0);
      expect(strongElements[0].textContent).toContain('Senso-ji Temple');
    });

    it('should render markdown headings with proper hierarchy', () => {
      // Act
      const { container } = render(<ItineraryDisplay markdown={validMarkdownItinerary} />);

      // Assert - Verify heading levels
      const h1 = container.querySelector('h1');
      const h2Elements = container.querySelectorAll('h2');
      const h3Elements = container.querySelectorAll('h3');

      expect(h1).toBeInTheDocument();
      expect(h2Elements.length).toBeGreaterThan(0);
      expect(h3Elements.length).toBeGreaterThan(0);

      expect(h1?.textContent).toContain('Tokyo Itinerary');
    });

    it('should render minimal markdown correctly', () => {
      // Act
      render(<ItineraryDisplay markdown={minimalMarkdownItinerary} />);

      // Assert
      expect(screen.getByRole('heading', { name: /Paris - 1 Day/i })).toBeInTheDocument();
      expect(screen.getByText(/Eiffel Tower visit/i)).toBeInTheDocument();
      expect(screen.getByText(/Louvre Museum/i)).toBeInTheDocument();
    });
  });

  describe('special character and formatting handling', () => {
    it('should handle markdown with special characters correctly', () => {
      // Act
      render(<ItineraryDisplay markdown={markdownWithSpecialCharacters} />);

      // Assert - Verify special characters are preserved
      expect(screen.getByText(/Buckingham Palace/i)).toBeInTheDocument();
      expect(screen.getByText(/The Queen's official residence/i)).toBeInTheDocument();
      expect(screen.getByText(/10:45 AM/i)).toBeInTheDocument();
    });

    it('should render markdown with quotes and parentheses', () => {
      // Act
      const { container } = render(<ItineraryDisplay markdown={markdownWithSpecialCharacters} />);

      // Assert
      const content = container.textContent;
      expect(content).toContain('"The Queen\'s official residence"');
      expect(content).toContain('(10:45 AM)');
      expect(content).toContain('(5.5 million items!)');
    });

    it('should preserve line breaks in markdown content', () => {
      // Arrange
      const markdownWithLineBreaks = `# Title

First paragraph.

Second paragraph after blank line.

Third paragraph.`;

      // Act
      const { container } = render(<ItineraryDisplay markdown={markdownWithLineBreaks} />);

      // Assert - Paragraphs should be separate elements
      const paragraphs = container.querySelectorAll('p');
      expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('GitHub Flavored Markdown support with remark-gfm', () => {
    it('should render tables from markdown', () => {
      // Act
      const { container } = render(<ItineraryDisplay markdown={markdownWithGFM} />);

      // Assert - Check for table elements
      const table = container.querySelector('table');
      expect(table).toBeInTheDocument();

      const headers = container.querySelectorAll('th');
      expect(headers.length).toBeGreaterThan(0);
    });

    it('should render task lists with checkboxes', () => {
      // Act
      const { container } = render(<ItineraryDisplay markdown={markdownWithGFM} />);

      // Assert - Check for checkbox inputs
      const checkboxes = container.querySelectorAll('input[type="checkbox"]');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('should render strikethrough text', () => {
      // Act
      const { container } = render(<ItineraryDisplay markdown={markdownWithGFM} />);

      // Assert - Check for del/s tags (strikethrough)
      const strikethrough = container.querySelector('del, s');
      expect(strikethrough).toBeInTheDocument();
    });

    it('should render blockquotes', () => {
      // Act
      const { container } = render(<ItineraryDisplay markdown={markdownWithGFM} />);

      // Assert - Check for blockquote elements
      const blockquote = container.querySelector('blockquote');
      expect(blockquote).toBeInTheDocument();
      expect(blockquote?.textContent).toContain('Remember to dress modestly');
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle empty markdown string gracefully', () => {
      // Act
      const { container } = render(<ItineraryDisplay markdown={emptyMarkdown} />);

      // Assert - Should render without errors, but be empty
      expect(container.textContent).toBe('');
    });

    it('should render malformed markdown as best as possible', () => {
      // Act
      render(<ItineraryDisplay markdown={malformedMarkdown} />);

      // Assert - Should still render the text content
      expect(screen.getByText(/Broken Itinerary/i)).toBeInTheDocument();
      expect(screen.getByText(/Just random text/i)).toBeInTheDocument();
    });

    it('should sanitize potentially dangerous HTML in markdown', () => {
      // Arrange
      const markdownWithHTML = `# Title

<script>alert('XSS')</script>

<img src="x" onerror="alert('XSS')">

Normal content.`;

      // Act
      const { container } = render(<ItineraryDisplay markdown={markdownWithHTML} />);

      // Assert - Script tags should be sanitized by react-markdown
      const scripts = container.querySelectorAll('script');
      expect(scripts.length).toBe(0);

      // Normal content should still render
      expect(screen.getByText(/Normal content/i)).toBeInTheDocument();
    });

    it('should handle markdown with very long content', () => {
      // Arrange
      const longMarkdown = `# Long Itinerary\n\n${'## Day X\n\n### Morning\n- Activity\n\n'.repeat(100)}`;

      // Act
      const { container } = render(<ItineraryDisplay markdown={longMarkdown} />);

      // Assert - Should render without performance issues
      expect(container.querySelectorAll('h2').length).toBeGreaterThan(50);
    });
  });

  describe('accessibility', () => {
    it('should render semantic HTML from markdown', () => {
      // Act
      const { container } = render(<ItineraryDisplay markdown={validMarkdownItinerary} />);

      // Assert - Verify semantic HTML structure
      expect(container.querySelector('h1')).toBeInTheDocument();
      expect(container.querySelector('ul')).toBeInTheDocument();
      expect(container.querySelector('strong')).toBeInTheDocument();
    });

    it('should have proper heading hierarchy for screen readers', () => {
      // Act
      const { container } = render(<ItineraryDisplay markdown={validMarkdownItinerary} />);

      // Assert - h1 -> h2 -> h3 hierarchy
      const h1 = container.querySelector('h1');
      const h2 = container.querySelector('h2');
      const h3 = container.querySelector('h3');

      expect(h1).toBeInTheDocument();
      expect(h2).toBeInTheDocument();
      expect(h3).toBeInTheDocument();

      // Verify heading levels are in order
      const allHeadings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
      expect(allHeadings[0].tagName).toBe('H1');
    });

    it('should render list items with proper ARIA roles', () => {
      // Act
      render(<ItineraryDisplay markdown={validMarkdownItinerary} />);

      // Assert - List items should be discoverable
      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBeGreaterThan(0);
    });
  });

  describe('no structured component rendering', () => {
    it('should not use Day, Activity, or TimePeriod components', () => {
      // This test validates that we are NOT rendering structured components
      // Instead, we're using react-markdown to render markdown directly

      // Arrange
      const { container } = render(<ItineraryDisplay markdown={validMarkdownItinerary} />);

      // Assert - Should not have custom component class names or data attributes
      // that would indicate structured component usage
      expect(container.querySelector('[data-testid="day-view"]')).not.toBeInTheDocument();
      expect(container.querySelector('[data-testid="activity-item"]')).not.toBeInTheDocument();
      expect(container.querySelector('.day-view')).not.toBeInTheDocument();
      expect(container.querySelector('.activity-item')).not.toBeInTheDocument();
    });

    it('should use react-markdown for all content rendering', () => {
      // Arrange
      const { container } = render(<ItineraryDisplay markdown={validMarkdownItinerary} />);

      // Assert - Rendered content should be simple HTML from markdown
      // No complex React component structures
      const hasOnlySimpleHTML = !container.querySelector('[class*="component"]');
      expect(hasOnlySimpleHTML).toBe(true);
    });
  });
});
