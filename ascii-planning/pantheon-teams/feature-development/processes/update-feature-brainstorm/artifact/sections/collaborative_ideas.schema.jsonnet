{
  "type": "object",
  "required": [
    "exploration_round",
    "timestamp",
    "ai_suggestions",
    "operator_feedback"
  ],
  "properties": {
    "ai_suggestions": {
      "authoring_guidance": "Target 150-300 words per round. Suggest 2-4 distinct approaches or considerations. Explain trade-offs where relevant. Keep suggestions at concept level, not detailed implementation.",
      "description_for_schema": "AI-generated suggestions, alternative approaches, or considerations for solving the problem. Focus on high-level solution directions, not detailed implementation.",
      "purpose": "Captures AI-proposed approaches and considerations for this exploration round, building the collaborative dialogue that leads to shared understanding.",
      "type": "string"
    },
    "exploration_round": {
      "description_for_schema": "The iteration number for this round of collaborative exploration (1, 2, 3, etc.).",
      "purpose": "Tracks iteration number in the collaborative exploration process, showing evolution of shared understanding across multiple discussion rounds.",
      "type": "integer"
    },
    "operator_feedback": {
      "authoring_guidance": "Target 100-200 words per round. Clearly indicate which suggestions to pursue, which to discard, and what additional exploration is needed. This feedback guides the next exploration round.",
      "description_for_schema": "Operator's reaction to the AI suggestions. Include which ideas resonate, concerns raised, direction preferences, or requests for alternative approaches.",
      "purpose": "Records operator reactions to AI suggestions, capturing direction selection and refinement requests that guide the next exploration round.",
      "type": "string"
    },
    "timestamp": {
      "description_for_schema": "Timestamp of this exploration round in format: 2025-10-14 08:36 PM PDT",
      "purpose": "Records when each exploration round occurred, providing temporal context for decision evolution.",
      "type": "string"
    }
  }
}