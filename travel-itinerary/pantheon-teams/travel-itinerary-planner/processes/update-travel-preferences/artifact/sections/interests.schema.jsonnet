{
  "type": "object",
  "required": [
    "primary_interests",
    "travel_style"
  ],
  "properties": {
    "accessibility_needs": {
      "authoring_guidance": "Only include if the user mentioned accessibility needs, mobility issues, or specific requirements.",
      "description_for_schema": "Optional: Any accessibility requirements or mobility considerations",
      "purpose": "Documents any mobility requirements or accessibility considerations that affect activity and venue selection.",
      "type": "string"
    },
    "avoid_preferences": {
      "authoring_guidance": "Only include if the user explicitly mentioned things to avoid. Keep it concise.",
      "description_for_schema": "Optional: Array of activities, experiences, or situations to avoid",
      "items": {
        "type": "string"
      },
      "maxItems": 8,
      "purpose": "Documents activities, experiences, or situations the user wants to avoid, preventing unwanted recommendations.",
      "type": "array"
    },
    "group_composition": {
      "authoring_guidance": "Include if the user mentioned traveling with others or if it's relevant to their preferences.",
      "description_for_schema": "Optional: Description of the travel group (e.g., 'Solo traveler', 'Couple', 'Family with children ages 6 and 9', 'Group of 4 friends')",
      "purpose": "Identifies who is traveling, which affects activity selection and pacing recommendations.",
      "type": "string"
    },
    "must_do_activities": {
      "authoring_guidance": "Only include activities the user specifically mentioned wanting to do. Aim for 3-5 items max.",
      "description_for_schema": "Optional: Array of specific activities or attractions the user wants to experience",
      "items": {
        "type": "string"
      },
      "maxItems": 10,
      "purpose": "Captures specific experiences or attractions the user explicitly wants to include, ensuring they are prioritized in the itinerary.",
      "type": "array"
    },
    "primary_interests": {
      "authoring_guidance": "Extract all mentioned interests from the user's request. Aim for 3-6 items. Use specific categories rather than vague terms.",
      "description_for_schema": "Array of primary interests and activity types (e.g., ['Food and dining', 'Museums and art', 'Outdoor activities', 'Nightlife', 'Shopping'])",
      "items": {
        "type": "string"
      },
      "maxItems": 10,
      "purpose": "Lists the main types of activities and experiences the user wants, which guides itinerary content selection.",
      "type": "array"
    },
    "travel_style": {
      "authoring_guidance": "Infer from the user's description and budget level. Choose one primary style that best fits.",
      "description_for_schema": "The user's travel style (e.g., 'Budget backpacker', 'Mid-range comfort', 'Luxury', 'Family-friendly', 'Solo traveler', 'Romantic getaway')",
      "purpose": "Defines the overall approach to travel, which affects accommodation, transportation, and activity recommendations.",
      "type": "string"
    }
  }
}