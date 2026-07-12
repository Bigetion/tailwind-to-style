/**
 * Progressive Compiler for TWS
 * 
 * Handles large class lists by compiling in chunks using requestIdleCallback
 * to avoid blocking the main thread on cold start.
 * 
 * @module core/progressiveCompiler
 */

import { processOpacityModifier } from "../css/parser.js";
import { resolveCssToClearCss, separateAndResolveCSS, inlineStyleToJson } from "../css/resolver.js";
import {
  OPACITY_MODIFIER_REGEX,
  CUSTOM_VALUE_BRACKET_REGEX,
  FRACTION_DENOMINATORS,
  FRACTION_PREFIXES,
} from "./constants.js";

/**
 * Process a single class name and return CSS
 * @private
 */
function processClassName(className, cssObject) {
  const opacityMatch = OPACITY_MODIFIER_REGEX.exec(className);
  let baseClassName = className;
  let hasOpacityModifier = false;

  if (opacityMatch) {
    const opacityValue = parseInt(opacityMatch[1], 10);
    if (opacityValue >= 0 && opacityValue <= 100) {
      const couldBeFraction =
        FRACTION_DENOMINATORS.includes(opacityValue) &&
        FRACTION_PREFIXES.some(
          (prefix) =>
            className.startsWith(prefix) ||
            className.startsWith(`-${prefix}`)
        );
      if (!couldBeFraction) {
        baseClassName = className.replace(/\/\d+$/, "");
        hasOpacityModifier = true;
      }
    }
  }

  let result =
    cssObject[baseClassName] ||
    cssObject[baseClassName.replace(/\//g, "\\/")] ||
    cssObject[baseClassName.replace(/\./g, "\\.")];

  if (result) {
    if (
      hasOpacityModifier &&
      className.includes("/") &&
      /\/\d+$/.test(className)
    ) {
      result = processOpacityModifier(className, result);
    }
    return resolveCssToClearCss(result);
  } else if (baseClassName.includes("[")) {
    const match = CUSTOM_VALUE_BRACKET_REGEX.exec(baseClassName);
    if (match) {
      const customValue = match[1];
      const baseKey = baseClassName.split("[")[0];
      if (cssObject[`${baseKey}custom`]) {
        let customResult = cssObject[`${baseKey}custom`].replace(
          /custom_value/g,
          customValue
        );
        if (
          hasOpacityModifier &&
          className.includes("/") &&
          /\/\d+$/.test(className)
        ) {
          customResult = processOpacityModifier(className, customResult);
        }
        return customResult;
      }
    }
  }
  return "";
}

/**
 * Synchronous compilation for small class lists
 * @param {string[]} classes - Array of class names
 * @param {Object} cssObject - CSS lookup object
 * @param {boolean} convertToJson - Whether to convert to JSON
 * @returns {string|Object} CSS string or JSON object
 */
export function compileClassesSync(classes, cssObject, convertToJson) {
  let cssResult = classes.map((className) => processClassName(className, cssObject));

  // Resolve CSS
  cssResult = separateAndResolveCSS(cssResult);

  // Convert to JSON if needed
  if (convertToJson) {
    cssResult = inlineStyleToJson(cssResult);
  }

  return cssResult;
}

/**
 * Progressive (chunked) compilation for large class lists
 * Compiles classes in chunks using requestIdleCallback to avoid blocking the main thread
 * 
 * @param {string[]} classes - Array of class names
 * @param {Object} cssObject - CSS lookup object
 * @param {boolean} convertToJson - Whether to convert to JSON
 * @param {number} chunkSize - Number of classes per chunk
 * @returns {Promise<string|Object>} Promise resolving to CSS string or JSON object
 */
export function compileClassesProgressive(classes, cssObject, convertToJson, chunkSize = 50) {
  return new Promise((resolve) => {
    const results = [];
    let index = 0;

    function processChunk(deadline) {
      const startIdx = index;
      const endIdx = Math.min(index + chunkSize, classes.length);
      
      // Process chunk
      const chunk = classes.slice(startIdx, endIdx);
      const chunkResults = chunk.map((className) => processClassName(className, cssObject));

      results.push(...chunkResults);
      index = endIdx;

      // Continue processing if there are more classes
      if (index < classes.length) {
        // Use idle callback for next chunk if available, otherwise defer with setTimeout
        if (typeof requestIdleCallback !== 'undefined') {
          requestIdleCallback(processChunk, { timeout: 50 });
        } else {
          setTimeout(() => processChunk(), 0);
        }
      } else {
        // All chunks processed - finalize result
        let cssResult = separateAndResolveCSS(results);
        if (convertToJson) {
          cssResult = inlineStyleToJson(cssResult);
        }
        resolve(cssResult);
      }
    }

    // Start processing
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(processChunk, { timeout: 50 });
    } else {
      setTimeout(() => processChunk(), 0);
    }
  });
}

/**
 * Determine if progressive compilation should be used
 * @param {number} classCount - Number of classes
 * @param {boolean} userPreference - User's progressive option
 * @returns {boolean} Whether to use progressive compilation
 */
export function shouldUseProgressive(classCount, userPreference) {
  // If user explicitly set preference, use it
  if (typeof userPreference === 'boolean') {
    return userPreference;
  }

  // Auto-enable for 50+ classes if requestIdleCallback is available
  return classCount >= 50 && typeof requestIdleCallback !== 'undefined';
}
