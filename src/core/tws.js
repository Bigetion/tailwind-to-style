/**
 * TWS Core - Tailwind to Style Converter
 *
 * Re-exports tws and related functions from the main module.
 * This file serves as the entry point for tree-shakeable imports:
 * import { tws } from 'tailwind-to-style/tws'
 *
 * This used to contain a second, independent implementation of tws() that
 * called `tailwindCache.getOrGenerate()` without the required `generateFn`/
 * `convertFn` arguments. That threw on first use, was silently swallowed by
 * the surrounding try/catch, and made tws()/useTws() return an empty
 * string/object unless something else had already populated the shared
 * cache singleton first. Delegating to the single implementation in
 * `../index.js` (same pattern already used by `core/twsx.js` and
 * `core/twsxVariants.js`) removes the duplicate so there is only one source
 * of truth for CSS generation.
 *
 * @module core/tws
 */

export { tws, debouncedTws } from '../index.js';
