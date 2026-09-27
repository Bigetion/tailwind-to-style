import { register } from 'tailwind-to-style/register';

register('btn', {
  base: {
    tw: 'inline-flex items-center justify-center gap-2 font-semibold leading-none cursor-pointer border-0 outline-none select-none whitespace-nowrap transition-all',
    'font-family': 'inherit',
    'border-radius': 'var(--radius-md)',
    '&:focus': 'ring-2 ring-offset-1',
    '&:active': { transform: 'scale(.98)' },
    '&:disabled': { opacity: '0.5', cursor: 'not-allowed', 'pointer-events': 'none' },
  },
  modifiers: {
    primary: { tw: 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' },
    secondary: { tw: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400' },
    danger: { tw: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500' },
    success: { tw: 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500' },
    ghost: { tw: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-300' },
    outline: { tw: 'bg-transparent text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500' },
    xs: { tw: 'px-2.5 py-1.5 text-xs', 'border-radius': 'var(--radius-sm)' },
    sm: { tw: 'px-3 py-2 text-sm' },
    md: { tw: 'px-4 py-2.5 text-sm' },
    lg: { tw: 'px-6 py-3 text-base' },
    xl: { tw: 'px-8 py-4 text-base' },
    pill: { 'border-radius': 'var(--radius-full)' },
    'icon-sm': { tw: 'p-2', 'border-radius': 'var(--radius-sm)' },
    'icon-md': { tw: 'p-2.5' },
    'icon-lg': { tw: 'p-3' },
    block: { tw: 'w-full' },
  },
});
