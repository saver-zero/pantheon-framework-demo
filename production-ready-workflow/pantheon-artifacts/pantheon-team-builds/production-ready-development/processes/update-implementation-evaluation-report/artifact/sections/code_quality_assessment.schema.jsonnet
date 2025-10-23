{
  "type": "object",
  "required": [
    "code_structure_assessment",
    "maintainability_items",
    "code_standards",
    "readability_assessment"
  ],
  "properties": {
    "code_standards": {
      "authoring_guidance": "List 3-5 relevant coding standards for the project. Examples: naming conventions, formatting, error handling patterns, documentation standards.",
      "description_for_schema": "Assessment of compliance with coding standards and conventions",
      "items": {
        "properties": {
          "compliance": {
            "description_for_schema": "Assessment of compliance with this standard",
            "type": "string"
          },
          "standard": {
            "description_for_schema": "The coding standard being assessed",
            "type": "string"
          }
        },
        "required": [
          "standard",
          "compliance"
        ],
        "type": "object"
      },
      "purpose": "Verifies compliance with project-specific coding standards and conventions, ensuring consistency across the codebase",
      "type": "array"
    },
    "code_structure_assessment": {
      "authoring_guidance": "Write 2-3 sentences assessing code organization. Consider: logical separation of concerns, appropriate use of functions/classes, clear structure.",
      "description_for_schema": "Assessment of code organization, structure, and logical flow",
      "purpose": "Evaluates the organization and structure of the code, assessing whether it is logically organized and easy to navigate",
      "type": "string"
    },
    "maintainability_items": {
      "authoring_guidance": "Include 3-5 maintainability aspects such as: complexity, modularity, coupling, cohesion, extensibility.",
      "description_for_schema": "Assessment of code maintainability across multiple dimensions",
      "items": {
        "properties": {
          "aspect": {
            "description_for_schema": "The maintainability aspect being assessed",
            "type": "string"
          },
          "assessment": {
            "description_for_schema": "Assessment of this aspect",
            "type": "string"
          }
        },
        "required": [
          "aspect",
          "assessment"
        ],
        "type": "object"
      },
      "purpose": "Assesses multiple dimensions of maintainability to ensure the code will be easy to modify and extend in the future",
      "type": "array"
    },
    "readability_assessment": {
      "authoring_guidance": "Write 2-3 sentences assessing code readability. Consider: variable naming, comment quality, complexity, documentation.",
      "description_for_schema": "Assessment of code readability and documentation quality",
      "purpose": "Evaluates whether the code is easy to understand for other developers, including quality of comments and documentation",
      "type": "string"
    }
  }
}