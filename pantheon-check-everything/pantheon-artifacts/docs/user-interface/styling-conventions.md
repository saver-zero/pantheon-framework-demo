---
doc_id: user-interface-styling-conventions
title: "Styling Conventions Guide"
description: "Styling best practices and conventions including mandatory CSS class usage, design token requirements, BEM naming convention, container patterns, responsive design approach, and accessibility requirements for styling."
keywords: [styling, conventions, css-classes, bem, accessibility, design-tokens, anti-patterns]
relevance: "Use this document to understand required styling practices, naming conventions, and anti-patterns to avoid when creating or modifying UI components to ensure consistency and maintainability."
created: 2025-10-18 15:30 PDT
updated: 2025-10-18 15:30 PDT
---

# Styling Conventions Guide

## Overview

This document establishes mandatory styling conventions and best practices for the Travel Itinerary Generator application. Following these conventions ensures visual consistency, maintainability, accessibility, and prevents common styling anti-patterns.

All UI components must use CSS classes exclusively for styling, referencing design tokens defined in `src/index.css`. Inline styles and JavaScript style objects are prohibited except in rare, justified cases.

## Core Principles

### 1. CSS Classes Only

**Rule**: All component styling must use CSS classes. Inline styles and JavaScript style objects are not permitted.

**Rationale**: CSS classes provide separation of concerns, better performance, easier maintenance, and support for pseudo-classes and media queries that inline styles cannot provide.

**Anti-Pattern** (Inline styles):
```tsx
// ❌ WRONG - Inline styles
<div style={{ padding: '16px', backgroundColor: '#646cff' }}>
  Content
</div>
```

**Anti-Pattern** (JavaScript style objects):
```tsx
// ❌ WRONG - JavaScript style objects
const styles = {
  container: {
    padding: '16px',
    backgroundColor: '#646cff'
  }
};

<div style={styles.container}>Content</div>
```

**Correct Pattern** (CSS classes):
```tsx
// ✅ CORRECT - CSS classes
<div className="card-container">Content</div>

// In index.css:
.card-container {
  padding: var(--spacing-md);
  background-color: var(--color-primary);
}
```

**Justified Exceptions**: Inline styles are permitted only for:
- Dynamic positioning calculated at runtime (e.g., tooltip coordinates)
- Third-party library requirements that mandate inline styles
- Values that must be computed from props and cannot be represented as CSS classes

All exceptions require documentation explaining why CSS classes are insufficient.

### 2. Design Token Requirement

**Rule**: All colors, spacing, font sizes, shadows, and visual effects must use CSS custom properties (design tokens). Hardcoded values are not permitted.

**Rationale**: Design tokens ensure consistency, enable theming, simplify maintenance, and provide a single source of truth for design decisions.

**Anti-Pattern** (Hardcoded values):
```css
/* ❌ WRONG - Hardcoded colors and spacing */
.button {
  background-color: #646cff;
  padding: 12px 16px;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
```

**Correct Pattern** (Design tokens):
```css
/* ✅ CORRECT - Design token variables */
.button {
  background-color: var(--color-primary);
  padding: var(--spacing-input) var(--spacing-md);
  font-size: var(--font-size-base);
  box-shadow: var(--shadow-md);
}
```

**Available Token Categories**:
- Colors: `--color-primary`, `--color-text`, `--color-surface`, etc.
- Spacing: `--spacing-xs` through `--spacing-2xl`
- Typography: `--font-size-xs` through `--font-size-3xl`, `--font-weight-normal` through `--font-weight-bold`
- Effects: `--shadow-sm` through `--shadow-lg`, `--radius-sm` through `--radius-lg`
- Transitions: `--transition-fast`, `--transition-normal`, `--transition-slow`

See [Design System Guide](./design-system.md) for complete token reference.

### 3. BEM Naming Convention

**Rule**: CSS class names must follow BEM (Block Element Modifier) methodology for component-specific classes.

**BEM Structure**:
- **Block**: Independent component (`.history-item`)
- **Element**: Part of a block (`.history-item__header`, `.history-item__destination`)
- **Modifier**: Variation of block or element (`.nav-button--active`, `.form-input--error`)

**Syntax**:
- Block: `.block-name`
- Element: `.block-name__element-name`
- Modifier: `.block-name--modifier-name`

**Correct Pattern**:
```tsx
<li className="history-item">
  <div className="history-item__container">
    <div className="history-item__header">
      <strong className="history-item__destination">Tokyo</strong>
      <span className="history-item__position">#1</span>
    </div>
    <div className="history-item__details">
      <span>5 days</span>
    </div>
  </div>
</li>

/* CSS */
.history-item {
  /* Block styles */
}

.history-item__header {
  /* Element styles */
}

.history-item__destination {
  /* Element styles */
}
```

**Benefits**:
- Clear visual hierarchy in HTML
- Self-documenting class names
- Avoids naming conflicts
- Easy to identify relationships

**Utility Classes**: Generic utility classes (`.container`, `.btn`, `.loading-indicator`) don't need BEM structure as they represent reusable patterns, not component-specific elements.

## Container and Layout Patterns

