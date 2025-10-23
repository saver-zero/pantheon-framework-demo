local sections = {
  "phases": import "artifact/sections/phases.schema.jsonnet",
  "implementation_steps": import "artifact/sections/implementation_steps.schema.jsonnet",
  "completion_criteria": import "artifact/sections/completion_criteria.schema.jsonnet"
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
      default: ["phases", "implementation_steps", "completion_criteria"],
    },
  },
  required: ["section_updates"],
}