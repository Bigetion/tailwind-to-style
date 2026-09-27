import React from 'react';
import { cx } from 'tailwind-to-style/register';

export function Avatar({
  src, alt, initials,
  size = 'md',
  square = false,
  status,
  className,
}) {
  return (
    <span
      className={cx(
        'avatar',
        `avatar-${size}`,
        square && 'avatar-square',
        status && `avatar-${status}`,
        className
      )}
    >
      {src
        ? <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : initials}
    </span>
  );
}

export function AvatarGroup({ children, className }) {
  return (
    <div className={cx('avatar-group', className)}>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          className: cx(child.props.className, 'avatar-group-item'),
        })
      )}
    </div>
  );
}
