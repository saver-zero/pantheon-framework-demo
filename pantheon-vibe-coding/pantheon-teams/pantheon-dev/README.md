---
created_at: 2025-10-13 HH:MM PM PDT
---
<!-- SECTION:START:OVERVIEW -->
# pantheon-dev Team

## Mission

The pantheon-dev team transforms software projects from concept to code through transparent, systematic workflows that bridge business intent and technical implementation while continuously improving through structured feedback.

## Value Proposition

Unlike traditional development workflows where context gets lost and processes drift, pantheon-dev provides Glass Box transparency where every step is visible and improvable. Your business requirements flow through structured artifacts that preserve intent, your development decisions are documented and traceable, and your team processes improve mechanically through systematic feedback loops rather than ad-hoc adjustments.

## Key Capabilities

- **Project Initialization**: Translate business requirements into a staffed specialist team with comprehensive architecture foundation and initial backlog ready for implementation.
- **Architecture Design**: Create comprehensive architecture guides with system overview, principles, tech stack decisions, and design patterns that reduce uncertainty and guide consistent development.
- **Ticket-Based Development**: Structure development work through tickets that capture business context, technical plans, progress tracking, code review, and lessons learned in one auditable artifact.
- **Systematic Code Review**: Conduct structured code reviews examining security, performance, maintainability, and architectural alignment with severity-classified feedback and actionable recommendations.
- **Continuous Improvement**: Analyze feedback patterns to generate specific, actionable recommendations for process routines and artifact templates, making team enhancement mechanical rather than ad-hoc.
- **Design Documentation**: Document architectural decisions with full context, alternatives considered, and consequences to prevent repeated debates and maintain institutional knowledge.

## When to Use This Team

Use pantheon-dev when you need transparent, auditable development workflows that preserve business context from requirements through implementation. This team excels at projects where you want complete traceability, systematic quality assurance, and processes that improve based on real feedback rather than guesswork. It's ideal for teams building products where architectural decisions matter long-term, where multiple specialists need to collaborate with clear handoffs, or where you want AI assistance that operates systematically rather than through ad-hoc prompting. The Glass Box philosophy makes this team particularly valuable when you need to understand why decisions were made, when you want processes that learn from experience, or when multiple stakeholders need visibility into development progress and technical direction.<!-- SECTION:END:OVERVIEW -->

<!-- SECTION:START:GETTING_STARTED -->
## Getting Started

Getting started with pantheon-dev is straightforward. You'll have a conversation to set up your project, and the team handles the systematic artifact creation. You stay focused on business goals while agents manage process execution.

### Prerequisites

- Pantheon Framework installed and configured in your project
- Clear understanding of your project's business goals and technical requirements
- Willingness to engage in brief conversations with agents rather than issuing commands
- Team profile configured (defaults to 'plan-and-review' which works well for most projects)

### Model Configuration Note

When running in Claude Code, the pantheon-dev agent is configured to use **Claude Sonnet** as the default model.

However, **Opus** provides superior performance due to:

1. **Complex Business Context Translation**: The agent must translate nuanced stakeholder intent into actionable technical context, capturing subtle constraints, success criteria, and business objectives. This requires deep comprehension and synthesis of ambiguous requirements into structured artifacts that technical specialists can execute against.

2. **Strategic Team Design & Specialist Composition**: The agent performs high-level strategic decisions including analyzing technology stacks, identifying architectural patterns, and composing optimal specialist teams with non-overlapping responsibilities and complete coverage. This requires sophisticated reasoning about system design and team dynamics.

3. **Multi-Step Workflow Orchestration with Conditional Branching**: The agent manages complex workflows with conditional logic, error detection branches, and must maintain coherent context across multiple interconnected artifacts (specialist agents, kickoff tickets, architecture guides, backlog items). This requires strong working memory and systematic execution of elaborate multi-step processes.

**Cost consideration**: Opus is more token-intensive from a pricing perspective. If performance is a concern, you can modify the agent configurations to use Opus instead. For most team creation workflows, Sonnet will produce acceptable results, though you may need additional iterations to refine complex designs or catch edge cases in generated schemas and templates. For complex teams, Opus is recommended. You can modify the model to be sonnet/opus in the agent definition file.

### Your First Interaction

**Step 1: Prepare Project Documentation**

