/**
 * Fast Hashing Utilities for Object Caching
 * Provides FNV-1a hash algorithm and deep object hashing
 */

/**
 * FNV-1a hash algorithm - Fast and good distribution for strings
 * @param {string} str - String to hash
 * @returns {number} 32-bit hash
 */
export function hashString(str) {
  let hash = 2166136261; // FNV offset basis
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619); // FNV prime
  }
  return hash >>> 0; // Convert to unsigned 32-bit
}

/**
 * Simple hashCode function for CSS deduplication
 * @param {string} str - String to hash
 * @returns {number} Hash code
 */
export function getCssHash(str) {
  let hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

/**
 * Fast deep hash for objects - Optimized for style objects
 * Strategy:
 * 1. Use object identity (WeakMap) for exact same object references
 * 2. For different objects, create stable hash from sorted keys + values
 * 3. Cache hash per object to avoid recomputation
 *
 * @param {any} obj - Object to hash
 * @param {Object} options - Additional options to include in hash
 * @param {WeakMap} identityCache - WeakMap for object identity caching
 * @returns {string} Hash key for caching
 */
export function fastObjectHash(obj, options = {}, identityCache = new WeakMap()) {
  // Handle primitives
  if (obj === null || obj === undefined) return "null";
  if (typeof obj !== "object") return String(obj);

  // Try object identity cache first (FASTEST - O(1))
  const identityKey = identityCache.get(obj);
  if (identityKey) {
    // Include options in key if provided
    return options && Object.keys(options).length > 0
      ? `${identityKey}:${JSON.stringify(options)}`
      : identityKey;
  }

  // Generate hash from object structure
  const parts = [];

  // Collect keys and sort for stability
  const keys = Object.keys(obj).sort();

  for (const key of keys) {
    const value = obj[key];

    if (value && typeof value === "object") {
      // Nested object: recursively hash
      parts.push(`${key}:${fastObjectHash(value, {}, identityCache)}`);
    } else {
      // Primitive: direct conversion
      parts.push(`${key}:${value}`);
    }
  }

  // Hash the concatenated string (faster than storing full string)
  const structureStr = parts.join("|");
  const hash = hashString(structureStr);

  // Create compact key: hash + length (collision detection)
  const hashKey = `h${hash}_l${keys.length}`;

  // Store in WeakMap for future O(1) lookups
  identityCache.set(obj, hashKey);

  // Include options if provided
  return options && Object.keys(options).length > 0
    ? `${hashKey}:${JSON.stringify(options)}`
    : hashKey;
}
