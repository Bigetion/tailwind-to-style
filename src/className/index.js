/**
 * twsxClassName - Advanced Unified CSS-in-JS API
 *
 * Generate scoped className with auto-injected CSS from Tailwind classes.
 * Supports variants, slots, themes, tokens, animations, and more.
 *
 * @module className
 */

import { twsx } from "../index.js";
import { cx } from "../cx.js";

// ============================================================================
// Custom Error Class
// ============================================================================

class TwsxClassNameError extends Error {
  constructor(message, context = {}) {
    super(message);
    this.name = "TwsxClassNameError";
    this.context = context;
  }
}

// ============================================================================
// Input Validation Utilities
// ============================================================================

/**
 * Validate twsxClassName configuration
 * @param {Object} config - Configuration object to validate
 * @throws {TwsxClassNameError} If configuration is invalid
 */
function validateConfig(config) {
  if (config === null || config === undefined) {
    throw new TwsxClassNameError("Configuration cannot be null or undefined", { config });
  }

  if (typeof config !== "object" || Array.isArray(config)) {
    throw new TwsxClassNameError("Configuration must be a plain object", { 
      received: Array.isArray(config) ? "array" : typeof config 
    });
  }

  // Validate variants structure
  if ("variants" in config && config.variants !== undefined) {
    if (typeof config.variants !== "object" || Array.isArray(config.variants)) {
      throw new TwsxClassNameError("variants must be a plain object", {
        received: Array.isArray(config.variants) ? "array" : typeof config.variants
      });
    }

    // Validate each variant
    for (const [variantName, variantValues] of Object.entries(config.variants)) {
      if (typeof variantValues !== "object" || Array.isArray(variantValues)) {
        throw new TwsxClassNameError(`variants.${variantName} must be a plain object`, {
          variantName,
          received: Array.isArray(variantValues) ? "array" : typeof variantValues
        });
      }
    }
  }

  // Validate slots structure
  if ("slots" in config && config.slots !== undefined) {
    if (typeof config.slots !== "object" || Array.isArray(config.slots)) {
      throw new TwsxClassNameError("slots must be a plain object", {
        received: Array.isArray(config.slots) ? "array" : typeof config.slots
      });
    }
  }

  // Validate compoundVariants structure
  if ("compoundVariants" in config && config.compoundVariants !== undefined) {
    if (!Array.isArray(config.compoundVariants)) {
      throw new TwsxClassNameError("compoundVariants must be an array", {
        received: typeof config.compoundVariants
      });
    }
  }

  // Validate defaultVariants structure
  if ("defaultVariants" in config && config.defaultVariants !== undefined) {
    if (typeof config.defaultVariants !== "object" || Array.isArray(config.defaultVariants)) {
      throw new TwsxClassNameError("defaultVariants must be a plain object", {
        received: Array.isArray(config.defaultVariants) ? "array" : typeof config.defaultVariants
      });
    }
  }

  return true;
}

/**
 * Validate that a value is a valid Tailwind class string
 * @param {*} value - Value to validate
 * @param {string} context - Context for error message
 * @returns {boolean}
 */
function isValidClassValue(value) {
  return typeof value === "string" || 
         (typeof value === "object" && value !== null && !Array.isArray(value));
}

// ============================================================================
// Constants & Environment Detection
// ============================================================================

const IS_BROWSER =
  typeof window !== "undefined" && typeof document !== "undefined";

// ============================================================================
// Default Configuration
// ============================================================================

const DEFAULT_CONFIG = {
  prefix: "twsx",
  hash: true,
  hashLength: 8,
  inject: true,
  deduplicate: true,
};

// Global configuration (can be changed via twsxClassName.config())
let globalConfig = { ...DEFAULT_CONFIG };

// ============================================================================
// Pseudo-class & State Mappings
// ============================================================================

const PSEUDO_SHORTHANDS = {
  // Standard pseudo-classes
  hover: "&:hover",
  focus: "&:focus",
  active: "&:active",
  disabled: "&:disabled",
  visited: "&:visited",
  checked: "&:checked",
  required: "&:required",
  invalid: "&:invalid",
  valid: "&:valid",
  empty: "&:empty",
  enabled: "&:enabled",
  indeterminate: "&:indeterminate",
  "focus-within": "&:focus-within",
  "focus-visible": "&:focus-visible",
  
  // Child selectors
  first: "&:first-child",
  last: "&:last-child",
  odd: "&:nth-child(odd)",
  even: "&:nth-child(even)",
  "first-of-type": "&:first-of-type",
  "last-of-type": "&:last-of-type",
  only: "&:only-child",
  "only-of-type": "&:only-of-type",
  
  // Pseudo-elements
  placeholder: "&::placeholder",
  before: "&::before",
  after: "&::after",
  selection: "&::selection",
  marker: "&::marker",
  file: "&::file-selector-button",
  backdrop: "&::backdrop",
  
  // Dark mode
  dark: "@media (prefers-color-scheme: dark)",
  light: "@media (prefers-color-scheme: light)",
  
  // Motion preferences
  "motion-safe": "@media (prefers-reduced-motion: no-preference)",
  "motion-reduce": "@media (prefers-reduced-motion: reduce)",
  
  // Print
  print: "@media print",
  
  // Contrast
  "contrast-more": "@media (prefers-contrast: more)",
  "contrast-less": "@media (prefers-contrast: less)",
  
  // Orientation
  portrait: "@media (orientation: portrait)",
  landscape: "@media (orientation: landscape)",
};

