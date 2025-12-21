import { useState } from 'react'
import { useTwsx } from 'twsx-react'
import ShowcaseSection from '../components/ShowcaseSection'

export default function ReactHooksShowcase() {
  const [theme, setTheme] = useState('light')
  
  // Example of useTwsx without injection - get CSS only
  const buttonCSS = useTwsx({
    '.theme-button': [
      'px-4 py-2 rounded-lg font-medium transition-all duration-200',
      {
        [`&.${theme}`]: theme === 'dark' 
          ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400' 
          : 'bg-gray-800 text-white hover:bg-gray-700'
      }
    ]
  }, { inject: false }) // Get CSS without auto-injection

  useTwsx({
    '.hook-demo': [
      'bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700'
    ],
    '.theme-container': [
      `bg-${theme === 'dark' ? 'gray-800' : 'white'} rounded-lg p-6 transition-all duration-300 border`,
      {
        [`&.${theme}`]: theme === 'dark' 
          ? 'border-gray-700 text-white' 
          : 'border-gray-200 text-gray-900',
        '.theme-title': 'text-xl font-bold mb-4',
        '.theme-content': `text-${theme === 'dark' ? 'gray-300' : 'gray-600'}`
      }
    ]
  })

  const useTwsxCode = `import { useTwsx } from 'twsx-react'

function MyComponent() {
  // Auto-inject CSS into document head
  useTwsx({
    '.card': [
      'bg-white rounded-lg shadow-md p-6',
      {
        '&:hover': 'shadow-lg transform scale-105',
        '.title': 'text-xl font-bold text-gray-900',
        '.content': 'text-gray-600 mt-2'
      }
    ]
  })

  return (
    <div className="card">
      <h2 className="title">Card Title</h2>
      <p className="content">Card content here</p>
    </div>
  )
}`

  const useTwsxManualCode = `import { useTwsx } from 'twsx-react'

function MyComponent() {
  // Get CSS without auto-injection
  const css = useTwsx({
    '.button': [
      'px-4 py-2 bg-blue-500 text-white rounded-lg',
      {
        '&:hover': 'bg-blue-600',
        '&:active': 'bg-blue-700'
      }
    ]
  }, { inject: false })

  return (
    <>
      <style>{css}</style>
      <button className="button">Click me</button>
    </>
  )
}`

  const dynamicCode = `import { useTwsx } from 'twsx-react'
import { useState } from 'react'

function ThemeToggle() {
  const [theme, setTheme] = useState('light')
  
  useTwsx({
    '.theme-container': [
      \`bg-\${theme === 'dark' ? 'gray-800' : 'white'} p-6 rounded-lg transition-all duration-300\`,
      {
        [\`&.\${theme}\`]: theme === 'dark' 
          ? 'text-white border-gray-700' 
          : 'text-gray-900 border-gray-200'
      }
    ]
  })

  return (
    <div className={\`theme-container \${theme}\`}>
      <h2>Dynamic Theme: {theme}</h2>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  )
}`

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">React Hooks</h1>
        <p className="text-slate-300 text-lg">
          TWSX provides several React hooks for different styling needs, each optimized 
          for performance with memoization and smart re-rendering.
        </p>
      </div>

      <ShowcaseSection
        title="useTwsx (Auto-inject)"
        description="The main hook for component styling with automatic CSS injection into the document head."
        code={useTwsxCode}
      />

      <ShowcaseSection
        title="useTwsx (Manual CSS)"
        description="Get CSS string without automatic injection for manual control or CSS-in-JS workflows."
        code={useTwsxManualCode}
      >
        <div className="hook-demo">
          <style>{buttonCSS}</style>
          <button className={`theme-button ${theme}`}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
          </button>
          <p className="text-slate-300 text-sm mt-3">
            This button uses <code className="text-cyan-400">useTwsx</code> with <code className="text-cyan-400">inject: false</code>
          </p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Dynamic styling"
        description="Create dynamic styles that respond to component state changes."
        code={dynamicCode}
        resizable={true}
      >
        <div className={`theme-container ${theme}`}>
          <h3 className="theme-title">🌓 Dynamic Theme Demo</h3>
          <p className="theme-content">
            This component demonstrates dynamic styling based on React state. 
            The theme changes are handled by conditional TWSX classes.
          </p>
          <button 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className={`theme-button ${theme} mt-4`}
          >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
          </button>
        </div>
      </ShowcaseSection>
    </div>
  )
}