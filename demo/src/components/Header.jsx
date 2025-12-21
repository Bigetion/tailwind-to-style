import React from 'react'
import { useTwsx } from 'twsx-react'

export default function Header() {
  useTwsx({
    '.header': [
      'bg-white shadow-sm border-b border-gray-200 px-6 py-4',
      {
        '.title': 'text-2xl font-bold text-gray-900',
        '.subtitle': 'text-gray-600 mt-1',
        '.badge': [
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-800 ml-3'
        ]
      }
    ]
  })

  return (
    <header className="header">
      <div className="max-w-7xl mx-auto">
        <h1 className="title">
          🚀 TWSX React Demo
          <span className="badge">v2.12.0</span>
        </h1>
        <p className="subtitle">
          Live testing playground for TWSX library with React integration
        </p>
      </div>
    </header>
  )
}