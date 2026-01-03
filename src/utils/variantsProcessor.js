/**
 * Variants System Processor for twsx
 * Converts variants structure to classic twsx object format
 * Enhanced with Smart Specificity handling
 */

import { logger } from "./logger.js";
import { processVariantsWithSmartSpecificity } from "./smartSpecificity.js";

/**
 * Auto-detect if smart specificity is needed
 * @param {Object} variantsObj - Variants configuration object
 * @param {Array} compounds - Resolved compound variants array
 * @returns {boolean} True if smart specificity should be enabled
 */
function shouldUseSmartSpecificity(variantsObj, compounds = []) {
  const { variants = {} } = variantsObj;

  // Always enable if compound variants exist
  if (compounds.length > 0) {
    logger.debug("Smart specificity auto-enabled: compound variants detected");
    return true;
  }

  // Enable if multiple variant dimensions (potential conflicts)
  const variantCount = Object.keys(variants).length;
  if (variantCount > 1) {
    logger.debug(
      "Smart specificity auto-enabled: multiple variant dimensions detected"
    );
    return true;
  }

  // Enable if any variant has pseudo-classes (hover, focus, etc.)
  const hasPseudoClasses = Object.values(variants).some((options) =>
    Object.values(options).some(
      (classes) =>
        typeof classes === "string" &&
        (classes.includes("hover:") ||
          classes.includes("focus:") ||
          classes.includes("active:") ||
          classes.includes("disabled:"))
    )
  );

  if (hasPseudoClasses) {
    logger.debug("Smart specificity auto-enabled: pseudo-classes detected");
    return true;
  }

  // Disable for simple cases
  logger.debug("Smart specificity auto-disabled: simple variant structure");
  return false;
}

/**
 * Check if a value is a variants structure
 * @param {any} value - Value to check
 * @returns {boolean} True if it's a variants structure
 */
export function isVariantsStructure(value) {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    "base" in value &&
    typeof value.base === "string" &&
    // Ensure it's not existing nested structure (no & selectors)
    !Object.keys(value).some((key) => key.includes("&"))
  );
}

/**
 * Process variants structure and convert to classic twsx format
 * @param {string} selector - CSS selector
 * @param {Object} variantsObj - Variants configuration object
 * @param {Object} options - Processing options
 * @returns {Object} Classic twsx object format
 */
export function processVariants(selector, variantsObj, options = {}) {
  const {
    base,
    variants = {},
    compounds = [],
    compoundVariants = [], // NEW: Support both property names
    defaultVariants = {},
    smartSpecificity = "auto", // NEW: Auto-detect by default
  } = variantsObj;

  // Use compoundVariants if provided, fallback to compounds for backward compatibility
  const finalCompounds =
    compoundVariants.length > 0 ? compoundVariants : compounds;

  // Auto-detect smart specificity need
  let enableSmartSpecificity;
  if (smartSpecificity === "auto") {
    enableSmartSpecificity = shouldUseSmartSpecificity(
      variantsObj,
      finalCompounds
    );
  } else {
    enableSmartSpecificity = smartSpecificity !== false;
  }

  const processingOptions = {
    enableSmartSpecificity,
    preventImportant: true,
    ...options,
  };

  try {
    // Use smart specificity processor if enabled
    if (processingOptions.enableSmartSpecificity) {
      const smartResult = processVariantsWithSmartSpecificity(
        selector,
        { ...variantsObj, compounds: finalCompounds }, // Pass the resolved compounds
        processingOptions
      );

      // Add default variants info if present
      if (Object.keys(defaultVariants).length > 0) {
        smartResult[`${selector}__defaults`] = defaultVariants;
      }

      logger.debug(`Smart specificity processing completed for ${selector}:`, {
        baseSelector: selector,
        variantCount: Object.keys(variants).length,
        compoundCount: finalCompounds.length,
        generatedSelectors: Object.keys(smartResult).length,
        smartSpecificityEnabled: enableSmartSpecificity,
        autoDetected: smartSpecificity === "auto",
      });

      return smartResult;
    }

    // Fallback to original processing (legacy mode)
    return processVariantsLegacy(selector, {
      ...variantsObj,
      compounds: finalCompounds,
    });
  } catch (error) {
    logger.error(`Error processing variants for ${selector}:`, error);
    // Fallback to base only
    return { [selector]: base };
  }
}

