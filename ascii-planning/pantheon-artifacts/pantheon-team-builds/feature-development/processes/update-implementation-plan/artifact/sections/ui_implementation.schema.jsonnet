{
  "type": "object",
  "required": [
    "component_mapping",
    "style_patterns",
    "interaction_details"
  ],
  "properties": {
    "component_mapping": {
      "authoring_guidance": "Include all components from wireframe component registry. Maintain exact friendly ID spelling. Reference API endpoints from backend section.",
      "description_for_schema": "Map each component from the wireframe component registry to implementation details, using the friendly IDs established in the wireframe.",
      "items": {
        "properties": {
          "friendly_id": {
            "description_for_schema": "The component friendly ID from the wireframe (e.g., 'LoginForm', 'UserNav').",
            "purpose": "References the component ID from the wireframe registry.",
            "type": "string"
          },
          "implementation_notes": {
            "authoring_guidance": "Target 50-100 words per component. Specify: component type/library, key props, data source (API endpoint or state), event handlers, validation requirements.",
            "description_for_schema": "Implementation details for this component: technology/library to use, props/configuration, data sources, event handlers.",
            "purpose": "Provides implementation guidance for this specific component.",
            "type": "string"
          }
        },
        "required": [
          "friendly_id",
          "implementation_notes"
        ],
        "type": "object"
      },
      "purpose": "Maps each wireframe component to specific implementation guidance, using friendly IDs to maintain traceability from wireframe through code.",
      "type": "array"
    },
    "interaction_details": {
      "authoring_guidance": "Target 150-300 words. Cover: loading indicators, error message display, form validation feedback, animations/transitions, keyboard navigation, focus management, screen reader considerations. Reference state transitions from wireframe.",
      "description_for_schema": "Describe interactive behaviors: loading states, error displays, animations, transitions, keyboard interactions, accessibility considerations.",
      "purpose": "Specifies interactive behaviors not fully captured in the wireframe, such as loading states, animations, and error displays.",
      "type": "string"
    },
    "style_patterns": {
      "authoring_guidance": "Target 100-200 words. Reference existing UI patterns to follow. Mention design system components to reuse. Specify theme variables or CSS classes. Note any new patterns being introduced.",
      "description_for_schema": "Describe how the UI should align with existing style patterns, design system, or component library. Include specific class names, theme variables, or reusable components.",
      "purpose": "Ensures UI implementation aligns with existing design system and visual patterns in the codebase.",
      "type": "string"
    }
  }
}