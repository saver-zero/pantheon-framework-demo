---
created_at: 2025-10-14 HH:MM PM PDT
created_by: plan-architect
---

<!-- SECTION:START:CLARIFYING_QUESTIONS -->

## Clarifying Questions

**Feature**: trip-itinerary-generator

**Source Wireframe**: AW1

### Questions for Operator

1. What is the expected JSON schema format that the Claude CLI command should return? Should it include specific fields for destination, travel_month, party_info, days, and a structured array of day objects with time period sections?
- Change in plan. Let's not do JSON. Let's keep it simple and we'll have the CLI return plain text in markdown format, and we'll use the text response as is, and render them as markdown.

2. How should the CLI execution handle timeout scenarios - should there be a specific timeout threshold (e.g., 45 seconds, 60 seconds) before displaying the ErrorState, and should partial responses be accepted or rejected?
-30 second timeout.

3. For the LocalStorage history implementation, what metadata should be stored alongside each itinerary? Should we store generation timestamp, generation duration, CLI command executed, or error states for debugging?
- store generation timestamp and generation duration

4. How should the system handle concurrent itinerary generation requests? Should the 'Generate Itinerary' button be disabled during LoadingState, or should new requests queue/cancel previous requests?
- disabled during loading state

5. What validation rules should apply to the form inputs? For example, should destination require minimum character length, should days have a maximum limit (e.g., 14 days, 30 days), should party info have a character limit?
- min 3 character length and maximum 7 days

6. For the HistorySidebar on mobile collapse behavior, should the hamburger menu open as a modal overlay, slide-in drawer, or dropdown? What triggers the close action?
- slide in drawer. pressing the hamburger again or on the wash should close.

7. How should the system handle LocalStorage quota exceeded scenarios when storing the 10th itinerary? Should it silently drop the oldest, show a warning, or attempt compression?
-drop oldest

8. Should the prompt template for Claude CLI be hardcoded in the frontend CLIApiClient, or should it be configurable via environment variable or external file for easier prompt iteration?
-external file

9. For the ProgressBar component during loading, should the percentage be simulated (fake progress based on elapsed time) or should the CLI provide real-time progress updates? If simulated, what progression curve should be used?
- show inifinite spinner along with seconds elapsed

10. What error categorization should the ErrorState display? Should it distinguish between timeout errors, CLI execution failures, JSON parsing errors, and validation errors with different messages?
- yes distinguish

11. For the HTTP-based backend migration path, what authentication mechanism should the HTTPApiClient expect? Should it include JWT tokens, API keys, or session cookies in the interface design?
- do not build this right now, we don't need it for the current phase

12. Should clicking a HistoryItem in the sidebar while viewing a different itinerary trigger a confirmation dialog, or should it immediately replace the current view?
- immediately replace

13. How should the DaysInput validation handle edge cases like 0 days, negative numbers, or non-integer values? Should fractional days (e.g., 2.5 days) be supported or rejected?
- rejected

14. For seasonal recommendations, should the system account for both Northern and Southern hemisphere seasons based on destination, or assume Northern hemisphere by default?
- the LLM will take care of this so there's no need to account for this

<!-- SECTION:END:CLARIFYING_QUESTIONS -->

<!-- SECTION:START:CONTEXT -->

## Project Context

A travel itinerary generator that helps travelers plan personalized day-by-day schedules. The project aims to solve the problem of time-consuming trip planning by providing AI-generated itineraries based on destination, party composition, travel month, and trip duration. This is a proof-of-concept MVP focused on delivering value quickly without requiring user accounts or complex infrastructure. The system needs to generate structured, season-appropriate itineraries with attraction recommendations, dining suggestions, and time-of-day organization while maintaining simplicity and speed. The POC uses a CLI-first architecture with frontend abstraction layer, allowing seamless migration from local Claude CLI execution to production HTTP backend without frontend code changes.

### Key Concepts

**Party Information**: Natural language description of travel group demographics and characteristics (e.g., 'late 20s Gen Z couple', 'family with 12-year-old boy and 10-year-old girl'). Used to tailor activity recommendations to group composition and travel style.

**Time Period**: Flexible segments of the day (Morning, Afternoon, Evening, Night, Late Night) that organize activities. Not all time periods are used for every day or party type - they adapt based on appropriateness for the group.

**Seasonal Recommendations**: Activity and attraction suggestions that account for the specific month of travel, considering weather conditions, seasonal events, and attraction operating schedules.

