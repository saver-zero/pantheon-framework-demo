{
  "type": "object",
  "properties": {
    "mvp_completion": {
      "description_for_schema": "Overall criteria for MVP completion",
      "properties": {
        "functional_requirements": {
          "description_for_schema": "The functional requirements that must be met for MVP completion",
          "items": {
            "type": "string"
          },
          "maxItems": 10,
          "purpose": "Core functionality that must work for MVP to be viable.",
          "type": "array"
        },
        "validation_readiness": {
          "description_for_schema": "Description of when the MVP is ready for user validation",
          "purpose": "What state the product must be in to share with real users for feedback.",
          "type": "string"
        }
      },
      "purpose": "The overall success criteria for the entire MVP. Defines when development is complete and product is ready for validation.",
      "required": [
        "functional_requirements",
        "validation_readiness"
      ],
      "type": "object"
    },
    "phase_criteria": {
      "authoring_guidance": "Define objective, testable criteria. Focus on functional completeness, not perfection. What must work to call this phase done?",
      "description_for_schema": "Completion criteria for each development phase",
      "items": {
        "properties": {
          "criteria": {
            "description_for_schema": "The criteria that must be met to complete this phase",
            "items": {
              "type": "string"
            },
            "maxItems": 8,
            "purpose": "The specific conditions that must be met to consider this phase complete.",
            "type": "array"
          },
          "phase_name": {
            "description_for_schema": "The phase name",
            "purpose": "The phase name for readability.",
            "type": "string"
          },
          "phase_number": {
            "description_for_schema": "The phase number these criteria apply to",
            "purpose": "Links criteria to its corresponding phase.",
            "type": "integer"
          }
        },
        "required": [
          "phase_number",
          "phase_name",
          "criteria"
        ],
        "type": "object"
      },
      "purpose": "Success criteria for each phase. Prevents endless refinement and provides clear gates for moving to next phase.",
      "type": "array"
    }
  }
}