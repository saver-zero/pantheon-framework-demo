{
  "type": "object",
  "required": [
    "prd_id",
    "all_tests_passing",
    "coverage_level",
    "coverage_details",
    "test_quality_items"
  ],
  "properties": {
    "all_tests_passing": {
      "authoring_guidance": "Answer with 'Yes' or 'No'. If any tests are failing, this must be 'No'.",
      "description_for_schema": "Whether all tests are currently passing (Yes/No)",
      "purpose": "Provides immediate visibility into whether the implementation meets the baseline quality requirement of passing tests",
      "type": "string"
    },
    "coverage_details": {
      "authoring_guidance": "Write 2-4 sentences describing the scope of test coverage. Be specific about which scenarios are tested.",
      "description_for_schema": "Detailed explanation of test coverage including what is covered and what might be missing",
      "purpose": "Provides detailed analysis of what is and isn't covered by tests, giving the operator visibility into test comprehensiveness",
      "type": "string"
    },
    "coverage_gaps": {
      "authoring_guidance": "Optional. List specific gaps if any exist. Be concrete about what scenarios are untested.",
      "description_for_schema": "Specific scenarios or code paths that lack test coverage",
      "items": {
        "type": "string"
      },
      "purpose": "Identifies specific scenarios or code paths that lack test coverage, highlighting areas where additional testing is needed",
      "type": "array"
    },
    "coverage_level": {
      "authoring_guidance": "Choose one: Excellent (exceeds requirements), Good (meets requirements fully), Adequate (meets minimum requirements), Insufficient (below requirements).",
      "description_for_schema": "Overall assessment of test coverage (Excellent/Good/Adequate/Insufficient)",
      "purpose": "Summarizes the overall adequacy of test coverage, providing a quick assessment of test quality",
      "type": "string"
    },
    "failed_tests": {
      "authoring_guidance": "Optional. Only include if all_tests_passing is 'No'. List each failed test with a clear explanation of the failure.",
      "description_for_schema": "List of tests that are currently failing",
      "items": {
        "properties": {
          "name": {
            "description_for_schema": "The name of the failing test",
            "type": "string"
          },
          "reason": {
            "description_for_schema": "Brief explanation of why the test is failing",
            "type": "string"
          }
        },
        "required": [
          "name",
          "reason"
        ],
        "type": "object"
      },
      "purpose": "Documents specific test failures that must be addressed before the implementation can be considered complete",
      "type": "array"
    },
    "prd_id": {
      "description_for_schema": "The ID of the issue-specific PRD that this implementation is based on",
      "purpose": "Links this evaluation report back to the original PRD that defined the requirements, enabling traceability throughout the development lifecycle",
      "type": "string"
    },
    "test_quality_items": {
      "authoring_guidance": "Include 3-5 quality aspects such as: test clarity, edge case coverage, maintainability, test independence, assertion quality.",
      "description_for_schema": "Analysis of test quality across multiple dimensions",
      "items": {
        "properties": {
          "aspect": {
            "description_for_schema": "The quality aspect being assessed (e.g., 'Edge Case Coverage', 'Test Clarity')",
            "type": "string"
          },
          "assessment": {
            "description_for_schema": "Assessment of this aspect and any concerns",
            "type": "string"
          }
        },
        "required": [
          "aspect",
          "assessment"
        ],
        "type": "object"
      },
      "purpose": "Evaluates the quality of the tests themselves, ensuring they are meaningful and maintainable rather than just hitting coverage metrics",
      "type": "array"
    }
  }
}