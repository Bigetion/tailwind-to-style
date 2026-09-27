import React from 'react';
import { cx } from 'tailwind-to-style/register';

export function Badge({ children, variant = 'default', size, dot, className }) {
  if (dot) {
    return <span className={cx('badge badge-dot', `badge-dot-${variant}`, className)} />;
  }
  return (
    <span className={cx('badge', `badge-${variant}`, size && `badge-${size}`, className)}>
      {children}
    </span>
  );
}
