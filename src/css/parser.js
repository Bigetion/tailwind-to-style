/**
 * CSS Parser Utilities
 * 
 * Handles parsing of Tailwind class names, opacity modifiers,
 * bracket value encoding/decoding, and custom value extraction.
 * 
 * @module css/parser
 */

import { LRUCache } from "../utils/lruCache.js";
import {
  OPACITY_MODIFIER_REGEX,
  OPACITY_PROP_REGEXES,
  COLOR_PROPERTIES,
  COLOR_REGEX_PATTERNS,
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
  SELECTOR_VARIANTS,
  UPPERCASE_LETTER_REGEX,
} from "../core/constants.js";

// Caches for bracket encoding/decoding
const encodeBracketCache = new LRUCache(1000);
const decodeBracketCache = new LRUCache(1000);

/**
 * Process opacity modifier from class name
 * 
 * Converts opacity modifiers (e.g., text-red-500/50) to actual CSS opacity values.
 * Handles rgb, rgba, hsl, hsla, and hex color formats.
 * 
 * @param {string} className - Class name with potential opacity modifier
 * @param {string} cssDeclaration - CSS declaration to modify
 * @returns {string} Modified CSS declaration with opacity applied
 * 
 * @example
 * processOpacityModifier('text-red-500/50', 'color: rgb(239, 68, 68);')
 * // Returns: 'color: rgba(239, 68, 68, 0.5);'
 */
export function processOpacityModifier(className, cssDeclaration) {
  const opacityMatch = OPACITY_MODIFIER_REGEX.exec(className);
  if (!opacityMatch) return cssDeclaration;

  const opacityValue = parseInt(opacityMatch[1], 10);
  if (opacityValue < 0 || opacityValue > 100) return cssDeclaration;

  const alphaValue = (opacityValue / 100).toString();

  // Handle Tailwind's CSS custom property pattern
  let modifiedDeclaration = cssDeclaration;

  // Replace opacity custom properties using pre-compiled regexes
  for (const prop in OPACITY_PROP_REGEXES) {
    const regex = OPACITY_PROP_REGEXES[prop];
    regex.lastIndex = 0; // Reset global regex
    modifiedDeclaration = modifiedDeclaration.replace(
      regex,
      `${prop}: ${alphaValue}`
    );
  }

  // Also handle direct color values using pre-compiled regex patterns
  for (const prop of COLOR_PROPERTIES) {
    const patterns = COLOR_REGEX_PATTERNS.get(prop);
    if (!patterns) continue;

    // Reset all regex lastIndex for reuse
    patterns.rgb.lastIndex = 0;
    patterns.rgba.lastIndex = 0;
    patterns.hsl.lastIndex = 0;
    patterns.hsla.lastIndex = 0;
    patterns.hex.lastIndex = 0;

    // Convert rgb to rgba with opacity
    modifiedDeclaration = modifiedDeclaration.replace(
      patterns.rgb,
      `$1rgba($2, $3, $4, ${alphaValue})`
    );

    // Update existing rgba opacity
    modifiedDeclaration = modifiedDeclaration.replace(
      patterns.rgba,
      `$1rgba($2, $3, $4, ${alphaValue})`
    );

    // Convert hsl to hsla with opacity
    modifiedDeclaration = modifiedDeclaration.replace(
      patterns.hsl,
      `$1hsla($2, $3, $4, ${alphaValue})`
    );

    // Update existing hsla opacity
    modifiedDeclaration = modifiedDeclaration.replace(
      patterns.hsla,
      `$1hsla($2, $3, $4, ${alphaValue})`
    );

    // Handle hex colors - convert to rgba
    modifiedDeclaration = modifiedDeclaration.replace(
      patterns.hex,
      (match, propPart, hexColor) => {
        // Convert hex to rgba
        const hex = hexColor.replace("#", "");
        let r, g, b;

        if (hex.length === 3) {
          r = parseInt(hex[0] + hex[0], 16);
          g = parseInt(hex[1] + hex[1], 16);
          b = parseInt(hex[2] + hex[2], 16);
        } else {
          r = parseInt(hex.substring(0, 2), 16);
          g = parseInt(hex.substring(2, 4), 16);
          b = parseInt(hex.substring(4, 6), 16);
        }

        return `${propPart}rgba(${r}, ${g}, ${b}, ${alphaValue})`;
      }
    );
  }

  return modifiedDeclaration;
}

/**
 * Encode bracket values for safe processing
 * 
 * Encodes parentheses inside bracket values to prevent parsing conflicts.
 * Uses LRU cache for performance.
 * 
 * @param {string} input - String with bracket values
 * @returns {string} Encoded string
 * 
 * @example
 * encodeBracketValues('w-[calc(100%-20px)]')
 * // Returns: 'w-[calc__P__100%25-20px__C__]'
 */