// Group & Peer state mappings (Tailwind-style)
const GROUP_PEER_STATES = {
  // Group states (parent hover affects child)
  "group-hover": ".group:hover &",
  "group-focus": ".group:focus &",
  "group-active": ".group:active &",
  "group-focus-within": ".group:focus-within &",
  "group-focus-visible": ".group:focus-visible &",
  "group-disabled": ".group:disabled &",
  "group-checked": ".group:checked &",
  "group-invalid": ".group:invalid &",
  "group-required": ".group:required &",
  
  // Peer states (sibling affects element)
  "peer-hover": ".peer:hover ~ &",
  "peer-focus": ".peer:focus ~ &",
  "peer-active": ".peer:active ~ &",
  "peer-focus-within": ".peer:focus-within ~ &",
  "peer-focus-visible": ".peer:focus-visible ~ &",
  "peer-disabled": ".peer:disabled ~ &",
  "peer-checked": ".peer:checked ~ &",
  "peer-invalid": ".peer:invalid ~ &",
  "peer-required": ".peer:required ~ &",
  "peer-placeholder-shown": ".peer:placeholder-shown ~ &",
};

// Responsive breakpoints (Tailwind v3 defaults)
const DEFAULT_BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

let BREAKPOINTS = { ...DEFAULT_BREAKPOINTS };

// ============================================================================
// Design Tokens System
// ============================================================================

let designTokens = {
  colors: {},
  spacing: {},
  fontSize: {},
  fontWeight: {},
  borderRadius: {},
  shadow: {},
  animation: {},
  custom: {},
};

// ============================================================================
// Theme System
// ============================================================================

let themes = {
  light: {},
  dark: {},
};
let activeTheme = "light";

// ============================================================================
// Animation Presets
// ============================================================================

const ANIMATION_PRESETS = {
  fadeIn: {
    keyframes: {
      from: "opacity-0",
      to: "opacity-100",
    },
    duration: "300ms",
    timing: "ease-out",
  },
  fadeOut: {
    keyframes: {
      from: "opacity-100",
      to: "opacity-0",
    },
    duration: "200ms",
    timing: "ease-in",
  },
  slideInUp: {
    keyframes: {
      from: "translate-y-4 opacity-0",
      to: "translate-y-0 opacity-100",
    },
    duration: "300ms",
    timing: "ease-out",
  },
  slideInDown: {
    keyframes: {
      from: "-translate-y-4 opacity-0",
      to: "translate-y-0 opacity-100",
    },
    duration: "300ms",
    timing: "ease-out",
  },
  slideInLeft: {
    keyframes: {
      from: "-translate-x-4 opacity-0",
      to: "translate-x-0 opacity-100",
    },
    duration: "300ms",
    timing: "ease-out",
  },
  slideInRight: {
    keyframes: {
      from: "translate-x-4 opacity-0",
      to: "translate-x-0 opacity-100",
    },
    duration: "300ms",
    timing: "ease-out",
  },
  scaleIn: {
    keyframes: {
      from: "scale-95 opacity-0",
      to: "scale-100 opacity-100",
    },
    duration: "200ms",
    timing: "ease-out",
  },
  scaleOut: {
    keyframes: {
      from: "scale-100 opacity-100",
      to: "scale-95 opacity-0",
    },
    duration: "150ms",
    timing: "ease-in",
  },
  bounce: {
    keyframes: {
      "0%, 100%": "translate-y-0",
      "50%": "-translate-y-2",
    },
    duration: "500ms",
    timing: "ease-in-out",
    iteration: "infinite",
  },
  pulse: {
    keyframes: {
      "0%, 100%": "opacity-100",
      "50%": "opacity-50",
    },
    duration: "1s",
    timing: "ease-in-out",
    iteration: "infinite",
  },
  spin: {
    keyframes: {
      from: "rotate-0",
      to: "rotate-360",
    },
    duration: "1s",
    timing: "linear",
    iteration: "infinite",
  },
  ping: {
    keyframes: {
      "75%, 100%": "scale-150 opacity-0",
    },
    duration: "1s",
    timing: "cubic-bezier(0, 0, 0.2, 1)",
    iteration: "infinite",
  },
  shake: {
    keyframes: {
      "0%, 100%": "translate-x-0",
      "25%": "-translate-x-1",
      "75%": "translate-x-1",
    },
    duration: "300ms",
    timing: "ease-in-out",
  },
};

// ============================================================================
// Caching System
// ============================================================================

const classNameCache = new Map();
const cssCache = new Map();
const objectIdentityCache = new WeakMap();
const styleRegistry = new Map();
const extendedConfigCache = new WeakMap();

const MAX_CACHE_SIZE = 2000;

// ============================================================================
// Hashing Utilities
// ============================================================================

function hashString(str) {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function toShortHash(num, length = 8) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  let n = num;
  while (result.length < length) {
    result += chars[n % 36];
    n = Math.floor(n / 36);
    if (n === 0) n = hashString(result);
  }
  return result.slice(0, length);
}

function getConfigHash(config) {
  const cached = objectIdentityCache.get(config);
  if (cached) return cached;

  const str = JSON.stringify(config, Object.keys(config).sort());
  const hash = toShortHash(hashString(str));

  objectIdentityCache.set(config, hash);
  return hash;
}

function evictCache(cache, maxSize = MAX_CACHE_SIZE) {
  if (cache.size <= maxSize) return;
  const excess = cache.size - maxSize;
  const iter = cache.keys();
  for (let i = 0; i < excess; i++) {
    cache.delete(iter.next().value);
  }
}

// ============================================================================
// CSS Injection System (Optimized)
// ============================================================================

let styleTag = null;
let pendingCSS = [];
let rafScheduled = false;
const MAX_STYLE_REGISTRY_SIZE = 3000;

function injectCSS(className, css) {
  // Skip if already injected with same CSS
  if (styleRegistry.has(className)) {
    const existing = styleRegistry.get(className);
    if (existing === css) return;
  }

  styleRegistry.set(className, css);
  
  // Evict old styles if registry too large
  evictStyleRegistry();

  if (IS_BROWSER) {
    // Batch CSS injection with requestAnimationFrame
    pendingCSS.push(css);
    scheduleStyleUpdate();
  }
}

