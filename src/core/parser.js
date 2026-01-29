/**
 * CSS Parser Module
 * Handles parsing, encoding, and decoding of CSS classes and selectors
 */

import {
  BRACKET_CONTENT_REGEX,
  OPENING_PAREN_REGEX,
  CLOSING_PAREN_REGEX,
  ENCODED_PAREN_OPEN_REGEX,
  ENCODED_PAREN_CLOSE_REGEX,
  DIRECTIVE_GROUP_REGEX,
  VARIANT_GROUP_REGEX,
  WHITESPACE_SPLIT_REGEX,
  VARIANT_COLON_SPLIT_REGEX,
  SELECTOR_VARIANT_REGEX,
  NOT_SELECTOR_REGEX,
  DIGIT_ONLY_REGEX,
  selectorVariants,
  breakpoints,
  pseudoVariants,
  specialVariants,
} from "./constants.js";
import { cacheManager } from "./cache-manager.js";

/**
 * Encode bracket values for safe processing
 * @param {string} input - Input string
 * @returns {string} Encoded string
 */
export function encodeBracketValues(input) {
  if (!input) return input;
  
  if (cacheManager.encodeBracketCache.has(input)) {
    cacheManager.trackHit();
    return cacheManager.encodeBracketCache.get(input);
  }

  cacheManager.trackMiss();
  BRACKET_CONTENT_REGEX.lastIndex = 0;
  const result = input.replace(BRACKET_CONTENT_REGEX, (_, content) => {
    const encoded = encodeURIComponent(content)
      .replace(OPENING_PAREN_REGEX, "__P__")
      .replace(CLOSING_PAREN_REGEX, "__C__");
    return `[${encoded}]`;
  });

  cacheManager.encodeBracketCache.set(input, result);
  return result;
}

/**
 * Decode bracket values back to original
 * @param {string} input - Encoded string
 * @returns {string} Decoded string
 */
export function decodeBracketValues(input) {
  if (!input) return input;
  
  if (cacheManager.decodeBracketCache.has(input)) {
    cacheManager.trackHit();
    return cacheManager.decodeBracketCache.get(input);
  }

  cacheManager.trackMiss();
  const result = decodeURIComponent(input)
    .replace(ENCODED_PAREN_OPEN_REGEX, "(")
    .replace(ENCODED_PAREN_CLOSE_REGEX, ")");

  cacheManager.decodeBracketCache.set(input, result);
  return result;
}

/**
 * Replace selector variants with their CSS equivalents
 * @param {string} selector - Selector string
 * @returns {string} Replaced selector
 */
export function replaceSelector(selector) {
  SELECTOR_VARIANT_REGEX.lastIndex = 0;
  return selector.replace(SELECTOR_VARIANT_REGEX, (_, raw) => {
    if (DIGIT_ONLY_REGEX.test(raw)) return selectorVariants.number(raw);
    const notMatch = raw.match(NOT_SELECTOR_REGEX);
    if (notMatch) return selectorVariants.not(notMatch[1]);
    if (selectorVariants[raw]) return selectorVariants[raw]();
    return raw;
  });
}

/**
 * Resolve variants to CSS selectors and media queries
 * @param {string} selector - Base selector
 * @param {Array<string>} variants - Array of variants
 * @returns {Object} { media, finalSelector }
 */
export function resolveVariants(selector, variants) {
  let media = null;
  let finalSelector = selector;

  for (const v of variants) {
    if (breakpoints[v]) {
      media = breakpoints[v];
    } else if (pseudoVariants.has(v)) {
      finalSelector += `:${v}`;
    } else if (v === "dark") {
      finalSelector = `.dark ${finalSelector}`;
    } else {
      for (const key in specialVariants) {
        if (v.startsWith(`${key}-`)) {
          const state = v.slice(key.length + 1);
          finalSelector = specialVariants[key](state, finalSelector);
          break;
        }
      }
    }
  }

  return { media, finalSelector };
}

/**
 * Parse selector to extract base selector and CSS property
 * @param {string} selector - Selector string
 * @returns {Object} { baseSelector, cssProperty }
 */
export function parseSelector(selector) {
  if (cacheManager.parseSelectorCache.has(selector)) {
    cacheManager.trackHit();
    return cacheManager.parseSelectorCache.get(selector);
  }

  cacheManager.trackMiss();
  let result;
  if (selector.includes("@css")) {
    const parts = selector.split("@css");
    const baseSelector = parts[0].trim();
    const cssProperty = parts[1]?.trim();
    result = { baseSelector, cssProperty };
  } else {
    result = { baseSelector: selector, cssProperty: null };
  }

  cacheManager.parseSelectorCache.set(selector, result);
  return result;
}

/**
 * Expand directive groups (e.g., m(1 2 3) -> m-1 m-2 m-3)
 * @param {string} str - String with directive groups
 * @returns {string} Expanded string
 */
export function expandDirectiveGroups(str) {
  DIRECTIVE_GROUP_REGEX.lastIndex = 0;
  return str.replace(DIRECTIVE_GROUP_REGEX, (_, directive, content) => {
    if (directive === "dark") {
      return content
        .trim()
        .split(WHITESPACE_SPLIT_REGEX)
        .map((cls) => `dark:${cls}`)
        .join(" ");
    }

    return content
      .trim()
      .split(WHITESPACE_SPLIT_REGEX)
      .map((val) => {
        if (val.includes(":")) {
          const parts = val.split(VARIANT_COLON_SPLIT_REGEX);
          const variant = parts[0];
          const v = parts[1];
          const prefix = v.startsWith("-") ? "-" : "";
          const value = v.startsWith("-") ? v.slice(1) : v;
          return `${variant}:${prefix}${directive}-${value}`;
        }
        const prefix = val.startsWith("-") ? "-" : "";
        const value = val.startsWith("-") ? val.slice(1) : val;
        return `${prefix}${directive}-${value}`;
      })
      .join(" ");
  });
}

/**
 * Expand variants (e.g., hover:(text-lg p-4) -> hover:text-lg hover:p-4)
 * @param {string} str - String with variant groups
 * @param {string} parent - Parent variant
 * @returns {string} Expanded string
 */
export function expandVariants(str, parent = "") {
  VARIANT_GROUP_REGEX.lastIndex = 0;
  return str.replace(VARIANT_GROUP_REGEX, (_, variant, content) => {
    return content
      .trim()
      .split(WHITESPACE_SPLIT_REGEX)
      .map((c) => {
        if (/\w+:\(.*\)/.test(c)) {
          return expandVariants(c, parent ? `${parent}:${variant}` : variant);
        }
        return `${parent ? `${parent}:${variant}` : variant}:${c}`;
      })
      .join(" ");
  });
}

/**
 * Expand grouped classes
 * @param {string} input - Input string with grouped classes
 * @returns {string} Expanded string
 */
export function expandGroupedClass(input) {
  let result = encodeBracketValues(input);
  let prev;

  do {
    prev = result;
    result = expandVariants(result);
    result = expandDirectiveGroups(result);
  } while (result !== prev);

  return result;
}
