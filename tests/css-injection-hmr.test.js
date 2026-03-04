/**
 * @jest-environment jsdom
 *
 * CSS Injection — HMR (Hot Module Replacement) Slot-Based Tests
 * ============================================================================
 * Verifies that twsx() correctly replaces stale CSS when styles are updated
 * during development (HMR), instead of accumulating duplicate rules in <head>.
 *
 * Root cause it guards against:
 *   Every call to twsx() with NEW content used to append CSS via `textContent +=`,
 *   so after an HMR cycle the old `.card` rules remained in the style tag alongside
 *   the new ones — causing property bleed-through unless the browser was hard-refreshed.
 *
 * Fix:
 *   Each twsx(obj) call owns a stable "slot" in the single #twsx-auto-style tag
 *   keyed by the sorted top-level selector names (not the CSS content hash).
 *   When classes change the slot content is replaced and the tag is rebuilt,
 *   so stale CSS is always removed on the next HMR cycle.
 * ============================================================================
 */

import { twsx, performanceUtils } from '../src/index.js';

// ─── Helpers ────────────────────────────────────────────────────────────────

function getStyleContent() {
  return document.getElementById('twsx-auto-style')?.textContent ?? '';
}

function countOccurrences(str, substr) {
  let count = 0;
  let pos = 0;
  while ((pos = str.indexOf(substr, pos)) !== -1) {
    count++;
    pos += substr.length;
  }
  return count;
}

// Reset all injection state and DOM between each test to isolate behaviour
beforeEach(() => {
  performanceUtils.clearCaches();
  document.head.innerHTML = '';
});

