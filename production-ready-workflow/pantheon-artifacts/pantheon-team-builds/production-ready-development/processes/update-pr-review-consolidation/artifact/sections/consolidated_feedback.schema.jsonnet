{
  "type": "object",
  "required": [
    "pr_number",
    "review_sources",
    "feedback_themes",
    "severity_distribution"
  ],
  "properties": {
    "feedback_themes": {
      "authoring_guidance": "Group related comments into 3-6 themes. Common themes: error handling, test coverage, naming, architecture, performance.",
      "description_for_schema": "Feedback organized by thematic categories",
      "items": {
        "properties": {
          "comment_count": {
            "description_for_schema": "Number of comments related to this theme",
            "type": "integer"
          },
          "representative_comments": {
            "description_for_schema": "2-3 representative comments that illustrate this theme",
            "items": {
              "type": "string"
            },
            "type": "array"
          },
          "summary": {
            "description_for_schema": "Summary of the feedback within this theme",
            "type": "string"
          },
          "theme_name": {
            "description_for_schema": "Name of the theme (e.g., 'Error Handling', 'Test Coverage')",
            "type": "string"
          }
        },
        "required": [
          "theme_name",
          "comment_count",
          "summary",
          "representative_comments"
        ],
        "type": "object"
      },
      "purpose": "Groups similar comments together to identify patterns and common concerns across multiple reviewers",
      "type": "array"
    },
    "pr_number": {
      "description_for_schema": "The pull request number or identifier being reviewed",
      "purpose": "Identifies the specific pull request being reviewed, enabling traceability between the consolidation report and the external PR system",
      "type": "string"
    },
    "prd_reference": {
      "authoring_guidance": "Optional. Include the PRD ID if this PR is implementing a feature with a corresponding PRD.",
      "description_for_schema": "Reference to the associated issue-specific PRD if available",
      "purpose": "Links back to the original PRD to provide context for whether reviewer feedback aligns with the original intent",
      "type": "string"
    },
    "review_sources": {
      "authoring_guidance": "List each AI reviewer that provided feedback. Typical sources: Claude Code, CodeRabbit, GitHub Copilot, etc.",
      "description_for_schema": "List of AI review sources and their comment counts",
      "items": {
        "properties": {
          "comment_count": {
            "description_for_schema": "Number of comments from this source",
            "type": "integer"
          },
          "source": {
            "description_for_schema": "Name of the review source",
            "type": "string"
          }
        },
        "required": [
          "source",
          "comment_count"
        ],
        "type": "object"
      },
      "purpose": "Documents which AI reviewers provided feedback, helping the operator understand the diversity of perspectives",
      "type": "array"
    },
    "severity_distribution": {
      "description_for_schema": "Distribution of feedback by severity level",
      "properties": {
        "critical": {
          "description_for_schema": "Number of critical issues",
          "type": "integer"
        },
        "informational": {
          "description_for_schema": "Number of informational comments",
          "type": "integer"
        },
        "low": {
          "description_for_schema": "Number of low priority issues",
          "type": "integer"
        },
        "medium": {
          "description_for_schema": "Number of medium priority issues",
          "type": "integer"
        }
      },
      "purpose": "Provides a quantitative overview of feedback severity, helping the operator quickly assess the scale of concerns",
      "required": [
        "critical",
        "medium",
        "low",
        "informational"
      ],
      "type": "object"
    }
  }
}