import React, { useId } from 'react';
import { twsxClassName, cx } from 'tailwind-to-style';

/**
 * Input component — text field with label, helper text, error state, and icons.
 *
 * Rules learned:
 * - Pseudo-states go in string with Tailwind prefix syntax (hover:xxx, focus:xxx)
 * - Filter undefined props before passing to variant function
 * - base has no padding (put in size variants)
 */
const inputField = twsxClassName({
  name: 'input',
  base: 'block w-full rounded-lg border bg-white text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2',
  variants: {
    size: {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-3.5 py-2.5',
      lg: 'text-lg px-4 py-3',
    },
    state: {
      default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20',
      error: 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
      success: 'border-emerald-400 focus:border-emerald-500 focus:ring-emerald-500/20',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed bg-gray-50',
    },
  },
  defaultVariants: {
    size: 'md',
    state: 'default',
  },
});

const labelStyle = twsxClassName({ name: 'input-label', _: 'block text-sm font-medium text-gray-700 mb-1.5' });
const helperStyle = twsxClassName({ name: 'input-helper', _: 'mt-1.5 text-sm text-gray-500' });
const errorStyle = twsxClassName({ name: 'input-error', _: 'mt-1.5 text-sm text-red-600' });
const successStyle = twsxClassName({ name: 'input-success', _: 'mt-1.5 text-sm text-emerald-600' });
const wrapperStyle = twsxClassName({ name: 'input-wrapper', _: 'relative' });
const iconLeftStyle = twsxClassName({ name: 'input-icon-left', _: 'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none' });
const iconRightStyle = twsxClassName({ name: 'input-icon-right', _: 'absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none' });

export function Input({
  label,
  helperText,
  error,
  success,
  size,
  disabled,
  leftIcon,
  rightIcon,
  className,
  id,
  ...props
}) {
  const autoId = useId();
  const inputId = id || autoId;

  // Determine state
  const state = error ? 'error' : success ? 'success' : 'default';

  // Build variant props (filter undefined)
  const variantProps = { state };
  if (size !== undefined) variantProps.size = size;
  if (disabled) variantProps.disabled = true;

  // Add padding offset for icons
  const iconPadding = {};
  if (leftIcon) iconPadding.paddingLeft = size === 'lg' ? '2.75rem' : size === 'sm' ? '2rem' : '2.5rem';
  if (rightIcon) iconPadding.paddingRight = size === 'lg' ? '2.75rem' : size === 'sm' ? '2rem' : '2.5rem';

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className={labelStyle}>{label}</label>
      )}
      <div className={wrapperStyle}>
        {leftIcon && <span className={iconLeftStyle}>{leftIcon}</span>}
        <input
          id={inputId}
          className={inputField(variantProps)}
          disabled={disabled}
          style={Object.keys(iconPadding).length > 0 ? iconPadding : undefined}
          {...props}
        />
        {rightIcon && <span className={iconRightStyle}>{rightIcon}</span>}
      </div>
      {error && <p className={errorStyle}>{error}</p>}
      {success && !error && <p className={successStyle}>{success}</p>}
      {helperText && !error && !success && <p className={helperStyle}>{helperText}</p>}
    </div>
  );
}
