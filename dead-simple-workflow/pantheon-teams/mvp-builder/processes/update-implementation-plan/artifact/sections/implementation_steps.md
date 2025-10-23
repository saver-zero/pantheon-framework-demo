# Implementation Steps

{% for phase_group in steps_by_phase %}## Phase {{ phase_group.phase_number }}: {{ phase_group.phase_name }}

{% for step in phase_group.steps %}{{ step.step_number }}. [{{ step.status }}] {{ step.description }}
{% endfor %}

{% endfor %}