{
  "type": "object",
  "properties": {
    "insights": {
      "authoring_guidance": "Focus on actionable insights that will help in future chunks. What would you want to know before starting the next phase?",
      "description_for_schema": "Lessons learned, pitfalls encountered, and working solutions discovered during implementation",
      "items": {
        "properties": {
          "category": {
            "description_for_schema": "Category of insight (e.g., 'Pitfall Avoided', 'Pattern Discovered', 'Architecture Change', 'Dependency Issue')",
            "purpose": "Type of insight for quick scanning and filtering.",
            "type": "string"
          },
          "context": {
            "description_for_schema": "What part of the implementation this relates to (optional)",
            "purpose": "What part of the codebase or feature this relates to. Helps future chunks recognize relevance.",
            "type": "string"
          },
          "date": {
            "description_for_schema": "Date this insight was captured (YYYY-MM-DD format)",
            "purpose": "When this insight was captured for chronological tracking.",
            "type": "string"
          },
          "insight": {
            "description_for_schema": "The specific insight, lesson learned, or solution discovered",
            "purpose": "The actual learning or solution. Must be specific enough to guide future implementation.",
            "type": "string"
          }
        },
        "required": [
          "date",
          "category",
          "insight"
        ],
        "type": "object"
      },
      "maxItems": 20,
      "purpose": "Chronological record of implementation learnings with most recent first. Prevents repeated mistakes and captures working solutions as they're discovered.",
      "type": "array"
    }
  }
}