{
  "type": "object",
  "properties": {
    "core_features": {
      "authoring_guidance": "List only features absolutely required to validate the core concept. Be ruthless - what's the minimum to prove this works?",
      "description_for_schema": "The essential features that must be included in the MVP to prove the concept",
      "items": {
        "type": "string"
      },
      "maxItems": 8,
      "purpose": "The ruthlessly scoped list of essential features that define this MVP. Serves as the boundary for implementation to prevent scope creep and maintain 20-30 day delivery constraint.",
      "type": "array"
    },
    "product_name": {
      "authoring_guidance": "Keep it simple and memorable. This will be referenced throughout documentation and code.",
      "description_for_schema": "The name of the MVP product",
      "purpose": "The clear, concise name for the MVP product being built. Provides immediate identity and reference point for all subsequent documentation and communication.",
      "type": "string"
    },
    "success_criteria": {
      "authoring_guidance": "Focus on functional completion and validation readiness, not perfection. What must work for users to try it?",
      "description_for_schema": "Clear criteria for when the MVP is considered complete and ready for validation",
      "purpose": "Defines what 'done' looks like for this MVP. Provides clear completion gate and prevents over-engineering or endless refinement.",
      "type": "string"
    },
    "target_users": {
      "authoring_guidance": "Be specific about who these users are, what they're trying to accomplish, and relevant constraints they face.",
      "description_for_schema": "Description of the primary users who will use this product and their key characteristics",
      "purpose": "Defines who will use this product and their key characteristics. Ensures implementation decisions align with actual user needs and contexts.",
      "type": "string"
    },
    "vision_statement": {
      "authoring_guidance": "Focus on the problem and outcome, not implementation details. Aim for 2-3 sentences that capture the essence.",
      "description_for_schema": "A clear statement of what problem this product solves and the value it delivers to users",
      "purpose": "The core problem being solved and value being delivered. Anchors all technical decisions to user outcomes and prevents feature drift during implementation.",
      "type": "string"
    }
  }
}