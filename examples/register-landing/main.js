/**
 * register-landing/main.js
 *
 * Entire design system defined via register.all() — one call per concern.
 * tw: handles everything Tailwind can express, raw CSS only for exact
 * values Tailwind can't (clamp, CSS vars, gradients, vendor prefixes).
 */

import { register } from 'tailwind-to-style/register';

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens + global reset
// ─────────────────────────────────────────────────────────────────────────────

register.all({
  ':root': {
    '--brand':       '#6366f1',
    '--brand-dark':  '#4f46e5',
    '--brand-light': '#e0e7ff',
    '--shadow-lg':   '0 8px 40px rgba(0,0,0,.14)',
  },
  '*':    { 'box-sizing': 'border-box', margin: '0', padding: '0' },
  'body': {
    tw: 'text-slate-900 antialiased',
    'font-family': "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────────────────────────────────────

register.all({
  'container':     { tw: 'mx-auto w-full px-6', 'max-width': '1100px' },
  'section':       { tw: 'py-24' },
  'section-header':{ tw: 'text-center mb-16' },
  'section-lead':  { tw: 'text-lg text-slate-500 leading-relaxed mx-auto text-center', 'max-width': '580px' },
  'two-col': {
    tw: 'grid gap-12 items-center',
    'grid-template-columns': 'repeat(auto-fit, minmax(420px, 1fr))',
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// Typography
// ─────────────────────────────────────────────────────────────────────────────

register.all({
  'eyebrow': {
    tw: 'inline-flex items-center gap-2 text-indigo-600 font-semibold tracking-widest uppercase mb-3',
    'font-size': '12px',
  },
  'heading-xl': {
    tw: 'font-extrabold leading-none tracking-tight text-slate-900 mb-6',
    'font-size': 'clamp(2.5rem, 6vw, 4rem)',
  },
  'heading-lg': {
    tw: 'font-extrabold leading-tight tracking-tight text-slate-900 mb-4',
    'font-size': 'clamp(1.75rem, 4vw, 2.5rem)',
  },
  'heading-md':  { tw: 'text-2xl font-bold tracking-tight text-slate-900 mb-3' },
  'lead':        { tw: 'text-lg leading-relaxed text-slate-500', 'max-width': '600px' },
  'text-muted':  { tw: 'text-sm text-slate-400 leading-relaxed' },
  'code-inline': {
    tw: 'rounded px-1.5 py-0.5 font-mono text-indigo-700 bg-indigo-50',
    'font-size': '0.85em',
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────────────────────────────────────

register.all({
  'navbar': {
    tw: 'fixed top-0 left-0 right-0 z-50 flex items-center h-16 border-b border-slate-200',
    'background-color': 'rgba(255,255,255,0.85)',
    'backdrop-filter': 'blur(12px)',
    '-webkit-backdrop-filter': 'blur(12px)',
  },
  'navbar-inner': { tw: 'flex items-center justify-between w-full' },
  'nav-logo': {
    tw: 'flex items-center gap-2 font-bold text-slate-900 tracking-tight',
    'font-size': '18px',
    'text-decoration': 'none',
  },
  'nav-links': { tw: 'flex items-center gap-7' },
  'nav-link': {
    tw: 'text-sm font-medium text-slate-500 transition-colors hover:text-slate-900',
    'text-decoration': 'none',
  },
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
    outline: { tw: 'bg-transparent text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50' },
    ghost:   { tw: 'bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900' },
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

register.all({
  'hero':         { tw: 'text-center pt-40 pb-24 px-6 relative overflow-hidden' },
  'hero-glow': {
    tw: 'absolute pointer-events-none -z-10',
    top: '-250px', left: '50%',
    transform: 'translateX(-50%)',
    width: '900px', height: '700px',
    background: 'radial-gradient(ellipse at center, rgba(99,102,241,.13) 0%, transparent 65%)',
  },
  'hero-badge':   { tw: 'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 mb-6' },
  'hero-actions': { tw: 'flex items-center justify-center gap-3 mt-10 mb-16 flex-wrap' },
});

// ─────────────────────────────────────────────────────────────────────────────
// Code blocks + syntax tokens
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
    color: 'rgba(255,255,255,.35)',
    'font-family': 'inherit',
  },
  body: {
    tw: 'p-6 overflow-x-auto',
    color: 'rgba(255,255,255,.82)',
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

register.all({
  'feature-grid': {
    tw: 'grid gap-6',
    'grid-template-columns': 'repeat(auto-fit, minmax(300px, 1fr))',
  },
  'feature-card': {
    tw: 'p-7 rounded-2xl bg-slate-50 border border-slate-200 transition-all hover:-translate-y-0.5 hover:border-indigo-200',
    '&:hover': { 'box-shadow': '0 4px 16px rgba(0,0,0,.10)' },
  },
  'feature-icon': { tw: 'w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl mb-4' },
});

// ─────────────────────────────────────────────────────────────────────────────
// Demo + comparison
// ─────────────────────────────────────────────────────────────────────────────

register.all({
  'btn-row':       { tw: 'flex items-center justify-center gap-3 flex-wrap mb-4' },
  'compare-wrap':  { tw: 'rounded-2xl overflow-hidden border border-slate-200' },
  'compare-table': { tw: 'w-full text-sm', 'border-collapse': 'collapse' },
});

register.group('compare', {
  th: { tw: 'text-left px-5 py-4 text-xs font-semibold tracking-widest uppercase text-slate-400 border-b-2 border-slate-200' },
  'th-brand': { tw: 'text-indigo-600 bg-indigo-50/50' },
  td:         { tw: 'px-5 py-4 text-slate-500 border-b border-slate-100 align-middle' },
  'td-brand': { tw: 'font-medium text-slate-900 bg-indigo-50/30' },
  check:      { tw: 'text-green-500 font-bold text-base' },
  cross:      { tw: 'text-red-400 text-base' },
  row:        { tw: 'transition-colors hover:bg-slate-50' },
});

// ─────────────────────────────────────────────────────────────────────────────
// CTA + Footer + Divider
// ─────────────────────────────────────────────────────────────────────────────

register.all({
  'cta-section': {
    tw: 'rounded-3xl text-center py-20 px-8 relative overflow-hidden',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
  },
  'cta-glow': {
    tw: 'absolute inset-0 pointer-events-none',
    background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,.18) 0%, transparent 60%)',
  },
  'cta-actions':  { tw: 'flex items-center justify-center gap-3 mt-10 flex-wrap relative z-10' },
  'footer':       { tw: 'py-12 border-t border-slate-200 bg-slate-50' },
  'footer-inner': { tw: 'flex items-center justify-between flex-wrap gap-4' },
  'divider':      { tw: 'border-0 border-t border-slate-200' },
});

// ─────────────────────────────────────────────────────────────────────────────
// FOUC prevention — fade in after all styles injected
// ─────────────────────────────────────────────────────────────────────────────
requestAnimationFrame(() => {
  document.body.style.cssText += ';transition:opacity 200ms ease;opacity:1';
});
