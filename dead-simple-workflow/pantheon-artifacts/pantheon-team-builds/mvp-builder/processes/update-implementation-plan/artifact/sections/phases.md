# Development Phases

{% for phase in phases %}## Phase {{ phase.phase_number }}: {{ phase.phase_name }}
{{ phase.phase_description }}

{% endfor %}