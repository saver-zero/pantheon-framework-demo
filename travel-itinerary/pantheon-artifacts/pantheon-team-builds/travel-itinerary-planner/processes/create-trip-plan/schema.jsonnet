local sections = [
  {
    name: "overview",
    schema: import "process-schema://update-trip-plan/sections/overview",
    enabled: true
  },
  {
    name: "daily_schedule",
    schema: import "process-schema://update-trip-plan/sections/daily_schedule",
    enabled: false
  },
  {
    name: "logistics_guide",
    schema: import "process-schema://update-trip-plan/sections/logistics_guide",
    enabled: false
  },
  {
    name: "budget_breakdown",
    schema: import "process-schema://update-trip-plan/sections/budget_breakdown",
    enabled: false
  },
  {
    name: "operator_notes",
    schema: import "process-schema://update-trip-plan/sections/operator_notes",
    enabled: false
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