Create a document describing your project with rough ideas, goals, and requirements. This can be:
- A manually written document with your project vision and requirements
- A document created by having a conversation with your primary LLM (Claude Code, ChatGPT, Gemini, etc.) to flush out the idea and capture it in structured form

Example document content:

```
Project: Task Management REST API

Overview: Need a REST API for team task management with assignments and status tracking.

Requirements:
- Users can create, assign, and track tasks
- Role-based permissions (admin, team lead, member)
- Real-time status updates
- Reporting and analytics dashboard

Technical Context:
- Python with FastAPI (familiar to team)
- PostgreSQL database
- Docker deployment
- Security critical - handles company data

Constraints:
- 3-month timeline
- Must integrate with existing auth system
- Need mobile API support from day one
```

💡 **Tip**: Don't worry about being perfectly detailed. Include business context, technical preferences, and constraints. pantheon-dev will work with what you provide.

**Step 2: Engage pantheon-dev with Document Reference**

Provide the document to pantheon-dev and ask it to kick off the project. pantheon-dev will analyze requirements, create specialist agents, and generate the kickoff ticket for tech-lead.

**How to Address Agents on Different Platforms:**

The way you invoke agents varies by LLM platform:

- **Claude Code**: Use `@agent-<name>` syntax (e.g., `@agent-pantheon-dev`)
- **ChatGPT/Other LLMs**: Use `@<name>` with file reference or role adoption (e.g., `You are @pantheon-dev.md`)

Examples by platform:

**Claude Code:**
```
@agent-pantheon-dev, kick off the project [provide document path or paste content].
```

**ChatGPT/Other LLMs:**
```
You are @pantheon-dev.md . As pantheon-dev, kick off the project [provide document path or paste content].
```

Or be more explicit, utilizing any custom command or macro the platform provides:
```
You are now @pantheon-dev.md - fully adopt this role and follow the pre-defined workflows. As pantheon-dev, kick off the project [provide document path or paste content].
```

💡 **Tip**: pantheon-dev works as a subagent, so give it clear, complete instructions with the document reference in one go. It will create agents and tickets systematically.

**Step 3: Review Generated Artifacts**

pantheon-dev will create:
- Specialist agent definitions (e.g., backend-engineer, frontend-specialist)
- Kickoff ticket (K001) with business context for tech-lead

Review these artifacts to ensure they accurately capture your intent and technical requirements.

💡 **Tip**: The kickoff ticket becomes the reference point for all technical decisions, so verify it reflects your business objectives, constraints, and success measures accurately.

**Step 3a: Install Specialist Agents**

To use the specialist agents created by pantheon-dev, you need to make them available to your LLM environment.

**For Claude Code:**

Claude Code has built-in subagent support. Simply copy the agent definition files to the `.claude/agents` directory, and restart Claude Code:

```bash
# Copy generated agent definitions to Claude Code agents directory
cp pantheon-artifacts/pantheon-team-builds/pantheon-dev/agents/*.md .claude/agents/
```

No need to rename files - the agent name is defined in the YAML frontmatter of each file. Claude Code will automatically discover and load these agents as subagents.

**For Other LLMs (ChatGPT, Gemini, etc.):**

For LLMs without built-in subagent support, you reference the agent definition directly in your prompts:

```
You are @frontend-engineer.md. As frontend-engineer, create a plan for ticket T012.
```

Or be more specific if you run into issues, utilizing any custom command or macro the platform provides:

```
You are now @frontend-engineer.md - fully adopt this role and follow the pre-defined workflows. As frontend-engineer, create a plan for ticket T012.
```

💡 **Tip**: Claude Code's native subagent support makes working with pantheon-dev specialists much more seamless. You can simply say "@agent-frontend-engineer, create a plan for T012" without additional setup.

**Step 4: Engage Tech-Lead**

Ask tech-lead to review the kickoff ticket and create the architecture guide and initial backlog. tech-lead will establish technical foundations and break your project into sequenced tickets ready for implementation.

Example:

```

@tech-lead, work on the kick off ticket K001.

```

💡 **Tip**: Review the architecture guide carefully - it sets patterns for the entire project. Discuss any concerns or alternatives with tech-lead before proceeding.


### What Happens Next

Once you have your architecture guide and initial backlog, you're ready for development. Here's the typical development workflow with concrete examples:

**Step 1: Create Technical Plan**

Pick a ticket from the backlog and ask the appropriate specialist to create a technical plan.

