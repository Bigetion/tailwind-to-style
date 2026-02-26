import { useState } from 'react'
import { performanceUtils } from 'tailwind-to-style'
import {
  Zap, Paintbrush, Puzzle, Link2,
  Rainbow, SlidersHorizontal, RotateCw, Sparkles,
  Settings, BarChart3, Gamepad2, Palette
} from 'lucide-react'

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
      { id: 'tws',      icon: Zap,                name: 'tws()' },
      { id: 'twsx',     icon: Paintbrush,          name: 'twsx()' },
      { id: 'variants', icon: Puzzle,              name: 'twsxVariants()' },
      { id: 'cx',       icon: Link2,               name: 'cx()' },
    ],
  },
  {
    label: 'Visual Features',
    items: [
      { id: 'gradients',  icon: Rainbow,             name: 'Gradients' },
      { id: 'filters',    icon: SlidersHorizontal,   name: 'Filters & Backdrop' },
      { id: 'transforms', icon: RotateCw,             name: 'Transforms' },
      { id: 'animations', icon: Sparkles,            name: 'Animations' },
    ],
  },
  {
    label: 'Advanced',
    items: [
      { id: 'config',      icon: Settings,            name: 'configure()' },
      { id: 'performance', icon: BarChart3,            name: 'Performance' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { id: 'playground', icon: Gamepad2,             name: 'Playground' },
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
          <Palette size={20} /> tailwind-to-style
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
                <span className="sidebar-icon"><item.icon size={16} /></span>
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
