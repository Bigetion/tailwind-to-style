import React, { useEffect, useState, useCallback, useRef } from 'react';
import { tw, cx } from 'tailwind-to-style';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

/**
 * Toast component — ephemeral notification messages.
 */
const toast = tw({
  name: 'toast',
  base: 'flex items-start gap-3 w-full max-w-sm px-4 py-3 bg-white rounded-lg shadow-lg border border-gray-200 pointer-events-auto',
  variants: {
    entering: {
      true: 'opacity-100 translate-y-0',
      false: 'opacity-0 translate-y-2',
    },
  },
  defaultVariants: { entering: true },
});

const toastTitle = tw({ name: 'toast-title', _: 'text-sm font-semibold text-gray-900' });
const toastMessage = tw({ name: 'toast-msg', _: 'text-sm text-gray-600' });
const toastClose = tw({ name: 'toast-close', _: 'text-gray-400 cursor-pointer hover:text-gray-600 transition-colors' });

const icons = {
  success: { Icon: CheckCircle, color: '#10b981' },
  error: { Icon: XCircle, color: '#ef4444' },
  warning: { Icon: AlertTriangle, color: '#f59e0b' },
  info: { Icon: Info, color: '#3b82f6' },
};

function ToastItem({ id, type = 'info', title, message, duration = 4000, onRemove }) {
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (duration > 0) {
      timeoutRef.current = setTimeout(() => {
        setVisible(false);
        setTimeout(() => onRemove(id), 200);
      }, duration);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [duration, id, onRemove]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onRemove(id), 200);
  };

  const { Icon, color } = icons[type] || icons.info;

  return (
    <div
      className={toast({ entering: visible })}
      style={{ transition: 'opacity 200ms, transform 200ms' }}
    >
      <Icon size={18} color={color} style={{ flexShrink: 0, marginTop: '1px' }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <p className={toastTitle}>{title}</p>}
        {message && <p className={toastMessage}>{message}</p>}
      </div>
      <button onClick={handleClose} className={toastClose} style={{ background: 'none', border: 'none' }} aria-label="Close">
        <X size={14} />
      </button>
    </div>
  );
}

/**
 * ToastContainer — positions toasts on screen.
 * Use with useToast hook.
 */
const containerPositions = {
  'top-right': { top: '16px', right: '16px' },
  'top-left': { top: '16px', left: '16px' },
  'bottom-right': { bottom: '16px', right: '16px' },
  'bottom-left': { bottom: '16px', left: '16px' },
  'top-center': { top: '16px', left: '50%', transform: 'translateX(-50%)' },
  'bottom-center': { bottom: '16px', left: '50%', transform: 'translateX(-50%)' },
};

export function ToastContainer({ toasts, onRemove, position = 'top-right' }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pointerEvents: 'none',
        ...containerPositions[position],
      }}
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} {...t} onRemove={onRemove} />
      ))}
    </div>
  );
}

/**
 * useToast hook — manage toast state.
 */
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type, title, message, duration }) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback((title, message) => addToast({ type: 'success', title, message }), [addToast]);
  const error = useCallback((title, message) => addToast({ type: 'error', title, message }), [addToast]);
  const warning = useCallback((title, message) => addToast({ type: 'warning', title, message }), [addToast]);
  const info = useCallback((title, message) => addToast({ type: 'info', title, message }), [addToast]);

  return { toasts, addToast, removeToast, success, error, warning, info };
}
