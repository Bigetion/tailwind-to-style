import React, { forwardRef, useId } from 'react';
import { tw, cx } from 'tailwind-to-style';
import { useControllableState } from './_core/componentUtils';

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

const labelStyle = tw('toggle-label', 'text-sm text-gray-700 select-none');
const descStyle = tw('toggle-desc', 'text-xs text-gray-500');

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

export const Toggle = forwardRef(function Toggle({
  checked,
  defaultChecked = false,
  onCheckedChange,
  onChange,
  label,
  description,
  size,
  color = 'blue',
  disabled,
  className,
  id,
  ...props
}, ref) {
  const [isChecked, setIsChecked] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  });

  const fallbackId = useId();
  const switchId = id || `toggle-${fallbackId}`;
  const descriptionId = description ? `${switchId}-desc` : undefined;

  const trackProps = { checked: isChecked ? true : false };
  if (size !== undefined) trackProps.size = size;
  if (disabled) trackProps.disabled = true;

  const thumbProps = { checked: isChecked ? true : false };
  if (size !== undefined) thumbProps.size = size;

  const effectiveSize = size || 'md';

  const handleToggle = () => {
    if (disabled) return;
    const next = !isChecked;
    setIsChecked(next);
    onChange?.(next);
  };

  return (
    <label className={cx('inline-flex items-center gap-3', className)} style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
      <button
        {...props}
        ref={ref}
        id={switchId}
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-describedby={descriptionId}
        disabled={disabled}
        onClick={handleToggle}
        className={track(trackProps)}
        style={isChecked ? { backgroundColor: checkedColors[color] || checkedColors.blue } : undefined}
      >
        <span
          className={thumb(thumbProps)}
          style={isChecked ? { transform: `translateX(${translateMap[effectiveSize]})` } : undefined}
        />
      </button>
      {(label || description) && (
        <div>
          {label && <span className={labelStyle}>{label}</span>}
          {description && <p id={descriptionId} className={descStyle}>{description}</p>}
        </div>
      )}
    </label>
  );
});
