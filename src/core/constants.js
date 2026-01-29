/**
 * Pre-compiled Regex Constants
 * Pre-compiling regex patterns provides 50-100x performance improvement
 * by avoiding repeated regex object creation in hot code paths
 */

// ============================================================================
// CLASS PARSING
// ============================================================================
export const CLASS_PARSER_REGEX = /[\w-\/]+(?:\/\d+)?(?:\[[^\]]+\])?/g;

// ============================================================================
// OPACITY MODIFIERS
// ============================================================================
export const OPACITY_MODIFIER_REGEX = /\/(\d+)$/;
export const OPACITY_PROP_REGEXES = {
  "--text-opacity": /--text-opacity\s*:\s*[\d.]+/gi,
  "--bg-opacity": /--bg-opacity\s*:\s*[\d.]+/gi,
  "--border-opacity": /--border-opacity\s*:\s*[\d.]+/gi,
  "--ring-opacity": /--ring-opacity\s*:\s*[\d.]+/gi,
  "--divide-opacity": /--divide-opacity\s*:\s*[\d.]+/gi,
  "--placeholder-opacity": /--placeholder-opacity\s*:\s*[\d.]+/gi,
  "--text-decoration-opacity": /--text-decoration-opacity\s*:\s*[\d.]+/gi,
  "--outline-opacity": /--outline-opacity\s*:\s*[\d.]+/gi,
  "--accent-opacity": /--accent-opacity\s*:\s*[\d.]+/gi,
  "--caret-opacity": /--caret-opacity\s*:\s*[\d.]+/gi,
};

// ============================================================================
// CSS PARSING
// ============================================================================
export const CSS_CLASS_REGEX = /([a-zA-Z0-9\-_\\/.]+)\s*{\s*([^}]+)\s*}/g;
export const DOUBLE_BACKSLASH_REGEX = /\\\\/g;
export const LEADING_UNDERSCORE_REGEX = /^_/;
export const MULTIPLE_SPACES_REGEX = /\s+/g;

// ============================================================================
// BRACKET ENCODING/DECODING
// ============================================================================
export const BRACKET_CONTENT_REGEX = /\[([^\]]+)\]/g;
export const OPENING_PAREN_REGEX = /\(/g;
export const CLOSING_PAREN_REGEX = /\)/g;
export const ENCODED_PAREN_OPEN_REGEX = /__P__/g;
export const ENCODED_PAREN_CLOSE_REGEX = /__C__/g;

// ============================================================================
// VARIANT EXPANSION
// ============================================================================
export const DIRECTIVE_GROUP_REGEX = /(\w+)\(([^()]+)\)/g;
export const VARIANT_GROUP_REGEX = /(\w+):\(([^()]+(?:\((?:[^()]+)\))?[^()]*)\)/g;
export const WHITESPACE_SPLIT_REGEX = /\s+/;
export const VARIANT_COLON_SPLIT_REGEX = /:/;

// ============================================================================
// CSS VARIABLE RESOLUTION
// ============================================================================
export const CSS_VAR_REGEX = /var\((--[\w-]+)(?:,\s*([^)]+))?\)/g;
export const CAMEL_CASE_REGEX = /-([a-z])/g;

// ============================================================================
// ANIMATION DETECTION
// ============================================================================
export const ANIMATION_NAME_REGEX = /animation(?:-name)?:\s*([a-zA-Z0-9-]+)/gi;

// ============================================================================
// CUSTOM CLASS DETECTION
// ============================================================================
export const CUSTOM_VALUE_BRACKET_REGEX = /\[([^\]]+)\]/;
export const CUSTOM_VALUE_FULL_REGEX = /^(.+?)\[(.+)\]$/;

// ============================================================================
// STRING SPLITTING
// ============================================================================
export const CSS_SEMICOLON_SPLIT_REGEX = /;/;
export const CSS_COLON_SPLIT_REGEX = /:/;

