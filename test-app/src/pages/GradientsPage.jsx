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

      <div className="callout callout-info">
        <span className="callout-icon">🎨</span>
        <div className="callout-content">
          <strong>How Gradients Work</strong>
          Tailwind gradients use three parts: <code>bg-gradient-to-{'{dir}'}</code> for direction,
          <code>from-{'{color}'}</code> for start, <code>via-{'{color}'}</code> for middle (optional), and <code>to-{'{color}'}</code> for end.
          All three combine into a single <code>background-image: linear-gradient(...)</code> CSS property.
        </div>
      </div>

      {/* ── Gradient Anatomy ── */}
      <div className="section">
        <h3 className="section-title">Gradient Anatomy</h3>
        <p className="section-desc">How each class maps to the CSS output</p>
        <table className="compare-table">
          <thead>
            <tr><th>Class</th><th>Role</th><th>CSS</th></tr>
          </thead>
          <tbody>
            <tr>
              <td className="mono">bg-gradient-to-r</td>
              <td style={{ fontSize: '.75rem' }}>Direction</td>
              <td className="mono" style={{ fontSize: '.7rem' }}>linear-gradient(<strong>to right</strong>, ...)</td>
            </tr>
            <tr>
              <td className="mono">from-indigo-500</td>
              <td style={{ fontSize: '.75rem' }}>Start color</td>
              <td className="mono" style={{ fontSize: '.7rem' }}>var(--gradient-from-color)</td>
            </tr>
            <tr>
              <td className="mono">via-purple-500</td>
              <td style={{ fontSize: '.75rem' }}>Middle color (optional)</td>
              <td className="mono" style={{ fontSize: '.7rem' }}>var(--gradient-via-color)</td>
            </tr>
            <tr>
              <td className="mono">to-pink-500</td>
              <td style={{ fontSize: '.75rem' }}>End color</td>
              <td className="mono" style={{ fontSize: '.7rem' }}>var(--gradient-to-color)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Directions ── */}
      <div className="section">
        <h3 className="section-title">All Gradient Directions</h3>
        <p className="section-desc">8 directions mapping to CSS linear-gradient direction keywords</p>
        <div className="grid-4">
          {DIRECTIONS.map(([cls, arrow]) => (
            <div key={cls} style={{ textAlign: 'center' }}>
              <div style={{ ...tws(`${cls} from-indigo-500 to-purple-600 h-20 rounded-lg`, true) }} />
              <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '.65rem', color: '#6366f1', marginTop: 6 }}>
                {arrow} {cls.replace('bg-gradient-', '')}
              </span>
              <span style={{ display: 'block', fontSize: '.55rem', color: '#94a3b8', marginTop: 1 }}>
                {cls === 'bg-gradient-to-r' ? 'to right' : cls === 'bg-gradient-to-l' ? 'to left' : cls === 'bg-gradient-to-t' ? 'to top' : cls === 'bg-gradient-to-b' ? 'to bottom' : cls === 'bg-gradient-to-tr' ? 'to top right' : cls === 'bg-gradient-to-tl' ? 'to top left' : cls === 'bg-gradient-to-br' ? 'to bottom right' : 'to bottom left'}
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
        <p className="section-desc">Compare 2-stop vs 3-stop gradients. The <code>via-*</code> color creates a smoother transition.</p>
        <div className="col" style={{ gap: '0.5rem' }}>
          {[
            ['bg-gradient-to-r from-indigo-500 to-pink-500', '2-stop (from → to)'],
            ['bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500', '3-stop (from → via → to)'],
            ['bg-gradient-to-r from-indigo-500 via-sky-400 to-pink-500', '3-stop with contrasting via'],
          ].map(([cls, label], i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ ...tws(`${cls} h-12 rounded-lg flex-1`, true) }} />
              <div style={{ width: 320, flexShrink: 0 }}>
                <span style={{ fontSize: '.7rem', fontWeight: 600, color: '#334155', display: 'block' }}>{label}</span>
                <code className="text-xs font-mono text-muted">
                  {cls.replace('bg-gradient-to-r ', '')}
                </code>
              </div>
            </div>
          ))}
        </div>
        <div className="callout callout-tip" style={{ marginTop: '1rem' }}>
          <span className="callout-icon">✅</span>
          <div className="callout-content">
            Without <code>via-*</code>, the gradient transitions directly from start to end.
            Adding a middle stop creates a more natural color flow, especially when the start and end colors are far apart on the spectrum.
          </div>
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
