---
created_at: 2025-10-14 HH:MM AM PDT
---

<!-- SECTION:START:OVERVIEW -->

# feature-development Team

## Mission

Guide you through building features systematically using the Anti-YOLO Method, from collaborative brainstorming through ASCII wireframing to comprehensive planning and testing, eliminating costly rework and token waste by front-loading design decisions.

## Value Proposition

Stop discovering misalignment after implementation starts. The feature-development team prevents 'wait, that's not what I meant' moments by establishing shared understanding before code begins, using token-efficient ASCII wireframes as single source of truth and comprehensive plans that expose hidden assumptions early.

## Key Capabilities

- **Problem Space Exploration**: Facilitate collaborative brainstorming that captures current pain points, user needs, and system context before jumping to solutions.

- **Visual Specification**: Create ASCII wireframes that use 10x fewer tokens than HTML prototypes while serving as your single source of truth for UI layout and behavior.

- **Comprehensive Planning**: Generate detailed implementation plans covering backend, database, UI, security, and testing while exposing hidden assumptions through clarifying questions.

- **Wireframe-Driven Testing**: Derive complete test specifications from wireframes and plans, ensuring every specified behavior has corresponding coverage before implementation.

- **Traceability Chain**: Maintain closed-loop connections from user need through brainstorming, wireframe, plan, and test artifacts, creating auditable feature development history.

## When to Use This Team

Use the feature-development team when you're building new features and want to avoid expensive rework. If you've experienced situations where you implement a feature only to realize it doesn't match what you envisioned, or you discover critical edge cases after coding has started, this team is for you. The workflow is especially valuable for complex features requiring UI changes, database modifications, and comprehensive testing, where front-loading design decisions dramatically reduces token consumption and implementation time. If you prefer jumping straight to code, this systematic approach may feel slow initially, but teams consistently report shipping faster overall by eliminating the 'build-realize-rebuild' cycle.

<!-- SECTION:END:OVERVIEW -->

<!-- SECTION:START:GETTING_STARTED -->

## Getting Started

Get started with your first feature using the Anti-YOLO Method. This quick start guides you through creating a simple feature end-to-end, establishing the workflow pattern you'll use for all features. The entire specification phase typically takes 30-60 minutes depending on feature complexity, but eliminates hours of implementation rework.

### Prerequisites

- Basic understanding of your application's architecture and tech stack

- Familiarity with markdown documents for reviewing artifacts

- Ability to describe current user pain points and system constraints

- Development environment ready for manual implementation after specification phase

### Your First Interaction

**Step 1: Start Collaborative Brainstorming**

Engage the brainstorm-facilitator to explore your feature's problem space. Describe current user pain points, what users need instead, and relevant system context. Avoid jumping to solutions - focus on the problem first.

Example:

```

brainstorm-facilitator, I need to capture the problem space for a new feature. Currently users can't filter their search results, which means they have to manually scan through hundreds of items. They need a way to narrow results by category, date range, and status. Our existing search uses Elasticsearch and returns JSON to a React frontend.

```

**Step 2: Review and Iterate Brainstorming**

Review the brainstorming document the facilitator creates. Check that problem space and system context are accurate. Provide feedback on suggested approaches in collaborative ideas section. Iterate until you have shared understanding.

💡 **Tip**: The facilitator will suggest approaches you may not have considered. Discuss trade-offs before selecting direction.

**Step 3: Create Your ASCII Wireframe**

Engage the wireframe-designer with your approved brainstorming artifact ID. The designer will create ASCII layouts, flow diagrams, and component registries. Review carefully and iterate until the wireframe exactly matches your vision.

Example:

```

wireframe-designer, create an ASCII wireframe for feature brainstorm FB123. Show the search interface with filter panel, results list, and pagination controls.

```

**Step 4: Generate Implementation Plan**

Engage the plan-architect with your approved wireframe artifact ID. Answer the clarifying questions thoroughly, then review the comprehensive plan covering backend, database, UI, security, and testing. Read it twice and change something to prove thoroughness.

Example:

```

plan-architect, create an implementation plan for ASCII wireframe WF456. Ask me clarifying questions first about edge cases and technical decisions.

```

### What Happens Next

After completing your first feature specification, you're ready for implementation. Execute the code based on your implementation plan, implement the tests from your test specification, and follow the manual validation checklist. Once you've completed a feature end-to-end, explore updating existing artifacts when requirements change mid-implementation. Try creating wireframes for different feature types like forms, dashboards, or multi-step workflows. Experiment with asking clarifying questions to the plan-architect beyond what it generates automatically. Review how friendly IDs from your component registry make code navigation easier during implementation.

