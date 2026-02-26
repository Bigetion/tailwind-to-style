/**
 * tws() — Core API Page
 * Demonstrates: inline styles, JSON output, CSS output, arbitrary values,
 * opacity modifiers, negative values, responsive, hover/focus, important modifier
 */
import { useState } from 'react'
import { tws } from 'tailwind-to-style'
import CodeBlock from '../components/CodeBlock'

export default function TwsPage() {
  const [input, setInput] = useState('px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md')
  const cssOutput = tws(input)
  let jsonOutput = {}
  try { jsonOutput = tws(input, true) } catch (e) { /* skip */ }

  return (
    <div>
      <h1 className="page-title">tws() — Tailwind to Inline Styles</h1>
      <p className="page-desc">
        Convert Tailwind CSS classes into CSS string or JSON style object at runtime.
        Perfect for React's <code>style={'{}'}</code> prop, email templates, or any inline styling.
      </p>

      {/* ── Interactive Playground ── */}
      <div className="section">
        <h3 className="section-title">Interactive</h3>
        <p className="section-desc">Type Tailwind classes and see the output in real time</p>
        <input
          className="ctrl-input mb-md"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="e.g. px-4 py-2 bg-blue-500 text-white rounded-lg"
        />

        <div className="preview mb-md">
          <div style={jsonOutput}>Preview Element</div>
        </div>

        <div className="grid-2">
          <div>
            <CodeBlock label="css" code={cssOutput || '/* empty */'} />
          </div>
          <div>
            <CodeBlock label="json" code={JSON.stringify(jsonOutput, null, 2)} />
          </div>
        </div>
      </div>

      {/* ── Typography Scale ── */}
      <div className="section">
        <h3 className="section-title">Typography Scale</h3>
        <p className="section-desc">Full Tailwind font-size, font-weight, and text utilities</p>
        <div className="preview preview-col">
          {['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl'].map(cls => (
            <div key={cls} className="row" style={{ alignItems: 'baseline' }}>
              <span className="tag font-mono" style={{ minWidth: 80 }}>{cls}</span>
              <span style={tws(cls, true)}>{cls} — The quick brown fox</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Spacing Scale ── */}
      <div className="section">
        <h3 className="section-title">Spacing Scale</h3>
        <div className="preview">
          {[0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20].map(n => (
            <div key={n} style={{ textAlign: 'center' }}>
              <div style={{
                ...tws(`w-${n} h-6 bg-indigo-500 rounded`, true),
                minWidth: n === 0 ? 2 : undefined,
              }} />
              <span className="text-xs text-muted">{n}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Colors & Opacity Modifiers ── */}
      <div className="section">
        <h3 className="section-title">Colors & Opacity Modifiers</h3>
        <p className="section-desc">Use <code>/</code> syntax for alpha: <code>bg-blue-500/50</code></p>
        <div className="preview">
          {['bg-blue-500', 'bg-blue-500/75', 'bg-blue-500/50', 'bg-blue-500/25'].map(cls => (
            <div key={cls} style={{ textAlign: 'center' }}>
              <div style={{ ...tws(`${cls} w-16 h-16 rounded-lg`, true) }} />
              <span className="text-xs font-mono text-muted mt-sm" style={{ display: 'block' }}>{cls.split('bg-')[1]}</span>
            </div>
          ))}
        </div>
        <div className="preview mt-sm">
          {['text-red-600', 'text-red-600/75', 'text-red-600/50', 'text-red-600/25'].map(cls => (
            <div key={cls}>
              <span style={tws(`${cls} font-bold text-lg`, true)}>Text</span>
              <span className="text-xs font-mono text-muted" style={{ display: 'block' }}>{cls.split('text-')[1]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Arbitrary Values ── */}
      <div className="section">
        <h3 className="section-title">Arbitrary Values</h3>
        <p className="section-desc">Use bracket notation for any CSS value</p>
        <div className="grid-2">
          {[
            ['w-[200px] h-[80px]', 'Fixed 200×80'],
            ['p-[13px] m-[7px]', 'Custom spacing'],
            ['rounded-[20px]', 'Custom radius'],
            ['top-[50%] left-[50%]', 'Custom position'],
            ['max-w-[600px]', 'Max width'],
            ['gap-[22px]', 'Custom gap'],
          ].map(([cls, desc]) => (
            <div key={cls} className="row">
              <span className="tag font-mono">{cls}</span>
              <span className="text-xs text-muted">{desc}</span>
              <span className="text-xs font-mono" style={{ color: '#6366f1' }}>
                → {tws(cls)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Negative Values ── */}
      <div className="section">
        <h3 className="section-title">Negative Values</h3>
        <div className="preview">
          <div style={{ position: 'relative', background: '#e2e8f0', padding: '2rem', borderRadius: 8 }}>
            <span className="text-xs text-muted">parent container</span>
            <div style={tws('bg-indigo-500 text-white px-3 py-1 rounded -mt-4 -ml-2 text-sm font-medium', true)}>
              -mt-4 -ml-2 (pulled up & left)
            </div>
          </div>
        </div>
        <CodeBlock label="js" code={`tws('-mt-4 -ml-2', true)\n// → ${JSON.stringify(tws('-mt-4 -ml-2', true))}`} />
      </div>

      {/* ── Border Radius Scale ── */}
      <div className="section">
        <h3 className="section-title">Border Radius Scale</h3>
        <div className="preview">
          {['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-full'].map(cls => (
            <div key={cls} style={{ textAlign: 'center' }}>
              <div style={tws(`${cls} w-14 h-14 bg-indigo-500`, true)} />
              <span className="text-xs font-mono text-muted" style={{ display: 'block', marginTop: 4 }}>
                {cls.replace('rounded-', '').replace('rounded', 'default')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Shadows ── */}
      <div className="section">
        <h3 className="section-title">Box Shadows</h3>
        <div className="preview">
          {['shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl'].map(cls => (
            <div key={cls} style={{ textAlign: 'center' }}>
              <div style={tws(`${cls} w-20 h-20 bg-white rounded-lg`, true)} />
              <span className="text-xs font-mono text-muted" style={{ display: 'block', marginTop: 8 }}>
                {cls}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
