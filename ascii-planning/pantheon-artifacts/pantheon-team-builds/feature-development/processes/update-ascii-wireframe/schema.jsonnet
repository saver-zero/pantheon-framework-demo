local sections = {
  "layout_specification": import "artifact/sections/layout_specification.schema.jsonnet",
  "context": import "artifact/sections/context.schema.jsonnet",
  "flow_diagram": import "artifact/sections/flow_diagram.schema.jsonnet",
  "design_decisions": import "artifact/sections/design_decisions.schema.jsonnet",
  "component_registry": import "artifact/sections/component_registry.schema.jsonnet"
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
      default: ["layout_specification", "context", "flow_diagram", "design_decisions", "component_registry"],
    },
  },
  required: ["section_updates"],
}