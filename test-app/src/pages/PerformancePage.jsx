/**
 * Performance Page
 * Demonstrates: performanceUtils.getStats(), clearCaches(), cache benchmarks
 */
import { useState, useCallback } from 'react'
import { tws, twsx, performanceUtils } from 'tailwind-to-style'
import CodeBlock from '../components/CodeBlock'
import { BarChart3 } from 'lucide-react'

function StatCard({ label, value, color = '#6366f1' }) {
  return (
    <div style={{
      background: '#f8fafc',
      borderRadius: 12,
      padding: '1rem',
      textAlign: 'center',
      border: '1px solid #e2e8f0',
    }}>
      <div style={{ fontSize: '1.75rem', fontWeight: 800, color }}>{value}</div>
      <div style={{ fontSize: '.75rem', color: '#64748b', marginTop: 4 }}>{label}</div>
    </div>
  )
}

export default function PerformancePage() {
  const [stats, setStats] = useState(null)
  const [benchResult, setBenchResult] = useState(null)

  const refreshStats = useCallback(() => {
    const s = performanceUtils.getStats()
    setStats(s)
  }, [])

  const clearAll = useCallback(() => {
    performanceUtils.clearCaches()
    refreshStats()
  }, [refreshStats])

  /* Micro-benchmark */
  const runBenchmark = useCallback(() => {
    const classes = [
      'bg-blue-500 text-white p-4 rounded-lg shadow-md',
      'flex items-center justify-between gap-4',
      'text-2xl font-bold tracking-tight leading-snug',
      'w-full max-w-lg mx-auto',
      'border border-gray-200 hover:border-gray-300',
      'bg-gradient-to-r from-indigo-500 to-purple-600',
      'transition-all duration-300 ease-in-out',
      'absolute top-0 left-0 right-0 bottom-0',
    ]

    // Cold run (clear first)
    performanceUtils.clearCaches()
    const coldStart = performance.now()
    for (let i = 0; i < 1000; i++) {
      tws(classes[i % classes.length])
    }
    const coldTime = performance.now() - coldStart

    // Warm run (cache populated)
    const warmStart = performance.now()
    for (let i = 0; i < 1000; i++) {
      tws(classes[i % classes.length])
    }
    const warmTime = performance.now() - warmStart

    // twsx benchmark
    const twsxStart = performance.now()
    for (let i = 0; i < 1000; i++) {
      twsx('div', {
        base: 'p-4 rounded-lg',
        '&': 'bg-white shadow-sm',
        '> .child': 'text-sm text-gray-600',
      })
    }
    const twsxTime = performance.now() - twsxStart

    setBenchResult({
      cold: coldTime.toFixed(2),
      warm: warmTime.toFixed(2),
      twsx: twsxTime.toFixed(2),
      speedup: (coldTime / warmTime).toFixed(1),
    })
    refreshStats()
  }, [refreshStats])

  const cacheStats = stats?.cacheStats || {}
  const injectionStats = stats?.injectionStats || {}

  return (
    <div>
      <h1 className="page-title">Performance & Caching</h1>
      <p className="page-desc">
        Monitor cache utilization, run benchmarks, and manage internal caches.
      </p>

      <div className="callout callout-info">
        <span className="callout-icon"><BarChart3 size={18} /></span>
        <div className="callout-content">
          <strong>How Caching Works</strong>
          Every <code>tws()</code>/<code>twsx()</code> call caches its result.
          The first call (cold) parses and resolves the CSS. Subsequent calls with the same input (warm) return instantly from cache.
          This typically gives a <strong>5–20× speedup</strong> for repeated calls.
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="section">
        <div className="controls">
          <button
            style={tws('bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold border-0 cursor-pointer', true)}
            onClick={refreshStats}
          >
            Refresh Stats
          </button>
          <button
            style={tws('bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold border-0 cursor-pointer', true)}
            onClick={clearAll}
          >
            Clear All Caches
          </button>
          <button
            style={tws('bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold border-0 cursor-pointer', true)}
            onClick={runBenchmark}
          >
            Run Benchmark (1000×)
          </button>
        </div>
      </div>

      {/* ── Cache Stats ── */}
      {stats && (
        <div className="section">
          <h3 className="section-title">Cache Statistics</h3>
          <div className="grid-3">
            <StatCard label="CSS Resolution Cache" value={cacheStats.cssResolution ?? 0} color="#6366f1" />
            <StatCard label="Config Options Cache" value={cacheStats.configOptions ?? 0} color="#8b5cf6" />
            <StatCard label="Parse Selector Cache" value={cacheStats.parseSelector ?? 0} color="#a855f7" />
            <StatCard label="Encode Bracket Cache" value={cacheStats.encodeBracket ?? 0} color="#c084fc" />
            <StatCard label="Decode Bracket Cache" value={cacheStats.decodeBracket ?? 0} color="#d8b4fe" />
            <StatCard label="twsx Input Cache" value={cacheStats.twsxInputCacheSize ?? 0} color="#e879f9" />
            <StatCard label="twsxVariants Cache" value={cacheStats.twsxVariantsCacheSize ?? 0} color="#f0abfc" />
            <StatCard label="Unique Stylesheets" value={injectionStats.uniqueStylesheets ?? 0} color="#14b8a6" />
            <StatCard label="Keyframes" value={injectionStats.keyframes ?? 0} color="#0ea5e9" />
          </div>
        </div>
      )}

      {/* ── Benchmark Results ── */}
      {benchResult && (
        <div className="section">
          <h3 className="section-title">Benchmark Results (1000 iterations)</h3>
          <div className="grid-4">
            <StatCard label="Cold (no cache)" value={`${benchResult.cold}ms`} color="#ef4444" />
            <StatCard label="Warm (cached)" value={`${benchResult.warm}ms`} color="#22c55e" />
            <StatCard label="twsx() warm" value={`${benchResult.twsx}ms`} color="#3b82f6" />
            <StatCard label="Cache Speedup" value={`${benchResult.speedup}×`} color="#f59e0b" />
          </div>
        </div>
      )}

      {/* ── API Reference ── */}
      <div className="section">
        <h3 className="section-title">API Reference</h3>
        <CodeBlock label="js" code={`import { performanceUtils } from 'tailwind-to-style'

// Get cache statistics
const stats = performanceUtils.getStats()
// → {
//     cacheStats: {
//       cssResolution: 42,
//       configOptions: 15,
//       parseSelector: 38,
//       twsxInputCacheSize: 12,
//       twsxVariantsCacheSize: 3,
//       ...
//     },
//     injectionStats: {
//       uniqueStylesheets: 42,
//       keyframes: 4,
//     }
//   }

// Clear all internal caches
performanceUtils.clearCaches()

// Enable performance logging (console warnings for slow operations)
performanceUtils.enablePerformanceLogging(true)

// === Debounced variants ===
import { debouncedTws, debouncedTwsx } from 'tailwind-to-style'

// Rate-limited tws — great for input handlers
debouncedTws('bg-blue-500 p-4')
debouncedTwsx('div', { base: 'p-4' })`} />
      </div>

      {/* ── Raw Stats JSON ── */}
      {stats && (
        <div className="section">
          <h3 className="section-title">Raw Stats JSON</h3>
          <div className="output-panel json">
            <pre>{JSON.stringify(stats, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
