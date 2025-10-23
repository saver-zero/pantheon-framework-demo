# Travel Itinerary Team - A Custom Pantheon Framework Team 

## Overview
This is a demo project illustrating what it's like to use Pantheon Framework to create and use a non-development custom team.

This demo creates a simple trip planning team. The trip planning example was selected based on OpenAI's recent [demo of Agent Builder](https://www.youtube.com/watch?v=44eFf-tRiSg), which uses travel itinerary planning as a reference example.

## Caveat
Pantheon Framework's Glass Box Process allows for early interception of misalignment through auditable artifacts, resulting in earlier course correction. However, for the purpose of this demo, reviewing of the artifacts and early course correcting was deliberately not done. The goal of the demo is not to create the perfect team or output - but to show the auditable elements of created artifacts to highlight the early interception points. Due to this, the number of artifacts created and the implementation done is unoptimized for this demo, and may misrepresent the actual efficiency of the workflow.

## Team Description
This project uses a custom team built by `Pantheon Team Builder`. The [transcript](travel-idea.txt) from OpenAI's recent [demo of Agent Builder](https://www.youtube.com/watch?v=44eFf-tRiSg) was used to create the `Travel Itinerary` team.

Note that `Pantheon Team Builder` is not meant to be a one-shot team creator. It is meant to have human-in-the-loop to refine the final team creation. But for the purpose of this demo, a one-shot approach was taken to test the capability of `Pantheon Team Builder`, following the standard process outlined in the Team Blueprint comments, without further review or changes.

A high-level overview of the team creation is below, with the [full transcript](transcripts/pantheon-team-builder-trip-team.txt) available:
```
@travel-idea.txt is a transcript from a demo that sets up an agent for creating travel itinerary.
Let's build upon the idea. Let's create a team that does a bit more helpful things. Let's create a team that creates a
travel itinerary given a natural user input. We still want to keep it lightweight, so each itinerary should focus on one
destination or trip. what should this team focus on?

ok let's have @pantheon-team-builder create the team blue print for this - let's keep the team and artifact simple so
that it's easy to use for the average non-technical user

@artifact-designer, design the artifacts for TB02 and update the team blueprint. Do not build the artifacts yet,
focus on updating the team blueprint with the artifact design.

@agent-designer, design the agents for TB02 and update the team blueprint. Do not build the agents yet, focus on
updating the team blueprint with the agent design.

@team-readme-writer, create the team readme based on @[TB02]_travel-itinerary-planner_team-blueprint.md

@profile-designer, design the team profile for the blueprint TB02

@profile-designer create the team profile from @[TB02]_travel-itinerary-planner_team-blueprint.md

@agent-designer create the agents from @[TB02]_travel-itinerary-planner_team-blueprint.md

@artifact-designer, build the artifacts from @[TB02]_travel-itinerary-planner_team-blueprint.md

--- later added flight options ---

Let's add an artifact to the TB02 team blueprint. Have @artifact-designer design a flight-options artifact and add to
the blueprint. We want to get specific flight options given origin, destination, and date, that shows the price,
airport code, airline, flight number, departure/arrival time (no timezone/am/pm, in 24 hour format local time), and the
top 5 choices for each category - cheapest flight and shortest flight . And then have @agent-designer design an agent
for TB02 team blueprint as well, that'll search online to research the flight option and create the above mentioned
flight-options artifact

```

The created custom `Travel Itinerary` team:
* captures travel preference
* research destinations
* creates a trip plan
* finds flight options

## What to look for
Taking a look at the following will give a good picture of what it's like to use the `Pantheon Team Builder` to create a custom team and what it's like to use that custom `Travel Itinerary` team:

**Pantheon Team Builder**
* **[Travel itinerary idea](travel-idea.txt):** The transcript from OpenAI's recent [demo of Agent Builder](https://www.youtube.com/watch?v=44eFf-tRiSg) showing how to build a trip planning agent.

