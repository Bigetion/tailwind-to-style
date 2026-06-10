import React from 'react';
import { tw, cx } from 'tailwind-to-style';

/**
 * Badge component — small status labels/indicators.
 * Variants: color, size, dot (status indicator)
 */
const badge = tw({
  name: 'badge',
  base: 'inline-flex items-center font-medium rounded-full',
  variants: {
    color: {
      gray: 'bg-gray-100 text-gray-700',
      blue: 'bg-blue-50 text-blue-700',
      green: 'bg-emerald-50 text-emerald-700',
      red: 'bg-red-50 text-red-700',
      yellow: 'bg-amber-50 text-amber-700',
      purple: 'bg-purple-50 text-purple-700',
      pink: 'bg-pink-50 text-pink-700',
      indigo: 'bg-indigo-50 text-indigo-700',
    },
    size: {
      sm: 'text-xs px-2 py-0.5',
      md: 'text-xs px-2.5 py-1',
      lg: 'text-sm px-3 py-1',
    },
    variant: {
      solid: '',
      outline: 'bg-transparent border',
    },
  },
  compoundVariants: [
    { variant: 'outline', color: 'gray', class: 'border-gray-300 text-gray-600' },
    { variant: 'outline', color: 'blue', class: 'border-blue-300 text-blue-600' },
    { variant: 'outline', color: 'green', class: 'border-emerald-300 text-emerald-600' },
    { variant: 'outline', color: 'red', class: 'border-red-300 text-red-600' },
    { variant: 'outline', color: 'yellow', class: 'border-amber-300 text-amber-600' },
    { variant: 'outline', color: 'purple', class: 'border-purple-300 text-purple-600' },
  ],
  defaultVariants: {
    color: 'gray',
    size: 'md',
    variant: 'solid',
  },
});

const dotColors = {
  gray: '#6b7280',
  blue: '#3b82f6',
  green: '#10b981',
  red: '#ef4444',
  yellow: '#f59e0b',
  purple: '#8b5cf6',
  pink: '#ec4899',
  indigo: '#6366f1',
};

export function Badge({
  children,
  color,
  size,
  variant,
  dot,
  leftIcon,
  rightIcon,
  className,
}) {
  const variantProps = {};
  if (color !== undefined) variantProps.color = color;
  if (size !== undefined) variantProps.size = size;
  if (variant !== undefined) variantProps.variant = variant;

  return (
    <span className={cx(badge(variantProps), className)}>
      {dot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: dotColors[color || 'gray'],
            marginRight: '6px',
            flexShrink: 0,
          }}
        />
      )}
      {leftIcon && <span style={{ marginRight: '4px', display: 'inline-flex' }}>{leftIcon}</span>}
      {children}
      {rightIcon && <span style={{ marginLeft: '4px', display: 'inline-flex' }}>{rightIcon}</span>}
    </span>
  );
}