Example:

```
@frontend-engineer, create a plan for ticket T012.
```

The specialist will read the ticket context, reference the architecture guide, and create a detailed technical plan with phases.

**Step 2: Review and Refine Plan**

Review the generated plan. If adjustments are needed, ask the specialist to update it. Once satisfied, proceed to implementation.

**Step 3: Implement Phases**

Have the specialist or your main LLM implement the plan. Best practice: work on 2 phases at a time for context management.

Example with specialist:

```
frontend-engineer, work on Phase 1 & 2 of ticket T012.
```

Example with main LLM:

```
Work on Phase 1 & 2 of ticket T012 following the technical plan.
```

**Step 4: Code Review**

After implementation, engage code-reviewer for quality assessment.

Example:

```
code-reviewer, do a code review for T012.
```

The code-reviewer will examine the implementation and update the ticket with structured feedback.

**Step 5: Log Feedback**

When you encounter issues or have improvement ideas, log feedback for continuous improvement.

Example:

```
Log my feedback about the technical plan format being too verbose for simple CRUD operations that we just discussed.
```

**Step 6: Run Retrospective**

Periodically analyze accumulated feedback to improve team processes.

Example:

```
retro, create a retro report based on feedback so far.
```

💡 **Tips**:
- Start with a small, non-critical ticket to get comfortable with the workflow
- Adjust your team profile as needed: 'vibe-coding' for quick prototypes, 'plan-and-review' for production features, 'check-everything' for critical systems
- For long tickets, invoke specialists in 2-phase increments to maintain context and balance speed with autonomy

### Common Questions

**Q: Do I need to learn Pantheon CLI commands?**

A: No. Agents handle all Pantheon CLI operations internally. You just have natural conversations describing what you need. The agents retrieve instructions, execute processes, and manage artifacts systematically without you needing to remember command syntax.

**Q: Can I modify artifacts directly or must I use agents?**

A: You can modify artifact files directly if you prefer, but using agents ensures proper structure and format. For quick tweaks, direct editing works fine. For substantial changes, letting agents handle updates maintains consistency with schemas and templates.

**Q: How do team profiles affect my workflow?**

A: Profiles control rigor levels mechanically. 'vibe-coding' skips tests and documentation for speed. 'run-some-tests' adds test execution. 'plan-and-review' enforces TDD, code review, and documentation updates. 'check-everything' adds diagram synchronization. Choose based on your project phase and risk tolerance.

**Q: What if I don't agree with an agent's plan or recommendation?**

A: Always review plans before implementation and feel empowered to request changes. Say 'I'd prefer we use approach X instead because of Y' and agents will revise. You're in control - agents provide systematic planning and execution, but you make final decisions.

**Q: How often should I run retrospectives?**

A: Run retro analysis whenever you have accumulated meaningful feedback - typically weekly or after completing major features. The frequency depends on your development pace and how much feedback you're logging. More frequent analysis means faster team improvement.

**Q: Is Pantheon a task management system?**

A: No, Pantheon doesn't position itself as a task management system, nor dictate a specific task management system. You can integrate any task management system of your choice simply by creating tasks based on the created artifacts.<!-- SECTION:END:GETTING_STARTED -->

<!-- SECTION:START:WORKING_WITH_AGENTS -->
## Working with pantheon-dev Agents

The pantheon-dev team operates through natural conversation with agents, not technical commands. Each agent is an expert in their domain who understands your goals and translates them into concrete artifacts: Tickets, Architecture Guides, Design Decisions, Feedback Logs, Retro Reports, Agent Definitions.

You communicate directly with agents using plain language about what you want to accomplish. Working through the agents eliminates the cognitive overhead of remembering complex procedures and technical syntax.

Agents maintain consistent behavior through structured processes provided by the Pantheon framework, ensuring reliable results every time. This systematic approach creates clear accountability and traceability, so it’s always obvious what was done and why.

With every action documented in structured artifacts and audit trails, you gain full transparency, while staying focused on high-level direction and decision-making.

### Your Role

You guide the vision, provide business context, make final decisions on trade-offs, and give feedback based on real-world usage. The agents handle systematic planning, documentation, quality checks, and process execution, but you remain in control of what gets built and when. You don't need to worry about remembering process steps, managing artifact structures, or ensuring documentation stays current - the agents handle those procedural details mechanically. Your focus stays on outcomes: clarifying requirements, validating plans, approving technical direction, and steering based on what actually matters to your project. When agents present plans or recommendations, you provide the human judgment that no AI can replicate: business priorities, user needs, and strategic direction.

