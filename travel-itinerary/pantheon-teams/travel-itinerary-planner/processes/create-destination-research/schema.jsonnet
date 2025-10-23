local sections = [
  {
    name: "attractions",
    schema: import "process-schema://update-destination-research/sections/attractions",
    enabled: true
  },
  {
    name: "context",
    schema: import "process-schema://update-destination-research/sections/context",
    enabled: true
  },
  {
    name: "dining",
    schema: import "process-schema://update-destination-research/sections/dining",
    enabled: true
  },
  {
    name: "activities",
    schema: import "process-schema://update-destination-research/sections/activities",
    enabled: true
  },
  {
    name: "logistics",
    schema: import "process-schema://update-destination-research/sections/logistics",
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