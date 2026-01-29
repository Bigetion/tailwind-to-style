/**
 * Enhanced TWS Features - v3.2
 * New capabilities and improvements for tws() function
 */

import { logger } from "../utils/logger.js";
import { performanceMonitor } from "./performance.js";

/**
 * AUTO-PREFIXER: Automatically add vendor prefixes for CSS properties
 */
const VENDOR_PREFIXES = {
  // Flexbox
  'flex': ['-webkit-box', '-ms-flexbox', '-webkit-flex', 'flex'],
  'inline-flex': ['-webkit-inline-box', '-ms-inline-flexbox', '-webkit-inline-flex', 'inline-flex'],
  
  // Transform
  'transform': ['-webkit-transform', '-ms-transform', 'transform'],
  'transform-origin': ['-webkit-transform-origin', '-ms-transform-origin', 'transform-origin'],
  
  // Transition
  'transition': ['-webkit-transition', '-moz-transition', 'transition'],
  'transition-property': ['-webkit-transition-property', 'transition-property'],
  
  // Animation
  'animation': ['-webkit-animation', 'animation'],
  'animation-name': ['-webkit-animation-name', 'animation-name'],
  
  // User Select
  'user-select': ['-webkit-user-select', '-moz-user-select', '-ms-user-select', 'user-select'],
  
  // Appearance
  'appearance': ['-webkit-appearance', '-moz-appearance', 'appearance'],
  
  // Backdrop Filter
  'backdrop-filter': ['-webkit-backdrop-filter', 'backdrop-filter'],
  
  // Clip Path
  'clip-path': ['-webkit-clip-path', 'clip-path'],
};

/**
 * Add vendor prefixes to style object
 * @param {Object} styles - Style object
 * @param {boolean} enabled - Enable auto-prefixing
 * @returns {Object} Prefixed styles
 */
export function autoPrefixStyles(styles, enabled = true) {
  if (!enabled) return styles;
  
  const marker = performanceMonitor.start('autoPrefix');
  const prefixed = { ...styles };
  
  for (const [prop, value] of Object.entries(styles)) {
    // Convert camelCase to kebab-case
    const kebabProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
    
    if (VENDOR_PREFIXES[kebabProp]) {
      // Remove original property
      delete prefixed[prop];
      
      // Add all vendor-prefixed versions
      for (const vendorProp of VENDOR_PREFIXES[kebabProp]) {
        // Convert back to camelCase for React
        const camelVendor = vendorProp.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        prefixed[camelVendor] = value;
      }
    }
  }
  
  performanceMonitor.end(marker);
  return prefixed;
}

/**
 * SMART MERGE: Intelligently merge multiple class strings with conflict resolution
 * @param {...string} classStrings - Class strings to merge
 * @returns {string} Merged class string
 * 
 * @example
 * smartMerge('bg-blue-500 p-4', 'bg-red-500 m-2')
 * // → 'bg-red-500 p-4 m-2' (red overrides blue)
 */
export function smartMerge(...classStrings) {
  const marker = performanceMonitor.start('smartMerge');
  
  const classes = [];
  const conflictMap = new Map();
  
  // Conflict groups for different CSS properties
  const conflictGroups = {
    bg: /^bg-/,
    text: /^text-(?!xs|sm|base|lg|xl)/,
    textSize: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/,
    p: /^p-/,
    px: /^px-/,
    py: /^py-/,
    pt: /^pt-/,
    pb: /^pb-/,
    pl: /^pl-/,
    pr: /^pr-/,
    m: /^m-/,
    mx: /^mx-/,
    my: /^my-/,
    mt: /^mt-/,
    mb: /^mb-/,
    ml: /^ml-/,
    mr: /^mr-/,
    w: /^w-/,
    h: /^h-/,
    rounded: /^rounded/,
    border: /^border-(?!\d)/,
    borderWidth: /^border-\d/,
    shadow: /^shadow-/,
    opacity: /^opacity-/,
  };
  
  // Process each class string
  for (const str of classStrings) {
    if (!str) continue;
    
    const classList = str.trim().split(/\s+/);
    
    for (const cls of classList) {
      if (!cls) continue;
      
      // Find conflict group
      let conflictKey = null;
      for (const [key, regex] of Object.entries(conflictGroups)) {
        if (regex.test(cls)) {
          conflictKey = key;
          break;
        }
      }
      
      if (conflictKey) {
        // Override previous class in same group
        const prevIndex = conflictMap.get(conflictKey);
        if (prevIndex !== undefined) {
          classes[prevIndex] = null; // Mark for removal
        }
        conflictMap.set(conflictKey, classes.length);
      }
      
      classes.push(cls);
    }
  }
  
  performanceMonitor.end(marker);
  return classes.filter(Boolean).join(' ');
}

/**
 * CLASS VARIANTS: Generate multiple variant combinations
 * @param {string} base - Base classes
 * @param {Object} variants - Variant definitions
 * @returns {Object} Object with variant keys and class strings
 * 
 * @example
 * classVariants('px-4 py-2', {
 *   color: { primary: 'bg-blue-500', secondary: 'bg-gray-500' },
 *   size: { sm: 'text-sm', lg: 'text-lg' }
 * })
 */