export function encodeBracketValues(input) {
  if (!input) return input;
  if (encodeBracketCache.has(input)) return encodeBracketCache.get(input);

  BRACKET_CONTENT_REGEX.lastIndex = 0; // Reset global regex
  const result = input.replace(BRACKET_CONTENT_REGEX, (_, content) => {
    const encoded = encodeURIComponent(content)
      .replace(OPENING_PAREN_REGEX, "__P__")
      .replace(CLOSING_PAREN_REGEX, "__C__");
    return `[${encoded}]`;
  });

  encodeBracketCache.set(input, result);
  return result;
}

/**
 * Decode bracket values back to original form
 * 
 * Reverses the encoding applied by encodeBracketValues.
 * Uses LRU cache for performance.
 * 
 * @param {string} input - Encoded string
 * @returns {string} Decoded string
 * 
 * @example
 * decodeBracketValues('w-[calc__P__100%25-20px__C__]')
 * // Returns: 'w-[calc(100%-20px)]'
 */
export function decodeBracketValues(input) {
  if (!input) return input;
  if (decodeBracketCache.has(input)) return decodeBracketCache.get(input);

  const result = decodeURIComponent(input)
    .replace(ENCODED_PAREN_OPEN_REGEX, "(")
    .replace(ENCODED_PAREN_CLOSE_REGEX, ")");

  decodeBracketCache.set(input, result);
  return result;
}

/**
 * Replace selector variants with actual CSS selectors
 * 
 * Converts Tailwind selector variants (c-first, c-odd, etc.) to CSS pseudo-selectors.
 * 
 * @param {string} selector - Selector string with potential c- variants
 * @returns {string} Selector with CSS pseudo-selectors
 * 
 * @example
 * replaceSelector('.card c-first')
 * // Returns: '.card > :first-child'
 */
export function replaceSelector(selector) {
  SELECTOR_VARIANT_REGEX.lastIndex = 0; // Reset global regex
  return selector.replace(SELECTOR_VARIANT_REGEX, (_, raw) => {
    if (DIGIT_ONLY_REGEX.test(raw)) return SELECTOR_VARIANTS.number(raw);
    const notMatch = raw.match(NOT_SELECTOR_REGEX);
    if (notMatch) return SELECTOR_VARIANTS.not(notMatch[1]);
    if (SELECTOR_VARIANTS[raw]) return SELECTOR_VARIANTS[raw]();
    return raw;
  });
}

/**
 * Expand directive groups into individual classes
 * 
 * Converts grouped directives (e.g., p(4 8)) into individual classes (p-4 p-8).
 * 
 * @param {string} str - String with potential directive groups
 * @returns {string} Expanded string
 * 
 * @example
 * expandDirectiveGroups('p(4 8) m(2)')
 * // Returns: 'p-4 p-8 m-2'
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
 * Expand variant groups into individual variants
 * 
 * Converts grouped variants (e.g., hover:(text-blue bg-blue)) into individual classes.
 * 
 * @param {string} str - String with potential variant groups
 * @param {string} parent - Parent variant to prepend
 * @returns {string} Expanded string
 * 
 * @example
 * expandVariants('hover:(text-blue bg-white)')
 * // Returns: 'hover:text-blue hover:bg-white'
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
 * Expand grouped class syntax recursively
 * 
 * Handles both directive groups and variant groups.
 * Encodes bracket values before processing to avoid conflicts.
 * 
 * @param {string} input - Input string with grouped syntax
 * @returns {string} Fully expanded string
 * 
 * @example
 * expandGroupedClass('hover:(bg-blue text-white) p(4 8)')
 * // Returns: 'hover:bg-blue hover:text-white p-4 p-8'
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

/**
 * Generate minified keyframes CSS
 * 
 * Converts keyframe definitions to minified CSS string.
 * 
 * @param {string[]} animationNames - Array of animation names
 * @param {Object} keyframesDefinitions - Keyframe definitions object
 * @returns {string} Minified keyframes CSS
 * 
 * @example
 * generateMinifiedKeyframes(['spin'], { spin: { '0%': { transform: 'rotate(0deg)' } } })
 * // Returns: '@keyframes spin{0%{transform:rotate(0deg);}}'
 */
export function generateMinifiedKeyframes(animationNames, keyframesDefinitions) {
  let css = "";
  for (const name of animationNames) {
    const keyframe = keyframesDefinitions[name];
    if (!keyframe) continue;

    css += `@keyframes ${name}{`;
    for (const [percentage, styles] of Object.entries(keyframe)) {
      css += `${percentage}{`;
      for (const [prop, value] of Object.entries(styles)) {
        const cssProp = prop
          .replace(UPPERCASE_LETTER_REGEX, "-$1")
          .toLowerCase();
        css += `${cssProp}:${value};`;
      }
      css += "}";
    }
    css += "}";
  }
  return css;
}
