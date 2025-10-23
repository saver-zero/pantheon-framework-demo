---
created_at: 2025-10-21 HH:MM PM PDT
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
    -   **Try asking:** @team-readme-writer, create the team readme based on @[TB01]_receipt-analysis_team-blueprint.md
    -   The team-readme-writer will create a team readme. Review and provide feedback to the readme writer to update any flows or usages you'd like to change. And point to the read me to have artifact-designer and agent-designer update their relevant sections of the blueprint.

5.  **Loop, Compare, Refine**
    -   Use what the @agent-designer creates to check whether the artifacts still make sense. If anything feels off, circle back to the @artifact-designer and explore a revised idea.

6.  **Finish with the Team Profile**
    -   **Who to chat with:** `@profile-designer`
    -   **Try asking:** @profile-designer, design the team profile for the blueprint TB01
    -   Together you will turn the `PROFILE` placeholder into the configuration that ties everything together. Review it and provide feedback to the @profile-designer to make any updates, or make the updates yourself in the doc directly.
    -   You do not have to use or implement any of the profiles or configs, if you prefer to keep things simple. In that case, just delete the profiles and replace with "No profiles or configs needed".

### Phase 2: Bring the Blueprint to Life (Sequential)

Once the blueprint feels complete, you can use it as a script for creating the real team package. These steps happen in order so each piece has what it needs from the previous one. For this phase, you can refer to the blueprint using the full filename (i.e. [TB01]_receipt-analysis_team-blueprint.md])

1.  **Create the Team Profile**
    -   The profile carries shared configuration that other components lean on.
    -   Ask @profile-designer to create the team profile from @[TB01]_receipt-analysis_team-blueprint.md

2.  **Stand Up the Agents**
    -   Agents need to exist so the later processes know who they are empowering.
    -   For each agent described here, ask @agent-designer to create the agent from the blueprint.
    -   i.e @agent-designer create the agents from @[TB01]_receipt-analysis_team-blueprint.md
    -   Review it and provide feedback to the @agent-designer to make any updates, or make the updates yourself in the generated agent prompt directly.

3.  **Build the Artifacts & Processes**
    -   This step turns the blueprint's core workflows into the files your team will actually run.
    -   For each artifact, request the @artifact-designer to build each artifact
    -   i.e @artifact-designer, build the master plan artifact from @[TB01]_receipt-analysis_team-blueprint.md
    -   Review it and provide feedback to the @artifact-designer to make any updates, or make the updates yourself in the generated processes and artifact schemas and templates directly.

When you've walked through these steps, the new team package is ready for its debut.
-->

<!-- SECTION:START:FOUNDATION -->

# TB01 - receipt-analysis Team Blueprint

## Team Foundation
updated_at: 2025-10-21 HH:MM PM PDT

**Team Name**: receipt-analysis

### Mission Statement

Transform receipt images into actionable spending insights by analyzing purchase patterns, categorizing expenses, and surfacing practical money-saving opportunities through simple, conversational markdown reports that help users understand their spending beyond credit card statements.

### Strategic Goals

- Provide clear visibility into spending patterns by category, store, and time period from receipt image analysis.

- Surface actionable, practical money-saving tips based on actual purchase behavior rather than generic advice.

- Deliver insights in an approachable, conversational format that takes under 2 minutes to read and understand.

- Enable users to make informed spending decisions without requiring financial expertise or complex tools.

### Key Objectives

- Extract and structure transaction data from receipt images including items, prices, categories, stores, and dates.

- Categorize spending across logical groups and calculate summary statistics for quick pattern recognition.

- Identify the top 2-3 specific, actionable savings opportunities based on observed spending patterns.

- Generate a concise markdown report (under 100 lines) with quick stats, category breakdown, notable patterns, and practical tips.

- Maintain a conversational, friendly tone that makes financial insights approachable rather than overwhelming or preachy.

## System Boundary

### Pantheon Framework Responsibilities

