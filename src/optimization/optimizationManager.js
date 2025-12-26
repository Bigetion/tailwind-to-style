/**
 * Optimization Manager - Unified interface for all optimization features
 * @module optimization/optimizationManager
 */

import { BundleAnalyzer } from "./bundleAnalyzer.js";
import { BuildTimeExtractor } from "./buildTimeExtractor.js";
import { CriticalCSSExtractor } from "./criticalCSS.js";
import { CSSPurger } from "./cssPurger.js";
import { PersistentCache } from "./persistentCache.js";
import { logger } from "../utils/logger.js";

export class OptimizationManager {
  constructor(options = {}) {
    this.options = {
      enableBundleAnalysis: true,
      enableBuildTimeExtraction: false,
      enableCriticalCSS: false,
      enablePurging: false,
      enablePersistentCache: true,
      ...options,
    };

    this.cache = null;
    this.stats = {};
  }

  /**
   * Initialize optimization manager
   */
  async initialize() {
    logger.info("Initializing optimization manager...");

    // Setup persistent cache
    if (this.options.enablePersistentCache) {
      this.cache = new PersistentCache(this.options.cacheOptions);
    }

    logger.info("✅ Optimization manager ready");
  }

  /**
   * Run full optimization pipeline
   */
  async optimize(css, sourceFiles = []) {
    logger.info("Running optimization pipeline...");

    const results = {
      original: css,
      optimized: css,
      stats: {},
    };

    try {
      // 1. Bundle Analysis
      if (this.options.enableBundleAnalysis) {
        const analyzer = new BundleAnalyzer(this.options.bundleAnalyzerOptions);
        results.stats.bundleAnalysis = analyzer.analyze();
      }

      // 2. CSS Purging
      if (this.options.enablePurging && sourceFiles.length > 0) {
        const purger = new CSSPurger({
          ...this.options.purgerOptions,
          content: sourceFiles,
          css: results.optimized,
        });

        const purgeResult = await purger.purge();
        results.optimized = purgeResult.css;
        results.stats.purging = purgeResult.stats;
      }

      // 3. Critical CSS Extraction
      if (this.options.enableCriticalCSS) {
        const criticalExtractor = new CriticalCSSExtractor({
          ...this.options.criticalCSSOptions,
          html: this.options.html,
        });

        const criticalResult = await criticalExtractor.extract();
        results.critical = criticalResult.css;
        results.stats.criticalCSS = criticalResult.stats;
      }

      // Calculate overall stats
      results.stats.overall = {
        originalSize: new Blob([results.original]).size,
        optimizedSize: new Blob([results.optimized]).size,
        savings: this.calculateSavings(results.original, results.optimized),
      };

      logger.info(
        `✅ Optimization complete: ${results.stats.overall.savings}% reduction`
      );

      return results;
    } catch (error) {
      logger.error("Optimization pipeline failed:", error);
      throw error;
    }
  }

  /**
   * Build-time extraction
   */
  async extractBuildTime(sourceFiles) {
    const extractor = new BuildTimeExtractor({
      ...this.options.buildTimeOptions,
      input: sourceFiles,
    });

    return await extractor.extract();
  }

  /**
   * Calculate savings percentage
   */
  calculateSavings(original, optimized) {
    const originalSize = new Blob([original]).size;
    const optimizedSize = new Blob([optimized]).size;

    if (originalSize === 0) return 0;

    return ((1 - optimizedSize / originalSize) * 100).toFixed(2);
  }

  /**
   * Get cache instance
   */
  getCache() {
    return this.cache;
  }

  /**
   * Get optimization stats
   */
  getStats() {
    const stats = { ...this.stats };

    if (this.cache) {
      stats.cache = this.cache.getStats();
    }

    return stats;
  }

  /**
   * Clear all caches
   */
  async clearCaches() {
    if (this.cache) {
      await this.cache.clear();
    }

    logger.info("✅ All caches cleared");
  }

  /**
   * Generate optimization report
   */
  generateReport() {
    const stats = this.getStats();

    console.log("\n🚀 Optimization Report");
    console.log("=".repeat(60));

    if (stats.bundleAnalysis) {
      console.log("\n📦 Bundle Analysis:");
      console.log(
        `  Total Size: ${this.formatBytes(stats.bundleAnalysis.totalSize)}`
      );
      console.log(
        `  Gzip Size: ${this.formatBytes(stats.bundleAnalysis.gzipSize)}`
      );
      console.log(
        `  Categories: ${Object.keys(stats.bundleAnalysis.categories).length}`
      );
    }

    if (stats.purging) {
      console.log("\n🗑️  CSS Purging:");
      console.log(
        `  Original: ${this.formatBytes(stats.purging.originalSize)}`
      );
      console.log(`  Purged: ${this.formatBytes(stats.purging.purgedSize)}`);
      console.log(`  Rules Removed: ${stats.purging.rulesRemoved}`);
    }

    if (stats.criticalCSS) {
      console.log("\n⚡ Critical CSS:");
      console.log(
        `  Original: ${this.formatBytes(stats.criticalCSS.originalSize)}`
      );
      console.log(
        `  Critical: ${this.formatBytes(stats.criticalCSS.criticalSize)}`
      );
      console.log(
        `  Rules: ${stats.criticalCSS.criticalRules}/${stats.criticalCSS.totalRules}`
      );
    }

    if (stats.cache) {
      console.log("\n💾 Cache Statistics:");
      console.log(`  Hit Rate: ${stats.cache.hitRate}`);
      console.log(
        `  Memory Size: ${stats.cache.memorySize}/${stats.cache.maxSize}`
      );
      console.log(`  Hits: ${stats.cache.hits}, Misses: ${stats.cache.misses}`);
    }

    if (stats.overall) {
      console.log("\n📊 Overall Results:");
      console.log(
        `  Original: ${this.formatBytes(stats.overall.originalSize)}`
      );
      console.log(
        `  Optimized: ${this.formatBytes(stats.overall.optimizedSize)}`
      );
      console.log(`  Savings: ${stats.overall.savings}%`);
    }

    console.log("\n" + "=".repeat(60) + "\n");
  }

  /**
   * Format bytes to human readable
   */
  formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
}

/**
 * Create a preconfigured optimization manager
 */
export function createOptimizationManager(
  preset = "balanced",
  customOptions = {}
) {
  const presets = {
    minimal: {
      enableBundleAnalysis: false,
      enableBuildTimeExtraction: false,
      enableCriticalCSS: false,
      enablePurging: false,
      enablePersistentCache: true,
    },
    balanced: {
      enableBundleAnalysis: true,
      enableBuildTimeExtraction: false,
      enableCriticalCSS: false,
      enablePurging: true,
      enablePersistentCache: true,
    },
    aggressive: {
      enableBundleAnalysis: true,
      enableBuildTimeExtraction: true,
      enableCriticalCSS: true,
      enablePurging: true,
      enablePersistentCache: true,
    },
  };

  const options = {
    ...presets[preset],
    ...customOptions,
  };

  return new OptimizationManager(options);
}
