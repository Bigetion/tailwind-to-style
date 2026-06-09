/**
 * Modern Color Engine Generator
 * 
 * Supports CSS Color Module Level 5 features:
 * - oklch() / oklab() perceptually uniform colors
 * - color-mix() for dynamic color blending
 * - Relative color syntax (from)
 * - Modern color spaces for better gradients and theming
 * 
 * @module generators/modernColor
 */

import { generateCssString } from "../utils/index";

/**
 * Convert hex to OKLCH approximate (simplified conversion)
 * In production, you'd use a proper color conversion library
 */
function hexToOklch(hex) {
  // Simplified: return a reasonable oklch approximation
  // For real conversion, use colorjs.io or culori
  // This is a placeholder that generates valid oklch()
  const map = {
    "#ef4444": "oklch(63% 0.24 25)",
    "#f97316": "oklch(70% 0.19 50)",
    "#eab308": "oklch(77% 0.17 90)",
    "#22c55e": "oklch(72% 0.22 145)",
    "#06b6d4": "oklch(75% 0.15 210)",
    "#3b82f6": "oklch(65% 0.22 260)",
    "#8b5cf6": "oklch(65% 0.22 300)",
    "#d946ef": "oklch(65% 0.24 330)",
    "#f43f5e": "oklch(65% 0.23 15)",
    "#000000": "oklch(0% 0 0)",
    "#ffffff": "oklch(100% 0 0)",
  };
  return map[hex.toLowerCase()] || `oklch(60% 0.2 250)`;
}

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;
  const prefix = `${globalPrefix}`;

  const responsiveCssString = generateCssString(({ getCssByColors }) => {
    let cssString = "";

    // ========================================
    // OKLCH Background Colors
    // ========================================
    const oklchBgColors = getCssByColors(
      configOptions.theme?.colors || {},
      (key, value, rgb) => {
        if (key === "current" || key === "transparent") return "";
        const oklch = hexToOklch(value);
        return `
          ${prefix}bg-oklch-${key} {
            background-color: ${oklch};
          }
        `;
      }
    );
    cssString += oklchBgColors;

    // ========================================
    // OKLCH Text Colors
    // ========================================
    const oklchTextColors = getCssByColors(
      configOptions.theme?.colors || {},
      (key, value, rgb) => {
        if (key === "current" || key === "transparent") return "";
        const oklch = hexToOklch(value);
        return `
          ${prefix}text-oklch-${key} {
            color: ${oklch};
          }
        `;
      }
    );
    cssString += oklchTextColors;

    // ========================================
    // OKLCH Border Colors
    // ========================================
    const oklchBorderColors = getCssByColors(
      configOptions.theme?.colors || {},
      (key, value, rgb) => {
        if (key === "current" || key === "transparent") return "";
        const oklch = hexToOklch(value);
        return `
          ${prefix}border-oklch-${key} {
            border-color: ${oklch};
          }
        `;
      }
    );
    cssString += oklchBorderColors;

    // ========================================
    // COLOR-MIX Utilities
    // color-mix(in oklch, color1 50%, color2 50%)
    // Usage: tws('bg-mix-blue-red-50')
    // ========================================
    const colors = configOptions.theme?.colors || {};
    const colorNames = Object.keys(colors).filter(
      (k) => k !== "current" && k !== "transparent" && k !== "custom"
    );

    // Generate mix utilities for common combinations
    const mixPercentages = ["25", "50", "75"];
    const mixSpaces = ["oklch", "srgb", "hsl", "lab"];

    mixSpaces.forEach((space) => {
      mixPercentages.forEach((pct) => {
        cssString += `
          ${prefix}bg-mix-${space}-${pct} {
            --mix-color-1: custom_value;
            --mix-color-2: custom_value;
            background-color: color-mix(in ${space}, var(--mix-color-1) ${pct}%, var(--mix-color-2));
          }
          ${prefix}text-mix-${space}-${pct} {
            --mix-color-1: custom_value;
            --mix-color-2: custom_value;
            color: color-mix(in ${space}, var(--mix-color-1) ${pct}%, var(--mix-color-2));
          }
          ${prefix}border-mix-${space}-${pct} {
            --mix-color-1: custom_value;
            --mix-color-2: custom_value;
            border-color: color-mix(in ${space}, var(--mix-color-1) ${pct}%, var(--mix-color-2));
          }
        `;
      });
    });

    // ========================================
    // RELATIVE COLOR SYNTAX (from)
    // Usage: bg-relative-blue-20% → lighter version of blue
    // ========================================
    cssString += `
      ${prefix}bg-relative-lighten {
        --rel-base: custom_value;
        background-color: oklch(from var(--rel-base) calc(l + 0.2) c h);
      }
      ${prefix}bg-relative-darken {
        --rel-base: custom_value;
        background-color: oklch(from var(--rel-base) calc(l - 0.2) c h);
      }
      ${prefix}bg-relative-saturate {
        --rel-base: custom_value;
        background-color: oklch(from var(--rel-base) l calc(c + 0.1) h);
      }
      ${prefix}bg-relative-desaturate {
        --rel-base: custom_value;
        background-color: oklch(from var(--rel-base) l calc(c - 0.1) h);
      }
      ${prefix}bg-relative-rotate-30 {
        --rel-base: custom_value;
        background-color: oklch(from var(--rel-base) l c calc(h + 30));
      }
      ${prefix}bg-relative-rotate-60 {
        --rel-base: custom_value;
        background-color: oklch(from var(--rel-base) l c calc(h + 60));
      }
      ${prefix}bg-relative-rotate-90 {
        --rel-base: custom_value;
        background-color: oklch(from var(--rel-base) l c calc(h + 90));
      }
      ${prefix}bg-relative-rotate-180 {
        --rel-base: custom_value;
        background-color: oklch(from var(--rel-base) l c calc(h + 180));
      }
    `;

    // ========================================
    // CONTRAST COLOR (auto-generated accessible text color)
    // Uses color-contrast() or approximates with oklch lightness
    // ========================================
    cssString += `
      ${prefix}contrast-auto {
        --contrast-bg: custom_value;
        background-color: var(--contrast-bg);
        color: oklch(from var(--contrast-bg) clamp(0%, calc((var(--l-threshold, 0.62) - l) * 1000000), 100%) c h);
      }
      ${prefix}contrast-black {
        --contrast-bg: custom_value;
        background-color: var(--contrast-bg);
        color: #000;
      }
      ${prefix}contrast-white {
        --contrast-bg: custom_value;
        background-color: var(--contrast-bg);
        color: #fff;
      }
    `;

    // ========================================
    // P3 WIDE GAMUT COLORS
    // ========================================
    cssString += `
      ${prefix}bg-p3-red {
        background-color: color(display-p3 1 0 0);
      }
      ${prefix}bg-p3-green {
        background-color: color(display-p3 0 1 0);
      }
      ${prefix}bg-p3-blue {
        background-color: color(display-p3 0 0 1);
      }
      ${prefix}text-p3-red {
        color: color(display-p3 1 0 0);
      }
      ${prefix}text-p3-green {
        color: color(display-p3 0 1 0);
      }
      ${prefix}text-p3-blue {
        color: color(display-p3 0 0 1);
      }
    `;

    return cssString;
  }, configOptions);

  return responsiveCssString;
}
