{
  "type": "object",
  "required": [
    "note_date",
    "note_content"
  ],
  "properties": {
    "note_content": {
      "authoring_guidance": "Document revision requests, verification tasks, or observations about the trip plan. Be specific and actionable.",
      "description_for_schema": "The content of the operator note",
      "purpose": "Captures the operator's observations, revision requests, or follow-up actions needed.",
      "type": "string"
    },
    "note_date": {
      "authoring_guidance": "Use the current date in a consistent format (e.g., 'October 13, 2025').",
      "description_for_schema": "The date this note was added",
      "purpose": "Timestamps when this note was added to track the revision history.",
      "type": "string"
    }
  }
}