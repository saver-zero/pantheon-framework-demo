# Completion Criteria

## Phase Completion Gates

{% for phase in phase_criteria %}### Phase {{ phase.phase_number }}: {{ phase.phase_name }}
This phase is complete when:
{% for criterion in phase.criteria %}
- {{ criterion }}
{% endfor %}

{% endfor %}
## MVP Completion

### Functional Requirements

The MVP is complete when all of these functional requirements are met:
{% for req in mvp_completion.functional_requirements %}
- {{ req }}
{% endfor %}

### Validation Readiness

{{ mvp_completion.validation_readiness }}