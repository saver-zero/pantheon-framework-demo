---
created_at: {{ pantheon_timestamp }}
created_by: {{ pantheon_actor }}
---
{% set _include_problem_space = true %}
<!-- SECTION:START:PROBLEM_SPACE -->
{% if _include_problem_space %}
{% include 'artifact-template://update-feature-brainstorm/sections/problem_space' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:PROBLEM_SPACE -->

{% set _include_context = true %}
<!-- SECTION:START:CONTEXT -->
{% if _include_context %}
{% include 'artifact-template://update-feature-brainstorm/sections/context' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:CONTEXT -->

{% set _include_system_context = true %}
<!-- SECTION:START:SYSTEM_CONTEXT -->
{% if _include_system_context %}
{% include 'artifact-template://update-feature-brainstorm/sections/system_context' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:SYSTEM_CONTEXT -->

{% set _include_collaborative_ideas = true %}
<!-- SECTION:START:COLLABORATIVE_IDEAS -->
{% if _include_collaborative_ideas %}
{% include 'artifact-template://update-feature-brainstorm/sections/collaborative_ideas' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:COLLABORATIVE_IDEAS -->