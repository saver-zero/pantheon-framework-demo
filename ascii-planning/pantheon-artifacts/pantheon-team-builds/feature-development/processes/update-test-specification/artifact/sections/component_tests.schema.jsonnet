{
  "type": "object",
  "required": [
    "component_test_specs"
  ],
  "properties": {
    "component_test_specs": {
      "authoring_guidance": "List 6-20 component tests typically. Include at least one test per component in wireframe registry. Cover: initial render, user interactions, state changes, error states. Reference component_mapping from implementation plan.",
      "description_for_schema": "List all component tests for UI elements, derived directly from the wireframe component registry and layout specification.",
      "items": {
        "properties": {
          "component_friendly_id": {
            "description_for_schema": "The component friendly ID from the wireframe (e.g., 'LoginForm', 'UserNav'). Must match wireframe component registry.",
            "purpose": "References the component ID from the wireframe registry, maintaining traceability from wireframe to test.",
            "type": "string"
          },
          "test_name": {
            "description_for_schema": "Clear, descriptive name for the test (e.g., 'LoginForm renders all fields', 'UserNav highlights active section').",
            "purpose": "Descriptive name for the component test.",
            "type": "string"
          },
          "test_scenario": {
            "authoring_guidance": "Target 40-80 words. Describe: initial render expectations, user interactions (clicks, inputs), expected UI changes, state transitions, error displays. Reference wireframe and flow diagram.",
            "description_for_schema": "Description of the component test scenario. Include: what is rendered, user interactions to test, expected UI changes, state transitions.",
            "purpose": "Describes what UI behavior is being validated.",
            "type": "string"
          }
        },
        "required": [
          "test_name",
          "component_friendly_id",
          "test_scenario"
        ],
        "type": "object"
      },
      "purpose": "Defines tests that validate UI components match wireframe specifications, implementing the 'wireframe-driven testing' principle by ensuring every wireframe element has test coverage.",
      "type": "array"
    }
  }
}