import React, { useState, useRef, useEffect } from 'react';
import { tw, cx } from 'tailwind-to-style';

/**
 * Popover component — floating content panel with auto-placement.
 * Auto-flips to avoid viewport overflow.
 * position: 'top' | 'bottom' | 'left' | 'right' | 'bottom-start' | 'bottom-end' | 'auto'
 */
const POPOVER_CLS = tw({ name: 'popover-panel', base: 'bg-white rounded-xl border border-gray-200 shadow-xl', variants: { open: { true: '' } }, defaultVariants: { open: true } });

function getPositionStyles(position, triggerRect, panelRect, viewportW, viewportH) {
  const gap = 8;
  const panelH = panelRect.height || 200;
  const panelW = panelRect.width || 240;
  const triggerH = triggerRect.height;
  const triggerW = triggerRect.width;

  const spaceBelow = viewportH - triggerRect.bottom;
  const spaceAbove = triggerRect.top;

  // Auto placement
  let resolved = position;
  if (position === 'auto') {
    resolved = spaceBelow >= panelH + gap || spaceBelow >= spaceAbove ? 'bottom-start' : 'top-start';
  }

  // Flip vertical
  if (resolved.startsWith('bottom') && spaceBelow < panelH + gap && spaceAbove > spaceBelow) {
    resolved = resolved.replace('bottom', 'top');
  } else if (resolved.startsWith('top') && spaceAbove < panelH + gap && spaceBelow > spaceAbove) {
    resolved = resolved.replace('top', 'bottom');
  }

  // Calculate vertical offset (relative to container)
  let verticalStyle = {};
  if (resolved.startsWith('bottom')) {
    verticalStyle = { top: triggerH + gap };
  } else if (resolved.startsWith('top')) {
    verticalStyle = { bottom: triggerH + gap };
  } else if (resolved === 'right' || resolved === 'left') {
    verticalStyle = { top: triggerH / 2 - panelH / 2 };
  }

  // Calculate horizontal: compute where panel would land in VIEWPORT coords
  // then clamp to viewport, then convert back to container-relative
  let panelViewportLeft;
  if (resolved.endsWith('-end') || resolved === 'left') {
    // Align panel right edge with trigger right edge (bottom-end / top-end)
    // OR panel on left side of trigger (left)
    panelViewportLeft = resolved === 'left'
      ? triggerRect.left - panelW - gap
      : triggerRect.right - panelW;
  } else if (resolved.endsWith('-start') || resolved === 'right') {
    // Align panel left edge with trigger left edge (bottom-start / top-start)
    // OR panel on right side of trigger (right)
    panelViewportLeft = resolved === 'right'
      ? triggerRect.right + gap
      : triggerRect.left;
  } else {
    // center
    panelViewportLeft = triggerRect.left + triggerW / 2 - panelW / 2;
  }

  // Clamp to viewport (8px margin on each side)
  const margin = 8;
  panelViewportLeft = Math.max(margin, Math.min(panelViewportLeft, viewportW - panelW - margin));

  // Convert viewport-absolute left back to container-relative left
  const relativeLeft = panelViewportLeft - triggerRect.left;

  return { ...verticalStyle, left: relativeLeft };
}

export function Popover({
  trigger,
  children,
  position = 'bottom-start',
  width = '240px',
  className,
}) {
  const [open, setOpen] = useState(false);
  const [panelStyles, setPanelStyles] = useState({ visibility: 'hidden' });
  const containerRef = useRef(null);
  const panelRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  // Reset visibility when closed
  useEffect(() => {
    if (!open) setPanelStyles({ visibility: 'hidden' });
  }, [open]);

  // Recompute position on resize (debounced)
  useEffect(() => {
    if (!open) return;
    let raf = null;
    const handleResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!containerRef.current || !panelRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const panelRect = panelRef.current.getBoundingClientRect();
        const styles = getPositionStyles(position, containerRect, panelRect, window.innerWidth, window.innerHeight);
        setPanelStyles({ ...styles, visibility: 'visible' });
      });
    };
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); cancelAnimationFrame(raf); };
  }, [open, position]);

  // Compute position after panel mounts (it's invisible so no layout flash)
  useEffect(() => {
    if (!open || !containerRef.current || !panelRef.current) return;

    // rAF ensures DOM has rendered the panel at hidden state
    const raf = requestAnimationFrame(() => {
      if (!containerRef.current || !panelRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const panelRect = panelRef.current.getBoundingClientRect();
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;

      const styles = getPositionStyles(position, containerRect, panelRect, viewportW, viewportH);
      setPanelStyles({ ...styles, visibility: 'visible' });
    });

    return () => cancelAnimationFrame(raf);
  }, [open, position]);

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', display: 'inline-block' }}
      className={className}
    >
      <div onClick={() => setOpen(!open)}>
        {trigger}
      </div>
      {open && (
        <div
          ref={panelRef}
          className={POPOVER_CLS()}
          style={{ position: 'absolute', zIndex: 50, width, minWidth: '180px', ...panelStyles }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * Popover sub-components for structured content
 */
export function PopoverHeader({ children, className }) {
  const header = tw('popover-header', 'px-4 py-3 border-b border-gray-100 font-semibold text-sm text-gray-900');
  return <div className={cx(header, className)}>{children}</div>;
}

export function PopoverBody({ children, className }) {
  const body = tw('popover-body', 'px-4 py-3');
  return <div className={cx(body, className)}>{children}</div>;
}

export function PopoverFooter({ children, className }) {
  const footer = tw('popover-footer', 'px-4 py-3 border-t border-gray-100');
  return <div className={cx(footer, className)}>{children}</div>;
}
