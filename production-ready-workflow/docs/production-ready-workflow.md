---
original post: https://www.reddit.com/r/ClaudeCode/comments/1mzvyyt/my_2_cents_of_making_claude_code_create/
---

**Background**

I have been a CTO / CEO and lead developer on several tech startups for the past 20 years, mainly working on Python and Javascript frameworks, but also DevOps from Amazon to DigitalOcean, Raspberry Pis, etc. You name it, and we have shipped products with it to about 80 countries.

Since Copilot, I have been trying to find ways to benefit from AI on coding and tech development, but it has been hard to really trust it. So I ended up reviewing the code by myself like with the human (junior) developers. The more you let developers or AI code themselves, the more challenge you have to review and understand the code and structure. And to make sure they adhere to the architectural decisions that were made. Call me perfectionist, but when it is your product and company, it is hard to not be intimately involved.

I found that with this ”context” engineering I started to have **more** issues than when I was doing very precise and only hand made prompts. So I really started to test how to fix the situation. For the last couple years I have used all popular LLMs, and have pro / max plans on most of them.

**Insight**

I have now started to be able to let Claude Code (Opus) handle relatively large features or bug fixes on its own and trust it, via safeguards, to create code that I can ship without evaluating the code manually. And trust the tests, which previously started to fail and become unrepairable after 2-3 features.

The principle of the process: custom made standalone document specifically for the issue. Only relevant details and guidance to implement the issue. Helpful code snippets. Anything that helps a junior developer (yes, I call CC as junior developer, not senior) to finish the task with this one document.

This document includes **only** information what is relevant to the feature / bug. No background stories, future improvements, roadmaps, previous issues, etc. And CC is specifically told not to read any other markdown file. I found that giving PRD.md, README.md and other ”context” about the application, it started to do too many stuff at once and got confused what was really asked for.

**Workflow**

1. I have set up a custom CC command with a few sub agents to create an issue specific PRD, by evaluating the issue and then using all markdown files, code and library references. This document is then added to ”new-issues” folder ready to be implemented. This is full standalone document with everything needed for a junior developer to finish the feature, but nothing else,
    1. Most of the times I manually review and edit this file as the issue description can be initially vague. I go back and forth with AI before it is ready for the development.
2. I have set up a custom CC command that will be given an issue PRD and it is guided to a) ask coder agent to implement using only it, b) ask code evaluator and mentor agent to evaluate and give feedback for the implementation (tests must be done and passed) c) ask (again) coder agent to implement and improve critical and medium feedback suggestions d) ask documenter agent to read uncommitted changes and then update README.md and PRD.md e) ask the main coordinator agent to read results and summarise them, and justify why the implementation is completed successfully.
    1. P.s. in every command / agent I tell the AI that his actions will be externally evaluated and punished / rewarded based on how well the task is accomplished.
3. At this point I will typically read the updated [README.md](http://readme.md/) and randomly test the new features like a user would.
    1. I use lazygit (and neovim + tmux btw) to review code quickly to just get a feel
    2. Also I will run all tests myself as well. But I will not really evaluate the code. Just couple minutes of quick tests.
    3. P.s. I also ask all agents to add their own reports and conclusions to the same issue PRD, which I can read
4. I have a custom CC command to then create a branch and pull request from the code
    1. I have CC and CodeRabbit on Github to automatically evaluate the pull request and give their comments, especially on architectural integrity
    2. I typically expect some real improvement suggestions, unless a really simple bug fix
5. I have a custom CC command to pull all PR comments from AIs and evaluate if fixes needed, and fixing based on them
    1. This command commits and sends the new fixes back to the PR for re-evaluation
6. I will (99% of time) then merge the changes and delete the PR branch
    1. During this whole process the issue has been linked to the process and closed automatically

This sounds complicated, but really it is just couple phases from me and CC will work on its own 15 to 35 minutes typically. I could combine basically all phases and only create the original issue and let it automatically run from 1 to 6. I will probably do that when I start just starting the next phase without any manual checking.

With this process I have been able to make CC only do what was requested, write good quality tests, not get confused or create backup files. I am now pushing it one by one to make more complicated features with one issue PRD, but I dont want to get greedy. Eventually you as a product manager need to understand what you want, be very specific and understand that more freedom you give, the more uncertainty you must endure.

I hope this helps someone. I have gotten lot of good insights from this group and I know using LLMs seems the future, but can be so frustrating.