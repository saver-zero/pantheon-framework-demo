{
  "type": "object",
  "required": [
    "total_spent",
    "receipt_count",
    "date_range",
    "average_transaction"
  ],
  "properties": {
    "average_transaction": {
      "authoring_guidance": "Divide total_spent by receipt_count. Format with exactly 2 decimal places. Do not include the dollar sign.",
      "description_for_schema": "Average amount per receipt, formatted as a dollar amount (e.g., '45.67')",
      "purpose": "The mean transaction amount across all receipts. This helps identify typical spending behavior.",
      "type": "string"
    },
    "date_range": {
      "authoring_guidance": "Extract dates from all receipts and format as a range. Use abbreviated month names. If all receipts are from the same day, format as single date.",
      "description_for_schema": "Date range of the analyzed receipts, formatted as 'MMM DD - MMM DD, YYYY' (e.g., 'Jan 15 - Feb 20, 2025')",
      "purpose": "The time span covered by the analyzed receipts. This contextualizes the spending patterns within a specific timeframe.",
      "type": "string"
    },
    "largest_transaction": {
      "authoring_guidance": "Find the receipt with the highest total. Format with exactly 2 decimal places. Include only if notably higher than average. Do not include the dollar sign.",
      "description_for_schema": "Largest single transaction amount, formatted as a dollar amount (e.g., '234.56'). Optional.",
      "purpose": "Optional field to highlight the single highest transaction amount for context on spending range.",
      "type": "string"
    },
    "receipt_count": {
      "authoring_guidance": "Count the total number of receipt images provided by the operator.",
      "description_for_schema": "Number of receipt images processed for this report",
      "purpose": "The number of receipts analyzed in this report. This helps users understand the data volume being summarized.",
      "type": "integer"
    },
    "total_spent": {
      "authoring_guidance": "Calculate the sum of all receipt totals. Format with commas for thousands and exactly 2 decimal places. Do not include the dollar sign in the value itself.",
      "description_for_schema": "Total amount spent across all receipts, formatted as a dollar amount (e.g., '1,234.56')",
      "purpose": "The total dollar amount spent across all analyzed receipts. This provides immediate context for the overall spending magnitude.",
      "type": "string"
    }
  }
}