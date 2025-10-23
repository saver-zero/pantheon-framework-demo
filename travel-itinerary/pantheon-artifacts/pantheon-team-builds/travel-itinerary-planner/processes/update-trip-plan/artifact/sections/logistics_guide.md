## Logistics Guide

updated_at: {{ pantheon_timestamp }}

### Getting Around

{% for transport in transportation_recommendations %}
**{{ transport.type }}**: {{ transport.recommendation }}
{% if transport.cost %}Cost: {{ transport.cost }}{% endif %}
{% if transport.notes %}Notes: {{ transport.notes }}{% endif %}

{% endfor %}

### Accommodation

{% for accommodation in accommodation_recommendations %}
**{{ accommodation.area }}**: {{ accommodation.recommendation }}
{% if accommodation.reasoning %}Why this area: {{ accommodation.reasoning }}{% endif %}

{% endfor %}

{% if packing_essentials %}### Packing Essentials

{% for item in packing_essentials %}
- {{ item }}
{% endfor %}
{% endif %}

{% if important_contacts %}### Important Contacts & Information

{% for contact in important_contacts %}
**{{ contact.type }}**: {{ contact.details }}
{% endfor %}
{% endif %}