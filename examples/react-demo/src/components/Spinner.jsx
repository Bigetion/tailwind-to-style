import React from 'react';
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

export function Spinner({
  size,
  color,
  label,
  className,
}) {
  const variantProps = {};
  if (size !== undefined) variantProps.size = size;
  if (color !== undefined) variantProps.color = color;

  return (
    <span
      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
      role="status"
      aria-label={label || 'Loading'}
      className={className}
    >
      <span className={spinner(variantProps)} aria-hidden="true" />
      {label && <span className={spinnerLabel}>{label}</span>}
    </span>
  );
}

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

export function SpinnerOverlay({ label, fullscreen, size = 'lg' }) {
  const props = {};
  if (fullscreen) props.fullscreen = true;
  else props.fullscreen = false;

  return (
    <div className={overlay(props)}>
      <Spinner size={size} />
      {label && <p style={{ fontSize: '0.875rem', color: '#4b5563', fontWeight: 500 }}>{label}</p>}
    </div>
  );
}
