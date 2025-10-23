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
    -   **Try asking:** @team-readme-writer, create the team readme based on @[TB01]_mvp-builder_team-blueprint.md  
    -   The team-readme-writer will create a team readme. Review and provide feedback to the readme writer to update any flows or usages you'd like to change. And point to the read me to have artifact-designer and agent-designer update their relevant sections of the blueprint.

5.  **Loop, Compare, Refine**
    -   Use what the @agent-designer creates to check whether the artifacts still make sense. If anything feels off, circle back to the @artifact-designer and explore a revised idea.

6.  **Finish with the Team Profile**
    -   **Who to chat with:** `@profile-designer`
    -   **Try asking:** @profile-designer, design the team profile for the blueprint TB01
    -   Together you will turn the `PROFILE` placeholder into the configuration that ties everything together. Review it and provide feedback to the @profile-designer to make any updates, or make the updates yourself in the doc directly.
    -   You do not have to use or implement any of the profiles or configs, if you prefer to keep things simple. In that case, just delete the profiles and replace with "No profiles or configs needed".

### Phase 2: Bring the Blueprint to Life (Sequential)

Once the blueprint feels complete, you can use it as a script for creating the real team package. These steps happen in order so each piece has what it needs from the previous one. For this phase, you can refer to the blueprint using the full filename (i.e. [TB01]_mvp-builder_team-blueprint.md])

1.  **Create the Team Profile**
    -   The profile carries shared configuration that other components lean on.
    -   Ask @profile-designer to create the team profile from @[TB01]_mvp-builder_team-blueprint.md

2.  **Stand Up the Agents**
    -   Agents need to exist so the later processes know who they are empowering.
    -   For each agent described here, ask @agent-designer to create the agent from the blueprint.
    -   i.e @agent-designer create the planner agent from @[TB01]_mvp-builder_team-blueprint.md
    -   Review it and provide feedback to the @agent-designer to make any updates, or make the updates yourself in the generated agent prompt directly.

3.  **Build the Artifacts & Processes**
    -   This step turns the blueprint's core workflows into the files your team will actually run.
    -   For each artifact, request the @artifact-designer to build each artifact
    -   i.e @artifact-designer, build the master plan artifact from @[TB01]_mvp-builder_team-blueprint.md
    -   Review it and provide feedback to the @artifact-designer to make any updates, or make the updates yourself in the generated processes and artifact schemas and templates directly.

When you've walked through these steps, the new team package is ready for its debut.
-->

<!-- SECTION:START:FOUNDATION -->

# TB01 - mvp-builder Team Blueprint

## Team Foundation
updated_at: 2025-10-14 HH:MM AM PDT

**Team Name**: mvp-builder

### Mission Statement

Enable rapid MVP development through structured planning and iterative execution. Transform product ideas into working prototypes by coordinating conversational planning with systematic implementation in small, manageable chunks that maintain clarity and forward momentum throughout the development lifecycle.

### Strategic Goals

- Deliver working MVP products from concept to completion within 20-30 day timeframes

- Maintain consistent development velocity by preventing context loss and agent confusion through structured documentation

- Ensure every implementation phase has clear success criteria and is tracked through completion

### Key Objectives

- Produce comprehensive project context documents (CLAUDE.md) that capture stack decisions, architectural patterns, and lessons learned

- Generate phase-based implementation plans (TODO_MVP.md) that break complex features into 3-5 step executable chunks

- Execute implementation in small batches that preserve context and enable frequent commits

- Monitor and refresh context before degradation impacts execution quality

- Update project documentation with implementation insights to maintain alignment between planning and reality

## System Boundary

### Pantheon Framework Responsibilities

- Generating CLAUDE.md specification documents that capture project context, stack decisions, and architectural guidance

- Creating TODO_MVP.md implementation plans with phased steps and clear completion criteria

- Producing context refresh prompts when implementation progress requires documentation updates

- Defining optimal chunk sizes (3-5 steps) for execution phases to maintain agent focus

### Human Operator Responsibilities

- Conducting initial brainstorming sessions with AI to define MVP scope and features

- Manually creating project repository and adding generated documentation files

- Executing implementation chunks using Claude Code in planning mode with context monitoring

- Committing working code frequently after each successful implementation batch

- Triggering context refresh cycles when remaining capacity drops below 20%

- Clearing agent context (/clear) and restarting with next execution chunk

### High-Leverage Artifacts