### Common Questions

**Q: Why use ASCII wireframes instead of design tools?**

A: ASCII wireframes use 10x fewer tokens than HTML prototypes, enabling rapid iteration at low cost. They force focus on structure and flow rather than visual styling, which is exactly what you need for implementation specifications. They're also dead simple to edit and discuss with AI.

**Q: Can I skip phases if my feature is simple?**

A: The workflow scales to feature complexity. Simple features move quickly through each phase, while complex ones benefit from thorough specification. Even simple features benefit from wireframes to prevent misalignment, but you may spend only 10-15 minutes per phase.

**Q: What if I discover issues during implementation?**

A: Return to the relevant artifact and update it with the agent. If the wireframe needs adjustment, iterate with wireframe-designer and then regenerate downstream artifacts. The traceability chain ensures changes propagate consistently.

**Q: Do the agents write code for me?**

A: No, the feature-development team produces specification artifacts, not code. You execute implementation manually using your preferred tools and LLMs. The artifacts guide your coding by providing comprehensive specifications and test requirements.

**Q: How do I reference artifacts when talking to agents?**

A: Use artifact IDs for create operations like 'create a wireframe for brainstorm FB123'. Use artifact IDs or file paths for update operations like 'update the layout section of wireframe WF456' or reference the artifact file directly.

**Q: Is Pantheon a task management system?**

A: No, Pantheon doesn't position itself as a task management system, nor dictate a specific task management system. You can integrate any task management system of your choice simply by creating tasks based on the created artifacts.

<!-- SECTION:END:GETTING_STARTED -->

<!-- SECTION:START:WORKING_WITH_AGENTS -->

## Working with feature-development Agents

The feature-development team operates through natural conversation with agents, not technical commands. Each agent is an expert in their domain who understands your goals and translates them into concrete artifacts: Feature Brainstorming Document, ASCII Wireframe, Implementation Plan, Test Specification.

You communicate directly with agents using plain language about what you want to accomplish. Working through the agents eliminates the cognitive overhead of remembering complex procedures and technical syntax.

Agents maintain consistent behavior through structured processes provided by the Pantheon framework, ensuring reliable results every time. This systematic approach creates clear accountability and traceability, so it’s always obvious what was done and why.

With every action documented in structured artifacts and audit trails, you gain full transparency, while staying focused on high-level direction and decision-making.

### Your Role

You drive the creative vision and make all critical decisions while the team handles systematic execution. Your responsibilities include actively participating in brainstorming sessions to share problem context, reviewing and approving wireframes until they match your intent, answering clarifying questions that expose hidden assumptions, reading plans twice to ensure thoroughness, and executing the actual code implementation. You also run tests manually, verify data integrity, and handle production deployment. The team's agents systematically produce specification artifacts that guide your work, but you remain in control of what gets built and when it ships.

Once you have the artifacts, direct the primary LLM agent outside of Pantheon (i.e. Claude Code, GPT Codex, Gemini) to execute based on the artifact (i.e. implement code based on plan, write blog post based on outline). This allows for a flexible collaboration between the main LLM agent based on the artifacts created: Feature Brainstorming Document, ASCII Wireframe, Implementation Plan, Test Specification .

### Communication Best Practices

- **Start with Problems**: Always explain current pain points and user needs before discussing solutions to prevent premature solution-lock.

- **Iterate on Wireframes**: Keep refining ASCII wireframes until they exactly match your vision, as this becomes your implementation contract.

- **Answer All Questions**: Thoroughly respond to clarifying questions from plan-architect, as these expose critical assumptions you may not realize you're making.

- **Read Plans Twice**: Review implementation plans twice and change something to prove thoroughness, following the 'plan until it hurts' principle.

- **Test Manually**: Always manually test features and verify database integrity regardless of automated test results, as data correctness requires human judgment.

<!-- SECTION:END:WORKING_WITH_AGENTS -->

<!-- SECTION:START:AGENTS -->

## Available Agents

The feature-development team consists of four specialized agents who guide you through each phase of the Anti-YOLO Method. Each agent focuses on a specific stage, producing artifacts that feed into the next phase to create a closed-loop workflow from concept to validated specification.

### brainstorm-facilitator

**Expertise**: Facilitates collaborative problem space exploration and captures shared understanding before any solution design begins.

