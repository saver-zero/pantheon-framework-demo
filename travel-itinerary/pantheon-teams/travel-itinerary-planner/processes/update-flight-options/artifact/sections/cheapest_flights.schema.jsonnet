{
  "type": "object",
  "required": [
    "flights"
  ],
  "properties": {
    "flights": {
      "authoring_guidance": "Provide up to 5 flight options sorted by price from lowest to highest. Each must include all required fields.",
      "description_for_schema": "Array of flight options sorted by price (lowest first). Maximum 5 items.",
      "items": {
        "description_for_schema": "A single flight option with pricing, schedule, and logistics details",
        "properties": {
          "airline": {
            "description_for_schema": "The airline operating the flight (e.g., 'United Airlines', 'Delta')",
            "purpose": "Identifies the carrier operating the flight for brand recognition and preference matching.",
            "type": "string"
          },
          "arrival_airport": {
            "description_for_schema": "The arrival airport code and name (e.g., 'NRT - Narita International')",
            "purpose": "Identifies the arrival terminal for travel logistics.",
            "type": "string"
          },
          "arrival_time": {
            "description_for_schema": "Arrival date and time (format: YYYY-MM-DD HH:MM with timezone)",
            "purpose": "Establishes when the flight arrives to enable schedule planning.",
            "type": "string"
          },
          "currency": {
            "description_for_schema": "The currency code (e.g., 'USD', 'EUR')",
            "purpose": "Specifies the currency for the price to avoid confusion in international bookings.",
            "type": "string"
          },
          "departure_airport": {
            "description_for_schema": "The departure airport code and name (e.g., 'SFO - San Francisco International')",
            "purpose": "Identifies the departure terminal for travel logistics.",
            "type": "string"
          },
          "departure_time": {
            "description_for_schema": "Departure date and time (format: YYYY-MM-DD HH:MM with timezone)",
            "purpose": "Establishes when the flight leaves to enable schedule planning.",
            "type": "string"
          },
          "duration": {
            "description_for_schema": "Total flight duration (e.g., '12h 30m')",
            "purpose": "Communicates total travel time for comparison and planning.",
            "type": "string"
          },
          "flight_number": {
            "description_for_schema": "The flight number (e.g., 'UA123', 'DL456')",
            "purpose": "Provides the unique flight identifier needed for booking and tracking.",
            "type": "string"
          },
          "layover_airports": {
            "description_for_schema": "Comma-separated list of layover airports with duration (e.g., 'LAX (2h 15m), SEA (1h 45m)'). Optional for nonstop flights.",
            "purpose": "Details connection airports for users who need to assess layover locations and durations.",
            "type": "string"
          },
          "price": {
            "description_for_schema": "The total price for all passengers in the specified currency",
            "purpose": "Captures the total cost for comparison and budget planning.",
            "type": "number"
          },
          "source_url": {
            "description_for_schema": "The full URL to the specific flight listing on the source website",
            "purpose": "Provides a direct link to the flight listing for verification and booking convenience.",
            "type": "string"
          },
          "source_website": {
            "description_for_schema": "The name of the website or platform where this flight information was found (e.g., 'Google Flights', 'Kayak', 'United.com')",
            "purpose": "Identifies the platform where the flight was found for verification and booking.",
            "type": "string"
          },
          "stops": {
            "description_for_schema": "Number of stops (e.g., 'Nonstop', '1 stop', '2 stops')",
            "purpose": "Indicates the number of connections to help users assess convenience.",
            "type": "string"
          }
        },
        "purpose": "Represents a single flight option with complete booking information.",
        "required": [
          "airline",
          "flight_number",
          "price",
          "currency",
          "departure_time",
          "departure_airport",
          "arrival_time",
          "arrival_airport",
          "duration",
          "stops",
          "source_website",
          "source_url"
        ],
        "type": "object"
      },
      "maxItems": 5,
      "purpose": "Contains the flight options sorted by price ascending, enabling users to compare budget-friendly choices.",
      "type": "array"
    }
  }
}