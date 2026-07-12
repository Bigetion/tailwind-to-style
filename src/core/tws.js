/**
 * TWS Core - Tailwind to Style Converter
 * 
 * Main function for converting Tailwind class names to inline styles or JSON objects.
 * 
 * @module core/tws
 */

import { getTailwindCache } from "../utils/tailwindCache.js";
import { logger } from "../utils/logger.js";
import { handleError } from "../utils/errorHandler.js";
import { performanceMonitor } from "../utils/performanceMonitor.js";
import { separateAndResolveCSS, resolveCssToClearCss, inlineStyleToJson } from "../css/resolver.js";
import { processOpacityModifier } from "../css/parser.js";
import {
  CLASS_PARSER_REGEX,
  OPACITY_MODIFIER_REGEX,
  CUSTOM_VALUE_BRACKET_REGEX,
  FRACTION_DENOMINATORS,
  FRACTION_PREFIXES,
} from "../core/constants.js";
import { compileClassesSync, compileClassesProgressive, shouldUseProgressive } from "./progressiveCompiler.js";

/**
 * Convert Tailwind class string to inline CSS styles or JSON object
 * 
 * Supports all Tailwind utilities including:
 * - Responsive variants (sm:, md:, lg:, xl:, 2xl:)
 * - Pseudo-state variants (hover:, focus:, active:, etc.)
 * - Opacity modifiers (text-red-500/50)
 * - Arbitrary values (w-[123px], text-[#abc])
 * - Important modifier (!bg-red-500)
 * 
 * @param {string} classNames - String containing Tailwind classes to convert
 * @param {boolean} convertToJson - If true, returns JSON object; if false, returns CSS string
 * @param {Object} options - Additional options
 * @param {boolean} options.progressive - Enable progressive compilation for large class lists (default: auto)
 * @param {number} options.chunkSize - Number of classes per chunk (default: 50)
 * @returns {string|Object|Promise<string|Object>} Inline CSS string, style JSON object, or Promise for progressive mode
 * 
 * @example
 * // CSS string output
 * tws('bg-blue-500 text-white p-4')
 * // Returns: 'background-color: rgb(59, 130, 246); color: rgb(255, 255, 255); padding: 1rem;'
 * 
 * @example
 * // JSON object output
 * tws('flex items-center gap-4', true)
 * // Returns: { display: 'flex', alignItems: 'center', gap: '1rem' }
 * 
 * @example
 * // Progressive compilation for large lists
 * await tws('class1 class2 ... class100', false, { progressive: true })
 * 
 * @example
 * // Opacity modifiers
 * tws('text-red-500/50')
 * // Returns: 'color: rgba(239, 68, 68, 0.5);'
 * 
 * @example
 * // Arbitrary values
 * tws('w-[123px] text-[#abc]')
 * // Returns: 'width: 123px; color: #abc;'
 */
export function tws(classNames, convertToJson = false, options = {}) {
  const totalMarker = performanceMonitor.start("tws:total");

  try {
    // Get CSS object from singleton cache (auto-generates if needed)
    const tailwindCache = getTailwindCache();
    const cssObject = tailwindCache.getOrGenerate(
      // generateFn and convertFn arehandled by tailwindCache
    );

    // Validate input
    if (
      !classNames ||
      typeof classNames !== "string" ||
      classNames.trim() === ""
    ) {
      performanceMonitor.end(totalMarker);
      return convertToJson ? {} : "";
    }

    // Parse class names
    let classes;
    try {
      const parseMarker = performanceMonitor.start("tws:parse");
      CLASS_PARSER_REGEX.lastIndex = 0; // Reset global regex
      classes = classNames.match(CLASS_PARSER_REGEX);
      performanceMonitor.end(parseMarker);

      // If no valid classes are found
      if (!classes || classes.length === 0) {
        logger.warn(
          `No valid Tailwind classes found in input: "${classNames}"`
        );
        performanceMonitor.end(totalMarker);
        return convertToJson ? {} : "";
      }
    } catch (error) {
      logger.error(`Error parsing Tailwind classes: ${error.message}`);
      performanceMonitor.end(totalMarker);
      return convertToJson ? {} : "";
    }

    // Progressive compilation for large class lists (auto-enabled for 50+ classes)
    const {
      progressive,
      chunkSize = 50
    } = options;

    const useProgressive = shouldUseProgressive(classes.length, progressive);

    if (useProgressive) {
      performanceMonitor.end(totalMarker);
      return compileClassesProgressive(classes, cssObject, convertToJson, chunkSize);
    }

    // Synchronous compilation for small lists
    const processMarker = performanceMonitor.start("tws:process");
    const cssResult = compileClassesSync(classes, cssObject, convertToJson);
    performanceMonitor.end(processMarker);
    performanceMonitor.end(totalMarker);
    return cssResult;
  } catch (error) {
    performanceMonitor.end(totalMarker);
    handleError(error, { classNames, convertToJson });
    return convertToJson ? {} : "";
  }
}

/**
 * Debounced version of tws function
 * 
 * Useful for real-time class name updates in UI.
 * 
 * @param {string} classNames - String containing Tailwind classes
 * @param {boolean} convertToJson - If true, returns JSON object
 * @param {number} wait - Debounce delay in milliseconds (default: 50ms)
 * @returns {Function} Debounced tws function
 */
export function debounce(func, wait = 100) {
  let timeout;
  let callCount = 0;

  return function (...args) {
    const context = this;
    callCount++;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const marker = performanceMonitor.start(
        `debounced:${func.name || "anonymous"}`
      );
      try {
        const result = func.apply(context, args);
        performanceMonitor.end(marker);
        return result;
      } catch (error) {
        performanceMonitor.end(marker);
        logger.error(`Debounced function error (call #${callCount}):`, error);
        throw error;
      }
    }, wait);
  };
}

/** Debounced version of tws with 50ms delay */
export const debouncedTws = debounce(tws, 50);
