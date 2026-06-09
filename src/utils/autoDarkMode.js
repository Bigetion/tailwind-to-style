/**
 * Auto Dark Mode Engine
 * 
 * Automatically generates dark mode variants from light mode styles.
 * Uses intelligent color inversion and contrast preservation.
 * 
 * Supports multiple strategies:
 * - 'invert': Inverts background/text colors
 * - 'dim': Dims colors by reducing lightness
 * - 'shift': Shifts colors to dark palette equivalents
 * - 'oklch': Uses OKLCH for perceptually uniform darkening
 * 
 * @module utils/autoDarkMode
 */

import { logger } from "./logger.js";

/**
 * Dark color mappings — maps light palette colors to dark equivalents
 */
const DARK_COLOR_MAP = {
  // Backgrounds (light → dark)
  "#ffffff": "#0f172a",
  "#f8fafc": "#0f172a",
  "#f1f5f9": "#1e293b",
  "#e2e8f0": "#334155",
  "#cbd5e1": "#475569",
  "#94a3b8": "#64748b",
  "#64748b": "#94a3b8",
  "#475569": "#cbd5e1",
  "#334155": "#e2e8f0",
  "#1e293b": "#f1f5f9",
  "#0f172a": "#f8fafc",
  "#020617": "#ffffff",

  // Grays
  "#f9fafb": "#111827",
  "#f3f4f6": "#1f2937",
  "#e5e7eb": "#374151",
  "#d1d5db": "#4b5563",
  "#9ca3af": "#6b7280",
  "#6b7280": "#9ca3af",
  "#4b5563": "#d1d5db",
  "#374151": "#e5e7eb",
  "#1f2937": "#f3f4f6",
  "#111827": "#f9fafb",
  "#030712": "#ffffff",

  // Semantic colors (light bg → dark bg, light text → dark text)
  "rgb(255, 255, 255)": "rgb(15, 23, 42)",
  "rgb(248, 250, 252)": "rgb(15, 23, 42)",
  "rgb(241, 245, 249)": "rgb(30, 41, 59)",
  "rgb(0, 0, 0)": "rgb(255, 255, 255)",

  // Border colors
  "#e5e7eb": "#374151",
};

/**
 * CSS properties that typically represent backgrounds in light mode
 */
const BACKGROUND_PROPS = [
  "background-color",
  "background",
  "background-image",
];

/**
 * CSS properties that typically represent text/foreground in light mode
 */
const FOREGROUND_PROPS = [
  "color",
  "border-color",
  "text-decoration-color",
  "outline-color",
  "caret-color",
  "fill",
  "stroke",
];

/**
 * CSS properties that should be dimmed rather than inverted
 */
const DIM_PROPS = [
  "box-shadow",
  "border-color",
];

/**
 * Check if a value is a light color (rough heuristic)
 */
function isLightColor(value) {
  if (!value || typeof value !== "string") return false;

  // Hex
  const hexMatch = value.match(/#([0-9a-fA-F]{3,6})/);
  if (hexMatch) {
    const hex = hexMatch[1];
    const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.substring(0, 2), 16);
    const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.substring(2, 4), 16);
    const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.substring(4, 6), 16);
    // Perceived lightness formula
    const lightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return lightness > 0.6;
  }

  // rgb/rgba
  const rgbMatch = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    const lightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return lightness > 0.6;
  }

  // Named colors that are light
  const lightNamedColors = ["white", "transparent", "#fff", "#ffffff"];
  if (lightNamedColors.includes(value.toLowerCase().trim())) return true;

  return false;
}

/**
 * Map a color to its dark equivalent
 */
function mapToDarkColor(value, prop) {
  if (!value || typeof value !== "string") return value;

  const trimmed = value.trim();

  // Direct mapping
  if (DARK_COLOR_MAP[trimmed.toLowerCase()]) {
    return DARK_COLOR_MAP[trimmed.toLowerCase()];
  }

  // If it's a light color and it's a background property, try to darken
  if (BACKGROUND_PROPS.includes(prop) && isLightColor(trimmed)) {
    // Try to find closest mapping
    for (const [light, dark] of Object.entries(DARK_COLOR_MAP)) {
      if (trimmed.toLowerCase().includes(light.toLowerCase())) {
        return trimmed.replace(new RegExp(light, "gi"), dark);
      }
    }
  }

  // For foreground props on light colors, keep them or adjust contrast
  if (FOREGROUND_PROPS.includes(prop)) {
    // Dark text on light bg → light text on dark bg
    if (trimmed === "#000000" || trimmed === "rgb(0, 0, 0)" || trimmed === "black") {
      return "#f8fafc";
    }
    if (trimmed === "#111827" || trimmed === "#1f2937") {
      return "#f9fafb";
    }
    if (trimmed === "#374151" || trimmed === "#4b5563") {
      return "#e5e7eb";
    }
    if (trimmed === "#6b7280") {
      return "#9ca3af";
    }
  }

  // Box-shadow: reduce opacity
  if (prop === "box-shadow") {
    return trimmed.replace(/(\d?\.?\d+)\)/g, (match, opacity) => {
      const newOpacity = Math.min(1, parseFloat(opacity || "1") * 0.5);
      return `${newOpacity})`;
    });
  }

  return trimmed;
}

