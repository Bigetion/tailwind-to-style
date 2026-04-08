/**
 * CSS Generator Utilities
 * 
 * Handles generation of CSS strings from style objects,
 * variant resolution, and media query management.
 * 
 * @module css/generator
 */

import { LRUCache } from "../utils/lruCache.js";
import { logger } from "../utils/logger.js";
import {
  BREAKPOINTS,
  PSEUDO_VARIANTS,
  SPECIAL_VARIANTS,
  ATTRIBUTE_VARIANTS,
} from "../core/constants.js";

// Cache for parsed selectors
const parseSelectorCache = new LRUCache(500);

/**
 * Parse selector to extract base selector and CSS property
 * 
 * Handles special @css directive for inline CSS properties.
 * 
 * @param {string} selector - Selector string
 * @returns {Object} Object with baseSelector and cssProperty
 * 
 * @example
 * parseSelector('.btn@css')
 * // Returns: { baseSelector: '.btn', cssProperty: null }
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

/**
 * Resolve variants to media queries and pseudo-selectors
 * 
 * Converts Tailwind variants (responsive, pseudo-classes, etc.) to CSS.
 * 
 * @param {string} selector - Base selector
 * @param {string[]} variants - Array of variant names
 * @returns {Object} Object with media query and final selector
 * 
 * @example
 * resolveVariants('.btn', ['hover', 'md'])
 * // Returns: { media: '@media (min-width: 768px)', finalSelector: '.btn:hover' }
 */
export function resolveVariants(selector, variants) {
  let media = null;
  let finalSelector = selector;

  for (const v of variants) {
    if (BREAKPOINTS[v]) {
      media = BREAKPOINTS[v];
    } else if (PSEUDO_VARIANTS.has(v)) {
      finalSelector += `:${v}`;
    } else if (ATTRIBUTE_VARIANTS.has(v)) {
      // Tailwind v4: attribute selector (e.g., open -> [open])
      finalSelector += `[${v}]`;
    } else if (v === "dark") {
      // Special handling for dark variant
      finalSelector = `.dark ${finalSelector}`;
    } else {
      for (const key in SPECIAL_VARIANTS) {
        if (v.startsWith(`${key}-`)) {
          const state = v.slice(key.length + 1);
          finalSelector = SPECIAL_VARIANTS[key](state, finalSelector);
          break;
        } else if (v === key) {
          // Exact match (e.g., 'not', 'has' without a sub-state)
          break;
        }
      }
    }
  }

  return { media, finalSelector };
}

/**
 * Flatten nested style object to flat selectors
 * 
 * Converts nested SCSS-like structure to flat CSS selectors.
 * 
 * @param {Object} obj - Nested style object
 * @param {string} parentSelector - Parent selector for nesting
 * @returns {Object} Flattened style object
 * 
 * @example
 * flattenStyleObject({ '.btn': { '&:hover': 'bg-blue' } })
 * // Returns: { '.btn:hover': 'bg-blue' }
 */
