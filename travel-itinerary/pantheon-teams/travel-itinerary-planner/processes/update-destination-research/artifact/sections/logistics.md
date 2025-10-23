## Logistics

updated_at: {{ pantheon_timestamp }}

### Transportation Options

{% for option in transportation_options %}
**{{ option.type }}**: {{ option.description }}
{% if option.cost %}Cost: {{ option.cost }}{% endif %}
{% if option.notes %}Notes: {{ option.notes }}{% endif %}

{% endfor %}

### Neighborhoods & Areas

{% for neighborhood in neighborhoods %}
**{{ neighborhood.name }}**: {{ neighborhood.description }}
{% if neighborhood.best_for %}Best for: {{ neighborhood.best_for }}{% endif %}

{% endfor %}

{% if practical_tips %}### Practical Travel Tips

{% for tip in practical_tips %}
- {{ tip }}
{% endfor %}
{% endif %}

{% if local_customs %}### Local Customs & Cultural Notes

{{ local_customs }}
{% endif %}