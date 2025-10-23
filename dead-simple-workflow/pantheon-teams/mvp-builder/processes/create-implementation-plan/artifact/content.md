---
created_at: {{ pantheon_timestamp }}
created_by: {{ pantheon_actor }}
---
{% set _include_phases = true %}
<!-- SECTION:START:PHASES -->
{% if _include_phases %}
{% include 'artifact-template://update-implementation-plan/sections/phases' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:PHASES -->

{% set _include_implementation_steps = true %}
<!-- SECTION:START:IMPLEMENTATION_STEPS -->
{% if _include_implementation_steps %}
{% include 'artifact-template://update-implementation-plan/sections/implementation_steps' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:IMPLEMENTATION_STEPS -->

{% set _include_completion_criteria = true %}
<!-- SECTION:START:COMPLETION_CRITERIA -->
{% if _include_completion_criteria %}
{% include 'artifact-template://update-implementation-plan/sections/completion_criteria' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:COMPLETION_CRITERIA -->