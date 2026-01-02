/**
 * Variants System Processor for twsx
 * Converts variants structure to classic twsx object format
 */

import { logger } from "./logger.js";

/**
 * Check if a value is a variants structure
 * @param {any} value - Value to check
 * @returns {boolean} True if it's a variants structure
 */
export function isVariantsStructure(value) {
  return (
    typeof value === 'object' && 
    value !== null && 
    !Array.isArray(value) &&
    'base' in value &&
    typeof value.base === 'string' &&
    // Ensure it's not existing nested structure (no & selectors)
    !Object.keys(value).some(key => key.includes('&'))
  );
}

/**
 * Process variants structure and convert to classic twsx format
 * @param {string} selector - CSS selector
 * @param {Object} variantsObj - Variants configuration object
 * @returns {Object} Classic twsx object format
 */
export function processVariants(selector, variantsObj) {
  const { 
    base, 
    variants = {}, 
    compounds = [], 
    defaultVariants = {} 
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
        const compoundSelector = selectorParts.join('');
        result[compoundSelector] = compoundClass;
        
      } catch (error) {
        logger.error(`Error processing compound variant ${index}:`, error);
      }
    });
    
    // Apply default variants if no specific variants are provided
    // This will be handled at the CSS generation level
    if (Object.keys(defaultVariants).length > 0) {
      // Store default variants info for later use
      result[`${selector}__defaults`] = defaultVariants;
    }
    
    logger.debug(`Processed variants for ${selector}:`, {
      baseSelector: selector,
      variantCount: Object.keys(variants).length,
      compoundCount: compounds.length,
      generatedSelectors: Object.keys(result).length
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
 * @returns {Object} Expanded object in classic twsx format
 */
export function expandVariantsObject(inputObj) {
  const expandedObj = {};
  
  for (const [selector, value] of Object.entries(inputObj)) {
    if (isVariantsStructure(value)) {
      // Process variants structure
      const expandedVariants = processVariants(selector, value);
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
  if (!variantsObj.base || typeof variantsObj.base !== 'string') {
    errors.push('Missing or invalid "base" property - must be a string');
  }
  
  // Validate variants structure
  if (variantsObj.variants) {
    if (typeof variantsObj.variants !== 'object') {
      errors.push('Invalid "variants" property - must be an object');
    } else {
      for (const [variantType, options] of Object.entries(variantsObj.variants)) {
        if (typeof options !== 'object' || Array.isArray(options)) {
          errors.push(`Invalid variant "${variantType}" - must be an object`);
        } else {
          for (const [optionName, classes] of Object.entries(options)) {
            if (typeof classes !== 'string') {
              errors.push(`Invalid variant option "${variantType}.${optionName}" - must be a string`);
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
        if (typeof compound !== 'object' || !compound.class) {
          errors.push(`Invalid compound ${index} - must have "class" property`);
        }
      });
    }
  }
  
  // Validate defaultVariants structure
  if (variantsObj.defaultVariants) {
    if (typeof variantsObj.defaultVariants !== 'object') {
      errors.push('Invalid "defaultVariants" property - must be an object');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}