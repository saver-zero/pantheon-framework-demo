/**
 * Simple logging abstraction with environment-based log level control
 *
 * Log levels: debug, info, error
 * Set LOG_LEVEL environment variable to control verbosity
 * Default: 'info' (shows info and error)
 *
 * Examples:
 * - LOG_LEVEL=debug - Shows all logs (debug, info, error)
 * - LOG_LEVEL=info - Shows info and error logs (default)
 * - LOG_LEVEL=error - Shows only error logs
 */

const LOG_LEVELS = {
  debug: 0,
  info: 1,
  error: 2
};

const currentLogLevel = LOG_LEVELS[process.env.LOG_LEVEL] ?? LOG_LEVELS.info;

export const logger = {
  /**
   * Debug level logging - for detailed diagnostic information
   * Only shown when LOG_LEVEL=debug
   */
  debug: (...args) => {
    if (currentLogLevel <= LOG_LEVELS.debug) {
      console.log('[DEBUG]', ...args);
    }
  },

  /**
   * Info level logging - for general informational messages
   * Shown when LOG_LEVEL=debug or LOG_LEVEL=info (default)
   */
  info: (...args) => {
    if (currentLogLevel <= LOG_LEVELS.info) {
      console.log('[INFO]', ...args);
    }
  },

  /**
   * Error level logging - for error conditions
   * Always shown regardless of LOG_LEVEL
   */
  error: (...args) => {
    if (currentLogLevel <= LOG_LEVELS.error) {
      console.error('[ERROR]', ...args);
    }
  }
};
