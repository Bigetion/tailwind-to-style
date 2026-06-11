import React from 'react';
import { tw, cx } from 'tailwind-to-style';

/**
 * Skeleton component — loading placeholder with shimmer animation.
 */
const skeleton = tw({
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
    <div className={tw('flex flex-col gap-2')}>
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
    <div className={tw('p-4 bg-white rounded-xl border border-gray-200')}>
      {avatar && (
        <div className={tw('flex items-center gap-3 mb-4')}>
          <Skeleton shape="circle" width="40px" height="40px" />
          <div className={tw('flex-1')}>
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
