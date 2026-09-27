import { register } from 'tailwind-to-style/register';

// Card
register.group('card', {
  root:   { tw: 'rounded-xl border bg-white', 'border-color': 'var(--c-border)', 'box-shadow': 'var(--shadow-sm)' },
  header: { tw: 'flex items-center justify-between px-5 py-4 border-b', 'border-color': 'var(--c-border)' },
  title:  { tw: 'font-semibold text-base', color: 'var(--c-text)' },
  body:   { tw: 'px-5 py-4' },
  footer: {
    tw: 'flex items-center gap-3 px-5 py-4 border-t',
    'border-color': 'var(--c-border)',
    'background-color': 'var(--c-bg)',
    'border-radius': '0 0 var(--radius-xl) var(--radius-xl)',
  },
});

// Avatar
register('avatar', {
  base: {
    tw: 'inline-flex items-center justify-center rounded-full font-semibold flex-shrink-0 overflow-hidden',
    'background-color': 'var(--c-brand-light)',
    color: 'var(--c-brand)',
  },
  modifiers: {
    xs:     { width: '24px', height: '24px', 'font-size': '10px' },
    sm:     { width: '32px', height: '32px', 'font-size': '12px' },
    md:     { width: '40px', height: '40px', 'font-size': '14px' },
    lg:     { width: '52px', height: '52px', 'font-size': '18px' },
    xl:     { width: '64px', height: '64px', 'font-size': '22px' },
    square: { 'border-radius': 'var(--radius-md)' },
    online: { outline: '2px solid var(--c-success)',    'outline-offset': '2px' },
    offline:{ outline: '2px solid var(--c-text-light)', 'outline-offset': '2px' },
  },
});

register.group('avatar', {
  group:       { tw: 'flex items-center' },
  'group-item':{ 'margin-left': '-8px', border: '2px solid var(--c-surface)', 'border-radius': '9999px' },
});

// Alert
register('alert', {
  base: {
    tw: 'flex items-start gap-3 rounded-lg px-4 py-3',
    'font-size': '14px',
    'line-height': '1.5',
    border: '1px solid transparent',
  },
  modifiers: {
    info:    { 'background-color': 'var(--c-info-bg)',    color: 'var(--c-info)',    'border-color': 'rgba(37,99,235,.2)' },
    success: { 'background-color': 'var(--c-success-bg)', color: 'var(--c-success)', 'border-color': 'rgba(22,163,74,.2)' },
    warning: { 'background-color': 'var(--c-warning-bg)', color: 'var(--c-warning)', 'border-color': 'rgba(217,119,6,.2)' },
    danger:  { 'background-color': 'var(--c-danger-bg)',  color: 'var(--c-danger)',  'border-color': 'rgba(220,38,38,.2)' },
  },
});

register.group('alert', {
  icon:  { tw: 'flex-shrink-0 mt-0.5' },
  body:  { tw: 'flex-1 min-w-0' },
  title: { tw: 'font-semibold mb-0.5', 'font-size': '14px' },
  desc:  { 'font-size': '13px', opacity: '0.85' },
});

// Tag
register('tag', {
  base: {
    tw: 'inline-flex items-center gap-1.5 font-medium rounded-full transition-all',
    'font-size': '12px',
    padding: '3px 10px',
    'background-color': 'var(--c-bg)',
    border: '1px solid var(--c-border)',
    color: 'var(--c-text-muted)',
  },
  modifiers: {
    primary: { 'background-color': 'var(--c-brand-light)', color: 'var(--c-brand)', 'border-color': 'rgba(99,102,241,.2)' },
    success: { 'background-color': 'var(--c-success-bg)', color: 'var(--c-success)', 'border-color': 'rgba(22,163,74,.2)' },
    warning: { 'background-color': 'var(--c-warning-bg)', color: 'var(--c-warning)', 'border-color': 'rgba(217,119,6,.2)' },
    danger:  { 'background-color': 'var(--c-danger-bg)',  color: 'var(--c-danger)',  'border-color': 'rgba(220,38,38,.2)' },
    removable: { 'padding-right': '4px' },
    'remove-btn': {
      tw: 'inline-flex items-center justify-center rounded-full cursor-pointer border-0 bg-transparent transition-colors p-0.5',
      color: 'inherit', opacity: '0.6',
      '&:hover': { opacity: '1', 'background-color': 'rgba(0,0,0,.1)' },
    },
  },
});

// Table
register.group('table', {
  root:  { tw: 'w-full border rounded-xl overflow-hidden', 'border-color': 'var(--c-border)' },
  table: { tw: 'w-full border-collapse', 'font-size': '14px' },
  thead: { 'border-bottom': '1px solid var(--c-border)', 'background-color': 'var(--c-bg)' },
  th:    { tw: 'text-left px-4 py-3 font-semibold', 'font-size': '12px', 'text-transform': 'uppercase', 'letter-spacing': '0.05em', color: 'var(--c-text-muted)' },
  tr:    { 'border-bottom': '1px solid var(--c-border)', transition: 'background-color 120ms', '&:hover': { 'background-color': 'var(--c-bg)' } },
  'tr-last': { 'border-bottom': 'none' },
  td:    { tw: 'px-4 py-3', color: 'var(--c-text)', 'vertical-align': 'middle' },
  empty: { tw: 'text-center py-12 text-sm', color: 'var(--c-text-muted)' },
});

// Stat card
register.group('stat', {
  card:  { tw: 'p-5 rounded-xl border bg-white', 'border-color': 'var(--c-border)', 'box-shadow': 'var(--shadow-sm)' },
  label: { tw: 'text-xs font-semibold uppercase tracking-widest mb-2', color: 'var(--c-text-muted)' },
  value: { tw: 'font-black leading-none mb-1', 'font-size': '2rem', 'letter-spacing': '-0.04em', color: 'var(--c-text)' },
  change:       { tw: 'text-xs font-semibold', color: 'var(--c-text-muted)' },
  'change-up':  { color: 'var(--c-success)' },
  'change-down':{ color: 'var(--c-danger)' },
  icon: { tw: 'flex items-center justify-center rounded-xl', width: '44px', height: '44px', 'background-color': 'var(--c-brand-light)', color: 'var(--c-brand)' },
});
