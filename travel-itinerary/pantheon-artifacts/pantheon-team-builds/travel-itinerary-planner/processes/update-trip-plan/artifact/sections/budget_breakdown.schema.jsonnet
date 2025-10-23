{
  "type": "object",
  "required": [
    "daily_costs",
    "cost_summary",
    "grand_total"
  ],
  "properties": {
    "budget_notes": {
      "authoring_guidance": "Clarify what's not included (e.g., international flights, travel insurance), exchange rate assumptions, and budget level. Target 1-2 paragraphs.",
      "description_for_schema": "Optional: Important notes about the budget estimates and what's included or excluded",
      "purpose": "Clarifies assumptions, exclusions, and important context about the budget estimates.",
      "type": "string"
    },
    "cost_summary": {
      "authoring_guidance": "Create 4-6 category summaries covering the main spending areas.",
      "description_for_schema": "Array summarizing total costs by category",
      "items": {
        "properties": {
          "category": {
            "authoring_guidance": "Use the same categories as in daily breakdowns.",
            "description_for_schema": "The cost category (e.g., 'Activities & Attractions', 'Food & Dining', 'Transportation', 'Accommodation')",
            "purpose": "Identifies the cost category being summarized.",
            "type": "string"
          },
          "notes": {
            "authoring_guidance": "Include information like 'not including accommodation' or 'per person estimates'.",
            "description_for_schema": "Optional: Notes about this category total",
            "purpose": "Provides context or qualifiers about this category total.",
            "type": "string"
          },
          "total": {
            "authoring_guidance": "Sum up all costs for this category from daily breakdowns.",
            "description_for_schema": "The total estimated cost for this category (e.g., '$400', '40,000 yen')",
            "purpose": "States the total cost for this category across all days.",
            "type": "string"
          }
        },
        "required": [
          "category",
          "total"
        ],
        "type": "object"
      },
      "maxItems": 10,
      "purpose": "Aggregates costs by category across the entire trip for big-picture budget understanding.",
      "type": "array"
    },
    "daily_costs": {
      "authoring_guidance": "Create one entry for each day of the trip.",
      "description_for_schema": "Array of daily cost estimates",
      "items": {
        "properties": {
          "breakdown": {
            "authoring_guidance": "Break down costs into 3-6 categories per day.",
            "description_for_schema": "Optional: Array of cost items for this day",
            "items": {
              "properties": {
                "amount": {
                  "authoring_guidance": "Use the same currency format throughout.",
                  "description_for_schema": "The estimated amount (e.g., '$50', '5,000 yen')",
                  "purpose": "States the cost amount for this category.",
                  "type": "string"
                },
                "category": {
                  "authoring_guidance": "Use consistent categories throughout the budget.",
                  "description_for_schema": "The cost category (e.g., 'Activities', 'Meals', 'Transportation', 'Accommodation')",
                  "purpose": "Categorizes the cost for clarity and budget tracking.",
                  "type": "string"
                },
                "notes": {
                  "authoring_guidance": "Include what's included or any qualifiers like 'per person' or 'approximate'.",
                  "description_for_schema": "Optional: Additional notes about this cost",
                  "purpose": "Provides additional context about this cost item.",
                  "type": "string"
                }
              },
              "required": [
                "category",
                "amount"
              ],
              "type": "object"
            },
            "maxItems": 10,
            "purpose": "Details where the daily costs come from, providing transparency and allowing adjustments.",
            "type": "array"
          },
          "day_number": {
            "authoring_guidance": "Match the day numbers from the daily schedule.",
            "description_for_schema": "The day number",
            "purpose": "Links costs to specific days in the itinerary.",
            "type": "integer"
          },
          "total": {
            "authoring_guidance": "Calculate based on the breakdown. Use local currency or USD consistently.",
            "description_for_schema": "The total estimated cost for this day (e.g., '$150', '15,000 yen')",
            "purpose": "Provides the total estimated cost for this day.",
            "type": "string"
          }
        },
        "required": [
          "day_number",
          "total"
        ],
        "type": "object"
      },
      "maxItems": 30,
      "purpose": "Provides day-by-day cost expectations so users understand spending patterns throughout the trip.",
      "type": "array"
    },
    "grand_total": {
      "authoring_guidance": "Sum all category totals. Be clear about what's included vs excluded (e.g., flights, accommodation).",
      "description_for_schema": "The total estimated cost for the entire trip",
      "purpose": "Provides the complete cost estimate for the entire trip.",
      "type": "string"
    }
  }
}