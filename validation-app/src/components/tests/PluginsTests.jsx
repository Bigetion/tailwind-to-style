import React, { useState, useEffect } from 'react'
import { tws, configure, createPlugin, createUtilityPlugin } from 'tailwind-to-style'
import { useTwsx } from 'tailwind-to-style/react'
import TestContainer from '../TestContainer'

function PluginsTests({ updateResult }) {
  const [testResults, setTestResults] = useState([])

  // Add styling for examples
  useTwsx({
    '.plugin-examples': 'mt-8 space-y-6',
    '.examples-container': 'bg-gray-50 p-6 rounded-lg',
    '.examples-title': 'text-lg font-semibold mb-4',
    '.shadow-section-title': 'font-semibold mb-3',
    '.creation-examples': 'bg-purple-50 p-6 rounded-lg',
    '.creation-title': 'text-lg font-semibold mb-4',
    '.creation-content': 'space-y-4 text-sm',
    '.creation-section-title': 'font-medium mb-2',
    '.creation-code': 'bg-white p-3 rounded overflow-x-auto text-xs'
  })

  // Demo component using custom plugins
  const PluginDemo = () => {
    useTwsx({
      '.plugin-demo': 'space-y-6 p-6 bg-white rounded-lg shadow-md',
      '.glass-card': [
        'glass p-6 rounded-lg border',
        {
          '.card-title': 'text-lg font-semibold mb-2',
          '.card-content': 'text-gray-600'
        }
      ],
      '.gradient-text': 'text-gradient text-3xl font-bold text-center mb-4',
      '.shadow-examples': 'grid grid-cols-1 md:grid-cols-3 gap-4',
      '.shadow-card': [
        'p-4 bg-white rounded-lg text-center',
        {
          '&.sm': 'text-shadow-sm',
          '&.md': 'text-shadow-md',
          '&.lg': 'text-shadow-lg',
          '.shadow-card-title': 'font-medium',
          '.shadow-card-desc': 'text-sm text-gray-600'
        }
      ]
    })

    return (
      <div className="plugin-demo">
        <div className="gradient-text">Custom Plugin Effects</div>
        
        <div className="glass-card">
          <div className="card-title">Glassmorphism Effect</div>
          <div className="card-content">
            This card uses a custom glassmorphism plugin with backdrop blur and transparency.
          </div>
        </div>
        
        <div>
          <h4 className="shadow-section-title">Text Shadow Examples:</h4>
          <div className="shadow-examples">
            <div className="shadow-card sm">
              <h5 className="shadow-card-title">Small Shadow</h5>
              <p className="shadow-card-desc">text-shadow-sm</p>
            </div>
            <div className="shadow-card md">
              <h5 className="shadow-card-title">Medium Shadow</h5>
              <p className="shadow-card-desc">text-shadow-md</p>
            </div>
            <div className="shadow-card lg">
              <h5 className="shadow-card-title">Large Shadow</h5>
              <p className="shadow-card-desc">text-shadow-lg</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const tests = [
    {
      name: 'Basic Plugin Creation',
      description: 'Test creating a simple utility plugin',
      test: () => {
        const textGradientPlugin = createPlugin('text-gradient', {
          utilities: {
            '.text-gradient': {
              'background-clip': 'text',
              '-webkit-background-clip': 'text',
              '-webkit-text-fill-color': 'transparent',
              'background-image': 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            },
          },
        })

        configure({
          plugins: [textGradientPlugin],
        })

        const result = tws('text-gradient', 1)
        return {
          passed: result.backgroundClip === 'text' && result.backgroundImage,
          output: JSON.stringify(result, null, 2),
          expected: 'Should create text gradient utility with custom CSS properties'
        }
      }
    },
    {
      name: 'Dynamic Utility Plugin',
      description: 'Test createUtilityPlugin with multiple values',
      test: () => {
        const textShadowPlugin = createUtilityPlugin('text-shadow', {
          prefix: 'text-shadow',
          values: {
            sm: '1px 1px 2px rgba(0,0,0,0.1)',
            md: '2px 2px 4px rgba(0,0,0,0.15)',
            lg: '4px 4px 8px rgba(0,0,0,0.2)',
            xl: '6px 6px 12px rgba(0,0,0,0.25)',
          },
          formatter: (value) => ({
            'text-shadow': value,
          }),
        })

        configure({
          plugins: [textShadowPlugin],
        })

        const smResult = tws('text-shadow-sm', 1)
        const lgResult = tws('text-shadow-lg', 1)
        
        return {
          passed: smResult.textShadow && lgResult.textShadow && 
                 smResult.textShadow.includes('1px') && lgResult.textShadow.includes('4px'),
          output: `Small: ${smResult.textShadow}\nLarge: ${lgResult.textShadow}`,
          expected: 'Should create multiple text-shadow utilities with different values'
        }
      }
    },
    {
      name: 'Glassmorphism Plugin',
      description: 'Test complex glassmorphism effect plugin',
      test: () => {
        const glassmorphismPlugin = createPlugin('glassmorphism', {
          utilities: {
            '.glass': {
              'backdrop-filter': 'blur(10px)',
              '-webkit-backdrop-filter': 'blur(10px)',
              'background-color': 'rgba(255, 255, 255, 0.1)',
              'border': '1px solid rgba(255, 255, 255, 0.2)',
            },
            '.glass-dark': {
              'backdrop-filter': 'blur(10px)',
              '-webkit-backdrop-filter': 'blur(10px)',
              'background-color': 'rgba(0, 0, 0, 0.1)',
              'border': '1px solid rgba(255, 255, 255, 0.1)',
            },
          },
        })

        configure({
          plugins: [glassmorphismPlugin],
        })

        const glassResult = tws('glass', 1)
        const glassDarkResult = tws('glass-dark', 1)
        
        return {
          passed: glassResult.backdropFilter && glassDarkResult.backdropFilter &&
                 glassResult.backgroundColor && glassDarkResult.backgroundColor,
          output: `Glass: backdrop-filter: ${glassResult.backdropFilter}\nGlass Dark: backdrop-filter: ${glassDarkResult.backdropFilter}`,
          expected: 'Should create glassmorphism effects with backdrop filters'
        }
      }
    },
    {
      name: 'Multiple Plugins Configuration',
      description: 'Test configuring multiple plugins at once',
      test: () => {
        const plugin1 = createPlugin('custom-1', {
          utilities: {
            '.custom-utility-1': {
              'custom-property-1': 'value-1',
            },
          },
        })

        const plugin2 = createUtilityPlugin('custom-2', {
          prefix: 'custom',
          values: {
            a: 'value-a',
            b: 'value-b',
          },
          formatter: (value) => ({
            'custom-property-2': value,
          }),
        })

        configure({
          plugins: [plugin1, plugin2],
        })

        const result1 = tws('custom-utility-1', 1)
        const result2 = tws('custom-a', 1)
        
        return {
          passed: result1.customProperty1 === 'value-1' && result2.customProperty2 === 'value-a',
          output: `Plugin 1: ${JSON.stringify(result1)}\nPlugin 2: ${JSON.stringify(result2)}`,
          expected: 'Should register and use multiple plugins simultaneously'
        }
      }
    },
    {
      name: 'Plugin with Responsive Support',
      description: 'Test plugin utilities with responsive variants',
      test: () => {
        const responsivePlugin = createUtilityPlugin('custom-spacing', {
          prefix: 'gap',
          values: {
            'custom-sm': '0.75rem',
            'custom-lg': '2rem',
          },
          formatter: (value) => ({
            'gap': value,
          }),
        })

        configure({
          plugins: [responsivePlugin],
        })

        const result = tws('gap-custom-sm md:gap-custom-lg')
        
        return {
          passed: result.includes('gap') && result.includes('@media'),
          output: result,
          expected: 'Should support responsive variants for custom plugin utilities'
        }
      }
    },
    {
      name: 'Plugin with Hover States',
      description: 'Test plugin utilities with pseudo-state variants',
      test: () => {
        const hoverPlugin = createPlugin('hover-effects', {
          utilities: {
            '.hover-glow': {
              'transition': 'box-shadow 0.3s ease',
            },
          },
        })

        configure({
          plugins: [hoverPlugin],
        })

        const result = tws('hover-glow hover:shadow-lg')
        
        return {
          passed: result.includes('transition') && result.includes(':hover'),
          output: result,
          expected: 'Should support hover states for custom plugin utilities'
        }
      }
    },
    {
      name: 'Complex Plugin with Nested Utilities',
      description: 'Test plugin with multiple related utilities',
      test: () => {
        const cardPlugin = createPlugin('card-system', {
          utilities: {
            '.card-base': {
              'background-color': 'white',
              'border-radius': '0.5rem',
              'box-shadow': '0 1px 3px rgba(0,0,0,0.1)',
              'padding': '1rem',
            },
            '.card-elevated': {
              'box-shadow': '0 10px 25px rgba(0,0,0,0.15)',
              'transform': 'translateY(-2px)',
            },
            '.card-interactive': {
              'cursor': 'pointer',
              'transition': 'all 0.2s ease',
            },
          },
        })

        configure({
          plugins: [cardPlugin],
        })

        const baseResult = tws('card-base', 1)
        const elevatedResult = tws('card-elevated', 1)
        const interactiveResult = tws('card-interactive', 1)
        
        return {
          passed: baseResult.backgroundColor && elevatedResult.transform && interactiveResult.cursor,
          output: `Base: ${baseResult.backgroundColor}\nElevated: ${elevatedResult.transform}\nInteractive: ${interactiveResult.cursor}`,
          expected: 'Should create a system of related utilities'
        }
      }
    },
    {
      name: 'Plugin Error Handling',
      description: 'Test plugin error handling and validation',
      test: () => {
        try {
          // Test with invalid plugin structure
          const invalidPlugin = createPlugin('invalid', {
            // Missing utilities property
          })

          configure({
            plugins: [invalidPlugin],
          })

          // Should not throw error, but plugin should be ignored
          const result = tws('invalid-class', 1)
          
          return {
            passed: true, // If we get here, error handling worked
            output: 'Plugin error handled gracefully',
            expected: 'Should handle invalid plugins without crashing'
          }
        } catch (error) {
          return {
            passed: false,
            output: error.message,
            expected: 'Should handle plugin errors gracefully'
          }
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
    updateResult('plugins', { 
      passed: allPassed, 
      total: results.length,
      passed_count: results.filter(r => r.passed).length
    })
  }, [])

  return (
    <TestContainer
      title="Custom Plugins Tests"
      description="Testing the plugin API including createPlugin(), createUtilityPlugin(), complex plugin systems, and plugin integration with responsive and pseudo-state variants."
      testResults={testResults}
    >
      <div className="plugin-examples">
        <div className="examples-container">
          <h3 className="examples-title">Live Plugin Examples</h3>
          <PluginDemo />
        </div>
        
        <div className="creation-examples">
          <h3 className="creation-title">Plugin Creation Examples</h3>
          <div className="creation-content">
            <div>
              <h4 className="creation-section-title">Simple Plugin:</h4>
              <pre className="creation-code">
{`const textGradientPlugin = createPlugin('text-gradient', {
  utilities: {
    '.text-gradient': {
      'background-clip': 'text',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      'background-image': 'linear-gradient(to right, #3b82f6, #8b5cf6)',
    },
  },
})`}
              </pre>
            </div>
            <div>
              <h4 className="creation-section-title">Dynamic Utility Plugin:</h4>
              <pre className="creation-code">
{`const textShadowPlugin = createUtilityPlugin('text-shadow', {
  prefix: 'text-shadow',
  values: {
    sm: '1px 1px 2px rgba(0,0,0,0.1)',
    md: '2px 2px 4px rgba(0,0,0,0.15)',
    lg: '4px 4px 8px rgba(0,0,0,0.2)',
  },
  formatter: (value) => ({ 'text-shadow': value }),
})`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </TestContainer>
  )
}

export default PluginsTests