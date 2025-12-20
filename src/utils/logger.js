/**
 * Logger class with configurable log levels
 * Prevents console spam in production
 */
class Logger {
  constructor(level = "warn") {
    this.level = level;
    this.levels = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
      silent: 4,
    };
  }

  /**
   * Set the log level
   * @param {string} level - One of 'debug', 'info', 'warn', 'error', 'silent'
   */
  setLevel(level) {
    if (this.levels[level] !== undefined) {
      this.level = level;
    }
  }

  /**
   * Get current log level
   */
  getLevel() {
    return this.level;
  }

  /**
   * Check if a message should be logged
   */
  shouldLog(level) {
    return this.levels[level] >= this.levels[this.level];
  }

  /**
   * Log debug message
   */
  debug(message, ...args) {
    if (this.shouldLog("debug")) {
      console.debug(`[twsx:debug] ${message}`, ...args);
    }
  }

  /**
   * Log info message
   */
  info(message, ...args) {
    if (this.shouldLog("info")) {
      console.info(`[twsx:info] ${message}`, ...args);
    }
  }

  /**
   * Log warning message
   */
  warn(message, ...args) {
    if (this.shouldLog("warn")) {
      console.warn(`[twsx:warn] ${message}`, ...args);
    }
  }

  /**
   * Log error message
   */
  error(message, ...args) {
    if (this.shouldLog("error")) {
      console.error(`[twsx:error] ${message}`, ...args);
    }
  }
}

// Create singleton instance with production-safe defaults
const isProduction =
  typeof process !== "undefined" && process.env?.NODE_ENV === "production";
export const logger = new Logger(isProduction ? "error" : "warn");

// Export Logger class for custom instances
export { Logger };
