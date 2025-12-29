/**
 * styled() - Component factory for tailwind-to-style
 * Create styled components with Tailwind classes and variants
 *
 * @example
 * const Button = styled('button', {
 *   base: 'px-4 py-2 rounded-lg',
 *   hover: 'bg-blue-600',
 *   variants: {
 *     color: {
 *       primary: 'bg-blue-500 text-white',
 *       secondary: 'bg-gray-500 text-white'
 *     }
 *   },
 *   nested: {
 *     '.icon': 'w-4 h-4'
 *   }
 * })
 */

import React, { useMemo } from "react";
import { useTwsx } from "./useTwsx.js";
import { getConfig } from "../config/userConfig.js";

/**
 * Simple hash function for deterministic class names
 * @param {string} str - String to hash
 * @param {number} length - Length of hash (default: 6)
 * @returns {string} Hash string
 */
function simpleHash(str, length = 6) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36).substr(0, length);
}

/**
 * Generate deterministic class name based on config and component instance
 * @param {Object|Function} config - Style configuration
 * @param {string} componentType - Component type (e.g., 'button', 'div')
 * @param {string} instanceId - Unique instance identifier (optional)
 * @param {Object} options - Naming options (prefix, separator, etc)
 * @returns {string} Deterministic class name
 */
function generateClassName(
  config,
  componentType = "component",
  instanceId = null,
  options = {}
) {
  // Get global config
  const globalConfig = getConfig();
  const styledConfig = globalConfig.styled || {};

  // Merge options with global config (options override global)
  const {
    prefix = styledConfig.prefix || "twsx",
    separator = styledConfig.separator || "-",
    hashLength = styledConfig.hashLength || 6,
    includeComponentName = styledConfig.includeComponentName !== false,
  } = options;

  // If config is a function (from tv()), use its string representation
  const configStr =
    typeof config === "function" ? config.toString() : JSON.stringify(config);

  // Include instanceId in hash to ensure uniqueness per component
  const hashInput = configStr + componentType + (instanceId || "");
  const hash = simpleHash(hashInput, hashLength);

  // Build class name parts
  const parts = [prefix];
  
  if (includeComponentName) {
    parts.push(componentType);
  }
  
  parts.push(hash);
  
  if (instanceId) {
    parts.push(instanceId);
  }

  return parts.join(separator);
}

/**
 * Get variant prefix from config or options
 * @param {Object} namingOptions - Naming options
 * @returns {string} Variant prefix
 */
function getVariantPrefix(namingOptions = {}) {
  const globalConfig = getConfig();
  const styledConfig = globalConfig.styled || {};
  const prefix = namingOptions.prefix || styledConfig.prefix || "twsx";
  const separator = namingOptions.separator || styledConfig.separator || "-";
  return `${prefix}${separator}`;
}

/**
 * Create a styled component with Tailwind classes
 * @param {string|React.Component} component - HTML tag or React component
 * @param {Object} config - Style configuration
 * @param {Object} options - Additional options
 * @param {string} options.scope - Component scope for isolation (optional)
 * @param {boolean} options.isolate - Whether to isolate from other components (default: false)
 * @param {string} options.prefix - Custom prefix for classnames (default: from global config)
 * @param {string} options.separator - Custom separator (default: from global config)
 * @param {number} options.hashLength - Custom hash length (default: from global config)
 * @param {boolean} options.includeComponentName - Include component name in classname (default: from global config)
 * @param {string} options.displayName - Custom display name for component (optional)
 * @returns {React.Component} Styled component
 */
