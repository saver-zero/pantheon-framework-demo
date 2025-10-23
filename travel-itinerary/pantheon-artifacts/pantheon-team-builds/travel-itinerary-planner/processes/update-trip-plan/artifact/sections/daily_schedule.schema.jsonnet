{
  "type": "object",
  "required": [
    "daily_schedule"
  ],
  "properties": {
    "daily_schedule": {
      "authoring_guidance": "Create one entry for each day of the trip. Ensure activities align with user interests and pacing preferences.",
      "description_for_schema": "Array of daily schedules, one for each day of the trip",
      "items": {
        "properties": {
          "day_number": {
            "authoring_guidance": "Number sequentially from 1.",
            "description_for_schema": "The day number (1, 2, 3, etc.)",
            "purpose": "Identifies which day this schedule represents.",
            "type": "integer"
          },
          "time_blocks": {
            "authoring_guidance": "Aim for 4-8 time blocks per day depending on pace. Ensure smooth transitions and realistic timing.",
            "description_for_schema": "Array of time blocks representing activities throughout the day",
            "items": {
              "properties": {
                "activity_name": {
                  "authoring_guidance": "Use clear, action-oriented names. Keep concise.",
                  "description_for_schema": "The name of the activity (e.g., 'Visit Senso-ji Temple', 'Lunch at Tsukiji Market', 'Free time')",
                  "purpose": "Identifies what the user will be doing during this time block.",
                  "type": "string"
                },
                "cost": {
                  "authoring_guidance": "Include per-person costs. Note if it's free or included.",
                  "description_for_schema": "Optional: Estimated cost for this activity",
                  "purpose": "Provides cost expectations so users can budget throughout the day.",
                  "type": "string"
                },
                "description": {
                  "authoring_guidance": "Target 2-3 sentences. Include what visitors will see/do and why it's worthwhile.",
                  "description_for_schema": "Description of the activity and what to expect",
                  "purpose": "Provides details about what this activity involves and what to expect.",
                  "type": "string"
                },
                "duration": {
                  "authoring_guidance": "Include realistic time including any waiting or transitions within the activity.",
                  "description_for_schema": "Optional: How long to spend on this activity (e.g., '2 hours', '30 minutes')",
                  "purpose": "Indicates how long to budget for this activity, helping users pace their day.",
                  "type": "string"
                },
                "location": {
                  "authoring_guidance": "Include neighborhood and specific venue name. Add address if critical.",
                  "description_for_schema": "Optional: The location or address for this activity",
                  "purpose": "Specifies where this activity takes place for navigation and planning.",
                  "type": "string"
                },
                "time_range": {
                  "authoring_guidance": "Use specific times when possible. Use general periods like 'Morning' for flexible activities.",
                  "description_for_schema": "The time range for this activity (e.g., '9:00 AM - 11:00 AM', 'Morning', 'Afternoon')",
                  "purpose": "Specifies when this activity occurs to enable realistic scheduling.",
                  "type": "string"
                },
                "tips": {
                  "authoring_guidance": "Include booking advice, crowd avoidance, what to bring, or must-see highlights.",
                  "description_for_schema": "Optional: Helpful tips or insider advice for this activity",
                  "purpose": "Provides insider knowledge or practical advice to optimize the experience.",
                  "type": "string"
                },
                "transportation": {
                  "authoring_guidance": "Include mode, duration, and any helpful navigation tips. Note if it's walkable.",
                  "description_for_schema": "Optional: Transportation instructions to reach this location",
                  "purpose": "Explains how to get to this activity from the previous location.",
                  "type": "string"
                }
              },
              "required": [
                "time_range",
                "activity_name",
                "description"
              ],
              "type": "object"
            },
            "maxItems": 15,
            "purpose": "Contains the hour-by-hour activities for this day, providing actionable timing and details.",
            "type": "array"
          },
          "title": {
            "authoring_guidance": "Match the theme from the overview section.",
            "description_for_schema": "A title for this day (e.g., 'Arrival & Central Tokyo', 'Traditional Culture & Temples')",
            "purpose": "Provides a clear label for this day that matches the overview theme.",
            "type": "string"
          }
        },
        "required": [
          "day_number",
          "title",
          "time_blocks"
        ],
        "type": "object"
      },
      "maxItems": 30,
      "purpose": "Provides the complete day-by-day schedule that users will follow, broken into manageable time blocks.",
      "type": "array"
    }
  }
}