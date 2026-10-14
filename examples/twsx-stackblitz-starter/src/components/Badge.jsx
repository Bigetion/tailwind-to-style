import React from 'react';
import { cx, tw } from 'tailwind-to-style';

const badge = tw({
  name: 'badge',
  base: 'inline-flex items-center rounded-full border font-medium',
  variants: {
    tone: {
      neutral: 'border-slate-200 bg-slate-100 text-slate-700',
      primary: 'border-blue-200 bg-blue-100 text-blue-700',
      success: 'border-emerald-200 bg-emerald-100 text-emerald-700',
      warning: 'border-amber-200 bg-amber-100 text-amber-700',
    },
    size: {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
    },
  },
  defaultVariants: { tone: 'neutral', size: 'md' },
});

function Badge({ tone = 'neutral', size = 'md', className = '', children }) {
  return <span className={cx(badge({ tone, size }), className)}>{children}</span>;
}

export { Badge, badge };
