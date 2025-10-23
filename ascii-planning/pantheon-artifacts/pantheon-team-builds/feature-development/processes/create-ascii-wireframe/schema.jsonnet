local sections = [
  {
    name: "layout_specification",
    schema: import "process-schema://update-ascii-wireframe/sections/layout_specification",
    enabled: true
  },
  {
    name: "context",
    schema: import "process-schema://update-ascii-wireframe/sections/context",
    enabled: true
  },
  {
    name: "flow_diagram",
    schema: import "process-schema://update-ascii-wireframe/sections/flow_diagram",
    enabled: true
  },
  {
    name: "design_decisions",
    schema: import "process-schema://update-ascii-wireframe/sections/design_decisions",
    enabled: true
  },
  {
    name: "component_registry",
    schema: import "process-schema://update-ascii-wireframe/sections/component_registry",
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