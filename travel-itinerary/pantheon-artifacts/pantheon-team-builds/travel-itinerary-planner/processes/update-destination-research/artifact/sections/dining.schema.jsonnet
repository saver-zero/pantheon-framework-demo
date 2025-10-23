{
  "type": "object",
  "required": [
    "dining_options"
  ],
  "properties": {
    "dining_options": {
      "authoring_guidance": "Aim for 10-15 dining options covering different meal types, price ranges, and cuisines that match user preferences. Ensure geographic spread.",
      "description_for_schema": "Array of recommended restaurants and food experiences",
      "items": {
        "properties": {
          "cuisine": {
            "authoring_guidance": "Be specific about the cuisine style to help with variety planning.",
            "description_for_schema": "The type of cuisine or food style (e.g., 'Traditional Japanese', 'Italian', 'Street food', 'Fine dining French')",
            "purpose": "Helps match dining options with user food preferences and ensures variety.",
            "type": "string"
          },
          "description": {
            "authoring_guidance": "Target 1-2 sentences. Focus on the experience, ambiance, or signature dishes.",
            "description_for_schema": "A brief description of what makes this dining option notable",
            "purpose": "Provides context about the dining experience and why it's recommended.",
            "type": "string"
          },
          "location": {
            "authoring_guidance": "Use neighborhood names that help with geographic grouping.",
            "description_for_schema": "Optional: Neighborhood or area where the restaurant is located",
            "purpose": "Helps sequence dining with nearby activities and optimize travel time.",
            "type": "string"
          },
          "meal_type": {
            "authoring_guidance": "Can list multiple meal types if applicable. Be specific about timing constraints.",
            "description_for_schema": "When this dining option is appropriate (e.g., 'Breakfast', 'Lunch', 'Dinner', 'Snacks/Dessert', 'Any meal')",
            "purpose": "Enables proper placement in the daily schedule and meal planning.",
            "type": "string"
          },
          "name": {
            "authoring_guidance": "Use the official name or clear description (e.g., 'Tsukiji Fish Market street food').",
            "description_for_schema": "The name of the restaurant or food experience",
            "purpose": "Identifies the restaurant or food experience for itinerary planning.",
            "type": "string"
          },
          "price_range": {
            "authoring_guidance": "Use consistent symbols or ranges. Include what's typical for a meal per person.",
            "description_for_schema": "Optional: Price range or budget level (e.g., '$', '$$', '$$$', '$10-20 per person')",
            "purpose": "Enables budget-appropriate meal planning and cost estimation.",
            "type": "string"
          },
          "reservation_notes": {
            "authoring_guidance": "Include if reservations are required, recommended, or difficult to get.",
            "description_for_schema": "Optional: Reservation requirements or booking notes",
            "purpose": "Captures practical requirements that affect planning and execution.",
            "type": "string"
          },
          "specialties": {
            "authoring_guidance": "List 2-3 items that the restaurant is known for.",
            "description_for_schema": "Optional: Signature dishes or notable menu items",
            "purpose": "Highlights signature dishes or experiences that make this option stand out.",
            "type": "string"
          }
        },
        "required": [
          "name",
          "cuisine",
          "meal_type",
          "description"
        ],
        "type": "object"
      },
      "maxItems": 25,
      "purpose": "Provides a curated list of dining options that can be incorporated into the daily itinerary based on location and meal timing.",
      "type": "array"
    }
  }
}