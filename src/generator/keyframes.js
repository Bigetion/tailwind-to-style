/**
 * Keyframe Generation
 * 
 * Generates CSS @keyframes rules from animation definitions.
 * Minifies output for production use.
 * 
 * @module generator/keyframes
 */

import { BUILTIN_KEYFRAMES, UPPERCASE_LETTER_REGEX } from "../shared/constants.js";

/**
 * Generate minified CSS keyframes for animations.
 * Converts camelCase property names to kebab-case.
 * 
 * @param {string[]} animationNames - Array of animation names to generate
 * @returns {string} Minified CSS @keyframes rules
 * 
 * @example
 * generateMinifiedKeyframes(['spin', 'pulse'])
 * // → '@keyframes spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}
 * //    @keyframes pulse{50%{opacity:.5;}}'
 * 
 * @example
 * generateMinifiedKeyframes(['fadeIn'])
 * // → '@keyframes fadeIn{0%{opacity:0;}50%{opacity:1;}100%{opacity:0;}}'
 */
export function generateMinifiedKeyframes(animationNames) {
  let css = "";
  for (const name of animationNames) {
    const keyframe = BUILTIN_KEYFRAMES[name];
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
