/**
 * Modern Text Wrap Generator
 * 
 * CSS Text Module Level 4 features:
 * - text-wrap: pretty (balanced line breaking for paragraphs)
 * - text-wrap: balance (heading balance)
 * - text-wrap: stable (prevent layout shift)
 * - text-wrap: wrap / nowrap
 * - word-break: auto-phrase (CJK support)
 * - hyphenate-character
 * - text-spacing-trim
 * 
 * @module generators/textWrap
 */

import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;
  const prefix = `${globalPrefix}`;

  const responsiveCssString = generateCssString(() => {
    let cssString = "";

    // ========================================
    // TEXT-WRAP (CSS Text Module Level 4)
    // ========================================
    cssString += `
      ${prefix}text-wrap {
        text-wrap: wrap;
      }
      ${prefix}text-nowrap {
        text-wrap: nowrap;
      }
      ${prefix}text-pretty {
        text-wrap: pretty;
      }
      ${prefix}text-balance {
        text-wrap: balance;
      }
      ${prefix}text-stable {
        text-wrap: stable;
      }
      ${prefix}text-wrap-anywhere {
        text-wrap: wrap;
        overflow-wrap: anywhere;
      }
      ${prefix}text-wrap-break-word {
        text-wrap: wrap;
        overflow-wrap: break-word;
      }
    `;

    // ========================================
    // HYPHENATION
    // ========================================
    cssString += `
      ${prefix}hyphens-auto-lang {
        -webkit-hyphens: auto;
        hyphens: auto;
        hyphenate-character: auto;
      }
      ${prefix}hyphenate-auto {
        -webkit-hyphens: auto;
        hyphens: auto;
      }
      ${prefix}hyphenate-manual {
        -webkit-hyphens: manual;
        hyphens: manual;
      }
      ${prefix}hyphenate-none {
        -webkit-hyphens: none;
        hyphens: none;
      }
    `;

    // ========================================
    // WORD-BREAK MODERN
    // ========================================
    cssString += `
      ${prefix}break-phrase {
        word-break: auto-phrase;
      }
      ${prefix}break-keep-all {
        word-break: keep-all;
      }
    `;

    // ========================================
    // TEXT-SPACING-TRIM (CJK typography)
    // ========================================
    cssString += `
      ${prefix}text-spacing-trim-auto {
        text-spacing-trim: trim-start;
      }
      ${prefix}text-spacing-trim-normal {
        text-spacing-trim: normal;
      }
      ${prefix}text-spacing-trim-space-all {
        text-spacing-trim: space-all;
      }
      ${prefix}text-spacing-trim-trim-start {
        text-spacing-trim: trim-start;
      }
    `;

    // ========================================
    // INITIAL-LETTER (Drop caps)
    // ========================================
    cssString += `
      ${prefix}initial-letter-2 {
        -webkit-initial-letter: 2;
        initial-letter: 2;
      }
      ${prefix}initial-letter-3 {
        -webkit-initial-letter: 3;
        initial-letter: 3;
      }
      ${prefix}initial-letter-4 {
        -webkit-initial-letter: 4;
        initial-letter: 4;
      }
    `;

    // ========================================
    // TEXT-DECORATION-THICKNESS (from-font)
    // ========================================
    cssString += `
      ${prefix}underline-from-font {
        text-decoration-thickness: from-font;
      }
    `;

    return cssString;
  }, configOptions);

  return responsiveCssString;
}
