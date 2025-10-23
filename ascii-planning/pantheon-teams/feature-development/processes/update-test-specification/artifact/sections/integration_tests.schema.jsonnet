{
  "type": "object",
  "required": [
    "integration_test_specs"
  ],
  "properties": {
    "integration_test_specs": {
      "authoring_guidance": "List 5-15 integration tests typically. Cover: all API endpoints from implementation plan, CRUD operations, service integrations, database transactions. Reference API endpoints and service integration sections.",
      "description_for_schema": "List all integration tests for API endpoints and service interactions, derived from backend architecture and database design sections.",
      "items": {
        "properties": {
          "endpoint_under_test": {
            "description_for_schema": "The API endpoint or service integration being tested (e.g., 'POST /api/users', 'UserService.createUser()').",
            "purpose": "Identifies which API endpoint or service integration is being tested.",
            "type": "string"
          },
          "test_name": {
            "description_for_schema": "Clear, descriptive name for the test (e.g., 'POST /api/users creates user in database', 'GET /api/products filters by category').",
            "purpose": "Descriptive name for the integration test.",
            "type": "string"
          },
          "test_scenario": {
            "authoring_guidance": "Target 50-100 words. Describe: request payload, expected response status and body, database state changes, external service calls. Cover successful cases and key error cases.",
            "description_for_schema": "Description of the integration test scenario. Include: request details, expected database changes, response validation, service interactions.",
            "purpose": "Describes the integration scenario and expected outcomes.",
            "type": "string"
          }
        },
        "required": [
          "test_name",
          "endpoint_under_test",
          "test_scenario"
        ],
        "type": "object"
      },
      "purpose": "Defines tests that validate interactions between system components, such as API endpoints with databases or external services.",
      "type": "array"
    }
  }
}