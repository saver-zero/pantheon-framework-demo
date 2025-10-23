const TIMEOUT_MS = 30000;
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3100/api/generate-itinerary';

export class ErrorTypes {
  static TIMEOUT = 'TIMEOUT';
  static CLI_EXECUTION_FAILED = 'CLI_EXECUTION_FAILED';
  static VALIDATION_ERROR = 'VALIDATION_ERROR';
  static EMPTY_RESPONSE = 'EMPTY_RESPONSE';
  static NETWORK_ERROR = 'NETWORK_ERROR';
}

export class CLIApiClient {
  static async generateItinerary(formData) {
    const startTime = Date.now();

    try {
      this.validateFormData(formData);
    } catch (error) {
      throw {
        type: ErrorTypes.VALIDATION_ERROR,
        message: error.message,
        duration: Date.now() - startTime
      };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          type: ErrorTypes.CLI_EXECUTION_FAILED,
          message: errorData.error || `Server returned ${response.status}`,
          details: errorData.details,
          duration: Date.now() - startTime
        };
      }

      const result = await response.json();
      const duration = Date.now() - startTime;

      if (!result.itinerary || result.itinerary.trim() === '') {
        throw {
          type: ErrorTypes.EMPTY_RESPONSE,
          message: 'Received empty response from AI',
          duration
        };
      }

      return {
        itineraryMarkdown: result.itinerary,
        generationDuration: duration
      };

    } catch (error) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        throw {
          type: ErrorTypes.TIMEOUT,
          message: 'Request timed out after 30 seconds',
          duration: TIMEOUT_MS
        };
      }

      if (error.type) {
        throw error;
      }

      throw {
        type: ErrorTypes.NETWORK_ERROR,
        message: 'Network error occurred',
        details: error.message,
        duration: Date.now() - startTime
      };
    }
  }

  static validateFormData(formData) {
    if (!formData.destination || formData.destination.trim().length < 3) {
      throw new Error('Destination must be at least 3 characters');
    }

    if (!formData.partyInfo || formData.partyInfo.trim().length === 0) {
      throw new Error('Party information is required');
    }

    if (!formData.travelMonth || formData.travelMonth.trim().length === 0) {
      throw new Error('Travel month is required');
    }

    const days = parseInt(formData.days);
    if (isNaN(days) || days < 1 || days > 7 || days !== parseFloat(formData.days)) {
      throw new Error('Days must be an integer between 1 and 7');
    }
  }
}
