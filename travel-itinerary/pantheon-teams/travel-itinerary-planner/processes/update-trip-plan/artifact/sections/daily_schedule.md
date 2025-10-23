## Daily Schedule

updated_at: {{ pantheon_timestamp }}

{% for day in daily_schedule %}
### Day {{ day.day_number }}: {{ day.title }}

{% for time_block in day.time_blocks %}
#### {{ time_block.time_range }}: {{ time_block.activity_name }}

{{ time_block.description }}

{% if time_block.location %}**Location**: {{ time_block.location }}{% endif %}

{% if time_block.duration %}**Duration**: {{ time_block.duration }}{% endif %}

{% if time_block.cost %}**Estimated Cost**: {{ time_block.cost }}{% endif %}

{% if time_block.transportation %}**Getting There**: {{ time_block.transportation }}{% endif %}

{% if time_block.tips %}**Tips**: {{ time_block.tips }}{% endif %}

{% endfor %}

---
{% endfor %}