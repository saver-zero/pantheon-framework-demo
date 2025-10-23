## Architectural Alignment

### Pattern Adherence
{% for pattern in pattern_adherence %}
- **{{ pattern.pattern_name }}**: {{ pattern.assessment }}
{% endfor %}

### Architectural Concerns
{% if architectural_concerns %}
{% for concern in architectural_concerns %}
- **{{ concern.severity }}**: {{ concern.description }}
{% endfor %}
{% else %}
No architectural concerns identified.
{% endif %}

### Design Decisions
{% for decision in design_decisions %}
- **{{ decision.decision }}**: {{ decision.rationale }}
{% endfor %}

### Technical Debt Assessment

{{ technical_debt_assessment }}