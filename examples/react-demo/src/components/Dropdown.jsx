import React, { useState, useRef, useEffect, useId } from 'react';
import { tw, cx } from 'tailwind-to-style';
import { ChevronDown, Check } from 'lucide-react';
import { useControllableState } from './_core/componentUtils';

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

const menuDivider = tw('dropdown-divider', 'my-1 border-t border-gray-100');
const menuLabel = tw('dropdown-label', 'px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider');

const triggerWrap = tw('dropdown-trigger-wrap', 'inline-flex');
const itemIcon = tw('dropdown-item-icon', 'inline-flex text-gray-400');
const itemText = tw('dropdown-item-text', 'flex-1');
const itemShortcut = tw('dropdown-item-shortcut', 'text-[0.7rem] text-gray-400');
const itemCheck = tw('dropdown-item-check', 'text-blue-500');

export function Dropdown({
  trigger,
  items = [],
  align = 'left',
  position = 'bottom',
  className,
  open,
  defaultOpen = false,
  onOpenChange,
  closeOnSelect = true,
  closeOnEscape = true,
  closeOnOutsideClick = true,
}) {
  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const menuId = useId();
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!closeOnOutsideClick) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [closeOnOutsideClick, setIsOpen]);

  // Close on Escape
  useEffect(() => {
    if (!closeOnEscape) return;
    const handleKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [closeOnEscape, setIsOpen]);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }} className={className}>
      {/* Trigger */}
      <div
        className={triggerWrap}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
      >
        {trigger}
      </div>

      {/* Menu panel */}
      {isOpen && (
        <div id={menuId} role="menu" className={menuPanel({ align, position })}>
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
                role="menuitem"
                onClick={() => {
                  if (!item.disabled) {
                    item.onClick?.();
                    if (closeOnSelect && !item.keepOpen) setIsOpen(false);
                  }
                }}
                style={{ background: 'none', border: 'none' }}
              >
                {item.icon && <span className={cx(itemIcon, item.variant === 'danger' && 'text-red-600')}>{item.icon}</span>}
                <span className={itemText}>{item.label}</span>
                {item.shortcut && <span className={itemShortcut}>{item.shortcut}</span>}
                {item.active && <Check size={14} className={itemCheck} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
