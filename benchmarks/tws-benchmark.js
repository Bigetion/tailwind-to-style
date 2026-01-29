/**
 * Performance Benchmarks for tws()
 * Tests class-to-style conversion performance
 */

import { tws } from '../src/index.js';
import { cacheManager } from '../src/core/cache-manager.js';

const TEST_CASES = {
  simple: 'bg-blue-500 text-white p-4',
  medium: 'bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 transition-colors',
  complex: 'flex items-center justify-between gap-4 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95 transition-all duration-300 ease-in-out',
  responsive: 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl p-2 sm:p-4 md:p-6 lg:p-8',
  states: 'bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 active:bg-blue-800 disabled:bg-gray-400 group-hover:bg-purple-500',
  arbitrary: 'w-[123px] h-[456px] text-[#abc123] bg-[rgba(255,0,0,0.5)] m-[1.5rem]',
  opacity: 'bg-blue-500/50 text-red-600/75 border-gray-400/25',
};

function benchmark(name, fn, iterations = 1000) {
  // Warm up
  for (let i = 0; i < 10; i++) fn();
  
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  
  const total = end - start;
  const avg = total / iterations;
  
  return { name, total, avg, iterations };
}

function runBenchmarks() {
  console.log('🚀 TWS Performance Benchmarks\n');
  console.log('=' .repeat(70));
  
  const results = [];
  
  // Test each case
  for (const [caseName, classes] of Object.entries(TEST_CASES)) {
    console.log(`\n📊 Testing: ${caseName}`);
    console.log(`   Classes: "${classes.substring(0, 60)}${classes.length > 60 ? '...' : ''}"`);
    
    // Clear cache for cold test
    cacheManager.clearAll();
    
    // Cold run (first call)
    const coldStart = performance.now();
    tws(classes);
    const coldEnd = performance.now();
    const coldTime = coldEnd - coldStart;
    
    // Warm run (cached)
    const warmResult = benchmark(`${caseName}-warm`, () => tws(classes), 1000);
    
    results.push({
      case: caseName,
      cold: coldTime,
      warm: warmResult.avg,
      speedup: coldTime / warmResult.avg
    });
    
    console.log(`   Cold (1st call):  ${coldTime.toFixed(3)}ms`);
    console.log(`   Warm (cached):    ${warmResult.avg.toFixed(3)}ms`);
    console.log(`   Speedup:          ${(coldTime / warmResult.avg).toFixed(1)}x`);
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('\n📈 Summary\n');
  
  console.table(results.map(r => ({
    'Test Case': r.case,
    'Cold (ms)': r.cold.toFixed(3),
    'Warm (ms)': r.warm.toFixed(3),
    'Speedup': `${r.speedup.toFixed(1)}x`
  })));
  
  // Cache statistics
  console.log('\n💾 Cache Statistics\n');
  const stats = cacheManager.getStats();
  console.log(`   Total Hits:       ${stats.hits}`);
  console.log(`   Total Misses:     ${stats.misses}`);
  console.log(`   Hit Rate:         ${cacheManager.getHitRate().toFixed(2)}%`);
  console.log(`   Cache Sizes:`);
  for (const [name, size] of Object.entries(stats.sizes)) {
    console.log(`     - ${name}: ${size}`);
  }
  
  console.log('\n✅ Benchmarks completed!\n');
}

// Run benchmarks
runBenchmarks();