* **[Team building transcript](transcripts/pantheon-team-builder-trip-team.txt):** This is the transcript between the user and the ``Pantheon Team Builder` team to create the custom `Travel Itinerary` team.

* **[Travel itinerary team blueprint](pantheon-artifacts/pantheon-team-builds/travel-itinerary-planner/blueprints/[TB02]_travel-itinerary-planner_team-blueprint.md):** The Team Blueprint capturing the design of the Travel Itinerary team (the final team name ended up being travel-itinerary-planner team).

* **[Travel itinerary team README](pantheon-artifacts/pantheon-team-builds/travel-itinerary-planner/team-readme/[TR2]_travel-itinerary-planner_team-readme.md):** The team README created for the Travel itinerary team. This README was later used as a reference to create the trip itineraries with the Travel itinerary team.

* **[Travel itinerary team agents](pantheon-artifacts/pantheon-team-builds/travel-itinerary-planner/agents/):** Agents created for the Travel itinerary team. A total of 4 agents were created - [trip-understanding-assitant](pantheon-artifacts/pantheon-team-builds/travel-itinerary-planner/agents/[AD2]_trip-understanding-assistant.md), [destination-guide](pantheon-artifacts/pantheon-team-builds/travel-itinerary-planner/agents/[AD3]_destination-guide.md), [itinerary-designer](pantheon-artifacts/pantheon-team-builds/travel-itinerary-planner/agents/[AD4]_itinerary-designer.md), and [flight-finder](pantheon-artifacts/pantheon-team-builds/travel-itinerary-planner/agents/[AD7]_flight-finder.md).

* **[Travel itinerary team processes](pantheon-artifacts/pantheon-team-builds/travel-itinerary-planner/processes/):** Processes created for the Travel itinerary team.

**Travel Itinerary Team**
For all trip planning, Claude Sonnet was used for Tokyo and OpenCode qwen3-coder-480b-a35b-instruct was used for Las Vegas.

* **[Claude Sonnet transcript](transcripts/tokyo-trip-claude-sonnet.txt):** This is the transcript between the user and the `Travel itinerary` team to create a Tokyo trip plan. [Claude Code CLI](https://www.claude.com/product/claude-code) with Sonnet was used. This will give you the full picture of what it's like to work with the `Travel itinerary` team to create a trip plan. Ignore how much time was spent by each agent in the transcript, as not all permission prompts were immediately handled, and the agents may have been stuck waiting for user response.

* **[OpenCode QWEN transcript](transcripts/vegas-trip-opencode-qwen.txt):** This is the transcript between the user and the `Travel itinerary` team to create a Vegas trip plan. [Opencode CLI](https://github.com/sst/opencode) with [NVIDIA's qwen3-coder-480b-a35b-instruct](https://build.nvidia.com/explore/discover) was used. This will give you the full picture of what it's like to work with the `Travel itinerary` team to create a trip plan using a different provider. Ignore how much time was spent by each agent in the transcript, as not all permission prompts were immediately handled, and the agents may have been stuck waiting for user response.

* **[Travel preferences](pantheon-artifacts/travel-preferences/):** Tokyo and Las Vegas trip preferences captured by the `Travel itinerary` team.

* **[Destination research](pantheon-artifacts/destination-research/):** Tokyo and Las Vegas destination research created by the `Travel itinerary` team.

* **[Trip plans](pantheon-artifacts/trip-plan/):** Tokyo and Las Vegas trip plans created by the `Travel itinerary` team.

* **[Flight options](pantheon-artifacts/flight-options/):** Tokyo and Las Vegas flight options created by the `Travel itinerary` team. Note that these flights are non-existent. This is a limitation of the tooling available, as the agents didn't have access to the right tooling (i.e. MCP) that would have returned accurate flight options.

## Tokyo Trip Plans

Snippet of [Tokyo trip plan](pantheon-artifacts/trip-plan/[TP2]_Tokyo_1%20day_trip-plan.md) created by Claude Code Sonnet.

### Day 1: Traditional markets, tea ceremony, and historic Asakusa

#### 8:00 AM - 10:30 AM: Breakfast at Tsukiji Outer Market

Start your day exploring Tokyo's legendary food market, sampling fresh sushi, grilled seafood skewers, tamagoyaki (Japanese omelet), and seasonal specialties from multiple vendors. The market buzzes with energy as locals and visitors alike enjoy some of Tokyo's freshest seafood in a historic market atmosphere.

**Location**: Tsukiji Outer Market, Tsukiji

**Duration**: 2.5 hours

**Estimated Cost**: $15-20 per person

**Getting There**: Take Oedo Line to Tsukijishijo Station. 5-minute walk to market entrance.

**Tips**: Arrive early for the best selection and shorter lines. Most shops open 5:00 AM-2:00 PM. Try the grilled scallops and fresh tuna sashimi. Some vendors are closed on Sundays and Wednesdays, so verify if visiting on those days.

#### 10:30 AM - 11:00 AM: Travel to Asakusa

Take the subway from Tsukiji to Asakusa, traveling through central Tokyo. This 30-minute journey gives you a taste of Tokyo's efficient transit system.

**Location**: Transit from Tsukiji to Asakusa

**Duration**: 30 minutes

**Estimated Cost**: $2-3

**Getting There**: Take Oedo Line from Tsukijishijo to Daimon, transfer to Asakusa Line to Asakusa Station. Alternatively, take Hibiya Line from Tsukiji to Asakusa (direct, 15 minutes).

**Tips**: Use your IC card (Suica or Pasmo) for seamless transfers. Asakusa Station has multiple exits; use Exit 1 or 6 for Senso-ji Temple.

#### 11:00 AM - 1:00 PM: Explore Senso-ji Temple and Nakamise Street

Visit Tokyo's oldest and most significant Buddhist temple, walking through the iconic Thunder Gate (Kaminarimon) with its massive red lantern. Stroll down Nakamise shopping street lined with traditional snack vendors and souvenir shops before reaching the main temple hall. The temple grounds offer a peaceful atmosphere with incense wafting through the air and locals praying at the main hall.

**Location**: Senso-ji Temple, Asakusa

**Duration**: 2 hours

**Estimated Cost**: Free (temple admission)

**Tips**: The main hall is open 6:00 AM-5:00 PM. Take time to observe local customs: bow before entering, cleanse hands at the purification fountain, and consider drawing an omikuji (fortune slip) for 100 yen. Browse Nakamise Street for traditional crafts and snacks like ningyo-yaki (small cakes) and senbei (rice crackers).

## Las Vegas Trip Plans

Snippet of [Las Vegas trip plan](pantheon-artifacts/trip-plan/[TP3]_Las%20Vegas_3%20days_trip-plan.md) created by OpenCode qwen3-coder-480b-a35b-instruct.

### Day 2: Helicopter Tours & Japanese Cuisine

#### 7:00 AM - 8:00 AM: Breakfast at Hotel

Fuel up with breakfast at your hotel before an exciting day of aerial adventures.

**Location**: Hotel Property

**Duration**: 1 hour

#### 8:30 AM - 11:30 AM: Grand Canyon West Rim Helicopter Tour

Take an unforgettable helicopter flight providing aerial views of the Grand Canyon, Colorado River, and Hoover Dam. Includes landing at the canyon rim for photo opportunities.

**Location**: Departing from Las Vegas

**Duration**: 3 hours

**Estimated Cost**: $300-450 per person

**Getting There**: Hotel pickup typically included

**Tips**: Book in advance, especially for morning flights for clearest visibility. Weight restrictions apply.

#### 12:00 PM - 1:30 PM: Lunch at Mon Ami Gabi

Enjoy classic French bistro fare with an iconic view of the Bellagio fountains. Try their famous steak frites or moules frites in an outdoor setting.

**Location**: Bellagio, 3600 S Las Vegas Blvd, Las Vegas, NV 89109

**Duration**: 1.5 hours

**Estimated Cost**: $50-80 per person

**Getting There**: Walkable on the Strip

#### 2:30 PM - 4:00 PM: Fly LINQ Zipline Adventure

Soar 1,200 feet across The LINQ Promenade at speeds up to 35 mph, experiencing the Las Vegas Strip from a unique aerial perspective with multiple flight style options.

**Location**: The LINQ Promenade, 3545 S Las Vegas Blvd, Las Vegas, NV 89109

**Duration**: 1.5 hours

**Estimated Cost**: $60-80 per person

**Getting There**: Walkable on the Strip

**Tips**: Advanced reservations recommended. Weight restrictions apply.