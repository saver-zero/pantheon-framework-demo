---
doc_id: user-interface-markdown-rendering
title: "Markdown Rendering Guide"
description: "Guide for rendering markdown itineraries in the frontend using react-markdown, including configuration, styling, and accessibility"
keywords: [react-markdown, markdown, rendering, frontend, accessibility, styling, remark-gfm]
relevance: "Use this document when implementing markdown rendering in components, configuring react-markdown, or troubleshooting rendering issues."
created: 2025-10-17
updated: 2025-10-17
---

# Markdown Rendering Guide

## Introduction

The Travel Itinerary Generator renders markdown-formatted itineraries using the `react-markdown` library. This document explains why markdown rendering replaced structured component hierarchies, how to configure `react-markdown`, styling strategies, accessibility considerations, and handling edge cases.

### Architectural Context

**Previous Approach (JSON-based)**:
- Backend returned structured JSON matching `Itinerary` TypeScript types
- Frontend used nested React components (`DayView`, `TimePeriodView`, `ActivityView`)
- Each component rendered specific fields from JSON objects
- Styling and structure tightly coupled to JSON schema

**Current Approach (Markdown-based)**:
- Backend returns plain markdown strings
- Frontend uses `react-markdown` to convert markdown to React components
- Rendering logic delegated to battle-tested library
- Styling applied via CSS classes and custom component mappings

### Why This Change?

1. **Simpler Pipeline**: No JSON parsing, schema validation, or type assertions
2. **Better Content Quality**: Claude generates more natural, detailed content in markdown
3. **Separation of Concerns**: Content structure (markdown) separated from presentation (CSS)
4. **Flexibility**: Markdown format can evolve without frontend code changes
5. **Accessibility**: `react-markdown` produces semantic HTML with proper heading hierarchy

## Library Overview: react-markdown

### Installation

```bash
npm install react-markdown remark-gfm
```

**Dependencies**:
- `react-markdown`: Core markdown rendering library for React
- `remark-gfm`: GitHub Flavored Markdown plugin (tables, strikethrough, task lists)

### Basic Usage

```tsx
import ReactMarkdown from 'react-markdown';

function ItineraryDisplay({ markdown }: { markdown: string }) {
  return (
    <div className="itinerary-container">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
```

**How It Works**:
1. `react-markdown` parses markdown string into an AST (Abstract Syntax Tree)
2. AST is transformed into React elements
3. Default or custom components render each element type
4. Result is semantic HTML matching markdown structure

### Markdown to HTML Mapping

| Markdown Syntax | React Component | HTML Output |
|----------------|-----------------|-------------|
| `## Day 1` | Default | `<h2>Day 1</h2>` |
| `### Morning` | Default | `<h3>Morning</h3>` |
| `- Activity` | Default | `<ul><li>Activity</li></ul>` |
| `**Bold text**` | Default | `<strong>Bold text</strong>` |
| `[Link](url)` | Default | `<a href="url">Link</a>` |
| `` `code` `` | Default | `<code>code</code>` |
| Tables (GFM) | remark-gfm | `<table>...</table>` |

## Configuration with remark-gfm

### Why remark-gfm?

GitHub Flavored Markdown (GFM) adds useful features not in standard markdown:
- **Tables**: For structured data like pricing or schedules
- **Strikethrough**: ~~Canceled activities~~
- **Task Lists**: - [ ] Pack suitcase
- **Autolinks**: Automatically convert URLs to links

### Configuration Example

```tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ItineraryDisplay({ markdown }: { markdown: string }) {
  return (
    <div className="itinerary-container">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
```

**Without remark-gfm**: Tables render as plain text
**With remark-gfm**: Tables become `<table>` elements with proper structure

## Custom Component Mapping

### Default vs Custom Components

By default, `react-markdown` uses standard HTML elements. You can override any element type with custom React components for enhanced styling or behavior.

### Example: Custom Headings with Icons

```tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ItineraryDisplay({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Custom h2 for day headings
        h2: ({ node, ...props }) => (
          <h2 className="day-heading" {...props}>
            📅 {props.children}
          </h2>
        ),

        // Custom h3 for time periods
        h3: ({ node, ...props }) => {
          const text = String(props.children);
          const icon =
            text.includes('Morning') ? '🌅' :
            text.includes('Afternoon') ? '☀️' :
            text.includes('Evening') ? '🌆' :
            text.includes('Night') ? '🌙' : '';

          return (
            <h3 className="time-period-heading" {...props}>
              {icon} {props.children}
            </h3>
          );
        },

        // Custom list items with checkboxes for interactive features
        li: ({ node, checked, ...props }) => (
          <li className={checked !== null ? 'task-item' : 'activity-item'} {...props}>
            {props.children}
          </li>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
```

### Available Component Overrides

You can override any of these elements:

```typescript
{
  a: CustomLink,
  blockquote: CustomBlockquote,
  code: CustomCodeBlock,
  h1: CustomH1,
  h2: CustomH2,
  h3: CustomH3,
  h4: CustomH4,
  h5: CustomH5,
  h6: CustomH6,
  img: CustomImage,
  li: CustomListItem,
  ol: CustomOrderedList,
  p: CustomParagraph,
  pre: CustomPre,
  strong: CustomStrong,
  table: CustomTable,
  ul: CustomUnorderedList,
  // ... and more
}
```

## Styling Strategies

### Approach 1: CSS Classes (Recommended)

Apply styling through CSS classes on wrapper and default elements.

```tsx
function ItineraryDisplay({ markdown }: { markdown: string }) {
  return (
    <div className="itinerary-container">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
```

```css
/* itinerary.css */
.itinerary-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
}

.itinerary-container h2 {
  color: #2563eb;
  border-bottom: 2px solid #dbeafe;
  padding-bottom: 0.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.itinerary-container h3 {
  color: #4b5563;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.itinerary-container ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 0.5rem 0;
}

.itinerary-container li {
  margin-bottom: 0.5rem;
}

.itinerary-container strong {
  color: #1f2937;
  font-weight: 600;
}

.itinerary-container a {
  color: #2563eb;
  text-decoration: underline;
}

.itinerary-container a:hover {
  color: #1d4ed8;
}

/* Responsive design */
@media (max-width: 768px) {
  .itinerary-container {
    padding: 1rem;
  }

  .itinerary-container h2 {
    font-size: 1.5rem;
  }

  .itinerary-container h3 {
    font-size: 1.25rem;
  }
}
```

### Approach 2: Inline Styles with Custom Components

For dynamic styling based on content.

```tsx
components={{
  h2: ({ node, ...props }) => {
    const dayNumber = String(props.children).match(/Day (\d+)/)?.[1];
    const color = dayNumber ? `hsl(${(Number(dayNumber) * 30) % 360}, 70%, 50%)` : '#2563eb';

    return (
      <h2 style={{ color, borderBottom: `2px solid ${color}40`, paddingBottom: '0.5rem' }} {...props} />
    );
  },
}}
```

### Approach 3: CSS Modules

For scoped styling without global CSS pollution.

```tsx
import ReactMarkdown from 'react-markdown';
import styles from './ItineraryDisplay.module.css';

function ItineraryDisplay({ markdown }: { markdown: string }) {
  return (
    <div className={styles.container}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
```

```css
/* ItineraryDisplay.module.css */
.container h2 {
  color: #2563eb;
  border-bottom: 2px solid #dbeafe;
}

.container h3 {
  color: #4b5563;
}
```

## Accessibility Considerations

### Semantic HTML Structure

`react-markdown` automatically generates semantic HTML:
- Headings maintain proper hierarchy (h2 → h3 → h4)
- Lists use `<ul>`, `<ol>`, and `<li>` elements
- Links have proper `href` attributes
- Strong/em elements for emphasis

### Best Practices

1. **Heading Hierarchy**: Ensure markdown uses proper heading levels
   - ✅ `## Day 1` → `### Morning` (h2 → h3)
   - ❌ `## Day 1` → `##### Morning` (h2 → h5, skips levels)

