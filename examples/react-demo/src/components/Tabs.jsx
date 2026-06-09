import React, { useState } from 'react';
import { tw, cx } from 'tailwind-to-style';

/**
 * Tabs component — switchable content panels.
 * Variants: variant (underline, pills, enclosed)
 */
const tabList = tw({
  name: 'tab-list',
  base: 'flex',
  variants: {
    variant: {
      underline: 'border-b border-gray-200 gap-0',
      pills: 'gap-1 bg-gray-100 p-1 rounded-lg',
      enclosed: 'border-b border-gray-200 gap-0',
    },
  },
  defaultVariants: { variant: 'underline' },
});

const tab = tw({
  name: 'tab',
  base: 'inline-flex items-center justify-center gap-2 font-medium cursor-pointer select-none transition-all duration-200',
  variants: {
    variant: {
      underline: 'px-4 py-2.5 text-sm border-b-2 -mb-px',
      pills: 'px-3 py-1.5 text-sm rounded-md',
      enclosed: 'px-4 py-2.5 text-sm border border-b-0 rounded-t-lg -mb-px',
    },
    active: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { variant: 'underline', active: true, class: 'border-blue-500 text-blue-600' },
    { variant: 'underline', active: false, class: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300' },
    { variant: 'pills', active: true, class: 'bg-white text-gray-900 shadow-sm' },
    { variant: 'pills', active: false, class: 'text-gray-500 hover:text-gray-700' },
    { variant: 'enclosed', active: true, class: 'border-gray-200 bg-white text-gray-900' },
    { variant: 'enclosed', active: false, class: 'border-transparent text-gray-500 hover:text-gray-700' },
  ],
  defaultVariants: { variant: 'underline', active: false },
});

const tabPanel = tw({ name: 'tab-panel', _: 'py-4' });

export function Tabs({
  items,
  defaultIndex = 0,
  variant,
  className,
}) {
  const [active, setActive] = useState(defaultIndex);

  const listProps = {};
  if (variant !== undefined) listProps.variant = variant;

  return (
    <div className={className}>
      <div className={tabList(listProps)} role="tablist">
        {items.map((item, i) => {
          const tabProps = { active: i === active };
          if (variant !== undefined) tabProps.variant = variant;

          return (
            <button
              key={item.label}
              role="tab"
              aria-selected={i === active}
              className={tab(tabProps)}
              onClick={() => setActive(i)}
              type="button"
            >
              {item.icon && item.icon}
              {item.label}
              {item.count !== undefined && (
                <span style={{ fontSize: '0.7rem', background: i === active ? '#dbeafe' : '#f3f4f6', color: i === active ? '#2563eb' : '#6b7280', padding: '1px 6px', borderRadius: '9999px' }}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className={tabPanel} role="tabpanel">
        {items[active]?.content}
      </div>
    </div>
  );
}
