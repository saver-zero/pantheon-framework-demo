{
  "type": "object",
  "required": [
    "categories"
  ],
  "properties": {
    "categories": {
      "authoring_guidance": "Categorize all purchases into logical groups (e.g., Groceries, Household Supplies, Entertainment, Dining Out). Calculate total and percentage for each. List in descending order by amount. Aim for 3-6 categories - enough to reveal patterns but not so many that it becomes overwhelming.",
      "description_for_schema": "Array of spending categories, each with name, amount, and percentage of total spending",
      "items": {
        "properties": {
          "amount": {
            "authoring_guidance": "Sum all purchases in this category. Format with exactly 2 decimal places. Do not include dollar sign.",
            "description_for_schema": "Dollar amount for this category, formatted with 2 decimal places (e.g., '123.45')",
            "purpose": "The total dollar amount spent in this category.",
            "type": "string"
          },
          "name": {
            "description_for_schema": "Category name (e.g., 'Groceries', 'Household Supplies', 'Entertainment')",
            "purpose": "The category label that describes this type of spending.",
            "type": "string"
          },
          "percentage": {
            "authoring_guidance": "Calculate (category_amount / total_spent) * 100. Round to nearest integer. Do not include percent sign.",
            "description_for_schema": "Percentage of total spending for this category, as an integer (e.g., 35)",
            "purpose": "The proportion of total spending represented by this category.",
            "type": "integer"
          }
        },
        "required": [
          "name",
          "amount",
          "percentage"
        ],
        "type": "object"
      },
      "purpose": "A structured list of spending categories with their amounts and percentages. This reveals the distribution of spending across different areas of the user's budget.",
      "type": "array"
    }
  }
}