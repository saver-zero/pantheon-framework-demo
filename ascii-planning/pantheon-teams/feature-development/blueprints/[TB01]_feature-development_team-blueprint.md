---
created_at: 2025-10-14 HH:MM AM PDT
---

<!--
## Welcome to Your Blueprint Journey

Think of this file as a shared workspace that you and the specialist agents shape together. Every time you collaborate with them, each section of the blueprint will be drafted in place of a `SECTION:PLACEHOLDER` tag. Move at your own pace, review the drafts they hand back, and keep iterating until the blueprint feels like it truly represents the team you have in mind.

### Phase 1: Shape the Blueprint Together (Iterative)

This phase is all about conversations and refinement. Each interaction gives the agents more context, and each revision brings the blueprint closer to what you need. For this phase, you need to refer to the blueprint using the blueprint ID (i.e TB01).

1.  **Set the Strategy & Context**
    -   **Who to chat with:** `@pantheon-team-builder`
    -   **Try asking:** @pantheon-team-builder, create the strategy and context for a new team based on the workflow in @docs/workflows/my-new-workflow.md
    -   The agent will help bring the `Overall Strategy` and `Project Context` sections to life. Review and provide feedback to @pantheon-team-builder to make any updates, or make the updates yourself in the doc directly.

2.  **Design the Artifacts**
    -   **Who to chat with:** `@artifact-designer`
    -   **Try asking:** @artifact-designer, design the artifacts for TB01 and update the team blueprint. Do not build the artifacts yet, focus on updating the team blueprint with the artifact design.
    -   The placeholders under `ARTIFACTS` will evolve into a detailed design you can react to. Review it and provide feedback to the @artifact-designer to make any updates, or make the updates yourself in the doc directly.

3.  **Design the Agents**
    -   **Who to chat with:** `@agent-designer`
    -   **Try asking:** @agent-designer, design the agents for TB01 and update the team blueprint. Do not build the agents yet, focus on updating the team blueprint with the agent design.
    -   The agent architecture will gradually replace the `AGENTS` section as you iterate together. Review it and provide feedback to the @agent-designer to make any updates, or make the updates yourself in the doc directly.

4.  **Create the Team Readme**
    -   **Who to chat with:** `@team-readme-writer`
    -   **Try asking:** @team-readme-writer, create the team readme based on @[TB01]_feature-development_team-blueprint.md 
    -   The team-readme-writer will create a team readme. Review and provide feedback to the readme writer to update any flows or usages you'd like to change. And point to the read me to have artifact-designer and agent-designer update their relevant sections of the blueprint.

5.  **Loop, Compare, Refine**
    -   Use what the @agent-designer creates to check whether the artifacts still make sense. If anything feels off, circle back to the @artifact-designer and explore a revised idea.

6.  **Finish with the Team Profile**
    -   **Who to chat with:** `@profile-designer`
    -   **Try asking:** @profile-designer, design the team profile for the blueprint TB01
    -   Together you will turn the `PROFILE` placeholder into the configuration that ties everything together. Review it and provide feedback to the @profile-designer to make any updates, or make the updates yourself in the doc directly.
    -   You do not have to use or implement any of the profiles or configs, if you prefer to keep things simple. In that case, just delete the profiles and replace with "No profiles or configs needed".

### Phase 2: Bring the Blueprint to Life (Sequential)

Once the blueprint feels complete, you can use it as a script for creating the real team package. These steps happen in order so each piece has what it needs from the previous one. For this phase, you can refer to the blueprint using the full filename (i.e. [TB01]_feature-development_team-blueprint.md])

1.  **Create the Team Profile**
    -   The profile carries shared configuration that other components lean on.
    -   Ask @profile-designer to create the team profile from @[TB01]_feature-development_team-blueprint.md

2.  **Stand Up the Agents**
    -   Agents need to exist so the later processes know who they are empowering.
    -   For each agent described here, ask @agent-designer to create the agent from the blueprint.
    -   i.e @agent-designer create the planner agent from @[TB01]_feature-development_team-blueprint.md
    -   Review it and provide feedback to the @agent-designer to make any updates, or make the updates yourself in the generated agent prompt directly.