export function styled(component, config = {}, options = {}) {
  const { 
    scope = null, 
    isolate = false,
    prefix,
    separator,
    hashLength,
    includeComponentName,
    displayName,
  } = options;

  // Extract naming options
  const namingOptions = {
    ...(prefix !== undefined && { prefix }),
    ...(separator !== undefined && { separator }),
    ...(hashLength !== undefined && { hashLength }),
    ...(includeComponentName !== undefined && { includeComponentName }),
  };

  // Generate unique instance ID for isolation - FIXED: Always use scope when provided
  const instanceId =
    scope ||
    (isolate
      ? `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      : null);

  // Handle if config is a function from tv()
  if (typeof config === "function") {
    const tvFunction = config;

    // Generate deterministic class name based on component and config
    const componentType =
      typeof component === "string" ? component : "component";
    const componentId = generateClassName(config, componentType, instanceId, namingOptions);
    const baseClassName = `.${componentId}`;

    // Create styled component
    const StyledComponent = React.forwardRef((props, ref) => {
      const { as, className: userClassName, children, ...restProps } = props;

      // Get variant keys and defaults from TV function
      const variantKeys = tvFunction.variantKeys || [];
      const defaultVariants = tvFunction.defaultVariants || {};

      // Separate variant props from DOM props
      const variantProps = {};
      const componentProps = {};

      Object.keys(restProps).forEach((key) => {
        if (variantKeys.includes(key)) {
          variantProps[key] = restProps[key];
        } else {
          componentProps[key] = restProps[key];
        }
      });

      // Apply default variants for keys not provided in props
      const finalVariantProps = { ...defaultVariants, ...variantProps };

      // Generate variant class names with configurable prefix
      const variantPrefix = getVariantPrefix(namingOptions);
      const variantClassNames = [];
      Object.entries(finalVariantProps).forEach(([key, value]) => {
        if (value) {
          variantClassNames.push(`${variantPrefix}${key}${separator || "-"}${value}`);
        }
      });

      // Build nested styles object like twsx() format (nested structure)
      const styles = useMemo(() => {
        const styleObj = {};

        // Access raw config from tvFunction
        const {
          base = "",
          variants = {},
          compoundVariants = [],
        } = tvFunction.config || {};

        // Build nested structure: base + nested variants
        const nestedVariants = {};

        // 1. Generate INDIVIDUAL variant styles as nested selectors
        Object.entries(variants).forEach(([variantKey, variantValues]) => {
          Object.entries(variantValues).forEach(
            ([variantValue, variantClasses]) => {
              const variantPrefix = getVariantPrefix(namingOptions);
              const sep = namingOptions.separator || styledConfig.separator || "-";
              const variantSelector = `&.${variantPrefix}${variantKey}${sep}${variantValue}`;

              if (variantClasses && variantClasses.trim()) {
                nestedVariants[variantSelector] = variantClasses;
              }
            }
          );
        });

        // 2. Generate COMPOUND VARIANT styles as nested selectors
        compoundVariants.forEach((compound) => {
          const { class: compoundClass, ...conditions } = compound;

          // Build selector with all condition classes
          const variantPrefix = getVariantPrefix(namingOptions);
          const sep = namingOptions.separator || styledConfig.separator || "-";
          const conditionClasses = Object.entries(conditions)
            .map(([key, value]) => `${variantPrefix}${key}${sep}${value}`)
            .join(".");

          const compoundSelector = `&.${conditionClasses}`;

          if (compoundClass && compoundClass.trim()) {
            nestedVariants[compoundSelector] = compoundClass;
          }
        });

        // 3. Build final structure: [base, { nested variants }]
        // This matches the twsx() format exactly
        const styleArray = [];

        if (base.trim()) {
          styleArray.push(base);
        }

        if (Object.keys(nestedVariants).length > 0) {
          styleArray.push(nestedVariants);
        }

        if (styleArray.length > 0) {
          styleObj[baseClassName] = styleArray;
        }

        return styleObj;
      }, []); // Empty deps - only generate once

      // Inject styles
      useTwsx(styles);

      // Determine component to render
      const Component = as || component;

      // Combine all class names
      const finalClassName = [componentId, ...variantClassNames, userClassName]
        .filter(Boolean)
        .join(" ");

      return React.createElement(
        Component,
        { ref, className: finalClassName, ...componentProps },
        children
      );
    });

    StyledComponent.displayName = displayName || `Styled(${
      typeof component === "string"
        ? component
        : component.displayName || component.name || "Component"
    })`;

    return StyledComponent;
  }

  // Original object-based config handling
  const {
    base = "",
    hover = "",
    active = "",
    focus = "",
    disabled = "",
    variants = {},
    nested = {},
    defaultVariants = {},
    compoundVariants = [],
  } = config;

  // Generate deterministic class name based on component and config
  const componentType = typeof component === "string" ? component : "component";
  const componentId = generateClassName(config, componentType, instanceId, namingOptions);
  const className = `.${componentId}`;

  // Create styled component
  const StyledComponent = React.forwardRef((props, ref) => {
    const { as, className: userClassName, children, ...restProps } = props;

    // Extract variant props
    const variantProps = {};
    const componentProps = {};

    Object.keys(restProps).forEach((key) => {
      if (variants[key]) {
        variantProps[key] = restProps[key];
      } else {
        componentProps[key] = restProps[key];
      }
    });

    // Apply default variants
    const appliedVariantProps = { ...defaultVariants, ...variantProps };

    // Generate variant class names with configurable prefix
    const variantPrefix = getVariantPrefix(namingOptions);
    const sep = namingOptions.separator || styledConfig.separator || "-";
    const variantClassNames = [];
    Object.entries(appliedVariantProps).forEach(([key, value]) => {
      if (value) {
        variantClassNames.push(`${variantPrefix}${key}${sep}${value}`);
      }
    });

    // Build twsx styles object with nested structure
    const styles = useMemo(() => {
      const styleObj = {};

      // Build nested variants structure
      const nestedVariants = {};

      // Generate variant selectors
      Object.entries(variants).forEach(([variantKey, variantValues]) => {
        Object.entries(variantValues).forEach(
          ([variantValue, variantClasses]) => {
            const variantPrefix = getVariantPrefix(namingOptions);
            const sep = namingOptions.separator || styledConfig.separator || "-";
            const variantSelector = `&.${variantPrefix}${variantKey}${sep}${variantValue}`;

            if (variantClasses && variantClasses.trim()) {
              nestedVariants[variantSelector] = variantClasses;
            }
          }
        );
      });

      // Generate compound variant selectors
      compoundVariants.forEach((compound) => {
        const { className: compoundClass, ...conditions } = compound;

        // Build selector with :not() for false values
        const positiveConditions = [];
        const negativeConditions = [];
        const variantPrefix = getVariantPrefix(namingOptions);
        const sep = namingOptions.separator || styledConfig.separator || "-";

        Object.entries(conditions).forEach(([key, value]) => {
          if (value === false) {
            negativeConditions.push(`${variantPrefix}${key}${sep}true`);
          } else {
            positiveConditions.push(`${variantPrefix}${key}${sep}${value}`);
          }
        });

        // Build compound selector
        let compoundSelector = "&";
        if (positiveConditions.length > 0) {
          compoundSelector += "." + positiveConditions.join(".");
        }
        if (negativeConditions.length > 0) {
          negativeConditions.forEach((negClass) => {
            compoundSelector += `:not(.${negClass})`;
          });
        }

        if (compoundClass && compoundClass.trim()) {
          nestedVariants[compoundSelector] = compoundClass;
        }
      });

      // Build final nested structure: [base, { nested variants }]
      const styleArray = [];

      if (base.trim()) {
        styleArray.push(base);
      }

      // Add pseudo-state classes to nested
      const pseudoStates = {};
      if (hover) pseudoStates["&:hover"] = hover;
      if (active) pseudoStates["&:active"] = active;
      if (focus) pseudoStates["&:focus"] = focus;
      if (disabled) pseudoStates["&:disabled"] = disabled;

      // Merge nested variants, pseudo states, and custom nested
      const allNested = {
        ...nestedVariants,
        ...pseudoStates,
        ...nested,
      };

      if (Object.keys(allNested).length > 0) {
        styleArray.push(allNested);
      }

      if (styleArray.length > 0) {
        styleObj[className] = styleArray;
      }

      return styleObj;
    }, []); // Empty deps - only generate once

    // Inject styles
    useTwsx(styles);

    // Determine component to render
    const Component = as || component;

    // Combine class names with variant classes
    const finalClassName = [componentId, ...variantClassNames, userClassName]
      .filter(Boolean)
      .join(" ");

    return React.createElement(
      Component,
      { ref, className: finalClassName, ...componentProps },
      children
    );
  });

  StyledComponent.displayName = `Styled(${
    typeof component === "string"
      ? component
      : component.displayName || component.name || "Component"
  })`;

  return StyledComponent;
}

/**
 * Create a styled component factory for a specific tag
 * @param {string} tag - HTML tag name
 * @returns {Function} Styled component factory
 */
function createStyledTag(tag) {
  return (config, options) => styled(tag, config, options);
}

/**
 * Create an isolated styled component (automatically scoped)
 * @param {string|React.Component} component - HTML tag or React component
 * @param {Object} config - Style configuration
 * @param {string} scope - Optional scope name
 * @returns {React.Component} Isolated styled component
 */
export function isolatedStyled(component, config = {}, scope = null) {
  return styled(component, config, { isolate: true, scope });
}

/**
 * Create a scoped styled component
 * @param {string} scope - Scope name for component isolation
 * @returns {Function} Scoped styled function
 */
export function createScopedStyled(scope) {
  return (component, config = {}) => styled(component, config, { scope });
}

// Create styled tag helpers
styled.div = createStyledTag("div");
styled.span = createStyledTag("span");
styled.p = createStyledTag("p");
styled.a = createStyledTag("a");
styled.button = createStyledTag("button");
styled.input = createStyledTag("input");
styled.textarea = createStyledTag("textarea");
styled.select = createStyledTag("select");
styled.label = createStyledTag("label");
styled.h1 = createStyledTag("h1");
styled.h2 = createStyledTag("h2");
styled.h3 = createStyledTag("h3");
styled.h4 = createStyledTag("h4");
styled.h5 = createStyledTag("h5");
styled.h6 = createStyledTag("h6");
styled.section = createStyledTag("section");
styled.article = createStyledTag("article");
styled.nav = createStyledTag("nav");
styled.header = createStyledTag("header");
styled.footer = createStyledTag("footer");
styled.main = createStyledTag("main");
styled.aside = createStyledTag("aside");
styled.ul = createStyledTag("ul");
styled.ol = createStyledTag("ol");
styled.li = createStyledTag("li");
styled.form = createStyledTag("form");
styled.table = createStyledTag("table");
styled.thead = createStyledTag("thead");
styled.tbody = createStyledTag("tbody");
styled.tr = createStyledTag("tr");
styled.td = createStyledTag("td");
styled.th = createStyledTag("th");

export default styled;
