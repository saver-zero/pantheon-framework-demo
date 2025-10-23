---
doc_id: user-interface-design-system
title: "Design System Guide"
description: "Comprehensive design system documentation covering CSS custom properties-based design tokens, color palette, spacing scale, typography system, component patterns, and theming approach."
keywords: [design-system, design-tokens, css-variables, typography, spacing, colors, theming, dark-mode]
relevance: "Use this document to understand the design token system, available CSS variables, color palette, spacing values, typography scales, and how to apply design tokens when creating or modifying UI components."
created: 2025-10-18 15:30 PDT
updated: 2025-10-18 15:30 PDT
---

# Design System Guide

## Overview

The Travel Itinerary Generator uses a CSS custom properties-based design token system to ensure visual consistency, maintainability, and automatic theming support across the entire application. This design system provides a single source of truth for all visual design decisions including colors, spacing, typography, and visual effects.

All design tokens are defined as CSS custom properties in `src/index.css` within the `:root` selector, making them globally available to all components. The system supports both light and dark modes through CSS media queries without requiring JavaScript intervention.

## Design Token Philosophy

### Benefits of Design Tokens

1. **Consistency**: All components use the same color, spacing, and typography values, creating cohesive visual design
2. **Maintainability**: Changing a design value once updates all components using that token
3. **Theming**: Light and dark modes work automatically by redefining token values in media queries
4. **Semantic Naming**: Tokens use purpose-based names (--color-primary, --spacing-md) instead of literal names (--blue, --16px)
5. **Type Safety**: CSS variables provide compile-time safety when using TypeScript with typed-css or similar tooling

### Token Usage Principle

**Always use design tokens**. Never hardcode colors, spacing values, font sizes, or other design values directly in component CSS or inline styles. Every visual property should reference a design token variable.

**Anti-Pattern** (Hardcoded values):
```css
.button {
  background-color: #646cff;
  padding: 12px 16px;
  font-size: 16px;
}
```

**Correct Pattern** (Design tokens):
```css
.button {
  background-color: var(--color-primary);
  padding: var(--spacing-input) var(--spacing-md);
  font-size: var(--font-size-base);
}
```

## Color Palette

### Color Token Categories

The design system organizes colors into semantic categories:

1. **Brand Colors**: Primary and secondary colors for key UI elements
2. **Neutral Colors**: Text, backgrounds, and borders
3. **Semantic Colors**: Error, warning, success states
4. **Interaction Colors**: Hover, active, and focus states

### Brand Colors (Dark Mode Default)

```css
--color-primary: #646cff;           /* Primary action color (buttons, links, accents) */
--color-primary-hover: #535bf2;     /* Primary hover state */
--color-primary-active: #4248d4;    /* Primary active/pressed state */
--color-secondary: #7c8aff;         /* Secondary accents */
```

**Usage**: Use primary colors for CTAs, navigation active states, and key interactive elements. Secondary colors provide variation for less prominent actions.

### Neutral Colors (Dark Mode Default)

```css
--color-text: rgba(255, 255, 255, 0.87);        /* Primary text color */
--color-text-secondary: rgba(255, 255, 255, 0.60);  /* Secondary/muted text */
--color-background: #242424;                     /* Page background */
--color-background-elevated: #2a2a2a;            /* Elevated surfaces (hover states) */
--color-surface: #1a1a1a;                        /* Card/container backgrounds */
--color-border: rgba(255, 255, 255, 0.12);       /* Default border color */
--color-border-focus: #646cff;                   /* Focus ring color */
```

**Usage**: Text colors provide hierarchy (primary for body text, secondary for metadata). Background colors create depth (surface is darkest, background is mid-tone, elevated is lightest for dark mode).

### Semantic Colors

```css
--color-error: #ef5350;             /* Error states, destructive actions */
--color-error-hover: #e53935;       /* Error hover state */
--color-warning: #ff9800;           /* Warning messages */
--color-success: #66bb6a;           /* Success states, confirmations */
```

**Usage**: Error for validation messages and delete buttons, warning for cautionary messages, success for confirmations and positive feedback.

### Light Mode Color Overrides

Light mode colors are defined in a media query that overrides dark mode defaults:

```css
@media (prefers-color-scheme: light) {
  :root {
    --color-primary: #5a67d8;
    --color-text: #213547;
    --color-background: #ffffff;
    --color-surface: #f9f9f9;
    /* ... additional overrides */
  }
}
```

All color tokens are redefined for light mode to ensure proper contrast and readability. The media query automatically applies based on user system preferences.

## Spacing Scale

### Base Unit System

The spacing scale uses a base unit of 8px for touch-friendly spacing, following iOS and Material Design guidelines:

