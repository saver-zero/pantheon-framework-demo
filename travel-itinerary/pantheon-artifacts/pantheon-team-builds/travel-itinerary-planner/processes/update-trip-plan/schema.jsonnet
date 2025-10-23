local sections = {
  "overview": import "artifact/sections/overview.schema.jsonnet",
  "daily_schedule": import "artifact/sections/daily_schedule.schema.jsonnet",
  "logistics_guide": import "artifact/sections/logistics_guide.schema.jsonnet",
  "budget_breakdown": import "artifact/sections/budget_breakdown.schema.jsonnet",
  "operator_notes": import "artifact/sections/operator_notes.schema.jsonnet"
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
      default: ["overview", "daily_schedule", "logistics_guide", "budget_breakdown", "operator_notes"],
    },
  },
  required: ["section_updates"],
}