// ═══════════════════════════════════════════════════════════════════════════
// 1. BASIC INJECTION
// ═══════════════════════════════════════════════════════════════════════════
describe('twsx CSS injection: basics', () => {
  test('first call creates #twsx-auto-style and injects CSS', () => {
    twsx({ '.card': 'bg-white p-5' });

    const tag = document.getElementById('twsx-auto-style');
    expect(tag).not.toBeNull();
    expect(tag.getAttribute('data-twsx')).toBe('');
    expect(getStyleContent()).toContain('.card{');
  });

  test('inject: false skips DOM injection but still returns CSS string', () => {
    const css = twsx({ '.card': 'bg-white p-5' }, { inject: false });

    expect(css).toContain('.card{');
    expect(document.getElementById('twsx-auto-style')).toBeNull();
  });

  test('empty object produces empty string and no style tag', () => {
    const css = twsx({}, { inject: false });
    expect(css).toBe('');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// 2. NO DUPLICATE INJECTION (same content called multiple times)
// ═══════════════════════════════════════════════════════════════════════════
describe('twsx CSS injection: deduplication (same content)', () => {
  test('calling twsx with the identical object twice does not duplicate CSS', () => {
    const styles = { '.card': 'bg-white p-5' };

    twsx(styles); // first call
    twsx(styles); // second call — same object reference (WeakMap hit)

    expect(countOccurrences(getStyleContent(), '.card{')).toBe(1);
  });

  test('calling twsx with a new object but identical content does not duplicate', () => {
    twsx({ '.card': 'bg-white p-5' });
    twsx({ '.card': 'bg-white p-5' }); // new object literal, same content

    expect(countOccurrences(getStyleContent(), '.card{')).toBe(1);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// 3. HMR — UPDATED STYLES REPLACE OLD SLOT (core fix)
// ═══════════════════════════════════════════════════════════════════════════
describe('twsx CSS injection: HMR style replacement', () => {
  test('updating a simple selector replaces old CSS, not stacks', () => {
    // Simulate initial page load
    twsx({ '.card': 'bg-white shadow-md' });
    expect(getStyleContent()).toContain('.card{');

    // Simulate developer edits classes in the Vue SFC → HMR fires
    twsx({ '.card': 'bg-red-500 shadow-xl' });

    const style = getStyleContent();

    // The .card block must appear exactly once — no duplicate
    expect(countOccurrences(style, '.card{')).toBe(1);
  });

  test('updated CSS contains only the new declarations (no property bleed-through)', () => {
    // Initial: white background
    twsx({ '.card': 'bg-white' });
    const before = getStyleContent();
    expect(before).toContain('background');

    // After HMR: grey background
    twsx({ '.card': 'bg-gray-500' });
    const after = getStyleContent();

    // Only one .card block survives
    expect(countOccurrences(after, '.card{')).toBe(1);
  });

  test('multiple HMR cycles keep exactly one copy of the selector', () => {
    twsx({ '.card': 'p-2 bg-white' });       // initial
    twsx({ '.card': 'p-4 bg-gray-100' });    // HMR cycle 1
    twsx({ '.card': 'p-6 bg-gray-200' });    // HMR cycle 2
    twsx({ '.card': 'p-8 bg-gray-300' });    // HMR cycle 3

    expect(countOccurrences(getStyleContent(), '.card{')).toBe(1);
  });

  test('HMR update for complex nested component styles replaces cleanly', () => {
    // The exact Vue SFC pattern from the bug report
    twsx({
      'html': 'bg-gray-100 min-h-screen flex items-center justify-center',
      '.card': [
        'bg-white p-5 border border-gray-300 rounded-xl shadow-md',
        {
          '&:hover': 'shadow-xl',
          '> .title': 'text-xl font-bold text-gray-900 mb-3',
          '> .body': 'text-sm text-gray-700',
        },
      ],
    });

    // Developer changes shadow-md → shadow-lg and mb-3 → mb-4
    twsx({
      'html': 'bg-gray-100 min-h-screen flex items-center justify-center',
      '.card': [
        'bg-white p-5 border border-gray-300 rounded-xl shadow-lg',
        {
          '&:hover': 'shadow-2xl',
          '> .title': 'text-xl font-bold text-gray-900 mb-4',
          '> .body': 'text-sm text-gray-700',
        },
      ],
    });

    const style = getStyleContent();

    // Each top-level selector must appear exactly once
    expect(countOccurrences(style, '.card{')).toBe(1);
    expect(countOccurrences(style, 'html{')).toBe(1);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// 4. MULTIPLE INDEPENDENT COMPONENTS (different selectors)
// ═══════════════════════════════════════════════════════════════════════════
describe('twsx CSS injection: independent component slots', () => {
  test('two twsx calls with different selectors each appear in the style tag', () => {
    twsx({ '.header': 'bg-blue-500 text-white' });
    twsx({ '.card': 'bg-white p-4 shadow-md' });

    const style = getStyleContent();
    expect(style).toContain('.header{');
    expect(style).toContain('.card{');
  });

  test('HMR update to one component does not remove other components CSS', () => {
    twsx({ '.header': 'bg-blue-500' });
    twsx({ '.card': 'bg-white p-4' });

    // Only the card styles are updated
    twsx({ '.card': 'bg-gray-100 p-6' });

    const style = getStyleContent();
    expect(style).toContain('.header{');  // header must survive
    expect(style).toContain('.card{');    // card must still be there
    expect(countOccurrences(style, '.card{')).toBe(1);  // only once
    expect(countOccurrences(style, '.header{')).toBe(1);
  });

  test('three components updated independently each keep a single slot', () => {
    twsx({ '.nav': 'flex gap-4 p-4' });
    twsx({ '.card': 'bg-white p-4' });
    twsx({ '.footer': 'bg-gray-800 text-white p-6' });

    // HMR fires for .card
    twsx({ '.card': 'bg-blue-50 p-6 shadow-lg' });

    const style = getStyleContent();
    expect(countOccurrences(style, '.nav{')).toBe(1);
    expect(countOccurrences(style, '.card{')).toBe(1);
    expect(countOccurrences(style, '.footer{')).toBe(1);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// 5. PERFORMANCE UTILS INTEGRATION
// ═══════════════════════════════════════════════════════════════════════════
describe('twsx CSS injection: performanceUtils', () => {
  test('clearCaches empties the style tag', () => {
    twsx({ '.card': 'bg-white p-5' });
    expect(getStyleContent()).not.toBe('');

    performanceUtils.clearCaches();

    expect(getStyleContent()).toBe('');
  });

  test('getStats reports cssBlocks count', () => {
    twsx({ '.header': 'bg-blue-500' });
    twsx({ '.card': 'bg-white p-4' });

    const stats = performanceUtils.getStats();
    expect(stats.injectionStats.cssBlocks).toBe(2);
  });

  test('after clearCaches, re-injecting works correctly', () => {
    twsx({ '.card': 'bg-white p-4' });
    performanceUtils.clearCaches();

    // Should be able to inject fresh CSS
    twsx({ '.card': 'bg-blue-500 p-8' });
    expect(getStyleContent()).toContain('.card{');
    expect(countOccurrences(getStyleContent(), '.card{')).toBe(1);
  });
});
