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
import { tv } from "../tv.js";

/**
 * Simple hash function for deterministic class names
 * @param {string} str - String to hash
 * @returns {string} Hash string
 */
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36).substr(0, 6);
}

/**
 * Generate deterministic class name based on config
 * @param {Object|Function} config - Style configuration
 * @param {string} componentType - Component type (e.g., 'button', 'div')
 * @returns {string} Deterministic class name
 */
function generateClassName(config, componentType = 'component') {
  // If config is a function (from tv()), use its string representation
  const configStr = typeof config === 'function' 
    ? config.toString() 
    : JSON.stringify(config);
  
  const hash = simpleHash(configStr + componentType);
  return `twsx-${componentType}-${hash}`;
}

/**
 * Create a styled component with Tailwind classes
 * @param {string|React.Component} component - HTML tag or React component
 * @param {Object} config - Style configuration
 * @param {string} config.base - Base classes
 * @param {string} config.hover - Hover state classes
 * @param {string} config.active - Active state classes
 * @param {string} config.focus - Focus state classes
 * @param {string} config.disabled - Disabled state classes
 * @param {Object} config.variants - Variant definitions
 * @param {Object} config.nested - Nested styles (twsx format)
 * @param {Object} config.defaultVariants - Default variant values
 * @returns {React.Component} Styled component
 */
export function styled(component, config = {}) {
  // Handle if config is a function from tv()
  if (typeof config === "function") {
    const tvFunction = config;
    
    // Generate deterministic class name based on component and config
    const componentType = typeof component === 'string' ? component : 'component';
    const componentId = generateClassName(config, componentType);
    const baseClassName = `.${componentId}`;

    // Create styled component
    const StyledComponent = React.forwardRef((props, ref) => {
      const {
        as,
        className: userClassName,
        children,
        ...restProps
      } = props;

      // Get variant keys from TV function
      const variantKeys = tvFunction.variantKeys || [];
      
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

      // Generate variant class names
      const variantClassNames = [];
      Object.entries(variantProps).forEach(([key, value]) => {
        if (value) {
          variantClassNames.push(`twsx-${key}-${value}`);
        }
      });

      // Build nested styles object with variant-specific selectors
      const styles = useMemo(() => {
        const styleObj = {};
        
        // Generate CSS for each variant combination
        const allVariantCombinations = [
          // Base styles (no variants)
          { props: {}, selector: baseClassName },
          // Individual variants
          ...Object.entries(variantProps).map(([key, value]) => ({
            props: { [key]: value },
            selector: `${baseClassName}.twsx-${key}-${value}`
          }))
        ];

        allVariantCombinations.forEach(({ props: variantPropsForCSS, selector }) => {
          const classes = tvFunction(variantPropsForCSS);
          if (classes.trim()) {
            styleObj[selector] = [classes];
          }
        });

        return styleObj;
      }, [variantProps]);

      // Inject styles
      useTwsx(styles);

      // Determine component to render
      const Component = as || component;

      // Combine all class names
      const finalClassName = [
        componentId,
        ...variantClassNames,
        userClassName
      ].filter(Boolean).join(" ");

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
  const componentType = typeof component === 'string' ? component : 'component';
  const componentId = generateClassName(config, componentType);
  const className = `.${componentId}`;

  // Create variant function if variants exist
  const variantFn = Object.keys(variants).length > 0
    ? tv({ base, variants, compoundVariants, defaultVariants })
    : null;

  // Create styled component
  const StyledComponent = React.forwardRef((props, ref) => {
    const {
      as,
      className: userClassName,
      children,
      ...restProps
    } = props;

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

    // Generate variant classes
    const variantClasses = variantFn ? variantFn(variantProps) : base;

    // Build twsx styles object
    const styles = useMemo(() => {
      const styleObj = {
        [className]: [variantClasses],
      };

      // Add pseudo-state classes
      const pseudoStates = {};
      if (hover) pseudoStates["&:hover"] = hover;
      if (active) pseudoStates["&:active"] = active;
      if (focus) pseudoStates["&:focus"] = focus;
      if (disabled) pseudoStates["&:disabled"] = disabled;

      // Merge nested styles
      if (Object.keys(pseudoStates).length > 0 || Object.keys(nested).length > 0) {
        styleObj[className].push({
          ...pseudoStates,
          ...nested,
        });
      }

      return styleObj;
    }, [variantClasses]);

    // Inject styles
    useTwsx(styles);

    // Determine component to render
    const Component = as || component;

    // Combine class names
    const finalClassName = [componentId, userClassName].filter(Boolean).join(" ");

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
  return (config) => styled(tag, config);
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