3.  **Build the Artifacts & Processes**
    -   This step turns the blueprint's core workflows into the files your team will actually run.
    -   For each artifact, request the @artifact-designer to build each artifact
    -   i.e @artifact-designer, build the master plan artifact from @[TB01]_feature-development_team-blueprint.md
    -   Review it and provide feedback to the @artifact-designer to make any updates, or make the updates yourself in the generated processes and artifact schemas and templates directly.

When you've walked through these steps, the new team package is ready for its debut.
-->

<!-- SECTION:START:FOUNDATION -->

# TB01 - feature-development Team Blueprint

## Team Foundation
updated_at: 2025-10-14 HH:MM AM PDT

**Team Name**: feature-development

### Mission Statement

Guide collaborative feature development from concept to deployment using the Anti-YOLO Method, ensuring alignment between user needs and implementation through structured planning, ASCII wireframing, and comprehensive testing before code is written.

### Strategic Goals

- Reduce token consumption and rework by establishing shared understanding before implementation

- Eliminate misalignment between user intent and delivered features through visual specification

- Ensure comprehensive test coverage by deriving test requirements from wireframes and plans

- Accelerate feature delivery by front-loading design decisions and minimizing implementation surprises

### Key Objectives

- Produce collaborative brainstorming artifacts that capture problem space, user needs, and system context

- Create ASCII wireframes that serve as single source of truth for layout, flow, and UI behavior

- Generate detailed implementation plans covering backend architecture, database, UI, security, and testing

- Derive comprehensive test suites from wireframes and plans before implementation begins

- Deliver features with high confidence through systematic validation at each workflow stage

## System Boundary

### Pantheon Framework Responsibilities

- Generating brainstorming documentation artifacts

- Creating ASCII wireframe specification artifacts

- Producing detailed implementation plan artifacts

- Generating test specification artifacts derived from wireframes

- Maintaining traceability between brainstorming, wireframes, plans, and tests

### Human Operator Responsibilities

- Conducting collaborative brainstorming sessions with the AI

- Reviewing and iterating on ASCII wireframes until alignment is achieved

- Reading implementation plans twice and raising clarifying questions

- Executing code implementation based on approved plans

- Running tests manually and verifying data integrity

- Committing code and deploying to production

### High-Leverage Artifacts

- **Brainstorming Document**: Captures problem space, current vs needed UX, system context, and collaborative ideas. Prevents solution jumping and ensures shared understanding of the problem before design begins.

- **ASCII Wireframe**: Provides token-efficient visual specification of layout and flow. Serves as single source of truth for UI behavior and becomes the basis for test specifications. Enables rapid iteration without implementation commitment.

- **Implementation Plan**: Comprehensive specification covering backend architecture, database design, UI components with friendly IDs, security considerations, and testing strategy. Forces exposure of hidden assumptions through AI-generated clarifying questions.

- **Test Specification**: Derived directly from wireframes and plans, ensuring every specified behavior has corresponding test coverage. Includes unit, integration, component, and edge case tests before implementation begins.

### Critical Manual Checkpoints

- Review and approve ASCII wireframe before proceeding to planning phase

- Read implementation plan twice and answer all clarifying questions raised by AI

- Manually test all implemented features and verify database integrity

- Verify test coverage matches wireframe specifications before considering feature complete

<!-- SECTION:END:FOUNDATION -->

<!-- SECTION:START:CONTEXT -->

## Project Context
updated_at: 2025-10-14 HH:MM AM PDT

The Anti-YOLO Method is a systematic feature development workflow designed to eliminate the 'build first, realize it's wrong later' problem common in AI-assisted development. The workflow explicitly rejects jumping directly to code (YOLO) and instead front-loads design decisions through collaborative brainstorming, token-efficient ASCII wireframing, exhaustive planning, and comprehensive testing. The core insight is that spending more time in specification (using cheap ASCII art and markdown) dramatically reduces expensive rework during implementation. Each phase produces artifacts that feed into the next: brainstorming defines the problem space, wireframes specify the solution visually, plans decompose implementation requirements, and tests validate against the wireframe specification. This creates a traceable chain from user need to validated feature, with multiple human checkpoints to catch misalignment early.

