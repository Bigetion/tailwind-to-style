import React, { forwardRef } from 'react';
import { tw, cx } from 'tailwind-to-style';

/**
 * Spinner component — animated loading indicator.
 * Variants: size, color, variant (border, dots, pulse)
 */
const spinner = tw({
  name: 'spinner',
  base: 'inline-block animate-spin rounded-full border-2 border-current border-t-transparent',
  variants: {
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12',
    },
    color: {
      blue: 'text-blue-600',
      white: 'text-white',
      gray: 'text-gray-500',
      green: 'text-emerald-600',
      red: 'text-red-600',
      purple: 'text-purple-600',
    },
  },
  defaultVariants: { size: 'md', color: 'blue' },
});

const spinnerLabel = tw('spinner-label', 'text-sm text-gray-600');

export const Spinner = forwardRef(function Spinner({
  size,
  color,
  label,
  className,
  ...props
}, ref) {
  const variantProps = {};
  if (size !== undefined) variantProps.size = size;
  if (color !== undefined) variantProps.color = color;

  return (
    <span
      {...props}
      ref={ref}
      className={cx(tw('inline-flex items-center gap-2'), className)}
      role="status"
      aria-label={label || 'Loading'}
    >
      <span className={spinner(variantProps)} aria-hidden="true" />
      {label && <span className={spinnerLabel}>{label}</span>}
    </span>
  );
});

/**
 * SpinnerOverlay — full-page or container loading overlay
 */
const overlay = tw({
  name: 'spinner-overlay',
  base: 'flex flex-col items-center justify-center gap-3',
  variants: {
    fullscreen: {
      true: 'fixed inset-0 z-50 bg-white/80 backdrop-blur-sm',
      false: 'absolute inset-0 z-10 bg-white/70 rounded-xl',
    },
  },
  defaultVariants: { fullscreen: false },
});

export const SpinnerOverlay = forwardRef(function SpinnerOverlay({ label, fullscreen, size = 'lg', ...props }, ref) {
  const overlayProps = {};
  if (fullscreen) overlayProps.fullscreen = true;
  else overlayProps.fullscreen = false;

  return (
    <div {...props} ref={ref} className={overlay(overlayProps)} role="status" aria-label={label || 'Loading'}>
      <Spinner size={size} aria-hidden="true" />
      {label && <p className={tw('text-sm text-gray-600 font-medium')}>{label}</p>}
    </div>
  );
});