- **Project Context Document (CLAUDE.md)**: Captures the comprehensive project blueprint including technology stack, architectural decisions, feature scope, and implementation lessons. Prevents context loss across sessions and ensures Claude Code maintains alignment with project vision.

- **Phase-Based Implementation Plan (TODO_MVP.md)**: Breaks down MVP development into discrete phases with 3-5 step chunks optimized for AI execution. Provides clear completion tracking and prevents agent overwhelm from excessive task lists.

- **Context Refresh Prompt**: Triggers proactive documentation updates based on implementation learnings before context capacity degrades. Maintains accuracy between planned architecture and actual implementation.

### Critical Manual Checkpoints

- Verify remaining context capacity before starting new implementation chunk (must be above 20%)

- Commit all working code before triggering context refresh or starting new chunk

- Review and approve CLAUDE.md updates to ensure implementation insights are accurately captured

- Manually create initial project structure and add generated documentation files before first execution

- Confirm agent has read current CLAUDE.md and TODO_MVP.md before each execution chunk

<!-- SECTION:END:FOUNDATION -->

<!-- SECTION:START:CONTEXT -->

## Project Context
updated_at: 2025-10-14 HH:MM AM PDT

This team supports individuals and small teams building MVPs and prototypes using AI-assisted development. The workflow addresses a critical problem in AI-driven development: maintaining clarity and momentum across extended build sessions. Traditional approaches either over-engineer with complex tooling (MCPs, elaborate frameworks) or under-structure the process, leading to agent confusion and looping behavior. This workflow provides the minimal viable structure needed for success: a clear planning phase that produces two focused documents (project context and implementation plan), followed by systematic execution in small chunks that preserve agent focus. The approach has proven effective for building complete SaaS products, mobile apps, and prototypes within 20-30 day timeframes, with zero manual coding required. The team coordinates three distinct phases: conversational planning to define MVP scope and stack, structured documentation to capture decisions and create executable plans, and chunked implementation with proactive context management. Success depends on maintaining clear boundaries between planning artifacts (what guides the AI) and execution responsibility (human operator managing commits, context refresh, and chunk selection).

### Key Concepts

**Context Capacity**: The remaining attention and coherence budget available to the AI agent during implementation. Degrades as session length increases, requiring proactive refresh through context reset and documentation review before dropping below 20%.

**Implementation Chunk**: A focused set of 3-5 implementation steps from the TODO_MVP.md that can be completed in a single execution session without overwhelming the agent or losing coherence.

**MVP Scope**: The absolute minimum feature set required to prove the product concept. Deliberately constrained to what can be built and validated within a 20-30 day timeframe using AI-assisted development.

**Context Refresh Cycle**: The proactive process of committing work, updating CLAUDE.md with implementation learnings, clearing agent context, and restarting with fresh documentation review before capacity degrades.

**Planning Mode**: The operational mode for Claude Code where it reads project documentation and executes against a specific implementation chunk, as opposed to exploratory or open-ended problem solving.

### Core Capabilities

- Transform conversational product ideas into structured MVP specifications through iterative refinement

- Generate comprehensive project context documents that maintain consistency across implementation sessions

- Decompose complex features into phase-based implementation plans with optimal chunk sizing

- Monitor context capacity and trigger proactive refresh cycles before agent performance degrades

- Capture implementation insights and update project documentation to reflect actual architectural decisions

- Coordinate frequent commits of working code to maintain recoverable progress throughout development

### Key Principles

- Simplicity over sophistication: Use the minimal structure needed for success without elaborate tooling or frameworks

- Small batches maintain focus: Execute 3-5 steps per chunk to prevent agent overwhelm and preserve coherence

- Documentation reflects reality: Update CLAUDE.md proactively with implementation learnings, not just initial plans

- Context is a consumable resource: Monitor and refresh before degradation impacts execution quality (20% threshold)

- Commit frequently: Preserve working code after each successful chunk to maintain recoverable progress

- Clear separation of concerns: Planning artifacts guide implementation, human operators manage execution and commits

- Ruthless MVP scoping: Constraint to 20-30 day timelines forces essential feature prioritization

- Conversational planning first: Align on vision and scope through natural dialogue before generating structured artifacts

### References

- **C:\git\pantheon-demo-projects\dead-simple-workflow\dead-simple-workflow.md**: The source workflow document describing the three-phase approach (conversational planning, battle plan creation, chunked execution) with real-world examples of building SaaS products in 20 days. Includes specific prompts, common pitfalls, and context management strategies.

