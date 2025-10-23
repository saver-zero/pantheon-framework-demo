{
  "type": "object",
  "required": [
    "origin",
    "destination",
    "departure_date",
    "trip_type",
    "passengers"
  ],
  "properties": {
    "cabin_class": {
      "authoring_guidance": "Use standard airline cabin class names. Skip if no preference specified.",
      "description_for_schema": "Preferred cabin class (e.g., 'Economy', 'Premium Economy', 'Business', 'First Class'). Optional.",
      "purpose": "Captures seat class preference to filter results appropriately and provide accurate pricing.",
      "type": "string"
    },
    "departure_date": {
      "authoring_guidance": "Use ISO 8601 date format (YYYY-MM-DD) for clarity and consistency.",
      "description_for_schema": "The date the traveler wants to depart (format: YYYY-MM-DD)",
      "purpose": "Establishes the outbound travel date that constrains all flight option searches.",
      "type": "string"
    },
    "destination": {
      "authoring_guidance": "Provide the city name with country or the 3-letter airport code. Be specific to avoid ambiguity.",
      "description_for_schema": "The destination city or airport (e.g., 'Tokyo, Japan' or 'NRT')",
      "purpose": "Captures the arrival location to establish the endpoint for all flight searches.",
      "type": "string"
    },
    "origin": {
      "authoring_guidance": "Provide the city name with state/country or the 3-letter airport code. Be specific to avoid ambiguity.",
      "description_for_schema": "The departure city or airport (e.g., 'San Francisco, CA' or 'SFO')",
      "purpose": "Captures the departure location to establish the starting point for all flight searches.",
      "type": "string"
    },
    "passengers": {
      "authoring_guidance": "Provide a positive integer. Default to 1 if not specified.",
      "description_for_schema": "The number of passengers traveling",
      "purpose": "Specifies the number of travelers to ensure correct pricing and seat availability checks.",
      "type": "integer"
    },
    "return_date": {
      "authoring_guidance": "Use ISO 8601 date format (YYYY-MM-DD). Skip this field for one-way trips.",
      "description_for_schema": "The date the traveler wants to return (format: YYYY-MM-DD). Leave empty for one-way trips.",
      "purpose": "Establishes the return travel date for round-trip searches, enabling accurate pricing and availability.",
      "type": "string"
    },
    "trip_type": {
      "authoring_guidance": "Use exactly 'one-way' or 'round-trip' for consistency.",
      "description_for_schema": "The type of trip: 'one-way' or 'round-trip'",
      "purpose": "Defines whether the search is for one-way or round-trip flights, affecting pricing and availability results.",
      "type": "string"
    }
  }
}