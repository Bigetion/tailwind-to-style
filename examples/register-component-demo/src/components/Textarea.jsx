import React from 'react';
import { cx } from 'tailwind-to-style/register';

export function Textarea({ label, hint, error, rows = 4, className, ...props }) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <textarea
        rows={rows}
        className={cx('textarea-field', error && 'textarea-field-error', className)}
        {...props}
      />
      {error  && <span className="form-error">{error}</span>}
      {!error && hint && <span className="form-hint">{hint}</span>}
    </div>
  );
}
