/**
 * Centralized Cache Management Module
 * Provides unified cache interface with clear invalidation strategy,
 * memory limits, and debug tools
 */

import { LRUCache } from "../utils/lruCache.js";
import { logger } from "../utils/logger.js";

/**
 * Cache Manager - Centralized cache management
 */
export class CacheManager {
  constructor() {
    // Global registry to track injected keyframes (prevents duplication)
    this.injectedKeyframes = new Set();

    // Global cache Maps for cached versions
    this.twsxInputCache = new Map();
    this.twsxVariantsResultCache = new Map();

    // WeakMap for object identity-based caching (fast lookup for repeated objects)
    this.objectIdentityCache = new WeakMap();

    // LRU Caches with size limits
    this.configOptionsCache = new LRUCache(500);
    this.cssResolutionCache = new LRUCache(1000);
    this.encodeBracketCache = new LRUCache(1000);
    this.decodeBracketCache = new LRUCache(1000);
    this.parseSelectorCache = new LRUCache(500);

    // CSS injection tracking
    this.injectedCssHashSet = new Set();

    // Statistics
    this.stats = {
      hits: 0,
      misses: 0,
      invalidations: 0,
    };
  }

  /**
   * Clear all caches
   */
  clearAll() {
    this.injectedKeyframes.clear();
    this.twsxInputCache.clear();
    this.twsxVariantsResultCache.clear();
    this.configOptionsCache.clear();
    this.cssResolutionCache.clear();
    this.encodeBracketCache.clear();
    this.decodeBracketCache.clear();
    this.parseSelectorCache.clear();
    this.injectedCssHashSet.clear();

    this.stats.invalidations++;
    logger.info("All caches cleared");
  }

  /**
   * Clear config-related caches only
   */
  clearConfigCache() {
    this.configOptionsCache.clear();
    this.stats.invalidations++;
    logger.debug("Config cache cleared");
  }

  /**
   * Clear CSS-related caches only
   */
  clearCssCache() {
    this.twsxInputCache.clear();
    this.cssResolutionCache.clear();
    this.parseSelectorCache.clear();
    this.stats.invalidations++;
    logger.debug("CSS cache cleared");
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      ...this.stats,
      sizes: {
        injectedKeyframes: this.injectedKeyframes.size,
        twsxInputCache: this.twsxInputCache.size,
        twsxVariantsResultCache: this.twsxVariantsResultCache.size,
        configOptionsCache: this.configOptionsCache.size,
        cssResolutionCache: this.cssResolutionCache.size,
        encodeBracketCache: this.encodeBracketCache.size,
        decodeBracketCache: this.decodeBracketCache.size,
        parseSelectorCache: this.parseSelectorCache.size,
        injectedCssHashSet: this.injectedCssHashSet.size,
      },
    };
  }

  /**
   * Log cache statistics
   */
  logStats() {
    const stats = this.getStats();
    logger.info("Cache Statistics:", stats);
  }

  /**
   * Set memory limits for caches
   * @param {Object} limits - Cache size limits
   */
  setLimits(limits = {}) {
    const {
      configOptions = 500,
      cssResolution = 1000,
      encodeBracket = 1000,
      decodeBracket = 1000,
      parseSelector = 500,
    } = limits;

    this.configOptionsCache = new LRUCache(configOptions);
    this.cssResolutionCache = new LRUCache(cssResolution);
    this.encodeBracketCache = new LRUCache(encodeBracket);
    this.decodeBracketCache = new LRUCache(decodeBracket);
    this.parseSelectorCache = new LRUCache(parseSelector);

    logger.debug("Cache limits updated:", limits);
  }

  /**
   * Track cache hit
   */
  trackHit() {
    this.stats.hits++;
  }

  /**
   * Track cache miss
   */
  trackMiss() {
    this.stats.misses++;
  }

  /**
   * Get cache hit rate
   */
  getHitRate() {
    const total = this.stats.hits + this.stats.misses;
    return total > 0 ? (this.stats.hits / total) * 100 : 0;
  }
}

// Singleton instance
export const cacheManager = new CacheManager();

/**
 * Clear config cache (exported for backward compatibility)
 */
export function clearConfigCache() {
  cacheManager.clearConfigCache();
}

/**
 * Debug function to inspect cache state
 */
export function debugCache() {
  console.group("📊 Cache Debug Information");
  console.log("Statistics:", cacheManager.getStats());
  console.log("Hit Rate:", `${cacheManager.getHitRate().toFixed(2)}%`);
  console.groupEnd();
}
