{
  "type": "object",
  "required": [
    "primary_location",
    "geographic_scope"
  ],
  "properties": {
    "arrival_city": {
      "authoring_guidance": "Only include if the user mentions arriving at a different city or airport than the main destination.",
      "description_for_schema": "Optional: The city where the user will arrive if different from the primary location",
      "purpose": "Identifies the entry point if different from the main destination, which affects logistics planning.",
      "type": "string"
    },
    "geographic_scope": {
      "authoring_guidance": "Describe the geographic boundaries of the trip. Be specific about whether it's city-only or includes surrounding areas.",
      "description_for_schema": "Description of the geographic area covered (e.g., 'Tokyo city center', 'Bali island including Ubud and Seminyak', 'Paris with possible day trip to Versailles')",
      "purpose": "Clarifies whether the trip focuses on a single city, a region, or allows day trips to nearby areas.",
      "type": "string"
    },
    "primary_location": {
      "authoring_guidance": "Extract the main destination from the user's request. If they mention multiple areas, identify the primary focus.",
      "description_for_schema": "The primary city or area for this trip (e.g., 'Tokyo', 'Bali', 'Paris')",
      "purpose": "Identifies the main city or area that will be the focus of the trip planning.",
      "type": "string"
    },
    "region_preferences": {
      "authoring_guidance": "Only include if the user mentioned specific areas. Leave empty if not specified.",
      "description_for_schema": "Optional: Specific regions, neighborhoods, or districts to prioritize or avoid within the destination",
      "purpose": "Captures any specific neighborhoods, districts, or areas within the destination that the user wants to focus on or avoid.",
      "type": "string"
    }
  }
}