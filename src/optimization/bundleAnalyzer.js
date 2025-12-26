/**
 * Bundle Analyzer - Analyzes bundle size and provides optimization recommendations
 * @module optimization/bundleAnalyzer
 */

import { getTailwindCache } from '../utils/tailwindCache.js';
import { logger } from '../utils/logger.js';

export class BundleAnalyzer {
  constructor(options = {}) {
    this.options = {
      showDetails: true,
      groupBy: 'category', // 'category', 'size', 'usage'
      minSize: 0, // Minimum size in bytes to report
      ...options,
    };
    this.stats = {
      totalSize: 0,
      gzipSize: 0,
      categories: {},
      recommendations: [],
    };
  }

  /**
   * Analyze the current bundle
   */
  analyze() {
    const cache = getTailwindCache();
    
    if (!cache.isInitialized()) {
      logger.warn('Cache not initialized. Bundle analysis may be incomplete.');
      return this.stats;
    }

    const cssString = cache.getCssString();
    const cssObject = cache.getCssObject();

    // Calculate sizes
    this.stats.totalSize = new Blob([cssString]).size;
    this.stats.gzipSize = this.estimateGzipSize(cssString);
    
    // Analyze by categories
    this.analyzeCSSObject(cssObject);
    
    // Generate recommendations
    this.generateRecommendations();

    if (this.options.showDetails) {
      this.printReport();
    }

    return this.stats;
  }

  /**
   * Analyze CSS object by categories
   */
  analyzeCSSObject(cssObject) {
    const categories = {};

    Object.entries(cssObject).forEach(([className, cssValue]) => {
      const category = this.categorizeClass(className);
      const size = new Blob([`${className}:${cssValue}`]).size;

      if (!categories[category]) {
        categories[category] = {
          count: 0,
          size: 0,
          classes: [],
        };
      }

      categories[category].count++;
      categories[category].size += size;
      categories[category].classes.push({
        name: className,
        size,
        value: cssValue,
      });
    });

    this.stats.categories = categories;
  }

  /**
   * Categorize CSS class
   */
  categorizeClass(className) {
    const categories = {
      layout: ['flex', 'grid', 'block', 'inline', 'hidden', 'container'],
      spacing: ['p-', 'm-', 'gap-', 'space-'],
      sizing: ['w-', 'h-', 'max-', 'min-'],
      colors: ['bg-', 'text-', 'border-color'],
      typography: ['font-', 'text-', 'leading-', 'tracking-'],
      borders: ['border-', 'rounded-', 'divide-'],
      effects: ['shadow-', 'opacity-', 'mix-blend-'],
      filters: ['blur-', 'brightness-', 'contrast-', 'grayscale-'],
      transforms: ['scale-', 'rotate-', 'translate-', 'skew-'],
      transitions: ['transition-', 'duration-', 'ease-', 'delay-'],
      animations: ['animate-'],
    };

    for (const [category, prefixes] of Object.entries(categories)) {
      if (prefixes.some(prefix => className.includes(prefix))) {
        return category;
      }
    }

    return 'other';
  }

  /**
   * Estimate gzip size
   */
  estimateGzipSize(content) {
    // Rough estimation: typically 70-80% compression ratio
    // For more accurate results, would need actual gzip compression
    const compressionRatio = 0.25; // Assume 25% of original size
    return Math.round(this.stats.totalSize * compressionRatio);
  }

  /**
   * Generate optimization recommendations
   */
  generateRecommendations() {
    const recommendations = [];
    const { totalSize, categories } = this.stats;

    // Size-based recommendations
    if (totalSize > 100000) { // 100KB
      recommendations.push({
        type: 'warning',
        message: 'Large bundle size detected (>100KB)',
        suggestion: 'Consider using CSS purging to remove unused styles',
        priority: 'high',
      });
    }

    if (totalSize > 50000 && totalSize <= 100000) { // 50-100KB
      recommendations.push({
        type: 'info',
        message: 'Moderate bundle size (50-100KB)',
        suggestion: 'Consider code splitting and lazy loading',
        priority: 'medium',
      });
    }

    // Category-based recommendations
    Object.entries(categories).forEach(([category, data]) => {
      const percentage = (data.size / totalSize) * 100;
      
      if (percentage > 20) {
        recommendations.push({
          type: 'info',
          message: `${category} utilities occupy ${percentage.toFixed(1)}% of bundle`,
          suggestion: `Review ${category} usage and consider alternatives`,
          priority: 'low',
        });
      }
    });

    // Specific optimizations
    if (categories.animations && categories.animations.size > 5000) {
      recommendations.push({
        type: 'tip',
        message: 'Animation utilities detected',
        suggestion: 'Use CSS animations only where needed, consider removing unused keyframes',
        priority: 'low',
      });
    }

    if (categories.effects && categories.effects.size > 10000) {
      recommendations.push({
        type: 'tip',
        message: 'Heavy effect utilities detected',
        suggestion: 'Shadows and effects can be expensive. Use sparingly.',
        priority: 'low',
      });
    }

    this.stats.recommendations = recommendations;
  }

  /**
   * Print analysis report
   */
  printReport() {
    console.log('\n📊 Bundle Analysis Report');
    console.log('='.repeat(60));
    
    console.log(`\n📦 Total Size: ${this.formatBytes(this.stats.totalSize)}`);
    console.log(`🗜️  Gzip Size: ${this.formatBytes(this.stats.gzipSize)} (estimated)`);
    
    console.log('\n📋 Categories:');
    const sortedCategories = Object.entries(this.stats.categories)
      .sort((a, b) => b[1].size - a[1].size);

    sortedCategories.forEach(([category, data]) => {
      const percentage = ((data.size / this.stats.totalSize) * 100).toFixed(1);
      console.log(`  ${category.padEnd(15)} ${this.formatBytes(data.size).padEnd(10)} (${percentage}%) - ${data.count} classes`);
    });

    if (this.stats.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      this.stats.recommendations.forEach((rec, idx) => {
        const icon = rec.type === 'warning' ? '⚠️' : rec.type === 'info' ? 'ℹ️' : '💡';
        console.log(`  ${idx + 1}. ${icon} [${rec.priority.toUpperCase()}] ${rec.message}`);
        console.log(`     → ${rec.suggestion}`);
      });
    }

    console.log('\n' + '='.repeat(60) + '\n');
  }

  /**
   * Format bytes to human readable
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Export analysis to JSON
   */
  toJSON() {
    return JSON.stringify(this.stats, null, 2);
  }
}
