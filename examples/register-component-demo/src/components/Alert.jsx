import React from 'react';
import { cx } from 'tailwind-to-style/register';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';

const ICONS = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  danger: XCircle,
};

export function Alert({ variant = 'info', title, children, onClose, className }) {
  const Icon = ICONS[variant];
  return (
    <div className={cx('alert', `alert-${variant}`, className)}>
      {Icon && <Icon className="alert-icon" size={18} />}
      <div className="alert-body">
        {title && <div className="alert-title">{title}</div>}
        <div className="alert-desc">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', opacity: 0.6, color: 'inherit', marginLeft: 'auto', flexShrink: 0 }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
