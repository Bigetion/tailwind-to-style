import { logger } from "./logger.js";

/**
 * Custom error class for tailwind-to-style
 */
export class TwsError extends Error {
  constructor(message, context = {}) {
    super(message);
    this.name = "TwsError";
    this.context = context;
    this.timestamp = new Date().toISOString();
  }
}

/**
 * Error event handlers
 */
const errorHandlers = new Set();

/**
 * Register an error handler
 * @param {Function} handler - Function to call when errors occur
 * @returns {Function} Unsubscribe function
 */
export function onError(handler) {
  if (typeof handler !== "function") {
    throw new TypeError("Error handler must be a function");
  }

  errorHandlers.add(handler);

  // Return unsubscribe function
  return () => errorHandlers.delete(handler);
}

/**
 * Handle and broadcast errors
 * @param {Error} error - The error that occurred
 * @param {Object} context - Additional context about the error
 */
export function handleError(error, context = {}) {
  const twsError =
    error instanceof TwsError ? error : new TwsError(error.message, context);

  // Log the error
  logger.error(twsError.message, twsError.context);

  // Notify all registered handlers
  errorHandlers.forEach((handler) => {
    try {
      handler(twsError);
    } catch (handlerError) {
      logger.error("Error in error handler:", handlerError);
    }
  });

  return twsError;
}

/**
 * Clear all error handlers
 */
export function clearErrorHandlers() {
  errorHandlers.clear();
}

/**
 * Get number of registered error handlers
 */
export function getErrorHandlerCount() {
  return errorHandlers.size;
}
