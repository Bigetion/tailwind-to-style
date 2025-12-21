import React, { useState } from 'react'
import { useTwsx } from 'twsx-react'

export default function CodeBlock({ code, language = 'javascript', title }) {
  const [copied, setCopied] = useState(false)

  useTwsx({
    '.code-container': [
      'relative bg-gray-900 rounded-lg overflow-hidden shadow-lg mb-6'
    ],
    '.code-header': [
      'flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700',
      {
        '.code-title': 'text-sm font-medium text-gray-300',
        '.copy-btn': [
          'px-3 py-1 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors duration-200',
          {
            '&.copied': 'bg-green-600 text-white'
          }
        ]
      }
    ],
    '.code-content': [
      'p-4 overflow-x-auto',
      {
        'pre': 'text-sm text-gray-100 font-mono leading-relaxed',
        'code': 'text-sm text-gray-100 font-mono'
      }
    ]
  })

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <div className="code-container">
      {title && (
        <div className="code-header">
          <span className="code-title">{title}</span>
          <button 
            onClick={handleCopy}
            className={`copy-btn ${copied ? 'copied' : ''}`}
          >
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <div className="code-content">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}