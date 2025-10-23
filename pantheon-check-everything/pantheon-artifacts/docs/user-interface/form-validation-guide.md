---
doc_id: form-validation-guide
title: "Form Validation Guide"
description: "Comprehensive guide to form validation rules, error handling patterns, and accessibility considerations for the Trip Input Form"
keywords: [form, validation, accessibility, error-handling, user-input, ARIA, client-side-validation]
relevance: "Use this document to understand validation rules for trip input forms, maintain consistency when adding new fields, and ensure accessible error messaging patterns"
---

# Form Validation Guide

Last updated: 2025-10-17
Updated by: frontend-engineer

## Overview

The Trip Input Form (ItineraryForm component) serves as the primary user entry point for the Travel Itinerary Generator application. This guide documents the validation rules, error handling patterns, and accessibility considerations implemented in the form to ensure a consistent and user-friendly input experience.

## Form Fields

### Destination

**Purpose**: Captures the travel destination for itinerary generation

**Validation Rules**:
- Required field - cannot be empty or whitespace-only
- Minimum length: 2 characters (after trimming whitespace)
- Maximum length: None enforced

**Error Messages**:
- Empty/whitespace: "Destination is required"
- Less than 2 characters: "Destination must be at least 2 characters"

**Implementation**: `validateDestination(value: string): string | null`

### Party Info

**Purpose**: Captures information about the traveling party (e.g., "couple", "family with young kids")

**Validation Rules**:
- Required field - cannot be empty or whitespace-only
- Minimum length: 2 characters (after trimming whitespace)
- Maximum length: None enforced

**Error Messages**:
- Empty/whitespace: "Party info is required"
- Less than 2 characters: "Party info must be at least 2 characters"

**Implementation**: `validatePartyInfo(value: string): string | null`

### Month

**Purpose**: Captures the month of travel for seasonal-aware itinerary generation

