import React, { useId, useRef, useEffect } from 'react';
import { tw } from 'tailwind-to-style';

/**
 * Textarea component — multi-line input with label, states, sizes, auto-resize.
 */
const textareaField = tw({
  name: 'textarea',
  base: 'block w-full rounded-lg border bg-white text-gray-900 resize-y transition-all duration-200 focus:outline-none focus:ring-2',
  variants: {
    size: {
      sm: 'text-sm px-3 py-2',
      md: 'text-base px-3.5 py-2.5',
      lg: 'text-lg px-4 py-3',
    },
    state: {
      default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20',
      error: 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
      success: 'border-emerald-400 focus:border-emerald-500 focus:ring-emerald-500/20',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed resize-none bg-gray-50',
    },
  },
  defaultVariants: { size: 'md', state: 'default' },
});

const labelStyle = tw({ name: 'textarea-label', _: 'block text-sm font-medium text-gray-700 mb-1.5' });
const helperStyle = tw({ name: 'textarea-helper', _: 'mt-1.5 text-sm text-gray-500' });
const errorStyle = tw({ name: 'textarea-error', _: 'mt-1.5 text-sm text-red-600' });
const successStyle = tw({ name: 'textarea-success', _: 'mt-1.5 text-sm text-emerald-600' });
const countStyle = tw({ name: 'textarea-count', _: 'text-xs text-gray-400' });

export function Textarea({
  label,
  helperText,
  error,
  success,
  size,
  disabled,
  maxLength,
  showCount = false,
  autoResize = false,
  rows = 3,
  value,
  onChange,
  id,
  className,
  ...props
}) {
  const autoId = useId();
  const inputId = id || autoId;
  const ref = useRef(null);

  const state = error ? 'error' : success ? 'success' : 'default';
  const variantProps = { state };
  if (size !== undefined) variantProps.size = size;
  if (disabled) variantProps.disabled = true;

  // Auto-resize effect
  useEffect(() => {
    if (!autoResize || !ref.current) return;
    ref.current.style.height = 'auto';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, [value, autoResize]);

  const charCount = typeof value === 'string' ? value.length : 0;
  const isOverLimit = maxLength && charCount > maxLength;

  return (
    <div className={className}>
      {label && <label htmlFor={inputId} className={labelStyle}>{label}</label>}
      <textarea
        ref={ref}
        id={inputId}
        rows={autoResize ? 1 : rows}
        value={value}
        onChange={onChange}
        disabled={disabled}
        maxLength={maxLength}
        className={textareaField(variantProps)}
        style={autoResize ? { overflow: 'hidden', resize: 'none' } : undefined}
        {...props}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '4px' }}>
        <div>
          {error && <p className={errorStyle}>{error}</p>}
          {success && !error && <p className={successStyle}>{success}</p>}
          {helperText && !error && !success && <p className={helperStyle}>{helperText}</p>}
        </div>
        {(showCount || maxLength) && (
          <span className={countStyle} style={isOverLimit ? { color: '#dc2626' } : undefined}>
            {charCount}{maxLength ? `/${maxLength}` : ''}
          </span>
        )}
      </div>
    </div>
  );
}
