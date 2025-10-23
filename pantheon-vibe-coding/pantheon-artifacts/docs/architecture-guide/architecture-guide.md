---
created_at: 2025-10-14 HH:MM PM PDT
created_by: tech-lead
---

<!-- SECTION:START:PROJECT_CONTEXT -->

## Project Context
last updated: 2025-10-14 HH:MM PM PDT
updated by: tech-lead

### Problem Statement

Planning multi-day trips requires significant manual research across multiple sources, leading to decision fatigue and suboptimal itineraries. Travelers need a streamlined way to generate personalized day-by-day schedules that account for their party composition, destination, trip duration, and seasonal considerations.

### Business Outcomes

- Achieve 70% repeat usage rate among users who generate their first itinerary

- Maintain 80% successful generation rate for form submissions

- Deliver itinerary generation within 30 seconds to ensure user satisfaction

- Enable smooth migration from CLI-based POC to production HTTP API without frontend code changes

### Key Features

- **Intelligent Itinerary Generation**: AI-powered personalized itineraries based on destination, party demographics, travel month, and trip duration with seasonal and weather-appropriate recommendations

- **Simple Input Form**: Four-field form capturing destination, party information, month of travel, and trip duration with maximum 3 clicks to generate

- **Day-by-Day Display**: Structured itinerary view with flexible time periods showing attractions, descriptions, activities, and dining recommendations

- **Local History Management**: Browser-based storage of last 10 generated itineraries for quick reference and regeneration

- **API Abstraction Layer**: Pluggable backend interface supporting both CLI-based POC implementation and future HTTP-based production implementation

<!-- SECTION:END:PROJECT_CONTEXT -->

<!-- SECTION:START:HIGH_LEVEL_OVERVIEW -->

## High Level Overview
last updated: 2025-10-14 HH:MM PM PDT
updated by: tech-lead

### System Function
The Travel Itinerary Generator is a single-page React application that generates personalized day-by-day travel itineraries using AI. Users provide basic trip details through a simple form, and the system generates structured itineraries with time-based activity recommendations, dining suggestions, and seasonal considerations. The application stores recent itineraries locally for quick access and is designed with an abstraction layer that enables seamless migration from CLI-based proof-of-concept to production HTTP API backend.

### Architectural Approach
This application follows a frontend-centric architecture with a pluggable API abstraction layer that decouples the presentation layer from backend implementation details. The POC phase uses a CLIApiClient that directly invokes the Claude CLI tool for itinerary generation, while maintaining the same interface contract as the future HTTPApiClient implementation. This glass box approach provides transparency through explicit interface contracts, enables mechanical reliability through consistent data models, and supports systematic learning by making backend migration a configuration change rather than a code rewrite. Component architecture follows React best practices with clear separation between UI components, state management, and API integration.

### Key Technologies
The application is built with React 18+ for the frontend framework, providing component-based UI architecture and efficient state management through hooks. TypeScript provides type safety across the entire codebase, ensuring robust interface contracts between components and the API abstraction layer. Vite serves as the build tool for fast development iteration and optimized production builds. The POC backend uses the Claude CLI directly for AI-powered itinerary generation, with a clear migration path to REST API endpoints. LocalStorage provides client-side persistence for itinerary history without requiring backend infrastructure during the POC phase.

<!-- SECTION:END:HIGH_LEVEL_OVERVIEW -->

<!-- SECTION:START:CORE_PRINCIPLES -->

## Core Principles
last updated: 2025-10-14 HH:MM PM PDT
updated by: tech-lead

### Backend Abstraction

**Principle**: The frontend must never directly depend on specific backend implementation details

**Rationale**: Enables smooth migration from CLI-based POC to HTTP-based production without frontend code changes

**Examples**:

- All API calls go through IItineraryService interface

- CLIApiClient and HTTPApiClient implement identical interfaces

- Configuration flag switches implementations without code changes

### Single Responsibility Components

**Principle**: Each React component should have one clear purpose and encapsulate its own logic

**Rationale**: Improves maintainability, testability, and enables component reuse across the application

**Examples**:

- ItineraryForm handles only input collection and validation

- ItineraryDisplay focuses solely on rendering generated itineraries

- HistoryList manages history retrieval and display independently

### Type-Safe Data Flow

**Principle**: All data structures must be explicitly typed with TypeScript interfaces

**Rationale**: Prevents runtime errors, improves IDE support, and makes API contracts explicit

**Examples**:

- ItineraryResponse interface defines exact structure of API responses

