---
created_at: 2025-10-13 HH:MM PM PDT
---
<!--
## Welcome to Your Blueprint Journey

Think of this file as a shared workspace that you and the specialist agents shape together. Every time you collaborate with them, each section of the blueprint will be drafted in place of a `SECTION:PLACEHOLDER` tag. Move at your own pace, review the drafts they hand back, and keep iterating until the blueprint feels like it truly represents the team you have in mind.

### Phase 1: Shape the Blueprint Together (Iterative)

This phase is all about conversations and refinement. Each interaction gives the agents more context, and each revision brings the blueprint closer to what you need. For this phase, you need to refer to the blueprint using the blueprint ID (i.e TB02).

1.  **Set the Strategy & Context**
    -   **Who to chat with:** `@pantheon-team-builder`
    -   **Try asking:** @pantheon-team-builder, create the strategy and context for a new team based on the workflow in @docs/workflows/my-new-workflow.md
    -   The agent will help bring the `Overall Strategy` and `Project Context` sections to life. Review and provide feedback to @pantheon-team-builder to make any updates, or make the updates yourself in the doc directly.

2.  **Design the Artifacts**
    -   **Who to chat with:** `@artifact-designer`
    -   **Try asking:** @artifact-designer, design the artifacts for TB02 and update the team blueprint. Do not build the artifacts yet, focus on updating the team blueprint with the artifact design.
    -   The placeholders under `ARTIFACTS` will evolve into a detailed design you can react to. Review it and provide feedback to the @artifact-designer to make any updates, or make the updates yourself in the doc directly.

3.  **Design the Agents**
    -   **Who to chat with:** `@agent-designer`
    -   **Try asking:** @agent-designer, design the agents for TB02 and update the team blueprint. Do not build the agents yet, focus on updating the team blueprint with the agent design.
    -   The agent architecture will gradually replace the `AGENTS` section as you iterate together. Review it and provide feedback to the @agent-designer to make any updates, or make the updates yourself in the doc directly.

4.  **Create the Team Readme**
    -   **Who to chat with:** `@team-readme-writer`
    -   **Try asking:** @team-readme-writer, create the team readme for the blueprint TB02
    -   The team-readme-writer will create a team readme. Review and provide feedback to the readme writer to update any flows or usages you'd like to change. And point to the read me to have artifact-designer and agent-designer update their relevant sections of the blueprint.

5.  **Loop, Compare, Refine**
    -   Use what the @agent-designer creates to check whether the artifacts still make sense. If anything feels off, circle back to the @artifact-designer and explore a revised idea.

6.  **Finish with the Team Profile**
    -   **Who to chat with:** `@profile-designer`
    -   **Try asking:** @profile-designer, design the team profile for the blueprint TB02
    -   Together you will turn the `PROFILE` placeholder into the configuration that ties everything together. Review it and provide feedback to the @profile-designer to make any updates, or make the updates yourself in the doc directly.
    -   You do not have to use or implement any of the profiles or configs, if you prefer to keep things simple. In that case, just delete the profiles and replace with "No profiles or configs needed".

### Phase 2: Bring the Blueprint to Life (Sequential)

Once the blueprint feels complete, you can use it as a script for creating the real team package. These steps happen in order so each piece has what it needs from the previous one. For this phase, you can refer to the blueprint using the full filename (i.e. [TB02]_travel-itinerary-planner_team-blueprint.md])

1.  **Create the Team Profile**
    -   The profile carries shared configuration that other components lean on.
    -   Ask @profile-designer to create the team profile from @[TB02]_travel-itinerary-planner_team-blueprint.md

2.  **Stand Up the Agents**
    -   Agents need to exist so the later processes know who they are empowering.
    -   For each agent described here, ask @agent-designer to create the agent from the blueprint.
    -   i.e @agent-designer create the planner agent from @[TB02]_travel-itinerary-planner_team-blueprint.md
    -   Review it and provide feedback to the @agent-designer to make any updates, or make the updates yourself in the generated agent prompt directly.

