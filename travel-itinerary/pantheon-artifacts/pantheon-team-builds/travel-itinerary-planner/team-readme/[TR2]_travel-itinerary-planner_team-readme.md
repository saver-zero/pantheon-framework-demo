---
created_at: 2025-10-13 HH:MM PM PDT
---
<!-- SECTION:START:OVERVIEW -->
# travel-itinerary-planner Team

## Mission

Transform your travel dreams into practical, day-by-day itineraries through simple conversation. We take your natural language travel requests and create complete trip plans with timing, activities, logistics, and budget guidance you can immediately act on.

## Value Proposition

Planning a trip can be overwhelming - researching destinations, comparing options, scheduling activities, and estimating costs takes hours or days. We eliminate that burden by automating the entire planning process. You describe your travel vision in plain language, and we deliver a complete, actionable itinerary with realistic timing, logistics, and budget breakdowns, saving you countless hours of research while ensuring nothing gets overlooked.

## Key Capabilities

- **Preference Understanding**: Convert your conversational travel descriptions into structured trip requirements that guide every planning decision.
- **Destination Research**: Consolidate information about attractions, restaurants, activities, and local logistics into a comprehensive reference for your destination.
- **Schedule Design**: Create hour-by-hour daily schedules with realistic timing, accounting for opening hours, travel between locations, and activity duration.
- **Logistics Planning**: Provide practical guidance on transportation options, accommodation locations, and getting around your destination efficiently.
- **Budget Estimation**: Calculate itemized cost breakdowns covering activities, meals, and transportation so you understand your total trip investment upfront.

## When to Use This Team

Use this team when you have a clear destination in mind and want a complete trip plan without spending hours researching and organizing. Perfect for single-destination trips where you want to explore one city or area in depth - think a week in Tokyo, five days in Barcelona, or a long weekend in Portland. This team works best when you can describe your travel style and interests conversationally: 'I want a food-focused trip to Bangkok for 5 days with a moderate budget' or 'Plan a relaxing beach vacation in Bali emphasizing wellness and nature.' You'll receive a detailed day-by-day itinerary with all the practical details needed to book and execute your trip. Note that this team focuses on single destinations; multi-city tours require separate planning cycles for each location.<!-- SECTION:END:OVERVIEW -->

<!-- SECTION:START:GETTING_STARTED -->
## Getting Started

Getting your first itinerary is straightforward. We'll walk through the three main steps together, and you'll have a complete trip plan ready for booking within a single planning session.

### Prerequisites

- A clear destination in mind (single city or region)
- Approximate trip dates or duration
- General sense of your interests and travel style
- Budget range or spending comfort level

### Your First Interaction

**Step 1: Share your travel vision**

Start a conversation with the trip-understanding-assistant and describe your trip the way you'd explain it to a friend. Include your destination, how long you want to stay, what interests you, and your budget comfort level.

Example:

```

I want to visit Tokyo for 5 days in March. I love food and culture, prefer a moderate pace, and have a mid-range budget of around $150-200 per day for activities and meals.

```

💡 **Tip**: Don't worry about being formal or complete - the assistant will ask clarifying questions if needed.

**Step 2: Confirm your preferences**

Review the preferences summary the assistant creates. Check that it accurately captured your destination, dates, interests, and budget. Request any corrections before proceeding to the research phase.

💡 **Tip**: This is your last chance to easily change core trip parameters, so take a moment to verify everything looks right.

**Step 3: Provide destination information**

Work with the destination-guide to gather current information about your destination. You can share results from your own web searches, or the guide can help organize information you've collected. The goal is to build a comprehensive reference of attractions, restaurants, and logistics.

Example:

```

I found these top-rated restaurants in Tokyo: [list]. Can you organize them by neighborhood and cuisine type?

```

💡 **Tip**: Focus on gathering information for the types of activities and experiences that match your interests.

**Step 4: Request your itinerary**