- Form input types match API request parameters

- Time period data structures explicitly typed with union types for null handling

### Progressive Enhancement

**Principle**: Core functionality must work in all modern browsers without requiring advanced features

**Rationale**: Ensures accessibility and broad compatibility for all users

**Examples**:

- LocalStorage with graceful degradation if unavailable

- Semantic HTML structure that works without JavaScript

- Responsive design using standard CSS features

### Explicit Error Boundaries

**Principle**: All potential failure points must have clear error handling and user feedback

**Rationale**: Provides transparency when issues occur and prevents silent failures that confuse users

**Examples**:

- API call failures display user-friendly error messages

- Loading states show progress during itinerary generation

- Form validation provides immediate feedback on invalid inputs

## Anti-Patterns

### Direct CLI Integration in Components

**What to Avoid**: React components directly calling the Claude CLI or constructing prompts

**Why It's Problematic**: Tightly couples UI to backend implementation, makes testing impossible, prevents backend migration

**Instead, Do This**: Always use the IItineraryService interface, let CLIApiClient handle CLI calls

### Inline Prompt Construction

**What to Avoid**: Building AI prompts scattered across multiple components or inline in API calls

**Why It's Problematic**: Makes prompt optimization difficult, creates inconsistent itinerary quality, prevents centralized testing

**Instead, Do This**: Centralize prompt template in dedicated PromptBuilder or within CLIApiClient with clear structure

### Untyped API Responses

**What to Avoid**: Using 'any' type or skipping TypeScript validation for API responses

**Why It's Problematic**: Runtime errors from unexpected data structures, no IDE support, breaks type safety guarantees

**Instead, Do This**: Define strict TypeScript interfaces for all API request and response structures

### Global State for Component-Specific Data

**What to Avoid**: Storing component-specific UI state in global state management

**Why It's Problematic**: Creates unnecessary complexity, makes components harder to test and reuse, pollutes global namespace

**Instead, Do This**: Use local component state for UI-specific data, reserve global state for truly shared data like current itinerary and history

### Missing Loading States

**What to Avoid**: Not showing visual feedback during asynchronous operations like itinerary generation

**Why It's Problematic**: Users don't know if the application is working, leads to duplicate submissions and poor user experience

**Instead, Do This**: Always implement loading states with clear visual indicators during async operations

### Hardcoded Configuration Values

**What to Avoid**: Embedding backend mode, API endpoints, or feature flags directly in component code

**Why It's Problematic**: Makes environment-specific deployment difficult, prevents runtime configuration, requires code changes for settings

**Instead, Do This**: Use environment variables and configuration files that can be changed without code modifications

<!-- SECTION:END:CORE_PRINCIPLES -->

<!-- SECTION:START:TECHNOLOGY_STACK -->

## Tech Stack
last updated: 2025-10-14 HH:MM PM PDT
updated by: tech-lead

### React

- **Version**: 18.0+

- **Purpose**: Frontend framework providing component-based architecture and efficient rendering

- **License**: MIT

- **Why Chosen Over**: Vue.js and Svelte were considered but React chosen for broader ecosystem and team familiarity

### TypeScript

- **Version**: 5.0+

- **Purpose**: Type-safe JavaScript superset ensuring robust interface contracts and reducing runtime errors

- **License**: Apache 2.0

### Vite

- **Version**: 5.0+

- **Purpose**: Build tool providing fast development server and optimized production builds

- **License**: MIT

- **Why Chosen Over**: Create React App considered but Vite chosen for faster build times and modern tooling

### Node.js

- **Version**: 18.0+

- **Purpose**: JavaScript runtime for development tooling and build processes

- **License**: MIT

### Frameworks and Libraries

#### UI Components

- **React Router** (v6.0+): Client-side routing for history navigation and URL management

#### State Management

- **React Hooks** (vbuilt-in): Built-in state management using useState and useContext for global state

#### Styling

- **CSS Modules** (vbuilt-in): Component-scoped styling with standard CSS syntax

#### Data Validation

- **Zod** (v3.0+): Runtime type validation for API responses and form inputs

#### Testing

- **Vitest** (v1.0+): Unit and integration testing with Vite-native test runner

- **React Testing Library** (v14.0+): Component testing with user-centric approach

### Development Tools

- **ESLint**: Code linting and style enforcement for consistent code quality (Required: Yes)

- **Prettier**: Automatic code formatting to maintain consistent style (Required: Yes)

- **Claude CLI**: AI-powered itinerary generation for POC phase backend (Required: Yes)

