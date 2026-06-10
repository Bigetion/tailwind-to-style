import React, { useEffect } from 'react';
import { tw, cx } from 'tailwind-to-style';
import { X } from 'lucide-react';

/**
 * Dialog/Modal component — overlay panel.
 *
 * Demonstrates: slots + size variants affecting multiple slots at once.
 *
 * size: 'sm' | 'md' | 'lg' | 'xl' | 'full'
 */
const dialog = tw({
  name: 'dialog',
  slots: {
    overlay:  'fixed inset-0 z-50 flex items-center justify-center p-4',
    backdrop: 'absolute inset-0 bg-black/50',
    content:  'relative bg-white rounded-xl shadow-xl w-full max-h-[85vh] overflow-y-auto',
    header:   'border-b border-gray-100 flex items-center justify-between',
    title:    'font-semibold text-gray-900',
    body:     '',
    footer:   'border-t border-gray-100 flex justify-end gap-2',
  },
  variants: {
    size: {
      sm: {
        content: 'max-w-sm',
        header:  'px-4 py-3',
        title:   'text-base',
        body:    'px-4 py-3 text-sm',
        footer:  'px-4 py-3',
      },
      md: {
        content: 'max-w-md',
        header:  'px-6 py-4',
        title:   'text-lg',
        body:    'px-6 py-4',
        footer:  'px-6 py-4',
      },
      lg: {
        content: 'max-w-2xl',
        header:  'px-8 py-5',
        title:   'text-xl',
        body:    'px-8 py-5',
        footer:  'px-8 py-5',
      },
      xl: {
        content: 'max-w-4xl',
        header:  'px-8 py-5',
        title:   'text-xl',
        body:    'px-8 py-5',
        footer:  'px-8 py-5',
      },
      full: {
        content: 'max-w-full mx-4',
        header:  'px-6 py-4',
        title:   'text-lg',
        body:    'px-6 py-4',
        footer:  'px-6 py-4',
      },
    },
  },
  defaultVariants: { size: 'md' },
});

const closeBtn = tw({
  name: 'dialog-close',
  base: 'p-1 rounded-md text-gray-400 cursor-pointer transition-colors',
  variants: {
    hover: { true: 'hover:text-gray-600 hover:bg-gray-100' },
  },
  defaultVariants: { hover: true },
});

export function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  className,
}) {
  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const slots = dialog({ size });

  return (
    <div className={slots.overlay}>
      <div className={slots.backdrop} onClick={onClose} />
      <div className={cx(slots.content, className)}>
        {title && (
          <div className={slots.header}>
            <h2 className={slots.title}>{title}</h2>
            <button
              onClick={onClose}
              className={closeBtn()}
              aria-label="Close"
              style={{ background: 'none', border: 'none' }}
            >
              <X size={18} />
            </button>
          </div>
        )}
        <div className={slots.body}>
          {children}
        </div>
        {footer && (
          <div className={slots.footer}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
