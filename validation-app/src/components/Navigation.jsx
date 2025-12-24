import React from 'react'
import { useTwsx } from 'tailwind-to-style/react'

const testCategories = [
  { id: 'twsx', name: 'Advanced twsx() Function ⭐', icon: '⚡' },
  { id: 'styled', name: 'Styled Components', icon: '🎨' },
  { id: 'variants', name: 'Type-safe Variants', icon: '🎭' },
  { id: 'responsive', name: 'Responsive Design', icon: '📱' },
  { id: 'animations', name: 'Animations & Transitions', icon: '🎬' },
  { id: 'theme', name: 'Theme Customization', icon: '🎨' },
  { id: 'plugins', name: 'Custom Plugins', icon: '🔌' },
  { id: 'basic', name: 'Basic tws() Function', icon: '🔧' },
  { id: 'performance', name: 'Performance Tests', icon: '⚡' },
  { id: 'edge-cases', name: 'Edge Cases', icon: '🐛' },
]

function Navigation({ activeTest, setActiveTest, results }) {
  useTwsx({
    '.nav-sidebar': [
      'w-80 bg-white shadow-lg border-r border-gray-200 h-screen overflow-y-auto',
      {
        '.nav-title': 'px-6 py-4 border-b border-gray-200 font-semibold text-gray-900',
        '.nav-list': 'p-4 space-y-2',
        '.nav-item': [
          'flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all duration-200',
          'hover:bg-gray-50 border border-transparent',
          {
            '&.active': 'bg-brand-50 border-brand-200 text-brand-700',
            '&.passed': 'border-l-4 border-l-success',
            '&.failed': 'border-l-4 border-l-error',
            '.nav-icon': 'text-xl mr-3',
            '.nav-text': 'flex-1 font-medium',
            '.nav-status': 'text-xs px-2 py-1 rounded-full font-semibold',
            '.nav-status.passed': 'bg-green-100 text-green-800',
            '.nav-status.failed': 'bg-red-100 text-red-800',
            '.nav-status.running': 'bg-yellow-100 text-yellow-800',
          }
        ]
      }
    ]
  })

  const getTestStatus = (testId) => {
    const result = results[testId]
    if (!result) return null
    return result.passed ? 'passed' : 'failed'
  }

  return (
    <nav className="nav-sidebar">
      <div className="nav-title">Test Categories</div>
      <ul className="nav-list">
        {testCategories.map((category) => {
          const status = getTestStatus(category.id)
          return (
            <li
              key={category.id}
              className={`nav-item ${activeTest === category.id ? 'active' : ''} ${status || ''}`}
              onClick={() => setActiveTest(category.id)}
            >
              <span className="nav-icon">{category.icon}</span>
              <span className="nav-text">{category.name}</span>
              {status && (
                <span className={`nav-status ${status}`}>
                  {status === 'passed' ? '✓' : '✗'}
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navigation