import React, { useState, useRef, useCallback } from 'react';
import { tw, cx } from 'tailwind-to-style';

/**
 * Tooltip component — hover/focus popup for contextual info.
 * Positions: top, bottom, left, right
 */
const tooltipBox = tw({
  name: 'tooltip',
  base: 'absolute z-50 px-2.5 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md whitespace-nowrap pointer-events-none shadow-lg',
  variants: {
    position: {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    },
    visible: {
      true: 'opacity-100 scale-100',
      false: 'opacity-0 scale-95 pointer-events-none',
    },
  },
  defaultVariants: { position: 'top', visible: false },
});

// Arrow styles per position
const arrowStyles = {
  top: {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '4px solid transparent',
    borderRight: '4px solid transparent',
    borderTop: '4px solid #111827',
  },
  bottom: {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '4px solid transparent',
    borderRight: '4px solid transparent',
    borderBottom: '4px solid #111827',
  },
  left: {
    position: 'absolute',
    left: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 0,
    height: 0,
    borderTop: '4px solid transparent',
    borderBottom: '4px solid transparent',
    borderLeft: '4px solid #111827',
  },
  right: {
    position: 'absolute',
    right: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 0,
    height: 0,
    borderTop: '4px solid transparent',
    borderBottom: '4px solid transparent',
    borderRight: '4px solid #111827',
  },
};

export function Tooltip({
  content,
  children,
  position = 'top',
  delay = 200,
  disabled,
  className,
}) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  const show = useCallback(() => {
    if (disabled) return;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  }, [disabled, delay]);

  const hide = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  }, []);

  if (!content) return children;

  return (
    <span
      style={{ position: 'relative', display: 'inline-flex' }}
      className={className}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      <span
        className={tooltipBox({ position, visible: visible ? true : false })}
        style={{ transition: 'opacity 150ms, transform 150ms' }}
        role="tooltip"
      >
        {content}
        <span style={arrowStyles[position]} />
      </span>
    </span>
  );
}