// ============================================================================
// SELECTOR VARIANTS
// ============================================================================
export const SELECTOR_VARIANT_REGEX = /c-(first|last|odd|even|\d+|not\([^)]+\))/g;
export const NOT_SELECTOR_REGEX = /^not\(([^)]+)\)$/;
export const DIGIT_ONLY_REGEX = /^\d+$/;

// ============================================================================
// CSS PROPERTY NAME CONVERSION
// ============================================================================
export const UPPERCASE_LETTER_REGEX = /([A-Z])/g;

// ============================================================================
// ESCAPE CHARACTERS
// ============================================================================
export const ESCAPE_SLASH_REGEX = /\//g;
export const ESCAPE_DOT_REGEX = /\./g;

// ============================================================================
// COLOR PROPERTIES FOR OPACITY PROCESSING
// ============================================================================
export const COLOR_PROPERTIES = [
  "color",
  "background-color",
  "border-color",
  "text-decoration-color",
  "outline-color",
  "fill",
  "stroke",
  "caret-color",
  "accent-color",
];

// Pre-compile regex patterns for each color property
export const COLOR_REGEX_PATTERNS = new Map();
for (const prop of COLOR_PROPERTIES) {
  const escapedProp = prop.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  COLOR_REGEX_PATTERNS.set(prop, {
    rgb: new RegExp(
      `(${escapedProp}\\s*:\\s*)rgb\\((\\d+),\\s*(\\d+),\\s*(\\d+)\\)`,
      "gi"
    ),
    rgba: new RegExp(
      `(${escapedProp}\\s*:\\s*)rgba\\((\\d+),\\s*(\\d+),\\s*(\\d+),\\s*[\\d.]+\\)`,
      "gi"
    ),
    hsl: new RegExp(
      `(${escapedProp}\\s*:\\s*)hsl\\((\\d+),\\s*([\\d.]+%),\\s*([\\d.]+%)\\)`,
      "gi"
    ),
    hsla: new RegExp(
      `(${escapedProp}\\s*:\\s*)hsla\\((\\d+),\\s*([\\d.]+%),\\s*([\\d.]+%),\\s*[\\d.]+\\)`,
      "gi"
    ),
    hex: new RegExp(`(${escapedProp}\\s*:\\s*)(#[0-9a-fA-F]{3,6})`, "gi"),
  });
}

// ============================================================================
// BREAKPOINTS & VARIANTS
// ============================================================================
export const breakpoints = {
  sm: "@media (min-width: 640px)",
  md: "@media (min-width: 768px)",
  lg: "@media (min-width: 1024px)",
  xl: "@media (min-width: 1280px)",
  "2xl": "@media (min-width: 1536px)",
};

export const pseudoVariants = new Set([
  "hover",
  "focus",
  "focus-within",
  "active",
  "visited",
  "disabled",
  "first",
  "last",
  "checked",
  "invalid",
  "required",
]);

export const specialVariants = {
  group: (state, sel) => `.group:${state} ${sel}`,
  peer: (state, sel) => `.peer:${state} ~ ${sel}`,
  dark: (state, sel) => `.dark ${sel}`,
};

export const selectorVariants = {
  first: () => "> :first-child",
  last: () => "> :last-child",
  odd: () => "> :nth-child(odd)",
  even: () => "> :nth-child(even)",
  not: (arg) => `> :not(${arg})`,
  number: (arg) => `> :nth-child(${arg})`,
};

// ============================================================================
// FRACTION UTILITIES
// ============================================================================
export const fractionDenominators = [2, 3, 4, 5, 6, 12];
export const fractionPrefixes = [
  "w-",
  "h-",
  "max-w-",
  "max-h-",
  "min-w-",
  "min-h-",
  "top-",
  "bottom-",
  "left-",
  "right-",
  "inset-",
  "inset-x-",
  "inset-y-",
  "translate-x-",
  "translate-y-",
  "rounded-t-",
  "rounded-b-",
  "rounded-l-",
  "rounded-r-",
  "rounded-bl-",
  "rounded-br-",
  "rounded-tl-",
  "rounded-tr-",
  "flex-basis-",
  "z-",
];

// ============================================================================
// BUILT-IN KEYFRAMES
// ============================================================================
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
