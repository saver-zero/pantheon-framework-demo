/**
 * Unit tests for MarkdownItineraryDisplay component
 *
 * Tests component rendering with markdown content, metadata display,
 * handling of empty/null markdown, and CSS class application.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MarkdownItineraryDisplay from './MarkdownItineraryDisplay';
import { ItineraryResponse } from '../../types';

/**
 * Sample markdown itinerary with complete content
 */
const mockMarkdownItinerary: ItineraryResponse = {
  destination: 'Paris',
  party_info: '2 adults',
  month: 'May',
  days: 2,
  itinerary: `# Paris Travel Itinerary

## Day 1

### Morning
- **Eiffel Tower** - Visit observation deck and take photos
- Enjoy breakfast at Cafe de l'Homme

### Afternoon
- **Louvre Museum** - See the Mona Lisa and explore Egyptian antiquities
- Lunch at Cafe Mollien inside the museum

### Evening
- **Seine River Cruise** - Enjoy dinner cruise and see illuminated monuments

## Day 2

### Morning
- **Notre-Dame Cathedral** - View the facade and explore the island
- Visit Shakespeare and Company Cafe for coffee
`,
};

/**
 * Sample markdown with GitHub Flavored Markdown features
 */
const mockGFMItinerary: ItineraryResponse = {
  destination: 'Tokyo',
  party_info: 'solo traveler',
  month: 'April',
  days: 3,
  itinerary: `# Tokyo Itinerary

## Day 1

### Checklist
- [x] Book hotel
- [x] Reserve restaurant
- [ ] Buy JR Pass

### Restaurants

| Name | Location | Price |
|------|----------|-------|
| Sushi Dai | Tsukiji | $$ |
| Ichiran | Shibuya | $ |

### Notes
~~Don't visit on Monday~~ Open every day!

**Important**: Bring comfortable shoes.
`,
};

/**
 * Empty markdown content
 */
const mockEmptyItinerary: ItineraryResponse = {
  destination: 'London',
  party_info: 'family of 4',
  month: 'June',
  days: 5,
  itinerary: '',
};

/**
 * Whitespace-only markdown content
 */
const mockWhitespaceItinerary: ItineraryResponse = {
  destination: 'Rome',
  party_info: 'couple',
  month: 'September',
  days: 4,
  itinerary: '   \n\t  ',
};

describe('MarkdownItineraryDisplay component rendering', () => {
  it('renders with markdown content', () => {
    render(<MarkdownItineraryDisplay itinerary={mockMarkdownItinerary} />);

    // Check that markdown is rendered (headers become actual HTML elements)
    expect(screen.getByText('Paris Travel Itinerary')).toBeInTheDocument();
    expect(screen.getByText('Day 1')).toBeInTheDocument();
    expect(screen.getByText('Day 2')).toBeInTheDocument();
    // Morning appears twice in the markdown, so use getAllByText
    const morningElements = screen.getAllByText('Morning');
    expect(morningElements.length).toBeGreaterThan(0);
    expect(screen.getByText('Afternoon')).toBeInTheDocument();
    expect(screen.getByText('Evening')).toBeInTheDocument();
  });

  it('renders metadata section correctly', () => {
    render(<MarkdownItineraryDisplay itinerary={mockMarkdownItinerary} />);

    // Check metadata labels
    expect(screen.getByText('Destination')).toBeInTheDocument();
    expect(screen.getByText('Party')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Duration')).toBeInTheDocument();

    // Check metadata values
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('2 adults')).toBeInTheDocument();
    expect(screen.getByText('May')).toBeInTheDocument();
    expect(screen.getByText('2 days')).toBeInTheDocument();
  });

  it('renders markdown lists correctly', () => {
    render(<MarkdownItineraryDisplay itinerary={mockMarkdownItinerary} />);

    // Check list items are rendered
    expect(screen.getByText(/Eiffel Tower/)).toBeInTheDocument();
    expect(screen.getByText(/Louvre Museum/)).toBeInTheDocument();
    expect(screen.getByText(/Seine River Cruise/)).toBeInTheDocument();
    expect(screen.getByText(/Notre-Dame Cathedral/)).toBeInTheDocument();
  });

  it('renders GitHub Flavored Markdown features', () => {
    const { container } = render(<MarkdownItineraryDisplay itinerary={mockGFMItinerary} />);

    // Check for table element (from GFM table syntax)
    const tables = container.querySelectorAll('table');
    expect(tables.length).toBeGreaterThan(0);

    // Check for strikethrough (del element)
    const strikethrough = container.querySelectorAll('del');
    expect(strikethrough.length).toBeGreaterThan(0);

    // Check table content
    expect(screen.getByText('Sushi Dai')).toBeInTheDocument();
    expect(screen.getByText('Ichiran')).toBeInTheDocument();
  });

  it('displays day count correctly for single day', () => {
    const singleDayItinerary: ItineraryResponse = {
      ...mockMarkdownItinerary,
      days: 1,
    };

    render(<MarkdownItineraryDisplay itinerary={singleDayItinerary} />);

    // Should show "1 day" (singular)
    expect(screen.getByText('1 day')).toBeInTheDocument();
  });

  it('displays day count correctly for multiple days', () => {
    render(<MarkdownItineraryDisplay itinerary={mockMarkdownItinerary} />);

    // Should show "2 days" (plural)
    expect(screen.getByText('2 days')).toBeInTheDocument();
  });
});

