/**
 * Configuration Page
 * Demonstrates: configure(), getConfig(), resetConfig(), clearConfigCache(),
 * custom themes, plugins, SSR
 */
import { useState, useCallback } from 'react'
import { tws, configure, getConfig, resetConfig, clearConfigCache, createPlugin, createUtilityPlugin, startSSR, stopSSR, getSSRStyles } from 'tailwind-to-style'
import CodeBlock from '../components/CodeBlock'
import { Settings } from 'lucide-react'

/* Pre-built demo plugin */
const textShadowPlugin = createUtilityPlugin('text-shadow', {
  prefix: 'text-shadow',
  values: {
    sm: '1px 1px 2px rgba(0,0,0,0.1)',
    md: '2px 2px 4px rgba(0,0,0,0.15)',
    lg: '4px 4px 8px rgba(0,0,0,0.2)',
    glow: '0 0 12px rgba(59,130,246,0.5)',
  },
  formatter: (value) => ({ 'text-shadow': value }),
})

const glassPlugin = createPlugin('glass-morphism', {
  utilities: {
    '.glass': {
      'backdrop-filter': 'blur(10px)',
      '-webkit-backdrop-filter': 'blur(10px)',
      'background-color': 'rgba(255,255,255,0.15)',
      'border': '1px solid rgba(255,255,255,0.18)',
    },
    '.glass-dark': {
      'backdrop-filter': 'blur(10px)',
      '-webkit-backdrop-filter': 'blur(10px)',
      'background-color': 'rgba(0,0,0,0.25)',
      'border': '1px solid rgba(255,255,255,0.1)',
    },
  },
})

