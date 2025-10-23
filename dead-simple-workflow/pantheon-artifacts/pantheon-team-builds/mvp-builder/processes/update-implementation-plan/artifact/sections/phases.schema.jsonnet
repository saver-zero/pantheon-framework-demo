{
  "type": "object",
  "properties": {
    "phases": {
      "authoring_guidance": "Define 4-7 phases that represent natural progression from setup through delivery. Each phase should represent a meaningful milestone.",
      "description_for_schema": "The development phases that organize implementation work into logical stages",
      "items": {
        "properties": {
          "phase_description": {
            "description_for_schema": "Description of what this phase accomplishes",
            "purpose": "What gets accomplished in this phase. Guides which steps belong here and what completing this phase means.",
            "type": "string"
          },
          "phase_name": {
            "description_for_schema": "The name of this development phase (e.g., 'Initial Setup', 'Core Features', 'Polish & Deploy')",
            "purpose": "The descriptive name for this development stage.",
            "type": "string"
          },
          "phase_number": {
            "description_for_schema": "The sequential number of this phase (1, 2, 3, etc.)",
            "purpose": "Sequential identifier for ordering phases.",
            "type": "integer"
          }
        },
        "required": [
          "phase_number",
          "phase_name",
          "phase_description"
        ],
        "type": "object"
      },
      "maxItems": 10,
      "purpose": "The logical groupings that organize implementation steps into coherent stages. Provides high-level roadmap and helps operators select meaningful chunk boundaries.",
      "type": "array"
    }
  }
}