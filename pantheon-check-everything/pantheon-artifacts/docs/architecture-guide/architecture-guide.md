---
created_at: 2025-10-14 HH:MM PM PDT
created_by: tech-lead
---

<!-- SECTION:START:PROJECT_CONTEXT -->

## Project Context
last updated: 2025-10-14 HH:MM PM PDT
updated by: tech-lead

### Problem Statement

Planning multi-day trips requires significant research across multiple sources, leading to decision fatigue and suboptimal itineraries. Travelers need a tool that generates personalized, day-by-day structured itineraries based on destination, party composition, travel month, and trip duration.

### Business Outcomes

- Achieve 70% repeat usage rate indicating high user satisfaction and value

- Maintain 80% successful generation completion rate ensuring reliable service

- Deliver itineraries within 30 seconds providing fast user experience

- Enable seamless migration from POC to production through abstraction layer

### Key Features

- **Itinerary Generation Form**: Four-input form capturing destination, party information, month of travel, and trip duration with validation

- **AI-Powered Generation**: Claude CLI integration generating structured JSON itineraries with seasonal awareness and party-appropriate activities

- **Day-by-Day Display**: Structured itinerary display with flexible time periods showing attractions, descriptions, activities, and dining recommendations

- **Local History Storage**: Browser-based storage of last 10 generated itineraries for quick reference and repeat access

- **Responsive Interface**: Single-page application with loading states, error handling, and mobile-friendly design

<!-- SECTION:END:PROJECT_CONTEXT -->

<!-- SECTION:START:HIGH_LEVEL_OVERVIEW -->

## High Level Overview
last updated: 2025-10-14 HH:MM PM PDT
updated by: tech-lead

### System Function
The Travel Itinerary Generator is a frontend-only web application that helps travelers create personalized multi-day trip plans through AI-powered generation. Users input basic trip details through a simple form, and the system generates structured day-by-day itineraries with time-period-specific activities, attractions, and dining recommendations. The application uses an abstraction layer pattern enabling seamless switching between CLI-based POC implementation and future HTTP-based production deployment. All itineraries are stored locally in the browser for easy access to previously generated plans.

### Architectural Approach
This system follows a frontend-only architecture with a service abstraction pattern to enable smooth POC-to-production migration. The core design uses React for UI components with TypeScript for type safety, local storage for persistence, and a pluggable API client interface. The IItineraryService interface defines a contract implemented by CLIApiClient for POC and HTTPApiClient for future production, allowing the entire frontend codebase to remain unchanged during backend migration. This approach prioritizes rapid POC validation while maintaining a clear path to scalable deployment without frontend rewrites.

### Key Technologies
React with TypeScript provides type-safe component development and excellent developer experience. Local storage enables history persistence without backend infrastructure during POC. The service abstraction pattern using IItineraryService interface allows pluggable backend implementations - CLIApiClient executes Claude CLI commands directly for POC, while HTTPApiClient will call REST endpoints for production. This technology stack minimizes initial complexity while maintaining flexibility for production scaling.

<!-- SECTION:END:HIGH_LEVEL_OVERVIEW -->

<!-- SECTION:START:CORE_PRINCIPLES -->

## Core Principles
last updated: 2025-10-14 HH:MM PM PDT
updated by: tech-lead

### Service Abstraction

**Principle**: All backend communication must go through the IItineraryService interface, never directly calling implementation details

**Rationale**: Enables seamless backend migration from CLI to HTTP without changing frontend components, reducing coupling and improving testability

**Examples**:

- Components import IItineraryService, not CLIApiClient directly

- Configuration flag switches implementation without code changes

- Test mocks implement IItineraryService for isolated component testing

### Schema-Driven Validation

**Principle**: All AI responses must conform to documented JSON schema with strict validation before rendering

**Rationale**: Prevents runtime errors from malformed AI responses and ensures consistent UI rendering regardless of generation variations

**Examples**:

- Validate response structure before storing to history

- Display meaningful errors when schema validation fails

- Document schema in architecture guide for cross-team alignment

### Progressive Enhancement

**Principle**: Build core functionality first with minimal styling, then layer polish and advanced features incrementally

**Rationale**: Delivers working POC quickly while maintaining quality and enables early user feedback to guide subsequent refinements

**Examples**:

- Implement form and display before history feature

- Add loading states after basic generation works

- Polish responsive design after desktop functionality complete

### Local-First Data

**Principle**: All user data must be stored in browser local storage with no server-side persistence in POC

**Rationale**: Eliminates backend infrastructure requirements during POC phase while enabling full feature validation and user testing

**Examples**:

- Store last 10 itineraries in localStorage JSON array

- No user accounts or authentication required

- History retrieval is instant from local storage

## Anti-Patterns

### Direct CLI Execution in Components

**What to Avoid**: Components directly calling child_process or exec to run Claude CLI commands

**Why It's Problematic**: Couples frontend to CLI implementation, makes testing impossible, prevents backend migration, violates abstraction principle

**Instead, Do This**: Always use IItineraryService interface injected via dependency or context, allowing implementation swapping

### Unvalidated AI Responses

**What to Avoid**: Rendering AI-generated JSON directly without schema validation

**Why It's Problematic**: Causes runtime errors from malformed responses, creates unpredictable UI behavior, makes debugging difficult

**Instead, Do This**: Validate all responses against JSON schema before usage, display meaningful errors on validation failure

### Premature Backend Development

**What to Avoid**: Building HTTP backend server before POC validation complete

**Why It's Problematic**: Wastes development time on infrastructure before product validation, increases complexity, delays user feedback

**Instead, Do This**: Use CLIApiClient for POC, validate user value first, then migrate to HTTPApiClient when scaling needed

### Stateful API Client

**What to Avoid**: Storing application state or caching responses inside API client implementations

**Why It's Problematic**: Violates single responsibility, makes testing harder, creates hidden state that components cannot control

**Instead, Do This**: Keep API clients stateless, manage application state in components or state management layer

<!-- SECTION:END:CORE_PRINCIPLES -->

<!-- SECTION:START:TECHNOLOGY_STACK -->

## Tech Stack
last updated: 2025-10-14 HH:MM PM PDT
updated by: tech-lead

### React

- **Version**: ^18.0

- **Purpose**: Component-based UI framework for building interactive frontend

- **License**: MIT

- **Why Chosen Over**: Vue and Angular - React chosen for ecosystem maturity, TypeScript integration, and team familiarity

### TypeScript

- **Version**: ^5.0

- **Purpose**: Type-safe JavaScript for better IDE support and reduced runtime errors

- **License**: Apache-2.0

- **Why Chosen Over**: Plain JavaScript - TypeScript chosen for interface definitions and compile-time safety

### Node.js

- **Version**: ^18.0

- **Purpose**: Runtime for development tooling and CLI execution in POC

- **License**: MIT

### Frameworks and Libraries

#### UI Development

- **React** (v^18.0): Core UI framework for components and hooks

- **React DOM** (v^18.0): React rendering for web browsers

#### Type Safety

- **TypeScript** (v^5.0): Static type checking and interface definitions

- **@types/react** (v^18.0): Type definitions for React

- **@types/node** (v^18.0): Type definitions for Node.js APIs

#### Build Tools

- **Vite** (v^5.0): Fast development server and production bundler

- **@vitejs/plugin-react** (v^4.0): React Fast Refresh and JSX transformation for Vite

#### Validation

- **Zod** (v^3.22): Runtime schema validation for AI responses

#### Testing

- **Vitest** (v^1.0): Unit testing framework compatible with Vite

- **@testing-library/react** (v^14.0): React component testing utilities

- **@testing-library/jest-dom** (v^6.0): Custom matchers for DOM assertions

#### Code Quality

- **ESLint** (v^8.0): JavaScript/TypeScript linting

- **Prettier** (v^3.0): Code formatting

### Development Tools

- **Visual Studio Code**: Recommended IDE with TypeScript and React extensions (Required: Optional)

- **Claude CLI**: Required for POC backend - executes AI generation commands (Required: Yes)

- **npm or pnpm**: Package management and dependency installation (Required: Yes)

- **Git**: Version control for source code (Required: Yes)

- **Chrome DevTools**: Browser debugging and local storage inspection (Required: Optional)

<!-- SECTION:END:TECHNOLOGY_STACK -->