- **Git**: Version control for code management (Required: Yes)

<!-- SECTION:END:TECHNOLOGY_STACK -->

<!-- SECTION:START:SYSTEM_COMPONENTS -->


## System Components
last updated: 2025-10-14 HH:MM PM PDT
updated by: tech-lead

### App Container

**Purpose**: Root component that manages global state, routing, and API client initialization

#### Responsibilities

- Initialize appropriate API client based on configuration

- Provide global context for itinerary data and history

- Handle top-level error boundaries

- Manage routing between main view and history view

#### Dependencies

- **API Client Factory**: Creates the appropriate API client implementation based on environment configuration

- **ItineraryForm**: Renders the main input form for itinerary generation

- **ItineraryDisplay**: Displays generated itineraries

- **HistoryList**: Shows previously generated itineraries

#### Data Flows

- **Output**: Provides global context with current itinerary and history to child components

- **Input**: Receives itinerary generation requests from ItineraryForm

- **Bidirectional**: Manages loading and error states during API calls

---

### ItineraryForm

**Purpose**: Collects user input for itinerary generation with validation

#### Responsibilities

- Render input fields for destination, party info, month, and days

- Validate form inputs before submission

- Trigger itinerary generation through API client

- Display loading state during generation

- Show error messages for validation failures

#### Dependencies

- **API Client Interface**: Calls generateItinerary method to create new itineraries

#### Data Flows

- **Input**: Receives user input through form fields

- **Output**: Sends validated itinerary request to API client

- **Input**: Receives generation results or errors from API client

---

### ItineraryDisplay

**Purpose**: Renders generated itineraries with day-by-day structure

#### Responsibilities

- Display itinerary metadata (destination, party, month, days)

- Render day-by-day breakdown with time periods

- Show attractions, descriptions, activities, and dining for each period

- Handle null time periods gracefully

- Provide responsive layout for different screen sizes

#### Dependencies

- None (standalone component)

#### Data Flows

- **Input**: Receives ItineraryResponse object from global context

---

### HistoryList

**Purpose**: Displays and manages previously generated itineraries

#### Responsibilities

- Load itinerary history from LocalStorage service

- Display list of past itineraries with metadata

- Enable selection of historical itineraries to view details

- Show empty state when no history exists

- Provide delete functionality for individual history items

#### Dependencies

- **LocalStorage Service**: Retrieves and manages persisted itinerary history

- **ItineraryDisplay**: Uses same component to show selected historical itinerary

#### Data Flows

- **Input**: Loads itinerary history from LocalStorage

- **Output**: Sends selected itinerary to display component

- **Output**: Sends delete requests to LocalStorage service

---

### API Client Factory

**Purpose**: Creates appropriate API client implementation based on configuration

#### Responsibilities

- Read configuration to determine backend mode (CLI or HTTP)

- Instantiate CLIApiClient for POC mode

- Instantiate HTTPApiClient for production mode

- Ensure returned client implements IItineraryService interface

- Log which implementation is being used

#### Dependencies

- **CLIApiClient**: POC implementation using Claude CLI

- **HTTPApiClient**: Production implementation using REST API

#### Data Flows

- **Input**: Reads configuration from environment variables

- **Output**: Returns initialized API client instance

---

### CLIApiClient

**Purpose**: POC implementation that generates itineraries using Claude CLI

#### Responsibilities

- Construct AI prompts from user inputs

- Execute claude CLI command with proper arguments

- Parse JSON response from CLI output

- Validate response structure against schema

- Handle CLI execution errors and timeouts

- Save successful responses to history

#### Dependencies

- **LocalStorage Service**: Persists generated itineraries to history

- **PromptBuilder**: Constructs structured prompts for AI generation

#### Data Flows

- **Input**: Receives itinerary request parameters

- **Output**: Executes CLI command and captures output

- **Output**: Returns validated ItineraryResponse object

- **Output**: Saves itinerary to LocalStorage history

---

### HTTPApiClient

**Purpose**: Future production implementation using REST API endpoints

#### Responsibilities

- Make HTTP POST requests to backend API

- Handle authentication if required

- Process API responses and errors

- Validate response structure against schema

- Implement retry logic for transient failures

- Save successful responses to history

#### Dependencies

- **LocalStorage Service**: Persists generated itineraries to history

#### Data Flows

- **Input**: Receives itinerary request parameters

- **Output**: Sends HTTP request to backend API

- **Input**: Receives HTTP response from backend

- **Output**: Returns validated ItineraryResponse object

