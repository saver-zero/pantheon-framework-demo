# Technology Stack

## Framework

**{{ framework.name }}**

{{ framework.rationale }}

## Database

**{{ database.name }}**

{{ database.rationale }}

## Authentication

**{{ authentication.name }}**

{{ authentication.rationale }}

## Hosting

**{{ hosting.name }}**

{{ hosting.rationale }}

{% if key_libraries %}## Key Libraries
{% for lib in key_libraries %}
- **{{ lib.name }}**: {{ lib.purpose }}
{% endfor %}{% endif %}