- Defining the template and content structure for the Spending Insights Report.

- Guiding the identification of notable patterns and formulation of actionable tips.

- Ensuring report output stays concise, conversational, and under 100 lines.

### Human Operator Responsibilities

- Uploading or providing receipt images to the analysis workflow.

- Reviewing the generated Spending Insights Report for accuracy and relevance.

- Acting on the insights and tips provided in the report.

### High-Leverage Artifacts

- **Spending Insights Report**: A concise markdown document (under 50 lines) that transforms raw receipt data into actionable insights. Includes quick summary stats, category breakdown with percentages, notable patterns, and 2-3 practical tips. This artifact makes the operator effective by distilling complex spending data into a 2-minute read that drives better financial decisions without requiring manual analysis or spreadsheet work.

### Critical Manual Checkpoints

- Verify that spending categories accurately reflect the nature of purchases before generating the report.

- Read the generated Spending Insights Report to confirm tips are specific, actionable, and based on actual patterns.

- Validate that the report maintains a conversational tone and stays under 100 lines before delivery.

<!-- SECTION:END:FOUNDATION -->

<!-- SECTION:START:CONTEXT -->

## Project Context
updated_at: 2025-10-21 HH:MM PM PDT

Many people struggle to understand their actual spending patterns because credit card statements only show totals per merchant, not what was actually purchased. Receipt Analysis addresses this by processing images of receipts (grocery stores, Amazon orders, retail purchases, etc.) to reveal the detailed story behind each transaction. The team exists to bridge the gap between raw transaction data and meaningful spending insights, helping users see where their money really goes at the item and category level. This visibility enables better financial decisions without requiring users to manually track every purchase or become spreadsheet experts.

### Key Concepts

**Receipt Image**: A photograph or digital scan of a physical or electronic receipt showing purchased items, prices, store information, and transaction date. This is the primary input artifact for the analysis workflow.

**Spending Category**: A logical grouping of purchases such as Groceries, Household Supplies, Entertainment, or Dining Out. Categories help users understand spending patterns across different areas of their budget.

**Spending Insights Report**: The primary output artifact: a concise, conversational markdown document under 50 lines that summarizes spending statistics, category breakdowns, notable patterns, and 2-3 practical money-saving tips.

**Notable Pattern**: A standout observation from the receipt data such as most expensive purchase, most frequent store, average transaction size, or recurring item. These patterns help users recognize their spending habits.

**Actionable Tip**: A specific, practical recommendation for saving money based on observed spending patterns. Must be conversational, non-preachy, and directly tied to actual behavior seen in the receipts rather than generic financial advice.

### Core Capabilities

- Extract structured transaction data from receipt images.

- Categorize purchases into logical spending groups.

- Calculate summary statistics across receipts, categories, and time periods.

- Identify notable spending patterns and anomalies.

- Generate conversational, actionable money-saving recommendations.

- Produce concise, approachable markdown reports under 50 lines.

### Key Principles

- Simplicity over completeness: Focus on the insights that matter most, not exhaustive detail.

- Conversational over technical: Write for a friend, not a finance textbook.

- Actionable over academic: Every insight should connect to something the user can actually do.

- Patterns over transactions: Highlight trends and behaviors, not individual line items.

- Approachable over overwhelming: Keep reports short (under 50 lines) and easy to digest in 2 minutes.

- Specific over generic: Base recommendations on actual observed behavior, not general financial wisdom.

<!-- SECTION:END:CONTEXT -->

<!-- SECTION:START:ARTIFACTS -->


## Artifact Design
updated_at: 2025-10-22 HH:MM AM PDT

### Process Architecture Overview

The receipt-analysis team operates through a single, streamlined Pantheon process that transforms receipt images into actionable insights. The CREATE process captures receipt images and user context, applies image analysis and pattern detection, and produces a concise Spending Insights Report. The GET process retrieves completed reports for review or reference. This minimal architecture reflects the team's casual, user-friendly mission: no complex pipelines or intermediate artifacts, just a direct path from receipt image to readable insight that anyone can understand in under 2 minutes.

