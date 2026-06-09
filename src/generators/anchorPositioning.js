/**
 * CSS Anchor Positioning Generator
 * 
 * Native popover/dropdown/tooltip positioning without JavaScript.
 * Requires Chrome 125+ / Firefox behind flag.
 * 
 * @module generators/anchorPositioning
 */

import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;
  const prefix = `${globalPrefix}`;

  const responsiveCssString = generateCssString(() => {
    let cssString = "";

    // ========================================
    // ANCHOR-NAME
    // ========================================
    cssString += `
      ${prefix}anchor {
        anchor-name: --anchor;
      }
      ${prefix}anchor-1 {
        anchor-name: --anchor-1;
      }
      ${prefix}anchor-2 {
        anchor-name: --anchor-2;
      }
      ${prefix}anchor-3 {
        anchor-name: --anchor-3;
      }
      ${prefix}anchor-target {
        anchor-name: --anchor-target;
      }
    `;

    // ========================================
    // POSITION-ANCHOR (for positioned element)
    // ========================================
    cssString += `
      ${prefix}positioned {
        position: absolute;
        position-anchor: --anchor;
      }
      ${prefix}positioned-1 {
        position: absolute;
        position-anchor: --anchor-1;
      }
      ${prefix}positioned-2 {
        position: absolute;
        position-anchor: --anchor-2;
      }
      ${prefix}positioned-3 {
        position: absolute;
        position-anchor: --anchor-3;
      }
    `;

    // ========================================
    // INSET-AREA (position relative to anchor)
    // ========================================
    const insetAreas = [
      "top", "bottom", "left", "right",
      "start", "end", "center",
      "top-left", "top-right", "top-start", "top-end", "top-center",
      "bottom-left", "bottom-right", "bottom-start", "bottom-end", "bottom-center",
      "left-start", "left-end", "left-center",
      "right-start", "right-end", "right-center",
      "center-start", "center-end", "center-center",
      "all",
    ];

    insetAreas.forEach((area) => {
      const areaClass = area.replace(/-/g, "-");
      cssString += `
        ${prefix}inset-area-${areaClass} {
          inset-area: ${area};
        }
      `;
    });

    // ========================================
    // ANCHOR() FUNCTION POSITIONS
    // ========================================
    cssString += `
      ${prefix}anchor-top {
        bottom: anchor(top);
        left: anchor(center);
        translate: -50% 0;
      }
      ${prefix}anchor-bottom {
        top: anchor(bottom);
        left: anchor(center);
        translate: -50% 0;
      }
      ${prefix}anchor-left {
        right: anchor(left);
        top: anchor(center);
        translate: 0 -50%;
      }
      ${prefix}anchor-right {
        left: anchor(right);
        top: anchor(center);
        translate: 0 -50%;
      }
      ${prefix}anchor-top-start {
        bottom: anchor(top);
        left: anchor(start);
      }
      ${prefix}anchor-top-end {
        bottom: anchor(top);
        right: anchor(end);
      }
      ${prefix}anchor-bottom-start {
        top: anchor(bottom);
        left: anchor(start);
      }
      ${prefix}anchor-bottom-end {
        top: anchor(bottom);
        right: anchor(end);
      }
    `;

    // ========================================
    // ANCHOR-SIZE
    // ========================================
    cssString += `
      ${prefix}anchor-size-width {
        width: anchor-size(width);
      }
      ${prefix}anchor-size-height {
        height: anchor-size(height);
      }
      ${prefix}anchor-size-inline {
        inline-size: anchor-size(inline);
      }
      ${prefix}anchor-size-block {
        block-size: anchor-size(block);
      }
      ${prefix}anchor-size-self {
        width: anchor-size(self-inline);
        height: anchor-size(self-block);
      }
    `;

    // ========================================
    // POSITION-TRY (fallback positions)
    // ========================================
    cssString += `
      ${prefix}position-try-auto {
        position-try-fallbacks: --flip-block, --flip-inline;
      }
      ${prefix}position-try-most-width {
        position-try-fallbacks: --most-width;
        position-try-order: most-width;
      }
    `;

    // ========================================
    // @POSITION-TRY rules (as utility references)
    // ========================================
    // These need to be defined via twsx() @position-try,
    // but we provide class references:
    cssString += `
      ${prefix}position-try-flip-block {
        --position-try: flip-block;
      }
      ${prefix}position-try-flip-inline {
        --position-try: flip-inline;
      }
      ${prefix}position-try-flip-start {
        --position-try: flip-start;
      }
    `;

    // ========================================
    // POPOVER API SUPPORT
    // ========================================
    cssString += `
      ${prefix}popover-auto {
        popover: auto;
      }
      ${prefix}popover-manual {
        popover: manual;
      }
      ${prefix}popover-none {
        popover: none;
      }
      ${prefix}popover-target-action-toggle {
        popovertargetaction: toggle;
      }
      ${prefix}popover-target-action-show {
        popovertargetaction: show;
      }
      ${prefix}popover-target-action-hide {
        popovertargetaction: hide;
      }
      ${prefix}overlay-auto {
        overlay: auto;
      }
    `;

    return cssString;
  }, configOptions);

  return responsiveCssString;
}