- **Output**: Saves itinerary to LocalStorage history

---

### PromptBuilder

**Purpose**: Constructs structured AI prompts for itinerary generation

#### Responsibilities

- Build prompt from user inputs with proper formatting

- Include JSON schema in prompt for structured output

- Add seasonal context based on month of travel

- Emphasize party-appropriate recommendations

- Ensure prompt clarity for consistent AI responses

#### Dependencies

- None (standalone component)

#### Data Flows

- **Input**: Receives destination, party info, month, and days

- **Output**: Returns formatted prompt string ready for CLI execution

---


<!-- SECTION:END:SYSTEM_COMPONENTS -->

<!-- SECTION:START:SHARED_SERVICES -->


## Shared Services
last updated: 2025-10-14 HH:MM PM PDT
updated by: tech-lead

### LocalStorage Service

**Purpose**: Manages persistent storage of itinerary history in browser LocalStorage

#### Usage Pattern

```typescript

import { LocalStorageService } from './services/LocalStorageService';

const storageService = new LocalStorageService();

// Save an itinerary to history
await storageService.saveToHistory(itineraryResponse);

// Retrieve all history
const history = await storageService.getHistory();

// Delete a specific itinerary
await storageService.deleteFromHistory(itineraryId);

// Clear all history
await storageService.clearHistory();

```

#### Configuration

- **STORAGE_KEY**: LocalStorage key used to store itinerary history (Default: `itinerary_history`)

- **MAX_HISTORY_ITEMS**: Maximum number of itineraries to keep in history (Default: `10`)

#### Best Practices

- Always handle LocalStorage quota exceeded errors gracefully

- Validate data structure when reading from storage to prevent corruption

- Implement automatic cleanup when MAX_HISTORY_ITEMS is reached

- Use try-catch blocks around all storage operations

- Provide fallback behavior if LocalStorage is unavailable or disabled

---

### Validation Service

**Purpose**: Provides runtime validation for API responses and form inputs using Zod schemas

#### Usage Pattern

```typescript

import { ValidationService, ItineraryResponseSchema } from './services/ValidationService';

const validator = new ValidationService();

// Validate API response
const result = validator.validate(apiResponse, ItineraryResponseSchema);
if (result.success) {
  const itinerary = result.data;
} else {
  console.error('Validation errors:', result.errors);
}

// Validate form inputs
const formResult = validator.validateFormInput({
  destination,
  partyInfo,
  month,
  days
});

```

#### Configuration

- **STRICT_MODE**: Whether to enforce strict validation or allow additional fields (Default: `true`)

- **LOG_ERRORS**: Whether to log validation errors to console (Default: `true`)

#### Best Practices

- Always validate external data before using it in the application

- Use discriminated unions for handling nullable time periods

- Provide clear error messages that indicate which field failed validation

- Validate early to catch errors before they propagate through the system

- Use Zod's transform methods to normalize data during validation

---

### Error Handler Service

**Purpose**: Centralizes error handling and user-facing error message formatting

#### Usage Pattern

```typescript

import { ErrorHandlerService, ApiError } from './services/ErrorHandlerService';

const errorHandler = new ErrorHandlerService();

try {
  await apiClient.generateItinerary(params);
} catch (error) {
  const userMessage = errorHandler.handleApiError(error);
  showErrorToUser(userMessage);
  errorHandler.logError(error);
}

```

#### Configuration

- **SHOW_TECHNICAL_DETAILS**: Whether to show technical error details to users (Default: `false`)

- **ERROR_LOGGING_ENABLED**: Whether to log errors to console or external service (Default: `true`)

#### Best Practices

- Never expose technical error details to end users

- Provide actionable error messages when possible

- Distinguish between user errors and system errors

- Log errors with sufficient context for debugging

- Implement different error handling strategies for different error types

---


<!-- SECTION:END:SHARED_SERVICES -->

<!-- SECTION:START:IMPLEMENTATION_PATTERNS -->


## Implementation Patterns
last updated: 2025-10-14 HH:MM PM PDT
updated by: tech-lead

### API Abstraction with Factory Pattern

**Category**: Architectural

**Problem**: Need to switch between different backend implementations (CLI-based POC and HTTP-based production) without changing frontend code

**Solution**: Use a factory to create the appropriate API client implementation based on configuration, with both implementations conforming to a common interface

#### Implementation