export default function ConfigPage() {
  const [config, setConfig] = useState(() => getConfig())
  const [customApplied, setCustomApplied] = useState(false)
  const [ssrCSS, setSsrCSS] = useState('')
  const [log, setLog] = useState([])

  const addLog = (msg) => setLog(prev => [...prev.slice(-8), msg])

  /* Apply custom config */
  const applyCustomConfig = useCallback(() => {
    configure({
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#eff6ff',
              100: '#dbeafe',
              200: '#bfdbfe',
              300: '#93c5fd',
              400: '#60a5fa',
              500: '#3b82f6',
              600: '#2563eb',
              700: '#1d4ed8',
              800: '#1e40af',
              900: '#1e3a8a',
            },
            accent: '#f43f5e',
          },
          spacing: {
            '128': '32rem',
            '144': '36rem',
          },
          fontSize: {
            'xxs': '0.625rem',
          },
        },
      },
      plugins: [textShadowPlugin, glassPlugin],
    })
    setCustomApplied(true)
    setConfig(getConfig())
    addLog('[OK] configure() called with custom colors, spacing & plugins')
  }, [])

  /* Reset config */
  const handleReset = useCallback(() => {
    resetConfig()
    clearConfigCache()
    setCustomApplied(false)
    setConfig(getConfig())
    addLog('[RESET] resetConfig() + clearConfigCache() called')
  }, [])

  /* SSR Demo */
  const runSSRDemo = useCallback(() => {
    startSSR()
    addLog('[START] startSSR() — collecting CSS')
    // Generate some styles during SSR
    tws('bg-blue-500 text-white p-4 rounded-lg')
    tws('flex items-center gap-2')
    tws('text-2xl font-bold')
    const peek = getSSRStyles()
    addLog(`[PEEK] getSSRStyles() — ${peek.length} chars collected so far`)
    const collected = stopSSR()
    setSsrCSS(collected)
    addLog(`[STOP] stopSSR() — returned ${collected.length} chars of CSS`)
  }, [])

  /* Test custom color */
  const brandStyle = customApplied ? tws('bg-brand-500 text-white p-4 rounded-lg', true) : null

  return (
    <div>
      <h1 className="page-title">Configuration & Plugins</h1>
      <p className="page-desc">
        Extend the theme, register plugins, manage config lifecycle, and collect SSR styles.
      </p>

      <div className="callout callout-info">
        <span className="callout-icon"><Settings size={18} /></span>
        <div className="callout-content">
          <strong>Configuration System</strong>
          <code>configure()</code> lets you extend the default Tailwind theme with custom colors, spacing, fonts, and plugins.
          Changes take effect immediately — any subsequent <code>tws()</code>/<code>twsx()</code> calls will use the new config.
          Use <code>resetConfig()</code> to restore defaults.
        </div>
      </div>

      {/* ── Current Config ── */}
      <div className="section">
        <h3 className="section-title">Current Config</h3>
        <div className="output-panel json">
          <pre>{JSON.stringify(config, null, 2)}</pre>
        </div>
      </div>

      {/* ── Custom Theme ── */}
      <div className="section">
        <h3 className="section-title">Custom Theme</h3>
        <div className="controls" style={{ marginBottom: '1rem' }}>
          <button
            style={tws('bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold border-0 cursor-pointer', true)}
            onClick={applyCustomConfig}
            disabled={customApplied}
          >
            Apply Custom Config
          </button>
          <button
            style={tws('bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold border-0 cursor-pointer', true)}
            onClick={handleReset}
          >
            Reset to Defaults
          </button>
        </div>

        {customApplied && (
          <div className="preview" style={{ flexDirection: 'column', gap: 12 }}>
            <div style={brandStyle}>
              This uses <code>bg-brand-500</code> — a custom color!
            </div>
            <div style={tws('bg-accent text-white p-3 rounded-lg', true)}>
              And this uses <code>bg-accent</code> — a single custom color
            </div>
          </div>
        )}
        {!customApplied && (
          <p style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '.9rem' }}>
            Click "Apply Custom Config" to add brand colors, spacing, and plugins
          </p>
        )}

        <CodeBlock label="js" code={`import { configure, getConfig, resetConfig, clearConfigCache } from 'tailwind-to-style'

configure({
  theme: {
    extend: {
      colors: {
        brand: { 500: '#3b82f6', 600: '#2563eb', ... },
        accent: '#f43f5e',
      },
      spacing: { '128': '32rem', '144': '36rem' },
    },
  },
  plugins: [textShadowPlugin, glassPlugin],
})

// Now use custom values:
tws('bg-brand-500 text-white p-4')
tws('w-128')

// Inspect / reset:
getConfig()      // → current config object
resetConfig()    // → restore defaults
clearConfigCache()  // → purge internal caches`} />
      </div>

      {/* ── Plugin Demo ── */}
      <div className="section">
        <h3 className="section-title">Custom Plugins</h3>
        <p className="section-desc">Two plugin types: <code>createUtilityPlugin()</code> for simple value-based utilities, and <code>createPlugin()</code> for full component-style plugins</p>
        <CodeBlock label="js" code={`import { createPlugin, createUtilityPlugin } from 'tailwind-to-style'

// Utility plugin — auto-generates .text-shadow-sm, .text-shadow-md, etc.
const textShadowPlugin = createUtilityPlugin('text-shadow', {
  prefix: 'text-shadow',
  values: {
    sm: '1px 1px 2px rgba(0,0,0,0.1)',
    md: '2px 2px 4px rgba(0,0,0,0.15)',
    lg: '4px 4px 8px rgba(0,0,0,0.2)',
    glow: '0 0 12px rgba(59,130,246,0.5)',
  },
  formatter: (value) => ({ 'text-shadow': value }),
})

// Component plugin — define complete utility classes
const glassPlugin = createPlugin('glass-morphism', {
  utilities: {
    '.glass': {
      'backdrop-filter': 'blur(10px)',
      'background-color': 'rgba(255,255,255,0.15)',
      'border': '1px solid rgba(255,255,255,0.18)',
    },
  },
})

configure({ plugins: [textShadowPlugin, glassPlugin] })`} />
      </div>

      {/* ── SSR Demo ── */}
      <div className="section">
        <h3 className="section-title">SSR — Server-Side Rendering</h3>
        <p className="section-desc">Collect all generated CSS during server render for injection into HTML. Prevents FOUC (Flash of Unstyled Content).</p>
        <div className="controls">
          <button
            style={tws('bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold border-0 cursor-pointer', true)}
            onClick={runSSRDemo}
          >
            Run SSR Demo
          </button>
        </div>
        {ssrCSS && (
          <div className="output-panel css" style={{ marginTop: 12 }}>
            <pre>{ssrCSS || '(no CSS collected)'}</pre>
          </div>
        )}
        <CodeBlock label="js" code={[
          "import { startSSR, stopSSR, getSSRStyles } from 'tailwind-to-style'",
          "",
          "// In your server render:",
          "startSSR()",
          "",
          "// ... render your app (tws/twsx calls collect CSS) ...",
          "renderToString(<App />)",
          "",
          "// Peek at collected CSS:",
          "const preview = getSSRStyles()",
          "",
          "// Stop and get final CSS:",
          "const css = stopSSR()",
          "",
          "// Inject into HTML:",
          "const html = `<style>${css}</style>`",
        ].join('\n')} />
      </div>

      {/* ── Activity Log ── */}
      {log.length > 0 && (
        <div className="section">
          <h3 className="section-title">Activity Log</h3>
          <div style={{
            background: '#0f172a',
            borderRadius: 8,
            padding: '0.75rem 1rem',
            fontFamily: 'monospace',
            fontSize: '.8rem',
            lineHeight: 1.6,
            color: '#e2e8f0',
            maxHeight: 200,
            overflow: 'auto',
          }}>
            {log.map((msg, i) => (
              <div key={i}>{msg}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
