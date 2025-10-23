{
  "type": "object",
  "required": [
    "overall_assessment",
    "recommended_actions",
    "production_readiness_status",
    "production_readiness_justification"
  ],
  "properties": {
    "critical_issues": {
      "authoring_guidance": "Optional. Only include issues that are true blockers. Examples: failing tests, security vulnerabilities, broken functionality.",
      "description_for_schema": "Issues that must be addressed before proceeding (bugs, test failures, major architectural violations)",
      "items": {
        "type": "string"
      },
      "purpose": "Identifies showstopper issues that must be fixed before the implementation can proceed to the next phase",
      "type": "array"
    },
    "low_issues": {
      "authoring_guidance": "Optional. Include minor style issues or small improvements. These are typically deferred or addressed in future refactoring.",
      "description_for_schema": "Minor improvements or polish items",
      "items": {
        "type": "string"
      },
      "purpose": "Captures minor improvements that would be nice to have but are not essential for code quality or functionality",
      "type": "array"
    },
    "medium_issues": {
      "authoring_guidance": "Optional. Include issues that impact maintainability or quality but don't prevent functionality. Aim for 2-5 items if any exist.",
      "description_for_schema": "Important issues that should be addressed but aren't blockers",
      "items": {
        "type": "string"
      },
      "purpose": "Documents important issues that should be addressed to maintain code quality, but don't prevent the implementation from functioning",
      "type": "array"
    },
    "overall_assessment": {
      "authoring_guidance": "Write 2-3 sentences summarizing the overall quality. Be balanced but honest about strengths and weaknesses.",
      "description_for_schema": "High-level summary of the implementation quality and readiness",
      "purpose": "Provides a high-level summary of the implementation quality, giving the operator immediate context before diving into details",
      "type": "string"
    },
    "production_readiness_justification": {
      "authoring_guidance": "Write 2-3 sentences justifying the readiness status. Reference key findings from earlier sections.",
      "description_for_schema": "Explanation of why the implementation is or isn't production ready",
      "purpose": "Explains the reasoning behind the production readiness decision, providing transparency for the operator's final decision",
      "type": "string"
    },
    "production_readiness_status": {
      "authoring_guidance": "Choose one: 'Ready' (no blockers, high quality), 'Ready with Minor Issues' (functional but has non-critical issues), 'Not Ready' (has critical issues).",
      "description_for_schema": "Overall production readiness status (Ready/Ready with Minor Issues/Not Ready)",
      "purpose": "Provides a clear gate decision on whether the implementation is ready for production or requires additional work",
      "type": "string"
    },
    "recommended_actions": {
      "authoring_guidance": "List 3-6 specific, actionable recommendations ordered by priority. Each should be clear about what to do and why.",
      "description_for_schema": "Prioritized list of recommended actions to address identified issues",
      "items": {
        "properties": {
          "action": {
            "description_for_schema": "Specific action to take",
            "type": "string"
          },
          "priority": {
            "description_for_schema": "Priority level (Critical/Medium/Low)",
            "type": "string"
          }
        },
        "required": [
          "priority",
          "action"
        ],
        "type": "object"
      },
      "purpose": "Provides prioritized, actionable recommendations that guide the next iteration of implementation improvements",
      "type": "array"
    }
  }
}