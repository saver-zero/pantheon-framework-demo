---
created_at: 2025-10-14 HH:MM AM PDT
---

<!-- SECTION:START:OVERVIEW -->

# mvp-builder Team

## Mission

Transform product ideas into working MVP prototypes through structured planning and systematic execution. We coordinate conversational planning with chunked implementation to maintain clarity and momentum throughout your development journey.

## Value Proposition

Stop drowning in complexity and watching AI agents loop endlessly. We provide the minimal structure needed to ship real products in 20-30 days using AI-assisted development. Our approach prevents context loss, agent confusion, and scope creep while maintaining the simplicity that actually gets things built. No elaborate tooling, no endless configurations - just clear planning that produces executable results.

## Key Capabilities

- **Rapid MVP Planning**: Transform conversational brainstorming into structured project documentation that captures your vision, stack decisions, and architectural patterns.

- **Chunked Execution Plans**: Break down complex features into 3-5 step implementation chunks optimized for AI execution without overwhelming agent capacity.

- **Context Management**: Monitor and refresh project context proactively before agent performance degrades, maintaining alignment between documentation and reality.

- **Progress Tracking**: Track completion of implementation steps across phases with clear success criteria that prevent scope creep.

- **Implementation Insights**: Capture lessons learned and working solutions during development to prevent repeated mistakes across sessions.

## When to Use This Team

Use the mvp-builder team when you need to build a working prototype or MVP within 20-30 days using AI-assisted development. This team is ideal for individuals and small teams who want to ship real products without getting lost in complex frameworks or watching AI agents loop indefinitely. Perfect for SaaS products, mobile apps, and side projects where you need the minimal structure to maintain momentum without over-engineering. Choose this team when you value simplicity over sophistication and want a proven workflow that has shipped complete products. If you're tired of elaborate MCPs, endless configuration files, or AI agents that lose focus after five tasks, this team provides the clarity and systematic approach you need to actually complete projects.

<!-- SECTION:END:OVERVIEW -->

<!-- SECTION:START:GETTING_STARTED -->

## Getting Started

Welcome to the mvp-builder team! Getting started is simple and takes just a few interactions. We'll guide you from initial idea to structured planning artifacts that drive systematic execution.

### Prerequisites

- A clear product idea or MVP concept you want to build

- Basic understanding of your target users and core value proposition

- Decision on general technology direction (web app, mobile app, or both)

- Willingness to constrain scope to features achievable in 20-30 days

### Your First Interaction

**Step 1: Brainstorm Your MVP Vision**

Have a natural conversation with Claude (in regular chat mode) about your product idea. Explain it like you're at a coffee shop with a co-founder. Discuss target users, core features, and value proposition. Ask Claude to rate your idea 1-10 and iterate until you have clarity on MVP scope and features.

💡 **Tip**: Keep the conversation natural and exploratory. Focus on what makes the absolute minimum viable product, not your dream feature list.

**Step 2: Generate Planning Artifacts**

Engage the project-planner agent and say: 'Create a project context and implementation plan for my [describe your MVP].' The agent will ask clarifying questions about technology stack preferences and architectural decisions, then generate both your project context file and implementation plan.

Example:

```

Create a project context and implementation plan for my SaaS app that helps small teams track and share project documentation with built-in collaboration features.

```

**Step 3: Set Up Your Project**

Manually create your project repository and add the generated CLAUDE.md and TODO_MVP.md files to the project root. This manual step ensures you control where and how your project lives.

💡 **Tip**: Review both files carefully before starting implementation to ensure they accurately reflect your decisions and scope.

**Step 4: Execute Your First Chunk**

Open Claude Code in your project directory. Tell it to read both planning files, then copy-paste the first 3-5 steps from your TODO_MVP.md into the prompt: 'Read CLAUDE.md and TODO_MVP.md. Then implement these steps: [paste steps]. Mark what's done when done.' Watch as Claude Code executes systematically.

