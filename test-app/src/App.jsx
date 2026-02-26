import { useState } from 'react'
import { performanceUtils } from 'tailwind-to-style'

// Pages
import TwsPage from './pages/TwsPage'
import TwsxPage from './pages/TwsxPage'
import VariantsPage from './pages/VariantsPage'
import CxPage from './pages/CxPage'
import ConfigPage from './pages/ConfigPage'
import FiltersPage from './pages/FiltersPage'
import TransformsPage from './pages/TransformsPage'
import GradientsPage from './pages/GradientsPage'
import AnimationsPage from './pages/AnimationsPage'
import PerformancePage from './pages/PerformancePage'
import PlaygroundPage from './pages/PlaygroundPage'

const NAV = [
  {
    label: 'Core API',
    items: [
      { id: 'tws',      icon: '⚡', name: 'tws()' },
      { id: 'twsx',     icon: '🎨', name: 'twsx()' },
      { id: 'variants', icon: '🧩', name: 'twsxVariants()' },
      { id: 'cx',       icon: '🔗', name: 'cx()' },
    ],
  },
  {
    label: 'Visual Features',
    items: [
      { id: 'gradients',  icon: '🌈', name: 'Gradients' },
      { id: 'filters',    icon: '🔍', name: 'Filters & Backdrop' },
      { id: 'transforms', icon: '🔄', name: 'Transforms' },
      { id: 'animations', icon: '✨', name: 'Animations' },
    ],
  },
  {
    label: 'Advanced',
    items: [
      { id: 'config',      icon: '⚙️', name: 'configure()' },
      { id: 'performance', icon: '📊', name: 'Performance' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { id: 'playground', icon: '🎮', name: 'Playground' },
    ],
  },
]

const PAGES = {
  tws: TwsPage,
  twsx: TwsxPage,
  variants: VariantsPage,
  cx: CxPage,
  config: ConfigPage,
  filters: FiltersPage,
  transforms: TransformsPage,
  gradients: GradientsPage,
  animations: AnimationsPage,
  performance: PerformancePage,
  playground: PlaygroundPage,
}

export default function App() {
  const [page, setPage] = useState('tws')
  const Page = PAGES[page]

  return (
    <div className="layout">
      {/* ── Topbar ── */}
      <header className="topbar">
        <div className="topbar-brand">
          <span>🎨</span> tailwind-to-style
        </div>
        <div className="topbar-meta">
          <span className="topbar-badge">v3.2.0</span>
          <span>Playground</span>
        </div>
      </header>

      {/* ── Sidebar ── */}
      <nav className="sidebar">
        {NAV.map(group => (
          <div key={group.label} className="sidebar-group">
            <span className="sidebar-label">{group.label}</span>
            {group.items.map(item => (
              <button
                key={item.id}
                className={`sidebar-item ${page === item.id ? 'active' : ''}`}
                onClick={() => setPage(item.id)}
              >
                <span className="sidebar-icon">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* ── Main ── */}
      <main className="main">
        <Page />
      </main>
    </div>
  )
}
