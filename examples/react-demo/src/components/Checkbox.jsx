import React, { useId } from 'react';
import { tw } from 'tailwind-to-style';

// Color map for checked state
const colorStyles = {
  blue:   { bg: '#2563eb', border: '#2563eb' },
  green:  { bg: '#059669', border: '#059669' },
  red:    { bg: '#dc2626', border: '#dc2626' },
  purple: { bg: '#7c3aed', border: '#7c3aed' },
};

const sizeMap = {
  sm: { box: '14px', radius: '3px', icon: 9 },
  md: { box: '18px', radius: '4px', icon: 11 },
  lg: { box: '22px', radius: '5px', icon: 13 },
};

const dotSizeMap = {
  sm: { box: '14px', dot: '6px' },
  md: { box: '18px', dot: '8px' },
  lg: { box: '22px', dot: '10px' },
};

const labelCls = tw('cb-label', 'text-sm font-medium text-gray-700 cursor-pointer select-none');
const descCls  = tw('cb-desc',  'text-xs text-gray-500 mt-0.5');
const errorCls = tw('cb-error', 'text-xs text-red-600 mt-1');

// ─── Checkbox ────────────────────────────────────────────────────────────────

export function Checkbox({
  label,
  description,
  checked,
  onChange,
  size = 'md',
  color = 'blue',
  error,
  disabled,
  indeterminate,
  id,
  style,
  className,
}) {
  const autoId = useId();
  const inputId = id || autoId;
  const colors = colorStyles[color] || colorStyles.blue;
  const dims = sizeMap[size] || sizeMap.md;
  const isActive = !!checked || !!indeterminate;

  // Box appearance
  let boxBg = '#fff';
  let boxBorder = '#d1d5db';   // gray-300
  if (disabled) {
    boxBg = '#f3f4f6';
    boxBorder = '#e5e7eb';
  } else if (error) {
    boxBorder = '#f87171';     // red-400
  } else if (isActive) {
    boxBg = colors.bg;
    boxBorder = colors.border;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', ...style }} className={className}>
      {/* Hidden real input for a11y + form submit */}
      <input
        type="checkbox"
        id={inputId}
        checked={!!checked}
        onChange={onChange}
        disabled={disabled}
        ref={el => { if (el) el.indeterminate = !!indeterminate; }}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
        aria-label={typeof label === 'string' ? label : undefined}
      />

      {/* Custom box */}
      <label
        htmlFor={inputId}
        style={{
          display:         'inline-flex',
          alignItems:      'center',
          justifyContent:  'center',
          flexShrink:      0,
          width:           dims.box,
          height:          dims.box,
          minWidth:        dims.box,
          borderRadius:    dims.radius,
          border:          `2px solid ${boxBorder}`,
          backgroundColor: boxBg,
          cursor:          disabled ? 'not-allowed' : 'pointer',
          transition:      'background-color 150ms, border-color 150ms',
          marginTop:       '2px',
        }}
      >
        {isActive && (
          indeterminate ? (
            <svg width={dims.icon} height={dims.icon} viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8" stroke={disabled ? '#9ca3af' : 'white'} strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width={dims.icon} height={dims.icon} viewBox="0 0 12 12" fill="none">
              <path d="M1.5 6.5L4.5 9.5L10.5 3" stroke={disabled ? '#9ca3af' : 'white'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )
        )}
      </label>

      {/* Text area */}
      {(label || description || error) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {label && (
            <label
              htmlFor={inputId}
              className={labelCls}
              style={disabled ? { opacity: 0.45, cursor: 'not-allowed' } : undefined}
            >
              {label}
            </label>
          )}
          {description && <p className={descCls}>{description}</p>}
          {error && <p className={errorCls}>{error}</p>}
        </div>
      )}
    </div>
  );
}

// ─── Radio ────────────────────────────────────────────────────────────────────

export function Radio({
  label,
  description,
  checked,
  onChange,
  value,
  name,
  size = 'md',
  color = 'blue',
  disabled,
  id,
  className,
}) {
  const autoId = useId();
  const inputId = id || autoId;
  const colors = colorStyles[color] || colorStyles.blue;
  const dims = dotSizeMap[size] || dotSizeMap.md;

  let outerBorder = '#d1d5db';
  let outerBg = '#fff';
  if (disabled)       { outerBorder = '#e5e7eb'; outerBg = '#f3f4f6'; }
  else if (checked)   { outerBorder = colors.border; }

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }} className={className}>
      <input
        type="radio"
        id={inputId}
        name={name}
        value={value}
        checked={!!checked}
        onChange={onChange}
        disabled={disabled}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      <label
        htmlFor={inputId}
        style={{
          display:         'inline-flex',
          alignItems:      'center',
          justifyContent:  'center',
          flexShrink:      0,
          width:           dims.box,
          height:          dims.box,
          minWidth:        dims.box,
          borderRadius:    '50%',
          border:          `2px solid ${outerBorder}`,
          backgroundColor: outerBg,
          cursor:          disabled ? 'not-allowed' : 'pointer',
          transition:      'border-color 150ms',
          marginTop:       '2px',
        }}
      >
        {checked && !disabled && (
          <span style={{
            width:           dims.dot,
            height:          dims.dot,
            borderRadius:    '50%',
            backgroundColor: colors.bg,
          }} />
        )}
      </label>

      {(label || description) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {label && (
            <label
              htmlFor={inputId}
              className={labelCls}
              style={disabled ? { opacity: 0.45, cursor: 'not-allowed' } : undefined}
            >
              {label}
            </label>
          )}
          {description && <p className={descCls}>{description}</p>}
        </div>
      )}
    </div>
  );
}

// ─── RadioGroup ───────────────────────────────────────────────────────────────

export function RadioGroup({ label, options, value, onChange, name, color, size, error, className }) {
  return (
    <div className={className}>
      {label && (
        <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
          {label}
        </p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {options.map(opt => (
          <Radio
            key={opt.value}
            name={name}
            value={opt.value}
            label={opt.label}
            description={opt.description}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            color={color}
            size={size}
            disabled={opt.disabled}
          />
        ))}
      </div>
      {error && (
        <p style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '4px' }}>{error}</p>
      )}
    </div>
  );
}