### Core Artifacts

#### spending-insights-report Artifact

**Purpose**: Transforms raw receipt data into a concise, conversational markdown document that reveals spending patterns, category breakdowns, and 2-3 practical money-saving tips in under 50 lines.

**Build Mode**: `complete`

**Source Reference**: From the foundation section: 'Spending Insights Report: A concise markdown document (under 50 lines) that transforms raw receipt data into actionable insights. Includes quick summary stats, category breakdown with percentages, notable patterns, and 2-3 practical tips.' This is the primary output artifact of the entire workflow and the only deliverable explicitly named.

**Pantheon Commands**
- To get the instructions for creating spending-insights-report, use `pantheon get process create-spending-insights-report --actor <your_agent_name>`

- To get the instructions for updating quick_stats section of spending-insights-report, use `pantheon get process update-spending-insights-report --id <spending-insights-report id> --sections quick_stats --actor <your_agent_name>`

- To get the instructions for updating category_breakdown section of spending-insights-report, use `pantheon get process update-spending-insights-report --id <spending-insights-report id> --sections category_breakdown --actor <your_agent_name>`

- To get the instructions for updating notable_patterns section of spending-insights-report, use `pantheon get process update-spending-insights-report --id <spending-insights-report id> --sections notable_patterns --actor <your_agent_name>`

- To get the instructions for updating actionable_tips section of spending-insights-report, use `pantheon get process update-spending-insights-report --id <spending-insights-report id> --sections actionable_tips --actor <your_agent_name>`

**Sections**:

- **quick_stats**: Provides at-a-glance summary numbers like total spent, number of receipts analyzed, date range, and average transaction size for immediate context..

- **category_breakdown**: Shows spending by category with dollar amounts and percentages so users can see where their money actually goes..

- **notable_patterns**: Highlights 2-3 standout observations like most expensive purchase, most frequent store, or recurring items that reveal spending habits..

- **actionable_tips**: Delivers 2-3 specific, practical recommendations based on observed patterns rather than generic financial advice..

**Section Workflow**:

- **quick_stats (create)**: First, establish the foundational context by calculating summary statistics from the receipt data. This sets the stage for deeper analysis and gives users immediate orientation.

- **category_breakdown (create)**: Next, categorize and aggregate spending to reveal distribution patterns. This section depends on having processed all receipts and builds on the totals from quick_stats.

- **notable_patterns (create)**: After understanding the categories, identify standout observations that emerge from the data. This requires the category breakdown to be complete so patterns can be detected across spending groups.

- **actionable_tips (create)**: Finally, synthesize the stats, categories, and patterns into specific recommendations. This is the last step because actionable tips must be grounded in all the preceding analysis.

**Process Operations**:

- **CREATE**: Generates a new spending insights report from one or more receipt images, producing a complete markdown document with stats, categories, patterns, and tips.

- **GET**: Retrieves an existing spending insights report for review or reference.

**External Inputs & Canonicalization**:

- Receipt images are provided directly by the operator at CREATE time via file paths or inline image references. The agent's built-in image analysis capability processes these images to extract transaction data, so no separate ingestion artifact is needed.

**Manual Operator Actions**:

- Operator provides one or more receipt image file paths or references when invoking CREATE.

- Operator reviews the generated report to confirm spending categories accurately reflect the purchases.

- Operator verifies that actionable tips are specific, practical, and based on actual observed patterns rather than generic advice.

- Operator confirms the report maintains a conversational, friendly tone and stays under 50 lines before using it.

### Process Interactions

The CREATE process accepts receipt images and operator context as inputs, applies the agent's image analysis capability to extract transaction data, categorizes spending, detects patterns, and writes all four sections of the spending insights report in a single pass. The GET process retrieves the completed report artifact by ID for operator review. No intermediate artifacts or multi-stage hand-offs are required because the report is built in one atomic operation. This closed loop ensures that every insight in the report traces directly to the processed receipt images, and operators always retrieve the exact artifact that was created without external dependencies.

