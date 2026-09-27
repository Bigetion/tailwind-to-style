import React, { useState, useCallback } from 'react';
import { cx } from 'tailwind-to-style/register';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';

const ICONS = { info: Info, success: CheckCircle, warning: AlertTriangle, danger: XCircle };

export function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="toast-container">
      {toasts.map(t => {
        const Icon = ICONS[t.variant ?? 'info'];
        return (
          <div key={t.id} className={cx('toast-item', t.variant && `toast-item-${t.variant}`)}>
            {Icon && <Icon size={16} className="toast-icon" style={{ color: `var(--c-${t.variant ?? 'info'})`, flexShrink: 0 }} />}
            <div className="toast-body">
              {t.title && <div className="toast-title">{t.title}</div>}
              {t.desc  && <div className="toast-desc">{t.desc}</div>}
            </div>
            <button className="toast-close" onClick={() => onRemove(t.id)}><X size={14} /></button>
          </div>
        );
      })}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((toast) => {
    const id = Date.now();
    setToasts(v => [...v, { ...toast, id }]);
    setTimeout(() => setToasts(v => v.filter(t => t.id !== id)), 4000);
    return id;
  }, []);
  const remove = useCallback((id) => setToasts(v => v.filter(t => t.id !== id)), []);
  return { toasts, add, remove };
}