export function classVariants(base, variants) {
  const marker = performanceMonitor.start('classVariants');
  const result = {};
  
  function generateCombinations(keys, current = {}, classes = base) {
    if (keys.length === 0) {
      const key = Object.values(current).filter(Boolean).join('-') || 'default';
      result[key] = classes;
      return;
    }
    
    const [firstKey, ...restKeys] = keys;
    const options = variants[firstKey];
    
    for (const [optionName, optionClasses] of Object.entries(options)) {
      generateCombinations(
        restKeys,
        { ...current, [firstKey]: optionName },
        smartMerge(classes, optionClasses)
      );
    }
  }
  
  generateCombinations(Object.keys(variants));
  performanceMonitor.end(marker);
  
  return result;
}

/**
 * RESPONSIVE HELPER: Generate responsive class combinations
 * @param {Object} breakpoints - Breakpoint definitions
 * @returns {string} Responsive classes
 * 
 * @example
 * responsive({
 *   default: 'text-sm p-2',
 *   md: 'text-base p-4',
 *   lg: 'text-lg p-6'
 * })
 * // → 'text-sm p-2 md:text-base md:p-4 lg:text-lg lg:p-6'
 */
export function responsive(breakpoints) {
  const marker = performanceMonitor.start('responsive');
  const classes = [];
  
  for (const [breakpoint, classList] of Object.entries(breakpoints)) {
    if (breakpoint === 'default') {
      classes.push(classList);
    } else {
      const prefixed = classList
        .split(/\s+/)
        .map(cls => `${breakpoint}:${cls}`)
        .join(' ');
      classes.push(prefixed);
    }
  }
  
  performanceMonitor.end(marker);
  return classes.join(' ');
}

/**
 * STATE VARIANTS: Generate state-based variants
 * @param {string} base - Base classes
 * @param {Object} states - State definitions
 * @returns {string} Classes with state variants
 * 
 * @example
 * stateVariants('bg-blue-500 text-white', {
 *   hover: 'bg-blue-600',
 *   focus: 'ring-2 ring-blue-300',
 *   active: 'bg-blue-700'
 * })
 */
export function stateVariants(base, states) {
  const marker = performanceMonitor.start('stateVariants');
  const classes = [base];
  
  for (const [state, classList] of Object.entries(states)) {
    const prefixed = classList
      .split(/\s+/)
      .map(cls => `${state}:${cls}`)
      .join(' ');
    classes.push(prefixed);
  }
  
  performanceMonitor.end(marker);
  return classes.join(' ');
}

/**
 * CONDITIONAL CLASSES: Apply classes based on conditions
 * @param {Object} conditions - Condition-class pairs
 * @returns {string} Conditional classes
 * 
 * @example
 * conditionalClasses({
 *   'bg-blue-500': isActive,
 *   'bg-gray-500': !isActive,
 *   'p-4': true,
 *   'opacity-50': isDisabled
 * })
 */
export function conditionalClasses(conditions) {
  const marker = performanceMonitor.start('conditionalClasses');
  const classes = [];
  
  for (const [classList, condition] of Object.entries(conditions)) {
    if (condition) {
      classes.push(classList);
    }
  }
  
  performanceMonitor.end(marker);
  return classes.join(' ');
}

/**
 * CSS VARIABLES SUPPORT: Extract and manage CSS custom properties
 * @param {Object} styles - Style object with CSS variables
 * @returns {Object} Separated styles and variables
 * 
 * @example
 * const { styles, variables } = extractCssVariables({
 *   '--primary-color': '#3b82f6',
 *   color: 'var(--primary-color)',
 *   padding: '1rem'
 * })
 */
export function extractCssVariables(styles) {
  const marker = performanceMonitor.start('extractCssVariables');
  const variables = {};
  const normalStyles = {};
  
  for (const [key, value] of Object.entries(styles)) {
    if (key.startsWith('--')) {
      variables[key] = value;
    } else {
      normalStyles[key] = value;
    }
  }
  
  performanceMonitor.end(marker);
  return { styles: normalStyles, variables };
}

/**
 * THEME HELPER: Apply theme-aware classes
 * @param {string} lightClasses - Classes for light mode
 * @param {string} darkClasses - Classes for dark mode
 * @returns {string} Theme-aware classes
 * 
 * @example
 * themeClasses('bg-white text-gray-900', 'bg-gray-900 text-white')
 * // → 'bg-white text-gray-900 dark:bg-gray-900 dark:text-white'
 */
export function themeClasses(lightClasses, darkClasses) {
  const marker = performanceMonitor.start('themeClasses');
  const dark = darkClasses
    .split(/\s+/)
    .map(cls => `dark:${cls}`)
    .join(' ');
  
  performanceMonitor.end(marker);
  return `${lightClasses} ${dark}`;
}
