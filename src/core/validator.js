/**
 * Class Validation - Runtime validation for class names
 */

/**
 * Validation error class
 */
export class ValidationError extends Error {
  constructor(message, className, suggestions = []) {
    super(message);
    this.name = "ValidationError";
    this.className = className;
    this.suggestions = suggestions;
  }
}

/**
 * Valid Tailwind CSS patterns
 */
const VALID_PATTERNS = {
  // Layout
  display: /^(block|inline-block|inline|flex|inline-flex|grid|inline-grid|table|table-row|table-cell|hidden)$/,
  position: /^(static|fixed|absolute|relative|sticky)$/,
  
  // Flexbox
  flex: /^(flex-1|flex-auto|flex-initial|flex-none|flex-(row|col|row-reverse|col-reverse|wrap|wrap-reverse|nowrap))$/,
  justifyContent: /^justify-(start|end|center|between|around|evenly)$/,
  alignItems: /^items-(start|end|center|baseline|stretch)$/,
  alignContent: /^content-(start|end|center|between|around|evenly)$/,
  
  // Spacing
  spacing: /^(m|p)(t|r|b|l|x|y)?-(\d+\.?\d*|auto|\[.+\])$/,
  
  // Sizing
  width: /^w-(\d+\.?\d*|auto|full|screen|min|max|fit|\[.+\])$/,
  height: /^h-(\d+\.?\d*|auto|full|screen|min|max|fit|\[.+\])$/,
  
  // Typography
  fontSize: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|\[.+\])$/,
  fontWeight: /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black|\d+)$/,
  textAlign: /^text-(left|center|right|justify|start|end)$/,
  
  // Colors
  color: /^(text|bg|border)-(inherit|current|transparent|black|white|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(-\d+)?$/,
  
  // Border
  borderRadius: /^rounded(-none|-sm|-md|-lg|-xl|-2xl|-3xl|-full)?$/,
  borderWidth: /^border(-\d+)?$/,
  
  // Effects
  opacity: /^opacity-(\d+|\[.+\])$/,
  shadow: /^shadow(-sm|-md|-lg|-xl|-2xl|-inner|-none)?$/,
  
  // Variants
  variant: /^(hover|focus|active|disabled|visited|first|last|odd|even|group-hover|focus-within|focus-visible|motion-safe|motion-reduce|dark|sm|md|lg|xl|2xl):(.+)$/,
};

/**
 * Known Tailwind utilities
 */
const KNOWN_UTILITIES = new Set([
  // Layout
  "container",
  "block",
  "inline-block",
  "inline",
  "flex",
  "inline-flex",
  "grid",
  "inline-grid",
  "table",
  "hidden",
  
  // Position
  "static",
  "fixed",
  "absolute",
  "relative",
  "sticky",
  
  // Display
  "visible",
  "invisible",
  "collapse",
  
  // Float
  "float-right",
  "float-left",
  "float-none",
  "clear-left",
  "clear-right",
  "clear-both",
  "clear-none",
  
  // Object Fit
  "object-contain",
  "object-cover",
  "object-fill",
  "object-none",
  "object-scale-down",
  
  // Overflow
  "overflow-auto",
  "overflow-hidden",
  "overflow-visible",
  "overflow-scroll",
  "overflow-x-auto",
  "overflow-y-auto",
  
  // Z-Index
  "z-0",
  "z-10",
  "z-20",
  "z-30",
  "z-40",
  "z-50",
  "z-auto",
]);

/**
 * Validate single class name
 */
export function validateClassName(className) {
  // Remove variant prefix
  let baseClass = className;
  let variant = "";
  
  if (className.includes(":")) {
    const parts = className.split(":");
    variant = parts.slice(0, -1).join(":");
    baseClass = parts[parts.length - 1];
    
    // Validate variant
    if (!VALID_PATTERNS.variant.test(className)) {
      return {
        valid: false,
        error: `Invalid variant: ${variant}`,
        suggestions: ["hover", "focus", "active", "sm", "md", "lg", "dark"],
      };
    }
  }
  
  // Check if it's a known utility
  if (KNOWN_UTILITIES.has(baseClass)) {
    return { valid: true };
  }
  
  // Check against patterns
  for (const [category, pattern] of Object.entries(VALID_PATTERNS)) {
    if (pattern.test(baseClass)) {
      return { valid: true, category };
    }
  }
  
  // Arbitrary values
  if (baseClass.includes("[") && baseClass.includes("]")) {
    return { valid: true, category: "arbitrary" };
  }
  
  // Not valid
  return {
    valid: false,
    error: `Unknown utility class: ${baseClass}`,
    suggestions: getSuggestions(baseClass),
  };
}

/**
 * Get suggestions for invalid class
 */
