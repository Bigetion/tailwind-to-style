import React, { useState } from 'react';
import { tw, cx } from 'tailwind-to-style';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';

/**
 * Alert component — contextual feedback messages.
 * Variants: color (info, success, warning, error)
 */
const alert = tw({
  name: 'alert',
  base: 'relative flex gap-3 rounded-lg p-4 text-sm',
  variants: {
    color: {
      info: 'bg-blue-50 text-blue-800 border border-blue-200',
      success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
      warning: 'bg-amber-50 text-amber-800 border border-amber-200',
      error: 'bg-red-50 text-red-800 border border-red-200',
    },
  },
  defaultVariants: { color: 'info' },
});

const alertTitle = tw({ name: 'alert-title', _: 'font-semibold mb-0.5' });
const alertClose = tw({ name: 'alert-close', _: 'absolute top-3 right-3 opacity-60 cursor-pointer hover:opacity-100 transition-opacity' });

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

const iconColors = {
  info: '#2563eb',
  success: '#059669',
  warning: '#d97706',
  error: '#dc2626',
};

export function Alert({
  children,
  color = 'info',
  title,
  dismissible,
  onDismiss,
  icon,
  className,
}) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const Icon = icon || iconMap[color];
  const variantProps = { color };

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  return (
    <div className={cx(alert(variantProps), className)} role="alert">
      {Icon && <Icon size={18} color={iconColors[color]} style={{ flexShrink: 0, marginTop: '1px' }} />}
      <div style={{ flex: 1 }}>
        {title && <p className={alertTitle}>{title}</p>}
        <div>{children}</div>
      </div>
      {dismissible && (
        <button onClick={handleDismiss} className={alertClose} aria-label="Dismiss" style={{ background: 'none', border: 'none', color: 'inherit' }}>
          <X size={16} />
        </button>
      )}
    </div>
  );
}