<!-- SECTION:START:SYSTEM_COMPONENTS -->


## System Components
last updated: 2025-10-14 HH:MM PM PDT
updated by: tech-lead

### App Component

**Purpose**: Root orchestration container managing the complete itinerary generation lifecycle from form submission through service calls, validation, history persistence, and state transitions

**Implementation**: src/App.tsx

#### Responsibilities

- Initialize application and configure service implementations via factory pattern

- Orchestrate itinerary generation flow through handleGenerate callback for state management only

- Manage application state including current itinerary, error messages, and loading states

- Provide IItineraryService instance to child components via context

- Enforce validation strategy where service layer validates before returning data

- Implement graceful degradation for storage failures that don't block core functionality

- Coordinate loading states between form component and display areas

- Handle error categorization and display user-friendly error messages

#### State Machine Pattern

The App component implements an explicit state machine with four states and five transitions:

**States:**
- **idle**: No generation in progress, no error (may have itinerary from previous generation)
- **loading**: Generation in progress (isLoading=true, error=null)
- **success**: Generation completed successfully (isLoading=false, error=null, currentItinerary set)
- **error**: Generation failed (isLoading=false, error set, currentItinerary unchanged from previous state)

**State Transitions:**
1. idle to loading: User submits form, handleGenerate starts
2. loading to success: Service call succeeds (generation and automatic history save by service layer), state updated
3. loading to error: Service call fails, validation fails, or other error occurs
4. success to loading: User submits form again for new generation
5. error to loading: User retries after error

**State Guards:**
- Error state cleared at beginning of handleGenerate for clean retry experience
- Previous itinerary maintained on error to preserve last-known-good state
- Loading state cleanup guaranteed in finally block for both success and error paths

#### Error Handling Strategy

**Error Categorization:**
- **ValidationError**: Indicates malformed API response, displays message suggesting retry
- **ServiceError**: Indicates backend communication failure, displays error with original message
- **StorageError**: Special case for graceful degradation - generation succeeded but history save failed
- **Generic Error**: Fallback for unknown error types with safe default message

