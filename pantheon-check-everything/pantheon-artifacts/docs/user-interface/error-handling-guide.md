---
doc_id: error-handling-guide
title: "Error Handling Guide"
description: "Comprehensive guide to error handling patterns, components, and user experience strategy for the Travel Itinerary Generator application"
keywords: [error-handling, ErrorDisplay, ErrorBoundary, error-types, accessibility, graceful-degradation, user-experience]
relevance: "Use this document to understand error handling patterns, implement consistent error display, add new error scenarios, and maintain error handling consistency across the application"
---

# Error Handling Guide

Last updated: 2025-10-17
Updated by: frontend-engineer

## Overview

The Travel Itinerary Generator implements comprehensive error handling spanning multiple layers: service errors from API calls, validation errors from schema validation, storage errors from localStorage operations, and rendering errors from React components. This guide documents the error handling architecture, components, patterns, and best practices for developers implementing new features or modifying error handling behavior.

## Error Handling Architecture

### Multi-Layer Error Strategy

The application implements defense-in-depth error handling:

**Service Layer**:
- CLIApiClient catches CLI execution failures, timeout errors, JSON parsing failures
- ValidationService catches schema validation errors with detailed Zod error messages
- LocalStorageService catches storage quota exceeded and data corruption errors

**Orchestration Layer**:
- App component catches errors from service calls and manages error state
- Error categorization distinguishes ValidationError, ServiceError, StorageError
- Graceful degradation allows partial success (e.g., show itinerary despite storage failure)

**Presentation Layer**:
- ErrorDisplay component provides consistent, accessible error messaging
- ErrorBoundary component catches rendering errors preventing app crashes
- Field-level validation errors display inline with form fields

**Benefits**:
- Errors caught at appropriate boundaries prevent cascading failures
- Clear separation of concerns improves maintainability
- Consistent user experience across all error scenarios

## Error Components

### ErrorDisplay Component

**Purpose**: Centralized error display component providing consistent error messaging with accessibility support and visual feedback.

**Location**: `src/components/ErrorDisplay.tsx`

**Props Interface**:
```typescript
interface ErrorDisplayProps {
  errorMessage: string;           // Required: Error message to display
  errorType?: 'error' | 'warning' | 'info';  // Optional: Defaults to 'error'
  onRetry?: () => void;           // Optional: Retry callback
  className?: string;             // Optional: Style overrides
}
```

