local sections = {
  "quick_stats": import "artifact/sections/quick_stats.schema.jsonnet",
  "category_breakdown": import "artifact/sections/category_breakdown.schema.jsonnet",
  "notable_patterns": import "artifact/sections/notable_patterns.schema.jsonnet",
  "actionable_tips": import "artifact/sections/actionable_tips.schema.jsonnet"
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
      default: ["quick_stats", "category_breakdown", "notable_patterns", "actionable_tips"],
    },
  },
  required: ["section_updates"],
}