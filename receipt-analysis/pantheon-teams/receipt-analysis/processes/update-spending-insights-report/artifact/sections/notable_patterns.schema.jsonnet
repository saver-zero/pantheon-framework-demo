{
  "type": "object",
  "required": [
    "patterns"
  ],
  "properties": {
    "patterns": {
      "authoring_guidance": "Identify 2-3 standout observations that emerge from the data. Examples: 'You shopped at Target 5 times this month', 'Coffee purchases appear on 8 out of 10 receipts', 'Weekend spending averages 40% higher than weekdays'. Make each pattern specific and conversational. Focus on behaviors that could inform actionable tips.",
      "description_for_schema": "Array of 2-3 notable observations about spending behavior, formatted as complete sentences",
      "items": {
        "description_for_schema": "A notable pattern or observation about spending behavior, written as a complete sentence",
        "purpose": "A single notable pattern observation presented as a complete, conversational sentence.",
        "type": "string"
      },
      "maxItems": 3,
      "purpose": "A curated list of standout observations that reveal the user's spending habits and behaviors. These insights help users recognize patterns they might not have noticed.",
      "type": "array"
    }
  }
}