/**
 * Form validation utility functions for trip input form.
 * These validators return error messages or null for valid inputs.
 */

export const validateDestination = (value: string): string | null => {
  if (!value || value.trim().length === 0) {
    return 'Destination is required';
  }
  if (value.trim().length < 2) {
    return 'Destination must be at least 2 characters';
  }
  return null;
};

export const validatePartyInfo = (value: string): string | null => {
  if (!value || value.trim().length === 0) {
    return 'Party info is required';
  }
  if (value.trim().length < 2) {
    return 'Party info must be at least 2 characters';
  }
  return null;
};

export const validateMonth = (value: string): string | null => {
  if (!value || value.trim().length === 0) {
    return 'Month is required';
  }
  return null;
};

export const validateDays = (value: string): string | null => {
  if (!value || value.trim().length === 0) {
    return 'Days is required';
  }
  const numValue = parseInt(value, 10);
  if (isNaN(numValue)) {
    return 'Days must be a valid number';
  }
  if (numValue < 1) {
    return 'Days must be at least 1';
  }
  if (numValue > 30) {
    return 'Days cannot exceed 30';
  }
  return null;
};
