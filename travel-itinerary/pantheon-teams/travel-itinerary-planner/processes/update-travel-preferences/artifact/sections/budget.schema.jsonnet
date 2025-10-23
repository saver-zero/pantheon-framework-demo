{
  "type": "object",
  "required": [
    "budget_level"
  ],
  "properties": {
    "budget_constraints": {
      "authoring_guidance": "Only include if the user mentioned specific constraints about what's included or excluded from their budget.",
      "description_for_schema": "Optional: Any specific budget constraints or requirements (e.g., 'Must include all meals in budget', 'Accommodation already booked separately')",
      "purpose": "Captures any specific budget limitations or requirements that affect planning.",
      "type": "string"
    },
    "budget_level": {
      "authoring_guidance": "Choose one category that best matches the user's spending preferences. Use 'Mid-range' if not specified.",
      "description_for_schema": "The general budget category (e.g., 'Budget', 'Mid-range', 'Luxury', 'Ultra-luxury')",
      "purpose": "Categorizes the overall spending approach, which guides all cost-related recommendations.",
      "type": "string"
    },
    "budget_priorities": {
      "authoring_guidance": "Include if the user mentioned specific areas where they want to spend more or save money.",
      "description_for_schema": "Optional: Description of spending priorities (e.g., 'Willing to splurge on food, save on accommodation', 'Prioritize experiences over lodging')",
      "purpose": "Documents where the user wants to spend more or less, allowing strategic budget allocation.",
      "type": "string"
    },
    "daily_budget": {
      "authoring_guidance": "Only include if the user provided a specific daily budget amount or range.",
      "description_for_schema": "Optional: Daily spending target in local currency or USD (e.g., '$100-150 per day', '10,000 yen per day')",
      "purpose": "Provides a specific per-day spending target if mentioned, enabling precise cost planning.",
      "type": "string"
    },
    "total_budget": {
      "authoring_guidance": "Only include if the user mentioned a total trip budget.",
      "description_for_schema": "Optional: Total budget for the entire trip (e.g., '$2000 total', '500,000 yen for 5 days')",
      "purpose": "Captures the total available budget for the entire trip if specified, providing an overall spending constraint.",
      "type": "string"
    }
  }
}