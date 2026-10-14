import React from 'react';
import { cx, tw } from 'tailwind-to-style';

const button = tw({
  name: 'button',
  base: 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30',
  variants: {
    tone: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300',
      outline: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100',
      danger: 'bg-red-600 text-white hover:bg-red-700',
    },
    size: {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-5 text-base',
    },
  },
  defaultVariants: { tone: 'primary', size: 'md' },
});

function Button({ tone = 'primary', size = 'md', className = '', children, type = 'button', ...props }) {
  return (
    <button {...props} type={type} className={cx(button({ tone, size }), className)}>
      {children}
    </button>
  );
}

export { Button, button };
