/**
 * twsxVariants() — Variant System Page
 * Demonstrates: CVA-like API, compound variants, boolean variants,
 * default variants, nested selectors, outline pattern fix
 */
import { useState } from 'react'
import { twsxVariants } from 'tailwind-to-style'
import CodeBlock from '../components/CodeBlock'
import { Lightbulb, AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react'

// ── Button Variants ─────────────────────────────────────────────────────────
const button = twsxVariants('.vbtn', {
  base: 'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer border',
  variants: {
    variant: {
      solid: 'shadow-sm',
      outline: 'bg-transparent border-2',
      ghost: 'bg-transparent border-transparent',
    },
    color: {
      primary: 'bg-indigo-600 text-white border-indigo-600',
      danger: 'bg-red-600 text-white border-red-600',
      success: 'bg-green-600 text-white border-green-600',
      neutral: 'bg-gray-100 text-gray-900 border-gray-300',
    },
    size: {
      xs: 'px-2 py-1 text-xs rounded',
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-sm rounded-lg',
      lg: 'px-5 py-2.5 text-base rounded-lg',
    },
    fullWidth: { true: 'w-full' },
    disabled: { true: 'opacity-50 cursor-not-allowed pointer-events-none' },
  },
  compoundVariants: [
    // Outline needs bg-transparent to override color's bg-*
    { variant: 'outline', color: 'primary', class: 'bg-transparent text-indigo-600 border-indigo-600' },
    { variant: 'outline', color: 'danger', class: 'bg-transparent text-red-600 border-red-600' },
    { variant: 'outline', color: 'success', class: 'bg-transparent text-green-600 border-green-600' },
    { variant: 'outline', color: 'neutral', class: 'bg-transparent text-gray-700 border-gray-400' },
    // Ghost needs bg-transparent too
    { variant: 'ghost', color: 'primary', class: 'bg-transparent text-indigo-600' },
    { variant: 'ghost', color: 'danger', class: 'bg-transparent text-red-600' },
    { variant: 'ghost', color: 'success', class: 'bg-transparent text-green-600' },
    { variant: 'ghost', color: 'neutral', class: 'bg-transparent text-gray-600' },
  ],
  defaultVariants: { variant: 'solid', color: 'primary', size: 'md' },
})

// ── Badge Variants ──────────────────────────────────────────────────────────
const badge = twsxVariants('.vbadge', {
  base: 'inline-flex items-center font-semibold rounded-full',
  variants: {
    color: {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      red: 'bg-red-100 text-red-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      purple: 'bg-purple-100 text-purple-800',
      gray: 'bg-gray-100 text-gray-800',
    },
    size: {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-xs',
      lg: 'px-3 py-1 text-sm',
    },
  },
  defaultVariants: { color: 'blue', size: 'md' },
})

// ── Alert Variants ──────────────────────────────────────────────────────────
const alert = twsxVariants('.valert', {
  base: 'p-4 rounded-lg border flex gap-3',
  variants: {
    status: {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      success: 'bg-green-50 border-green-200 text-green-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      error: 'bg-red-50 border-red-200 text-red-800',
    },
  },
  defaultVariants: { status: 'info' },
  nested: {
    '.valert-icon': 'flex-shrink-0 text-lg',
    '.valert-content': 'flex-1',
    '.valert-title': 'font-bold mb-1',
  },
})

const ICONS = { info: Info, success: CheckCircle, warning: AlertTriangle, error: XCircle }

export default function VariantsPage() {
  const [variant, setVariant] = useState('solid')
  const [color, setColor] = useState('primary')
  const [size, setSize] = useState('md')
  const [disabled, setDisabled] = useState(false)

  const currentClass = button({ variant, color, size, disabled: disabled || undefined })

  return (
    <div>
      <h1 className="page-title">twsxVariants() — Component Variant System</h1>
      <p className="page-desc">
        A CVA-like API for building type-safe component variant systems.
        Define variants, compound variants, and defaults — get auto-generated CSS + class names.
      </p>

      {/* ── Concept Explanation ── */}
      <div className="callout callout-info">
        <span className="callout-icon"><Lightbulb size={18} /></span>
        <div className="callout-content">
          <strong>What are Variants?</strong>
          Variants let you define multiple visual styles for a single component (like button sizes, colors, states) in a structured way.
          Instead of manually concatenating class names, you declare them once and get a function that returns the correct class for any combination.
        </div>
      </div>

      <div className="section">
        <h3 className="section-title">How It Works</h3>
        <table className="compare-table">
          <thead>
            <tr><th>Concept</th><th>Description</th><th>Example</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="tag tag-blue">base</span></td>
              <td style={{ fontSize: '.75rem' }}>Styles always applied</td>
              <td className="mono" style={{ fontSize: '.7rem' }}>font-medium rounded-lg</td>
            </tr>
            <tr>
              <td><span className="tag tag-green">variants</span></td>
              <td style={{ fontSize: '.75rem' }}>Named style groups with options</td>
              <td className="mono" style={{ fontSize: '.7rem' }}>size: sm | md | lg</td>
            </tr>
            <tr>
              <td><span className="tag tag-purple">compound</span></td>
              <td style={{ fontSize: '.75rem' }}>Override when multiple variants match</td>
              <td className="mono" style={{ fontSize: '.7rem' }}>outline + primary → text-blue</td>
            </tr>
            <tr>
              <td><span className="tag tag-amber">defaults</span></td>
              <td style={{ fontSize: '.75rem' }}>Fallback when no variant is specified</td>
              <td className="mono" style={{ fontSize: '.7rem' }}>variant: solid, size: md</td>
            </tr>
            <tr>
              <td><span className="tag">boolean</span></td>
              <td style={{ fontSize: '.75rem' }}>Toggle-based variants</td>
              <td className="mono" style={{ fontSize: '.7rem' }}>disabled: true | false</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Interactive Button Builder ── */}
      <div className="section">
        <h3 className="section-title">Interactive Button Builder</h3>
        <p className="section-desc">Mix and match variants in real time</p>

        <div className="grid-2 mb-md">
          <div>
            <span className="text-xs font-bold text-muted mb-sm" style={{ display: 'block' }}>Variant</span>
            <div className="controls">
              {['solid', 'outline', 'ghost'].map(v => (
                <button key={v} className={`ctrl-btn ${variant === v ? 'active' : ''}`} onClick={() => setVariant(v)}>{v}</button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-bold text-muted mb-sm" style={{ display: 'block' }}>Color</span>
            <div className="controls">
              {['primary', 'danger', 'success', 'neutral'].map(c => (
                <button key={c} className={`ctrl-btn ${color === c ? 'active' : ''}`} onClick={() => setColor(c)}>{c}</button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-bold text-muted mb-sm" style={{ display: 'block' }}>Size</span>
            <div className="controls">
              {['xs', 'sm', 'md', 'lg'].map(s => (
                <button key={s} className={`ctrl-btn ${size === s ? 'active' : ''}`} onClick={() => setSize(s)}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-bold text-muted mb-sm" style={{ display: 'block' }}>State</span>
            <div className="controls">
              <button className={`ctrl-btn ${disabled ? 'active' : ''}`} onClick={() => setDisabled(!disabled)}>
                {disabled ? '✓ Disabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>

        <div className="preview mb-md">
          <span className={currentClass}>
            {variant} / {color} / {size}
          </span>
        </div>

        <CodeBlock label="js" code={`// Generated className:\n"${currentClass}"\n\n// Usage:\n<button className={button({ variant: '${variant}', color: '${color}', size: '${size}'${disabled ? ", disabled: true" : ""} })}>\n  Click Me\n</button>`} />
      </div>

      {/* ── All Button Combinations ── */}
      <div className="section">
        <h3 className="section-title">All Variant Combinations</h3>
        <p className="section-desc">Every variant × color combination rendered</p>
        {['solid', 'outline', 'ghost'].map(v => (
          <div key={v} className="mb-md">
            <span className="tag mb-sm" style={{ display: 'inline-block', marginBottom: 8 }}>{v}</span>
            <div className="preview">
              {['primary', 'danger', 'success', 'neutral'].map(c => (
                <span key={c} className={button({ variant: v, color: c, size: 'sm' })}>{c}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Badge Variants ── */}
      <div className="section">
        <h3 className="section-title">Badge Variants</h3>
        <div className="preview">
          {['blue', 'green', 'red', 'yellow', 'purple', 'gray'].map(c => (
            <span key={c} className={badge({ color: c, size: 'md' })}>{c}</span>
          ))}
        </div>
        <div className="preview mt-sm">
          {['sm', 'md', 'lg'].map(s => (
            <span key={s} className={badge({ color: 'blue', size: s })}>size: {s}</span>
          ))}
        </div>
      </div>

      {/* ── Alert Variants ── */}
      <div className="section">
        <h3 className="section-title">Alert Variants with Nested Selectors</h3>
        <p className="section-desc">Uses <code>nested</code> config to style child elements like <code>.valert-icon</code>, <code>.valert-title</code>, etc.</p>
        <div className="col">
          {['info', 'success', 'warning', 'error'].map(s => {
            const IconComp = ICONS[s]
            return (
            <div key={s} className={alert({ status: s })}>
              <span className="valert-icon"><IconComp size={18} /></span>
              <div className="valert-content">
                <div className="valert-title">{s.charAt(0).toUpperCase() + s.slice(1)}</div>
                <p style={{ fontSize: '.85rem' }}>This is a {s} alert with nested child selectors.</p>
              </div>
            </div>
          )})}
        </div>
      </div>

      {/* ── Compound Variants Explanation ── */}
      <div className="callout callout-warning">
        <span className="callout-icon"><AlertTriangle size={18} /></span>
        <div className="callout-content">
          <strong>Why Compound Variants?</strong>
          Without compound variants, <code>outline + primary</code> would show a blue filled button (because <code>color: primary</code> sets <code>bg-indigo-600</code>).
          The compound variant overrides this specific combination to use <code>bg-transparent text-indigo-600</code> instead.
        </div>
      </div>

      {/* ── Configuration Code ── */}
      <div className="section">
        <h3 className="section-title">Full Button Configuration</h3>
        <CodeBlock label="js" code={`const button = twsxVariants('.vbtn', {
  base: 'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer border',
  variants: {
    variant: {
      solid: 'shadow-sm',
      outline: 'bg-transparent border-2',
      ghost: 'bg-transparent border-transparent',
    },
    color: {
      primary: 'bg-indigo-600 text-white border-indigo-600',
      danger: 'bg-red-600 text-white border-red-600',
      success: 'bg-green-600 text-white border-green-600',
    },
    size: {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-sm rounded-lg',
      lg: 'px-5 py-2.5 text-base rounded-lg',
    },
    disabled: { true: 'opacity-50 cursor-not-allowed pointer-events-none' },
  },
  compoundVariants: [
    // ⚠️ outline needs bg-transparent to override color's bg-*
    { variant: 'outline', color: 'primary', class: 'bg-transparent text-indigo-600 border-indigo-600' },
    { variant: 'outline', color: 'danger',  class: 'bg-transparent text-red-600 border-red-600' },
  ],
  defaultVariants: { variant: 'solid', color: 'primary', size: 'md' },
})

// Usage:
<button className={button({ variant: 'outline', color: 'danger' })}>Delete</button>`} />
      </div>
    </div>
  )
}
