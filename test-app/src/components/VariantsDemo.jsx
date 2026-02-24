import { useState } from 'react'
import { twsxVariants } from 'tailwind-to-style'
import CodePreview from './CodePreview'

// Define variant components
const buttonVariants = twsxVariants('.btn', {
  base: 'px-4 py-2 rounded-lg font-medium transition-all inline-block cursor-pointer',
  variants: {
    variant: {
      solid: 'border-transparent shadow-md hover:shadow-lg',
      outline: 'bg-transparent border-2',
      ghost: 'bg-transparent hover:bg-opacity-10'
    },
    color: {
      primary: 'bg-blue-500 text-white hover:bg-blue-600 border-blue-500',
      danger: 'bg-red-500 text-white hover:bg-red-600 border-red-500',
      success: 'bg-green-500 text-white hover:bg-green-600 border-green-500',
      warning: 'bg-yellow-500 text-white hover:bg-yellow-600 border-yellow-500'
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl'
    },
    rounded: {
      true: 'rounded-full'
    }
  },
  compoundVariants: [
    { variant: 'outline', color: 'primary', class: 'text-blue-600 hover:bg-blue-50' },
    { variant: 'outline', color: 'danger', class: 'text-red-600 hover:bg-red-50' },
    { variant: 'outline', color: 'success', class: 'text-green-600 hover:bg-green-50' },
    { variant: 'ghost', color: 'primary', class: 'text-blue-600 hover:bg-blue-500' },
    { variant: 'ghost', color: 'danger', class: 'text-red-600 hover:bg-red-500' }
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'md'
  }
})

const badgeVariants = twsxVariants('.badge', {
  base: 'inline-block px-3 py-1 rounded-full text-sm font-semibold',
  variants: {
    color: {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      red: 'bg-red-100 text-red-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      purple: 'bg-purple-100 text-purple-800'
    },
    size: {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-2 text-base'
    }
  },
  defaultVariants: {
    color: 'blue',
    size: 'md'
  }
})

const alertVariants = twsxVariants('.alert', {
  base: 'p-4 rounded-lg border flex gap-3',
  variants: {
    status: {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      success: 'bg-green-50 border-green-200 text-green-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      error: 'bg-red-50 border-red-200 text-red-800'
    }
  },
  defaultVariants: {
    status: 'info'
  },
  nested: {
    '.alert-icon': 'flex-shrink-0 mt-0.5 text-lg',
    '.alert-content': 'flex-1',
    '.alert-title': 'font-bold mb-1'
  }
})