**API Abstraction Layer**: A pluggable interface layer (IItineraryService) in the frontend that allows seamless switching between CLI-based POC implementation (calling 'claude -p' directly) and future HTTP-based production backend without changing frontend code.

**Local History**: Browser-based storage of the last 10 generated itineraries, enabling quick reference without requiring user accounts or server-side storage.

**CLI-First Architecture**: Development approach where the POC frontend executes local Claude CLI commands via shell for AI itinerary generation, with an abstraction layer enabling future migration to HTTP-based backend.

### Core Capabilities

- Generate personalized travel itineraries based on destination, party composition, travel month, and trip duration

- Structure itineraries into day-by-day breakdown with flexible time periods

- Provide attraction recommendations with descriptions, activities, and dining suggestions

- Account for seasonal considerations and weather-appropriate activities

- Store and retrieve previously generated itineraries locally

- Switch between CLI-based POC and HTTP-based production backends transparently

### Key Principles

- Simplicity First: Maximum 3 clicks to generate an itinerary, no registration required, single-page application

- Problem-Space-First: Understand current pain points and user needs before jumping to implementation details

- Personalization Through Natural Language: Accept party information in flexible natural language rather than rigid form fields

- Seasonal Awareness: All recommendations must consider the specific month of travel for relevance

- Frontend Decoupling: API abstraction layer enables smooth migration from POC to production without frontend code changes

- Speed and Responsiveness: Itinerary generation within 10-30 seconds with clear loading states

### References

- **C:\git\pantheon-demo-projects\ascii-planning\pantheon-artifacts\ascii-wireframe\[AW1]_trip-itinerary-generator_wireframe.md**: The approved wireframe artifact defining the visual layout, component registry, and state transitions for the trip itinerary generator. This is the primary specification that this implementation plan is based on.

- **C:\git\pantheon-demo-projects\ascii-planning\pantheon-artifacts\feature-brainstorm\[FB1]_trip-itinerary-generator_brainstorm.md**: The brainstorming artifact that established the problem space, user needs, system constraints, and architectural direction (CLI-First Development with Abstraction Layer) for the project.

<!-- SECTION:END:CONTEXT -->

<!-- SECTION:START:BACKEND_ARCHITECTURE -->


## Backend Architecture

### API Endpoints

[{'method': 'CLI', 'path': 'claude -p <prompt_file_path>', 'purpose': 'Generates travel itinerary via Claude CLI by executing shell command with external prompt file. Returns markdown-formatted itinerary text instead of JSON. Timeout set to 30 seconds maximum. CLI execution happens directly from frontend via shell interface during POC phase.', 'request_format': 'Shell command execution with arguments: claude -p <path_to_prompt_file>. Prompt file contains template with variables populated: destination, party_info, travel_month, days. External prompt file location configurable via environment variable or configuration file.', 'response_format': 'Plain text markdown string containing structured itinerary. Format includes destination header, party info, travel dates, followed by day-by-day breakdown. Each day section contains time period headers (MORNING, AFTERNOON, EVENING, etc.) with bullet-pointed activities including descriptions and dining suggestions. Response rendered as-is in UI using markdown renderer.'}]

### Business Logic

The POC uses CLI-based itinerary generation with external prompt template management. When user clicks Generate button, system validates inputs (destination min 3 chars, days max 7, party info required, month selected), then constructs CLI command using external prompt file path from configuration. Prompt file contains template text with placeholder variables that get populated with user inputs before CLI execution. CLI process executes with 30-second timeout - if exceeded, returns timeout error. Response is plain markdown text (no JSON parsing), stored directly to LocalStorage along with generation metadata (timestamp, duration). Loading state shows infinite spinner with elapsed seconds counter instead of progress bar. Form validation prevents submission until all fields valid: destination minimum 3 characters, days between 1-7 (integers only, no decimals), party info non-empty, month selected. Generate button disabled during loading state to prevent concurrent requests. Error handling distinguishes between timeout errors (30s exceeded), CLI execution failures (command not found, permission errors), validation errors (malformed input), and empty response errors.

### Service Integration

Frontend integrates with local Claude CLI installation via shell command execution. CLIApiClient implementation uses Node.js child_process or browser-compatible shell execution library to run 'claude -p' command. External prompt file path loaded from environment variable (e.g., PROMPT_TEMPLATE_PATH) or configuration file, enabling prompt iteration without code changes. No authentication required for CLI execution in POC. LocalStorage integration stores itinerary markdown text, generation timestamp, and generation duration for the last 10 entries. When storage quota exceeded, oldest entry automatically dropped without user warning. HTTPApiClient implementation deferred - not needed for current phase per operator decision. No external API integrations, map services, or third-party systems in POC scope.