Once preferences and research are ready, ask the itinerary-designer to create your complete trip plan. Review the daily schedules, timing, and budget. Request any adjustments to pacing, activity selection, or schedule flow until it feels perfect for you.

Example:

```

Please create my 5-day Tokyo itinerary. Day 2 looks too packed - can you spread those activities across two days?

```

💡 **Tip**: Trust your instincts about pacing and timing - you know your travel style best.

### What Happens Next

After receiving your initial itinerary, take time to review each day's schedule and imagine actually following it. Does the pacing feel comfortable? Are the activities aligned with your interests? Request revisions until it feels right. Once satisfied, use the itinerary to begin booking accommodations in the recommended neighborhoods, reserving any activities that require advance booking, and arranging transportation. As you book, verify current operating hours and prices for key activities. You can return to the itinerary-designer anytime to update schedules based on actual booking confirmations or new information. Consider creating separate planning sessions for each destination if you're visiting multiple cities - this keeps each location's itinerary clear and focused.

### Common Questions

**Q: What if I'm not sure about my exact dates yet?**

A: That's fine - provide approximate dates or just the trip duration. We'll create a flexible itinerary you can adjust once dates firm up. Focus on getting the activity selection and pacing right first.

**Q: Can I change the itinerary after it's created?**

A: Absolutely. Ask the itinerary-designer to update specific days, swap activities, adjust timing, or revise any aspect of the plan. We expect iteration as you think through the details.

**Q: How accurate are the budget estimates?**

A: The estimates provide general guidance based on typical pricing, but actual costs vary. Use them to understand relative expenses and total magnitude, then verify specific prices before booking.

**Q: Do I need to gather destination information myself?**

A: For the most current and reliable information, yes. Operating hours, prices, and availability change frequently, and we want your research brief to reflect real-time conditions. The destination-guide helps organize what you find.

**Q: What if I want to visit multiple cities?**

A: We focus on single destinations to keep itineraries clear and actionable. For multi-city trips, work through the planning process separately for each city. This gives you focused, detailed plans for each location.

**Q: Is Pantheon a task management system?**

A: No, Pantheon doesn't position itself as a task management system, nor dictate a specific task management system. You can integrate any task management system of your choice simply by creating tasks based on the created artifacts.<!-- SECTION:END:GETTING_STARTED -->

<!-- SECTION:START:WORKING_WITH_AGENTS -->
## Working with travel-itinerary-planner Agents

The travel-itinerary-planner team operates through natural conversation with agents, not technical commands. Each agent is an expert in their domain who understands your goals and translates them into concrete artifacts: Travel Preferences Summary, Destination Research Brief, Trip Plan.

You communicate directly with agents using plain language about what you want to accomplish. Working through the agents eliminates the cognitive overhead of remembering complex procedures and technical syntax.

Agents maintain consistent behavior through structured processes provided by the Pantheon framework, ensuring reliable results every time. This systematic approach creates clear accountability and traceability, so it’s always obvious what was done and why.

With every action documented in structured artifacts and audit trails, you gain full transparency, while staying focused on high-level direction and decision-making.

### Your Role

Your role is to provide vision, preferences, and feedback while we handle the detailed planning work. Start by describing your travel goals conversationally - where you want to go, how long you'll stay, what interests you, and your budget comfort level. Review the preferences summary we create to ensure we captured your vision correctly. When we prepare destination research, you may need to verify current information like operating hours or prices using web search, as these details change frequently. Review the final itinerary to confirm it matches your expectations, and request any adjustments you'd like. Finally, you'll handle the actual bookings for flights, accommodations, and activities based on the plan we've created. We prepare everything for you, but you maintain control over all final decisions and external arrangements.

Once you have the artifacts, direct the primary LLM agent outside of Pantheon (i.e. Claude Code, GPT Codex, Gemini) to execute based on the artifact (i.e. implement code based on plan, write blog post based on outline). This allows for a flexible collaboration between the main LLM agent based on the artifacts created: Travel Preferences Summary, Destination Research Brief, Trip Plan .

