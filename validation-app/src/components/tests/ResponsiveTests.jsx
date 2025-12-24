import React, { useState, useEffect } from 'react'
import { tws, twsx } from 'tailwind-to-style'
import { useTwsx } from 'tailwind-to-style/react'
import TestContainer from '../TestContainer'

function ResponsiveTests({ updateResult }) {
  const [testResults, setTestResults] = useState([])

  // Add styling for examples
  useTwsx({
    '.responsive-examples': 'mt-8 space-y-6',
    '.examples-container': 'bg-gray-50 p-6 rounded-lg',
    '.examples-title': 'text-lg font-semibold mb-4',
    '.examples-content': 'space-y-6',
    '.section-title': 'font-medium mb-2',
    '.section-description': 'text-sm text-gray-600 mb-4',
    '.responsive-grid': 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4',
    '.grid-item': 'bg-blue-100 p-4 rounded text-center text-sm font-medium',
    '.grid-description': 'text-xs text-gray-500 mt-2',
    '.text-examples': 'space-y-2',
    '.responsive-text': 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium',
    '.text-description': 'text-xs text-gray-500',
    '.spacing-container': 'bg-gradient-to-r from-blue-100 to-purple-100 p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 rounded-lg',
    '.spacing-inner': 'bg-white p-4 rounded shadow-sm',
    '.spacing-title': 'text-sm font-medium',
    '.spacing-description': 'text-xs text-gray-500 mt-1',
    '.breakpoint-reference': 'bg-blue-50 p-6 rounded-lg',
    '.breakpoint-title': 'text-lg font-semibold mb-4',
    '.breakpoint-grid': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-sm',
    '.breakpoint-card': 'bg-white p-3 rounded',
    '.breakpoint-name': 'font-medium text-gray-900',
    '.breakpoint-size': 'text-gray-600',
    '.breakpoint-desc': 'text-xs text-gray-500'
  })

  // Demo responsive component
  const ResponsiveDemo = () => {
    useTwsx({
      '.responsive-demo': [
        'bg-white p-4 rounded-lg shadow-md transition-all duration-300',
        'sm:p-6 sm:bg-blue-50',
        'md:p-8 md:bg-green-50',
        'lg:p-10 lg:bg-purple-50',
        'xl:p-12 xl:bg-pink-50',
        {
          '.demo-title': [
            'text-lg font-bold text-gray-900',
            'sm:text-xl sm:text-blue-900',
            'md:text-2xl md:text-green-900',
            'lg:text-3xl lg:text-purple-900',
            'xl:text-4xl xl:text-pink-900'
          ],
          '.demo-text': [
            'text-sm text-gray-600 mt-2',
            'sm:text-base',
            'md:text-lg',
            'lg:text-xl'
          ]
        }
      ]
    })

    return (
      <div className="responsive-demo">
        <h3 className="demo-title">Responsive Demo</h3>
        <p className="demo-text">
          This component changes colors and sizes at different breakpoints. 
          Resize your browser to see the effects!
        </p>
      </div>
    )
  }

  const tests = [
    {
      name: 'Basic Responsive Classes (tws)',
      description: 'Test basic responsive utilities with tws()',
      test: () => {
        const result = tws('text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl')
        return {
          passed: result.includes('@media') && result.includes('min-width'),
          output: result,
          expected: 'Should generate media queries for responsive text sizes'
        }
      }
    },
    {
      name: 'Responsive Layout (tws)',
      description: 'Test responsive layout utilities',
      test: () => {
        const result = tws('w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5')
        return {
          passed: result.includes('@media') && result.includes('width'),
          output: result,
          expected: 'Should generate responsive width utilities'
        }
      }
    },
    {
      name: 'Responsive Padding/Margin',
      description: 'Test responsive spacing utilities',
      test: () => {
        const result = tws('p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10')
        return {
          passed: result.includes('@media') && result.includes('padding'),
          output: result,
          expected: 'Should generate responsive padding utilities'
        }
      }
    },
    {
      name: 'Responsive Grid (tws)',
      description: 'Test responsive grid utilities',
      test: () => {
        const result = tws('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6')
        return {
          passed: result.includes('grid-template-columns') && result.includes('@media'),
          output: result,
          expected: 'Should generate responsive grid column utilities'
        }
      }
    },
    {
      name: 'Responsive with twsx()',
      description: 'Test responsive utilities in twsx() nested styles',
      test: () => {
        const result = twsx({
          '.responsive-card': [
            'bg-white p-4 rounded-lg',
            'sm:p-6 sm:bg-blue-50',
            'md:p-8 md:bg-green-50',
            'lg:p-10 lg:bg-purple-50',
            {
              '.title': [
                'text-lg font-bold',
                'sm:text-xl',
                'md:text-2xl',
                'lg:text-3xl'
              ]
            }
          ]
        })
        return {
          passed: result.includes('@media') && result.includes('.responsive-card .title'),
          output: result,
          expected: 'Should generate responsive styles for nested selectors'
        }
      }
    },
    {
      name: 'Responsive Selector Syntax',
      description: 'Test new responsive selector syntax (md:.title)',
      test: () => {
        const result = twsx({
          '.title': 'text-base font-medium',
          'sm:.title': 'text-lg',
          'md:.title': 'text-xl font-bold',
          'lg:.title': 'text-2xl',
          'xl:.title': 'text-3xl'
        })
        return {
          passed: result.includes('@media') && result.includes('768px') && result.includes('1024px'),
          output: result,
          expected: 'Should convert responsive selectors to proper media queries'
        }
      }
    },
    {
      name: 'Responsive Grouping',
      description: 'Test responsive grouping syntax',
      test: () => {
        const result = twsx({
          '.grouped-responsive': [
            'bg-white p-4',
            'sm:(p-6 bg-blue-50 text-blue-900)',
            'md:(p-8 bg-green-50 text-green-900)',
            'lg:(p-10 bg-purple-50 text-purple-900)'
          ]
        })
        return {
          passed: result.includes('@media') && result.includes('background-color') && result.includes('color'),
          output: result,
          expected: 'Should expand grouped responsive utilities correctly'
        }
      }
    },
    {
      name: 'Responsive Breakpoint Values',
      description: 'Test all standard Tailwind breakpoints',
      test: () => {
        const result = tws('hidden sm:block md:inline-block lg:flex xl:inline-flex 2xl:grid')
        const breakpoints = ['640px', '768px', '1024px', '1280px', '1536px']
        const hasAllBreakpoints = breakpoints.every(bp => result.includes(bp))
        return {
          passed: hasAllBreakpoints,
          output: result,
          expected: 'Should include all standard breakpoints (sm, md, lg, xl, 2xl)'
        }
      }
    },
    {
      name: 'Responsive Hover States',
      description: 'Test responsive hover combinations',
      test: () => {
        const result = twsx({
          '.responsive-hover': [
            'bg-blue-500 text-white p-4',
            'hover:bg-blue-600',
            'sm:hover:bg-green-600',
            'md:hover:bg-purple-600',
            'lg:hover:bg-red-600'
          ]
        })
        return {
          passed: result.includes(':hover') && result.includes('@media'),
          output: result,
          expected: 'Should combine responsive and hover states correctly'
        }
      }
    },
    {
      name: 'Complex Responsive Layout',
      description: 'Test complex responsive layout combinations',
      test: () => {
        const result = twsx({
          '.complex-layout': [
            // Mobile first
            'flex flex-col space-y-4 p-4',
            // Tablet
            'sm:flex-row sm:space-y-0 sm:space-x-4 sm:p-6',
            // Desktop
            'lg:grid lg:grid-cols-3 lg:gap-6 lg:space-x-0 lg:p-8',
            // Large desktop
            'xl:grid-cols-4 xl:gap-8 xl:p-12'
          ]
        })
        return {
          passed: result.includes('flex-direction') && result.includes('grid-template-columns') && result.includes('@media'),
          output: result,
          expected: 'Should handle complex responsive layout changes'
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
    updateResult('responsive', { 
      passed: allPassed, 
      total: results.length,
      passed_count: results.filter(r => r.passed).length
    })
  }, [])

  return (
    <TestContainer
      title="Responsive Design Tests"
      description="Testing responsive utilities, breakpoints, responsive selector syntax, and complex responsive layouts across all device sizes."
      testResults={testResults}
    >
      <div className="responsive-examples">
        <div className="examples-container">
          <h3 className="examples-title">Live Responsive Examples</h3>
          
          <div className="examples-content">
            <div>
              <h4 className="section-title">Responsive Demo Component:</h4>
              <p className="section-description">
                This component changes background colors and text sizes at different breakpoints. 
                Resize your browser window to see the responsive behavior!
              </p>
              <ResponsiveDemo />
            </div>
            
            <div>
              <h4 className="section-title">Responsive Grid Layout:</h4>
              <div className="responsive-grid">
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <div key={num} className="grid-item">
                    Item {num}
                  </div>
                ))}
              </div>
              <p className="grid-description">
                Grid changes from 1 column (mobile) → 2 (sm) → 3 (md) → 4 (lg) → 6 (xl) columns
              </p>
            </div>
            
            <div>
              <h4 className="section-title">Responsive Text Sizes:</h4>
              <div className="text-examples">
                <p className="responsive-text">
                  This text grows larger on bigger screens
                </p>
                <p className="text-description">
                  text-sm → sm:text-base → md:text-lg → lg:text-xl → xl:text-2xl
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="section-title">Responsive Spacing:</h4>
              <div className="spacing-container">
                <div className="spacing-inner">
                  <p className="spacing-title">Container with responsive padding</p>
                  <p className="spacing-description">
                    p-2 → sm:p-4 → md:p-6 → lg:p-8 → xl:p-12
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="breakpoint-reference">
          <h3 className="breakpoint-title">Breakpoint Reference</h3>
          <div className="breakpoint-grid">
            <div className="breakpoint-card">
              <div className="breakpoint-name">Default</div>
              <div className="breakpoint-size">0px+</div>
              <div className="breakpoint-desc">Mobile first</div>
            </div>
            <div className="breakpoint-card">
              <div className="breakpoint-name">sm:</div>
              <div className="breakpoint-size">640px+</div>
              <div className="breakpoint-desc">Small tablets</div>
            </div>
            <div className="breakpoint-card">
              <div className="breakpoint-name">md:</div>
              <div className="breakpoint-size">768px+</div>
              <div className="breakpoint-desc">Tablets</div>
            </div>
            <div className="breakpoint-card">
              <div className="breakpoint-name">lg:</div>
              <div className="breakpoint-size">1024px+</div>
              <div className="breakpoint-desc">Laptops</div>
            </div>
            <div className="breakpoint-card">
              <div className="breakpoint-name">xl:</div>
              <div className="breakpoint-size">1280px+</div>
              <div className="breakpoint-desc">Desktops</div>
            </div>
          </div>
        </div>
      </div>
    </TestContainer>
  )
}

export default ResponsiveTests