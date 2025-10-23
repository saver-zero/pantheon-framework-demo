local sections = {
  "requirements": import "artifact/sections/requirements.schema.jsonnet",
  "context": import "artifact/sections/context.schema.jsonnet",
  "context": import "artifact/sections/context.schema.jsonnet",
  "guidance": import "artifact/sections/guidance.schema.jsonnet",
  "success_criteria": import "artifact/sections/success_criteria.schema.jsonnet"
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
      default: ["requirements", "context", "context", "guidance", "success_criteria"],
    },
  },
  required: ["section_updates"],
}