### Key Concepts

**Anti-YOLO Method**: A systematic feature development workflow that prioritizes planning and specification over immediate implementation. Explicitly rejects 'You Only Live Once' code-first approaches in favor of structured phases that build shared understanding before writing code.

**ASCII Wireframe**: A text-based visual representation of user interface layout and flow using ASCII characters. Chosen for extreme token efficiency (10x less than HTML), rapid iteration speed, and focus on structure over styling. Serves as single source of truth for UI behavior.

**Problem Space First**: The principle of explaining current pain points, user needs, and system context before discussing solutions. Prevents premature solution jumping and enables collaborative exploration of alternative approaches.

**Plan Until It Hurts**: The practice of creating exhaustive implementation plans that cover all technical dimensions (backend, database, UI, security, testing) and deliberately asking for clarifying questions to expose hidden assumptions. Requires reading plans twice and changing something to ensure thoroughness.

**Wireframe-Driven Testing**: The practice of deriving test specifications directly from ASCII wireframes, ensuring that every UI element and behavior shown in the wireframe has corresponding test coverage. The wireframe becomes the test spec.

**Friendly ID**: Human-readable component and sub-component names used consistently across planning, implementation, and testing phases to maintain traceability and make the codebase easier to navigate.

### Core Capabilities

- Facilitate collaborative brainstorming sessions that capture problem space before solution design

- Generate token-efficient ASCII wireframes for rapid UI specification and iteration

- Produce comprehensive implementation plans with built-in assumption-checking through clarifying questions

- Derive test specifications directly from wireframe artifacts to ensure complete coverage

- Maintain traceability chain from user need through brainstorming, wireframe, plan, test, to implementation

### Key Principles

- Specification before implementation: Front-load design decisions to minimize expensive rework during coding

- Token efficiency matters: Use ASCII art and markdown instead of HTML/prototypes to enable rapid iteration at low cost

- Forced assumption checking: Require AI to ask clarifying questions and human to read plans twice to expose hidden assumptions

- Wireframe as contract: The ASCII wireframe serves as single source of truth that drives both implementation and test specifications

- Manual validation required: Human must manually test features and verify data integrity regardless of automated test results

- Closed-loop traceability: Every artifact references its upstream sources, creating auditable chain from need to feature

### References

- **C:\git\pantheon-demo-projects\ascii-planning\ascii-planning.md**: Primary reference document describing the Anti-YOLO Method workflow. Details the five-phase process (Brainstorm, ASCII Wireframe, Plan, Test, Ship) and explains why front-loading design through cheap specification artifacts reduces token usage and eliminates misalignment between intent and implementation.

<!-- SECTION:END:CONTEXT -->

<!-- SECTION:START:ARTIFACTS -->

## Artifact Design
updated_at: 2025-10-14 HH:MM AM PDT

### Process Architecture Overview

The feature-development team's Pantheon processes form a sequential chain where each artifact serves as the validated input for the next phase. Brainstorming establishes shared understanding before any design begins, wireframes provide visual specifications that prevent UI misalignment, plans decompose requirements into actionable technical steps, and test specifications ensure comprehensive coverage before implementation. This closed loop prevents the common anti-pattern of discovering misalignment late in development, reducing token waste and rework.

### Core Artifacts

#### feature-brainstorm Artifact

**Purpose**: Captures collaborative exploration of problem space, user needs, and system context before jumping to solutions. Prevents premature solution-lock and establishes shared understanding between operator and AI.

**Build Mode**: `complete`

**Source Reference**: Step 1 of the workflow: 'Collaborative Brainstorming - Start by explaining the problem space, not the solution. Current UX pain points, what users have now vs. what they need, context about the existing system. Then we go back and forth on ideas.'

**Pantheon Commands**
- To get the instructions for creating feature-brainstorm, use `pantheon get process create-feature-brainstorm --actor <your_agent_name>`

