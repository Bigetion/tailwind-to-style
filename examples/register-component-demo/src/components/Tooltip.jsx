import React, { useState } from 'react';
import { cx } from 'tailwind-to-style/register';

export function Tooltip({ children, content, placement = 'top', className }) {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className={cx('tooltip', className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && content && (
        <div className={cx('tooltip-content', `tooltip-content-${placement}`)}>
          {content}
        </div>
      )}
    </div>
  );
}
