import React from 'react';
import { twsxClassName, cx } from 'tailwind-to-style';

/**
 * Skeleton component — loading placeholder with shimmer animation.
 */
const skeleton = twsxClassName({
  name: 'skeleton',
  base: 'bg-gray-200 animate-pulse',
  variants: {
    shape: {
      line: 'rounded',
      circle: 'rounded-full',
      rect: 'rounded-lg',
    },
  },
  defaultVariants: { shape: 'line' },
});

export function Skeleton({
  width,
  height,
  shape = 'line',
  className,
  style,
}) {
  const variantProps = {};
  if (shape !== undefined) variantProps.shape = shape;

  return (
    <div
      className={cx(skeleton(variantProps), className)}
      style={{ width, height, ...style }}
      aria-hidden="true"
    />
  );
}

/**
 * SkeletonText — multiple lines of skeleton text
 */
export function SkeletonText({ lines = 3, lastLineWidth = '70%' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height="14px"
          width={i === lines - 1 && lines > 1 ? lastLineWidth : '100%'}
        />
      ))}
    </div>
  );
}

/**
 * SkeletonCard — full card loading placeholder
 */
export function SkeletonCard({ avatar = false, lines = 3 }) {
  return (
    <div style={{ padding: '16px', background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
      {avatar && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <Skeleton shape="circle" width="40px" height="40px" />
          <div style={{ flex: 1 }}>
            <Skeleton height="14px" width="40%" style={{ marginBottom: '6px' }} />
            <Skeleton height="12px" width="25%" />
          </div>
        </div>
      )}
      {!avatar && <Skeleton height="16px" width="50%" style={{ marginBottom: '12px' }} />}
      <SkeletonText lines={lines} />
    </div>
  );
}
