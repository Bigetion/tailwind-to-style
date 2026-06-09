import React from 'react';
import { tw, cx } from 'tailwind-to-style';

/**
 * Toggle/Switch component — on/off control.
 * Variants: size, color
 */
const track = tw({
  name: 'toggle-track',
  base: 'relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200',
  variants: {
    size: {
      sm: 'w-8 h-4',
      md: 'w-11 h-6',
      lg: 'w-14 h-7',
    },
    checked: {
      true: '',
      false: 'bg-gray-200',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
  },
  defaultVariants: { size: 'md', checked: false },
});

const thumb = tw({
  name: 'toggle-thumb',
  base: 'pointer-events-none inline-block rounded-full bg-white shadow-sm ring-0 transition-transform duration-200',
  variants: {
    size: {
      sm: 'w-3 h-3',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    },
    checked: {
      true: '',
      false: 'translate-x-0',
    },
  },
  defaultVariants: { size: 'md', checked: false },
});

const labelStyle = tw({ name: 'toggle-label', _: 'text-sm text-gray-700 select-none' });
const descStyle = tw({ name: 'toggle-desc', _: 'text-xs text-gray-500' });

const checkedColors = {
  blue: '#3b82f6',
  green: '#10b981',
  red: '#ef4444',
  purple: '#8b5cf6',
  amber: '#f59e0b',
};

const translateMap = {
  sm: '16px',
  md: '20px',
  lg: '28px',
};

export function Toggle({
  checked = false,
  onChange,
  label,
  description,
  size,
  color = 'blue',
  disabled,
  className,
}) {
  const trackProps = { checked: checked ? true : false };
  if (size !== undefined) trackProps.size = size;
  if (disabled) trackProps.disabled = true;

  const thumbProps = { checked: checked ? true : false };
  if (size !== undefined) thumbProps.size = size;

  const effectiveSize = size || 'md';

  return (
    <label className={cx('inline-flex items-center gap-3', className)} style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        className={track(trackProps)}
        style={checked ? { backgroundColor: checkedColors[color] || checkedColors.blue } : undefined}
      >
        <span
          className={thumb(thumbProps)}
          style={checked ? { transform: `translateX(${translateMap[effectiveSize]})` } : undefined}
        />
      </button>
      {(label || description) && (
        <div>
          {label && <span className={labelStyle}>{label}</span>}
          {description && <p className={descStyle}>{description}</p>}
        </div>
      )}
    </label>
  );
}