💡 **Tip**: Commit working code immediately after this first successful chunk. Early commits build confidence and establish your execution rhythm.

### What Happens Next

After your first successful chunk, establish a steady rhythm: select the next 3-5 uncompleted steps from TODO_MVP.md, have Claude Code execute them, commit working code, and repeat. Monitor your context capacity - when it drops below 20%, engage the context-maintainer to capture implementation learnings before clearing context and starting fresh. As you progress through phases, engage the progress-tracker to mark completed steps and adjust remaining tasks based on what you learn. The workflow becomes natural quickly: chunk selection, execution, commit, repeat with context monitoring throughout.

### Common Questions

**Q: How do I know when to refresh context?**

A: Watch your context indicator in Claude Code. When it drops below 20% remaining, it's time to commit your working code, engage the context-maintainer to capture learnings, clear context, and restart with fresh documentation review. Don't wait until 5% - performance degrades well before that.

**Q: What if Claude Code starts looping or losing focus?**

A: This usually means your chunk is too large or context needs refresh. Commit whatever works, update your project context with lessons learned, and restart with a smaller chunk (2-3 steps). The fresh start with clearer instructions typically resolves looping behavior.

**Q: Can I modify the planning artifacts manually?**

A: Absolutely. You can edit both CLAUDE.md and TODO_MVP.md directly whenever you see something that needs adjustment. The agents generate initial versions and help with updates, but you always have direct control over the content.

**Q: How strict is the 3-5 step chunk size?**

A: It's a proven guideline, not a rigid rule. If steps are very small, you might do 5. If they're complex, stick to 3. The key is preventing agent overwhelm - if Claude Code starts losing focus or looping, your chunk is too large.

**Q: What if my MVP scope changes during development?**

A: That's normal and expected. Engage the progress-tracker to adjust your implementation plan with new insights, and engage the context-maintainer to update architectural decisions in your project context. The artifacts should always reflect current reality, not just initial plans.

**Q: Is Pantheon a task management system?**

A: No, Pantheon doesn't position itself as a task management system, nor dictate a specific task management system. You can integrate any task management system of your choice simply by creating tasks based on the created artifacts.

<!-- SECTION:END:GETTING_STARTED -->

<!-- SECTION:START:WORKING_WITH_AGENTS -->

## Working with mvp-builder Agents

The mvp-builder team operates through natural conversation with agents, not technical commands. Each agent is an expert in their domain who understands your goals and translates them into concrete artifacts: project-context, implementation-plan.

You communicate directly with agents using plain language about what you want to accomplish. Working through the agents eliminates the cognitive overhead of remembering complex procedures and technical syntax.

Agents maintain consistent behavior through structured processes provided by the Pantheon framework, ensuring reliable results every time. This systematic approach creates clear accountability and traceability, so it’s always obvious what was done and why.

With every action documented in structured artifacts and audit trails, you gain full transparency, while staying focused on high-level direction and decision-making.

### Your Role

As the human operator, you drive the vision and manage execution flow. You conduct initial brainstorming to define MVP scope and features, then oversee systematic implementation by selecting which chunks to execute and when. You manage all git operations, committing working code frequently to preserve progress. You monitor context capacity and trigger refresh cycles before agent performance degrades. You review and approve documentation updates to ensure they accurately reflect implementation reality. The agents handle all planning artifact generation and maintenance, but you remain in control of execution decisions, code commits, and quality validation. You don't need to understand procedural complexity - just provide direction, make decisions, and manage the execution rhythm.

Once you have the artifacts, direct the primary LLM agent outside of Pantheon (i.e. Claude Code, GPT Codex, Gemini) to execute based on the artifact (i.e. implement code based on plan, write blog post based on outline). This allows for a flexible collaboration between the main LLM agent based on the artifacts created: project-context, implementation-plan .

### Communication Best Practices

- **Keep Chunks Small**: Always execute 3-5 steps maximum per chunk to maintain agent focus and prevent overwhelm or looping behavior.

