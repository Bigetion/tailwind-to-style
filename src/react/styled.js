/**
 * styled() — Create React components with Tailwind-powered variant styling.
 *
 * @module tailwind-to-style/react/styled
 */

import React from 'react';
import { twsxClassName } from '../className/index.js';
import { cx } from '../cx.js';

/**
 * Create a styled React component with Tailwind classes and variant support.
 *
 * @param {string|React.ComponentType} element - HTML tag or React component
 * @param {Object} config - Style configuration
 * @param {string} [config.name] - Component name (used for class prefix)
 * @param {string} [config.base] - Base Tailwind classes
 * @param {Object} [config.variants] - Variant definitions
 * @param {Object} [config.defaultVariants] - Default variant values
 * @param {Array} [config.compoundVariants] - Compound variant rules
 * @param {Object} [config.slots] - Slot definitions (returns object of classNames)
 * @returns {React.ForwardRefComponent} Styled React component
 *
 * @example
 * const Button = styled('button', {
 *   name: 'btn',
 *   base: 'px-4 py-2 rounded-lg font-medium transition-all',
 *   variants: {
 *     color: {
 *       primary: 'bg-blue-600 text-white hover:bg-blue-700',
 *       danger: 'bg-red-600 text-white hover:bg-red-700',
 *     },
 *     size: {
 *       sm: 'text-sm px-3 py-1',
 *       md: 'text-base px-4 py-2',
 *       lg: 'text-lg px-6 py-3',
 *     },
 *   },
 *   defaultVariants: { color: 'primary', size: 'md' },
 * });
 *
 * // Usage: <Button color="danger" size="lg" onClick={fn}>Delete</Button>
 */
export function styled(element, config = {}) {
  const {
    name,
    base,
    variants = {},
    defaultVariants = {},
    compoundVariants = [],
    slots,
    ...restConfig
  } = config;

  // Determine variant keys to separate from DOM props
  const variantKeys = new Set(Object.keys(variants));

  // Create the twsxClassName variant/slot selector
  let variantSelector;
  if (slots) {
    variantSelector = twsxClassName({
      name: name || undefined,
      slots,
      variants,
      compoundVariants,
      defaultVariants,
      ...restConfig,
    });
  } else {
    variantSelector = twsxClassName({
      name: name || undefined,
      base: base || '',
      variants,
      compoundVariants,
      defaultVariants,
      ...restConfig,
    });
  }

  // Create the component with forwardRef
  const StyledComponent = React.forwardRef(function StyledComponent(props, ref) {
    const { className, children, ...rest } = props;

    // Separate variant props from DOM props
    const variantProps = {};
    const domProps = {};

    for (const [key, value] of Object.entries(rest)) {
      if (variantKeys.has(key)) {
        variantProps[key] = value;
      } else {
        domProps[key] = value;
      }
    }

    // Generate class names
    let generatedClassName;
    if (slots) {
      // For slot-based components, use root slot
      const slotClasses = variantSelector(variantProps);
      generatedClassName = slotClasses.root || Object.values(slotClasses)[0] || '';
    } else {
      generatedClassName = variantSelector(variantProps);
    }

    const finalClassName = cx(generatedClassName, className);

    return React.createElement(
      element,
      { ...domProps, className: finalClassName, ref },
      children
    );
  });

  // Set display name for DevTools
  StyledComponent.displayName = name
    ? `Styled(${name})`
    : `Styled(${typeof element === 'string' ? element : element.displayName || element.name || 'Component'})`;

  // Attach variant selector for programmatic access
  StyledComponent.variants = variantSelector;
  StyledComponent.raw = config;

  return StyledComponent;
}
