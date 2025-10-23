---
created_at: {{ pantheon_timestamp }}
created_by: {{ pantheon_actor }}
---
{% set _include_consolidated_feedback = true %}
<!-- SECTION:START:CONSOLIDATED_FEEDBACK -->
{% if _include_consolidated_feedback %}
{% include 'artifact-template://update-pr-review-consolidation/sections/consolidated_feedback' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:CONSOLIDATED_FEEDBACK -->

{% set _include_architectural_concerns = true %}
<!-- SECTION:START:ARCHITECTURAL_CONCERNS -->
{% if _include_architectural_concerns %}
{% include 'artifact-template://update-pr-review-consolidation/sections/architectural_concerns' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:ARCHITECTURAL_CONCERNS -->

{% set _include_recommended_actions = true %}
<!-- SECTION:START:RECOMMENDED_ACTIONS -->
{% if _include_recommended_actions %}
{% include 'artifact-template://update-pr-review-consolidation/sections/recommended_actions' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:RECOMMENDED_ACTIONS -->