## Recommended Actions

### Priority Actions
{% for action in priority_actions %}
#### {{ loop.index }}. {{ action.title }}

**Priority:** {{ action.priority }}

**Rationale:** {{ action.rationale }}

**Estimated Effort:** {{ action.estimated_effort }}

**Reviewers Supporting:** {{ action.supporting_reviewers|join(', ') }}
{% endfor %}

### Optional Improvements
{% if optional_improvements %}
{% for improvement in optional_improvements %}
- **{{ improvement.title }}**: {{ improvement.description }}
{% endfor %}
{% else %}
No optional improvements suggested.
{% endif %}

### Merge Recommendation

**Status:** {{ merge_recommendation_status }}

**Justification:** {{ merge_recommendation_justification }}

**Conditions for Merge:**
{% for condition in merge_conditions %}
- [ ] {{ condition }}
{% endfor %}