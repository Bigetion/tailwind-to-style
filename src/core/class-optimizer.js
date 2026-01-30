/**
 * Class Name Optimizer
 * Removes duplicates, resolves conflicts, and optimizes class ordering
 */

import { parseClassName } from "./parser.js";

/**
 * Priority map for CSS properties (higher = more specific)
 */
const PROPERTY_PRIORITY = {
  // Layout
  display: 100,
  position: 95,
  top: 90,
  right: 90,
  bottom: 90,
  left: 90,
  zIndex: 85,

  // Flexbox/Grid
  flexDirection: 80,
  flexWrap: 80,
  justifyContent: 75,
  alignItems: 75,
  alignContent: 75,
  gridTemplateColumns: 80,
  gridTemplateRows: 80,
  gap: 75,

  // Box Model
  width: 70,
  height: 70,
  minWidth: 68,
  maxWidth: 68,
  minHeight: 68,
  maxHeight: 68,
  margin: 65,
  marginTop: 66,
  marginRight: 66,
  marginBottom: 66,
  marginLeft: 66,
  padding: 60,
  paddingTop: 61,
  paddingRight: 61,
  paddingBottom: 61,
  paddingLeft: 61,

  // Border
  border: 55,
  borderWidth: 56,
  borderStyle: 56,
  borderColor: 56,
  borderRadius: 54,

  // Background
  backgroundColor: 50,
  backgroundImage: 50,
  backgroundSize: 48,
  backgroundPosition: 48,

  // Typography
  fontSize: 45,
  fontWeight: 44,
  lineHeight: 43,
  color: 42,
  textAlign: 41,
  textDecoration: 40,

  // Effects
  opacity: 35,
  boxShadow: 34,
  transform: 33,
  transition: 32,
  filter: 31,
  backdropFilter: 30,

  // Pseudo states
  cursor: 25,
  pointerEvents: 24,
  userSelect: 23,

  // Default
  DEFAULT: 20,
};

/**
 * Get property priority
 */
function getPropertyPriority(property) {
  return PROPERTY_PRIORITY[property] || PROPERTY_PRIORITY.DEFAULT;
}

/**
 * Extract CSS property from class name
 */
function extractCssProperty(className) {
  // Remove variants
  const baseClass = className.split(":").pop();

  // Property mapping
  const propertyMap = {
    // Layout
    flex: "display",
    block: "display",
    inline: "display",
    grid: "display",
    hidden: "display",
    absolute: "position",
    relative: "position",
    fixed: "position",
    sticky: "position",

    // Sizing
    w: "width",
    h: "height",
    "min-w": "minWidth",
    "max-w": "maxWidth",
    "min-h": "minHeight",
    "max-h": "maxHeight",

    // Spacing
    m: "margin",
    mt: "marginTop",
    mr: "marginRight",
    mb: "marginBottom",
    ml: "marginLeft",
    mx: "marginX",
    my: "marginY",
    p: "padding",
    pt: "paddingTop",
    pr: "paddingRight",
    pb: "paddingBottom",
    pl: "paddingLeft",
    px: "paddingX",
    py: "paddingY",

    // Border
    border: "border",
    "border-t": "borderTop",
    "border-r": "borderRight",
    "border-b": "borderBottom",
    "border-l": "borderLeft",
    rounded: "borderRadius",

    // Background
    bg: "backgroundColor",

    // Text
    text: "fontSize",
    font: "fontWeight",
    leading: "lineHeight",

    // Effects
    opacity: "opacity",
    shadow: "boxShadow",
  };

  // Find matching property
  for (const [prefix, property] of Object.entries(propertyMap)) {
    if (baseClass.startsWith(prefix)) {
      return property;
    }
  }

  return "DEFAULT";
}

/**
 * Remove duplicate classes
 * @param {string} classNames - Space-separated class names
 * @returns {string} - Deduplicated classes
 */
export function removeDuplicates(classNames) {
  const classes = classNames.trim().split(/\s+/);
  const seen = new Set();
  const result = [];

  for (const cls of classes) {
    if (!seen.has(cls)) {
      seen.add(cls);
      result.push(cls);
    }
  }

  return result.join(" ");
}

/**
 * Resolve class conflicts (last one wins)
 * @param {string} classNames - Space-separated class names
 * @returns {string} - Resolved classes
 */
