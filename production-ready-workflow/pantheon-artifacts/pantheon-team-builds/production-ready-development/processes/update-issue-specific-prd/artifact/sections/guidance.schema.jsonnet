{
  "type": "object",
  "required": [
    "recommended_approach",
    "key_steps",
    "common_pitfalls"
  ],
  "properties": {
    "code_snippets": {
      "authoring_guidance": "Optional. Include 1-3 snippets only if they significantly accelerate implementation or demonstrate non-obvious patterns.",
      "description_for_schema": "Helpful code examples that demonstrate key patterns or provide starting points",
      "items": {
        "properties": {
          "code": {
            "description_for_schema": "The actual code snippet",
            "type": "string"
          },
          "description": {
            "description_for_schema": "What this code snippet demonstrates or provides",
            "type": "string"
          },
          "language": {
            "description_for_schema": "The programming language of the snippet",
            "type": "string"
          }
        },
        "required": [
          "description",
          "language",
          "code"
        ],
        "type": "object"
      },
      "purpose": "Offers reusable code examples that accelerate implementation and demonstrate preferred coding patterns",
      "type": "array"
    },
    "common_pitfalls": {
      "authoring_guidance": "List 2-5 specific pitfalls based on past experience with similar implementations. Be concrete about what to avoid and why.",
      "description_for_schema": "Common mistakes or issues to watch out for during implementation",
      "items": {
        "type": "string"
      },
      "purpose": "Alerts the agent to known failure modes or mistakes that could waste time or introduce bugs",
      "type": "array"
    },
    "key_steps": {
      "authoring_guidance": "Provide 4-8 steps. Each step should be a clear action. Order matters - arrange them in the sequence they should be tackled.",
      "description_for_schema": "Sequential list of key implementation steps in logical order",
      "items": {
        "type": "string"
      },
      "purpose": "Breaks down the implementation into logical phases, helping the agent organize their work and ensuring nothing critical is forgotten",
      "type": "array"
    },
    "recommended_approach": {
      "authoring_guidance": "Write 2-4 sentences describing the high-level strategy. Focus on the 'why' behind the approach, not step-by-step instructions.",
      "description_for_schema": "A paragraph describing the recommended overall approach to implementing this feature",
      "purpose": "Provides high-level implementation strategy, guiding the agent toward the most appropriate technical approach without over-specifying implementation details",
      "type": "string"
    }
  }
}