export function flattenStyleObject(obj, parentSelector = "") {
  const result = {};

  for (const selector in obj) {
    const val = obj[selector];

    // Handle media queries specially - don't concatenate with parent
    if (selector.startsWith("@media")) {
      if (isSelectorObject(val)) {
        // Recursively flatten nested content within media query
        const flattenedContent = {};
        for (const innerSelector in val) {
          const innerVal = val[innerSelector];
          
          if (typeof innerVal === "string") {
            flattenedContent[innerSelector] = innerVal;
          } else if (Array.isArray(innerVal)) {
            const [baseClasses, nested] = innerVal;
            flattenedContent[innerSelector] = baseClasses;
            
            if (nested && typeof nested === "object") {
              const nestedFlattened = flattenStyleObject({ [innerSelector]: nested });
              Object.assign(flattenedContent, nestedFlattened);
            }
          } else if (isSelectorObject(innerVal)) {
            const innerFlattened = flattenStyleObject(
              { [innerSelector]: innerVal },
              ""
            );
            Object.assign(flattenedContent, innerFlattened);
          }
        }
        
        result[selector] = flattenedContent;
      }
      continue;
    }

    const currentSelector = parentSelector
      ? selector.includes("&")
        ? selector.replace(/&/g, parentSelector)
        : `${parentSelector} ${selector}`
      : selector;

    if (typeof val === "string") {
      result[currentSelector] = val;
    } else if (Array.isArray(val)) {
      const [baseClasses, nested] = val;
      result[currentSelector] = baseClasses || "";
      
      if (nested && typeof nested === "object") {
        const nestedResult = flattenStyleObject(nested, currentSelector);
        Object.assign(result, nestedResult);
      }
    } else if (isSelectorObject(val)) {
      const nestedResult = flattenStyleObject(val, currentSelector);
      Object.assign(result, nestedResult);
    }
  }

  return result;
}

/**
 * Check if value is a selector object (not array, not null)
 * 
 * @param {*} val - Value to check
 * @returns {boolean} True if selector object
 */
function isSelectorObject(val) {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}

/**
 * Generate CSS string from processed styles
 * 
 * Converts style object to minified CSS string with media queries sorted.
 * 
 * @param {Object} styles - Style object with selectors and declarations
 * @returns {string} Generated CSS string
 * 
 * @example
 * generateCssString({ '.btn': 'color: blue;' })
 * // Returns: '.btn{color:blue;}'
 */
export function generateCssString(styles) {
  const baseStyles = [];
  const mediaStyles = [];

  for (const sel in styles) {
    if (!sel.startsWith("@media")) {
      baseStyles.push({ sel, css: styles[sel] });
    } else {
      mediaStyles.push({ sel, content: styles[sel] });
    }
  }

  let cssString = "";

  // Add base styles
  for (const { sel, css } of baseStyles) {
    cssString += `${sel}{${css.trim().replace(/\n/g, "")}}`;
  }

  // Sort and add media queries
  function mediaPriority(sel) {
    const match = sel.match(/@media \(min-width: (\d+)px\)/);
    return match ? parseInt(match[1], 10) : 99999;
  }

  mediaStyles.sort((a, b) => mediaPriority(a.sel) - mediaPriority(b.sel));

  for (const { sel, content } of mediaStyles) {
    cssString += `${sel}{`;
    for (const subSel in content) {
      cssString += `${subSel}{${content[subSel].trim().replace(/\n/g, "")}}`;
    }
    cssString += "}";
  }

  return cssString.trim();
}

/**
 * Auto-inject CSS into document
 * 
 * Injects CSS into a global style tag with deduplication.
 * 
 * @param {string} cssString - CSS string to inject
 * @param {Set} injectedHashes - Set of already injected CSS hashes
 * @param {Function} hashFn - Hash function for deduplication
 * 
 * @example
 * autoInjectCss('.btn{color:blue;}', injectedCssHashSet, getCssHash)
 */
export function autoInjectCss(cssString, injectedHashes, hashFn) {
  try {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const cssHash = hashFn(cssString);
      if (injectedHashes.has(cssHash)) {
        return;
      }

      injectedHashes.add(cssHash);
      let styleTag = document.getElementById("twsx-auto-style");
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "twsx-auto-style";
        document.head.appendChild(styleTag);
      }
      styleTag.textContent += `\n${cssString}`;

      // Log injection stats periodically
      if (injectedHashes.size % 10 === 0) {
        logger.debug(`CSS injected: ${injectedHashes.size} unique stylesheets`);
      }
    }
  } catch (error) {
    logger.error("Error injecting CSS:", error);
  }
}

/**
 * Simple hash function for CSS deduplication
 * 
 * @param {string} str - String to hash
 * @returns {number} Hash code
 */
export function getCssHash(str) {
  let hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
