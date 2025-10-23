---
created_at: 2025-10-14 HH:MM AM PDT
---

<!-- SECTION:START:OVERVIEW -->

# production-ready-development Team

## Mission

Enable you to ship high-quality features with confidence by providing specialized AI agents that transform vague ideas into production-ready code through structured guidance, systematic evaluation, and architectural review.

## Value Proposition

Stop getting lost in context engineering and code reviews. This team addresses the challenge of trusting AI to implement features autonomously by providing scoped, standalone specifications that prevent scope creep, systematic quality gates that ensure code meets production standards, and consolidated feedback that surfaces genuine architectural concerns without overwhelming you. You focus on product direction and strategic decisions while agents handle the detailed implementation, testing, and documentation work.

## Key Capabilities

- **Issue-to-PRD Transformation**: Convert vague issue descriptions into comprehensive, scoped specifications that provide exactly what's needed for implementation without extraneous context.

- **Systematic Code Evaluation**: Assess code quality, test coverage, and architectural alignment through structured analysis before human review to ensure production readiness.

- **PR Feedback Consolidation**: Synthesize multiple AI reviewer perspectives into actionable recommendations that surface genuine architectural concerns without noise.

- **Context-Isolated Implementation**: Guide autonomous implementation within tightly scoped boundaries to prevent confusion and over-implementation from excessive context.

- **Evaluation-Improvement Cycles**: Enable iterative refinement by evaluating implementations first, then systematically addressing critical and medium feedback before finalization.

- **Documentation Synchronization**: Maintain accurate documentation that reflects actual implemented changes without requiring manual documentation work.

## When to Use This Team

Use this team when you're working on an established codebase with existing tests and need to scale development capacity without compromising architectural integrity. This team is ideal for technical founders or small teams who want AI to handle feature implementation autonomously while maintaining control over product direction and merge decisions. It's particularly valuable when you've experienced frustration with context engineering causing AI to do too much at once or get confused about what was actually requested. The workflow shines when you need to ship features quickly but want systematic quality checks that ensure code is production-ready before you review it. If you're treating AI like a capable junior developer who needs clear guidance and complete context within defined boundaries, this team provides the structure to make that collaboration reliable and trustworthy.

<!-- SECTION:END:OVERVIEW -->

<!-- SECTION:START:GETTING_STARTED -->

## Getting Started

Welcome to the Production-Ready Development Team. This guide will walk you through your first feature implementation using the structured workflow. Don't worry about getting everything perfect the workflow's safeguards will catch issues before they become problems.

### Prerequisites

- An established codebase with existing test suite

- A feature request or bug fix that needs implementation

- Access to an implementation LLM like Claude Code or Cursor

- GitHub repository with external AI reviewers configured

### Your First Interaction

**Step 1: Create Your First PRD**

Start by asking the prd-specialist to transform your issue into a specification. Provide your issue description or GitHub issue ID. For example: 'prd-specialist, create a PRD for adding user login functionality to the application.' The agent will analyze your issue and generate a comprehensive PRD.

💡 **Tip**: Initial issue descriptions are often vague, so plan to review and refine the PRD before implementation begins.

**Step 2: Review and Refine**

Read through the generated PRD carefully. Check that the requirements capture what you actually want, the context includes necessary architectural patterns, and the success criteria are clear. If anything needs adjustment, ask the prd-specialist to update specific sections. For example: 'Update the requirements section to include password strength validation.'

Example:

```

If the context section is missing information about your authentication middleware, request that addition before proceeding.

```

**Step 3: Implement with Context Isolation**

Once the PRD looks good, use it to guide your implementation via your preferred LLM. Provide only the PRD and explicitly instruct the LLM to ignore other documentation. Run tests frequently and ensure they all pass before moving to evaluation.

💡 **Tip**: Think of this as giving a complete briefing to a junior developer they have everything they need in this one document.

**Step 4: Get Your First Evaluation**

After implementation is complete and tests pass, ask the code-evaluator to assess your work. For example: 'code-evaluator, evaluate my implementation against PRD-001.' Review the feedback summary and address any critical issues. Medium issues can be addressed based on your judgment.

Example:

```

If the evaluator flags missing edge case tests, add those tests before finalizing the implementation.

```

### What Happens Next

