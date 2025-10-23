{
  "type": "object",
  "required": [
    "pattern_adherence",
    "design_decisions",
    "technical_debt_assessment"
  ],
  "properties": {
    "architectural_concerns": {
      "authoring_guidance": "Optional. Only include if genuine architectural concerns exist. Categorize by severity: Critical, Medium, Low.",
      "description_for_schema": "Specific architectural issues or violations found in the implementation",
      "items": {
        "properties": {
          "description": {
            "description_for_schema": "Description of the architectural concern and why it matters",
            "type": "string"
          },
          "severity": {
            "description_for_schema": "Severity of the concern (Critical/Medium/Low)",
            "type": "string"
          }
        },
        "required": [
          "severity",
          "description"
        ],
        "type": "object"
      },
      "purpose": "Surfaces violations of architectural principles that could introduce technical debt or maintenance burden",
      "type": "array"
    },
    "design_decisions": {
      "authoring_guidance": "Include 2-5 significant design decisions. Focus on choices that might not be obvious and explain why they were made.",
      "description_for_schema": "Notable design decisions made during implementation and their rationale",
      "items": {
        "properties": {
          "decision": {
            "description_for_schema": "The design decision that was made",
            "type": "string"
          },
          "rationale": {
            "description_for_schema": "Why this decision was made",
            "type": "string"
          }
        },
        "required": [
          "decision",
          "rationale"
        ],
        "type": "object"
      },
      "purpose": "Documents significant design choices made during implementation, providing context for future maintainers",
      "type": "array"
    },
    "pattern_adherence": {
      "authoring_guidance": "For each architectural pattern mentioned in the PRD, assess adherence. Typically 2-4 patterns.",
      "description_for_schema": "Assessment of how well the implementation follows specified architectural patterns",
      "items": {
        "properties": {
          "assessment": {
            "description_for_schema": "Assessment of adherence to this pattern",
            "type": "string"
          },
          "pattern_name": {
            "description_for_schema": "The name of the architectural pattern being assessed",
            "type": "string"
          }
        },
        "required": [
          "pattern_name",
          "assessment"
        ],
        "type": "object"
      },
      "purpose": "Validates that the implementation follows the architectural patterns specified in the PRD, ensuring consistency with the existing codebase",
      "type": "array"
    },
    "technical_debt_assessment": {
      "authoring_guidance": "Write 2-3 sentences assessing whether this implementation introduces, reduces, or maintains technical debt. Be honest about trade-offs.",
      "description_for_schema": "Overall assessment of technical debt introduced or addressed by this implementation",
      "purpose": "Evaluates whether the implementation introduces technical debt that could create maintenance burden in the future",
      "type": "string"
    }
  }
}