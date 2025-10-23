{
  "type": "object",
  "required": [
    "existing_constraints",
    "integration_points"
  ],
  "properties": {
    "existing_constraints": {
      "authoring_guidance": "Target 100-200 words. Be specific about technical stack, team expertise, timeline constraints, and organizational limitations. These constraints will guide feasible solution directions.",
      "description_for_schema": "Describe existing technical, organizational, or resource constraints that will affect solution design. Include technology stack, team capabilities, and timeline constraints.",
      "purpose": "Documents technical and organizational limitations that will shape feasible solutions, ensuring proposed approaches align with reality.",
      "type": "string"
    },
    "integration_points": {
      "authoring_guidance": "Target 75-150 words. List specific systems, APIs, databases, or services the feature must interact with. Note any integration complexity or dependencies.",
      "description_for_schema": "Describe how the feature needs to integrate with existing systems, APIs, databases, or external services.",
      "purpose": "Identifies how the feature must connect with existing systems and services, ensuring solution designs account for required integrations.",
      "type": "string"
    }
  }
}