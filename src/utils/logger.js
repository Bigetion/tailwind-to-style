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

// Create singleton instance with silent defaults
// Can be enabled via TWSX_LOG_LEVEL environment variable
let logLevel = "silent";
try {
  if (typeof process !== "undefined" && process && process.env) {
    // Allow explicit log level override via environment variable
    // e.g., TWSX_LOG_LEVEL=debug or TWSX_LOG_LEVEL=warn
    logLevel = process.env.TWSX_LOG_LEVEL || "silent";
  }
} catch {
  // Silently fail - in browser environment, default to silent
  logLevel = "silent";
}

export const logger = new Logger(logLevel);

// Export Logger class for custom instances
export { Logger };
