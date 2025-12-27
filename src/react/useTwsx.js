/**
 * React Hook for TWSX Integration
 * Provides seamless integration between TWSX and React components
 */

import { twsx } from "../index.js";
import { useEffect, useMemo } from "react";

// Global CSS cache to prevent duplicate injections
const globalCssCache = new Map();
const globalKeyframesCache = new Map(); // Track injected keyframes: name -> css
let globalStyleElement = null;
let globalKeyframesElement = null;

/**
 * Simple hash function for CSS content
 * @param {string} str - String to hash
 * @returns {string} Hash string
 */
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

function getOrCreateGlobalStyleElement() {
  if (typeof document === "undefined") return null;

  if (!globalStyleElement) {
    globalStyleElement = document.createElement("style");
    globalStyleElement.setAttribute("data-twsx-global", "true");
    document.head.appendChild(globalStyleElement);
  }

  return globalStyleElement;
}

function getOrCreateGlobalKeyframesElement() {
  if (typeof document === "undefined") return null;

  if (!globalKeyframesElement) {
    globalKeyframesElement = document.createElement("style");
    globalKeyframesElement.setAttribute("data-twsx-keyframes", "true");
    document.head.appendChild(globalKeyframesElement);
  }

  return globalKeyframesElement;
}

function extractKeyframes(cssString) {
  const keyframesRegex = /@keyframes\s+([^\s{]+)\s*\{/g;
  const keyframes = [];
  let match;
  let startIndex = 0;

  while ((match = keyframesRegex.exec(cssString)) !== null) {
    const keyframeName = match[1];
    const start = match.index;

    // Find matching closing brace
    let braceCount = 0;
    let endIndex = start;
    let inKeyframe = false;

    for (let i = start; i < cssString.length; i++) {
      if (cssString[i] === "{") {
        braceCount++;
        inKeyframe = true;
      } else if (cssString[i] === "}") {
        braceCount--;
        if (inKeyframe && braceCount === 0) {
          endIndex = i + 1;
          break;
        }
      }
    }

    const keyframeBlock = cssString.substring(start, endIndex);
    keyframes.push({ name: keyframeName, css: keyframeBlock });
  }

  return keyframes;
}

function removeKeyframes(cssString) {
  // Remove keyframes but keep the rest
  let result = cssString;
  const keyframesRegex = /@keyframes\s+([^\s{]+)\s*\{/g;
  let match;
  const toRemove = [];

  while ((match = keyframesRegex.exec(cssString)) !== null) {
    const start = match.index;
    let braceCount = 0;
    let inKeyframe = false;

    for (let i = start; i < cssString.length; i++) {
      if (cssString[i] === "{") {
        braceCount++;
        inKeyframe = true;
      } else if (cssString[i] === "}") {
        braceCount--;
        if (inKeyframe && braceCount === 0) {
          toRemove.push({ start, end: i + 1 });
          break;
        }
      }
    }
  }

  // Remove from end to start to preserve indices
  for (let i = toRemove.length - 1; i >= 0; i--) {
    const { start, end } = toRemove[i];
    result = result.substring(0, start) + result.substring(end);
  }

  return result.trim();
}

function updateGlobalKeyframes(keyframes) {
  if (typeof document === "undefined") return;

  const keyframesElement = getOrCreateGlobalKeyframesElement();
  let hasNewKeyframes = false;

  for (const { name, css } of keyframes) {
    if (!globalKeyframesCache.has(name)) {
      globalKeyframesCache.set(name, css);
      hasNewKeyframes = true;
    }
  }

  if (hasNewKeyframes) {
    // Rebuild all keyframes CSS from cache
    const allKeyframesCSS = Array.from(globalKeyframesCache.values()).join(
      "\n"
    );
    keyframesElement.textContent = allKeyframesCSS;
  }
}

function updateGlobalCSS() {
  if (typeof document === "undefined") return;

  const styleElement = getOrCreateGlobalStyleElement();
  const allCSS = Array.from(globalCssCache.values()).join("\n");
  styleElement.textContent = allCSS;
}

/**
 * Custom hook for using TWSX in React components
 * @param {Object|string} styles - TWSX style object or class string
 * @param {Object} options - TWSX options (inject: true by default)
 * @returns {string} Generated CSS string
 *
 * Examples:
 * - Auto-inject CSS: useTwsx({ '.card': 'bg-white p-4' })
 * - Get CSS only: useTwsx({ '.card': 'bg-white p-4' }, { inject: false })
 */
export function useTwsx(styles, options = {}) {
  // Generate CSS with memoization for performance
  const css = useMemo(() => {
    if (!styles) return "";

    console.log("useTwsx - Input styles:", styles);

    try {
      const result = twsx(styles, { inject: false, ...options });
      console.log("useTwsx - Generated CSS:", result);
      return result;
    } catch (error) {
      console.error("TWSX Error:", error);
      return "";
    }
  }, [styles, options]);

  // Create a unique key for this CSS based on content hash
  const cssKey = useMemo(() => {
    if (!css) return null;
    // Use hash of CSS content as key - same CSS = same key = no duplication!
    return `twsx-${simpleHash(css)}`;
  }, [css]);

  // Auto-inject CSS into global style element (unless inject: false)
  useEffect(() => {
    if (!css || !cssKey || options.inject === false) return;

    // Extract keyframes from CSS
    const keyframes = extractKeyframes(css);
    const cssWithoutKeyframes = removeKeyframes(css);

    // Inject keyframes separately (once per keyframe name)
    if (keyframes.length > 0) {
      updateGlobalKeyframes(keyframes);
    }

    // Only add component CSS to cache if not already present
    if (!globalCssCache.has(cssKey)) {
      globalCssCache.set(cssKey, cssWithoutKeyframes);
      updateGlobalCSS();
      console.log("useTwsx - Injected NEW CSS with key:", cssKey);
    } else {
      console.log("useTwsx - CSS already cached with key:", cssKey);
    }

    // Cleanup function - use ref counting to track usage
    return () => {
      // Note: We don't delete immediately as other components might use same styles
      // In a production implementation, you'd want ref counting here
    };
  }, [css, cssKey, options.inject]);

  return css;
}
