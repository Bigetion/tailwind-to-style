/**
 * Bracket Value Encoding/Decoding
 * 
 * Handles encoding and decoding of bracket values in Tailwind classes.
 * Example: bg-[rgb(255,0,0)] → bg-[rgb__P__255%2C0%2C0__C__]
 * 
 * @module parser/bracket
 */

import {
  BRACKET_CONTENT_REGEX,
  OPENING_PAREN_REGEX,
  CLOSING_PAREN_REGEX,
  ENCODED_PAREN_OPEN_REGEX,
  ENCODED_PAREN_CLOSE_REGEX,
} from "../shared/constants.js";
import { encodeBracketCache, decodeBracketCache } from "../shared/cache.js";

/**
 * Encode bracket values to prevent parsing issues.
 * Encodes parentheses within brackets to special markers.
 * 
 * @param {string} input - Class string with brackets
 * @returns {string} Encoded string
 * 
 * @example
 * encodeBracketValues('bg-[rgb(255,0,0)]')
 * // → 'bg-[rgb__P__255%2C0%2C0__C__]'
 * 
 * @example
 * encodeBracketValues('w-[calc(100%-20px)]')
 * // → 'w-[calc__P__100%25-20px__C__]'
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
 * Decode previously encoded bracket values.
 * Reverses the encoding done by encodeBracketValues().
 * 
 * @param {string} input - Encoded class string
 * @returns {string} Decoded string
 * 
 * @example
 * decodeBracketValues('bg-[rgb__P__255%2C0%2C0__C__]')
 * // → 'bg-[rgb(255,0,0)]'
 * 
 * @example
 * decodeBracketValues('w-[calc__P__100%25-20px__C__]')
 * // → 'w-[calc(100%-20px)]'
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
