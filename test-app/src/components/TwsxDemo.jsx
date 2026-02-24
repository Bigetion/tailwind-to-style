import { useState, useEffect, useRef } from 'react'
import { twsx } from 'tailwind-to-style'
import CodePreview from './CodePreview'

const examples = [
  {
    name: 'Button Component',
    config: {
      '.cool-btn': [
        'bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all',
        {
          '&:hover': 'from-cyan-600 to-blue-600 shadow-xl transform scale-105',
          '&:active': 'scale-95',
          '&.large': 'px-10 py-5 text-xl',
          '&.small': 'px-3 py-1.5 text-sm'
        }
      ]
    }
  },
  {
    name: 'Card with Hover',
    config: {
      '.card': [
        'bg-white rounded-2xl shadow-lg p-6 transition-all duration-300',
        {
          '&:hover': 'shadow-2xl transform -translate-y-2',
          '> .title': 'text-2xl font-bold text-gray-900 mb-2',
          '> .content': 'text-gray-600 leading-relaxed'
        }
      ]
    }
  },
  {
    name: 'Navigation Menu',
    config: {
      '.nav': [
        'flex items-center gap-6 bg-white shadow-md px-8 py-4',
        {
          '> .nav-item': [
            'text-gray-700 font-medium transition-colors',
            {
              '&:hover': 'text-blue-600',
              '&.active': 'text-blue-600 border-b-2 border-blue-600'
            }
          ]
        }
      ]
    }
  },
  {
    name: 'Form Input',
    config: {
      '.input': [
        'w-full px-4 py-2 border-2 border-gray-300 rounded-lg transition-all',
        {
          '&:focus': 'border-blue-500 ring-2 ring-blue-200 outline-none',
          '&:disabled': 'bg-gray-100 text-gray-500 cursor-not-allowed',
          '&.error': 'border-red-500 ring-2 ring-red-200'
        }
      ]
    }
  }
]

function TwsxDemo() {
  const [selectedExample, setSelectedExample] = useState(examples[0])
  const [customConfig, setCustomConfig] = useState('')
  const [useCustom, setUseCustom] = useState(false)
  const [generatedCSS, setGeneratedCSS] = useState('')
  const styleRef = useRef(null)

  const configToUse = useCustom 
    ? (customConfig ? JSON.parse(customConfig) : {}) 
    : selectedExample.config

  useEffect(() => {
    try {
      const css = twsx(configToUse)
      setGeneratedCSS(css)
      
      // Inject CSS into document
      if (!styleRef.current) {
        styleRef.current = document.createElement('style')
        styleRef.current.id = 'twsx-demo-styles'
        document.head.appendChild(styleRef.current)
      }
      styleRef.current.textContent = css
    } catch (error) {
      console.error('Error generating CSS:', error)
      setGeneratedCSS(`/* Error: ${error.message} */`)
    }

    return () => {
      // Cleanup on unmount
      if (styleRef.current) {
        styleRef.current.remove()
        styleRef.current = null
      }
    }
  }, [configToUse])

  const handleCustomChange = (value) => {
    setCustomConfig(value)
    setUseCustom(true)
  }

  return (
    <div className="demo-container">
      <div className="demo-section">
        <h2>📝 Input Configuration</h2>
        
        <div className="example-selector">
          <label>
            <input 
              type="radio" 
              checked={!useCustom}
              onChange={() => setUseCustom(false)}
            />
            <span>Use Example:</span>
          </label>
          <select 
            value={selectedExample.name}
            onChange={(e) => setSelectedExample(examples.find(ex => ex.name === e.target.value))}
            disabled={useCustom}
          >
            {examples.map(ex => (
              <option key={ex.name} value={ex.name}>{ex.name}</option>
            ))}
          </select>
        </div>

        <div className="custom-input">
          <label>
            <input 
              type="radio" 
              checked={useCustom}
              onChange={() => setUseCustom(true)}
            />
            <span>Custom Config (JSON):</span>
          </label>
          <textarea
            value={customConfig}
            onChange={(e) => handleCustomChange(e.target.value)}
            placeholder='{"selector": ["classes", {"&:hover": "more-classes"}]}'
            rows={6}
            className="code-input"
          />
        </div>

        <CodePreview code={configToUse} language="json" title="Current Config:" />
      </div>

      <div className="demo-section">
        <h2>🎨 Live Preview</h2>
        <div className="preview-box">
          {selectedExample.name === 'Button Component' && (
            <>
              <button className="cool-btn">Regular Button</button>
              <button className="cool-btn large">Large Button</button>
              <button className="cool-btn small">Small</button>
            </>
          )}
          {selectedExample.name === 'Card with Hover' && (
            <div className="card" style={{ maxWidth: '300px' }}>
              <div className="title">Card Title</div>
              <div className="content">Hover over this card to see the animation effect!</div>
            </div>
          )}
          {selectedExample.name === 'Navigation Menu' && (
            <nav className="nav">
              <a className="nav-item active">Home</a>
              <a className="nav-item">About</a>
              <a className="nav-item">Services</a>
              <a className="nav-item">Contact</a>
            </nav>
          )}
          {selectedExample.name === 'Form Input' && (
            <div style={{ maxWidth: '400px' }}>
              <input type="text" className="input" placeholder="Normal input" />
              <br /><br />
              <input type="text" className="input error" placeholder="Error state" />
              <br /><br />
              <input type="text" className="input" placeholder="Disabled" disabled />
            </div>
          )}
        </div>
      </div>

      <div className="demo-section">
        <h2>💻 Generated CSS</h2>
        <CodePreview code={generatedCSS} language="css" />
      </div>

      <div className="demo-section">
        <h2>📊 Usage Example</h2>
        <CodePreview 
          code={`import { twsx } from 'tailwind-to-style'

const css = twsx(${JSON.stringify(configToUse, null, 2)})

// Inject to document
const style = document.createElement('style')
style.textContent = css
document.head.appendChild(style)`}
          language="javascript"
        />
      </div>
    </div>
  )
}

export default TwsxDemo
