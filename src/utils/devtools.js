/**
 * DevTools Integration
 * 
 * Exposes library internals to browser DevTools for debugging and inspection.
 * Only enabled in non-production environments by default.
 * 
 * @module utils/devtools
 */

import { performanceMonitor } from './performanceMonitor.js';
import { getPlugins, getPluginStats } from '../plugins/pluginAPI.js';
import { tokenRegistry } from '../tokens/index.js';

// Check environment
const IS_PRODUCTION = 
  typeof process !== 'undefined' && 
  process.env && 
  process.env.NODE_ENV === 'production';

const IS_BROWSER = typeof window !== 'undefined';

/**
 * DevTools API exposed to window.__TWS_DEVTOOLS__
 */
class DevToolsAPI {
  constructor() {
    this.enabled = !IS_PRODUCTION;
    this.version = '4.0.1'; // Should match package.json
    this.caches = new Map(); // Store cache references
  }

  /**
   * Enable or disable DevTools
   * @param {boolean} enabled
   */
  setEnabled(enabled) {
    this.enabled = enabled;
  }

  /**
   * Register a cache for inspection
   * @param {string} name - Cache name
   * @param {Object} cache - Cache object (Map, LRUCache, etc.)
   */
  registerCache(name, cache) {
    this.caches.set(name, cache);
  }

  /**
   * Get cache statistics
   * @returns {Object} Cache stats by name
   */
  getCacheStats() {
    if (!this.enabled) return null;

    const stats = {};
    this.caches.forEach((cache, name) => {
      stats[name] = {
        size: cache.size || 0,
        maxSize: cache.maxSize || 'unlimited',
        type: cache.constructor.name,
      };
    });
    return stats;
  }

  /**
   * Get CSS for a specific class name
   * @param {string} className - Class name to lookup
   * @returns {string|null} CSS string or null if not found
   */
  getCSSForClass(className) {
    if (!this.enabled) return null;

    const styleRegistry = this.caches.get('styleRegistry');
    if (!styleRegistry) return null;

    return styleRegistry.get ? styleRegistry.get(className) : null;
  }

  /**
   * Get all design tokens
   * @returns {Object} Token tree
   */
  getTokens() {
    if (!this.enabled) return null;
    return tokenRegistry.getAll();
  }

  /**
   * Get performance metrics
   * @returns {Object} Performance stats
   */
  getPerformanceMetrics() {
    if (!this.enabled) return null;
    return performanceMonitor.getMetrics();
  }

  /**
   * Get slowest operations
   * @param {number} topN - Number of top operations to return
   * @returns {Array} Slowest operations
   */
  getSlowestOperations(topN = 10) {
    if (!this.enabled) return null;
    return performanceMonitor.getSlowest(topN);
  }

  /**
   * Get plugin information
   * @returns {Object} Plugin stats and list
   */
  getPluginInfo() {
    if (!this.enabled) return null;
    return {
      stats: getPluginStats(),
      plugins: getPlugins().map(p => ({
        name: p.name,
        version: p.version,
        description: p.description,
        type: p.type,
        registeredAt: p.registeredAt,
        hasUtilities: Object.keys(p.utilities || {}).length > 0,
        hasComponents: Object.keys(p.components || {}).length > 0,
        hasHandler: p.handler !== null,
      })),
    };
  }

  /**
   * Clear all caches (use with caution!)
   * @returns {Object} Number of entries cleared per cache
   */
  clearAllCaches() {
    if (!this.enabled) return null;

    const cleared = {};
    this.caches.forEach((cache, name) => {
      const sizeBefore = cache.size || 0;
      if (cache.clear) {
        cache.clear();
      }
      cleared[name] = sizeBefore;
    });

    return cleared;
  }

  /**
   * Clear performance metrics
   */
  clearMetrics() {
    if (!this.enabled) return;
    performanceMonitor.clearMetrics();
  }

  /**
   * Get library configuration
   * @returns {Object} Current configuration
   */
  getConfig() {
    if (!this.enabled) return null;

    return {
      version: this.version,
      isProduction: IS_PRODUCTION,
      isBrowser: IS_BROWSER,
      performanceMonitor: {
        enabled: performanceMonitor.enabled,
        logSlowOps: performanceMonitor.logSlowOps,
        threshold: performanceMonitor.threshold,
      },
    };
  }

  /**
   * Configure performance monitor from DevTools
   * @param {Object} config - Performance monitor config
   */
  configurePerformance(config) {
    if (!this.enabled) return;
    performanceMonitor.configure(config);
  }

  /**
   * Inspect a specific cache entry
   * @param {string} cacheName - Name of cache
   * @param {string} key - Cache key
   * @returns {*} Cache value or null
   */
  inspectCacheEntry(cacheName, key) {
    if (!this.enabled) return null;

    const cache = this.caches.get(cacheName);
    if (!cache) return null;

    return cache.get ? cache.get(key) : null;
  }

  /**
   * Get all cache keys
   * @param {string} cacheName - Name of cache
   * @returns {Array} Array of keys
   */
  getCacheKeys(cacheName) {
    if (!this.enabled) return null;

    const cache = this.caches.get(cacheName);
    if (!cache) return null;

    if (cache.cache && cache.cache instanceof Map) {
      // LRUCache
      return Array.from(cache.cache.keys());
    } else if (cache.keys) {
      return Array.from(cache.keys());
    }

    return [];
  }

  /**
   * Get comprehensive debug snapshot
   * @returns {Object} Complete debug snapshot
   */
  getDebugSnapshot() {
    if (!this.enabled) return null;

    return {
      timestamp: Date.now(),
      config: this.getConfig(),
      caches: this.getCacheStats(),
      performance: {
        metrics: this.getPerformanceMetrics(),
        slowest: this.getSlowestOperations(5),
      },
      plugins: this.getPluginInfo(),
      tokens: this.getTokens(),
    };
  }

  /**
   * Export debug snapshot as JSON
   * @returns {string} JSON string
   */
  exportDebugSnapshot() {
    if (!this.enabled) return null;
    return JSON.stringify(this.getDebugSnapshot(), null, 2);
  }
}

// ============================================================================
// Initialize DevTools
// ============================================================================

let devToolsInstance = null;

/**
 * Initialize DevTools integration
 * @param {Object} caches - Map of cache name to cache object
 * @returns {DevToolsAPI} DevTools instance
 */
export function initDevTools(caches = {}) {
  if (!IS_BROWSER) return null;

  if (!devToolsInstance) {
    devToolsInstance = new DevToolsAPI();

    // Register provided caches
    Object.entries(caches).forEach(([name, cache]) => {
      devToolsInstance.registerCache(name, cache);
    });

    // Expose to window (only in non-production)
    if (!IS_PRODUCTION && typeof window !== 'undefined') {
      window.__TWS_DEVTOOLS__ = devToolsInstance;
      console.log(
        '%c[tailwind-to-style] DevTools enabled',
        'color: #3b82f6; font-weight: bold;',
        '\nAccess via window.__TWS_DEVTOOLS__'
      );
    }
  }

  return devToolsInstance;
}

/**
 * Get DevTools instance
 * @returns {DevToolsAPI|null} DevTools instance or null
 */
export function getDevTools() {
  return devToolsInstance;
}

/**
 * Register a cache with DevTools
 * @param {string} name - Cache name
 * @param {Object} cache - Cache object
 */
export function registerCache(name, cache) {
  if (devToolsInstance) {
    devToolsInstance.registerCache(name, cache);
  }
}

export default DevToolsAPI;