### Communication Best Practices

- **Be conversational and specific**: Describe your trip the way you'd tell a friend - 'I want to explore Tokyo's food scene for 5 days' works better than formal requests.
- **Share your constraints upfront**: Mention budget limits, mobility needs, dietary restrictions, or pacing preferences early so we can tailor the plan to your reality.
- **Review before we proceed**: Check the preferences summary before we move to research, and review research before the final itinerary - catching issues early saves revision time.
- **Ask for what you need**: If something in the itinerary doesn't feel right, tell us specifically what to change - we're here to refine until it's perfect for you.
- **Verify time-sensitive details**: Double-check operating hours, prices, and availability for key activities before booking, as this information changes frequently.
<!-- SECTION:END:WORKING_WITH_AGENTS -->

<!-- SECTION:START:AGENTS -->
## Available Agents

Our team consists of three specialized assistants, each focused on a specific phase of trip planning. You'll interact with them sequentially as your trip plan takes shape.

### trip-understanding-assistant

**Expertise**: Interprets your natural language travel requests and captures your destination, dates, interests, and budget in a structured format.

**When to Engage**: Start here when you're ready to begin planning a new trip. Engage this assistant whenever you need to describe your travel vision or update your preferences after reviewing the initial summary.

**How to Interact**:

Simply describe your trip the way you'd explain it to a friend: 'I want to visit Paris for a week in June, focusing on art and food, with a moderate budget.' The assistant will ask clarifying questions if needed and organize your preferences into a clear summary for you to review before moving forward.

**What trip-understanding-assistant Delivers**:
- Travel preferences summary with destination, dates, interests, and budget
- Structured trip requirements for research and planning
- Clarifying questions for any missing details

### destination-guide

**Expertise**: Consolidates destination information about attractions, dining, activities, and local logistics into a comprehensive research brief.

**When to Engage**: After your preferences are confirmed, work with this assistant to gather and organize destination-specific information. Return here if you discover new attractions or need to update research details.

**How to Interact**:

Share what you've found through web searches about your destination, or ask the guide to help organize information you've gathered. For example: 'I found these restaurant recommendations - can you organize them by neighborhood and meal type?' The guide will structure everything into an easy-to-reference brief.

**What destination-guide Delivers**:
- Destination research brief with attractions, dining, and activities
- Organized information by category and location
- Verification checklists for time-sensitive details

### itinerary-designer

**Expertise**: Designs complete day-by-day trip plans with hour-by-hour schedules, realistic timing, logistics guidance, and budget breakdowns.

**When to Engage**: Once your preferences and destination research are ready, engage this designer to create your complete itinerary. Return here to request schedule changes, timing adjustments, or activity swaps based on your review.

**How to Interact**:

Ask for your complete itinerary: 'Please create my trip plan based on the preferences and research.' After reviewing, request specific changes conversationally: 'Move the museum visit to day 3 instead of day 2' or 'This day feels too packed - can you slow down the afternoon?' The designer will adjust while maintaining realistic timing.

**What itinerary-designer Delivers**:
- Complete day-by-day itinerary with hourly schedules
- Transportation and logistics guidance
- Itemized budget breakdown by activity and day
- Revised schedules based on your feedback

<!-- SECTION:END:AGENTS -->

<!-- SECTION:START:ARTIFACTS -->
## Understanding Team Artifacts

As we work on your trip plan, we create structured documents that capture your preferences, research findings, and final itinerary. Each document builds on the previous one, ensuring nothing gets lost and you can review progress at every stage. These documents serve as both our internal working materials and your final deliverables - they're designed to be clear, actionable, and easy to reference throughout your planning and during your actual trip.

### Artifact Types

#### Travel Preferences Summary

**Purpose**: Captures your destination, trip dates, interests, budget, and travel style in a structured format that guides all planning decisions.

