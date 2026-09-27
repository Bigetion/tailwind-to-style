import { register } from 'tailwind-to-style/register';

// Tabs
register.group('tabs', {
  root: { tw: 'w-full' },
  list: { tw: 'flex items-center gap-1 border-b', 'border-color': 'var(--c-border)', 'margin-bottom': '1.25rem' },
  tab: {
    tw: 'px-4 py-2.5 text-sm font-medium cursor-pointer border-b-2 border-transparent transition-colors -mb-px',
    color: 'var(--c-text-muted)',
    'background-color': 'transparent',
    border: 'none', outline: 'none',
    '&:hover': { color: 'var(--c-text)' },
  },
  'tab-active': {
    tw: 'px-4 py-2.5 text-sm font-semibold cursor-pointer -mb-px',
    color: 'var(--c-brand)',
    'background-color': 'transparent',
    border: 'none', outline: 'none',
    'border-bottom': '2px solid var(--c-brand)',
  },
  panel: { animation: 'fadeIn 200ms ease' },
});

// Accordion
register.group('accordion', {
  root: { tw: 'w-full border rounded-xl overflow-hidden divide-y', 'border-color': 'var(--c-border)' },
  item: {},
  trigger: {
    tw: 'flex items-center justify-between w-full px-5 py-4 text-sm font-medium cursor-pointer border-0 bg-transparent text-left transition-colors',
    color: 'var(--c-text)',
    '&:hover': { 'background-color': 'var(--c-bg)' },
  },
  icon:      { tw: 'flex-shrink-0 transition-transform', color: 'var(--c-text-muted)' },
  'icon-open':{ transform: 'rotate(180deg)' },
  content: {
    tw: 'px-5 text-sm',
    color: 'var(--c-text-muted)',
    'line-height': '1.7',
    'padding-bottom': '1rem',
    'padding-top': '0.25rem',
    animation: 'slideDown 180ms ease',
  },
});

// Breadcrumb
register.group('breadcrumb', {
  root:      { tw: 'flex items-center flex-wrap gap-1', 'font-size': '13px' },
  item:      { tw: 'flex items-center gap-1' },
  link:      { tw: 'font-medium transition-colors', color: 'var(--c-text-muted)', '&:hover': { color: 'var(--c-text)' } },
  separator: { color: 'var(--c-text-light)' },
  current:   { tw: 'font-medium', color: 'var(--c-text)' },
});

// Pagination
register.group('pagination', {
  root: { tw: 'flex items-center gap-1' },
  item: {
    tw: 'inline-flex items-center justify-center text-sm font-medium cursor-pointer border border-transparent transition-all rounded-lg',
    'min-width': '36px', height: '36px',
    padding: '0 8px',
    color: 'var(--c-text-muted)',
    'background-color': 'transparent',
    '&:hover':    { 'background-color': 'var(--c-bg)', color: 'var(--c-text)', 'border-color': 'var(--c-border)' },
    '&:disabled': { opacity: '0.4', cursor: 'not-allowed' },
  },
  'item-active': {
    tw: 'inline-flex items-center justify-center text-sm font-semibold rounded-lg',
    'min-width': '36px', height: '36px',
    'background-color': 'var(--c-brand)',
    color: '#fff',
    border: '1px solid var(--c-brand)',
  },
  ellipsis: { tw: 'inline-flex items-center justify-center text-sm', width: '36px', height: '36px', color: 'var(--c-text-light)' },
});
