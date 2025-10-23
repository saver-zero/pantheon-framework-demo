## Implementation Guidance

### Recommended Approach

{{ recommended_approach }}

### Key Implementation Steps
{% for step in key_steps %}
{{ loop.index }}. {{ step }}
{% endfor %}
{% if code_snippets %}

### Helpful Code Snippets
{% for snippet in code_snippets %}
**{{ snippet.description }}:**

```{{ snippet.language }}

{{ snippet.code }}

```
{% endfor %}
{% endif %}

### Common Pitfalls to Avoid
{% for pitfall in common_pitfalls %}
- {{ pitfall }}
{% endfor %}