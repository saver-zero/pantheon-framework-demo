{
  "type": "object",
  "required": [
    "feature_name",
    "source_brainstorm_id",
    "ascii_layout",
    "layout_notes"
  ],
  "properties": {
    "ascii_layout": {
      "authoring_guidance": "Use ASCII box-drawing characters (|, -, +, etc.) to create clear visual structure. Show component hierarchy through indentation and nesting. Label all interactive elements. Aim for clarity over artistic detail. Target 20-50 lines for simple layouts, 50-100 for complex ones.",
      "description_for_schema": "ASCII art representation of the user interface layout. Use box-drawing characters, brackets, and text to show component hierarchy and spatial relationships.",
      "purpose": "Provides token-efficient visual representation of UI structure using ASCII characters, serving as the single source of truth for layout and spatial relationships.",
      "type": "string"
    },
    "feature_name": {
      "authoring_guidance": "Keep under 30 characters. Use lowercase letters and hyphens only. Should match the feature_name from the brainstorming artifact.",
      "description_for_schema": "Short descriptive name for the feature (e.g., 'user-auth', 'payment-flow', 'dashboard-redesign'). Use lowercase with hyphens.",
      "purpose": "Identifies the feature this wireframe specifies, maintaining traceability from brainstorming through implementation.",
      "type": "string"
    },
    "layout_notes": {
      "authoring_guidance": "Target 100-200 words. Focus on behavior not obvious from the ASCII (responsive breakpoints, hidden/shown states, animations). Keep concise.",
      "description_for_schema": "Additional notes explaining layout behavior, responsive considerations, or aspects not clearly shown in the ASCII representation.",
      "purpose": "Documents key aspects of the layout that are difficult to express in ASCII alone, such as responsive behavior or animation states.",
      "type": "string"
    },
    "source_brainstorm_id": {
      "description_for_schema": "The ID of the feature-brainstorm artifact that this wireframe is based on (e.g., 'FB01', 'FB12').",
      "purpose": "Creates explicit traceability link to the brainstorming artifact that defined the problem space for this wireframe.",
      "type": "string"
    }
  }
}