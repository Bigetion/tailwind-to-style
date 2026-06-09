import React, { useEffect } from 'react';
import { tw, cx } from 'tailwind-to-style';
import { X } from 'lucide-react';

/**
 * Dialog/Modal component — overlay panel.
 * Uses slots for overlay, content, header, body, footer.
 */
const dialog = tw({
  name: 'dialog',
  slots: {
    overlay: 'fixed inset-0 z-50 flex items-center justify-center p-4',
    backdrop: 'absolute inset-0 bg-black/50',
    content: 'relative bg-white rounded-xl shadow-xl w-full max-h-[85vh] overflow-y-auto',
    header: 'px-6 py-4 border-b border-gray-100 flex items-center justify-between',
    title: 'text-lg font-semibold text-gray-900',
    body: 'px-6 py-4',
    footer: 'px-6 py-4 border-t border-gray-100 flex justify-end gap-2',
  },
});

const slots = dialog();

const closeBtn = tw({ name: 'dialog-close', _: 'p-1 rounded-md text-gray-400 cursor-pointer hover:text-gray-600 hover:bg-gray-100 transition-colors' });

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
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const maxWidths = {
    sm: '24rem',
    md: '28rem',
    lg: '36rem',
    xl: '48rem',
    full: '100%',
  };

  return (
    <div className={slots.overlay}>
      <div className={slots.backdrop} onClick={onClose} />
      <div className={cx(slots.content, className)} style={{ maxWidth: maxWidths[size] || maxWidths.md }}>
        {title && (
          <div className={slots.header}>
            <h2 className={slots.title}>{title}</h2>
            <button onClick={onClose} className={closeBtn} aria-label="Close" style={{ background: 'none', border: 'none' }}>
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