After your first successful evaluation, continue with documentation updates and creating a pull request. When external AI reviewers comment on your PR, engage the review-synthesizer to consolidate their feedback. As you become comfortable with the workflow, you'll find natural rhythms for when to intervene and when to let agents work autonomously for 15-35 minutes at a time. Experiment with different issue complexities to understand where the workflow shines and where you need to provide more detailed PRD guidance. Consider setting up custom commands or shortcuts to streamline the agent invocations you use most frequently. The workflow becomes increasingly valuable as you build trust in the evaluation gates and learn to distinguish genuine architectural concerns from over-engineering suggestions.

### Common Questions

**Q: What if the initial PRD misses important context?**

A: This is normal, especially with vague issue descriptions. Simply ask the prd-specialist to update the specific section that needs more detail. The update workflow allows you to refine requirements, context, guidance, or success criteria without regenerating the entire PRD.

**Q: Do I need to manually review all the code?**

A: No. The code-evaluator performs systematic quality checks so you can focus on lightweight user acceptance testing and architectural decisions rather than detailed code review. You'll spot-check code to get a feel for the implementation, but you're not line-by-line reviewing like you would with an unsupervised junior developer.

**Q: How do I know which evaluation feedback to address?**

A: Always address critical feedback immediately. For medium feedback, use your architectural judgment to determine what's truly necessary versus over-engineering. Low feedback can generally be ignored or addressed in future iterations.

**Q: Can I combine multiple workflow phases?**

A: Yes, once you're comfortable with the workflow. Many users start by running each phase manually to build trust, then gradually automate phase transitions. The workflow is designed to allow agents to work autonomously for 15-35 minutes between your strategic checkpoints.

**Q: What if external AI reviewers disagree?**

A: This is where the review-synthesizer adds value. It consolidates multiple perspectives and helps you identify which concerns are genuine architectural issues versus style preferences or conflicting opinions. You make the final call based on the consolidated architectural concerns section.

**Q: Is Pantheon a task management system?**

A: No, Pantheon doesn't position itself as a task management system, nor dictate a specific task management system. You can integrate any task management system of your choice simply by creating tasks based on the created artifacts.

<!-- SECTION:END:GETTING_STARTED -->

<!-- SECTION:START:WORKING_WITH_AGENTS -->

## Working with production-ready-development Agents

The production-ready-development team operates through natural conversation with agents, not technical commands. Each agent is an expert in their domain who understands your goals and translates them into concrete artifacts: Issue-Specific PRD, Implementation Evaluation Report, PR Review Consolidation.

You communicate directly with agents using plain language about what you want to accomplish. Working through the agents eliminates the cognitive overhead of remembering complex procedures and technical syntax.

Agents maintain consistent behavior through structured processes provided by the Pantheon framework, ensuring reliable results every time. This systematic approach creates clear accountability and traceability, so it’s always obvious what was done and why.

With every action documented in structured artifacts and audit trails, you gain full transparency, while staying focused on high-level direction and decision-making.

### Your Role

You act as product manager and architect, focusing on vision, requirements, and strategic decisions rather than detailed implementation. You review and refine issue-specific PRDs to ensure they capture what you want before implementation begins. You make final judgment calls on whether AI-suggested improvements are truly necessary or represent over-engineering. You perform lightweight user acceptance testing to verify features work as intended, complementing the systematic quality checks from AI evaluators. You handle all Git operations including branching, committing, merging, and closing issues. The agents handle the procedural complexity of implementation, evaluation, and documentation, but you remain in control of architectural direction and shipping decisions. You work at strategic checkpoints rather than maintaining continuous oversight, trusting the safeguards built into the workflow while making final calls on what ships to production.

Once you have the artifacts, direct the primary LLM agent outside of Pantheon (i.e. Claude Code, GPT Codex, Gemini) to execute based on the artifact (i.e. implement code based on plan, write blog post based on outline). This allows for a flexible collaboration between the main LLM agent based on the artifacts created: Issue-Specific PRD, Implementation Evaluation Report, PR Review Consolidation .

### Communication Best Practices

- **Context Isolation**: Provide only the information relevant to the specific task at hand to prevent agents from doing too much at once or getting confused.

- **Review Before Implementation**: Always review and refine generated PRDs before starting implementation, as initial issue descriptions are often vague or incomplete.

