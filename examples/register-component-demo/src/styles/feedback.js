import { register } from 'tailwind-to-style/register';

// Spinner
register('spinner', {
  base: {
    tw: 'inline-block rounded-full border-2 border-current',
    'border-top-color': 'transparent',
    animation: 'spin 0.7s linear infinite',
  },
  modifiers: {
    xs: { width: '14px', height: '14px' },
    sm: { width: '18px', height: '18px' },
    md: { width: '24px', height: '24px' },
    lg: { width: '32px', height: '32px' },
    xl: { width: '48px', height: '48px' },
    primary: { color: 'var(--c-brand)' },
    white:   { color: '#fff' },
    gray:    { color: 'var(--c-text-muted)' },
  },
});

// Skeleton
register('skeleton', {
  base: {
    'border-radius': 'var(--radius-md)',
    background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
    'background-size': '200% 100%',
    animation: 'shimmer 1.6s ease-in-out infinite',
  },
  modifiers: {
    text:   { height: '14px', 'margin-bottom': '8px' },
    title:  { height: '20px', 'margin-bottom': '12px' },
    avatar: { width: '40px', height: '40px', 'border-radius': '9999px', 'flex-shrink': '0' },
    btn:    { height: '36px', width: '80px' },
    card:   { height: '120px', 'border-radius': 'var(--radius-xl)' },
    circle: { 'border-radius': '9999px' },
  },
});

// Progress
register.group('progress', {
  root:  { tw: 'w-full overflow-hidden rounded-full', height: '8px', 'background-color': 'var(--c-border)' },
  bar:   { height: '100%', 'border-radius': 'inherit', transition: 'width 400ms ease', 'background-color': 'var(--c-brand)' },
  'bar-success': { 'background-color': 'var(--c-success)' },
  'bar-warning': { 'background-color': 'var(--c-warning)' },
  'bar-danger':  { 'background-color': 'var(--c-danger)' },
  'bar-striped': {
    'background-image': 'linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)',
    'background-size': '16px 16px',
    animation: 'shimmer 1s linear infinite',
  },
  label: { tw: 'flex items-center justify-between text-xs mb-1.5', color: 'var(--c-text-muted)' },
  value: { tw: 'font-semibold text-xs', color: 'var(--c-text)' },
});

// Toast
register.group('toast', {
  container: { tw: 'fixed bottom-5 right-5 flex flex-col gap-3 z-50', 'pointer-events': 'none' },
  item: {
    tw: 'flex items-start gap-3 rounded-xl border bg-white px-4 py-3',
    'font-size': '13px',
    'min-width': '300px',
    'max-width': '400px',
    'pointer-events': 'auto',
    'border-color': 'var(--c-border)',
    'box-shadow': 'var(--shadow-lg)',
    animation: 'toastIn 220ms ease',
  },
  icon:  { tw: 'flex-shrink-0 mt-0.5' },
  body:  { tw: 'flex-1 min-w-0' },
  title: { tw: 'font-semibold mb-0.5', 'font-size': '13px', color: 'var(--c-text)' },
  desc:  { 'font-size': '12px', color: 'var(--c-text-muted)' },
  close: { tw: 'flex-shrink-0 cursor-pointer border-0 bg-transparent p-0.5 rounded', color: 'var(--c-text-light)', '&:hover': { color: 'var(--c-text)' } },
  'item-success': { 'border-left': '3px solid var(--c-success)' },
  'item-warning': { 'border-left': '3px solid var(--c-warning)' },
  'item-danger':  { 'border-left': '3px solid var(--c-danger)' },
  'item-info':    { 'border-left': '3px solid var(--c-info)' },
});
