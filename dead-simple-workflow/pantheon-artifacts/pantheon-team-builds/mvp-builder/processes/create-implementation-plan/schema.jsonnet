local sections = [
  {
    name: "phases",
    schema: import "process-schema://update-implementation-plan/sections/phases",
    enabled: true
  },
  {
    name: "implementation_steps",
    schema: import "process-schema://update-implementation-plan/sections/implementation_steps",
    enabled: true
  },
  {
    name: "completion_criteria",
    schema: import "process-schema://update-implementation-plan/sections/completion_criteria",
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