/**
 * Tailwind Variants (tv) - Type-safe variant system
 * Inspired by tailwind-variants and cva
 *
 * @example
 * const button = tv({
 *   base: 'px-4 py-2 rounded-lg',
 *   variants: {
 *     color: {
 *       primary: 'bg-blue-500 text-white',
 *       secondary: 'bg-gray-500 text-white'
 *     },
 *     size: {
 *       sm: 'text-sm px-3 py-1.5',
 *       lg: 'text-lg px-6 py-3'
 *     }
 *   },
 *   compoundVariants: [
 *     {
 *       color: 'primary',
 *       size: 'lg',
 *       class: 'font-bold'
 *     }
 *   ],
 *   defaultVariants: {
 *     color: 'primary',
 *     size: 'sm'
 *   }
 * })
 *
 * // Usage
 * button({ color: 'primary', size: 'lg' })
 */

/**
 * Create a type-safe variant system for Tailwind classes
 * @param {Object} config - Variant configuration
 * @param {string} config.base - Base classes applied to all variants
 * @param {Object} config.variants - Variant definitions
 * @param {Array} config.compoundVariants - Compound variant rules
 * @param {Object} config.defaultVariants - Default variant values
 * @returns {Function} Function that returns className string based on props
 */
export function tv(config) {
  const {
    base = "",
    variants = {},
    compoundVariants = [],
    defaultVariants = {},
  } = config;

  const variantFunction = function (props = {}) {
    const classes = [base];

    // Apply default variants
    const appliedProps = { ...defaultVariants, ...props };

    // Apply variant classes
    Object.keys(variants).forEach((variantKey) => {
      const variantValue = appliedProps[variantKey];
      if (variantValue !== undefined && variants[variantKey][variantValue]) {
        classes.push(variants[variantKey][variantValue]);
      }
    });

    // Apply compound variants
    compoundVariants.forEach((compound) => {
      const { class: compoundClass, ...conditions } = compound;

      const matches = Object.keys(conditions).every((key) => {
        return appliedProps[key] === conditions[key];
      });

      if (matches && compoundClass) {
        classes.push(compoundClass);
      }
    });

    // Filter and join classes
    return classes.filter(Boolean).join(" ");
  };

  // Attach config and metadata to function for styled() to access
  variantFunction.config = config;
  variantFunction.base = base;
  variantFunction.variants = variants;
  variantFunction.compoundVariants = compoundVariants;
  variantFunction.defaultVariants = defaultVariants;
  variantFunction.variantKeys = Object.keys(variants);

  return variantFunction;
}

/**
 * Create multiple variants at once
 * @param {Object} configs - Object of variant configurations
 * @returns {Object} Object of variant functions
 */
export function createVariants(configs) {
  const result = {};
  Object.keys(configs).forEach((key) => {
    result[key] = tv(configs[key]);
  });
  return result;
}

export default tv;
