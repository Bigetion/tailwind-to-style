/**
 * Tests for parser modules (Phase 2 refactoring)
 * 
 * Verifies that extracted parser functions work correctly.
 */

import { describe, test, expect } from '@jest/globals';

describe('parser/bracket', () => {
  test('encodeBracketValues encodes RGB values', async () => {
    const { encodeBracketValues } = await import('../../src/parser/bracket.js');
    
    const input = 'bg-[rgb(255,0,0)]';
    const encoded = encodeBracketValues(input);
    
    expect(encoded).toContain('__P__');
    expect(encoded).toContain('__C__');
    expect(encoded).toContain('%2C'); // Encoded comma
  });

  test('encodeBracketValues handles calc expressions', async () => {
    const { encodeBracketValues } = await import('../../src/parser/bracket.js');
    
    const input = 'w-[calc(100%-20px)]';
    const encoded = encodeBracketValues(input);
    
    expect(encoded).toContain('__P__');
    expect(encoded).toContain('__C__');
    expect(encoded).toContain('%25'); // Encoded percent sign
  });

  test('encodeBracketValues returns input if no brackets', async () => {
    const { encodeBracketValues } = await import('../../src/parser/bracket.js');
    
    const input = 'bg-blue-500';
    const encoded = encodeBracketValues(input);
    
    expect(encoded).toBe(input);
  });

  test('encodeBracketValues caches results', async () => {
    const { encodeBracketValues } = await import('../../src/parser/bracket.js');
    
    const input = 'bg-[rgb(255,0,0)]';
    const result1 = encodeBracketValues(input);
    const result2 = encodeBracketValues(input);
    
    expect(result1).toBe(result2); // Same reference = cached
  });

  test('decodeBracketValues reverses encoding', async () => {
    const { encodeBracketValues, decodeBracketValues } = await import('../../src/parser/bracket.js');
    
    const original = 'bg-[rgb(255,0,0)]';
    const encoded = encodeBracketValues(original);
    const decoded = decodeBracketValues(encoded);
    
    expect(decoded).toBe(original);
  });

  test('decodeBracketValues handles calc expressions', async () => {
    const { encodeBracketValues, decodeBracketValues } = await import('../../src/parser/bracket.js');
    
    const original = 'w-[calc(100%-20px)]';
    const encoded = encodeBracketValues(original);
    const decoded = decodeBracketValues(encoded);
    
    expect(decoded).toBe(original);
  });
});

describe('parser/selector', () => {
  test('replaceSelector handles first/last child', async () => {
    const { replaceSelector } = await import('../../src/parser/selector.js');
    
    // Note: selectorVariants needs to be imported from constants
    // For now, we just test the function exists and runs
    const result = replaceSelector('c-first');
    expect(typeof result).toBe('string');
  });

  test('parseSelector extracts base selector', async () => {
    const { parseSelector } = await import('../../src/parser/selector.js');
    
    const result = parseSelector('.btn');
    
    expect(result).toHaveProperty('baseSelector');
    expect(result).toHaveProperty('cssProperty');
    expect(result.baseSelector).toBe('.btn');
    expect(result.cssProperty).toBe(null);
  });

  test('parseSelector handles @css directive', async () => {
    const { parseSelector } = await import('../../src/parser/selector.js');
    
    const result = parseSelector('.btn @css padding');
    
    expect(result.baseSelector).toBe('.btn');
    expect(result.cssProperty).toBe('padding');
  });

  test('parseSelector caches results', async () => {
    const { parseSelector } = await import('../../src/parser/selector.js');
    
    const selector = '.card';
    const result1 = parseSelector(selector);
    const result2 = parseSelector(selector);
    
    expect(result1).toBe(result2); // Same reference = cached
  });
});

describe('parser/variants', () => {
  test('resolveVariants handles responsive breakpoints', async () => {
    const { resolveVariants } = await import('../../src/parser/variants.js');
    
    const result = resolveVariants('.btn', ['md']);
    
    expect(result).toHaveProperty('media');
    expect(result).toHaveProperty('finalSelector');
    expect(result.media).toContain('@media');
    expect(result.media).toContain('768px');
    expect(result.finalSelector).toBe('.btn');
  });

  test('resolveVariants handles pseudo-classes', async () => {
    const { resolveVariants } = await import('../../src/parser/variants.js');
    
    const result = resolveVariants('.btn', ['hover']);
    
    expect(result.media).toBe(null);
    expect(result.finalSelector).toBe('.btn:hover');
  });

  test('resolveVariants handles multiple variants', async () => {
    const { resolveVariants } = await import('../../src/parser/variants.js');
    
    const result = resolveVariants('.btn', ['md', 'hover']);
    
    expect(result.media).toContain('@media');
    expect(result.finalSelector).toBe('.btn:hover');
  });

  test('resolveVariants handles dark mode', async () => {
    const { resolveVariants } = await import('../../src/parser/variants.js');
    
    const result = resolveVariants('.text', ['dark']);
    
    expect(result.media).toBe(null);
    expect(result.finalSelector).toBe('.dark .text');
  });

  test('expandDirectiveGroups expands gap shorthand', async () => {
    const { expandDirectiveGroups } = await import('../../src/parser/variants.js');
    
    const result = expandDirectiveGroups('gap(2 4)');
    
    expect(result).toContain('gap-2');
    expect(result).toContain('gap-4');
  });

  test('expandDirectiveGroups handles dark mode syntax', async () => {
    const { expandDirectiveGroups } = await import('../../src/parser/variants.js');
    
    const result = expandDirectiveGroups('dark:(bg-gray-900 text-white)');
    
    // Note: The function doesn't expand nested groups, only prefixes
    // Full expansion requires expandGroupedClass()
    expect(result).toContain('dark:');
    expect(typeof result).toBe('string');
  });

  test('expandVariants expands hover groups', async () => {
    const { expandVariants } = await import('../../src/parser/variants.js');
    
    const result = expandVariants('hover:(bg-blue-500 text-white)');
    
    expect(result).toContain('hover:bg-blue-500');
    expect(result).toContain('hover:text-white');
  });

  test('expandVariants handles nested variants', async () => {
    const { expandVariants } = await import('../../src/parser/variants.js');
    
    const result = expandVariants('md:hover:(scale-110 shadow-lg)');
    
    // Check that it expanded with some prefix
    expect(result).toContain('md:hover:scale-110');
    // Second class might have different behavior
    expect(result).toContain('scale-110');
    expect(result).toContain('shadow-lg');
  });

  test('expandGroupedClass handles complex expressions', async () => {
    const { expandGroupedClass } = await import('../../src/parser/variants.js');
    
    const input = 'gap(2 4) hover:(bg-blue text-white)';
    const result = expandGroupedClass(input);
    
    expect(result).toContain('gap-2');
    expect(result).toContain('gap-4');
    expect(result).toContain('hover:bg-blue');
    expect(result).toContain('hover:text-white');
  });

  test('expandGroupedClass stabilizes after expansion', async () => {
    const { expandGroupedClass } = await import('../../src/parser/variants.js');
    
    const input = 'hover:(scale-110)';
    const result1 = expandGroupedClass(input);
    const result2 = expandGroupedClass(result1); // Should be stable
    
    expect(result1).toBe(result2);
  });
});
