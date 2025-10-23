{
  "type": "object",
  "required": [
    "acceptance_criteria",
    "minimum_test_coverage",
    "required_tests",
    "definition_of_done"
  ],
  "properties": {
    "acceptance_criteria": {
      "authoring_guidance": "List 3-8 criteria. Each should be specific and verifiable. Use format 'System does X when Y' rather than vague statements.",
      "description_for_schema": "Specific, testable criteria that define when the implementation is complete",
      "items": {
        "type": "string"
      },
      "purpose": "Defines the functional outcomes that must be achieved for the implementation to be considered complete, providing clear success metrics",
      "type": "array"
    },
    "definition_of_done": {
      "authoring_guidance": "List 4-8 items covering tests, documentation, code quality, and any other requirements. This is the final gate before submission.",
      "description_for_schema": "Complete checklist of items that must be satisfied before the implementation is done",
      "items": {
        "type": "string"
      },
      "purpose": "Provides a comprehensive checklist of all technical and quality requirements that must be satisfied before the work can be considered complete",
      "type": "array"
    },
    "manual_verification_steps": {
      "authoring_guidance": "Optional. Include 2-5 steps only if manual testing is needed to complement automated tests. Focus on user-facing behavior.",
      "description_for_schema": "Manual steps the operator should perform to verify the implementation works correctly",
      "items": {
        "type": "string"
      },
      "purpose": "Describes hands-on testing that the operator should perform to verify the implementation works as intended in real-world usage",
      "type": "array"
    },
    "minimum_test_coverage": {
      "authoring_guidance": "Be specific. Examples: 'All new functions must have unit tests', '80% line coverage for new code', 'Happy path and error cases covered'.",
      "description_for_schema": "The minimum acceptable test coverage for this implementation",
      "purpose": "Establishes the quality bar for test coverage, ensuring the implementation includes sufficient automated verification",
      "type": "string"
    },
    "required_tests": {
      "authoring_guidance": "List 3-8 specific tests. Be concrete about what each test should verify. Focus on critical paths and edge cases.",
      "description_for_schema": "Specific tests that must be written and passing",
      "items": {
        "type": "string"
      },
      "purpose": "Enumerates the specific test scenarios that must be implemented, ensuring critical paths are verified",
      "type": "array"
    }
  }
}