**Format**: JSON document with sections for destination, trip details, interests, and budget parameters.

**How to Use**:

Review this summary after the trip-understanding-assistant creates it to confirm we captured your vision correctly. This document ensures all subsequent planning aligns with your actual preferences. If something's missing or incorrect, ask for updates before we proceed to research. Keep this handy as a reference if you need to remember what constraints you originally set.

#### Destination Research Brief

**Purpose**: Organizes information about your destination's attractions, restaurants, activities, and logistics into a single comprehensive reference.

**Format**: JSON document with sections for attractions, dining options, activities, and local transportation details.

**How to Use**:

Use this as your destination knowledge base when reviewing the itinerary and making booking decisions. The brief includes operating hours, access information, and practical details you'll need. Since this information can change, verify critical details like attraction hours and restaurant availability before making reservations. Think of this as your destination research compiled and organized for easy reference.

#### Trip Plan

**Purpose**: Provides your complete day-by-day itinerary with hourly schedules, activity descriptions, timing, logistics, and budget breakdown.

**Format**: JSON document with sections for overview, daily schedules, logistics guide, budget breakdown, and notes.

**How to Use**:

This is your primary deliverable - the complete trip plan you'll follow and use for bookings. Review each day's schedule to ensure timing feels comfortable and activities align with your interests. Use the budget breakdown to understand total costs before committing. The logistics guide helps you navigate transportation and accommodation decisions. Share relevant portions with travel companions, and keep the full plan accessible on your phone during the trip for quick reference.

### Integrating Artifacts into Your Workflow

The trip plan artifact is designed to be immediately actionable without additional processing. You can use it directly for booking flights, accommodations, and activities by following the daily schedules and recommendations. If you're working with an AI assistant like Claude Code to handle bookings or create additional travel resources, you can share the trip plan artifact with them as complete context. For example, you might say 'Using this trip plan, help me draft emails to these hotels' or 'Create a packing list based on the activities in this itinerary.' The structured format makes it easy for other tools to understand your complete trip context. You can also export sections for specific purposes - print just the daily schedules for offline access during your trip, or share the budget breakdown with travel companions to coordinate expenses. The artifacts are meant to be flexible references you can use in whatever workflow makes sense for your actual trip execution.

### Tips for Artifact Consumption

- **Review progressively**: Check each artifact as it's created rather than waiting until the end. Catching issues in preferences or research is easier than revising a complete itinerary.
- **Verify before booking**: Confirm current operating hours, prices, and availability for key activities before making reservations, as this information changes frequently and our research may not reflect real-time updates.
- **Keep accessible during travel**: Save the trip plan on your phone or print key sections for offline access. The daily schedules and logistics guide are most useful when you're actually navigating your destination.
- **Share selectively with companions**: Extract relevant sections for travel companions rather than sharing everything - they might only need daily schedules and meeting points, not the full research brief.
<!-- SECTION:END:ARTIFACTS -->

<!-- SECTION:START:WORKFLOW_EXAMPLES -->
## Workflow Examples

These examples show complete planning sessions from initial request to final itinerary. Each demonstrates the natural conversation flow and what to expect at each stage.

### Example 1: Weekend Food Tour in Portland

**Scenario**: You want a quick weekend getaway focused on Portland's famous food scene. You have two full days and want to hit the best restaurants, food trucks, and markets without feeling rushed. Budget is flexible but not unlimited.

**Step-by-Step Process**:

1. **Describe your trip vision**
   - Start a conversation with trip-understanding-assistant and explain what you're looking for.
   - Sample prompt: "I want to spend a weekend in Portland, Oregon focused entirely on food. Two full days, arriving Friday night. I want to experience the famous food truck scene, try some top restaurants, and maybe visit a farmers market. Mid-range budget is fine."
   - Expected outcome: The assistant creates a preferences summary capturing your destination, 2-day duration, food-focused interests, and moderate budget. You review and confirm it looks accurate.

