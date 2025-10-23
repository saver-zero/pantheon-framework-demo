---
created_at: 2025-10-16 HH:MM PM PDT
created_by: project-planner
---

<!-- SECTION:START:PHASES -->

# Development Phases

## Phase 1: Backend Process Management Refactor
Update server.js to use spawn instead of exec for Claude CLI execution, implementing proper stdin handling and Windows-specific configuration to fix process communication issues.

## Phase 2: Markdown Output Processing
Update server.js to handle plain markdown text responses from Claude CLI instead of JSON parsing, removing JSON extraction logic and passing markdown through directly.

## Phase 3: Frontend Markdown Rendering
Update frontend components to handle and render markdown content instead of structured JSON data, implementing markdown parsing and display logic.

## Phase 4: Data Model Migration
Update TypeScript interfaces and data flow to work with markdown strings instead of structured JSON objects, simplifying the data model.

## Phase 5: History Storage Updates
Update localStorage utilities to store markdown-based itineraries instead of JSON structures, maintaining the 10-itinerary limit.

## Phase 6: UI Component Refactoring
Refactor display components to render markdown content with proper formatting, replacing the component hierarchy that rendered structured JSON.

## Phase 7: Prompt Template Updates
Update the hardcoded prompt template to request markdown output format instead of JSON schema, aligning with the new output approach.

## Phase 8: Testing & Validation
Test markdown itinerary generation with different inputs, verify spawn configuration works correctly, validate markdown rendering quality, and confirm all success criteria are met.

<!-- SECTION:END:PHASES -->

<!-- SECTION:START:IMPLEMENTATION_STEPS -->


# Implementation Steps

## Phase 1: Backend Process Management Refactor

1.1. [completed] Replace exec import with spawn from child_process in server.js
1.2. [completed] Update /api/generate endpoint to use spawn with shell: true and windowsHide: true configuration options
1.3. [completed] Implement stdin close immediately after spawning the process to prevent hanging on Windows
1.4. [completed] Add stdout and stderr stream handlers to collect output data from spawned process
1.5. [completed] Add process exit handler to detect completion and process collected output

## Phase 2: Markdown Output Processing

2.1. [completed] Remove JSON regex matching logic from server.js that extracts JSON from Claude output
2.2. [completed] Remove JSON.parse call and error handling for invalid JSON in server.js
2.3. [completed] Update response handling to send collected stdout as plain text instead of parsed JSON object
2.4. [completed] Update error responses to handle markdown generation failures appropriately

## Phase 3: Frontend Markdown Rendering

3.1. [completed] Install markdown rendering library (react-markdown or marked) as project dependency
3.2. [completed] Create new MarkdownItineraryDisplay component that accepts markdown string as prop
3.3. [completed] Implement markdown rendering with proper HTML sanitization in MarkdownItineraryDisplay component
3.4. [completed] Add CSS styling for rendered markdown to ensure proper formatting of headings, lists, and paragraphs

## Phase 4: Data Model Migration

4.1. [completed] Update ItineraryResponse interface in /src/types/itinerary.ts to contain markdown string instead of structured data
4.2. [completed] Remove or deprecate Activity, TimePeriod, and Day interfaces that are no longer needed for markdown approach
4.3. [completed] Update IItineraryService interface to return markdown-based responses
4.4. [completed] Update CLIApiClient.generateItinerary() to expect and return markdown text instead of parsed JSON

## Phase 5: History Storage Updates

5.1. [completed] Update localStorage utility saveToHistory() function to store markdown strings with metadata (destination, date, etc.)
5.2. [completed] Update localStorage utility getHistory() function to retrieve markdown-based itineraries
5.3. [completed] Add simple metadata structure (destination, partyInfo, month, days, generatedAt, markdown) for history entries
5.4. [completed] Test localStorage operations with markdown data to ensure 10-itinerary limit still functions correctly

## Phase 6: UI Component Refactoring

6.1. [completed] Replace ItineraryDisplay component usage in App.tsx with MarkdownItineraryDisplay component
6.2. [completed] Update HistoryView component to use MarkdownItineraryDisplay for rendering saved itineraries
6.3. [completed] Remove or archive old display components (DayCard, TimePeriodCard, ActivityCard) that rendered structured JSON
6.4. [completed] Update App.tsx state management to work with markdown strings instead of ItineraryResponse objects

## Phase 7: Prompt Template Updates

7.1. [completed] Update hardcoded prompt template in CLIApiClient to request markdown formatted output instead of JSON
7.2. [completed] Remove JSON schema from prompt template since output is now plain markdown
7.3. [completed] Update prompt template to specify desired markdown structure (day headings, time periods, activity details)
7.4. [completed] Add prompt instructions for including destination, party info, and month context in markdown output

## Phase 8: Testing & Validation

