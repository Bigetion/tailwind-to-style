import React, { useState } from 'react'
import { useTwsx, useTwsxClasses, useTwsxInline, useTwsxContext } from 'twsx-react'
import CodeBlock from '../components/CodeBlock'

export default function HookExamples() {
  const [theme, setTheme] = useState('light')
  const [dynamicColor, setDynamicColor] = useState('blue')
  const { config, isConfigured } = useTwsxContext()

  // Example 1: Basic useTwsx hook
  useTwsx({
    '.hook-showcase': [
      'bg-white rounded-lg shadow-md p-6 mb-6'
    ],
    '.hook-demo': [
      'bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200',
      {
        '.demo-title': 'font-semibold text-gray-800 mb-2',
        '.demo-content': 'text-gray-600 text-sm'
      }
    ]
  })

  // Example 2: Dynamic styling based on state
  useTwsx({
    '.theme-demo': [
      `bg-${theme === 'dark' ? 'gray-800' : 'white'} rounded-lg p-6 mb-6 transition-all duration-300`,
      {
        '.theme-title': `text-${theme === 'dark' ? 'white' : 'gray-900'} text-xl font-bold mb-4`,
        '.theme-content': `text-${theme === 'dark' ? 'gray-300' : 'gray-600'}`,
        '.theme-toggle': [
          'px-4 py-2 rounded-lg font-medium transition-all duration-200 mt-4',
          {
            [`&.${theme}`]: theme === 'dark' 
              ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400' 
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }
        ]
      }
    ]
  })

  // Example 3: Dynamic color system
  const colorClasses = useTwsxClasses({
    '.dynamic-card': [
      `bg-${dynamicColor}-500 text-white rounded-lg p-6 mb-6 transition-all duration-300`,
      {
        '&:hover': `bg-${dynamicColor}-600 transform scale-105`,
        '.card-title': 'text-xl font-bold mb-2',
        '.card-desc': `text-${dynamicColor}-100`
      }
    ]
  })

  // Example 4: Inline styles hook
  const inlineStyles = useTwsxInline('bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg')

  const hookExamples = [
    {
      title: 'useTwsx',
      desc: 'Main hook for component styling with auto CSS injection',
      code: `const MyComponent = () => {
  useTwsx({
    '.my-card': [
      'bg-white rounded-lg p-6',
      {
        '&:hover': 'shadow-lg',
        '.title': 'text-xl font-bold'
      }
    ]
  })
  
  return <div className="my-card">...</div>
}`
    },
    {
      title: 'useTwsxClasses',
      desc: 'Get CSS classes without auto-injection for manual control',
      code: `const MyComponent = () => {
  const css = useTwsxClasses({
    '.button': 'bg-blue-500 text-white px-4 py-2 rounded'
  })
  
  // Manually inject or use with CSS-in-JS
  return <div>{css}</div>
}`
    },
    {
      title: 'useTwsxInline',
      desc: 'Convert Tailwind classes to React inline style objects',
      code: `const MyComponent = () => {
  const styles = useTwsxInline('bg-red-500 text-white p-4 rounded')
  
  return <div style={styles}>Styled with inline styles</div>
}`
    },
    {
      title: 'useTwsxContext',
      desc: 'Access TWSX configuration and theme context',
      code: `const MyComponent = () => {
  const { config, isConfigured } = useTwsxContext()
  
  return (
    <div>
      Config loaded: {isConfigured ? 'Yes' : 'No'}
      Brand color: {config?.theme?.extend?.colors?.brand?.[500]}
    </div>
  )
}`
    }
  ]

  const colors = ['blue', 'green', 'purple', 'red', 'yellow', 'indigo']

  return (
    <div>
      <div className="hook-showcase">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">🪝 React Hook Examples</h1>
        <p className="text-gray-600">
          TWSX provides several React hooks for different use cases. Each hook is optimized 
          for performance with memoization and smart re-rendering.
        </p>
      </div>

      {/* Hook Demos */}
      {hookExamples.map((example, index) => (
        <div key={index} className="hook-demo">
          <h3 className="demo-title">{example.title}</h3>
          <p className="demo-content mb-4">{example.desc}</p>
          <CodeBlock 
            code={example.code}
            title={`${example.title} Example`}
            language="javascript"
          />
        </div>
      ))}

      {/* Live Demo: Theme Toggle */}
      <div className="theme-demo">
        <h2 className="theme-title">🌓 Dynamic Theme Demo</h2>
        <p className="theme-content">
          This component demonstrates dynamic styling based on React state. 
          The theme changes are handled by conditional TWSX classes.
        </p>
        <button 
          className={`theme-toggle ${theme}`}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
      </div>

      {/* Live Demo: Dynamic Colors */}
      <div>
        <style>{colorClasses}</style>
        <div className="dynamic-card">
          <h3 className="card-title">🎨 Dynamic Color System</h3>
          <p className="card-desc">
            This card's color changes dynamically based on the selected color. 
            The CSS is generated on-the-fly using useTwsxClasses hook.
          </p>
          <div className="mt-4 flex gap-2 flex-wrap">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setDynamicColor(color)}
                className={`px-3 py-1 rounded text-sm font-medium transition-all duration-200 ${
                  dynamicColor === color 
                    ? 'bg-white text-gray-900 shadow-md' 
                    : 'bg-white/20 text-white/80 hover:bg-white/30'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Demo: Inline Styles */}
      <div style={inlineStyles}>
        <h3 className="text-xl font-bold mb-2">✨ Inline Styles Demo</h3>
        <p className="opacity-90">
          This component uses the useTwsxInline hook to convert Tailwind classes 
          directly to React inline style objects. Perfect for dynamic styling or 
          CSS-in-JS workflows.
        </p>
      </div>

      {/* Context Demo */}
      <div className="hook-showcase">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🔧 Context Information</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Configuration Status:</strong> {isConfigured ? '✅ Loaded' : '❌ Not loaded'}
            </div>
            <div>
              <strong>Brand Color:</strong> {config?.theme?.extend?.colors?.brand?.[500] || 'Not set'}
            </div>
            <div>
              <strong>Success Color:</strong> {config?.theme?.extend?.colors?.success || 'Not set'}
            </div>
            <div>
              <strong>Custom Animations:</strong> {Object.keys(config?.theme?.extend?.animation || {}).length} defined
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}