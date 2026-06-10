import React, { useId } from 'react';
import { tw, cx } from 'tailwind-to-style';
import { ChevronDown, AlertCircle, CheckCircle } from 'lucide-react';

/**
 * Select component — styled native select with label, states, sizes.
 */
const selectWrapper = tw({ name: 'select-wrapper', _: 'relative' });

const selectField = tw({
  name: 'select',
  base: 'block w-full rounded-lg border bg-white text-gray-900 appearance-none pr-10 cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2',
  variants: {
    size: {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-3.5 py-2.5',
      lg: 'text-lg px-4 py-3',
    },
    state: {
      default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20',
      error: 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
      success: 'border-emerald-400 focus:border-emerald-500 focus:ring-emerald-500/20',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed bg-gray-50',
    },
  },
  defaultVariants: { size: 'md', state: 'default' },
});

const labelStyle = tw({ name: 'select-label', _: 'block text-sm font-medium text-gray-700 mb-1.5' });
const helperStyle = tw({ name: 'select-helper', _: 'mt-1.5 text-sm text-gray-500' });
const errorStyle = tw({ name: 'select-error', _: 'mt-1.5 text-sm text-red-600 flex items-center gap-1' });
const successStyle = tw({ name: 'select-success', _: 'mt-1.5 text-sm text-emerald-600 flex items-center gap-1' });
const iconWrapper = tw({ name: 'select-icon', _: 'absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400' });

export function Select({
  label,
  options = [],
  groups = [],
  placeholder,
  value,
  onChange,
  size,
  disabled,
  error,
  success,
  helperText,
  id,
  className,
  ...props
}) {
  const autoId = useId();
  const inputId = id || autoId;
  const state = error ? 'error' : success ? 'success' : 'default';

  const variantProps = { state };
  if (size !== undefined) variantProps.size = size;
  if (disabled) variantProps.disabled = true;

  return (
    <div className={className}>
      {label && <label htmlFor={inputId} className={labelStyle}>{label}</label>}
      <div className={selectWrapper}>
        <select
          id={inputId}
          className={selectField(variantProps)}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>{placeholder}</option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
          {groups.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <span className={iconWrapper}>
          <ChevronDown size={16} />
        </span>
      </div>
      {error && (
        <p className={errorStyle}>
          <AlertCircle size={14} />
          {error}
        </p>
      )}
      {success && !error && (
        <p className={successStyle}>
          <CheckCircle size={14} />
          {success}
        </p>
      )}
      {helperText && !error && !success && <p className={helperStyle}>{helperText}</p>}
    </div>
  );
}