2. **Alt Text for Images**: If itineraries include images
   ```markdown
   ![Tokyo Tower at sunset](image-url.jpg)
   ```
   Renders as: `<img src="..." alt="Tokyo Tower at sunset" />`

3. **Link Context**: Ensure link text is descriptive
   - ✅ `[Visit the official Tokyo Tower website](url)`
   - ❌ `[Click here](url)` for more information

4. **Color Contrast**: Maintain WCAG AA contrast ratios
   ```css
   .itinerary-container h2 {
     color: #1e40af; /* Darker blue for better contrast */
   }
   ```

5. **Keyboard Navigation**: Links and interactive elements are keyboard accessible by default

### ARIA Enhancements

For custom components, add ARIA attributes:

```tsx
components={{
  h2: ({ node, ...props }) => (
    <h2
      className="day-heading"
      role="heading"
      aria-level="2"
      {...props}
    />
  ),
}}
```

### Screen Reader Considerations

- **Heading Navigation**: Screen readers can jump between headings
- **List Semantics**: "List of X items" announced automatically
- **Link Announcements**: "Link, [link text]" announced for each link

## Handling Edge Cases

### Empty or Null Markdown

```tsx
function ItineraryDisplay({ markdown }: { markdown: string | null }) {
  if (!markdown) {
    return (
      <div className="empty-state">
        <p>No itinerary available. Generate one using the form above.</p>
      </div>
    );
  }

  return (
    <div className="itinerary-container">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
```

### Whitespace-Only Markdown

```tsx
function ItineraryDisplay({ markdown }: { markdown: string }) {
  const trimmed = markdown.trim();

  if (!trimmed) {
    return (
      <div className="empty-state">
        <p>The itinerary is empty. Please try generating again.</p>
      </div>
    );
  }

  return (
    <div className="itinerary-container">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {trimmed}
      </ReactMarkdown>
    </div>
  );
}
```

### Malformed Markdown

`react-markdown` gracefully handles malformed markdown:
- Unmatched heading markers render as plain text
- Broken list syntax renders with default formatting
- Unclosed emphasis markers render literally

**Example**:
```markdown
## Day 1

### Morning - note the missing closing **bold**
- Activity 1
- Activity 2 [broken link](
```

**Renders**: Markup errors are visible but don't crash the component.

### XSS Prevention and Security

`react-markdown` **automatically sanitizes** HTML by default:
- Raw HTML tags in markdown are escaped (not executed)
- JavaScript in href attributes is blocked
- No XSS vulnerabilities from malicious markdown

**Example**:
```markdown
<script>alert('XSS')</script>
[Click me](javascript:alert('XSS'))
```

**Renders**:
- Script tag displays as literal text
- JavaScript URL is rendered but not executable

**To Allow Raw HTML** (NOT recommended):
```tsx
<ReactMarkdown
  rehypePlugins={[rehypeRaw]} // Enables raw HTML rendering
>
  {markdown}
</ReactMarkdown>
```

Only enable raw HTML if you trust the markdown source completely.

### Handling Very Long Itineraries

For itineraries with many days (e.g., 14-day trips):

1. **Collapsible Sections**:
   ```tsx
   import { useState } from 'react';

   function CollapsibleDay({ dayMarkdown, dayNumber }: { dayMarkdown: string, dayNumber: number }) {
     const [isOpen, setIsOpen] = useState(dayNumber <= 3); // First 3 days open by default

     return (
       <div className="day-section">
         <button onClick={() => setIsOpen(!isOpen)}>
           {isOpen ? '▼' : '▶'} Day {dayNumber}
         </button>
         {isOpen && (
           <ReactMarkdown remarkPlugins={[remarkGfm]}>
             {dayMarkdown}
           </ReactMarkdown>
         )}
       </div>
     );
   }
   ```

2. **Virtualization**: Use `react-window` or `react-virtuoso` for extremely long lists

3. **Pagination**: Split itinerary into pages (Day 1-3, Day 4-6, etc.)

## Testing Markdown Rendering

### Unit Testing with React Testing Library