8.1. [pending] Test spawn configuration with 'claude -p' command execution to verify it completes without hanging
8.2. [pending] Test markdown itinerary generation for 'late 20s Gen Z couple' visiting 'Tokyo' in 'March' for '5 days'
8.3. [pending] Test markdown itinerary generation for 'family of four with 12-year-old boy' visiting 'Disney World' in 'July' for '3 days'
8.4. [pending] Verify markdown rendering displays properly formatted content with headings, lists, and readable structure
8.5. [pending] Verify history feature stores and retrieves markdown itineraries correctly with 10-itinerary limit
8.6. [pending] Verify error handling works correctly when spawn process fails or times out
8.7. [pending] Confirm responsive design still works with markdown rendering on desktop browsers


<!-- SECTION:END:IMPLEMENTATION_STEPS -->

<!-- SECTION:START:COMPLETION_CRITERIA -->

# Completion Criteria

## Phase Completion Gates

### Phase 1: Backend Process Management Refactor
This phase is complete when:

- server.js uses spawn instead of exec for Claude CLI execution

- spawn is configured with shell: true and windowsHide: true

- stdin is closed immediately after spawning process

- stdout and stderr stream handlers collect output correctly

- Process exit handler detects completion and processes collected output without hanging

### Phase 2: Markdown Output Processing
This phase is complete when:

- JSON regex matching logic is removed from server.js

- JSON.parse call and related error handling are removed

- Server sends collected stdout as plain text response

- Error responses handle markdown generation failures appropriately

- Manual test of /api/generate endpoint returns markdown text instead of JSON

### Phase 3: Frontend Markdown Rendering
This phase is complete when:

- Markdown rendering library is installed and available

- MarkdownItineraryDisplay component is created and renders markdown correctly

- HTML sanitization prevents XSS vulnerabilities in rendered markdown

- CSS styling makes rendered markdown readable and properly formatted

- Component displays test markdown string with headings, lists, and paragraphs correctly

### Phase 4: Data Model Migration
This phase is complete when:

- ItineraryResponse interface updated to markdown-based structure

- Old structured interfaces (Activity, Day, TimePeriod) are removed or deprecated

- IItineraryService interface methods return markdown-based data

- CLIApiClient.generateItinerary() returns markdown text without JSON parsing

- TypeScript compilation succeeds with zero errors

### Phase 5: History Storage Updates
This phase is complete when:

- saveToHistory() stores markdown strings with metadata in localStorage

- getHistory() retrieves markdown-based itineraries correctly

- Metadata structure includes destination, partyInfo, month, days, generatedAt, and markdown fields

- 10-itinerary limit enforcement works correctly with markdown data

- Manual test confirms localStorage operations succeed

### Phase 6: UI Component Refactoring
This phase is complete when:

- App.tsx uses MarkdownItineraryDisplay instead of old ItineraryDisplay component

- HistoryView component renders saved markdown itineraries correctly

- Old display components (DayCard, TimePeriodCard, ActivityCard) are archived or removed

- App.tsx state management works with markdown strings

- Application renders without console errors or TypeScript warnings

### Phase 7: Prompt Template Updates
This phase is complete when:

- Prompt template requests markdown output format

- JSON schema is removed from prompt template

- Prompt specifies desired markdown structure for days and time periods

- Prompt includes instructions for embedding context (destination, party, month) in output

- Test generation produces well-structured markdown that renders properly

### Phase 8: Testing & Validation
This phase is complete when:

- Spawn configuration executes 'claude -p' without hanging or timeout issues

- All test itineraries generate successfully and display as formatted markdown

- Markdown rendering displays proper heading hierarchy and list formatting

- History feature stores and retrieves markdown itineraries with correct limit

- Error handling displays appropriate messages for generation failures

- Responsive design works correctly on desktop browsers

- All MVP success criteria are verified and met

## MVP Completion

### Functional Requirements

The MVP is complete when all of these functional requirements are met:

- Users can input destination, party info, month, and trip duration, then generate markdown itinerary within 30 seconds

- Generated itineraries display as formatted markdown with day-by-day breakdown and time period structure

- Markdown content shows attraction names, descriptions, activities, and dining recommendations in readable format

- History view displays last 10 generated markdown itineraries stored in localStorage

- Error states display when Claude CLI generation fails or times out

- UI is responsive and usable on desktop browsers with proper markdown formatting

- At least 3 test markdown itineraries validate appropriate content and rendering quality

### Validation Readiness

MVP is ready for user validation when a first-time user can visit the application, fill in the four-input form with their trip details, receive a personalized markdown itinerary within 30 seconds showing well-formatted day-by-day schedules with attractions and dining recommendations, access their generation history showing up to 10 previous markdown itineraries with proper rendering, and experience proper error handling if generation fails. The spawn-based backend must execute reliably without hanging, and markdown rendering must display content in a readable, scannable format that demonstrates the core value proposition.

<!-- SECTION:END:COMPLETION_CRITERIA -->