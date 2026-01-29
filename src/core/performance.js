/**
 * Performance Monitoring Utilities
 * Provides performance tracking, profiling, and optimization tools
 */

import { logger } from "../utils/logger.js";

/**
 * Performance monitor for tracking slow operations
 */
export const performanceMonitor = {
  enabled: typeof performance !== "undefined",

  start(label) {
    if (!this.enabled) return null;
    return {
      label,
      startTime: performance.now(),
    };
  },

  end(marker) {
    if (!this.enabled || !marker) return;
    const duration = performance.now() - marker.startTime;
    if (duration > 5) {
      // Only log if > 5ms
      logger.warn(`Slow ${marker.label}: ${duration.toFixed(2)}ms`);
    }
  },

  measure(fn, label) {
    const marker = this.start(label);
    try {
      const result = fn();
      this.end(marker);
      return result;
    } catch (error) {
      this.end(marker);
      throw error;
    }
  },
};

/**
 * Enhanced debounce with performance tracking
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 100) {
  let timeout;
  let callCount = 0;

  return function (...args) {
    const context = this;
    callCount++;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const marker = performanceMonitor.start(
        `debounced:${func.name || "anonymous"}`
      );
      try {
        const result = func.apply(context, args);
        performanceMonitor.end(marker);
        return result;
      } catch (error) {
        performanceMonitor.end(marker);
        logger.error(`Debounced function error (call #${callCount}):`, error);
        throw error;
      }
    }, wait);
  };
}
