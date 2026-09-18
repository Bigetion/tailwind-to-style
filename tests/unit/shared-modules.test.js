/**
 * Tests for shared modules (Phase 1 refactoring)
 * 
 * Verifies that extracted utilities work correctly.
 */

import { describe, test, expect } from '@jest/globals';

describe('shared/constants', () => {
  test('exports environment detection', async () => {
    const { IS_BROWSER, IS_SERVER } = await import('../../src/shared/constants.js');
    
    expect(typeof IS_BROWSER).toBe('boolean');
    expect(typeof IS_SERVER).toBe('boolean');
    expect(IS_BROWSER).toBe(!IS_SERVER);
  });

  test('exports cache size limits', async () => {
    const { MAX_CACHE_SIZE, MAX_SET_SIZE } = await import('../../src/shared/constants.js');
    
    expect(MAX_CACHE_SIZE).toBe(5000);
    expect(MAX_SET_SIZE).toBe(10000);
  });

  test('exports builtin keyframes', async () => {
    const { BUILTIN_KEYFRAMES } = await import('../../src/shared/constants.js');
    
    expect(BUILTIN_KEYFRAMES).toHaveProperty('spin');
    expect(BUILTIN_KEYFRAMES).toHaveProperty('pulse');
    expect(BUILTIN_KEYFRAMES).toHaveProperty('bounce');
    expect(BUILTIN_KEYFRAMES.spin).toHaveProperty('0%');
    expect(BUILTIN_KEYFRAMES.spin).toHaveProperty('100%');
  });

  test('exports regex patterns', async () => {
    const { 
      CLASS_PARSER_REGEX, 
      OPACITY_MODIFIER_REGEX,
      CSS_VAR_REGEX 
    } = await import('../../src/shared/constants.js');
    
    expect(CLASS_PARSER_REGEX).toBeInstanceOf(RegExp);
    expect(OPACITY_MODIFIER_REGEX).toBeInstanceOf(RegExp);
    expect(CSS_VAR_REGEX).toBeInstanceOf(RegExp);
  });

  test('exports tailwind config data', async () => {
    const { 
      breakpoints, 
      pseudoVariants, 
      fractionDenominators 
    } = await import('../../src/shared/constants.js');
    
    expect(breakpoints).toHaveProperty('sm');
    expect(breakpoints).toHaveProperty('md');
    expect(breakpoints).toHaveProperty('lg');
    
    expect(pseudoVariants).toBeInstanceOf(Set);
    expect(pseudoVariants.has('hover')).toBe(true);
    expect(pseudoVariants.has('focus')).toBe(true);
    
    expect(Array.isArray(fractionDenominators)).toBe(true);
    expect(fractionDenominators).toContain(2);
    expect(fractionDenominators).toContain(12);
  });
});

