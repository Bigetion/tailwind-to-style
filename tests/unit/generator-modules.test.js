/**
 * Tests for generator modules (Phase 3 refactoring)
 * 
 * Verifies that extracted generator functions work correctly.
 */

import { describe, test, expect } from '@jest/globals';

describe('generator/keyframes', () => {
  test('generateMinifiedKeyframes creates spin animation', async () => {
    const { generateMinifiedKeyframes } = await import('../../src/generator/keyframes.js');
    
    const css = generateMinifiedKeyframes(['spin']);
    
    expect(css).toContain('@keyframes spin');
    expect(css).toContain('transform');
    expect(css).toContain('rotate');
    expect(css).toContain('0deg');
    expect(css).toContain('360deg');
  });

  test('generateMinifiedKeyframes handles multiple animations', async () => {
    const { generateMinifiedKeyframes } = await import('../../src/generator/keyframes.js');
    
    const css = generateMinifiedKeyframes(['spin', 'pulse', 'bounce']);
    
    expect(css).toContain('@keyframes spin');
    expect(css).toContain('@keyframes pulse');
    expect(css).toContain('@keyframes bounce');
  });

  test('generateMinifiedKeyframes converts camelCase to kebab-case', async () => {
    const { generateMinifiedKeyframes } = await import('../../src/generator/keyframes.js');
    
    const css = generateMinifiedKeyframes(['bounce']);
    
    // animationTimingFunction should become animation-timing-function
    expect(css).toContain('animation-timing-function');
  });

  test('generateMinifiedKeyframes ignores unknown animations', async () => {
    const { generateMinifiedKeyframes } = await import('../../src/generator/keyframes.js');
    
    const css = generateMinifiedKeyframes(['unknownAnimation', 'spin']);
    
    expect(css).toContain('@keyframes spin');
    expect(css).not.toContain('@keyframes unknownAnimation');
  });

  test('generateMinifiedKeyframes returns empty string for empty array', async () => {
    const { generateMinifiedKeyframes } = await import('../../src/generator/keyframes.js');
    
    const css = generateMinifiedKeyframes([]);
    
    expect(css).toBe('');
  });
});

describe('generator/opacity', () => {
  test('processOpacityModifier handles RGB to RGBA conversion', async () => {
    const { processOpacityModifier } = await import('../../src/generator/opacity.js');
    
    const result = processOpacityModifier(
      'bg-blue-500/50',
      'background-color: rgb(59, 130, 246);'
    );
    
    expect(result).toContain('rgba');
    expect(result).toContain('0.5');
  });

  test('processOpacityModifier handles hex to RGBA conversion', async () => {
    const { processOpacityModifier } = await import('../../src/generator/opacity.js');
    
    const result = processOpacityModifier(
      'text-red-600/75',
      'color: #dc2626;'
    );
    
    expect(result).toContain('rgba');
    expect(result).toContain('0.75');
  });

  test('processOpacityModifier updates existing RGBA opacity', async () => {
    const { processOpacityModifier } = await import('../../src/generator/opacity.js');
    
    const result = processOpacityModifier(
      'bg-blue-500/30',
      'background-color: rgba(59, 130, 246, 1);'
    );
    
    expect(result).toContain('rgba');
    expect(result).toContain('0.3');
    expect(result).not.toContain(', 1)');
  });

  test('processOpacityModifier handles HSL to HSLA conversion', async () => {
    const { processOpacityModifier } = await import('../../src/generator/opacity.js');
    
    const result = processOpacityModifier(
      'bg-blue-500/60',
      'background-color: hsl(221, 83%, 53%);'
    );
    
    expect(result).toContain('hsla');
    expect(result).toContain('0.6');
  });

  test('processOpacityModifier handles CSS custom properties', async () => {
    const { processOpacityModifier } = await import('../../src/generator/opacity.js');
    
    const result = processOpacityModifier(
      'text-blue-500/40',
      '--text-opacity: 1;'
    );
    
    expect(result).toContain('--text-opacity: 0.4');
  });

  test('processOpacityModifier returns unchanged if no opacity modifier', async () => {
    const { processOpacityModifier } = await import('../../src/generator/opacity.js');
    
    const input = 'background-color: rgb(59, 130, 246);';
    const result = processOpacityModifier('bg-blue-500', input);
    
    expect(result).toBe(input);
  });

  test('processOpacityModifier handles 3-digit hex colors', async () => {
    const { processOpacityModifier } = await import('../../src/generator/opacity.js');
    
    const result = processOpacityModifier(
      'bg-red-500/50',
      'background-color: #f00;'
    );
    
    expect(result).toContain('rgba(255, 0, 0, 0.5)');
  });

  test('processOpacityModifier validates opacity range', async () => {
    const { processOpacityModifier } = await import('../../src/generator/opacity.js');
    
    const input = 'background-color: rgb(59, 130, 246);';
    
    // Invalid: opacity > 100
    const result1 = processOpacityModifier('bg-blue-500/150', input);
    expect(result1).toBe(input);
    
    // Invalid: opacity < 0
    const result2 = processOpacityModifier('bg-blue-500/-10', input);
    expect(result2).toBe(input);
  });
});

