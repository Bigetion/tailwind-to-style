import React, { useState, useEffect } from 'react'
import { tws } from 'tailwind-to-style'
import TestContainer from '../TestContainer'

function BasicTwsTests({ updateResult }) {
  const [testResults, setTestResults] = useState([])

  const tests = [
    {
      name: 'Basic CSS String Output',
      description: 'Test basic tws() CSS string generation',
      test: () => {
        const result = tws('bg-blue-500 text-white p-4')
        return {
          passed: typeof result === 'string' && result.length > 0,
          output: result,
          expected: 'Should return CSS string'
        }
      }
    },
    {
      name: 'JSON Object Output',
      description: 'Test tws() JSON object generation',
      test: () => {
        const result = tws('bg-red-500 text-white', 1)
        return {
          passed: typeof result === 'object' && result !== null,
          output: JSON.stringify(result, null, 2),
          expected: 'Should return CSS object'
        }
      }
    },
    {
      name: 'Simple Utilities',
      description: 'Test basic utility class conversion',
      test: () => {
        const result = tws('p-4 m-2 bg-white')
        return {
          passed: result.includes('padding') && result.includes('margin'),
          output: result,
          expected: 'Should convert basic utilities to CSS'
        }
      }
    }
  ]

  useEffect(() => {
    const results = tests.map(test => {
      try {
        const result = test.test()
        return { ...test, ...result, error: null }
      } catch (error) {
        return { ...test, passed: false, error: error.message, output: null }
      }
    })
    
    setTestResults(results)
    
    const allPassed = results.every(r => r.passed)
    updateResult('basic', { 
      passed: allPassed, 
      total: results.length,
      passed_count: results.filter(r => r.passed).length
    })
  }, [])

  return (
    <TestContainer
      title="Basic tws() Function Tests"
      description="Simple tests for basic tws() functionality. The main focus is on advanced twsx() features."
      testResults={testResults}
    />
  )
}

export default BasicTwsTests