```typescript

// Define common interface
interface IItineraryService {
  generateItinerary(params: ItineraryRequest): Promise<ItineraryResponse>;
  getHistory(): Promise<ItineraryResponse[]>;
  saveToHistory(itinerary: ItineraryResponse): Promise<void>;
}

// Factory creates appropriate implementation
class ApiClientFactory {
  static create(): IItineraryService {
    const mode = import.meta.env.VITE_BACKEND_MODE;
    
    if (mode === 'cli') {
      return new CLIApiClient();
    } else if (mode === 'http') {
      return new HTTPApiClient();
    }
    
    throw new Error(`Unknown backend mode: ${mode}`);
  }
}

// Usage in App component
const App = () => {
  const [apiClient] = useState(() => ApiClientFactory.create());
  
  return (
    <ApiContext.Provider value={apiClient}>
      <ItineraryForm />
    </ApiContext.Provider>
  );
};

```

#### When to Use

- When you need to support multiple backend implementations with the same interface

- When migrating from one implementation to another without frontend changes

- When different environments require different backend strategies

#### When NOT to Use

- When there is only one backend implementation with no plans for alternatives

- When the different implementations have fundamentally different interfaces

- When the switching logic is more complex than simple configuration

---

### Context-Based State Management

**Category**: Behavioral

**Problem**: Need to share itinerary data and loading states across multiple components without prop drilling

**Solution**: Use React Context to provide global state for current itinerary, history, and loading states

#### Implementation

```typescript

// Define context types
interface ItineraryContextType {
  currentItinerary: ItineraryResponse | null;
  history: ItineraryResponse[];
  isLoading: boolean;
  error: string | null;
  generateItinerary: (params: ItineraryRequest) => Promise<void>;
}

// Create context
const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

// Provider component
export const ItineraryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentItinerary, setCurrentItinerary] = useState<ItineraryResponse | null>(null);
  const [history, setHistory] = useState<ItineraryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiClient = useApiClient();

  const generateItinerary = async (params: ItineraryRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiClient.generateItinerary(params);
      setCurrentItinerary(result);
      setHistory(await apiClient.getHistory());
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ItineraryContext.Provider value={{
      currentItinerary,
      history,
      isLoading,
      error,
      generateItinerary
    }}>
      {children}
    </ItineraryContext.Provider>
  );
};

// Custom hook for consuming context
export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (!context) {
    throw new Error('useItinerary must be used within ItineraryProvider');
  }
  return context;
};

```

#### When to Use

- When multiple components need access to the same state

- When passing props through many layers becomes unwieldy

- When you need global application state without external state management libraries

#### When NOT to Use

- For state that only one or two closely related components need

- When performance is critical and context updates cause unnecessary re-renders

- When state changes very frequently and needs fine-grained optimization

---

### Schema-Based Validation

**Category**: Structural

**Problem**: Need to validate API responses and form inputs at runtime to catch data structure mismatches

**Solution**: Use Zod schemas to define data structures and validate them at runtime with type inference

#### Implementation

```typescript

import { z } from 'zod';

// Define time period schema
const TimePeriodActivitySchema = z.object({
  attraction: z.string(),
  attraction_description: z.string(),
  what_to_do: z.array(z.string()).min(1),
  where_to_eat: z.string()
});

const TimePeriodSchema = z.array(TimePeriodActivitySchema).nullable();

// Define day schema
const DaySchema = z.object({
  day: z.number(),
  morning: TimePeriodSchema,
  afternoon: TimePeriodSchema,
  evening: TimePeriodSchema,
  night: TimePeriodSchema.optional(),
  late_night: TimePeriodSchema.optional()
});

// Define complete response schema
export const ItineraryResponseSchema = z.object({
  destination: z.string(),
  party_info: z.string(),
  month: z.string(),
  days: z.number(),
  itinerary: z.array(DaySchema)
});

// Infer TypeScript types from schema
export type ItineraryResponse = z.infer<typeof ItineraryResponseSchema>;

// Validate API response
const validateResponse = (data: unknown): ItineraryResponse => {
  try {
    return ItineraryResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid itinerary data: ${error.errors.map(e => e.message).join(', ')}`);
    }
    throw error;
  }
};

```

#### When to Use

- When validating external data from API responses

- When you need runtime type checking in addition to TypeScript compile-time checks

- When you want to infer TypeScript types from validation schemas

#### When NOT to Use

- For internal data structures that are always created correctly

- When performance is critical and validation overhead is too costly

- For simple data structures where type assertions are sufficient

---

### Error Boundary Pattern

**Category**: Behavioral

**Problem**: Need to gracefully handle component errors and prevent the entire application from crashing

**Solution**: Use React Error Boundaries to catch errors in component tree and display fallback UI

#### Implementation

```typescript

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error reporting service if available
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-container">
          <h2>Something went wrong</h2>
          <p>We're sorry, but something unexpected happened. Please refresh the page and try again.</p>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage in App
