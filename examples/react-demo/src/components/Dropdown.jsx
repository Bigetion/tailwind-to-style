import React, { useState, useRef, useEffect } from 'react';
import { tw, cx } from 'tailwind-to-style';
import { ChevronDown, Check } from 'lucide-react';

/**
 * Dropdown / Menu component — contextual menu triggered by a button.
 */
const menuPanel = tw({
  name: 'dropdown-panel',
  base: 'absolute z-50 bg-white rounded-lg border border-gray-200 shadow-lg py-1 min-w-[180px]',
  variants: {
    align: {
      left: 'left-0',
      right: 'right-0',
    },
    position: {
      bottom: 'top-full mt-1',
      top: 'bottom-full mb-1',
    },
  },
  defaultVariants: { align: 'left', position: 'bottom' },
});

const menuItem = tw({
  name: 'dropdown-item',
  base: 'flex items-center gap-2 px-3 py-2 text-sm cursor-pointer select-none transition-colors w-full text-left',
  variants: {
    variant: {
      default: 'text-gray-700 hover:bg-gray-100',
      danger: 'text-red-600 hover:bg-red-50',
      disabled: 'text-gray-400 cursor-not-allowed',
    },
    active: {
      true: 'bg-blue-50 text-blue-700',
    },
  },
  defaultVariants: { variant: 'default', active: false },
});

const menuDivider = tw({ name: 'dropdown-divider', _: 'my-1 border-t border-gray-100' });
const menuLabel = tw({ name: 'dropdown-label', _: 'px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider' });

export function Dropdown({
  trigger,
  items,
  align = 'left',
  position = 'bottom',
  className,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }} className={className}>
      {/* Trigger */}
      <div onClick={() => setOpen(!open)}>
        {trigger}
      </div>

      {/* Menu panel */}
      {open && (
        <div className={menuPanel({ align, position })}>
          {items.map((item, i) => {
            if (item.type === 'divider') {
              return <div key={i} className={menuDivider} />;
            }
            if (item.type === 'label') {
              return <div key={i} className={menuLabel}>{item.label}</div>;
            }

            const itemProps = {};
            if (item.variant) itemProps.variant = item.variant;
            if (item.active) itemProps.active = true;

            return (
              <button
                key={i}
                type="button"
                className={menuItem(itemProps)}
                disabled={item.disabled}
                onClick={() => {
                  if (!item.disabled) {
                    item.onClick?.();
                    if (!item.keepOpen) setOpen(false);
                  }
                }}
                style={{ background: 'none', border: 'none' }}
              >
                {item.icon && <span style={{ display: 'inline-flex', color: item.variant === 'danger' ? '#dc2626' : '#9ca3af' }}>{item.icon}</span>}
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.shortcut && <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{item.shortcut}</span>}
                {item.active && <Check size={14} style={{ color: '#3b82f6' }} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
