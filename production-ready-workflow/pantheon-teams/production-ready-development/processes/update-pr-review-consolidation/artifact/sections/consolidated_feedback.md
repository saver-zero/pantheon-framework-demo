## Consolidated Feedback

### Pull Request

**PR Number:** {{ pr_number }}
{% if prd_reference %}
**Associated PRD:** {{ prd_reference }}
{% endif %}

### Review Sources
{% for source in review_sources %}
- **{{ source.source }}**: {{ source.comment_count }} comments
{% endfor %}

### Feedback by Theme
{% for theme in feedback_themes %}
#### {{ theme.theme_name }}

**Comments:** {{ theme.comment_count }}

**Summary:** {{ theme.summary }}

**Representative Comments:**
{% for comment in theme.representative_comments %}
- {{ comment }}
{% endfor %}
{% endfor %}

### Severity Distribution

- **Critical:** {{ severity_distribution.critical }}

- **Medium:** {{ severity_distribution.medium }}

- **Low:** {{ severity_distribution.low }}

- **Informational:** {{ severity_distribution.informational }}