2. **Gather restaurant and food spot information**
   - Work with destination-guide to compile information about Portland's food scene, organizing food trucks, restaurants, and markets by location and meal type.
   - Sample prompt: "I found these highly-rated food trucks and restaurants: [list]. Can you organize them by neighborhood and tell me which ones are close together?"
   - Expected outcome: The guide creates a research brief with food spots organized by area, noting which clusters work well together for efficient food touring.

3. **Request your food tour itinerary**
   - Ask itinerary-designer to create a two-day schedule hitting the best spots with realistic timing and walking distances between meals.
   - Sample prompt: "Please create my 2-day Portland food itinerary, making sure we have enough time between meals to actually be hungry for the next one."
   - Expected outcome: You receive a day-by-day plan with breakfast, lunch, and dinner spots scheduled with appropriate gaps, food truck clusters for grazing, and a Saturday market visit built in. Budget breakdown shows expected costs per meal.

4. **Refine the pacing**
   - After reviewing, you notice Saturday feels packed. Request adjustments to create a more relaxed schedule.
   - Sample prompt: "Saturday has too many stops - I won't be able to eat that much. Can you cut it down to one food truck cluster and just dinner?"
   - Expected outcome: The designer revises Saturday with fewer but better-spaced eating experiences, maintaining quality while improving pacing.

**Final Result**: You have a complete 2-day Portland food tour itinerary with breakfast, lunch, and dinner recommendations, food truck clusters for grazing, market timing, and a budget showing roughly $250-300 for all meals and activities. You can book your accommodations near the spots you want to hit and reserve tables at restaurants requiring advance booking.

### Example 2: Week-Long Cultural Exploration in Kyoto

**Scenario**: Planning a 7-day trip to Kyoto focused on temples, gardens, traditional culture, and authentic local experiences. You want a balanced pace with time to absorb each location rather than rushing between attractions. Moderate budget with some flexibility for special experiences.

**Step-by-Step Process**:

1. **Share your cultural travel goals**
   - Explain to trip-understanding-assistant that you want an immersive cultural experience with emphasis on temples, gardens, tea culture, and traditional neighborhoods.
   - Sample prompt: "I want to spend a week in Kyoto experiencing traditional Japanese culture. I'm interested in temples, zen gardens, tea ceremonies, and exploring traditional neighborhoods like Gion. I prefer a relaxed pace with 2-3 major activities per day. Budget around $150-200 daily for activities and meals."
   - Expected outcome: The assistant creates a preferences summary emphasizing cultural immersion, moderate pacing, traditional experiences, and your daily budget range. You confirm this matches your vision.

2. **Compile Kyoto temple and cultural site information**
   - Work with destination-guide to research major temples, gardens, cultural experiences, and traditional restaurants that align with your interests.
   - Sample prompt: "I've researched these temples and cultural sites: [list with notes on what makes each special]. Also found these traditional restaurants and tea houses. Can you organize by area so I can plan days by neighborhood?"
   - Expected outcome: The guide creates a research brief organizing temples and sites by district, noting which ones are close together. Includes operating hours, admission prices, and special considerations like photography restrictions or dress codes.

3. **Request your week-long cultural itinerary**
   - Ask itinerary-designer to create a 7-day plan with 2-3 major cultural activities per day, organized by area to minimize transportation time.
   - Sample prompt: "Please create my 7-day Kyoto itinerary focusing on temples and cultural experiences. Keep it to 2-3 major activities per day so I have time to really experience each place. Group by neighborhood to reduce travel."
   - Expected outcome: You receive a complete 7-day plan with each day focused on a specific district, including major temples, gardens, traditional lunch spots, and cultural experiences. Budget breakdown shows daily costs totaling around $175 per day including admissions, meals, and local transport.

4. **Adjust for tea ceremony experience**
   - After reviewing, you want to add a formal tea ceremony experience but aren't sure which day works best.
   - Sample prompt: "I want to add a traditional tea ceremony experience. Which day has the most flexibility for adding this?"
   - Expected outcome: The designer suggests day 4, which currently has lighter scheduling, and adds a recommended tea house experience with timing that flows well with the existing temple visits.

