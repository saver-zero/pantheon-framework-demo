{
  "type": "object",
  "required": [
    "attraction_list"
  ],
  "properties": {
    "attraction_list": {
      "authoring_guidance": "Aim for 8-12 major attractions that match the user's interests. Prioritize must-see sites and those aligned with preferences.",
      "description_for_schema": "Array of key attractions, sites, and landmarks in the destination",
      "items": {
        "properties": {
          "access_notes": {
            "authoring_guidance": "Include reservation requirements, accessibility info, or transportation tips.",
            "description_for_schema": "Optional: Transportation access, booking requirements, or other practical notes",
            "purpose": "Captures practical details that affect feasibility and planning.",
            "type": "string"
          },
          "admission": {
            "authoring_guidance": "Include price ranges and any free admission days if known.",
            "description_for_schema": "Optional: Admission cost or pricing information",
            "purpose": "Enables budget planning and helps set cost expectations.",
            "type": "string"
          },
          "best_time_to_visit": {
            "authoring_guidance": "Include crowd patterns or lighting considerations if relevant.",
            "description_for_schema": "Optional: Recommendations on best time of day or season to visit",
            "purpose": "Optimizes the visitor experience by avoiding crowds or poor timing.",
            "type": "string"
          },
          "description": {
            "authoring_guidance": "Target 1-2 sentences. Focus on what the visitor will experience.",
            "description_for_schema": "A brief description of the attraction and what makes it notable",
            "purpose": "Provides context about what makes this attraction notable and worth visiting.",
            "type": "string"
          },
          "location": {
            "authoring_guidance": "Use neighborhood names that help with grouping activities by area.",
            "description_for_schema": "Optional: Neighborhood or area where the attraction is located",
            "purpose": "Helps with geographic planning and activity sequencing by proximity.",
            "type": "string"
          },
          "name": {
            "authoring_guidance": "Use the official or commonly known name.",
            "description_for_schema": "The name of the attraction",
            "purpose": "Identifies the attraction clearly for itinerary planning and user reference.",
            "type": "string"
          },
          "operating_hours": {
            "authoring_guidance": "Include any variations by day of week or season. Mark if verification is needed.",
            "description_for_schema": "Operating hours and days of operation",
            "purpose": "Critical for scheduling activities and avoiding arrival at closed venues.",
            "type": "string"
          },
          "type": {
            "authoring_guidance": "Choose a clear category that helps with filtering and grouping.",
            "description_for_schema": "The type of attraction (e.g., 'Museum', 'Temple', 'Park', 'Historical site', 'Observation deck')",
            "purpose": "Categorizes the attraction to help match it with user interests.",
            "type": "string"
          }
        },
        "required": [
          "name",
          "type",
          "description",
          "operating_hours"
        ],
        "type": "object"
      },
      "maxItems": 20,
      "purpose": "Provides a structured catalog of major attractions that can be used when building the day-by-day itinerary.",
      "type": "array"
    }
  }
}