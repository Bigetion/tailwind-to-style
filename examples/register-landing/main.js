/**
 * register-landing/main.js
 *
 * Styling via tailwind-to-style/register.
 * Prinsip: tw: handles everything possible, raw CSS only for what
 * Tailwind genuinely can't express (exact values, CSS vars, clamp, etc.)
 */

import { register } from 'tailwind-to-style/register';


// ── DEBUG: print generated CSS to console ────────────────────────────────────
setTimeout(() => {
  // Test 1: twsx basic — apakah Tailwind classes resolve?
  const t1 = twsx({ '.x': 'bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold' }, { inject: false });
  console.log('[t1] twsx basic:', t1 ? '✅' : '❌', t1?.slice(0, 80));

  // Test 2: twsx untuk btn-primary style yang dipakai di register
  const t2 = twsx({ '.btn-primary': 'text-white' }, { inject: false });
  console.log('[t2] twsx tw-only:', t2 ? '✅' : '❌', t2?.slice(0, 80));

  // Test 3: cek isi style tag #tvs-style
  const styleTag = document.getElementById('tvs-style');
  const css = styleTag?.textContent || '';
  console.log('[t3] tvs-style length:', css.length);
  console.log('[t3] has .btn?', css.includes('.btn'));
  console.log('[t3] has .btn-primary?', css.includes('.btn-primary'));
  if (css.includes('.btn-primary')) {
    const start = css.indexOf('.btn-primary');
    console.log('[t3] .btn-primary CSS:', css.slice(start, start + 200));
  }

  // Test 4: cek isi style tag #twsx-auto-style (dari twsx inject)
  const twsxTag = document.getElementById('twsx-auto-style');
  console.log('[t4] twsx-auto-style length:', twsxTag?.textContent?.length || 0);

  // Test 5: semua style tags di document
  const allStyles = [...document.querySelectorAll('style')];
  console.log('[t5] total style tags:', allStyles.length, allStyles.map(s => s.id || '(no id)'));

  // Test 6: apakah btn-primary element punya computed style?
  const btnEl = document.querySelector('.btn.btn-primary');
  if (btnEl) {
    const cs = getComputedStyle(btnEl);
    console.log('[t6] btn-primary computed background:', cs.backgroundColor);
    console.log('[t6] btn-primary computed color:', cs.color);
    console.log('[t6] btn-primary computed padding:', cs.padding);
  } else {
    console.log('[t6] no .btn.btn-primary element found');
  }
}, 1000);
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens — CSS custom properties
// ─────────────────────────────────────────────────────────────────────────────

register(':root', {
  '--brand':       '#6366f1',
  '--brand-dark':  '#4f46e5',
  '--brand-light': '#e0e7ff',
  '--shadow-lg':   '0 8px 40px rgba(0,0,0,.14)',
});

// ─────────────────────────────────────────────────────────────────────────────
// Base
// ─────────────────────────────────────────────────────────────────────────────

register('*', { 'box-sizing': 'border-box', margin: '0', padding: '0' });

register('body', {
  tw: 'text-slate-900 antialiased',
  'font-family': "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
});

// ─────────────────────────────────────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────────────────────────────────────

register('container', {
  tw: 'mx-auto w-full px-6',
  'max-width': '1100px',
});

register('section', {
  tw: 'py-24',
});

register('section-header', {
  tw: 'text-center mb-16',
});

register('section-lead', {
  tw: 'text-lg text-slate-500 leading-relaxed mx-auto text-center',
  'max-width': '580px',
});

register('two-col', {
  tw: 'grid gap-12 items-center',
  'grid-template-columns': 'repeat(auto-fit, minmax(420px, 1fr))',
});

// ─────────────────────────────────────────────────────────────────────────────
// Typography
// ─────────────────────────────────────────────────────────────────────────────

register('eyebrow', {
  tw: 'inline-flex items-center gap-2 text-indigo-600 font-semibold tracking-widest uppercase mb-3',
  'font-size': '12px',
});

register('heading-xl', {
  tw: 'font-extrabold leading-none tracking-tight text-slate-900 mb-6',
  'font-size': 'clamp(2.5rem, 6vw, 4rem)',
});

