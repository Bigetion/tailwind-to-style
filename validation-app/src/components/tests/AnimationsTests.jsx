import React, { useState, useEffect } from 'react'
import { tws, twsx, configure } from 'tailwind-to-style'
import { useTwsx } from 'tailwind-to-style/react'
import TestContainer from '../TestContainer'

function AnimationsTests({ updateResult }) {
  const [testResults, setTestResults] = useState([])

  // Configure custom animations for testing
  useEffect(() => {
    configure({
      theme: {
        extend: {
          animation: {
            'fade-in': 'fadeIn 1s ease-in forwards',
            'slide-up': 'slideUp 0.5s ease-out',
            'wiggle': 'wiggle 1s ease-in-out infinite',
            'bounce-slow': 'bounce 2s infinite',
          },
          keyframes: {
            fadeIn: {
              '0%': { opacity: '0' },
              '100%': { opacity: '1' },
            },
            slideUp: {
              '0%': { transform: 'translateY(100%)' },
              '100%': { transform: 'translateY(0)' },
            },
            wiggle: {
              '0%, 100%': { transform: 'rotate(-3deg)' },
              '50%': { transform: 'rotate(3deg)' },
            },
          },
        },
      },
    })
  }, [])

  // Add styling for examples
  useTwsx({
    '.animation-examples': 'mt-8 space-y-6',
    '.examples-container': 'bg-gray-50 p-6 rounded-lg',
    '.examples-title': 'text-lg font-semibold mb-4',
    '.transition-examples': 'bg-blue-50 p-6 rounded-lg',
    '.transition-title': 'text-lg font-semibold mb-4',
    '.transition-grid': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
    '.transition-card': [
      'bg-white p-4 rounded-lg cursor-pointer',
      {
        '&.fast': 'transition-all duration-150 hover:bg-blue-100 hover:scale-105',
        '&.medium': 'transition-all duration-300 ease-in-out hover:bg-green-100 hover:shadow-lg',
        '&.slow': 'transition-all duration-700 ease-out hover:bg-purple-100 hover:transform hover:rotate-3',
        '.card-title': 'font-medium',
        '.card-desc': 'text-sm text-gray-600'
      }
    ],
    '.reference-section': 'bg-green-50 p-6 rounded-lg',
    '.reference-title': 'text-lg font-semibold mb-4',
    '.reference-grid': 'grid grid-cols-1 md:grid-cols-2 gap-4 text-sm',
    '.reference-column-title': 'font-medium mb-2',
    '.reference-list': 'space-y-1 text-gray-700',
    '.reference-code': 'bg-white px-2 py-1 rounded'
  })

  // Demo animation component
  const AnimationDemo = () => {
    const [isVisible, setIsVisible] = useState(true)

    useTwsx({
      '.animation-demo': 'space-y-4 p-6 bg-white rounded-lg shadow-md',
      '.demo-item': [
        'p-4 bg-gray-100 rounded-lg text-center font-medium transition-all duration-300',
        {
          '&:hover': 'bg-gray-200 transform scale-105',
          '.demo-text': 'mt-2 text-sm'
        }
      ],
      '.spin-demo': 'animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto',
      '.ping-demo': 'animate-ping w-4 h-4 bg-blue-500 rounded-full mx-auto',
      '.pulse-demo': 'animate-pulse w-16 h-4 bg-gray-300 rounded mx-auto',
      '.bounce-demo': 'animate-bounce w-8 h-8 bg-red-500 rounded-full mx-auto',
      '.fade-demo': 'animate-fade-in p-4 bg-green-100 rounded text-center',
      '.wiggle-demo': 'animate-wiggle w-8 h-8 bg-purple-500 rounded mx-auto cursor-pointer',
      '.hide-button': 'mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600',
      '.show-button': 'w-full p-4 bg-green-500 text-white rounded hover:bg-green-600'
    })

    return (
      <div className="animation-demo">
        <div className="demo-item">
          <div className="spin-demo"></div>
          <p className="demo-text">Spin Animation</p>
        </div>
        <div className="demo-item">
          <div className="ping-demo"></div>
          <p className="demo-text">Ping Animation</p>
        </div>
        <div className="demo-item">
          <div className="pulse-demo"></div>
          <p className="demo-text">Pulse Animation</p>
        </div>
        <div className="demo-item">
          <div className="bounce-demo"></div>
          <p className="demo-text">Bounce Animation</p>
        </div>
        <div className="demo-item">
          <div className="wiggle-demo"></div>
          <p className="demo-text">Custom Wiggle (hover me!)</p>
        </div>
        {isVisible && (
          <div className="fade-demo">
            <p>Custom Fade In Animation</p>
            <button 
              onClick={() => setIsVisible(false)}
              className="hide-button"
            >
              Hide
            </button>
          </div>
        )}
        {!isVisible && (
          <button 
            onClick={() => setIsVisible(true)}
            className="show-button"
          >
            Show Fade In Demo
          </button>
        )}
      </div>
    )
  }

  const tests = [
    {
      name: 'Built-in Spin Animation',
      description: 'Test animate-spin utility',
      test: () => {
        const result = tws('animate-spin', 1)
        return {
          passed: result.animation && result.animation.includes('spin') && result.animation.includes('linear'),
          output: JSON.stringify(result, null, 2),
          expected: 'Should generate spin animation with linear timing'
        }
      }
    },
    {
      name: 'Built-in Ping Animation',
      description: 'Test animate-ping utility',
      test: () => {
        const result = tws('animate-ping', 1)
        return {
          passed: result.animation && result.animation.includes('ping') && result.animation.includes('cubic-bezier'),
          output: JSON.stringify(result, null, 2),
          expected: 'Should generate ping animation with cubic-bezier timing'
        }
      }
    },
    {
      name: 'Built-in Pulse Animation',
      description: 'Test animate-pulse utility',
      test: () => {
        const result = tws('animate-pulse', 1)
        return {
          passed: result.animation && result.animation.includes('pulse'),
          output: JSON.stringify(result, null, 2),
          expected: 'Should generate pulse animation'
        }
      }
    },
    {
      name: 'Built-in Bounce Animation',
      description: 'Test animate-bounce utility',
      test: () => {
        const result = tws('animate-bounce', 1)
        return {
          passed: result.animation && result.animation.includes('bounce'),
          output: JSON.stringify(result, null, 2),
          expected: 'Should generate bounce animation'
        }
      }
    },
    {
      name: 'Animation None',
      description: 'Test animate-none utility',
      test: () => {
        const result = tws('animate-none', 1)
        return {
          passed: result.animation === 'none',
          output: JSON.stringify(result, null, 2),
          expected: 'Should set animation to none'
        }
      }
    },
    {
      name: 'Custom Animation',
      description: 'Test custom fade-in animation',
      test: () => {
        const result = tws('animate-fade-in', 1)
        return {
          passed: result.animation && result.animation.includes('fadeIn'),
          output: JSON.stringify(result, null, 2),
          expected: 'Should generate custom fadeIn animation'
        }
      }
    },
    {
      name: 'Transition Properties',
      description: 'Test transition utilities',
      test: () => {
        const result = tws('transition-all duration-300 ease-in-out', 1)
        return {
          passed: result.transitionProperty && result.transitionDuration && result.transitionTimingFunction,
          output: JSON.stringify(result, null, 2),
          expected: 'Should generate transition properties'
        }
      }
    },
    {
      name: 'Specific Transition Types',
      description: 'Test specific transition properties',
      test: () => {
        const colors = tws('transition-colors', 1)
        const opacity = tws('transition-opacity', 1)
        const transform = tws('transition-transform', 1)
        
        return {
          passed: colors.transitionProperty && opacity.transitionProperty && transform.transitionProperty,
          output: `Colors: ${colors.transitionProperty}\nOpacity: ${opacity.transitionProperty}\nTransform: ${transform.transitionProperty}`,
          expected: 'Should generate specific transition properties'
        }
      }
    },
    {
      name: 'Transition Durations',
      description: 'Test various transition durations',
      test: () => {
        const duration75 = tws('duration-75', 1)
        const duration300 = tws('duration-300', 1)
        const duration1000 = tws('duration-1000', 1)
        
        return {
          passed: duration75.transitionDuration === '75ms' && 
                 duration300.transitionDuration === '300ms' && 
                 duration1000.transitionDuration === '1000ms',
          output: `75ms: ${duration75.transitionDuration}\n300ms: ${duration300.transitionDuration}\n1000ms: ${duration1000.transitionDuration}`,
          expected: 'Should generate correct transition durations'
        }
      }
    },
    {
      name: 'Transition Timing Functions',
      description: 'Test transition easing functions',
      test: () => {
        const linear = tws('ease-linear', 1)
        const easeIn = tws('ease-in', 1)
        const easeOut = tws('ease-out', 1)
        const easeInOut = tws('ease-in-out', 1)
        
        return {
          passed: linear.transitionTimingFunction === 'linear' && 
                 easeIn.transitionTimingFunction && 
                 easeOut.transitionTimingFunction && 
                 easeInOut.transitionTimingFunction,
          output: `Linear: ${linear.transitionTimingFunction}\nEase-in: ${easeIn.transitionTimingFunction}\nEase-out: ${easeOut.transitionTimingFunction}\nEase-in-out: ${easeInOut.transitionTimingFunction}`,
          expected: 'Should generate correct timing functions'
        }
      }
    },
    {
      name: 'Transition Delays',
      description: 'Test transition delays',
      test: () => {
        const delay150 = tws('delay-150', 1)
        const delay500 = tws('delay-500', 1)
        
        return {
          passed: delay150.transitionDelay === '150ms' && delay500.transitionDelay === '500ms',
          output: `150ms: ${delay150.transitionDelay}\n500ms: ${delay500.transitionDelay}`,
          expected: 'Should generate correct transition delays'
        }
      }
    },
    {
      name: 'Complex Animation with twsx',
      description: 'Test animations in nested twsx styles',
      test: () => {
        const result = twsx({
          '.animated-card': [
            'bg-white p-6 rounded-lg transition-all duration-300',
            {
              '&:hover': 'animate-pulse transform scale-105',
              '.spinner': 'animate-spin w-4 h-4 border-2 border-blue-500 rounded-full',
              '.fade-content': 'animate-fade-in opacity-0'
            }
          ]
        })
        
        return {
          passed: result.includes('animation') && result.includes('transform') && result.includes('transition'),
          output: result,
          expected: 'Should generate complex animations in nested styles'
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
    updateResult('animations', { 
      passed: allPassed, 
      total: results.length,
      passed_count: results.filter(r => r.passed).length
    })
  }, [])

  return (
    <TestContainer
      title="Animations & Transitions Tests"
      description="Testing built-in animations (spin, ping, pulse, bounce), custom animations, transitions, timing functions, and complex animation combinations."
      testResults={testResults}
    >
      <div className="animation-examples">
        <div className="examples-container">
          <h3 className="examples-title">Live Animation Examples</h3>
          <AnimationDemo />
        </div>
        
        <div className="transition-examples">
          <h3 className="transition-title">Transition Examples</h3>
          <div className="transition-grid">
            <div className="transition-card fast">
              <h4 className="card-title">Fast Transition</h4>
              <p className="card-desc">duration-150</p>
            </div>
            <div className="transition-card medium">
              <h4 className="card-title">Medium Transition</h4>
              <p className="card-desc">duration-300 ease-in-out</p>
            </div>
            <div className="transition-card slow">
              <h4 className="card-title">Slow Transition</h4>
              <p className="card-desc">duration-700 ease-out</p>
            </div>
          </div>
        </div>
        
        <div className="reference-section">
          <h3 className="reference-title">Animation Reference</h3>
          <div className="reference-grid">
            <div>
              <h4 className="reference-column-title">Built-in Animations:</h4>
              <ul className="reference-list">
                <li><code className="reference-code">animate-spin</code> - Spinning animation</li>
                <li><code className="reference-code">animate-ping</code> - Ping/radar effect</li>
                <li><code className="reference-code">animate-pulse</code> - Pulsing opacity</li>
                <li><code className="reference-code">animate-bounce</code> - Bouncing animation</li>
                <li><code className="reference-code">animate-none</code> - Disable animation</li>
              </ul>
            </div>
            <div>
              <h4 className="reference-column-title">Transition Properties:</h4>
              <ul className="reference-list">
                <li><code className="reference-code">transition-all</code> - All properties</li>
                <li><code className="reference-code">transition-colors</code> - Color properties</li>
                <li><code className="reference-code">transition-opacity</code> - Opacity only</li>
                <li><code className="reference-code">transition-transform</code> - Transform only</li>
                <li><code className="reference-code">transition-shadow</code> - Box shadow only</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </TestContainer>
  )
}

export default AnimationsTests