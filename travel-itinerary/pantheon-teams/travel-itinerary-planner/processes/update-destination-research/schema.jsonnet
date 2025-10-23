local sections = {
  "attractions": import "artifact/sections/attractions.schema.jsonnet",
  "context": import "artifact/sections/context.schema.jsonnet",
  "dining": import "artifact/sections/dining.schema.jsonnet",
  "activities": import "artifact/sections/activities.schema.jsonnet",
  "logistics": import "artifact/sections/logistics.schema.jsonnet"
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
      default: ["attractions", "context", "dining", "activities", "logistics"],
    },
  },
  required: ["section_updates"],
}