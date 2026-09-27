import React, { useState, useRef, useEffect } from 'react';
import { cx } from 'tailwind-to-style/register';
import { ChevronDown, Check } from 'lucide-react';

export function Select({ options = [], value, onChange, placeholder = 'Select…', label, className }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const selected = options.find(o => o.value === value);

  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <div className={cx('select', className)} ref={ref}>
        <button className="select-trigger" onClick={() => setOpen(v => !v)}>
          <span style={{ color: selected ? 'var(--c-text)' : 'var(--c-text-light)' }}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown size={15} style={{ color: 'var(--c-text-muted)', transition: 'transform 150ms', transform: open ? 'rotate(180deg)' : 'none' }} />
        </button>
        {open && (
          <div className="select-dropdown">
            {options.map(opt => (
              <div
                key={opt.value}
                className={value === opt.value ? 'select-option-selected' : 'select-option'}
                onClick={() => { onChange?.(opt.value); setOpen(false); }}
              >
                {value === opt.value && <Check size={14} />}
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
