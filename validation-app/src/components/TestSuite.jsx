import React from 'react'
import { useTwsx } from 'tailwind-to-style/react'
import BasicTwsTests from './tests/BasicTwsTests'
import TwsxTests from './tests/TwsxTests'
import StyledComponentsTests from './tests/StyledComponentsTests'
import VariantsTests from './tests/VariantsTests'
import ResponsiveTests from './tests/ResponsiveTests'
import AnimationsTests from './tests/AnimationsTests'
import ThemeTests from './tests/ThemeTests'
import PluginsTests from './tests/PluginsTests'
import PerformanceTests from './tests/PerformanceTests'
import EdgeCasesTests from './tests/EdgeCasesTests'

const testComponents = {
  'basic': BasicTwsTests,
  'twsx': TwsxTests,
  'styled': StyledComponentsTests,
  'variants': VariantsTests,
  'responsive': ResponsiveTests,
  'animations': AnimationsTests,
  'theme': ThemeTests,
  'plugins': PluginsTests,
  'performance': PerformanceTests,
  'edge-cases': EdgeCasesTests,
}

function TestSuite({ activeTest, updateResult, results }) {
  const TestComponent = testComponents[activeTest]

  useTwsx({
    '.test-suite-container': 'max-w-6xl mx-auto',
    '.test-not-found': [
      'text-center py-12',
      {
        '.not-found-title': 'text-2xl font-bold text-gray-900 mb-4',
        '.not-found-text': 'text-gray-600'
      }
    ]
  })

  if (!TestComponent) {
    return (
      <div className="test-not-found">
        <h2 className="not-found-title">Test Not Found</h2>
        <p className="not-found-text">The requested test category does not exist.</p>
      </div>
    )
  }

  return (
    <div className="test-suite-container">
      <TestComponent 
        updateResult={updateResult}
        result={results[activeTest]}
      />
    </div>
  )
}

export default TestSuite