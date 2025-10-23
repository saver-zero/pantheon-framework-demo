import { ErrorTypes } from '../services/cliApiClient';

function getErrorMessage(error) {
  switch (error.type) {
    case ErrorTypes.TIMEOUT:
      return {
        title: 'Request Timed Out',
        message: 'Request timed out after 30 seconds. The AI took too long to respond. Please try again.',
        details: null
      };

    case ErrorTypes.CLI_EXECUTION_FAILED:
      return {
        title: 'CLI Execution Failed',
        message: error.message || 'Failed to execute Claude CLI command.',
        details: error.details
      };

    case ErrorTypes.VALIDATION_ERROR:
      return {
        title: 'Invalid Input',
        message: error.message || 'Please check your inputs and try again.',
        details: null
      };

    case ErrorTypes.EMPTY_RESPONSE:
      return {
        title: 'Empty Response',
        message: 'Received empty response from AI. Please try again.',
        details: null
      };

    case ErrorTypes.NETWORK_ERROR:
      return {
        title: 'Network Error',
        message: 'Failed to connect to the server. Please check your connection and try again.',
        details: error.details
      };

    default:
      return {
        title: 'Error',
        message: error.message || 'An unexpected error occurred.',
        details: error.details
      };
  }
}

export function ErrorState({ error, onRetry }) {
  const errorInfo = getErrorMessage(error);

  return (
    <div className="error-state" role="alert" aria-live="assertive">
      <div className="error-icon">⚠</div>
      <h2 className="error-title">{errorInfo.title}</h2>
      <p className="error-message">{errorInfo.message}</p>
      {errorInfo.details && (
        <div className="error-details">
          <strong>Details:</strong> {errorInfo.details}
        </div>
      )}
      <button onClick={onRetry} className="retry-button">
        Retry
      </button>
    </div>
  );
}
