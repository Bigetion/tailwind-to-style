import React from 'react';
import { cx } from 'tailwind-to-style/register';

export function Skeleton({ variant = 'text', width, height, className, style }) {
  return (
    <span
      className={cx('skeleton', `skeleton-${variant}`, className)}
      style={{ ...(width && { width }), ...(height && { height }), ...style }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="card-root">
      <div className="card-body" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
        <Skeleton variant="avatar" />
        <div style={{ flex: 1 }}>
          <Skeleton variant="title" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      <Skeleton variant="text" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="75%" />
    </div>
  );
}
