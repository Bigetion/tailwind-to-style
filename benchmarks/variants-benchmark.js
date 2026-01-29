/**
 * Performance Benchmarks for twsxVariants()
 * Tests variant system performance
 */

import { twsxVariants } from '../src/index.js';
import { cacheManager } from '../src/core/cache-manager.js';

const TEST_CONFIGS = {
  simple: {
    className: '.btn',
    config: {
      base: 'px-4 py-2 rounded',
      variants: {
        color: {
          primary: 'bg-blue-500 text-white',
          secondary: 'bg-gray-500 text-white'
        }
      }
    }
  },
  
  medium: {
    className: '.button',
    config: {
      base: 'px-4 py-2 rounded-lg font-medium transition-all',
      variants: {
        variant: {
          solid: 'border-transparent',
          outline: 'bg-transparent border-2',
          ghost: 'bg-transparent'
        },
        color: {
          primary: 'bg-blue-500 text-white hover:bg-blue-600',
          danger: 'bg-red-500 text-white hover:bg-red-600',
          success: 'bg-green-500 text-white hover:bg-green-600'
        },
        size: {
          sm: 'px-3 py-1.5 text-sm',
          md: 'px-4 py-2 text-base',
          lg: 'px-6 py-3 text-lg'
        }
      },
      compoundVariants: [
        { variant: 'outline', color: 'primary', class: 'border-blue-500 text-blue-600' },
        { variant: 'outline', color: 'danger', class: 'border-red-500 text-red-600' }
      ],
      defaultVariants: {
        variant: 'solid',
        color: 'primary',
        size: 'md'
      }
    }
  },
  
  complex: {
    className: '.alert',
    config: {
      base: 'p-4 rounded-lg border flex gap-3 items-start',
      variants: {
        variant: {
          solid: 'border-transparent',
          outline: 'bg-transparent border-2',
          soft: 'border-transparent'
        },
        status: {
          info: '',
          success: '',
          warning: '',
          error: ''
        },
        size: {
          sm: 'p-2 text-sm',
          md: 'p-4 text-base',
          lg: 'p-6 text-lg'
        }
      },
      compoundVariants: [
        { variant: 'solid', status: 'info', class: 'bg-blue-500 text-white' },
        { variant: 'solid', status: 'success', class: 'bg-green-500 text-white' },
        { variant: 'solid', status: 'warning', class: 'bg-yellow-500 text-white' },
        { variant: 'solid', status: 'error', class: 'bg-red-500 text-white' },
        { variant: 'outline', status: 'info', class: 'border-blue-500 text-blue-700' },
        { variant: 'outline', status: 'success', class: 'border-green-500 text-green-700' },
        { variant: 'soft', status: 'info', class: 'bg-blue-100 text-blue-800' },
        { variant: 'soft', status: 'error', class: 'bg-red-100 text-red-800' }
      ],
      defaultVariants: {
        variant: 'solid',
        status: 'info',
        size: 'md'
      },
      nested: {
        '.alert-icon': 'flex-shrink-0 mt-0.5',
        '.alert-content': 'flex-1',
        '.alert-dismiss': 'p-1 rounded hover:bg-black/10 cursor-pointer'
      }
    }
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

function countVariantCombinations(config) {
  const variantKeys = Object.keys(config.variants || {});
  if (variantKeys.length === 0) return 1;
  
  return variantKeys.reduce((total, key) => {
    return total * Object.keys(config.variants[key]).length;
  }, 1);
}

function runBenchmarks() {
  console.log('🚀 TWSXVARIANTS Performance Benchmarks\n');
  console.log('=' .repeat(70));
  
  const results = [];
  
  // Test each configuration
  for (const [caseName, { className, config }] of Object.entries(TEST_CONFIGS)) {
    console.log(`\n📊 Testing: ${caseName}`);
    
    const combinations = countVariantCombinations(config);
    const compoundVariants = config.compoundVariants?.length || 0;
    const hasNested = config.nested ? Object.keys(config.nested).length : 0;
    
    console.log(`   Variants:         ${Object.keys(config.variants || {}).length}`);
    console.log(`   Combinations:     ${combinations}`);
    console.log(`   Compound Rules:   ${compoundVariants}`);
    console.log(`   Nested Selectors: ${hasNested}`);
    
    // Clear cache for cold test
    cacheManager.clearAll();
    
    // Cold run (first call) - creates variant function + generates CSS
    const coldStart = performance.now();
    const variantFn = twsxVariants(className, config);
    const coldEnd = performance.now();
    const coldTime = coldEnd - coldStart;
    
    // Warm run (cached) - returns cached function
    const warmCreateResult = benchmark(
      `${caseName}-create`,
      () => twsxVariants(className, config),
      100
    );
    
    // Test function execution speed
    const execResult = benchmark(
      `${caseName}-exec`,
      () => variantFn({ color: 'primary', size: 'lg' }),
      1000
    );
    
    results.push({
      case: caseName,
      combinations,
      coldCreate: coldTime,
      warmCreate: warmCreateResult.avg,
      exec: execResult.avg,
      speedup: coldTime / warmCreateResult.avg
    });
    
    console.log(`   Cold (create):    ${coldTime.toFixed(3)}ms`);
    console.log(`   Warm (create):    ${warmCreateResult.avg.toFixed(3)}ms`);
    console.log(`   Function exec:    ${execResult.avg.toFixed(3)}ms`);
    console.log(`   Speedup:          ${(coldTime / warmCreateResult.avg).toFixed(1)}x`);
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('\n📈 Summary\n');
  
  console.table(results.map(r => ({
    'Test Case': r.case,
    'Combinations': r.combinations,
    'Cold Create (ms)': r.coldCreate.toFixed(3),
    'Warm Create (ms)': r.warmCreate.toFixed(3),
    'Exec (ms)': r.exec.toFixed(3),
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