### Container Pattern

**Rule**: Content containers must use the `.container` class with appropriate modifiers for consistent width constraints and centering.

**Pattern**:
```tsx
<div className="container container--narrow">
  <h1>Page Content</h1>
</div>

/* CSS */
.container {
  width: 100%;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--spacing-md);
}

.container--narrow {
  max-width: var(--container-narrow);
}
```

**Rationale**: Prevents content from stretching too wide on large screens, maintains comfortable reading width, and ensures consistent padding.

**Available Container Modifiers**:
- `.container--narrow`: For readable text width (800px max)
- No modifier: For general content (1200px max)

### Layout Spacing

**Rule**: Use design token spacing variables with consistent application throughout components.

**Pattern**:
```css
.history-item {
  padding: var(--spacing-md);           /* Internal spacing */
  margin-bottom: var(--spacing-input);  /* Space between items */
}

.history-item__container {
  gap: var(--spacing-sm);               /* Gap between flex children */
}
```

**Consistency Guideline**: If a component uses `--spacing-md` for padding, use `--spacing-md` for related gaps and margins within that component to maintain visual harmony.

## Responsive Design Approach

### Mobile-First Development

**Rule**: Write base styles for mobile devices, then add enhancements for larger screens using min-width media queries.

**Pattern**:
```css
/* Mobile styles (base) */
.form-field {
  width: 100%;
  margin-bottom: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .form-field {
    width: calc(50% - 0.5rem);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .form-field {
    margin-bottom: 1.25rem;
  }
}
```

**Rationale**: Mobile-first ensures performance on smaller devices, provides progressive enhancement, and aligns with modern web development practices.

**Standard Breakpoints**:
- Mobile: Base styles (< 768px)
- Tablet: `@media (min-width: 768px)`
- Desktop: `@media (min-width: 1024px)`

### Touch Target Sizing

**Rule**: All interactive elements must meet minimum touch target size of 44x44px for accessibility.

**Pattern**:
```css
.btn {
  min-height: 44px;
  min-width: 44px;
  padding: var(--spacing-sm) var(--spacing-md);
}

.nav-button {
  min-height: 44px;
  font-size: var(--font-size-base);
}
```

**Rationale**: WCAG 2.1 Level AAA requires minimum 44x44px touch targets. This ensures usability on mobile devices and accessibility for users with motor impairments.

### Font Size for Mobile

**Rule**: Base font size must be at least 16px to prevent zoom on mobile browsers.

**Pattern**:
```css
.form-input {
  font-size: 16px;  /* Prevents iOS zoom on focus */
}
```

**Rationale**: iOS Safari zooms the page when focusing inputs with font-size < 16px, creating poor user experience.

## Accessibility Requirements for Styling

### Focus States

**Rule**: All interactive elements must have visible focus states using design token colors.

**Pattern**:
```css
.form-input:focus {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

.btn:focus,
.btn:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
```

**Testing**: Tab through the interface to verify all interactive elements show clear focus indicators.

### Color Contrast

**Rule**: Text must meet WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text).

**Verification**: All design token color combinations have been verified for contrast in both light and dark modes.

**Usage**: Use semantic color tokens (--color-text, --color-text-secondary) which are pre-verified for contrast rather than creating custom color combinations.

### Motion Preferences

**Rule**: Respect prefers-reduced-motion media query by disabling or reducing animations.

**Pattern**:
```css
.loading-indicator {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@media (prefers-reduced-motion: reduce) {
  .loading-indicator {
    animation: none;
  }

  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Rationale**: Users with vestibular disorders or motion sensitivity can experience discomfort from animations. Respecting this preference is a WCAG requirement.

### Semantic HTML with Proper Styling

**Rule**: Use semantic HTML elements and enhance with CSS classes rather than using generic divs with styling to simulate semantic elements.

**Anti-Pattern**:
```tsx
// ❌ WRONG - Div styled as heading
<div className="heading-style">Section Title</div>
```

**Correct Pattern**:
```tsx
// ✅ CORRECT - Semantic element with styling
<h2 className="section-heading">Section Title</h2>
```

**Rationale**: Semantic HTML provides accessibility for screen readers, better SEO, and clearer document structure.

## Component-Specific Patterns

### Button Styling

**Rule**: Use base `.btn` class with variant classes for different button types.

**Pattern**:
```tsx
<button className="btn btn-primary">Primary Action</button>
<button className="btn btn-danger">Delete</button>
<button className="nav-button nav-button--active">Active Tab</button>
```

**Available Button Classes**:
- `.btn`: Base button styles (use with variant)
- `.btn-primary`: Primary action buttons (uses --color-primary)
- `.btn-danger`: Destructive actions like delete (uses --color-error)
- `.nav-button`: Navigation/tab buttons
- `.nav-button--active`: Active tab state

**Never**: Create custom button styles. Extend the existing button system with new variants if needed.

### Card/List Item Styling

**Rule**: Cards use consistent elevation pattern with surface background, border, subtle shadow, and enhanced hover state.

**Pattern**:
```css
.history-item {
  padding: var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  box-shadow: var(--shadow-sm);
  transition: background-color var(--transition-fast),
              box-shadow var(--transition-fast),
              transform var(--transition-fast);
}

