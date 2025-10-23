local sections = [
  {
    name: "search_criteria",
    schema: import "process-schema://update-flight-options/sections/search_criteria",
    enabled: true
  },
  {
    name: "cheapest_flights",
    schema: import "process-schema://update-flight-options/sections/cheapest_flights",
    enabled: true
  },
  {
    name: "shortest_flights",
    schema: import "process-schema://update-flight-options/sections/shortest_flights",
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