const App = () => (
  <ErrorBoundary>
    <ItineraryProvider>
      <ItineraryForm />
      <ItineraryDisplay />
    </ItineraryProvider>
  </ErrorBoundary>
);

```

#### When to Use

- At the application root to catch any unexpected errors

- Around major feature areas that might fail independently

- When you need to provide fallback UI for component errors

#### When NOT to Use

- For handling expected errors like validation failures

- Around every single component (too granular)

- For asynchronous errors in event handlers (use try-catch instead)

---

### Custom Hook Composition

**Category**: Structural

**Problem**: Need to encapsulate complex stateful logic and make it reusable across components

**Solution**: Create custom React hooks that compose built-in hooks and encapsulate specific logic

#### Implementation

```typescript

// Custom hook for form state management
const useItineraryForm = () => {
  const [destination, setDestination] = useState('');
  const [partyInfo, setPartyInfo] = useState('');
  const [month, setMonth] = useState('');
  const [days, setDays] = useState(5);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!destination.trim()) {
      newErrors.destination = 'Destination is required';
    }
    if (!partyInfo.trim()) {
      newErrors.partyInfo = 'Party information is required';
    }
    if (!month) {
      newErrors.month = 'Month of travel is required';
    }
    if (days < 1 || days > 30) {
      newErrors.days = 'Trip duration must be between 1 and 30 days';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setDestination('');
    setPartyInfo('');
    setMonth('');
    setDays(5);
    setErrors({});
  };

  return {
    values: { destination, partyInfo, month, days },
    setters: { setDestination, setPartyInfo, setMonth, setDays },
    errors,
    validate,
    reset
  };
};

// Usage in component
const ItineraryForm = () => {
  const { values, setters, errors, validate, reset } = useItineraryForm();
  const { generateItinerary, isLoading } = useItinerary();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      await generateItinerary(values);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={values.destination} 
        onChange={e => setters.setDestination(e.target.value)}
      />
      {errors.destination && <span>{errors.destination}</span>}
      {/* ... */}
    </form>
  );
};

```

#### When to Use

- When multiple components need the same stateful logic

- When you want to separate business logic from presentation

- When a component's logic is complex and deserves its own testing

#### When NOT to Use

- For simple one-off state that is only used in one component

- When the logic is tightly coupled to a specific component's rendering

- When the abstraction makes the code harder to understand

---

### LocalStorage Service Pattern

**Category**: Architectural

**Problem**: Need reliable persistent storage with error handling, size limits, and graceful degradation

**Solution**: Create a service class that wraps LocalStorage with proper error handling, validation, and size management

#### Implementation

```typescript

class LocalStorageService {
  private readonly storageKey = 'itinerary_history';
  private readonly maxItems = 10;

  async getHistory(): Promise<ItineraryResponse[]> {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return [];
      
      const parsed = JSON.parse(data);
      // Validate structure
      if (!Array.isArray(parsed)) return [];
      
      return parsed.filter(item => this.isValidItinerary(item));
    } catch (error) {
      console.error('Failed to load history:', error);
      return [];
    }
  }

  async saveToHistory(itinerary: ItineraryResponse): Promise<void> {
    try {
      const history = await this.getHistory();
      
      // Add new item to front
      const updated = [itinerary, ...history];
      
      // Enforce size limit
      const trimmed = updated.slice(0, this.maxItems);
      
      localStorage.setItem(this.storageKey, JSON.stringify(trimmed));
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        // Clear old items and retry
        await this.clearOldest();
        await this.saveToHistory(itinerary);
      } else {
        console.error('Failed to save to history:', error);
        throw error;
      }
    }
  }

  async deleteFromHistory(index: number): Promise<void> {
    const history = await this.getHistory();
    history.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(history));
  }

  async clearHistory(): Promise<void> {
    localStorage.removeItem(this.storageKey);
  }

  private async clearOldest(): Promise<void> {
    const history = await this.getHistory();
    const reduced = history.slice(0, Math.floor(this.maxItems / 2));
    localStorage.setItem(this.storageKey, JSON.stringify(reduced));
  }

  private isValidItinerary(item: any): boolean {
    return (
      item &&
      typeof item.destination === 'string' &&
      typeof item.party_info === 'string' &&
      Array.isArray(item.itinerary)
    );
  }
}

