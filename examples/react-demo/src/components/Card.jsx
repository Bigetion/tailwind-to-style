import React from 'react';
import { tw, cx } from 'tailwind-to-style';

/**
 * Card component — container with header, body, footer slots.
 *
 * Demonstrates: slots + variants that affect multiple slots simultaneously.
 *
 * variant: 'default' | 'elevated' | 'flat' | 'ghost'
 * size: 'sm' | 'md' | 'lg'
 */
const card = tw({
  name: 'card',
  slots: {
    root:        'bg-white rounded-xl border overflow-hidden transition-shadow duration-200',
    header:      'border-b flex items-center justify-between',
    title:       'font-semibold text-gray-900',
    description: 'text-gray-500 mt-0.5',
    body:        'text-gray-700',
    footer:      'border-t bg-gray-50',
  },
  variants: {
    variant: {
      default:  {
        root:   'border-gray-200 shadow-sm',
        footer: 'border-gray-100',
        header: 'border-gray-100',
      },
      elevated: {
        root:   'border-gray-200 shadow-lg hover:shadow-xl',
        footer: 'border-gray-100',
        header: 'border-gray-100',
      },
      flat: {
        root:   'border-gray-200 shadow-none',
        footer: 'border-gray-200 bg-gray-50',
        header: 'border-gray-200',
      },
      ghost: {
        root:   'border-transparent shadow-none bg-gray-50',
        footer: 'border-transparent bg-gray-100',
        header: 'border-transparent',
      },
    },
    size: {
      sm: {
        header:      'px-4 py-3',
        title:       'text-sm',
        description: 'text-xs',
        body:        'px-4 py-3 text-sm',
        footer:      'px-4 py-3',
      },
      md: {
        header:      'px-6 py-4',
        title:       'text-base',
        description: 'text-sm',
        body:        'px-6 py-4 text-sm',
        footer:      'px-6 py-4',
      },
      lg: {
        header:      'px-8 py-5',
        title:       'text-lg',
        description: 'text-sm',
        body:        'px-8 py-5',
        footer:      'px-8 py-5',
      },
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});

export function Card({
  children,
  title,
  description,
  footer,
  headerAction,
  variant,
  size,
  className,
  noPadding,
}) {
  const variantProps = {};
  if (variant !== undefined) variantProps.variant = variant;
  if (size !== undefined) variantProps.size = size;

  const slots = card(variantProps);

  return (
    <div className={cx(slots.root, className)}>
      {(title || description || headerAction) && (
        <div className={slots.header}>
          <div>
            {title && <h3 className={slots.title}>{title}</h3>}
            {description && <p className={slots.description}>{description}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className={noPadding ? undefined : slots.body}>
        {children}
      </div>
      {footer && (
        <div className={slots.footer}>{footer}</div>
      )}
    </div>
  );
}
