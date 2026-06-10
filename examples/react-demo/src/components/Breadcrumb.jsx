import React from 'react';
import { tw, cx } from 'tailwind-to-style';
import { ChevronRight, Slash, Home } from 'lucide-react';

/**
 * Breadcrumb component — navigation path indicator.
 * separator: 'slash' | 'chevron' | 'dot' | custom element
 */
const breadcrumbLink = tw({
  name: 'breadcrumb-link',
  base: 'text-sm transition-colors duration-150',
  variants: {
    active: {
      true: 'text-gray-900 font-medium cursor-default',
      false: 'text-gray-500 hover:text-gray-900 cursor-pointer',
    },
  },
  defaultVariants: { active: false },
});

const separatorStyle = tw('breadcrumb-sep', 'text-gray-400 flex items-center');
const breadcrumbList = tw('breadcrumb-list', 'flex items-center flex-wrap gap-1');

const separatorMap = {
  chevron: <ChevronRight size={14} />,
  slash: <span style={{ fontSize: '14px', lineHeight: 1 }}>/</span>,
  dot: <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#d1d5db', display: 'inline-block' }} />,
};

export function Breadcrumb({
  items = [],
  separator = 'chevron',
  showHome = false,
  className,
}) {
  const sep = typeof separator === 'string' ? separatorMap[separator] ?? separatorMap.chevron : separator;

  const allItems = showHome
    ? [{ label: <Home size={14} />, href: '/' }, ...items]
    : items;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className={breadcrumbList}>
        {allItems.map((item, i) => {
          const isLast = i === allItems.length - 1;
          return (
            <React.Fragment key={i}>
              <li style={{ display: 'flex', alignItems: 'center' }}>
                {item.href && !isLast ? (
                  <a
                    href={item.href}
                    className={breadcrumbLink({ active: false })}
                    onClick={e => { e.preventDefault(); item.onClick?.(); }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className={breadcrumbLink({ active: isLast })}>
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <li className={separatorStyle} aria-hidden="true">
                  {sep}
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
