---
doc_id: user-interface-history-view-guide
title: "History View Component Guide"
description: "Component guide for displaying and managing saved itinerary history using CSS classes for styling, list-detail pattern, metadata extraction, delete functionality, and integration with local storage."
keywords: [history, list-detail, metadata, delete, local-storage, component, ui, css-classes, design-tokens]
relevance: "Use this document to understand how the HistoryView component displays saved itineraries, extracts metadata for list display, manages selection state, and provides delete functionality."
created: 2025-10-18
updated: 2025-10-18 15:30 PDT
---

# History View Component Guide

## Overview

The HistoryView component provides users with access to previously generated itineraries stored in local storage. It implements a list-detail pattern where users can browse a list of itinerary summaries and select an entry to view the full details. The component integrates with the existing IItineraryService interface to retrieve history data and reuses the ItineraryDisplay component for rendering selected itineraries.

This component completes the local-first data management strategy by providing read access to saved itineraries without requiring backend connectivity. Users can review past trip plans, delete outdated entries, and navigate between summary and detail views seamlessly.

## Styling Approach

The HistoryView component uses CSS classes exclusively for all styling, following the application's design token system. No inline styles or JavaScript style objects are used. All visual presentation is controlled through CSS classes defined in `src/index.css`:

- **.history-container**: Main container with max-width and centered alignment
- **.history-heading**: Heading styles with proper margins
- **.history-list**: Unstyled list container (removes default list styles)
- **.history-item**: Individual list item with card styling, borders, shadows, and hover effects
- **.history-item__container**: Flexbox container for item content structure
- **.history-item__header**: Header section with destination and position
- **.history-item__destination**: Destination text with emphasis styling
- **.history-item__position**: Position indicator with muted styling
- **.history-item__details**: Details section with metadata display
- **.history-empty-state**: Empty state with centered text and comfortable padding

All colors, spacing, and typography use CSS custom properties (design tokens) defined in `:root`, ensuring consistency across the application and automatic dark mode support through media queries.

## Component Architecture

### File Location
`src/components/HistoryView.tsx`

### Component Signature
```typescript
export const HistoryView: React.FC = () => {
  // Component implementation
}
```

The HistoryView component is a zero-props presentational component that manages its own internal state and consumes the IItineraryService via React Context.

### State Management

The component manages three pieces of local state:

```typescript
const [history, setHistory] = useState<string[]>([]);
const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
const [error, setError] = useState<string | null>(null);
```

**history**: Array of markdown strings retrieved from IItineraryService.getHistory(). Updated on component mount and after delete operations.

**selectedIndex**: Tracks which itinerary is currently selected for detail view. `null` indicates list view is active.

**error**: Stores error messages when storage retrieval fails. Displayed via ErrorDisplay component.

### Service Integration

The component consumes IItineraryService through the useItineraryService hook:

```typescript
const service = useItineraryService();
```

This hook provides access to:
- `getHistory()`: Retrieve saved markdown itineraries
- Direct localStorage manipulation for delete operations (workaround for missing deleteFromHistory method)

### List-Detail Pattern Implementation

The component uses conditional rendering to switch between list view and detail view:

```typescript
if (error) {
  return <ErrorDisplay errorMessage={error} />;
}

if (isLoading) {
  return (
    <div className="history-empty-state">
      <p>Loading history...</p>
    </div>
  );
}

if (selectedIndex !== null && history[selectedIndex]) {
  // Render detail view with ItineraryDisplay
  return (
    <div className="history-detail-container">
      <button
        onClick={() => setSelectedIndex(null)}
        className="btn btn-primary"
        aria-label="Back to History"
      >
        Back to History
      </button>
      <ItineraryDisplay markdown={history[selectedIndex]} />
    </div>
  );
}

// Render list view with CSS classes for styling
return (
  <div className="history-container">
    <h2 className="history-heading">Saved Itineraries</h2>
    <ul className="history-list">
      {history.map((_, index) => (
        <li
          key={index}
          onClick={() => setSelectedIndex(index)}
          onKeyDown={(e) => handleListItemKeyDown(index, e)}
          className="history-item"
          role="button"
          tabIndex={0}
          aria-label={`View itinerary for ${metadata.destination}`}
        >
          <div className="history-item__container">
            {/* Metadata display using BEM CSS classes */}
          </div>
        </li>
      ))}
    </ul>
  </div>
);
```

This pattern ensures only one view is active at a time, simplifying state management and rendering logic.

## Metadata Extraction

The HistoryView component uses the `extractItineraryMetadata` utility from `src/utils/markdownParser.ts` to extract display information from markdown strings:

```typescript
import { extractItineraryMetadata } from '../utils/markdownParser';

// In list rendering
const metadata = extractItineraryMetadata(markdown);
```

The extracted metadata includes:
- **destination**: Primary location (e.g., "Tokyo", "Paris")
- **days**: Trip duration (e.g., 3, 5, 7)
- **month**: Travel month if mentioned (e.g., "March")
- **timestamp**: Generation date if embedded in markdown comment

### List Item Display Format

