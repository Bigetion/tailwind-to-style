import React from 'react';
import { cx } from 'tailwind-to-style/register';

export function Input({
  label,
  hint,
  error,
  size = 'md',
  leftIcon,
  className,
  ...props
}) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <div className={cx('form-addon', leftIcon && 'relative')}>
        {leftIcon && (
          <span className="form-addon-icon" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)', position: 'absolute' }}>
            {leftIcon}
          </span>
        )}
        <input
          className={cx(
            'input-field',
            `input-field-${size}`,
            error && 'input-field-error',
            className
          )}
          style={leftIcon ? { paddingLeft: '34px' } : undefined}
          {...props}
        />
      </div>
      {error  && <span className="form-error">{error}</span>}
      {!error && hint && <span className="form-hint">{hint}</span>}
    </div>
  );
}