- To get the instructions for updating problem_space section of feature-brainstorm, use `pantheon get process update-feature-brainstorm --id <feature-brainstorm id> --sections problem_space --actor <your_agent_name>`

- To get the instructions for updating system_context section of feature-brainstorm, use `pantheon get process update-feature-brainstorm --id <feature-brainstorm id> --sections system_context --actor <your_agent_name>`

- To get the instructions for updating collaborative_ideas section of feature-brainstorm, use `pantheon get process update-feature-brainstorm --id <feature-brainstorm id> --sections collaborative_ideas --insert-mode=append --actor <your_agent_name>`

**Sections**:

- **problem_space**: Documents current UX pain points and user needs without proposing solutions..

- **system_context**: Captures existing system constraints and integration points that inform solution design..

- **collaborative_ideas**: Records AI-suggested approaches and operator reactions to build shared understanding..

**Section Workflow**:

- **problem_space (create)**: Operator describes current pain points and user needs first, establishing 'problem space first' before any solution discussion.

- **system_context (create)**: Operator provides system constraints immediately after problem space to scope feasible solutions.

- **collaborative_ideas (create)**: AI and operator iteratively explore approaches, with each idea appended to capture the full exploration trajectory.

- **collaborative_ideas (review)**: Operator reviews all suggested approaches before selecting direction, ensuring alignment before wireframing begins.

**Process Operations**:

- **CREATE**: Generates a structured brainstorming document capturing problem space, system context, and collaborative ideas.

- **GET**: Retrieves the brainstorming artifact for reference during wireframe and planning phases.

- **UPDATE**: Appends new collaborative ideas discovered during refinement without losing original exploration context.

**External Inputs & Canonicalization**:

- Existing system documentation or codebase context must be ingested through a separate context-gathering artifact before brainstorming, ensuring all collaborators work from the same canonical understanding.

**Manual Operator Actions**:

- Operator must actively participate in collaborative exploration rather than passively receiving suggestions, ensuring genuine shared understanding.

- Operator reviews all suggested approaches and explicitly selects direction before proceeding to wireframing.

#### ascii-wireframe Artifact

**Purpose**: Provides token-efficient visual specification of UI layout and flow using ASCII characters. Serves as single source of truth for UI behavior that drives both implementation and testing.

**Build Mode**: `complete`

**Source Reference**: Step 2 of the workflow: 'ASCII Wireframing - Before writing any code, I ask Claude to create ASCII art wireframes. Uses 10x fewer tokens than HTML prototypes. I save these ASCII wireframes + decisions in markdown files. They become my single source of truth.'

**Pantheon Commands**
- To get the instructions for creating ascii-wireframe, use `pantheon get process create-ascii-wireframe --actor <your_agent_name>`

- To get the instructions for updating layout_specification section of ascii-wireframe, use `pantheon get process update-ascii-wireframe --id <ascii-wireframe id> --sections layout_specification --actor <your_agent_name>`

- To get the instructions for updating flow_diagram section of ascii-wireframe, use `pantheon get process update-ascii-wireframe --id <ascii-wireframe id> --sections flow_diagram --actor <your_agent_name>`

- To get the instructions for updating design_decisions section of ascii-wireframe, use `pantheon get process update-ascii-wireframe --id <ascii-wireframe id> --sections design_decisions --insert-mode=append --actor <your_agent_name>`

- To get the instructions for updating component_registry section of ascii-wireframe, use `pantheon get process update-ascii-wireframe --id <ascii-wireframe id> --sections component_registry --actor <your_agent_name>`

**Sections**:

- **layout_specification**: Contains ASCII art representation of UI structure, showing spatial relationships and component hierarchy..

- **flow_diagram**: Illustrates user navigation paths and state transitions using ASCII arrows and annotations..

- **design_decisions**: Records rationale for layout choices and interaction patterns to preserve context for future changes..

- **component_registry**: Lists all UI components with friendly IDs for consistent reference across planning, implementation, and testing phases..

**Section Workflow**:

