local sections = [
  {
    name: "problem_space",
    schema: import "process-schema://update-feature-brainstorm/sections/problem_space",
    enabled: true
  },
  {
    name: "context",
    schema: import "process-schema://update-feature-brainstorm/sections/context",
    enabled: true
  },
  {
    name: "system_context",
    schema: import "process-schema://update-feature-brainstorm/sections/system_context",
    enabled: true
  },
  {
    name: "collaborative_ideas",
    schema: import "process-schema://update-feature-brainstorm/sections/collaborative_ideas",
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