register('heading-lg', {
  tw: 'font-extrabold leading-tight tracking-tight text-slate-900 mb-4',
  'font-size': 'clamp(1.75rem, 4vw, 2.5rem)',
});

register('heading-md', {
  tw: 'text-2xl font-bold tracking-tight text-slate-900 mb-3',
});

register('lead', {
  tw: 'text-lg leading-relaxed text-slate-500',
  'max-width': '600px',
});

register('text-muted', {
  tw: 'text-sm text-slate-400 leading-relaxed',
});

register('code-inline', {
  tw: 'rounded px-1.5 py-0.5 font-mono text-indigo-700 bg-indigo-50',
  'font-size': '0.85em',
});

// ─────────────────────────────────────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────────────────────────────────────

register('navbar', {
  tw: 'fixed top-0 left-0 right-0 z-50 flex items-center h-16 border-b border-slate-200',
  'background-color': 'rgba(255,255,255,0.85)',
  'backdrop-filter':  'blur(12px)',
  '-webkit-backdrop-filter': 'blur(12px)',
});

register('navbar-inner', {
  tw: 'flex items-center justify-between w-full',
});

register('nav-logo', {
  tw: 'flex items-center gap-2 font-bold text-slate-900 no-underline tracking-tight',
  'font-size': '18px',
  'text-decoration': 'none',
});

register('nav-links', {
  tw: 'flex items-center gap-7',
});

register('nav-link', {
  tw: 'text-sm font-medium text-slate-500 no-underline transition-colors hover:text-slate-900',
  'text-decoration': 'none',
});

// ─────────────────────────────────────────────────────────────────────────────
// Buttons
// ─────────────────────────────────────────────────────────────────────────────