Once you have the artifacts, direct the primary LLM agent outside of Pantheon (i.e. Claude Code, GPT Codex, Gemini) to execute based on the artifact (i.e. implement code based on plan, write blog post based on outline). This allows for a flexible collaboration between the main LLM agent based on the artifacts created: Tickets, Architecture Guides, Design Decisions, Feedback Logs, Retro Reports, Agent Definitions .

### Communication Best Practices

- **Use Natural Language**: Speak conversationally to agents as you would to human team members - they understand context and can ask clarifying questions.
- **Provide Business Context**: Share the why behind requests, not just the what - agents use this context to make better technical decisions aligned with your goals.
- **Review and Refine**: Agents present plans before implementation - use this as a dialogue to refine approach rather than accepting first drafts blindly.
- **Choose Appropriate Profile**: Match the rigor level to your project phase - use vibe-coding for prototypes, plan-and-review for production features, check-everything for critical systems.
- **Give Structured Feedback**: When something doesn't work as expected, log feedback through the team's feedback process so improvements become systematic rather than lost conversations.
<!-- SECTION:END:WORKING_WITH_AGENTS -->

<!-- SECTION:START:AGENTS -->
## Available Agents

The pantheon-dev team consists of specialized agents, each with distinct expertise. You work with agents by addressing them directly in conversation and describing what you need - they handle the systematic process execution internally.

### pantheon-dev

**Expertise**: Intelligent orchestrator who translates stakeholder intent into staffed specialist teams and creates project kickoff artifacts.

**When to Engage**: Use pantheon-dev at project start to analyze requirements, create domain-specific specialist agents (backend-engineer, frontend-specialist, etc.), and generate the kickoff ticket with rich business context for the tech-lead.

**How to Interact**:

Describe your project goals, technical requirements, and constraints. Say something like 'I need to build a web API for user management with authentication - can you set up the team and kickoff ticket?' pantheon-dev will analyze the requirements, create appropriate specialist agents, and generate kickoff artifacts.

**What pantheon-dev Delivers**:
- Specialist agent definitions
- Project kickoff ticket
- Development tickets
- Business context documentation

### tech-lead

**Expertise**: Delivery-minded technical lead who creates architecture guides, makes technology decisions, and maintains the development backlog.

**When to Engage**: Engage tech-lead after project kickoff to establish architecture foundation, create sequenced backlog tickets, document design decisions, and resolve technical trade-offs throughout development.

**How to Interact**:

Provide the kickoff ticket or business context and ask tech-lead to create the architecture guide and initial backlog. For example: 'Here's the kickoff ticket K001 - please create the architecture guide and initial backlog.' tech-lead will establish technical foundations and break work into tickets.

**What tech-lead Delivers**:
- Architecture guides
- Design decision records
- Development tickets
- PlantUML diagrams

### code-reviewer

**Expertise**: Quality assurance specialist who conducts systematic code reviews with structured feedback examining security, performance, and architectural alignment.

**When to Engage**: Use code-reviewer after implementation phases complete to get comprehensive quality assessment, identify issues with severity classification, and generate actionable improvement recommendations.

**How to Interact**:

Point code-reviewer to a completed ticket and request review. Say 'Please review the code for ticket T023' and code-reviewer will examine the implementation, provide structured feedback in the ticket, and classify findings by severity.

**What code-reviewer Delivers**:
- Code review reports
- Structured code review feedback
- Quality recommendations
- Severity classifications

### retro

**Expertise**: Continuous improvement specialist who analyzes feedback patterns and generates actionable recommendations for process and artifact enhancements.

**When to Engage**: Engage retro periodically (weekly, sprint-end, or after major milestones) to analyze accumulated feedback logs, identify improvement patterns, and generate specific recommendations for team processes.

**How to Interact**:

Ask retro to analyze recent feedback and generate improvement recommendations. For example: 'Please analyze feedback from the past week and create a retro report.' retro will examine patterns and provide categorized improvements for processes and artifacts.

**What retro Delivers**:
- Retrospective reports
- Process improvement recommendations
- Artifact enhancement suggestions
- Pattern analysis summaries

### routine-designer

