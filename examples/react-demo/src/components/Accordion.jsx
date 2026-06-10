import React, { useState } from 'react';
import { tw, cx } from 'tailwind-to-style';
import { ChevronDown } from 'lucide-react';

/**
 * Accordion component — expandable content sections.
 * Supports single or multiple open panels.
 */
const accordionRoot = tw({ name: 'accordion', _: 'rounded-lg border border-gray-200 overflow-hidden divide-y divide-gray-200' });
const accordionItem = tw({ name: 'accordion-item', _: 'bg-white' });
const accordionTrigger = tw({ name: 'accordion-trigger', _: 'flex items-center justify-between w-full px-4 py-3 text-left text-sm font-medium text-gray-900 cursor-pointer select-none hover:bg-gray-50 transition-colors' });
const accordionContent = tw({ name: 'accordion-content', _: 'px-4 pb-3 text-sm text-gray-600' });

export function Accordion({
  items,
  defaultOpen = [],
  multiple = false,
  className,
}) {
  const [open, setOpen] = useState(new Set(defaultOpen));

  const toggle = (index) => {
    setOpen((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={cx(accordionRoot, className)}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div key={i} className={accordionItem}>
            <button
              type="button"
              className={accordionTrigger}
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              style={{ background: 'none', border: 'none' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {item.icon && item.icon}
                {item.title}
              </span>
              <ChevronDown
                size={16}
                style={{
                  transition: 'transform 200ms',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  color: '#9ca3af',
                }}
              />
            </button>
            <div
              style={{
                overflow: 'hidden',
                maxHeight: isOpen ? '500px' : '0px',
                opacity: isOpen ? 1 : 0,
                transition: 'max-height 200ms ease, opacity 200ms ease',
              }}
            >
              <div className={accordionContent}>
                {typeof item.content === 'string' ? <p>{item.content}</p> : item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
