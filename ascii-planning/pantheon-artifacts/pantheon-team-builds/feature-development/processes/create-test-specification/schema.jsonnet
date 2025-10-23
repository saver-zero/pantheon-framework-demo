local sections = [
  {
    name: "unit_tests",
    schema: import "process-schema://update-test-specification/sections/unit_tests",
    enabled: true
  },
  {
    name: "context",
    schema: import "process-schema://update-test-specification/sections/context",
    enabled: true
  },
  {
    name: "integration_tests",
    schema: import "process-schema://update-test-specification/sections/integration_tests",
    enabled: true
  },
  {
    name: "component_tests",
    schema: import "process-schema://update-test-specification/sections/component_tests",
    enabled: true
  },
  {
    name: "edge_case_tests",
    schema: import "process-schema://update-test-specification/sections/edge_case_tests",
    enabled: true
  },
  {
    name: "manual_validation_checklist",
    schema: import "process-schema://update-test-specification/sections/manual_validation_checklist",
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