/**
 * Animations Page
 * Demonstrates: animate-spin/bounce/pulse/ping, Web Animations API,
 * inline animations, dynamic animations
 */
import { useState, useRef, useCallback, useEffect } from 'react'
import { tws, applyWebAnimation, applyInlineAnimation, animateElement, chainAnimations, staggerAnimations, INLINE_ANIMATIONS } from 'tailwind-to-style'
import CodeBlock from '../components/CodeBlock'

/* @keyframes that tws() references but doesn't inject (only twsx does auto-inject) */
const KEYFRAMES_CSS = `
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
@keyframes bounce { 0%,100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); } 50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); } }
@keyframes pulse { 50% { opacity: .5; } }
@keyframes ping { 75%,100% { transform: scale(2); opacity: 0; } }
`

export default function AnimationsPage() {
  const [playing, setPlaying] = useState({})
  const boxRefs = useRef({})
  const staggerContainerRef = useRef(null)

  /* Inject @keyframes once on mount */
  useEffect(() => {
    const id = 'tws-animation-keyframes'
    if (!document.getElementById(id)) {
      const style = document.createElement('style')
      style.id = id
      style.textContent = KEYFRAMES_CSS
      document.head.appendChild(style)
    }
  }, [])

  const toggle = (name) => setPlaying(p => ({ ...p, [name]: !p[name] }))

  /* Web Animations API helper */
  const playWebAnimation = useCallback((name) => {
    const el = boxRefs.current[`web-${name}`]
    if (el) applyWebAnimation(el, name)
  }, [])

  /* Inline animation helper — reset first so replay works */
  const playInlineAnimation = useCallback((name) => {
    const el = boxRefs.current[`inline-${name}`]
    if (!el) return
    const anim = INLINE_ANIMATIONS[name]
    if (!anim) return
    // Reset to initial state instantly (no transition)
    el.style.transition = 'none'
    Object.assign(el.style, anim.initial)
    // Force reflow, then animate
    void el.offsetHeight
    applyInlineAnimation(el, name)
  }, [])

  /* Chain animations demo */
  const playChain = useCallback(async () => {
    const el = boxRefs.current['chain']
    if (el) {
      await chainAnimations(el, [
        { from: { opacity: '1', transform: 'scale(1)' }, to: { opacity: '0.3', transform: 'scale(0.5)' }, options: { duration: 400 } },
        { from: { opacity: '0.3', transform: 'scale(0.5)' }, to: { opacity: '1', transform: 'scale(1.2)' }, options: { duration: 300 } },
        { from: { transform: 'scale(1.2)' }, to: { transform: 'scale(1)' }, options: { duration: 200 } },
      ])
    }
  }, [])

  /* Stagger demo — reset all items first so replay works */
  const playStagger = useCallback(() => {
    const container = staggerContainerRef.current
    if (!container) return
    const items = container.querySelectorAll('.stagger-item')
    if (!items.length) return
    // Reset all items to invisible
    items.forEach(el => {
      el.style.transition = 'none'
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
    })
    // Force reflow then stagger
    void container.offsetHeight
    staggerAnimations(Array.from(items), 'fade-in', { staggerDelay: 80 })
  }, [])

  return (
    <div>
      <h1 className="page-title">Animations</h1>
      <p className="page-desc">
        Built-in CSS animations plus the Web Animations API, inline transitions, chained sequences and staggered effects.
      </p>

      <div className="callout callout-info">
        <span className="callout-icon">✨</span>
        <div className="callout-content">
          <strong>Animation APIs Overview</strong>
          This library provides 4 animation approaches:
          <strong>1)</strong> CSS Animations via <code>tws('animate-spin')</code> — generates <code>animation</code> shorthand.
          <strong>2)</strong> Web Animations API via <code>applyWebAnimation(el, name)</code> — uses native browser API.
          <strong>3)</strong> Inline Animations via <code>applyInlineAnimation(el, name)</code> — CSS transition-based.
          <strong>4)</strong> Chain/Stagger via <code>chainAnimations()</code> / <code>staggerAnimations()</code> — sequential & cascading.
        </div>
      </div>

      {/* ── Built-in CSS Animations ── */}
      <div className="section">
        <h3 className="section-title">Built-in CSS Animations</h3>
        <p className="section-desc">Click to toggle. These generate <code>animation</code> CSS shorthand with @keyframes. tws() returns the property, but you need to inject keyframes separately (twsx() does it automatically).</p>
        <div className="grid-4">
          {[
            ['animate-spin', '🔄', 'Spin'],
            ['animate-bounce', '⬆️', 'Bounce'],
            ['animate-pulse', '💓', 'Pulse'],
            ['animate-ping', '📡', 'Ping'],
          ].map(([cls, icon, label]) => (
            <div key={cls} style={{ textAlign: 'center' }}>
              <button
                style={{
                  ...tws('rounded-xl p-4 bg-gray-100 border-0 cursor-pointer w-full', true),
                  minHeight: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
                onClick={() => toggle(cls)}
              >
                <span style={{
                  fontSize: '2rem',
                  display: 'inline-block',
                  ...(playing[cls] ? tws(cls, true) : {}),
                }}>
                  {icon}
                </span>
                <span style={tws('text-sm font-semibold text-gray-700', true)}>{label}</span>
              </button>
              <span className="text-xs font-mono text-muted" style={{ display: 'block', marginTop: 4 }}>{cls}</span>
            </div>
          ))}
        </div>
        <CodeBlock label="js" code={`tws('animate-spin', true)
// → ${JSON.stringify(tws('animate-spin', true))}

tws('animate-bounce', true)
// → ${JSON.stringify(tws('animate-bounce', true))}`} />
      </div>

      {/* ── Web Animations API ── */}
      <div className="section">
        <h3 className="section-title">Web Animations API</h3>
        <p className="section-desc">
          <code>applyWebAnimation(element, name)</code> — uses the native Web Animations API
        </p>
        <div className="grid-3">
          {['spin', 'bounce', 'pulse', 'fade-in', 'slide-up'].map(name => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div
                ref={el => { boxRefs.current[`web-${name}`] = el }}
                style={{
                  width: 60, height: 60,
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  borderRadius: 12,
                  margin: '0 auto',
                  cursor: 'pointer',
                }}
                onClick={() => playWebAnimation(name)}
                title="Click to play"
              />
              <span className="text-xs font-mono text-muted" style={{ display: 'block', marginTop: 8 }}>
                {name} <span style={{ opacity: 0.5 }}>(click)</span>
              </span>
            </div>
          ))}
        </div>
        <CodeBlock label="js" code={`import { applyWebAnimation } from 'tailwind-to-style'

const el = document.querySelector('.my-box')
applyWebAnimation(el, 'spin')
applyWebAnimation(el, 'fade-in')
applyWebAnimation(el, 'slide-up')`} />
      </div>

      {/* ── Inline Animations ── */}
      <div className="section">
        <h3 className="section-title">Inline Animations</h3>
        <p className="section-desc">
          <code>applyInlineAnimation(el, name)</code> — CSS transition-based animations
        </p>
        <div className="grid-3">
          {Object.keys(INLINE_ANIMATIONS || {}).slice(0, 5).map(name => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div
                ref={el => { boxRefs.current[`inline-${name}`] = el }}
                style={{
                  width: 60, height: 60,
                  background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                  borderRadius: 12,
                  margin: '0 auto',
                  cursor: 'pointer',
                }}
                onClick={() => playInlineAnimation(name)}
                title="Click to play"
              />
              <span className="text-xs font-mono text-muted" style={{ display: 'block', marginTop: 8 }}>
                {name} <span style={{ opacity: 0.5 }}>(click)</span>
              </span>
            </div>
          ))}
        </div>
        <CodeBlock label="js" code={`import { applyInlineAnimation, INLINE_ANIMATIONS } from 'tailwind-to-style'

applyInlineAnimation(el, 'fade-in', { duration: 600, autoPlay: true })
applyInlineAnimation(el, 'slide-up')
applyInlineAnimation(el, 'zoom-in')

// Available: ${Object.keys(INLINE_ANIMATIONS || {}).join(', ')}`} />
      </div>

      {/* ── Chain Animations ── */}
      <div className="section">
        <h3 className="section-title">Chained Animations</h3>
        <p className="section-desc">
          <code>chainAnimations(el, steps)</code> — run multiple animations sequentially. Each step completes before the next starts. Returns a Promise.
        </p>
        <div className="preview" style={{ justifyContent: 'center', minHeight: 140 }}>
          <div
            ref={el => { boxRefs.current['chain'] = el }}
            style={{
              width: 80, height: 80,
              background: 'linear-gradient(135deg, #22c55e, #14b8a6)',
              borderRadius: 16,
              cursor: 'pointer',
            }}
            onClick={playChain}
            title="Click to play chain"
          />
        </div>
        <p style={{ textAlign: 'center', fontSize: '.85rem', color: '#64748b', marginTop: 4 }}>
          Click the box: shrink → grow → settle
        </p>
        <CodeBlock label="js" code={`import { chainAnimations } from 'tailwind-to-style'

await chainAnimations(element, [
  { from: { opacity: '1', transform: 'scale(1)' },
    to: { opacity: '0.3', transform: 'scale(0.5)' },
    options: { duration: 400 } },
  { from: { opacity: '0.3', transform: 'scale(0.5)' },
    to: { opacity: '1', transform: 'scale(1.2)' },
    options: { duration: 300 } },
  { from: { transform: 'scale(1.2)' },
    to: { transform: 'scale(1)' },
    options: { duration: 200 } },
])`} />
      </div>

      {/* ── Stagger Animations ── */}
      <div className="section">
        <h3 className="section-title">Staggered Animations</h3>
        <p className="section-desc">
          <code>staggerAnimations(elements, name, {'{ staggerDelay }'})</code> — animate a list with cascade timing. Each element starts <code>staggerDelay</code> ms after the previous.
        </p>
        <div className="preview" style={{ justifyContent: 'center', minHeight: 80, gap: 12 }} ref={staggerContainerRef}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="stagger-item"
              style={{
                width: 40, height: 40,
                background: `hsl(${i * 40}, 70%, 55%)`,
                borderRadius: 8,
              }}
            />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <button
            style={tws('bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold border-0 cursor-pointer', true)}
            onClick={playStagger}
          >
            Play Stagger
          </button>
        </div>
        <CodeBlock label="js" code={`import { staggerAnimations } from 'tailwind-to-style'

const items = document.querySelectorAll('.list-item')
staggerAnimations(Array.from(items), 'fade-in', { delay: 80 })`} />
      </div>
    </div>
  )
}
