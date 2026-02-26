/**
 * Performance Monitoring Utilities
 * 
 * Tracks and logs performance metrics for optimization analysis.
 * 
 * @module utils/performanceMonitor
 */

import { logger } from "./logger.js";

/**
 * Performance monitoring system
 * 
 * Provides start/end timing and automatic slow operation logging.
 */
export const performanceMonitor = {
  enabled: typeof performance !== "undefined",

  /**
   * Start performance measurement
   * 
   * @param {string} label - Label for the measurement
   * @returns {Object|null} Marker object with label and start time
   */
  start(label) {
    if (!this.enabled) return null;
    return {
      label,
      startTime: performance.now(),
    };
  },

  /**
   * End performance measurement and log if slow
   * 
   * @param {Object} marker - Marker from start()
   */
  end(marker) {
    if (!this.enabled || !marker) return;
    const duration = performance.now() - marker.startTime;
    if (duration > 5) {
      // Only log if > 5ms
      logger.warn(`Slow ${marker.label}: ${duration.toFixed(2)}ms`);
    }
  },

  /**
   * Measure function execution time
   * 
   * @param {Function} fn - Function to measure
   * @param {string} label - Label for measurement
   * @returns {*} Function result
   */
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