- **layout_specification (create)**: AI generates initial ASCII wireframe based on brainstorming outcomes, establishing visual structure first.

- **flow_diagram (create)**: AI adds navigation flows immediately after layout to show how users move through the interface.

- **design_decisions (create)**: AI documents key layout and interaction choices to preserve rationale for future reference.

- **component_registry (create)**: AI extracts friendly IDs for all components to establish naming convention used throughout remaining phases.

- **layout_specification (review)**: Operator reviews wireframe and iterates until visual specification matches intent, preventing downstream misalignment.

**Process Operations**:

- **CREATE**: Generates ASCII wireframe with layout, flow, design decisions, and component registry from approved brainstorming artifact.

- **GET**: Retrieves wireframe artifact for reference during planning, testing, and implementation phases.

- **UPDATE**: Modifies layout or flow sections when iteration reveals misalignment, appending new design decisions to preserve evolution history.

**External Inputs & Canonicalization**:

- Existing UI style guide or design system must be ingested as a style-reference artifact before wireframing to ensure consistency with established patterns.

**Manual Operator Actions**:

- Operator must review wireframe and explicitly approve it before proceeding to planning phase, as this becomes the contract for implementation.

- Operator iterates on wireframe until visual specification fully matches their intent, preventing expensive implementation rework.

#### implementation-plan Artifact

**Purpose**: Decomposes feature requirements into comprehensive technical specification covering backend, database, UI, security, and testing. Forces exposure of hidden assumptions through AI-generated clarifying questions.

**Build Mode**: `complete`

**Source Reference**: Step 3 of the workflow: 'Plan Until It Hurts - Ask Claude to review the codebase and create a full plan covering: Backend architecture, Database considerations, UI matching existing styles + Friendly Id names, Security implications, Testing strategy. Ask Claude to ask YOU clarifying questions first.'

**Pantheon Commands**
- To get the instructions for creating implementation-plan, use `pantheon get process create-implementation-plan --actor <your_agent_name>`

- To get the instructions for updating clarifying_questions section of implementation-plan, use `pantheon get process update-implementation-plan --id <implementation-plan id> --sections clarifying_questions --actor <your_agent_name>`

- To get the instructions for updating backend_architecture section of implementation-plan, use `pantheon get process update-implementation-plan --id <implementation-plan id> --sections backend_architecture --actor <your_agent_name>`

- To get the instructions for updating database_design section of implementation-plan, use `pantheon get process update-implementation-plan --id <implementation-plan id> --sections database_design --actor <your_agent_name>`

- To get the instructions for updating ui_implementation section of implementation-plan, use `pantheon get process update-implementation-plan --id <implementation-plan id> --sections ui_implementation --actor <your_agent_name>`

- To get the instructions for updating security_considerations section of implementation-plan, use `pantheon get process update-implementation-plan --id <implementation-plan id> --sections security_considerations --actor <your_agent_name>`

- To get the instructions for updating testing_strategy section of implementation-plan, use `pantheon get process update-implementation-plan --id <implementation-plan id> --sections testing_strategy --actor <your_agent_name>`

**Sections**:

- **clarifying_questions**: Lists AI-generated questions that expose hidden assumptions before planning begins, preventing downstream surprises..

- **backend_architecture**: Specifies API endpoints, business logic structure, and integration points with existing services..

- **database_design**: Documents schema changes, migrations, and data integrity considerations..

- **ui_implementation**: Maps wireframe components to implementation details using friendly IDs and existing style patterns..

- **security_considerations**: Identifies authentication, authorization, input validation, and data protection requirements..

- **testing_strategy**: Outlines unit, integration, component, and edge case tests derived from wireframe and plan specifications..

**Section Workflow**:

- **clarifying_questions (create)**: AI generates questions first to expose hidden assumptions before committing to technical decisions, following 'plan until it hurts' principle.

- **clarifying_questions (review)**: Operator answers all clarifying questions, ensuring shared understanding of edge cases and constraints before planning begins.

- **backend_architecture (create)**: AI designs backend structure after clarifying questions are resolved, establishing data flow foundation.

