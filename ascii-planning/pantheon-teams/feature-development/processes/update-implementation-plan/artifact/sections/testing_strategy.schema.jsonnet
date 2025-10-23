{
  "type": "object",
  "required": [
    "test_coverage_overview",
    "critical_scenarios"
  ],
  "properties": {
    "critical_scenarios": {
      "authoring_guidance": "Target 150-300 words. List 5-10 critical scenarios. Include: happy path end-to-end, key error cases, permission/authorization checks, edge cases from clarifying questions, data integrity validations. Number each scenario.",
      "description_for_schema": "List the critical test scenarios that must pass for feature acceptance. Include happy paths, key error cases, and edge conditions.",
      "purpose": "Highlights the most important test scenarios that must pass for the feature to be considered complete, serving as acceptance criteria.",
      "type": "string"
    },
    "test_coverage_overview": {
      "authoring_guidance": "Target 150-250 words. Outline test strategy across layers: unit tests for business logic, integration tests for APIs, component tests for UI, E2E scenarios. Mention testing tools. Set coverage expectations. Note that detailed test specs will be in separate test-specification artifact.",
      "description_for_schema": "Describe the overall testing approach: types of tests needed (unit, integration, component, E2E), test coverage goals, testing tools/frameworks.",
      "purpose": "Provides high-level testing approach covering unit, integration, and component test layers that will be detailed in the test-specification artifact.",
      "type": "string"
    }
  }
}