**When to Engage**: Engage when starting a new feature to collaboratively explore problem space, document current UX pain points, capture system constraints, and record ideas without jumping to solutions. Use whenever you need to establish shared understanding before design work starts.

**How to Interact**:

Start by describing current user pain points and what they need instead. The facilitator will help you structure your thoughts into problem space, system context, and collaborative ideas sections. Share as much context as you can about existing systems and constraints. The facilitator will suggest approaches and capture your reactions, building shared understanding through back-and-forth discussion.

**What brainstorm-facilitator Delivers**:

- Feature brainstorming documents capturing problem space

- System context documentation with integration points

- Collaborative ideas sections preserving exploration history

### wireframe-designer

**Expertise**: Creates token-efficient ASCII wireframes that serve as visual specifications and single source of truth for UI layout, flow, and behavior.

**When to Engage**: Engage after brainstorming is complete and you're ready to specify UI visually. Use when you need to establish exact layout, navigation flows, and component hierarchy before writing code. Essential for preventing 'that's not what I meant' moments during implementation.

**How to Interact**:

Request wireframes by referencing your approved brainstorming artifact. The designer will create ASCII art showing layout structure, flow diagrams illustrating navigation, and component registries with friendly IDs. Review the wireframe carefully and request iterations until it exactly matches your vision. Approve explicitly before moving to planning, as this becomes your implementation contract.

**What wireframe-designer Delivers**:

- ASCII art layout specifications

- Flow diagrams showing navigation paths

- Component registries with friendly IDs

- Design decision documentation

### plan-architect

**Expertise**: Decomposes wireframe specifications into comprehensive implementation plans covering all technical dimensions while exposing hidden assumptions through clarifying questions.

**When to Engage**: Engage after your wireframe is approved and you're ready for detailed technical planning. Use when you need comprehensive specification covering backend architecture, database design, UI implementation, security considerations, and testing strategy before coding begins.

**How to Interact**:

Request a plan by referencing your approved wireframe artifact. The architect will first ask clarifying questions to expose hidden assumptions - answer these thoroughly as they often reveal critical edge cases. After you respond, the architect generates specifications for backend, database, UI with friendly IDs, security, and testing. Read the entire plan twice and change something to prove thoroughness. Ask follow-up questions about any unclear sections before implementation.

**What plan-architect Delivers**:

- Comprehensive implementation plans with clarifying questions

- Backend and database architecture specifications

- UI implementation mapped to wireframe components

- Security and testing strategy documentation

### test-designer

**Expertise**: Derives comprehensive test specifications from wireframe and plan artifacts, ensuring every specified behavior has corresponding coverage before implementation begins.

**When to Engage**: Engage after your implementation plan is complete and you're ready to specify tests before coding. Use when you need comprehensive test coverage including unit, integration, component, and edge case tests derived directly from your wireframe and plan.

**How to Interact**:

Request test specifications by referencing your approved wireframe and plan artifacts. The designer will derive tests systematically: unit tests from backend logic, integration tests from API specifications, component tests from wireframe elements, and edge case tests from clarifying questions. Review the component tests against your wireframe to verify complete coverage. The designer also generates a manual validation checklist for scenarios requiring human judgment.

**What test-designer Delivers**:

- Unit and integration test specifications

- Component test specifications mapped to wireframe

- Edge case test specifications from boundary conditions

- Manual validation checklists

<!-- SECTION:END:AGENTS -->

<!-- SECTION:START:ARTIFACTS -->

## Understanding Team Artifacts

The feature-development team produces four core artifact types that form a sequential chain from problem understanding to validated specification. Each artifact serves as the authoritative input for the next phase, creating traceability from user need to implementation-ready specification. These artifacts are living documents that you iterate on with the agents until they accurately capture your vision, then use as guides during manual implementation and testing phases.

### Artifact Types

#### Feature Brainstorming Document

**Purpose**: Captures collaborative exploration of problem space, user needs, and system context before jumping to solutions.

**Format**: Structured markdown document with sections for problem space, system context, and collaborative ideas.

**How to Use**:

Reference this document when creating wireframes to ensure visual specifications align with validated problem understanding. Review the collaborative ideas section to recall alternative approaches considered during exploration. Update it when new context or constraints emerge during later phases that require revisiting problem space assumptions.

#### ASCII Wireframe

**Purpose**: Provides token-efficient visual specification of UI layout and flow that serves as single source of truth for implementation and testing.

**Format**: Markdown document containing ASCII art layouts, flow diagrams, design decisions, and component registry with friendly IDs.

**How to Use**:

