{
  "type": "object",
  "properties": {
    "code_organization": {
      "authoring_guidance": "Describe the high-level organization principles, not every folder. Focus on patterns that guide where new code belongs.",
      "description_for_schema": "How the codebase is organized (folder structure, module boundaries, etc.)",
      "purpose": "The folder structure and module organization approach. Ensures consistent file placement across all implementation chunks.",
      "type": "string"
    },
    "data_flow": {
      "authoring_guidance": "Describe the typical path data takes: database queries, API endpoints, client fetching, component rendering.",
      "description_for_schema": "How data flows through the application from database to UI",
      "purpose": "How data moves from database to UI and back. Guides API design and data fetching patterns.",
      "type": "string"
    },
    "key_patterns": {
      "authoring_guidance": "List only patterns that appear repeatedly or significantly impact implementation. Skip one-off decisions.",
      "description_for_schema": "Important architectural patterns or conventions used throughout the codebase",
      "items": {
        "properties": {
          "pattern": {
            "description_for_schema": "Name or description of the pattern",
            "purpose": "The pattern name or description.",
            "type": "string"
          },
          "rationale": {
            "description_for_schema": "Why this pattern is used and when to apply it",
            "purpose": "Why this pattern is used and when to apply it.",
            "type": "string"
          }
        },
        "required": [
          "pattern",
          "rationale"
        ],
        "type": "object"
      },
      "maxItems": 8,
      "purpose": "Recurring structural decisions that maintain consistency. Provides quick reference for common implementation scenarios.",
      "type": "array"
    },
    "state_management": {
      "authoring_guidance": "Explain the state management strategy and when to use different approaches. Keep it practical for implementation.",
      "description_for_schema": "The approach to managing application state (e.g., React Context, Redux, server state, etc.)",
      "purpose": "How application state flows through the system. Critical for understanding data flow patterns during feature implementation.",
      "type": "string"
    }
  }
}