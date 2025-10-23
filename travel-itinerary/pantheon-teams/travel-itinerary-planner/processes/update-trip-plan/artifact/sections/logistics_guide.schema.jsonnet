{
  "type": "object",
  "required": [
    "transportation_recommendations",
    "accommodation_recommendations"
  ],
  "properties": {
    "accommodation_recommendations": {
      "authoring_guidance": "Recommend 2-4 neighborhoods that align well with the planned itinerary.",
      "description_for_schema": "Array of accommodation area recommendations with reasoning",
      "items": {
        "properties": {
          "area": {
            "authoring_guidance": "Use specific neighborhood names from the destination research.",
            "description_for_schema": "The neighborhood or area name (e.g., 'Shibuya', 'Seminyak', 'Le Marais')",
            "purpose": "Identifies the recommended neighborhood or area for accommodation.",
            "type": "string"
          },
          "reasoning": {
            "authoring_guidance": "Reference proximity to planned activities or alignment with user interests. Target 1-2 sentences.",
            "description_for_schema": "Optional: Why this area is recommended for this trip",
            "purpose": "Justifies why this area makes sense based on the itinerary and user preferences.",
            "type": "string"
          },
          "recommendation": {
            "authoring_guidance": "Match the recommendation to the user's travel style and budget.",
            "description_for_schema": "Accommodation recommendation for this area (e.g., 'Mid-range hotel or guesthouse', 'Budget hostel', 'Luxury resort')",
            "purpose": "Explains what type of accommodation suits this area and this trip.",
            "type": "string"
          }
        },
        "required": [
          "area",
          "recommendation"
        ],
        "type": "object"
      },
      "maxItems": 6,
      "purpose": "Guides accommodation selection based on the itinerary's geographic focus and user preferences.",
      "type": "array"
    },
    "important_contacts": {
      "authoring_guidance": "Include 4-8 key contacts and information items that may be needed during the trip.",
      "description_for_schema": "Optional: Array of important contact information and details",
      "items": {
        "properties": {
          "details": {
            "authoring_guidance": "Include phone numbers, addresses, or key facts as relevant.",
            "description_for_schema": "The contact details or information (e.g., '911 for emergencies', 'Tourist hotline: +81-3-xxxx-xxxx')",
            "purpose": "Provides the actual contact information or details.",
            "type": "string"
          },
          "type": {
            "authoring_guidance": "Use clear categories that help users find information quickly.",
            "description_for_schema": "The type of contact or information (e.g., 'Emergency Services', 'Tourist Information', 'Embassy')",
            "purpose": "Categorizes the type of information being provided.",
            "type": "string"
          }
        },
        "required": [
          "type",
          "details"
        ],
        "type": "object"
      },
      "maxItems": 12,
      "purpose": "Provides quick reference to key information users may need during the trip.",
      "type": "array"
    },
    "packing_essentials": {
      "authoring_guidance": "List 8-12 items specific to this destination, season, and activities. Focus on non-obvious essentials.",
      "description_for_schema": "Optional: Array of essential items to pack for this trip",
      "items": {
        "type": "string"
      },
      "maxItems": 20,
      "purpose": "Ensures users bring necessary items specific to the destination and planned activities.",
      "type": "array"
    },
    "transportation_recommendations": {
      "authoring_guidance": "Focus on the 3-5 transportation methods most relevant to this specific itinerary.",
      "description_for_schema": "Array of transportation recommendations specific to this trip",
      "items": {
        "properties": {
          "cost": {
            "authoring_guidance": "Include costs for passes, typical fares, or daily estimates as relevant.",
            "description_for_schema": "Optional: Estimated cost for this transportation option",
            "purpose": "Helps users budget for transportation during the trip.",
            "type": "string"
          },
          "notes": {
            "authoring_guidance": "Include payment methods, coverage areas, or timing considerations.",
            "description_for_schema": "Optional: Additional notes or tips for using this transportation",
            "purpose": "Captures important practical details about using this transportation.",
            "type": "string"
          },
          "recommendation": {
            "authoring_guidance": "Make it actionable and specific to the planned activities. Target 1-2 sentences.",
            "description_for_schema": "Specific recommendation for this trip (e.g., 'Get a 7-day unlimited subway pass', 'Download Uber and Grab apps')",
            "purpose": "Provides actionable advice on using this transportation for this specific trip.",
            "type": "string"
          },
          "type": {
            "authoring_guidance": "Use specific categories based on what will be most useful for this itinerary.",
            "description_for_schema": "The type of transportation (e.g., 'Metro/Subway Pass', 'Taxi Apps', 'Rental Car', 'Walking')",
            "purpose": "Identifies the transportation mode being recommended.",
            "type": "string"
          }
        },
        "required": [
          "type",
          "recommendation"
        ],
        "type": "object"
      },
      "maxItems": 8,
      "purpose": "Provides specific guidance on how to navigate the destination based on the planned itinerary.",
      "type": "array"
    }
  }
}