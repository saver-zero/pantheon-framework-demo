---
created_at: 2025-10-22 HH:MM AM PDT
---

<!-- SECTION:START:OVERVIEW -->

# receipt-analysis Team

## Mission

Transform receipt images into actionable spending insights through simple, conversational analysis that reveals where your money really goes and how to save more, without requiring financial expertise or manual tracking.

## Value Proposition

Most people struggle to understand their spending because credit card statements only show merchant totals, not what was actually purchased. The Receipt Analysis Team bridges this gap by processing receipt images to reveal detailed spending patterns at the item and category level. You get clear visibility into your purchasing behavior, practical money-saving tips based on your actual habits, and insights delivered in an approachable format that takes under 2 minutes to read.

## Key Capabilities

- **Receipt Image Analysis**: Extract detailed transaction data from receipt photos including items, prices, stores, and dates to understand what you actually bought.

- **Spending Categorization**: Automatically group purchases into logical categories like groceries, household supplies, or entertainment to see where your money goes.

- **Pattern Recognition**: Identify notable spending habits such as most frequent stores, recurring purchases, or average transaction sizes that reveal your behavior.

- **Personalized Savings Tips**: Receive 2-3 specific, actionable recommendations based on your actual spending patterns rather than generic financial advice.

- **Concise Insight Reports**: Get spending insights in a friendly, conversational markdown report under 50 lines that you can read and understand in 2 minutes.

## When to Use This Team

Use the Receipt Analysis Team when you want to understand your actual spending beyond what credit card statements reveal. If you're wondering where your money really goes each month, this team helps by analyzing your grocery receipts, Amazon orders, retail purchases, and other transactions to show spending breakdowns by category and identify patterns you might not notice on your own. It's particularly valuable when you want practical savings tips based on your real purchasing habits rather than generic budgeting advice. You might engage this team after accumulating a week or month of receipts, before making budget adjustments, or when you simply want clarity on your spending without manually tracking every purchase or building spreadsheets. The team is designed for anyone who wants better financial visibility without becoming a spreadsheet expert.

<!-- SECTION:END:OVERVIEW -->

<!-- SECTION:START:GETTING_STARTED -->

## Getting Started

Getting started with the Receipt Analysis Team is simple and requires no setup or configuration. You'll have your first spending insights in just a few conversational exchanges.

### Prerequisites

- One or more receipt images (photos or digital scans) from recent purchases

- File paths or direct access to the receipt images you want to analyze

- A general sense of what you want to learn about your spending, though this is optional

### Your First Interaction

**Step 1: Engage receipt-helper**

Start a conversation with receipt-helper by addressing it directly. Let it know you'd like to analyze some receipts to understand your spending.

Example:

```

receipt-helper, I'd like to analyze my grocery receipts from the past two weeks to see where I can save money.

```

**Step 2: Provide receipt images**

Share the file paths to your receipt images or attach the photos directly to your message. You can analyze a single receipt or multiple receipts at once.

Example:

```

Here are my receipts: ~/receipts/groceries_2025-10-15.jpg, ~/receipts/target_2025-10-18.jpg, ~/receipts/amazon_2025-10-20.jpg

```

💡 **Tip**: Providing multiple receipts helps the agent identify more meaningful patterns and trends across your spending.

**Step 3: Review the report**

Read the Spending Insights Report that receipt-helper generates. Check the quick stats for an overview, review categories to see where money went, examine patterns for standout observations, and focus on actionable tips for what to do next.

💡 **Tip**: The entire report is designed to be read in under 2 minutes, so you don't need to set aside significant time.

**Step 4: Ask follow-up questions**

If something isn't clear or you want more detail on a specific pattern or tip, ask receipt-helper to explain further or provide additional guidance tailored to your situation.

Example:

```

Can you explain more about the brand comparison tip? Which specific products should I switch?

```

### What Happens Next

After your first successful analysis, consider establishing a regular cadence for reviewing receipts. Many users find weekly or monthly reports helpful for tracking spending trends over time. You can also experiment with analyzing different types of receipts together or separately to understand spending in specific areas like groceries versus entertainment. If you want to refine the insights, provide feedback to receipt-helper about which categories or patterns are most valuable so future reports can focus on what matters most to you. As you become comfortable with the basic workflow, explore asking for specific analyses like comparing spending across different stores or identifying seasonal patterns in your purchases.

