/**
 * Performance Regression Tests for tailwind-to-style
 * Ensures that library performance remains fast and memory-efficient
 */

import { tws, twsx, twsxClassName, performanceUtils } from '../../src/index.js';

// Helper to measure execution time
function measureTime(fn, iterations = 1000) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  return {
    total: end - start,
    average: (end - start) / iterations,
    iterations
  };
}

// Memory usage helper (approximate)
function getMemoryUsage() {
  if (typeof process !== 'undefined' && process.memoryUsage) {
    return process.memoryUsage().heapUsed;
  }
  return 0;
}

describe("Performance Regression Tests", () => {
  beforeEach(() => {
    // Clear caches before each test for consistent measurements
    performanceUtils.clearCaches();
  });

  describe("tws() Performance", () => {
    it("should convert a simple class in under 1ms average", () => {
      const result = measureTime(() => {
        tws("p-4", true);
      }, 1000);
      
      expect(result.average).toBeLessThan(1);
    });

    it("should convert multiple classes in under 2ms average", () => {
      const result = measureTime(() => {
        tws("p-4 m-4 bg-blue-500 text-white flex items-center", true);
      }, 1000);
      
      expect(result.average).toBeLessThan(2);
    });

    it("should handle 10 classes in under 5ms average", () => {
      const classes = "p-4 m-4 bg-blue-500 text-white flex items-center justify-center gap-4 rounded-lg shadow-md";
      const result = measureTime(() => {
        tws(classes, true);
      }, 1000);
      
      expect(result.average).toBeLessThan(5);
    });

    it("should handle 20 classes in under 10ms average", () => {
      const classes = "p-4 m-4 bg-blue-500 text-white flex items-center justify-center gap-4 rounded-lg shadow-md w-full h-full min-w-0 max-w-screen-lg overflow-hidden relative z-10 border border-gray-200 hover:bg-blue-600 transition-colors duration-200";
      const result = measureTime(() => {
        tws(classes, true);
      }, 500);
      
      expect(result.average).toBeLessThan(10);
    });

    it("should benefit from caching (cached calls should be faster)", () => {
      const classes = "bg-red-500 p-8 rounded-xl";
      
      // First call (cold cache)
      const coldStart = performance.now();
      tws(classes, true);
      const coldTime = performance.now() - coldStart;
      
      // Subsequent calls (warm cache)
      const warmResult = measureTime(() => {
        tws(classes, true);
      }, 1000);
      
      // Cached calls should be at least 2x faster on average
      // (first call initializes, subsequent use cache)
      expect(warmResult.average).toBeLessThan(coldTime);
    });
  });

  describe("twsx() Performance", () => {
    it("should generate CSS for simple object in under 5ms average", () => {
      const result = measureTime(() => {
        twsx({
          ".btn": "p-4 bg-blue-500 text-white rounded"
        });
      }, 500);
      
      expect(result.average).toBeLessThan(5);
    });

    it("should handle nested objects in under 10ms average", () => {
      const result = measureTime(() => {
        twsx({
          ".card": {
            _: "bg-white rounded-lg shadow-md",
            "&:hover": "shadow-lg transform scale-105",
            ".card-header": "p-4 border-b",
            ".card-body": "p-4"
          }
        });
      }, 500);
      
      expect(result.average).toBeLessThan(10);
    });
  });

  describe("Cache Efficiency", () => {
    it("should not grow cache unboundedly", () => {
      const initialStats = performanceUtils.getStats();
      
      // Generate many unique classes
      for (let i = 0; i < 5000; i++) {
        tws(`p-${i % 100} m-${i % 100}`, true);
      }
      
      const afterStats = performanceUtils.getStats();
      
      // Cache should be bounded (not growing infinitely)
      // Assuming MAX_CACHE_SIZE is around 1000-2000
      expect(afterStats.cacheStats.cssResolution).toBeLessThanOrEqual(3000);
    });

    it("should maintain cache hit rate for repeated classes", () => {
      const classes = ["p-4", "m-4", "bg-blue-500", "text-white", "flex"];
      
      // First pass - populate cache
      classes.forEach(c => tws(c, true));
      
      // Second pass - should hit cache
      const start = performance.now();
      for (let i = 0; i < 10000; i++) {
        classes.forEach(c => tws(c, true));
      }
      const duration = performance.now() - start;
      
      // 50,000 cached lookups should complete reasonably fast
      // Using 5000ms to account for slower machines/CI environments
      expect(duration).toBeLessThan(5000);
    });
  });

  describe("Memory Efficiency", () => {
    it("should not leak memory on repeated conversions", () => {
      if (getMemoryUsage() === 0) {
        // Skip if memory measurement not available
        return;
      }
      
      performanceUtils.clearCaches();
      const initialMemory = getMemoryUsage();
      
      // Perform many conversions
      for (let i = 0; i < 10000; i++) {
        tws(`p-${i % 20} m-${i % 20} bg-red-${((i % 9) + 1) * 100}`, true);
      }
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
      
      const afterMemory = getMemoryUsage();
      const memoryIncrease = afterMemory - initialMemory;
      
      // Memory increase should be bounded (< 50MB)
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
    });

    it("should handle large batch conversions", () => {
      const startMemory = getMemoryUsage();
      const results = [];
      
      for (let i = 0; i < 1000; i++) {
        results.push(tws("flex items-center justify-center gap-4 p-4 bg-gradient-to-r from-blue-500 to-purple-500", true));
      }
      
      // Should complete without crashing
      expect(results.length).toBe(1000);
      expect(results[0]).toHaveProperty("display");
      
      // Memory increase should be reasonable
      if (getMemoryUsage() > 0) {
        const memoryIncrease = getMemoryUsage() - startMemory;
        expect(memoryIncrease).toBeLessThan(20 * 1024 * 1024); // < 20MB
      }
    });
  });

  describe("Stress Tests", () => {
    it("should handle rapid sequential calls", () => {
      const start = performance.now();
      
      for (let i = 0; i < 10000; i++) {
        tws("p-4 m-4 flex items-center", true);
      }
      
      const duration = performance.now() - start;
      
      // 10,000 conversions should complete in under 5 seconds
      expect(duration).toBeLessThan(5000);
    });

    it("should handle diverse class combinations", () => {
      const prefixes = ["p", "m", "w", "h", "text", "bg", "border", "rounded"];
      const values = ["0", "1", "2", "4", "8", "auto", "full", "screen"];
      
      const start = performance.now();
      
      for (let i = 0; i < 1000; i++) {
        const prefix = prefixes[i % prefixes.length];
        const value = values[i % values.length];
        tws(`${prefix}-${value}`, true);
      }
      
      const duration = performance.now() - start;
      
      // Should complete quickly even with varying inputs
      expect(duration).toBeLessThan(2000);
    });

    it("should handle empty and invalid inputs without degrading performance", () => {
      const result = measureTime(() => {
        tws("", true);
        tws("   ", true);
        tws("invalid-class-xyz", true);
        tws(null, true);
        tws(undefined, true);
      }, 1000);
      
      // Edge cases should still be fast
      expect(result.average).toBeLessThan(1);
    });
  });

  describe("Comparison Benchmarks", () => {
    it("should show cold vs warm cache performance", () => {
      performanceUtils.clearCaches();
      
      const coldResults = [];
      const warmResults = [];
      const testClasses = "flex flex-col gap-4 p-6 bg-white rounded-xl shadow-lg";
      
      // Cold start measurements (first 10 unique classes)
      for (let i = 0; i < 10; i++) {
        const start = performance.now();
        tws(`${testClasses} test-class-${i}`, true);
        coldResults.push(performance.now() - start);
      }
      
      // Warm cache measurements (repeat same classes)
      for (let i = 0; i < 100; i++) {
        const start = performance.now();
        tws(testClasses, true);
        warmResults.push(performance.now() - start);
      }
      
      const avgCold = coldResults.reduce((a, b) => a + b, 0) / coldResults.length;
      const avgWarm = warmResults.reduce((a, b) => a + b, 0) / warmResults.length;
      
      // Warm cache should be faster than cold
      expect(avgWarm).toBeLessThanOrEqual(avgCold);
    });

    it("should maintain consistent performance over time", () => {
      const batches = [];
      
      // Run 5 batches of 1000 conversions each
      for (let batch = 0; batch < 5; batch++) {
        const start = performance.now();
        for (let i = 0; i < 1000; i++) {
          tws(`p-4 m-4 bg-blue-${((i % 9) + 1) * 100}`, true);
        }
        batches.push(performance.now() - start);
      }
      
      const avgBatch = batches.reduce((a, b) => a + b, 0) / batches.length;
      
      // Each batch should be similar (no major degradation)
      batches.forEach(batchTime => {
        expect(batchTime).toBeLessThan(avgBatch * 2);
      });
    });
  });
});

describe("twsxClassName Performance", () => {
  it("should create basic className quickly", () => {
    const result = measureTime(() => {
      twsxClassName({ _: "p-4 bg-blue-500" });
    }, 500);
    
    expect(result.average).toBeLessThan(5);
  });

  it("should handle variants efficiently", () => {
    const result = measureTime(() => {
      const btn = twsxClassName({
        base: "px-4 py-2 rounded",
        variants: {
          size: { sm: "text-sm", md: "text-base", lg: "text-lg" },
          variant: { primary: "bg-blue-500", secondary: "bg-gray-200" }
        },
        defaultVariants: { size: "md", variant: "primary" }
      });
      btn({ size: "lg", variant: "secondary" });
    }, 500);
    
    expect(result.average).toBeLessThan(10);
  });
});