3.  **Build the Artifacts & Processes**
    -   This step turns the blueprint's core workflows into the files your team will actually run.
    -   For each artifact, request the @artifact-designer to build each artifact
    -   i.e @artifact-designer, build the master plan artifact from @[TB02]_travel-itinerary-planner_team-blueprint.md
    -   Review it and provide feedback to the @artifact-designer to make any updates, or make the updates yourself in the generated processes and artifact schemas and templates directly.

When you've walked through these steps, the new team package is ready for its debut.
-->
<!-- SECTION:START:FOUNDATION -->
# TB02 - travel-itinerary-planner Team Blueprint

## Team Foundation
updated_at: 2025-10-13 HH:MM PM PDT

**Team Name**: travel-itinerary-planner

### Mission Statement

Transform natural language travel requests into practical, day-by-day itineraries for a single destination. The team bridges the gap between a user's travel vision and a concrete, actionable plan by understanding preferences, researching destination specifics, and organizing activities into realistic schedules with timing, logistics, and budget guidance.

### Strategic Goals
- Generate complete, day-by-day itineraries that match user preferences within a single interaction cycle.
- Provide realistic timing and logistics that users can follow without additional planning.
- Deliver clear budget estimates so users understand total trip costs upfront.

### Key Objectives
- Produce a structured preferences summary artifact that captures all user inputs in a standardized format.
- Generate a destination research brief containing verified information about attractions, restaurants, activities, and local logistics.
- Create a formatted day-by-day itinerary with hourly schedules, activity descriptions, and practical details.
- Include budget breakdown showing estimated costs per activity, meal, and transportation.

## System Boundary

### Pantheon Framework Responsibilities
- Generating the preferences summary artifact from user natural language input.
- Generating the destination research brief with attraction and activity information.
- Generating the day-by-day itinerary specification with timing and logistics.
- Generating the budget estimate artifact with cost breakdowns.

### Human Operator Responsibilities
- Providing initial travel request in natural language describing destination, duration, and preferences.
- Reviewing the final itinerary and requesting revisions if needed.
- Using web search or external tools to verify current information like operating hours or prices.
- Booking actual travel, accommodations, and activities based on the itinerary.

### High-Leverage Artifacts
- **Preferences Summary**: Captures all user inputs in a structured format so downstream agents work from complete, standardized information rather than re-interpreting natural language. Prevents misalignment and missing requirements.
- **Destination Research Brief**: Consolidates verified destination information into a single reference so the itinerary designer works from accurate data rather than assumptions. Reduces errors and improves recommendation quality.
- **Day-by-Day Itinerary**: Provides the complete, formatted travel plan that users can directly follow. This is the primary deliverable that eliminates ambiguity and enables immediate action.

### Critical Manual Checkpoints
- Operator must verify current operating hours and prices for attractions before finalizing travel plans.
- Operator must review the itinerary for personal preferences or constraints not captured in initial input.
- Operator must perform actual bookings for flights, accommodations, and activities based on the itinerary.
<!-- SECTION:END:FOUNDATION -->

<!-- SECTION:START:CONTEXT -->
## Project Context
updated_at: 2025-10-13 HH:MM PM PDT

This team supports a travel itinerary planning system designed for non-technical users who want personalized trip plans. The system takes natural language descriptions of travel goals and produces actionable, day-by-day itineraries. Unlike traditional travel planning that requires users to research destinations, compare options, and manually schedule activities, this system automates the entire planning process. The output is a complete itinerary with timing, logistics, and budget that users can immediately act on. The system focuses on single-destination trips to maintain simplicity and clarity, avoiding the complexity of multi-city routing or open-ended exploration.

### Key Concepts

**Single-destination trip**: A travel itinerary focused on one primary location or city, avoiding multi-city tours or complex routing. This constraint simplifies logistics and allows deeper exploration of one area.

**Natural language input**: User-provided travel requests expressed in conversational text rather than structured forms. Examples include 'I want to visit Tokyo for 5 days focusing on food and culture' or 'Plan a relaxing beach vacation in Bali for a week.'

