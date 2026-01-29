/**
 * CSS Injection Module
 * Handles runtime CSS injection into the DOM with deduplication
 */

import { getCssHash } from "./hashing.js";
import { cacheManager } from "./cache-manager.js";
import { performanceMonitor } from "./performance.js";
import { logger } from "../utils/logger.js";

/**
 * Auto-inject CSS into the DOM with deduplication
 * @param {string} cssString - CSS string to inject
 */
export function autoInjectCss(cssString) {
  const marker = performanceMonitor.start("css:inject");

  try {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const cssHash = getCssHash(cssString);
      
      if (cacheManager.injectedCssHashSet.has(cssHash)) {
        cacheManager.trackHit();
        performanceMonitor.end(marker);
        return;
      }

      cacheManager.trackMiss();
      cacheManager.injectedCssHashSet.add(cssHash);
      
      let styleTag = document.getElementById("twsx-auto-style");
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "twsx-auto-style";
        document.head.appendChild(styleTag);
      }
      styleTag.textContent += `\n${cssString}`;

      // Log injection stats periodically
      if (cacheManager.injectedCssHashSet.size % 10 === 0) {
        logger.debug(
          `CSS injection stats: ${cacheManager.injectedCssHashSet.size} unique stylesheets injected`
        );
      }
    }
    performanceMonitor.end(marker);
  } catch (error) {
    performanceMonitor.end(marker);
    logger.error("Error injecting CSS:", error);
  }
}

/**
 * Generate minified keyframes CSS
 * @param {Array<string>} animationNames - Array of animation names
 * @param {Object} builtinKeyframes - Built-in keyframes object
 * @returns {string} Minified keyframes CSS
 */
export function generateMinifiedKeyframes(animationNames, builtinKeyframes) {
  let css = "";
  const UPPERCASE_LETTER_REGEX = /([A-Z])/g;
  
  for (const name of animationNames) {
    const keyframe = builtinKeyframes[name];
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
