local sections = [
  {
    name: "test_coverage_analysis",
    schema: import "process-schema://update-implementation-evaluation-report/sections/test_coverage_analysis",
    enabled: true
  },
  {
    name: "architectural_alignment",
    schema: import "process-schema://update-implementation-evaluation-report/sections/architectural_alignment",
    enabled: true
  },
  {
    name: "code_quality_assessment",
    schema: import "process-schema://update-implementation-evaluation-report/sections/code_quality_assessment",
    enabled: true
  },
  {
    name: "feedback_summary",
    schema: import "process-schema://update-implementation-evaluation-report/sections/feedback_summary",
    enabled: true
  }
];

local properties = std.foldl(
  function(acc, sec)
    if sec.enabled then acc + sec.schema.properties else acc,
  sections,
  {}
);

local required = std.foldl(
  function(acc, sec)
    if sec.enabled && std.objectHas(sec.schema, 'required')
    then acc + sec.schema.required
    else acc,
  sections,
  []
);

{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": properties,
  "required": required
}