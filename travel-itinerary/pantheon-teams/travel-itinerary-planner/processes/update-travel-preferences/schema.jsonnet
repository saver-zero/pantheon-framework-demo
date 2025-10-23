local sections = {
  "destination": import "artifact/sections/destination.schema.jsonnet",
  "context": import "artifact/sections/context.schema.jsonnet",
  "trip_details": import "artifact/sections/trip_details.schema.jsonnet",
  "interests": import "artifact/sections/interests.schema.jsonnet",
  "budget": import "artifact/sections/budget.schema.jsonnet"
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
      default: ["destination", "context", "trip_details", "interests", "budget"],
    },
  },
  required: ["section_updates"],
}