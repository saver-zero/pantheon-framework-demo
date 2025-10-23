{
  "type": "object",
  "required": [
    "feature_name",
    "source_plan_id",
    "source_wireframe_id",
    "unit_test_specs"
  ],
  "properties": {
    "feature_name": {
      "authoring_guidance": "Keep under 30 characters. Use lowercase letters and hyphens only. Should match the feature_name from previous artifacts.",
      "description_for_schema": "Short descriptive name for the feature (e.g., 'user-auth', 'payment-flow', 'dashboard-redesign'). Use lowercase with hyphens.",
      "purpose": "Identifies the feature being tested, maintaining traceability through the complete workflow chain.",
      "type": "string"
    },
    "source_plan_id": {
      "description_for_schema": "The ID of the implementation-plan artifact that this test specification is based on (e.g., 'IP01', 'IP12').",
      "purpose": "Creates explicit traceability link to the implementation plan that defines what this test specification validates.",
      "type": "string"
    },
    "source_wireframe_id": {
      "description_for_schema": "The ID of the ascii-wireframe artifact that this test specification validates (e.g., 'AW01', 'AW12').",
      "purpose": "Creates explicit traceability link to the wireframe that serves as the visual contract being validated by tests.",
      "type": "string"
    },
    "unit_test_specs": {
      "authoring_guidance": "List 8-20 unit tests typically. Cover: core business logic, validation functions, calculations, data transformations. Reference business logic section from implementation plan. Group related tests together.",
      "description_for_schema": "List all unit tests for business logic components, derived from backend architecture and business logic sections of the implementation plan.",
      "items": {
        "properties": {
          "component_under_test": {
            "description_for_schema": "The function, method, class, or module being tested (e.g., 'validateEmail()', 'PriceCalculator.calculateTotal()').",
            "purpose": "Identifies which function, method, or module is being tested.",
            "type": "string"
          },
          "test_name": {
            "description_for_schema": "Clear, descriptive name for the test (e.g., 'validates email format', 'calculates total with tax correctly').",
            "purpose": "Descriptive name for the test case.",
            "type": "string"
          },
          "test_scenario": {
            "authoring_guidance": "Target 30-80 words. Describe: input values, expected output, expected behavior. Be specific about edge cases if applicable.",
            "description_for_schema": "Description of what is being tested and expected outcome. Include inputs and expected outputs.",
            "purpose": "Describes the specific scenario and expected behavior.",
            "type": "string"
          }
        },
        "required": [
          "test_name",
          "component_under_test",
          "test_scenario"
        ],
        "type": "object"
      },
      "purpose": "Defines isolated tests for business logic functions and methods, ensuring each unit of logic operates correctly in isolation.",
      "type": "array"
    }
  }
}