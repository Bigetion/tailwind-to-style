import React from 'react';
import { cx } from 'tailwind-to-style/register';
import { Check, Minus } from 'lucide-react';

export function Checkbox({ checked = false, indeterminate = false, onChange, label, size = 'md', disabled }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
      <button
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        onClick={() => !disabled && onChange?.(!checked)}
        className={cx(
          'checkbox',
          (checked || indeterminate) && 'checkbox-checked',
          indeterminate && 'checkbox-indeterminate',
          size !== 'md' && `checkbox-${size}`
        )}
      >
        {indeterminate
          ? <Minus size={11} color="#fff" strokeWidth={3} />
          : checked && <Check size={11} color="#fff" strokeWidth={3} />
        }
      </button>
      {label && <span style={{ fontSize: '14px', fontWeight: 500 }}>{label}</span>}
    </label>
  );
}
