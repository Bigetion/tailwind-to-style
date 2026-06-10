import React from 'react';
import { tw } from 'tailwind-to-style';
import { cx } from 'tailwind-to-style';

/**
 * Button component built with tw variants.
 */
const button = tw({
  name: 'btn',
  base: 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 cursor-pointer select-none hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95',
  variants: {
    color: {
      primary: 'bg-blue-600 text-white shadow-sm hover:bg-blue-700',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      danger: 'bg-red-600 text-white shadow-sm hover:bg-red-700',
      success: 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
      outline: 'bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-50',
    },
    size: {
      xs: 'text-xs px-2.5 py-1',
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
      xl: 'text-xl px-8 py-4',
    },
    fullWidth: {
      true: 'w-full',
    },
  },
  compoundVariants: [
    { color: 'primary', size: 'lg', class: 'shadow-lg shadow-blue-500/25' },
    { color: 'danger', size: 'lg', class: 'shadow-lg shadow-red-500/25' },
  ],
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
});

// Disabled overlay style
const disabledStyle = tw('btn-disabled', 'opacity-50 cursor-not-allowed pointer-events-none');

// Loading spinner
const spinnerStyle = tw('btn-spinner', 'w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin');

export function Button({
  children,
  color,
  size,
  fullWidth,
  disabled,
  loading,
  leftIcon,
  rightIcon,
  className,
  ...props
}) {
  // Filter out undefined values so defaultVariants apply correctly
  const variantProps = {};
  if (color !== undefined) variantProps.color = color;
  if (size !== undefined) variantProps.size = size;
  if (fullWidth !== undefined) variantProps.fullWidth = fullWidth;

  const classes = cx(
    button(variantProps),
    disabled && disabledStyle,
    loading && disabledStyle,
    className
  );

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && <span className={spinnerStyle} />}
      {!loading && leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