Each list item displays:
1. Position indicator: "Most recent" for index 0, "number2", "number3", etc. for subsequent items
2. Destination name
3. Trip duration (e.g., "5 days")
4. Month if available

Example display: "Most recent: Tokyo - 5 days (March)"

This format provides sufficient context for users to identify and select itineraries without viewing full details.

## User Interactions

### Selecting an Itinerary for Detail View

Users click on any list item to view the full itinerary:

```typescript
<li onClick={() => setSelectedIndex(index)}>
  {/* Metadata display */}
</li>
```

This sets `selectedIndex` state, triggering conditional rendering of the detail view with ItineraryDisplay component.

### Navigating Back to List

A "Back to History" button returns to the list view:

```typescript
<button onClick={() => setSelectedIndex(null)}>Back to History</button>
```

This clears the `selectedIndex` state, restoring the list view.

### Deleting Entries

Each list item includes a delete button with standardized button styling:

```typescript
<button
  onClick={(e) => {
    e.stopPropagation(); // Prevent triggering list item click
    handleDelete(index);
  }}
  onKeyDown={(e) => handleDeleteKeyDown(index, e)}
  className="btn btn-danger"
  aria-label={`Delete itinerary for ${metadata.destination}`}
>
  Delete
</button>
```

The handleDelete function:
1. Shows confirmation dialog via `window.confirm()` with destination name
2. If confirmed, calls `service.deleteFromHistory(index)` to update storage
3. Filters the history array to remove the selected item
4. Updates local state to reflect the deletion
5. Adjusts selection state if necessary

```typescript
const handleDelete = useCallback((index: number) => {
  const metadata = historyMetadata[index];
  const confirmed = window.confirm(
    `Are you sure you want to delete the itinerary for ${metadata.destination}?`
  );

  if (confirmed) {
    try {
      // Attempt storage update first to ensure consistency
      service.deleteFromHistory(index);

      // Update local state only after successful storage update
      const updatedHistory = history.filter((_, i) => i !== index);
      setHistory(updatedHistory);

      // Reset selection if deleted item was selected
      if (selectedIndex === index) {
        setSelectedIndex(null);
      } else if (selectedIndex !== null && selectedIndex > index) {
        // Adjust selected index if it was after the deleted item
        setSelectedIndex(selectedIndex - 1);
      }
    } catch (err) {
      setError('Failed to delete itinerary. Please try again.');
      console.error('Error deleting itinerary:', err);
    }
  }
}, [history, historyMetadata, selectedIndex, service]);
```

The delete button uses the `.btn` and `.btn-danger` CSS classes for consistent styling with design tokens.

## Integration Pattern

### App Component Integration

The HistoryView component integrates into the main App component through state-based navigation:

```typescript
function App() {
  const [activeView, setActiveView] = useState<'form' | 'history'>('form');

  return (
    <ItineraryServiceProvider implementation={service}>
      <nav>
        <button onClick={() => setActiveView('form')}>Generate New Trip</button>
        <button onClick={() => setActiveView('history')}>View History</button>
      </nav>
      <main>
        {activeView === 'form' ? <ItineraryForm /> : <HistoryView />}
      </main>
    </ItineraryServiceProvider>
  );
}
```

The component receives IItineraryService context automatically through the provider wrapper, requiring no prop drilling or manual service injection.

### Service Context Requirements

HistoryView must be rendered within an ItineraryServiceProvider to access the service:

```typescript
// This will throw an error
<HistoryView /> // Error: useItineraryService must be used within ItineraryServiceProvider

// Correct usage
<ItineraryServiceProvider implementation={httpClient}>
  <HistoryView />
</ItineraryServiceProvider>
```

## Empty States and Error Handling

### Empty History State

When `history.length === 0`, the component displays a user-friendly empty state:

```typescript
if (history.length === 0 && !error) {
  return (
    <div>
      <p>No itineraries saved yet. Generate your first trip plan to see it here!</p>
    </div>
  );
}
```

This guidance encourages users to generate itineraries, explaining why the history is empty.

### Error States

When `getHistory()` throws an error or localStorage is corrupted, the error state is displayed via ErrorDisplay:

```typescript
useEffect(() => {
  try {
    const historyData = service.getHistory();
    setHistory(historyData);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to load history');
  }
}, [service]);
```

The ErrorDisplay component provides consistent error messaging with role="alert" for screen reader accessibility.

### Storage Failure Handling

Delete operations wrap localStorage access in try-catch:

```typescript
try {
  localStorage.setItem('itinerary-history', JSON.stringify(updatedHistory));
} catch (err) {
  setError('Failed to delete itinerary from storage');
}
```

This prevents uncaught exceptions from crashing the component while providing user feedback.

## Accessibility Considerations

### Semantic HTML

The component uses semantic HTML elements for proper document structure:

```typescript
<nav role="navigation">
  <button>...</button>
</nav>

<main>
  <ul> {/* Semantic list container */}
    <li>...</li>
  </ul>
</main>
```

This enables screen readers to understand the page structure and provide appropriate navigation landmarks.

### Keyboard Navigation