describe('Handling empty or null markdown content', () => {
  it('handles empty markdown content gracefully', () => {
    render(<MarkdownItineraryDisplay itinerary={mockEmptyItinerary} />);

    // Should still render metadata
    expect(screen.getByText('Destination')).toBeInTheDocument();
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('family of 4')).toBeInTheDocument();

    // Should display error message
    expect(
      screen.getByText('No itinerary content available. The response did not contain valid markdown content.')
    ).toBeInTheDocument();
  });

  it('handles whitespace-only markdown content', () => {
    render(<MarkdownItineraryDisplay itinerary={mockWhitespaceItinerary} />);

    // Should still render metadata
    expect(screen.getByText('Destination')).toBeInTheDocument();
    expect(screen.getByText('Rome')).toBeInTheDocument();
    expect(screen.getByText('couple')).toBeInTheDocument();

    // Should display error message
    expect(
      screen.getByText('No itinerary content available. The response did not contain valid markdown content.')
    ).toBeInTheDocument();
  });

  it('displays error message with correct CSS class', () => {
    const { container } = render(<MarkdownItineraryDisplay itinerary={mockEmptyItinerary} />);

    const errorElement = container.querySelector('.markdown-itinerary__error');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement?.textContent).toContain('No itinerary content available');
  });
});

describe('CSS classes and semantic structure', () => {
  it('applies correct CSS classes for styling', () => {
    const { container } = render(<MarkdownItineraryDisplay itinerary={mockMarkdownItinerary} />);

    // Check for main container classes
    expect(container.querySelector('.itinerary-display')).toBeInTheDocument();
    expect(container.querySelector('.itinerary-display__metadata')).toBeInTheDocument();
    expect(container.querySelector('.markdown-itinerary__content')).toBeInTheDocument();

    // Check for metadata item classes
    expect(container.querySelector('.itinerary-display__metadata-item')).toBeInTheDocument();
    expect(container.querySelector('.itinerary-display__metadata-label')).toBeInTheDocument();
    expect(container.querySelector('.itinerary-display__metadata-value')).toBeInTheDocument();
  });

  it('uses semantic HTML structure', () => {
    const { container } = render(<MarkdownItineraryDisplay itinerary={mockMarkdownItinerary} />);

    // Check for semantic HTML elements
    expect(container.querySelector('section.itinerary-display')).toBeInTheDocument();
    expect(container.querySelector('header.itinerary-display__metadata')).toBeInTheDocument();
    expect(container.querySelector('main.markdown-itinerary__content')).toBeInTheDocument();
  });

  it('renders markdown with proper heading hierarchy', () => {
    const { container } = render(<MarkdownItineraryDisplay itinerary={mockMarkdownItinerary} />);

    // Check that markdown headers are converted to HTML headings
    const h1Elements = container.querySelectorAll('h1');
    const h2Elements = container.querySelectorAll('h2');
    const h3Elements = container.querySelectorAll('h3');

    expect(h1Elements.length).toBeGreaterThan(0); // Main title
    expect(h2Elements.length).toBeGreaterThan(0); // Day headers
    expect(h3Elements.length).toBeGreaterThan(0); // Time period headers
  });

  it('renders markdown lists as HTML list elements', () => {
    const { container } = render(<MarkdownItineraryDisplay itinerary={mockMarkdownItinerary} />);

    // Check for list elements
    const ulElements = container.querySelectorAll('ul');
    const liElements = container.querySelectorAll('li');

    expect(ulElements.length).toBeGreaterThan(0);
    expect(liElements.length).toBeGreaterThan(0);
  });

  it('maintains proper structure for screen readers', () => {
    const { container } = render(<MarkdownItineraryDisplay itinerary={mockMarkdownItinerary} />);

    // Check for semantic elements
    expect(container.querySelector('section')).toBeInTheDocument();
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('main')).toBeInTheDocument();
  });
});

describe('Markdown rendering security', () => {
  it('renders bold text correctly', () => {
    const { container } = render(<MarkdownItineraryDisplay itinerary={mockMarkdownItinerary} />);

    // Check for bold/strong elements
    const strongElements = container.querySelectorAll('strong');
    expect(strongElements.length).toBeGreaterThan(0);
  });

  it('renders emphasis text correctly', () => {
    const italicItinerary: ItineraryResponse = {
      ...mockMarkdownItinerary,
      itinerary: '# Title\n\n*Important note* about the trip.',
    };

    const { container } = render(<MarkdownItineraryDisplay itinerary={italicItinerary} />);

    // Check for emphasis/em elements
    const emElements = container.querySelectorAll('em');
    expect(emElements.length).toBeGreaterThan(0);
  });

  it('does not render raw HTML from markdown', () => {
    const htmlItinerary: ItineraryResponse = {
      ...mockMarkdownItinerary,
      itinerary: '# Title\n\n<script>alert("xss")</script>\n\nSafe content.',
    };

    const { container } = render(<MarkdownItineraryDisplay itinerary={htmlItinerary} />);

    // react-markdown should sanitize HTML by default
    const scriptElements = container.querySelectorAll('script');
    expect(scriptElements.length).toBe(0);
  });
});