- **Commit Frequently**: Commit working code after each successful chunk to maintain recoverable progress and enable clean restarts.

- **Monitor Context Capacity**: Refresh context before it drops below 20% remaining to prevent agent performance degradation.

- **Update Documentation Proactively**: Capture implementation learnings in project context during refresh cycles to keep documentation aligned with reality.

- **Ruthless MVP Scoping**: Constrain features to what can be built in 20-30 days and trust the defined completion criteria to prevent scope creep.

<!-- SECTION:END:WORKING_WITH_AGENTS -->

<!-- SECTION:START:AGENTS -->

## Available Agents

The mvp-builder team consists of three specialized agents who coordinate the planning-to-execution lifecycle. Each agent focuses on a specific aspect of the workflow, ensuring your planning guides execution and implementation learnings flow back to update planning artifacts.

### project-planner

**Expertise**: Transforms conversational brainstorming into structured project documentation and phased implementation plans that guide AI-assisted development.

**When to Engage**: Engage the project-planner after completing your initial brainstorming session when you're ready to transform conversational planning outcomes into structured artifacts. Use this agent to create your project context file and implementation plan at the start of any new MVP project.

**How to Interact**:

Start by sharing your brainstorming outcomes or project vision. Say something like: 'Create a project context for my SaaS app that helps teams manage their documentation' or 'Generate an implementation plan based on the features we discussed.' The agent will ask clarifying questions about stack choices, scope constraints, and architectural preferences to ensure the artifacts accurately reflect your decisions.

**What project-planner Delivers**:

- Project context file (CLAUDE.md) with vision, stack, and architecture

- Implementation plan (TODO_MVP.md) with phased steps and completion criteria

### progress-tracker

**Expertise**: Maintains implementation momentum by updating implementation plan as work progresses and adjusting remaining tasks based on execution learnings.

**When to Engage**: Engage the progress-tracker after completing an implementation chunk when you need to mark steps as done or adjust remaining tasks. Use this agent whenever execution reveals scope changes or when you need to track phase completion.

**How to Interact**:

Tell the agent what you've completed or what needs adjustment. Try: 'Mark steps 1-3 from Phase 2 as completed' or 'Update the implementation plan - we discovered the authentication needs a different approach.' The agent will update completion status and help you identify the next optimal chunk to execute.

**What progress-tracker Delivers**:

- Updated implementation plan with completion tracking

- Adjusted task lists reflecting execution learnings

### context-maintainer

**Expertise**: Keeps project context aligned with implementation reality by capturing architectural decisions, lessons learned, and working solutions discovered during development.

**When to Engage**: Engage the context-maintainer when your context capacity is running low or when you've learned something important during implementation. Use this agent before clearing context to ensure insights are captured in your project documentation.

**How to Interact**:

Share what you've learned during implementation. Say: 'Update project context with the authentication patterns we discovered' or 'Capture the database optimization lessons before I refresh context.' The agent will prepare updated documentation sections for your review and approval.

**What context-maintainer Delivers**:

- Updated project context with implementation insights

- Documentation of lessons learned and working solutions

<!-- SECTION:END:AGENTS -->

<!-- SECTION:START:ARTIFACTS -->

## Understanding Team Artifacts

The mvp-builder team produces two core artifacts that work together to guide your development journey. The project context serves as your persistent reference across all implementation sessions, ensuring consistency in stack and architectural decisions. The implementation plan drives forward progress by presenting work in manageable chunks. Together, they create a closed loop where planning guides execution and execution learnings flow back to update planning artifacts.

### Artifact Types

#### project-context

**Purpose**: Captures the comprehensive project blueprint including technology stack, architectural decisions, feature scope, and implementation lessons learned to prevent context loss across sessions.

**Format**: Markdown document (CLAUDE.md) with structured sections for project overview, technology stack, architectural patterns, and implementation insights.

**How to Use**:

