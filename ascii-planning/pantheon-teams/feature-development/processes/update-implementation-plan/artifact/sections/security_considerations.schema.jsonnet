{
  "type": "object",
  "required": [
    "auth_requirements",
    "input_validation",
    "data_protection"
  ],
  "properties": {
    "auth_requirements": {
      "authoring_guidance": "Target 100-200 words. Specify: authentication method, required roles/permissions for each endpoint, session/token handling, unauthorized access behavior. Be specific about permission checks.",
      "description_for_schema": "Describe authentication and authorization requirements: who can access this feature, role/permission checks, session handling, token validation.",
      "purpose": "Specifies who can access this feature and what permissions are required, establishing the access control model.",
      "type": "string"
    },
    "data_protection": {
      "authoring_guidance": "Target 100-200 words. Identify sensitive data fields. Specify: encryption requirements (at rest/in transit), data masking in logs/UI, audit logging needs, data retention policies, HTTPS requirements.",
      "description_for_schema": "Describe data protection requirements: sensitive fields, encryption needs, data masking, audit logging, HTTPS enforcement.",
      "purpose": "Ensures sensitive data is appropriately encrypted, masked, or access-controlled throughout its lifecycle.",
      "type": "string"
    },
    "input_validation": {
      "authoring_guidance": "Target 150-250 words. For each input: specify validation rules (type, length, format), sanitization steps, whitelist/blacklist approaches. Cover: SQL injection prevention, XSS prevention, file upload validation, API input validation.",
      "description_for_schema": "Describe input validation requirements: which inputs need validation, validation rules, sanitization steps, error handling for invalid input.",
      "purpose": "Identifies all user inputs that require validation to prevent injection attacks, data corruption, or system abuse.",
      "type": "string"
    }
  }
}