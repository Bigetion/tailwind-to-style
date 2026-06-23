import React from 'react';
import { tw, cx } from 'tailwind-to-style';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import { useControllableState } from './_core/componentUtils';

/**
 * Alert component — contextual feedback messages.
 * Slot-based and variant-driven for flexible composition.
 */
const alert = tw({
  name: 'alert',
  slots: {
    root: 'relative flex items-start gap-3 rounded-xl border p-4 shadow-sm',
    iconWrap: 'mt-0.5 flex shrink-0 items-center justify-center rounded-full',
    content: 'min-w-0 flex-1',
    title: 'font-semibold leading-5',
    message: 'mt-0.5 text-sm leading-6',
    actions: 'mt-3 flex flex-wrap items-center gap-2',
    close: 'absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors',
  },
  variants: {
    intent: {
      info: {
        root: 'border-blue-200 bg-blue-50 text-blue-900',
        iconWrap: 'bg-blue-100 text-blue-600',
        title: 'text-blue-950',
        message: 'text-blue-800',
        close: 'text-blue-500 hover:bg-blue-100 hover:text-blue-700',
      },
      success: {
        root: 'border-emerald-200 bg-emerald-50 text-emerald-900',
        iconWrap: 'bg-emerald-100 text-emerald-600',
        title: 'text-emerald-950',
        message: 'text-emerald-800',
        close: 'text-emerald-500 hover:bg-emerald-100 hover:text-emerald-700',
      },
      warning: {
        root: 'border-amber-200 bg-amber-50 text-amber-950',
        iconWrap: 'bg-amber-100 text-amber-600',
        title: 'text-amber-950',
        message: 'text-amber-900',
        close: 'text-amber-500 hover:bg-amber-100 hover:text-amber-700',
      },
      error: {
        root: 'border-red-200 bg-red-50 text-red-950',
        iconWrap: 'bg-red-100 text-red-600',
        title: 'text-red-950',
        message: 'text-red-800',
        close: 'text-red-500 hover:bg-red-100 hover:text-red-700',
      },
    },
    density: {
      compact: {
        root: 'p-3',
        iconWrap: 'h-7 w-7',
        message: 'text-xs leading-5',
        actions: 'mt-2',
        close: 'right-2 top-2 h-7 w-7',
      },
      comfortable: {
        root: 'p-4',
        iconWrap: 'h-8 w-8',
        message: 'text-sm leading-6',
        actions: 'mt-3',
      },
      spacious: {
        root: 'p-5',
        iconWrap: 'h-9 w-9',
        message: 'text-base leading-7',
        actions: 'mt-4',
      },
    },
    elevated: {
      true: {
        root: 'shadow-md',
      },
    },
    dismissible: {
      true: {
        root: 'pr-12',
      },
    },
  },
  defaultVariants: { intent: 'info', density: 'comfortable', elevated: false, dismissible: false },
});

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

export const Alert = React.forwardRef(function Alert(props, ref) {
  const {
    children,
    color = 'info',
    intent,
    density = 'comfortable',
    title,
    dismissible,
    onDismiss,
    icon,
    actions,
    elevated = false,
    className,
    iconClassName,
    titleClassName,
    messageClassName,
    actionsClassName,
    closeClassName,
    open,
    defaultOpen = true,
    onOpenChange,
    role = 'alert',
    ...rest
  } = props;

  const [visible, setVisible] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  if (!visible) return null;

  const resolvedIntent = intent || color;
  const slots = alert({ intent: resolvedIntent, density, elevated, dismissible: !!dismissible });
  const Icon = icon || iconMap[resolvedIntent];

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  const renderedIcon = (() => {
    if (!Icon) return null;
    if (React.isValidElement(Icon)) return Icon;
    if (typeof Icon === 'function') return <Icon size={18} />;
    return null;
  })();

  return (
    <div className={cx(slots.root, className)} role={role} ref={ref} {...rest}>
      {renderedIcon && (
        <div className={cx(slots.iconWrap, iconClassName)}>
          {renderedIcon}
        </div>
      )}

      <div className={slots.content}>
        {title && <p className={cx(slots.title, titleClassName)}>{title}</p>}
        <div className={cx(slots.message, messageClassName)}>{children}</div>
        {actions && <div className={cx(slots.actions, actionsClassName)}>{actions}</div>}
      </div>

      {dismissible && (
        <button onClick={handleDismiss} className={cx(slots.close, closeClassName)} aria-label="Dismiss" style={{ background: 'none', border: 'none', color: 'inherit' }}>
          <X size={16} />
        </button>
      )}
    </div>
  );
});
