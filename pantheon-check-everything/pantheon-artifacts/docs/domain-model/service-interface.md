---
doc_id: domain-model-service-interface
keywords: [interface, service, abstraction, contract, dependency-injection, markdown]
relevance: Service interface contract for itinerary operations using markdown responses
created: 2025-10-15
updated: 2025-10-17
---

# IItineraryService Interface Contract

## Overview

The `IItineraryService` interface defines the contract for all backend implementations of itinerary operations. This interface enables the service abstraction pattern, allowing the application to seamlessly swap between different backend implementations (HTTP-based for production) without any component code changes.

**Important Architectural Change**: The service now returns **markdown strings** instead of structured JSON Itinerary objects. This shift simplifies the response pipeline, eliminates JSON schema validation complexity, and allows Claude to generate naturally-formatted text responses that are easier to read and render.

By depending only on the interface contract rather than concrete implementations, components achieve true decoupling from backend specifics. The interface supports a backend server architecture where the server spawns Claude CLI processes using `child_process.spawn` with immediate `stdin.end()` call, returning markdown-formatted itinerary content.

The interface is defined in `src/services/IItineraryService.ts` and should be injected into components via React Context using dependency injection patterns.

## Service Abstraction Pattern

### Why Service Abstraction?

**Problem**: Frontend components need itinerary data, but the backend implementation may change or need to be tested in isolation.

**Solution**: Define a stable interface contract (`IItineraryService`) that abstracts implementation details. Components depend on the interface, while a factory or context provider selects the appropriate implementation at runtime.

**Migration Context**: The application has migrated from browser-based CLI execution to a backend server architecture. The service interface now returns markdown strings instead of JSON objects, reflecting this fundamental architectural shift. All CLI execution now happens server-side using `spawn` with immediate `stdin.end()`.

**Benefits**:
- **Backend Server Integration**: HTTPApiClient communicates with backend server that handles Claude CLI execution
- **Testability**: Inject MockItineraryService in tests without network calls or backend dependencies
- **Flexibility**: Switch implementations via configuration flags or environment variables
- **Type Safety**: TypeScript enforces that all implementations satisfy the interface contract (return markdown strings)
- **Clear Contracts**: Interface documents method obligations, parameter types, and error handling expectations

### Architecture Integration

The service abstraction pattern fits into the overall architecture as follows:

```
[Components] → [React Context] → [IItineraryService Interface]
                                         ↑
                                         |
                        +----------------+----------------+
                        |                                 |
                 [HTTPApiClient]                   [MockService]
                        |                                 |
                 [Backend Server]                   [Test Data]
                        |
                 [spawn Claude CLI]
                 [stdin.end()]
                 [return markdown]
```

**Key Change**: CLIApiClient has been removed. All CLI execution now happens server-side in the backend. HTTPApiClient makes HTTP requests to the backend server which spawns Claude CLI processes.

Components never import concrete implementations directly. Instead, they consume the service through a React Context:

```typescript
const service = useItineraryService(); // Returns IItineraryService (markdown-based)
const markdownItinerary = await service.generateItinerary(...); // Returns Promise<string>
```

The context provider determines which implementation to inject based on configuration:

```typescript
<ItineraryServiceProvider implementation={httpClient}>
  <App />
</ItineraryServiceProvider>
```

## Interface Definition

**Updated Interface (Markdown-Based)**:

```typescript
export interface IItineraryService {
  generateItinerary(
    destination: string,
    partyInfo: string,
    month: string,
    days: number
  ): Promise<string>;

  getHistory(): string[];

  saveToHistory(itinerary: string): void;
}
```

**Key Changes from Previous Version**:
- `generateItinerary` returns `Promise<string>` (markdown) instead of `Promise<Itinerary>` (JSON object)
- `getHistory` returns `string[]` (markdown strings) instead of `Itinerary[]` (JSON objects)
- `saveToHistory` accepts `string` parameter (markdown) instead of `Itinerary` object
- No JSON schema validation required - responses are plain text markdown
- No type imports needed - interface uses primitive string types

## Method Documentation

### generateItinerary

Generates a new itinerary from user inputs by invoking the backend server, which spawns Claude CLI to produce a markdown-formatted itinerary.

**Signature:**
```typescript
generateItinerary(
  destination: string,
  partyInfo: string,
  month: string,
  days: number
): Promise<string>
```

**Parameters:**
- `destination` (string): Destination city or location for the trip
- `partyInfo` (string): Information about the traveling party (e.g., "couple", "family with 2 kids", "solo traveler")
- `month` (string): Month of travel (e.g., "March", "July")
- `days` (number): Number of days for the trip (positive integer)

**Returns:**
- `Promise<string>`: Resolves to a markdown-formatted itinerary string with headings, lists, and structured content

