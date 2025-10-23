local sections = [
  {
    name: "quick_stats",
    schema: import "process-schema://update-spending-insights-report/sections/quick_stats",
    enabled: true
  },
  {
    name: "category_breakdown",
    schema: import "process-schema://update-spending-insights-report/sections/category_breakdown",
    enabled: true
  },
  {
    name: "notable_patterns",
    schema: import "process-schema://update-spending-insights-report/sections/notable_patterns",
    enabled: true
  },
  {
    name: "actionable_tips",
    schema: import "process-schema://update-spending-insights-report/sections/actionable_tips",
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