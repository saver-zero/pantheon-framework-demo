---
created_at: {{ pantheon_timestamp }}
created_by: {{ pantheon_actor }}
---
{% set _include_project_overview = true %}
<!-- SECTION:START:PROJECT_OVERVIEW -->
{% if _include_project_overview %}
{% include 'artifact-template://update-project-context/sections/project_overview' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:PROJECT_OVERVIEW -->

{% set _include_context = true %}
<!-- SECTION:START:CONTEXT -->
{% if _include_context %}
{% include 'artifact-template://update-project-context/sections/context' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:CONTEXT -->

{% set _include_technology_stack = true %}
<!-- SECTION:START:TECHNOLOGY_STACK -->
{% if _include_technology_stack %}
{% include 'artifact-template://update-project-context/sections/technology_stack' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:TECHNOLOGY_STACK -->

{% set _include_architectural_patterns = true %}
<!-- SECTION:START:ARCHITECTURAL_PATTERNS -->
{% if _include_architectural_patterns %}
{% include 'artifact-template://update-project-context/sections/architectural_patterns' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:ARCHITECTURAL_PATTERNS -->

{% set _include_implementation_insights = true %}
<!-- SECTION:START:IMPLEMENTATION_INSIGHTS -->
{% if _include_implementation_insights %}
{% include 'artifact-template://update-project-context/sections/implementation_insights' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:IMPLEMENTATION_INSIGHTS -->