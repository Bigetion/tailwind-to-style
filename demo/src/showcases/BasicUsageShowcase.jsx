import React from 'react'
import { useTwsx } from 'twsx-react'
import ShowcaseSection from '../components/ShowcaseSection'

export default function BasicUsageShowcase() {
  useTwsx({
    '.demo-card': [
      'bg-white rounded-xl shadow-lg p-6 transition-all duration-300',
      {
        '&:hover': 'shadow-xl transform translateY(-2px)',
        '.card-title': 'text-xl font-bold text-gray-900 mb-2',
        '.card-content': 'text-gray-600'
      }
    ]
  })

  const basicExample = `import { useTwsx } from 'twsx-react'

function MyCard() {
  useTwsx({
    '.demo-card': [
      'bg-white rounded-xl shadow-lg p-6 transition-all duration-300',
      {
        '&:hover': 'shadow-xl transform translateY(-2px)',
        '.card-title': 'text-xl font-bold text-gray-900 mb-2',
        '.card-content': 'text-gray-600'
      }
    ]
  })

  return (
    <div className="demo-card">
      <h3 className="card-title">Interactive Card</h3>
      <p className="card-content">
        This card demonstrates TWSX styling with hover effects
      </p>
    </div>
  )
}`

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Basic Usage</h1>
        <p className="text-slate-300 text-lg">
          Get started with TWSX by using the <code className="text-cyan-400 bg-slate-800 px-2 py-1 rounded">useTwsx</code> hook 
          to write Tailwind-like styles directly in your React components.
        </p>
      </div>

      <ShowcaseSection
        title="Basic example"
        description="Use TWSX to create styled components with nested selectors and pseudo-states like hover effects."
        code={basicExample}
        resizable={true}
      >
        <div className="demo-card">
          <h3 className="card-title">Interactive Card</h3>
          <p className="card-content">
            This card demonstrates TWSX styling with hover effects. Try hovering over it!
          </p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Installation"
        description="Install TWSX and start using it in your React project."
        code={`npm install twsx

# or with yarn
yarn add twsx`}
        language="bash"
      />

      <ShowcaseSection
        title="Setup with React"
        description="Wrap your app with TwsxProvider to enable theme configuration and context."
        code={`import { TwsxProvider } from 'twsx-react'

function App() {
  const config = {
    theme: {
      extend: {
        colors: {
          brand: '#3b82f6'
        }
      }
    }
  }

  return (
    <TwsxProvider config={config}>
      <YourApp />
    </TwsxProvider>
  )
}`}
      />
    </div>
  )
}