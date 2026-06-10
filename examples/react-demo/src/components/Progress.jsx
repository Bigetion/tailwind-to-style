import React from 'react';
import { tw, cx } from 'tailwind-to-style';

/**
 * Progress component — visual progress indicator.
 * Variants: color, size, striped
 */
const track = tw({
  name: 'progress-track',
  base: 'w-full overflow-hidden rounded-full bg-gray-200',
  variants: {
    size: {
      xs: 'h-1',
      sm: 'h-1.5',
      md: 'h-2.5',
      lg: 'h-4',
      xl: 'h-6',
    },
  },
  defaultVariants: { size: 'md' },
});

const fill = tw({
  name: 'progress-fill',
  base: 'h-full rounded-full transition-all duration-500 ease-out',
  variants: {
    color: {
      blue: 'bg-blue-500',
      green: 'bg-emerald-500',
      red: 'bg-red-500',
      yellow: 'bg-amber-500',
      purple: 'bg-purple-500',
      indigo: 'bg-indigo-500',
    },
  },
  defaultVariants: { color: 'blue' },
});

const labelStyle = tw({ name: 'progress-label', _: 'flex justify-between items-center mb-1' });
const labelText = tw({ name: 'progress-label-text', _: 'text-sm font-medium text-gray-700' });
const labelValue = tw({ name: 'progress-label-value', _: 'text-sm text-gray-500' });

export function Progress({
  value = 0,
  max = 100,
  color,
  size,
  label,
  showValue = true,
  striped = false,
  animated = false,
  className,
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  const trackProps = {};
  if (size !== undefined) trackProps.size = size;

  const fillProps = {};
  if (color !== undefined) fillProps.color = color;

  const stripedStyle = striped ? {
    backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)',
    backgroundSize: '1rem 1rem',
    ...(animated ? { animation: 'progress-stripe 1s linear infinite' } : {}),
  } : {};

  return (
    <div className={className}>
      {label && (
        <div className={labelStyle}>
          <span className={labelText}>{label}</span>
          {showValue && <span className={labelValue}>{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={track(trackProps)} role="progressbar" aria-valuenow={value} aria-valuemax={max}>
        <div
          className={fill(fillProps)}
          style={{ width: `${pct}%`, ...stripedStyle }}
        />
      </div>
    </div>
  );
}