.history-item:hover {
  background-color: var(--color-background-elevated);
  box-shadow: var(--shadow-lg);
  transform: translateY(-1px);
}
```

**Hover Effects**: Combine three changes for satisfying hover feedback:
1. Lighter background (--color-background-elevated)
2. Increased shadow (--shadow-lg)
3. Subtle upward movement (translateY(-1px))

### Form Input Styling

**Rule**: Form inputs inherit colors for theme support and show clear focus states.

**Pattern**:
```css
.form-input {
  width: 100%;
  min-height: 44px;
  padding: var(--spacing-input);
  font-size: 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background-color: inherit;     /* Inherits for dark mode */
  color: inherit;                /* Inherits for dark mode */
  transition: background-color var(--transition-normal),
              border-color var(--transition-normal);
}

.form-input:focus {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
  background-color: var(--color-background-elevated);
}

.form-input.error {
  border-color: var(--color-error);
  outline-color: var(--color-error);
}
```

**Color Inheritance**: Use `background-color: inherit` and `color: inherit` to automatically adapt to theme without hardcoding colors.

### Empty State Styling

**Rule**: Empty states use welcoming presentation with comfortable padding and muted colors.

**Pattern**:
```css
.history-empty-state {
  text-align: center;
  padding: var(--spacing-2xl) var(--spacing-xl);
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
}
```

## Anti-Patterns to Avoid

### Inline Styles

**Anti-Pattern**:
```tsx
// ❌ NEVER DO THIS
<div style={{ padding: '16px', color: '#646cff' }}>
  Content
</div>
```

**Why Avoid**: Inline styles cannot use pseudo-classes, media queries, or design tokens. They create maintenance burden and prevent theming.

### JavaScript Style Objects

**Anti-Pattern**:
```tsx
// ❌ NEVER DO THIS
const styles = {
  container: {
    padding: '16px',
    backgroundColor: '#646cff'
  }
};

<div style={styles.container}>Content</div>
```

**Why Avoid**: Hardcodes values, breaks dark mode, prevents hover/focus states, and mixes styling logic with component logic.

### Hardcoded Colors

**Anti-Pattern**:
```css
/* ❌ NEVER DO THIS */
.card {
  background-color: #fff;
  color: #212529;
}
```

**Why Avoid**: Breaks dark mode, creates inconsistent colors, prevents theme changes, and violates single source of truth principle.

### Mixing Approaches

**Anti-Pattern**:
```tsx
// ❌ NEVER DO THIS - Mixing CSS classes and inline styles
<div className="card" style={{ padding: '16px' }}>
  Content
</div>
```

**Why Avoid**: Creates confusion about where styles are defined, makes maintenance difficult, and indicates inconsistent approach.

### One-Off Custom Styles

**Anti-Pattern**:
```css
/* ❌ AVOID - Single-use custom values */
.special-button {
  background-color: #6b72ff;  /* Slightly different from primary */
  padding: 11px 15px;         /* Custom spacing */
}
```

**Why Avoid**: Creates visual inconsistency, maintenance burden, and undermines design system. If you need a new variant, create it properly with design tokens.

**Correct Approach**: Use existing design tokens. If truly needed, add new token to design system and use it consistently.

## Code Review Checklist

When reviewing styling changes, verify:

- [ ] No inline styles except for justified exceptions with documentation
- [ ] No JavaScript style objects
- [ ] All colors use design token variables (no hardcoded hex/rgb values)
- [ ] All spacing uses design token variables (no pixel values)
- [ ] All font sizes use design token variables
- [ ] BEM naming convention followed for component-specific classes
- [ ] Interactive elements meet 44x44px minimum touch target
- [ ] Focus states are visible and use design token colors
- [ ] Animations respect prefers-reduced-motion
- [ ] Mobile-first responsive design (base styles for mobile, enhancements for desktop)
- [ ] Tested in both light and dark modes
- [ ] Semantic HTML used appropriately

## Migration Path

When encountering legacy code with inline styles or JavaScript style objects:

1. **Identify the values**: Note all colors, spacing, fonts used
2. **Map to design tokens**: Find appropriate design token variables
3. **Create CSS classes**: Define classes in index.css using design tokens
4. **Replace in component**: Change `style={}` to `className=""`
5. **Test both themes**: Verify appearance in light and dark modes
6. **Remove style objects**: Delete JavaScript style object definitions

**Example Migration**:

```tsx
// Before (anti-pattern)
const styles = {
  card: {
    padding: '16px',
    backgroundColor: '#1a1a1a',
    border: '1px solid rgba(255, 255, 255, 0.12)'
  }
};

<div style={styles.card}>Content</div>

// After (correct pattern)
<div className="card">Content</div>

// In index.css
.card {
  padding: var(--spacing-md);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
}
```

## Related Documentation

- **[Design System Guide](./design-system.md)**: Complete design token reference
- **[History View Guide](./history-view-guide.md)**: Example of CSS class-based component
- **[Form Validation Guide](./form-validation-guide.md)**: Form component styling patterns
