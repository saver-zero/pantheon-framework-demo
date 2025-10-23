# Documentation Index

This is the master index for all documentation assets in the Travel Itinerary Generator project.

## Getting Started

* **[Getting Started Guide](./getting-started.md):** Step-by-step setup and development workflow guide for developers joining the project, covering installation, development server, testing, building, linting, and project structure.

## Architecture

* **Architecture Guide:** The comprehensive architecture guide defining technology stack, system components, shared services, implementation patterns, and testing strategy for the Travel Itinerary Generator. Use `pantheon get sections get-architecture-guide --actor <your_agent_name>` to get the available sections, and then use `pantheon execute get-architecture-guide --sections <section1,section2,section3...>` to get the relevant sections.

## Domain Model

* **[Domain Model Types](./domain-model/types.md):** DEPRECATED - Legacy type definitions for JSON-based itinerary domain model. Application now uses markdown strings instead of typed objects. Retained for historical reference.
* **[Service Interface Contract](./domain-model/service-interface.md):** Service interface contract for itinerary operations using markdown responses. Defines abstraction layer for backend HTTP communication with implementation guidance and migration rationale from JSON to markdown.
* **[Type Structure Diagram](./domain-model/type-structure.puml):** Class diagram showing the hierarchy and relationships of the itinerary domain model types with cardinality and null handling patterns.

## System Architecture

* **[System Component Overview](./system-architecture/component-overview.puml):** High-level component diagram showing the dual-server architecture with frontend (port 5273) and backend server (port 3001) as separate components, illustrating the markdown response flow through the service abstraction layer.
* **[CLI Execution Sequence](./system-architecture/cli-execution-sequence.puml):** Sequence diagram showing the dual-server request flow from frontend through backend server to spawn-based Claude CLI execution, returning markdown responses instead of JSON objects.

## Backend

* **[Backend Server Architecture](./backend/server-architecture.md):** Architecture documentation for the Node.js/Express backend server that spawns Claude CLI processes, covering migration rationale, server components, request/response flow, error handling, and troubleshooting.
* **[Claude CLI Integration Guide](./backend/claude-cli-integration.md):** Technical guide for Claude CLI integration using spawn, covering why spawn (not exec), stdin.end() requirement, stream handling, prompt engineering for markdown output, error handling patterns, and debugging strategies.
* **[Spawn Lifecycle Sequence](./backend/spawn-lifecycle.puml):** Detailed sequence diagram illustrating the spawn-based Claude CLI execution lifecycle, emphasizing the critical stdin.end() call, stream handling patterns, and timeout management.
* **[Backend Deployment Architecture](./backend/backend-deployment.puml):** Deployment diagram showing the dual-server architecture with frontend (port 5273) and backend (port 3001) separation across development and production environments, including environment configuration and communication patterns.

## User Interface

* **[Design System Guide](./user-interface/design-system.md):** Comprehensive design system documentation covering CSS custom properties-based design tokens, color palette, spacing scale, typography system, component patterns, and theming approach for consistent UI styling.
* **[Design Token Architecture](./user-interface/design-token-architecture.puml):** Component diagram illustrating the design token system architecture showing how CSS custom properties are defined, themed across light and dark modes, and consumed by components for consistent styling.
* **[Styling Conventions Guide](./user-interface/styling-conventions.md):** Styling best practices and conventions including mandatory CSS class usage, design token requirements, BEM naming convention, container patterns, responsive design approach, and accessibility requirements for styling.
* **[Form Validation Guide](./user-interface/form-validation-guide.md):** Comprehensive guide to form validation rules, error handling patterns, and accessibility considerations for the Trip Input Form with field-level validation logic.
* **[Error Handling Guide](./user-interface/error-handling-guide.md):** Comprehensive guide to error handling patterns, components (ErrorDisplay, ErrorBoundary), and user experience strategy for graceful degradation and error recovery across the application.
* **[Markdown Rendering Guide](./user-interface/markdown-rendering.md):** Guide for rendering markdown itineraries using react-markdown, including library configuration with remark-gfm, custom component mapping, styling strategies, accessibility considerations, and handling edge cases like empty markdown and XSS prevention.
* **[History View Guide](./user-interface/history-view-guide.md):** Component guide for displaying and managing saved itinerary history using CSS classes for styling, list-detail pattern, metadata extraction, delete functionality, and integration with local storage.
* **[Markdown Metadata Extraction](./user-interface/markdown-metadata-extraction.md):** Technical documentation for the markdown parsing utility that extracts metadata from markdown itinerary strings using regex-based parsing strategy.
* **[Form Submission Sequence](./user-interface/form-submission-sequence.puml):** Sequence diagram showing the complete user interaction flow from form submission through validation, service call, and result handling including error paths and loading state management.
* **[History View Sequence](./user-interface/history-view-sequence.puml):** Sequence diagram showing the complete user interaction flow for history view including retrieval, selection, detail view rendering, and delete operations with confirmation and error handling.
* **[History View State Diagram](./user-interface/history-view-state-diagram.puml):** Activity diagram illustrating the state transitions within HistoryView component between list view and detail view states, including error states and empty states with conditional rendering logic.
* **[Error Boundary Lifecycle](./user-interface/error-boundary-lifecycle.puml):** Sequence diagram showing how ErrorBoundary catches rendering errors, displays fallback UI, logs errors for debugging, and provides recovery via page reload.