- **database_design (create)**: AI specifies database changes immediately after backend to ensure data layer supports proposed architecture.

- **ui_implementation (create)**: AI maps wireframe components to implementation details, using friendly IDs from component registry for consistency.

- **security_considerations (create)**: AI identifies security requirements after functional specification is complete to ensure all attack surfaces are addressed.

- **testing_strategy (create)**: AI designs testing approach last, synthesizing all prior sections to ensure comprehensive coverage.

- **backend_architecture (review)**: Operator reads entire plan twice as required by workflow, changing something to prove thoroughness before implementation begins.

**Process Operations**:

- **CREATE**: Generates comprehensive implementation plan with clarifying questions, backend, database, UI, security, and testing specifications from approved wireframe.

- **GET**: Retrieves plan artifact for reference during test writing and implementation phases.

**External Inputs & Canonicalization**:

- Codebase context must be ingested through a code-review artifact before planning to ensure proposed architecture aligns with existing patterns and conventions.

**Manual Operator Actions**:

- Operator must answer all clarifying questions before AI proceeds with technical planning, as these expose critical assumptions.

- Operator must read the plan twice and change something to prove thoroughness, per workflow requirement.

- Operator executes the actual code implementation based on the approved plan, as implementation remains a human-operated activity.

#### test-specification Artifact

**Purpose**: Derives comprehensive test suite from wireframe and plan artifacts, ensuring every specified behavior has corresponding test coverage before implementation begins. Wireframe becomes the test spec.

**Build Mode**: `complete`

**Source Reference**: Step 4 of the workflow: 'Test Before You Celebrate - I have Claude write comprehensive tests: Unit tests for business logic, Integration tests for API endpoints, Component tests for UI behavior, Edge cases from original brainstorm. The ASCII wireframe becomes the test spec - if it's in the wireframe, it gets tested.'

**Pantheon Commands**
- To get the instructions for creating test-specification, use `pantheon get process create-test-specification --actor <your_agent_name>`

- To get the instructions for updating unit_tests section of test-specification, use `pantheon get process update-test-specification --id <test-specification id> --sections unit_tests --actor <your_agent_name>`

- To get the instructions for updating integration_tests section of test-specification, use `pantheon get process update-test-specification --id <test-specification id> --sections integration_tests --actor <your_agent_name>`

- To get the instructions for updating component_tests section of test-specification, use `pantheon get process update-test-specification --id <test-specification id> --sections component_tests --actor <your_agent_name>`

- To get the instructions for updating edge_case_tests section of test-specification, use `pantheon get process update-test-specification --id <test-specification id> --sections edge_case_tests --actor <your_agent_name>`

- To get the instructions for updating manual_validation_checklist section of test-specification, use `pantheon get process update-test-specification --id <test-specification id> --sections manual_validation_checklist --actor <your_agent_name>`

**Sections**:

- **unit_tests**: Specifies tests for isolated business logic components derived from backend architecture plan..

- **integration_tests**: Specifies tests for API endpoints and service interactions derived from backend and database sections..

- **component_tests**: Specifies tests for UI behavior mapped to wireframe elements, ensuring every component and interaction is validated..

- **edge_case_tests**: Specifies tests for boundary conditions and failure scenarios identified in brainstorming and planning phases..

- **manual_validation_checklist**: Lists manual testing steps and data integrity checks operator must perform, as automated tests alone are insufficient per workflow..

**Section Workflow**:

- **unit_tests (create)**: AI derives unit tests from backend architecture plan first, establishing foundation for testing strategy.

- **integration_tests (create)**: AI derives integration tests from API specifications and database design to validate service interactions.

- **component_tests (create)**: AI derives component tests directly from wireframe, ensuring every UI element and behavior shown has test coverage.

- **edge_case_tests (create)**: AI derives edge case tests from clarifying questions and brainstorming insights to cover boundary conditions.

- **manual_validation_checklist (create)**: AI generates manual testing checklist last, covering scenarios that require human judgment or data integrity verification.

