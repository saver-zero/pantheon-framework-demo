{
  "type": "object",
  "required": [
    "tips"
  ],
  "properties": {
    "tips": {
      "authoring_guidance": "Generate 2-3 specific recommendations that connect directly to the patterns and categories above. Each tip must be practical and actionable (not generic advice like 'spend less'). Use a conversational, friendly tone - write like you're helping a friend, not lecturing. Examples: 'Buying coffee at home instead of daily cafe visits could save ~$80/month based on your current pattern' or 'Consider comparing prices at Aldi for your regular grocery items - you visit them weekly already'. Avoid being preachy or judgmental. Target ~20-30 words per tip.",
      "description_for_schema": "Array of 2-3 actionable money-saving tips based on observed spending patterns",
      "items": {
        "description_for_schema": "A specific, actionable money-saving recommendation based on observed behavior, written conversationally",
        "purpose": "A single actionable tip that provides a specific, practical recommendation for saving money.",
        "type": "string"
      },
      "maxItems": 3,
      "purpose": "A short list of specific, practical money-saving recommendations grounded in the user's actual observed spending behavior. These are the payoff - turning insights into action.",
      "type": "array"
    }
  }
}