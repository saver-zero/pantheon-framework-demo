local sections = {
  "clarifying_questions": import "artifact/sections/clarifying_questions.schema.jsonnet",
  "context": import "artifact/sections/context.schema.jsonnet",
  "backend_architecture": import "artifact/sections/backend_architecture.schema.jsonnet",
  "database_design": import "artifact/sections/database_design.schema.jsonnet",
  "ui_implementation": import "artifact/sections/ui_implementation.schema.jsonnet",
  "security_considerations": import "artifact/sections/security_considerations.schema.jsonnet",
  "testing_strategy": import "artifact/sections/testing_strategy.schema.jsonnet"
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
      default: ["clarifying_questions", "context", "backend_architecture", "database_design", "ui_implementation", "security_considerations", "testing_strategy"],
    },
  },
  required: ["section_updates"],
}