function VariantsDemo() {
  const [activeComponent, setActiveComponent] = useState('button')
  
  // Button state
  const [btnVariant, setBtnVariant] = useState('solid')
  const [btnColor, setBtnColor] = useState('primary')
  const [btnSize, setBtnSize] = useState('md')
  const [btnRounded, setBtnRounded] = useState(false)

  // Badge state
  const [badgeColor, setBadgeColor] = useState('blue')
  const [badgeSize, setBadgeSize] = useState('md')

  // Alert state
  const [alertStatus, setAlertStatus] = useState('info')

  const renderButtonDemo = () => {
    const props = { 
      variant: btnVariant, 
      color: btnColor, 
      size: btnSize,
      ...(btnRounded && { rounded: true })
    }
    const className = buttonVariants(props)

    return (
      <>
        <div className="variant-controls">
          <div className="control-group">
            <label>Variant:</label>
            <select value={btnVariant} onChange={(e) => setBtnVariant(e.target.value)}>
              <option value="solid">Solid</option>
              <option value="outline">Outline</option>
              <option value="ghost">Ghost</option>
            </select>
          </div>

          <div className="control-group">
            <label>Color:</label>
            <select value={btnColor} onChange={(e) => setBtnColor(e.target.value)}>
              <option value="primary">Primary</option>
              <option value="danger">Danger</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
            </select>
          </div>

          <div className="control-group">
            <label>Size:</label>
            <select value={btnSize} onChange={(e) => setBtnSize(e.target.value)}>
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="xl">XL</option>
            </select>
          </div>

          <div className="control-group">
            <label>
              <input 
                type="checkbox" 
                checked={btnRounded}
                onChange={(e) => setBtnRounded(e.target.checked)}
              />
              Rounded
            </label>
          </div>
        </div>

        <div className="preview-box">
          <button className={className}>
            Click Me!
          </button>
        </div>

        <div className="info-box">
          <strong>Generated Class:</strong>
          <code>{className}</code>
        </div>

        <CodePreview 
          code={`const button = buttonVariants(${JSON.stringify(props, null, 2)})
// Returns: "${className}"

// In React:
<button className={button}>Click Me!</button>`}
          language="javascript"
        />
      </>
    )
  }

  const renderBadgeDemo = () => {
    const props = { color: badgeColor, size: badgeSize }
    const className = badgeVariants(props)

    return (
      <>
        <div className="variant-controls">
          <div className="control-group">
            <label>Color:</label>
            <select value={badgeColor} onChange={(e) => setBadgeColor(e.target.value)}>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="red">Red</option>
              <option value="yellow">Yellow</option>
              <option value="purple">Purple</option>
            </select>
          </div>

          <div className="control-group">
            <label>Size:</label>
            <select value={badgeSize} onChange={(e) => setBadgeSize(e.target.value)}>
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
            </select>
          </div>
        </div>

        <div className="preview-box">
          <span className={className}>Badge Text</span>
        </div>

        <div className="info-box">
          <strong>Generated Class:</strong>
          <code>{className}</code>
        </div>

        <CodePreview 
          code={`const badge = badgeVariants(${JSON.stringify(props, null, 2)})
// Returns: "${className}"

// In React:
<span className={badge}>Badge Text</span>`}
          language="javascript"
        />
      </>
    )
  }

  const renderAlertDemo = () => {
    const props = { status: alertStatus }
    const className = alertVariants(props)

    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    }

    return (
      <>
        <div className="variant-controls">
          <div className="control-group">
            <label>Status:</label>
            <select value={alertStatus} onChange={(e) => setAlertStatus(e.target.value)}>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>

        <div className="preview-box">
          <div className={className}>
            <span className="alert-icon">{icons[alertStatus]}</span>
            <div className="alert-content">
              <div className="alert-title">Alert Title</div>
              <div>This is an alert message with nested selectors!</div>
            </div>
          </div>
        </div>

        <div className="info-box">
          <strong>Generated Class:</strong>
          <code>{className}</code>
        </div>

        <CodePreview 
          code={`const alert = alertVariants(${JSON.stringify(props, null, 2)})
// Returns: "${className}"

// In React with nested selectors:
<div className={alert}>
  <span className="alert-icon">ℹ️</span>
  <div className="alert-content">
    <div className="alert-title">Title</div>
    <div>Message</div>
  </div>
</div>`}
          language="javascript"
        />
      </>
    )
  }

  return (
    <div className="demo-container">
      <div className="demo-section">
        <h2>📦 Component Type</h2>
        <div className="component-selector">
          <button 
            className={activeComponent === 'button' ? 'active' : ''}
            onClick={() => setActiveComponent('button')}
          >
            Button Variants
          </button>
          <button 
            className={activeComponent === 'badge' ? 'active' : ''}
            onClick={() => setActiveComponent('badge')}
          >
            Badge Variants
          </button>
          <button 
            className={activeComponent === 'alert' ? 'active' : ''}
            onClick={() => setActiveComponent('alert')}
          >
            Alert Component
          </button>
        </div>
      </div>

      <div className="demo-section">
        <h2>🎛️ Variant Controls</h2>
        {activeComponent === 'button' && renderButtonDemo()}
        {activeComponent === 'badge' && renderBadgeDemo()}
        {activeComponent === 'alert' && renderAlertDemo()}
      </div>

      <div className="demo-section">
        <h2>📖 Full Configuration</h2>
        {activeComponent === 'button' && (
          <CodePreview 
            code={`const buttonVariants = twsxVariants('.btn', {
  base: 'px-4 py-2 rounded-lg font-medium transition-all',
  variants: {
    variant: {
      solid: 'border-transparent shadow-md hover:shadow-lg',
      outline: 'bg-transparent border-2',
      ghost: 'bg-transparent hover:bg-opacity-10'
    },
    color: {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      danger: 'bg-red-500 text-white hover:bg-red-600',
      success: 'bg-green-500 text-white hover:bg-green-600'
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    }
  },
  compoundVariants: [
    { variant: 'outline', color: 'primary', class: 'text-blue-600 hover:bg-blue-50' }
  ],
  defaultVariants: { variant: 'solid', color: 'primary', size: 'md' }
})`}
            language="javascript"
          />
        )}
        {activeComponent === 'badge' && (
          <CodePreview 
            code={`const badgeVariants = twsxVariants('.badge', {
  base: 'inline-block px-3 py-1 rounded-full text-sm font-semibold',
  variants: {
    color: {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      red: 'bg-red-100 text-red-800'
    },
    size: {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-2 text-base'
    }
  },
  defaultVariants: { color: 'blue', size: 'md' }
})`}
            language="javascript"
          />
        )}
        {activeComponent === 'alert' && (
          <CodePreview 
            code={`const alertVariants = twsxVariants('.alert', {
  base: 'p-4 rounded-lg border flex gap-3',
  variants: {
    status: {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      success: 'bg-green-50 border-green-200 text-green-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      error: 'bg-red-50 border-red-200 text-red-800'
    }
  },
  defaultVariants: { status: 'info' },
  nested: {
    '.alert-icon': 'flex-shrink-0 mt-0.5 text-lg',
    '.alert-content': 'flex-1',
    '.alert-title': 'font-bold mb-1'
  }
})`}
            language="javascript"
          />
        )}
      </div>
    </div>
  )
}

export default VariantsDemo
