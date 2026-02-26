/**
 * twsx() — CSS-in-JS Engine Page
 * Demonstrates: selector-based styles, nested selectors, hover/focus/active,
 * responsive breakpoints, @css directive, child selectors
 */
import { useState, useEffect, useRef } from 'react'
import { twsx } from 'tailwind-to-style'
import CodeBlock from '../components/CodeBlock'

export default function TwsxPage() {
  // ── Demo 1: Button Component ──────────────────────────────────────────
  const btnCss = twsx({
    '.demo-btn': 'inline-flex items-center justify-center px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 cursor-pointer border-0',
    '.demo-btn:hover': 'bg-indigo-700 shadow-lg',
    '.demo-btn:active': 'bg-indigo-800 shadow-sm',
    '.demo-btn:focus': 'ring-2 ring-indigo-400 ring-offset-2',
  })

  // ── Demo 2: Card with children ────────────────────────────────────────
  const cardCss = twsx({
    '.demo-card': 'bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100',
    '.demo-card:hover': 'shadow-xl',
    '.demo-card > .card-header': 'px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white',
    '.demo-card > .card-header > h3': 'text-lg font-bold',
    '.demo-card > .card-header > p': 'text-sm opacity-80',
    '.demo-card > .card-body': 'px-6 py-5',
    '.demo-card > .card-body > p': 'text-sm text-gray-600',
    '.demo-card > .card-footer': 'px-6 py-3 bg-gray-50 text-right',
  })

  // ── Demo 3: Form Input ────────────────────────────────────────────────
  const inputCss = twsx({
    '.demo-input': 'block w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm transition-all duration-200 outline-none',
    '.demo-input:focus': 'border-indigo-500 ring-2 ring-indigo-200',
    '.demo-input:disabled': 'bg-gray-100 text-gray-400 cursor-not-allowed',
    '.demo-input.error': 'border-red-500 ring-2 ring-red-200',
    '.demo-input.success': 'border-green-500 ring-2 ring-green-200',
  })

  // ── Demo 4: Responsive Grid ───────────────────────────────────────────
  const gridCss = twsx({
    '.demo-grid': 'grid gap-4 grid-cols-1',
    '@media (min-width: 640px)': '',
    '.demo-grid-item': 'bg-indigo-100 text-indigo-800 p-4 rounded-lg text-center font-semibold text-sm',
  })

  // ── Demo 5: @css Directive ────────────────────────────────────────────
  const rawCss = twsx({
    '.demo-gradient-text': '@css { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }',
  })

  // ── Demo 6: Nav Menu ──────────────────────────────────────────────────
  const navCss = twsx({
    '.demo-nav': 'flex gap-1 bg-gray-100 p-1 rounded-xl',
    '.demo-nav > a': 'px-4 py-2 rounded-lg text-sm font-medium text-gray-600 transition-all duration-200 cursor-pointer',
    '.demo-nav > a:hover': 'bg-white shadow-sm text-gray-900',
    '.demo-nav > a.active': 'bg-white shadow-sm text-indigo-600 font-semibold',
  })

  return (
    <div>
      <h1 className="page-title">twsx() — CSS-in-JS Engine</h1>
      <p className="page-desc">
        Generate real CSS from Tailwind classes with full selector support.
        Handles nested selectors, hover/focus/active states, and <code>@css</code> for raw CSS injection.
      </p>

      {/* ── Button Component ── */}
      <div className="section">
        <h3 className="section-title">Button with States</h3>
        <p className="section-desc">Hover, active, and focus states via pseudo-selectors</p>
        <div className="preview">
          <button className="demo-btn">Click Me</button>
          <button className="demo-btn" style={{ opacity: 0.5, pointerEvents: 'none' }}>Disabled</button>
        </div>
        <CodeBlock label="js" code={`twsx({
  '.demo-btn': 'inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 cursor-pointer',
  '.demo-btn:hover': 'bg-indigo-700 shadow-lg',
  '.demo-btn:active': 'bg-indigo-800 shadow-sm',
  '.demo-btn:focus': 'ring-2 ring-indigo-400 ring-offset-2',
})`} />
        <CodeBlock label="css" code={btnCss} />
      </div>

      {/* ── Card Component ── */}
      <div className="section">
        <h3 className="section-title">Card with Nested Selectors</h3>
        <p className="section-desc">Child selectors <code>&gt;</code> for structured components</p>
        <div className="preview" style={{ maxWidth: 400 }}>
          <div className="demo-card">
            <div className="card-header">
              <h3>Project Alpha</h3>
              <p>Next-gen platform</p>
            </div>
            <div className="card-body">
              <p>A fully responsive card component built entirely with twsx() — no Tailwind build step needed.</p>
            </div>
            <div className="card-footer">
              <button className="demo-btn" style={{ fontSize: '.8rem', padding: '6px 16px' }}>View →</button>
            </div>
          </div>
        </div>
        <CodeBlock label="js" code={`twsx({
  '.demo-card': 'bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100',
  '.demo-card:hover': 'shadow-xl',
  '.demo-card > .card-header': 'px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white',
  '.demo-card > .card-header > h3': 'text-lg font-bold',
  '.demo-card > .card-body': 'px-6 py-5',
  '.demo-card > .card-footer': 'px-6 py-3 bg-gray-50 text-right',
})`} />
      </div>

      {/* ── Form Input ── */}
      <div className="section">
        <h3 className="section-title">Form Input with Modifier Classes</h3>
        <p className="section-desc">Combine base class with <code>.error</code> / <code>.success</code> modifiers</p>
        <div className="preview preview-col" style={{ maxWidth: 400, gap: '0.75rem' }}>
          <input className="demo-input" placeholder="Normal input" />
          <input className="demo-input" placeholder="Focused (click me)" />
          <input className="demo-input error" placeholder="Error state" />
          <input className="demo-input success" placeholder="Success state" />
          <input className="demo-input" placeholder="Disabled" disabled />
        </div>
        <CodeBlock label="js" code={`twsx({
  '.demo-input': 'block w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm transition-all duration-200 outline-none',
  '.demo-input:focus': 'border-indigo-500 ring-2 ring-indigo-200',
  '.demo-input:disabled': 'bg-gray-100 text-gray-400 cursor-not-allowed',
  '.demo-input.error': 'border-red-500 ring-2 ring-red-200',
  '.demo-input.success': 'border-green-500 ring-2 ring-green-200',
})`} />
      </div>

      {/* ── Nav Menu ── */}
      <div className="section">
        <h3 className="section-title">Navigation Tabs</h3>
        <div className="preview">
          <nav className="demo-nav">
            <a className="active">Dashboard</a>
            <a>Projects</a>
            <a>Team</a>
            <a>Settings</a>
          </nav>
        </div>
      </div>

      {/* ── @css Directive ── */}
      <div className="section">
        <h3 className="section-title">@css Directive — Raw CSS Escape Hatch</h3>
        <p className="section-desc">Inject raw CSS for things Tailwind can't express</p>
        <div className="preview">
          <h2 className="demo-gradient-text" style={{ fontSize: '2.5rem', fontWeight: 800 }}>
            Gradient Text
          </h2>
        </div>
        <CodeBlock label="js" code={`twsx({
  '.gradient-text': '@css { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }',
})`} />
      </div>
    </div>
  )
}
