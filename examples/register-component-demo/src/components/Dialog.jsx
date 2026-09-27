import React from 'react';
import { cx } from 'tailwind-to-style/register';
import { X } from 'lucide-react';

export function Dialog({ open, onClose, title, children, footer, className }) {
  if (!open) return null;
  return (
    <div className="dialog-overlay" onClick={e => e.target === e.currentTarget && onClose?.()}>
      <div className={cx('dialog-content', className)}>
        <div className="dialog-header">
          <h2 className="dialog-title">{title}</h2>
          <button className="dialog-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="dialog-body">{children}</div>
        {footer && <div className="dialog-footer">{footer}</div>}
      </div>
    </div>
  );
}
