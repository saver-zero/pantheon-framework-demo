{
  "type": "object",
  "required": [
    "navigation_flow",
    "state_transitions"
  ],
  "properties": {
    "navigation_flow": {
      "authoring_guidance": "Target 15-40 lines. Use arrows to connect states/screens. Label each transition with the action that triggers it (e.g., 'Click Login', 'Submit Form'). Show all possible paths including error states.",
      "description_for_schema": "ASCII diagram showing how users navigate between screens, views, or states. Use arrows (->, <-) and labels to show transitions.",
      "purpose": "Shows how users move between screens or views using ASCII arrows and labels, establishing the interaction model that drives implementation.",
      "type": "string"
    },
    "state_transitions": {
      "authoring_guidance": "Target 100-200 words. List each state transition with its trigger condition. Include loading states, error states, and success states. Be specific about what changes visually.",
      "description_for_schema": "Describe state transitions within views (loading, error, success states) and conditions that trigger them.",
      "purpose": "Documents state changes within a single view, such as loading states, error displays, or progressive disclosure behavior.",
      "type": "string"
    }
  }
}