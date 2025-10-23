/**
 * MarkdownItineraryDisplay Component
 *
 * Renders markdown-formatted itinerary content received from the backend.
 * Displays metadata (destination, party, month, days) in a header section,
 * followed by the markdown-formatted itinerary content rendered using react-markdown.
 *
 * This component was created as part of T012 to support the new markdown-based
 * backend response format (replacing structured JSON).
 *
 * @module components/ItineraryDisplay
 *
 * @example
 * ```tsx
 * const itinerary: ItineraryResponse = {
 *   destination: 'Paris',
 *   party_info: '2 adults',
 *   month: 'May',
 *   days: 3,
 *   itinerary: '# Paris Itinerary\n\n## Day 1\n...'
 * };
 *
 * <MarkdownItineraryDisplay itinerary={itinerary} />
 * ```
 *
 * @remarks
 * - Uses react-markdown with remarkGfm plugin for GitHub Flavored Markdown support
 * - Automatically sanitizes markdown content for XSS protection
 * - Gracefully handles empty or invalid markdown with error messages
 * - Maintains consistent styling with existing application design
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ItineraryResponse } from '../../types';
import './ItineraryDisplay.css';

/**
 * Props interface for MarkdownItineraryDisplay component
 *
 * @interface MarkdownItineraryDisplayProps
 * @property {ItineraryResponse} itinerary - The itinerary data to display with markdown content
 */
interface MarkdownItineraryDisplayProps {
  itinerary: ItineraryResponse;
}

/**
 * MarkdownItineraryDisplay component renders markdown-formatted itinerary content
 * with metadata header and proper markdown rendering using react-markdown library.
 *
 * The component expects the itinerary field to contain a plain markdown string.
 * Markdown content is rendered with support for:
 * - Headers (h1-h6)
 * - Lists (ordered and unordered)
 * - Text emphasis (bold, italic)
 * - Links
 * - Tables (via GitHub Flavored Markdown)
 * - Strikethrough (via GitHub Flavored Markdown)
 * - Code blocks
 *
 * @param {MarkdownItineraryDisplayProps} props - Component props
 * @returns {JSX.Element} Rendered component with metadata and markdown content
 */
const MarkdownItineraryDisplay: React.FC<MarkdownItineraryDisplayProps> = ({ itinerary }) => {
  const { destination, party_info, month, days, itinerary: markdownContent } = itinerary;

  // Handle empty or invalid markdown content
  if (!markdownContent || markdownContent.trim() === '') {
    return (
      <section className="itinerary-display">
        <header className="itinerary-display__metadata">
          <div className="itinerary-display__metadata-item">
            <div className="itinerary-display__metadata-label">Destination</div>
            <div className="itinerary-display__metadata-value">{destination}</div>
          </div>
          <div className="itinerary-display__metadata-item">
            <div className="itinerary-display__metadata-label">Party</div>
            <div className="itinerary-display__metadata-value">{party_info}</div>
          </div>
          <div className="itinerary-display__metadata-item">
            <div className="itinerary-display__metadata-label">Month</div>
            <div className="itinerary-display__metadata-value">{month}</div>
          </div>
          <div className="itinerary-display__metadata-item">
            <div className="itinerary-display__metadata-label">Duration</div>
            <div className="itinerary-display__metadata-value">{days} {days === 1 ? 'day' : 'days'}</div>
          </div>
        </header>
        <div className="markdown-itinerary__error">
          <p>No itinerary content available. The response did not contain valid markdown content.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="itinerary-display">
      <header className="itinerary-display__metadata">
        <div className="itinerary-display__metadata-item">
          <div className="itinerary-display__metadata-label">Destination</div>
          <div className="itinerary-display__metadata-value">{destination}</div>
        </div>
        <div className="itinerary-display__metadata-item">
          <div className="itinerary-display__metadata-label">Party</div>
          <div className="itinerary-display__metadata-value">{party_info}</div>
        </div>
        <div className="itinerary-display__metadata-item">
          <div className="itinerary-display__metadata-label">Month</div>
          <div className="itinerary-display__metadata-value">{month}</div>
        </div>
        <div className="itinerary-display__metadata-item">
          <div className="itinerary-display__metadata-label">Duration</div>
          <div className="itinerary-display__metadata-value">{days} {days === 1 ? 'day' : 'days'}</div>
        </div>
      </header>
      <main className="markdown-itinerary__content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdownContent}
        </ReactMarkdown>
      </main>
    </section>
  );
};

export default MarkdownItineraryDisplay;
