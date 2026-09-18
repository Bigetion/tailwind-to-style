/**
 * Shared Constants
 * 
 * All constant values used across the library.
 * Extracted from monolithic index.js for better maintainability.
 * 
 * @module shared/constants
 */

// ============================================================================
// Environment Detection
// ============================================================================

/**
 * True when running in a browser environment (window & document available)
 */
export const IS_BROWSER =
  typeof window !== "undefined" && typeof document !== "undefined";

/**
 * True when running in a server/Node.js environment
 */
export const IS_SERVER = !IS_BROWSER;

// ============================================================================
// Cache Size Limits
// ============================================================================

/**
 * Maximum number of entries in LRU caches (prevents memory leaks)
 */
export const MAX_CACHE_SIZE = 5000;

/**
 * Maximum number of entries in Set-based caches
 */
export const MAX_SET_SIZE = 10000;

// ============================================================================
// Built-in Animation Keyframes
// ============================================================================

/**
 * Mapping of animation names to their keyframe definitions
 */
export const BUILTIN_KEYFRAMES = {
  spin: {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  ping: {
    "75%, 100%": { transform: "scale(2)", opacity: "0" },
  },
  pulse: {
    "50%": { opacity: ".5" },
  },
  bounce: {
    "0%, 100%": {
      transform: "translateY(-25%)",
      animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
    },
    "50%": {
      transform: "none",
      animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
    },
  },
  fadeIn: {
    "0%": { opacity: "0" },
    "50%": { opacity: "1" },
    "100%": { opacity: "0" },
  },
  slideUp: {
    "0%": { transform: "translateY(20px)", opacity: "0" },
    "50%": { transform: "translateY(0)", opacity: "1" },
    "100%": { transform: "translateY(-20px)", opacity: "0" },
  },
};

// ============================================================================
// Regex Patterns
// ============================================================================

/**
 * Class parsing (includes . for decimal values like p-0.5)
 */
export const CLASS_PARSER_REGEX = /[\w.\-\/]+(?:\/\d+)?(?:\[[^\]]+\])?/g;

/**
 * Opacity modifiers
 */
export const OPACITY_MODIFIER_REGEX = /\/(\d+)$/;

/**
 * Opacity property patterns for substitution
 */
export const OPACITY_PROP_REGEXES = {
  "--text-opacity": /--text-opacity\s*:\s*[\d.]+/gi,
  "--bg-opacity": /--bg-opacity\s*:\s*[\d.]+/gi,
  "--border-opacity": /--border-opacity\s*:\s*[\d.]+/gi,
  "--ring-opacity": /--ring-opacity\s*:\s*[\d.]+/gi,
  "--placeholder-opacity": /--placeholder-opacity\s*:\s*[\d.]+/gi,
  "--divide-opacity": /--divide-opacity\s*:\s*[\d.]+/gi,
};

/**
 * CSS class parsing
 */
export const CSS_CLASS_REGEX = /([a-zA-Z0-9\-_\\/.]+)\s*{\s*([^}]+)\s*}/g;

/**
 * Backslash and special character handling
 */
export const DOUBLE_BACKSLASH_REGEX = /\\\\/g;
export const LEADING_UNDERSCORE_REGEX = /^_/;
export const MULTIPLE_SPACES_REGEX = /\s+/g;

/**
 * Bracket encoding/decoding
 */
export const BRACKET_CONTENT_REGEX = /\[([^\]]+)\]/g;
export const OPENING_PAREN_REGEX = /\(/g;
export const CLOSING_PAREN_REGEX = /\)/g;
export const ENCODED_PAREN_OPEN_REGEX = /__P__/g;
export const ENCODED_PAREN_CLOSE_REGEX = /__C__/g;

/**
 * Variant expansion
 */
export const DIRECTIVE_GROUP_REGEX = /(\w+)\(([^()]+)\)/g;
export const VARIANT_GROUP_REGEX = /(\w+):\(([^()]+(?:\((?:[^()]+)\))?[^()]*)\)/g;
export const WHITESPACE_SPLIT_REGEX = /\s+/;
export const VARIANT_COLON_SPLIT_REGEX = /:/;

/**
 * CSS variable resolution — supports nested parens in fallback (e.g. rgba(...))
 */
export const CSS_VAR_REGEX = /var\((--[\w-]+)(?:,\s*((?:[^()]+|\([^()]*\))*))?\)/g;
export const CAMEL_CASE_REGEX = /-([a-z])/g;

/**
 * Animation detection
 */
export const ANIMATION_NAME_REGEX = /animation(?:-name)?:\s*([a-zA-Z0-9-]+)/gi;

/**
 * Custom class detection
 */
export const CUSTOM_VALUE_BRACKET_REGEX = /\[([^\]]+)\]/;
export const CUSTOM_VALUE_FULL_REGEX = /^(.+?)\[(.+)\]$/;

/**
 * String splitting (CSS declarations)
 */
export const CSS_SEMICOLON_SPLIT_REGEX = /;/;
export const CSS_COLON_SPLIT_REGEX = /:/;

/**
 * Selector variants
 */
export const SELECTOR_VARIANT_REGEX = /c-(first|last|odd|even|\d+|not\([^)]+\))/g;
export const NOT_SELECTOR_REGEX = /^not\(([^)]+)\)$/;
export const DIGIT_ONLY_REGEX = /^\d+$/;

/**
 * Color property regex patterns (pre-compiled for each color property)
 * Used in processOpacityModifier for 50-100x performance improvement
 */
export const COLOR_PROPERTIES = [
  "color",
  "background-color",
  "border-color",
  "border-top-color",
  "border-right-color",
  "border-bottom-color",
  "border-left-color",
];

/**
 * CSS property name conversion
 */
export const UPPERCASE_LETTER_REGEX = /([A-Z])/g;

/**
 * Escape characters
 */
export const ESCAPE_SLASH_REGEX = /\//g;
export const ESCAPE_DOT_REGEX = /\./g;

// ============================================================================
// Tailwind Configuration Data
// ============================================================================

/**
 * Fraction denominators for width/height calculations
 */
export const fractionDenominators = [2, 3, 4, 5, 6, 12];

/**
 * Fraction-based utility prefixes
 */
export const fractionPrefixes = [
  "w-",
  "h-",
  "min-w-",
  "min-h-",
  "max-w-",
  "max-h-",
  "basis-",
  "top-",
  "right-",
  "bottom-",
  "left-",
  "inset-",
  "inset-x-",
  "inset-y-",
  "start-",
  "end-",
  "translate-x-",
  "translate-y-",
];

/**
 * Responsive breakpoints
 */
export const breakpoints = {
  sm: "@media (min-width: 640px)",
  md: "@media (min-width: 768px)",
  lg: "@media (min-width: 1024px)",
  xl: "@media (min-width: 1280px)",
  "2xl": "@media (min-width: 1536px)",
};

/**
 * Pseudo-class variants (hover, focus, etc.)
 */
export const pseudoVariants = new Set([
  "hover",
  "focus",
  "active",
  "disabled",
  "visited",
  "focus-within",
  "focus-visible",
  "checked",
  "required",
]);

/**
 * Special group/peer variants
 */
export const specialVariants = {
  group: (state, sel) => `.group:${state} ${sel}`,
  peer: (state, sel) => `.peer:${state} ~ ${sel}`,
  "group-hover": (state, sel) => `.group:hover ${sel}`,
};

/**
 * Selector-based variants (first, last, odd, even)
 */
export const selectorVariants = {
  first: () => "> :first-child",
  last: () => "> :last-child",
  odd: () => "> :nth-child(odd)",
  even: () => "> :nth-child(even)",
};
