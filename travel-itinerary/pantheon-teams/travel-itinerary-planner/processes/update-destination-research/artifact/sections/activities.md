## Activities

updated_at: {{ pantheon_timestamp }}

{% for activity in activity_list %}
### {{ activity.name }}

**Type**: {{ activity.type }}

**Description**: {{ activity.description }}

{% if activity.duration %}**Typical Duration**: {{ activity.duration }}{% endif %}

{% if activity.cost %}**Cost**: {{ activity.cost }}{% endif %}

{% if activity.location %}**Location**: {{ activity.location }}{% endif %}

{% if activity.best_time %}**Best Time**: {{ activity.best_time }}{% endif %}

{% if activity.booking_notes %}**Booking Notes**: {{ activity.booking_notes }}{% endif %}

{% if activity.difficulty %}**Difficulty Level**: {{ activity.difficulty }}{% endif %}

---
{% endfor %}