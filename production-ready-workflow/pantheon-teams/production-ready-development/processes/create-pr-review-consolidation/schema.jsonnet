local sections = [
  {
    name: "consolidated_feedback",
    schema: import "process-schema://update-pr-review-consolidation/sections/consolidated_feedback",
    enabled: true
  },
  {
    name: "architectural_concerns",
    schema: import "process-schema://update-pr-review-consolidation/sections/architectural_concerns",
    enabled: true
  },
  {
    name: "recommended_actions",
    schema: import "process-schema://update-pr-review-consolidation/sections/recommended_actions",
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