**Behavior Contract:**

**Implementations MUST**:
1. Return markdown string directly without JSON parsing or validation
2. Handle backend server errors gracefully (network failures, timeout, server errors)
3. Throw descriptive errors on HTTP failures or malformed responses
4. Support reasonable timeouts (e.g., 60 seconds for Claude CLI execution on backend)
5. Return raw markdown text from backend response

**Implementations SHOULD**:
1. Log detailed error information for debugging
2. Retry transient failures (network errors, 5xx server errors) with exponential backoff
3. Extract markdown content from HTTP response body (e.g., response.markdown field)
4. Handle empty or whitespace-only responses as errors
5. Include request parameters in error messages for debugging

**Error Handling:**

Implementations should throw typed errors that distinguish between:
- Network failures (can retry) - fetch errors, connection refused
- Server errors (can retry) - HTTP 5xx responses
- Client errors (cannot retry) - HTTP 4xx responses (validation failures)
- Timeout errors (can retry with longer timeout)
- Empty response errors (backend returned no content)

**Example Implementation (HTTP):**
```typescript
async generateItinerary(destination: string, partyInfo: string, month: string, days: number): Promise<string> {
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
    const response = await fetch(`${backendUrl}/api/itinerary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ destination, partyInfo, month, days }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const markdown = data.markdown;

    if (!markdown || typeof markdown !== 'string') {
      throw new Error('Backend response missing markdown content');
    }

    return markdown;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to reach backend server');
    }
    throw error;
  }
}
```

### getHistory

Retrieves stored itinerary history from local storage as markdown strings. This method is the primary data source for the HistoryView component, which displays a list of previously generated itineraries with metadata extracted from the markdown content.

**Signature:**
```typescript
getHistory(): string[]
```

**Parameters:**
- None

**Returns:**
- `string[]`: Array of previously generated itineraries as markdown strings, ordered with most recent first

**Behavior Contract:**

**Implementations MUST**:
1. Return empty array `[]` if no history exists
2. Return most recent itinerary first (reverse chronological order)
3. Enforce maximum history size of 10 items
4. Return synchronously (no Promise) since reading from localStorage
5. Handle localStorage errors gracefully (return empty array on error)

**Implementations SHOULD**:
1. Parse stored JSON array of markdown strings
2. Filter out corrupted entries (non-string items, empty strings)
3. Log errors when storage is corrupted or inaccessible
4. Use a consistent storage key (e.g., 'itinerary-history')

**Storage Format:**

History should be stored as a JSON array of markdown strings in localStorage:

```typescript
// localStorage.getItem('itinerary-history')
[
  "# Tokyo Itinerary - 5 Days\n\n<!-- Generated: 2025-10-18 -->\n\nDay 1...", // Most recent
  "# Paris Itinerary - 3 Days\n\n<!-- Generated: 2025-10-17 -->\n\nDay 1...",
  ...
] // Maximum 10 markdown strings
```

**Usage by HistoryView Component:**

The HistoryView component consumes the history array to display a list of itinerary summaries. For each markdown string in the array:
1. Extract metadata (destination, days, month, timestamp) using the markdownParser utility
2. Render a list item with the extracted metadata
3. Provide selection mechanism to view full itinerary details
4. Support delete operations to remove entries from history

The most-recent-first ordering ensures the list displays the latest generated itineraries at the top, providing the best user experience for accessing recent trips.

**Example Implementation:**
```typescript
getHistory(): string[] {
  try {
    const stored = localStorage.getItem('itinerary-history');
    if (!stored) {
      return [];
    }

    const history = JSON.parse(stored);

    // Validate each item is a string
    return history
      .filter(item => typeof item === 'string' && item.trim().length > 0)
      .slice(0, 10); // Enforce 10-item limit
  } catch (error) {
    console.error('Failed to retrieve history:', error);
    return [];
  }
}
```

**Typical Usage Pattern:**
```typescript
function HistoryView() {
  const service = useItineraryService();
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    try {
      const historyData = service.getHistory();
      setHistory(historyData);
    } catch (error) {
      console.error('Error loading history:', error);
    }
  }, [service]);

  return (
    <ul>
      {history.map((markdown, index) => {
        const metadata = extractItineraryMetadata(markdown);
        return (
          <li key={index}>
            {metadata.destination} - {metadata.days} days
          </li>
        );
      })}
    </ul>
  );
}
```

### saveToHistory

Persists a markdown itinerary to storage for future retrieval. Saved itineraries become available in the HistoryView component, allowing users to access previously generated trip plans without regenerating them.

**Signature:**
```typescript
saveToHistory(itinerary: string): void
```

**Parameters:**
- `itinerary` (string): The complete markdown itinerary string to save

**Returns:**
- `void`: Fire-and-forget persistence (errors logged but not thrown)

**Behavior Contract:**

**Implementations MUST**:
1. Add new markdown itinerary to the front of history (most recent first)
2. Enforce 10-item maximum by removing oldest items
3. Store markdown strings as JSON array in localStorage
4. Handle storage quota errors gracefully (log, don't throw)
5. Not throw exceptions (fire-and-forget persistence)

**Implementations SHOULD**:
1. Log errors when storage fails (quota exceeded, disabled, etc.)
2. Validate itinerary is non-empty string before saving
3. Use atomic write operations where possible
4. Trim whitespace from markdown strings before storage

**History Management:**

The 10-item limit ensures localStorage usage remains bounded. When a new itinerary is saved:
1. It is added to the beginning of the array (index 0)
2. If the array length exceeds 10, the oldest item (index 10) is removed
3. The updated array is serialized to JSON and written to localStorage

This automatic truncation means users always see their 10 most recent itineraries in HistoryView, with older entries automatically discarded to prevent storage bloat.

**Error Handling:**

Unlike `generateItinerary`, this method should not throw exceptions. Storage failures should be logged but should not interrupt the user's workflow. The itinerary has already been generated and displayed; failing to save it to history is a non-critical error.

**Example Implementation:**
```typescript
saveToHistory(itinerary: string): void {
  try {
    if (!itinerary || typeof itinerary !== 'string' || itinerary.trim().length === 0) {
      console.warn('Cannot save empty or invalid itinerary to history');
      return;
    }

    const stored = localStorage.getItem('itinerary_history');
    const history: string[] = stored ? JSON.parse(stored) : [];

    // Add to front, enforce 10-item limit
    const updated = [itinerary, ...history].slice(0, 10);

    localStorage.setItem('itinerary_history', JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save itinerary to history:', error);
    // Don't throw - this is fire-and-forget persistence
  }
}
```

## Implementation Guidance

### HTTPApiClient Implementation (Primary)

The `HTTPApiClient` implementation communicates with the backend server that spawns Claude CLI processes and returns markdown responses.

**Key Responsibilities**:
1. Make HTTP POST requests to backend server with proper headers
2. Extract markdown content from JSON response body
3. Handle HTTP error codes (4xx, 5xx) appropriately
4. Implement retry logic with exponential backoff for transient failures
5. Use VITE_BACKEND_URL environment variable for backend URL configuration

**Example Structure**:
```typescript
export class HTTPApiClient implements IItineraryService {
  private readonly localStorageService: LocalStorageService;

  constructor(localStorageService: LocalStorageService) {
    this.localStorageService = localStorageService;
  }

  async generateItinerary(destination: string, partyInfo: string, month: string, days: number): Promise<string> {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
    const response = await fetch(`${backendUrl}/api/itinerary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ destination, partyInfo, month, days }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.markdown; // Extract markdown string from response
  }

  getHistory(): string[] {
    return this.localStorageService.getHistory();
  }

  saveToHistory(itinerary: string): void {
    this.localStorageService.saveItinerary(itinerary);
  }
}
```

### MockItineraryService Implementation

The `MockItineraryService` implementation returns hardcoded markdown test data for unit testing.

**Key Responsibilities**:
1. Return deterministic markdown test data
2. Support simulating errors for error handling tests
3. Enable fast tests without I/O
4. Provide configurable responses for different test scenarios

**Example Structure**:
```typescript
export class MockItineraryService implements IItineraryService {
  private mockData: string[] = [];
  private shouldFail = false;

  async generateItinerary(destination: string, partyInfo: string, month: string, days: number): Promise<string> {
    if (this.shouldFail) {
      throw new Error('Mock error');
    }

    return `# ${destination} Itinerary\n\n## Day 1\n\n### Morning\n- Activity 1\n- Activity 2`;
  }

  getHistory(): string[] {
    return this.mockData;
  }

  saveToHistory(itinerary: string): void {
    this.mockData.unshift(itinerary);
  }

  // Test helpers
  setShouldFail(shouldFail: boolean) {
    this.shouldFail = shouldFail;
  }
}
```

## Usage Patterns

### Component Integration via Context

Components should never import concrete implementations directly. Instead, consume the service through React Context:

```typescript
// ItineraryContext.tsx
const ItineraryContext = createContext<IItineraryService | null>(null);

export function useItineraryService(): IItineraryService {
  const service = useContext(ItineraryContext);
  if (!service) {
    throw new Error('useItineraryService must be used within ItineraryServiceProvider');
  }
  return service;
}

export function ItineraryServiceProvider({
  children,
  implementation
}: {
  children: ReactNode;
  implementation: IItineraryService
}) {
  return (
    <ItineraryContext.Provider value={implementation}>
      {children}
    </ItineraryContext.Provider>
  );
}
```

### Component Usage

```typescript
function ItineraryForm() {
  const service = useItineraryService();
  const [itinerary, setItinerary] = useState<string | null>(null); // Now stores markdown string
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (destination: string, partyInfo: string, month: string, days: number) => {
    setLoading(true);
    setError(null);

    try {
      const markdownResult = await service.generateItinerary(destination, partyInfo, month, days);
      setItinerary(markdownResult); // markdown string
      service.saveToHistory(markdownResult);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ... render form
}
```

### Factory Configuration

Use a factory function to create the HTTP implementation:

```typescript
// serviceFactory.ts
import { HTTPApiClient } from './services/HTTPApiClient';
import { LocalStorageService } from './services/LocalStorageService';

export function createItineraryService(): IItineraryService {
  const localStorage Service = new LocalStorageService();
  return new HTTPApiClient(localStorageService);
}

// App.tsx
const service = createItineraryService();

root.render(
  <ItineraryServiceProvider implementation={service}>
    <App />
  </ItineraryServiceProvider>
);
```

## Relationship to Architecture Patterns

### Dependency Injection

The service abstraction pattern implements dependency injection at the component level. Components declare dependencies on `IItineraryService` through the context hook, and the provider injects the appropriate implementation.

**Benefits**:
- Loose coupling between components and implementations
- Easy testing by injecting mock implementations
- Runtime configuration of backend behavior
- Clear separation of concerns

### Strategy Pattern

The interface enables the strategy pattern where different implementations (CLI, HTTP, Mock) provide the same functionality through different strategies. The client code (components) remains unchanged while the strategy (implementation) varies.

### Repository Pattern

While not a traditional repository (no database), `IItineraryService` follows repository-like patterns:
- Abstract data access behind an interface
- Encapsulate persistence logic (saveToHistory, getHistory)
- Provide a clean API for data operations

## Migration Rationale: JSON to Markdown

The interface migrated from returning structured JSON (`Promise<Itinerary>`) to returning plain markdown strings (`Promise<string>`) for several key reasons:

### Why Markdown Instead of JSON?

1. **Simplified Response Pipeline**: No JSON schema validation, parsing, or type assertion required. Backend returns markdown, frontend renders markdown. The pipeline is transparent and straightforward.

2. **Claude CLI Natural Output**: Claude generates higher-quality, more natural itineraries when asked to produce markdown instead of conforming to rigid JSON schemas. Markdown allows Claude to express nuance, formatting, and structure more naturally.

3. **Easier Debugging**: Markdown responses are human-readable in their raw form. Developers can inspect network responses, localStorage, and console logs without JSON parsing tools.

4. **Reduced Coupling**: No shared type definitions between frontend and backend. The backend doesn't need to know about TypeScript `Itinerary` types. The contract is simple: "return markdown text."

5. **Flexibility for Future Changes**: Markdown format can evolve organically without breaking schema contracts. Claude can add new sections, change heading structures, or include additional information without frontend code changes.

6. **React-Markdown Integration**: Modern React markdown renderers (`react-markdown`) provide excellent rendering, accessibility, and styling out of the box. We leverage existing, well-tested libraries instead of building custom component hierarchies.

### Trade-offs Accepted

- **Loss of Type Safety at Runtime**: Frontend doesn't validate markdown structure. Malformed markdown renders gracefully but may look incorrect.
- **No Structured Querying**: Can't easily extract specific fields (e.g., "show only morning activities"). Markdown is unstructured text.
- **Search/Filter Limitations**: Searching history requires full-text search rather than querying structured fields.

These trade-offs are acceptable because the primary use case is displaying complete itineraries to users, not performing complex data operations.

## Contract Obligations Summary

All implementations of `IItineraryService` MUST:

1. **Implement all three methods** with exact signatures (markdown-based)
2. **Return markdown strings** without JSON parsing or schema validation
3. **Handle errors gracefully** without crashing the application
4. **Maintain consistent behavior** across implementations
5. **Enforce 10-item history limit** in storage operations
6. **Return most recent first** in getHistory
7. **Return non-empty strings** (validate markdown is not empty)
8. **Support reasonable timeouts** for async operations (60s for Claude CLI)
9. **Log errors** for debugging and monitoring
10. **Provide fire-and-forget persistence** (saveToHistory doesn't throw)

## Related Documentation

- **Architecture Guide - System Components**: Shows how IItineraryService fits into overall architecture
- **Architecture Guide - Implementation Patterns**: Provides code examples for service abstraction
- **Type Definitions Documentation**: Documents the Itinerary and related types
- **Component Overview Diagram**: Visual representation of service abstraction pattern
