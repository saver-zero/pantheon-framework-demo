---
original post: https://www.reddit.com/r/ClaudeAI/comments/1n1941k/the_antiyolo_method_why_i_make_claude_draw_ascii/
---

The Anti-YOLO Method: Why I make Claude draw ASCII art before writing code - How it make me ship faster, better, and with less tokens spent

After months of trial and error, I've settled on a workflow that's completely changed how I build features with Claude. It's cut my token usage way down and basically eliminated those "wait, that's not what I meant" moments.

The TL;DR Flow:
Brainstorm → ASCII Wireframe → Plan³ → Test → Ship

1. Collaborative Brainstorming
Start by explaining the problem space, not the solution. I tell Claude:

Current UX pain points

What users have now vs. what they need

Context about the existing system

Then we go back and forth on ideas. This collaborative phase matters - Claude often suggests approaches I hadn't thought of.

1. ASCII Wireframing (This is where it gets good)
Before writing any code, I ask Claude to create ASCII art wireframes.

Why this works so well:

Super quick iterations

Uses 10x fewer tokens than HTML prototypes

Forces focus on layout/flow, not colors/fonts

Dead simple to edit and discuss

I save these ASCII wireframes + decisions in markdown files. They become my single source of truth.

Real example from this week: ASCII wireframe for Vibe-Logs' Prompt Pattern Analyzer (basically helps you spot what makes your prompts work)

r/ClaudeAI - The Anti-YOLO Method: Why I make Claude draw ASCII art before writing code - How it make me ship faster, better, and with less tokens spent
3. Plan Until It Hurts
Shift + Tab x2 → Plan mode → @ tag the brainstorming file

Ask Claude to review the codebase and create a full plan covering:

Backend architecture

Database considerations

UI - matching existing styles + Friendly Id names for components and sub-components

Security implications

Testing strategy

Here's the thing: Ask Claude to ask YOU clarifying questions first. The questions it asks often expose assumptions you didn't realize you were making.

Seriously: Read the plan twice. If you change nothing, you're probably missing something.

1. Test Before You Celebrate
With the implementation done, I have Claude write comprehensive tests:

Unit tests for the business logic

Integration tests for API endpoints

Component tests for UI behavior

Edge cases from our original brainstorm

- Don't trust the auto-generated test and make sure to test everything manually, also check data integrity against the DB.

The ASCII wireframe becomes the test spec - if it's in the wireframe, it gets tested.

1. Ship with Confidence
Now the implementation phase becomes surprisingly smooth. Claude has everything it needs to build exactly what you had in mind, and you know it works because you've tested it properly.