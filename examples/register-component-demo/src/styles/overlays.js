import { register } from 'tailwind-to-style/register';

// Tooltip
register.group('tooltip', {
  root:    { tw: 'relative inline-flex items-center' },
  content: {
    tw: 'absolute z-50 whitespace-nowrap pointer-events-none',
    'font-size': '12px',
    'font-weight': '500',
    padding: '5px 10px',
    'border-radius': 'var(--radius-sm)',
    'background-color': '#1f2937',
    color: '#f9fafb',
    'box-shadow': 'var(--shadow-md)',
    animation: 'fadeIn 120ms ease',
  },
  'content-top':    { bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' },
  'content-bottom': { top:    'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' },
  'content-left':   { right:  'calc(100% + 8px)', top: '50%',  transform: 'translateY(-50%)' },
  'content-right':  { left:   'calc(100% + 8px)', top: '50%',  transform: 'translateY(-50%)' },
});

// Dialog
register.group('dialog', {
  overlay: {
    tw: 'fixed inset-0 z-50 flex items-center justify-center p-4',
    'background-color': 'rgba(0,0,0,.5)',
    'backdrop-filter': 'blur(4px)',
    animation: 'overlayIn 180ms ease',
  },
  content: {
    tw: 'relative w-full bg-white rounded-2xl overflow-hidden',
    'max-width': '520px',
    'box-shadow': 'var(--shadow-lg)',
    animation: 'dialogIn 200ms ease',
  },
  header: { tw: 'flex items-start justify-between gap-4 px-6 py-5 border-b', 'border-color': 'var(--c-border)' },
  title:  { tw: 'font-semibold text-lg', color: 'var(--c-text)', 'letter-spacing': '-0.02em' },
  body:   { tw: 'px-6 py-5', 'font-size': '14px', color: 'var(--c-text-muted)', 'line-height': '1.7' },
  footer: { tw: 'flex items-center justify-end gap-3 px-6 py-4 border-t', 'border-color': 'var(--c-border)', 'background-color': 'var(--c-bg)' },
  close:  {
    tw: 'flex items-center justify-center rounded-lg cursor-pointer border-0 transition-colors bg-transparent',
    width: '32px', height: '32px',
    color: 'var(--c-text-muted)',
    '&:hover': { 'background-color': 'var(--c-bg)', color: 'var(--c-text)' },
  },
});
