/**
 * Logical Properties Generator (i18n-First Layout)
 * 
 * Full logical properties support for margin, padding, border, 
 * position, sizing, and overflow. Enables writing-mode agnostic layouts.
 * 
 * @module generators/logicalProperties
 */

import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;
  const prefix = `${globalPrefix}`;

  const { spacing = {} } = theme;

  // Build logical spacing scale from theme spacing
  const logicalSpacing = { auto: "auto", ...spacing };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    let cssString = "";

    // ========================================
    // MARGIN (margin-block, margin-inline)
    // ========================================
    const marginLogical = getCssByOptions(logicalSpacing, (key, value) => {
      const k = key.replace("/", "\\/").replace(".", "\\.");
      return `
        ${prefix}mbs-${k} { margin-block-start: ${value}; }
        ${prefix}mbe-${k} { margin-block-end: ${value}; }
        ${prefix}mis-${k} { margin-inline-start: ${value}; }
        ${prefix}mie-${k} { margin-inline-end: ${value}; }
        ${prefix}mx-logical-${k} { margin-inline: ${value}; }
        ${prefix}my-logical-${k} { margin-block: ${value}; }
        ${prefix}m-logical-${k} { margin: ${value}; }
      `;
    });
    cssString += marginLogical;

    // ========================================
    // PADDING (padding-block, padding-inline)
    // ========================================
    const paddingLogical = getCssByOptions(logicalSpacing, (key, value) => {
      const k = key.replace("/", "\\/").replace(".", "\\.");
      return `
        ${prefix}pbs-${k} { padding-block-start: ${value}; }
        ${prefix}pbe-${k} { padding-block-end: ${value}; }
        ${prefix}pis-${k} { padding-inline-start: ${value}; }
        ${prefix}pie-${k} { padding-inline-end: ${value}; }
        ${prefix}px-logical-${k} { padding-inline: ${value}; }
        ${prefix}py-logical-${k} { padding-block: ${value}; }
        ${prefix}p-logical-${k} { padding: ${value}; }
      `;
    });
    cssString += paddingLogical;

    // ========================================
    // BORDER WIDTH (logical)
    // ========================================
    const borderWidths = {
      0: "0px",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px",
      DEFAULT: "1px",
    };
    Object.entries(borderWidths).forEach(([key, value]) => {
      const k = key === "DEFAULT" ? "" : `-${key}`;
      cssString += `
        ${prefix}bsw${k} { border-block-start-width: ${value}; }
        ${prefix}bbw${k} { border-block-end-width: ${value}; }
        ${prefix}isw${k} { border-inline-start-width: ${value}; }
        ${prefix}iew${k} { border-inline-end-width: ${value}; }
        ${prefix}bxw${k} { border-inline-width: ${value}; }
        ${prefix}byw${k} { border-block-width: ${value}; }
      `;
    });

    // ========================================
    // BORDER STYLE (logical)
    // ========================================
    const borderStyles = ["solid", "dashed", "dotted", "double", "hidden", "none"];
    borderStyles.forEach((style) => {
      cssString += `
        ${prefix}bss-${style} { border-block-start-style: ${style}; }
        ${prefix}bes-${style} { border-block-end-style: ${style}; }
        ${prefix}iss-${style} { border-inline-start-style: ${style}; }
        ${prefix}ies-${style} { border-inline-end-style: ${style}; }
      `;
    });

    // ========================================
    // BORDER RADIUS (logical)
    // ========================================
    const borderRadii = {
      none: "0px",
      xs: "0.125rem",
      sm: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      full: "9999px",
    };
    Object.entries(borderRadii).forEach(([key, value]) => {
      cssString += `
        ${prefix}rounded-bs-${key} { border-start-start-radius: ${value}; border-start-end-radius: ${value}; }
        ${prefix}rounded-be-${key} { border-end-start-radius: ${value}; border-end-end-radius: ${value}; }
        ${prefix}rounded-is-${key} { border-start-start-radius: ${value}; border-end-start-radius: ${value}; }
        ${prefix}rounded-ie-${key} { border-start-end-radius: ${value}; border-end-end-radius: ${value}; }
        ${prefix}rounded-ss-${key} { border-start-start-radius: ${value}; }
        ${prefix}rounded-se-${key} { border-start-end-radius: ${value}; }
        ${prefix}rounded-es-${key} { border-end-start-radius: ${value}; }
        ${prefix}rounded-ee-${key} { border-end-end-radius: ${value}; }
      `;
    });

    // ========================================
    // INSET (logical positioning)
    // ========================================
    const insetLogical = getCssByOptions(logicalSpacing, (key, value) => {
      const k = key.replace("/", "\\/").replace(".", "\\.");
      return `
        ${prefix}inset-bs-${k} { inset-block-start: ${value}; }
        ${prefix}inset-be-${k} { inset-block-end: ${value}; }
        ${prefix}inset-is-${k} { inset-inline-start: ${value}; }
        ${prefix}inset-ie-${k} { inset-inline-end: ${value}; }
        ${prefix}inset-b-${k} { inset-block: ${value}; }
        ${prefix}inset-i-${k} { inset-inline: ${value}; }
      `;
    });
    cssString += insetLogical;

    // ========================================
    // SIZE (block-size, inline-size)
    // ========================================
    const sizeLogical = getCssByOptions(
      { ...logicalSpacing, full: "100%", screen: "100vb", min: "min-content", max: "max-content", fit: "fit-content" },
      (key, value) => {
        const k = key.replace("/", "\\/").replace(".", "\\.");
        return `
          ${prefix}bs-${k} { block-size: ${value}; }
          ${prefix}is-${k} { inline-size: ${value}; }
          ${prefix}min-bs-${k} { min-block-size: ${value}; }
          ${prefix}min-is-${k} { min-inline-size: ${value}; }
          ${prefix}max-bs-${k} { max-block-size: ${value}; }
          ${prefix}max-is-${k} { max-inline-size: ${value}; }
        `;
      }
    );
    cssString += sizeLogical;

    // ========================================
    // OVERFLOW (block/inline)
    // ========================================
    const overflowValues = ["auto", "hidden", "clip", "visible", "scroll"];
    overflowValues.forEach((val) => {
      cssString += `
        ${prefix}overflow-b-${val} { overflow-block: ${val}; }
        ${prefix}overflow-i-${val} { overflow-inline: ${val}; }
      `;
    });

    // ========================================
    // SCROLL MARGIN / PADDING (logical)
    // ========================================
    const scrollSpacing = getCssByOptions(logicalSpacing, (key, value) => {
      const k = key.replace("/", "\\/").replace(".", "\\.");
      return `
        ${prefix}scroll-mbs-${k} { scroll-margin-block-start: ${value}; }
        ${prefix}scroll-mbe-${k} { scroll-margin-block-end: ${value}; }
        ${prefix}scroll-mis-${k} { scroll-margin-inline-start: ${value}; }
        ${prefix}scroll-mie-${k} { scroll-margin-inline-end: ${value}; }
        ${prefix}scroll-pbs-${k} { scroll-padding-block-start: ${value}; }
        ${prefix}scroll-pbe-${k} { scroll-padding-block-end: ${value}; }
        ${prefix}scroll-pis-${k} { scroll-padding-inline-start: ${value}; }
        ${prefix}scroll-pie-${k} { scroll-padding-inline-end: ${value}; }
      `;
    });
    cssString += scrollSpacing;

    // ========================================
    // TEXT ALIGN (logical)
    // ========================================
    const textAlignLogical = ["start", "end", "justify", "center"];
    textAlignLogical.forEach((val) => {
      cssString += `
        ${prefix}text-align-${val} { text-align: ${val}; }
      `;
    });

    // ========================================
    // RESIZE (logical)
    // ========================================
    cssString += `
      ${prefix}resize-b { resize: block; }
      ${prefix}resize-i { resize: inline; }
    `;

    return cssString;
  }, configOptions);

  return responsiveCssString;
}