<!-- SECTION:END:BACKEND_ARCHITECTURE -->

<!-- SECTION:START:DATABASE_DESIGN -->


## Database Design

### Schema Changes

No database schema changes required. POC uses browser LocalStorage as persistence layer. LocalStorage schema stores itinerary objects with the following structure: { id: string (UUID), destination: string, partyInfo: string, travelMonth: string, days: number, generatedAt: timestamp, generationDuration: number (milliseconds), itineraryMarkdown: string }. Maximum 10 entries maintained with FIFO eviction when quota exceeded. Each entry stored as JSON-serialized object under key pattern 'itinerary_<uuid>'. History index maintained separately as array of IDs under key 'history_index' for retrieval order.

### Data Migrations

No data migrations required. POC starts with empty LocalStorage. No existing data to backfill or transform. Future migration to server-side database would export LocalStorage entries via one-time script if needed, but not in current scope.

### Data Integrity

LocalStorage integrity managed client-side. Validation enforced before storage: destination string non-empty, days integer 1-7, travel month valid enum value, timestamp valid ISO format, generationDuration positive integer. No foreign key relationships needed in LocalStorage. Uniqueness maintained via UUID generation for each itinerary. When 11th itinerary generated, oldest entry removed from both individual storage and history index array to maintain 10-item limit. No cascade delete needed. Corrupted LocalStorage entries handled by try-catch during retrieval with fallback to empty history state. LocalStorage quota exceeded triggers automatic oldest-entry eviction without user notification per operator decision.


<!-- SECTION:END:DATABASE_DESIGN -->

<!-- SECTION:START:UI_IMPLEMENTATION -->


## UI Implementation

### Component Mapping

[{'friendly_id': 'AppHeader', 'implementation_notes': 'Static React component rendering application title. No props required. Simple styled div or header element with centered text. No state management needed.'}, {'friendly_id': 'InputForm', 'implementation_notes': 'React form component with controlled inputs for destination (text), party info (textarea), travel month (select), and days (number). Validates destination min 3 chars, days 1-7 integers only (reject decimals/negatives), party info non-empty, month selected. Generate button disabled until validation passes AND not in loading state. On submit, calls CLIApiClient.generateItinerary with form values. Preserves inputs after error for retry functionality.'}, {'friendly_id': 'DestinationInput', 'implementation_notes': 'Controlled text input with onChange validation. Min length 3 characters. Displays validation error message below input when invalid and touched. Value stored in parent InputForm state.'}, {'friendly_id': 'PartyInfoTextarea', 'implementation_notes': 'Controlled textarea with auto-expand behavior. Required field validation. Accepts natural language text. No character limit enforced per operator decision. Value stored in parent InputForm state.'}, {'friendly_id': 'TravelMonthDropdown', 'implementation_notes': 'Controlled select element with 12 month options (January-December). Required field. Default to empty/placeholder option forcing user selection. Value stored in parent InputForm state.'}, {'friendly_id': 'DaysInput', 'implementation_notes': 'Controlled number input with validation for integers 1-7 only. Reject decimal values, zero, negatives using input type restrictions and onChange validation. Display validation error for out-of-range or non-integer values. Value stored in parent InputForm state.'}, {'friendly_id': 'GenerateButton', 'implementation_notes': 'Primary button component. Disabled when form invalid OR during loading state (prevents concurrent requests per operator decision). Triggers form submission and CLI command execution via CLIApiClient.'}, {'friendly_id': 'LoadingState', 'implementation_notes': "React component showing infinite spinner animation (not progress bar) alongside elapsed seconds counter. Uses setInterval to increment seconds display every 1000ms. Replaces InputForm during CLI execution. No percentage or status messages needed - just spinner and '15s elapsed' format counter."}, {'friendly_id': 'ErrorState', 'implementation_notes': 'React component displaying categorized error messages. Distinguishes between: timeout errors (30s exceeded - specific message), CLI execution failures (command errors - show error details), validation errors (input format issues), empty response errors. Includes Retry button that returns to InputForm with previous inputs preserved. Error type passed as prop determines message displayed.'}, {'friendly_id': 'GeneratedItinerary', 'implementation_notes': 'React component rendering markdown itinerary text using markdown-to-jsx or react-markdown library. Receives itinerary markdown string as prop and renders it directly without additional formatting. Scrollable container for long multi-day itineraries. Displays ItineraryHeader metadata above markdown content.'}, {'friendly_id': 'ItineraryHeader', 'implementation_notes': 'React component displaying trip metadata: destination, duration, party info, travel month. Receives props from parent GeneratedItinerary. Simple styled header section above markdown content.'}, {'friendly_id': 'DayCard', 'implementation_notes': 'No longer a separate component. Day structure embedded in markdown response from CLI and rendered via markdown library in GeneratedItinerary. Markdown includes day headers and time period sections formatted with markdown syntax.'}, {'friendly_id': 'TimePeriodSection', 'implementation_notes': 'No longer a separate component. Time period structure embedded in markdown response using header tags and bullet lists. Rendered via markdown library.'}, {'friendly_id': 'ActivityItem', 'implementation_notes': 'No longer a separate component. Activities formatted as markdown bullet points with descriptions and dining suggestions. Rendered via markdown library.'}, {'friendly_id': 'HistorySidebar', 'implementation_notes': 'React component displaying last 10 itineraries from LocalStorage. Fetches from LocalStorage on mount and updates when new itinerary generated. On desktop: 20% width sidebar, vertical list. On mobile (<768px): collapses to hamburger menu opening slide-in drawer. Drawer closes on hamburger click or clicking wash (overlay). Each HistoryItem clickable to load that itinerary.'}, {'friendly_id': 'HistoryItem', 'implementation_notes': "React list item component within HistorySidebar. Displays destination, duration (e.g., '5d'), travel month/year. Receives itinerary object as prop. On click, immediately replaces main content with that itinerary's GeneratedItinerary view (no confirmation dialog per operator decision). Highlighted when selected."}, {'friendly_id': 'RetryButton', 'implementation_notes': 'Button component within ErrorState. On click, returns to InputForm state with previous form values preserved. Enables user to retry generation after failure without re-entering data.'}, {'friendly_id': 'ProgressBar', 'implementation_notes': 'No longer used. Replaced with infinite spinner and elapsed seconds counter per operator decision in clarifying question #9.'}, {'friendly_id': 'StatusMessage', 'implementation_notes': 'No longer used. Loading state only shows spinner and elapsed seconds counter, no contextual messages per operator decision.'}]

