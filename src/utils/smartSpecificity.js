/**
 * Smart Specificity Handler for twsx Variants System
 * Handles CSS specificity conflicts intelligently without requiring !important
 */

import { logger } from "./logger.js";

/**
 * Calculate CSS specificity score
 * @param {string} selector - CSS selector
 * @returns {number} Specificity score
 */
function calculateSpecificity(selector) {
  // Remove pseudo-elements and pseudo-classes for calculation
  const cleanSelector = selector.replace(/:+[\w-]+(\([^)]*\))?/g, "");

  let score = 0;

  // Count IDs (100 points each)
  const ids = (cleanSelector.match(/#[\w-]+/g) || []).length;
  score += ids * 100;

  // Count classes, attributes, pseudo-classes (10 points each)
  const classes = (cleanSelector.match(/\.[\w-]+/g) || []).length;
  const attributes = (cleanSelector.match(/\[[^\]]*\]/g) || []).length;
  score += (classes + attributes) * 10;

  // Count elements (1 point each)
  const elements = (cleanSelector.match(/\b[a-z][\w-]*/g) || []).length;
  score += elements;

  return score;
}

/**
 * Generate CSS selector with appropriate specificity
 * @param {string} baseSelector - Base selector (e.g., '.btn')
 * @param {Array} variants - Array of variant classes (e.g., ['primary', 'outline'])
 * @param {Object} options - Options for specificity handling
 * @returns {string} Generated selector with proper specificity
 */
function generateSpecificSelector(baseSelector, variants = [], options = {}) {
  const {
    forceHighSpecificity = false,
    isCompound = false,
    targetSpecificity = null,
  } = options;

  // Base selector without dot
  const baseClass = baseSelector.replace(/^\./, "");

  if (variants.length === 0) {
    return baseSelector;
  }

  // For compound variants, we need higher specificity
  if (isCompound || forceHighSpecificity) {
    // Generate chained selector: .btn.btn-primary.btn-outline
    const variantSelectors = variants.map(
      (variant) => `.${baseClass}-${variant}`
    );
    return `${baseSelector}${variantSelectors.join("")}`;
  }

  // For regular variants, use simple approach
  const variantClass = variants[0];
  return `.${baseClass}-${variantClass}`;
}

/**
 * Smart CSS ordering based on specificity and dependency
 * @param {Object} cssRules - Object with selector -> CSS rules mapping
 * @returns {Array} Ordered array of {selector, css} objects
 */
function orderCssRules(cssRules) {
  const rules = Object.entries(cssRules).map(([selector, css]) => ({
    selector,
    css,
    specificity: calculateSpecificity(selector),
    isCompound: selector.split(".").length > 2, // More than base + one variant
    isVariant: selector.includes("-") && !selector.includes(" "),
  }));

  // Sort by specificity (lower first), then by compound status
  rules.sort((a, b) => {
    // Base classes first
    if (!a.isVariant && b.isVariant) return -1;
    if (a.isVariant && !b.isVariant) return 1;

    // Regular variants before compounds
    if (!a.isCompound && b.isCompound) return -1;
    if (a.isCompound && !b.isCompound) return 1;

    // Within same category, sort by specificity
    return a.specificity - b.specificity;
  });

  return rules;
}

/**
 * Enhanced variants processor with smart specificity handling
 * @param {string} selector - Base selector
 * @param {Object} variantsObj - Variants configuration
 * @param {Object} options - Processing options
 * @returns {Object} Processed CSS rules with proper specificity
 */