- **Trust the Evaluation Gates**: Let the code-evaluator assess quality systematically rather than diving into detailed code review yourself during initial checks.

- **Strategic Checkpoints**: Intervene at defined phases rather than continuously overseeing work to enable autonomous execution within bounded scopes.

- **Junior Developer Framing**: Think of agents as capable but requiring clear guidance, complete context, and explicit boundaries to produce quality work consistently.

<!-- SECTION:END:WORKING_WITH_AGENTS -->

<!-- SECTION:START:AGENTS -->

## Available Agents

Each agent on this team specializes in a specific phase of the development workflow. The prd-specialist transforms issues into specifications, the code-evaluator ensures quality through systematic assessment, and the review-synthesizer consolidates external feedback into actionable insights.

### prd-specialist

**Expertise**: Transforms vague issue descriptions into comprehensive, scoped PRDs that provide complete context for autonomous implementation without extraneous information.

**When to Engage**: Engage when you have a new feature request or bug fix that needs to be turned into a detailed specification. Use this agent at the start of every development cycle to establish scope and provide complete context before implementation begins.

**How to Interact**:

Share your issue description or GitHub issue ID and ask the agent to create an issue-specific PRD. You can say something like: 'Create a PRD for implementing user authentication' or 'Generate a PRD from issue 42'. After the PRD is generated, review it and ask for refinements to specific sections if the requirements, context, guidance, or success criteria need adjustment. The agent will ask clarifying questions if your initial description is vague.

**What prd-specialist Delivers**:

- Issue-specific PRD with requirements

- Relevant codebase context and patterns

- Implementation guidance and snippets

- Clear success criteria and test requirements

### code-evaluator

**Expertise**: Systematically assesses code quality, test coverage, and architectural alignment to ensure implementations are production-ready before human review.

**When to Engage**: Use after implementation is complete and all tests are passing. This agent provides a quality gate before you perform user acceptance testing, ensuring code meets standards before you invest time in manual review.

**How to Interact**:

Point the agent to your uncommitted code changes and the PRD that guided implementation. Say something like: 'Evaluate my implementation against PRD-042' or 'Create an evaluation report for the user authentication feature'. The agent will analyze test coverage, architectural alignment, and code quality, then provide categorized feedback. Review the feedback summary and determine which critical or medium issues need addressing before finalization.

**What code-evaluator Delivers**:

- Test coverage analysis

- Architectural alignment assessment

- Code quality evaluation

- Categorized feedback by severity

### review-synthesizer

**Expertise**: Consolidates feedback from multiple AI code reviewers into actionable reports that highlight genuine architectural concerns and prevent technical debt.

**When to Engage**: Engage after creating a pull request when external AI reviewers like Claude Code or CodeRabbit have provided comments. This agent helps you make sense of multiple reviewer perspectives without getting overwhelmed by volume.

**How to Interact**:

Provide your PR number or URL and ask the agent to consolidate the feedback. Try: 'Consolidate the review feedback from PR 123' or 'Synthesize the AI comments on my authentication PR'. The agent will organize feedback by theme, surface architectural concerns, and provide prioritized recommendations. Review the architectural concerns section to determine which issues warrant code changes before merging.

**What review-synthesizer Delivers**:

- Consolidated feedback organized by theme

- Highlighted architectural concerns

- Prioritized action recommendations

- Technical debt risk assessment

<!-- SECTION:END:AGENTS -->

<!-- SECTION:START:ARTIFACTS -->

## Understanding Team Artifacts

This team produces three core artifact types that guide you through the development workflow. Each artifact captures decisions, context, and feedback within the Pantheon framework rather than losing them in ad-hoc communications or external tools. These artifacts form a sequential, quality-gated workflow where each builds on the previous one to ensure production readiness.

### Artifact Types

#### Issue-Specific PRD

**Purpose**: Provides a standalone specification for implementing a single feature or bug fix with exactly the context needed and nothing more.

**Format**: Structured markdown document with sections for requirements, context, guidance, and success criteria.

**How to Use**:

Use this as the single source of truth when implementing a feature. Review and refine it before starting implementation to ensure requirements are clear and context is complete. When implementing, reference only this PRD and avoid reading other documentation to prevent scope creep. After implementation, the code-evaluator will validate your work against this PRD's success criteria. You can update specific sections if requirements evolve or additional context is discovered during implementation.

