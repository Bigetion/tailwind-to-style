/**
 * Transforms Page
 * Demonstrates: scale, rotate, translate, skew, origin
 */
import { useState } from 'react'
import { tws } from 'tailwind-to-style'
import CodeBlock from '../components/CodeBlock'

export default function TransformsPage() {
  const [scale, setScale] = useState('100')
  const [rotate, setRotate] = useState('0')
  const [translateX, setTranslateX] = useState('0')
  const [skewX, setSkewX] = useState('0')

  const liveClasses = [
    scale !== '100' && `scale-${scale}`,
    rotate !== '0' && `rotate-${rotate}`,
    translateX !== '0' && `translate-x-${translateX}`,
    skewX !== '0' && `skew-x-${skewX}`,
  ].filter(Boolean).join(' ')

  const liveStyle = liveClasses ? tws(liveClasses, true) : {}

  return (
    <div>
      <h1 className="page-title">CSS Transforms</h1>
      <p className="page-desc">
        Scale, rotate, translate and skew — transform any element with utility classes.
      </p>

      <div className="callout callout-info">
        <span className="callout-icon">🔄</span>
        <div className="callout-content">
          <strong>CSS Transform Property</strong>
          All transform utilities compile to the CSS <code>transform</code> property.
          Multiple transforms can be combined: <code>scale-110 rotate-6 translate-x-4</code> → <code>transform: scale(1.1) rotate(6deg) translateX(1rem)</code>.
          Order matters!
        </div>
      </div>

      {/* ── Interactive Builder ── */}
      <div className="section">
        <h3 className="section-title">Interactive Transform Builder</h3>
        <div className="controls">
          <label>
            Scale
            <select value={scale} onChange={e => setScale(e.target.value)}>
              {['0', '50', '75', '90', '95', '100', '105', '110', '125', '150'].map(v =>
                <option key={v} value={v}>{v}%</option>
              )}
            </select>
          </label>
          <label>
            Rotate
            <select value={rotate} onChange={e => setRotate(e.target.value)}>
              {['0', '1', '2', '3', '6', '12', '45', '90', '180'].map(v =>
                <option key={v} value={v}>{v}°</option>
              )}
            </select>
          </label>
          <label>
            Translate X
            <select value={translateX} onChange={e => setTranslateX(e.target.value)}>
              {['0', '1', '2', '4', '8', '12', '16', '20'].map(v =>
                <option key={v} value={v}>{v}</option>
              )}
            </select>
          </label>
          <label>
            Skew X
            <select value={skewX} onChange={e => setSkewX(e.target.value)}>
              {['0', '1', '2', '3', '6', '12'].map(v =>
                <option key={v} value={v}>{v}°</option>
              )}
            </select>
          </label>
        </div>
        <div className="preview" style={{ minHeight: 180, justifyContent: 'center', position: 'relative' }}>
          <div style={{
            width: 120, height: 120,
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: '0.75rem',
            transition: 'transform 0.3s ease',
            ...liveStyle,
          }}>
            {liveClasses || 'No transform'}
          </div>
        </div>
        {liveClasses && (
          <CodeBlock label="js" code={`tws('${liveClasses}', true)\n// → ${JSON.stringify(liveStyle)}`} />
        )}
      </div>

      {/* ── Scale Gallery ── */}
      <div className="section">
        <h3 className="section-title">Scale</h3>
        <p className="section-desc">Maps to <code>transform: scale(X)</code>. 100 = normal, {'<'}100 = smaller, {'>'}100 = larger.</p>
        <div className="grid-4">
          {['scale-50', 'scale-75', 'scale-100', 'scale-125', 'scale-150'].map(cls => (
            <div key={cls} style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{
                ...tws(`${cls} w-16 h-16 rounded-lg mx-auto`, true),
                background: '#6366f1',
                transition: 'transform .2s',
              }} />
              <span className="text-xs font-mono text-muted" style={{ display: 'block', marginTop: 8 }}>{cls}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Rotate Gallery ── */}
      <div className="section">
        <h3 className="section-title">Rotate</h3>
        <p className="section-desc">Maps to <code>transform: rotate(Xdeg)</code>. Positive = clockwise, negative = counter-clockwise.</p>
        <div className="grid-4">
          {['rotate-0', 'rotate-3', 'rotate-6', 'rotate-12', 'rotate-45', 'rotate-90', 'rotate-180'].map(cls => (
            <div key={cls} style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{
                ...tws(`${cls} w-16 h-16 rounded-lg mx-auto`, true),
                background: '#f59e0b',
                transition: 'transform .2s',
              }} />
              <span className="text-xs font-mono text-muted" style={{ display: 'block', marginTop: 8 }}>{cls}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Negative Rotate ── */}
      <div className="section">
        <h3 className="section-title">Negative Rotate</h3>
        <div className="grid-4">
          {['-rotate-3', '-rotate-6', '-rotate-12', '-rotate-45', '-rotate-90'].map(cls => (
            <div key={cls} style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{
                ...tws(`${cls} w-16 h-16 rounded-lg mx-auto`, true),
                background: '#ef4444',
                transition: 'transform .2s',
              }} />
              <span className="text-xs font-mono text-muted" style={{ display: 'block', marginTop: 8 }}>{cls}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Translate ── */}
      <div className="section">
        <h3 className="section-title">Translate</h3>
        <p className="section-desc">Move elements along X/Y axes. Dashed outline = original position, green = translated position.</p>
        <div className="grid-3">
          {['translate-x-2', 'translate-x-8', 'translate-x-16', 'translate-y-2', 'translate-y-8', '-translate-x-4'].map(cls => (
            <div key={cls} style={{ textAlign: 'center', padding: '1rem', position: 'relative' }}>
              <div style={{
                width: 50, height: 50,
                borderRadius: 8,
                border: '2px dashed #94a3b8',
                position: 'relative',
                margin: '0 auto',
              }}>
                <div style={{
                  ...tws(`${cls}`, true),
                  width: 50, height: 50,
                  borderRadius: 8,
                  background: '#22c55e',
                  opacity: 0.8,
                  position: 'absolute', top: 0, left: 0,
                }} />
              </div>
              <span className="text-xs font-mono text-muted" style={{ display: 'block', marginTop: 12 }}>{cls}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Skew ── */}
      <div className="section">
        <h3 className="section-title">Skew</h3>
        <p className="section-desc">Distort elements along X/Y axes with <code>transform: skewX(Xdeg)</code></p>
        <div className="grid-4">
          {['skew-x-1', 'skew-x-3', 'skew-x-6', 'skew-x-12', 'skew-y-3', 'skew-y-6', '-skew-x-6', '-skew-y-6'].map(cls => (
            <div key={cls} style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{
                ...tws(`${cls} w-20 h-12 rounded-lg mx-auto`, true),
                background: '#ec4899',
              }} />
              <span className="text-xs font-mono text-muted" style={{ display: 'block', marginTop: 8 }}>{cls}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Transform Origin ── */}
      <div className="section">
        <h3 className="section-title">Transform Origin</h3>
        <p className="section-desc">Control the pivot point for rotations (shown with rotate-12)</p>
        <div className="grid-3">
          {['origin-center', 'origin-top', 'origin-top-right', 'origin-right', 'origin-bottom-right', 'origin-bottom', 'origin-bottom-left', 'origin-left', 'origin-top-left'].map(cls => (
            <div key={cls} style={{ textAlign: 'center', padding: '1.5rem 0', position: 'relative' }}>
              <div style={{
                width: 60, height: 60,
                borderRadius: 8,
                border: '2px dashed #94a3b8',
                position: 'relative',
                margin: '0 auto',
              }}>
                <div style={{
                  ...tws(`${cls} rotate-12`, true),
                  width: 60, height: 60,
                  borderRadius: 8,
                  background: '#0ea5e9',
                  opacity: 0.75,
                  position: 'absolute', top: 0, left: 0,
                }} />
              </div>
              <span className="text-xs font-mono text-muted" style={{ display: 'block', marginTop: 12 }}>{cls}</span>
            </div>
          ))}
        </div>
        <CodeBlock label="js" code={`tws('origin-top-right rotate-12', true)
// → ${JSON.stringify(tws('origin-top-right rotate-12', true))}`} />
      </div>
    </div>
  )
}
