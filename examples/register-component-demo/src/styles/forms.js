import { register } from 'tailwind-to-style/register';

// Input
register('input-field', {
  base: {
    tw: 'w-full border outline-none transition-all',
    'font-family': 'inherit',
    'font-size': '14px',
    'border-radius': 'var(--radius-md)',
    'border-color': 'var(--c-border)',
    'background-color': 'var(--c-surface)',
    color: 'var(--c-text)',
    '&:focus':        { 'border-color': 'var(--c-border-focus)', 'box-shadow': '0 0 0 3px var(--c-brand-ring)' },
    '&:disabled':     { opacity: '0.6', cursor: 'not-allowed', 'background-color': 'var(--c-bg)' },
    '&::placeholder': { color: 'var(--c-text-light)' },
  },
  modifiers: {
    sm:    { padding: '6px 10px',  'font-size': '13px' },
    md:    { padding: '8px 12px',  'font-size': '14px' },
    lg:    { padding: '11px 14px', 'font-size': '15px' },
    error: { 'border-color': 'var(--c-danger)', '&:focus': { 'border-color': 'var(--c-danger)', 'box-shadow': '0 0 0 3px rgba(220,38,38,.2)' } },
  },
});

// Textarea
register('textarea-field', {
  base: {
    tw: 'w-full border outline-none transition-all resize-y',
    'font-family': 'inherit',
    'font-size': '14px',
    'line-height': '1.6',
    padding: '8px 12px',
    'border-radius': 'var(--radius-md)',
    'border-color': 'var(--c-border)',
    'background-color': 'var(--c-surface)',
    color: 'var(--c-text)',
    '&:focus':        { 'border-color': 'var(--c-border-focus)', 'box-shadow': '0 0 0 3px var(--c-brand-ring)' },
    '&::placeholder': { color: 'var(--c-text-light)' },
  },
  modifiers: {
    error: { 'border-color': 'var(--c-danger)', '&:focus': { 'border-color': 'var(--c-danger)', 'box-shadow': '0 0 0 3px rgba(220,38,38,.2)' } },
  },
});

// Form group
register.group('form', {
  group:        { tw: 'flex flex-col gap-1.5 w-full' },
  label:        { tw: 'text-sm font-medium', color: 'var(--c-text)' },
  hint:         { tw: 'text-xs', color: 'var(--c-text-muted)' },
  error:        { tw: 'text-xs', color: 'var(--c-danger)' },
  addon:        { tw: 'flex items-center relative' },
  'addon-icon': { tw: 'absolute left-3 pointer-events-none', color: 'var(--c-text-light)' },
});

// Select
register.group('select', {
  root: { tw: 'relative w-full' },
  trigger: {
    tw: 'flex items-center justify-between w-full border cursor-pointer transition-all',
    padding: '8px 12px',
    'font-size': '14px',
    'font-family': 'inherit',
    'border-color': 'var(--c-border)',
    'border-radius': 'var(--radius-md)',
    'background-color': 'var(--c-surface)',
    color: 'var(--c-text)',
    outline: 'none',
    '&:focus': { 'border-color': 'var(--c-border-focus)', 'box-shadow': '0 0 0 3px var(--c-brand-ring)' },
  },
  dropdown: {
    tw: 'absolute left-0 right-0 top-full mt-1 z-50 overflow-hidden rounded-xl border bg-white',
    'border-color': 'var(--c-border)',
    'box-shadow': 'var(--shadow-lg)',
    animation: 'slideDown 150ms ease',
  },
  option: {
    tw: 'flex items-center gap-2 px-4 py-2.5 text-sm cursor-pointer transition-colors',
    color: 'var(--c-text)',
    '&:hover': { 'background-color': 'var(--c-bg)' },
  },
  'option-selected': {
    tw: 'flex items-center gap-2 px-4 py-2.5 text-sm cursor-pointer font-medium',
    color: 'var(--c-brand)',
    'background-color': 'var(--c-brand-light)',
  },
});

// Toggle
register('toggle', {
  base: {
    tw: 'relative inline-flex items-center rounded-full cursor-pointer flex-shrink-0 transition-colors border-0 outline-none',
    width: '40px', height: '22px',
    'background-color': 'var(--c-border)',
    '&:focus-visible': { outline: '2px solid var(--c-brand)', 'outline-offset': '2px' },
  },
  modifiers: {
    on: { 'background-color': 'var(--c-brand)' },
    sm: { width: '32px', height: '18px' },
    lg: { width: '48px', height: '26px' },
  },
});

register('toggle-thumb', {
  base: {
    tw: 'absolute rounded-full bg-white shadow-sm transition-transform',
    width: '16px', height: '16px',
    top: '3px', left: '3px',
  },
  modifiers: {
    on:    { transform: 'translateX(18px)' },
    sm:    { width: '12px', height: '12px' },
    lg:    { width: '20px', height: '20px' },
    'lg-on': { transform: 'translateX(22px)' },
    'sm-on': { transform: 'translateX(14px)' },
  },
});

// Checkbox
register('checkbox', {
  base: {
    tw: 'inline-flex items-center justify-center flex-shrink-0 border rounded transition-all cursor-pointer',
    width: '18px', height: '18px',
    'border-color': 'var(--c-border)',
    'background-color': 'var(--c-surface)',
    'border-radius': 'var(--radius-sm)',
    '&:focus-visible': { outline: '2px solid var(--c-brand)', 'outline-offset': '2px' },
  },
  modifiers: {
    checked:      { 'background-color': 'var(--c-brand)', 'border-color': 'var(--c-brand)' },
    indeterminate:{ 'background-color': 'var(--c-brand)', 'border-color': 'var(--c-brand)' },
    sm: { width: '14px', height: '14px' },
    lg: { width: '22px', height: '22px' },
  },
});