#### Implementation Evaluation Report

**Purpose**: Provides systematic quality assessment of code changes before human review to ensure production readiness.

**Format**: Structured report with sections for test coverage analysis, architectural alignment, code quality assessment, and categorized feedback.

**How to Use**:

Request this report after implementation is complete and tests are passing. Review the feedback summary section to identify critical and medium issues that need addressing before finalization. Use the architectural alignment section to understand if implementation adheres to established patterns. The test coverage analysis tells you if tests adequately cover new functionality. Address critical feedback immediately and determine which medium issues warrant attention based on your architectural judgment.

#### PR Review Consolidation

**Purpose**: Synthesizes feedback from multiple AI reviewers into actionable insights that surface genuine architectural concerns.

**Format**: Consolidated report with sections for aggregated feedback, architectural concerns, and prioritized recommendations.

**How to Use**:

Request this consolidation after external AI reviewers have commented on your pull request. Focus on the architectural concerns section to identify issues with long-term implications for codebase health. Use the recommended actions section to prioritize which feedback to address before merging. This artifact filters noise and helps you distinguish genuine architectural concerns from style preferences or over-engineering suggestions. Make your final merge decision after assessing all recommendations.

### Integrating Artifacts into Your Workflow

These artifacts are designed to integrate seamlessly with your existing development workflow and tools. The Issue-Specific PRD serves as a contract between you and your implementation LLM, whether that's Claude Code, Cursor, or another tool. When implementing, provide only the PRD to your LLM and explicitly instruct it to ignore other documentation to maintain context isolation. The Implementation Evaluation Report acts as a quality gate before you commit changes, similar to how you might review code from a junior developer before merging. The PR Review Consolidation bridges external AI review tools like CodeRabbit with your Pantheon workflow, bringing outside feedback into the structured environment. All artifacts are stored in the Pantheon framework, creating an auditable history of decisions, feedback, and iterations for each feature. This closed loop ensures nothing is lost in Slack messages, email threads, or PR comments, making it easy to understand why decisions were made when you revisit code months later.

### Tips for Artifact Consumption

- **Context Isolation**: When using PRDs for implementation, explicitly tell your LLM to read only the PRD and ignore other documentation to prevent scope creep and confusion.

- **Evaluation Timing**: Always run tests manually and verify they pass before requesting an evaluation report, as test execution is a prerequisite for quality assessment.

- **Feedback Prioritization**: Focus on critical and medium feedback from evaluation reports, but use your architectural judgment to determine which medium issues truly warrant attention.

- **Artifact Handoffs**: Reference artifacts by their ID when working with agents to ensure everyone is looking at the same version and maintaining the closed loop.

<!-- SECTION:END:ARTIFACTS -->

<!-- SECTION:START:WORKFLOW_EXAMPLES -->

## Workflow Examples

These examples demonstrate real scenarios you'll encounter when using this team. Each workflow shows the conversation patterns, agent handoffs, and decision points you'll navigate during typical development cycles.

### Example 1: Implementing a New Authentication Feature

**Scenario**: You have a GitHub issue requesting user authentication functionality. The issue description is brief and you need to transform it into a complete specification before implementation. You want to ensure the implementation follows your architectural patterns and includes proper test coverage.

**Step-by-Step Process**:

1. **Request PRD Creation**
   - Start a conversation with the prd-specialist and provide your issue reference.

   - Sample prompt: "prd-specialist, create a PRD for implementing user authentication based on GitHub issue 42. The issue mentions login and registration but doesn't specify details."

   - Expected outcome: The agent analyzes the issue, examines your codebase for authentication patterns, and generates a comprehensive PRD with requirements, relevant context, implementation guidance, and success criteria.

2. **Refine Requirements**
   - Review the generated PRD and identify areas that need clarification or additional detail.

   - Sample prompt: "The requirements section looks good but I need the context section to include information about our JWT middleware and session management approach. Can you update the context section?"

   - Expected outcome: The prd-specialist updates only the context section with the additional architectural patterns you specified, leaving other sections unchanged.

3. **Implement Feature**
   - Use your implementation LLM with the finalized PRD, maintaining context isolation by not referencing other documentation.

   - Expected outcome: Your implementation LLM produces authentication code that follows the PRD's guidance, implements all requirements, and includes tests that pass.

