---
created_at: {{ pantheon_timestamp }}
created_by: {{ pantheon_actor }}
---
{% set _include_overview = true %}
<!-- SECTION:START:OVERVIEW -->
{% if _include_overview %}
{% include 'artifact-template://update-trip-plan/sections/overview' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:OVERVIEW -->

{% set _include_daily_schedule = false %}
<!-- SECTION:START:DAILY_SCHEDULE -->
{% if _include_daily_schedule %}
{% include 'artifact-template://update-trip-plan/sections/daily_schedule' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:DAILY_SCHEDULE -->

{% set _include_logistics_guide = false %}
<!-- SECTION:START:LOGISTICS_GUIDE -->
{% if _include_logistics_guide %}
{% include 'artifact-template://update-trip-plan/sections/logistics_guide' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:LOGISTICS_GUIDE -->

{% set _include_budget_breakdown = false %}
<!-- SECTION:START:BUDGET_BREAKDOWN -->
{% if _include_budget_breakdown %}
{% include 'artifact-template://update-trip-plan/sections/budget_breakdown' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:BUDGET_BREAKDOWN -->

{% set _include_operator_notes = false %}
<!-- SECTION:START:OPERATOR_NOTES -->
{% if _include_operator_notes %}
{% include 'artifact-template://update-trip-plan/sections/operator_notes' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:OPERATOR_NOTES -->