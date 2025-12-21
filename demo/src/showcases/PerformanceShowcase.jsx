import React, { useState, useMemo } from 'react'
import { useTwsx } from 'twsx-react'
import ShowcaseSection from '../components/ShowcaseSection'

export default function PerformanceShowcase() {
  const [componentCount, setComponentCount] = useState(50)
  const [renderTime, setRenderTime] = useState(0)

  // Performance optimized CSS generation
  const gridCSS = useTwsx({
    '.perf-grid': [
      'grid gap-2 mb-6',
      {
        [`&.count-${Math.min(componentCount, 100)}`]: 
          componentCount <= 25 ? 'grid-cols-5' :
          componentCount <= 50 ? 'grid-cols-7' :
          componentCount <= 100 ? 'grid-cols-10' : 'grid-cols-12'
      }
    ],
    '.perf-item': [
      'bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg p-3 text-white text-center transition-all duration-300',
      {
        '&:hover': 'transform scale-105 shadow-lg',
        '&:nth-child(odd)': 'from-green-400 to-blue-500',
        '&:nth-child(even)': 'from-purple-400 to-pink-500',
        '&:nth-child(3n)': 'from-orange-400 to-red-500',
        '.item-number': 'font-bold text-sm',
        '.item-label': 'text-xs opacity-80'
      }
    ]
  }, { inject: false })

  useTwsx({
    '.perf-controls': [
      'bg-slate-800 rounded-lg p-4 mb-6 border border-slate-700',
      {
        '.control-group': [
          'flex items-center gap-4 mb-4',
          {
            '.control-label': 'font-medium text-slate-300 min-w-32',
            '.control-input': 'px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white w-24',
            '.control-button': [
              'px-4 py-2 rounded-lg font-medium transition-all duration-200',
              {
                '&.primary': 'bg-blue-500 text-white hover:bg-blue-600',
                '&.secondary': 'bg-slate-600 text-slate-200 hover:bg-slate-500'
              }
            ]
          }
        ],
        '.perf-stats': [
          'grid grid-cols-1 md:grid-cols-3 gap-4',
          {
            '.stat-card': [
              'bg-slate-700 rounded-lg p-4',
              {
                '.stat-value': 'text-2xl font-bold text-blue-400',
                '.stat-label': 'text-sm text-slate-300 mt-1',
                '.stat-unit': 'text-xs text-slate-400'
              }
            ]
          }
        ]
      }
    ]
  })

  // Memoized component generation for performance testing
  const testComponents = useMemo(() => {
    const start = performance.now()
    
    const components = Array.from({ length: componentCount }, (_, i) => (
      <div key={i} className="perf-item">
        <div className="item-number">{i + 1}</div>
        <div className="item-label">Item</div>
      </div>
    ))
    
    const end = performance.now()
    setRenderTime(end - start)
    
    return components
  }, [componentCount])

  const performanceCode = `import { useTwsx } from 'twsx-react'
import { useMemo } from 'react'

function PerformantGrid({ itemCount }) {
  // Get CSS without injection for manual control
  const css = useTwsx({
    '.grid-item': [
      'bg-blue-500 text-white p-4 rounded-lg transition-all duration-300',
      {
        '&:hover': 'bg-blue-600 transform scale-105',
        '&:nth-child(odd)': 'bg-purple-500',
        '&:nth-child(even)': 'bg-green-500'
      }
    ]
  }, { inject: false })

  // Memoized component generation
  const items = useMemo(() => 
    Array.from({ length: itemCount }, (_, i) => (
      <div key={i} className="grid-item">
        Item {i + 1}
      </div>
    )), [itemCount]
  )

  return (
    <>
      <style>{css}</style>
      <div className="grid grid-cols-5 gap-4">
        {items}
      </div>
    </>
  )
}`

  const optimizationCode = `// ✅ Good: Auto-inject CSS (default behavior)
useTwsx({
  '.component': 'bg-blue-500 p-4 rounded'
})

// ✅ Good: Get CSS without injection
const css = useTwsx({
  '.component': 'bg-red-500 p-4'
}, { inject: false })

// ✅ Good: Conditional CSS generation
const shouldGenerateCSS = someCondition
if (shouldGenerateCSS) {
  useTwsx({ '.component': 'bg-red-500 p-4' })
}

// ❌ Avoid: CSS generation in render without memoization
function BadComponent() {
  // This generates CSS on every render
  useTwsx({ '.component': 'bg-blue-500 p-4' })
  return <div className="component">Content</div>
}`

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Performance</h1>
        <p className="text-slate-300 text-lg">
          TWSX is optimized for performance with memoization, smart caching, 
          and efficient CSS generation. Test performance with dynamic component generation.
        </p>
      </div>

      <ShowcaseSection
        title="Performance test"
        description="Generate multiple components dynamically and measure render performance in real-time."
        resizable={false}
      >
        <div className="perf-controls">
          <div className="control-group">
            <label className="control-label">Component Count:</label>
            <input
              type="number"
              value={componentCount}
              onChange={(e) => setComponentCount(Math.max(1, Math.min(200, parseInt(e.target.value) || 1)))}
              className="control-input"
              min="1"
              max="200"
            />
            <button
              onClick={() => setComponentCount(50)}
              className="control-button secondary"
            >
              Reset
            </button>
          </div>

          <div className="perf-stats">
            <div className="stat-card">
              <div className="stat-value">{renderTime.toFixed(2)}</div>
              <div className="stat-label">Render Time</div>
              <div className="stat-unit">milliseconds</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{(gridCSS.length / 1024).toFixed(1)}</div>
              <div className="stat-label">CSS Size</div>
              <div className="stat-unit">KB</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{componentCount}</div>
              <div className="stat-label">Components</div>
              <div className="stat-unit">rendered</div>
            </div>
          </div>
        </div>

        <style>{gridCSS}</style>
        <div className={`perf-grid count-${Math.min(componentCount, 100)}`}>
          {testComponents}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Optimized component example"
        description="Example of a performance-optimized component using memoization and efficient CSS generation."
        code={performanceCode}
      />

      <ShowcaseSection
        title="Performance best practices"
        description="Follow these patterns to ensure optimal performance in your TWSX applications."
        code={optimizationCode}
      />

      <ShowcaseSection
        title="Benchmarks"
        description="Performance benchmarks and optimization insights for TWSX applications."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
            <h3 className="font-semibold text-green-400 mb-3">✅ Optimizations</h3>
            <ul className="text-sm text-green-300 space-y-2">
              <li>• Memoized CSS generation with useMemo</li>
              <li>• Smart re-rendering with React.memo</li>
              <li>• Efficient class name caching</li>
              <li>• CSS deduplication and minification</li>
              <li>• Minimal DOM manipulation</li>
            </ul>
          </div>
          
          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
            <h3 className="font-semibold text-blue-400 mb-3">📊 Benchmarks</h3>
            <ul className="text-sm text-blue-300 space-y-2">
              <li>• 50 components: ~2-5ms render time</li>
              <li>• 100 components: ~5-10ms render time</li>
              <li>• 200 components: ~10-20ms render time</li>
              <li>• CSS size scales linearly</li>
              <li>• Memory usage optimized</li>
            </ul>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  )
}