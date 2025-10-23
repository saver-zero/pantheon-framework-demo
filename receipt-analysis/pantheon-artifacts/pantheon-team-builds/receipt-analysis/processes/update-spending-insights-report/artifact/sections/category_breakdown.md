## Category Breakdown

{% for category in categories %}**{{ category.name }}**: ${{ category.amount }} ({{ category.percentage }}%)
{% endfor %}