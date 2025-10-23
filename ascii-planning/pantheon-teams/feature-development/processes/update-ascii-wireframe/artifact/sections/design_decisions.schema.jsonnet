{
  "type": "object",
  "required": [
    "decision_number",
    "timestamp",
    "decision_title",
    "rationale",
    "alternatives"
  ],
  "properties": {
    "alternatives": {
      "authoring_guidance": "Target 50-100 words. List 1-3 alternatives briefly and explain why each was rejected. This helps future designers understand the full exploration.",
      "description_for_schema": "Other approaches that were considered and why they were not chosen.",
      "purpose": "Documents approaches that were considered but rejected, helping future designers understand what was explored and why other paths weren't chosen.",
      "type": "string"
    },
    "decision_number": {
      "description_for_schema": "Sequential number for this design decision (1, 2, 3, etc.).",
      "purpose": "Sequences design decisions to show evolution of wireframe thinking across iterations.",
      "type": "integer"
    },
    "decision_title": {
      "authoring_guidance": "Keep under 100 characters. Focus on what was decided, not why. The rationale field captures the 'why'.",
      "description_for_schema": "Brief title summarizing the design decision (e.g., 'Place navigation at top instead of sidebar', 'Use modal for confirmation instead of inline').",
      "purpose": "Provides concise summary of the design decision for quick scanning and reference.",
      "type": "string"
    },
    "rationale": {
      "authoring_guidance": "Target 75-150 words. Explain the reasoning clearly. Reference specific user needs from brainstorming if applicable. Include any constraints that influenced the decision.",
      "description_for_schema": "Explanation of why this design decision was made. Include user needs, technical constraints, or usability considerations that drove the choice.",
      "purpose": "Explains why this design choice was made, preserving context for future changes or questions.",
      "type": "string"
    },
    "timestamp": {
      "description_for_schema": "Timestamp of this design decision in format: 2025-10-14 08:36 PM PDT",
      "purpose": "Records when each design decision was made, providing temporal context for decision evolution.",
      "type": "string"
    }
  }
}