### Common Questions

**Q: How many receipts should I analyze at once?**

A: There's no strict limit, but analyzing 5-15 receipts from a week or month typically provides enough data for meaningful patterns without overwhelming the analysis. More receipts help identify trends, but even a few receipts can surface useful insights.

**Q: What if the agent miscategorizes a purchase?**

A: Let receipt-helper know which items were miscategorized and provide the correct category. The agent will note your feedback for future reports and can regenerate the current report with corrected categories if needed.

**Q: Can I analyze receipts from different stores together?**

A: Absolutely. Analyzing receipts across different stores often reveals the most interesting patterns, like whether you consistently pay more at certain retailers or which stores offer better value for specific product categories.

**Q: How specific will the money-saving tips be?**

A: Tips are based on your actual spending patterns rather than generic financial advice. For example, instead of 'buy generic brands,' you might see 'You bought name-brand paper towels at Target for $8; the generic version is $4.50.' The specificity depends on what patterns emerge from your receipts.

**Q: What if I want to focus on a specific spending area?**

A: Tell receipt-helper your specific focus when requesting analysis. For example, 'I want to understand my grocery spending' or 'I'm concerned about entertainment costs.' The agent will emphasize relevant categories and patterns in the report.

**Q: Is Pantheon a task management system?**

A: No, Pantheon doesn't position itself as a task management system, nor dictate a specific task management system. You can integrate any task management system of your choice simply by creating tasks based on the created artifacts.

<!-- SECTION:END:GETTING_STARTED -->

<!-- SECTION:START:WORKING_WITH_AGENTS -->

## Working with receipt-analysis Agents

The receipt-analysis team operates through natural conversation with agents, not technical commands. Each agent is an expert in their domain who understands your goals and translates them into concrete artifacts: Spending Insights Report.

You communicate directly with agents using plain language about what you want to accomplish. Working through the agents eliminates the cognitive overhead of remembering complex procedures and technical syntax.

Agents maintain consistent behavior through structured processes provided by the Pantheon framework, ensuring reliable results every time. This systematic approach creates clear accountability and traceability, so it’s always obvious what was done and why.

With every action documented in structured artifacts and audit trails, you gain full transparency, while staying focused on high-level direction and decision-making.

### Your Role

Your role is to provide the receipt images and review the insights for accuracy and relevance. You decide which receipts to analyze, when to request a report, and how to act on the recommendations. The team handles all the technical complexity of image analysis, data extraction, categorization, and pattern detection. You don't need to manually categorize purchases, calculate totals, or identify patterns yourself. Your expertise lies in understanding your own spending goals and recognizing which insights matter most for your financial decisions. The agent produces the analysis, but you provide the context and judgment that turns data into action.

Once you have the artifacts, direct the primary LLM agent outside of Pantheon (i.e. Claude Code, GPT Codex, Gemini) to execute based on the artifact (i.e. implement code based on plan, write blog post based on outline). This allows for a flexible collaboration between the main LLM agent based on the artifacts created: Spending Insights Report .

### Communication Best Practices

- **Provide Clear Context**: When requesting analysis, mention your goals or concerns so the agent can highlight the most relevant insights for your situation.

- **Share Multiple Receipts**: The more receipts you provide in a single request, the better the agent can identify meaningful patterns and trends across your spending.

- **Ask Follow-Up Questions**: If a spending pattern or tip isn't clear, ask the agent to explain further or provide more specific guidance based on your circumstances.

- **Iterate on Categories**: If spending categories don't accurately reflect your purchases, let the agent know so it can adjust the categorization in future reports.

- **Focus on Patterns**: Pay attention to recurring behaviors and trends rather than individual transactions, as these reveal the spending habits that impact your budget most.

<!-- SECTION:END:WORKING_WITH_AGENTS -->

<!-- SECTION:START:AGENTS -->

## Available Agents

The Receipt Analysis Team consists of a single specialist agent designed to be your personal spending analyst. This focused approach ensures consistent, conversational insights without handoffs or complexity.