function scheduleStyleUpdate() {
  if (rafScheduled) return;
  rafScheduled = true;
  
  requestAnimationFrame(() => {
    flushPendingCSS();
    rafScheduled = false;
  });
}

function flushPendingCSS() {
  if (pendingCSS.length === 0) return;
  
  ensureStyleTag();
  
  // Append only new CSS (not rebuild all)
  const newCSS = pendingCSS.join("\n");
  styleTag.textContent += (styleTag.textContent ? "\n" : "") + newCSS;
  pendingCSS = [];
}

function ensureStyleTag() {
  if (styleTag && styleTag.parentNode) return styleTag;
  
  styleTag = document.getElementById("twsx-classname-style");
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = "twsx-classname-style";
    styleTag.setAttribute("data-twsx-classname", "");
    document.head.appendChild(styleTag);
  }
  return styleTag;
}

function evictStyleRegistry() {
  if (styleRegistry.size <= MAX_STYLE_REGISTRY_SIZE) return;
  
  // Remove oldest 20% entries
  const removeCount = Math.floor(MAX_STYLE_REGISTRY_SIZE * 0.2);
  const iter = styleRegistry.keys();
  for (let i = 0; i < removeCount; i++) {
    styleRegistry.delete(iter.next().value);
  }
  
  // Rebuild style tag after eviction (rare operation)
  if (IS_BROWSER) {
    rebuildStyleTag();
  }
}

function rebuildStyleTag() {
  if (!IS_BROWSER) return;
  ensureStyleTag();
  styleTag.textContent = [...styleRegistry.values()].join("\n");
}

// ============================================================================
// Token Processing
// ============================================================================

function processTokens(classString) {
  if (!classString || typeof classString !== "string") return classString;

  // Replace $token references with actual values
  return classString.replace(/\$([a-zA-Z0-9_.]+)/g, (match, tokenPath) => {
    const parts = tokenPath.split(".");
    let value = designTokens;

    for (const part of parts) {
      if (value && typeof value === "object" && part in value) {
        value = value[part];
      } else {
        // Check in custom tokens
        if (designTokens.custom && designTokens.custom[tokenPath]) {
          return designTokens.custom[tokenPath];
        }
        return match; // Return original if not found
      }
    }

    return typeof value === "string" ? value : match;
  });
}

// ============================================================================
// Style Processing Utilities
// ============================================================================

function expandShorthands(config, baseSelector) {
  const expanded = {};
  const specialKeys = new Set([
    "name", "prefix", "hash", "hashLength", "inject", "base",
    "variants", "compoundVariants", "defaultVariants", "slots",
    "responsiveVariants", "extend", "animation", "enter", "exit",
    "enterFrom", "enterTo", "leaveFrom", "leaveTo", "_"
  ]);

  for (const [key, value] of Object.entries(config)) {
    if (specialKeys.has(key)) continue;

    // Process tokens in value
    const processedValue = typeof value === "string" ? processTokens(value) : value;

    // Check for shorthand pseudo-class
    if (PSEUDO_SHORTHANDS[key]) {
      const mapping = PSEUDO_SHORTHANDS[key];
      
      if (mapping.startsWith("@media")) {
        // Media query (dark, print, motion-safe, etc.)
        expanded[mapping] = { [baseSelector]: processedValue };
      } else {
        // Regular pseudo-class/element
        const selector = mapping.replace("&", baseSelector);
        expanded[selector] = processedValue;
      }
    }
    // Check for group/peer states
    else if (GROUP_PEER_STATES[key]) {
      const selector = GROUP_PEER_STATES[key].replace("&", baseSelector);
      expanded[selector] = processedValue;
    }
    // Check for responsive breakpoint shorthand
    else if (BREAKPOINTS[key]) {
      const mediaQuery = `@media (min-width: ${BREAKPOINTS[key]})`;
      expanded[mediaQuery] = { [baseSelector]: processedValue };
    }
    // Container query
    else if (key.startsWith("@container")) {
      expanded[key] = { [baseSelector]: processedValue };
    }
    // Already a selector (starts with & or . or @)
    else if (key.startsWith("&") || key.startsWith(".") || key.startsWith("@")) {
      const selector = key.replace(/^&/, baseSelector);
      expanded[selector] = processedValue;
    }
    // Child selector shorthand
    else if (key.startsWith("& ")) {
      const selector = key.replace("&", baseSelector);
      expanded[selector] = processedValue;
    }
  }

  return expanded;
}

function processNestedStyles(config, baseSelector) {
  const result = {};

  for (const [key, value] of Object.entries(config)) {
    if (typeof value === "object" && !Array.isArray(value)) {
      const nestedSelector = key.replace(/^&/, baseSelector);
      const nested = processNestedStyles(value, nestedSelector);
      Object.assign(result, nested);

      if (value._) {
        result[nestedSelector] = processTokens(value._);
        const nestedShorthands = expandShorthands(value, nestedSelector);
        Object.assign(result, nestedShorthands);
      }
    } else if (typeof value === "string") {
      if (key === "_") {
        result[baseSelector] = processTokens(value);
      } else {
        const selector = PSEUDO_SHORTHANDS[key]
          ? PSEUDO_SHORTHANDS[key].replace("&", baseSelector)
          : GROUP_PEER_STATES[key]
            ? GROUP_PEER_STATES[key].replace("&", baseSelector)
            : key.replace(/^&/, baseSelector);
        result[selector] = processTokens(value);
      }
    }
  }

  return result;
}

// ============================================================================
// Animation Processing
// ============================================================================

