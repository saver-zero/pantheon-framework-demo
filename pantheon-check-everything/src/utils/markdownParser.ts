/**
 * Utility module for extracting metadata from markdown itinerary strings.
 * Uses simple regex patterns to parse destination, days, month, and timestamp information.
 */

export interface ItineraryMetadata {
  destination: string;
  month?: string;
  days?: number;
  timestamp?: string;
}

/**
 * Extracts itinerary metadata from a markdown string.
 * Looks for patterns in the first H1 heading to extract destination and days.
 * Returns partial metadata even if some fields are missing.
 *
 * @param markdown - The markdown string to parse
 * @returns Metadata object with extracted fields
 */
export const extractItineraryMetadata = (markdown: string): ItineraryMetadata => {
  // Handle empty markdown gracefully
  if (!markdown || markdown.trim() === '') {
    return { destination: 'Unknown Destination' };
  }

  // Extract destination and days from first H1 heading
  // Pattern: "# Tokyo Itinerary - 5 Days" or "# Paris - 3 Days" or "# Rome"
  const h1Match = markdown.match(/^#\s+(.+?)(?:\s+-\s+(\d+)\s+Days?)?$/m);

  let destination = 'Unknown Destination';
  let days: number | undefined = undefined;

  if (h1Match) {
    // Extract destination (remove trailing " Itinerary" if present)
    destination = h1Match[1].replace(/\s+Itinerary$/i, '').trim();

    // Extract days if present
    if (h1Match[2]) {
      days = parseInt(h1Match[2], 10);
    }
  }

  // Extract month from content (looking for month names)
  const monthPattern = /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/i;
  const monthMatch = markdown.match(monthPattern);
  const month = monthMatch ? monthMatch[1] : undefined;

  // Extract timestamp from markdown comment
  // Pattern: "<!-- Generated: 2025-10-15 -->"
  const timestampMatch = markdown.match(/<!--\s*Generated:\s*(.+?)\s*-->/);
  const timestamp = timestampMatch ? timestampMatch[1].trim() : undefined;

  return {
    destination,
    month,
    days,
    timestamp
  };
};
