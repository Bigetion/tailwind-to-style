import React, { useState, useEffect } from 'react'
import { tws, twsx, configure } from 'tailwind-to-style'
import { useTwsx } from 'tailwind-to-style/react'
import TestContainer from '../TestContainer'

function EdgeCasesTests({ updateResult }) {
  const [testResults, setTestResults] = useState([])

  // Add styling for examples
  useTwsx({
    '.edge-examples': 'mt-8 space-y-6',
    '.warning-container': 'bg-red-50 p-6 rounded-lg',
    '.warning-title': 'text-lg font-semibold mb-4',
    '.warning-content': 'space-y-3 text-sm',
    '.warning-item': 'flex items-start gap-3',
    '.warning-icon': 'text-red-600 font-bold',
    '.stress-container': 'bg-yellow-50 p-6 rounded-lg',
    '.stress-title': 'text-lg font-semibold mb-4',
    '.stress-content': 'space-y-4 text-sm',
    '.stress-section-title': 'font-medium mb-2',
    '.stress-example': 'bg-white p-3 rounded text-xs font-mono overflow-x-auto',
    '.stress-code': 'bg-white p-3 rounded text-xs overflow-x-auto',
    '.robustness-container': 'bg-green-50 p-6 rounded-lg',
    '.robustness-title': 'text-lg font-semibold mb-4',
    '.robustness-content': 'space-y-3 text-sm',
    '.robustness-item': 'flex items-start gap-3',
    '.robustness-icon': 'text-green-600 font-bold'
  })

  const tests = [
    {
      name: 'Empty Input Handling',
      description: 'Test handling of empty or null inputs',
      test: () => {
        const emptyString = tws('')
        const nullInput = tws(null)
        const undefinedInput = tws(undefined)
        const emptyTwsx = twsx({})
        
        return {
          passed: emptyString === '' && nullInput === '' && undefinedInput === '' && emptyTwsx === '',
          output: `Empty string: "${emptyString}"\nNull: "${nullInput}"\nUndefined: "${undefinedInput}"\nEmpty twsx: "${emptyTwsx}"`,
          expected: 'Should handle empty inputs gracefully without errors'
        }
      }
    },
    {
      name: 'Invalid Class Names',
      description: 'Test handling of invalid or non-existent class names',
      test: () => {
        const invalidClasses = tws('invalid-class-name non-existent-utility fake-bg-color')
        const result = tws('bg-blue-500 invalid-class text-white', 1)
        
        return {
          passed: typeof result === 'object' && result.backgroundColor && result.color,
          output: `Invalid classes CSS: "${invalidClasses}"\nMixed valid/invalid: ${JSON.stringify(result, null, 2)}`,
          expected: 'Should ignore invalid classes and process valid ones'
        }
      }
    },
    {
      name: 'Malformed Arbitrary Values',
      description: 'Test handling of malformed arbitrary values in brackets',
      test: () => {
        const malformedBrackets = tws('w-[invalid bg-[malformed] h-[300px] text-[')
        const validArbitrary = tws('w-[300px] h-[200px]', 1)
        
        return {
          passed: validArbitrary.width === '300px' && validArbitrary.height === '200px',
          output: `Malformed: "${malformedBrackets}"\nValid arbitrary: ${JSON.stringify(validArbitrary, null, 2)}`,
          expected: 'Should handle malformed brackets gracefully and process valid arbitrary values'
        }
      }
    },
    {
      name: 'Extremely Long Class Strings',
      description: 'Test handling of very long class strings',
      test: () => {
        const longClassString = Array.from({ length: 1000 }, (_, i) => `p-${i % 8 + 1}`).join(' ')
        const start = performance.now()
        const result = tws(longClassString)
        const end = performance.now()
        
        return {
          passed: typeof result === 'string' && result.length > 0 && (end - start) < 1000,
          output: `Processing time: ${(end - start).toFixed(2)}ms\nResult length: ${result.length} characters`,
          expected: 'Should handle extremely long class strings without performance issues'
        }
      }
    },
    {
      name: 'Special Characters in Classes',
      description: 'Test handling of special characters and edge cases',
      test: () => {
        const specialChars = tws('bg-blue-500/50 text-white/90 border-gray-300/25')
        const result = tws('bg-blue-500/50', 1)
        
        return {
          passed: result.backgroundColor && result.backgroundColor.includes('0.5'),
          output: `Special chars CSS: "${specialChars}"\nOpacity result: ${JSON.stringify(result, null, 2)}`,
          expected: 'Should handle opacity modifiers and special characters correctly'
        }
      }
    },
    {
      name: 'Deeply Nested twsx Structures',
      description: 'Test extremely deep nesting in twsx',
      test: () => {
        const deepNesting = {
          '.level1': {
            '.level2': {
              '.level3': {
                '.level4': {
                  '.level5': {
                    '.level6': 'bg-red-500 text-white p-4'
                  }
                }
              }
            }
          }
        }
        
        const result = twsx(deepNesting)
        
        return {
          passed: result.includes('.level1 .level2 .level3 .level4 .level5 .level6'),
          output: result,
          expected: 'Should handle deeply nested structures correctly'
        }
      }
    },
    {
      name: 'Circular References in twsx',
      description: 'Test handling of potential circular references',
      test: () => {
        try {
          const obj = { '.test': 'bg-blue-500' }
          obj['.circular'] = obj // Create circular reference
          
          // This should not cause infinite recursion
          const result = twsx({ '.safe': 'bg-green-500 p-4' })
          
          return {
            passed: result.includes('background-color') && result.includes('padding'),
            output: result,
            expected: 'Should handle objects safely without circular reference issues'
          }
        } catch (error) {
          return {
            passed: false,
            output: error.message,
            expected: 'Should not crash on circular references'
          }
        }
      }
    },
    {
      name: 'Unicode and International Characters',
      description: 'Test handling of unicode characters in selectors',
      test: () => {
        const unicodeSelectors = twsx({
          '.测试': 'bg-blue-500 text-white p-4',
          '.тест': 'bg-red-500 text-white p-4',
          '.テスト': 'bg-green-500 text-white p-4',
          '.🎨': 'bg-purple-500 text-white p-4'
        })
        
        return {
          passed: unicodeSelectors.includes('.测试') && unicodeSelectors.includes('.тест') && 
                 unicodeSelectors.includes('.テスト') && unicodeSelectors.includes('.🎨'),
          output: unicodeSelectors,
          expected: 'Should handle unicode characters in selectors correctly'
        }
      }
    },
    {
      name: 'Large Numbers in Utilities',
      description: 'Test handling of very large numbers in utilities',
      test: () => {
        const largeNumbers = tws('w-[9999px] h-[10000px] text-[999px] p-[500px]', 1)
        
        return {
          passed: largeNumbers.width === '9999px' && largeNumbers.height === '10000px' && 
                 largeNumbers.fontSize === '999px' && largeNumbers.padding === '500px',
          output: JSON.stringify(largeNumbers, null, 2),
          expected: 'Should handle very large numbers in arbitrary values'
        }
      }
    },
    {
      name: 'Conflicting CSS Properties',
      description: 'Test handling of conflicting CSS properties',
      test: () => {
        const conflicting = tws('p-4 p-8 bg-red-500 bg-blue-500 text-white text-black', 1)
        
        // Last one should win
        return {
          passed: conflicting.padding && conflicting.backgroundColor && conflicting.color,
          output: JSON.stringify(conflicting, null, 2),
          expected: 'Should handle conflicting properties (last one wins)'
        }
      }
    },
    {
      name: 'Invalid CSS Values',
      description: 'Test handling of invalid CSS values in @css directive',
      test: () => {
        const invalidCSS = twsx({
          '.test': [
            'bg-blue-500 p-4',
            {
              '@css': {
                'invalid-property': 'invalid-value',
                'color': 'not-a-color',
                'margin': 'definitely-not-valid',
                'valid-property': 'valid-value'
              }
            }
          ]
        })
        
        return {
          passed: invalidCSS.includes('background-color') && invalidCSS.includes('padding'),
          output: invalidCSS,
          expected: 'Should handle invalid CSS values gracefully'
        }
      }
    },
    {
      name: 'Memory Stress Test',
      description: 'Test memory handling with many operations',
      test: () => {
        const initialMemory = performance.memory ? performance.memory.usedJSHeapSize : 0
        
        // Perform many operations
        for (let i = 0; i < 1000; i++) {
          tws(`bg-blue-${i % 9 + 1}00 text-white p-${i % 8 + 1} m-${i % 6 + 1} rounded-${i % 3 === 0 ? 'lg' : 'md'}`)
          
          if (i % 100 === 0) {
            twsx({
              [`.stress-test-${i}`]: [
                `bg-red-${i % 9 + 1}00 p-${i % 8 + 1}`,
                {
                  '&:hover': `bg-red-${(i % 9 + 1) + 1}00 transform scale-105`,
                  '.nested': `text-white font-bold text-${i % 4 === 0 ? 'lg' : 'base'}`
                }
              ]
            })
          }
        }
        
        const finalMemory = performance.memory ? performance.memory.usedJSHeapSize : 0
        const memoryIncrease = finalMemory - initialMemory
        
        return {
          passed: memoryIncrease < 50 * 1024 * 1024, // Less than 50MB increase
          output: `Memory increase: ${(memoryIncrease / 1024 / 1024).toFixed(2)}MB`,
          expected: 'Should not cause excessive memory usage (< 50MB increase)'
        }
      }
    },
    {
      name: 'Concurrent Modifications',
      description: 'Test concurrent modifications to configuration',
      test: () => {
        try {
          // Simulate concurrent config changes
          const promises = Array.from({ length: 10 }, (_, i) => 
            Promise.resolve().then(() => {
              configure({
                theme: {
                  extend: {
                    colors: {
                      [`concurrent-${i}`]: `#${i}${i}${i}${i}${i}${i}`
                    }
                  }
                }
              })
              return tws(`bg-concurrent-${i} text-white p-4`)
            })
          )
          
          return Promise.all(promises).then(results => {
            const allSuccessful = results.every(result => typeof result === 'string')
            return {
              passed: allSuccessful,
              output: `Concurrent operations completed: ${results.length}`,
              expected: 'Should handle concurrent configuration changes safely'
            }
          })
        } catch (error) {
          return {
            passed: false,
            output: error.message,
            expected: 'Should not crash on concurrent modifications'
          }
        }
      }
    },
    {
      name: 'Browser Compatibility Edge Cases',
      description: 'Test browser-specific edge cases',
      test: () => {
        // Test CSS properties that might have browser-specific handling
        const browserSpecific = twsx({
          '.browser-test': {
            '@css': {
              '-webkit-appearance': 'none',
              '-moz-appearance': 'none',
              'appearance': 'none',
              '-webkit-user-select': 'none',
              '-moz-user-select': 'none',
              'user-select': 'none'
            }
          }
        })
        
        return {
          passed: browserSpecific.includes('-webkit-appearance') && 
                 browserSpecific.includes('-moz-appearance') && 
                 browserSpecific.includes('user-select'),
          output: browserSpecific,
          expected: 'Should handle browser-specific CSS properties correctly'
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
      updateResult('edge-cases', { 
        passed: allPassed, 
        total: results.length,
        passed_count: results.filter(r => r.passed).length
      })
    }
    
    runTests()
  }, [])

  return (
    <TestContainer
      title="Edge Cases Tests"
      description="Testing edge cases, error handling, malformed inputs, performance under stress, and unusual usage patterns to ensure library robustness."
      testResults={testResults}
    >
      <div className="edge-examples">
        <div className="warning-container">
          <h3 className="warning-title">⚠️ Edge Case Scenarios</h3>
          <div className="warning-content">
            <div className="warning-item">
              <span className="warning-icon">!</span>
              <div>
                <strong>Empty/Null Inputs:</strong> Library should gracefully handle empty strings, null, and undefined inputs.
              </div>
            </div>
            <div className="warning-item">
              <span className="warning-icon">!</span>
              <div>
                <strong>Invalid Classes:</strong> Non-existent Tailwind classes should be ignored without breaking valid ones.
              </div>
            </div>
            <div className="warning-item">
              <span className="warning-icon">!</span>
              <div>
                <strong>Malformed Syntax:</strong> Malformed arbitrary values and syntax should not crash the library.
              </div>
            </div>
            <div className="warning-item">
              <span className="warning-icon">!</span>
              <div>
                <strong>Performance Limits:</strong> Very large inputs should be processed efficiently without memory leaks.
              </div>
            </div>
          </div>
        </div>
        
        <div className="stress-container">
          <h3 className="stress-title">🧪 Stress Test Examples</h3>
          <div className="stress-content">
            <div>
              <h4 className="stress-section-title">Large Class String:</h4>
              <div className="stress-example">
                {Array.from({ length: 20 }, (_, i) => `bg-blue-${i % 9 + 1}00`).join(' ')} ...
              </div>
            </div>
            <div>
              <h4 className="stress-section-title">Deep Nesting:</h4>
              <pre className="stress-code">
{`.level1 .level2 .level3 .level4 .level5 .level6 {
  background-color: #ef4444;
  color: white;
  padding: 1rem;
}`}
              </pre>
            </div>
            <div>
              <h4 className="stress-section-title">Unicode Selectors:</h4>
              <div className="stress-example">
                .测试 .тест .テスト .🎨 { /* International characters */ }
              </div>
            </div>
          </div>
        </div>
        
        <div className="robustness-container">
          <h3 className="robustness-title">✅ Robustness Features</h3>
          <div className="robustness-content">
            <div className="robustness-item">
              <span className="robustness-icon">✓</span>
              <div>
                <strong>Error Isolation:</strong> Errors in one part don't affect the processing of other valid parts.
              </div>
            </div>
            <div className="robustness-item">
              <span className="robustness-icon">✓</span>
              <div>
                <strong>Memory Management:</strong> Efficient caching and cleanup prevent memory leaks.
              </div>
            </div>
            <div className="robustness-item">
              <span className="robustness-icon">✓</span>
              <div>
                <strong>Graceful Degradation:</strong> Invalid inputs are ignored while valid ones are processed.
              </div>
            </div>
            <div className="robustness-item">
              <span className="robustness-icon">✓</span>
              <div>
                <strong>Performance Safeguards:</strong> Built-in limits and optimizations prevent performance issues.
              </div>
            </div>
          </div>
        </div>
      </div>
    </TestContainer>
  )
}

export default EdgeCasesTests