function processAnimations(config, baseSelector, className) {
  const result = {};
  let keyframesCSS = "";
  const { animation, enter, exit, enterFrom, enterTo, leaveFrom, leaveTo } = config;

  // Named animation preset
  if (animation && typeof animation === "string" && ANIMATION_PRESETS[animation]) {
    const preset = ANIMATION_PRESETS[animation];
    const keyframeName = `${className}-${animation}`;
    
    keyframesCSS += generateKeyframes(keyframeName, preset.keyframes);
    
    const animationValue = `${keyframeName} ${preset.duration} ${preset.timing}${preset.iteration ? ` ${preset.iteration}` : ""}`;
    result[baseSelector] = (result[baseSelector] || "") + ` animate-[${animationValue}]`;
  }
  
  // Custom animation object
  else if (animation && typeof animation === "object") {
    const keyframeName = `${className}-custom`;
    
    if (animation.keyframes) {
      keyframesCSS += generateKeyframes(keyframeName, animation.keyframes);
    }
    
    const duration = animation.duration || "300ms";
    const timing = animation.timing || "ease";
    const delay = animation.delay || "0ms";
    const iteration = animation.iteration || "1";
    
    result[baseSelector] = (result[baseSelector] || "") + 
      ` animate-[${keyframeName}_${duration}_${timing}_${delay}_${iteration}]`;
  }

  // Enter/Exit transitions (for component mount/unmount)
  if (enter || enterFrom || enterTo) {
    result[`${baseSelector}[data-state="entering"]`] = enter || "";
    if (enterFrom) result[`${baseSelector}[data-state="entering-from"]`] = enterFrom;
    if (enterTo) result[`${baseSelector}[data-state="entering-to"]`] = enterTo;
  }
  
  if (exit || leaveFrom || leaveTo) {
    result[`${baseSelector}[data-state="exiting"]`] = exit || "";
    if (leaveFrom) result[`${baseSelector}[data-state="exiting-from"]`] = leaveFrom;
    if (leaveTo) result[`${baseSelector}[data-state="exiting-to"]`] = leaveTo;
  }

  return { styles: result, keyframes: keyframesCSS };
}

function generateKeyframes(name, frames) {
  let css = `@keyframes ${name} {\n`;
  
  for (const [key, value] of Object.entries(frames)) {
    // Convert Tailwind classes to approximate CSS (simplified)
    const cssValue = value.replace(/([a-z]+)-([a-z0-9-]+)/g, (match, prop, val) => {
      // This is a simplified conversion - real implementation would use twsx
      return match;
    });
    css += `  ${key} { ${cssValue} }\n`;
  }
  
  css += "}\n";
  return css;
}

// ============================================================================
// Deep Merge Utility
// ============================================================================

function deepMerge(target, source) {
  const result = { ...target };
  
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      if (target[key] && typeof target[key] === "object") {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        result[key] = { ...source[key] };
      }
    } else if (typeof source[key] === "string" && typeof target[key] === "string") {
      // Merge Tailwind class strings
      result[key] = `${target[key]} ${source[key]}`;
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
}

// ============================================================================
// Core: Basic ClassName Mode
// ============================================================================

function generateBasicClassName(config) {
  const {
    name,
    prefix = globalConfig.prefix,
    hash: useHash = globalConfig.hash,
    hashLength = globalConfig.hashLength,
    inject = globalConfig.inject,
    _: baseStyles = "",
    ...rest
  } = config;

  const configHash = getConfigHash(config);

  let className;
  if (name) {
    className = useHash ? `${name}-${configHash.slice(0, hashLength)}` : name;
    if (prefix && prefix !== "twsx") {
      className = `${prefix}-${className}`;
    }
  } else {
    className = `${prefix}-${configHash.slice(0, hashLength)}`;
  }

  if (classNameCache.has(configHash)) {
    const cached = classNameCache.get(configHash);
    if (inject) injectCSS(className, cssCache.get(configHash));
    return cached;
  }

  const baseSelector = `.${className}`;
  const styleObj = {};

  // Add base styles with token processing
  if (baseStyles) {
    styleObj[baseSelector] = processTokens(baseStyles);
  }

  // Process shorthands (hover, focus, dark, group-hover, etc.)
  const expanded = expandShorthands(rest, baseSelector);
  Object.assign(styleObj, expanded);

  // Process nested objects
  const nested = processNestedStyles(rest, baseSelector);
  Object.assign(styleObj, nested);

  // Process animations
  const { styles: animStyles, keyframes } = processAnimations(rest, baseSelector, className);
  Object.assign(styleObj, animStyles);

  // Generate CSS
  let css = twsx(styleObj, { inject: false });
  if (keyframes) css = keyframes + css;

  // Cache results
  classNameCache.set(configHash, className);
  cssCache.set(configHash, css);
  evictCache(classNameCache);
  evictCache(cssCache);

  // Inject CSS
  if (inject) {
    injectCSS(className, css);
  }

  return className;
}

// ============================================================================
// Core: Variants Mode
// ============================================================================

