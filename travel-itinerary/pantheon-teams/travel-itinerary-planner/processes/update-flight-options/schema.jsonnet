local sections = {
  "search_criteria": import "artifact/sections/search_criteria.schema.jsonnet",
  "cheapest_flights": import "artifact/sections/cheapest_flights.schema.jsonnet",
  "shortest_flights": import "artifact/sections/shortest_flights.schema.jsonnet"
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
      default: ["search_criteria", "cheapest_flights", "shortest_flights"],
    },
  },
  required: ["section_updates"],
}