### Operator Notes

Since agents have built-in image analysis capability, operators simply provide receipt image file paths or references directly when creating a report. No separate tools or preprocessing steps are needed. The primary manual checkpoint is reviewing the generated report to confirm that spending categories are accurate, tips are actionable and specific (not generic financial advice), and the tone remains conversational and friendly. If the report exceeds 50 lines or feels preachy rather than helpful, regenerate with tighter constraints. The goal is a 2-minute read that drives better spending decisions, not a comprehensive financial audit.


<!-- SECTION:END:ARTIFACTS -->

<!-- SECTION:START:AGENTS -->


## Agent Architecture
updated_at: 2025-10-22 HH:MM AM PDT

### Team Composition

The receipt-analysis team consists of a single specialist agent designed to provide maximum value with minimal complexity. The receipt-helper agent serves as the user's personal spending analyst, transforming raw receipt images into clear, actionable insights through a streamlined CREATE workflow. This focused composition reflects the team's mission: deliver meaningful financial visibility without overwhelming users with complex processes or multiple handoffs. The agent owns the entire journey from image analysis through insight generation, ensuring consistency and a conversational tone throughout. The operator's role is equally straightforward: provide receipt images, review the generated report for accuracy, and act on the insights. This tight collaboration between one specialized agent and the human operator keeps the workflow efficient while maintaining the personal, approachable experience that makes spending insights accessible to everyone.

### Agent Definitions

#### receipt-helper

**Role**: Personal spending analyst who transforms receipt images into clear, conversational insights that reveal where your money actually goes and how to save more.

**Core Responsibilities**:

- Analyze receipt images to extract transaction data including items, prices, stores, dates, and totals.

- Categorize purchases into logical spending groups and calculate summary statistics.

- Identify notable spending patterns and standout observations from the receipt data.

- Generate 2-3 specific, actionable money-saving tips grounded in actual observed behavior.

- Produce the complete Spending Insights Report in a conversational, friendly tone under 50 lines.

**Key Capabilities**:

- Built-in image analysis for extracting structured data from receipt photographs and digital scans.

- Pattern detection across transactions to surface meaningful spending behaviors and anomalies.

- Conversational writing that transforms financial data into approachable, non-preachy recommendations.

- Concise synthesis that distills complex spending information into a 2-minute read.

**Pantheon Workflows**:

- **create-spending-insights-report**: Generates a complete spending insights report from receipt images, delivering stats, category breakdown, patterns, and practical tips in one concise markdown artifact.

**Manual Handoffs**:

- Operator provides receipt image file paths or references when invoking the CREATE workflow.

- Operator reviews the generated report to confirm spending categories accurately reflect the nature of purchases.

- Operator validates that actionable tips are specific and based on actual patterns rather than generic financial advice.

- Operator confirms the report maintains a conversational tone and stays under 50 lines before using it.


<!-- SECTION:END:AGENTS -->

<!-- SECTION:START:PROFILE -->


## Team Profile Configuration
updated_at: 2025-10-22 HH:MM AM PDT

### Configuration Overview

This team requires no configurable properties or profiles. The receipt-analysis workflow has a single, well-defined operational mode: transform receipt images into conversational, actionable spending insights in under 50 lines. The blueprint's core principles (simplicity over completeness, conversational over technical, actionable over academic) eliminate the need for varying detail levels, tone options, or output formats. Every report follows the same structure with quick stats, category breakdown, notable patterns, and 2-3 practical tips. Adding configuration would introduce unnecessary complexity without unlocking meaningful operational flexibility.

### Profile Configuration

No configuration profiles required for this team. The team operates with a single, consistent configuration.


<!-- SECTION:END:PROFILE -->