function createVariants(config) {
  const {
    name,
    prefix = globalConfig.prefix,
    hash: useHash = globalConfig.hash,
    hashLength = globalConfig.hashLength,
    inject = globalConfig.inject,
    base = "",
    variants = {},
    compoundVariants = [],
    defaultVariants = {},
    responsiveVariants = [],
  } = config;

  const baseHash = getConfigHash(config);

  let baseClassName;
  if (name) {
    baseClassName = useHash ? `${name}-${baseHash.slice(0, hashLength)}` : name;
    if (prefix && prefix !== "twsx") {
      baseClassName = `${prefix}-${baseClassName}`;
    }
  } else {
    baseClassName = `${prefix}-${baseHash.slice(0, hashLength)}`;
  }

  const variantStyles = new Map();

  // Generate base styles
  if (base) {
    const baseSelector = `.${baseClassName}`;
    let styleObj = {};

    if (typeof base === "string") {
      styleObj[baseSelector] = processTokens(base);
    } else if (typeof base === "object") {
      if (base._) {
        styleObj[baseSelector] = processTokens(base._);
      }
      const expanded = expandShorthands(base, baseSelector);
      Object.assign(styleObj, expanded);
      const nested = processNestedStyles(base, baseSelector);
      Object.assign(styleObj, nested);
    }

    const baseCss = twsx(styleObj, { inject: false });
    variantStyles.set("__base__", baseCss);
  }

  // Generate styles for each variant value
  for (const [variantKey, variantOptions] of Object.entries(variants)) {
    for (const [optionKey, optionValue] of Object.entries(variantOptions)) {
      const variantClassName = `${baseClassName}--${variantKey}-${optionKey}`;
      const selector = `.${variantClassName}`;
      let styleObj = {};

      if (typeof optionValue === "string") {
        styleObj[selector] = processTokens(optionValue);
      } else if (typeof optionValue === "object") {
        if (optionValue._) {
          styleObj[selector] = processTokens(optionValue._);
        }
        const expanded = expandShorthands(optionValue, selector);
        Object.assign(styleObj, expanded);
        const nested = processNestedStyles(optionValue, selector);
        Object.assign(styleObj, nested);
      }

      const css = twsx(styleObj, { inject: false });
      variantStyles.set(`${variantKey}:${optionKey}`, {
        className: variantClassName,
        css,
      });
      
      // Generate responsive variant styles if enabled
      if (responsiveVariants.includes(variantKey)) {
        for (const [bp, bpValue] of Object.entries(BREAKPOINTS)) {
          const respClassName = `${baseClassName}--${bp}-${variantKey}-${optionKey}`;
          const respSelector = `.${respClassName}`;
          const respStyleObj = {
            [`@media (min-width: ${bpValue})`]: { [respSelector]: styleObj[selector] }
          };
          const respCss = twsx(respStyleObj, { inject: false });
          variantStyles.set(`${variantKey}:${optionKey}:${bp}`, {
            className: respClassName,
            css: respCss,
          });
        }
      }
    }
  }

  // Generate compound variant styles
  for (let i = 0; i < compoundVariants.length; i++) {
    const compound = compoundVariants[i];
    const { class: cls, className: clsName, ...conditions } = compound;
    const compoundClass = cls || clsName || "";

    if (compoundClass) {
      const compoundClassName = `${baseClassName}--compound-${i}`;
      const selector = `.${compoundClassName}`;
      const css = twsx({ [selector]: processTokens(compoundClass) }, { inject: false });
      variantStyles.set(`__compound__:${i}`, {
        className: compoundClassName,
        conditions,
        css,
      });
    }
  }

  // Inject all CSS upfront
  if (inject) {
    let allCss = "";
    for (const [key, value] of variantStyles.entries()) {
      if (key === "__base__") {
        allCss += value + "\n";
      } else if (typeof value === "object" && value.css) {
        allCss += value.css + "\n";
      }
    }
    if (allCss) {
      injectCSS(baseClassName, allCss);
    }
  }

  /**
   * Variant selector function
   */
  function variantSelector(props = {}) {
    const mergedProps = { ...defaultVariants, ...props };
    const classes = [baseClassName];

    // Add variant classes
    for (const [variantKey, variantValue] of Object.entries(mergedProps)) {
      if (variantValue === undefined || variantValue === null) continue;
      
      // Handle boolean variants
      const normalizedValue = variantValue === true ? "true" : variantValue === false ? "false" : variantValue;
      
      // Handle responsive variants: { size: { initial: 'sm', md: 'lg' } }
      if (typeof variantValue === "object" && !Array.isArray(variantValue)) {
        for (const [bp, bpVariantValue] of Object.entries(variantValue)) {
          if (bp === "initial") {
            const variantData = variantStyles.get(`${variantKey}:${bpVariantValue}`);
            if (variantData) classes.push(variantData.className);
          } else {
            const respData = variantStyles.get(`${variantKey}:${bpVariantValue}:${bp}`);
            if (respData) classes.push(respData.className);
          }
        }
      } else {
        const variantData = variantStyles.get(`${variantKey}:${normalizedValue}`);
        if (variantData) {
          classes.push(variantData.className);
        }
      }
    }

    // Check compound variants
    for (const [key, data] of variantStyles.entries()) {
      if (!key.startsWith("__compound__:")) continue;
      const { conditions, className } = data;

      let matches = true;
      for (const [condKey, condValue] of Object.entries(conditions)) {
        const propValue = mergedProps[condKey];
        const normalizedPropValue = propValue === true ? "true" : propValue === false ? "false" : propValue;
        
        if (Array.isArray(condValue)) {
          if (!condValue.includes(normalizedPropValue)) {
            matches = false;
            break;
          }
        } else {
          const normalizedCondValue = condValue === true ? "true" : condValue === false ? "false" : condValue;
          if (normalizedPropValue !== normalizedCondValue) {
            matches = false;
            break;
          }
        }
      }

      if (matches) {
        classes.push(className);
      }
    }

    return classes.join(" ");
  }

  // Attach merge method for combining with external classes
  variantSelector.merge = function(props, ...additionalClasses) {
    const baseClasses = typeof props === "object" && !Array.isArray(props) && !props.$$typeof
      ? variantSelector(props)
      : (additionalClasses.unshift(props), variantSelector());
    
    return cx(baseClasses, ...additionalClasses);
  };

  // Attach raw method for getting raw config
  variantSelector.raw = function() {
    return config;
  };

  return variantSelector;
}

// ============================================================================
// Core: Slots Mode
// ============================================================================

