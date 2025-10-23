## Success Criteria

### Acceptance Criteria
{% for criterion in acceptance_criteria %}
- [ ] {{ criterion }}
{% endfor %}

### Test Requirements

**Minimum Test Coverage:** {{ minimum_test_coverage }}

**Required Tests:**
{% for test in required_tests %}
- {{ test }}
{% endfor %}
{% if manual_verification_steps %}

### Manual Verification Steps
{% for step in manual_verification_steps %}
{{ loop.index }}. {{ step }}
{% endfor %}
{% endif %}

### Definition of Done
{% for item in definition_of_done %}
- [ ] {{ item }}
{% endfor %}