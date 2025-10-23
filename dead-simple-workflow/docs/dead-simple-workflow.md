---
original post: https://www.reddit.com/r/ClaudeAI/comments/1mx7k09/stop_overcomplicating_claude_code_the_dead_simple/
---

TL;DR: Plan with Claude chat → Create [CLAUDE.md](http://claude.md/) and [TODO.md](http://todo.md/) → Execute small chunks with Claude Code → Commit often. Built a SaaS in 20 days with this approach.

We're drowning in complexity. MCPs, deepthink, elaborate [CLAUDE.md](http://claude.md/) files, endless "best practices" posts. Meanwhile, Claude Code keeps looping with "You're absolutely right!" while nothing actually gets built.

Here's the truth: All you need is a simple discussion with AI that produces a clear plan. Then have Claude Code execute it chunk by chunk, committing small iterations along the way.

I've used this exact workflow to build real SaaS products, mobile apps, and side projects. Here's one I entered in the "Build with Claude" contest - 20 days, zero lines of code written by me. Not because I can't code, but to prove it works.

The "Everything You Need Is Already Here" Workflow
📝 Phase 1: Plan Like You're Talking to a Co-founder
Brainstorm naturally - Jump into Claude chat and explain your idea like you're at a coffee shop. Ask Claude to rate it 1-10. Iterate until you have clear features and user flow.

Pick your stack - Keep it simple:

Database/Auth: Supabase (fast) or Better Auth

Web app: Next.js

Mobile: React Native or Flutter

Already know what you want? Use it.

Define your MVP ruthlessly - Your perfect app idea can wait. What's the absolute minimum that proves the concept?

🎯 Phase 2: Create Your Battle Plan
Once you and Claude are aligned on the vision, use this exact prompt:

Create [CLAUDE.md](http://claude.md/) outlining everything needed to know for Claude Code agent regarding this project/idea. Then, create TODO_MVP.md outlining all phases and steps needed to bring this project to completion.

Pro tip: Split this into two prompts for each file due to prompt response length limits if your scope is broad.

🚀 Phase 3: Execute in Small Bites
Initial setup - Create your project manually, add the two .md files

Bring in Claude Code (run in planning mode):

Read [CLAUDE.md](http://claude.md/) and TODO_MVP.md. Then proceed with implementing these steps from TODO_MVP.md: [copy-paste 3-5 steps max]. Mark what's done when done.

1. Watch your context like a hawk: ⚠️ Critical: When context drops below 20%, start fresh. Before that:

Read and check if we should update [CLAUDE.md](http://claude.md/) based on changes we've done to this project thus far. Make sure there are no uncommitted changes.

1. Reset and repeat - Run /clear and go back to step 5 with the next chunk

🎬 Real Example
See the entire planning phase (steps 1-3) in action:
https://claude.ai/share/5c082ca8-3ad4-4f3c-803f-6daa64f9dfe0

❌ Common Pitfalls to Avoid
Don't dump 20+ tasks on Claude Code at once - It'll lose focus by task 5

Don't skip the [CLAUDE.md](http://claude.md/) updates - Outdated context = confused AI

Don't wait until 5% context to reset - Performance degrades way before that

Don't overcomplicate your initial stack - You can always refactor later

💡 When Things Go Sideways
Claude Code stuck in a loop? Lost track of what it's doing? Just:

Commit whatever works

Update your [CLAUDE.md](http://claude.md/) with lessons learned

Start fresh with clearer instructions

The bottom line: Stop trying to be clever. This simple workflow has shipped more products than any complex setup I've tried. The magic isn't in the process - it's in actually starting.

Questions? Stuck somewhere? Drop a comment or DM me. Happy to help debug your specific situation.

P.S. Adding new features? Generate a TODO markdown file with phases and steps based on your current codebase using planning mode.