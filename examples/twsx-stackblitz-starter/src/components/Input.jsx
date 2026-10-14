import React from 'react';
import { cx, tw } from 'tailwind-to-style';

const input = tw({
  name: 'input',
  base: 'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100',
  variants: {
    state: {
      default: 'border-slate-200',
      error: 'border-red-300 focus:border-red-500 focus:ring-red-100',
    },
    size: {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-sm',
    },
  },
  defaultVariants: { state: 'default', size: 'md' },
});

function Input({ state = 'default', size = 'md', className = '', ...props }) {
  return <input {...props} className={cx(input({ state, size }), className)} />;
}

export { Input, input };
