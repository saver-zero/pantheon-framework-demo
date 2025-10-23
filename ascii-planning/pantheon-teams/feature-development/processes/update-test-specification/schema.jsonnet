local sections = {
  "unit_tests": import "artifact/sections/unit_tests.schema.jsonnet",
  "context": import "artifact/sections/context.schema.jsonnet",
  "integration_tests": import "artifact/sections/integration_tests.schema.jsonnet",
  "component_tests": import "artifact/sections/component_tests.schema.jsonnet",
  "edge_case_tests": import "artifact/sections/edge_case_tests.schema.jsonnet",
  "manual_validation_checklist": import "artifact/sections/manual_validation_checklist.schema.jsonnet"
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
      default: ["unit_tests", "context", "integration_tests", "component_tests", "edge_case_tests", "manual_validation_checklist"],
    },
  },
  required: ["section_updates"],
}