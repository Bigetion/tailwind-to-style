import React from 'react';
import { tw, cx } from 'tailwind-to-style';

/**
 * Card component — container with header, body, footer slots.
 * Uses tw slots mode.
 */
const card = tw({
  name: 'card',
  slots: {
    root: 'bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden',
    header: 'px-6 py-4 border-b border-gray-100',
    title: 'text-lg font-semibold text-gray-900',
    description: 'text-sm text-gray-500 mt-0.5',
    body: 'px-6 py-4',
    footer: 'px-6 py-4 border-t border-gray-100 bg-gray-50',
  },
});

const slots = card();

export function Card({
  children,
  title,
  description,
  footer,
  headerAction,
  className,
  noPadding,
}) {
  return (
    <div className={cx(slots.root, className)}>
      {(title || description || headerAction) && (
        <div className={slots.header} style={headerAction ? { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } : undefined}>
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