Place this file in your project root before starting implementation. Claude Code reads it at the beginning of each execution chunk to maintain alignment with your project vision. Update it proactively during context refresh cycles to capture implementation learnings. Review the implementation insights section before each chunk to avoid repeating past mistakes.

#### implementation-plan

**Purpose**: Breaks down MVP development into discrete phases with 3-5 step chunks optimized for AI execution, providing clear completion tracking and preventing agent overwhelm.

**Format**: Markdown document (TODO_MVP.md) with phase definitions, step-by-step tasks grouped by phase, and completion criteria for each phase.

**How to Use**:

Use this file to select your next implementation chunk - copy-paste 3-5 uncompleted steps into your Claude Code prompt. Mark steps as completed after successful execution to track progress. Review completion criteria for each phase to know when to move forward versus refine. Adjust remaining tasks when implementation reveals scope or approach changes.

### Integrating Artifacts into Your Workflow

Integrating mvp-builder artifacts with Claude Code is straightforward and intentional. At the start of each implementation session, your prompt explicitly tells Claude Code to read both the project context file and implementation plan. This loads the complete project blueprint and current progress into the agent's context. Then you specify exactly which 3-5 steps from the implementation plan to execute in this chunk. Claude Code has everything needed: the architectural patterns to follow, the technology stack to use, and the specific tasks to complete. After execution, you commit the working code and may update artifacts using our maintenance agents. The next chunk begins the same way - read both files, specify new steps, execute. This rhythm ensures every implementation session maintains alignment with your project vision while preserving the simplicity that makes AI-assisted development effective. No complex tooling or integration required - just clear prompts that reference your planning artifacts.

### Tips for Artifact Consumption

- **Read Before Every Chunk**: Always have Claude Code read both project context and implementation plan at the start of each execution session to maintain full alignment.

- **Small Chunk Selection**: Never copy-paste more than 5 steps from the implementation plan into your execution prompt to prevent agent overwhelm.

- **Proactive Context Refresh**: Update project context when you've learned something significant or when context capacity drops below 20%, not after agent performance degrades.

- **Review Before Execution**: Check the implementation insights section of project context before each chunk to avoid repeating mistakes discovered in previous sessions.

<!-- SECTION:END:ARTIFACTS -->

<!-- SECTION:START:WORKFLOW_EXAMPLES -->

## Workflow Examples

Here are real workflow scenarios demonstrating how the mvp-builder team supports your development journey from initial concept to working MVP. Each example shows the natural conversation flow and systematic execution pattern.

### Example 1: Starting a New SaaS MVP

**Scenario**: You have an idea for a team documentation management SaaS app. You've done initial brainstorming with Claude and have clarity on core features: document creation, team collaboration, and simple access control. Now you're ready to generate planning artifacts and start building.

**Step-by-Step Process**:

1. **Generate planning artifacts**
   - Engage the project-planner and provide your brainstorming outcomes. The agent asks about technology stack preferences (you choose Next.js with Supabase for speed) and generates both your project context file capturing the vision and architecture, plus an implementation plan breaking work into phases.

   - Sample prompt: "project-planner, create a project context and implementation plan for my team documentation SaaS. We're using Next.js and Supabase, focusing on document CRUD, real-time collaboration, and role-based access control as the MVP features."

2. **Set up project repository**
   - Manually create your project directory, initialize git if needed, and add the generated CLAUDE.md and TODO_MVP.md files to the root. Review both files to ensure they accurately reflect your decisions.

   - Expected outcome: Project repository with planning artifacts ready for first implementation chunk.

3. **Execute initial setup chunk**
   - Open Claude Code and tell it to read both planning files, then execute the first 3-5 steps from Phase 1 (likely Next.js setup, Supabase configuration, and basic project structure). Claude Code works systematically through each step.

   - Sample prompt: "Read CLAUDE.md and TODO_MVP.md. Then implement these steps from Phase 1: 1) Initialize Next.js project with TypeScript, 2) Set up Supabase client configuration, 3) Create basic folder structure and routing. Mark what's done when done."

   - Expected outcome: Working project foundation with all dependencies configured and basic structure in place.

