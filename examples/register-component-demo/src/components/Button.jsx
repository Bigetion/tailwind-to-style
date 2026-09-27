import React from 'react';
import { cx } from 'tailwind-to-style/register';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  pill = false,
  block = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  className,
  ...props
}) {
  return (
    <button
      className={cx(
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        pill && 'btn-pill',
        block && 'btn-block',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="spinner spinner-sm spinner-white" />}
      {!loading && leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}

export function IconButton({ icon, variant = 'ghost', size = 'md', className, ...props }) {
  return (
    <button
      className={cx('btn', `btn-${variant}`, `btn-icon-${size}`, className)}
      {...props}
    >
      {icon}
    </button>
  );
}