/**
 * Convert a CSS declaration string to dark mode
 * @param {string} cssString - CSS declaration string (e.g., "background-color: #fff; color: #000;")
 * @param {Object} options - Options
 * @param {string} options.strategy - 'invert', 'dim', 'shift', 'oklch'
 * @returns {string} Dark mode CSS string
 */
export function toDarkMode(cssString, options = {}) {
  const { strategy = "invert" } = options;

  if (!cssString || typeof cssString !== "string") return cssString;

  try {
    const declarations = cssString.split(/;\s*/).filter(Boolean);
    const darkDeclarations = [];

    for (const decl of declarations) {
      const colonIndex = decl.indexOf(":");
      if (colonIndex === -1) continue;

      const prop = decl.substring(0, colonIndex).trim();
      const value = decl.substring(colonIndex + 1).trim();

      let darkValue = value;

      if (strategy === "invert") {
        darkValue = mapToDarkColor(value, prop);
      } else if (strategy === "dim") {
        // Simple dimming strategy
        if (isLightColor(value)) {
          darkValue = mapToDarkColor(value, prop);
        }
      } else if (strategy === "oklch") {
        // Use oklch relative color syntax to darken
        if (prop.includes("color") || prop === "background" || prop === "background-color") {
          if (value.startsWith("#") || value.startsWith("rgb")) {
            darkValue = `oklch(from ${value} calc(l - 0.5) c h)`;
          }
        }
      }

      darkDeclarations.push(`${prop}: ${darkValue}`);
    }

    return darkDeclarations.join("; ") + (darkDeclarations.length > 0 ? ";" : "");
  } catch (error) {
    logger.warn("Auto dark mode conversion failed:", error.message);
    return cssString;
  }
}

/**
 * Generate dark variant classes from light classes
 * @param {string} lightClasses - Space-separated Tailwind classes
 * @param {Function} twsFn - tws() function reference
 * @param {Object} options - Options
 * @returns {string} Dark mode CSS string
 */
export function generateDarkVariant(lightClasses, twsFn, options = {}) {
  if (!lightClasses || !twsFn) return "";

  const lightCss = twsFn(lightClasses);
  if (!lightCss) return "";

  return toDarkMode(lightCss, options);
}

/**
 * Create auto-dark config for twsxClassName
 * @param {Object} lightConfig - Original light mode config
 * @param {Object} options - Dark mode options
 * @returns {Object} Config with auto-generated dark variants
 */
export function createAutoDarkConfig(lightConfig, options = {}) {
  const { strategy = "invert", include = [], exclude = [] } = options;

  const darkConfig = { ...lightConfig };

  // Auto-generate dark variants for base styles
  if (lightConfig.base && !darkConfig.variants?.dark) {
    darkConfig.variants = darkConfig.variants || {};
    darkConfig.variants.dark = {
      true: `auto-dark:${strategy}`,
      false: "",
    };
  }

  return darkConfig;
}

/**
 * CSS @property definitions for typed custom properties
 * Useful for animating custom properties with Houdini
 * @returns {string} @property CSS rules
 */
export function generateTypedPropertyDefinitions() {
  return `
@property --typed-color {
  syntax: '<color>';
  initial-value: #000;
  inherits: false;
}
@property --typed-length {
  syntax: '<length>';
  initial-value: 0px;
  inherits: false;
}
@property --typed-number {
  syntax: '<number>';
  initial-value: 0;
  inherits: false;
}
@property --typed-percentage {
  syntax: '<percentage>';
  initial-value: 0%;
  inherits: false;
}
@property --typed-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
@property --typed-time {
  syntax: '<time>';
  initial-value: 0s;
  inherits: false;
}
@property --typed-transform {
  syntax: '<transform-list>';
  initial-value: translateX(0);
  inherits: false;
}
  `.trim();
}
