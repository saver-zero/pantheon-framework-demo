local sections = [
  {
    name: "clarifying_questions",
    schema: import "process-schema://update-implementation-plan/sections/clarifying_questions",
    enabled: true
  },
  {
    name: "context",
    schema: import "process-schema://update-implementation-plan/sections/context",
    enabled: true
  },
  {
    name: "backend_architecture",
    schema: import "process-schema://update-implementation-plan/sections/backend_architecture",
    enabled: true
  },
  {
    name: "database_design",
    schema: import "process-schema://update-implementation-plan/sections/database_design",
    enabled: true
  },
  {
    name: "ui_implementation",
    schema: import "process-schema://update-implementation-plan/sections/ui_implementation",
    enabled: true
  },
  {
    name: "security_considerations",
    schema: import "process-schema://update-implementation-plan/sections/security_considerations",
    enabled: true
  },
  {
    name: "testing_strategy",
    schema: import "process-schema://update-implementation-plan/sections/testing_strategy",
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