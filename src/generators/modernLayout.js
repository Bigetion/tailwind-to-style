/**
 * Modern Layout Generator
 * 
 * Next-gen CSS layout features:
 * - CSS Subgrid (grid level 2)
 * - Masonry layout (grid-template-rows: masonry)
 * - Container query units (cqi, cqb, cqw, cqh, cqmin, cqmax)
 * - Viewport unit variants (svw, lvw, dvw, svh, lvh, dvh)
 * - Intrinsic sizing (stretch, fit-content)
 * - Aspect-ratio with auto
 * 
 * @module generators/modernLayout
 */

import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;
  const prefix = `${globalPrefix}`;

  const responsiveCssString = generateCssString(() => {
    let cssString = "";

    // ========================================
    // CSS SUBGRID
    // ========================================
    cssString += `
      ${prefix}grid-cols-subgrid {
        grid-template-columns: subgrid;
      }
      ${prefix}grid-rows-subgrid {
        grid-template-rows: subgrid;
      }
      ${prefix}col-subgrid {
        grid-column: 1 / -1;
        grid-template-columns: subgrid;
      }
      ${prefix}row-subgrid {
        grid-row: 1 / -1;
        grid-template-rows: subgrid;
      }
    `;

    // ========================================
    // MASONRY LAYOUT (experimental)
    // ========================================
    cssString += `
      ${prefix}grid-rows-masonry {
        grid-template-rows: masonry;
      }
      ${prefix}grid-cols-masonry {
        grid-template-columns: masonry;
      }
      ${prefix}masonry-flow-next {
        masonry-auto-flow: next;
      }
      ${prefix}masonry-flow-prev {
        masonry-auto-flow: prev;
      }
      ${prefix}masonry-flow-ordered {
        masonry-auto-flow: ordered;
      }
    `;

    // ========================================
    // CONTAINER QUERY UNITS
    // ========================================
    const cqiSizes = ["1", "2", "3", "4", "5", "6", "8", "10", "12", "16", "20", "24", "32", "40", "48", "56", "64"];
    cqiSizes.forEach((size) => {
      const val = parseInt(size, 10);
      cssString += `
        ${prefix}cqi-${size} {
          width: ${val}cqi;
        }
        ${prefix}cqb-${size} {
          height: ${val}cqb;
        }
        ${prefix}cqw-${size} {
          width: ${val}cqw;
        }
        ${prefix}cqh-${size} {
          height: ${val}cqh;
        }
        ${prefix}cqmin-${size} {
          width: ${val}cqmin;
        }
        ${prefix}cqmax-${size} {
          width: ${val}cqmax;
        }
      `;
    });

    // ========================================
    // FULL CONTAINER UNITS
    // ========================================
    cssString += `
      ${prefix}w-cqw-full { width: 100cqw; }
      ${prefix}h-cqh-full { height: 100cqh; }
      ${prefix}w-cqi-full { width: 100cqi; }
      ${prefix}h-cqb-full { height: 100cqb; }
      ${prefix}w-cqmin-full { width: 100cqmin; }
      ${prefix}h-cqmax-full { height: 100cqmax; }
    `;

    // ========================================
    // STRETCH (modern intrinsic sizing)
    // ========================================
    cssString += `
      ${prefix}w-stretch {
        width: stretch;
        width: -webkit-fill-available;
        width: -moz-available;
      }
      ${prefix}h-stretch {
        height: stretch;
        height: -webkit-fill-available;
        height: -moz-available;
      }
      ${prefix}min-w-stretch {
        min-width: stretch;
        min-width: -webkit-fill-available;
        min-width: -moz-available;
      }
      ${prefix}min-h-stretch {
        min-height: stretch;
        min-height: -webkit-fill-available;
        min-height: -moz-available;
      }
    `;

    // ========================================
    // ASPECT-RATIO WITH AUTO
    // ========================================
    cssString += `
      ${prefix}aspect-auto {
        aspect-ratio: auto;
      }
      ${prefix}aspect-inherit {
        aspect-ratio: inherit;
      }
    `;

    // ========================================
    // DISPLAY CONTENTS (semantic layout)
    // ========================================
    cssString += `
      ${prefix}display-contents {
        display: contents;
      }
    `;

    // ========================================
    // FIELDSET & LEGEND RESET
    // ========================================
    cssString += `
      ${prefix}fieldset-reset {
        border: 0;
        padding: 0;
        margin: 0;
        min-width: 0;
      }
    `;

    // ========================================
    // CONTAINER-TYPE (for container queries)
    // ========================================
    cssString += `
      ${prefix}container-type-size {
        container-type: size;
      }
      ${prefix}container-type-inline {
        container-type: inline-size;
      }
      ${prefix}container-type-normal {
        container-type: normal;
      }
      ${prefix}container-name-default {
        container-name: default;
      }
      ${prefix}container-card {
        container-type: inline-size;
        container-name: card;
      }
      ${prefix}container-layout {
        container-type: size;
        container-name: layout;
      }
    `;

    // ========================================
    // ISOLATION
    // ========================================
    cssString += `
      ${prefix}isolate-auto {
        isolation: auto;
      }
    `;

    // ========================================
    // OVERSCROLL BEHAVIOR (extended)
    // ========================================
    cssString += `
      ${prefix}overscroll-behavior-x-auto {
        overscroll-behavior-x: auto;
      }
      ${prefix}overscroll-behavior-x-contain {
        overscroll-behavior-x: contain;
      }
      ${prefix}overscroll-behavior-x-none {
        overscroll-behavior-x: none;
      }
      ${prefix}overscroll-behavior-y-auto {
        overscroll-behavior-y: auto;
      }
      ${prefix}overscroll-behavior-y-contain {
        overscroll-behavior-y: contain;
      }
      ${prefix}overscroll-behavior-y-none {
        overscroll-behavior-y: none;
      }
    `;

    return cssString;
  }, configOptions);

  return responsiveCssString;
}