**Day-by-day itinerary**: A structured schedule breaking the trip into daily segments, with specific activities, timing, locations, and transitions between activities. Typically includes morning, afternoon, and evening sections.

**Travel preferences**: User-specific inputs that shape the itinerary, including trip duration, interests (culture, food, adventure, relaxation), pace (fast-paced vs leisurely), budget level, and travel style (luxury, backpacker, family-friendly).

**Practical logistics**: Operational details that make an itinerary actionable, including transportation between activities, estimated travel times, walking distances, accommodation location suggestions, and meal timing.

**Budget estimate**: A breakdown of expected costs for the trip, categorized by type (activities, meals, transportation, accommodation) with per-item and total amounts. Helps users understand financial commitment.

### Core Capabilities

- Parse natural language travel requests to extract structured preferences including destination, duration, interests, budget, and travel style.
- Research destination-specific information covering attractions, restaurants, activities, local transportation, and cultural considerations.
- Design optimized daily schedules with realistic timing, accounting for opening hours, travel time between locations, and activity duration.
- Generate practical logistics guidance including transportation options, walking vs driving recommendations, and accommodation location suggestions.
- Calculate budget estimates with itemized costs for activities, meals, and transportation based on destination pricing.

### Key Principles

- Simplicity first: Keep the team structure, artifacts, and outputs as simple as possible. Avoid unnecessary complexity or technical jargon.
- Single destination focus: Each itinerary addresses one primary location. Multi-city trips require separate planning cycles.
- User-friendly language: All artifacts and outputs use plain language accessible to non-technical users. Avoid industry jargon.
- Realistic and actionable: Every itinerary must include practical details like timing, distances, and costs that users can immediately act on.
- Complete in one cycle: Each planning session should produce a finished itinerary without requiring multiple rounds of back-and-forth.
- Closed-loop operation: The team works only with artifacts created through its own processes. External information is ingested via operator-provided input or specified web search results.

### References

- **C:\git\travel-itinerary-01\travel-idea.txt**: Transcript from OpenAI Agent Builder demo showing a travel agent implementation. Demonstrates a classifier-based routing pattern between flight lookup and itinerary creation agents, providing architectural inspiration for multi-capability travel systems.
<!-- SECTION:END:CONTEXT -->

<!-- SECTION:START:ARTIFACTS -->

## Artifact Design
updated_at: 2025-10-13 HH:MM PM PDT

### Process Architecture Overview

The travel itinerary planner team operates through a three-stage artifact pipeline. First, the preferences summary standardizes all user inputs into structured data, ensuring consistent interpretation. Second, the destination research brief consolidates verified information about the location, creating a single authoritative reference. Finally, the day-by-day itinerary combines preferences and research into a complete travel plan. Each artifact feeds the next, preventing information loss and eliminating redundant re-gathering of requirements. This sequential design ensures the primary implementation LLM always works from complete, validated inputs rather than interpreting ambiguous natural language at each stage.

### Core Artifacts

#### travel-preferences Artifact

**Purpose**: Captures all user travel requirements in a standardized format, ensuring downstream agents work from complete information rather than re-interpreting ambiguous natural language.

**Build Mode**: `complete`

**Source Reference**: Foundation section explicitly names 'structured preferences summary artifact that captures all user inputs' as the first key objective. The context describes parsing 'natural language travel requests to extract structured preferences including destination, duration, interests, budget, and travel style.'

**Pantheon Commands**
- To get the instructions for creating travel-preferences, use `pantheon get process create-travel-preferences --actor <your_agent_name>`
- To get the instructions for updating destination section of travel-preferences, use `pantheon get process update-travel-preferences --id <travel-preferences id> --sections destination --actor <your_agent_name>`
- To get the instructions for updating trip_details section of travel-preferences, use `pantheon get process update-travel-preferences --id <travel-preferences id> --sections trip_details --actor <your_agent_name>`
- To get the instructions for updating interests section of travel-preferences, use `pantheon get process update-travel-preferences --id <travel-preferences id> --sections interests --actor <your_agent_name>`
- To get the instructions for updating budget section of travel-preferences, use `pantheon get process update-travel-preferences --id <travel-preferences id> --sections budget --actor <your_agent_name>`

