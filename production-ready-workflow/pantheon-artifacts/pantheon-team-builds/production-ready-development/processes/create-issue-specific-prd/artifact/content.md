---
created_at: {{ pantheon_timestamp }}
created_by: {{ pantheon_actor }}
---
{% set _include_requirements = true %}
<!-- SECTION:START:REQUIREMENTS -->
{% if _include_requirements %}
{% include 'artifact-template://update-issue-specific-prd/sections/requirements' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:REQUIREMENTS -->

{% set _include_context = true %}
<!-- SECTION:START:CONTEXT -->
{% if _include_context %}
{% include 'artifact-template://update-issue-specific-prd/sections/context' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:CONTEXT -->

{% set _include_context = true %}
<!-- SECTION:START:CONTEXT -->
{% if _include_context %}
{% include 'artifact-template://update-issue-specific-prd/sections/context' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:CONTEXT -->

{% set _include_guidance = true %}
<!-- SECTION:START:GUIDANCE -->
{% if _include_guidance %}
{% include 'artifact-template://update-issue-specific-prd/sections/guidance' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:GUIDANCE -->

{% set _include_success_criteria = true %}
<!-- SECTION:START:SUCCESS_CRITERIA -->
{% if _include_success_criteria %}
{% include 'artifact-template://update-issue-specific-prd/sections/success_criteria' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:SUCCESS_CRITERIA -->