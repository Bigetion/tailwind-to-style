import React, { useState, useEffect } from 'react'
import { tv, createVariants } from 'tailwind-to-style'
import { useTwsx } from 'tailwind-to-style/react'
import TestContainer from '../TestContainer'

function VariantsTests({ updateResult }) {
  const [testResults, setTestResults] = useState([])

  // Add styling for the examples
  useTwsx({
    '.variants-examples': 'mt-8 space-y-6',
    '.examples-container': 'bg-gray-50 p-6 rounded-lg',
    '.examples-title': 'text-lg font-semibold mb-4',
    '.examples-content': 'space-y-4',
    '.section-title': 'font-medium mb-2',
    '.button-grid': 'flex gap-2 flex-wrap',
    '.card-grid': 'grid grid-cols-1 md:grid-cols-3 gap-4',
    '.card-title': 'font-semibold mb-2',
    '.card-text': 'text-sm text-gray-600'
  })

  // Create test variant functions
  const buttonVariants = tv({
    base: 'px-4 py-2 rounded-lg font-medium transition-all',
    variants: {
      intent: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        danger: 'bg-red-500 text-white hover:bg-red-600'
      },
      size: {
        sm: 'text-sm px-3 py-1.5',
        md: 'text-base px-4 py-2',
        lg: 'text-lg px-6 py-3'
      },
      fullWidth: {
        true: 'w-full'
      }
    },
    compoundVariants: [
      {
        intent: 'primary',
        size: 'lg',
        class: 'shadow-lg hover:shadow-xl'
      }
    ],
    defaultVariants: {
      intent: 'primary',
      size: 'md'
    }
  })

  const cardVariants = tv({
    base: 'bg-white rounded-lg shadow-md p-6',
    variants: {
      elevated: {
        true: 'shadow-xl',
        false: 'shadow-sm'
      },
      interactive: {
        true: 'hover:shadow-lg cursor-pointer transition-shadow'
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
      }
    }
  })

  const tests = [
    {
      name: 'Basic tv() Function',
      description: 'Test creating variant function with tv()',
      test: () => {
        const result = buttonVariants()
        return {
          passed: typeof result === 'string' && result.includes('px-4') && result.includes('py-2'),
          output: result,
          expected: 'Should return base classes as string'
        }
      }
    },
    {
      name: 'Single Variant Selection',
      description: 'Test selecting single variant',
      test: () => {
        const result = buttonVariants({ intent: 'danger' })
        return {
          passed: result.includes('bg-red-500') && result.includes('text-white'),
          output: result,
          expected: 'Should include danger variant classes'
        }
      }
    },
    {
      name: 'Multiple Variants',
      description: 'Test combining multiple variants',
      test: () => {
        const result = buttonVariants({ intent: 'primary', size: 'lg', fullWidth: true })
        return {
          passed: result.includes('bg-blue-500') && result.includes('text-lg') && result.includes('w-full'),
          output: result,
          expected: 'Should combine primary, large, and full-width variants'
        }
      }
    },
    {
      name: 'Default Variants',
      description: 'Test default variant application',
      test: () => {
        const result = buttonVariants({})
        return {
          passed: result.includes('bg-blue-500') && result.includes('text-base'),
          output: result,
          expected: 'Should apply default variants (primary intent, md size)'
        }
      }
    },
    {
      name: 'Compound Variants',
      description: 'Test compound variant conditions',
      test: () => {
        const result = buttonVariants({ intent: 'primary', size: 'lg' })
        return {
          passed: result.includes('shadow-lg'),
          output: result,
          expected: 'Should apply compound variant for primary + large combination'
        }
      }
    },
    {
      name: 'Boolean Variants',
      description: 'Test boolean variant handling',
      test: () => {
        const elevatedResult = cardVariants({ elevated: true })
        const notElevatedResult = cardVariants({ elevated: false })
        return {
          passed: elevatedResult.includes('shadow-xl') && notElevatedResult.includes('shadow-sm'),
          output: `Elevated: ${elevatedResult}\nNot Elevated: ${notElevatedResult}`,
          expected: 'Should handle true/false boolean variants correctly'
        }
      }
    },
    {
      name: 'createVariants() Batch Creation',
      description: 'Test creating multiple variant functions at once',
      test: () => {
        const components = createVariants({
          button: {
            base: 'px-4 py-2 rounded font-medium',
            variants: {
              color: {
                primary: 'bg-blue-500 text-white',
                secondary: 'bg-gray-500 text-white'
              }
            }
          },
          badge: {
            base: 'px-2 py-1 text-xs rounded-full font-semibold',
            variants: {
              color: {
                success: 'bg-green-100 text-green-800',
                error: 'bg-red-100 text-red-800'
              }
            }
          }
        })
        
        const buttonResult = components.button({ color: 'primary' })
        const badgeResult = components.badge({ color: 'success' })
        
        return {
          passed: buttonResult.includes('bg-blue-500') && badgeResult.includes('bg-green-100'),
          output: `Button: ${buttonResult}\nBadge: ${badgeResult}`,
          expected: 'Should create multiple variant functions with different configurations'
        }
      }
    },
    {
      name: 'Complex Variant Combinations',
      description: 'Test complex variant combinations and edge cases',
      test: () => {
        const complexVariants = tv({
          base: 'inline-flex items-center justify-center',
          variants: {
            variant: {
              solid: 'bg-blue-500 text-white',
              outline: 'border-2 border-blue-500 text-blue-500 bg-transparent',
              ghost: 'text-blue-500 bg-transparent hover:bg-blue-50'
            },
            size: {
              xs: 'h-6 px-2 text-xs',
              sm: 'h-8 px-3 text-sm',
              md: 'h-10 px-4 text-base',
              lg: 'h-12 px-6 text-lg'
            },
            disabled: {
              true: 'opacity-50 cursor-not-allowed pointer-events-none'
            }
          },
          compoundVariants: [
            {
              variant: 'outline',
              disabled: true,
              class: 'border-gray-300 text-gray-300'
            }
          ]
        })
        
        const result = complexVariants({ variant: 'outline', size: 'lg', disabled: true })
        return {
          passed: result.includes('border-gray-300') && result.includes('text-gray-300') && result.includes('h-12'),
          output: result,
          expected: 'Should handle complex variant combinations with compound variants'
        }
      }
    },
    {
      name: 'Framework Agnostic Usage',
      description: 'Test tv() usage outside React context',
      test: () => {
        // Simulate vanilla JS usage
        const vanillaButton = tv({
          base: 'btn',
          variants: {
            type: {
              primary: 'btn-primary',
              secondary: 'btn-secondary'
            }
          }
        })
        
        const className = vanillaButton({ type: 'primary' })
        
        return {
          passed: className === 'btn btn-primary',
          output: className,
          expected: 'Should work in vanilla JS/framework-agnostic contexts'
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
    updateResult('variants', { 
      passed: allPassed, 
      total: results.length,
      passed_count: results.filter(r => r.passed).length
    })
  }, [])

  return (
    <TestContainer
      title="Type-safe Variants Tests"
      description="Testing the tv() function and createVariants() for framework-agnostic variant systems with type safety and compound variants."
      testResults={testResults}
    >
      <div className="variants-examples">
        <div className="examples-container">
          <h3 className="examples-title">Live Variant Examples</h3>
          
          <div className="examples-content">
            <div>
              <h4 className="section-title">Button Variants (using tv()):</h4>
              <div className="button-grid">
                <button className={buttonVariants()}>Default</button>
                <button className={buttonVariants({ intent: 'secondary' })}>Secondary</button>
                <button className={buttonVariants({ intent: 'danger', size: 'lg' })}>Large Danger</button>
                <button className={buttonVariants({ intent: 'primary', size: 'sm', fullWidth: true })}>
                  Small Full Width
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="section-title">Card Variants:</h4>
              <div className="card-grid">
                <div className={cardVariants()}>
                  <h5 className="card-title">Default Card</h5>
                  <p className="card-text">Basic card styling</p>
                </div>
                <div className={cardVariants({ elevated: true, size: 'lg' })}>
                  <h5 className="card-title">Elevated Large</h5>
                  <p className="card-text">Elevated with large padding</p>
                </div>
                <div className={cardVariants({ interactive: true, size: 'sm' })}>
                  <h5 className="card-title">Interactive Small</h5>
                  <p className="card-text">Hover me! Small padding</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TestContainer>
  )
}

export default VariantsTests