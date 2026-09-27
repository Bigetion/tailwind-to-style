import React from 'react';
import { cx } from 'tailwind-to-style/register';

export function Toggle({ checked = false, onChange, size = 'md', label, disabled }) {
  const sizeKey = size === 'md' ? '' : size;
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange?.(!checked)}
        className={cx('toggle', checked && 'toggle-on', size !== 'md' && `toggle-${size}`)}
      >
        <span
          className={cx(
            'toggle-thumb',
            checked && (sizeKey ? `toggle-thumb-${sizeKey}-on` : 'toggle-thumb-on'),
            sizeKey && `toggle-thumb-${sizeKey}`
          )}
        />
      </button>
      {label && <span style={{ fontSize: '14px', fontWeight: 500 }}>{label}</span>}
    </label>
  );
}
