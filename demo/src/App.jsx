import { useState } from 'react'
import { TwsxProvider, useTwsx } from 'twsx-react'
import Sidebar from './components/Sidebar'
import ShowcaseContent from './components/ShowcaseContent'

// TWSX Configuration
const twsxConfig = {
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
        }
      }
    }
  }
}

const showcaseItems = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    category: 'Getting Started'
  },
  {
    id: 'react-hooks',
    title: 'React Hooks',
    category: 'Getting Started'
  },
  {
    id: 'animations',
    title: 'Animations',
    category: 'Features'
  },
  {
    id: 'components',
    title: 'Components',
    category: 'Features'
  },
  {
    id: 'performance',
    title: 'Performance',
    category: 'Advanced'
  }
]

function App() {
  const [activeItem, setActiveItem] = useState('basic-usage')

  // Generate base layout CSS
  useTwsx({
    '.app-container': [
      'min-h-screen bg-slate-900 text-white',
      {
        '.app-layout': 'flex'
      }
    ]
  })

  return (
    <TwsxProvider config={twsxConfig}>
      <div className="app-container">
        <div className="app-layout">
          <Sidebar 
            items={showcaseItems}
            activeItem={activeItem}
            onItemChange={setActiveItem}
          />
          <ShowcaseContent activeItem={activeItem} />
        </div>
      </div>
    </TwsxProvider>
  )
}

export default App