```

#### When to Use

- When you need persistent client-side storage

- When you want to encapsulate storage logic with error handling

- When you need to manage storage quotas and size limits

#### When NOT to Use

- When you need server-side persistence

- When data must be synchronized across devices

- When storage requirements exceed LocalStorage limits (typically 5-10MB)

---


<!-- SECTION:END:IMPLEMENTATION_PATTERNS -->

<!-- SECTION:START:TESTING_STRATEGY -->

<!-- SECTION:PLACEHOLDER -->

<!-- SECTION:END:TESTING_STRATEGY -->

<!-- SECTION:START:DOCUMENTATION_STANDARDS -->

# Documentation Standards
last updated: 2025-10-14 HH:MM PM PDT
updated by: tech-lead

## 1. Philosophy and Purpose

This document outlines the standards for creating, organizing, and managing all documentation assets, including text and diagrams.

### The Challenge: Engineering Context for AI Agents

AI agents, particularly in a Retrieval-Augmented Execution (RAE) system, do not "read" or "browse" documentation like humans. They perform targeted retrieval operations to acquire specific knowledge needed for a task. When documentation is unstructured-existing as large, monolithic files or a disorganized collection of documents-it becomes a significant obstacle to building reliable agentic workflows.

### Our Goal: A Retrieval-Friendly Knowledge Base

To solve this, our goal is to create a **retrieval-friendly knowledge base**. By enforcing a structured format, we transform our documentation from a simple collection of human-readable text into a queryable, API-like system for knowledge. This enables precise, reliable retrieval, which is the foundation for effective Context Engineering and, ultimately, for building dependable AI agents.

## 2. Core Principles

- **Topic-Oriented:** Content is organized around specific, orthogonal concepts (e.g., "Database," "API Client").
- **Co-location:** All assets for a single topic-both text and diagrams-must be located in the same directory.
- **Single Source of Truth (SSoT):** Every concept must have one, and only one, canonical document or diagram.
- **Discoverability First:** The structure must be optimized for search and navigation via metadata and a master index.

## 3. Content Philosophy: What to Document

Our guiding principle is: **document the *why*, not the *what*.** The code shows the action; the docs must explain the reasoning.

- **Document Decisions:** Explain architectural choices and trade-offs. For major decisions, create an **Design Decision Doc** using `pantheon get process create-design-decision --actor <your_agent_name>`
- **Document the Non-Obvious:** Focus on complex algorithms, counter-intuitive logic, or critical side-effects.
- **Document Contracts and Boundaries:** Clearly define the public API of a component-its inputs, outputs, and guarantees.
- **Avoid Paraphrasing Code:** Never write documentation that simply translates a line of code into English.

### Example: High-Signal vs. Low-Signal Documentation

**Anti-Pattern (Low-Signal):**
```python
# This function gets the user by their ID.
def get_user(user_id):
  return db.get(user_id)
```

**Good Pattern (High-Signal):**
```python
# Retrieves a user object, intentionally omitting the 'permissions' field
# to prevent a circular dependency with the auth service.
# Permissions must be fetched separately via `auth_service.get_permissions(user_id)`.
def get_user(user_id):
  return db.get(user_id, exclude_fields=['permissions'])
```

## 4. Unified Directory Structure

All documentation assets must be co-located within topic-specific directories under the  main <docs> folder. Use `pantheon get team-data --key path.docs --actor <your_agent_name>` to get the main <docs> folder.

```
<docs>/
├── README.md
├── _includes/
│   └── plantuml-style.puml
└── database/
    ├── overview.md
    ├── schema-diagram.puml
    └── connection-sequence.puml
```

### 4.1. Defining Orthogonal Topics

To prevent fragmentation, topics must be as orthogonal (non-overlapping) as possible.

- **Litmus Test:** Before creating a new topic directory, ask: "Can this concept be fully explained without extensively detailing another topic?"
- **Handling Overlap:** For naturally related concepts (e.g., "authentication" and "authorization"), place the more specific concept as an article within the broader topic directory. If "authorization" becomes sufficiently complex, it can be nested: `<docs>/authentication/authorization/`.
- **Evolution:** The documentation `owner` is responsible for refactoring topics (splitting or merging) as the system evolves to maintain orthogonality.
- **Nesting:** One level of subdirectory nesting is permitted for grouping within a complex topic. Deeper nesting is discouraged.

## 5. The Master Index (`<docs>/README.md`)

The `<docs>/README.md` file is the single entry point for the entire knowledge base. It must index all assets.

- **Format:** Each list item must be `* **[Asset Title](./relative/path/to/file):** One-sentence relevance description.`
- **Automation:** This file should be automatically generated from asset metadata to ensure it is never out of sync.

**Example:**
```markdown
# Documentation Index

