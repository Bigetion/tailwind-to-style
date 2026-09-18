/**
 * CSS String Generation & Resolution
 * 
 * Utilities for generating and resolving CSS strings.
 * Handles CSS variable resolution and inline style conversion.
 * 
 * @module generator/css-string
 */

import {
  CSS_SEMICOLON_SPLIT_REGEX,
  CSS_COLON_SPLIT_REGEX,
  CSS_VAR_REGEX,
  CAMEL_CASE_REGEX,
} from "../shared/constants.js";

/**
 * Resolve CSS variables in a CSS string to their actual values.
 * 
 * Extracts CSS custom properties (--var-name) and replaces var() references
 * with their actual values. Preserves CSS variables in output for later resolution.
 * 
 * @param {string} cssString - CSS string with possible var() references
 * @returns {string} CSS string with resolved variables
 * 
 * @example
 * resolveCssToClearCss('--text-opacity: 1; color: var(--text-opacity);')
 * // → '--text-opacity: 1; color: 1;'
 * 
 * @example
 * resolveCssToClearCss('background: rgb(59,130,246); color: white;')
 * // → 'background: rgb(59,130,246); color: white;'
 */
export function resolveCssToClearCss(cssString) {
  const customVars = {};
  const props = {};

  // Split by semicolon and process declarations
  const declarations = cssString.split(CSS_SEMICOLON_SPLIT_REGEX);
  for (let i = 0; i < declarations.length; i++) {
    const decl = declarations[i];
    if (!decl) continue;

    const colonIndex = decl.indexOf(":");
    if (colonIndex === -1) continue;

    const key = decl.substring(0, colonIndex).trim();
    const value = decl.substring(colonIndex + 1).trim();

    if (!key || !value) continue;

    if (key.startsWith("--")) {
      customVars[key] = value;
    } else {
      props[key] = value;
    }
  }

  // Replace var(--foo) in all values using pre-compiled regex
  const propKeys = Object.keys(props);
  for (let i = 0; i < propKeys.length; i++) {
    const key = propKeys[i];
    let val = props[key];
    if (val.includes("var(")) {
      CSS_VAR_REGEX.lastIndex = 0;
      val = val.replace(CSS_VAR_REGEX, (m, varName) =>
        customVars[varName] !== undefined ? customVars[varName] : m
      );
      props[key] = val;
    }
  }

  // Build CSS string - INCLUDE CSS variables so they can be resolved later
  let result = "";
  const varKeys = Object.keys(customVars);
  for (let i = 0; i < varKeys.length; i++) {
    const key = varKeys[i];
    result += `${key}: ${customVars[key]}; `;
  }
  for (let i = 0; i < propKeys.length; i++) {
    const key = propKeys[i];
    result += `${key}: ${props[key]}; `;
  }

  return result.trim();
}

/**
 * Convert inline CSS style string to JSON object.
 * 
 * Converts kebab-case CSS properties to camelCase for React/JS compatibility.
 * Resolves CSS variables (var()) to their actual values.
 * 
 * @param {string} styleString - CSS style string
 * @returns {Object} Style object with camelCase keys
 * 
 * @example
 * inlineStyleToJson('background-color: blue; font-size: 16px;')
 * // → { backgroundColor: 'blue', fontSize: '16px' }
 * 
 * @example
 * inlineStyleToJson('--text-color: red; color: var(--text-color);')
 * // → { color: 'red' }
 */
export function inlineStyleToJson(styleString) {
  const styles = styleString
    .split(CSS_SEMICOLON_SPLIT_REGEX)
    .filter((style) => style.trim() !== "");
  const styleObject = {};
  const cssVariables = {};

  // First pass: collect CSS variables
  for (let i = 0; i < styles.length; i++) {
    const parts = styles[i].split(CSS_COLON_SPLIT_REGEX, 2);
    if (parts.length !== 2) continue;
    const key = parts[0].trim();
    const value = parts[1].trim();
    if (key && key.startsWith("--")) {
      cssVariables[key] = value;
    }
  }

  // Helper to resolve CSS variables recursively
  const resolveVariables = (value) => {
    if (!value || !value.includes("var(")) return value;

    let resolved = value;
    let maxIterations = 10; // Prevent infinite loops

    while (resolved.includes("var(") && maxIterations-- > 0) {
      CSS_VAR_REGEX.lastIndex = 0; // Reset global regex
      resolved = resolved.replace(
        CSS_VAR_REGEX,
        (match, variable, fallback) => {
          return cssVariables[variable] || fallback || match;
        }
      );
    }

    return resolved;
  };

  // Second pass: create style object with resolved values
  for (let i = 0; i < styles.length; i++) {
    const parts = styles[i].split(CSS_COLON_SPLIT_REGEX, 2);
    if (parts.length !== 2) continue;
    const key = parts[0].trim();
    const value = parts[1].trim();
    if (key && value && !key.startsWith("--")) {
      const camelCaseKey = key.replace(CAMEL_CASE_REGEX, (_, letter) =>
        letter.toUpperCase()
      );
      styleObject[camelCaseKey] = resolveVariables(value);
    }
  }

  return styleObject;
}
