/**
 * Variant Resolution
 * 
 * Handles Tailwind variant expansion and resolution.
 * Supports responsive, pseudo-class, dark mode, group, and peer variants.
 * 
 * @module parser/variants
 */

import {
  DIRECTIVE_GROUP_REGEX,
  VARIANT_GROUP_REGEX,
  WHITESPACE_SPLIT_REGEX,
  VARIANT_COLON_SPLIT_REGEX,
  breakpoints,
  pseudoVariants,
  specialVariants,
} from "../shared/constants.js";
import { encodeBracketValues } from "./bracket.js";

/**
 * Resolve variants to media queries and pseudo-selectors.
 * 
 * @param {string} selector - Base CSS selector
 * @param {string[]} variants - Array of variant names (e.g., ['md', 'hover'])
 * @returns {Object} Resolved variant
 * @returns {string|null} return.media - Media query if responsive
 * @returns {string} return.finalSelector - Selector with pseudo-classes
 * 
 * @example
 * resolveVariants('.btn', ['md', 'hover'])
 * // → { media: '@media (min-width: 768px)', finalSelector: '.btn:hover' }
 * 
 * @example
 * resolveVariants('.icon', ['group-hover'])
 * // → { media: null, finalSelector: '.group:hover .icon' }
 * 
 * @example
 * resolveVariants('.text', ['dark'])
 * // → { media: null, finalSelector: '.dark .text' }
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
      // Special handling for dark variant
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
 * Expand directive groups like gap(2 4) → gap-2 gap-4.
 * 
 * @param {string} str - Class string with directive groups
 * @returns {string} Expanded classes
 * 
 * @example
 * expandDirectiveGroups('gap(2 4)')
 * // → 'gap-2 gap-4'
 * 
 * @example
 * expandDirectiveGroups('dark:(bg-gray-900 text-white)')
 * // → 'dark:bg-gray-900 dark:text-white'
 */
export function expandDirectiveGroups(str) {
  DIRECTIVE_GROUP_REGEX.lastIndex = 0; // Reset global regex
  return str.replace(DIRECTIVE_GROUP_REGEX, (_, directive, content) => {
    // Special handling for dark mode syntax: dark:(classes)
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
 * Expand variant groups like hover:(bg-blue text-white) → hover:bg-blue hover:text-white.
 * 
 * @param {string} str - Class string with variant groups
 * @param {string} parent - Parent variant prefix
 * @returns {string} Expanded classes
 * 
 * @example
 * expandVariants('hover:(bg-blue-500 text-white)')
 * // → 'hover:bg-blue-500 hover:text-white'
 * 
 * @example
 * expandVariants('md:hover:(scale-110 shadow-lg)')
 * // → 'md:hover:scale-110 md:hover:shadow-lg'
 */
export function expandVariants(str, parent = "") {
  VARIANT_GROUP_REGEX.lastIndex = 0; // Reset global regex
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
 * Expand all grouped classes (directives and variants).
 * Applies encoding, variant expansion, and directive expansion until stable.
 * 
 * @param {string} input - Class string with groups
 * @returns {string} Fully expanded classes
 * 
 * @example
 * expandGroupedClass('gap(2 4) hover:(bg-blue text-white)')
 * // → 'gap-2 gap-4 hover:bg-blue hover:text-white'
 * 
 * @example
 * expandGroupedClass('md:hover:(scale-110 shadow-lg)')
 * // → 'md:hover:scale-110 md:hover:shadow-lg'
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