function getSuggestions(className) {
  const suggestions = [];
  
  // Common typos
  const typos = {
    "flex-center": "justify-center items-center",
    "text-middle": "text-center",
    "bg-transparent": "bg-transparent",
    "font-size": "text-",
    "margin": "m-",
    "padding": "p-",
    "width": "w-",
    "height": "h-",
  };
  
  if (typos[className]) {
    suggestions.push(typos[className]);
  }
  
  // Similar classes
  const allClasses = Array.from(KNOWN_UTILITIES);
  for (const cls of allClasses) {
    if (levenshteinDistance(className, cls) <= 2) {
      suggestions.push(cls);
    }
  }
  
  return suggestions.slice(0, 5);
}

/**
 * Levenshtein distance for similarity
 */
function levenshteinDistance(a, b) {
  const matrix = [];
  
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[b.length][a.length];
}

/**
 * Validate multiple class names
 */
export function validateClasses(classNames) {
  const classes = classNames.trim().split(/\s+/);
  const results = {
    valid: true,
    errors: [],
    warnings: [],
    classes: [],
  };
  
  for (const cls of classes) {
    const result = validateClassName(cls);
    
    results.classes.push({
      className: cls,
      ...result,
    });
    
    if (!result.valid) {
      results.valid = false;
      results.errors.push({
        className: cls,
        error: result.error,
        suggestions: result.suggestions,
      });
    }
  }
  
  return results;
}

/**
 * Strict validation (throws on error)
 */
export function validateStrict(classNames) {
  const result = validateClasses(classNames);
  
  if (!result.valid) {
    const firstError = result.errors[0];
    throw new ValidationError(
      firstError.error,
      firstError.className,
      firstError.suggestions
    );
  }
  
  return result;
}

/**
 * Validation with warnings only
 */
export function validateWithWarnings(classNames) {
  const result = validateClasses(classNames);
  
  if (!result.valid) {
    result.errors.forEach((error) => {
      console.warn(
        `[TWS] Invalid class: ${error.className} - ${error.error}`,
        error.suggestions.length > 0
          ? `\nDid you mean: ${error.suggestions.join(", ")}`
          : ""
      );
    });
  }
  
  return result;
}

/**
 * Create validator with custom rules
 */
export function createValidator(customRules = {}) {
  const rules = { ...VALID_PATTERNS, ...customRules };
  
  return {
    validate: (className) => validateClassName(className),
    validateAll: (classNames) => validateClasses(classNames),
    strict: (classNames) => validateStrict(classNames),
    warn: (classNames) => validateWithWarnings(classNames),
    addRule: (name, pattern) => {
      rules[name] = pattern;
    },
    removeRule: (name) => {
      delete rules[name];
    },
  };
}

/**
 * Check for conflicts
 */
export function checkConflicts(classNames) {
  const classes = classNames.trim().split(/\s+/);
  const conflicts = [];
  const propertyMap = new Map();
  
  for (const cls of classes) {
    const validation = validateClassName(cls);
    if (!validation.valid) continue;
    
    const category = validation.category || "unknown";
    
    if (!propertyMap.has(category)) {
      propertyMap.set(category, []);
    }
    propertyMap.get(category).push(cls);
  }
  
  for (const [category, classList] of propertyMap.entries()) {
    if (classList.length > 1) {
      conflicts.push({
        category,
        classes: classList,
        message: `Multiple ${category} utilities detected`,
      });
    }
  }
  
  return conflicts;
}

/**
 * Auto-fix common issues
 */
export function autoFix(classNames) {
  const classes = classNames.trim().split(/\s+/);
  const fixed = [];
  const changes = [];
  
  for (const cls of classes) {
    let fixedClass = cls;
    
    // Common fixes
    const fixes = {
      "flex-center": "justify-center items-center",
      "text-middle": "text-center",
      "margin-": "m-",
      "padding-": "p-",
    };
    
    for (const [wrong, right] of Object.entries(fixes)) {
      if (cls === wrong) {
        fixedClass = right;
        changes.push({ original: cls, fixed: right });
        break;
      }
    }
    
    if (fixedClass.includes(" ")) {
      fixed.push(...fixedClass.split(" "));
    } else {
      fixed.push(fixedClass);
    }
  }
  
  return {
    classes: fixed.join(" "),
    changes,
  };
}

/**
 * Create validation report
 */
export function createReport(classNames) {
  const validation = validateClasses(classNames);
  const conflicts = checkConflicts(classNames);
  
  return {
    ...validation,
    conflicts,
    summary: {
      total: validation.classes.length,
      valid: validation.classes.filter((c) => c.valid).length,
      invalid: validation.errors.length,
      conflicts: conflicts.length,
    },
  };
}

/**
 * Default validator instance
 */
export const validator = createValidator();
