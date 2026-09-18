/**
 * Selector Parsing
 * 
 * Parses CSS selectors and handles special selector variants.
 * 
 * @module parser/selector
 */

import {
  SELECTOR_VARIANT_REGEX,
  DIGIT_ONLY_REGEX,
  NOT_SELECTOR_REGEX,
  selectorVariants,
} from "../shared/constants.js";
import { parseSelectorCache } from "../shared/cache.js";

/**
 * Replace selector variants (first, last, odd, even, nth-child).
 * 
 * @param {string} selector - CSS selector
 * @returns {string} Transformed selector
 * 
 * @example
 * replaceSelector('c-first') // → '> :first-child'
 * replaceSelector('c-last')  // → '> :last-child'
 * replaceSelector('c-odd')   // → '> :nth-child(odd)'
 * replaceSelector('c-2')     // → '> :nth-child(2)'
 */
export function replaceSelector(selector) {
  SELECTOR_VARIANT_REGEX.lastIndex = 0; // Reset global regex
  return selector.replace(SELECTOR_VARIANT_REGEX, (_, raw) => {
    if (DIGIT_ONLY_REGEX.test(raw)) return selectorVariants.number(raw);
    const notMatch = raw.match(NOT_SELECTOR_REGEX);
    if (notMatch) return selectorVariants.not(notMatch[1]);
    if (selectorVariants[raw]) return selectorVariants[raw]();
    return raw;
  });
}

/**
 * Parse selector to extract base selector and CSS property.
 * Handles @css directive for custom CSS properties.
 * 
 * @param {string} selector - Selector string
 * @returns {Object} Parsed selector
 * @returns {string} return.baseSelector - Base CSS selector
 * @returns {string|null} return.cssProperty - CSS property if using @css
 * 
 * @example
 * parseSelector('.btn')
 * // → { baseSelector: '.btn', cssProperty: null }
 * 
 * @example
 * parseSelector('.btn @css padding')
 * // → { baseSelector: '.btn', cssProperty: 'padding' }
 */
export function parseSelector(selector) {
  if (parseSelectorCache.has(selector)) {
    return parseSelectorCache.get(selector);
  }

  let result;
  if (selector.includes("@css")) {
    const parts = selector.split("@css");
    const baseSelector = parts[0].trim();
    const cssProperty = parts[1]?.trim();
    result = { baseSelector, cssProperty };
  } else {
    result = { baseSelector: selector, cssProperty: null };
  }

  parseSelectorCache.set(selector, result);
  return result;
}
