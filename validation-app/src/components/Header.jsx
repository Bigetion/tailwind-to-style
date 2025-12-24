import React from 'react'
import { useTwsx } from 'tailwind-to-style/react'

function Header() {
  useTwsx({
    '.header': [
      'bg-brand-600 text-white shadow-lg',
      {
        '.header-content': 'max-w-7xl mx-auto px-6 py-4',
        '.header-title': 'text-3xl font-bold',
        '.header-subtitle': 'text-brand-100 mt-1',
        '.header-badge': [
          'inline-block bg-brand-500 text-xs px-2 py-1 rounded-full ml-3',
          {
            '&:hover': 'bg-brand-400 transform scale-105',
          }
        ]
      }
    ]
  })

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">
          Tailwind-to-Style Validation Suite
          <span className="header-badge">v2.11.7</span>
        </h1>
        <p className="header-subtitle">
          Comprehensive testing for all library features and edge cases
        </p>
      </div>
    </header>
  )
}

export default Header