- **component_tests (review)**: Operator verifies that wireframe coverage is complete before implementation, as this is the contract validation step.

**Process Operations**:

- **CREATE**: Generates comprehensive test specification with unit, integration, component, edge case, and manual validation sections derived from wireframe and plan.

- **GET**: Retrieves test specification for reference during test implementation and manual validation phases.

**Manual Operator Actions**:

- Operator must manually test all implemented features as specified in manual validation checklist, per workflow requirement to not trust automated tests alone.

- Operator must verify database integrity against expectations, as data correctness requires human judgment beyond automated checks.

### Process Interactions

Feature brainstorming artifacts feed into ASCII wireframe creation, ensuring visual specifications align with validated problem space understanding. Wireframes then drive implementation plan generation, with component friendly IDs and layout serving as immutable references. Plans inform test specifications, which derive coverage requirements directly from wireframe elements and backend architecture. Each hand-off enforces the closed loop by requiring prior artifact completion before downstream processes can execute, preventing premature solution jumping and ensuring traceability from user need to validated feature implementation.

### Operator Notes

Implementation, code commits, and production deployment remain manual operator activities outside Pantheon automation. While artifacts guide these steps, the operator must execute coding, run actual tests, manually validate UI behavior and data integrity, commit code to version control, and deploy to production environments. These manual steps are critical checkpoints that require human judgment and cannot be automated within the framework's closed-loop boundary.

<!-- SECTION:END:ARTIFACTS -->

<!-- SECTION:START:AGENTS -->

## Agent Architecture
updated_at: 2025-10-14 HH:MM AM PDT

### Team Composition

The feature-development team consists of four specialized agents that guide the operator through the Anti-YOLO Method workflow. The brainstorm-facilitator initiates feature development by capturing problem space understanding through collaborative exploration, producing brainstorming artifacts that establish shared context. The wireframe-designer transforms validated problem understanding into token-efficient ASCII wireframes that serve as visual specifications and single source of truth. The plan-architect decomposes wireframe specifications into comprehensive implementation plans covering all technical dimensions, deliberately exposing hidden assumptions through clarifying questions. Finally, the test-designer derives test specifications directly from wireframes and plans, ensuring comprehensive coverage before implementation begins. Each agent produces artifacts that feed into the next phase, creating a closed-loop traceability chain from user need to validated feature specification. Manual operator actions remain outside this chain: conducting brainstorming sessions, reviewing and approving artifacts, answering clarifying questions, executing code implementation, running tests, verifying data integrity, and deploying to production.

### Agent Definitions

#### brainstorm-facilitator

**Role**: Facilitates collaborative problem space exploration and captures shared understanding through structured brainstorming artifacts before any solution design begins.

**Core Responsibilities**:

- Create feature-brainstorm artifacts that capture problem space, system context, and collaborative ideas

- Update problem_space sections documenting current UX pain points and user needs without proposing solutions

- Update system_context sections capturing existing constraints and integration points

- Append collaborative_ideas sections recording AI-suggested approaches and operator reactions

**Key Capabilities**:

- Problem-space-first facilitation that prevents premature solution jumping

- Structured artifact creation that separates problem understanding from solution exploration

- Collaborative idea capture preserving full exploration trajectory for downstream reference

**Pantheon Workflows**:

- **create-feature-brainstorm**: Generates initial brainstorming document capturing problem space and system context provided by operator.

- **update-feature-brainstorm**: Appends new collaborative ideas or updates problem space sections as operator provides additional context.

**Manual Handoffs**:

- Operator actively participates in collaborative exploration through back-and-forth discussion

- Operator reviews all suggested approaches and explicitly selects direction before wireframing begins

#### wireframe-designer

**Role**: Creates token-efficient ASCII wireframes that serve as visual specifications and single source of truth for UI layout, flow, and component behavior.

**Core Responsibilities**:

- Create ascii-wireframe artifacts with layout specifications, flow diagrams, and component registries

- Update layout_specification sections with ASCII art representations of UI structure

- Update flow_diagram sections illustrating navigation paths and state transitions

