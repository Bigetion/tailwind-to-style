import { useState, useRef } from 'react'

export default function CodeBlock({ code, label = 'js', copyable = true }) {
  const [copied, setCopied] = useState(false)
  const labels = { js: 'code-label-js', css: 'code-label-css', html: 'code-label-html', json: 'code-label-json' }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div>
      <span className={`code-label ${labels[label] || labels.js}`}>{label}</span>
      <div className="code-block">
        {copyable && (
          <button className="copy-btn" onClick={handleCopy}>
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        )}
        {code}
      </div>
    </div>
  )
}
