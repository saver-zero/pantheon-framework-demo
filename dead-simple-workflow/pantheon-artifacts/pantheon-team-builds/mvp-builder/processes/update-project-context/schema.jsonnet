local sections = {
  "project_overview": import "artifact/sections/project_overview.schema.jsonnet",
  "context": import "artifact/sections/context.schema.jsonnet",
  "technology_stack": import "artifact/sections/technology_stack.schema.jsonnet",
  "architectural_patterns": import "artifact/sections/architectural_patterns.schema.jsonnet",
  "implementation_insights": import "artifact/sections/implementation_insights.schema.jsonnet"
};

{
  "$schema": "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    section_updates: {
      type: "object",
      additionalProperties: false,
      properties: sections,
    },
    section_order: {
      type: "array",
      description: "Canonical ordering of sections for default workflows.",
      items: { type: "string" },
      default: ["project_overview", "context", "technology_stack", "architectural_patterns", "implementation_insights"],
    },
  },
  required: ["section_updates"],
}