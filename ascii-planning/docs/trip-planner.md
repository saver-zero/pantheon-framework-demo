# Travel Itinerary Generator - Product Requirements Document

## Product Vision
Create an intelligent travel itinerary generator that helps travelers plan personalized day-by-day schedules by understanding their destination, party composition, trip duration, and time of year.

## Problem Statement
Planning a multi-day trip requires significant research and time investment. Travelers need to:
- Research attractions and activities suitable for their group
- Structure activities across multiple days and times
- Find appropriate dining options
- Balance the itinerary based on group demographics (families, couples, solo travelers, etc.)

**Current solutions** require manual research across multiple websites, guidebooks, and forums, leading to decision fatigue and suboptimal itineraries.

## Target Users
- **Primary**: First-time visitors to a destination who want a structured itinerary
- **Secondary**: Travelers looking for inspiration and starting points for trip planning
- **Demographics**: All age groups, various party compositions (solo, couples, families, groups)

## User Stories

### Core User Journey
**As a traveler**, I want to generate a personalized itinerary by providing basic trip details, so that I can have a structured plan without spending hours researching.

**As a family traveler**, I want itineraries that consider my children's ages, so that activities are appropriate and enjoyable for everyone.

**As a seasonal traveler**, I want itineraries that account for the time of year I'm visiting, so that I can experience seasonal events, weather-appropriate activities, and avoid closed attractions.

**As a budget-conscious traveler**, I want dining recommendations included, so that I know where to eat during my activities.

**As a repeat user**, I want to see my previously generated itineraries, so that I can refer back to or modify past plans.

## Product Requirements

### Must Have (MVP)

#### 1. Itinerary Generation Form
**Input Fields:**
- **Destination** (text input)
  - Examples: "Tokyo", "Paris, France", "Disney World"
  - Accepts city, country, or specific attraction

- **Party Information** (text input)
  - Examples: "late 20s Gen Z couple", "family of four with 12-year-old boy and 10-year-old girl", "single millennial female"
  - Captures demographics and travel style in natural language

- **Month of Travel** (dropdown/select)
  - Options: January, February, March, April, May, June, July, August, September, October, November, December
  - Used to provide seasonal recommendations and weather-appropriate activities

- **Trip Duration** (number input)
  - Number of days (1-30)

**Action:**
- "Generate Itinerary" button

#### 2. Itinerary Display
**Day-by-Day Breakdown:**
- Each day shows up to 5 time periods (flexible based on party type):
  - Morning
  - Afternoon
  - Evening
  - Night
  - Late Night

**Activity Information (per time period):**
- **Attraction Name** - Where to go
- **Description** - What makes this attraction special
- **What to Do** - Specific activities (can be multiple items)
- **Where to Eat** - Dining recommendations

**Example Output:**
```
Day 1
Morning
  Senso-ji Temple
  Tokyo's oldest Buddhist temple, rich in history
  What to do:
    - Explore the temple grounds
    - Visit Nakamise shopping street
  Where to eat: Try street food at Nakamise

Afternoon
  ...
```

#### 3. History Feature
- View previously generated itineraries
- Stored locally (last 10 itineraries)
- Quick access to regenerate or reference past plans

### Should Have (Future Phases)

#### Phase 2
- Budget level preferences (budget, moderate, luxury)
- Interest categories (culture, food, nightlife, nature, adventure)
- Pace preferences (relaxed, moderate, packed)
- Print/PDF export
- Share itinerary via link

#### Phase 3
- Map integration showing attraction locations
- Estimated costs per activity
- Transportation suggestions between locations
- Alternative options for each time slot
- User accounts and cloud-saved itineraries

### Nice to Have
- Weather considerations
- Seasonal recommendations
- Accessibility options
- Multi-city trips
- Collaborative planning with other travelers

## User Experience Requirements

### Simplicity
- Single-page application
- Maximum 3 clicks to generate an itinerary
- No registration required for basic use
- Clear, scannable itinerary format

### Speed
- Itinerary generation within 10-30 seconds
- Instant history retrieval
- Responsive UI during generation (loading states)

### Clarity
- Plain language descriptions
- Logical time-of-day groupings
- Clear distinction between different days
- Easy-to-read typography

## Success Metrics
- **Engagement**: 70% of users who generate one itinerary generate a second
- **Completion**: 80% of form submissions successfully generate itineraries
- **Quality**: User-reported satisfaction with generated itineraries (future survey)
- **Speed**: Average generation time under 30 seconds

## Scope and Boundaries

### In Scope (MVP)
- Basic four-input form (destination, party info, month of travel, days)
- AI-generated personalized itineraries
- Seasonal and weather-appropriate recommendations
- Day-by-day time-period structure
- Attraction recommendations with descriptions
- Dining recommendations
- Local history (last 10 itineraries)
- Simple, clean web interface