function createSlots(config) {
  const {
    name,
    prefix = globalConfig.prefix,
    hash: useHash = globalConfig.hash,
    hashLength = globalConfig.hashLength,
    inject = globalConfig.inject,
    slots = {},
    variants = {},
    compoundVariants = [],
    defaultVariants = {},
  } = config;

  const baseHash = getConfigHash(config);

  let componentName;
  if (name) {
    componentName = useHash ? `${name}-${baseHash.slice(0, hashLength)}` : name;
    if (prefix && prefix !== "twsx") {
      componentName = `${prefix}-${componentName}`;
    }
  } else {
    componentName = `${prefix}-${baseHash.slice(0, hashLength)}`;
  }

  const slotData = new Map();
  let allCss = "";

  // Generate base slot styles
  for (const [slotName, slotStyles] of Object.entries(slots)) {
    const slotClassName = `${componentName}__${slotName}`;
    const selector = `.${slotClassName}`;
    let styleObj = {};

    if (typeof slotStyles === "string") {
      styleObj[selector] = processTokens(slotStyles);
    } else if (typeof slotStyles === "object") {
      if (slotStyles._) {
        styleObj[selector] = processTokens(slotStyles._);
      }
      const expanded = expandShorthands(slotStyles, selector);
      Object.assign(styleObj, expanded);
      const nested = processNestedStyles(slotStyles, selector);
      Object.assign(styleObj, nested);
    }

    const css = twsx(styleObj, { inject: false });
    slotData.set(slotName, { className: slotClassName, css });
    allCss += css + "\n";
  }

  // Generate variant styles for each slot
  const variantSlotStyles = new Map();

  for (const [variantKey, variantOptions] of Object.entries(variants)) {
    for (const [optionKey, optionValue] of Object.entries(variantOptions)) {
      if (typeof optionValue === "object" && !optionValue._) {
        for (const [slotName, slotStyles] of Object.entries(optionValue)) {
          if (typeof slotStyles === "string" || typeof slotStyles === "object") {
            const variantClassName = `${componentName}__${slotName}--${variantKey}-${optionKey}`;
            const selector = `.${variantClassName}`;
            let styleObj = {};

            if (typeof slotStyles === "string") {
              styleObj[selector] = processTokens(slotStyles);
            } else {
              if (slotStyles._) {
                styleObj[selector] = processTokens(slotStyles._);
              }
              const expanded = expandShorthands(slotStyles, selector);
              Object.assign(styleObj, expanded);
            }

            const css = twsx(styleObj, { inject: false });
            const key = `${variantKey}:${optionKey}:${slotName}`;
            variantSlotStyles.set(key, { className: variantClassName, css });
            allCss += css + "\n";
          }
        }
      }
    }
  }

  // Generate compound variant styles for slots
  for (let i = 0; i < compoundVariants.length; i++) {
    const compound = compoundVariants[i];
    const { class: cls, className: clsName, ...rest } = compound;
    
    // Check if compound has slot-specific styles
    for (const [slotName] of slotData.entries()) {
      if (rest[slotName] && typeof rest[slotName] === "string") {
        const compoundClassName = `${componentName}__${slotName}--compound-${i}`;
        const selector = `.${compoundClassName}`;
        const css = twsx({ [selector]: processTokens(rest[slotName]) }, { inject: false });
        
        const conditions = {};
        for (const [k, v] of Object.entries(rest)) {
          if (!slots[k]) conditions[k] = v;
        }
        
        variantSlotStyles.set(`__compound__:${i}:${slotName}`, {
          className: compoundClassName,
          conditions,
          css,
        });
        allCss += css + "\n";
      }
    }
  }

  // Inject CSS
  if (inject && allCss) {
    injectCSS(componentName, allCss);
  }

  /**
   * Slots generator function
   */
  function slotsGenerator(props = {}) {
    const mergedProps = { ...defaultVariants, ...props };
    const result = {};

    for (const [slotName, data] of slotData.entries()) {
      const classes = [data.className];

      // Add variant classes for this slot
      for (const [variantKey, variantValue] of Object.entries(mergedProps)) {
        if (variantValue === undefined || variantValue === null) continue;
        
        const normalizedValue = variantValue === true ? "true" : variantValue === false ? "false" : variantValue;
        const key = `${variantKey}:${normalizedValue}:${slotName}`;
        const variantData = variantSlotStyles.get(key);
        if (variantData) {
          classes.push(variantData.className);
        }
      }

      // Check compound variants for this slot
      for (const [key, data] of variantSlotStyles.entries()) {
        if (!key.startsWith("__compound__:") || !key.endsWith(`:${slotName}`)) continue;
        const { conditions, className } = data;

        let matches = true;
        for (const [condKey, condValue] of Object.entries(conditions)) {
          const propValue = mergedProps[condKey];
          const normalizedPropValue = propValue === true ? "true" : propValue === false ? "false" : propValue;
          const normalizedCondValue = condValue === true ? "true" : condValue === false ? "false" : condValue;
          
          if (Array.isArray(condValue)) {
            if (!condValue.includes(normalizedPropValue)) {
              matches = false;
              break;
            }
          } else if (normalizedPropValue !== normalizedCondValue) {
            matches = false;
            break;
          }
        }

        if (matches) {
          classes.push(className);
        }
      }

      result[slotName] = classes.join(" ");
    }

    return result;
  }

  // Attach merge method
  slotsGenerator.merge = function(props, slotOverrides = {}) {
    const baseSlots = typeof props === "object" && !Array.isArray(props) && !("$$typeof" in props)
      ? slotsGenerator(props)
      : slotsGenerator();
    
    const result = {};
    for (const [slotName, slotClasses] of Object.entries(baseSlots)) {
      result[slotName] = cx(slotClasses, slotOverrides[slotName]);
    }
    
    return result;
  };

  // Attach raw method
  slotsGenerator.raw = function() {
    return config;
  };

  return slotsGenerator;
}

// ============================================================================
// Main: Unified twsxClassName Function
// ============================================================================

