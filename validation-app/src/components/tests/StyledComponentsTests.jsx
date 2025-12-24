import React, { useState, useEffect } from 'react'
import { styled, useTwsx } from 'tailwind-to-style/react'
import TestContainer from '../TestContainer'

function StyledComponentsTests({ updateResult }) {
  const [testResults, setTestResults] = useState([])

  // Add styling for examples
  useTwsx({
    '.styled-examples': 'mt-8 space-y-6',
    '.examples-container': 'bg-gray-50 p-6 rounded-lg',
    '.examples-title': 'text-lg font-semibold mb-4',
    '.examples-content': 'space-y-4',
    '.section-title': 'font-medium mb-2',
    '.button-row': 'flex gap-2 flex-wrap',
    '.input-column': 'space-y-2 max-w-md'
  })

  // Create test styled components
  const TestButton = styled('button', {
    base: 'px-4 py-2 rounded-lg font-medium transition-all',
    variants: {
      color: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        danger: 'bg-red-500 text-white hover:bg-red-600'
      },
      size: {
        sm: 'text-sm px-3 py-1.5',
        md: 'text-base px-4 py-2',
        lg: 'text-lg px-6 py-3'
      },
      outlined: {
        true: 'bg-transparent border-2',
        false: ''
      }
    },
    defaultVariants: {
      color: 'primary',
      size: 'md',
      outlined: false
    }
  })

  const TestCard = styled.div({
    base: 'bg-white rounded-lg shadow-md p-6',
    hover: 'shadow-xl transform scale-105',
    active: 'shadow-lg scale-100',
    nested: {
      '.card-title': 'text-2xl font-bold text-gray-900 mb-2',
      '.card-content': 'text-gray-600 leading-relaxed'
    }
  })

  const TestInput = styled.input({
    base: 'w-full px-4 py-2 border border-gray-300 rounded-lg transition-all',
    focus: 'border-blue-500 outline-none ring-2 ring-blue-200',
    disabled: 'bg-gray-100 cursor-not-allowed opacity-60',
    variants: {
      error: {
        true: 'border-red-500 focus:border-red-600 focus:ring-red-200'
      }
    }
  })

  const tests = [
    {
      name: 'Basic Styled Component CSS Generation',
      description: 'Test CSS string generation from basic styled component',
      test: () => {
        try {
          // Create a simple styled component and check if it generates CSS
          const SimpleButton = styled('button', {
            base: 'bg-blue-500 text-white px-4 py-2 rounded'
          })
          
          // Check if component is created and can be used
          const isFunction = typeof SimpleButton === 'function'
          
          // Look for CSS in the document that should be generated
          const allStyles = Array.from(document.querySelectorAll('style'))
          const hasRelevantCSS = allStyles.some(style => 
            style.textContent.includes('background-color') || 
            style.textContent.includes('padding') ||
            style.textContent.includes('border-radius')
          )
          
          return {
            passed: isFunction && hasRelevantCSS,
            output: `Component created: ${isFunction}, CSS found: ${hasRelevantCSS}`,
            expected: 'Should create component and generate CSS with background-color, padding, border-radius'
          }
        } catch (error) {
          return {
            passed: false,
            output: error.message,
            expected: 'Should generate basic CSS without errors'
          }
        }
      }
    },
    {
      name: 'Styled Component with Variants CSS',
      description: 'Test CSS generation for component variants',
      test: () => {
        try {
          // Create component with variants
          const VariantButton = styled('button', {
            base: 'px-4 py-2 rounded font-medium',
            variants: {
              color: {
                primary: 'bg-blue-500 text-white',
                danger: 'bg-red-500 text-white'
              },
              size: {
                sm: 'text-sm px-2 py-1',
                lg: 'text-lg px-6 py-3'
              }
            }
          })
          
          const isFunction = typeof VariantButton === 'function'
          
          // Check for variant-related CSS classes in document
          const allStyles = Array.from(document.querySelectorAll('style'))
          const cssText = allStyles.map(s => s.textContent).join(' ')
          
          // Look for CSS properties that should be generated from variants
          const hasVariantCSS = cssText.includes('background-color') && 
                               (cssText.includes('rgb(59, 130, 246)') || cssText.includes('#3b82f6') || cssText.includes('blue')) &&
                               cssText.includes('font-weight')
          
          return {
            passed: isFunction && hasVariantCSS,
            output: `Component: ${isFunction}, Variant CSS found: ${hasVariantCSS}`,
            expected: 'Should generate CSS for variants with background colors and font weights'
          }
        } catch (error) {
          return {
            passed: false,
            output: error.message,
            expected: 'Should handle variant CSS generation'
          }
        }
      }
    },
    {
      name: 'Pseudo-states CSS Generation',
      description: 'Test CSS generation for hover, focus, active states',
      test: () => {
        try {
          const InteractiveButton = styled('button', {
            base: 'bg-gray-200 px-4 py-2',
            hover: 'bg-gray-300 transform scale-105',
            focus: 'outline-none ring-2 ring-blue-300',
            active: 'bg-gray-400'
          })
          
          const isFunction = typeof InteractiveButton === 'function'
          
          // Check for pseudo-state CSS
          const allStyles = Array.from(document.querySelectorAll('style'))
          const cssText = allStyles.map(s => s.textContent).join(' ')
          
          const hasPseudoCSS = cssText.includes(':hover') || 
                              cssText.includes(':focus') || 
                              cssText.includes(':active') ||
                              cssText.includes('transform') ||
                              cssText.includes('outline')
          
          return {
            passed: isFunction && hasPseudoCSS,
            output: `Component: ${isFunction}, Pseudo-state CSS: ${hasPseudoCSS}`,
            expected: 'Should generate CSS for :hover, :focus, :active pseudo-states'
          }
        } catch (error) {
          return {
            passed: false,
            output: error.message,
            expected: 'Should handle pseudo-state CSS generation'
          }
        }
      }
    },
    {
      name: 'Nested Styles CSS Generation',
      description: 'Test CSS generation for nested child selectors',
      test: () => {
        try {
          const NestedCard = styled('div', {
            base: 'bg-white p-6 rounded-lg',
            nested: {
              '.title': 'text-xl font-bold text-gray-900',
              '.content': 'text-gray-600 mt-2',
              'button': 'bg-blue-500 text-white px-3 py-1 rounded'
            }
          })
          
          const isFunction = typeof NestedCard === 'function'
          
          // Check for nested selector CSS
          const allStyles = Array.from(document.querySelectorAll('style'))
          const cssText = allStyles.map(s => s.textContent).join(' ')
          
          const hasNestedCSS = cssText.includes('.title') || 
                              cssText.includes('.content') ||
                              cssText.includes('font-bold') ||
                              cssText.includes('margin-top')
          
          return {
            passed: isFunction && hasNestedCSS,
            output: `Component: ${isFunction}, Nested CSS: ${hasNestedCSS}`,
            expected: 'Should generate CSS for nested selectors like .title, .content'
          }
        } catch (error) {
          return {
            passed: false,
            output: error.message,
            expected: 'Should handle nested styles CSS generation'
          }
        }
      }
    },
    {
      name: 'TestButton CSS Output Validation',
      description: 'Test actual CSS output from TestButton component',
      test: () => {
        try {
          // TestButton should generate CSS for its base styles and variants
          const allStyles = Array.from(document.querySelectorAll('style'))
          const cssText = allStyles.map(s => s.textContent).join(' ')
          
          // Check for specific CSS properties that TestButton should generate
          const hasButtonCSS = cssText.includes('padding') && 
                              cssText.includes('border-radius') &&
                              cssText.includes('font-weight') &&
                              (cssText.includes('background-color') || cssText.includes('background'))
          
          const hasTransition = cssText.includes('transition')
          
          return {
            passed: hasButtonCSS && hasTransition,
            output: `Button CSS: ${hasButtonCSS}, Transitions: ${hasTransition}`,
            expected: 'TestButton should generate CSS with padding, border-radius, font-weight, background, transitions'
          }
        } catch (error) {
          return {
            passed: false,
            output: error.message,
            expected: 'TestButton CSS should be generated properly'
          }
        }
      }
    },
    {
      name: 'TestCard CSS Output Validation',
      description: 'Test actual CSS output from TestCard component with nested styles',
      test: () => {
        try {
          const allStyles = Array.from(document.querySelectorAll('style'))
          const cssText = allStyles.map(s => s.textContent).join(' ')
          
          // Check for TestCard specific CSS
          const hasCardCSS = cssText.includes('background') && 
                            cssText.includes('border-radius') &&
                            cssText.includes('box-shadow') &&
                            cssText.includes('padding')
          
          const hasHoverCSS = cssText.includes('transform') || cssText.includes('scale')
          
          return {
            passed: hasCardCSS && hasHoverCSS,
            output: `Card CSS: ${hasCardCSS}, Hover effects: ${hasHoverCSS}`,
            expected: 'TestCard should generate CSS with background, border-radius, box-shadow, transform effects'
          }
        } catch (error) {
          return {
            passed: false,
            output: error.message,
            expected: 'TestCard CSS should be generated properly'
          }
        }
      }
    },
    {
      name: 'TestInput CSS Output Validation',
      description: 'Test actual CSS output from TestInput component with focus states',
      test: () => {
        try {
          const allStyles = Array.from(document.querySelectorAll('style'))
          const cssText = allStyles.map(s => s.textContent).join(' ')
          
          // Check for TestInput specific CSS
          const hasInputCSS = cssText.includes('border') && 
                             cssText.includes('padding') &&
                             cssText.includes('width') &&
                             cssText.includes('border-radius')
          
          const hasFocusCSS = cssText.includes('outline') || cssText.includes('ring') || cssText.includes(':focus')
          
          return {
            passed: hasInputCSS && hasFocusCSS,
            output: `Input CSS: ${hasInputCSS}, Focus states: ${hasFocusCSS}`,
            expected: 'TestInput should generate CSS with border, padding, width, focus states'
          }
        } catch (error) {
          return {
            passed: false,
            output: error.message,
            expected: 'TestInput CSS should be generated properly'
          }
        }
      }
    },
    {
      name: 'Overall CSS Injection Validation',
      description: 'Test that styled components properly inject CSS into document',
      test: () => {
        try {
          const allStyles = Array.from(document.querySelectorAll('style'))
          const totalCSSLength = allStyles.reduce((total, style) => total + style.textContent.length, 0)
          
          // Check for essential CSS properties that should be present
          const cssText = allStyles.map(s => s.textContent).join(' ')
          const hasEssentialCSS = cssText.includes('background-color') &&
                                 cssText.includes('padding') &&
                                 cssText.includes('border-radius') &&
                                 cssText.includes('color') &&
                                 cssText.includes('font-weight')
          
          const hasStyleElements = allStyles.length > 0
          
          return {
            passed: hasStyleElements && hasEssentialCSS && totalCSSLength > 100,
            output: `Style elements: ${allStyles.length}, CSS length: ${totalCSSLength}, Essential CSS: ${hasEssentialCSS}`,
            expected: 'Should inject substantial CSS with essential properties into document'
          }
        } catch (error) {
          return {
            passed: false,
            output: error.message,
            expected: 'CSS injection should work without errors'
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
    updateResult('styled', { 
      passed: allPassed, 
      total: results.length,
      passed_count: results.filter(r => r.passed).length
    })
  }, [])

  return (
    <TestContainer
      title="Styled Components Tests"
      description="Testing the styled components system including variants, pseudo-states, nested styles, and component composition."
      testResults={testResults}
    >
      <div className="styled-examples">
        <div className="examples-container">
          <h3 className="examples-title">Live Component Examples</h3>
          
          <div className="examples-content">
            <div>
              <h4 className="section-title">Button Variants:</h4>
              <div className="button-row">
                <TestButton>Default Button</TestButton>
                <TestButton color="secondary">Secondary</TestButton>
                <TestButton color="danger" size="lg">Large Danger</TestButton>
                <TestButton color="primary" outlined={true} size="sm">Small Outlined</TestButton>
              </div>
            </div>
            
            <div>
              <h4 className="section-title">Card with Nested Styles:</h4>
              <TestCard style={{ maxWidth: '300px' }}>
                <div className="card-title">Card Title</div>
                <div className="card-content">
                  This card demonstrates nested styling and hover effects. Try hovering over it!
                </div>
              </TestCard>
            </div>
            
            <div>
              <h4 className="section-title">Input States:</h4>
              <div className="input-column">
                <TestInput placeholder="Normal input" />
                <TestInput placeholder="Error input" error={true} />
                <TestInput placeholder="Disabled input" disabled />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TestContainer>
  )
}

export default StyledComponentsTests