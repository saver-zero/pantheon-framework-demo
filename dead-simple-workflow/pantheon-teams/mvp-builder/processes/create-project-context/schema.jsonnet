local sections = [
  {
    name: "project_overview",
    schema: import "process-schema://update-project-context/sections/project_overview",
    enabled: true
  },
  {
    name: "context",
    schema: import "process-schema://update-project-context/sections/context",
    enabled: true
  },
  {
    name: "technology_stack",
    schema: import "process-schema://update-project-context/sections/technology_stack",
    enabled: true
  },
  {
    name: "architectural_patterns",
    schema: import "process-schema://update-project-context/sections/architectural_patterns",
    enabled: true
  },
  {
    name: "implementation_insights",
    schema: import "process-schema://update-project-context/sections/implementation_insights",
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