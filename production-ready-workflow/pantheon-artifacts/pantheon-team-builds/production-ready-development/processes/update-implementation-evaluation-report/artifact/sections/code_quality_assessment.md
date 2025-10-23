## Code Quality Assessment

### Code Structure

{{ code_structure_assessment }}

### Maintainability
{% for item in maintainability_items %}
- **{{ item.aspect }}**: {{ item.assessment }}
{% endfor %}

### Code Standards Compliance
{% for standard in code_standards %}
- **{{ standard.standard }}**: {{ standard.compliance }}
{% endfor %}

### Readability and Documentation

{{ readability_assessment }}