function twsxClassName(nameOrConfig, config = {}) {
  // Input validation
  if (nameOrConfig === null || nameOrConfig === undefined) {
    throw new TwsxClassNameError("twsxClassName requires a configuration object or name string", {
      received: nameOrConfig
    });
  }

  let opts;
  if (typeof nameOrConfig === "string") {
    // Validate config when name is provided separately
    if (config !== null && config !== undefined && typeof config === "object") {
      validateConfig(config);
    }
    opts = { name: nameOrConfig, ...config };
  } else if (typeof nameOrConfig === "object") {
    // Validate the config object
    validateConfig(nameOrConfig);
    opts = nameOrConfig;
  } else {
    throw new TwsxClassNameError("twsxClassName first argument must be a string or object", {
      received: typeof nameOrConfig
    });
  }

  // Handle extend
  if (opts.extend) {
    opts = extendConfig(opts.extend, opts);
  }

  // Smart detection
  const hasSlots = "slots" in opts;
  const hasVariants = "variants" in opts;
  const isBasic = !hasSlots && !hasVariants;

  if (isBasic) {
    return generateBasicClassName(opts);
  }

  if (hasSlots) {
    return createSlots(opts);
  }

  if (hasVariants) {
    return createVariants(opts);
  }

  return generateBasicClassName(opts);
}

// ============================================================================
// Extend/Compose System
// ============================================================================

function extendConfig(base, extension) {
  // Get base config (from function's raw() or direct config)
  let baseConfig;
  if (typeof base === "function" && base.raw) {
    baseConfig = base.raw();
  } else if (typeof base === "object") {
    baseConfig = base;
  } else {
    return extension;
  }

  // Check cache
  const cacheKey = { base: baseConfig, extension };
  if (extendedConfigCache.has(base)) {
    const cached = extendedConfigCache.get(base);
    if (cached.extension === extension) {
      return cached.result;
    }
  }

  // Deep merge configs
  const result = deepMerge(baseConfig, extension);

  // Merge variants specially
  if (baseConfig.variants && extension.variants) {
    result.variants = {};
    for (const key of new Set([
      ...Object.keys(baseConfig.variants || {}),
      ...Object.keys(extension.variants || {})
    ])) {
      result.variants[key] = {
        ...(baseConfig.variants?.[key] || {}),
        ...(extension.variants?.[key] || {}),
      };
    }
  }

  // Merge compound variants
  if (baseConfig.compoundVariants || extension.compoundVariants) {
    result.compoundVariants = [
      ...(baseConfig.compoundVariants || []),
      ...(extension.compoundVariants || []),
    ];
  }

  // Cache result
  extendedConfigCache.set(base, { extension, result });

  return result;
}

/**
 * Extend an existing twsxClassName config
 */
twsxClassName.extend = function(base, extension) {
  const extendedConfig = extendConfig(base, extension);
  return twsxClassName(extendedConfig);
};

// ============================================================================
// Configuration Methods
// ============================================================================

twsxClassName.config = function(options) {
  globalConfig = { ...globalConfig, ...options };

  if (options.breakpoints) {
    BREAKPOINTS = { ...DEFAULT_BREAKPOINTS, ...options.breakpoints };
  }

  return globalConfig;
};

twsxClassName.getConfig = function() {
  return { ...globalConfig };
};

// ============================================================================
// Token System Methods
// ============================================================================

twsxClassName.defineTokens = function(tokens) {
  designTokens = deepMerge(designTokens, tokens);
  return designTokens;
};

twsxClassName.getTokens = function() {
  return { ...designTokens };
};

twsxClassName.setToken = function(path, value) {
  const parts = path.split(".");
  let current = designTokens;
  
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  
  current[parts[parts.length - 1]] = value;
};

// ============================================================================
// Theme System Methods
// ============================================================================

twsxClassName.createTheme = function(name, tokens) {
  themes[name] = tokens;
  return themes[name];
};

twsxClassName.setTheme = function(name) {
  if (themes[name]) {
    activeTheme = name;
    
    // Apply theme tokens to CSS variables
    if (IS_BROWSER) {
      const root = document.documentElement;
      for (const [key, value] of Object.entries(themes[name])) {
        if (typeof value === "string") {
          root.style.setProperty(`--${key}`, value);
        } else if (typeof value === "object") {
          for (const [subKey, subValue] of Object.entries(value)) {
            root.style.setProperty(`--${key}-${subKey}`, subValue);
          }
        }
      }
    }
  }
  return activeTheme;
};

twsxClassName.getTheme = function() {
  return activeTheme;
};

twsxClassName.getThemes = function() {
  return { ...themes };
};

// ============================================================================
// Animation Methods
// ============================================================================

twsxClassName.defineAnimation = function(name, animation) {
  ANIMATION_PRESETS[name] = animation;
};

twsxClassName.getAnimations = function() {
  return { ...ANIMATION_PRESETS };
};

// ============================================================================
// Cache Methods
// ============================================================================

twsxClassName.clearCache = function() {
  classNameCache.clear();
  cssCache.clear();
  styleRegistry.clear();

  if (IS_BROWSER) {
    const styleTag = document.getElementById("twsx-classname-style");
    if (styleTag) styleTag.textContent = "";
  }
};

twsxClassName.getCacheStats = function() {
  return {
    classNameCacheSize: classNameCache.size,
    cssCacheSize: cssCache.size,
    styleRegistrySize: styleRegistry.size,
  };
};

// ============================================================================
// SSR Support Methods
// ============================================================================

twsxClassName.getCSS = function(className) {
  return styleRegistry.get(className) || "";
};

twsxClassName.getAllCSS = function() {
  return [...styleRegistry.values()].join("\n");
};

twsxClassName.extractCSS = function() {
  const css = twsxClassName.getAllCSS();
  return `<style data-twsx-classname>${css}</style>`;
};

// ============================================================================
// Utility Methods
// ============================================================================

/**
 * Merge generated className with additional classes
 */
