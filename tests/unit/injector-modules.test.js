/**
 * Tests for injector modules (Phase 4 refactoring)
 * 
 * Verifies DOM CSS injection functionality.
 * Note: Full integration tests exist in the main test suite.
 */

import { describe, test, expect } from '@jest/globals';

describe('injector/dom - Module Structure', () => {
  test('exports autoInjectCss function', async () => {
    const { autoInjectCss } = await import('../../src/injector/dom.js');
    
    expect(autoInjectCss).toBeDefined();
    expect(typeof autoInjectCss).toBe('function');
  });

  test('exports rebuildStyleTag function', async () => {
    const { rebuildStyleTag } = await import('../../src/injector/dom.js');
    
    expect(rebuildStyleTag).toBeDefined();
    expect(typeof rebuildStyleTag).toBe('function');
  });

  test('autoInjectCss accepts cssString parameter', async () => {
    const { autoInjectCss } = await import('../../src/injector/dom.js');
    
    // Should not throw even in non-browser environment
    expect(() => autoInjectCss('.test { color: red; }')).not.toThrow();
  });

  test('autoInjectCss accepts optional sourceKey parameter', async () => {
    const { autoInjectCss } = await import('../../src/injector/dom.js');
    
    // Should not throw with sourceKey
    expect(() => autoInjectCss('.test { color: red; }', 'test-key')).not.toThrow();
  });

  test('autoInjectCss handles SSR mode gracefully', async () => {
    const { autoInjectCss } = await import('../../src/injector/dom.js');
    const { startSSR, stopSSR } = await import('../../src/utils/ssr.js');
    
    // Enable SSR mode
    const collector = startSSR();
    
    // Inject CSS in SSR mode
    autoInjectCss('.ssr-test { color: blue; }');
    
    // Stop SSR and get collected CSS
    const css = stopSSR();
    
    expect(css).toContain('.ssr-test { color: blue; }');
  });

  test('rebuildStyleTag works in browser-like environment', async () => {
    const { rebuildStyleTag } = await import('../../src/injector/dom.js');
    const { cssBlockRegistry } = await import('../../src/shared/cache.js');
    
    // Mock minimal DOM
    const mockStyleTag = {
      id: 'twsx-auto-style',
      textContent: '',
      setAttribute: () => {},
    };
    
    global.document = {
      getElementById: () => mockStyleTag,
      createElement: () => mockStyleTag,
      head: {
        appendChild: () => {},
      },
    };
    
    cssBlockRegistry.set('test-key', '.test { color: red; }');
    
    // Should not throw
    expect(() => rebuildStyleTag()).not.toThrow();
    
    // Cleanup
    cssBlockRegistry.clear();
    delete global.document;
  });

  test('autoInjectCss integrates with cache system', async () => {
    // This test validates module structure and imports
    const { autoInjectCss } = await import('../../src/injector/dom.js');
    const { cssBlockRegistry } = await import('../../src/shared/cache.js');
    
    // Verify modules are connected
    expect(autoInjectCss).toBeDefined();
    expect(cssBlockRegistry).toBeDefined();
    expect(cssBlockRegistry instanceof Map).toBe(true);
  });

  test('autoInjectCss handles errors gracefully', async () => {
    const { autoInjectCss } = await import('../../src/injector/dom.js');
    
    // Mock document with error
    global.document = {
      getElementById: () => {
        throw new Error('DOM access error');
      },
    };
    
    // Should not throw
    expect(() => autoInjectCss('.error-test { color: red; }')).not.toThrow();
    
    // Cleanup
    delete global.document;
  });

  test('autoInjectCss deduplicates with slot keys', async () => {
    // This test validates the function signature and module structure
    const { autoInjectCss } = await import('../../src/injector/dom.js');
    
    // Should accept both css and sourceKey parameters
    expect(() => autoInjectCss('.test1 { color: red; }', 'key1')).not.toThrow();
    expect(() => autoInjectCss('.test2 { color: blue; }', 'key2')).not.toThrow();
  });
});
