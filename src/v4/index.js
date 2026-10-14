/**
 * tailwind-to-style v4 — Unified Public API
 *
 * The single entry point for the library. Exports:
 * - tw()  — The ONE main function (string, named, variants, slots)
 * - tws() — Inline style converter
 * - cx()  — Conditional class merge
 *
 * @module tailwind-to-style
 */

import { twsxClassName, tw as twAtomic } from '../className/index.js';
import { twsx as twsxCore } from '../index.js';
import { tws } from '../core/tws.js';
import { cx } from '../cx.js';
import { createSSRCollector } from '../utils/ssr.js';

// ============================================================================
// tw() — The unified Tailwind-to-CSS function
// ============================================================================

/**
 * The ONE main function for converting Tailwind classes to real CSS at runtime.
 *
 * Supports 4 modes:
 *
 * Mode 1: String → inject CSS, return atomic class names
 *   tw('flex items-center gap-4') → "tw-flex tw-items-center tw-gap-4"
 *
 * Mode 2: Named string → inject CSS under a named class
 *   tw('sidebar', 'w-64 h-screen bg-white') → "sidebar"
 *
 * Mode 3: Object with variants → returns a variant selector function
 *   const btn = tw({ name: 'btn', base: '...', variants: {...} })
 *   btn({ color: 'primary' }) → "btn btn--color-primary"
 *
 * Mode 4: Object with slots → returns a slot generator function
 *   const card = tw({ name: 'card', slots: { root: '...', header: '...' } })
 *   card() → { root: "card__root", header: "card__header" }
 *
 * @param {string|Object} classesOrConfig - Tailwind classes string OR config object
 * @param {string} [classesIfNamed] - Tailwind classes when first arg is a name
 * @returns {string|Function} Class name(s) or variant/slot selector function
 */
function tw(classesOrConfig, classesIfNamed) {
  // Mode 2: tw('name', 'tailwind classes')
  if (typeof classesOrConfig === 'string' && typeof classesIfNamed === 'string') {
    return twsxClassName({ name: classesOrConfig, _: classesIfNamed });
  }

  // Mode 1: tw('flex items-center gap-4')
  if (typeof classesOrConfig === 'string') {
    return twAtomic(classesOrConfig);
  }

  // Mode 3 & 4: tw({ name, base, variants, slots, ... })
  if (typeof classesOrConfig === 'object' && classesOrConfig !== null) {
    return twsxClassName(classesOrConfig);
  }

  return '';
}

// ============================================================================
// tw.* utility methods
// ============================================================================

function minifyCssString(css) {
  if (!css || typeof css !== 'string') return '';

  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

/**
 * Extract all generated CSS as a string for SSR or production export.
 * Prefer the class-name registry because it contains the CSS emitted by tw()
 * calls through the unified runtime API.
 * @param {Object} [options]
 * @param {boolean} [options.minify]
 * @returns {string} CSS content
 */
tw.extractCSS = function extractCSS(options = {}) {
  const { minify = false } = options;

  const css = typeof twsxClassName.getAllCSS === 'function'
    ? twsxClassName.getAllCSS()
    : '';

  return minify ? minifyCssString(css) : css;
};

/**
 * Build a static CSS file from the runtime-generated styles.
 * Keeps the compact tw() authoring model but allows a production export step.
 */
tw.build = async function build(options = {}) {
  const { outFile, minify = false, inject = false } = options;

  tw.runtime({ inject: Boolean(inject) });
  const css = tw.extractCSS({ minify });

  if (outFile && typeof process !== 'undefined' && process.versions?.node) {
    const fs = await import('node:fs/promises');
    const path = await import('node:path');
    await fs.mkdir(path.dirname(outFile), { recursive: true });
    await fs.writeFile(outFile, css, 'utf8');
  }

  return css;
};

/**
 * Runtime toggle for the unified API.
 * Mirrors the twsx runtime behavior used by the hybrid build/extraction flow.
 */
tw.runtime = function runtime(options = {}) {
  twsxCore.runtime(options);
  if (typeof twsxClassName.config === 'function') {
    twsxClassName.config(options);
  }
  return tw;
};

/**
 * Expose SSR collection in the same shape as the hybrid runtime + extraction model.
 */
tw.collect = function collect(options = {}) {
  return createSSRCollector(options);
};

/**
 * Clear all internal caches (className cache, atomic cache, CSS cache).
 * Useful for testing or hot-reload scenarios.
 */
tw.clearCache = function clearCache() {
  if (typeof twsxClassName.clearCache === 'function') {
    twsxClassName.clearCache();
  }
};

/**
 * Configure global settings for tw().
 * @param {Object} options - Configuration options
 * @param {string} [options.prefix] - Class prefix (default: "twsx")
 * @param {boolean} [options.hash] - Enable hashing (default: true)
 * @param {number} [options.hashLength] - Hash length (default: 8)
 * @param {boolean} [options.inject] - Auto-inject CSS (default: true)
 */
tw.config = function config(options) {
  if (typeof twsxClassName.config === 'function') {
    twsxClassName.config(options);
  }
};

// ============================================================================
// Re-exports
// ============================================================================

export { tw, tws, cx };

// SSR utilities
export { createSSRCollector } from '../utils/ssr.js';

export default tw;
