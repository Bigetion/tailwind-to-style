function CodePreview({ code, language = 'javascript', title }) {
  const formatCode = (data) => {
    if (typeof data === 'object') {
      return JSON.stringify(data, null, 2)
    }
    return String(data)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formatCode(code))
      .then(() => alert('✅ Copied to clipboard!'))
      .catch(err => console.error('Failed to copy:', err))
  }

  return (
    <div className="code-preview">
      {title && <div className="code-title">{title}</div>}
      <div className="code-header">
        <span className="code-language">{language}</span>
        <button onClick={copyToClipboard} className="copy-btn">
          📋 Copy
        </button>
      </div>
      <pre className="code-content">
        <code>{formatCode(code)}</code>
      </pre>
    </div>
  )
}

export default CodePreview
