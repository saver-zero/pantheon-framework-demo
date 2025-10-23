import ReactMarkdown from 'react-markdown';
import './MarkdownItineraryDisplay.css';

interface MarkdownItineraryDisplayProps {
  markdown: string;
}

export default function MarkdownItineraryDisplay({ markdown }: MarkdownItineraryDisplayProps) {
  return (
    <div className="markdown-itinerary-display">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
