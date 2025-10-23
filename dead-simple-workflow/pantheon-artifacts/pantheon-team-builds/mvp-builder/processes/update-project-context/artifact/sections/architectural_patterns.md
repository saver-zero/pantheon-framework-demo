# Architectural Patterns

## Code Organization

{{ code_organization }}

## State Management

{{ state_management }}

## Data Flow

{{ data_flow }}

{% if key_patterns %}## Key Patterns
{% for item in key_patterns %}
### {{ item.pattern }}

{{ item.rationale }}
{% endfor %}{% endif %}