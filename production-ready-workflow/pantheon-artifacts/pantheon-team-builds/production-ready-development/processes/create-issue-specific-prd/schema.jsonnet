local sections = [
  {
    name: "requirements",
    schema: import "process-schema://update-issue-specific-prd/sections/requirements",
    enabled: true
  },
  {
    name: "context",
    schema: import "process-schema://update-issue-specific-prd/sections/context",
    enabled: true
  },
  {
    name: "context",
    schema: import "process-schema://update-issue-specific-prd/sections/context",
    enabled: true
  },
  {
    name: "guidance",
    schema: import "process-schema://update-issue-specific-prd/sections/guidance",
    enabled: true
  },
  {
    name: "success_criteria",
    schema: import "process-schema://update-issue-specific-prd/sections/success_criteria",
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