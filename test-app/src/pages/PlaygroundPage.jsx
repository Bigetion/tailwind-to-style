/**
 * Playground Page
 * Free-form input for tws(), twsx(), and twsxVariants()
 */
import { useState } from 'react'
import { tws, twsx, cx } from 'tailwind-to-style'
import CodeBlock from '../components/CodeBlock'
import { Gamepad2 } from 'lucide-react'

const PRESETS = {
  'Card': 'bg-white rounded-xl shadow-lg p-6 max-w-sm',
  'Button': 'bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold text-sm',
  'Badge': 'bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full',
  'Input': 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm',
  'Avatar': 'w-12 h-12 rounded-full bg-gray-300',
  'Gradient': 'bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg',
  'Glass': 'bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20',
  'Shadow Layers': 'bg-white rounded-2xl shadow-2xl p-8',
}

const TWSX_PRESETS = {
  'Button Hover': `twsx('button', {\n  base: 'bg-blue-500 text-white px-4 py-2 rounded-lg',\n  '&:hover': 'bg-blue-600 shadow-lg',\n  '&:active': 'bg-blue-700 scale-95',\n})`,
  'Card Children': `twsx('card', {\n  base: 'bg-white rounded-xl shadow-md overflow-hidden',\n  '> .header': 'p-4 border-b border-gray-100',\n  '> .body': 'p-4',\n  '> .footer': 'p-4 bg-gray-50',\n})`,
  'Input States': `twsx('input', {\n  base: 'w-full px-3 py-2 border rounded-lg text-sm',\n  '&:focus': 'border-blue-500 ring-2 ring-blue-200',\n  '&.error': 'border-red-500 bg-red-50',\n  '&:disabled': 'bg-gray-100 opacity-50 cursor-not-allowed',\n})`,
}

export default function PlaygroundPage() {
  const [mode, setMode] = useState('tws')
  const [input, setInput] = useState('bg-blue-500 text-white p-4 rounded-lg shadow-md')
  const [showObject, setShowObject] = useState(false)

  let output = ''
  let cssOutput = ''
  let error = null

  try {
    if (mode === 'tws') {
      const objResult = tws(input, true)
      const cssResult = tws(input)
      output = JSON.stringify(objResult, null, 2)
      cssOutput = cssResult
    } else if (mode === 'cx') {
      // Treat input as comma-separated class lists
      const result = cx(input)
      output = result
      cssOutput = tws(result)
    }
  } catch (e) {
    error = e.message
  }

  return (
    <div>
      <h1 className="page-title">Playground</h1>
      <p className="page-desc">
        Experiment with any Tailwind class in real-time. Type classes and see the generated CSS and JS object output instantly.
      </p>

      <div className="callout callout-tip">
        <span className="callout-icon"><Gamepad2 size={18} /></span>
        <div className="callout-content">
          <strong>Try it out!</strong>
          Type any Tailwind class below and see the result. Use the preset buttons for quick examples.
          Toggle "Show JS Object" to see the React <code>style</code> prop format.
        </div>
      </div>

      {/* ── Mode Toggle ── */}
      <div className="section">
        <div className="controls">
          {['tws', 'cx'].map(m => (
            <button
              key={m}
              style={{
                ...tws('px-4 py-2 rounded-lg text-sm font-semibold border-0 cursor-pointer', true),
                background: mode === m ? '#6366f1' : '#e2e8f0',
                color: mode === m ? 'white' : '#475569',
              }}
              onClick={() => setMode(m)}
            >
              {m}()
            </button>
          ))}
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.85rem', color: '#64748b' }}>
            <input type="checkbox" checked={showObject} onChange={e => setShowObject(e.target.checked)} />
            Show JS Object
          </label>
        </div>
      </div>

      {/* ── Input ── */}
      <div className="section">
        <h3 className="section-title">Input</h3>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type Tailwind classes here..."
          style={{
            width: '100%',
            minHeight: 80,
            padding: '0.75rem',
            fontFamily: 'monospace',
            fontSize: '.9rem',
            border: '2px solid #e2e8f0',
            borderRadius: 8,
            resize: 'vertical',
            outline: 'none',
            boxSizing: 'border-box',
            lineHeight: 1.5,
          }}
        />

        {/* Quick presets */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
          {Object.entries(PRESETS).map(([name, classes]) => (
            <button
              key={name}
              style={{
                ...tws('px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer', true),
                background: '#f1f5f9',
                color: '#475569',
              }}
              onClick={() => { setMode('tws'); setInput(classes) }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* ── Live Preview ── */}
      <div className="section">
        <h3 className="section-title">Live Preview</h3>
        {error ? (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: 8,
            padding: '1rem',
            color: '#dc2626',
            fontFamily: 'monospace',
            fontSize: '.85rem',
          }}>
            {error}
          </div>
        ) : (
          <div className="preview" style={{ minHeight: 80, justifyContent: 'center' }}>
            <div style={mode === 'tws' ? tws(input, true) : tws(cx(input), true)}>
              Preview Element
            </div>
          </div>
        )}
      </div>

      {/* ── CSS Output ── */}
      <div className="section">
        <h3 className="section-title">CSS Output</h3>
        <CodeBlock label="css" code={cssOutput || '(empty)'} />
      </div>

      {/* ── JS Object Output ── */}
      {showObject && (
        <div className="section">
          <h3 className="section-title">JS Object Output</h3>
          <CodeBlock label="json" code={output || '(empty)'} />
        </div>
      )}

      {/* ── twsx Presets ── */}
      <div className="section">
        <h3 className="section-title">twsx() Examples</h3>
        <p className="section-desc">Copy these into your project — they show common twsx() patterns</p>
        {Object.entries(TWSX_PRESETS).map(([name, code]) => (
          <div key={name} style={{ marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '.9rem', marginBottom: 4, color: '#334155' }}>{name}</h4>
            <CodeBlock label="js" code={code} />
          </div>
        ))}
      </div>

      {/* ── Quick Reference ── */}
      <div className="section">
        <h3 className="section-title">Quick Reference</h3>
        <CodeBlock label="js" code={`// tws() — convert classes to CSS string
tws('bg-blue-500 text-white p-4')
// → "background-color: rgb(59 130 246); color: white; padding: 1rem;"

// tws() with object mode — for React style prop
tws('bg-blue-500 text-white p-4', true)
// → { backgroundColor: "rgb(59 130 246)", color: "white", padding: "1rem" }

// cx() — conditional class merging
cx('base', isActive && 'active', { dark: isDark })

// twsx() — styled component with nested selectors
twsx('card', { base: '...', '&:hover': '...', '> .child': '...' })

// twsxVariants() — design system variants
const btn = twsxVariants({ base: '...', variants: { ... } })`} />
      </div>
    </div>
  )
}
