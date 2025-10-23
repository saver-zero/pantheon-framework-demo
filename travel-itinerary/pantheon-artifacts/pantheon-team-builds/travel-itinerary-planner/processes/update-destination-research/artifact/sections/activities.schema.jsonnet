{
  "type": "object",
  "required": [
    "activity_list"
  ],
  "properties": {
    "activity_list": {
      "authoring_guidance": "Aim for 8-15 activities that strongly align with user interests. Focus on unique experiences rather than generic tours.",
      "description_for_schema": "Array of activities and experiences available in the destination",
      "items": {
        "properties": {
          "best_time": {
            "authoring_guidance": "Include weather dependencies, crowd patterns, or time-of-day considerations.",
            "description_for_schema": "Optional: Best time of day or season for this activity",
            "purpose": "Optimizes the experience by scheduling at the ideal time of day or season.",
            "type": "string"
          },
          "booking_notes": {
            "authoring_guidance": "Note if advance booking is required and typical lead time needed.",
            "description_for_schema": "Optional: Advance booking requirements or availability notes",
            "purpose": "Captures advance planning requirements that affect feasibility.",
            "type": "string"
          },
          "cost": {
            "authoring_guidance": "Include per-person costs and note if equipment rental or fees are additional.",
            "description_for_schema": "Optional: Cost or price range for the activity",
            "purpose": "Enables budget planning and selection of cost-appropriate activities.",
            "type": "string"
          },
          "description": {
            "authoring_guidance": "Target 2-3 sentences. Include what's involved and what makes it special.",
            "description_for_schema": "A description of the activity and what participants will experience",
            "purpose": "Provides details about what the activity involves and what makes it worthwhile.",
            "type": "string"
          },
          "difficulty": {
            "authoring_guidance": "Include relevant difficulty factors like walking distance, fitness level, or skill requirements.",
            "description_for_schema": "Optional: Physical difficulty or skill level required (e.g., 'Easy', 'Moderate', 'Challenging')",
            "purpose": "Helps match activities with user capabilities and preferences.",
            "type": "string"
          },
          "duration": {
            "authoring_guidance": "Include realistic time estimates including any travel or waiting time.",
            "description_for_schema": "Optional: Typical time required for the activity (e.g., '2-3 hours', 'Half day', 'Full day')",
            "purpose": "Critical for schedule planning and ensuring activities fit within daily time slots.",
            "type": "string"
          },
          "location": {
            "authoring_guidance": "Include neighborhood or area names that help with scheduling nearby activities together.",
            "description_for_schema": "Optional: Where the activity takes place",
            "purpose": "Helps with geographic clustering and efficient daily routing.",
            "type": "string"
          },
          "name": {
            "authoring_guidance": "Use descriptive names that clearly convey what the activity involves.",
            "description_for_schema": "The name or title of the activity",
            "purpose": "Identifies the activity clearly for itinerary planning.",
            "type": "string"
          },
          "type": {
            "authoring_guidance": "Choose categories that align with how interests are expressed in the preferences artifact.",
            "description_for_schema": "The type of activity (e.g., 'Cultural experience', 'Outdoor adventure', 'Workshop', 'Tour', 'Entertainment', 'Shopping')",
            "purpose": "Categorizes the activity to match with user interest preferences.",
            "type": "string"
          }
        },
        "required": [
          "name",
          "type",
          "description"
        ],
        "type": "object"
      },
      "maxItems": 20,
      "purpose": "Provides a menu of experiences that can be selected and scheduled based on user interests and itinerary pacing.",
      "type": "array"
    }
  }
}