### Style Patterns

Follow existing design system if available, otherwise use minimal CSS framework (Tailwind, Material-UI, or Chakra UI). AppHeader uses large centered heading. InputForm uses vertical stacked layout with consistent field spacing, clear labels, and validation error messages in red below inputs. LoadingState centers spinner and elapsed counter vertically and horizontally. ErrorState uses red/warning color scheme for error messages with prominent Retry button. GeneratedItinerary uses markdown renderer default styles with custom CSS for readability: max-width content container, increased line-height for descriptions, clear visual hierarchy for day headers and time periods. HistorySidebar uses subtle background color differentiation from main content, hover states for HistoryItem, highlighted state for selected item. Mobile slide-in drawer uses smooth CSS transition animation (0.3s ease) and semi-transparent wash overlay behind drawer.

### Interaction Details

Loading state shows infinite spinner (CSS animation) alongside seconds counter updating every 1 second via setInterval. Generate button disables during loading state to prevent concurrent requests. Error state displays categorized error messages based on error type: 'Request timed out after 30 seconds' for timeout, 'CLI execution failed: <details>' for command errors, 'Invalid input: <details>' for validation errors, 'Received empty response from AI' for empty responses. Retry button preserves all form inputs when returning to InputForm. Form inputs show validation errors only after blur or submit attempt (not on every keystroke). Mobile HistorySidebar hamburger toggles slide-in drawer with smooth animation. Drawer closes on hamburger re-click OR clicking semi-transparent wash overlay. Clicking HistoryItem immediately loads itinerary without confirmation dialog. Keyboard navigation: Tab through form inputs, Enter to submit, Escape to close mobile drawer. Focus management returns to first form input after error retry. Screen reader announcements for loading state and error messages via aria-live regions.


<!-- SECTION:END:UI_IMPLEMENTATION -->

<!-- SECTION:START:SECURITY_CONSIDERATIONS -->


## Security Considerations

### Authentication & Authorization

No authentication required for POC. CLI-based implementation runs locally with no user accounts or server-side authentication. Future HTTP backend migration would require authentication but not in current scope per operator decision. LocalStorage access restricted to same-origin policy by browser security model. No role-based access control needed for single-user local POC.

