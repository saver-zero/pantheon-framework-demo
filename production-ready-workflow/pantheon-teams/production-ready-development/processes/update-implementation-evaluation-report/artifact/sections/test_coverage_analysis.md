## Test Coverage Analysis

### PRD Reference

**PRD ID:** {{ prd_id }}

### Test Execution Status

**All Tests Passing:** {{ all_tests_passing }}
{% if failed_tests %}

**Failed Tests:**
{% for test in failed_tests %}
- **{{ test.name }}**: {{ test.reason }}
{% endfor %}
{% endif %}

### Coverage Assessment

**Coverage Level:** {{ coverage_level }}

**Coverage Details:**

{{ coverage_details }}

### Test Quality Analysis
{% for analysis in test_quality_items %}
- **{{ analysis.aspect }}**: {{ analysis.assessment }}
{% endfor %}

### Coverage Gaps
{% if coverage_gaps %}
{% for gap in coverage_gaps %}
- {{ gap }}
{% endfor %}
{% else %}
No significant coverage gaps identified.
{% endif %}