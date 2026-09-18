/**
 * Opacity Modifier Processing
 * 
 * Handles Tailwind opacity modifiers (e.g., bg-blue-500/50).
 * Converts color values to rgba/hsla with specified opacity.
 * 
 * @module generator/opacity
 */

import {
  OPACITY_MODIFIER_REGEX,
  OPACITY_PROP_REGEXES,
  COLOR_PROPERTIES,
} from "../shared/constants.js";

// Pre-compile regex patterns for each color property
const COLOR_REGEX_PATTERNS = new Map();

for (const prop of COLOR_PROPERTIES) {
  const escapedProp = prop.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  COLOR_REGEX_PATTERNS.set(prop, {
    rgb: new RegExp(
      `(${escapedProp}\\s*:\\s*)rgb\\((\\d+),\\s*(\\d+),\\s*(\\d+)\\)`,
      "gi"
    ),
    rgba: new RegExp(
      `(${escapedProp}\\s*:\\s*)rgba\\((\\d+),\\s*(\\d+),\\s*(\\d+),\\s*[\\d.]+\\)`,
      "gi"
    ),
    hsl: new RegExp(
      `(${escapedProp}\\s*:\\s*)hsl\\((\\d+),\\s*([\\d.]+%),\\s*([\\d.]+%)\\)`,
      "gi"
    ),
    hsla: new RegExp(
      `(${escapedProp}\\s*:\\s*)hsla\\((\\d+),\\s*([\\d.]+%),\\s*([\\d.]+%),\\s*[\\d.]+\\)`,
      "gi"
    ),
    hex: new RegExp(`(${escapedProp}\\s*:\\s*)(#[0-9a-fA-F]{3,6})`, "gi"),
  });
}

/**
 * Process opacity modifiers in Tailwind classes.
 * 
 * Handles:
 * - Tailwind CSS custom properties (--text-opacity, --bg-opacity, etc.)
 * - Direct color values (rgb, rgba, hsl, hsla, hex)
 * - Converts colors to rgba/hsla with specified opacity
 * 
 * @param {string} className - Tailwind class name (e.g., 'bg-blue-500/50')
 * @param {string} cssDeclaration - CSS declaration to modify
 * @returns {string} Modified CSS declaration with opacity applied
 * 
 * @example
 * processOpacityModifier('bg-blue-500/50', 'background-color: rgb(59, 130, 246);')
 * // → 'background-color: rgba(59, 130, 246, 0.5);'
 * 
 * @example
 * processOpacityModifier('text-red-600/75', 'color: #dc2626;')
 * // → 'color: rgba(220, 38, 38, 0.75);'
 * 
 * @example
 * processOpacityModifier('bg-blue-500', 'background-color: rgb(59, 130, 246);')
 * // → 'background-color: rgb(59, 130, 246);' (no change - no opacity modifier)
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
