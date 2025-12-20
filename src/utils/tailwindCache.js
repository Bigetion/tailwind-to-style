/**
 * TailwindCache singleton for managing generated Tailwind CSS
 * Replaces global state with proper encapsulation
 */
class TailwindCache {
  constructor() {
    this.twString = null;
    this.cssObject = null;
    this.initialized = false;
  }

  /**
   * Get or generate the CSS object
   * @param {Function} generateFn - Function to generate CSS string
   * @param {Function} convertFn - Function to convert CSS string to object
   * @returns {Object} CSS object lookup
   */
  getOrGenerate(generateFn, convertFn) {
    if (!this.initialized) {
      this.twString = generateFn().replace(/\s\s+/g, ' ');
      this.cssObject = convertFn(this.twString);
      this.initialized = true;
    }
    return this.cssObject;
  }

  /**
   * Get the CSS string
   */
  getCssString() {
    return this.twString;
  }

  /**
   * Get the CSS object
   */
  getCssObject() {
    return this.cssObject;
  }

  /**
   * Check if cache is initialized
   */
  isInitialized() {
    return this.initialized;
  }

  /**
   * Reset the cache (useful for testing)
   */
  reset() {
    this.twString = null;
    this.cssObject = null;
    this.initialized = false;
  }
}

// Singleton instance
let instance = null;

/**
 * Get the TailwindCache singleton instance
 * @returns {TailwindCache} The cache instance
 */
export function getTailwindCache() {
  if (!instance) {
    instance = new TailwindCache();
  }
  return instance;
}

/**
 * Reset the TailwindCache singleton (for testing)
 */
export function resetTailwindCache() {
  if (instance) {
    instance.reset();
  }
  instance = null;
}

// Export class for type checking
export { TailwindCache };