**Sections**:
- **destination**: Records the primary location for the trip, establishing geographic scope for all planning..
- **trip_details**: Captures duration, dates, and timing constraints that shape the itinerary structure..
- **interests**: Documents user preferences for activities, experiences, and travel style to guide activity selection..
- **budget**: Establishes financial parameters and spending preferences to inform cost estimates and recommendations..

**Section Workflow**:
- **destination (create)**: Extract destination from user input first to establish the geographic scope and enable destination-specific research.
- **trip_details (create)**: Capture dates and duration to define the timeline structure for the itinerary.
- **interests (create)**: Document preferences and travel style to guide activity selection and itinerary pacing.
- **budget (create)**: Record budget parameters last to enable cost-appropriate recommendations throughout planning.
- **interests (review)**: Verify captured preferences match user intent before proceeding to research phase.

**Process Operations**:
- **CREATE**: Generates a new preferences artifact from user natural language input, producing standardized travel requirements.
- **GET**: Retrieves the complete preferences artifact for use in destination research and itinerary generation.
- **UPDATE**: Modifies specific preference sections when user refines requirements or changes trip parameters.

**External Inputs & Canonicalization**:
- User natural language travel request describing destination, duration, interests, budget, and travel style preferences.

**Manual Operator Actions**:
- Operator reviews preferences artifact to confirm all user requirements were correctly captured before proceeding to research.

#### destination-research Artifact

**Purpose**: Consolidates verified destination information into a single authoritative reference, enabling the itinerary designer to work from accurate data rather than assumptions.

**Build Mode**: `complete`

**Source Reference**: Foundation explicitly names 'destination research brief containing verified information about attractions, restaurants, activities, and local logistics' as a key objective. Core capabilities include 'Research destination-specific information covering attractions, restaurants, activities, local transportation, and cultural considerations.'

**Pantheon Commands**
- To get the instructions for creating destination-research, use `pantheon get process create-destination-research --actor <your_agent_name>`
- To get the instructions for updating attractions section of destination-research, use `pantheon get process update-destination-research --id <destination-research id> --sections attractions --actor <your_agent_name>`
- To get the instructions for updating dining section of destination-research, use `pantheon get process update-destination-research --id <destination-research id> --sections dining --actor <your_agent_name>`
- To get the instructions for updating activities section of destination-research, use `pantheon get process update-destination-research --id <destination-research id> --sections activities --actor <your_agent_name>`
- To get the instructions for updating logistics section of destination-research, use `pantheon get process update-destination-research --id <destination-research id> --sections logistics --actor <your_agent_name>`

**Sections**:
- **attractions**: Lists key sites, museums, and landmarks with operating hours and access information..
- **dining**: Documents recommended restaurants and food experiences organized by meal type and cuisine style..
- **activities**: Catalogs experiences and excursions that match user interests from the preferences artifact..
- **logistics**: Captures transportation options, neighborhood information, and practical travel considerations specific to the destination..

**Section Workflow**:
- **attractions (create)**: Research major sites and landmarks first to establish the primary activity options available.
- **dining (create)**: Compile dining options after attractions to ensure meal recommendations align with activity locations.
- **activities (create)**: Identify experiences matching user interests after establishing baseline attraction and dining options.
- **logistics (create)**: Research transportation and practical details last to inform realistic scheduling and transitions.
- **attractions (review)**: Verify all information is current and complete before using for itinerary generation.

**Process Operations**:
- **CREATE**: Generates a new research brief from web search and destination knowledge, producing consolidated information.
- **GET**: Retrieves the complete research brief for use in itinerary generation and budget estimation.
- **UPDATE**: Refreshes specific sections when new information becomes available or operator identifies outdated details.

**External Inputs & Canonicalization**:
- Operator-provided web search results or destination guides canonicalized into research brief sections.
- Operator verification of current operating hours, prices, and availability for attractions and restaurants.