Use this as your implementation contract during coding, referring to layout specifications for structure and component registry for naming consistency. Reference it when writing component tests to ensure every UI element has coverage. Return to it during implementation questions to verify intended behavior. Update layout or flow sections if iteration reveals misalignment, appending design decisions to preserve evolution history.

#### Implementation Plan

**Purpose**: Decomposes feature requirements into comprehensive technical specification covering backend, database, UI, security, and testing.

**Format**: Structured markdown document with sections for clarifying questions, backend architecture, database design, UI implementation, security considerations, and testing strategy.

**How to Use**:

Answer all clarifying questions thoroughly before proceeding to technical sections, as these expose critical assumptions. Read the entire plan twice and change something to prove thoroughness. Reference specific sections during coding: backend architecture for API structure, database design for migrations, UI implementation for component details with friendly IDs, and security considerations for validation requirements.

#### Test Specification

**Purpose**: Derives comprehensive test suite from wireframe and plan artifacts, ensuring every specified behavior has corresponding coverage.

**Format**: Structured markdown document with sections for unit, integration, component, edge case tests, and manual validation checklist.

**How to Use**:

Implement automated tests following the specifications in unit, integration, and component sections, ensuring friendly IDs match those in wireframe and plan. Use edge case tests to guide boundary condition handling. Follow the manual validation checklist after implementation to verify UI behavior, test scenarios requiring human judgment, and check database integrity beyond what automated tests cover.

### Integrating Artifacts into Your Workflow

Feature development artifacts are designed to guide manual implementation using your preferred tools and LLMs. After completing the specification phase with the feature-development team, you have everything needed for confident coding. Reference the ASCII wireframe for layout decisions, the implementation plan for technical specifications, and the test specification for coverage requirements. When working with implementation LLMs like Claude Code, attach relevant artifacts as context to ensure alignment. For example, attach the wireframe and UI implementation plan section when building components, or attach the test specification when writing tests. The friendly IDs in wireframes and plans create naming consistency that makes code easier to navigate and maintain. Once implementation is complete, use the manual validation checklist from your test specification to verify behavior and data integrity before deployment.

### Tips for Artifact Consumption

- **Sequential Usage**: Always complete each artifact phase before moving to the next. Wireframes depend on brainstorming, plans depend on wireframes, and tests depend on both wireframes and plans.

- **Iteration Protocol**: Iterate on each artifact until it's right before proceeding. It's faster to refine a wireframe than to discover misalignment after implementation starts.

- **Reference Tracking**: Keep artifact IDs handy as you progress through phases. You'll reference earlier artifacts when creating downstream ones to maintain traceability.

- **Friendly ID Consistency**: Use the friendly IDs from your wireframe component registry consistently across plans, tests, and implementation for easier navigation and maintenance.

<!-- SECTION:END:ARTIFACTS -->

<!-- SECTION:START:WORKFLOW_EXAMPLES -->

## Workflow Examples

These examples demonstrate real workflows you'll use with the feature-development team. Each shows the sequential conversation pattern from problem exploration through specification, illustrating how artifacts build on each other to create your implementation guide.

### Example 1: Building a Search Filter Feature

**Scenario**: You're adding filtering capabilities to an existing search interface. Users currently struggle to find relevant results among hundreds of items. You need to add category, date range, and status filters while maintaining the existing search experience.

**Step-by-Step Process**:

1. **Explore problem space**
   - Engage brainstorm-facilitator to capture the filtering problem. Describe current user pain (manual scanning of results), system context (React frontend with Elasticsearch backend), and need for targeted filtering.

   - Sample prompt: "brainstorm-facilitator, help me explore the problem space for adding search filters. Users can't narrow down results effectively, leading to frustration and wasted time scanning hundreds of items."

2. **Create visual specification**
   - After brainstorming is approved, engage wireframe-designer to create ASCII layouts showing filter panel placement, filter control types, and result list integration.

   - Sample prompt: "wireframe-designer, create a wireframe for brainstorm FB789 showing the search interface with filter panel on the left, results in the center, and how filters interact with search and pagination."

   - Expected outcome: ASCII wireframe showing spatial relationships, component friendly IDs like 'filter-panel', 'category-dropdown', and flow diagram illustrating filter application.

3. **Generate technical specification**
   - With approved wireframe, engage plan-architect for comprehensive planning. Answer clarifying questions about filter persistence, multi-select behavior, and performance implications.

   - Sample prompt: "plan-architect, create an implementation plan for wireframe WF234. Ask me clarifying questions about edge cases and technical decisions before generating the plan."

