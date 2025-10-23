{
  "type": "object",
  "required": [
    "duration_days",
    "trip_pace"
  ],
  "properties": {
    "duration_days": {
      "authoring_guidance": "Extract the number of days from the user's request. If they say 'a week', convert to 7 days.",
      "description_for_schema": "The total number of days for this trip",
      "purpose": "Defines the total number of days for the trip, which determines the itinerary length.",
      "type": "integer"
    },
    "flexibility": {
      "authoring_guidance": "Include if the user mentioned flexibility or constraints around their dates.",
      "description_for_schema": "Optional: Description of date flexibility (e.g., 'Fixed dates - non-refundable flights booked', 'Flexible within summer months')",
      "purpose": "Documents whether dates can be adjusted, which affects scheduling and booking advice.",
      "type": "string"
    },
    "special_timing": {
      "authoring_guidance": "Only include if the user mentioned specific timing constraints or requirements.",
      "description_for_schema": "Optional: Any special timing considerations (e.g., 'Arriving late on day 1', 'Must depart by noon on last day', 'Want to attend specific festival')",
      "purpose": "Captures any timing constraints like early flights, late arrivals, or specific event attendance.",
      "type": "string"
    },
    "travel_dates": {
      "authoring_guidance": "Only include if the user provided specific dates or months. Use the format they provided.",
      "description_for_schema": "Optional: Specific travel dates if provided (e.g., 'June 15-22, 2025', 'July 2025')",
      "purpose": "Captures specific dates if provided, which affects availability and seasonal planning.",
      "type": "string"
    },
    "trip_pace": {
      "authoring_guidance": "Infer from the user's description. Default to 'Moderate' if not specified.",
      "description_for_schema": "The preferred activity pace (e.g., 'Fast-paced with multiple activities daily', 'Leisurely with afternoon breaks', 'Moderate - 2-3 activities per day')",
      "purpose": "Establishes whether the user prefers a fast-paced itinerary with many activities or a leisurely pace with downtime.",
      "type": "string"
    }
  }
}