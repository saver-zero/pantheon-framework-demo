---
created_at: {{ pantheon_timestamp }}
created_by: {{ pantheon_actor }}
---
{% set _include_unit_tests = true %}
<!-- SECTION:START:UNIT_TESTS -->
{% if _include_unit_tests %}
{% include 'artifact-template://update-test-specification/sections/unit_tests' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:UNIT_TESTS -->

{% set _include_context = true %}
<!-- SECTION:START:CONTEXT -->
{% if _include_context %}
{% include 'artifact-template://update-test-specification/sections/context' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:CONTEXT -->

{% set _include_integration_tests = true %}
<!-- SECTION:START:INTEGRATION_TESTS -->
{% if _include_integration_tests %}
{% include 'artifact-template://update-test-specification/sections/integration_tests' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:INTEGRATION_TESTS -->

{% set _include_component_tests = true %}
<!-- SECTION:START:COMPONENT_TESTS -->
{% if _include_component_tests %}
{% include 'artifact-template://update-test-specification/sections/component_tests' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:COMPONENT_TESTS -->

{% set _include_edge_case_tests = true %}
<!-- SECTION:START:EDGE_CASE_TESTS -->
{% if _include_edge_case_tests %}
{% include 'artifact-template://update-test-specification/sections/edge_case_tests' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:EDGE_CASE_TESTS -->

{% set _include_manual_validation_checklist = true %}
<!-- SECTION:START:MANUAL_VALIDATION_CHECKLIST -->
{% if _include_manual_validation_checklist %}
{% include 'artifact-template://update-test-specification/sections/manual_validation_checklist' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:MANUAL_VALIDATION_CHECKLIST -->