{
  "type": "object",
  "required": [
    "feature_name",
    "current_pain_points",
    "user_needs"
  ],
  "properties": {
    "current_pain_points": {
      "authoring_guidance": "Target 150-300 words. Focus on observable pain points and user frustrations. Do not include solution ideas. Use specific examples when possible.",
      "description_for_schema": "Describe current user experience pain points and frustrations without proposing solutions. Focus on what users struggle with today.",
      "purpose": "Captures the existing UX problems and frustrations users experience, establishing the 'problem space first' principle by documenting what's wrong before discussing solutions.",
      "type": "string"
    },
    "feature_name": {
      "authoring_guidance": "Keep under 30 characters. Use lowercase letters and hyphens only. This becomes part of the artifact filename.",
      "description_for_schema": "Short descriptive name for the feature (e.g., 'user-auth', 'payment-flow', 'dashboard-redesign'). Use lowercase with hyphens.",
      "purpose": "Provides a concise identifier for the feature being brainstormed, used in artifact naming and cross-references.",
      "type": "string"
    },
    "user_needs": {
      "authoring_guidance": "Target 100-200 words. Express needs as outcomes users want to achieve. Avoid describing specific features or UI elements. Frame needs in terms of user goals.",
      "description_for_schema": "Describe what users need to accomplish and the outcomes they require. Focus on needs and goals, not specific features or solutions.",
      "purpose": "Documents what users need to accomplish and the outcomes they require, providing clear requirements without prescribing implementation approaches.",
      "type": "string"
    }
  }
}