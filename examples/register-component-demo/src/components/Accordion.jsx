import React, { useState } from 'react';
import { cx } from 'tailwind-to-style/register';
import { ChevronDown } from 'lucide-react';

export function Accordion({ items, className }) {
  const [open, setOpen] = useState(null);

  return (
    <div className={cx('accordion', className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="accordion-item">
            <button
              className="accordion-trigger"
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{item.title}</span>
              <ChevronDown
                size={16}
                className={cx('accordion-icon', isOpen && 'accordion-icon-open')}
              />
            </button>
            {isOpen && (
              <div className="accordion-content">{item.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
