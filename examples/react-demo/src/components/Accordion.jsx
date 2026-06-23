import React, { useId, useLayoutEffect, useRef, useState } from 'react';
import { tw, cx } from 'tailwind-to-style';
import { ChevronDown } from 'lucide-react';

/**
 * Accordion component — expandable content sections.
 * Supports single or multiple open panels.
 */
const accordion = tw({
  name: 'accordion',
  slots: {
    root: 'overflow-hidden rounded-xl border bg-white shadow-sm',
    item: 'border-b last:border-b-0',
    trigger: 'flex w-full items-center justify-between gap-3 bg-transparent text-left transition-colors',
    triggerContent: 'flex min-w-0 items-center gap-2',
    title: 'min-w-0 truncate font-medium',
    icon: 'shrink-0 transition-transform duration-200 ease-out',
    content: 'overflow-hidden transition-[max-height,opacity] duration-200 ease-out',
    contentInner: 'min-h-0 overflow-hidden text-sm text-gray-600',
  },
  variants: {
    tone: {
      neutral: {
        root: 'border-gray-200',
        item: 'border-gray-200',
        trigger: 'px-4 py-3 text-gray-900 hover:bg-gray-50',
        contentInner: 'px-4 pb-3',
        icon: 'text-gray-400',
      },
      subtle: {
        root: 'border-gray-100 bg-gray-50',
        item: 'border-gray-100',
        trigger: 'px-4 py-3 text-gray-800 hover:bg-white/70',
        contentInner: 'px-4 pb-3 text-gray-600',
        icon: 'text-gray-400',
      },
    },
    density: {
      compact: {
        trigger: 'text-sm',
        contentInner: 'text-sm',
      },
      comfortable: {
        trigger: 'text-sm',
        contentInner: 'text-sm',
      },
      spacious: {
        trigger: 'text-base',
        contentInner: 'text-base',
      },
    },
  },
  defaultVariants: { tone: 'neutral', density: 'comfortable' },
});

const chevronOpen = tw('accordion-chevron-open', 'rotate-180');
const iconWrap = tw('accordion-icon-wrap', 'shrink-0');

function normalizeOpenItems(value) {
  if (!value) return new Set();
  if (value instanceof Set) return new Set(value);
  return new Set(Array.isArray(value) ? value : [value]);
}

export function Accordion({
  items = [],
  defaultOpen = [],
  openItems,
  onOpenChange,
  multiple = false,
  tone = 'neutral',
  density = 'comfortable',
  className,
  itemClassName,
  triggerClassName,
  contentClassName,
  contentInnerClassName,
  ...rest
}) {
  const autoId = useId();
  const isControlled = openItems !== undefined;
  const [internalOpen, setInternalOpen] = useState(() => normalizeOpenItems(defaultOpen));
  const [contentHeights, setContentHeights] = useState({});
  const contentInnerRefs = useRef({});

  const resolvedOpen = normalizeOpenItems(isControlled ? openItems : internalOpen);

  const commitOpen = (nextOpen) => {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }
    if (onOpenChange) {
      onOpenChange([...nextOpen]);
    }
  };

  const toggle = (key) => {
    const next = new Set(multiple ? resolvedOpen : []);

    if (resolvedOpen.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }

    commitOpen(next);
  };

  const slots = accordion({ tone, density });

  useLayoutEffect(() => {
    const nextHeights = {};

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const key = item.id ?? i;
      const node = contentInnerRefs.current[key];
      if (node) {
        nextHeights[key] = node.scrollHeight;
      }
    }

    setContentHeights(nextHeights);
  }, [items, tone, density, resolvedOpen.size]);

  return (
    <div className={cx(slots.root, className)} {...rest}>
      {items.map((item, i) => {
        const key = item.id ?? i;
        const isOpen = resolvedOpen.has(key);
        const buttonId = `${autoId}-trigger-${key}`;
        const panelId = `${autoId}-panel-${key}`;

        return (
          <div key={key} className={cx(slots.item, item.className, itemClassName)}>
            <button
              type="button"
              id={buttonId}
              className={cx(slots.trigger, triggerClassName, item.triggerClassName, isOpen && 'bg-gray-50')}
              onClick={() => !item.disabled && toggle(key)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              aria-disabled={item.disabled || undefined}
              disabled={item.disabled}
              style={{ background: 'none', border: 'none' }}
            >
              <span className={slots.triggerContent}>
                {item.icon && <span className={iconWrap}>{item.icon}</span>}
                <span className={cx(slots.title, item.titleClassName)}>{item.title}</span>
              </span>
              <ChevronDown
                className={cx(slots.icon, isOpen && chevronOpen, item.iconClassName)}
                size={16}
                style={{
                  color: 'inherit',
                }}
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              className={cx(slots.content, contentClassName, item.contentClassName)}
              style={{
                maxHeight: isOpen ? `${contentHeights[key] || 0}px` : '0px',
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div
                ref={(node) => {
                  contentInnerRefs.current[key] = node;
                }}
                className={cx(slots.contentInner, contentInnerClassName, item.contentInnerClassName)}
              >
                {typeof item.content === 'string' ? <p>{item.content}</p> : item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
