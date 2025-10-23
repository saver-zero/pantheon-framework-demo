import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export interface ItineraryDisplayProps {
  markdown: string;
}

/**
 * ItineraryDisplay Component - Markdown Rendering
 *
 * Renders itinerary content in markdown format using react-markdown.
 * Supports GitHub Flavored Markdown (GFM) features including tables, task lists,
 * strikethrough, and other extended markdown syntax.
 *
 * The component receives a plain markdown string from the backend and renders it
 * with proper semantic HTML structure, maintaining accessibility and formatting.
 */
export const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ markdown }) => {
  return (
    <div className="itinerary-display">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
};