4. **Commit and continue**
   - Commit the working setup code with a clear message. Select the next 3-5 steps from TODO_MVP.md (likely authentication setup) and repeat the execution prompt pattern with Claude Code.

   - Expected outcome: Established execution rhythm with committed progress and clear next steps identified.

**Final Result**: You have a working project foundation with clear documentation guiding all future implementation. Your execution rhythm is established: select chunks, execute, commit, repeat. The planning artifacts keep you aligned while systematic chunking maintains momentum.

### Example 2: Managing Context Refresh Mid-Project

**Scenario**: You're midway through Phase 3 of your MVP build. Claude Code's context indicator shows 18% remaining, and you've learned important lessons about authentication patterns that should be documented. You need to refresh context before continuing to the next implementation chunk.

**Step-by-Step Process**:

1. **Commit current work**
   - Ensure all working code from your current chunk is committed with a descriptive message. Verify there are no uncommitted changes that could be lost during the refresh process.

   - Expected outcome: Clean working directory with all progress safely committed to version control.

2. **Capture implementation insights**
   - Engage the context-maintainer and explain what you've learned during recent implementation. The agent prepares updated sections of your project context (CLAUDE.md) with the authentication patterns and lessons learned.

   - Sample prompt: "context-maintainer, update the project context with the authentication insights we discovered - specifically that session management needs edge functions and the token refresh pattern that works with our Supabase setup."

   - Expected outcome: Updated CLAUDE.md file with implementation insights section reflecting recent learnings.

3. **Clear and restart**
   - Run /clear in Claude Code to reset context. Then begin your next chunk with the standard prompt pattern, having Claude Code read the now-updated planning artifacts before executing the next 3-5 steps.

   - Sample prompt: "Read CLAUDE.md and TODO_MVP.md. Then implement these steps from Phase 3: [paste next 3-5 steps]. Mark what's done when done."

   - Expected outcome: Fresh execution session with full context capacity and updated documentation guiding implementation.

**Final Result**: Context refreshed before performance degradation. Implementation insights are captured in documentation so future chunks benefit from past learnings. You continue with full context capacity and maintained alignment between documentation and implementation reality.

### Example 3: Completing a Phase and Moving Forward

**Scenario**: You've just finished the last implementation chunk of Phase 2 (core features). You want to mark these steps as complete, verify you've met the phase completion criteria, and identify the optimal next chunk from Phase 3 (polish and deployment).

**Step-by-Step Process**:

1. **Mark completed steps**
   - Engage the progress-tracker and tell it which steps you've completed. The agent updates your implementation plan (TODO_MVP.md) with completion status and confirms that Phase 2 completion criteria have been met.

   - Sample prompt: "progress-tracker, mark steps 8-12 from Phase 2 as completed. We finished the document CRUD operations, collaboration features, and access control implementation."

   - Expected outcome: Updated TODO_MVP.md showing Phase 2 steps marked complete and Phase 2 criteria met.

2. **Review next phase**
   - Open your updated TODO_MVP.md and review Phase 3 steps and completion criteria. Identify the first logical chunk of 3-5 steps to execute, considering any dependencies or prerequisites.

   - Expected outcome: Clear understanding of Phase 3 objectives and first chunk identified for execution.

3. **Execute first Phase 3 chunk**
   - Tell Claude Code to read both planning files and execute your selected steps from Phase 3. Monitor execution and commit working code as before, maintaining the rhythm that worked through Phases 1 and 2.

   - Expected outcome: Forward momentum maintained with Phase 3 execution begun systematically.

**Final Result**: Phase 2 completion documented with accurate progress tracking. Smooth transition into Phase 3 with maintained execution rhythm and clear visibility into remaining work toward MVP completion.

<!-- SECTION:END:WORKFLOW_EXAMPLES -->
