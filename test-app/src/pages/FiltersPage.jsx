/**
 * Filters & Backdrop Filters Page
 * Demonstrates: blur, brightness, contrast, grayscale, hue-rotate, invert, saturate, sepia,
 * backdrop-blur, backdrop-brightness, etc.
 */
import { tws } from 'tailwind-to-style'
import CodeBlock from '../components/CodeBlock'

const SAMPLE_IMG = 'https://picsum.photos/seed/tws/400/250'

export default function FiltersPage() {
  return (
    <div>
      <h1 className="page-title">Filters & Backdrop Filters</h1>
      <p className="page-desc">
        CSS filter utilities: blur, brightness, contrast, grayscale, hue-rotate, invert, saturate, sepia — and their backdrop counterparts.
      </p>

      <div className="callout callout-info">
        <span className="callout-icon">🔍</span>
        <div className="callout-content">
          <strong>filter vs backdrop-filter</strong>
          <code>filter</code> applies effects to the element itself (e.g., blurring an image).
          <code>backdrop-filter</code> applies effects to the content <em>behind</em> the element (e.g., glass morphism).
          Both compile to the same CSS property names.
        </div>
      </div>

      {/* ── Blur ── */}
      <div className="section">
        <h3 className="section-title">Blur</h3>
        <p className="section-desc">Maps to CSS <code>filter: blur(Xpx)</code>. Values range from 0 to 64px.</p>
        <div className="grid-4">
          {[
            ['blur-none', '0px'],
            ['blur-sm', '4px'],
            ['blur', '8px'],
            ['blur-md', '12px'],
            ['blur-lg', '16px'],
            ['blur-xl', '24px'],
            ['blur-2xl', '40px'],
            ['blur-3xl', '64px'],
          ].map(([cls, val]) => (
            <div key={cls} style={{ textAlign: 'center' }}>
              <div style={{ ...tws(`${cls} w-full h-20 bg-indigo-500 rounded-lg`, true) }} />
              <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '.6rem', color: '#6366f1', marginTop: 4 }}>{val}</span>
              <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '.6rem', color: '#94a3b8', marginTop: 1 }}>{cls}</span>
            </div>
          ))}
        </div>
        <CodeBlock label="js" code={`tws('blur-md', true)\n// → ${JSON.stringify(tws('blur-md', true))}`} />
      </div>

      {/* ── Brightness ── */}
      <div className="section">
        <h3 className="section-title">Brightness</h3>
        <p className="section-desc">Maps to <code>filter: brightness(X)</code>. 100 = normal, {'<'}100 = darker, {'>'}100 = brighter.</p>
        <div className="grid-4">
          {['brightness-50', 'brightness-75', 'brightness-100', 'brightness-125', 'brightness-150', 'brightness-200'].map(cls => (
            <div key={cls} style={{ textAlign: 'center' }}>
              <div style={{ ...tws(`${cls} w-full h-16 bg-indigo-500 rounded-lg`, true) }} />
              <span className="text-xs font-mono text-muted" style={{ display: 'block', marginTop: 4 }}>{cls}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Grayscale ── */}
      <div className="section">
        <h3 className="section-title">Grayscale & Sepia</h3>
        <div className="grid-4">
          {[
            ['grayscale-0', 'Original'],
            ['grayscale', 'Grayscale'],
            ['sepia', 'Sepia'],
            ['invert', 'Invert'],
          ].map(([cls, label]) => (
            <div key={cls} style={{ textAlign: 'center' }}>
              <div style={{
                ...tws(`${cls} w-full h-20 rounded-lg`, true),
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }} />
              <span className="text-xs font-mono text-muted" style={{ display: 'block', marginTop: 4 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Contrast & Saturate ── */}
      <div className="section">
        <h3 className="section-title">Contrast & Saturate</h3>
        <div className="grid-3">
          {['contrast-50', 'contrast-100', 'contrast-150', 'saturate-50', 'saturate-100', 'saturate-200'].map(cls => (
            <div key={cls} style={{ textAlign: 'center' }}>
              <div style={{
                ...tws(`${cls} w-full h-16 rounded-lg`, true),
                background: 'linear-gradient(to right, #ef4444, #eab308, #22c55e, #3b82f6, #a855f7)',
              }} />
              <span className="text-xs font-mono text-muted" style={{ display: 'block', marginTop: 4 }}>{cls}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Hue Rotate ── */}
      <div className="section">
        <h3 className="section-title">Hue Rotate</h3>
        <div className="grid-4">
          {['hue-rotate-0', 'hue-rotate-30', 'hue-rotate-60', 'hue-rotate-90', 'hue-rotate-180'].map(cls => (
            <div key={cls} style={{ textAlign: 'center' }}>
              <div style={{
                ...tws(`${cls} w-full h-16 rounded-lg`, true),
                background: 'linear-gradient(to right, #ef4444, #f97316)',
              }} />
              <span className="text-xs font-mono text-muted" style={{ display: 'block', marginTop: 4 }}>{cls}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Backdrop Blur ── */}
      <div className="section">
        <h3 className="section-title">Backdrop Filters (Glass Morphism)</h3>
        <p className="section-desc">Apply filters to content <strong>behind</strong> the element. Combined with <code>bg-white/30</code> for the glass effect.</p>
        <div className="preview" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: 200,
          position: 'relative',
          justifyContent: 'center',
          borderStyle: 'solid',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            width: '100%',
          }}>
            {['backdrop-blur-none', 'backdrop-blur-sm', 'backdrop-blur-md'].map(cls => (
              <div key={cls} style={{
                ...tws(`${cls} bg-white/30 rounded-xl p-4`, true),
                textAlign: 'center',
              }}>
                <span style={{ color: 'white', fontWeight: 700, fontSize: '.8rem', textShadow: '0 1px 4px rgba(0,0,0,.3)' }}>
                  {cls.replace('backdrop-', '')}
                </span>
              </div>
            ))}
          </div>
        </div>
        <CodeBlock label="js" code={`tws('backdrop-blur-md bg-white/30 rounded-xl p-4', true)
// → { backdropFilter: "blur(12px)", backgroundColor: "rgba(255,255,255,0.3)", ... }`} />
      </div>
    </div>
  )
}