**Validation Rules**:
- Required field - cannot be empty or whitespace-only
- No format enforcement (accepts "March", "03", "3", etc.)
- No date validation (e.g., doesn't check if month is valid)

**Error Messages**:
- Empty/whitespace: "Month is required"

**Implementation**: `validateMonth(value: string): string | null`

**Future Enhancements**:
- Month dropdown or autocomplete for consistent formatting
- Validation against valid month names/numbers

### Days

**Purpose**: Captures the trip duration in number of days

**Validation Rules**:
- Required field - cannot be empty or whitespace-only
- Must be a valid integer number
- Minimum value: 1 day
- Maximum value: 30 days

**Error Messages**:
- Empty/whitespace: "Days is required"
- Not a number: "Days must be a valid number"
- Less than 1: "Days must be at least 1"
- Greater than 30: "Days cannot exceed 30"

**Implementation**: `validateDays(value: string): string | null`

**Rationale**: The 30-day maximum provides a reasonable upper limit for trip duration while allowing flexible planning. This constraint can be adjusted based on business requirements.

## Validation Patterns

### Pure Validation Functions

All validation logic is implemented as pure functions defined outside the component:

```typescript
const validateFieldName = (value: string): string | null => {
  // Validation logic
  // Returns error message string if invalid
  // Returns null if valid
};
```

**Benefits**:
- Testable in isolation without React rendering
- Reusable across components
- Easy to understand and maintain
- Supports both onBlur and onSubmit validation

### Validation Timing

**OnBlur Validation** (Field-level):
- Triggered when user leaves a field
- Provides immediate feedback after field interaction
- Updates individual field error in validation errors state
- Does not prevent form submission

**OnSubmit Validation** (Form-level):
- Triggered when user attempts to submit form
- Validates all fields simultaneously
- Aggregates all errors before displaying
- Prevents submission if any validation fails
- Ensures comprehensive validation coverage

### Error State Management

Validation errors are managed using a structured ValidationErrors type:

```typescript
interface ValidationErrors {
  destination?: string;
  partyInfo?: string;
  month?: string;
  days?: string;
}
```

**State Updates**:
- Individual field errors updated via `setFieldError` helper function
- All errors set simultaneously during onSubmit validation
- Errors cleared when field becomes valid (null returned from validation)

**Immutability Pattern**:
```typescript
const setFieldError = (field: keyof ValidationErrors, errorMessage: string | null) => {
  setValidationErrors((prev) => {
    if (errorMessage === null) {
      const { [field]: _, ...rest } = prev;
      return rest;  // Remove error if valid
    }
    return { ...prev, [field]: errorMessage };  // Add/update error
  });
};
```

## Error Display

### Visual Presentation

Error messages are displayed immediately below their associated input fields:

```tsx
{validationErrors.fieldName && (
  <span id="fieldName-error" role="alert">
    {validationErrors.fieldName}
  </span>
)}
```

**Styling Considerations** (Future):
- Red text color for visibility
- Icon or visual indicator for quick scanning
- Sufficient contrast for WCAG compliance

### Accessibility Attributes

**ARIA Invalid**:
```tsx
aria-invalid={!!validationErrors.fieldName}
```
- Set to true when field has validation error
- Announces field state to screen readers

**ARIA Described By**:
```tsx
aria-describedby={validationErrors.fieldName ? 'fieldName-error' : undefined}
```
- Associates error message with input field
- Screen readers announce error when field receives focus

**Role Alert**:
```tsx
<span id="fieldName-error" role="alert">
```
- Error messages use role="alert" for immediate announcement
- Ensures assistive technologies notify users of validation errors

### Service Error Display

Service-level errors (API failures, network issues) are displayed separately from validation errors:

```tsx
{error && (
  <div role="alert">
    {error}
  </div>
)}
```

**Error Message Pattern**:
- User-friendly message with technical details
- Example: "Failed to generate itinerary: API Error"
- Displayed above submit button for visibility

## Loading State Management

### Submit Button States

**Default State**:
- Enabled with text "Generate Itinerary"
- Clickable and triggers form submission

**Loading State**:
- Disabled to prevent duplicate submissions
- Text changes to "Generating..."
- Visual indication of async operation in progress

**Implementation**:
```tsx
<button type="submit" disabled={isLoading}>
  {isLoading ? 'Generating...' : 'Generate Itinerary'}
</button>
```

### State Lifecycle

1. User clicks submit button
2. Validation runs (all fields)
3. If validation fails: errors displayed, loading state not set
4. If validation passes: `isLoading` set to true
5. Service call initiated
6. Finally block ensures `isLoading` set to false on completion or error
7. Form re-enabled for retry attempts

### Error State Clearing

Previous errors are cleared at the beginning of `handleSubmit`:
```typescript
setError(null);  // Clear service errors for clean retry
```

This ensures users see fresh validation feedback on each submission attempt.

## Responsive Design and Mobile Optimization

### Mobile-First Approach

The Trip Input Form implements a mobile-first responsive design strategy, building base styles optimized for mobile devices and progressively enhancing for larger screens. This approach ensures optimal performance and usability on the devices most commonly used for travel planning.

**Key Principles**:
- Base styles target mobile viewport (320px minimum width)
- Progressive enhancement via media queries at 768px (tablet) and 1024px (desktop)
- Touch-friendly interaction targets on all screen sizes
- Responsive typography and spacing for readability

### Touch Target Optimization

All interactive elements meet WCAG 2.1 AA accessibility standards for minimum touch target sizes:

**Touch Target Requirements**:
- Minimum size: 44x44 pixels for all interactive elements
- Applied to: input fields, buttons, and clickable labels
- Achieved via: CSS padding and min-height properties
- Spacing: Adequate margins between targets to prevent mis-taps

**Implementation**:
```css
.form-input {
  min-height: 44px;
  padding: 12px;
  font-size: 16px; /* Prevents iOS zoom on focus */
}

.form-submit {
  min-height: 44px;
  padding: 12px 24px;
}
```

**Rationale**: The 16px font size on mobile inputs prevents iOS Safari from automatically zooming when focusing input fields, which disrupts the user experience. The 44px minimum touch target size ensures users can accurately tap form controls without frustration.

### Responsive Layout Patterns

The form layout adapts to different screen sizes using flexbox for flexible, maintainable responsive behavior:

**Mobile (Base, 320px+)**:
- Single-column layout for all fields
- Full-width inputs for easy touch interaction
- Vertical spacing between fields for clear visual separation
- Submit button spans full width for easy tapping

**Tablet (768px+)**:
- Form container max-width: 600px for optimal line length
- Two-column layout for related short fields (month and days)
- Full-width layout maintained for text-heavy fields (destination, party info)
- Horizontal centering for visual balance

**Desktop (1024px+)**:
- Form container max-width: 700px to prevent uncomfortably wide inputs
- Consistent two-column layout for compact fields
- Increased spacing for comfortable mouse interaction
- Submit button sized appropriately for desktop (not full-width)

**CSS Implementation Pattern**:
```css
/* Mobile-first base styles */
.itinerary-form {
  width: 100%;
  max-width: 100%;
}

/* Tablet enhancement */
@media (min-width: 768px) {
  .itinerary-form {
    max-width: 600px;
    margin: 0 auto;
  }

  .form-field--month,
  .form-field--days {
    width: calc(50% - 8px); /* Two-column for short fields */
  }
}

/* Desktop enhancement */
@media (min-width: 1024px) {
  .itinerary-form {
    max-width: 700px;
  }
}
```

### Error Message Display on Mobile

Error messages are optimized for mobile display to ensure users can read validation feedback without scrolling or zooming:

**Mobile Considerations**:
- Error text sized at 14px minimum for readability
- Adequate line-height (1.4) for multi-line messages
- Error messages appear directly below associated input for clear connection
- Word-wrap enabled to prevent horizontal scrolling
- Sufficient color contrast for outdoor/bright light reading

**Implementation**:
```css
.form-error {
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
  margin-top: 4px;
}
```

### BEM CSS Architecture

The form uses BEM (Block Element Modifier) naming convention for CSS classes, providing clear, maintainable styling that supports responsive behavior:

**Naming Pattern**:
- Block: `.itinerary-form` (the form container)
- Elements: `.form-field`, `.form-label`, `.form-input`, `.form-error`, `.form-submit`
- Modifiers: `.form-field--destination`, `.form-field--month`, `.form-field--days`, `.form-field--partyInfo`

**Benefits**:
- Clear relationship between component structure and styles
- Scoped class names prevent style conflicts
- Field-specific modifiers enable targeted responsive styling
- Easy to understand and maintain as the form evolves
- Supports component composition without style bleeding

**Example**:
```tsx
<div className="form-field form-field--destination">
  <label className="form-label" htmlFor="destination">Destination</label>
  <input className="form-input" type="text" id="destination" />
  {error && <span className="form-error" role="alert">{error}</span>}
</div>
```

### Responsive Testing Approach

The responsive implementation is validated through a combination of automated tests and manual verification:

**Automated Tests**:
- Verify CSS classes are properly applied to form elements
- Ensure form structure supports responsive layouts
- Confirm touch target elements are present
- Validate that functionality is preserved across all viewport sizes
- Check accessibility attributes remain intact with responsive classes

**Manual Verification**:
- Visual inspection across mobile (320px), tablet (768px), and desktop (1024px) viewports
- Touch interaction testing on real mobile devices
- Layout reflow verification at breakpoint boundaries
- Error message display testing on small screens

**Testing Pattern**:
```typescript
it('should apply responsive CSS classes to form elements', () => {
  const { container } = render(<ItineraryForm className="itinerary-form" ... />);
  const form = container.querySelector('form');
  expect(form).toHaveClass('itinerary-form');

  const fields = container.querySelectorAll('.form-field');
  expect(fields.length).toBeGreaterThan(0);
});
```

### Accessibility Preservation

Responsive design enhancements maintain all accessibility features established in the validation implementation:

**Preserved Features**:
- ARIA invalid attributes on error state
- ARIA describedby associations between inputs and error messages
- Role="alert" on error message containers
- Semantic HTML structure (label/input associations)
- Keyboard navigation support
- Screen reader compatibility

**Rationale**: Responsive styling is purely presentational and does not alter the semantic structure or accessibility features of the form. CSS classes are additive and work alongside existing ARIA attributes and semantic HTML.

## Future Enhancements

### Planned Improvements

**Autocomplete for Destination**:
- Integrate destination autocomplete API
- Validate against known destinations
- Improve input accuracy and user experience

**Date Picker for Month**:
- Replace text input with month/year picker
- Ensure valid month selection
- Improve mobile UX with native controls

**Dietary Restrictions Field**:
- Multi-select or checkbox group
- Structured data for better AI generation
- Maintain validation patterns established here

**Real-time Validation**:
- Validate on change for instant feedback
- Balance with not overwhelming users while typing
- Debounce validation calls for performance

### Maintaining Consistency

When adding new form fields:

1. Define validation function following pure function pattern
2. Add field to ValidationErrors interface
3. Implement onBlur handler using setFieldError
4. Add field validation to onSubmit comprehensive check
5. Include ARIA attributes (aria-invalid, aria-describedby, role="alert")
6. Document validation rules in this guide
7. Write comprehensive tests following existing patterns

## Testing Validation

All validation logic is fully tested in `src/components/ItineraryForm.test.tsx`:

**Test Coverage**:
- Each validation rule tested independently
- Error messages verified for accuracy
- onBlur and onSubmit behavior validated
- Loading state and error display tested
- Accessibility attributes verified
- Service integration with validation tested

**Test Pattern Example**:
```typescript
it('should display error when destination is less than 2 characters after blur', () => {
  render(<ItineraryForm ... />);

  const destinationInput = screen.getByLabelText(/destination/i);
  fireEvent.change(destinationInput, { target: { value: 'a' } });
  fireEvent.blur(destinationInput);

  expect(screen.getByText(/destination.*at least 2 characters/i)).toBeInTheDocument();
});
```

## Summary

The Trip Input Form implements comprehensive client-side validation with:
- Pure validation functions for testability and reusability
- Dual validation timing (onBlur + onSubmit) for optimal UX
- Structured error state management with immutability
- Full accessibility support via ARIA attributes
- Clear loading state indication during async operations
- Graceful error handling with retry capability

This validation approach balances user experience with data quality, ensuring users receive clear guidance while maintaining flexibility for future enhancements.
