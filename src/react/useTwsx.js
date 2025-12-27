/**
 * React Hook for TWSX Integration
 * Provides seamless integration between TWSX and React components
 */

import { twsx } from "../index.js";
import { useEffect, useMemo, useContext, createContext } from "react";

// Create context for config change notifications
export const TwsxConfigContext = createContext(null);

// Global CSS cache to prevent duplicate injections
const globalCssCache = new Map();
const globalKeyframesCache = new Map(); // Track injected keyframes: name -> css
let globalStyleElement = null;
let globalKeyframesElement = null;

// Export function to clear caches (called when config changes)
export function clearTwsxCache() {
  // Clear internal caches so new CSS can be generated
  globalCssCache.clear();
  globalKeyframesCache.clear();
  // DON'T clear DOM content - let new CSS replace it naturally
  // This prevents white flash when navigating between pages
}

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

    // Only update if content actually changed
    if (keyframesElement.textContent !== allKeyframesCSS) {
      keyframesElement.textContent = allKeyframesCSS;
    }
  }
}

function updateGlobalCSS() {
  if (typeof document === "undefined") return;

  const styleElement = getOrCreateGlobalStyleElement();
  // Rebuild CSS from cache - this replaces old content with fresh content
  const allCSS = Array.from(globalCssCache.values()).join("\n");

  // Only update if content actually changed to avoid unnecessary reflows
  if (styleElement.textContent !== allCSS) {
    styleElement.textContent = allCSS;
  }
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
  // Get config version from context to trigger re-generation when config changes
  const configContext = useContext(TwsxConfigContext);
  const configVersion = configContext?.version || 0;

  // Stable options reference to prevent unnecessary re-renders
  const injectOption = options.inject !== false; // Default to true

  // Serialize styles for stable dependency checking
  const stylesKey = useMemo(() => {
    if (!styles) return null;
    return typeof styles === "string" ? styles : JSON.stringify(styles);
  }, [styles]);

  // Generate CSS with memoization for performance
  // Include configVersion in deps to regenerate when config changes
  const css = useMemo(() => {
    if (!styles) return "";

    try {
      const result = twsx(styles, { inject: false, ...options });
      return result;
    } catch (error) {
      console.error("TWSX Error:", error);
      return "";
    }
  }, [stylesKey, configVersion]); // Remove options from deps

  // Create a unique key for this CSS based on content hash
  const cssKey = useMemo(() => {
    if (!css) return null;
    // Use hash of CSS content as key - same CSS = same key = no duplication!
    return `twsx-${simpleHash(css)}`;
  }, [css]);

  // Auto-inject CSS into global style element (unless inject: false)
  useEffect(() => {
    if (!css || !cssKey || !injectOption) return;

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
    }

    // Cleanup function - use ref counting to track usage
    return () => {
      // Note: We don't delete immediately as other components might use same styles
      // In a production implementation, you'd want ref counting here
    };
  }, [css, cssKey, injectOption]); // Stable dependencies

  return css;
}