register('btn', {
  base: {
    tw: 'inline-flex items-center justify-center font-semibold leading-none border-0 outline-none cursor-pointer whitespace-nowrap no-underline rounded-lg transition-all',
    'font-family': 'inherit',
    'text-decoration': 'none',
    '&:focus-visible': { tw: 'ring-2 ring-offset-2 ring-indigo-500' },
  },
  modifiers: {
    primary: {
      tw: 'text-white',
      'background-color': 'var(--brand)',
      'box-shadow': '0 2px 8px rgba(99,102,241,.35)',
      '&:hover': {
        'background-color': 'var(--brand-dark)',
        'box-shadow': '0 4px 20px rgba(99,102,241,.45)',
        transform: 'translateY(-1px)',
      },
      '&:active': { transform: 'translateY(0)' },
    },
    outline: {
      tw: 'bg-transparent text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50',
    },
    ghost: {
      tw: 'bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900',
    },
    white: {
      tw: 'bg-white text-indigo-600 shadow-sm hover:shadow-md',
      '&:hover': { transform: 'translateY(-1px)' },
    },
    sm:   { tw: 'px-3 py-2 gap-1.5 text-xs' },
    md:   { tw: 'px-5 py-2.5 gap-2 text-sm' },
    lg:   { tw: 'px-7 py-3.5 gap-2.5 text-base' },
    pill: { tw: 'rounded-full' },
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────

register('hero', {
  tw: 'text-center pt-40 pb-24 px-6 relative overflow-hidden',
});

register('hero-glow', {
  tw: 'absolute pointer-events-none -z-10',
  top: '-250px', left: '50%',
  transform: 'translateX(-50%)',
  width: '900px', height: '700px',
  background: 'radial-gradient(ellipse at center, rgba(99,102,241,.13) 0%, transparent 65%)',
});

register('hero-badge', {
  tw: 'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 mb-6',
});

register('hero-actions', {
  tw: 'flex items-center justify-center gap-3 mt-10 mb-16 flex-wrap',
});

// ─────────────────────────────────────────────────────────────────────────────
// Code blocks
// ─────────────────────────────────────────────────────────────────────────────

register.group('code-block', {
  root: {
    tw: 'rounded-2xl overflow-hidden text-left',
    'background-color': '#0f172a',
    'box-shadow': 'var(--shadow-lg), 0 0 0 1px rgba(255,255,255,.06)',
    'font-family': "'Fira Code', 'Cascadia Code', Consolas, monospace",
    'font-size': '13px',
    'line-height': '1.75',
  },
  header: {
    tw: 'flex items-center gap-2 px-5 py-3 border-b border-white/[.08]',
    'background-color': 'rgba(255,255,255,.04)',
  },
  dot: {
    tw: 'inline-block rounded-full',
    width: '10px', height: '10px',
    'background-color': 'rgba(255,255,255,.18)',
  },
  title: {
    tw: 'font-medium ml-1',
    'font-size': '12px',
    'color': 'rgba(255,255,255,.35)',
    'font-family': 'inherit',
  },
  body: {
    tw: 'p-6 overflow-x-auto',
    'color': 'rgba(255,255,255,.82)',
    'white-space': 'pre',
  },
});

register.group('token', {
  kw:      { color: '#c084fc' },
  fn:      { color: '#60a5fa' },
  str:     { color: '#86efac' },
  prop:    { color: '#93c5fd' },
  punct:   { color: 'rgba(255,255,255,.35)' },
  comment: { color: 'rgba(255,255,255,.3)', 'font-style': 'italic' },
  tag:     { color: '#6ee7b7' },
  attr:    { color: '#fcd34d' },
});

// ─────────────────────────────────────────────────────────────────────────────
// Feature cards
// ─────────────────────────────────────────────────────────────────────────────

register('feature-grid', {
  tw: 'grid gap-6',
  'grid-template-columns': 'repeat(auto-fit, minmax(300px, 1fr))',
});

register('feature-card', {
  tw: 'p-7 rounded-2xl bg-slate-50 border border-slate-200 transition-all hover:-translate-y-0.5 hover:border-indigo-200',
  '&:hover': { 'box-shadow': '0 4px 16px rgba(0,0,0,.10)' },
});

register('feature-icon', {
  tw: 'w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl mb-4',
});

// ─────────────────────────────────────────────────────────────────────────────
// Button demo row
// ─────────────────────────────────────────────────────────────────────────────

register('btn-row', {
  tw: 'flex items-center justify-center gap-3 flex-wrap mb-4',
});

// ─────────────────────────────────────────────────────────────────────────────
// Comparison table
// ─────────────────────────────────────────────────────────────────────────────

register('compare-wrap', {
  tw: 'rounded-2xl overflow-hidden border border-slate-200',
});

register('compare-table', {
  tw: 'w-full text-sm',
  'border-collapse': 'collapse',
});

register.group('compare', {
  th: {
    tw: 'text-left px-5 py-4 text-xs font-semibold tracking-widest uppercase text-slate-400 border-b-2 border-slate-200',
  },
  'th-brand': {
    tw: 'text-indigo-600 bg-indigo-50/50',
  },
  td: {
    tw: 'px-5 py-4 text-slate-500 border-b border-slate-100 align-middle',
  },
  'td-brand': {
    tw: 'font-medium text-slate-900 bg-indigo-50/30',
  },
  check: { tw: 'text-green-500 font-bold text-base' },
  cross: { tw: 'text-red-400 text-base' },
  row:   { tw: 'transition-colors hover:bg-slate-50' },
});

// ─────────────────────────────────────────────────────────────────────────────
// CTA
// ─────────────────────────────────────────────────────────────────────────────

register('cta-section', {
  tw: 'rounded-3xl text-center py-20 px-8 relative overflow-hidden',
  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
});

register('cta-glow', {
  tw: 'absolute inset-0 pointer-events-none',
  background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,.18) 0%, transparent 60%)',
});

register('cta-actions', {
  tw: 'flex items-center justify-center gap-3 mt-10 flex-wrap relative z-10',
});

// ─────────────────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────────────────

register('footer', {
  tw: 'py-12 border-t border-slate-200 bg-slate-50',
});

register('footer-inner', {
  tw: 'flex items-center justify-between flex-wrap gap-4',
});

register('divider', {
  tw: 'border-0 border-t border-slate-200',
});
