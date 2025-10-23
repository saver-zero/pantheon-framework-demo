{
  "type": "object",
  "required": [
    "trip_title",
    "destination",
    "duration",
    "travel_dates",
    "travel_style",
    "daily_themes"
  ],
  "properties": {
    "daily_themes": {
      "authoring_guidance": "Create one theme entry for each day of the trip.",
      "description_for_schema": "Array of daily themes summarizing the focus of each day",
      "items": {
        "properties": {
          "day_number": {
            "authoring_guidance": "Number sequentially from 1.",
            "description_for_schema": "The day number (1, 2, 3, etc.)",
            "purpose": "Identifies which day this theme applies to.",
            "type": "integer"
          },
          "theme": {
            "authoring_guidance": "Keep to 1-2 phrases capturing the day's main focus. Target under 60 characters.",
            "description_for_schema": "A brief theme or focus for this day (e.g., 'Arrival & Central Tokyo exploration', 'Traditional culture & temples', 'Food tour & nightlife')",
            "purpose": "Summarizes the main focus or activities for this day in one phrase.",
            "type": "string"
          }
        },
        "required": [
          "day_number",
          "theme"
        ],
        "type": "object"
      },
      "maxItems": 30,
      "purpose": "Provides a quick preview of what each day focuses on, helping users understand the trip flow.",
      "type": "array"
    },
    "destination": {
      "authoring_guidance": "Use the destination from the travel-preferences artifact.",
      "description_for_schema": "The primary destination for this trip",
      "purpose": "Clearly states the primary location for quick reference.",
      "type": "string"
    },
    "duration": {
      "authoring_guidance": "Use the duration from the travel-preferences artifact.",
      "description_for_schema": "The total duration of the trip (e.g., '5 days', '1 week')",
      "purpose": "States the trip length for context and planning.",
      "type": "string"
    },
    "travel_dates": {
      "authoring_guidance": "Use specific dates if available, otherwise use the general timeframe from preferences.",
      "description_for_schema": "The travel dates for this trip (e.g., 'June 15-20, 2025', 'Summer 2025')",
      "purpose": "Documents the specific dates for this trip.",
      "type": "string"
    },
    "travel_style": {
      "authoring_guidance": "Use the travel style from the travel-preferences artifact.",
      "description_for_schema": "The travel style for this trip (e.g., 'Mid-range comfort', 'Budget backpacker', 'Luxury')",
      "purpose": "Reminds the reader of the overall approach and pacing for this trip.",
      "type": "string"
    },
    "trip_title": {
      "authoring_guidance": "Create a title that captures the destination and main focus. Keep it under 60 characters.",
      "description_for_schema": "A descriptive title for this trip (e.g., 'Tokyo Food & Culture Adventure', '5 Days in Bali')",
      "purpose": "Provides a memorable, descriptive title that identifies the trip at a glance.",
      "type": "string"
    }
  }
}