### Input Validation

Client-side input validation enforced before CLI execution: Destination field minimum 3 characters (prevents empty/trivial inputs), maximum length not specified but recommend 100 chars to prevent prompt overflow. Days field accepts only integers 1-7 inclusive - reject decimal values (e.g., 2.5), zero, negative numbers using HTML5 input type='number' with min/max attributes plus JavaScript validation. Party info required non-empty but accepts any natural language text - no length limit enforced. Travel month validated against enum of 12 month values. Sanitize all inputs before passing to CLI command to prevent shell injection: escape special shell characters, validate against whitelist patterns. For external prompt file path from configuration, validate path exists and is readable before CLI execution. CLI command constructed using parameterized execution (not string concatenation) to prevent injection. Response markdown text validated as non-empty before rendering and storage. No SQL injection risk (no database), XSS risk mitigated by markdown library's built-in sanitization when rendering user-generated content (destination, party info) within markdown.

### Data Protection

No sensitive user data collected in POC - destination, party info, travel preferences are non-sensitive travel planning inputs. LocalStorage data unencrypted but acceptable for non-sensitive POC data. No PII, payment info, or authentication credentials stored. HTTPS not required for local CLI execution but recommended when migrating to HTTP backend. Generated itinerary markdown contains only public attraction information, no sensitive data. Audit logging not implemented for POC but generation timestamp stored for each itinerary in LocalStorage metadata. Data retention limited to 10 most recent itineraries via automatic FIFO eviction. No compliance requirements (GDPR, CCPA) for anonymous local POC usage.


<!-- SECTION:END:SECURITY_CONSIDERATIONS -->

<!-- SECTION:START:TESTING_STRATEGY -->


## Testing Strategy

### Test Coverage Overview

POC testing focuses on client-side functionality and CLI integration reliability. Unit tests for form validation logic (destination min 3 chars, days 1-7 integers, month selection, party info required), LocalStorage FIFO eviction when exceeding 10 entries, error categorization logic (timeout vs CLI failure vs validation error). Component tests for InputForm (validation states, disabled Generate button during loading, input preservation on retry), LoadingState (spinner renders, seconds counter increments), ErrorState (correct error messages per category, Retry button returns to form), GeneratedItinerary (markdown rendering, ItineraryHeader displays metadata), HistorySidebar (displays last 10, HistoryItem click loads itinerary, mobile drawer behavior). Integration tests for CLIApiClient (successful CLI execution, timeout after 30s, error handling for command not found, external prompt file loading from config, markdown response parsing). E2E scenarios for full user workflow (enter valid inputs -> loading state -> success -> itinerary displays, enter invalid inputs -> validation errors, timeout scenario -> error state -> retry, generate 11 itineraries -> oldest evicted, mobile history sidebar -> hamburger opens drawer -> click wash closes). Testing tools: Jest/Vitest for unit tests, React Testing Library for component tests, Playwright/Cypress for E2E tests, mock CLI responses for isolation.

### Critical Test Scenarios

1. Happy path: User enters valid destination (min 3 chars), party info, month, days (1-7) -> clicks Generate -> loading shows spinner and seconds counter -> CLI returns markdown within 30s -> itinerary renders with markdown formatting -> stored to LocalStorage with timestamp and duration. 2. Timeout error: User generates itinerary -> CLI exceeds 30s -> ErrorState displays 'Request timed out after 30 seconds' message -> Retry button returns to InputForm with inputs preserved. 3. Validation errors: User enters destination <3 chars or days >7 or days decimal -> Generate button disabled -> validation error messages shown below inputs. 4. LocalStorage eviction: User generates 11th itinerary -> oldest entry automatically removed -> history shows only 10 most recent entries. 5. Mobile history interaction: On mobile viewport -> hamburger icon shows -> click hamburger -> drawer slides in -> click wash overlay -> drawer closes. 6. History loading: User clicks HistoryItem in sidebar -> immediately displays that itinerary without confirmation -> selected item highlighted. 7. CLI execution failure: CLI command fails (not installed, permission error) -> ErrorState displays 'CLI execution failed' with error details. 8. Empty response error: CLI returns empty string -> ErrorState displays 'Received empty response from AI' message. 9. External prompt file loading: System reads prompt template from configured file path -> variables populated -> CLI executed with prompt content. 10. Concurrent request prevention: User clicks Generate while loading -> button remains disabled -> no new CLI execution triggered until first completes.


<!-- SECTION:END:TESTING_STRATEGY -->