**Expertise**: Process workflow specialist who creates clear, effective step-by-step procedural guides following RAE patterns for new team processes.

**When to Engage**: Use routine-designer when you need to update a process routine to adress issues from retro report or to fit your needs.

**How to Interact**:

Describe the workflow you need and routine-designer will create a structured routine with proper node types. Say 'Create a new routine for updating code-review based on X feedback, Y should be more clear about Z' and provide context about steps and decision points.

**What routine-designer Delivers**:
- Process routine definitions
- Workflow node structures
- Control flow specifications
- RAE-compliant processes

<!-- SECTION:END:AGENTS -->

<!-- SECTION:START:ARTIFACTS -->
## Understanding Team Artifacts

The pantheon-dev team produces structured artifacts that serve as the single source of truth for your project. These artifacts preserve context, document decisions, and create complete audit trails from business requirements through implementation. Unlike scattered documentation or lost chat history, these artifacts are version-controlled, systematically structured, and directly integrated into your development workflow.

### Artifact Types

#### Tickets

**Purpose**: Comprehensive development artifacts capturing business context, technical plans, progress, code review, and lessons learned in one traceable document.

**Format**: Markdown document with structured sections: description, technical_plan, progress_log, code_review, commit_message, lessons_learned.

**How to Use**:

Tickets flow through the complete development lifecycle. pantheon-dev or tech-lead creates them with business context, specialists add technical plans, implementation agents update progress logs, code-reviewer adds review feedback, and specialists document lessons learned. Reference tickets by ID (T001, T012) when asking agents to work on them or update specific sections.


#### Architecture Guides

**Purpose**: Establishes comprehensive technical foundations with system overview, principles, tech stack, and design patterns that reduce uncertainty across all development.

**Format**: Markdown document with sections: project-context, high-level-overview, core-principles, technology-stack, system-components, shared-services, implementation-patterns, testing-strategy.

**How to Use**:

tech-lead creates architecture guides at project start and updates them as system evolves. Specialists reference these guides when creating technical plans to ensure architectural alignment. Ask to retrieve specific sections using 'get me the technology-stack section from the architecture guide' or update sections when architecture changes.


#### Design Decisions

**Purpose**: Documents architectural decisions with context, alternatives, consequences, and rationale to prevent repeated debates and maintain institutional knowledge.

**Format**: Markdown document with sections: decision_context, alternatives_considered, decision_details, consequences_and_rationale.

**How to Use**:

tech-lead creates design decisions for major architectural choices. These documents answer 'why did we choose X over Y?' for future reference. Reference them in tickets and architecture guides to maintain consistency. Ask tech-lead to 'document the decision to use PostgreSQL over MongoDB' with full context.


#### Feedback Logs

**Purpose**: Captures structured user feedback during development with context, sentiment analysis, classification, and severity for systematic improvement analysis.

**Format**: Markdown document with fields: target_agent, situation_before, agent_behavior_before, user_feedback, user_sentiment, feedback_type, severity, agent_action_taken.

**How to Use**:

When you encounter issues or have improvement suggestions, instruct your main LLM agent to log feedback. Say 'log feedback that the technical plan format is hard to follow' and the agent will capture structured feedback. retro agent analyzes these logs periodically to generate improvement recommendations.


#### Retro Reports

**Purpose**: Analyzes feedback patterns to generate categorized, actionable recommendations for process routines, artifact templates, and team workflows.

**Format**: Markdown document with sections: analysis_summary, process_improvements, artifact_improvements, agent_improvements, documentation_improvements.

**How to Use**:

retro agent generates these reports periodically by analyzing accumulated feedback logs. Review recommendations and decide which to implement. Some improvements are concrete file updates (routine modifications, schema changes), while others are higher-level process changes requiring team discussion.


#### Agent Definitions

**Purpose**: Defines specialist agents with their competencies, workflows, and domain expertise tailored to your specific project technical requirements.

**Format**: Markdown document with YAML frontmatter and sections: Role, Core Competencies, Approach, Technical Understanding, Operation Protocol, Primary Workflows.

**How to Use**:

pantheon-dev creates agent definitions during project kickoff based on your technical stack and requirements. These live in your project and can be customized as needs evolve. If you need a new specialist (like 'mobile-engineer'), ask pantheon-dev to create it with specific competencies.



### Integrating Artifacts into Your Workflow

