local sections = {
  "consolidated_feedback": import "artifact/sections/consolidated_feedback.schema.jsonnet",
  "architectural_concerns": import "artifact/sections/architectural_concerns.schema.jsonnet",
  "recommended_actions": import "artifact/sections/recommended_actions.schema.jsonnet"
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
      default: ["consolidated_feedback", "architectural_concerns", "recommended_actions"],
    },
  },
  required: ["section_updates"],
}