```css
--spacing-xs: 0.25rem;      /* 4px - Tight spacing within elements */
--spacing-sm: 0.5rem;       /* 8px - Small gaps, list item spacing */
--spacing-md: 1rem;         /* 16px - Standard spacing between sections */
--spacing-lg: 1.5rem;       /* 24px - Large spacing, heading margins */
--spacing-xl: 2rem;         /* 32px - Extra large spacing, section separators */
--spacing-2xl: 3rem;        /* 48px - Maximum spacing, page sections */
```

### Semantic Spacing Tokens

Specific use-case tokens provide clearer intent:

```css
--spacing-section: var(--spacing-xl);    /* Spacing between major sections */
--spacing-card: var(--spacing-md);       /* Card internal padding */
--spacing-input: 0.75rem;                /* Input field padding (12px for comfortable touch targets) */
```

**Usage Guidelines**:
- Use --spacing-xs for tight spacing within a component (e.g., gap between icon and text)
- Use --spacing-sm for list item margins, small gaps between related elements
- Use --spacing-md for standard margins, padding, and gaps
- Use --spacing-lg for heading margins, section padding
- Use --spacing-xl and --spacing-2xl for major section separators

**Consistency Rule**: Prefer using the same spacing token throughout a component. For example, if a card uses --spacing-md for padding, use --spacing-md for gaps between card content as well.

## Typography System

### Font Size Scale

The typography scale provides a modular size progression:

```css
--font-size-xs: 0.75rem;      /* 12px - Very small text, badges */
--font-size-sm: 0.875rem;     /* 14px - Small text, captions, metadata */
--font-size-base: 1rem;       /* 16px - Body text (base size) */
--font-size-lg: 1.125rem;     /* 18px - Large body text, emphasis */
--font-size-xl: 1.25rem;      /* 20px - Small headings (h5, h6) */
--font-size-2xl: 1.5rem;      /* 24px - Medium headings (h3, h4) */
--font-size-3xl: 2rem;        /* 32px - Large headings (h1, h2) */
```

**Note**: Base font size is 16px to ensure accessibility. Never reduce base font size below 16px as it can trigger zoom on mobile devices.

### Font Weight Scale

```css
--font-weight-normal: 400;      /* Regular text */
--font-weight-medium: 500;      /* Slightly emphasized text, labels */
--font-weight-semibold: 600;    /* Emphasized text, subheadings */
--font-weight-bold: 700;        /* Strong emphasis, main headings */
```

**Usage**: Body text uses normal, labels use medium, subheadings use semibold, main headings use bold.

### Line Height Scale

```css
--line-height-tight: 1.1;       /* Headings (minimize vertical space) */
--line-height-normal: 1.5;      /* Body text (balanced readability) */
--line-height-relaxed: 1.75;    /* Long-form content (maximum readability) */
```

**Usage**: Headings use tight line-height to reduce vertical space, body text uses normal for comfortable reading, long-form markdown content uses relaxed for maximum readability.

### Heading Hierarchy

Headings follow a clear hierarchy with consistent sizing, weights, and margins:

```css
h1 {
  font-size: var(--font-size-3xl);      /* 32px */
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  margin-top: 0;
  margin-bottom: var(--spacing-md);
}

h2 {
  font-size: var(--font-size-2xl);      /* 24px */
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-sm);
}

h3 {
  font-size: var(--font-size-xl);       /* 20px */
  font-weight: var(--font-weight-semibold);
  /* ... */
}
```

**First-Child Rule**: All headings have `margin-top: 0` when they are the first child of a container to prevent unnecessary top spacing.

## Visual Effects

### Shadows

Shadows create depth and elevation:

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2);    /* Subtle elevation (cards at rest) */
--shadow-md: 0 2px 4px rgba(0, 0, 0, 0.3);    /* Moderate elevation (hover states) */
--shadow-lg: 0 4px 8px rgba(0, 0, 0, 0.4);    /* Strong elevation (active/lifted states) */
```

**Light Mode Shadows**: Light mode uses lighter shadows with reduced opacity:

```css
@media (prefers-color-scheme: light) {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 4px 8px rgba(0, 0, 0, 0.15);
}
```

**Usage**: Apply --shadow-sm to cards and containers at rest, increase to --shadow-md on hover, use --shadow-lg for active/pressed states.

### Border Radius

```css
--radius-sm: 4px;       /* Small radius (buttons, inputs) */
--radius-md: 8px;       /* Medium radius (cards, containers) */
--radius-lg: 12px;      /* Large radius (prominent elements) */
```

**Usage**: Use consistent border-radius throughout related components. Buttons and inputs use --radius-sm, cards use --radius-md.

### Transitions

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);      /* Quick interactions (hover) */
--transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);    /* Standard transitions (colors) */
--transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);      /* Slow transitions (layout changes) */
```