**Manual Operator Actions**:
- Operator uses web search to gather current destination information before creating research brief.
- Operator verifies operating hours and access requirements for major attractions listed in research.
- Operator confirms price ranges and availability for recommended restaurants and activities.

#### trip-plan Artifact

**Purpose**: Provides the complete, formatted travel plan that users can directly follow, serving as the primary deliverable that eliminates ambiguity and enables immediate action.

**Build Mode**: `modular`

**Source Reference**: Foundation explicitly identifies 'Day-by-Day Itinerary' as a high-leverage artifact that 'Provides the complete, formatted travel plan that users can directly follow. This is the primary deliverable that eliminates ambiguity and enables immediate action.' Key objectives include 'Create a formatted day-by-day itinerary with hourly schedules, activity descriptions, and practical details' and 'Include budget breakdown showing estimated costs per activity, meal, and transportation.'

**Pantheon Commands**
- To get the instructions for creating trip-plan, use `pantheon get process create-trip-plan --actor <your_agent_name>`
- To get the instructions for updating overview section of trip-plan, use `pantheon get process update-trip-plan --id <trip-plan id> --sections overview --actor <your_agent_name>`
- To get the instructions for updating daily_schedule section of trip-plan, use `pantheon get process update-trip-plan --id <trip-plan id> --sections daily_schedule --actor <your_agent_name>`
- To get the instructions for updating logistics_guide section of trip-plan, use `pantheon get process update-trip-plan --id <trip-plan id> --sections logistics_guide --actor <your_agent_name>`
- To get the instructions for updating budget_breakdown section of trip-plan, use `pantheon get process update-trip-plan --id <trip-plan id> --sections budget_breakdown --actor <your_agent_name>`
- To get the instructions for updating operator_notes section of trip-plan, use `pantheon get process update-trip-plan --id <trip-plan id> --sections operator_notes --insert-mode=prepend --actor <your_agent_name>`

**Sections**:
- **overview**: Summarizes trip dates, destination, and daily themes to provide quick reference and context..
- **daily_schedule**: Contains the hour-by-hour itinerary with activities, locations, timing, and transitions for each day..
- **logistics_guide**: Details transportation options, accommodation recommendations, and practical travel information..
- **budget_breakdown**: Itemizes estimated costs by category and day to provide clear financial expectations..
- **operator_notes**: Records revision requests, manual verifications, and follow-up actions for the operator..

**Section Workflow**:
- **overview (create)**: Generate trip summary first to establish the overall structure and daily themes.
- **daily_schedule (create)**: Build detailed hour-by-hour schedule after overview using preferences and research brief data.
- **logistics_guide (create)**: Add transportation and accommodation details after schedule to ensure alignment with activity locations.
- **budget_breakdown (create)**: Calculate costs after schedule is complete to provide accurate estimates based on selected activities.
- **daily_schedule (review)**: Verify timing is realistic and activities flow logically before finalizing.
- **budget_breakdown (review)**: Confirm cost estimates align with user budget preferences from the preferences artifact.
- **daily_schedule (update)**: Revise specific days or activities based on operator feedback or preference changes.
- **operator_notes (update)**: Log revision requests and verification tasks as they arise throughout the planning process.

**Process Operations**:
- **CREATE**: Generates a new trip plan from preferences and research artifacts, producing the complete day-by-day itinerary.
- **GET**: Retrieves the complete trip plan or specific sections for operator review and user delivery.
- **UPDATE**: Modifies specific sections when user requests changes or operator identifies improvements.

**External Inputs & Canonicalization**:
- Travel preferences artifact providing destination, dates, interests, and budget requirements.
- Destination research artifact supplying verified information about attractions, dining, and logistics.
- Operator revision requests and feedback captured in operator notes section.

**Manual Operator Actions**:
- Operator reviews complete trip plan to verify it matches user intent and preferences.
- Operator confirms current operating hours and prices for activities in the schedule.
- Operator performs actual bookings for flights, accommodations, and activities based on the plan.
- Operator delivers finalized trip plan to user in preferred format.

