/**
 * Cache Management
 * 
 * Global caches and cache utilities for performance optimization.
 * Uses LRU (Least Recently Used) strategy to prevent memory leaks.
 * 
 * @module shared/cache
 */

import { LRUCache } from "../utils/lruCache.js";
import { MAX_CACHE_SIZE, MAX_SET_SIZE } from "./constants.js";

// ============================================================================
// Global Cache Instances
// ============================================================================

/**
 * Global registry to track injected keyframes (prevents duplication)
 * @type {LRUCache}
 */
export const injectedKeyframes = new LRUCache(MAX_SET_SIZE);

/**
 * Cache for twsx() input → output mapping
 * @type {LRUCache}
 */
export const twsxInputCache = new LRUCache(MAX_CACHE_SIZE);

/**
 * Cache for twsxVariants() results
 * @type {LRUCache}
 */
export const twsxVariantsResultCache = new LRUCache(MAX_CACHE_SIZE);

/**
 * Cache for CSS generator functions
 * @type {LRUCache}
 */
export const generatorCache = new LRUCache(MAX_CACHE_SIZE);

/**
 * WeakMap for object identity-based caching (fast lookup for repeated objects)
 * @type {WeakMap}
 */
export const objectIdentityCache = new WeakMap();

/**
 * Cache for configOptions
 * @type {LRUCache}
 */
export const configOptionsCache = new LRUCache(500);

/**
 * Cache for bracket value encoding
 * @type {LRUCache}
 */
export const encodeBracketCache = new LRUCache(1000);

/**
 * Cache for bracket value decoding
 * @type {LRUCache}
 */
export const decodeBracketCache = new LRUCache(1000);

/**
 * Cache for CSS resolution
 * @type {LRUCache}
 */
export const cssResolutionCache = new LRUCache(1000);

/**
 * Cache for selector parsing
 * @type {LRUCache}
 */
export const parseSelectorCache = new LRUCache(500);

/**
 * Set of injected CSS hashes (prevents duplicate injection)
 * @type {Set<string>}
 */
export const injectedCssHashSet = new Set();

/**
 * Registry of sourceKey → cssBlock for smart slot-based replacement
 * Prevents stale CSS chunks from accumulating across HMR cycles
 * @type {Map<string, string>}
 */
export const cssBlockRegistry = new Map();

// ============================================================================
// Cache Utilities
// ============================================================================

/**
 * Evict old entries from a Map when size exceeds maxSize.
 * LRU caches handle their own eviction automatically.
 * 
 * @deprecated Use LRUCache.set() instead - kept for backward compatibility
 * @param {Map|LRUCache} map - Map to evict from
 * @param {number} maxSize - Maximum size
 */
export function evictMap(map, maxSize = MAX_CACHE_SIZE) {
  if (map instanceof LRUCache) return; // LRUCache handles its own eviction
  if (map.size <= maxSize) return;
  const excess = map.size - maxSize;
  const iter = map.keys();
  for (let i = 0; i < excess; i++) {
    map.delete(iter.next().value);
  }
}

/**
 * Evict old entries from a Set when size exceeds maxSize.
 * 
 * @deprecated Use LRUCache instead - kept for backward compatibility
 * @param {Set|LRUCache} set - Set to evict from
 * @param {number} maxSize - Maximum size
 */
export function evictSet(set, maxSize = MAX_SET_SIZE) {
  if (set instanceof LRUCache) return; // LRUCache handles its own eviction
  if (set.size <= maxSize) return;
  const excess = set.size - maxSize;
  const iter = set.values();
  for (let i = 0; i < excess; i++) {
    set.delete(iter.next().value);
  }
}

/**
 * Clear all global caches.
 * Useful for testing or memory cleanup.
 */
export function clearAllCaches() {
  injectedKeyframes.clear();
  twsxInputCache.clear();
  twsxVariantsResultCache.clear();
  generatorCache.clear();
  configOptionsCache.clear();
  encodeBracketCache.clear();
  decodeBracketCache.clear();
  cssResolutionCache.clear();
  parseSelectorCache.clear();
  injectedCssHashSet.clear();
  cssBlockRegistry.clear();
}

/**
 * Get cache statistics for debugging.
 * 
 * @returns {Object} Cache stats
 */
export function getCacheStats() {
  return {
    injectedKeyframes: injectedKeyframes.size,
    twsxInputCache: twsxInputCache.size,
    twsxVariantsResultCache: twsxVariantsResultCache.size,
    generatorCache: generatorCache.size,
    configOptionsCache: configOptionsCache.size,
    encodeBracketCache: encodeBracketCache.size,
    decodeBracketCache: decodeBracketCache.size,
    cssResolutionCache: cssResolutionCache.size,
    parseSelectorCache: parseSelectorCache.size,
    injectedCssHashSet: injectedCssHashSet.size,
    cssBlockRegistry: cssBlockRegistry.size,
  };
}
