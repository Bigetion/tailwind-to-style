/**
 * Hash Utilities
 * 
 * Fast hashing functions for string and object caching.
 * Extracted from monolithic index.js for reusability.
 * 
 * @module shared/hash
 */

/**
 * Fast string hash using FNV-1a algorithm.
 * Produces 32-bit hash values for cache keys.
 * 
 * @param {string} str - String to hash
 * @returns {number} 32-bit hash
 * 
 * @example
 * hashString('bg-blue-500') // → 2845719273
 * hashString('hover:bg-red-600') // → 3927461034
 */
export function hashString(str) {
  let hash = 2166136261; // FNV offset basis
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    // FNV prime: 16777619
    hash =
      (hash * 16777619) >>> 0; // >>> 0 keeps it a 32-bit unsigned integer
  }
  return hash;
}

/**
 * Fast object hashing for cache keys.
 * Handles primitives, arrays, and nested objects.
 * 
 * Performance optimizations:
 * - Primitive fast-path
 * - Depth limit for nested objects
 * - Array length limit
 * - Sorted keys for consistent hashing
 * 
 * @param {*} obj - Object to hash
 * @param {Object} options - Hashing options
 * @param {number} options.maxDepth - Maximum nesting depth (default: 3)
 * @param {number} options.maxArrayLength - Maximum array length (default: 10)
 * @returns {string} Hash key for caching
 * 
 * @example
 * fastObjectHash({ color: 'primary', size: 'lg' })
 * // → '{"color":"primary","size":"lg"}'
 * 
 * @example
 * fastObjectHash([1, 2, 3], { maxArrayLength: 5 })
 * // → '[1,2,3]'
 */
export function fastObjectHash(obj, options = {}) {
  const { maxDepth = 3, maxArrayLength = 10 } = options;

  // Handle primitives
  if (obj === null || obj === undefined) return "null";
  if (typeof obj !== "object") return String(obj);

  // Arrays
  if (Array.isArray(obj)) {
    const items = obj.slice(0, maxArrayLength);
    return `[${items.map((item) => fastObjectHash(item, { maxDepth: maxDepth - 1, maxArrayLength })).join(",")}]`;
  }

  // Objects - stop at depth limit
  if (maxDepth <= 0) return "{}";

  // Sort keys for consistent hashing
  const keys = Object.keys(obj).sort();
  const pairs = keys.map((key) => {
    const value = obj[key];
    const hashedValue =
      typeof value === "object" && value !== null
        ? fastObjectHash(value, { maxDepth: maxDepth - 1, maxArrayLength })
        : JSON.stringify(value);
    return `"${key}":${hashedValue}`;
  });

  return `{${pairs.join(",")}}`;
}

/**
 * Generate a short hash for CSS class names.
 * Uses base36 encoding for compact, URL-safe identifiers.
 * 
 * @param {string} str - Input string
 * @param {number} length - Desired hash length (default: 8)
 * @returns {string} Short hash string
 * 
 * @example
 * getCssHash('bg-blue-500 p-4 rounded') // → 'x7k2m9n1'
 */
export function getCssHash(str, length = 8) {
  const hash = hashString(str);
  return hash.toString(36).substring(0, length);
}
