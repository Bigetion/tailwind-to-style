import { useState } from 'react'
import { styled, tv, TwsxProvider } from 'tailwind-to-style/react'

// 1. TV - Type-safe Variants
const buttonVariants = tv({
  base: 'px-4 py-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2',
  variants: {
    color: {
      blue: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      red: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      green: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    },
    size: {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
    },
  },
  defaultVariants: {
    color: 'blue',
    size: 'md',
  },
})

// 2. Styled Components
const Button = styled('button', buttonVariants)

const Card = styled('div', {
  base: 'bg-white rounded-xl shadow-lg p-6 transition-transform',
  hover: 'scale-105 shadow-xl',
  
  nested: {
    'h2': 'text-2xl font-bold text-gray-900 mb-2',
    'p': 'text-gray-600 leading-relaxed',
    
    '.card-badge': 'inline-block px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-bold mt-2',
  },
})

const Input = styled('input', {
  base: 'w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none',
  focus: 'border-blue-500 ring-2 ring-blue-200',
  
  variants: {
    error: {
      true: 'border-red-500 focus:border-red-500 focus:ring-red-200',
    },
  },
})

const Container = styled('div', {
  base: 'min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8',
  
  nested: {
    '.grid': 'grid gap-6 max-w-4xl mx-auto',
  },
})

function App() {
  const [email, setEmail] = useState('')
  const [count, setCount] = useState(0)

  return (
    <TwsxProvider>
      <Container>
        <div className="grid">
          
          {/* Hero Card */}
          <Card>
            <h2>🚀 tailwind-to-style Demo</h2>
            <p>
              Testing styled() components, tv() variants, dan nested styles.
              Semua dengan zero runtime overhead!
            </p>
            <span className="card-badge">v2.11.3</span>
          </Card>

          {/* Simple Test Button */}
          <Card>
            <h2>Simple Test</h2>
            <p style={{ marginBottom: '1rem' }}>
              Test button dengan class langsung (tanpa styled)
            </p>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => console.log('Direct button clicked')}
            >
              Direct Button (Blue)
            </button>
            <button 
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 ml-2"
              onClick={() => console.log('Direct button clicked')}
            >
              Direct Button (Red)
            </button>
            <div style={{ marginTop: '1rem' }}>
              <Button 
                color="blue" 
                size="md"
                onClick={() => console.log('Styled button - Blue clicked', { color: 'blue', size: 'md' })}
              >
                Styled Button (Blue)
              </Button>
              <Button 
                color="red" 
                size="md"
                onClick={() => console.log('Styled button - Red clicked', { color: 'red', size: 'md' })}
                style={{ marginLeft: '0.5rem' }}
              >
                Styled Button (Red)
              </Button>
            </div>
          </Card>

          {/* Counter Demo */}
          <Card>
            <h2>Counter: {count}</h2>
            <p style={{ marginBottom: '1rem' }}>
              Test button variants dengan berbagai size dan color
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button size="sm" color="blue" onClick={() => setCount(count + 1)}>
                +1 (Small)
              </Button>
              <Button size="md" color="green" onClick={() => setCount(count + 5)}>
                +5 (Medium)
              </Button>
              <Button size="lg" color="red" onClick={() => setCount(0)}>
                Reset (Large)
              </Button>
            </div>
          </Card>

          {/* Button Showcase */}
          <Card>
            <h2>Button Variants Showcase</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Semua kombinasi color dan size dari tv() variants
            </p>
            
            {/* Blue Buttons */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1f2937' }}>
                Blue Buttons
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <Button size="sm" color="blue">Small</Button>
                <Button size="md" color="blue">Medium</Button>
                <Button size="lg" color="blue">Large</Button>
                <Button size="md" color="blue" disabled>Disabled</Button>
              </div>
            </div>

            {/* Green Buttons */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1f2937' }}>
                Green Buttons
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <Button size="sm" color="green">Small</Button>
                <Button size="md" color="green">Medium</Button>
                <Button size="lg" color="green">Large</Button>
                <Button size="md" color="green" disabled>Disabled</Button>
              </div>
            </div>

            {/* Red Buttons */}
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1f2937' }}>
                Red Buttons
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <Button size="sm" color="red">Small</Button>
                <Button size="md" color="red">Medium</Button>
                <Button size="lg" color="red">Large</Button>
                <Button size="md" color="red" disabled>Disabled</Button>
              </div>
            </div>
          </Card>

          {/* Form Demo */}
          <Card>
            <h2>Form Input</h2>
            <p style={{ marginBottom: '1rem' }}>
              Input dengan focus states dan validation
            </p>
            <Input
              type="email"
              placeholder="Masukkan email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={email && !email.includes('@')}
            />
            {email && !email.includes('@') && (
              <p style={{ color: '#ef4444', marginTop: '0.5rem', fontSize: '0.875rem' }}>
                Email harus mengandung @
              </p>
            )}
          </Card>

          {/* Nested Styles Demo */}
          <Card>
            <h2>Nested Styles</h2>
            <p>
              Card ini punya nested styles untuk h2, p, dan .card-badge.
              Semua digenerate otomatis dengan class unik!
            </p>
            <span className="card-badge">Nested ✓</span>
            <span className="card-badge" style={{ marginLeft: '0.5rem' }}>
              Hover me!
            </span>
          </Card>

        </div>
      </Container>
    </TwsxProvider>
  )
}

export default App