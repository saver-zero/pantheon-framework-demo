---
created_at: {{ pantheon_timestamp }}
created_by: {{ pantheon_actor }}
---
{% set _include_clarifying_questions = true %}
<!-- SECTION:START:CLARIFYING_QUESTIONS -->
{% if _include_clarifying_questions %}
{% include 'artifact-template://update-implementation-plan/sections/clarifying_questions' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:CLARIFYING_QUESTIONS -->

{% set _include_context = true %}
<!-- SECTION:START:CONTEXT -->
{% if _include_context %}
{% include 'artifact-template://update-implementation-plan/sections/context' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:CONTEXT -->

{% set _include_backend_architecture = true %}
<!-- SECTION:START:BACKEND_ARCHITECTURE -->
{% if _include_backend_architecture %}
{% include 'artifact-template://update-implementation-plan/sections/backend_architecture' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:BACKEND_ARCHITECTURE -->

{% set _include_database_design = true %}
<!-- SECTION:START:DATABASE_DESIGN -->
{% if _include_database_design %}
{% include 'artifact-template://update-implementation-plan/sections/database_design' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:DATABASE_DESIGN -->

{% set _include_ui_implementation = true %}
<!-- SECTION:START:UI_IMPLEMENTATION -->
{% if _include_ui_implementation %}
{% include 'artifact-template://update-implementation-plan/sections/ui_implementation' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:UI_IMPLEMENTATION -->

{% set _include_security_considerations = true %}
<!-- SECTION:START:SECURITY_CONSIDERATIONS -->
{% if _include_security_considerations %}
{% include 'artifact-template://update-implementation-plan/sections/security_considerations' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:SECURITY_CONSIDERATIONS -->

{% set _include_testing_strategy = true %}
<!-- SECTION:START:TESTING_STRATEGY -->
{% if _include_testing_strategy %}
{% include 'artifact-template://update-implementation-plan/sections/testing_strategy' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:TESTING_STRATEGY -->