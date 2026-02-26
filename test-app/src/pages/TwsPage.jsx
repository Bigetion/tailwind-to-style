/**
 * tws() — Core API Page
 * Demonstrates: inline styles, JSON output, CSS output, arbitrary values,
 * opacity modifiers, negative values, responsive, hover/focus, important modifier
 */
import { useState } from 'react'
import { tws } from 'tailwind-to-style'
import CodeBlock from '../components/CodeBlock'
import { Lightbulb, CheckCircle, RulerIcon, Palette, Type, LayoutGrid, Square, Sparkles, RotateCw, Rainbow, Maximize2, Wrench, Minus, Hash } from 'lucide-react'

/* Spacing scale with actual px/rem values */
const SPACING = [
  [0, '0px'],   [0.5, '0.125rem / 2px'], [1, '0.25rem / 4px'],
  [1.5, '0.375rem / 6px'], [2, '0.5rem / 8px'],   [2.5, '0.625rem / 10px'],
  [3, '0.75rem / 12px'],   [4, '1rem / 16px'],     [5, '1.25rem / 20px'],
  [6, '1.5rem / 24px'],    [8, '2rem / 32px'],     [10, '2.5rem / 40px'],
  [12, '3rem / 48px'],     [16, '4rem / 64px'],    [20, '5rem / 80px'],
]

const TYPO_SCALE = [
  ['text-xs',   '0.75rem / 12px'],
  ['text-sm',   '0.875rem / 14px'],
  ['text-base', '1rem / 16px'],
  ['text-lg',   '1.125rem / 18px'],
  ['text-xl',   '1.25rem / 20px'],
  ['text-2xl',  '1.5rem / 24px'],
  ['text-3xl',  '1.875rem / 30px'],
  ['text-4xl',  '2.25rem / 36px'],
]