<!-- SECTION:END:CONTEXT -->

<!-- SECTION:START:ARTIFACTS -->

## Artifact Design
updated_at: 2025-10-14 HH:MM AM PDT

### Process Architecture Overview

The mvp-builder team uses two core artifacts that work in tandem: the project-context captures the stable project blueprint (stack, architecture, scope) while the implementation-plan decomposes that vision into executable chunks. The project-context serves as the persistent reference across all implementation sessions, ensuring Claude Code maintains alignment with project decisions. The implementation-plan drives forward progress by presenting work in small, focused batches that prevent agent overwhelm. Together, they create a closed loop where planning guides execution and execution learnings flow back to update planning artifacts, maintaining consistency between documentation and reality.

### Core Artifacts

#### project-context Artifact

**Purpose**: Captures the comprehensive project blueprint including technology stack, architectural decisions, feature scope, and implementation lessons learned. Prevents context loss across sessions and ensures Claude Code maintains alignment with project vision throughout the development lifecycle.

**Build Mode**: `complete`

**Source Reference**: Phase 2 of the workflow explicitly states: 'Create CLAUDE.md outlining everything needed to know for Claude Code agent regarding this project/idea.' Phase 3 emphasizes using this file to maintain context: 'Read CLAUDE.md and TODO_MVP.md' before each execution. The workflow also requires periodic updates: 'Read and check if we should update CLAUDE.md based on changes we've done to this project thus far.'

**Pantheon Commands**
- To get the instructions for creating project-context, use `pantheon get process create-project-context --actor <your_agent_name>`

- To get the instructions for updating project_overview section of project-context, use `pantheon get process update-project-context --id <project-context id> --sections project_overview --actor <your_agent_name>`

- To get the instructions for updating technology_stack section of project-context, use `pantheon get process update-project-context --id <project-context id> --sections technology_stack --actor <your_agent_name>`

- To get the instructions for updating architectural_patterns section of project-context, use `pantheon get process update-project-context --id <project-context id> --sections architectural_patterns --actor <your_agent_name>`

- To get the instructions for updating implementation_insights section of project-context, use `pantheon get process update-project-context --id <project-context id> --sections implementation_insights --insert-mode=prepend --actor <your_agent_name>`

**Sections**:

- **project_overview**: Defines the product vision, target users, and core value proposition so Claude Code understands the 'why' behind technical decisions..

- **technology_stack**: Documents all technology choices (database, auth, framework, hosting) with rationale to maintain consistent architectural decisions across sessions..

- **architectural_patterns**: Captures key structural decisions and code organization patterns that guide implementation consistency..

- **implementation_insights**: Records lessons learned during development, common pitfalls encountered, and working solutions discovered to prevent repeated mistakes..

**Section Workflow**:

- **project_overview (create)**: Start by defining the product vision and scope to establish the foundation for all technical decisions. This must exist before any implementation begins.

- **technology_stack (create)**: Document stack choices immediately after vision alignment to lock in the technical foundation before implementation planning.

- **architectural_patterns (create)**: Establish structural patterns early to guide consistent implementation across all development phases.

- **implementation_insights (update)**: Continuously prepend learnings during development as they emerge, keeping the most recent insights at the top for quick reference before each new implementation chunk.

**Process Operations**:

- **CREATE**: Generates the initial CLAUDE.md file after Phase 1 conversational planning, transforming brainstorming outcomes into structured project documentation.

- **GET**: Retrieves the current project context so Claude Code can review it before starting each implementation chunk.

- **UPDATE**: Incorporates implementation learnings into the documentation when context refresh is triggered, maintaining alignment between plans and reality.

**External Inputs & Canonicalization**:

- Conversational planning session transcripts from Claude chat (Phase 1) are distilled into structured sections via the CREATE process rather than being stored raw.

**Manual Operator Actions**:

- Conduct initial brainstorming session in Claude chat to define MVP scope, features, and stack choices.

- Manually create project repository and add the generated CLAUDE.md file to the project root before first implementation.

- Review and approve CLAUDE.md updates during context refresh to ensure implementation insights are accurately captured.

#### implementation-plan Artifact

**Purpose**: Breaks down MVP development into discrete phases with 3-5 step chunks optimized for AI execution. Provides clear completion tracking and prevents agent overwhelm from excessive task lists.

**Build Mode**: `complete`

