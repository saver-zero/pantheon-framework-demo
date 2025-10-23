{
  "type": "object",
  "properties": {
    "steps_by_phase": {
      "authoring_guidance": "For each phase, list specific, actionable steps. Aim for steps that take 15-30 minutes each. Group naturally into 3-5 step chunks.",
      "description_for_schema": "Implementation steps organized by their corresponding phase",
      "items": {
        "properties": {
          "phase_name": {
            "description_for_schema": "The phase name (should match the phases section)",
            "purpose": "The phase name for readability and context.",
            "type": "string"
          },
          "phase_number": {
            "description_for_schema": "The phase number these steps belong to",
            "purpose": "Links these steps to their parent phase.",
            "type": "integer"
          },
          "steps": {
            "description_for_schema": "The specific implementation steps for this phase",
            "items": {
              "properties": {
                "description": {
                  "description_for_schema": "Clear description of what needs to be implemented",
                  "purpose": "What needs to be implemented. Must be specific enough for AI to execute without ambiguity.",
                  "type": "string"
                },
                "status": {
                  "description_for_schema": "Current status of this step",
                  "purpose": "Tracks completion state. Updated after each implementation chunk.",
                  "type": "string"
                },
                "step_number": {
                  "description_for_schema": "Step identifier (e.g., '1.1', '2.3')",
                  "purpose": "Unique identifier for this step (e.g., '1.1', '1.2' for phase 1 steps).",
                  "type": "string"
                }
              },
              "required": [
                "step_number",
                "description",
                "status"
              ],
              "type": "object"
            },
            "purpose": "The actual implementation tasks for this phase. Each step should be clear, actionable, and sized for AI execution.",
            "type": "array"
          }
        },
        "required": [
          "phase_number",
          "phase_name",
          "steps"
        ],
        "type": "object"
      },
      "purpose": "The complete breakdown of implementation work organized by phase. This is the executable task list that operators use to select 3-5 step chunks.",
      "type": "array"
    }
  }
}