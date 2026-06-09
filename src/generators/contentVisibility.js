/**
 * Content Visibility & Containment Generator
 * 
 * Performance utilities using:
 * - content-visibility: auto (render only when visible)
 * - contain: layout/style/paint/size/strict/content
 * - contain-intrinsic-size (placeholder sizing)
 * - @property (CSS Houdini typed custom properties)
 * 
 * @module generators/contentVisibility
 */

import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;
  const prefix = `${globalPrefix}`;

  const responsiveCssString = generateCssString(() => {
    let cssString = "";

    // ========================================
    // CONTENT-VISIBILITY
    // ========================================
    cssString += `
      ${prefix}content-visible {
        content-visibility: visible;
      }
      ${prefix}content-auto {
        content-visibility: auto;
        contain-intrinsic-size: auto 300px;
      }
      ${prefix}content-hidden {
        content-visibility: hidden;
      }
    `;

    // ========================================
    // CONTAIN (CSS Containment)
    // ========================================
    cssString += `
      ${prefix}contain-none {
        contain: none;
      }
      ${prefix}contain-strict {
        contain: strict;
      }
      ${prefix}contain-content {
        contain: content;
      }
      ${prefix}contain-size {
        contain: size;
      }
      ${prefix}contain-layout {
        contain: layout;
      }
      ${prefix}contain-style {
        contain: style;
      }
      ${prefix}contain-paint {
        contain: paint;
      }
      ${prefix}contain-layout-paint {
        contain: layout paint;
      }
    `;

    // ========================================
    // CONTAIN-INTRINSIC-SIZE
    // ========================================
    cssString += `
      ${prefix}intrinsic-size-auto {
        contain-intrinsic-size: auto;
      }
      ${prefix}intrinsic-size-sm {
        contain-intrinsic-size: 100px;
      }
      ${prefix}intrinsic-size-md {
        contain-intrinsic-size: 300px;
      }
      ${prefix}intrinsic-size-lg {
        contain-intrinsic-size: 500px;
      }
      ${prefix}intrinsic-size-xl {
        contain-intrinsic-size: 800px;
      }
      ${prefix}intrinsic-size-auto-w {
        contain-intrinsic-width: auto;
      }
      ${prefix}intrinsic-size-auto-h {
        contain-intrinsic-height: auto;
      }
    `;

    // ========================================
    // CSS @PROPERTY (Houdini Typed Custom Properties)
    // ========================================
    // Note: @property is at-rule, not class-level.
    // We provide a helper that users can inject via twsx():
    cssString += `
      ${prefix}typed-prop-color {
        --typed-color: #000;
      }
      ${prefix}typed-prop-length {
        --typed-length: 0px;
      }
      ${prefix}typed-prop-number {
        --typed-number: 0;
      }
      ${prefix}typed-prop-percentage {
        --typed-percentage: 0%;
      }
      ${prefix}typed-prop-angle {
        --typed-angle: 0deg;
      }
      ${prefix}typed-prop-time {
        --typed-time: 0s;
      }
      ${prefix}typed-prop-transform {
        --typed-transform: translateX(0);
      }
      ${prefix}typed-prop-url {
        --typed-url: url();
      }
    `;

    // ========================================
    // WILL-CHANGE (Enhanced)
    // ========================================
    cssString += `
      ${prefix}will-change-scroll {
        will-change: scroll-position;
      }
      ${prefix}will-change-contents {
        will-change: contents;
      }
      ${prefix}will-change-transform-opacity {
        will-change: transform, opacity;
      }
    `;

    return cssString;
  }, configOptions);

  return responsiveCssString;
}
