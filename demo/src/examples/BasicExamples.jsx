import React from 'react'
import { useTwsx } from 'twsx-react'
import CodeBlock from '../components/CodeBlock'

export default function BasicExamples() {
  // Example 1: Basic TWSX usage
  useTwsx({
    '.demo-card': [
      'bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200',
      {
        '.demo-title': 'text-xl font-bold text-gray-900 mb-4',
        '.demo-content': 'text-gray-600 leading-relaxed'
      }
    ],
    '.feature-grid': [
      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'
    ],
    '.feature-card': [
      'bg-gradient-to-br from-brand-50 to-brand-100 rounded-xl p-6 border border-brand-200 transition-all duration-300',
      {
        '&:hover': 'transform scale-105 shadow-lg from-brand-100 to-brand-200',
        '.feature-icon': 'text-3xl mb-3',
        '.feature-title': 'text-lg font-semibold text-brand-800 mb-2',
        '.feature-desc': 'text-brand-600 text-sm'
      }
    ]
  })

  const basicUsageCode = `import { useTwsx } from 'twsx-react'

function MyComponent() {
  useTwsx({
    '.my-card': [
      'bg-white rounded-lg shadow-md p-6',
      {
        '.title': 'text-xl font-bold text-gray-900',
        '.content': 'text-gray-600 mt-2',
        '&:hover': 'shadow-lg transform scale-105'
      }
    ]
  })

  return (
    <div className="my-card">
      <h2 className="title">Card Title</h2>
      <p className="content">Card content here</p>
    </div>
  )
}`

  const features = [
    {
      icon: '🎨',
      title: 'CSS-in-JS',
      desc: 'Write Tailwind-like styles directly in your React components'
    },
    {
      icon: '⚡',
      title: 'Performance',
      desc: 'Optimized with memoization and smart caching'
    },
    {
      icon: '🎯',
      title: 'Type Safe',
      desc: 'Full TypeScript support with intelligent autocomplete'
    },
    {
      icon: '🔄',
      title: 'Hot Reload',
      desc: 'Instant style updates during development'
    },
    {
      icon: '📱',
      title: 'Responsive',
      desc: 'Built-in responsive design utilities'
    },
    {
      icon: '🎭',
      title: 'Pseudo States',
      desc: 'Easy hover, focus, and other state management'
    }
  ]

  return (
    <div>
      <div className="demo-card">
        <h1 className="demo-title">🚀 Basic TWSX Usage</h1>
        <p className="demo-content">
          Welcome to the TWSX React demo! This playground demonstrates all the features 
          of TWSX library integrated with React hooks and components.
        </p>
      </div>

      <div className="feature-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-desc">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="demo-card">
        <h2 className="demo-title">📝 Basic Hook Usage</h2>
        <p className="demo-content mb-4">
          The <code className="code-inline">useTwsx</code> hook allows you to write 
          Tailwind-like styles directly in your React components with full nesting support.
        </p>
        
        <CodeBlock 
          code={basicUsageCode}
          title="Basic useTwsx Hook Example"
          language="javascript"
        />
      </div>
    </div>
  )
}