All interactive elements (buttons, list items) are fully keyboard accessible:
- Buttons are native `<button>` elements with implicit tab navigation
- List items have `role="button"`, `tabIndex={0}`, and keyboard event handlers (`onKeyDown`) for full accessibility
- Enter and Space keys activate list items and delete buttons
- Focus management ensures logical navigation flow

### Screen Reader Support

- Error messages use ErrorDisplay with `role="alert"` for immediate announcement
- Empty state messages are visible text, announced when rendered
- Button labels are clear and descriptive ("Back to History", "Delete")

### Visual Feedback

- Hover states provide visual feedback for interactive elements
- Selected items could use aria-selected attribute (future enhancement)
- Delete confirmation dialog provides clear confirmation step

## Reusable Components

### ItineraryDisplay Integration

The detail view reuses the existing ItineraryDisplay component:

```typescript
<ItineraryDisplay markdown={history[selectedIndex]} />
```

This component already handles:
- Markdown rendering with react-markdown
- GFM support (tables, strikethrough, task lists)
- Custom component mapping for semantic HTML
- XSS prevention through sanitization
- Accessibility with proper heading hierarchy

By reusing ItineraryDisplay, HistoryView avoids duplicating rendering logic and maintains consistent itinerary presentation across the application.

### ErrorDisplay Integration

Error handling uses the shared ErrorDisplay component:

```typescript
<ErrorDisplay message={error} />
```

This provides:
- Consistent error styling
- role="alert" for screen reader announcements
- Clear error messaging

## Component Lifecycle

### Mount Phase

1. Component mounts
2. useEffect runs with empty dependency array
3. Call `service.getHistory()` to retrieve saved itineraries
4. Store results in `history` state
5. Render list view with metadata-extracted summaries

### Interaction Phase

**List Selection**:
1. User clicks list item
2. `setSelectedIndex(index)` updates state
3. Re-render with detail view (conditional rendering)
4. ItineraryDisplay receives markdown and renders full itinerary

**Back Navigation**:
1. User clicks "Back to History" button
2. `setSelectedIndex(null)` updates state
3. Re-render with list view (conditional rendering)

**Delete Operation**:
1. User clicks delete button
2. `e.stopPropagation()` prevents list item selection
3. Confirmation dialog appears
4. If confirmed, filter history array
5. Update localStorage directly
6. Update `history` state with filtered array
7. Clear `selectedIndex` if deleted item was selected
8. Re-render with updated list

### Unmount Phase

No cleanup required. Component does not establish subscriptions, timers, or external resources.

## Testing Strategy

### Unit Tests

HistoryView.test.tsx covers:

1. **History Retrieval**: Mock `service.getHistory()` returns test data, verify list items render with correct metadata
2. **Empty State**: Mock returns empty array, verify empty state message displays
3. **Selection**: Simulate list item click, verify ItineraryDisplay renders with correct markdown
4. **Back Navigation**: Simulate back button click, verify return to list view
5. **Delete Functionality**: Mock `window.confirm()` to return true, verify delete updates state and localStorage
6. **Error Handling**: Mock `service.getHistory()` to throw error, verify ErrorDisplay renders

### Test Fixtures

`src/test/fixtures/historyFixtures.ts` provides:
- Sample markdown itineraries with clear metadata
- Helper function `createHistoryWithNItems(n)` for generating test arrays
- Timestamps in markdown comments for timestamp extraction testing

### Component Wrapper Pattern

Tests wrap HistoryView in ItineraryServiceProvider with mock service:

```typescript
const mockService = {
  getHistory: vi.fn(() => [...testHistory]),
  generateItinerary: vi.fn(),
  saveToHistory: vi.fn(),
};

render(
  <ItineraryServiceProvider implementation={mockService}>
    <HistoryView />
  </ItineraryServiceProvider>
);
```

## Implementation Notes

### Service Method Usage

The delete functionality uses `service.deleteFromHistory(index)` method from IItineraryService. This method is implemented by LocalStorageService and handles all storage operations internally, maintaining encapsulation and separation of concerns.

The component no longer accesses localStorage directly, ensuring all storage operations go through the service layer. This provides better testability, error handling, and flexibility to change storage implementations without modifying the component.

### Storage Key Consistency

The component uses hardcoded storage key 'itinerary-history' which must match LocalStorageService implementation. Ideally this should be a shared constant:

```typescript
// Proposed: src/constants/storage.ts
export const STORAGE_KEYS = {
  ITINERARY_HISTORY: 'itinerary-history',
};
```

### Position Indicators

List items show position indicators ("Most recent", "number2", etc.) based on array index. This provides relative recency without requiring timestamp parsing. If timestamps are available in metadata, they can be displayed as secondary information.

## Related Documentation

- **[Service Interface Contract](../domain-model/service-interface.md)**: Documents IItineraryService methods including getHistory
- **[Markdown Metadata Extraction](./markdown-metadata-extraction.md)**: Technical details of metadata parsing utility
- **[Markdown Rendering Guide](./markdown-rendering.md)**: ItineraryDisplay component documentation
- **[Error Handling Guide](./error-handling-guide.md)**: ErrorDisplay component and error patterns
- **Architecture Guide - Local-First Data**: Principle explaining local storage strategy