export function resolveConflicts(classNames) {
  const classes = classNames.trim().split(/\s+/);
  const propertyMap = new Map();

  // Group by property
  for (const cls of classes) {
    const property = extractCssProperty(cls);
    const variant = cls.includes(":") ? cls.split(":").slice(0, -1).join(":") : "";
    const key = `${variant}:${property}`;

    // Last one wins
    propertyMap.set(key, cls);
  }

  return Array.from(propertyMap.values()).join(" ");
}

/**
 * Sort classes by property priority
 * @param {string} classNames - Space-separated class names
 * @returns {string} - Sorted classes
 */
export function sortByPriority(classNames) {
  const classes = classNames.trim().split(/\s+/);

  return classes
    .sort((a, b) => {
      const propA = extractCssProperty(a);
      const propB = extractCssProperty(b);
      return getPropertyPriority(propB) - getPropertyPriority(propA);
    })
    .join(" ");
}

/**
 * Optimize class names (remove duplicates + resolve conflicts)
 * @param {string} classNames - Space-separated class names
 * @param {Object} options - Optimization options
 * @returns {string} - Optimized classes
 */
export function optimizeClasses(classNames, options = {}) {
  const {
    removeDups = true,
    resolveConflict = true,
    sort = false,
    minify = false,
  } = options;

  let result = classNames;

  if (removeDups) {
    result = removeDuplicates(result);
  }

  if (resolveConflict) {
    result = resolveConflicts(result);
  }

  if (sort) {
    result = sortByPriority(result);
  }

  if (minify) {
    result = result.replace(/\s+/g, " ").trim();
  }

  return result;
}

/**
 * Find conflicting classes
 * @param {string} classNames - Space-separated class names
 * @returns {Array<{property: string, classes: string[]}>} - Conflicts
 */
export function findConflicts(classNames) {
  const classes = classNames.trim().split(/\s+/);
  const propertyMap = new Map();
  const conflicts = [];

  for (const cls of classes) {
    const property = extractCssProperty(cls);
    const variant = cls.includes(":") ? cls.split(":").slice(0, -1).join(":") : "";
    const key = `${variant}:${property}`;

    if (!propertyMap.has(key)) {
      propertyMap.set(key, []);
    }
    propertyMap.get(key).push(cls);
  }

  for (const [key, classes] of propertyMap.entries()) {
    if (classes.length > 1) {
      const [variant, property] = key.split(":");
      conflicts.push({
        property,
        variant: variant || "base",
        classes,
        winner: classes[classes.length - 1],
      });
    }
  }

  return conflicts;
}

/**
 * Analyze class usage
 * @param {string} classNames - Space-separated class names
 * @returns {Object} - Usage statistics
 */
export function analyzeClasses(classNames) {
  const classes = classNames.trim().split(/\s+/);
  const stats = {
    total: classes.length,
    unique: new Set(classes).size,
    duplicates: classes.length - new Set(classes).size,
    conflicts: findConflicts(classNames).length,
    variants: {},
    properties: {},
  };

  for (const cls of classes) {
    // Count variants
    if (cls.includes(":")) {
      const variant = cls.split(":")[0];
      stats.variants[variant] = (stats.variants[variant] || 0) + 1;
    }

    // Count properties
    const property = extractCssProperty(cls);
    stats.properties[property] = (stats.properties[property] || 0) + 1;
  }

  return stats;
}

/**
 * Merge class names intelligently
 * @param {...string} classNames - Class name strings to merge
 * @returns {string} - Merged and optimized classes
 */
export function mergeClasses(...classNames) {
  const merged = classNames.filter(Boolean).join(" ");
  return optimizeClasses(merged, {
    removeDups: true,
    resolveConflict: true,
    sort: false,
    minify: true,
  });
}

/**
 * Create class optimizer instance
 */
export function createOptimizer(defaultOptions = {}) {
  return {
    optimize: (classNames, options) =>
      optimizeClasses(classNames, { ...defaultOptions, ...options }),
    removeDuplicates,
    resolveConflicts,
    sortByPriority,
    findConflicts,
    analyzeClasses,
    mergeClasses,
  };
}

/**
 * Default optimizer instance
 */
export const classOptimizer = createOptimizer();
