local sections = {
  "test_coverage_analysis": import "artifact/sections/test_coverage_analysis.schema.jsonnet",
  "architectural_alignment": import "artifact/sections/architectural_alignment.schema.jsonnet",
  "code_quality_assessment": import "artifact/sections/code_quality_assessment.schema.jsonnet",
  "feedback_summary": import "artifact/sections/feedback_summary.schema.jsonnet"
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
      default: ["test_coverage_analysis", "architectural_alignment", "code_quality_assessment", "feedback_summary"],
    },
  },
  required: ["section_updates"],
}