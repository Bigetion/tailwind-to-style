import React, { useState, useEffect } from 'react'
import { 
  tws, 
  twsx, 
  performanceUtils, 
  debouncedTws, 
  debouncedTwsx,
  getTailwindCache,
  resetTailwindCache
} from 'tailwind-to-style'
import { useTwsx } from 'tailwind-to-style/react'
import TestContainer from '../TestContainer'

function PerformanceTests({ updateResult }) {
  const [testResults, setTestResults] = useState([])
  const [performanceStats, setPerformanceStats] = useState(null)

  // Add styling for examples
  useTwsx({
    '.performance-examples': 'mt-8 space-y-6',
    '.stats-container': 'bg-gray-50 p-6 rounded-lg',
    '.stats-title': 'text-lg font-semibold mb-4',
    '.stats-grid': 'grid grid-cols-1 md:grid-cols-2 gap-4 text-sm',
    '.stats-card': 'bg-white p-4 rounded',
    '.stats-card-title': 'font-medium mb-2',
    '.stats-list': 'space-y-1 text-gray-700',
    '.tips-container': 'bg-blue-50 p-6 rounded-lg',
    '.tips-title': 'text-lg font-semibold mb-4',
    '.tips-content': 'space-y-3 text-sm',
    '.tip-item': 'flex items-start gap-3',
    '.tip-icon': 'text-green-600 font-bold',
    '.tip-code': 'bg-white px-2 py-1 rounded',
    '.example-container': 'bg-yellow-50 p-6 rounded-lg',
    '.example-title': 'text-lg font-semibold mb-4',
    '.example-code': 'bg-white p-4 rounded text-xs overflow-x-auto'
  })

  const tests = [
    {
      name: 'Performance Monitoring',
      description: 'Test performance monitoring utilities',
      test: () => {
        // Enable performance logging
        performanceUtils.enablePerformanceLogging(true)
        
        // Perform some operations
        const start = performance.now()
        tws('bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300')
        const end = performance.now()
        
        const stats = performanceUtils.getStats()
        
        return {
          passed: typeof stats === 'object' && stats.cacheStats,
          output: `Execution time: ${(end - start).toFixed(2)}ms\nCache stats: ${JSON.stringify(stats.cacheStats, null, 2)}`,
          expected: 'Should provide performance statistics and cache information'
        }
      }
    },
    {
      name: 'Cache Performance',
      description: 'Test caching system performance',
      test: () => {
        const cache = getTailwindCache()
        
        // Clear cache first
        resetTailwindCache()
        
        // First call (cache miss)
        const start1 = performance.now()
        tws('bg-red-500 text-white p-6 rounded-xl shadow-lg')
        const end1 = performance.now()
        const firstCall = end1 - start1
        
        // Second call (cache hit)
        const start2 = performance.now()
        tws('bg-red-500 text-white p-6 rounded-xl shadow-lg')
        const end2 = performance.now()
        const secondCall = end2 - start2
        
        return {
          passed: cache.isInitialized() && secondCall <= firstCall,
          output: `First call (cache miss): ${firstCall.toFixed(2)}ms\nSecond call (cache hit): ${secondCall.toFixed(2)}ms\nCache initialized: ${cache.isInitialized()}`,
          expected: 'Second call should be faster due to caching'
        }
      }
    },
    {
      name: 'Debounced Functions',
      description: 'Test debounced tws and twsx functions',
      test: () => {
        const start = performance.now()
        
        // Multiple rapid calls should be debounced
        debouncedTws('bg-green-500 text-white p-4')
        debouncedTws('bg-green-500 text-white p-4')
        debouncedTws('bg-green-500 text-white p-4')
        
        debouncedTwsx({
          '.test': 'bg-blue-500 p-4'
        })
        debouncedTwsx({
          '.test': 'bg-blue-500 p-4'
        })
        
        const end = performance.now()
        
        return {
          passed: typeof debouncedTws === 'function' && typeof debouncedTwsx === 'function',
          output: `Debounced calls completed in: ${(end - start).toFixed(2)}ms`,
          expected: 'Should provide debounced versions of tws and twsx'
        }
      }
    },
    {
      name: 'Large Class String Performance',
      description: 'Test performance with large class strings',
      test: () => {
        const largeClassString = [
          'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500',
          'text-white font-bold text-2xl leading-tight tracking-wide',
          'p-8 m-4 rounded-2xl shadow-2xl border-2 border-white',
          'hover:shadow-3xl hover:scale-105 hover:rotate-1',
          'focus:outline-none focus:ring-4 focus:ring-purple-300',
          'active:scale-95 active:shadow-lg',
          'transition-all duration-300 ease-in-out',
          'sm:text-3xl sm:p-10 sm:m-6',
          'md:text-4xl md:p-12 md:m-8',
          'lg:text-5xl lg:p-16 lg:m-10',
          'xl:text-6xl xl:p-20 xl:m-12'
        ].join(' ')
        
        const start = performance.now()
        const result = tws(largeClassString, 1)
        const end = performance.now()
        
        return {
          passed: typeof result === 'object' && Object.keys(result).length > 10 && (end - start) < 100,
          output: `Processing time: ${(end - start).toFixed(2)}ms\nGenerated properties: ${Object.keys(result).length}`,
          expected: 'Should handle large class strings efficiently (< 100ms)'
        }
      }
    },
    {
      name: 'Complex twsx Performance',
      description: 'Test performance with complex nested twsx structures',
      test: () => {
        const complexStructure = {
          '.complex-component': [
            'bg-white rounded-lg shadow-md p-6 transition-all duration-300',
            {
              '.header': [
                'border-b border-gray-200 pb-4 mb-4',
                {
                  '.title': 'text-2xl font-bold text-gray-900 mb-2',
                  '.subtitle': 'text-sm text-gray-500',
                  '&:hover .title': 'text-blue-600',
                }
              ],
              '.content': [
                'space-y-4',
                {
                  'p': 'text-gray-700 leading-relaxed',
                  'ul': 'list-disc list-inside space-y-2',
                  'li': 'text-gray-600',
                  'a': 'text-blue-600 hover:text-blue-800 underline',
                }
              ],
              '.footer': [
                'border-t border-gray-200 pt-4 mt-6 flex justify-between items-center',
                {
                  'button': 'px-4 py-2 rounded-lg font-medium transition-colors',
                  'button.primary': 'bg-blue-500 text-white hover:bg-blue-600',
                  'button.secondary': 'bg-gray-200 text-gray-800 hover:bg-gray-300',
                }
              ],
              '&:hover': 'shadow-lg transform scale-105',
              '@media (max-width: 768px)': {
                padding: '1rem',
                '.header .title': 'text-xl',
              }
            }
          ]
        }
        
        const start = performance.now()
        const result = twsx(complexStructure)
        const end = performance.now()
        
        return {
          passed: typeof result === 'string' && result.length > 1000 && (end - start) < 50,
          output: `Processing time: ${(end - start).toFixed(2)}ms\nGenerated CSS length: ${result.length} characters`,
          expected: 'Should handle complex nested structures efficiently (< 50ms)'
        }
      }
    },
    {
      name: 'Memory Usage Test',
      description: 'Test memory efficiency with repeated operations',
      test: () => {
        const initialStats = performanceUtils.getStats()
        
        // Perform many operations
        for (let i = 0; i < 100; i++) {
          tws(`bg-blue-${i % 9 + 1}00 text-white p-${i % 8 + 1}`)
          twsx({
            [`.test-${i}`]: `bg-red-${i % 9 + 1}00 p-${i % 8 + 1}`
          })
        }
        
        const finalStats = performanceUtils.getStats()
        
        return {
          passed: finalStats.cacheStats.cssResolution >= initialStats.cacheStats.cssResolution,
          output: `Initial cache entries: ${initialStats.cacheStats.cssResolution}\nFinal cache entries: ${finalStats.cacheStats.cssResolution}`,
          expected: 'Should efficiently manage memory and cache entries'
        }
      }
    },
    {
      name: 'Concurrent Operations',
      description: 'Test performance with concurrent operations',
      test: () => {
        const start = performance.now()
        
        // Simulate concurrent operations
        const promises = Array.from({ length: 10 }, (_, i) => 
          Promise.resolve().then(() => {
            tws(`bg-purple-${i % 9 + 1}00 text-white p-${i % 8 + 1} rounded-${i % 3 === 0 ? 'lg' : 'md'}`)
            return twsx({
              [`.concurrent-${i}`]: [
                `bg-green-${i % 9 + 1}00 p-${i % 8 + 1}`,
                {
                  '&:hover': `bg-green-${(i % 9 + 1) + 1}00 transform scale-105`
                }
              ]
            })
          })
        )
        
        return Promise.all(promises).then(() => {
          const end = performance.now()
          return {
            passed: (end - start) < 100,
            output: `Concurrent operations completed in: ${(end - start).toFixed(2)}ms`,
            expected: 'Should handle concurrent operations efficiently (< 100ms)'
          }
        })
      }
    },
    {
      name: 'Cache Clear Performance',
      description: 'Test cache clearing and rebuilding performance',
      test: () => {
        // Build up cache
        for (let i = 0; i < 50; i++) {
          tws(`bg-indigo-${i % 9 + 1}00 text-white p-${i % 8 + 1}`)
        }
        
        const beforeClear = performanceUtils.getStats()
        
        // Clear cache
        const clearStart = performance.now()
        resetTailwindCache()
        const clearEnd = performance.now()
        
        // Rebuild cache
        const rebuildStart = performance.now()
        for (let i = 0; i < 50; i++) {
          tws(`bg-indigo-${i % 9 + 1}00 text-white p-${i % 8 + 1}`)
        }
        const rebuildEnd = performance.now()
        
        const afterRebuild = performanceUtils.getStats()
        
        return {
          passed: (clearEnd - clearStart) < 10 && (rebuildEnd - rebuildStart) < 100,
          output: `Clear time: ${(clearEnd - clearStart).toFixed(2)}ms\nRebuild time: ${(rebuildEnd - rebuildStart).toFixed(2)}ms\nBefore clear: ${beforeClear.cacheStats.cssResolution} entries\nAfter rebuild: ${afterRebuild.cacheStats.cssResolution} entries`,
          expected: 'Cache clearing should be fast (< 10ms) and rebuilding efficient (< 100ms)'
        }
      }
    }
  ]

  useEffect(() => {
    const runTests = async () => {
      const results = []
      
      for (const test of tests) {
        try {
          const result = await test.test()
          results.push({ ...test, ...result, error: null })
        } catch (error) {
          results.push({ ...test, passed: false, error: error.message, output: null })
        }
      }
      
      setTestResults(results)
      
      const allPassed = results.every(r => r.passed)
      updateResult('performance', { 
        passed: allPassed, 
        total: results.length,
        passed_count: results.filter(r => r.passed).length
      })
      
      // Get final performance stats
      setPerformanceStats(performanceUtils.getStats())
    }
    
    runTests()
  }, [])

  return (
    <TestContainer
      title="Performance Tests"
      description="Testing performance monitoring, caching efficiency, debounced functions, memory usage, and optimization features of the library."
      testResults={testResults}
    >
      <div className="performance-examples">
        {performanceStats && (
          <div className="stats-container">
            <h3 className="stats-title">Performance Statistics</h3>
            <div className="stats-grid">
              <div className="stats-card">
                <h4 className="stats-card-title">Cache Statistics:</h4>
                <ul className="stats-list">
                  <li>CSS Resolution: {performanceStats.cacheStats.cssResolution}</li>
                  <li>Config Options: {performanceStats.cacheStats.configOptions}</li>
                  <li>Parse Selector: {performanceStats.cacheStats.parseSelector}</li>
                  <li>Encode Bracket: {performanceStats.cacheStats.encodeBracket}</li>
                  <li>Decode Bracket: {performanceStats.cacheStats.decodeBracket}</li>
                </ul>
              </div>
              <div className="stats-card">
                <h4 className="stats-card-title">Injection Statistics:</h4>
                <ul className="stats-list">
                  <li>Unique Stylesheets: {performanceStats.injectionStats.uniqueStylesheets}</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        <div className="tips-container">
          <h3 className="tips-title">Performance Tips</h3>
          <div className="tips-content">
            <div className="tip-item">
              <span className="tip-icon">✓</span>
              <div>
                <strong>Use caching:</strong> The library automatically caches parsed styles for better performance on repeated calls.
              </div>
            </div>
            <div className="tip-item">
              <span className="tip-icon">✓</span>
              <div>
                <strong>Debounced functions:</strong> Use <code className="tip-code">debouncedTws</code> and <code className="tip-code">debouncedTwsx</code> for high-frequency updates.
              </div>
            </div>
            <div className="tip-item">
              <span className="tip-icon">✓</span>
              <div>
                <strong>Performance monitoring:</strong> Enable performance logging in development to identify bottlenecks.
              </div>
            </div>
            <div className="tip-item">
              <span className="tip-icon">✓</span>
              <div>
                <strong>Memory management:</strong> Use <code className="tip-code">resetTailwindCache()</code> if needed to clear cache and free memory.
              </div>
            </div>
          </div>
        </div>
        
        <div className="example-container">
          <h3 className="example-title">Performance Monitoring Example</h3>
          <pre className="example-code">
{`import { performanceUtils, tws } from 'tailwind-to-style'

// Enable performance logging
performanceUtils.enablePerformanceLogging(true)

// Your code
const styles = tws('bg-blue-500 text-white p-4 rounded-lg')

// Check performance stats
const stats = performanceUtils.getStats()
console.log('Cache stats:', stats.cacheStats)
console.log('Injection stats:', stats.injectionStats)

// Clear caches if needed
performanceUtils.clearCaches()`}
          </pre>
        </div>
      </div>
    </TestContainer>
  )
}

export default PerformanceTests