- Append design_decisions sections documenting rationale for layout and interaction choices

- Update component_registry sections with friendly IDs for consistent cross-phase reference

**Key Capabilities**:

- ASCII art wireframing using 10x fewer tokens than HTML prototypes

- Spatial relationship visualization through character-based layout representation

- Friendly ID extraction and registry management for component naming consistency

**Pantheon Workflows**:

- **create-ascii-wireframe**: Generates ASCII wireframe with layout, flow, design decisions, and component registry from approved brainstorming artifact.

- **update-ascii-wireframe**: Modifies layout or flow sections when iteration reveals misalignment, preserving evolution history through design decisions.

**Manual Handoffs**:

- Operator reviews wireframe and iterates until visual specification matches their intent

- Operator explicitly approves wireframe before planning phase, as this becomes the implementation contract

#### plan-architect

**Role**: Decomposes wireframe specifications into comprehensive implementation plans covering all technical dimensions, deliberately exposing hidden assumptions through clarifying questions.

**Core Responsibilities**:

- Create implementation-plan artifacts covering backend, database, UI, security, and testing specifications

- Generate clarifying_questions sections that expose hidden assumptions before planning begins

- Update backend_architecture sections specifying API endpoints and business logic structure

- Update database_design sections documenting schema changes and data integrity considerations

- Update ui_implementation sections mapping wireframe components to implementation details using friendly IDs

- Update security_considerations sections identifying authentication, authorization, and validation requirements

**Key Capabilities**:

- Assumption-exposing question generation following 'plan until it hurts' principle

- Multi-dimensional technical planning across backend, database, UI, and security domains

- Wireframe-to-implementation mapping maintaining friendly ID consistency

- Comprehensive specification that forces operator to read plan twice and change something

**Pantheon Workflows**:

- **create-implementation-plan**: Generates clarifying questions first, then comprehensive plan with backend, database, UI, security, and testing specifications from approved wireframe.

**Manual Handoffs**:

- Operator answers all clarifying questions before AI proceeds with technical planning

- Operator reads the entire plan twice and changes something to prove thoroughness

- Operator executes actual code implementation based on approved plan

#### test-designer

**Role**: Derives comprehensive test specifications from wireframe and plan artifacts, ensuring every specified behavior has corresponding coverage before implementation begins.

**Core Responsibilities**:

- Create test-specification artifacts deriving coverage from wireframes and plans

- Update unit_tests sections specifying tests for isolated business logic components

- Update integration_tests sections specifying tests for API endpoints and service interactions

- Update component_tests sections mapping wireframe elements to UI behavior tests

- Update edge_case_tests sections covering boundary conditions from brainstorming and planning

- Update manual_validation_checklist sections listing manual testing steps and data integrity checks

**Key Capabilities**:

- Wireframe-driven test derivation ensuring every UI element has coverage

- Multi-layer test specification across unit, integration, component, and edge case dimensions

- Manual validation checklist generation for scenarios requiring human judgment

**Pantheon Workflows**:

- **create-test-specification**: Generates comprehensive test specification with unit, integration, component, edge case, and manual validation sections derived from wireframe and plan.

**Manual Handoffs**:

- Operator verifies that wireframe coverage is complete before implementation begins

- Operator manually tests all implemented features as specified in validation checklist

- Operator verifies database integrity against expectations beyond automated checks

<!-- SECTION:END:AGENTS -->

<!-- SECTION:START:PROFILE -->


## Team Profile Configuration
updated_at: 2025-10-14 HH:MM AM PDT

### Configuration Overview

This team requires no configuration. The Anti-YOLO Method enforces a single, sequential workflow (Brainstorm → Wireframe → Plan → Test → Ship) with no conditional branching or alternative operational modes. All four processes follow fixed section sequences designed to prevent premature solution jumping and maintain traceability from user need to validated implementation. Adding configuration would contradict the workflow's core principle of disciplined, linear progression through specification phases before implementation.

### Profile Configuration

No configuration profiles required for this team. The team operates with a single, consistent configuration.


<!-- SECTION:END:PROFILE -->