**Error Types and Visual Styling**:
- `'error'`: Red color (#c62828) for critical blocking errors
- `'warning'`: Orange color (#f57c00) for non-blocking warnings
- `'info'`: Blue color (#1976d2) for informational messages

**Accessibility Features**:
- `role="alert"`: Announces error to screen readers immediately
- `aria-live="polite"`: Non-intrusive announcement for dynamic updates
- Semantic HTML for screen reader navigation

**Retry Button**:
- Conditionally rendered when `onRetry` callback provided
- Clear call-to-action for error recovery
- Improves user experience by avoiding navigation away from error state

**Usage Example**:
```tsx
<ErrorDisplay
  errorMessage={ERROR_MESSAGES.SERVICE_ERROR('API timeout')}
  errorType="error"
  onRetry={() => handleRetry()}
/>
```

**Code Example**:
```tsx
// In App component - service error with retry
{error && (
  <ErrorDisplay
    errorMessage={error}
    errorType={errorType}
  />
)}

// In ItineraryForm - service error without retry (form resubmission provides retry)
{error && (
  <ErrorDisplay
    errorMessage={error}
    errorType="error"
  />
)}
```

### ErrorBoundary Component

**Purpose**: React Error Boundary that catches rendering errors in child components and displays fallback UI instead of crashing the entire application.

**Location**: `src/components/ErrorBoundary.tsx`

**Implementation**: Class component (required by React for error boundaries)

**Props Interface**:
```typescript
interface ErrorBoundaryProps {
  fallbackMessage?: string;  // Optional: Custom error message (defaults to ERROR_MESSAGES.BOUNDARY_ERROR)
  children: ReactNode;       // Required: Components to wrap
}
```

**Lifecycle Methods**:
- `getDerivedStateFromError(error)`: Updates state to trigger fallback UI rendering (pure state update)
- `componentDidCatch(error, errorInfo)`: Logs error details to console for debugging visibility (side effects)

**Error Recovery Mechanism**:
- Fallback UI includes reload button calling `window.location.reload()`
- Full page reload ensures complete application state reset
- Most reliable recovery approach for rendering errors

**Fallback UI**:
- Uses ErrorDisplay component for consistent error presentation
- Displays user-friendly message from ERROR_MESSAGES.BOUNDARY_ERROR
- Provides reload functionality via onRetry callback

**Placement**:
- Wrapped around App component in main.tsx (top-level safety net)
- Inside StrictMode to enable development error detection
- Can be added at lower levels for feature-specific error boundaries

**Usage Example**:
```tsx
// In main.tsx
<StrictMode>
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
</StrictMode>
```

**Important Notes**:
- Only catches errors during rendering, in lifecycle methods, and in constructors
- Does NOT catch errors in event handlers, async code, or server-side rendering
- Event handler errors must be caught with try/catch in the handler itself

## Error Categorization

### Error Types

**ValidationError** (`src/services/ValidationService.ts`):
- **Source**: Schema validation failures from Zod
- **Trigger**: Malformed AI response, missing required fields, invalid data types
- **User Message**: "Validation failed: [detailed error from Zod]"
- **Display**: ErrorDisplay with errorType='error'
- **Recovery**: User retries generation (AI may produce valid response)
- **Debugging**: Console logs detailed Zod error with schema path

**ServiceError** (`src/services/CLIApiClient.ts`):
- **Source**: CLI execution failures, timeout, JSON parsing errors
- **Trigger**: CLI command failure, process timeout (30s), invalid JSON response
- **User Message**: "Failed to generate itinerary. Please try again."
- **Display**: ErrorDisplay with errorType='error'
- **Recovery**: User retries generation (transient infrastructure issues)
- **Debugging**: Console logs originalError, context object, timestamp

**StorageError** (`src/services/LocalStorageService.ts`):
- **Source**: localStorage quota exceeded, data corruption
- **Trigger**: Storage full, corrupted JSON data
- **User Message**: "Could not save to history, but your itinerary is displayed below."
- **Display**: ErrorDisplay with errorType='warning' (graceful degradation)
- **Recovery**: Itinerary still displays successfully, only history save fails
- **Debugging**: Console logs storage key, error, dataLength

**Generic Error**:
- **Source**: Unexpected errors not matching specific types
- **Trigger**: Unhandled exception in error handling code itself
- **User Message**: "An unexpected error occurred. Please try again."
- **Display**: ErrorDisplay with errorType='error'
- **Recovery**: User retries generation
- **Debugging**: Console logs full error object and stack trace

### Error Classification in Code

```typescript
// In App.tsx handleGenerate function
try {
  const itinerary = await service.generateItinerary(tripDetails);
  setItinerary(itinerary);

  try {
    await service.saveToHistory(itinerary);
  } catch (storageError) {
    if (storageError instanceof StorageError) {
      // Graceful degradation - show warning but keep itinerary
      console.error('Storage error in handleGenerate:', storageError);
      setError(ERROR_MESSAGES.STORAGE_FAILED);
      setErrorType('warning');
      // Itinerary remains displayed - do not clear it
    } else {
      throw storageError;  // Re-throw unexpected errors
    }
  }
} catch (err) {
  if (err instanceof ValidationError) {
    console.error('Validation error in handleGenerate:', err);
    setError(ERROR_MESSAGES.VALIDATION_FAILED);
    setErrorType('error');
  } else if (err instanceof ServiceError) {
    console.error('Service error in handleGenerate:', err);
    setError(ERROR_MESSAGES.SERVICE_ERROR(err.message));
    setErrorType('error');
  } else {
    console.error('Unexpected error in handleGenerate:', err);
    setError(ERROR_MESSAGES.UNEXPECTED_ERROR);
    setErrorType('error');
  }
  setItinerary(null);  // Clear itinerary on blocking errors
}
```

## Error State Management

### App Component Error State

**State Variables**:
```typescript
const [error, setError] = useState<string | null>(null);
const [errorType, setErrorType] = useState<'error' | 'warning' | 'info'>('error');
const [itinerary, setItinerary] = useState<Itinerary | null>(null);
```

**State Transitions**:
1. User submits form
2. Clear previous error: `setError(null)`
3. Service call succeeds or fails
4. Error caught, categorized, and error state updated
5. ErrorDisplay renders if error is non-null
6. Error cleared on next submission attempt

**Separation of Concerns**:
- `error`: What went wrong (message string)
- `errorType`: How serious (error/warning/info)
- `itinerary`: Application data (independent of error state)

**Graceful Degradation Pattern**:
```typescript
// StorageError case - keep itinerary, show warning
setError(ERROR_MESSAGES.STORAGE_FAILED);
setErrorType('warning');
// itinerary state NOT cleared

// Other errors - clear itinerary, show error
setError(ERROR_MESSAGES.SERVICE_ERROR(err.message));
setErrorType('error');
setItinerary(null);
```

### ItineraryForm Component Error State

**Service Errors**:
- Managed with `error` state variable (string | null)
- Displayed with ErrorDisplay component above submit button
- Cleared on each new submission attempt

**Validation Errors**:
- Managed with `validationErrors` state object (ValidationErrors interface)
- Displayed inline with each field (role='alert' spans)
- Cleared when field becomes valid

**Error Display Separation**:
```tsx
{/* Service-level errors - ErrorDisplay component */}
{error && (
  <ErrorDisplay errorMessage={error} errorType="error" />
)}

{/* Field-level validation errors - inline spans */}
{validationErrors.destination && (
  <span id="destination-error" role="alert">
    {validationErrors.destination}
  </span>
)}
```

## Error Messages Constants

**Location**: `src/constants/errorMessages.ts`

**Purpose**: Centralized error messaging prevents magic strings and ensures consistency

**Structure**:
```typescript
export const ERROR_MESSAGES = {
  STORAGE_FAILED: 'Could not save to history, but your itinerary is displayed below.',
  VALIDATION_FAILED: 'Validation failed: The generated itinerary does not match expected format.',
  SERVICE_ERROR: (details: string) => `Failed to generate itinerary: ${details}`,
  GENERIC_ERROR: (details: string) => `An error occurred: ${details}`,
  UNEXPECTED_ERROR: 'An unexpected error occurred. Please try again.',
  BOUNDARY_ERROR: 'A rendering error occurred. Please reload the page.',
  RETRY_SUGGESTION: 'Please try again. If the problem persists, contact support.'
} as const;
```

**Usage Pattern**:
```typescript
// Static message
setError(ERROR_MESSAGES.STORAGE_FAILED);

// Dynamic message with details
setError(ERROR_MESSAGES.SERVICE_ERROR(err.message));
```

**Benefits**:
- Single source of truth for error messages
- Type-safe references (TypeScript const assertion)
- Easy to update messaging across entire application
- Tests can reference same constants for assertions

## Graceful Degradation

### Storage Failure Pattern

**Scenario**: Itinerary generates successfully but localStorage save fails (quota exceeded)

**Behavior**:
1. Itinerary displays normally to user
2. Warning message appears above itinerary: "Could not save to history..."
3. ErrorDisplay uses errorType='warning' (orange color)
4. User can view and use generated itinerary despite storage failure
5. History feature unavailable but core functionality works

**Implementation**:
```typescript
try {
  const itinerary = await service.generateItinerary(tripDetails);
  setItinerary(itinerary);  // Success - set itinerary

  try {
    await service.saveToHistory(itinerary);
  } catch (storageError) {
    if (storageError instanceof StorageError) {
      setError(ERROR_MESSAGES.STORAGE_FAILED);
      setErrorType('warning');
      // Itinerary state NOT cleared - user sees both warning and itinerary
    }
  }
}
```

**User Experience**:
- Partial success is better than complete failure
- User understands what succeeded and what failed
- Clear separation between critical errors and non-blocking warnings

**Visual Distinction**:
- Critical errors: Red color, no itinerary shown
- Warnings: Orange color, itinerary shown alongside warning

## Error Handling Best Practices

### Adding New Error Scenarios

**Step 1: Define Error Type** (if needed):
```typescript
// In appropriate service file
export class CustomError extends Error {
  constructor(message: string, public context?: Record<string, unknown>) {
    super(message);
    this.name = 'CustomError';
  }
}
```

**Step 2: Add Error Message Constant**:
```typescript
// In src/constants/errorMessages.ts
export const ERROR_MESSAGES = {
  // ... existing messages
  CUSTOM_ERROR: 'User-friendly description of what went wrong',
} as const;
```

**Step 3: Throw Error at Source**:
```typescript
// In service layer
if (someCondition) {
  throw new CustomError('Technical details', { additionalContext });
}
```

**Step 4: Catch and Categorize**:
```typescript
// In App component or form component
catch (err) {
  if (err instanceof CustomError) {
    console.error('Custom error:', err);
    setError(ERROR_MESSAGES.CUSTOM_ERROR);
    setErrorType('error');  // or 'warning' for graceful degradation
  }
}
```

**Step 5: Write Tests**:
```typescript
it('should display custom error message when CustomError thrown', async () => {
  const service = createMockService();
  service.someMethod.mockRejectedValue(new CustomError('Test error'));

  render(<Component service={service} />);
  // Trigger error...

  await waitFor(() => {
    expect(screen.getByText(ERROR_MESSAGES.CUSTOM_ERROR)).toBeInTheDocument();
  });
});
```

### Error Logging Guidelines

**Console Logging Pattern**:
```typescript
console.error('Context description:', error, additionalInfo);
```

**What to Log**:
- Error classification (e.g., 'Validation error in handleGenerate:')
- Full error object with stack trace
- Contextual information (user inputs, state, timestamps)
- Do NOT log sensitive user data

**When to Log**:
- Every error catch block (debugging visibility)
- componentDidCatch in ErrorBoundary (rendering errors)
- Service layer errors (before throwing to caller)

**Production Considerations**:
- Console logs remain in production for debugging
- Error tracking service integration (future enhancement)
- Do not expose stack traces to users (only in console)

### Error Recovery Patterns

**Retry via Form Resubmission**:
- User corrects input and resubmits form
- Errors cleared at start of handleSubmit
- Natural retry flow without explicit retry button

**Retry via Explicit Button**:
- ErrorDisplay onRetry callback triggers same logic
- Useful when no form inputs to modify
- Example: Network timeout, transient service failure

**Page Reload**:
- ErrorBoundary fallback uses window.location.reload()
- Complete application reset for rendering errors
- Last resort recovery mechanism

**Graceful Degradation**:
- Non-critical features fail without blocking main functionality
- Warning displayed alongside successful output
- User can continue working with partial success

## Testing Error Handling

### Test Coverage Requirements

**Component Tests**:
- ErrorDisplay renders all error types correctly (error/warning/info)
- ErrorDisplay accessibility attributes present (role='alert', aria-live)
- ErrorDisplay retry button appears when onRetry provided
- ErrorBoundary catches rendering errors and displays fallback
- ErrorBoundary logs errors to console for debugging

**Integration Tests**:
- App component displays ErrorDisplay for each error type
- App component implements graceful degradation for StorageError
- ItineraryForm displays service errors with ErrorDisplay
- Field-level validation errors remain as inline spans

**Test Pattern Example**:
```typescript
it('should display ErrorDisplay with warning type for StorageError', async () => {
  const service = createMockService();
  service.saveToHistory.mockRejectedValue(new StorageError('Quota exceeded'));

  render(<App service={service} />);
  await fillFormWithValidData();
  fireEvent.click(screen.getByRole('button', { name: /generate/i }));

  await waitFor(() => {
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent(ERROR_MESSAGES.STORAGE_FAILED);
    // Verify warning styling (orange color)
    expect(alert).toHaveStyle({ color: '#f57c00' });
  });

  // Verify itinerary still displayed
  expect(screen.getByText(/day 1/i)).toBeInTheDocument();
});
```

## Accessibility Considerations

### Screen Reader Support

**Error Announcements**:
- `role="alert"`: Immediate announcement of new errors
- `aria-live="polite"`: Non-intrusive updates for dynamic content
- Error messages placed logically in DOM (near related content)

**Field-Level Errors**:
- `aria-invalid={!!validationErrors.field}`: Indicates field error state
- `aria-describedby="field-error"`: Associates error with input
- Screen reader announces error when field receives focus

**Keyboard Navigation**:
- All error recovery actions keyboard accessible
- Retry buttons receive focus and respond to Enter/Space
- No mouse-only error recovery mechanisms

### Visual Accessibility

**Color Coding**:
- Red (#c62828): Critical errors - high contrast, WCAG AA compliant
- Orange (#f57c00): Warnings - sufficient contrast for visibility
- Blue (#1976d2): Info - clear distinction from errors/warnings

**Text Clarity**:
- Error messages use clear, plain language
- Avoid technical jargon in user-facing messages
- Provide actionable guidance for recovery

**Focus Management**:
- Error messages appear near user's current focus
- No disruptive focus changes on error display
- Users can continue navigating naturally

## Future Enhancements

### Planned Improvements

**Error Tracking Service Integration**:
- Send errors to centralized logging service (e.g., Sentry, LogRocket)
- Aggregate error metrics for monitoring
- Alert on error rate thresholds

**User Error Reporting**:
- "Report this error" button in ErrorBoundary fallback
- Capture user context (steps to reproduce)
- Send to support team for investigation

**Retry Backoff Strategy**:
- Implement exponential backoff for automatic retries
- Prevent overwhelming failing services
- Give transient issues time to resolve

**Error-Specific Recovery Actions**:
- Network errors: "Check connection" guidance
- Validation errors: Link to format documentation
- Service errors: System status page link

**Offline Support**:
- Detect offline state before API calls
- Show offline-specific error message
- Queue requests for when connection restored

## Summary

The Travel Itinerary Generator implements comprehensive error handling with:

- **ErrorDisplay Component**: Consistent, accessible error presentation across all error scenarios
- **ErrorBoundary Component**: Catches rendering errors preventing app crashes
- **Multi-Layer Strategy**: Errors caught at service, orchestration, and presentation layers
- **Error Categorization**: Distinct handling for ValidationError, ServiceError, StorageError, and generic errors
- **Graceful Degradation**: Non-critical failures show warnings without blocking main functionality
- **Accessibility**: Screen reader support via ARIA attributes and semantic HTML
- **Centralized Messaging**: ERROR_MESSAGES constants prevent magic strings
- **Developer Guidance**: Clear patterns for adding new error scenarios

This error handling architecture balances user experience with debugging visibility, ensuring users receive clear guidance during failures while developers maintain full error context for troubleshooting.