### Process Interactions

The CREATE preferences process ingests user natural language and outputs a standardized artifact that the CREATE research process consumes to determine what information to gather. The GET preferences operation retrieves validated requirements that constrain research scope. The CREATE research process produces a brief that the CREATE trip plan process ingests alongside preferences to generate the complete itinerary. The GET research operation ensures the itinerary designer works from verified data rather than assumptions. The UPDATE trip plan process uses GET preferences and GET research to maintain alignment when revisions occur. Each hand-off passes structured Pantheon artifacts only, never raw external data, preserving the closed loop and preventing context drift.

### Operator Notes

Operators must verify all time-sensitive information before finalizing itineraries, as operating hours, prices, and availability change frequently. Use web search to gather current destination data before creating the research brief, and confirm critical details before delivering the trip plan to users. The framework cannot monitor real-time changes or perform bookings. All actual travel arrangements remain manual operator responsibilities executed outside Pantheon after the trip plan artifact is approved.

## Artifact Design
updated_at: 2025-10-13 HH:MM PM PDT

### Process Architecture Overview

The travel itinerary planner team operates through a four-stage artifact pipeline. First, the preferences summary standardizes all user inputs into structured data. Second, the flight-options artifact provides current flight choices organized by price and duration for user selection. Third, the destination research brief consolidates verified location information. Finally, the day-by-day itinerary combines preferences, flight selection, and research into a complete travel plan. Each artifact feeds the next, preventing information loss and ensuring the primary implementation LLM works from complete, validated inputs rather than ambiguous natural language.

### Core Artifacts

#### flight-options Artifact

**Purpose**: Captures specific flight options with pricing and logistics, organized by price and duration to help users make informed booking decisions.

**Build Mode**: `complete`

**Source Reference**: The reference workflow (travel-idea.txt, lines 37-38, 94-112, 152-224) explicitly demonstrates a 'flight agent' that looks up flight information. The classifier routes to 'flight info' (line 88), and the flight agent is designed to 'always recommend a specific flight' using 'airport codes' with 'web search' for 'up-to-date information about flights' (lines 100-112). This artifact canonicalizes those flight lookup results into a structured format for user selection.

**Pantheon Commands**
- To get the instructions for creating flight-options, use `pantheon get process create-flight-options --actor <your_agent_name>`

- To get the instructions for updating search_criteria section of flight-options, use `pantheon get process update-flight-options --id <flight-options id> --sections search_criteria --actor <your_agent_name>`

- To get the instructions for updating cheapest_flights section of flight-options, use `pantheon get process update-flight-options --id <flight-options id> --sections cheapest_flights --actor <your_agent_name>`

- To get the instructions for updating shortest_flights section of flight-options, use `pantheon get process update-flight-options --id <flight-options id> --sections shortest_flights --actor <your_agent_name>`

**Sections**:

- **search_criteria**: Records the origin, destination, and date used to find flights, establishing the search parameters for all results..

- **cheapest_flights**: Lists the top 5 most affordable flight options sorted by price to help budget-conscious travelers..

- **shortest_flights**: Lists the top 5 fastest flight options sorted by duration to help time-sensitive travelers..

**Section Workflow**:

- **search_criteria (create)**: Capture search parameters first to establish the scope and constraints for all flight results.

- **cheapest_flights (create)**: Populate price-optimized options after search criteria to provide budget-focused recommendations.

- **shortest_flights (create)**: Populate duration-optimized options after cheapest flights to provide time-focused alternatives.

- **cheapest_flights (review)**: Verify pricing accuracy and availability before presenting options to user, as prices change rapidly.

**Process Operations**:

- **CREATE**: Generates flight options from web search results, producing structured choices organized by price and duration.

- **GET**: Retrieves the complete flight options artifact for user review and booking decision.

- **UPDATE**: Refreshes specific option categories when prices change or new flights become available.

**External Inputs & Canonicalization**:

- Web search results for current flight availability, pricing, and schedules canonicalized into cheapest_flights and shortest_flights sections.

