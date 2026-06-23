import React from 'react';
import { tw, cx } from 'tailwind-to-style';
import { X } from 'lucide-react';

/**
 * Badge component — small status labels/indicators.
 * Variants: color, size, variant, dismissible, interactive.
 */
const badge = tw({
  name: 'badge',
  slots: {
    root: 'inline-flex items-center gap-1.5 font-medium transition-colors',
    content: 'min-w-0 truncate',
    dot: 'shrink-0 rounded-full',
    icon: 'shrink-0 inline-flex',
    dismiss: 'inline-flex h-4 w-4 items-center justify-center rounded-full transition-colors',
  },
  variants: {
    size: {
      sm: { root: 'text-xs px-2 py-0.5 rounded-full', dot: 'h-1.5 w-1.5', dismiss: 'h-4 w-4' },
      md: { root: 'text-xs px-2.5 py-1 rounded-full', dot: 'h-1.5 w-1.5', dismiss: 'h-4 w-4' },
      lg: { root: 'text-sm px-3 py-1 rounded-full', dot: 'h-2 w-2', dismiss: 'h-5 w-5' },
    },
    rounded: {
      pill: { root: 'rounded-full' },
      square: { root: 'rounded-md' },
    },
    interactive: {
      true: { root: 'cursor-pointer hover:opacity-90 active:scale-[0.99]' },
    },
    dismissible: {
      true: { root: 'pr-1.5' },
    },
    // Color + variant combinations via compoundVariants
    colorVariant: {
      'gray-solid': { root: 'bg-gray-100 text-gray-700' },
      'gray-soft': { root: 'bg-gray-50 text-gray-700' },
      'gray-outline': { root: 'border border-gray-300 bg-transparent text-gray-600' },
      'gray-ghost': { root: 'bg-transparent text-gray-700' },
      
      'blue-solid': { root: 'bg-blue-50 text-blue-700' },
      'blue-soft': { root: 'bg-blue-100/70 text-blue-800' },
      'blue-outline': { root: 'border border-blue-300 bg-transparent text-blue-600' },
      'blue-ghost': { root: 'bg-transparent text-blue-700' },
      
      'green-solid': { root: 'bg-emerald-50 text-emerald-700' },
      'green-soft': { root: 'bg-emerald-100/70 text-emerald-800' },
      'green-outline': { root: 'border border-emerald-300 bg-transparent text-emerald-600' },
      'green-ghost': { root: 'bg-transparent text-emerald-700' },
      
      'red-solid': { root: 'bg-red-50 text-red-700' },
      'red-soft': { root: 'bg-red-100/70 text-red-800' },
      'red-outline': { root: 'border border-red-300 bg-transparent text-red-600' },
      'red-ghost': { root: 'bg-transparent text-red-700' },
      
      'yellow-solid': { root: 'bg-amber-50 text-amber-700' },
      'yellow-soft': { root: 'bg-amber-100/70 text-amber-800' },
      'yellow-outline': { root: 'border border-amber-300 bg-transparent text-amber-600' },
      'yellow-ghost': { root: 'bg-transparent text-amber-700' },
      
      'purple-solid': { root: 'bg-purple-50 text-purple-700' },
      'purple-soft': { root: 'bg-purple-100/70 text-purple-800' },
      'purple-outline': { root: 'border border-purple-300 bg-transparent text-purple-600' },
      'purple-ghost': { root: 'bg-transparent text-purple-700' },
      
      'pink-solid': { root: 'bg-pink-50 text-pink-700' },
      'pink-soft': { root: 'bg-pink-100/70 text-pink-800' },
      'pink-outline': { root: 'border border-pink-300 bg-transparent text-pink-600' },
      'pink-ghost': { root: 'bg-transparent text-pink-700' },
      
      'indigo-solid': { root: 'bg-indigo-50 text-indigo-700' },
      'indigo-soft': { root: 'bg-indigo-100/70 text-indigo-800' },
      'indigo-outline': { root: 'border border-indigo-300 bg-transparent text-indigo-600' },
      'indigo-ghost': { root: 'bg-transparent text-indigo-700' },
    },
  },
  defaultVariants: {
    size: 'md',
    rounded: 'pill',
    interactive: false,
    dismissible: false,
    colorVariant: 'gray-solid',
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

export const Badge = React.forwardRef(function Badge(props, ref) {
  const {
    children,
    color = 'gray',
    size,
    variant = 'solid',
    rounded,
    interactive,
    dot,
    leftIcon,
    rightIcon,
    dismissible,
    onDismiss,
    dismissLabel = 'Dismiss badge',
    className,
    contentClassName,
    dotClassName,
    iconClassName,
    dismissClassName,
    as,
    ...rest
  } = props;

  const RootTag = as || (interactive && !dismissible ? 'button' : 'span');
  const variantProps = {};
  
  // Compute colorVariant key
  const colorVariantKey = `${color}-${variant}`;
  variantProps.colorVariant = colorVariantKey;
  
  if (size !== undefined) variantProps.size = size;
  if (rounded !== undefined) variantProps.rounded = rounded;
  if (interactive !== undefined) variantProps.interactive = interactive;
  if (dismissible !== undefined) variantProps.dismissible = dismissible;

  const slots = badge(variantProps);

  const handleDismiss = (event) => {
    event.stopPropagation();
    onDismiss?.(event);
  };

  return (
    <RootTag
      className={cx(slots.root, className)}
      ref={ref}
      type={RootTag === 'button' ? 'button' : undefined}
      {...rest}
    >
      {dot && (
        <span
          className={cx(slots.dot, dotClassName)}
          style={{
            backgroundColor: dotColors[color || 'gray'],
          }}
        />
      )}
      {leftIcon && <span className={cx(slots.icon, iconClassName)}>{leftIcon}</span>}
      <span className={cx(slots.content, contentClassName)}>{children}</span>
      {rightIcon && <span className={cx(slots.icon, iconClassName)}>{rightIcon}</span>}
      {dismissible && (
        <button
          type="button"
          aria-label={dismissLabel}
          onClick={handleDismiss}
          className={cx(slots.dismiss, dismissClassName)}
          style={{ background: 'transparent', border: 'none', color: 'inherit' }}
        >
          <X size={12} />
        </button>
      )}
    </RootTag>
  );
});
