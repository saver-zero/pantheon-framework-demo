{
  "type": "object",
  "required": [
    "api_endpoints",
    "business_logic",
    "service_integration"
  ],
  "properties": {
    "api_endpoints": {
      "authoring_guidance": "List 2-10 endpoints typically. Include all CRUD operations needed. Specify request/response structures clearly. Reference component friendly IDs from wireframe where applicable.",
      "description_for_schema": "List all API endpoints required for this feature, including HTTP method, path, request/response formats, and purpose.",
      "items": {
        "properties": {
          "method": {
            "description_for_schema": "HTTP method (GET, POST, PUT, PATCH, DELETE).",
            "purpose": "HTTP method for this endpoint.",
            "type": "string"
          },
          "path": {
            "description_for_schema": "API endpoint path (e.g., '/api/users/:id', '/api/products').",
            "purpose": "URL path for the endpoint.",
            "type": "string"
          },
          "purpose": {
            "authoring_guidance": "Target 20-50 words. Explain the endpoint's purpose and key behavior.",
            "description_for_schema": "Brief description of what this endpoint does.",
            "purpose": "Explains what this endpoint accomplishes.",
            "type": "string"
          },
          "request_format": {
            "description_for_schema": "Description of request body/query parameters with types and required fields.",
            "purpose": "Specifies expected request structure.",
            "type": "string"
          },
          "response_format": {
            "description_for_schema": "Description of response body structure with types and fields.",
            "purpose": "Specifies response structure.",
            "type": "string"
          }
        },
        "required": [
          "method",
          "path",
          "purpose",
          "request_format",
          "response_format"
        ],
        "type": "object"
      },
      "purpose": "Defines the HTTP interface for this feature, establishing the contract between frontend and backend that drives implementation.",
      "type": "array"
    },
    "business_logic": {
      "authoring_guidance": "Target 200-400 words. Cover validation rules, business workflows, calculations, state management, and processing steps. Reference API endpoints and database tables. Keep at conceptual level - not pseudocode.",
      "description_for_schema": "Describe the key business logic and processing that the backend must perform. Include validation rules, calculations, workflows, and state transitions.",
      "purpose": "Describes the core business rules and processing logic that the backend must implement, bridging the gap between API endpoints and data layer.",
      "type": "string"
    },
    "service_integration": {
      "authoring_guidance": "Target 100-200 words. List each integration point with its purpose. Mention authentication mechanisms, data formats, retry/error strategies. Reference system context from brainstorming if applicable.",
      "description_for_schema": "Describe how the backend integrates with existing services, external APIs, or third-party systems. Include authentication methods, data exchange formats, and error handling.",
      "purpose": "Documents how this feature connects with existing backend services, external APIs, or third-party systems.",
      "type": "string"
    }
  }
}