5. **Verify current temple hours**
   - Before finalizing bookings, you check current operating hours for key temples and find one closes earlier than the itinerary shows.
   - Sample prompt: "I verified the temple hours and Kinkaku-ji closes at 4:30pm now, not 5pm. Can you adjust day 2 to visit it earlier?"
   - Expected outcome: The designer updates day 2, moving Kinkaku-ji to early afternoon and reshuffling other activities to maintain logical flow.

**Final Result**: You have a complete 7-day Kyoto cultural itinerary with daily themes by district, 2-3 major activities per day, traditional dining recommendations, a tea ceremony experience, and verified operating hours. Budget breakdown totals around $1,200 for the week's activities and meals. You can book accommodations in central Kyoto with easy access to all districts and make advance reservations for the tea ceremony and any restaurants that require it.

### Example 3: Five-Day Family Adventure in San Diego

**Scenario**: Planning a family vacation to San Diego with kids ages 8 and 11. You want a mix of beach time, family attractions, and outdoor activities that work for different energy levels. Need to balance activities everyone enjoys while keeping costs reasonable.

**Step-by-Step Process**:

1. **Describe your family travel needs**
   - Explain to trip-understanding-assistant the ages of your kids, interest in both beach and attractions, need for pacing flexibility, and budget consciousness.
   - Sample prompt: "Planning 5 days in San Diego with kids ages 8 and 11. We want beach time, maybe the zoo, some outdoor activities, and kid-friendly restaurants. Need a mix of active and relaxed days since kids have different energy levels. Trying to keep costs reasonable - maybe $400-500 per day for our family of four including activities and meals."
   - Expected outcome: The assistant creates a preferences summary capturing your family size and ages, desired activity mix, pacing flexibility needs, and daily budget target. You review and add that one child needs gluten-free meal options.

2. **Research family-friendly San Diego activities**
   - Work with destination-guide to compile kid-appropriate beaches, attractions, outdoor activities, and family restaurants including gluten-free options.
   - Sample prompt: "Found these beaches and attractions: [list]. Also these family restaurants with gluten-free options. Can you note which beaches have calmer water for younger swimmers?"
   - Expected outcome: The guide organizes beaches, attractions, and dining by area, noting which beaches are better for kids, which attractions are age-appropriate, and which restaurants have verified gluten-free options.

3. **Request your family-friendly itinerary**
   - Ask itinerary-designer to create a 5-day plan alternating higher-energy attractions with relaxed beach days, with family meal options built in.
   - Sample prompt: "Please create our 5-day San Diego family itinerary. Alternate active days and beach days so the kids don't get exhausted. Include the zoo and some water activities. Make sure restaurants have gluten-free options."
   - Expected outcome: You receive a 5-day plan with day 1 and 3 and 5 focused on attractions and activities, days 2 and 4 as beach and relaxation days. Budget breakdown shows estimated costs for family of four running about $450 per day including zoo admission, meals, and activities.

4. **Adjust zoo visit timing**
   - After checking, you realize the zoo day coincides with extreme heat forecast. Request moving it to a different day.
   - Sample prompt: "Just saw the weather - day 1 is going to be 95 degrees. Can we swap the zoo to a cooler day?"
   - Expected outcome: The designer swaps day 1 and day 2, moving the zoo visit to a milder weather day and putting the beach day during the heat.

**Final Result**: You have a complete 5-day San Diego family itinerary with alternating activity and beach days, age-appropriate attractions, family-friendly restaurants with gluten-free options, and realistic timing that accounts for family logistics. Budget shows total trip cost around $2,250 for family of four. You can book family-friendly accommodations near the beach and pre-purchase zoo tickets at a discount.

<!-- SECTION:END:WORKFLOW_EXAMPLES -->
