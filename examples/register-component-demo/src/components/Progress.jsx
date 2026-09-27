import React from 'react';
import { cx } from 'tailwind-to-style/register';

export function Progress({
  value = 0,
  max = 100,
  variant,
  striped = false,
  label,
  showValue = false,
  className,
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="progress-label">
          {label && <span>{label}</span>}
          {showValue && <span className="progress-value">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className="progress">
        <div
          className={cx(
            'progress-bar',
            variant && `progress-bar-${variant}`,
            striped && 'progress-bar-striped'
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
