{
  "type": "object",
  "required": [
    "transportation_options",
    "neighborhoods"
  ],
  "properties": {
    "local_customs": {
      "authoring_guidance": "Include customs around greetings, dining, dress codes, tipping, or social behavior. Target 1-2 paragraphs.",
      "description_for_schema": "Optional: Important cultural customs or etiquette notes for this destination",
      "purpose": "Helps travelers avoid cultural missteps and shows respect for local norms.",
      "type": "string"
    },
    "neighborhoods": {
      "authoring_guidance": "Aim for 4-8 neighborhoods covering the main areas tourists consider. Include both central and interesting outlying areas.",
      "description_for_schema": "Array of key neighborhoods or areas in the destination",
      "items": {
        "properties": {
          "best_for": {
            "authoring_guidance": "Note if it's good for nightlife, families, budget travelers, central access, etc.",
            "description_for_schema": "Optional: What types of travelers or interests this area suits best",
            "purpose": "Helps match neighborhoods with user preferences and travel style.",
            "type": "string"
          },
          "description": {
            "authoring_guidance": "Target 1-2 sentences covering the area's vibe, attractions, and visitor appeal.",
            "description_for_schema": "Description of the neighborhood's character and what it's known for",
            "purpose": "Provides context about what this area is like and what it offers visitors.",
            "type": "string"
          },
          "name": {
            "authoring_guidance": "Use commonly recognized neighborhood names that tourists would encounter.",
            "description_for_schema": "The name of the neighborhood or area",
            "purpose": "Identifies the area for geographic planning and accommodation selection.",
            "type": "string"
          }
        },
        "required": [
          "name",
          "description"
        ],
        "type": "object"
      },
      "maxItems": 12,
      "purpose": "Helps with accommodation recommendations and geographic clustering of activities.",
      "type": "array"
    },
    "practical_tips": {
      "authoring_guidance": "Include 5-10 actionable tips about currency, tipping, language, safety, or local conventions. Keep each tip concise.",
      "description_for_schema": "Optional: Array of practical travel tips specific to this destination",
      "items": {
        "type": "string"
      },
      "maxItems": 15,
      "purpose": "Surfaces important practical information that affects daily planning and traveler comfort.",
      "type": "array"
    },
    "transportation_options": {
      "authoring_guidance": "Aim for 4-6 transportation options covering the main methods tourists use. Focus on practical, commonly used options.",
      "description_for_schema": "Array of transportation methods available in the destination",
      "items": {
        "properties": {
          "cost": {
            "authoring_guidance": "Include typical fares, pass options, or pricing structure.",
            "description_for_schema": "Optional: Typical cost or fare information",
            "purpose": "Enables accurate budget estimation for transportation costs.",
            "type": "string"
          },
          "description": {
            "authoring_guidance": "Target 1-2 sentences covering coverage, ease of use, and typical scenarios.",
            "description_for_schema": "Description of how this transportation option works and when it's most useful",
            "purpose": "Provides practical details about how this transportation option works in the destination.",
            "type": "string"
          },
          "notes": {
            "authoring_guidance": "Include payment methods, language barriers, or booking requirements.",
            "description_for_schema": "Optional: Important notes about using this transportation option",
            "purpose": "Captures important practical details that affect transportation planning.",
            "type": "string"
          },
          "type": {
            "authoring_guidance": "Use clear, standard categories that will be recognized in itinerary planning.",
            "description_for_schema": "The type of transportation (e.g., 'Metro/Subway', 'Taxi/Rideshare', 'Bus', 'Walking', 'Bicycle rental')",
            "purpose": "Identifies the transportation mode for route planning.",
            "type": "string"
          }
        },
        "required": [
          "type",
          "description"
        ],
        "type": "object"
      },
      "maxItems": 10,
      "purpose": "Provides the information needed to plan realistic transitions between activities in the daily itinerary.",
      "type": "array"
    }
  }
}