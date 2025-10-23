{
  "type": "object",
  "required": [
    "issue_id",
    "feature_summary",
    "functional_requirements",
    "in_scope",
    "out_of_scope"
  ],
  "properties": {
    "feature_summary": {
      "authoring_guidance": "Keep to 1-2 sentences. Focus on the 'what' and 'why', not the 'how'. Example: 'Add user authentication to the API endpoints to prevent unauthorized access.'",
      "description_for_schema": "A brief, clear summary of the feature or bug fix being implemented",
      "purpose": "Provides a concise overview of what is being implemented, giving the implementation agent immediate context without requiring them to read the full requirements",
      "type": "string"
    },
    "functional_requirements": {
      "authoring_guidance": "Aim for 3-8 requirements. Each requirement should be specific, testable, and scoped to this issue only. Avoid vague statements like 'improve performance'.",
      "description_for_schema": "List of specific functional requirements that must be implemented",
      "items": {
        "type": "string"
      },
      "purpose": "Enumerates the specific, measurable capabilities that the implementation must deliver, providing a clear checklist for the implementation agent",
      "type": "array"
    },
    "in_scope": {
      "authoring_guidance": "List 3-6 concrete items that clarify the boundaries of the work. Be specific about files, components, or features that should be touched.",
      "description_for_schema": "Specific items, features, or changes that are included in this implementation",
      "items": {
        "type": "string"
      },
      "purpose": "Explicitly defines what work belongs to this implementation, preventing the agent from over-delivering or addressing adjacent concerns",
      "type": "array"
    },
    "issue_id": {
      "authoring_guidance": "Use the exact issue identifier from the tracking system. This should match the format used in your issue tracker.",
      "description_for_schema": "The unique identifier for the issue being implemented (e.g., 'GH-123' or 'JIRA-456')",
      "purpose": "Identifies the source issue from the tracking system that this PRD addresses, providing traceability between the PRD and the original request",
      "type": "string"
    },
    "out_of_scope": {
      "authoring_guidance": "List 2-5 items that might be tempting to include but should be avoided. This is critical for preventing scope creep.",
      "description_for_schema": "Specific items, features, or changes that are explicitly excluded from this implementation",
      "items": {
        "type": "string"
      },
      "purpose": "Prevents scope creep by explicitly stating related work that should NOT be included in this implementation, even if it seems adjacent or tempting",
      "type": "array"
    }
  }
}