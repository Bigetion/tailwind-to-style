import React, { useState } from 'react'
import { useTwsx } from 'twsx-react'
import ShowcaseSection from '../components/ShowcaseSection'

export default function ComponentsShowcase() {
  const [activeTab, setActiveTab] = useState('overview')
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', message: 'Profile updated successfully!' },
    { id: 2, type: 'warning', message: 'Your subscription expires in 3 days' }
  ])

  useTwsx({
    // Dashboard Card
    '.dashboard-card': [
      'bg-white rounded-xl shadow-lg p-6 border border-gray-200 transition-all duration-300',
      {
        '&:hover': 'shadow-xl transform translateY(-2px)',
        '.card-header': [
          'flex items-center justify-between mb-4',
          {
            '.card-title': 'text-lg font-semibold text-gray-900',
            '.card-badge': 'px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium'
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
        '.card-chart': 'h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-medium'
      }
    ],

    // Tab Component
    '.tab-container': [
      'bg-white rounded-lg shadow-md overflow-hidden',
      {
        '.tab-header': [
          'flex border-b border-gray-200',
          {
            '.tab-button': [
              'flex-1 px-6 py-3 text-sm font-medium transition-all duration-200 cursor-pointer',
              {
                '&.active': 'bg-blue-50 text-blue-600 border-b-2 border-blue-500',
                '&:not(.active)': 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }
            ]
          }
        ],
        '.tab-content': 'p-6'
      }
    ],

    // Notification Component
    '.notification': [
      'flex items-start p-4 rounded-lg border-l-4 transition-all duration-300 mb-3',
      {
        '&.success': 'bg-green-50 border-green-400',
        '&.warning': 'bg-yellow-50 border-yellow-400',
        '&:hover': 'shadow-md transform translateX(2px)',
        '.notification-icon': [
          'flex-shrink-0 w-5 h-5 mt-0.5 mr-3',
          {
            '&.success': 'text-green-500',
            '&.warning': 'text-yellow-500'
          }
        ],
        '.notification-content': [
          'flex-1',
          {
            '.notification-message': 'text-sm font-medium text-gray-900',
            '.notification-time': 'text-xs text-gray-500 mt-1'
          }
        ],
        '.notification-close': 'flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 cursor-pointer'
      }
    ]
  })

  const dashboardCode = `import { useTwsx } from 'twsx-react'

function DashboardCard() {
  useTwsx({
    '.dashboard-card': [
      'bg-white rounded-xl shadow-lg p-6 transition-all duration-300',
      {
        '&:hover': 'shadow-xl transform translateY(-2px)',
        '.card-header': 'flex items-center justify-between mb-4',
        '.card-title': 'text-lg font-semibold text-gray-900',
        '.card-badge': 'px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs',
        '.card-stats': 'grid grid-cols-3 gap-4 mb-4',
        '.stat-value': 'text-2xl font-bold text-gray-900',
        '.stat-label': 'text-sm text-gray-500 mt-1'
      }
    ]
  })

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h3 className="card-title">Analytics</h3>
        <span className="card-badge">Live</span>
      </div>
      <div className="card-stats">
        <div className="stat">
          <div className="stat-value">12.5K</div>
          <div className="stat-label">Users</div>
        </div>
        {/* More stats... */}
      </div>
    </div>
  )
}`

  const tabCode = `import { useTwsx } from 'twsx-react'
import { useState } from 'react'

function TabComponent() {
  const [activeTab, setActiveTab] = useState('overview')
  
  useTwsx({
    '.tab-container': [
      'bg-white rounded-lg shadow-md overflow-hidden',
      {
        '.tab-button': [
          'flex-1 px-6 py-3 text-sm font-medium transition-all duration-200',
          {
            '&.active': 'bg-blue-50 text-blue-600 border-b-2 border-blue-500',
            '&:not(.active)': 'text-gray-500 hover:text-gray-700'
          }
        ]
      }
    ]
  })

  return (
    <div className="tab-container">
      <div className="tab-header">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={\`tab-button \${activeTab === tab ? 'active' : ''}\`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-content">
        Content for {activeTab}
      </div>
    </div>
  )
}`

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Components</h1>
        <p className="text-slate-300 text-lg">
          Real-world component examples showing how TWSX can be used to build 
          complex, interactive UI components with clean, maintainable styles.
        </p>
      </div>

      <ShowcaseSection
        title="Dashboard card"
        description="A responsive dashboard card with hover effects, stats grid, and interactive elements."
        code={dashboardCode}
        resizable={true}
      >
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
            📊 Chart Area
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Tab component"
        description="Interactive tabs with active state styling and smooth transitions."
        code={tabCode}
        resizable={true}
      >
        <div className="tab-container">
          <div className="tab-header">
            {['overview', 'analytics', 'settings'].map((tab) => (
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
      </ShowcaseSection>

      <ShowcaseSection
        title="Notification system"
        description="Dismissible notifications with different types and hover animations."
        resizable={false}
      >
        <div>
          {notifications.map((notification) => (
            <div key={notification.id} className={`notification ${notification.type}`}>
              <div className={`notification-icon ${notification.type}`}>
                {notification.type === 'success' ? '✓' : '⚠'}
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
          
          {notifications.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              All notifications cleared! 🎉
            </div>
          )}
        </div>
      </ShowcaseSection>
    </div>
  )
}