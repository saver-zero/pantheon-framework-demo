---
created_at: {{ pantheon_timestamp }}
created_by: {{ pantheon_actor }}
---
{% set _include_quick_stats = true %}
<!-- SECTION:START:QUICK_STATS -->
{% if _include_quick_stats %}
{% include 'artifact-template://update-spending-insights-report/sections/quick_stats' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:QUICK_STATS -->

{% set _include_category_breakdown = true %}
<!-- SECTION:START:CATEGORY_BREAKDOWN -->
{% if _include_category_breakdown %}
{% include 'artifact-template://update-spending-insights-report/sections/category_breakdown' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:CATEGORY_BREAKDOWN -->

{% set _include_notable_patterns = true %}
<!-- SECTION:START:NOTABLE_PATTERNS -->
{% if _include_notable_patterns %}
{% include 'artifact-template://update-spending-insights-report/sections/notable_patterns' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:NOTABLE_PATTERNS -->

{% set _include_actionable_tips = true %}
<!-- SECTION:START:ACTIONABLE_TIPS -->
{% if _include_actionable_tips %}
{% include 'artifact-template://update-spending-insights-report/sections/actionable_tips' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:ACTIONABLE_TIPS -->