twsxClassName.merge = function(...args) {
  return cx(...args);
};

/**
 * Compose multiple twsxClassName configs
 */
twsxClassName.compose = function(...configs) {
  return configs.reduce((acc, config) => {
    if (typeof config === "function" && config.raw) {
      return deepMerge(acc, config.raw());
    }
    return deepMerge(acc, config);
  }, {});
};

// ============================================================================
// Atomic CSS Generator: tw()
// ============================================================================

const atomicCache = new Map();
const atomicStyleRegistry = new Map();

/**
 * tw() - Atomic CSS class generator
 * 
 * Generates reusable atomic CSS classes from Tailwind utilities.
 * Unlike tws() which returns inline styles, tw() returns class names
 * with auto-injected CSS that supports pseudo-classes and responsive.
 * 
 * @example
 * // Instead of: style="${tws('flex gap-3')}"  (inline, no pseudo)
 * // Use:        class="${tw('flex gap-3 hover:bg-gray-100')}"
 * 
 * // Returns: "tw-flex tw-gap-3 tw-hover-bg-gray-100"
 * // Auto-injects CSS for each atomic class
 */
function tw(classString) {
  if (!classString || typeof classString !== "string") return "";
  
  const trimmed = classString.trim();
  
  // Check full string cache first
  if (atomicCache.has(trimmed)) {
    return atomicCache.get(trimmed);
  }
  
  const classes = trimmed.split(/\s+/).filter(Boolean);
  const resultClasses = [];
  
  for (const cls of classes) {
    const atomicClass = generateAtomicClass(cls);
    if (atomicClass) {
      resultClasses.push(atomicClass);
    }
  }
  
  const result = resultClasses.join(" ");
  
  // Cache the full result
  atomicCache.set(trimmed, result);
  evictAtomicCache();
  
  return result;
}

function generateAtomicClass(utilityClass) {
  // Check if already generated
  if (atomicStyleRegistry.has(utilityClass)) {
    return atomicStyleRegistry.get(utilityClass).className;
  }
  
  // Parse the utility class for modifiers (hover:, md:, etc.)
  const { modifiers, baseClass } = parseUtilityModifiers(utilityClass);
  
  // Generate safe className (replace : and / with -)
  const safeClassName = "tw-" + utilityClass
    .replace(/:/g, "-")
    .replace(/\//g, "-")
    .replace(/\[/g, "_")
    .replace(/\]/g, "_")
    .replace(/\./g, "_");
  
  // Build CSS selector with modifiers
  let selector = `.${safeClassName.replace(/([[\]_.])/g, "\\$1")}`;
  let cssRule = "";
  
  if (modifiers.length > 0) {
    // Handle pseudo-classes and responsive
    const { pseudoClasses, breakpoint } = categorizeModifiers(modifiers);
    
    // Build selector with pseudo-classes
    if (pseudoClasses.length > 0) {
      selector += pseudoClasses.map(p => `:${p}`).join("");
    }
    
    // Get CSS for base class
    const baseCSS = twsx({ [selector]: baseClass }, { inject: false });
    
    // Wrap in media query if responsive
    if (breakpoint) {
      const bp = BREAKPOINTS[breakpoint];
      if (bp) {
        cssRule = `@media (min-width: ${bp}) { ${baseCSS} }`;
      } else {
        cssRule = baseCSS;
      }
    } else {
      cssRule = baseCSS;
    }
  } else {
    // No modifiers, simple class
    cssRule = twsx({ [selector]: utilityClass }, { inject: false });
  }
  
  // Store and inject
  atomicStyleRegistry.set(utilityClass, { className: safeClassName, css: cssRule });
  injectCSS(safeClassName, cssRule);
  
  return safeClassName;
}

function parseUtilityModifiers(utilityClass) {
  const parts = utilityClass.split(":");
  if (parts.length === 1) {
    return { modifiers: [], baseClass: utilityClass };
  }
  
  const baseClass = parts.pop();
  return { modifiers: parts, baseClass };
}

function categorizeModifiers(modifiers) {
  const pseudoClasses = [];
  let breakpoint = null;
  
  const responsiveBreakpoints = new Set(Object.keys(BREAKPOINTS));
  const pseudoMap = {
    hover: "hover",
    focus: "focus",
    active: "active",
    disabled: "disabled",
    "focus-visible": "focus-visible",
    "focus-within": "focus-within",
    visited: "visited",
    checked: "checked",
    required: "required",
    invalid: "invalid",
    first: "first-child",
    last: "last-child",
    odd: "nth-child(odd)",
    even: "nth-child(even)",
    "group-hover": null, // handled differently
    "peer-focus": null,
  };
  
  for (const mod of modifiers) {
    if (responsiveBreakpoints.has(mod)) {
      breakpoint = mod;
    } else if (pseudoMap[mod]) {
      pseudoClasses.push(pseudoMap[mod]);
    } else if (mod.startsWith("group-")) {
      // Group states: .group:hover .tw-class
      const state = mod.replace("group-", "");
      pseudoClasses.push(`group-${state}`);
    } else if (mod.startsWith("peer-")) {
      // Peer states: .peer:focus ~ .tw-class
      const state = mod.replace("peer-", "");
      pseudoClasses.push(`peer-${state}`);
    }
  }
  
  return { pseudoClasses, breakpoint };
}

function evictAtomicCache() {
  if (atomicCache.size <= MAX_CACHE_SIZE) return;
  const excess = atomicCache.size - MAX_CACHE_SIZE;
  const iter = atomicCache.keys();
  for (let i = 0; i < excess; i++) {
    atomicCache.delete(iter.next().value);
  }
}

// Attach tw to twsxClassName namespace
twsxClassName.tw = tw;

// ============================================================================
// Exports
// ============================================================================

export { twsxClassName, tw };
export default twsxClassName;