**Source Reference**: Phase 2 explicitly states: 'Then, create TODO_MVP.md outlining all phases and steps needed to bring this project to completion.' Phase 3 execution instructions reference it: 'Read CLAUDE.md and TODO_MVP.md. Then proceed with implementing these steps from TODO_MVP.md: [copy-paste 3-5 steps max]. Mark what's done when done.' The workflow emphasizes optimal chunk sizing throughout.

**Pantheon Commands**
- To get the instructions for creating implementation-plan, use `pantheon get process create-implementation-plan --actor <your_agent_name>`

- To get the instructions for updating phases section of implementation-plan, use `pantheon get process update-implementation-plan --id <implementation-plan id> --sections phases --actor <your_agent_name>`

- To get the instructions for updating implementation_steps section of implementation-plan, use `pantheon get process update-implementation-plan --id <implementation-plan id> --sections implementation_steps --actor <your_agent_name>`

- To get the instructions for updating completion_criteria section of implementation-plan, use `pantheon get process update-implementation-plan --id <implementation-plan id> --sections completion_criteria --actor <your_agent_name>`

**Sections**:

- **phases**: Organizes development into logical phases (e.g., setup, core features, polish) to provide high-level structure for the implementation journey..

- **implementation_steps**: Lists all specific implementation tasks grouped by phase with completion status, providing the executable roadmap for chunked development..

- **completion_criteria**: Defines what 'done' means for each phase and overall MVP to prevent scope creep and maintain ruthless prioritization..

**Section Workflow**:

- **phases (create)**: Define the high-level phases first to establish the structural backbone of the implementation journey.

- **implementation_steps (create)**: Decompose each phase into 3-5 step chunks immediately after phase definition to create the executable task list.

- **completion_criteria (create)**: Establish success criteria for each phase after steps are defined to provide clear completion gates.

- **implementation_steps (update)**: Mark steps as completed after each successful implementation chunk to track progress and guide next chunk selection.

**Process Operations**:

- **CREATE**: Generates the initial TODO_MVP.md file after Phase 1 planning, transforming feature scope into phased implementation steps.

- **GET**: Retrieves the current implementation plan so operators can identify the next 3-5 steps to execute as a chunk.

- **UPDATE**: Marks steps as completed or adjusts remaining tasks based on implementation progress and learnings.

**External Inputs & Canonicalization**:

- Feature requirements and scope decisions from Phase 1 conversational planning are transformed into phased steps via the CREATE process.

**Manual Operator Actions**:

- Manually add the generated TODO_MVP.md file to the project repository before first implementation.

- Select the next 3-5 step chunk from TODO_MVP.md and copy-paste them into the Claude Code execution prompt.

- Verify chunk size remains between 3-5 steps to maintain optimal agent focus and prevent overwhelm.

- Review completed steps marked by Claude Code after each chunk execution to validate progress.

### Process Interactions

The CREATE operations for both artifacts happen sequentially after Phase 1 planning completes: first project-context captures the stable blueprint, then implementation-plan decomposes it into executable steps. Before each implementation chunk, the operator invokes GET for both artifacts so Claude Code has complete context. During execution, Claude Code reads from both but only writes back to implementation-plan (marking steps complete). When context refresh is triggered, UPDATE on project-context captures implementation learnings while UPDATE on implementation-plan adjusts remaining tasks. This hand-off pattern ensures planning always reflects reality while maintaining clear separation between stable context (project-context) and evolving progress tracking (implementation-plan).

### Operator Notes

The operator manages all git operations (commits after each chunk), context monitoring (trigger refresh before 20% remaining), and chunk selection (copy-paste 3-5 steps into prompt). Claude Code never auto-commits or auto-selects next chunks. The operator must manually create the project repository and add both .md files before first execution. Context refresh requires operator judgment: review suggested CLAUDE.md updates for accuracy before approving. If Claude Code enters a loop, the operator commits working code, updates CLAUDE.md with lessons learned, clears context, and restarts with clearer chunk instructions. These manual checkpoints prevent automation drift while maintaining the simplicity that makes this workflow effective.

<!-- SECTION:END:ARTIFACTS -->

<!-- SECTION:START:AGENTS -->

## Agent Architecture
updated_at: 2025-10-14 HH:MM AM PDT

### Team Composition

