## Dining

updated_at: {{ pantheon_timestamp }}

{% for restaurant in dining_options %}
### {{ restaurant.name }}

**Cuisine**: {{ restaurant.cuisine }}

**Meal Type**: {{ restaurant.meal_type }}

**Description**: {{ restaurant.description }}

{% if restaurant.price_range %}**Price Range**: {{ restaurant.price_range }}{% endif %}

{% if restaurant.location %}**Location**: {{ restaurant.location }}{% endif %}

{% if restaurant.specialties %}**Specialties**: {{ restaurant.specialties }}{% endif %}

{% if restaurant.reservation_notes %}**Reservation Notes**: {{ restaurant.reservation_notes }}{% endif %}

---
{% endfor %}