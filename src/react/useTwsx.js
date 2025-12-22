/**
 * React Hook for TWSX Integration
 * Provides seamless integration between TWSX and React components
 */

import { twsx } from "../index.js";
import { useEffect, useMemo } from "react";

// Global CSS cache to prevent duplicate injections
const globalCssCache = new Map();
let globalStyleElement = null;

function getOrCreateGlobalStyleElement() {
  if (!globalStyleElement) {
    globalStyleElement = document.createElement("style");
    globalStyleElement.setAttribute("data-twsx-global", "true");
    document.head.appendChild(globalStyleElement);
  }
  return globalStyleElement;
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

  // Create a unique key for this CSS
  const cssKey = useMemo(() => {
    if (!css) return null;
    return `twsx-${Math.random().toString(36).substr(2, 8)}`;
  }, [css]);

  // Auto-inject CSS into global style element (unless inject: false)
  useEffect(() => {
    if (!css || !cssKey || options.inject === false) return;

    // Add CSS to global cache
    globalCssCache.set(cssKey, css);
    updateGlobalCSS();

    console.log("useTwsx - Injected CSS with key:", cssKey);

    // Cleanup function
    return () => {
      globalCssCache.delete(cssKey);
      updateGlobalCSS();
    };
  }, [css, cssKey, options.inject]);

  return css;
}