### receipt-helper

**Expertise**: Transforms receipt images into clear, conversational spending insights that reveal purchasing patterns and provide personalized money-saving recommendations.

**When to Engage**: Engage receipt-helper whenever you want to analyze receipt images to understand your spending. Use this agent when you have accumulated receipts you want to review, when you need clarity on where your money is going, or when you want practical savings tips based on your actual purchasing behavior rather than generic advice.

**How to Interact**:

Start by telling receipt-helper you'd like to analyze your receipts, then provide the image file paths or attach the receipt photos directly to your message. You can analyze a single receipt or multiple receipts at once for better pattern detection. Mention any specific concerns like 'I feel like I'm spending too much on groceries' or 'I want to see my entertainment spending' to help the agent focus on what matters most to you. The agent will produce a complete spending insights report with stats, categories, patterns, and tips.

**What receipt-helper Delivers**:

- Spending Insights Report with summary statistics

- Category breakdown showing where money was spent

- Notable spending patterns and observations

- 2-3 personalized, actionable money-saving tips

<!-- SECTION:END:AGENTS -->

<!-- SECTION:START:ARTIFACTS -->

## Understanding Team Artifacts

The Receipt Analysis Team produces a single type of artifact designed to deliver maximum insight with minimal complexity. The Spending Insights Report is the complete deliverable you receive after analysis, containing everything you need to understand your spending and identify savings opportunities. Each report is structured to be concise, conversational, and actionable so you can review it in under 2 minutes and immediately know what steps to take.

### Artifact Types

#### Spending Insights Report

**Purpose**: Transforms raw receipt data into a concise, readable markdown document that reveals spending patterns, category breakdowns, and practical money-saving tips.

**Format**: Markdown document under 50 lines, structured with quick stats, category breakdown, notable patterns, and actionable tips sections.

**How to Use**:

Read the quick stats first to get an at-a-glance view of your spending. Review the category breakdown to see where your money goes by spending area. Check the notable patterns section for standout observations about your purchasing behavior. Focus on the actionable tips section for specific recommendations you can implement immediately. If a tip or pattern isn't clear, ask receipt-helper to explain it in more detail or provide additional context based on your specific situation.

### Integrating Artifacts into Your Workflow

The Spending Insights Report is designed to integrate seamlessly into your personal financial workflow without requiring special tools or technical setup. Since the report is delivered as a markdown file, you can read it directly in any text editor, markdown viewer, or note-taking application like Obsidian, Notion, or Apple Notes. If you want to take action on the insights, you can copy specific tips into your budgeting app, share category breakdowns with a financial advisor, or use the patterns section to inform spending decisions. The report's conversational format makes it easy to share with family members or accountability partners without needing to explain technical jargon. For ongoing tracking, consider requesting reports monthly or weekly and comparing category percentages over time to see how your spending evolves. The under-50-line format ensures each report remains focused and actionable rather than overwhelming, making it practical to review regularly without significant time investment.

### Tips for Artifact Consumption

- **Reading Priority**: Start with actionable tips for immediate value, then review patterns to understand the 'why' behind your spending, and finally examine categories and stats for detailed context.

- **Tracking Over Time**: Request reports regularly and compare category percentages across time periods to see if your spending habits are shifting in the direction you want.

- **Acting on Tips**: Pick one or two tips from each report to implement rather than trying to change everything at once, as small consistent changes compound over time.

- **Sharing Insights**: The conversational tone makes reports easy to share with partners or family members to discuss spending decisions without presenting dry financial data.

<!-- SECTION:END:ARTIFACTS -->

<!-- SECTION:START:WORKFLOW_EXAMPLES -->

## Workflow Examples

These examples show real scenarios where the Receipt Analysis Team delivers value. Each demonstrates the complete workflow from initial request to final insights, with sample prompts you can adapt for your own use.

### Example 1: Monthly Grocery Spending Review

**Scenario**: You've accumulated a month of grocery receipts and want to understand where your food budget is going. You're curious if you're overspending in certain categories and want practical tips for reducing costs without sacrificing quality.

**Step-by-Step Process**:

1. **Request analysis with context**
   - Address receipt-helper and explain your goal of understanding grocery spending patterns. Provide file paths to your receipt images from the past month.

   - Sample prompt: "receipt-helper, I'd like to analyze my grocery spending from October. I feel like I'm spending more than I should and want to see where I can cut back. Here are my receipts: ~/receipts/grocery_oct_*.jpg"

   - Expected outcome: receipt-helper acknowledges your request and begins processing the receipt images to extract transaction data.

2. **Review the generated report**
   - Read the Spending Insights Report that receipt-helper produces, paying special attention to the category breakdown and actionable tips sections since those directly address your goal.

   - Expected outcome: You receive a concise report showing total spent, spending by category, notable patterns like most expensive purchases, and 2-3 specific tips for reducing grocery costs based on your actual buying habits.

3. **Ask for clarification**
   - If a tip mentions switching brands or shopping at different stores, ask receipt-helper to provide more specific guidance about which products to change or what price differences you can expect.

   - Sample prompt: "The tip about organic produce is interesting. Can you tell me which specific items would save the most if I switched to conventional?"

   - Expected outcome: receipt-helper provides detailed guidance based on the items it observed in your receipts, such as 'You bought organic berries for $8.99; conventional berries at the same store are typically $4.99, saving you about $16 per month based on your purchase frequency.'

**Final Result**: You have a clear understanding of where your grocery budget goes, which categories consume the most money, and 2-3 actionable steps you can take immediately to reduce costs. You can track whether these changes work by requesting another report next month to compare spending patterns.

### Example 2: Multi-Store Shopping Comparison

**Scenario**: You shop at multiple retailers and want to know if you're getting good value. You suspect certain stores are consistently more expensive but don't have concrete data to confirm this feeling.

**Step-by-Step Process**:

1. **Provide receipts from multiple stores**
   - Collect receipts from different retailers over a recent time period and share them with receipt-helper, mentioning your goal of comparing store pricing.

   - Sample prompt: "receipt-helper, I shop at Target, Walmart, and a local grocery store. Can you analyze these receipts and tell me if I'm paying more at certain stores? Here are receipts from all three: ~/receipts/target_*.jpg, ~/receipts/walmart_*.jpg, ~/receipts/localmarket_*.jpg"

   - Expected outcome: receipt-helper processes receipts from all stores and begins identifying pricing patterns and purchase overlaps across retailers.

2. **Review store-specific patterns**
   - Check the notable patterns section of the report for observations about store pricing, and look at actionable tips for recommendations about where to shop for different product categories.

   - Expected outcome: The report highlights findings like 'Target is your most frequent store but Walmart prices on household supplies are 15-20% lower' or 'You buy produce at all three stores; the local market is consistently cheaper for fresh items.'

**Final Result**: You have data-driven insights about which stores offer the best value for different product categories. You can make informed decisions about where to shop for specific items, potentially saving hundreds of dollars per year by optimizing store choice.

### Example 3: Quick Single-Receipt Analysis

**Scenario**: You just completed a large shopping trip and want to quickly understand what you spent before the next time you shop. You don't need comprehensive trend analysis, just a breakdown of today's purchase.

**Step-by-Step Process**:

1. **Request immediate analysis**
   - Share the single receipt image with receipt-helper right after your shopping trip and ask for a quick breakdown.

   - Sample prompt: "receipt-helper, I just got back from Costco with a huge receipt. Can you break down what I actually spent on? Here's the receipt: ~/receipts/costco_today.jpg"

   - Expected outcome: receipt-helper analyzes the single receipt and provides a category breakdown showing how much went to groceries, household items, electronics, etc.

2. **Use insights for future planning**
   - Review the category breakdown to see where the bulk of your spending went, then use this awareness to adjust your next shopping list.

   - Expected outcome: You discover insights like '60% of this trip was snacks and beverages' or 'You spent $85 on non-food items you didn't plan for,' helping you shop more intentionally next time.

**Final Result**: You gain immediate awareness of what you actually bought rather than just the bottom-line total. This helps you adjust future shopping behavior before habits become entrenched, and you can track whether similar patterns appear in subsequent trips.

<!-- SECTION:END:WORKFLOW_EXAMPLES -->
