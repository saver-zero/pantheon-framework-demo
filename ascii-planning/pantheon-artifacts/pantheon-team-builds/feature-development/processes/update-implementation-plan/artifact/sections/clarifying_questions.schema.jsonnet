{
  "type": "object",
  "required": [
    "feature_name",
    "source_wireframe_id",
    "questions"
  ],
  "properties": {
    "feature_name": {
      "authoring_guidance": "Keep under 30 characters. Use lowercase letters and hyphens only. Should match the feature_name from wireframe and brainstorming artifacts.",
      "description_for_schema": "Short descriptive name for the feature (e.g., 'user-auth', 'payment-flow', 'dashboard-redesign'). Use lowercase with hyphens.",
      "purpose": "Identifies the feature being planned, maintaining traceability through the workflow chain.",
      "type": "string"
    },
    "questions": {
      "authoring_guidance": "Target 5-15 questions. Focus on assumptions that would cause problems if wrong. Ask about: data sources and formats, error handling strategies, authentication/authorization requirements, performance expectations, edge cases visible in wireframe, integration specifics, existing code that might conflict. Number each question for easy reference in answers.",
      "description_for_schema": "List of clarifying questions that expose assumptions, edge cases, or ambiguities in the wireframe or requirements. Ask about technical constraints, edge cases, error handling, data sources, and integration details.",
      "purpose": "Exposes hidden assumptions and edge cases through deliberate questioning, following the 'plan until it hurts' principle by forcing explicit consideration of ambiguities.",
      "type": "string"
    },
    "source_wireframe_id": {
      "description_for_schema": "The ID of the ascii-wireframe artifact that this plan is based on (e.g., 'AW01', 'AW12').",
      "purpose": "Creates explicit traceability link to the wireframe artifact that this plan implements.",
      "type": "string"
    }
  }
}