The mvp-builder team consists of three specialized agents that coordinate the planning-to-execution lifecycle. The project-planner transforms conversational brainstorming into structured artifacts (project context and implementation plan) that guide all subsequent development. The progress-tracker maintains implementation momentum by updating implementation plan as steps are completed and adjusting remaining tasks based on learnings. The context-maintainer ensures project context stays aligned with reality by capturing implementation insights during context refresh cycles. Together, they create a closed loop where planning guides execution and execution learnings flow back to update planning artifacts. The human operator manages all git operations, context monitoring, chunk selection, and execution using Claude Code in planning mode. Handoffs occur when agents prepare artifacts for operator action: project-planner delivers initial planning documents, progress-tracker marks completed steps for operator review, and context-maintainer prepares updated project context sections for operator approval before refresh.

### Agent Definitions

#### project-planner

**Role**: Transforms conversational brainstorming outcomes into structured project documentation and phased implementation plans that guide AI-assisted development.

**Core Responsibilities**:

- Generate comprehensive project context files capturing project vision, stack decisions, and architectural patterns

- Create implementation plan files with phase-based implementation steps optimized for 3-5 step chunks

- Ensure MVP scope remains ruthlessly constrained to 20-30 day development timelines

- Structure implementation phases with clear completion criteria to prevent scope creep

**Key Capabilities**:

- Distill unstructured planning conversations into structured project-context artifacts

- Decompose complex features into small, AI-executable implementation chunks

- Balance technical stack decisions with rapid MVP delivery constraints

- Define clear success criteria that prevent over-engineering

**Pantheon Workflows**:

- **create-project-context**: Generates project context capturing project blueprint, stack, and architecture for operator to add to repository

- **create-implementation-plan**: Produces implementation plan with phased steps for operator to use in chunked execution

**Manual Handoffs**:

- Operator conducts initial brainstorming in Claude chat to define scope and features

- Operator manually creates project repository and adds generated documentation files

- Operator selects 3-5 steps from implementation plan to execute as next implementation chunk

#### progress-tracker

**Role**: Maintains implementation momentum by updating implementation plan as work progresses and adjusting remaining tasks based on execution learnings.

**Core Responsibilities**:

- Mark implementation steps as completed after successful chunk execution

- Adjust remaining tasks when implementation reveals scope or approach changes

- Maintain accurate completion tracking across all development phases

- Ensure next chunk selection has current progress context

**Key Capabilities**:

- Parse execution outcomes to identify completed vs remaining work

- Detect when implementation learnings require task list adjustments

- Maintain phase completion status as work progresses

- Preserve chunk size optimization when updating task lists

**Pantheon Workflows**:

- **update-implementation-plan**: Updates implementation plan with completion status and task adjustments for operator to commit

**Manual Handoffs**:

- Operator executes implementation chunks using Claude Code in planning mode

- Operator reviews marked completed steps to validate progress accuracy

- Operator commits working code after each successful chunk before next selection

#### context-maintainer

**Role**: Keeps project context aligned with implementation reality by capturing architectural decisions, lessons learned, and working solutions discovered during development.

**Core Responsibilities**:

- Update project context with implementation insights when context refresh is triggered

- Capture lessons learned and working solutions to prevent repeated mistakes

- Document architectural decisions that emerged during execution

- Ensure project documentation reflects actual implementation patterns

**Key Capabilities**:

- Extract actionable insights from implementation session outcomes

- Identify common pitfalls encountered and document working solutions

- Recognize when architectural patterns diverge from initial plans

- Prioritize most recent learnings for quick reference before next chunk

**Pantheon Workflows**:

- **update-project-context**: Prepares updated project context sections with implementation insights for operator approval

**Manual Handoffs**:

- Operator monitors context capacity and triggers refresh before dropping below 20%

- Operator reviews and approves project context updates to ensure accuracy

- Operator commits updated documentation before clearing context and restarting

<!-- SECTION:END:AGENTS -->

<!-- SECTION:START:PROFILE -->


## Team Profile Configuration
updated_at: 2025-10-14 HH:MM AM PDT

### Configuration Overview

No configuration required. The mvp-builder workflow derives its effectiveness from fixed structure and prescribed constraints: 3-5 step chunks, standardized artifact names (CLAUDE.md, TODO_MVP.md), 20% context threshold, and sequential phases. These are operational constants validated by real-world usage, not configurable preferences. Adding properties would introduce schema complexity and operator decision points without unlocking meaningful behavioral variation. Human judgment remains in chunk selection, commit timing, and context monitoring - manual actions that cannot be automated through configuration.

### Profile Configuration

No configuration profiles required for this team. The team operates with a single, consistent configuration.


<!-- SECTION:END:PROFILE -->