4. **Specify comprehensive tests**
   - After plan is approved, engage test-designer to derive test specifications from wireframe and plan, ensuring every filter interaction has coverage.

   - Sample prompt: "test-designer, create test specifications for wireframe WF234 and plan IP567. Derive component tests from the wireframe elements and integration tests from the backend specifications."

5. **Implement with confidence**
   - Execute code implementation using your plan, test specification, and wireframe as guides. Reference friendly IDs for consistent naming. Follow manual validation checklist after implementation.

**Final Result**: A fully specified search filter feature with validated problem understanding, visual contract, comprehensive technical plan, and complete test coverage before writing a single line of code. Implementation proceeds smoothly because all design decisions are front-loaded.

### Example 2: Multi-Step Form with Validation

**Scenario**: You need to build a multi-step onboarding form collecting user information across three screens with complex validation rules and the ability to save progress. You want to avoid discovering validation edge cases after implementation.

**Step-by-Step Process**:

1. **Brainstorm workflow requirements**
   - Engage brainstorm-facilitator to capture the onboarding problem space, including current friction points, required information collection, and system constraints for data persistence.

   - Sample prompt: "brainstorm-facilitator, I need to explore requirements for a multi-step onboarding form. Current onboarding is a single long form that overwhelms users, leading to abandonment. We need step-by-step collection with progress saving."

2. **Wireframe multi-step flow**
   - After brainstorming is complete, engage wireframe-designer to create layouts for each form step, showing field groupings, navigation controls, progress indicators, and validation feedback locations.

   - Sample prompt: "wireframe-designer, create wireframes for brainstorm FB445 showing all three onboarding steps. Include progress indicators, field layouts, validation message placement, and navigation between steps."

   - Expected outcome: ASCII wireframes for each step with flow diagram showing transitions, friendly IDs for each form section and field, and design decisions about validation timing.

3. **Plan validation logic**
   - With approved wireframes, engage plan-architect who will ask clarifying questions about validation rules, data persistence, and error handling before generating comprehensive specifications.

   - Expected outcome: Clarifying questions expose assumptions about validation timing, partial data saving, and navigation between steps that you may not have explicitly considered.

4. **Derive validation tests**
   - After plan is approved, engage test-designer to create test specifications covering each form field, validation rule, step transition, and progress saving scenario.

**Final Result**: Complete multi-step form specification with wireframes for each step, comprehensive validation and persistence logic, and thorough test coverage. Clarifying questions exposed edge cases like 'what happens if user navigates back after submitting step 2' that would have caused rework if discovered during implementation.

### Example 3: Dashboard with Real-Time Data

**Scenario**: You're building an analytics dashboard displaying real-time metrics with charts, filters, and drill-down capabilities. The feature is complex enough that jumping straight to code would likely result in misalignment and rework.

**Step-by-Step Process**:

1. **Explore analytics requirements**
   - Engage brainstorm-facilitator to capture what metrics users need, current pain points with existing reporting, and system context about data sources and update frequencies.

   - Sample prompt: "brainstorm-facilitator, help me understand requirements for a real-time analytics dashboard. Users currently export data to Excel for analysis, which is manual and stale. They need live visibility into key metrics."

2. **Wireframe dashboard layout**
   - After problem space is validated, engage wireframe-designer to create dashboard layout showing metric cards, chart placements, filter controls, and drill-down interactions.

   - Expected outcome: ASCII wireframe showing dashboard grid, component hierarchy, and flow diagram illustrating drill-down navigation and filter application.

3. **Architect real-time data flow**
   - With approved wireframe, engage plan-architect for technical planning covering WebSocket connections, data aggregation, chart rendering, and performance considerations for real-time updates.

   - Expected outcome: Implementation plan with clarifying questions about update frequency, data caching strategy, and handling of connection failures that ensure robust real-time behavior.

4. **Specify dashboard tests**
   - After plan approval, engage test-designer to derive tests covering metric calculations, chart rendering, filter interactions, drill-down navigation, and real-time update handling.

   - Expected outcome: Test specification with component tests for each dashboard element, integration tests for data flow, and manual validation checklist for real-time behavior verification.

**Final Result**: Comprehensive dashboard specification with validated problem understanding, visual layout contract, technical architecture for real-time data, and complete test coverage. Front-loading design decisions eliminated surprises about data update strategies and performance requirements that would have caused expensive rework during implementation.

<!-- SECTION:END:WORKFLOW_EXAMPLES -->