Pantheon artifacts integrate seamlessly with your existing development workflow and tools. When working with Claude or other LLMs for actual code implementation, provide them with the relevant artifacts: 'Here's ticket T042 with the technical plan - please implement phase 1.' The artifacts contain all necessary context, so you don't need to repeat requirements or architectural decisions. For code review, point your implementation LLM to the ticket's code_review section to see structured feedback. The commit_message section provides properly formatted commit messages you can copy directly. If you're using Claude Code or other IDE-integrated LLMs, they can read ticket files directly from your pantheon-artifacts directory. The artifacts also integrate with version control: commit them alongside code so your repository history includes both implementation and the business context that drove it. For team collaboration, artifacts provide shared context that new team members can read to understand not just what was built, but why specific technical decisions were made.

### Tips for Artifact Consumption

- **Section-Based Retrieval**: You don't need to read entire artifacts - ask agents to retrieve specific sections like 'get the technical_plan from ticket T023' to focus on relevant information without noise.
- **Progressive Refinement**: Treat artifacts as living documents that evolve. Update architecture guides when patterns emerge, revise technical plans based on implementation reality, and document lessons learned in tickets for future reference.
- **Context Handoffs**: When switching between specialists, reference artifacts by ID rather than explaining context repeatedly. Say 'backend-engineer, continue work on T042' instead of re-explaining the entire requirement.
- **Audit Trails**: Artifacts create complete traceability from business requirements through implementation decisions to code review findings. Use this for stakeholder updates, onboarding new team members, or understanding why past decisions were made.
<!-- SECTION:END:ARTIFACTS -->

<!-- SECTION:START:WORKFLOW_EXAMPLES -->
## Workflow Examples

These examples show real workflows you'll use regularly. Each demonstrates how to interact with agents conversationally and what outcomes to expect. Follow these patterns and adapt them to your specific needs.

### Example 1: Complete Project Kickoff

**Scenario**: You're starting a new project to build a web application for inventory management. You have rough requirements but need help translating them into a structured development plan with proper technical foundation and specialist team.

**Step-by-Step Process**:

1. **Share project vision with pantheon-dev**
   - Have a conversation with pantheon-dev describing your project goals, technical requirements, and constraints. Be specific about business objectives but don't worry about technical details yet.
   - Sample prompt: "I need to build an inventory management web app. Users should track stock levels, get low-stock alerts, and generate reports. We need both web interface and mobile access. Security matters - this handles business-critical data. I'm thinking React frontend with Python backend, but flexible on stack choices."
   - Expected outcome: pantheon-dev analyzes requirements and proposes specialist team composition (like frontend-specialist and backend-engineer) with rationale.

2. **Approve team composition**
   - Review proposed specialists and either approve or discuss adjustments. pantheon-dev creates agent definitions tailored to your project's technical stack and domain requirements.
   - Sample prompt: "That team composition looks good. Please create those specialist agents."
   - Expected outcome: pantheon-dev generates agent definitions for each specialist with project-specific competencies.

3. **Review kickoff ticket**
   - pantheon-dev creates a kickoff ticket capturing business context, success criteria, and constraints. Review to ensure your intent is accurately represented.
   - Expected outcome: Kickoff ticket K001 with comprehensive business context ready for tech-lead to create architecture foundation.

4. **Engage tech-lead for architecture**
   - Ask tech-lead to review the kickoff ticket and establish technical foundations. tech-lead will create architecture guide with system overview, principles, tech stack decisions, and design patterns.
   - Sample prompt: "tech-lead, please review kickoff ticket K001 and create the architecture guide and initial backlog."
   - Expected outcome: Architecture guide with comprehensive technical foundations and initial backlog of sequenced tickets ready for development.


**Final Result**: You now have a staffed specialist team, comprehensive architecture foundation, and initial backlog of tickets with clear business context and technical direction. You're ready to start implementation with proper structure and traceability.

### Example 2: Ticket Development Lifecycle

**Scenario**: You have an architecture guide and backlog. You're ready to work on your first feature ticket. This workflow shows the complete cycle from ticket assignment through implementation to code review and lessons learned.

**Step-by-Step Process**:

1. **Assign specialist to ticket**
   - Choose a ticket from your backlog and ask the appropriate specialist to create a technical plan. The specialist will read the ticket's business context, reference the architecture guide, and design a phased implementation approach.
   - Sample prompt: "backend-engineer, please create a technical plan for ticket T012 about user authentication."
   - Expected outcome: Ticket T012 updated with detailed technical plan including phased implementation steps, testing approach, and dependencies.

