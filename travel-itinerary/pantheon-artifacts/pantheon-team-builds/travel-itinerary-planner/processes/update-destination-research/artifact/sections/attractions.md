## Attractions

updated_at: {{ pantheon_timestamp }}

{% for attraction in attraction_list %}
### {{ attraction.name }}

**Type**: {{ attraction.type }}

**Description**: {{ attraction.description }}

{% if attraction.operating_hours %}**Operating Hours**: {{ attraction.operating_hours }}{% endif %}

{% if attraction.admission %}**Admission**: {{ attraction.admission }}{% endif %}

{% if attraction.location %}**Location**: {{ attraction.location }}{% endif %}

{% if attraction.best_time_to_visit %}**Best Time to Visit**: {{ attraction.best_time_to_visit }}{% endif %}

{% if attraction.access_notes %}**Access Notes**: {{ attraction.access_notes }}{% endif %}

---
{% endfor %}