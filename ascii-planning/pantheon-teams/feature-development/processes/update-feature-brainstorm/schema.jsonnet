local sections = {
  "problem_space": import "artifact/sections/problem_space.schema.jsonnet",
  "context": import "artifact/sections/context.schema.jsonnet",
  "system_context": import "artifact/sections/system_context.schema.jsonnet",
  "collaborative_ideas": import "artifact/sections/collaborative_ideas.schema.jsonnet"
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
      default: ["problem_space", "context", "system_context", "collaborative_ideas"],
    },
  },
  required: ["section_updates"],
}