### Out of Scope (MVP)
- User authentication/accounts
- Booking integrations
- Real-time pricing
- User reviews or ratings
- Social sharing features
- Mobile app
- Multi-language support
- Customization/editing of generated itineraries

## Technical Approach (High-Level)

### Architecture Overview
This is a **frontend-only application** for the POC phase. The frontend contains an API abstraction layer that allows seamless switching between different backend implementations.

**Frontend**: React-based web application
- Responsive design
- Local storage for history
- Contains API abstraction layer with pluggable implementations

**API Abstraction Layer** (lives in frontend code):
- **CLIApiClient** (POC implementation):
  - Calls `claude -p "..."` CLI command directly from the frontend
  - No separate backend service required
  - Processes user inputs and generates structured JSON response
  - Used for proof of concept and local development

- **HTTPApiClient** (Future production implementation):
  - Calls REST API endpoints on a real backend server
  - Enables deployment as a web service
  - Same interface as CLIApiClient - no frontend code changes needed

**Benefits of this approach:**
- Frontend code is decoupled from backend implementation details
- Switch between CLI and HTTP mode with a single configuration flag
- Smooth migration path from POC to production
- Easy to test both implementations independently

### Data Model
Each itinerary contains:
- Destination
- Party information
- Month of travel
- Number of days
- Day-by-day breakdown with time periods
- Activities with attractions, descriptions, things to do, and dining

Time periods are optional/flexible based on the party type and appropriateness.

### MVP Development Phases

**Phase 1: Core Functionality** (Week 1-2)
- Build input form
- Implement CLI backend stub
- Create itinerary display component
- Basic styling

**Phase 2: Polish & History** (Week 3)
- Implement local storage history
- Improve UI/UX design
- Loading states and error handling
- Responsive design

**Phase 3: Testing & Refinement** (Week 4)
- User testing
- Prompt optimization for better itineraries
- Bug fixes
- Performance optimization

## Open Questions
1. Should we limit the number of activities per time period?
2. How do we handle destinations we have limited data for?
3. Should users be able to regenerate itineraries with the same inputs?
4. Do we need any content moderation for user inputs?
5. What's our fallback if AI generation fails or times out?

## Appendix: Technical Implementation Details

### API Interface Design
```
IItineraryService {
  generateItinerary(destination, partyInfo, month, days): Promise<ItineraryResponse>
  getHistory(): Array<ItineraryResponse>
  saveToHistory(itinerary): void
}
```

### Implementations
1. **CLIApiClient**: POC implementation using `claude -p` command
2. **HTTPApiClient**: Future production implementation with real backend

### Configuration
- Single flag to switch between CLI and HTTP modes
- Enables testing and smooth migration path

### JSON Response Structure
```json
{
  "destination": "Tokyo, Japan",
  "party_info": "Late 20s Gen Z couple",
  "month": "March",
  "days": 5,
  "itinerary": [
    {
      "day": 1,
      "morning": [
        {
          "attraction": "Senso-ji Temple",
          "attraction_description": "Tokyo's oldest Buddhist temple",
          "what_to_do": ["Explore temple grounds", "Visit Nakamise shopping street"],
          "where_to_eat": "Try street food at Nakamise"
        }
      ],
      "afternoon": [...],
      "evening": [...],
      "night": null,
      "late_night": null
    }
  ]
}
```

### Prompt Template (Hardcoded for POC)
```
Create a {days}-day travel itinerary for {destination} for {party_info} visiting in {month}.

Return ONLY valid JSON with the specified structure below.
Include time periods (morning/afternoon/evening/night/late_night) only when relevant.
Each time period should include attractions, descriptions, what to do, and where to eat.
Make the itinerary appropriate for the party demographic and the time of year.
Consider seasonal events, weather conditions, and appropriate activities for {month}.

JSON Schema:
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["destination", "party_info", "month", "days", "itinerary"],
  "properties": {
    "destination": {
      "type": "string"
    },
    "party_info": {
      "type": "string"
    },
    "month": {
      "type": "string"
    },
    "days": {
      "type": "number"
    },
    "itinerary": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["day", "morning", "afternoon", "evening"],
        "properties": {
          "day": {
            "type": "number"
          },
          "morning": { "$ref": "#/$defs/timePeriod" },
          "afternoon": { "$ref": "#/$defs/timePeriod" },
          "evening": { "$ref": "#/$defs/timePeriod" },
          "night": { "$ref": "#/$defs/timePeriod" },
          "late_night": { "$ref": "#/$defs/timePeriod" }
        }
      }
    }
  },
  "$defs": {
    "timePeriod": {
      "type": ["array", "null"],
      "items": {
        "type": "object",
        "required": ["attraction", "attraction_description", "what_to_do", "where_to_eat"],
        "properties": {
          "attraction": {
            "type": "string"
          },
          "attraction_description": {
            "type": "string"
          },
          "what_to_do": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "minItems": 1
          },
          "where_to_eat": {
            "type": "string"
          }
        }
      }
    }
  }
}
```
