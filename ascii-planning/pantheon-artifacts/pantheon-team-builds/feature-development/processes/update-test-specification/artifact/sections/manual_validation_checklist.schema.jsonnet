{
  "type": "object",
  "required": [
    "manual_checks"
  ],
  "properties": {
    "manual_checks": {
      "authoring_guidance": "List 5-10 manual checks typically. Include: visual layout verification against wireframe, data integrity checks, cross-browser testing, accessibility checks, usability validation, performance testing, security verification. These are tests that require human judgment beyond automated checks.",
      "description_for_schema": "List all manual testing steps and validations that the operator must perform after implementation and automated testing.",
      "items": {
        "properties": {
          "check_description": {
            "authoring_guidance": "Target 50-100 words. Describe: what to test, how to perform the check, what to look for, acceptance criteria. Be specific about edge cases to manually verify.",
            "description_for_schema": "Detailed description of what to manually test and how to verify it. Include acceptance criteria.",
            "purpose": "Describes what to manually verify and why it requires human judgment.",
            "type": "string"
          },
          "check_name": {
            "description_for_schema": "Clear name for the manual validation step (e.g., 'Verify visual layout matches wireframe', 'Check database data integrity').",
            "purpose": "Descriptive name for the manual check.",
            "type": "string"
          }
        },
        "required": [
          "check_name",
          "check_description"
        ],
        "type": "object"
      },
      "purpose": "Defines manual validation steps that require human judgment and cannot be fully automated, following the workflow's principle of mandatory manual validation.",
      "type": "array"
    }
  }
}