local sections = [
  {
    name: "destination",
    schema: import "process-schema://update-travel-preferences/sections/destination",
    enabled: true
  },
  {
    name: "context",
    schema: import "process-schema://update-travel-preferences/sections/context",
    enabled: true
  },
  {
    name: "trip_details",
    schema: import "process-schema://update-travel-preferences/sections/trip_details",
    enabled: true
  },
  {
    name: "interests",
    schema: import "process-schema://update-travel-preferences/sections/interests",
    enabled: true
  },
  {
    name: "budget",
    schema: import "process-schema://update-travel-preferences/sections/budget",
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