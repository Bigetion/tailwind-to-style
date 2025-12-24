import React from 'react'
import { useTwsx } from 'tailwind-to-style/react'

function TestContainer({ title, description, testResults, children }) {
  useTwsx({
    '.test-container': [
      'bg-white rounded-xl shadow-lg p-8 mb-8',
      {
        '.test-header': 'mb-8 pb-6 border-b border-gray-200',
        '.test-title': 'text-3xl font-bold text-gray-900 mb-3',
        '.test-description': 'text-gray-600 text-lg leading-relaxed',
        '.test-stats': [
          'flex items-center gap-6 mt-4 p-4 bg-gray-50 rounded-lg',
          {
            '.stat-item': 'flex items-center gap-2',
            '.stat-label': 'font-medium text-gray-700',
            '.stat-value': 'font-bold',
            '.stat-value.passed': 'text-green-600',
            '.stat-value.failed': 'text-red-600',
            '.stat-value.total': 'text-blue-600',
          }
        ],
        '.test-results': 'space-y-6',
        '.test-item': [
          'border border-gray-200 rounded-lg p-6 transition-all duration-200',
          {
            '&.passed': 'border-green-200 bg-green-50',
            '&.failed': 'border-red-200 bg-red-50',
            '.test-item-header': 'flex items-start justify-between mb-4',
            '.test-item-title': 'font-semibold text-gray-900 text-lg',
            '.test-item-status': [
              'px-3 py-1 rounded-full text-sm font-medium',
              {
                '&.passed': 'bg-green-100 text-green-800',
                '&.failed': 'bg-red-100 text-red-800',
              }
            ],
            '.test-item-description': 'text-gray-600 mb-4',
            '.test-item-output': [
              'bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto',
              {
                'pre': 'whitespace-pre-wrap',
              }
            ],
            '.test-item-expected': 'text-sm text-gray-500 mt-2 italic',
            '.test-item-error': 'text-red-600 font-medium mt-2',
          }
        ]
      }
    ]
  })

  const passedCount = testResults?.filter(r => r.passed).length || 0
  const totalCount = testResults?.length || 0
  const failedCount = totalCount - passedCount

  return (
    <div className="test-container">
      <div className="test-header">
        <h2 className="test-title">{title}</h2>
        <p className="test-description">{description}</p>
        
        {testResults && testResults.length > 0 && (
          <div className="test-stats">
            <div className="stat-item">
              <span className="stat-label">Total:</span>
              <span className="stat-value total">{totalCount}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Passed:</span>
              <span className="stat-value passed">{passedCount}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Failed:</span>
              <span className="stat-value failed">{failedCount}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Success Rate:</span>
              <span className={`stat-value ${passedCount === totalCount ? 'passed' : 'failed'}`}>
                {totalCount > 0 ? Math.round((passedCount / totalCount) * 100) : 0}%
              </span>
            </div>
          </div>
        )}
      </div>

      {children}

      {testResults && testResults.length > 0 && (
        <div className="test-results">
          {testResults.map((test, index) => (
            <div key={index} className={`test-item ${test.passed ? 'passed' : 'failed'}`}>
              <div className="test-item-header">
                <h3 className="test-item-title">{test.name}</h3>
                <span className={`test-item-status ${test.passed ? 'passed' : 'failed'}`}>
                  {test.passed ? '✓ PASSED' : '✗ FAILED'}
                </span>
              </div>
              
              <p className="test-item-description">{test.description}</p>
              
              {test.output && (
                <div className="test-item-output">
                  <pre>{test.output}</pre>
                </div>
              )}
              
              {test.expected && (
                <p className="test-item-expected">Expected: {test.expected}</p>
              )}
              
              {test.error && (
                <p className="test-item-error">Error: {test.error}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TestContainer