- User-provided search criteria (origin, destination, date) canonicalized into the search_criteria section.

**Manual Operator Actions**:

- Operator uses web search to gather current flight information before creating the artifact.

- Operator verifies flight prices and availability are current before presenting options to user.

- Operator performs actual flight booking through airline or booking platform after user selects an option.

### Process Interactions

The CREATE preferences process ingests user natural language and outputs a standardized artifact. When users need flight information, the CREATE flight-options process consumes search criteria and web search results to produce organized flight choices. The GET flight-options operation retrieves available options for user selection before trip planning begins. The CREATE research process uses preferences and selected flight details to gather destination information. The CREATE trip plan process ingests preferences, flight selection, and research to generate the complete itinerary. Each hand-off passes structured Pantheon artifacts only, preserving the closed loop and preventing context drift. The UPDATE flight-options process refreshes pricing when market conditions change.

### Operator Notes

Operators must verify all time-sensitive information before finalizing itineraries and flight selections, as operating hours, prices, and availability change frequently. Use web search to gather current destination data and flight information before creating artifacts. Flight prices fluctuate rapidly - always confirm costs before presenting options to users and before actual booking. The framework cannot monitor real-time changes, perform bookings, or track seat availability. All actual travel arrangements and flight purchases remain manual operator responsibilities executed outside Pantheon after artifacts are approved.

<!-- SECTION:END:ARTIFACTS -->

<!-- SECTION:START:AGENTS -->

## Agent Architecture
updated_at: 2025-10-13 HH:MM PM PDT

### Team Composition

The travel-itinerary-planner team consists of four specialized agents working in a sequential pipeline. The trip-understanding-assistant starts the process by converting user natural language requests into a structured preferences artifact, ensuring all downstream work builds from standardized requirements. The flight-finder searches online for flight options matching the travel dates and route, preparing a structured comparison of prices and travel times. The destination-guide prepares a comprehensive research brief by consolidating operator-provided information about attractions, dining, and logistics into a single authoritative reference. Finally, the itinerary-designer combines preferences, flight options, and research to generate the complete day-by-day trip plan with timing, activities, and budget. Each agent prepares artifacts for the human operator rather than executing tasks autonomously. The operator provides travel requests, verifies flight information accuracy, supplies web search results for destination research, and confirms the final itinerary before booking. This design keeps the operator in control while the agents handle the detailed preparation work.

### Agent Definitions

#### trip-understanding-assistant

**Role**: Interprets natural language travel requests and prepares structured preferences artifacts that capture destination, dates, interests, and budget in a standardized format.

**Core Responsibilities**:

- Extract destination, trip duration, and travel dates from user natural language input

- Identify and categorize user interests including activity types, pace preferences, and travel style

- Capture budget parameters and spending preferences from user descriptions

- Structure all extracted information into the travel-preferences artifact

- Format preferences for easy operator review and verification

**Key Capabilities**:

- Parse conversational travel descriptions to extract structured requirements

- Distinguish between explicit preferences and implied requirements

- Standardize varied natural language into consistent artifact format

- Identify missing information that requires operator clarification

**Pantheon Workflows**:

- **create-travel-preferences**: Generates a new preferences artifact from user natural language input, producing standardized travel requirements for downstream agents.

- **update-travel-preferences**: Modifies specific preference sections when user refines requirements or operator identifies missing details.

**Manual Handoffs**:

- Operator provides initial travel request in natural language describing destination, duration, interests, and budget

- Operator reviews preferences artifact to confirm all requirements were captured correctly before proceeding to research phase

#### flight-finder

**Role**: Searches for flight options online and prepares structured flight data comparing prices and travel times for the requested route and dates.

**Core Responsibilities**:

- Search online for flight options matching the origin, destination, and travel dates

- Extract flight details including price, airline, flight number, and departure/arrival times

- Identify and organize the top 5 cheapest flights by total price

- Identify and organize the top 5 shortest flights by total travel time

- Format flight data into the flight-options artifact for easy comparison

**Key Capabilities**:

- Parse web search results to extract structured flight information

