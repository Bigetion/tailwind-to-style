/**
 * Performance Monitoring Utilities
 * 
 * Tracks and logs performance metrics for optimization analysis.
 * Respects NODE_ENV and can be configured at runtime.
 * 
 * @module utils/performanceMonitor
 */

import { logger } from "./logger.js";

// Check environment - disable logging in production by default
const IS_PRODUCTION = 
  typeof process !== 'undefined' && 
  process.env && 
  process.env.NODE_ENV === 'production';

/**
 * Performance monitoring system
 * 
 * Provides start/end timing and automatic slow operation logging.
 * Can be configured at runtime via configure() method.
 */
export const performanceMonitor = {
  enabled: typeof performance !== "undefined",
  logSlowOps: !IS_PRODUCTION, // Disabled in production by default
  threshold: 5, // Log operations slower than 5ms
  metrics: new Map(), // Store metrics for telemetry

  /**
   * Configure performance monitor settings
   * @param {Object} config - Configuration object
   * @param {boolean} config.enabled - Enable/disable monitoring
   * @param {boolean} config.logSlowOps - Enable/disable logging slow operations
   * @param {number} config.threshold - Threshold in ms for slow operation logging
   */
  configure(config) {
    if (typeof config.enabled === 'boolean') {
      this.enabled = config.enabled;
    }
    if (typeof config.logSlowOps === 'boolean') {
      this.logSlowOps = config.logSlowOps;
    }
    if (typeof config.threshold === 'number' && config.threshold > 0) {
      this.threshold = config.threshold;
    }
  },

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
   * End performance measurement and optionally log if slow
   * 
   * @param {Object} marker - Marker from start()
   */
  end(marker) {
    if (!this.enabled || !marker) return;
    const duration = performance.now() - marker.startTime;
    
    // Always record metric for telemetry
    this.recordMetric(marker.label, duration);
    
    // Only log in dev mode or if explicitly enabled
    if (this.logSlowOps && duration > this.threshold) {
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

  /**
   * Record metric for telemetry/analytics
   * @private
   */
  recordMetric(label, duration) {
    if (!this.metrics.has(label)) {
      this.metrics.set(label, {
        count: 0,
        total: 0,
        min: Infinity,
        max: 0,
        avg: 0,
      });
    }

    const metric = this.metrics.get(label);
    metric.count++;
    metric.total += duration;
    metric.min = Math.min(metric.min, duration);
    metric.max = Math.max(metric.max, duration);
    metric.avg = metric.total / metric.count;

    // Send to analytics if available (in production)
    if (typeof window !== 'undefined' && window.twsAnalytics) {
      window.twsAnalytics.track('performance', { label, duration });
    }
  },

  /**
   * Get all recorded metrics
   * @returns {Object} Map of label to metric stats
   */
  getMetrics() {
    const result = {};
    this.metrics.forEach((value, key) => {
      result[key] = { ...value };
    });
    return result;
  },

  /**
   * Clear all metrics
   */
  clearMetrics() {
    this.metrics.clear();
  },

  /**
   * Get summary of slowest operations
   * @param {number} topN - Number of top slow operations to return
   * @returns {Array} Array of {label, avg, max, count}
   */
  getSlowest(topN = 10) {
    const entries = Array.from(this.metrics.entries()).map(([label, stats]) => ({
      label,
      avg: stats.avg,
      max: stats.max,
      count: stats.count,
    }));

    return entries
      .sort((a, b) => b.avg - a.avg)
      .slice(0, topN);
  },
};
