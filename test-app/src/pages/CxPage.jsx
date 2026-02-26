/**
 * cx() — Conditional Class Joiner Page
 * Demonstrates: cx(), cx.with(), object syntax, array syntax, falsy values
 */
import { useState } from 'react'
import { cx, twsx, tws } from 'tailwind-to-style'
import CodeBlock from '../components/CodeBlock'

// Inject some example classes
twsx({
  '.cx-box': 'p-4 rounded-lg border text-sm font-medium transition-all duration-200',
  '.cx-active': 'bg-indigo-100 border-indigo-500 text-indigo-800',
  '.cx-inactive': 'bg-gray-50 border-gray-200 text-gray-600',
  '.cx-large': 'p-6 text-base',
  '.cx-ring': 'ring-2 ring-indigo-400',
})

export default function CxPage() {
  const [isActive, setIsActive] = useState(false)
  const [isLarge, setIsLarge] = useState(false)
  const [hasRing, setHasRing] = useState(false)

  const className = cx(
    'cx-box',
    isActive ? 'cx-active' : 'cx-inactive',
    isLarge && 'cx-large',
    hasRing && 'cx-ring',
  )

  // cx.with demo
  const baseBtn = cx.with('inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer')

  return (
    <div>
      <h1 className="page-title">cx() — Conditional Class Joiner</h1>
      <p className="page-desc">
        A <code>clsx</code>-like utility that joins class names conditionally.
        Supports strings, objects, arrays, and falsy values. Includes <code>cx.with()</code> for base class composition.
      </p>

      {/* ── Interactive Demo ── */}
      <div className="section">
        <h3 className="section-title">Interactive cx() Demo</h3>
        <p className="section-desc">Toggle options to see class name changes</p>

        <div className="controls mb-md">
          <button className={`ctrl-btn ${isActive ? 'active' : ''}`} onClick={() => setIsActive(!isActive)}>
            {isActive ? '✓' : '○'} Active
          </button>
          <button className={`ctrl-btn ${isLarge ? 'active' : ''}`} onClick={() => setIsLarge(!isLarge)}>
            {isLarge ? '✓' : '○'} Large
          </button>
          <button className={`ctrl-btn ${hasRing ? 'active' : ''}`} onClick={() => setHasRing(!hasRing)}>
            {hasRing ? '✓' : '○'} Ring
          </button>
        </div>

        <div className="preview mb-md">
          <div className={className}>
            className = "{className}"
          </div>
        </div>

        <CodeBlock label="js" code={`cx(
  'cx-box',
  ${isActive} ? 'cx-active' : 'cx-inactive',
  ${isLarge} && 'cx-large',
  ${hasRing} && 'cx-ring',
)\n// → "${className}"`} />
      </div>

      {/* ── Syntax Examples ── */}
      <div className="section">
        <h3 className="section-title">All Syntax Forms</h3>
        <div className="grid-2">
          <div>
            <span className="tag tag-blue mb-sm" style={{ display: 'block', marginBottom: 8 }}>Strings</span>
            <CodeBlock label="js" code={`cx('px-4', 'py-2', 'bg-blue-500')
// → "${cx('px-4', 'py-2', 'bg-blue-500')}"`} />
          </div>
          <div>
            <span className="tag tag-green mb-sm" style={{ display: 'block', marginBottom: 8 }}>Conditionals</span>
            <CodeBlock label="js" code={`cx('base', true && 'active', false && 'hidden')
// → "${cx('base', true && 'active', false && 'hidden')}"`} />
          </div>
          <div>
            <span className="tag tag-purple mb-sm" style={{ display: 'block', marginBottom: 8 }}>Object Syntax</span>
            <CodeBlock label="js" code={`cx('btn', { 'btn-active': true, 'btn-large': false })
// → "${cx('btn', { 'btn-active': true, 'btn-large': false })}"`} />
          </div>
          <div>
            <span className="tag tag-amber mb-sm" style={{ display: 'block', marginBottom: 8 }}>Arrays</span>
            <CodeBlock label="js" code={`cx(['flex', 'gap-2'], 'items-center')
// → "${cx(['flex', 'gap-2'], 'items-center')}"`} />
          </div>
          <div>
            <span className="tag mb-sm" style={{ display: 'block', marginBottom: 8 }}>Falsy Values</span>
            <CodeBlock label="js" code={`cx('base', null, undefined, 0, '', false, 'end')
// → "${cx('base', null, undefined, 0, '', false, 'end')}"`} />
          </div>
          <div>
            <span className="tag tag-blue mb-sm" style={{ display: 'block', marginBottom: 8 }}>Nested Arrays</span>
            <CodeBlock label="js" code={`cx('a', ['b', ['c', 'd']], 'e')
// → "${cx('a', ['b', ['c', 'd']], 'e')}"`} />
          </div>
        </div>
      </div>

      {/* ── cx.with() ── */}
      <div className="section">
        <h3 className="section-title">cx.with() — Base Class Composition</h3>
        <p className="section-desc">
          Pre-bind base classes and extend with additional ones. Great for component APIs.
        </p>
        <CodeBlock label="js" code={`const baseBtn = cx.with(
  'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer'
)

// Extend with specific styles:
baseBtn('px-4 py-2 bg-blue-600 text-white')
baseBtn('px-3 py-1.5 bg-red-600 text-white text-sm')`} />

        <div className="preview">
          <span style={{ ...stylize(baseBtn('px-4 py-2 bg-blue-600 text-white')) }}>Primary</span>
          <span style={{ ...stylize(baseBtn('px-3 py-1.5 bg-red-600 text-white text-sm')) }}>Danger</span>
          <span style={{ ...stylize(baseBtn('px-4 py-2 bg-green-600 text-white')) }}>Success</span>
          <span style={{ ...stylize(baseBtn('px-4 py-2 bg-gray-100 text-gray-900 border border-gray-300')) }}>Neutral</span>
        </div>
      </div>
    </div>
  )
}

// Helper to convert cx class string to inline style object for preview
function stylize(classes) {
  return tws(classes, true)
}