```tsx
import { render, screen } from '@testing-library/react';
import ItineraryDisplay from './ItineraryDisplay';

describe('ItineraryDisplay', () => {
  it('renders markdown headings', () => {
    const markdown = '## Day 1\n\n### Morning\n\n- Activity 1';

    render(<ItineraryDisplay markdown={markdown} />);

    expect(screen.getByRole('heading', { level: 2, name: 'Day 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Morning' })).toBeInTheDocument();
  });

  it('renders markdown lists', () => {
    const markdown = '- Activity 1\n- Activity 2';

    render(<ItineraryDisplay markdown={markdown} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent('Activity 1');
  });

  it('handles empty markdown gracefully', () => {
    render(<ItineraryDisplay markdown="" />);

    expect(screen.getByText(/no itinerary available/i)).toBeInTheDocument();
  });

  it('sanitizes HTML in markdown', () => {
    const markdown = '<script>alert("XSS")</script>';

    render(<ItineraryDisplay markdown={markdown} />);

    // Script tag should be escaped and visible as text
    expect(screen.getByText(/<script>/)).toBeInTheDocument();

    // Ensure no actual script elements exist
    const scripts = document.querySelectorAll('script');
    expect(scripts).toHaveLength(0);
  });
});
```

### Snapshot Testing

```tsx
import { render } from '@testing-library/react';
import ItineraryDisplay from './ItineraryDisplay';

it('matches snapshot for typical itinerary', () => {
  const markdown = `## Day 1

### Morning

- Visit Tokyo Tower
- Have breakfast at local cafe

### Afternoon

- Explore Senso-ji Temple
- Lunch in Asakusa`;

  const { container } = render(<ItineraryDisplay markdown={markdown} />);

  expect(container.firstChild).toMatchSnapshot();
});
```

## Performance Considerations

### Memoization for Large Markdown

```tsx
import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ItineraryDisplay({ markdown }: { markdown: string }) {
  const renderedMarkdown = useMemo(() => (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {markdown}
    </ReactMarkdown>
  ), [markdown]);

  return (
    <div className="itinerary-container">
      {renderedMarkdown}
    </div>
  );
}
```

**When to Use**: For itineraries > 10 days or when parent component re-renders frequently

### Component Memoization

```tsx
import { memo } from 'react';

const ItineraryDisplay = memo(function ItineraryDisplay({ markdown }: { markdown: string }) {
  return (
    <div className="itinerary-container">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
});
```

**When to Use**: When markdown prop changes infrequently but component is in a frequently re-rendering tree

## Example: Complete Implementation

```tsx
import { memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './ItineraryDisplay.css';

interface ItineraryDisplayProps {
  markdown: string | null;
}

const ItineraryDisplay = memo(function ItineraryDisplay({ markdown }: ItineraryDisplayProps) {
  const trimmed = markdown?.trim();

  if (!trimmed) {
    return (
      <div className="empty-state" role="status" aria-live="polite">
        <p>No itinerary available. Generate one using the form above.</p>
      </div>
    );
  }

  const customComponents = useMemo(() => ({
    h2: ({ node, ...props }) => (
      <h2 className="day-heading" {...props}>
        📅 {props.children}
      </h2>
    ),
    h3: ({ node, ...props }) => {
      const text = String(props.children);
      const icon =
        text.includes('Morning') ? '🌅' :
        text.includes('Afternoon') ? '☀️' :
        text.includes('Evening') ? '🌆' : '';

      return (
        <h3 className="time-period-heading" {...props}>
          {icon} {props.children}
        </h3>
      );
    },
  }), []);

  return (
    <article className="itinerary-container" role="article" aria-label="Travel Itinerary">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={customComponents}
      >
        {trimmed}
      </ReactMarkdown>
    </article>
  );
});

export default ItineraryDisplay;
```

## Related Documentation

- **[Service Interface Documentation](../domain-model/service-interface.md)**: How markdown is fetched from the backend
- **[Backend Server Architecture](../backend/server-architecture.md)**: How markdown is generated on the server
- **[Getting Started Guide](../getting-started.md)**: Project setup and dependencies
