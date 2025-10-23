{
  "type": "object",
  "required": [
    "priority_actions",
    "merge_recommendation_status",
    "merge_recommendation_justification",
    "merge_conditions"
  ],
  "properties": {
    "merge_conditions": {
      "authoring_guidance": "List 2-5 specific, verifiable conditions. Examples: 'Address all critical issues', 'Add tests for edge cases', 'Update documentation'.",
      "description_for_schema": "Specific conditions that must be met before merging",
      "items": {
        "type": "string"
      },
      "purpose": "Defines specific requirements that must be satisfied before merging, creating a clear checklist for the operator",
      "type": "array"
    },
    "merge_recommendation_justification": {
      "authoring_guidance": "Write 2-3 sentences justifying the recommendation. Reference key concerns or positive findings that informed the decision.",
      "description_for_schema": "Explanation of the merge recommendation based on consolidated feedback",
      "purpose": "Explains the reasoning behind the merge recommendation, synthesizing the key findings from the review consolidation",
      "type": "string"
    },
    "merge_recommendation_status": {
      "authoring_guidance": "Choose one: 'Approve' (ready to merge as-is), 'Approve with Conditions' (can merge after minor fixes), 'Request Changes' (needs rework before merge).",
      "description_for_schema": "Recommendation on whether to merge this PR (Approve/Approve with Conditions/Request Changes)",
      "purpose": "Provides a clear gate decision on whether the PR should be merged, merged with conditions, or requires rework",
      "type": "string"
    },
    "optional_improvements": {
      "authoring_guidance": "Optional. List 2-5 improvements that would be beneficial but aren't blockers. These are typically addressed in future refactoring.",
      "description_for_schema": "Optional improvements that could enhance the code but aren't required",
      "items": {
        "properties": {
          "description": {
            "description_for_schema": "Description of the improvement",
            "type": "string"
          },
          "title": {
            "description_for_schema": "Brief title for the improvement",
            "type": "string"
          }
        },
        "required": [
          "title",
          "description"
        ],
        "type": "object"
      },
      "purpose": "Captures nice-to-have suggestions that could improve code quality but are not essential for merging",
      "type": "array"
    },
    "priority_actions": {
      "authoring_guidance": "List 2-6 specific actions ordered by priority. Focus on actions that address critical or widely-agreed-upon concerns.",
      "description_for_schema": "Prioritized list of recommended actions based on reviewer feedback",
      "items": {
        "properties": {
          "estimated_effort": {
            "description_for_schema": "Estimated effort to complete this action (Small/Medium/Large)",
            "type": "string"
          },
          "priority": {
            "description_for_schema": "Priority level (Critical/High/Medium)",
            "type": "string"
          },
          "rationale": {
            "description_for_schema": "Why this action is recommended",
            "type": "string"
          },
          "supporting_reviewers": {
            "description_for_schema": "Which reviewers raised concerns related to this action",
            "items": {
              "type": "string"
            },
            "type": "array"
          },
          "title": {
            "description_for_schema": "Brief title for the recommended action",
            "type": "string"
          }
        },
        "required": [
          "title",
          "priority",
          "rationale",
          "estimated_effort",
          "supporting_reviewers"
        ],
        "type": "object"
      },
      "purpose": "Distills the most important reviewer feedback into specific, actionable recommendations that the operator can execute or delegate",
      "type": "array"
    }
  }
}