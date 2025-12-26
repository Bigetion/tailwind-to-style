/**
 * Optimization module for tailwind-to-style
 * Provides bundle size optimization, build-time extraction, critical CSS, and CSS purging
 * @module optimization
 */

export { BundleAnalyzer } from './bundleAnalyzer.js';
export { BuildTimeExtractor } from './buildTimeExtractor.js';
export { CriticalCSSExtractor } from './criticalCSS.js';
export { CSSPurger } from './cssPurger.js';
export { PersistentCache } from './persistentCache.js';
export { OptimizationManager } from './optimizationManager.js';

/**
 * Quick access API for common optimization tasks
 */
export const optimize = {
  /**
   * Analyze bundle size and get recommendations
   */
  analyzeBundle: async (options = {}) => {
    const { BundleAnalyzer } = await import('./bundleAnalyzer.js');
    return new BundleAnalyzer(options).analyze();
  },

  /**
   * Extract CSS at build time
   */
  extractCSS: async (options = {}) => {
    const { BuildTimeExtractor } = await import('./buildTimeExtractor.js');
    return new BuildTimeExtractor(options).extract();
  },

  /**
   * Generate critical CSS
   */
  extractCritical: async (options = {}) => {
    const { CriticalCSSExtractor } = await import('./criticalCSS.js');
    return new CriticalCSSExtractor(options).extract();
  },

  /**
   * Purge unused CSS
   */
  purgeCSS: async (options = {}) => {
    const { CSSPurger } = await import('./cssPurger.js');
    return new CSSPurger(options).purge();
  },
};
