## Interests & Preferences

updated_at: {{ pantheon_timestamp }}

**Primary Interests**:
{% for interest in primary_interests %}
- {{ interest }}
{% endfor %}

**Travel Style**: {{ travel_style }}

{% if must_do_activities %}**Must-Do Activities**:
{% for activity in must_do_activities %}
- {{ activity }}
{% endfor %}
{% endif %}

{% if avoid_preferences %}**Preferences to Avoid**:
{% for avoid in avoid_preferences %}
- {{ avoid }}
{% endfor %}
{% endif %}

{% if accessibility_needs %}**Accessibility Needs**: {{ accessibility_needs }}{% endif %}

{% if group_composition %}**Group Composition**: {{ group_composition }}{% endif %}