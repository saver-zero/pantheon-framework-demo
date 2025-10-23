{
  "type": "object",
  "required": [
    "component_list"
  ],
  "properties": {
    "component_list": {
      "authoring_guidance": "List every component shown in the ASCII wireframe. Aim for 5-20 components for typical features. Each component should be identifiable in the ASCII layout. Order components by visual hierarchy (top to bottom, left to right).",
      "description_for_schema": "List of all components shown in the wireframe with their friendly IDs and descriptions.",
      "items": {
        "properties": {
          "component_type": {
            "description_for_schema": "The type of UI component (e.g., 'Form', 'Button', 'Modal', 'List', 'Card', 'Navigation').",
            "purpose": "Categorizes the component by its UI pattern type, helping implementers understand the expected behavior and structure.",
            "type": "string"
          },
          "description": {
            "authoring_guidance": "Target 20-50 words. Explain the component's purpose and key behaviors. Mention any notable interactions or states.",
            "description_for_schema": "Brief description of what this component does and its role in the interface.",
            "purpose": "Explains the component's purpose and behavior, providing context that the friendly ID alone cannot convey.",
            "type": "string"
          },
          "friendly_id": {
            "authoring_guidance": "Use PascalCase. Keep concise but descriptive. This ID will be used in code, tests, and planning docs.",
            "description_for_schema": "Human-readable component identifier (e.g., 'LoginForm', 'UserNav', 'ProductCard'). Use PascalCase.",
            "purpose": "Human-readable identifier for the component used consistently across all downstream artifacts and code.",
            "type": "string"
          },
          "location": {
            "description_for_schema": "Where this component appears in the layout (e.g., 'Top of page', 'Main content area', 'Sidebar').",
            "purpose": "Specifies where the component appears in the wireframe, helping readers connect the registry entry to the visual layout.",
            "type": "string"
          }
        },
        "required": [
          "friendly_id",
          "component_type",
          "description",
          "location"
        ],
        "type": "object"
      },
      "purpose": "Establishes canonical naming for all UI components shown in the wireframe, ensuring consistent references throughout planning, implementation, and testing.",
      "type": "array"
    }
  }
}