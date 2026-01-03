/**
 * Build-time Conflict Resolver - Mimics tailwind-merge behavior
 * Resolves class conflicts during CSS generation instead of runtime
 */

import { logger } from "./logger.js";

/**
 * Tailwind conflict groups - classes in the same group override each other
 * Last class wins (same as twMerge behavior)
 */
const CONFLICT_GROUPS = {
  // Background - matches bg-transparent, bg-blue-500, bg-current, etc.
  "bg-color":
    /^bg-(transparent|current|black|white|inherit|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(-\d+)?$/,
  "bg-opacity": /^bg-opacity-\d+$/,

  // Text - matches text-transparent, text-blue-500, text-current, etc.
  "text-color":
    /^text-(transparent|current|black|white|inherit|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(-\d+)?$/,
  "text-opacity": /^text-opacity-\d+$/,
  "text-size": /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/,
  "text-align": /^text-(left|center|right|justify|start|end)$/,

  // Padding
  p: /^p-(\d+|px|0\.5|1\.5|2\.5|3\.5)$/,
  px: /^px-(\d+|px|0\.5|1\.5|2\.5|3\.5)$/,
  py: /^py-(\d+|px|0\.5|1\.5|2\.5|3\.5)$/,
  pt: /^pt-(\d+|px|0\.5|1\.5|2\.5|3\.5)$/,
  pr: /^pr-(\d+|px|0\.5|1\.5|2\.5|3\.5)$/,
  pb: /^pb-(\d+|px|0\.5|1\.5|2\.5|3\.5)$/,
  pl: /^pl-(\d+|px|0\.5|1\.5|2\.5|3\.5)$/,

  // Margin
  m: /^-?m-(auto|\d+|px|0\.5|1\.5|2\.5|3\.5)$/,
  mx: /^-?mx-(auto|\d+|px|0\.5|1\.5|2\.5|3\.5)$/,
  my: /^-?my-(auto|\d+|px|0\.5|1\.5|2\.5|3\.5)$/,
  mt: /^-?mt-(auto|\d+|px|0\.5|1\.5|2\.5|3\.5)$/,
  mr: /^-?mr-(auto|\d+|px|0\.5|1\.5|2\.5|3\.5)$/,
  mb: /^-?mb-(auto|\d+|px|0\.5|1\.5|2\.5|3\.5)$/,
  ml: /^-?ml-(auto|\d+|px|0\.5|1\.5|2\.5|3\.5)$/,

  // Width
  w: /^w-(\d+|px|auto|full|screen|min|max|fit|\d+\/\d+)$/,
  "min-w": /^min-w-(\d+|px|full|min|max|fit)$/,
  "max-w":
    /^max-w-(none|xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|full|min|max|fit|prose|screen-\w+)$/,

  // Height
  h: /^h-(\d+|px|auto|full|screen|min|max|fit|\d+\/\d+)$/,
  "min-h": /^min-h-(\d+|px|full|screen|min|max|fit)$/,
  "max-h": /^max-h-(\d+|px|full|screen|min|max|fit)$/,

  // Border
  border: /^border(-\d+)?$/,
  "border-x": /^border-x(-\d+)?$/,
  "border-y": /^border-y(-\d+)?$/,
  "border-t": /^border-t(-\d+)?$/,
  "border-r": /^border-r(-\d+)?$/,
  "border-b": /^border-b(-\d+)?$/,
  "border-l": /^border-l(-\d+)?$/,
  "border-color":
    /^border-(transparent|current|black|white|inherit|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(-\d+)?$/,
  "border-opacity": /^border-opacity-\d+$/,
  "border-style": /^border-(solid|dashed|dotted|double|hidden|none)$/,

  // Border Radius
  rounded: /^rounded(-\w+)?$/,
  "rounded-t": /^rounded-t(-\w+)?$/,
  "rounded-r": /^rounded-r(-\w+)?$/,
  "rounded-b": /^rounded-b(-\w+)?$/,
  "rounded-l": /^rounded-l(-\w+)?$/,
  "rounded-tl": /^rounded-tl(-\w+)?$/,
  "rounded-tr": /^rounded-tr(-\w+)?$/,
  "rounded-br": /^rounded-br(-\w+)?$/,
  "rounded-bl": /^rounded-bl(-\w+)?$/,

  // Shadow
  shadow: /^shadow(-\w+)?$/,

  // Opacity
  opacity: /^opacity-\d+$/,

  // Display
  display:
    /^(block|inline-block|inline|flex|inline-flex|table|inline-table|table-caption|table-cell|table-column|table-column-group|table-footer-group|table-header-group|table-row-group|table-row|flow-root|grid|inline-grid|contents|list-item|hidden)$/,

  // Position
  position: /^(static|fixed|absolute|relative|sticky)$/,
  top: /^-?top-(auto|\d+|px|0\.5|1\.5|2\.5|3\.5|1\/2|1\/3|2\/3|1\/4|2\/4|3\/4|full)$/,
  right:
    /^-?right-(auto|\d+|px|0\.5|1\.5|2\.5|3\.5|1\/2|1\/3|2\/3|1\/4|2\/4|3\/4|full)$/,
  bottom:
    /^-?bottom-(auto|\d+|px|0\.5|1\.5|2\.5|3\.5|1\/2|1\/3|2\/3|1\/4|2\/4|3\/4|full)$/,
  left: /^-?left-(auto|\d+|px|0\.5|1\.5|2\.5|3\.5|1\/2|1\/3|2\/3|1\/4|2\/4|3\/4|full)$/,
  inset:
    /^-?inset-(auto|\d+|px|0\.5|1\.5|2\.5|3\.5|1\/2|1\/3|2\/3|1\/4|2\/4|3\/4|full)$/,

  // Flexbox
  flex: /^flex(-\d+|-(auto|initial|none|1|row|row-reverse|col|col-reverse|wrap|wrap-reverse|nowrap))?$/,
  "flex-grow": /^flex-grow(-\d+)?$/,
  "flex-shrink": /^flex-shrink(-\d+)?$/,
  order: /^-?order-(\d+|first|last|none)$/,

  // Grid
  "grid-cols": /^grid-cols-(\d+|none)$/,
  "grid-rows": /^grid-rows-(\d+|none)$/,
  "col-span": /^col-span-(\d+|auto|full)$/,
  "row-span": /^row-span-(\d+|auto|full)$/,

  // Gap
  gap: /^gap-(\d+|px|0\.5|1\.5|2\.5|3\.5)$/,
  "gap-x": /^gap-x-(\d+|px|0\.5|1\.5|2\.5|3\.5)$/,
  "gap-y": /^gap-y-(\d+|px|0\.5|1\.5|2\.5|3\.5)$/,

  // Z-index
  z: /^-?z-(\d+|auto)$/,

  // Overflow
  overflow: /^overflow-(auto|hidden|clip|visible|scroll)$/,
  "overflow-x": /^overflow-x-(auto|hidden|clip|visible|scroll)$/,
  "overflow-y": /^overflow-y-(auto|hidden|clip|visible|scroll)$/,

  // Cursor
  cursor:
    /^cursor-(auto|default|pointer|wait|text|move|help|not-allowed|none|context-menu|progress|cell|crosshair|vertical-text|alias|copy|no-drop|grab|grabbing|all-scroll|col-resize|row-resize|n-resize|e-resize|s-resize|w-resize|ne-resize|nw-resize|se-resize|sw-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|zoom-in|zoom-out)$/,

  // Pointer Events
  "pointer-events": /^pointer-events-(none|auto)$/,

  // Font Weight
  "font-weight":
    /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/,

  // Font Family
  "font-family": /^font-(sans|serif|mono)$/,

  // Transform
  scale: /^scale-\d+$/,
  "scale-x": /^scale-x-\d+$/,
  "scale-y": /^scale-y-\d+$/,
  rotate: /^-?rotate-\d+$/,
  "translate-x":
    /^-?translate-x-(\d+|px|0\.5|1\.5|2\.5|3\.5|1\/2|1\/3|2\/3|1\/4|2\/4|3\/4|full)$/,
  "translate-y":
    /^-?translate-y-(\d+|px|0\.5|1\.5|2\.5|3\.5|1\/2|1\/3|2\/3|1\/4|2\/4|3\/4|full)$/,
  "skew-x": /^-?skew-x-\d+$/,
  "skew-y": /^-?skew-y-\d+$/,
};

/**
 * Parse a single class to determine its conflict group
 * @param {string} className - Tailwind class name
 * @returns {string|null} Conflict group name or null
 */
function getConflictGroup(className) {
  // Skip classes with modifiers (hover:, focus:, etc.) - they don't conflict with base state
  if (/^[a-z]+:/.test(className)) {
    return null;
  }

  // Remove important flag
  const cleanClass = className.replace(/^!/, "");

  // Check each conflict group
  for (const [groupName, pattern] of Object.entries(CONFLICT_GROUPS)) {
    if (pattern.test(cleanClass)) {
      return groupName;
    }
  }

  return null;
}

/**
 * Resolve class conflicts - last class in same conflict group wins
 * This mimics tailwind-merge behavior at build-time
 *
 * @param {string} baseClasses - Base variant classes
 * @param {string} compoundClasses - Compound variant classes
 * @returns {object} { resolvedBase, resolvedCompound, removedFromBase, conflictingGroups }
 */
export function resolveClassConflicts(baseClasses, compoundClasses) {
  if (!baseClasses || !compoundClasses) {
    return {
      resolvedBase: baseClasses || "",
      resolvedCompound: compoundClasses || "",
      removedFromBase: [],
      conflictingGroups: [],
    };
  }

  const baseArray = baseClasses.split(/\s+/).filter(Boolean);
  const compoundArray = compoundClasses.split(/\s+/).filter(Boolean);

  // Map compound classes by conflict group
  const compoundGroups = new Map();
  compoundArray.forEach((cls) => {
    const group = getConflictGroup(cls);
    if (group) {
      if (!compoundGroups.has(group)) {
        compoundGroups.set(group, []);
      }
      compoundGroups.get(group).push(cls);
    }
  });

  // Filter base classes - remove any that conflict with compound
  const removedFromBase = [];
  const conflictingGroups = [];

  const resolvedBaseArray = baseArray.filter((cls) => {
    const group = getConflictGroup(cls);
    if (group && compoundGroups.has(group)) {
      removedFromBase.push(cls);
      if (!conflictingGroups.includes(group)) {
        conflictingGroups.push(group);
      }
      logger.debug(
        `[Conflict Resolver] Removed "${cls}" from base (conflicts with compound group: ${group})`
      );
      return false; // Remove from base
    }
    return true; // Keep in base
  });

  return {
    resolvedBase: resolvedBaseArray.join(" "),
    resolvedCompound: compoundArray.join(" "),
    removedFromBase,
    conflictingGroups, // NEW: track which groups had conflicts
  };
}

/**
 * Merge multiple class strings resolving conflicts
 * Later classes override earlier ones (like twMerge)
 *
 * @param {...string} classStrings - Multiple class strings to merge
 * @returns {string} Merged classes with conflicts resolved
 */
export function mergeClasses(...classStrings) {
  const allClasses = [];
  const groupMap = new Map(); // group -> last class index

  // Collect all classes with their original order
  classStrings.forEach((str) => {
    if (!str) return;
    str
      .split(/\s+/)
      .filter(Boolean)
      .forEach((cls) => {
        allClasses.push(cls);
      });
  });

  // Build map of conflict groups to their last occurrence
  allClasses.forEach((cls, index) => {
    const group = getConflictGroup(cls);
    if (group) {
      // Update to latest index for this group
      if (!groupMap.has(group)) {
        groupMap.set(group, []);
      }
      groupMap.get(group).push(index);
    }
  });

  // Keep only the LAST class from each conflict group
  const indicesToKeep = new Set();
  groupMap.forEach((indices, group) => {
    // Keep only the last index
    const lastIndex = indices[indices.length - 1];
    indicesToKeep.add(lastIndex);
  });

  // Also keep all classes that don't belong to any conflict group
  allClasses.forEach((cls, index) => {
    const group = getConflictGroup(cls);
    if (!group) {
      indicesToKeep.add(index);
    }
  });

  // Filter and return
  const result = allClasses.filter((_, index) => indicesToKeep.has(index));

  logger.debug(
    `[Conflict Resolver] Merged classes: ${classStrings.join(" | ")} → ${result.join(" ")}`
  );

  return result.join(" ");
}

/**
 * Check if two classes are in the same conflict group
 * @param {string} class1
 * @param {string} class2
 * @returns {boolean}
 */
export function areClassesConflicting(class1, class2) {
  const group1 = getConflictGroup(class1);
  const group2 = getConflictGroup(class2);

  return group1 && group2 && group1 === group2;
}

/**
 * Add !important to conflicting classes in compound
 * This ensures compound overrides base even with same specificity
 *
 * @param {string} compoundClasses - Compound classes string
 * @param {Array} conflictingGroups - Array of conflict group names
 * @returns {string} Compound classes with !important added to conflicting ones
 */
export function injectImportantForConflicts(
  compoundClasses,
  conflictingGroups
) {
  if (!compoundClasses || conflictingGroups.length === 0) {
    return compoundClasses;
  }

  const classArray = compoundClasses.split(/\s+/).filter(Boolean);

  const processedClasses = classArray.map((cls) => {
    // Skip if already has !important
    if (cls.startsWith("!")) {
      return cls;
    }

    // Check if this class belongs to a conflicting group
    const group = getConflictGroup(cls);
    if (group && conflictingGroups.includes(group)) {
      // Add ! prefix to inject !important in CSS
      logger.debug(
        `[Conflict Resolver] Adding !important to "${cls}" (conflict group: ${group})`
      );
      return "!" + cls;
    }

    return cls;
  });

  return processedClasses.join(" ");
}
