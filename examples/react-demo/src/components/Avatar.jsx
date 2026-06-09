import React from 'react';
import { tw, cx } from 'tailwind-to-style';

/**
 * Avatar component — profile image with fallback initials.
 * Variants: size, shape
 */
const avatar = tw({
  name: 'avatar',
  base: 'relative inline-flex items-center justify-center bg-gray-200 text-gray-600 font-medium select-none',
  variants: {
    size: {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-12 h-12 text-base',
      xl: 'w-16 h-16 text-lg',
      '2xl': 'w-20 h-20 text-xl',
    },
    shape: {
      circle: 'rounded-full',
      square: 'rounded-lg',
    },
  },
  defaultVariants: { size: 'md', shape: 'circle' },
});

const statusDot = tw({
  name: 'avatar-status',
  base: 'absolute border-2 border-white rounded-full',
  variants: {
    color: {
      online: 'bg-emerald-500',
      offline: 'bg-gray-400',
      busy: 'bg-red-500',
      away: 'bg-amber-500',
    },
    size: {
      xs: 'w-1.5 h-1.5 bottom-0 right-0',
      sm: 'w-2 h-2 bottom-0 right-0',
      md: 'w-2.5 h-2.5 bottom-0 right-0',
      lg: 'w-3 h-3 bottom-0 right-0',
      xl: 'w-3.5 h-3.5 bottom-0 right-0',
      '2xl': 'w-4 h-4 bottom-0.5 right-0.5',
    },
  },
  defaultVariants: { color: 'online', size: 'md' },
});

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({
  src,
  alt,
  name,
  size,
  shape,
  status,
  className,
}) {
  const variantProps = {};
  if (size !== undefined) variantProps.size = size;
  if (shape !== undefined) variantProps.shape = shape;

  const statusProps = {};
  if (status) statusProps.color = status;
  if (size !== undefined) statusProps.size = size;

  return (
    <span className={cx(avatar(variantProps), className)}>
      {src ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
      {status && <span className={statusDot(statusProps)} />}
    </span>
  );
}

/**
 * AvatarGroup — stack avatars with overlap
 */
export function AvatarGroup({ children, max, size }) {
  const items = React.Children.toArray(children);
  const visible = max ? items.slice(0, max) : items;
  const remaining = max ? items.length - max : 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {visible.map((child, i) => (
        <div key={i} style={{ marginLeft: i === 0 ? 0 : '-8px', position: 'relative', zIndex: visible.length - i }}>
          {child}
        </div>
      ))}
      {remaining > 0 && (
        <span
          className={avatar({ size: size || 'md', shape: 'circle' })}
          style={{ marginLeft: '-8px', background: '#e5e7eb', fontSize: '0.7rem', zIndex: 0 }}
        >
          +{remaining}
        </span>
      )}
    </div>
  );
}
