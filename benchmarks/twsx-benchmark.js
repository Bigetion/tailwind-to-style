/**
 * Performance Benchmarks for twsx()
 * Tests nested CSS generation performance
 */

import { twsx } from '../src/index.js';
import { cacheManager } from '../src/core/cache-manager.js';

const TEST_CASES = {
  simple: {
    '.button': 'bg-blue-500 text-white px-4 py-2 rounded'
  },
  
  nested: {
    '.card': [
      'bg-white p-6 rounded-lg shadow-md',
      {
        '&:hover': 'shadow-xl',
        '> .title': 'text-2xl font-bold mb-2',
        '> .content': 'text-gray-600'
      }
    ]
  },
  
  complex: {
    '.nav': [
      'flex items-center justify-between px-8 py-4 bg-white shadow-md',
      {
        '> .logo': 'h-8 w-auto',
        '> .links': [
          'flex gap-6 ml-auto',
          {
            '> a': 'text-gray-600 hover:text-gray-900 transition-colors',
            '> a.active': 'text-blue-600 font-semibold'
          }
        ],
        '> .auth': [
          'flex gap-3',
          {
            '> .login': 'px-4 py-2 text-blue-600 hover:bg-blue-50 rounded',
            '> .signup': 'px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded'
          }
        ]
      }
    ]
  },
  
  mediaQueries: {
    '.responsive': 'p-4 text-base',
    '@media (max-width: 768px)': {
      '.responsive': 'p-2 text-sm'
    },
    '@media (min-width: 1024px)': {
      '.responsive': 'p-8 text-lg'
    }
  },
  
  variants: {
    '.button': [
      'px-4 py-2 rounded font-medium transition-all',
      {
        '&.primary': 'bg-blue-500 text-white hover:bg-blue-600',
        '&.secondary': 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        '&.danger': 'bg-red-500 text-white hover:bg-red-600',
        '&.large': 'px-6 py-3 text-lg',
        '&.small': 'px-2 py-1 text-sm',
        '&:disabled': 'opacity-50 cursor-not-allowed'
      }
    ]
  }
};

function benchmark(name, fn, iterations = 100) {
  // Warm up
  for (let i = 0; i < 5; i++) fn();
  
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  
  const total = end - start;
  const avg = total / iterations;
  
  return { name, total, avg, iterations };
}

function measureCssSize(obj) {
  const css = twsx(obj, { inject: false });
  return css.length;
}

function runBenchmarks() {
  console.log('🚀 TWSX Performance Benchmarks\n');
  console.log('=' .repeat(70));
  
  const results = [];
  
  // Test each case
  for (const [caseName, styleObj] of Object.entries(TEST_CASES)) {
    console.log(`\n📊 Testing: ${caseName}`);
    
    // Measure CSS output size
    const cssSize = measureCssSize(styleObj);
    console.log(`   CSS Output:       ${cssSize} bytes`);
    
    // Clear cache for cold test
    cacheManager.clearAll();
    
    // Cold run (first call)
    const coldStart = performance.now();
    twsx(styleObj, { inject: false });
    const coldEnd = performance.now();
    const coldTime = coldEnd - coldStart;
    
    // Warm run (cached)
    const warmResult = benchmark(`${caseName}-warm`, () => twsx(styleObj, { inject: false }), 100);
    
    results.push({
      case: caseName,
      cssSize,
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
    'CSS Size': `${r.cssSize}B`,
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
  
  console.log('\n✅ Benchmarks completed!\n');
}

// Run benchmarks
runBenchmarks();
