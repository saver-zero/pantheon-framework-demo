## Budget Breakdown

updated_at: {{ pantheon_timestamp }}

### Daily Cost Estimates

{% for daily_cost in daily_costs %}
**Day {{ daily_cost.day_number }}**: {{ daily_cost.total }}
{% if daily_cost.breakdown %}
{% for item in daily_cost.breakdown %}
- {{ item.category }}: {{ item.amount }}{% if item.notes %} ({{ item.notes }}){% endif %}
{% endfor %}
{% endif %}

{% endfor %}

### Total Trip Estimate

{% for category in cost_summary %}
**{{ category.category }}**: {{ category.total }}{% if category.notes %} - {{ category.notes }}{% endif %}
{% endfor %}

**Grand Total**: {{ grand_total }}

{% if budget_notes %}### Budget Notes

{{ budget_notes }}
{% endif %}