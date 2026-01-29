/**
 * Examples: How to Use v3.2 Improvements
 * Demonstrates new cache management, performance monitoring, and debugging features
 */

import { tws, twsx, twsxVariants } from '../src/index.js';
import { cacheManager, debugCache } from '../src/core/cache-manager.js';
import { logger } from '../src/utils/logger.js';

console.log('🚀 tailwind-to-style v3.2 - New Features Demo\n');

// ============================================================================
// 1. CACHE MANAGEMENT
// ============================================================================
console.log('📦 1. Cache Management\n');

// Get initial stats
console.log('Initial cache stats:');
console.log(cacheManager.getStats());

// Use tws multiple times
tws('bg-blue-500 text-white p-4');
tws('bg-blue-500 text-white p-4'); // Cached!
tws('bg-red-500 text-white p-4');

// Check hit rate
console.log(`\nCache hit rate: ${cacheManager.getHitRate().toFixed(2)}%`);

// Set custom cache limits
cacheManager.setLimits({
  configOptions: 1000,
  cssResolution: 2000,
});
console.log('\n✅ Custom cache limits set');

// Clear specific caches
cacheManager.clearCssCache();
console.log('✅ CSS cache cleared');

// ============================================================================
// 2. PERFORMANCE MONITORING
// ============================================================================
console.log('\n📊 2. Performance Monitoring\n');

// Enable warnings for slow operations
logger.setLevel('warn');

// Measure complex operation
const start = performance.now();
const complexStyles = tws('flex items-center justify-between gap-4 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300');
const end = performance.now();

console.log(`Complex styles generated in: ${(end - start).toFixed(3)}ms`);

// ============================================================================
// 3. DEBUG TOOLS
// ============================================================================
console.log('\n🔍 3. Debug Tools\n');

// Use the debug function
debugCache();

// Get detailed statistics
const detailedStats = cacheManager.getStats();
console.log('\nDetailed cache sizes:');
for (const [name, size] of Object.entries(detailedStats.sizes)) {
  console.log(`  ${name}: ${size} entries`);
}

// ============================================================================
// 4. LOGGING LEVELS
// ============================================================================
console.log('\n📝 4. Logging Configuration\n');

// Try different log levels
logger.setLevel('debug');
console.log('Current log level:', logger.getLevel());

// Debug logging (only visible when level is 'debug')
logger.debug('This is a debug message');
logger.info('This is an info message');
logger.warn('This is a warning message');

// Set back to silent for production
logger.setLevel('silent');
console.log('✅ Logging set to silent (production mode)');

// ============================================================================
// 5. CACHE STRATEGIES FOR DIFFERENT USE CASES
// ============================================================================
console.log('\n🎯 5. Cache Strategies\n');

// Strategy 1: High-frequency dynamic styling
console.log('Strategy 1: High-frequency app (increase limits)');
cacheManager.setLimits({
  configOptions: 2000,
  cssResolution: 5000,
  parseSelector: 2000,
});
console.log('✅ Increased cache limits for high-traffic app');

// Strategy 2: Memory-constrained environment
console.log('\nStrategy 2: Memory-constrained (reduce limits)');
cacheManager.setLimits({
  configOptions: 200,
  cssResolution: 500,
  parseSelector: 200,
});
console.log('✅ Reduced cache limits for memory efficiency');

// Strategy 3: Periodic cleanup
console.log('\nStrategy 3: Auto-cleanup based on threshold');
const stats = cacheManager.getStats();
if (stats.sizes.cssResolutionCache > 400) {
  cacheManager.clearCssCache();
  console.log('✅ Auto-cleaned CSS cache (threshold exceeded)');
}

// ============================================================================
// 6. PRODUCTION PATTERNS
// ============================================================================
console.log('\n🏭 6. Production Patterns\n');

// Pattern 1: Monitor performance in production
setInterval(() => {
  const hitRate = cacheManager.getHitRate();
  if (hitRate < 70) {
    console.warn(`⚠️  Low cache hit rate: ${hitRate.toFixed(2)}%`);
  }
}, 10000); // Check every 10 seconds

console.log('✅ Cache monitoring enabled');

// Pattern 2: Cleanup on memory pressure
global.gc && setInterval(() => {
  const stats = cacheManager.getStats();
  const totalSize = Object.values(stats.sizes).reduce((a, b) => a + b, 0);
  
  if (totalSize > 10000) {
    cacheManager.clearCssCache();
    console.log('🧹 Cleaned cache due to memory pressure');
  }
}, 60000); // Check every minute

// Pattern 3: Log stats periodically
setInterval(() => {
  cacheManager.logStats();
}, 300000); // Every 5 minutes

console.log('✅ Periodic stats logging enabled');

console.log('\n✨ Demo completed!\n');
console.log('💡 Tip: Run benchmarks with: npm run bench:all');
console.log('📚 Read docs: docs/API.md and docs/PERFORMANCE.md');