- Compare flights by price and duration to identify best options

- Convert times to consistent 24-hour format for clarity

- Organize complex flight data into user-friendly comparisons

**Pantheon Workflows**:

- **create-flight-options**: Generates a new flight options artifact from web search results, producing structured comparisons of available flights.

- **update-flight-options**: Refreshes flight data when dates change or operator finds better options.

**Manual Handoffs**:

- Operator provides origin, destination, and travel dates for flight search

- Operator verifies flight information accuracy and current availability

#### destination-guide

**Role**: Consolidates operator-provided destination information into a comprehensive research brief covering attractions, dining, activities, and local logistics.

**Core Responsibilities**:

- Organize operator-provided web search results into structured research sections

- Compile information about attractions including operating hours and access details

- Catalog dining options organized by meal type and cuisine matching user interests

- Document local transportation options and neighborhood recommendations

- Prepare verification checklists for time-sensitive information

**Key Capabilities**:

- Structure unorganized destination information into standardized research format

- Cross-reference research findings with user preferences from the travel-preferences artifact

- Identify information gaps requiring additional operator research

- Flag time-sensitive details that need verification before itinerary generation

**Pantheon Workflows**:

- **create-destination-research**: Generates a new research brief from operator-provided information, producing consolidated destination data for itinerary design.

- **update-destination-research**: Refreshes specific research sections when operator provides updated information or identifies outdated details.

**Manual Handoffs**:

- Operator uses web search to gather current destination information including attraction details, restaurant options, and transportation

- Operator verifies operating hours and access requirements for major attractions listed in research

- Operator confirms price ranges and availability for recommended restaurants and activities

#### itinerary-designer

**Role**: Designs complete day-by-day trip plans by combining preferences and research into realistic schedules with timing, logistics, and budget breakdowns.

**Core Responsibilities**:

- Generate hour-by-hour daily schedules with activities sequenced logically by location and timing

- Calculate realistic travel times between activities and ensure itinerary flow is practical

- Create budget breakdowns itemizing costs by activity, meal, and transportation

- Prepare logistics guidance covering transportation options and accommodation location recommendations

- Revise specific itinerary sections based on operator feedback and user revision requests

**Key Capabilities**:

- Design optimized daily schedules accounting for opening hours, travel times, and activity duration

- Balance itinerary pacing with user preferences for fast-paced or leisurely travel

- Generate cost estimates based on destination pricing and user budget parameters

- Format complex schedule information into clear, actionable user deliverables

**Pantheon Workflows**:

- **create-trip-plan**: Generates a new trip plan from preferences and research artifacts, producing the complete day-by-day itinerary as the primary user deliverable.

- **update-trip-plan**: Modifies specific trip plan sections when user requests changes or operator identifies timing or logistical improvements.

**Manual Handoffs**:

- Operator reviews complete trip plan to verify it matches user intent and preferences before delivery

- Operator confirms current operating hours and prices for activities in the final schedule

- Operator performs actual bookings for flights, accommodations, and activities based on the approved plan

- Operator delivers finalized trip plan to user in their preferred format

<!-- SECTION:END:AGENTS -->

<!-- SECTION:START:PROFILE -->

## Team Profile Configuration
updated_at: 2025-10-13 HH:MM PM PDT

### Configuration Overview

This team requires no configurable properties or profiles. The travel-itinerary-planner operates in a single, well-defined mode: transforming natural language travel requests into practical, day-by-day itineraries for single-destination trips. All trip-specific variation (destination, duration, interests, budget, travel style) is captured in the travel-preferences artifact on a per-trip basis, not as team-level configuration. The three-agent workflow (trip-understanding-assistant -> destination-guide -> itinerary-designer) and sequential artifact pipeline (preferences -> research -> plan) represent core architecture rather than optional operational modes. Adding configuration would violate the team's fundamental principle of simplicity first and introduce maintenance overhead without addressing any concrete user need or workflow split.

### Profile Configuration

No configuration profiles required for this team. The team operates with a single, consistent configuration.

<!-- SECTION:END:PROFILE -->
