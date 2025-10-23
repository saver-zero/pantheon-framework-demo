# Receipt Analysis Team - A Custom Pantheon Framework Team 

## Overview
This is a demo project illustrating what it's like to use Pantheon Framework to create and use a non-development custom team.

This demo creates a `Receipt Analysis` team. The team will take a look at the set of receipts given and do an analysis.

## Team Description
This project uses a custom team built by `Pantheon Team Builder`. The project is started with just a vague idea of having a receipt analyzer team, showing how to go from a rough idea -> team creation -> usage of the team, with some minor modifications in between.


A high-level overview of the team creation is below, with the [full transcript](transcripts/pantheon-team-builder-receipt-analyzer.txt) available:
```
> I am thinking of creating a receipt-analyzer team. I'll give it a set of receipt         
images and ask it to analyze it - grocery receipts, amazon receipts, things of that        
nature where you don't really get visibility into your spending just from a credit card    
 statement. What kind of analysis would be useful and helpful?
 
 <...>

 > that's a bit too much. The category breakdown seems useful though. what about a 
markdown overview report of the receipts analyzed - just something easy to read to get     
a high level feel for what's going on, not too long or technical. and maybe include a      
couple tips or suggestions on ways to save? let's keep it simple and approachable 

> yes let's design the team 

● I'll invoke the Pantheon team builder specialist to help design this receipt analyzer    
   team.

● pantheon-team-builder(Design receipt analyzer team)

<...>

The receipt-analysis team (TB01) is now fully implemented and ready to use!
You can now start using the team to analyze receipt images and generate spending
insights reports. Would you like to test it out with some sample receipts?
```


The modifications made were:
* the original report was limited to 50 lines to keep it simple, but ended up being too simple. this was manually edited to 200 lines.
* grocery categorization was too generic so `Pantheon Team Builder` was asked to make updates

```
 > @agent-artifact-designer let's update the guidance and description for 
@pantheon-teams\receipt-analysis\processes\update-spending-insights-report\artifact\sec    
tions\category_breakdown.schema.jsonnet . The category should be more granular for -       
groceries is too generic, i'd like to know a bit more - was it meat? vegetable? dairy?     
what TYPE of grocery was it? i don't want it TOO detailed (i.e. organic chicken 
drumsticks) but i need to know what type it is.  @agent-agent-designer also update         
@pantheon-teams\receipt-analysis\agents\[AD1]_receipt-helper.md so that it doesn't do      
generic category. both agents should make direct updates to the files 

● I'll invoke both specialist agents to update the files for more granular grocery
  categorization.
● artifact-designer(Update category breakdown schema)
  ⎿  Done (3 tool uses · 19.6k tokens · 54.1s)
● agent-designer(Update receipt-helper agent)
  ⎿  Done (5 tool uses · 23.0k tokens · 1m 28s)
● Perfect! Both agents have successfully updated the files.
```

The created custom `Receipt Analysis` team:
* analyzes receipts given - images (if LLM supports it), CSV, etc...
* generates a consistent `spending-insight-report`
* as the above example shows, the team can be updated via direct file edits or by requesting agents to make updates with a natural language description

## What to look for
Taking a look at the following will give a good picture of what it's like to use the `Pantheon Team Builder` to create a custom team and what it's like to use that custom `Receipt Analysis` team:

**Pantheon Team Builder**
* **[Team building transcript](transcripts/pantheon-team-builder-receipt-analyzer.txt):** This is the transcript between the user and the ``Pantheon Team Builder` team to create the custom `Receipt Analysis` team, starting with a vague idea. It also shows how updates were made to the team at the end.

* **[Receipt analysis team blueprint](pantheon-artifacts/pantheon-team-builds/receipt-analysis/blueprints/[TB01]_receipt-analysis_team-blueprint.md):** The Team Blueprint capturing the design of the `Receipt Analysis` team.

* **[Receipt analysis team README](pantheon-artifacts/pantheon-team-builds/receipt-analysis/team-readme/[TR1]_receipt-analysis-team_team-readme.md):** The team README created for the `Receipt Analysis` team.

* **[Receipt helper agent](pantheon-artifacts/pantheon-team-builds/receipt-analysis/agents/[AD1]_receipt-helper.md):** Agent created for the `Receipt Analysis` team.

* **[Receipt analysis team processes](pantheon-artifacts/pantheon-team-builds/receipt-analysis/processes/):** Processes created for the `Receipt Analysis` team.

**Receipt Analysis Team**

* **[Receipt helper transcript](transcripts/receipt-helper-transcript.txt):** This is the transcript between the user and the `Receipt Helper` agent to analyze receipts.

* **[Grocery spending insights](pantheon-artifacts/spending-insights-report/[SIR2]_spending-insights_Sep%2027%20-%20Oct%201,%202025.md):** Grocery spending insights from 3 receipts. Some content redacted for privacy.

* **[Amazon spending insights](pantheon-artifacts/spending-insights-report/[SIR3]_spending-insights_Jan%2001%20-%20Oct%2021,%202025.md):** Amazon spending insights from Amazon orders CSV file. You can request your order data from Amazon via https://www.amazon.com/hz/privacy-central/data-requests/preview.html. Non-relevant columns were deleted to save on tokens. Some content redacted for privacy.


## Spending Insights

```
You spent $xxx.xx on A-Brand light bulbs across 14 separate orders. Buying LED bulbs in bulk once or twice a year instead could save on shipping costs and reduce the average price per bulb.
```
... or maybe switch to a more durable brand...
