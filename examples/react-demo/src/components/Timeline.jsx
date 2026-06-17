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
    <div className={cx(tw('relative'), className)}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const dotProps = {};
        if (item.color !== undefined) dotProps.color = item.color;
        if (size !== undefined) dotProps.size = size;

        const iconSize = size === 'sm' ? 12 : size === 'lg' ? 18 : 14;

        return (
          <div key={i} className={tw('flex gap-4')}>
            {/* Left column: dot + connector */}
            <div className={tw('flex flex-col items-center')}>
              <div className={timelineDot(dotProps)}>
                {item.icon
                  ? React.cloneElement(item.icon, { size: iconSize })
                  : <span style={{ width: size === 'sm' ? '6px' : size === 'lg' ? '10px' : '8px', height: size === 'sm' ? '6px' : size === 'lg' ? '10px' : '8px', borderRadius: '50%', backgroundColor: 'white' }} />
                }
              </div>
              {!isLast && (
                <div className={tw('flex-1 mt-1')} style={{ width: '2px', backgroundColor: '#e5e7eb' }} />
              )}
            </div>

            {/* Right column: content */}
            <div className={timelineContent({ last: isLast })}>
              <div className={tw('mb-1')}>
                <p className={tw('font-semibold text-gray-900')} style={{ fontSize: size === 'sm' ? '0.8rem' : '0.875rem' }}>
                  {item.title}
                </p>
                {item.time && (
                  <span className={tw('text-xs text-gray-400')}>
                    {item.time}
                  </span>
                )}
              </div>
              {item.description && (
                <p className={tw('text-gray-500')} style={{ fontSize: size === 'sm' ? '0.75rem' : '0.8rem', lineHeight: 1.5 }}>
                  {item.description}
                </p>
              )}
              {item.content && (
                <div className={tw('mt-2')}>{item.content}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
