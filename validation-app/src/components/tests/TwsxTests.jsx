import React, { useState, useEffect } from 'react'
import { twsx } from 'tailwind-to-style'
import TestContainer from '../TestContainer'

function TwsxTests({ updateResult }) {
  const [testResults, setTestResults] = useState([])

  const tests = [
    {
      name: 'Basic Nested Styles CSS Generation',
      description: 'Test CSS string generation for nested styles',
      test: () => {
        const result = twsx({
          '.card': [
            'bg-white p-6 rounded-lg shadow-md',
            {
              '.title': 'text-xl font-bold text-gray-900',
              '.content': 'text-gray-600 mt-2'
            }
          ]
        })
        return {
          passed: result.includes('.card') && result.includes('.card .title') && result.includes('.card .content') && result.includes('background-color'),
          output: result,
          expected: 'Should generate CSS with nested selectors and proper CSS properties'
        }
      }
    },
    {
      name: 'Hover State CSS Generation',
      description: 'Test CSS generation for hover states',
      test: () => {
        const result = twsx({
          '.button': [
            'bg-blue-500 text-white px-4 py-2 rounded',
            {
              '&:hover': 'bg-blue-600 transform scale-105'
            }
          ]
        })
        return {
          passed: result.includes('.button') && result.includes('.button:hover') && result.includes('background-color') && result.includes('transform'),
          output: result,
          expected: 'Should generate CSS with hover states'
        }
      }
    },
    {
      name: 'Multiple Pseudo States CSS',
      description: 'Test CSS generation for multiple pseudo states',
      test: () => {
        const result = twsx({
          '.interactive': [
            'bg-gray-100 p-4',
            {
              '&:hover': 'bg-gray-200',
              '&:focus': 'ring-2 ring-blue-300',
              '&:active': 'bg-gray-300'
            }
          ]
        })
        return {
          passed: result.includes(':hover') && result.includes(':focus') && result.includes(':active'),
          output: result,
          expected: 'Should generate CSS for hover, focus, and active states'
        }
      }
    },
    {
      name: 'Responsive CSS Generation',
      description: 'Test CSS generation for responsive variants',
      test: () => {
        const result = twsx({
          '.responsive': [
            'text-base p-4',
            'sm:text-lg sm:p-6',
            'md:text-xl md:p-8'
          ]
        })
        return {
          passed: result.includes('@media') && result.includes('min-width') && result.includes('.responsive'),
          output: result,
          expected: 'Should generate media queries for responsive variants'
        }
      }
    },
    {
      name: 'Responsive Selector Syntax CSS',
      description: 'Test CSS generation for responsive selector syntax',
      test: () => {
        const result = twsx({
          '.title': 'text-base',
          'md:.title': 'text-lg font-bold',
          'lg:.title': 'text-xl'
        })
        return {
          passed: result.includes('@media') && result.includes('.title') && result.includes('768px'),
          output: result,
          expected: 'Should convert responsive selectors to media queries'
        }
      }
    },
    {
      name: 'Grouping Syntax CSS Generation',
      description: 'Test CSS generation for grouped utilities',
      test: () => {
        const result = twsx({
          '.grouped': [
            'bg-white p-4',
            'hover:(bg-gray-100 shadow-lg transform scale-105)'
          ]
        })
        return {
          passed: result.includes('.grouped') && result.includes('.grouped:hover') && result.includes('transform'),
          output: result,
          expected: 'Should expand grouped utilities into proper CSS'
        }
      }
    },
    {
      name: '@css Directive CSS Generation',
      description: 'Test CSS generation for @css directive',
      test: () => {
        const result = twsx({
          '.custom': [
            'bg-white p-4',
            {
              '@css': {
                'transition': 'all 0.3s ease-in-out',
                'will-change': 'transform, opacity'
              }
            }
          ]
        })
        return {
          passed: result.includes('transition') && result.includes('will-change') && result.includes('.custom'),
          output: result,
          expected: 'Should include custom CSS properties from @css directive'
        }
      }
    },
    {
      name: 'CSS Variables and Functions',
      description: 'Test CSS variables and functions preservation',
      test: () => {
        const result = twsx({
          '.theme': {
            '@css': {
              '--primary-color': '#3b82f6',
              'background': 'var(--primary-color)',
              'transform': 'translateY(calc(-1 * var(--spacing, 10px)))',
              'width': 'clamp(200px, 50vw, 800px)'
            }
          }
        })
        return {
          passed: result.includes('var(--primary-color)') && result.includes('calc(') && result.includes('clamp('),
          output: result,
          expected: 'Should preserve CSS variables and functions correctly'
        }
      }
    },
    {
      name: 'Dark Mode CSS Generation',
      description: 'Test CSS generation for dark mode variants',
      test: () => {
        const result = twsx({
          '.dark-card': [
            'bg-white text-gray-900',
            'dark:bg-gray-900 dark:text-white'
          ]
        })
        return {
          passed: result.includes('.dark') && result.includes('.dark-card'),
          output: result,
          expected: 'Should generate dark mode CSS correctly'
        }
      }
    },
    {
      name: 'Complex Nested Structure CSS',
      description: 'Test CSS generation for deeply nested structures',
      test: () => {
        const result = twsx({
          '.complex': [
            'bg-white p-6 rounded-lg',
            {
              '.header': [
                'border-b border-gray-200 pb-4 mb-4',
                {
                  '.title': 'text-2xl font-bold text-gray-900',
                  '.subtitle': 'text-sm text-gray-500 mt-1'
                }
              ],
              '.body': 'text-gray-700 leading-relaxed',
              '.footer': [
                'border-t border-gray-200 pt-4 mt-4',
                {
                  'button': 'px-4 py-2 rounded-lg',
                  'button.primary': 'bg-blue-500 text-white hover:bg-blue-600'
                }
              ]
            }
          ]
        })
        return {
          passed: result.includes('.complex .header .title') && result.includes('.complex .footer button.primary') && result.includes(':hover'),
          output: result,
          expected: 'Should handle deeply nested selectors and generate proper CSS'
        }
      }
    },
    {
      name: 'CSS Output Structure Validation',
      description: 'Test overall CSS structure and formatting',
      test: () => {
        const result = twsx({
          '.test': [
            'bg-blue-500 text-white p-4',
            {
              '&:hover': 'bg-blue-600',
              '.nested': 'text-sm'
            }
          ]
        })
        const lines = result.split('\n').filter(line => line.trim())
        return {
          passed: result.includes('{') && result.includes('}') && lines.length > 3,
          output: result,
          expected: 'Should generate properly formatted CSS with braces and properties'
        }
      }
    },
    {
      name: 'Multiple Selectors CSS Generation',
      description: 'Test CSS generation for multiple top-level selectors',
      test: () => {
        const result = twsx({
          '.card': 'bg-white p-4 rounded',
          '.button': 'bg-blue-500 text-white px-4 py-2',
          '.input': 'border border-gray-300 p-2 rounded'
        })
        return {
          passed: result.includes('.card') && result.includes('.button') && result.includes('.input'),
          output: result,
          expected: 'Should generate CSS for multiple selectors'
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
    updateResult('twsx', { 
      passed: allPassed, 
      total: results.length,
      passed_count: results.filter(r => r.passed).length
    })
  }, [])

  return (
    <TestContainer
      title="Advanced twsx() CSS Generation Tests"
      description="Comprehensive testing of twsx() CSS string generation including nested styles, responsive variants, pseudo-states, @css directive, and complex CSS structures."
      testResults={testResults}
    />
  )
}

export default TwsxTests