**Graceful Degradation for Storage Failures:**
When service.generateItinerary throws StorageError (from HTTPApiClient's automatic save operation), the component handles it gracefully. However, since the error occurs during generation before markdown is returned, no itinerary can be displayed. The StorageError handling logic remains in App.handleGenerate to support future service layer implementations that might return markdown even when history save fails, enabling graceful degradation where users can view itineraries despite persistence failures.

#### Validation Enforcement

**Validation Strategy:**
All validation happens at the service layer boundary (CLIApiClient, HTTPApiClient):
- Service implementations call ValidationService.validateItinerary before returning data
- Orchestration layer (App component) only receives pre-validated itinerary objects
- Validation failures throw ValidationError which is caught and handled as error state
- This separation ensures components trust service layer contracts and prevents unvalidated data from reaching UI

The handleGenerate callback receives already-generated markdown from the form component. The service layer (HTTPApiClient.generateItinerary) handles both generation and automatic history persistence, returning pre-validated markdown. App.handleGenerate focuses solely on state management and UI updates.

#### Implementation Details

**State Management:**
- currentItinerary: useState<string | null>(null) - stores last successfully generated markdown itinerary
- error: useState<string | null>(null) - stores user-friendly error messages from orchestration-level failures
- isLoading: useState<boolean>(false) - tracks async generation in progress for UI feedback
- service: useState(() => createItineraryService()) - singleton service instance created once on mount using initializer function

**handleGenerate Callback:**
```typescript
const handleGenerate = async (markdown: string) => {
  setIsLoading(true);
  try {
    setError(null);  // State Guard: Clear error for clean retry
    // Note: markdown is already generated and saved to history by service layer
    // service.generateItinerary (called by form) handles both generation and automatic history persistence
    setCurrentItinerary(markdown);  // State Transition: loading -> success
  } catch (err) {
    // Error categorization with graceful degradation for StorageError
    if (err instanceof Error && err.name === 'StorageError') {
      // Graceful Degradation: Show itinerary despite storage failure
      // Note: With current architecture, StorageError comes from service layer during generation
      setCurrentItinerary(markdown);
      setError('Your itinerary was generated successfully, but history save failed...');
      return;  // Don't re-throw - allow graceful degradation
    }
    // Handle other errors: ValidationError, ServiceError, generic Error
    setError(userFriendlyMessage);  // State Transition: loading -> error
    throw err;  // Re-throw for form component to handle
  } finally {
    setIsLoading(false);  // State Cleanup: Ensure loading state cleared
  }
};
```

**Loading State Coordination:**
- App-level loading state drives loading indicator between form and content
- Form component manages its own loading state for button disable/text changes
- Both states coordinate through the async flow without tight coupling
- Loading indicator uses role='status' and aria-live='polite' for accessibility

**Error Display:**
- Conditional rendering based on error state with role='alert' for screen reader support
- Positioned between form and itinerary display for contextual visibility
- Inline styles for MVP (red color, margin spacing) pending styling architecture decision

#### Dependencies

- **ItineraryService Factory**: Instantiates appropriate API client based on configuration with all dependencies injected

- **ValidationError**: Imported to detect validation failures from service layer

- **ServiceError**: Imported to detect backend communication failures

- **StorageError**: Imported to implement graceful degradation for persistence failures

- **Itinerary Type**: TypeScript type for state management and callback parameters

#### Data Flows

- **Output**: Provides IItineraryService instance via ItineraryServiceProvider context to all child components

- **Input**: Receives validated Itinerary from ItineraryForm component via onGenerate callback

- **Processing**: Persists itinerary to history via service.saveToHistory, handles errors with categorization

- **Output**: Updates currentItinerary state for display, manages error and loading states for UI feedback

---

### ItineraryForm Component

**Purpose**: User input form capturing trip details with client-side validation and loading state management

**Implementation**: src/components/ItineraryForm.tsx

#### Responsibilities

- Render form inputs for destination, party info, month, and duration with proper labels and accessibility attributes

- Validate user inputs on blur and before submission using pure validation functions

- Handle form submission and call IItineraryService.generateItinerary via context

- Display loading state during generation with disabled submit button

- Handle and display generation errors with user-friendly messages

- Invoke onGenerate callback with generated itinerary for parent handling

#### Dependencies

- **IItineraryService**: Calls generateItinerary method via useItineraryService hook

- **Itinerary Type**: TypeScript type for service response and callback parameter

#### Implementation Details

**Validation Approach**:
- Pure validation functions (validateDestination, validatePartyInfo, validateMonth, validateDays) defined outside component
- Each function takes string value and returns error message string or null
- Validation rules: destination min 2 chars, partyInfo min 2 chars, month required, days 1-30 range
- ValidationErrors interface with optional fields for each form input
- onBlur handlers trigger field-specific validation for immediate feedback
- onSubmit handler validates all fields before proceeding with service call

**State Management**:
- Individual useState hooks for each form field (destination, partyInfo, month, days as strings)
- useState for isLoading boolean to manage async operation state
- useState for error string | null to display service call failures
- useState<ValidationErrors> for field-specific validation error messages
- setFieldError helper function manages validation errors immutably

**Callback Pattern**:
- onGenerate prop receives (itinerary: Itinerary) => Promise<void>
- Form component calls onGenerate after successful service.generateItinerary
- Enables parent to handle result display and history saving without coupling

**Loading State Behavior**:
- Submit button disabled and shows 'Generating...' text during isLoading
- Error state cleared at beginning of handleSubmit for clean retry experience
- isLoading managed in finally block ensures state cleanup on both success and error

**Integration Method**:
- useItineraryService hook retrieves service from context
- Form does not import service implementations directly
- Days field parsed from string to number before service call using parseInt

#### Data Flows

- **Input**: Receives IItineraryService from App context via useItineraryService hook

- **Input**: Receives onGenerate callback prop from parent for result handling

- **Processing**: Validates form data with pure validation functions

- **Output**: Calls service.generateItinerary with validated destination, partyInfo, month, days (number)

- **Output**: Invokes onGenerate callback with generated Itinerary object

---

### ItineraryDisplay Component

**Purpose**: Orchestrator component that renders the complete itinerary structure with trip metadata and delegates day-by-day rendering to child components

**Implementation**: src/components/ItineraryDisplay.tsx

#### Responsibilities

- Display itinerary metadata header (destination as h1, party info, month, days)

- Map over itinerary.itinerary array and render DayView components for each day

- Use semantic HTML with header element for metadata section

- Maintain pure presentational pattern with no business logic or service dependencies

- Provide top-level container structure for the entire itinerary display

#### Component Composition

The ItineraryDisplay feature is implemented as three composed components:

**ActivityItem Component**
- **Implementation**: src/components/ActivityItem.tsx
- **Purpose**: Atomic component rendering individual activity details
- **Responsibilities**: Display attraction name as h4, description paragraph, what_to_do list items, where_to_eat dining recommendation with semantic HTML
- **Props Interface**:
  ```typescript
  interface ActivityItemProps {
    activity: Activity;
  }
  ```

**DayView Component**
- **Implementation**: src/components/DayView.tsx
- **Purpose**: Day-level orchestrator rendering a single day's activities by time period
- **Responsibilities**: Display day number as h2, conditionally render time period sections (morning, afternoon, evening, night, late_night) only when activities exist, map over activity arrays and delegate rendering to ActivityItem
- **Props Interface**:
  ```typescript
  interface DayViewProps {
    day: Day;
  }
  ```

**ItineraryDisplay Component**
- **Implementation**: src/components/ItineraryDisplay.tsx
- **Purpose**: Top-level orchestrator rendering complete itinerary
- **Responsibilities**: Display metadata header, map over days and render DayView components
- **Props Interface**:
  ```typescript
  interface ItineraryDisplayProps {
    itinerary: Itinerary;
  }
  ```

#### Implementation Details

**Semantic HTML Structure**:
- Uses proper heading hierarchy: h1 for destination, h2 for day numbers, h3 for time periods, h4 for attraction names
- Employs semantic elements: header for metadata, article for days, section for time periods, ul/li for activity lists
- Maintains accessibility with proper document structure and screen reader navigation

**Conditional Rendering Logic**:
- DayView component checks each time period (morning, afternoon, evening, night, late_night) for null values before rendering
- Only non-null time periods with activity arrays are displayed
- Empty itinerary arrays are handled gracefully without errors

**Component Composition Pattern**:
- ItineraryDisplay delegates to DayView using day.day as unique React key
- DayView delegates to ActivityItem using array index as key (stable within time periods)
- Each component focuses on single responsibility with clear prop interfaces
- No component has state or side effects - purely presentational

**Pure Presentational Nature**:
- All components receive data exclusively through props
- No service dependencies or data fetching
- No business logic or validation - assumes validated Itinerary data from parent
- No error handling internally - parent App component manages error states

#### Integration Pattern

**App Component Integration**:
- App.tsx creates itinerary via service.generateItinerary in ItineraryForm callback
- App stores validated itinerary in currentItinerary state
- App renders ItineraryDisplay with conditional: {currentItinerary && <ItineraryDisplay itinerary={currentItinerary} />}
- This pattern separates orchestration (App) from presentation (ItineraryDisplay)

#### Dependencies

- **Activity Type**: TypeScript interface from types/itinerary defining activity structure
- **Day Type**: TypeScript interface from types/itinerary defining day structure with time periods
- **Itinerary Type**: TypeScript interface from types/itinerary defining complete itinerary structure

#### Data Flows

- **Input**: Receives validated Itinerary object from parent App component via props
- **Processing**: Maps over itinerary.itinerary array, delegates to DayView for each day
- **Output**: Renders semantic HTML displaying complete itinerary structure
- **State**: No state mutations - pure rendering based on props

---

### HistoryView Component

**Purpose**: Displays list of previously generated itineraries

#### Responsibilities

- Fetch history from IItineraryService.getHistory on mount

- Render list of historical itineraries with summary information

- Allow user to select historical itinerary for detailed view

- Provide delete functionality for individual history items

- Display empty state when no history exists

#### Dependencies

- **IItineraryService**: Calls getHistory to retrieve stored itineraries

- **ItineraryDisplay Component**: Reuses display component for selected historical itinerary

#### Data Flows

- **Input**: Receives IItineraryService from App context

- **Output**: Emits selected itinerary to ItineraryDisplay

---

### IItineraryService Interface

**Purpose**: Abstraction layer defining backend communication contract

#### Responsibilities

- Define generateItinerary method signature

- Define getHistory method signature

- Define saveToHistory method signature

- Ensure type safety for all backend interactions

#### Dependencies

- None (standalone component)

#### Data Flows

- **Bidirectional**: Interface contract between frontend components and backend implementations

---

### CLIApiClient

**Purpose**: POC implementation executing Claude CLI commands for generation

**Implementation**: src/services/CLIApiClient.ts

#### Responsibilities

- Implement IItineraryService interface

- Execute child_process.exec calls to Claude CLI with AI prompt template

- Parse CLI stdout as JSON and validate against schema using ValidationService

- Handle CLI execution errors, timeouts (60 seconds), JSON parsing errors

- Categorize and wrap errors as ServiceError with detailed debugging context

- Delegate history operations to LocalStorageService

- Log all operations for POC debugging transparency

#### Dependencies

- **LocalStorageService**: Stores and retrieves itineraries from browser storage

- **ValidationService**: Validates CLI responses against JSON schema

- **Node.js child_process**: Uses util.promisify(exec) for async CLI command execution

#### Implementation Details

**CLI Execution**:
- Uses child_process.exec with 60-second timeout via util.promisify wrapper
- Executes command: `claude -p "<prompt>"` where prompt is AI instruction template
- Captures stdout for JSON response and stderr for error diagnostics
- Timeout errors throw with code ETIMEDOUT for specific handling

**Error Types**:
- **CLIError**: Command execution failures (exit code non-zero, command not found, timeout)
- **ServiceError**: Wrapper for all errors with user-friendly messages and debugging context
  - Properties: message (user-facing), originalError (preserves stack), context (debugging metadata), timestamp
  - Context types: cli_execution_failed, json_parse_failed, validation_failed, timeout, unknown_error

**Prompt Engineering**:
- Multi-section prompt template with role, task, output format, constraints, and examples
- Explicitly instructs Claude to return ONLY valid JSON matching provided schema
- Includes full JSON schema specification in prompt to guide structure
- Documents constraints: time periods optional when not relevant, seasonal awareness required

**Logging Strategy**:
- All logs prefixed with [CLIApiClient] for easy filtering
- Logs at: method entry with parameters, prompt built with length, CLI execution start, CLI completion with duration, validation start/success, history save
- Includes timing information (milliseconds) for performance debugging
- Error logs include error type, message, and relevant context

#### Data Flows

- **Output**: Executes system commands to Claude CLI via child_process.exec

- **Input**: Receives JSON response from CLI stdout (stderr captured for errors)

- **Processing**: Validates response with ValidationService before returning

- **Output**: Saves validated itineraries to LocalStorageService automatically after generation

---

### HTTPApiClient

**Purpose**: Future production implementation calling REST API endpoints

#### Responsibilities

- Implement IItineraryService interface

- Make HTTP POST requests to backend API

- Handle network errors and retry logic

- Parse API responses and validate against schema

- Delegate history operations to LocalStorageService or backend API

#### Dependencies

- **LocalStorageService**: May store history locally or delegate to backend

- **ValidationService**: Validates API responses against JSON schema

#### Data Flows

- **Output**: Sends HTTP requests to backend API

- **Input**: Receives JSON responses from API

---

### LocalStorageService

**Purpose**: Manages browser local storage for itinerary history

**Implementation**: src/services/LocalStorageService.ts

#### Responsibilities

- Store itineraries in browser localStorage with JSON serialization

- Retrieve history list from localStorage with deserialization

- Maintain maximum of 10 most recent itineraries (configurable)

- Handle storage quota exceeded errors with automatic cleanup and retry

- Provide clearHistory operation for testing and user-initiated clearing

- Handle corrupted localStorage data gracefully with fallback to empty array

#### Dependencies

- None (standalone component, directly uses browser localStorage API)

#### Implementation Details

**Configuration**:
- **storageKey**: LocalStorage key for history data (default: 'itinerary-history')
- **maxItems**: Maximum number of itineraries to store (default: 10)
- Both parameters are readonly and set via constructor for immutability

**History Management**:
- New itineraries are added to front of array (most recent first) using unshift
- When history exceeds maxItems, array is truncated to maxItems length
- Oldest items are removed from end of array automatically

**Quota Exceeded Handling**:
- Detects QuotaExceededError during saveItinerary operation
- Automatically removes oldest 3 items and retries save operation once
- If retry fails, throws StorageError with original error context
- This strategy prevents silent failures while maximizing storage capacity

**Error Handling**:
- **StorageError**: Custom error class extending Error for storage-specific failures
  - Properties: message, originalError, name (set to 'StorageError')
  - Captures stack trace for debugging
- JSON.parse failures during getHistory are caught, logged, and return empty array
- Corrupted data triggers automatic storage clearing to recover

**Data Validation**:
- getHistory validates that parsed data is an array before returning
- Non-array data treated as corrupted and triggers storage clearing
- Missing key returns empty array (not null or undefined)

#### Data Flows

- **Output**: Writes JSON-serialized itinerary arrays to browser localStorage API via setItem

- **Input**: Reads JSON strings from localStorage via getItem and deserializes to Itinerary[]

- **Cleanup**: Removes data via removeItem for clearHistory operations

---

### ValidationService

**Purpose**: Validates AI responses against JSON schema

#### Responsibilities

- Define Zod schema matching PRD specification

- Validate itinerary objects before usage

- Return detailed validation errors for debugging

- Ensure type safety at runtime

#### Dependencies

- None (standalone component)

#### Data Flows

- **Input**: Receives raw itinerary objects for validation

- **Output**: Returns validated objects or validation errors

---

### ItineraryService Factory

**Purpose**: Instantiates appropriate API client based on configuration using centralized configuration module and dependency injection pattern

**Implementation**: src/services/index.ts (createItineraryService function) with configuration from src/config/serviceConfig.ts

#### Responsibilities

- Read configuration from getServiceConfig() function (not directly from environment variables)

- Instantiate shared dependencies (LocalStorageService, ValidationService) once per factory call

- Select and instantiate CLIApiClient or HTTPApiClient based on config.apiMode

- Return IItineraryService interface type (not concrete implementation types) for proper abstraction

- Log selected implementation to console for debugging transparency

- Provide single point of configuration for backend switching without component code changes

#### Dependencies

- **getServiceConfig**: Reads VITE_API_MODE from environment and returns typed AppConfig

- **CLIApiClient**: Creates instance for POC mode with injected dependencies

- **HTTPApiClient**: Creates instance for production mode with injected dependencies (currently stub)

- **LocalStorageService**: Instantiated with config.storageKey and config.maxItems, injected into both API clients

- **ValidationService**: Instantiated with no parameters, injected into both API clients

#### Implementation Details

**Configuration Reading**:
- Calls getServiceConfig() from src/config/serviceConfig.ts to get typed configuration
- Configuration module validates VITE_API_MODE and defaults to 'CLI' if invalid or not set
- Enables testability by mocking getServiceConfig instead of environment variables

**Dependency Instantiation**:
- Creates LocalStorageService with config.storageKey ('itinerary-history') and config.maxItems (10)
- Creates ValidationService with no constructor parameters
- Dependencies are instantiated once per factory call, not shared globally

**Implementation Selection**:
- Branches on config.apiMode to select CLIApiClient (CLI mode) or HTTPApiClient (HTTP mode)
- Console logs which implementation was selected for debugging
- Returns IItineraryService interface type, hiding concrete implementation from consumers

**Code Reference**:
```typescript
export function createItineraryService(): IItineraryService {
  const config = getServiceConfig();
  const storage = new LocalStorageService(config.storageKey, config.maxItems);
  const validator = new ValidationService();

  if (config.apiMode === 'CLI') {
    console.log('Creating CLIApiClient for POC mode');
    return new CLIApiClient(storage, validator);
  } else {
    console.log('Creating HTTPApiClient for production mode');
    return new HTTPApiClient(storage, validator);
  }
}
```

#### Data Flows

- **Input**: Reads configuration from getServiceConfig() which accesses import.meta.env.VITE_API_MODE

- **Processing**: Creates LocalStorageService and ValidationService instances as shared dependencies

- **Output**: Provides configured IItineraryService instance to App component via useState initializer

---


<!-- SECTION:END:SYSTEM_COMPONENTS -->

<!-- SECTION:START:SHARED_SERVICES -->


## Shared Services
last updated: 2025-10-14 HH:MM PM PDT
updated by: tech-lead

### IItineraryService

**Purpose**: Backend abstraction service for itinerary operations

#### Usage Pattern

```typescript

interface IItineraryService {
  generateItinerary(
    destination: string,
    partyInfo: string,
    month: string,
    days: number
  ): Promise<Itinerary>;
  
  getHistory(): Itinerary[];
  
  saveToHistory(itinerary: Itinerary): void;
}

// Usage in component
const service = useItineraryService();
const itinerary = await service.generateItinerary(
  'Tokyo',
  'Late 20s couple',
  'March',
  5
);

```

#### Configuration

- **API_MODE**: Determines which implementation to use: 'CLI' or 'HTTP' (Default: `CLI`)

#### Best Practices

- Always inject IItineraryService via context, never import implementations directly

- Handle async errors with try-catch and display meaningful messages

- Validate responses using ValidationService before rendering

- Test components with mock IItineraryService implementations

---

### LocalStorageService

**Purpose**: Manages browser local storage for persistent data with automatic size management and error recovery

**Implementation**: src/services/LocalStorageService.ts

#### Usage Pattern

```typescript

// Instantiate with configuration
const storage = new LocalStorageService('itinerary-history', 10);

// Save new itinerary (automatically enforces 10-item limit)
try {
  storage.saveItinerary(newItinerary);
} catch (error) {
  if (error instanceof StorageError) {
    console.error('Failed to save:', error.originalError);
    // Display user-friendly error message
  }
}

// Retrieve history (always returns array, never throws)
const history: Itinerary[] = storage.getHistory();

// Clear all history
storage.clearHistory();

```

#### Implementation Details

```typescript

export class StorageError extends Error {
  constructor(
    message: string,
    public readonly originalError: unknown
  ) {
    super(message);
    this.name = 'StorageError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, StorageError);
    }
  }
}

class LocalStorageService {
  constructor(
    private readonly storageKey: string,
    private readonly maxItems: number
  ) {}

  saveItinerary(itinerary: Itinerary): void {
    try {
      const history = this.getHistory();
      history.unshift(itinerary); // Most recent first

      // Enforce maximum size
      if (history.length > this.maxItems) {
        history.length = this.maxItems;
      }

      localStorage.setItem(this.storageKey, JSON.stringify(history));
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        // Automatic recovery: remove 3 oldest items and retry
        const history = this.getHistory();
        if (history.length > 3) {
          history.length = history.length - 3;
          localStorage.setItem(this.storageKey, JSON.stringify(history));
          // Retry save
          this.saveItinerary(itinerary);
        } else {
          throw new StorageError('Storage quota exceeded and cannot recover', error);
        }
      } else {
        throw new StorageError('Failed to save itinerary to storage', error);
      }
    }
  }

  getHistory(): Itinerary[] {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return [];

      const parsed = JSON.parse(data);
      // Validate parsed data is array
      if (!Array.isArray(parsed)) {
        console.warn('LocalStorage data corrupted, clearing');
        localStorage.removeItem(this.storageKey);
        return [];
      }
      return parsed;
    } catch (error) {
      console.error('Failed to parse history, clearing storage', error);
      localStorage.removeItem(this.storageKey);
      return [];
    }
  }

  clearHistory(): void {
    localStorage.removeItem(this.storageKey);
  }
}

```

#### Configuration

- **storageKey**: LocalStorage key for history data (Default: `'itinerary-history'`)

- **maxItems**: Maximum number of itineraries to store (Default: `10`)

- Both parameters set via constructor for dependency injection and testability

#### Best Practices

- getHistory never throws - always returns valid array for safe iteration

- QuotaExceededError automatically triggers cleanup and retry once

- Corrupted JSON data is automatically cleared and logged for debugging

- Use try-catch around saveItinerary to handle StorageError gracefully

- Check error instanceof StorageError to access originalError for debugging

- Configuration via constructor enables testing with different storage keys

#### Automatic Error Recovery

The service implements automatic recovery from common localStorage failures:

1. **Quota Exceeded**: Removes 3 oldest items and retries save once
2. **Corrupted Data**: Clears storage and returns empty array
3. **Missing Data**: Returns empty array (not null/undefined)
4. **Parse Errors**: Logs error, clears storage, returns empty array

This fail-safe design ensures the application continues working even when localStorage fails, preventing user-facing errors from storage issues.

---

### ValidationService

**Purpose**: Runtime validation of AI responses using Zod schemas

**Implementation**: src/services/ValidationService.ts

#### Usage Pattern

```typescript

import { z } from 'zod';
import type { Activity, TimePeriod, Day, Itinerary } from '../types/itinerary';

// Schema definitions with TypeScript type annotations
const ActivitySchema: z.ZodType<Activity> = z.object({
  attraction: z.string(),
  attraction_description: z.string(),
  what_to_do: z.array(z.string()).min(1), // Non-empty array constraint
  where_to_eat: z.string()
});

const TimePeriodSchema: z.ZodType<TimePeriod> = z.array(ActivitySchema).nullable();

const DaySchema: z.ZodType<Day> = z.object({
  day: z.number(),
  morning: TimePeriodSchema,
  afternoon: TimePeriodSchema,
  evening: TimePeriodSchema,
  night: TimePeriodSchema.optional(),
  late_night: TimePeriodSchema.optional()
});

const ItinerarySchema: z.ZodType<Itinerary> = z.object({
  destination: z.string(),
  party_info: z.string(),
  month: z.string(),
  days: z.number(),
  itinerary: z.array(DaySchema)
});

// Custom ValidationError class
export class ValidationError extends Error {
  public readonly errors: z.ZodIssue[];

  constructor(message: string, errors: z.ZodIssue[]) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}

// ValidationService implementation
export class ValidationService {
  validateItinerary(data: unknown): Itinerary {
    try {
      return ItinerarySchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldPaths = error.issues.map(err => err.path.join('.')).join(', ');
        const message = `Itinerary validation failed: ${fieldPaths}`;
        throw new ValidationError(message, error.issues);
      }
      throw error;
    }
  }
}

// Usage example
const validator = new ValidationService();
try {
  const itinerary = validator.validateItinerary(unknownData);
  // itinerary is now typed as Itinerary and safe to use
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation failed:', error.errors);
  }
}

```

#### Configuration

No configuration required. ValidationService is stateless and instantiated with no dependencies.

#### Best Practices

- Always validate external data at system boundaries before usage in components

- ValidationError preserves detailed Zod error information - use error.errors for debugging

- Error messages include field paths for quick identification of validation failures

- All schemas are strongly typed with z.ZodType<T> annotations ensuring compile-time and runtime type safety

- Keep schema definitions in sync with PRD specification and TypeScript type definitions

---


<!-- SECTION:END:SHARED_SERVICES -->

<!-- SECTION:START:IMPLEMENTATION_PATTERNS -->


## Implementation Patterns
last updated: 2025-10-14 HH:MM PM PDT
updated by: tech-lead

### Service Abstraction with Interface

**Category**: Architectural

**Problem**: Frontend code needs to call backend APIs but implementation might change from CLI to HTTP without wanting to rewrite components

**Solution**: Define a TypeScript interface contract and inject implementations via context, enabling runtime swapping without component changes

#### Implementation

```typescript

// Define the contract
interface IItineraryService {
  generateItinerary(destination: string, partyInfo: string, month: string, days: number): Promise<Itinerary>;
  getHistory(): Itinerary[];
  saveToHistory(itinerary: Itinerary): void;
}

// POC Implementation
class CLIApiClient implements IItineraryService {
  async generateItinerary(destination: string, partyInfo: string, month: string, days: number): Promise<Itinerary> {
    const result = await exec(`claude -p "${buildPrompt(destination, partyInfo, month, days)}"`);
    return this.validator.validateItinerary(JSON.parse(result.stdout));
  }
}

// Production Implementation
class HTTPApiClient implements IItineraryService {
  async generateItinerary(destination: string, partyInfo: string, month: string, days: number): Promise<Itinerary> {
    const response = await fetch('/api/itinerary', {
      method: 'POST',
      body: JSON.stringify({ destination, partyInfo, month, days })
    });
    return this.validator.validateItinerary(await response.json());
  }
}

// Context injection
const ItineraryServiceContext = createContext<IItineraryService>(null);

export const useItineraryService = () => {
  const service = useContext(ItineraryServiceContext);
  if (!service) throw new Error('IItineraryService not provided');
  return service;
}

// Component usage
function ItineraryForm() {
  const service = useItineraryService(); // No knowledge of implementation
  const handleSubmit = async () => {
    const itinerary = await service.generateItinerary(destination, partyInfo, month, days);
  };
}

```

#### When to Use

- When backend implementation might change during development or migration

- When you need to test components with mock services

- When multiple implementations of the same contract are needed

- When frontend and backend development need to proceed in parallel

#### When NOT to Use

- For simple one-off API calls with no reuse

- When backend implementation will never change

- When the overhead of abstraction outweighs benefits for trivial services

---

### Schema Validation at Boundaries

**Category**: Behavioral

**Problem**: AI-generated responses or external API data may not conform to expected structure, causing runtime errors deep in component rendering

**Solution**: Validate all external data at system boundaries using Zod schemas before passing to components, failing fast with clear error messages

**Implementation Status**: Implemented in ValidationService (src/services/ValidationService.ts)

**Implementation Details**:
- ValidationService class provides validateItinerary() method that accepts unknown data and returns typed Itinerary
- Custom ValidationError class preserves Zod validation issues for debugging
- Error messages include field paths for quick identification of validation failures
- All schemas match PRD specification exactly with strict validation rules
- 100% test coverage with comprehensive validation scenarios

#### Implementation

```typescript

import { z } from 'zod';
import type { Activity, TimePeriod, Day, Itinerary } from '../types/itinerary';

// Define schemas matching PRD specification
const ActivitySchema: z.ZodType<Activity> = z.object({
  attraction: z.string(),
  attraction_description: z.string(),
  what_to_do: z.array(z.string()).min(1), // Non-empty array required
  where_to_eat: z.string()
});

const TimePeriodSchema: z.ZodType<TimePeriod> = z.array(ActivitySchema).nullable();

const DaySchema: z.ZodType<Day> = z.object({
  day: z.number(),
  morning: TimePeriodSchema,
  afternoon: TimePeriodSchema,
  evening: TimePeriodSchema,
  night: TimePeriodSchema.optional(),
  late_night: TimePeriodSchema.optional()
});

const ItinerarySchema: z.ZodType<Itinerary> = z.object({
  destination: z.string(),
  party_info: z.string(),
  month: z.string(),
  days: z.number(),
  itinerary: z.array(DaySchema)
});

// Custom error class preserving Zod details
export class ValidationError extends Error {
  public readonly errors: z.ZodIssue[];

  constructor(message: string, errors: z.ZodIssue[]) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;

    // Maintains proper stack trace for where error was thrown (V8 only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}

// Validation at boundary
export class ValidationService {
  /**
   * Validates itinerary data against the ItinerarySchema.
   *
   * This method should be called at system boundaries (e.g., after receiving
   * AI-generated responses or API data) before passing data to UI components.
   *
   * @param data - Unknown data to validate (typically from external sources)
   * @returns Validated and typed Itinerary object
   * @throws ValidationError when data does not match the expected schema
   */
  validateItinerary(data: unknown): Itinerary {
    try {
      return ItinerarySchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Build detailed error message including field paths
        const fieldPaths = error.issues.map(err => err.path.join('.')).join(', ');
        const message = `Itinerary validation failed: ${fieldPaths}`;
        throw new ValidationError(message, error.issues);
      }
      throw error;
    }
  }
}

// Usage in API client
class CLIApiClient implements IItineraryService {
  constructor(
    private readonly storage: LocalStorageService,
    private readonly validator: ValidationService
  ) {}

  async generateItinerary(...): Promise<Itinerary> {
    const rawOutput = await this.executeCLI(...);
    // Validate BEFORE returning to components
    return this.validator.validateItinerary(JSON.parse(rawOutput));
  }
}

```

#### When to Use

- When receiving data from external sources (APIs, CLI commands, user input)

- When AI-generated content needs structure guarantees

- When type safety at runtime is critical for reliability

- At service layer boundaries before passing data to UI components

#### When NOT to Use

- For internal data that TypeScript already type-checks at compile time

- When validation overhead significantly impacts performance

- For simple string or number values that don't need structure validation

---

### Component Composition for Display

**Category**: Structural

**Problem**: Itinerary display logic could become a monolithic component handling day rendering, time period rendering, and activity rendering all in one file

**Solution**: Break display into composable components - ItineraryDisplay orchestrates Days, DayView renders time periods, TimePeriodView renders activities

#### Implementation

```typescript

// Atomic component - Activity display
interface ActivityProps {
  activity: Activity;
}

function ActivityItem({ activity }: ActivityProps) {
  return (
    <div className="activity">
      <h4>{activity.attraction}</h4>
      <p>{activity.attraction_description}</p>
      <ul>
        {activity.what_to_do.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
      <p className="dining">{activity.where_to_eat}</p>
    </div>
  );
}

// Time period component
interface TimePeriodProps {
  period: string;
  activities: Activity[] | null;
}

function TimePeriodView({ period, activities }: TimePeriodProps) {
  if (!activities) return null;
  return (
    <section className="time-period">
      <h3>{period}</h3>
      {activities.map((activity, i) => (
        <ActivityItem key={i} activity={activity} />
      ))}
    </section>
  );
}

// Day component
interface DayProps {
  day: DayItinerary;
}

function DayView({ day }: DayProps) {
  return (
    <article className="day">
      <h2>Day {day.day}</h2>
      <TimePeriodView period="Morning" activities={day.morning} />
      <TimePeriodView period="Afternoon" activities={day.afternoon} />
      <TimePeriodView period="Evening" activities={day.evening} />
      <TimePeriodView period="Night" activities={day.night} />
      <TimePeriodView period="Late Night" activities={day.late_night} />
    </article>
  );
}

// Orchestrating component
interface ItineraryDisplayProps {
  itinerary: Itinerary;
}

export function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
  return (
    <div className="itinerary">
      <header>
        <h1>{itinerary.destination}</h1>
        <p>{itinerary.party_info} - {itinerary.month} - {itinerary.days} days</p>
      </header>
      {itinerary.itinerary.map((day) => (
        <DayView key={day.day} day={day} />
      ))}
    </div>
  );
}

```

#### When to Use

- When a component has multiple distinct responsibilities

- When rendering nested data structures

- When parts of the UI might be reused elsewhere

- When component file exceeds 200 lines

#### When NOT to Use

- When components are truly simple and won't be reused

- When excessive decomposition makes code harder to understand

- For one-off UI elements with no logical separation

---

### Factory Pattern for Dependency Injection

**Category**: Structural

**Problem**: Need to instantiate different service implementations based on configuration while managing their dependencies cleanly

**Solution**: Use a factory function that reads configuration through a centralized configuration module, instantiates shared dependencies once, and wires them together before returning the configured service

**Implementation Status**: Fully implemented in src/services/index.ts with configuration module abstraction

**Implementation Details**:
- createItineraryService factory function reads from getServiceConfig() instead of accessing environment variables directly
- Shared dependencies (LocalStorageService, ValidationService) are instantiated once per factory call and injected into the selected implementation
- Configuration module (src/config/serviceConfig.ts) provides type-safe AppConfig with apiMode, storageKey, and maxItems
- Factory returns IItineraryService interface type for proper abstraction
- Console logging for debugging transparency showing which implementation was selected

#### Implementation

```typescript

// Configuration Module Pattern (src/config/serviceConfig.ts)
interface AppConfig {
  apiMode: 'CLI' | 'HTTP';
  storageKey: string;
  maxItems: number;
}

export function getServiceConfig(): AppConfig {
  const mode = import.meta.env.VITE_API_MODE || 'CLI';

  // Validate API mode
  if (mode !== 'CLI' && mode !== 'HTTP') {
    console.warn(`Invalid VITE_API_MODE: ${mode}. Defaulting to CLI.`);
    return {
      apiMode: 'CLI',
      storageKey: 'itinerary-history',
      maxItems: 10
    };
  }

  return {
    apiMode: mode as 'CLI' | 'HTTP',
    storageKey: 'itinerary-history',
    maxItems: 10
  };
}

// Factory function (src/services/index.ts)
export function createItineraryService(): IItineraryService {
  // Read configuration from centralized module
  const config = getServiceConfig();

  // Create shared dependencies once
  const storage = new LocalStorageService(config.storageKey, config.maxItems);
  const validator = new ValidationService();

  // Select and instantiate appropriate implementation
  if (config.apiMode === 'CLI') {
    console.log('Creating CLIApiClient for POC mode');
    return new CLIApiClient(storage, validator);
  } else {
    console.log('Creating HTTPApiClient for production mode');
    return new HTTPApiClient(storage, validator);
  }
}

// Usage in App (src/App.tsx)
function App() {
  // Create service instance once on mount using useState initializer
  const [service] = useState(() => createItineraryService());

  return (
    <ItineraryServiceProvider service={service}>
      {/* App content */}
    </ItineraryServiceProvider>
  );
}

```

#### When to Use

- When object creation logic is complex with multiple dependencies

- When implementation selection depends on configuration or environment

- When you need centralized control over dependency wiring

- When multiple implementations share common dependencies

- When configuration should be testable independently of factory logic

#### When NOT to Use

- For simple objects with no dependencies

- When implementations are never swapped

- When direct instantiation is clearer and sufficient

---

### Configuration Module Pattern

**Category**: Structural

**Problem**: Factory needs to read environment variables to select implementations, but directly accessing import.meta.env makes testing difficult and couples configuration logic to factory implementation

**Solution**: Create a dedicated configuration module that encapsulates environment variable access, provides type-safe configuration objects, and enables easy mocking in tests

**Implementation Status**: Fully implemented in src/config/serviceConfig.ts

**Implementation Details**:
- getServiceConfig function reads VITE_API_MODE from import.meta.env with validation and defaults
- Returns typed AppConfig object with apiMode ('CLI' | 'HTTP'), storageKey, and maxItems
- Validates apiMode values and logs warnings for invalid configurations
- Defaults to 'CLI' mode for development and testing
- Centralizes all service configuration in single source of truth

#### Implementation

```typescript

// src/config/serviceConfig.ts
export interface AppConfig {
  apiMode: 'CLI' | 'HTTP';
  storageKey: string;
  maxItems: number;
}

/**
 * Retrieves application configuration for service instantiation.
 *
 * Reads VITE_API_MODE environment variable and returns typed configuration
 * object with validation and sensible defaults for development.
 */
export function getServiceConfig(): AppConfig {
  const rawMode = import.meta.env.VITE_API_MODE;

  // Validate and normalize API mode
  let apiMode: 'CLI' | 'HTTP' = 'CLI';
  if (rawMode === 'HTTP') {
    apiMode = 'HTTP';
  } else if (rawMode && rawMode !== 'CLI') {
    console.warn(
      `Invalid VITE_API_MODE: "${rawMode}". Valid options: "CLI" or "HTTP". Defaulting to CLI.`
    );
  }

  return {
    apiMode,
    storageKey: 'itinerary-history',
    maxItems: 10
  };
}

```

#### When to Use

- When factory functions need configuration from environment variables

- When configuration logic should be testable independently

- When multiple parts of the application share configuration values

- When you need centralized validation of configuration values

- When environment variable access should be abstracted for portability

#### When NOT to Use

- For simple applications with no configuration needs

- When configuration values never change between environments

- For component-specific configuration that doesn't belong at application level

---

### React Context Dependency Injection

**Category**: Structural

**Problem**: Need to provide service instances to deeply nested components without prop drilling through intermediate components

**Solution**: Use React Context with custom Provider and hook to inject service dependencies throughout the component tree with runtime validation

**Implementation Status**: Fully implemented in src/services/ItineraryServiceContext.tsx

**Implementation Details**:
- ItineraryServiceContext created with createContext<IItineraryService | null>(null)
- ItineraryServiceProvider component accepts service prop and provides it via Context.Provider
- useItineraryService hook retrieves service from context with validation
- Hook throws descriptive error if used outside provider
- Provider validates service is not null before providing
- App component creates service instance using factory and wraps tree with provider

#### Implementation

```typescript

// src/services/ItineraryServiceContext.tsx
import { createContext, useContext, ReactNode } from 'react';
import type { IItineraryService } from './IItineraryService';

// Create context with null default (requires provider)
const ItineraryServiceContext = createContext<IItineraryService | null>(null);

/**
 * Provider component that makes IItineraryService available to child components.
 *
 * Usage:
 *   const service = createItineraryService();
 *   <ItineraryServiceProvider service={service}>
 *     <App />
 *   </ItineraryServiceProvider>
 */
export function ItineraryServiceProvider({
  service,
  children
}: {
  service: IItineraryService;
  children: ReactNode;
}) {
  if (!service) {
    throw new Error('ItineraryServiceProvider requires a valid service instance');
  }

  return (
    <ItineraryServiceContext.Provider value={service}>
      {children}
    </ItineraryServiceContext.Provider>
  );
}

/**
 * Hook to access IItineraryService from context.
 *
 * Throws error if used outside ItineraryServiceProvider.
 *
 * Usage:
 *   const service = useItineraryService();
 *   const itinerary = await service.generateItinerary(...);
 */
export function useItineraryService(): IItineraryService {
  const service = useContext(ItineraryServiceContext);

  if (!service) {
    throw new Error(
      'useItineraryService must be used within an ItineraryServiceProvider. ' +
      'Wrap your component tree with <ItineraryServiceProvider service={service}>.'
    );
  }

  return service;
}

```

#### When to Use

- When multiple components need access to shared service instances

- When prop drilling becomes cumbersome (passing through 3+ component levels)

- When service instances should be created once and shared application-wide

- When you want type-safe dependency injection with runtime validation

#### When NOT to Use

- For values that change frequently (use state management instead)

- When only one or two components need the service (prop passing is clearer)

- For component-specific dependencies that don't need global access

---

### Local Storage with Maximum Size Management

**Category**: Behavioral

**Problem**: Storing unlimited history in localStorage will eventually hit quota limits and fail silently or unpredictably

**Solution**: Implement a fixed-size queue that removes oldest items when capacity is reached, handling quota errors gracefully

#### Implementation

```typescript

class LocalStorageService {
  constructor(
    private readonly storageKey: string,
    private readonly maxItems: number
  ) {}

  saveItinerary(itinerary: Itinerary): void {
    try {
      const history = this.getHistory();
      
      // Add to front of array
      history.unshift(itinerary);
      
      // Enforce maximum size
      if (history.length > this.maxItems) {
        history.length = this.maxItems; // Truncate
      }
      
      localStorage.setItem(this.storageKey, JSON.stringify(history));
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        // Clear oldest items and retry once
        this.clearOldestItems(3);
        this.saveItinerary(itinerary);
      } else {
        throw new StorageError('Failed to save itinerary', error);
      }
    }
  }

  getHistory(): Itinerary[] {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return [];
      
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Failed to parse history, clearing storage', error);
      localStorage.removeItem(this.storageKey);
      return [];
    }
  }

  private clearOldestItems(count: number): void {
    const history = this.getHistory();
    if (history.length > count) {
      history.length = history.length - count;
      localStorage.setItem(this.storageKey, JSON.stringify(history));
    }
  }

  clearHistory(): void {
    localStorage.removeItem(this.storageKey);
  }
}

```

#### When to Use

- When storing user-generated content in localStorage

- When data size is unpredictable

- When you need persistent local history

- When quota exceeded errors must be handled gracefully

#### When NOT to Use

- For temporary session data that can be lost

- When data should persist indefinitely (use backend storage)

- For large binary data (localStorage is inefficient for this)

---


<!-- SECTION:END:IMPLEMENTATION_PATTERNS -->

<!-- SECTION:START:TESTING_STRATEGY -->


## Testing
last updated: 2025-10-14 HH:MM PM PDT
updated by: tech-lead

### Testing Philosophy

This project follows Test-Driven Development (TDD) principles with a focus on unit testing for true isolation and reliability. Tests are written first, failing naturally, then implementation follows the Red-Green-Refactor cycle. All tests must run and pass before work is considered complete, ensuring no regressions and maintaining code quality throughout development.

### Test Types

#### Unit Tests

**Purpose**: Test individual components, services, and functions in complete isolation with mocked dependencies

**Coverage Target**: 80%

**Key Patterns**:

- Mock all external dependencies using test doubles

- Test one unit of functionality per test case

- Follow Arrange-Act-Assert pattern for clarity

- Write tests before implementation (Red-Green-Refactor)

- Focus on behavior, not implementation details

- Each test should be independent and runnable in any order

**Example**:

```typescript

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ItineraryForm } from './ItineraryForm';
import type { IItineraryService } from '../services/IItineraryService';

describe('ItineraryForm', () => {
  let mockService: IItineraryService;

  beforeEach(() => {
    // Arrange: Create fresh mocks for each test
    mockService = {
      generateItinerary: vi.fn(),
      getHistory: vi.fn(),
      saveToHistory: vi.fn()
    };
  });

  it('should call generateItinerary with form values when submitted', async () => {
    // Arrange
    const mockItinerary = { destination: 'Tokyo', days: 5 };
    mockService.generateItinerary.mockResolvedValue(mockItinerary);
    
    render(<ItineraryForm service={mockService} />);
    
    // Act
    fireEvent.change(screen.getByLabelText('Destination'), { target: { value: 'Tokyo' } });
    fireEvent.change(screen.getByLabelText('Days'), { target: { value: '5' } });
    fireEvent.click(screen.getByText('Generate'));
    
    // Assert
    await waitFor(() => {
      expect(mockService.generateItinerary).toHaveBeenCalledWith(
        'Tokyo',
        expect.any(String),
        expect.any(String),
        5
      );
    });
  });

  it('should display error message when generation fails', async () => {
    // Arrange
    mockService.generateItinerary.mockRejectedValue(new Error('API Error'));
    render(<ItineraryForm service={mockService} />);
    
    // Act
    fireEvent.click(screen.getByText('Generate'));
    
    // Assert
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});

```

#### Service Tests

**Purpose**: Test service layer implementations with mocked external systems (CLI, HTTP, localStorage)

**Coverage Target**: 90%

**Key Patterns**:

- Mock external systems (exec, fetch, localStorage)

- Test both success and failure scenarios

- Verify error handling and validation logic

- Test implementation-specific behavior (CLI vs HTTP)

- Ensure proper dependency usage

**Example**:

```typescript

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CLIApiClient } from './CLIApiClient';
import { ValidationService } from './ValidationService';
import { LocalStorageService } from './LocalStorageService';
import { exec } from 'child_process';
import { promisify } from 'util';

vi.mock('child_process');

describe('CLIApiClient', () => {
  let client: CLIApiClient;
  let mockValidator: ValidationService;
  let mockStorage: LocalStorageService;
  const execAsync = promisify(exec);

  beforeEach(() => {
    mockValidator = {
      validateItinerary: vi.fn((data) => data)
    } as any;
    mockStorage = {
      saveItinerary: vi.fn(),
      getHistory: vi.fn(() => []),
      clearHistory: vi.fn()
    } as any;
    client = new CLIApiClient(mockStorage, mockValidator);
  });

  it('should execute claude CLI and return validated itinerary', async () => {
    // Arrange
    const mockResponse = { destination: 'Paris', days: 3, itinerary: [] };
    vi.mocked(execAsync).mockResolvedValue({
      stdout: JSON.stringify(mockResponse),
      stderr: ''
    });

    // Act
    const result = await client.generateItinerary('Paris', 'couple', 'May', 3);

    // Assert
    expect(execAsync).toHaveBeenCalledWith(
      expect.stringContaining('claude -p')
    );
    expect(mockValidator.validateItinerary).toHaveBeenCalledWith(mockResponse);
    expect(result).toEqual(mockResponse);
  });

  it('should throw error when CLI execution fails', async () => {
    // Arrange
    vi.mocked(execAsync).mockRejectedValue(new Error('CLI not found'));

    // Act & Assert
    await expect(
      client.generateItinerary('Paris', 'couple', 'May', 3)
    ).rejects.toThrow('CLI not found');
  });
});

```

#### Component Tests

**Purpose**: Test React components with mocked services focusing on user interactions and rendering logic

**Coverage Target**: 75%

**Key Patterns**:

- Use React Testing Library for user-centric testing

- Mock service dependencies via props or context

- Test user interactions (clicks, form inputs)

- Verify rendering based on props and state changes

- Test loading states and error handling UI

**Example**:

```typescript

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ItineraryDisplay } from './ItineraryDisplay';
import type { Itinerary } from '../types';

describe('ItineraryDisplay', () => {
  const mockItinerary: Itinerary = {
    destination: 'Tokyo',
    party_info: 'couple',
    month: 'March',
    days: 2,
    itinerary: [
      {
        day: 1,
        morning: [
          {
            attraction: 'Senso-ji Temple',
            attraction_description: 'Historic temple',
            what_to_do: ['Visit temple', 'Shop at Nakamise'],
            where_to_eat: 'Street food'
          }
        ],
        afternoon: null,
        evening: null
      }
    ]
  };

  it('should display itinerary metadata', () => {
    // Act
    render(<ItineraryDisplay itinerary={mockItinerary} />);

    // Assert
    expect(screen.getByText('Tokyo')).toBeInTheDocument();
    expect(screen.getByText(/couple.*March.*2 days/)).toBeInTheDocument();
  });

  it('should render day-by-day breakdown', () => {
    // Act
    render(<ItineraryDisplay itinerary={mockItinerary} />);

    // Assert
    expect(screen.getByText('Day 1')).toBeInTheDocument();
    expect(screen.getByText('Senso-ji Temple')).toBeInTheDocument();
    expect(screen.getByText('Historic temple')).toBeInTheDocument();
  });

  it('should not render null time periods', () => {
    // Act
    render(<ItineraryDisplay itinerary={mockItinerary} />);

    // Assert
    expect(screen.queryByText('Afternoon')).not.toBeInTheDocument();
    expect(screen.queryByText('Evening')).not.toBeInTheDocument();
  });
});

```

#### Validation Tests

**Purpose**: Test Zod schema validation for itinerary responses

**Coverage Target**: 100%

**Key Patterns**:

- Test valid data passes validation

- Test each required field rejection when missing

- Test invalid data types are rejected

- Test schema edge cases (empty arrays, null handling)

- Verify meaningful error messages

**Example**:

```typescript

import { describe, it, expect } from 'vitest';
import { ValidationService } from './ValidationService';

describe('ValidationService', () => {
  const validator = new ValidationService();

  it('should validate correct itinerary structure', () => {
    // Arrange
    const validData = {
      destination: 'Paris',
      party_info: 'family',
      month: 'June',
      days: 3,
      itinerary: [
        {
          day: 1,
          morning: [
            {
              attraction: 'Eiffel Tower',
              attraction_description: 'Iconic landmark',
              what_to_do: ['Visit observation deck'],
              where_to_eat: 'Nearby cafe'
            }
          ],
          afternoon: null,
          evening: null
        }
      ]
    };

    // Act & Assert
    expect(() => validator.validateItinerary(validData)).not.toThrow();
  });

  it('should reject itinerary missing required fields', () => {
    // Arrange
    const invalidData = {
      destination: 'Paris',
      // missing party_info, month, days, itinerary
    };

    // Act & Assert
    expect(() => validator.validateItinerary(invalidData)).toThrow();
  });

  it('should reject activity missing what_to_do array', () => {
    // Arrange
    const invalidData = {
      destination: 'Paris',
      party_info: 'family',
      month: 'June',
      days: 1,
      itinerary: [
        {
          day: 1,
          morning: [
            {
              attraction: 'Eiffel Tower',
              attraction_description: 'Iconic landmark',
              // missing what_to_do
              where_to_eat: 'Nearby cafe'
            }
          ],
          afternoon: null,
          evening: null
        }
      ]
    };

    // Act & Assert
    expect(() => validator.validateItinerary(invalidData)).toThrow(/what_to_do/);
  });
});

```

### Testing Best Practices

#### Write Tests First (TDD)

Write failing tests before implementation code. This ensures tests actually validate behavior rather than just confirming what was already written. Follow Red-Green-Refactor: write failing test, make it pass with minimal code, then refactor.

**Example**:

```typescript

// Step 1: RED - Write failing test first
describe('LocalStorageService', () => {
  it('should limit history to maximum 10 items', () => {
    const storage = new LocalStorageService('test-key', 10);
    
    // Add 12 items
    for (let i = 0; i < 12; i++) {
      storage.saveItinerary({ id: i, destination: `Place ${i}` });
    }
    
    // Assert only 10 most recent are kept
    const history = storage.getHistory();
    expect(history).toHaveLength(10);
    expect(history[0].id).toBe(11); // Most recent
  });
});

// Step 2: GREEN - Implement minimal code to pass
class LocalStorageService {
  saveItinerary(itinerary: Itinerary): void {
    const history = this.getHistory();
    history.unshift(itinerary);
    if (history.length > this.maxItems) {
      history.length = this.maxItems; // Truncate
    }
    localStorage.setItem(this.storageKey, JSON.stringify(history));
  }
}

// Step 3: REFACTOR - Improve without changing behavior
// (tests still pass)

```

#### Test Behavior, Not Implementation

Focus tests on observable behavior and outcomes rather than internal implementation details. This makes tests resilient to refactoring and more valuable for detecting actual bugs.

**Example**:

```typescript

// BAD: Testing implementation details
it('should call useState with initial value', () => {
  const spy = vi.spyOn(React, 'useState');
  render(<MyComponent />);
  expect(spy).toHaveBeenCalledWith(null);
});

// GOOD: Testing behavior
it('should display loading state initially', () => {
  render(<MyComponent />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

// BAD: Testing internal state
it('should set state.isLoading to true', () => {
  const wrapper = shallow(<MyComponent />);
  expect(wrapper.state('isLoading')).toBe(true);
});

// GOOD: Testing user-visible behavior
it('should show loading spinner when fetching data', async () => {
  render(<MyComponent />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

```

#### Isolate Tests with Mocks

Each test should be completely independent with all external dependencies mocked. This ensures tests are fast, reliable, and don't fail due to external system issues.

**Example**:

```typescript

import { vi, beforeEach } from 'vitest';

// Create fresh mocks for each test
beforeEach(() => {
  vi.clearAllMocks();
  // Reset localStorage
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn()
    },
    writable: true
  });
});

describe('LocalStorageService', () => {
  it('should read from localStorage', () => {
    // Arrange: Mock returns specific data
    const mockData = JSON.stringify([{ id: 1 }]);
    vi.mocked(localStorage.getItem).mockReturnValue(mockData);
    
    const service = new LocalStorageService('key', 10);
    
    // Act
    const result = service.getHistory();
    
    // Assert: Verify mock was called correctly
    expect(localStorage.getItem).toHaveBeenCalledWith('key');
    expect(result).toEqual([{ id: 1 }]);
  });
});

```

#### Use Descriptive Test Names

Test names should clearly describe what is being tested and what the expected outcome is. Use 'should' statements that read like specifications.

**Example**:

```typescript

// BAD: Vague test names
it('works', () => { /* ... */ });
it('test form', () => { /* ... */ });
it('error case', () => { /* ... */ });

// GOOD: Clear, descriptive test names
it('should call generateItinerary when form is submitted with valid data', () => {
  // ...
});

it('should display validation error when destination field is empty', () => {
  // ...
});

it('should disable submit button while generation is in progress', () => {
  // ...
});

// GOOD: Nested describes for organization
describe('ItineraryForm', () => {
  describe('validation', () => {
    it('should show error when destination is empty', () => { /* ... */ });
    it('should show error when days is less than 1', () => { /* ... */ });
  });
  
  describe('submission', () => {
    it('should call service when form is valid', () => { /* ... */ });
    it('should show loading state during generation', () => { /* ... */ });
  });
});

```

#### Run All Tests Before Completion

Before considering any work complete, run the full test suite to check for regressions. All tests must pass. This is a non-negotiable part of the development workflow.

**Example**:

```bash

# Run all tests with coverage
npm run test

# Or with watch mode during development
npm run test:watch

# Generate coverage report
npm run test:coverage

# Verify coverage thresholds
# vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80
      }
    }
  }
});

```


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
