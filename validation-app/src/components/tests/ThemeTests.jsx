import React, { useState, useEffect } from 'react'
import { tws, configure } from 'tailwind-to-style'
import { useTwsx } from 'tailwind-to-style/react'
import TestContainer from '../TestContainer'

function ThemeTests({ updateResult }) {
  const [testResults, setTestResults] = useState([])
  const [currentTheme, setCurrentTheme] = useState('default')

  // Demo theme configurations
  const themes = {
    default: {
      theme: {
        extend: {
          colors: {
            primary: '#3b82f6',
            secondary: '#6b7280'
          }
        }
      }
    },
    purple: {
      theme: {
        extend: {
          colors: {
            primary: '#8b5cf6',
            secondary: '#a855f7',
            accent: '#ec4899',
            custom: {
              50: '#faf5ff',
              100: '#f3e8ff',
              500: '#8b5cf6',
              900: '#581c87'
            }
          },
          spacing: {
            '128': '32rem',
            '144': '36rem'
          },
          borderRadius: {
            '4xl': '2rem'
          }
        }
      }
    }
  }

  // Theme demo component
  const ThemeDemo = () => {
    useTwsx({
      '.theme-demo': [
        'p-6 rounded-lg bg-white shadow-lg transition-all duration-300',
        {
          '.demo-header': 'mb-4 pb-4 border-b border-gray-200',
          '.demo-title': 'text-2xl font-bold text-blue-600 mb-2',
          '.demo-subtitle': 'text-gray-600',
          '.demo-content': 'space-y-4',
          '.demo-button': [
            'px-6 py-3 bg-blue-500 text-white rounded-lg font-medium',
            'hover:bg-blue-600 transform hover:scale-105 transition-all duration-200'
          ]
        }
      ]
    })

    return (
      <div className="theme-demo">
        <div className="demo-header">
          <h3 className="demo-title">Theme Demo</h3>
          <p className="demo-subtitle">Current theme: {currentTheme}</p>
        </div>
        <div className="demo-content">
          <button className="demo-button">
            Themed Button
          </button>
        </div>
      </div>
    )
  }

  const switchTheme = (themeName) => {
    setCurrentTheme(themeName)
    configure(themes[themeName])
  }

  // Add styling for theme examples
  useTwsx({
    '.theme-examples': 'mt-8 space-y-6',
    '.theme-switcher-container': 'bg-gray-50 p-6 rounded-lg',
    '.theme-switcher-title': 'text-lg font-semibold mb-4',
    '.theme-buttons': 'flex gap-2 mb-6',
    '.theme-button': [
      'px-4 py-2 rounded-lg font-medium transition-colors',
      {
        '&.active': 'bg-blue-500 text-white',
        '&.inactive': 'bg-white text-gray-700 hover:bg-gray-100'
      }
    ],
    '.config-examples': 'bg-blue-50 p-6 rounded-lg',
    '.config-title': 'text-lg font-semibold mb-4',
    '.config-content': 'space-y-4 text-sm',
    '.config-section-title': 'font-medium mb-2',
    '.config-code': 'bg-white p-3 rounded overflow-x-auto text-xs'
  })

  const tests = [
    {
      name: 'Basic Theme Configuration',
      description: 'Test configuring custom colors',
      test: () => {
        configure({
          theme: {
            extend: {
              colors: {
                'custom-blue': '#1e40af',
                'brand': {
                  500: '#3b82f6',
                  600: '#2563eb'
                }
              }
            }
          }
        })
        
        const result = tws('bg-custom-blue text-brand-500', 1)
        return {
          passed: result.backgroundColor && result.color,
          output: JSON.stringify(result, null, 2),
          expected: 'Should use custom colors from theme configuration'
        }
      }
    },
    {
      name: 'Custom Spacing',
      description: 'Test custom spacing values',
      test: () => {
        configure({
          theme: {
            extend: {
              spacing: {
                '128': '32rem',
                '144': '36rem',
                'custom': '2.5rem'
              }
            }
          }
        })
        
        const result = tws('p-128 m-144 w-custom', 1)
        return {
          passed: result.padding === '32rem' && result.margin === '36rem' && result.width === '2.5rem',
          output: JSON.stringify(result, null, 2),
          expected: 'Should use custom spacing values'
        }
      }
    },
    {
      name: 'Custom Border Radius',
      description: 'Test custom border radius values',
      test: () => {
        configure({
          theme: {
            extend: {
              borderRadius: {
                '4xl': '2rem',
                'custom': '1.5rem'
              }
            }
          }
        })
        
        const result = tws('rounded-4xl border-custom', 1)
        return {
          passed: result.borderRadius === '2rem',
          output: JSON.stringify(result, null, 2),
          expected: 'Should use custom border radius values'
        }
      }
    },
    {
      name: 'Custom Font Sizes',
      description: 'Test custom font size configuration',
      test: () => {
        configure({
          theme: {
            extend: {
              fontSize: {
                'huge': '4rem',
                'tiny': '0.625rem'
              }
            }
          }
        })
        
        const result = tws('text-huge', 1)
        return {
          passed: result.fontSize === '4rem',
          output: JSON.stringify(result, null, 2),
          expected: 'Should use custom font sizes'
        }
      }
    },
    {
      name: 'Nested Color Objects',
      description: 'Test nested color object configuration',
      test: () => {
        configure({
          theme: {
            extend: {
              colors: {
                brand: {
                  50: '#eff6ff',
                  100: '#dbeafe',
                  500: '#3b82f6',
                  900: '#1e3a8a'
                }
              }
            }
          }
        })
        
        const result50 = tws('bg-brand-50', 1)
        const result500 = tws('bg-brand-500', 1)
        const result900 = tws('bg-brand-900', 1)
        
        return {
          passed: result50.backgroundColor && result500.backgroundColor && result900.backgroundColor,
          output: `50: ${result50.backgroundColor}\n500: ${result500.backgroundColor}\n900: ${result900.backgroundColor}`,
          expected: 'Should handle nested color objects with numeric keys'
        }
      }
    },
    {
      name: 'Theme Merging',
      description: 'Test deep merging of theme configurations',
      test: () => {
        // First configuration
        configure({
          theme: {
            extend: {
              colors: {
                primary: '#3b82f6',
                brand: {
                  500: '#ef4444'
                }
              }
            }
          }
        })
        
        // Second configuration should merge, not replace
        configure({
          theme: {
            extend: {
              colors: {
                secondary: '#10b981',
                brand: {
                  600: '#dc2626'
                }
              }
            }
          }
        })
        
        const primaryResult = tws('bg-primary', 1)
        const secondaryResult = tws('bg-secondary', 1)
        const brand500Result = tws('bg-brand-500', 1)
        const brand600Result = tws('bg-brand-600', 1)
        
        return {
          passed: primaryResult.backgroundColor && secondaryResult.backgroundColor && 
                 brand500Result.backgroundColor && brand600Result.backgroundColor,
          output: `Primary: ${primaryResult.backgroundColor}\nSecondary: ${secondaryResult.backgroundColor}\nBrand-500: ${brand500Result.backgroundColor}\nBrand-600: ${brand600Result.backgroundColor}`,
          expected: 'Should deep merge theme configurations'
        }
      }
    },
    {
      name: 'Config File Support',
      description: 'Test configuration object structure',
      test: () => {
        const config = {
          theme: {
            extend: {
              colors: {
                'config-test': '#8b5cf6'
              },
              spacing: {
                'config-space': '3rem'
              }
            }
          },
          prefix: '', // Test prefix support
        }
        
        configure(config)
        
        const result = tws('bg-config-test p-config-space', 1)
        return {
          passed: result.backgroundColor && result.padding === '3rem',
          output: JSON.stringify(result, null, 2),
          expected: 'Should support full configuration object structure'
        }
      }
    },
    {
      name: 'Custom Animations in Theme',
      description: 'Test custom animations through theme',
      test: () => {
        configure({
          theme: {
            extend: {
              animation: {
                'custom-spin': 'spin 2s linear infinite',
                'fade-in-up': 'fadeInUp 0.5s ease-out'
              },
              keyframes: {
                fadeInUp: {
                  '0%': { opacity: '0', transform: 'translateY(20px)' },
                  '100%': { opacity: '1', transform: 'translateY(0)' }
                }
              }
            }
          }
        })
        
        const spinResult = tws('animate-custom-spin', 1)
        const fadeResult = tws('animate-fade-in-up', 1)
        
        return {
          passed: spinResult.animation && fadeResult.animation,
          output: `Custom Spin: ${spinResult.animation}\nFade In Up: ${fadeResult.animation}`,
          expected: 'Should support custom animations and keyframes'
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
    updateResult('theme', { 
      passed: allPassed, 
      total: results.length,
      passed_count: results.filter(r => r.passed).length
    })
  }, [])

  return (
    <TestContainer
      title="Theme Customization Tests"
      description="Testing custom theme configuration including colors, spacing, typography, animations, and deep merging of theme objects."
      testResults={testResults}
    >
      <div className="theme-examples">
        <div className="theme-switcher-container">
          <h3 className="theme-switcher-title">Live Theme Switching</h3>
          <div className="theme-buttons">
            {Object.keys(themes).map(themeName => (
              <button
                key={themeName}
                onClick={() => switchTheme(themeName)}
                className={`theme-button ${currentTheme === themeName ? 'active' : 'inactive'}`}
              >
                {themeName.charAt(0).toUpperCase() + themeName.slice(1)} Theme
              </button>
            ))}
          </div>
          <ThemeDemo />
        </div>
        
        <div className="config-examples">
          <h3 className="config-title">Theme Configuration Examples</h3>
          <div className="config-content">
            <div>
              <h4 className="config-section-title">Custom Colors:</h4>
              <pre className="config-code">
{`configure({
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a'
        },
        accent: '#f59e0b'
      }
    }
  }
})`}
              </pre>
            </div>
            <div>
              <h4 className="config-section-title">Custom Spacing & Border Radius:</h4>
              <pre className="config-code">
{`configure({
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  }
})`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </TestContainer>
  )
}

export default ThemeTests