4. **Request Quality Evaluation**
   - After verifying tests pass, engage the code-evaluator to assess your implementation.

   - Sample prompt: "code-evaluator, evaluate my authentication implementation against PRD-042. All tests are passing."

   - Expected outcome: The agent produces an evaluation report analyzing test coverage, architectural alignment, and code quality, with categorized feedback identifying one critical issue about missing rate limiting on login attempts.

5. **Address Critical Feedback**
   - Implement the rate limiting suggested by the evaluator, re-run tests, and verify everything still passes.

   - Expected outcome: You add rate limiting middleware, tests pass, and the implementation is now production-ready.

6. **Create PR and Consolidate Reviews**
   - Create a pull request and wait for external AI reviewers to comment, then engage the review-synthesizer.

   - Sample prompt: "review-synthesizer, consolidate the review feedback from PR 123."

   - Expected outcome: The agent aggregates comments from Claude Code and CodeRabbit, surfaces two architectural concerns about token expiration handling, and recommends addressing those before merge.

**Final Result**: You have a production-ready authentication feature with proper test coverage, architectural alignment verified by multiple evaluators, and documentation that reflects the implementation. You made strategic decisions at checkpoints while agents handled detailed evaluation and feedback consolidation. The feature is ready to merge and ship with confidence.

### Example 2: Fixing a Bug with Minimal Overhead

**Scenario**: A user reported a bug where date formatting breaks in certain timezones. You need to fix it quickly but want to ensure the fix doesn't introduce regressions and includes proper test coverage.

**Step-by-Step Process**:

1. **Generate Bug Fix PRD**
   - Engage the prd-specialist with a focused bug description.

   - Sample prompt: "prd-specialist, create a PRD for fixing the timezone bug in date formatting. Users in UTC+12 are seeing incorrect dates."

   - Expected outcome: The agent generates a concise PRD that scopes the fix to the specific timezone issue, includes context about your date handling utilities, and defines success criteria focused on timezone edge cases.

2. **Quick Implementation**
   - Because the PRD is focused and scoped, implementation is straightforward. Your LLM fixes the timezone logic and adds tests.

   - Expected outcome: The bug fix is implemented with tests covering multiple timezone scenarios, all passing.

3. **Fast-Track Evaluation**
   - Request evaluation to ensure no regressions were introduced.

   - Sample prompt: "code-evaluator, evaluate the timezone fix against PRD-043."

   - Expected outcome: The evaluator confirms proper test coverage, no architectural concerns, and the fix is scoped appropriately without side effects.

**Final Result**: You fixed the bug in under 30 minutes of active work, with confidence that tests cover edge cases and no regressions were introduced. The structured workflow prevented scope creep while maintaining quality gates even for a simple bug fix.

### Example 3: Managing Conflicting Review Feedback

**Scenario**: You implemented a new API endpoint and created a pull request. Claude Code suggests one approach to error handling while CodeRabbit suggests a different approach. You need to make an informed decision about which feedback to follow.

**Step-by-Step Process**:

1. **Consolidate Review Perspectives**
   - Engage the review-synthesizer to make sense of the conflicting feedback.

   - Sample prompt: "review-synthesizer, consolidate the feedback from PR 156. There are conflicting suggestions about error handling."

   - Expected outcome: The agent analyzes both reviewers' comments, identifies the core disagreement about error handling strategy, and presents both perspectives with architectural implications for each approach.

2. **Assess Architectural Impact**
   - Review the architectural concerns section to understand long-term implications of each approach.

   - Expected outcome: The consolidation report explains that Claude Code's suggestion aligns with your existing error handling patterns while CodeRabbit's suggestion would require refactoring other endpoints for consistency.

3. **Make Informed Decision**
   - Based on the consolidated analysis, choose the approach that maintains architectural consistency.

   - Expected outcome: You implement Claude Code's suggestion because it aligns with established patterns, avoiding the technical debt of inconsistent error handling across your API.

**Final Result**: You made an architecturally sound decision without getting overwhelmed by conflicting reviewer opinions. The review-synthesizer helped you understand the implications of each approach and maintain consistency with your existing codebase patterns.

<!-- SECTION:END:WORKFLOW_EXAMPLES -->