export function processVariantsWithSmartSpecificity(
  selector,
  variantsObj,
  options = {}
) {
  const {
    base,
    variants = {},
    compounds = [],
    defaultVariants = {},
  } = variantsObj;

  const { enableSmartSpecificity = true, preventImportant = true } = options;

  const cssRules = {};

  try {
    // Add base class
    cssRules[selector] = base;

    // Process individual variants with calculated specificity
    for (const [variantType, options] of Object.entries(variants)) {
      for (const [optionName, classes] of Object.entries(options)) {
        const variantSelector = generateSpecificSelector(
          selector,
          [optionName],
          { isCompound: false }
        );
        cssRules[variantSelector] = classes;
      }
    }

    // Process compound variants with higher specificity
    compounds.forEach((compound, index) => {
      try {
        const { class: compoundClass, ...conditions } = compound;

        if (!compoundClass) {
          logger.warn(`Compound variant ${index} missing 'class' property`);
          return;
        }

        // Extract variant names from conditions
        const variantNames = Object.values(conditions);

        // Generate high-specificity selector for compound
        const compoundSelector = generateSpecificSelector(
          selector,
          variantNames,
          {
            isCompound: true,
            forceHighSpecificity: enableSmartSpecificity,
          }
        );

        // Clean compound class - remove !important if preventImportant is true
        let cleanCompoundClass = compoundClass;
        if (preventImportant && enableSmartSpecificity) {
          cleanCompoundClass = compoundClass.replace(/\s*!important/g, "");
        }

        cssRules[compoundSelector] = cleanCompoundClass;
      } catch (error) {
        logger.error(`Error processing compound variant ${index}:`, error);
      }
    });

    // Apply smart ordering if enabled
    if (enableSmartSpecificity) {
      const orderedRules = orderCssRules(cssRules);
      const reorderedCssRules = {};

      orderedRules.forEach(({ selector, css }) => {
        reorderedCssRules[selector] = css;
      });

      logger.debug(`Smart specificity applied for ${selector}:`, {
        originalRules: Object.keys(cssRules).length,
        reorderedRules: Object.keys(reorderedCssRules).length,
        compoundCount: compounds.length,
      });

      return reorderedCssRules;
    }

    return cssRules;
  } catch (error) {
    logger.error(
      `Error processing variants with smart specificity for ${selector}:`,
      error
    );
    // Fallback to base only
    return { [selector]: base };
  }
}

/**
 * Analyze CSS conflicts and suggest fixes
 * @param {Object} cssRules - CSS rules object
 * @returns {Object} Analysis results with suggestions
 */
export function analyzeCssConflicts(cssRules) {
  const conflicts = [];
  const suggestions = [];

  const selectors = Object.keys(cssRules);

  // Check for specificity conflicts
  for (let i = 0; i < selectors.length; i++) {
    for (let j = i + 1; j < selectors.length; j++) {
      const sel1 = selectors[i];
      const sel2 = selectors[j];

      const spec1 = calculateSpecificity(sel1);
      const spec2 = calculateSpecificity(sel2);

      // Check if selectors might conflict
      if (
        sel1.includes(sel2.replace(/\./g, "")) ||
        sel2.includes(sel1.replace(/\./g, ""))
      ) {
        if (spec1 === spec2) {
          conflicts.push({
            type: "equal_specificity",
            selectors: [sel1, sel2],
            specificity: spec1,
            message: `Selectors have equal specificity (${spec1}), order matters`,
          });
        } else if (spec1 > spec2 && i > j) {
          suggestions.push({
            type: "reorder_suggestion",
            message: `Consider reordering: ${sel2} should come before ${sel1}`,
            selectors: [sel1, sel2],
          });
        }
      }
    }
  }

  return {
    conflicts,
    suggestions,
    hasIssues: conflicts.length > 0 || suggestions.length > 0,
  };
}

/**
 * Generate CSS with smart specificity handling
 * @param {Object} cssRules - CSS rules object
 * @param {Object} options - Generation options
 * @returns {string} Generated CSS string
 */
export function generateCssWithSmartSpecificity(cssRules, options = {}) {
  const {
    minify = true,
    addComments = false,
    analyzeConflicts = false,
  } = options;

  let css = "";

  // Analyze conflicts if requested
  if (analyzeConflicts) {
    const analysis = analyzeCssConflicts(cssRules);
    if (analysis.hasIssues && addComments) {
      css += "/* CSS Specificity Analysis */\n";
      analysis.conflicts.forEach((conflict) => {
        css += `/* CONFLICT: ${conflict.message} */\n`;
      });
      analysis.suggestions.forEach((suggestion) => {
        css += `/* SUGGESTION: ${suggestion.message} */\n`;
      });
      css += "\n";
    }
  }

  // Order rules by specificity
  const orderedRules = orderCssRules(cssRules);

  // Generate CSS
  orderedRules.forEach(({ selector, css: rules }) => {
    if (addComments) {
      const specificity = calculateSpecificity(selector);
      css += `/* ${selector} - Specificity: ${specificity} */\n`;
    }

    if (minify) {
      css += `${selector}{${rules.replace(/\s+/g, " ").trim()}}`;
    } else {
      css += `${selector} {\n  ${rules.replace(/;/g, ";\n  ").trim()}\n}\n\n`;
    }
  });

  return css;
}

export default {
  processVariantsWithSmartSpecificity,
  generateSpecificSelector,
  calculateSpecificity,
  orderCssRules,
  analyzeCssConflicts,
  generateCssWithSmartSpecificity,
};
