import React from 'react';
import { cx } from 'tailwind-to-style/register';
import { X } from 'lucide-react';

export function Tag({ children, variant, onRemove, className }) {
  return (
    <span className={cx('tag', variant && `tag-${variant}`, onRemove && 'tag-removable', className)}>
      {children}
      {onRemove && (
        <button onClick={onRemove} className="tag-remove-btn">
          <X size={11} />
        </button>
      )}
    </span>
  );
}