describe('generator/css-string', () => {
  test('resolveCssToClearCss resolves CSS variables', async () => {
    const { resolveCssToClearCss } = await import('../../src/generator/css-string.js');
    
    const result = resolveCssToClearCss('--text-opacity: 1; opacity: var(--text-opacity);');
    
    expect(result).toContain('--text-opacity: 1');
    expect(result).toContain('opacity: 1');
  });

  test('resolveCssToClearCss handles multiple variables', async () => {
    const { resolveCssToClearCss } = await import('../../src/generator/css-string.js');
    
    const result = resolveCssToClearCss(
      '--color: blue; --size: 16px; color: var(--color); font-size: var(--size);'
    );
    
    expect(result).toContain('color: blue');
    expect(result).toContain('font-size: 16px');
  });

  test('resolveCssToClearCss preserves regular CSS', async () => {
    const { resolveCssToClearCss } = await import('../../src/generator/css-string.js');
    
    const result = resolveCssToClearCss('background: rgb(59,130,246); color: white;');
    
    expect(result).toContain('background: rgb(59,130,246)');
    expect(result).toContain('color: white');
  });

  test('inlineStyleToJson converts to camelCase', async () => {
    const { inlineStyleToJson } = await import('../../src/generator/css-string.js');
    
    const result = inlineStyleToJson('background-color: blue; font-size: 16px;');
    
    expect(result).toHaveProperty('backgroundColor');
    expect(result).toHaveProperty('fontSize');
    expect(result.backgroundColor).toBe('blue');
    expect(result.fontSize).toBe('16px');
  });

  test('inlineStyleToJson resolves CSS variables', async () => {
    const { inlineStyleToJson } = await import('../../src/generator/css-string.js');
    
    const result = inlineStyleToJson('--text-color: red; color: var(--text-color);');
    
    expect(result).toHaveProperty('color');
    expect(result.color).toBe('red');
    expect(result).not.toHaveProperty('--text-color');
  });

  test('inlineStyleToJson handles nested var() references', async () => {
    const { inlineStyleToJson } = await import('../../src/generator/css-string.js');
    
    const result = inlineStyleToJson(
      '--primary: blue; --text: var(--primary); color: var(--text);'
    );
    
    expect(result.color).toBe('blue');
  });

  test('inlineStyleToJson handles var() with fallback', async () => {
    const { inlineStyleToJson } = await import('../../src/generator/css-string.js');
    
    const result = inlineStyleToJson('color: var(--undefined-color, red);');
    
    expect(result.color).toBe('red');
  });

  test('inlineStyleToJson returns empty object for empty string', async () => {
    const { inlineStyleToJson } = await import('../../src/generator/css-string.js');
    
    const result = inlineStyleToJson('');
    
    expect(result).toEqual({});
  });

  test('inlineStyleToJson ignores malformed declarations', async () => {
    const { inlineStyleToJson } = await import('../../src/generator/css-string.js');
    
    const result = inlineStyleToJson('validProp: value; invalidProp; another: valid;');
    
    expect(result).toHaveProperty('validProp');
    expect(result).toHaveProperty('another');
    expect(Object.keys(result).length).toBe(2);
  });
});
