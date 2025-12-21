import React from 'react'
import { useTwsx } from 'twsx-react'

export default function Navigation({ examples, activeExample, onExampleChange }) {
  useTwsx({
    '.nav-sidebar': [
      'w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen p-4'
    ],
    '.nav-title': [
      'text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4'
    ],
    '.nav-item': [
      'block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 mb-1',
      {
        '&.active': 'bg-brand-100 text-brand-700 shadow-sm',
        '&:not(.active)': 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
        '&:not(.active):hover': 'transform translate-x-1'
      }
    ]
  })

  return (
    <nav className="nav-sidebar">
      <h2 className="nav-title">Examples</h2>
      <div>
        {examples.map((example) => (
          <button
            key={example.id}
            onClick={() => onExampleChange(example.id)}
            className={`nav-item ${activeExample === example.id ? 'active' : ''}`}
          >
            {example.title}
          </button>
        ))}
      </div>
      
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="nav-title">Features</h3>
        <div className="space-y-2 text-xs text-gray-500">
          <div>✅ Dynamic Animations</div>
          <div>✅ React Hooks</div>
          <div>✅ CSS-in-JS</div>
          <div>✅ Theme Support</div>
          <div>✅ Performance Optimized</div>
        </div>
      </div>
    </nav>
  )
}