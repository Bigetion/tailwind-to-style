import { useState } from 'react'
import { tws } from 'tailwind-to-style'
import CodePreview from './CodePreview'

// Debug: Check if tws is loaded
console.log('tws function:', tws)
console.log('tws type:', typeof tws)

const examples = [
  {
    name: 'Basic Button',
    classes: 'bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition-all'
  },
  {
    name: 'Gradient Card',
    classes: 'bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-2xl shadow-2xl text-white'
  },
  {
    name: 'Responsive Text',
    classes: 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium'
  },
  {
    name: 'Flex Layout',
    classes: 'flex items-center justify-between gap-4 p-4 bg-gray-100 rounded-lg'
  },
  {
    name: 'Animation',
    classes: 'animate-bounce bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg'
  },
  {
    name: 'Custom Values',
    classes: 'w-[300px] h-[200px] text-[#ff6b6b] bg-[#f0f0f0] border-[3px]'
  }
]

function TwsDemo() {
  const [selectedExample, setSelectedExample] = useState(examples[0])
  const [customClasses, setCustomClasses] = useState('')
  const [useCustom, setUseCustom] = useState(false)

  const classesToUse = useCustom ? customClasses : selectedExample.classes
  
  // Generate styles - ensure it's an object
  let styles = {}
  let rawOutput = ''
  try {
    rawOutput = tws(classesToUse)
    // If tws returns string, parse it or convert it
    if (typeof rawOutput === 'string') {
      // Parse CSS string to object (fallback)
      styles = {}
      console.warn('tws() returned string instead of object:', rawOutput)
    } else {
      styles = rawOutput
    }
  } catch (error) {
    console.error('Error calling tws():', error)
  }

  return (
    <div className="demo-container">
      <div className="demo-section">
        <h2>📝 Input</h2>
        
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
            <span>Custom Classes:</span>
          </label>
          <textarea
            value={customClasses}
            onChange={(e) => {
              setCustomClasses(e.target.value)
              setUseCustom(true)
            }}
            placeholder="Enter Tailwind classes here..."
            rows={3}
            className="code-input"
          />
        </div>

        <div className="input-display">
          <strong>Current Input:</strong>
          <code>{classesToUse}</code>
        </div>
      </div>

      <div className="demo-section">
        <h2>🎨 Live Preview</h2>
        <div className="preview-box">
          <div style={styles}>
            {classesToUse.includes('animate') ? '🎪 Animated Element' : '✨ Styled Element'}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>💻 Generated Style Object</h2>
        <CodePreview code={typeof rawOutput === 'string' ? `CSS String: ${rawOutput}` : styles} language="json" />
        {typeof rawOutput === 'string' && (
          <div style={{padding: '1rem', background: '#fef3c7', borderRadius: '8px', marginTop: '1rem'}}>
            ⚠️ <strong>Warning:</strong> tws() returned a CSS string instead of style object. 
            This might indicate the library needs to be rebuilt. Run <code>npm run build</code> in parent directory.
          </div>
        )}
      </div>

      <div className="demo-section">
        <h2>📊 Usage Example</h2>
        <CodePreview 
          code={`import { tws } from 'tailwind-to-style'

const styles = tws('${classesToUse}')

// React
<div style={styles}>Your content</div>

// Vanilla JS
element.style = Object.assign(element.style, styles)`}
          language="javascript"
        />
      </div>
    </div>
  )
}

export default TwsDemo
