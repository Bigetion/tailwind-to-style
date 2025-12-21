/**
 * React Hook for TWSX Integration
 * Provides seamless integration between TWSX and React components
 */

import { twsx } from "../index.js";
import { useEffect, useMemo, useRef } from "react";

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
  const styleElementRef = useRef();

  // Generate CSS with memoization for performance
  const css = useMemo(() => {
    if (!styles) return "";

    try {
      return twsx(styles, { inject: false, ...options });
    } catch (error) {
      console.error("TWSX Error:", error);
      return "";
    }
  }, [styles, options]);

  // Auto-inject CSS into document head (unless inject: false)
  useEffect(() => {
    if (!css || options.inject === false) return;

    // Create or update style element
    if (!styleElementRef.current) {
      styleElementRef.current = document.createElement("style");
      styleElementRef.current.setAttribute("data-twsx-hook", "true");
      document.head.appendChild(styleElementRef.current);
    }

    // Update CSS content
    styleElementRef.current.textContent = css;

    // Cleanup function
    return () => {
      if (styleElementRef.current && styleElementRef.current.parentNode) {
        styleElementRef.current.parentNode.removeChild(styleElementRef.current);
        styleElementRef.current = null;
      }
    };
  }, [css, options.inject]);

  return css;
}
