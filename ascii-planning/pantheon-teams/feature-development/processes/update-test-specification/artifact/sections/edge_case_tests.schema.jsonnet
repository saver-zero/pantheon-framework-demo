{
  "type": "object",
  "required": [
    "edge_case_test_specs"
  ],
  "properties": {
    "edge_case_test_specs": {
      "authoring_guidance": "List 5-12 edge case tests typically. Source edge cases from: clarifying questions, security considerations, data validation requirements, state transitions. Cover: empty/null data, invalid formats, boundary values, network failures, permission denials.",
      "description_for_schema": "List all edge case tests covering boundary conditions, error scenarios, and unusual inputs identified during brainstorming and planning.",
      "items": {
        "properties": {
          "edge_case_category": {
            "description_for_schema": "Category of edge case (e.g., 'empty data', 'invalid input', 'network failure', 'permission denied', 'race condition').",
            "purpose": "Categorizes the type of edge case being tested.",
            "type": "string"
          },
          "test_name": {
            "description_for_schema": "Clear, descriptive name for the test (e.g., 'handles empty user list gracefully', 'rejects malformed email addresses').",
            "purpose": "Descriptive name for the edge case test.",
            "type": "string"
          },
          "test_scenario": {
            "authoring_guidance": "Target 40-80 words. Describe: what triggers this edge case, expected system behavior, error messages or fallbacks, user experience considerations.",
            "description_for_schema": "Description of the edge case scenario and expected system behavior. Include trigger condition and expected graceful handling.",
            "purpose": "Describes the edge case scenario and how the system should handle it.",
            "type": "string"
          }
        },
        "required": [
          "test_name",
          "edge_case_category",
          "test_scenario"
        ],
        "type": "object"
      },
      "purpose": "Defines tests for boundary conditions, error scenarios, and unusual inputs that could break the system if not handled properly.",
      "type": "array"
    }
  }
}