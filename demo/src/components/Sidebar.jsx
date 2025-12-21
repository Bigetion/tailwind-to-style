import React from 'react'
import { useTwsx } from 'twsx-react'

export default function Sidebar({ items, activeItem, onItemChange }) {
  useTwsx({
    '.sidebar': [
      'w-64 bg-slate-800 border-r border-slate-700 min-h-screen overflow-y-auto'
    ],
    '.sidebar-header': [
      'p-6 border-b border-slate-700',
      {
        '.logo': [
          'flex items-center gap-3',
          {
            '.logo-icon': 'w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm',
            '.logo-text': 'text-xl font-bold text-white',
            '.logo-version': 'text-xs text-slate-400 ml-2 px-2 py-1 bg-slate-700 rounded'
          }
        ]
      }
    ],
    '.sidebar-nav': [
      'p-4',
      {
        '.nav-category': [
          'mb-6',
          {
            '.category-title': 'text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3',
            '.category-items': 'space-y-1'
          }
        ],
        '.nav-item': [
          'block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 cursor-pointer',
          {
            '&.active': 'bg-slate-700 text-white font-medium',
            '&:not(.active)': 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }
        ]
      }
    ]
  })

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {})

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">T</div>
          <span className="logo-text">TWSX</span>
          <span className="logo-version">v2.12.0</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <div key={category} className="nav-category">
            <h3 className="category-title">{category}</h3>
            <div className="category-items">
              {categoryItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onItemChange(item.id)}
                  className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  )
}