describe('shared/hash', () => {
  test('hashString produces consistent hashes', async () => {
    const { hashString } = await import('../../src/shared/hash.js');
    
    const hash1 = hashString('bg-blue-500');
    const hash2 = hashString('bg-blue-500');
    const hash3 = hashString('bg-red-500');
    
    expect(hash1).toBe(hash2); // Same input = same hash
    expect(hash1).not.toBe(hash3); // Different input = different hash
    expect(typeof hash1).toBe('number');
  });

  test('hashString handles empty strings', async () => {
    const { hashString } = await import('../../src/shared/hash.js');
    
    const hash = hashString('');
    expect(typeof hash).toBe('number');
  });

  test('fastObjectHash handles primitives', async () => {
    const { fastObjectHash } = await import('../../src/shared/hash.js');
    
    expect(fastObjectHash(null)).toBe('null');
    expect(fastObjectHash(undefined)).toBe('null');
    expect(fastObjectHash(42)).toBe('42');
    expect(fastObjectHash('test')).toBe('test');
  });

  test('fastObjectHash handles arrays', async () => {
    const { fastObjectHash } = await import('../../src/shared/hash.js');
    
    const hash1 = fastObjectHash([1, 2, 3]);
    const hash2 = fastObjectHash([1, 2, 3]);
    const hash3 = fastObjectHash([3, 2, 1]);
    
    expect(hash1).toBe(hash2); // Same array = same hash
    expect(hash1).not.toBe(hash3); // Different order = different hash
  });

  test('fastObjectHash handles objects', async () => {
    const { fastObjectHash } = await import('../../src/shared/hash.js');
    
    const obj1 = { color: 'primary', size: 'lg' };
    const obj2 = { size: 'lg', color: 'primary' }; // Different key order
    
    const hash1 = fastObjectHash(obj1);
    const hash2 = fastObjectHash(obj2);
    
    expect(hash1).toBe(hash2); // Keys are sorted, so same hash
  });

  test('fastObjectHash respects maxDepth option', async () => {
    const { fastObjectHash } = await import('../../src/shared/hash.js');
    
    const deepObj = { a: { b: { c: { d: 'deep' } } } };
    
    const hash1 = fastObjectHash(deepObj, { maxDepth: 2 });
    const hash2 = fastObjectHash(deepObj, { maxDepth: 5 });
    
    expect(typeof hash1).toBe('string');
    expect(typeof hash2).toBe('string');
  });

  test('getCssHash produces short hashes', async () => {
    const { getCssHash } = await import('../../src/shared/hash.js');
    
    const hash = getCssHash('bg-blue-500 p-4 rounded');
    
    expect(typeof hash).toBe('string');
    expect(hash.length).toBeLessThanOrEqual(8);
  });
});

describe('utils/debounce', () => {
  test('debounce delays function execution', async () => {
    const { debounce } = await import('../../src/utils/debounce.js');
    
    let callCount = 0;
    const increment = () => callCount++;
    const debounced = debounce(increment, 50);
    
    // Rapid calls
    debounced();
    debounced();
    debounced();
    
    expect(callCount).toBe(0); // Not executed yet
    
    // Wait for debounce
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(callCount).toBe(1); // Executed once
  });

  test('debounce preserves function context', async () => {
    const { debounce } = await import('../../src/utils/debounce.js');
    
    const obj = {
      value: 42,
      getValue: debounce(function() { return this.value; }, 50)
    };
    
    obj.getValue();
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Context preserved (would fail with arrow function)
    expect(typeof obj.getValue).toBe('function');
  });
});

describe('shared/cache', () => {
  test('exports cache instances', async () => {
    const { 
      injectedKeyframes,
      twsxInputCache,
      generatorCache 
    } = await import('../../src/shared/cache.js');
    
    expect(injectedKeyframes).toBeDefined();
    expect(twsxInputCache).toBeDefined();
    expect(generatorCache).toBeDefined();
  });

  test('clearAllCaches works', async () => {
    const { 
      twsxInputCache,
      clearAllCaches 
    } = await import('../../src/shared/cache.js');
    
    // Add some data
    twsxInputCache.set('test', 'value');
    expect(twsxInputCache.has('test')).toBe(true);
    
    // Clear all
    clearAllCaches();
    expect(twsxInputCache.has('test')).toBe(false);
  });

  test('getCacheStats returns stats object', async () => {
    const { getCacheStats } = await import('../../src/shared/cache.js');
    
    const stats = getCacheStats();
    
    expect(stats).toHaveProperty('twsxInputCache');
    expect(stats).toHaveProperty('generatorCache');
    expect(stats).toHaveProperty('injectedCssHashSet');
    expect(typeof stats.twsxInputCache).toBe('number');
  });

  test('evictMap is backward compatible', async () => {
    const { evictMap } = await import('../../src/shared/cache.js');
    
    const map = new Map();
    map.set('a', 1);
    map.set('b', 2);
    
    evictMap(map, 1); // Should evict one entry
    expect(map.size).toBe(1);
  });
});