/**
 * Legacy variants processing (original implementation)
 * @param {string} selector - CSS selector
 * @param {Object} variantsObj - Variants configuration object
 * @returns {Object} Classic twsx object format
 */
function processVariantsLegacy(selector, variantsObj) {
  const {
    base,
    variants = {},
    compounds = [],
    defaultVariants = {},
  } = variantsObj;

  const result = {};

  try {
    // Add base class
    result[selector] = base;

    // Process individual variants
    for (const [variantType, options] of Object.entries(variants)) {
      for (const [optionName, classes] of Object.entries(options)) {
        const variantSelector = `${selector}-${optionName}`;
        result[variantSelector] = classes;
      }
    }

    // Process compound variants
    compounds.forEach((compound, index) => {
      try {
        const { class: compoundClass, ...conditions } = compound;

        if (!compoundClass) {
          logger.warn(`Compound variant ${index} missing 'class' property`);
          return;
        }

        // Build compound selector
        const selectorParts = [selector];
        for (const [variantType, optionName] of Object.entries(conditions)) {
          selectorParts.push(`${selector}-${optionName}`);
        }

        // Create compound selector (e.g., ".btn.btn-primary.btn-outline")
        const compoundSelector = selectorParts.join("");
        result[compoundSelector] = compoundClass;
      } catch (error) {
        logger.error(`Error processing compound variant ${index}:`, error);
      }
    });

    // Apply default variants if no specific variants are provided
    if (Object.keys(defaultVariants).length > 0) {
      result[`${selector}__defaults`] = defaultVariants;
    }

    logger.debug(`Legacy variants processing completed for ${selector}:`, {
      baseSelector: selector,
      variantCount: Object.keys(variants).length,
      compoundCount: compounds.length,
      generatedSelectors: Object.keys(result).length,
      smartSpecificityEnabled: false,
    });
  } catch (error) {
    logger.error(`Error processing variants for ${selector}:`, error);
    // Fallback to base only
    result[selector] = base;
  }

  return result;
}

/**
 * Expand variants object to classic twsx format
 * @param {Object} inputObj - Input object that may contain variants
 * @param {Object} options - Processing options
 * @returns {Object} Expanded object in classic twsx format
 */
export function expandVariantsObject(inputObj, options = {}) {
  const expandedObj = {};

  for (const [selector, value] of Object.entries(inputObj)) {
    if (isVariantsStructure(value)) {
      // Process variants structure with options
      const expandedVariants = processVariants(selector, value, options);
      Object.assign(expandedObj, expandedVariants);
    } else {
      // Keep existing format as-is
      expandedObj[selector] = value;
    }
  }

  return expandedObj;
}

/**
 * Validate variants structure
 * @param {Object} variantsObj - Variants object to validate
 * @returns {Object} Validation result with isValid and errors
 */
export function validateVariantsStructure(variantsObj) {
  const errors = [];

  // Check required base property
  if (!variantsObj.base || typeof variantsObj.base !== "string") {
    errors.push('Missing or invalid "base" property - must be a string');
  }

  // Validate variants structure
  if (variantsObj.variants) {
    if (typeof variantsObj.variants !== "object") {
      errors.push('Invalid "variants" property - must be an object');
    } else {
      for (const [variantType, options] of Object.entries(
        variantsObj.variants
      )) {
        if (typeof options !== "object" || Array.isArray(options)) {
          errors.push(`Invalid variant "${variantType}" - must be an object`);
        } else {
          for (const [optionName, classes] of Object.entries(options)) {
            if (typeof classes !== "string") {
              errors.push(
                `Invalid variant option "${variantType}.${optionName}" - must be a string`
              );
            }
          }
        }
      }
    }
  }

  // Validate compounds structure
  if (variantsObj.compounds) {
    if (!Array.isArray(variantsObj.compounds)) {
      errors.push('Invalid "compounds" property - must be an array');
    } else {
      variantsObj.compounds.forEach((compound, index) => {
        if (typeof compound !== "object" || !compound.class) {
          errors.push(`Invalid compound ${index} - must have "class" property`);
        }
      });
    }
  }

  // Validate defaultVariants structure
  if (variantsObj.defaultVariants) {
    if (typeof variantsObj.defaultVariants !== "object") {
      errors.push('Invalid "defaultVariants" property - must be an object');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
