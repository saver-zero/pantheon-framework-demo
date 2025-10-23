{
  "type": "object",
  "required": [
    "alignment_assessment",
    "long_term_implications"
  ],
  "properties": {
    "alignment_assessment": {
      "authoring_guidance": "Write 2-3 sentences assessing alignment. Consider whether reviewer concerns suggest the implementation deviated from requirements or if requirements need clarification.",
      "description_for_schema": "Assessment of whether the implementation aligns with the original PRD requirements and intent",
      "purpose": "Evaluates whether the implementation and reviewer feedback align with the original PRD intent, identifying potential misunderstandings",
      "type": "string"
    },
    "architectural_issues": {
      "authoring_guidance": "Optional. Only include issues that represent genuine architectural concerns, not style preferences. Typically 1-4 issues.",
      "description_for_schema": "Specific architectural concerns raised by reviewers",
      "items": {
        "properties": {
          "concern_title": {
            "description_for_schema": "Brief title for the architectural concern",
            "type": "string"
          },
          "description": {
            "description_for_schema": "Detailed description of the architectural concern",
            "type": "string"
          },
          "impact": {
            "description_for_schema": "Explanation of the long-term impact if not addressed",
            "type": "string"
          },
          "severity": {
            "description_for_schema": "Severity level (Critical/Medium/Low)",
            "type": "string"
          },
          "sources": {
            "description_for_schema": "Which reviewers raised this concern",
            "items": {
              "type": "string"
            },
            "type": "array"
          }
        },
        "required": [
          "concern_title",
          "severity",
          "description",
          "impact",
          "sources"
        ],
        "type": "object"
      },
      "purpose": "Surfaces genuine architectural problems that could create maintenance burden or technical debt if not addressed",
      "type": "array"
    },
    "long_term_implications": {
      "authoring_guidance": "Write 2-3 sentences about future implications. Consider maintainability, scalability, and technical debt accumulation.",
      "description_for_schema": "Analysis of long-term maintenance and scalability implications of the current implementation",
      "purpose": "Analyzes the future impact of identified architectural concerns, helping the operator make informed decisions about whether to address them now or accept the trade-offs",
      "type": "string"
    }
  }
}