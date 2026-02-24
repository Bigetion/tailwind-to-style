import { useState } from 'react'
import TwsDemo from './components/TwsDemo'
import TwsxDemo from './components/TwsxDemo'
import VariantsDemo from './components/VariantsDemo'

function App() {
  const [activeTab, setActiveTab] = useState('tws')

  return (
    <div className="app">
      <header className="header">
        <h1>🎮 tailwind-to-style Test App</h1>
        <p>Interactive testing playground for all library functions</p>
      </header>

      <nav className="tabs">
        <button 
          className={`tab ${activeTab === 'tws' ? 'active' : ''}`}
          onClick={() => setActiveTab('tws')}
        >
          tws()
        </button>
        <button 
          className={`tab ${activeTab === 'twsx' ? 'active' : ''}`}
          onClick={() => setActiveTab('twsx')}
        >
          twsx()
        </button>
        <button 
          className={`tab ${activeTab === 'variants' ? 'active' : ''}`}
          onClick={() => setActiveTab('variants')}
        >
          twsxVariants()
        </button>
      </nav>

      <main className="content">
        {activeTab === 'tws' && <TwsDemo />}
        {activeTab === 'twsx' && <TwsxDemo />}
        {activeTab === 'variants' && <VariantsDemo />}
      </main>

      <footer className="footer">
        <p>
          💡 <strong>Tip:</strong> Open browser DevTools to see console output and inspect styles
        </p>
      </footer>
    </div>
  )
}

export default App