## Database Module

*   **[Database Overview](./database/overview.md):** The canonical explanation of the database module's role and schema.
*   **[Connection Sequence](./database/connection-sequence.puml):** A sequence diagram showing how a service connects to the database.
```

## 6. Asset-Specific Standards

Every file must contain structured metadata to make it discoverable.

### 6.1. Metadata Schema

| Field           | Type         | Required | Description                                                 |
|-----------------|--------------|----------|-------------------------------------------------------------|
| `doc_id`        | `string`     | Yes      | Globally unique, immutable ID (e.g., `database-overview`).  |
| `title`         | `string`     | Yes      | The formal, human-readable title.                           |
| `description`   | `string`     | Yes      | A concise, one-sentence summary of the asset's purpose.     |
| `keywords`      | `string[]`   | Yes      | A list of relevant search tags.                             |
| `relevance`     | `string`     | Yes      | Natural language explanation of when this asset is useful.  |

### 6.2. Text Articles (`.md` files)

Markdown articles must begin with a YAML frontmatter block containing the metadata.

```markdown
---
doc_id: database-overview
title: "Database Overview"
description: "The canonical explanation of the database module's role and schema."
keywords: [database, schema, storage, postgres]
relevance: "Use this document to understand the database module's schema, tables, and core responsibilities."
---

# Database Overview
...
```

### 6.3. Diagrams (`.puml` files)

PlantUML files must begin with `@startuml`, follwed by a structured metadata block using block comments.

```plantuml
@startuml
/'
@id: database-connection-sequence
@title: Database Connection Sequence
@description: A sequence diagram showing how a service connects to the database.
@keywords: [diagram, sequence, database, connection, pooling]
@relevance: "Use this diagram to visualize the handshake and connection pooling sequence for the primary database."
'/
' Import shared styles for consistency
!include ../_includes/plantuml-style.puml

title Database Connection Sequence
...
@enduml
```

#### 6.3.1. Choosing the Right Diagram

Use the following matrix to select the appropriate diagram type. Multiple diagrams for a single topic are encouraged if multiple perspectives are needed.

| If you want to show...                          | Then use a...                |
|-------------------------------------------------|------------------------------|
| How components fit together at a high level     | **System/Container Diagram** |
| The step-by-step flow of a request or process   | **Sequence Diagram**         |
| The internal parts of a single service/module   | **Component Diagram**        |

#### 6.3.2 Syntax
Diagram must follow jebbs Compatibility Rules

**For Sequence Diagrams:**
- Use block `note over X[,Y] ... end note`, or inline notes with `\n` for newlines
- Attach notes to participants (e.g., `note right of CLI : ...`)
- Do not use `note as <name>` or floating notes

**For Component Diagrams:**
- Interfaces do NOT support brace syntax - declare them without opening/closing braces
- Use `note right of InterfaceName`, `note left of InterfaceName`, etc. for interface documentation
- Only components support the brace syntax for defining internal structure

**For Class Diagrams:**
- Use `note right of ClassName`, `note left of ClassName`, `note top of ClassName`, or `note bottom of ClassName`
- Do NOT use `note on link` syntax (not supported by PlantUML renderers)
- Explain relationship cardinality in the legend or class notes instead

## 7. Cross-Referencing

- **Method:** Always use relative paths (e.g., `../database/overview.md`) for links between documents. This ensures portability.

## 8. Search and Retrieval Patterns

To make content retrieval-friendly, write metadata with search in mind.

- **Keywords:** Use a mix of general and specific terms. Include the asset type, the primary component, and the core concepts (e.g., `[diagram, sequence, database, connection]`).
- **Relevance:** Write this as a direct answer to the question, "When should I use this?" Example: "Use this diagram to visualize the handshake and connection pooling sequence for the primary database."
- **Example Queries:** An agent can combine metadata for precise retrieval:
  - `search(keywords: "sequence" AND "database")` -> Finds all sequence diagrams for the database.
  - `search(status: "deprecated" AND owner: "data-team")` -> Finds all outdated docs owned by the data team.

<!-- SECTION:END:DOCUMENTATION_STANDARDS -->
