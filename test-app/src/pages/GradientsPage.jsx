/**
 * Gradients Page
 * Demonstrates: all gradient directions, from/via/to stops, opacity on stops
 */
import { tws } from 'tailwind-to-style'
import CodeBlock from '../components/CodeBlock'

const DIRECTIONS = [
  ['bg-gradient-to-r',  '→'],
  ['bg-gradient-to-l',  '←'],
  ['bg-gradient-to-t',  '↑'],
  ['bg-gradient-to-b',  '↓'],
  ['bg-gradient-to-tr', '↗'],
  ['bg-gradient-to-tl', '↖'],
  ['bg-gradient-to-br', '↘'],
  ['bg-gradient-to-bl', '↙'],
]

const GRADIENT_EXAMPLES = [
  { name: 'Sunset',  classes: 'bg-gradient-to-r from-orange-400 to-pink-600' },
  { name: 'Ocean',   classes: 'bg-gradient-to-r from-cyan-400 to-blue-600' },
  { name: 'Forest',  classes: 'bg-gradient-to-r from-green-400 to-emerald-600' },
  { name: 'Purple',  classes: 'bg-gradient-to-r from-purple-400 to-indigo-700' },
  { name: 'Fire',    classes: 'bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300' },
  { name: 'Rainbow', classes: 'bg-gradient-to-r from-violet-500 via-emerald-400 to-amber-400' },
  { name: 'Night',   classes: 'bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500' },
  { name: 'Neon',    classes: 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500' },
]

export default function GradientsPage() {
  return (
    <div>
      <h1 className="page-title">Gradients</h1>
      <p className="page-desc">
        Full support for Tailwind's gradient system — all 8 directions, from/via/to color stops, and opacity modifiers.
      </p>

      {/* ── Directions ── */}
      <div className="section">
        <h3 className="section-title">All Gradient Directions</h3>
        <div className="grid-4">
          {DIRECTIONS.map(([cls, arrow]) => (
            <div key={cls} style={{ textAlign: 'center' }}>
              <div style={{ ...tws(`${cls} from-indigo-500 to-purple-600 h-20 rounded-lg`, true) }} />
              <span className="text-xs font-mono text-muted" style={{ display: 'block', marginTop: 6 }}>
                {arrow} {cls.replace('bg-gradient-', '')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Gallery ── */}
      <div className="section">
        <h3 className="section-title">Gradient Gallery</h3>
        <div className="grid-2">
          {GRADIENT_EXAMPLES.map(({ name, classes }) => (
            <div key={name}>
              <div style={{ ...tws(`${classes} h-24 rounded-xl`, true), display: 'flex', alignItems: 'flex-end', padding: '0.75rem' }}>
                <span style={{ color: 'white', fontWeight: 700, fontSize: '.85rem', textShadow: '0 1px 4px rgba(0,0,0,.3)' }}>{name}</span>
              </div>
              <code className="text-xs font-mono text-muted" style={{ display: 'block', marginTop: 4 }}>
                {classes}
              </code>
            </div>
          ))}
        </div>
      </div>

      {/* ── Via Stops ── */}
      <div className="section">
        <h3 className="section-title">Via Color Stops</h3>
        <p className="section-desc">Three-stop gradients with <code>via-*</code></p>
        <div className="col" style={{ gap: '0.5rem' }}>
          {[
            'bg-gradient-to-r from-indigo-500 to-pink-500',
            'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
            'bg-gradient-to-r from-indigo-500 via-sky-400 to-pink-500',
          ].map((cls, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ ...tws(`${cls} h-12 rounded-lg flex-1`, true) }} />
              <code className="text-xs font-mono text-muted" style={{ width: 320, flexShrink: 0 }}>
                {cls.replace('bg-gradient-to-r ', '')}
              </code>
            </div>
          ))}
        </div>
      </div>

      {/* ── Code ── */}
      <div className="section">
        <h3 className="section-title">Usage</h3>
        <CodeBlock label="js" code={`import { tws } from 'tailwind-to-style'

// CSS string
tws('bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500')
// → "background-image: linear-gradient(to right, ...);"

// JSON object (for React style prop)
tws('bg-gradient-to-r from-indigo-500 to-pink-500', true)
// → { backgroundImage: "linear-gradient(to right, ...)" }`} />
      </div>
    </div>
  )
}
