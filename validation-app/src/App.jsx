import React, { useState } from 'react'
import { TwsxProvider, useTwsx } from 'tailwind-to-style/react'
import Header from './components/Header'
import Navigation from './components/Navigation'
import TestSuite from './components/TestSuite'

// Custom theme configuration for testing
const themeConfig = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          500: '#f59e0b',
          600: '#d97706',
        },
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in forwards',
        'slide-up': 'slideUp 0.5s ease-out',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
    },
  },
}

function AppContent() {
  const [activeTest, setActiveTest] = useState('twsx') // Start with twsx as main focus
  const [results, setResults] = useState({})

  useTwsx({
    '.app-container': 'min-h-screen bg-gray-50',
    '.app-layout': 'flex',
    '.app-main': 'flex-1 p-6'
  })

  const updateResult = (testName, result) => {
    setResults(prev => ({
      ...prev,
      [testName]: result
    }))
  }

  return (
    <div className="app-container">
      <Header />
      <div className="app-layout">
        <Navigation 
          activeTest={activeTest} 
          setActiveTest={setActiveTest}
          results={results}
        />
        <main className="app-main">
          <TestSuite 
            activeTest={activeTest}
            updateResult={updateResult}
            results={results}
          />
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <TwsxProvider config={themeConfig}>
      <AppContent />
    </TwsxProvider>
  )
}

export default App