**Cubic-Bezier Easing**: The easing function (0.4, 0, 0.2, 1) creates smooth, natural-feeling transitions with slight acceleration and deceleration.

**Usage**:
- --transition-fast for hover states, focus rings
- --transition-normal for color changes, background changes
- --transition-slow for layout shifts, size changes

**Accessibility**: All transitions are disabled in prefers-reduced-motion media query for users with motion sensitivity.

## Container System

### Container Width Tokens

```css
--container-max-width: 1200px;     /* Maximum content width for wide screens */
--container-narrow: 800px;         /* Narrow content (reading width) */
--container-form: 700px;           /* Form container width */
```

**Usage**: Apply max-width to main content containers to prevent line lengths from becoming too long on wide screens.

### Container Classes

```css
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

**Pattern**: Containers use 100% width with max-width constraints and auto margins for centering.

## Component Patterns

### Button Styles

Buttons follow a consistent pattern with base styles and variant classes:

```css
.btn {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  min-height: 44px;      /* Touch target minimum */
  min-width: 44px;
  transition: background-color var(--transition-fast),
              transform var(--transition-fast);
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-background);
}

.btn-danger {
  background-color: var(--color-error);
  color: var(--color-background);
}
```

**Usage**: Apply `.btn` base class with a variant class (`.btn-primary`, `.btn-danger`). Never create custom button styles; extend the system instead.

### Card Styles

Cards use consistent elevation and spacing:

```css
.history-item {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-input);
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

**Pattern**: Cards have surface background, border, subtle shadow, and enhanced hover state with larger shadow and slight upward movement.

### Form Input Styles

Form inputs follow a consistent pattern with focus states:

```css
.form-input {
  width: 100%;
  min-height: 44px;
  padding: var(--spacing-input);
  font-size: 16px;      /* Prevents iOS zoom */
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background-color: inherit;
  color: inherit;
  transition: background-color var(--transition-normal),
              border-color var(--transition-normal),
              outline var(--transition-fast);
}

.form-input:focus {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
  background-color: var(--color-background-elevated);
}
```

**Pattern**: Inputs use 16px font size to prevent zoom on iOS, inherit colors for theme support, and show clear focus states with outline and background change.

## Dark Mode Theming

### Automatic Theme Switching

The design system automatically switches between light and dark themes based on user system preferences:

```css
:root {
  /* Dark mode defaults */
  --color-primary: #646cff;
  --color-background: #242424;
  /* ... */
}

@media (prefers-color-scheme: light) {
  :root {
    /* Light mode overrides */
    --color-primary: #5a67d8;
    --color-background: #ffffff;
    /* ... */
  }
}
```

### Theme Inheritance

Components automatically inherit the correct theme colors without JavaScript by using CSS variables:

```css
.card {
  background-color: var(--color-surface);   /* Automatically uses #1a1a1a in dark, #f9f9f9 in light */
  color: var(--color-text);                 /* Automatically uses white in dark, #213547 in light */
}
```

**No JavaScript Required**: Theme switching is purely CSS-based. No React state, no context providers, no manual class toggling.

## Best Practices

### Adding New Styles

When adding new styles to components:

1. **Check Existing Tokens**: Review the design token list to find appropriate values
2. **Use Semantic Tokens**: Prefer semantic tokens (--color-primary) over specific tokens
3. **No Hardcoded Values**: Never use hardcoded colors, sizes, or spacing
4. **Maintain Consistency**: Use the same spacing scale throughout a component
5. **Test Both Themes**: Verify styles work in both light and dark modes

### Creating New Tokens

When existing tokens don't fit your needs:

1. **Verify Need**: Confirm you can't use existing tokens with slight adjustments
2. **Semantic Naming**: Use purpose-based names, not literal values
3. **Add to :root**: Define in `:root` selector in index.css
4. **Light Mode Override**: Add corresponding value in light mode media query
5. **Document**: Update this design system guide with the new token

### Anti-Patterns to Avoid

**DON'T**:
- Use inline styles with hardcoded values
- Create JavaScript style objects with colors or spacing
- Use pixel values directly in CSS
- Mix hardcoded values with design tokens
- Create one-off tokens for single-use cases

**DO**:
- Use CSS classes with design token variables
- Reuse existing component patterns when possible
- Add new tokens when patterns emerge across multiple components
- Test in both light and dark modes
- Respect prefers-reduced-motion for animations

## Related Documentation

- **[Styling Conventions Guide](./styling-conventions.md)**: Best practices and anti-patterns for component styling
- **[History View Guide](./history-view-guide.md)**: Example of CSS class-based component styling
- **[Form Validation Guide](./form-validation-guide.md)**: Form component styling patterns
