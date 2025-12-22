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

import React, { useMemo } from 'react';
import { useTwsx } from './useTwsx.js';
import { tv } from '../tv.js';

let componentIdCounter = 0;

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
  const {
    base = '',
    hover = '',
    active = '',
    focus = '',
    disabled = '',
    variants = {},
    nested = {},
    defaultVariants = {},
    compoundVariants = [],
  } = config;

  // Generate unique class name for this component
  const componentId = `twsx-styled-${++componentIdCounter}`;
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
      if (hover) pseudoStates['&:hover'] = hover;
      if (active) pseudoStates['&:active'] = active;
      if (focus) pseudoStates['&:focus'] = focus;
      if (disabled) pseudoStates['&:disabled'] = disabled;

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
    const finalClassName = [componentId, userClassName].filter(Boolean).join(' ');

    return (
      <Component ref={ref} className={finalClassName} {...componentProps}>
        {children}
      </Component>
    );
  });

  StyledComponent.displayName = `Styled(${
    typeof component === 'string'
      ? component
      : component.displayName || component.name || 'Component'
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
styled.div = createStyledTag('div');
styled.span = createStyledTag('span');
styled.p = createStyledTag('p');
styled.a = createStyledTag('a');
styled.button = createStyledTag('button');
styled.input = createStyledTag('input');
styled.textarea = createStyledTag('textarea');
styled.select = createStyledTag('select');
styled.label = createStyledTag('label');
styled.h1 = createStyledTag('h1');
styled.h2 = createStyledTag('h2');
styled.h3 = createStyledTag('h3');
styled.h4 = createStyledTag('h4');
styled.h5 = createStyledTag('h5');
styled.h6 = createStyledTag('h6');
styled.section = createStyledTag('section');
styled.article = createStyledTag('article');
styled.nav = createStyledTag('nav');
styled.header = createStyledTag('header');
styled.footer = createStyledTag('footer');
styled.main = createStyledTag('main');
styled.aside = createStyledTag('aside');
styled.ul = createStyledTag('ul');
styled.ol = createStyledTag('ol');
styled.li = createStyledTag('li');
styled.form = createStyledTag('form');
styled.table = createStyledTag('table');
styled.thead = createStyledTag('thead');
styled.tbody = createStyledTag('tbody');
styled.tr = createStyledTag('tr');
styled.td = createStyledTag('td');
styled.th = createStyledTag('th');

export default styled;