2. **Review and refine plan**
   - Read the technical plan and discuss any concerns or alternatives. This is your chance to ensure the approach aligns with your expectations before implementation begins.
   - Sample prompt: "The plan looks good, but can we use JWT tokens instead of session cookies for authentication? Let's update the plan to reflect that."
   - Expected outcome: Technical plan revised to incorporate your feedback and preferred approach.

3. **Implement using your preferred LLM**
   - Provide the ticket with technical plan to your main LLM or implementation agent. They follow the plan's phases systematically. Based on your active profile, they'll run tests, update documentation, and log progress.
   - Sample prompt: "Here's ticket T012 with the technical plan. Please implement phase 1 and 2."
   - Expected outcome: Code implemented following the plan with tests passing and progress logged in the ticket.

4. **Request code review**
   - After implementation completes, engage code-reviewer to conduct systematic quality assessment. code-reviewer examines security, performance, maintainability, and architectural alignment.
   - Sample prompt: "code-reviewer, please review the implementation for ticket T012."
   - Expected outcome: Ticket T012 updated with structured code review feedback including severity classifications and actionable recommendations.

5. **Address review feedback**
   - Review the code review feedback and address any critical or high-severity findings. Make necessary improvements and update the ticket when complete.
   - Expected outcome: Code quality issues resolved with ticket documentation updated to reflect final implementation state.

6. **Document lessons learned**
   - Capture any insights or surprises from the implementation. What worked well? What would you do differently? This feeds into continuous improvement.
   - Sample prompt: "backend-engineer, please document lessons learned for ticket T012. We discovered that the JWT library had better TypeScript support than expected, which simplified integration."
   - Expected outcome: Ticket T012 completed with lessons learned documented for future reference and potential process improvements.


**Final Result**: Ticket T012 fully complete with comprehensive documentation: original business context, detailed technical plan, implementation progress log, code review findings, and lessons learned. Full audit trail from requirement to delivery.

### Example 3: Continuous Improvement Loop

**Scenario**: You've been developing for a week and noticed some friction points in the workflow. The technical plan format is verbose, and diagram updates take too long. You want the team to improve based on this real experience.

**Step-by-Step Process**:

1. **Log feedback during development**
   - When you encounter issues or have improvement ideas, instruct your main LLM agent to log structured feedback. Be specific about the situation and what could be better.
   - Sample prompt: "Please log feedback that the technical plan format includes too much boilerplate. When creating plans for simple CRUD endpoints, the 8-section format feels excessive. Suggest a 'simple ticket' profile that uses a condensed format for straightforward features."
   - Expected outcome: Feedback log created capturing the context, specific issue, your suggestion, and classification (likely 'process_feedback' with 'medium' severity).

2. **Accumulate feedback over time**
   - Continue logging feedback as you work. Each entry adds to the pattern data that retro will analyze. Don't wait for perfection - log issues as you encounter them.
   - Expected outcome: Multiple feedback logs accumulated over the development period covering various process and artifact experiences.

3. **Request retrospective analysis**
   - Periodically ask retro agent to analyze accumulated feedback and generate improvement recommendations. Weekly or sprint-end timing works well for most teams.
   - Sample prompt: "retro, please analyze feedback from the past week and create a retro report with improvement recommendations."
   - Expected outcome: Retro report generated with pattern analysis and categorized recommendations for process routines, artifact templates, and documentation updates.

4. **Review and implement improvements**
   - Read the retro recommendations and decide which to implement. Some are concrete file updates (updating a routine, modifying a schema), while others require team discussion or profile adjustments.
   - Sample prompt: "Let's implement the recommendation to add a 'simple-ticket' profile to team-profile.yaml. Can you update the file with appropriate settings?"
   - Expected outcome: Team processes systematically improved based on real usage experience. Changes are concrete, version-controlled, and permanent rather than lost tribal knowledge.


**Final Result**: Your team's processes have improved based on real feedback rather than guesswork. The technical plan format is now more appropriate for different ticket complexities. Future development benefits from these systematic enhancements, and the pattern continues as you keep logging feedback and running retrospectives.

<!-- SECTION:END:WORKFLOW_EXAMPLES -->
