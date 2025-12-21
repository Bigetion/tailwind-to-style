import React, { useState } from 'react'
import { useTwsx } from 'twsx-react'
import CodeBlock from '../components/CodeBlock'

export default function ComponentExamples() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', message: 'Profile updated successfully!' },
    { id: 2, type: 'warning', message: 'Your subscription expires in 3 days' },
    { id: 3, type: 'info', message: 'New feature available: Dark mode' }
  ])

  useTwsx({
    '.component-showcase': [
      'bg-white rounded-lg shadow-md p-6 mb-6'
    ],
    
    // Dashboard Card Component
    '.dashboard-card': [
      'bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border border-gray-200 transition-all duration-300',
      {
        '&:hover': 'shadow-xl transform translateY(-2px)',
        '.card-header': [
          'flex items-center justify-between mb-4',
          {
            '.card-title': 'text-lg font-semibold text-gray-900',
            '.card-badge': 'px-2 py-1 bg-brand-100 text-brand-700 rounded-full text-xs font-medium'
          }
        ],
        '.card-stats': [
          'grid grid-cols-3 gap-4 mb-4',
          {
            '.stat': [
              'text-center',
              {
                '.stat-value': 'text-2xl font-bold text-gray-900',
                '.stat-label': 'text-sm text-gray-500 mt-1'
              }
            ]
          }
        ],
        '.card-chart': [
          'h-32 bg-gradient-to-r from-brand-400 to-brand-600 rounded-lg flex items-center justify-center text-white font-medium'
        ]
      }
    ],

    // Tab Component
    '.tab-container': [
      'bg-white rounded-lg shadow-md overflow-hidden mb-6',
      {
        '.tab-header': [
          'flex border-b border-gray-200',
          {
            '.tab-button': [
              'flex-1 px-6 py-3 text-sm font-medium transition-all duration-200 cursor-pointer',
              {
                '&.active': 'bg-brand-50 text-brand-600 border-b-2 border-brand-500',
                '&:not(.active)': 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }
            ]
          }
        ],
        '.tab-content': 'p-6'
      }
    ],

    // Notification Component
    '.notification-list': [
      'space-y-3 mb-6',
      {
        '.notification': [
          'flex items-start p-4 rounded-lg border-l-4 transition-all duration-300',
          {
            '&.success': 'bg-green-50 border-green-400',
            '&.warning': 'bg-yellow-50 border-yellow-400', 
            '&.info': 'bg-blue-50 border-blue-400',
            '&:hover': 'shadow-md transform translateX(4px)',
            '.notification-icon': [
              'flex-shrink-0 w-5 h-5 mt-0.5 mr-3',
              {
                '&.success': 'text-green-500',
                '&.warning': 'text-yellow-500',
                '&.info': 'text-blue-500'
              }
            ],
            '.notification-content': [
              'flex-1',
              {
                '.notification-message': 'text-sm font-medium text-gray-900',
                '.notification-time': 'text-xs text-gray-500 mt-1'
              }
            ],
            '.notification-close': [
              'flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 cursor-pointer'
            ]
          }
        ]
      }
    ],

    // Form Component
    '.form-container': [
      'bg-white rounded-lg shadow-md p-6',
      {
        '.form-group': [
          'mb-4',
          {
            '.form-label': 'block text-sm font-medium text-gray-700 mb-2',
            '.form-input': [
              'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200',
              {
                '&:focus': 'outline-none shadow-sm',
                '&.error': 'border-red-500 focus:ring-red-500 focus:border-red-500'
              }
            ],
            '.form-error': 'text-sm text-red-600 mt-1'
          }
        ],
        '.form-actions': [
          'flex gap-3 pt-4',
          {
            '.btn': [
              'px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer',
              {
                '&.primary': 'bg-brand-500 text-white hover:bg-brand-600 shadow-sm hover:shadow-md',
                '&.secondary': 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            ]
          }
        ]
      }
    ]
  })

  const componentCode = `import { useTwsx } from 'twsx-react'

function DashboardCard({ title, stats, badge }) {
  useTwsx({
    '.dashboard-card': [
      'bg-white rounded-xl shadow-lg p-6 transition-all duration-300',
      {
        '&:hover': 'shadow-xl transform translateY(-2px)',
        '.card-header': 'flex items-center justify-between mb-4',
        '.card-title': 'text-lg font-semibold text-gray-900',
        '.card-badge': 'px-2 py-1 bg-brand-100 text-brand-700 rounded-full text-xs'
      }
    ]
  })

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <span className="card-badge">{badge}</span>
      </div>
      {/* Card content */}
    </div>
  )
}`

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return '✓'
      case 'warning': return '⚠'
      case 'info': return 'ℹ'
      default: return '•'
    }
  }

  return (
    <div>
      <div className="component-showcase">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">🧩 Component Examples</h1>
        <p className="text-gray-600">
          Real-world component examples showing how TWSX can be used to build 
          complex, interactive UI components with clean, maintainable styles.
        </p>
      </div>

      {/* Dashboard Card */}
      <div className="dashboard-card">
        <div className="card-header">
          <h3 className="card-title">Analytics Dashboard</h3>
          <span className="card-badge">Live</span>
        </div>
        <div className="card-stats">
          <div className="stat">
            <div className="stat-value">12.5K</div>
            <div className="stat-label">Users</div>
          </div>
          <div className="stat">
            <div className="stat-value">$45.2K</div>
            <div className="stat-label">Revenue</div>
          </div>
          <div className="stat">
            <div className="stat-value">98.5%</div>
            <div className="stat-label">Uptime</div>
          </div>
        </div>
        <div className="card-chart">
          📊 Interactive Chart Area
        </div>
      </div>

      {/* Tab Component */}
      <div className="tab-container">
        <div className="tab-header">
          {['dashboard', 'analytics', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="tab-content">
          <h3 className="text-lg font-semibold mb-2">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Content
          </h3>
          <p className="text-gray-600">
            This is the content for the {activeTab} tab. The active tab styling 
            is handled dynamically with TWSX conditional classes.
          </p>
        </div>
      </div>

      {/* Notifications */}
      <div className="notification-list">
        {notifications.map((notification) => (
          <div key={notification.id} className={`notification ${notification.type}`}>
            <div className={`notification-icon ${notification.type}`}>
              {getNotificationIcon(notification.type)}
            </div>
            <div className="notification-content">
              <div className="notification-message">{notification.message}</div>
              <div className="notification-time">2 minutes ago</div>
            </div>
            <div 
              className="notification-close"
              onClick={() => removeNotification(notification.id)}
            >
              ×
            </div>
          </div>
        ))}
      </div>

      {/* Form Component */}
      <div className="form-container">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Form</h3>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input type="text" className="form-input" placeholder="Enter your name" />
        </div>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input type="email" className="form-input" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label className="form-label">Message</label>
          <textarea className="form-input" rows="4" placeholder="Enter your message"></textarea>
        </div>
        <div className="form-actions">
          <button className="btn primary">Send Message</button>
          <button className="btn secondary">Cancel</button>
        </div>
      </div>

      <div className="component-showcase">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📝 Component Code Example</h2>
        <CodeBlock 
          code={componentCode}
          title="Dashboard Card Component"
          language="javascript"
        />
      </div>
    </div>
  )
}