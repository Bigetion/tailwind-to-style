import React, { useState } from 'react'
import { useTwsx } from 'twsx-react'

export default function ShowcaseSection({ 
  title, 
  description, 
  code, 
  language = 'javascript',
  children, 
  resizable = false 
}) {
  const [copied, setCopied] = useState(false)

  useTwsx({
    '.showcase-section': [
      'mb-12',
      {
        '.section-header': [
          'mb-6',
          {
            '.section-title': 'text-2xl font-bold text-white mb-3',
            '.section-description': 'text-slate-300 leading-relaxed'
          }
        ],
        '.section-content': [
          'grid gap-6',
          {
            '&.has-demo': 'lg:grid-cols-2',
            '&:not(.has-demo)': 'grid-cols-1'
          }
        ]
      }
    ],
    '.demo-container': [
      'bg-slate-800 rounded-xl border border-slate-700 overflow-hidden',
      {
        '.demo-header': [
          'flex items-center justify-between px-4 py-3 bg-slate-700/50 border-b border-slate-600',
          {
            '.demo-title': 'text-sm font-medium text-slate-300',
            '.resize-hint': 'text-xs text-slate-400 flex items-center gap-2'
          }
        ],
        '.demo-content': [
          'p-6',
          {
            '&.resizable': 'resize overflow-auto min-h-48 max-h-96'
          }
        ]
      }
    ],
    '.code-container': [
      'bg-slate-900 rounded-xl border border-slate-700 overflow-hidden',
      {
        '.code-header': [
          'flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700',
          {
            '.code-language': 'text-sm font-medium text-slate-300',
            '.copy-button': [
              'px-3 py-1 text-xs bg-slate-700 text-slate-300 rounded hover:bg-slate-600 transition-colors duration-200',
              {
                '&.copied': 'bg-green-600 text-white'
              }
            ]
          }
        ],
        '.code-content': [
          'p-4 overflow-x-auto',
          {
            'pre': 'text-sm text-slate-100 font-mono leading-relaxed',
            'code': 'text-sm text-slate-100 font-mono'
          }
        ]
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
    <div className="showcase-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        {description && (
          <p className="section-description">{description}</p>
        )}
      </div>

      <div className={`section-content ${children ? 'has-demo' : ''}`}>
        {children && (
          <div className="demo-container">
            <div className="demo-header">
              <span className="demo-title">Preview</span>
              {resizable && (
                <span className="resize-hint">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  Resize to see behavior
                </span>
              )}
            </div>
            <div className={`demo-content ${resizable ? 'resizable' : ''}`}>
              {children}
            </div>
          </div>
        )}

        {code && (
          <div className="code-container">
            <div className="code-header">
              <span className="code-language">{language}</span>
              <button 
                onClick={handleCopy}
                className={`copy-button ${copied ? 'copied' : ''}`}
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <div className="code-content">
              <pre>
                <code>{code}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}