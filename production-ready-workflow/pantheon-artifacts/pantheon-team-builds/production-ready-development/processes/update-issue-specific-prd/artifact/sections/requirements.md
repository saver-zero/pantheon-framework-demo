## Requirements

### Issue ID

{{ issue_id }}

### Feature Summary

{{ feature_summary }}

### Functional Requirements
{% for req in functional_requirements %}
- {{ req }}
{% endfor %}

### Scope Boundaries

**In Scope:**
{% for item in in_scope %}
- {{ item }}
{% endfor %}

**Out of Scope:**
{% for item in out_of_scope %}
- {{ item }}
{% endfor %}