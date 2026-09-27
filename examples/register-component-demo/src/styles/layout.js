import { register } from 'tailwind-to-style/register';

register.all({
  'app-shell': { tw: 'flex min-h-screen', 'background-color': 'var(--c-bg)' },
  'sidebar': {
    tw: 'flex flex-col flex-shrink-0 border-r overflow-y-auto',
    width: '240px',
    'background-color': 'var(--c-surface)',
    'border-color': 'var(--c-border)',
    padding: '1.25rem 0',
    position: 'sticky',
    top: '0',
    height: '100vh',
  },
  'sidebar-logo': {
    tw: 'flex items-center gap-2 font-black px-5 mb-6',
    'font-size': '17px',
    'letter-spacing': '-0.04em',
    color: 'var(--c-text)',
  },
  'sidebar-group-label': {
    tw: 'block px-4 font-semibold tracking-widest uppercase mb-1 mt-4',
    'font-size': '10px',
    color: 'var(--c-text-light)',
  },
  'sidebar-item': {
    tw: 'flex items-center gap-2.5 w-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer border-0 bg-transparent text-left',
    color: 'var(--c-text-muted)',
    'border-radius': '0',
    '&:hover': { color: 'var(--c-text)', 'background-color': 'var(--c-bg)' },
  },
  'sidebar-item-active': {
    tw: 'flex items-center gap-2.5 w-full px-4 py-2 text-sm font-semibold cursor-pointer border-0 text-left',
    color: 'var(--c-brand)',
    'background-color': 'var(--c-brand-light)',
    'border-radius': '0',
  },
  'main-content': { tw: 'flex-1 overflow-y-auto', padding: '2.5rem 3rem', 'max-width': '900px' },
  'demo-header':   { tw: 'mb-8', 'border-bottom': '1px solid var(--c-border)', 'padding-bottom': '1.25rem' },
  'demo-title':    { tw: 'font-bold mb-1', 'font-size': '1.75rem', 'letter-spacing': '-0.025em', color: 'var(--c-text)' },
  'demo-desc':     { 'font-size': '15px', color: 'var(--c-text-muted)', 'line-height': '1.6' },
  'demo-section':  { tw: 'mb-10' },
  'demo-section-title': {
    tw: 'font-semibold mb-4',
    'font-size': '13px',
    'letter-spacing': '0.05em',
    'text-transform': 'uppercase',
    color: 'var(--c-text-light)',
  },
  'demo-row':  { tw: 'flex flex-wrap items-center gap-3' },
  'demo-col':  { tw: 'flex flex-col gap-3' },
  'demo-grid': { tw: 'grid gap-4', 'grid-template-columns': 'repeat(auto-fit, minmax(280px, 1fr))' },
  'code-badge': {
    tw: 'inline-flex items-center px-2 py-0.5 rounded font-mono',
    'font-size': '12px',
    'background-color': 'var(--c-brand-light)',
    color: 'var(--c-brand)',
  },
});