const COLOR_PALETTES = [
  { name: 'blue',   shades: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: 'red',    shades: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: 'green',  shades: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: 'purple', shades: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: 'amber',  shades: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
]

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

      {/* ── What is tws()? ── */}
      <div className="callout callout-info">
        <span className="callout-icon"><Lightbulb size={18} /></span>
        <div className="callout-content">
          <strong>How it works</strong>
          <code>tws('bg-blue-500 p-4')</code> returns a CSS string. Add <code>true</code> as the second
          argument — <code>tws('bg-blue-500 p-4', true)</code> — to get a JSON object you can pass
          directly to React's <code>style</code> prop. No build step, no PostCSS, pure runtime.
        </div>
      </div>

      {/* ── Two Output Modes ── */}
      <div className="section">
        <h3 className="section-title">Two Output Modes</h3>
        <p className="section-desc">Choose between CSS string or JSON object depending on your use case</p>
        <table className="compare-table">
          <thead>
            <tr><th>Mode</th><th>Call</th><th>Output</th><th>Use Case</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="tag tag-blue">CSS String</span></td>
              <td className="mono">tws('p-4 bg-blue-500')</td>
              <td className="mono" style={{ fontSize: '.7rem' }}>padding: 1rem; background-color: …;</td>
              <td style={{ fontSize: '.75rem' }}>Email templates, raw HTML</td>
            </tr>
            <tr>
              <td><span className="tag tag-purple">JSON Object</span></td>
              <td className="mono">tws('p-4 bg-blue-500', true)</td>
              <td className="mono" style={{ fontSize: '.7rem' }}>{'{'}padding: "1rem", …{'}'}</td>
              <td style={{ fontSize: '.75rem' }}>React <code>style</code> prop</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Interactive Playground ── */}
      <div className="section">
        <h3 className="section-title">Interactive Converter</h3>
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
        <p className="section-desc">Tailwind maps each class to a specific font-size in rem units</p>
        <div className="preview preview-col" style={{ gap: 0 }}>
          {TYPO_SCALE.map(([cls, size]) => (
            <div key={cls} style={{
              display: 'flex',
              alignItems: 'baseline',
              padding: '8px 12px',
              borderBottom: '1px solid #f1f5f9',
              gap: '1rem',
            }}>
              <span className="annotation" style={{ minWidth: 72 }}>{cls}</span>
              <span className="annotation-arrow">→</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', color: '#6366f1', minWidth: 130 }}>{size}</span>
              <span style={tws(cls, true)}>The quick brown fox</span>
            </div>
          ))}
        </div>
        <div className="callout callout-tip" style={{ marginTop: '1rem' }}>
          <span className="callout-icon"><CheckCircle size={18} /></span>
          <div className="callout-content">
            Tailwind uses <code>rem</code> units for font sizes. <code>1rem = 16px</code> (browser default).
            This ensures consistent, accessible scaling.
          </div>
        </div>
      </div>

      {/* ── Spacing Scale ── */}
      <div className="section">
        <h3 className="section-title">Spacing Scale</h3>
        <p className="section-desc">
          Tailwind's spacing system maps <code>p-{'{n}'}</code>, <code>m-{'{n}'}</code>, <code>w-{'{n}'}</code>, etc. to consistent rem values.
          Each unit = <code>0.25rem (4px)</code>.
        </p>
        <div className="preview preview-col" style={{ gap: 0 }}>
          {SPACING.map(([n, val]) => (
            <div key={n} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '6px 12px',
              borderBottom: '1px solid #f1f5f9',
              gap: '0.75rem',
            }}>
              <span className="annotation" style={{ minWidth: 50 }}>p-{n}</span>
              <span className="annotation-arrow">→</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', color: '#6366f1', minWidth: 130 }}>{val}</span>
              <div style={{
                ...tws(`w-${n} h-5 bg-indigo-500 rounded`, true),
                minWidth: n === 0 ? 2 : undefined,
                transition: 'width .2s ease',
              }} />
            </div>
          ))}
        </div>
        <CodeBlock label="js" code={`// Spacing utilities: p-*, m-*, w-*, h-*, gap-*, etc.
tws('p-4', true)   // → { padding: "1rem" }          // 16px
tws('m-2', true)   // → { margin: "0.5rem" }          // 8px
tws('gap-6', true) // → { gap: "1.5rem" }             // 24px
tws('w-20', true)  // → { width: "5rem" }             // 80px`} />
      </div>

      {/* ── Color Palettes ── */}
      <div className="section">
        <h3 className="section-title">Color Palettes</h3>
        <p className="section-desc">Full Tailwind color palette support — 100 to 900 shades for every color</p>
        {COLOR_PALETTES.map(({ name, shades }) => (
          <div key={name} style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '.05em' }}>{name}</span>
            <div style={{ display: 'flex', gap: 3, marginTop: 4 }}>
              {shades.map(shade => (
                <div key={shade} style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{
                    ...tws(`bg-${name}-${shade} rounded`, true),
                    height: 32,
                    borderRadius: 4,
                  }} />
                  <span style={{ fontSize: '.55rem', fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>{shade}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Opacity Modifiers ── */}
      <div className="section">
        <h3 className="section-title">Opacity Modifiers</h3>
        <p className="section-desc">Use <code>/</code> syntax for alpha channel: <code>bg-blue-500/50</code> = 50% opacity</p>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          {['bg-blue-500', 'bg-blue-500/75', 'bg-blue-500/50', 'bg-blue-500/25', 'bg-blue-500/10'].map(cls => (
            <div key={cls} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{
                ...tws(`${cls} rounded-lg`, true),
                height: 56,
              }} />
              <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '.6rem', color: '#64748b', marginTop: 4 }}>
                {cls.includes('/') ? cls.split('/')[1] + '%' : '100%'}
              </span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {['text-red-600', 'text-red-600/75', 'text-red-600/50', 'text-red-600/25'].map(cls => (
            <div key={cls} style={{ flex: 1, textAlign: 'center' }}>
              <span style={tws(`${cls} font-bold text-lg`, true)}>Text</span>
              <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '.6rem', color: '#64748b', marginTop: 2 }}>
                {cls.includes('/') ? cls.split('/')[1] + '%' : '100%'}
              </span>
            </div>
          ))}
        </div>
        <CodeBlock label="js" code={`tws('bg-blue-500/50', true)
// → { backgroundColor: "${tws('bg-blue-500/50', true).backgroundColor || '...'}" }

tws('text-red-600/75', true)
// → { color: "${tws('text-red-600/75', true).color || '...'}" }`} />
      </div>

      {/* ── Arbitrary Values ── */}
      <div className="section">
        <h3 className="section-title">Arbitrary Values</h3>
        <p className="section-desc">Use bracket notation <code>[value]</code> for any CSS value not in the default scale</p>
        <table className="compare-table">
          <thead>
            <tr><th>Class</th><th>CSS Property</th><th>Value</th></tr>
          </thead>
          <tbody>
            {[
              ['w-[200px]',     'width',          '200px'],
              ['h-[80px]',      'height',         '80px'],
              ['p-[13px]',      'padding',        '13px'],
              ['rounded-[20px]','border-radius',  '20px'],
              ['top-[50%]',     'top',            '50%'],
              ['max-w-[600px]', 'max-width',      '600px'],
              ['gap-[22px]',    'gap',            '22px'],
              ['text-[#ff6b6b]','color',          '#ff6b6b'],
              ['bg-[#1a1a2e]',  'background-color','#1a1a2e'],
              ['text-[1.1rem]', 'font-size',      '1.1rem'],
            ].map(([cls, prop, val]) => (
              <tr key={cls}>
                <td className="mono">{cls}</td>
                <td style={{ fontSize: '.75rem', color: '#64748b' }}>{prop}</td>
                <td className="mono">{val}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="callout callout-tip">
          <span className="callout-icon"><Lightbulb size={18} /></span>
          <div className="callout-content">
            Arbitrary values work with almost any utility: <code>w-[…]</code>, <code>h-[…]</code>, <code>p-[…]</code>, <code>m-[…]</code>, <code>text-[…]</code>, <code>bg-[…]</code>, <code>rounded-[…]</code>, <code>top/left/right/bottom-[…]</code>, etc.
          </div>
        </div>
      </div>

      {/* ── Negative Values ── */}
      <div className="section">
        <h3 className="section-title">Negative Values</h3>
        <p className="section-desc">Prefix with <code>-</code> to generate negative values — great for pull/overlap effects</p>
        <div className="preview">
          <div style={{ position: 'relative', background: '#e2e8f0', padding: '2rem', borderRadius: 8, width: '100%' }}>
            <span className="text-xs text-muted">parent container</span>
            <div style={tws('bg-indigo-500 text-white px-3 py-1 rounded -mt-4 -ml-2 text-sm font-medium', true)}>
              -mt-4 -ml-2 (pulled up & left)
            </div>
          </div>
        </div>
        <table className="compare-table">
          <thead>
            <tr><th>Class</th><th>CSS Output</th></tr>
          </thead>
          <tbody>
            {['-mt-4', '-ml-2', '-translate-x-4', '-rotate-12', '-top-2'].map(cls => (
              <tr key={cls}>
                <td className="mono">{cls}</td>
                <td className="mono" style={{ fontSize: '.7rem' }}>{tws(cls)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Border Radius Scale ── */}
      <div className="section">
        <h3 className="section-title">Border Radius Scale</h3>
        <p className="section-desc">From sharp corners to fully round — each class maps to a specific radius value</p>
        <div className="preview">
          {[
            ['rounded-none', '0px'],
            ['rounded-sm', '0.125rem'],
            ['rounded', '0.25rem'],
            ['rounded-md', '0.375rem'],
            ['rounded-lg', '0.5rem'],
            ['rounded-xl', '0.75rem'],
            ['rounded-2xl', '1rem'],
            ['rounded-full', '9999px'],
          ].map(([cls, val]) => (
            <div key={cls} style={{ textAlign: 'center' }}>
              <div style={tws(`${cls} w-14 h-14 bg-indigo-500`, true)} />
              <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '.6rem', color: '#6366f1', marginTop: 4 }}>{val}</span>
              <span style={{ display: 'block', fontSize: '.55rem', color: '#94a3b8', marginTop: 1 }}>
                {cls.replace('rounded-', '').replace('rounded', 'default')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Shadows ── */}
      <div className="section">
        <h3 className="section-title">Box Shadows</h3>
        <p className="section-desc">Multi-layered shadow system from subtle to dramatic</p>
        <div className="preview">
          {[
            ['shadow-sm', 'Small'],
            ['shadow', 'Default'],
            ['shadow-md', 'Medium'],
            ['shadow-lg', 'Large'],
            ['shadow-xl', 'XL'],
            ['shadow-2xl', '2XL'],
          ].map(([cls, label]) => (
            <div key={cls} style={{ textAlign: 'center' }}>
              <div style={{
                ...tws(`${cls} w-20 h-20 bg-white rounded-lg`, true),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '.65rem', fontWeight: 600, color: '#64748b' }}>{label}</span>
              </div>
              <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '.6rem', color: '#94a3b8', marginTop: 6 }}>{cls}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Font Weight ── */}
      <div className="section">
        <h3 className="section-title">Font Weights</h3>
        <div className="preview preview-col" style={{ gap: 0 }}>
          {[
            ['font-thin', '100'],
            ['font-extralight', '200'],
            ['font-light', '300'],
            ['font-normal', '400'],
            ['font-medium', '500'],
            ['font-semibold', '600'],
            ['font-bold', '700'],
            ['font-extrabold', '800'],
            ['font-black', '900'],
          ].map(([cls, weight]) => (
            <div key={cls} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '6px 12px',
              borderBottom: '1px solid #f1f5f9',
              gap: '1rem',
            }}>
              <span className="annotation" style={{ minWidth: 110 }}>{cls}</span>
              <span className="annotation-arrow">→</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', color: '#6366f1', minWidth: 30 }}>{weight}</span>
              <span style={tws(`${cls} text-lg`, true)}>The quick brown fox</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Supported Feature List ── */}
      <div className="section">
        <h3 className="section-title">What tws() Supports</h3>
        <div className="feature-grid">
          {[
            [RulerIcon,    'Spacing', 'p, m, gap, w, h'],
            [Palette,      'Colors', 'bg, text, border, ring'],
            [Type,         'Typography', 'text, font, tracking, leading'],
            [LayoutGrid,   'Layout', 'flex, grid, display, position'],
            [Square,       'Borders', 'border, rounded, ring, outline'],
            [Sparkles,     'Effects', 'shadow, opacity, blur, backdrop'],
            [RotateCw,     'Transforms', 'scale, rotate, translate, skew'],
            [Rainbow,      'Gradients', 'from, via, to color stops'],
            [Maximize2,    'Sizing', 'w, h, min-w, max-w, min-h, max-h'],
            [Wrench,       'Arbitrary', '[value] for any CSS property'],
            [Minus,        'Negatives', '-mt, -ml, -translate, -rotate'],
            [Hash,         'Opacity mod', 'bg-blue-500/50 alpha syntax'],
          ].map(([Icon, label, desc]) => (
            <div key={label} className="feature-item">
              <span className="feat-icon"><Icon size={16} /></span>
              <div>
                <div className="feat-label">{label}</div>
                <div className="feat-desc">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
