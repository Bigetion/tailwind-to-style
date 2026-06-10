import React from 'react';
import { tw, cx } from 'tailwind-to-style';

/**
 * Timeline component — event sequence/history display.
 */
const timelineDot = tw({
  name: 'timeline-dot',
  base: 'flex items-center justify-center rounded-full shrink-0 ring-4 ring-white',
  variants: {
    color: {
      blue:   'bg-blue-500 text-white',
      green:  'bg-emerald-500 text-white',
      red:    'bg-red-500 text-white',
      yellow: 'bg-amber-500 text-white',
      purple: 'bg-purple-500 text-white',
      gray:   'bg-gray-300 text-gray-600',
    },
    size: {
      sm: 'w-6 h-6',
      md: 'w-8 h-8',
      lg: 'w-10 h-10',
    },
  },
  defaultVariants: { color: 'blue', size: 'md' },
});

const timelineContent = tw({
  name: 'timeline-content',
  base: 'flex-1 pb-8',
  variants: {
    last: { true: 'pb-0' },
  },
  defaultVariants: { last: false },
});

export function Timeline({ items = [], size = 'md', className }) {
  return (
    <div className={className} style={{ position: 'relative' }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const dotProps = {};
        if (item.color !== undefined) dotProps.color = item.color;
        if (size !== undefined) dotProps.size = size;

        const iconSize = size === 'sm' ? 12 : size === 'lg' ? 18 : 14;

        return (
          <div key={i} style={{ display: 'flex', gap: '16px' }}>
            {/* Left column: dot + connector */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className={timelineDot(dotProps)}>
                {item.icon
                  ? React.cloneElement(item.icon, { size: iconSize })
                  : <span style={{ width: size === 'sm' ? '6px' : size === 'lg' ? '10px' : '8px', height: size === 'sm' ? '6px' : size === 'lg' ? '10px' : '8px', borderRadius: '50%', backgroundColor: 'white' }} />
                }
              </div>
              {!isLast && (
                <div style={{ width: '2px', flex: 1, backgroundColor: '#e5e7eb', marginTop: '4px' }} />
              )}
            </div>

            {/* Right column: content */}
            <div className={timelineContent({ last: isLast })}>
              <div style={{ marginBottom: '4px' }}>
                <p style={{ fontSize: size === 'sm' ? '0.8rem' : '0.875rem', fontWeight: 600, color: '#111827' }}>
                  {item.title}
                </p>
                {item.time && (
                  <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>
                    {item.time}
                  </span>
                )}
              </div>
              {item.description && (
                <p style={{ fontSize: size === 'sm' ? '0.75rem' : '0.8rem', color: '#6b7280', lineHeight: 1.5 }}>
                  {item.description}
                </p>
              )}
              {item.content && (
                <div style={{ marginTop: '8px' }}>{item.content}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
