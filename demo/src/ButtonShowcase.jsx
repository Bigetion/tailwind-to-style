import { useState } from 'react'
import { Button, ActionButton, PlusIcon, HeartIcon, TrashIcon, BellIcon } from './components/Button'

export default function ButtonShowcase() {
  const [count, setCount] = useState(0)
  
  return (
    <div style={{ padding: '2rem', background: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>
            🎨 Button Component Showcase
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
            Reusable button dengan 4 variant warna × 4 style × 3 ukuran × support icon
          </p>
        </div>

        {/* Section: Solid Style */}
        <Section title="Solid Style" description="Background warna utama, text putih, shadow ringan">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="primary" style="solid">Primary</Button>
            <Button variant="warning" style="solid">Warning</Button>
            <Button variant="positive" style="solid">Positive</Button>
            <Button variant="attention" style="solid">Attention</Button>
          </div>
        </Section>

        {/* Section: Smooth Style */}
        <Section title="Smooth Style" description="Background soft/pastel, text warna utama, tanpa border">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="primary" style="smooth">Primary</Button>
            <Button variant="warning" style="smooth">Warning</Button>
            <Button variant="positive" style="smooth">Positive</Button>
            <Button variant="attention" style="smooth">Attention</Button>
          </div>
        </Section>

        {/* Section: Ghost Style */}
        <Section title="Ghost Style" description="Transparan dengan border, text warna utama">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="primary" style="ghost">Primary</Button>
            <Button variant="warning" style="ghost">Warning</Button>
            <Button variant="positive" style="ghost">Positive</Button>
            <Button variant="attention" style="ghost">Attention</Button>
          </div>
        </Section>

        {/* Section: Raised Style */}
        <Section title="Raised Style" description="Background putih dengan shadow tebal (elevated)">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="primary" style="raised">Primary</Button>
            <Button variant="warning" style="raised">Warning</Button>
            <Button variant="positive" style="raised">Positive</Button>
            <Button variant="attention" style="raised">Attention</Button>
          </div>
        </Section>

        {/* Section: Button Sizes */}
        <Section title="Button Sizes" description="Small, Medium (default), dan Large">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
        </Section>

        {/* Section: Shape Variants */}
        <Section title="Shape Variants" description="Rounded-lg vs Pill (rounded-full)">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="primary" shape="rounded">Rounded</Button>
            <Button variant="primary" shape="pill">Pill Shape</Button>
            <Button variant="positive" shape="pill">Success Pill</Button>
            <Button variant="attention" shape="pill">Alert Pill</Button>
          </div>
        </Section>

        {/* Section: Icon + Text */}
        <Section title="Icon + Text" description="Icon di kiri teks dengan spacing konsisten">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="primary" style="solid">
              <PlusIcon />
              Add Item
            </Button>
            <Button variant="positive" style="smooth">
              <HeartIcon />
              Like
            </Button>
            <Button variant="warning" style="ghost">
              <TrashIcon />
              Delete
            </Button>
            <Button variant="attention" style="raised">
              <BellIcon />
              Notify
            </Button>
          </div>
        </Section>

        {/* Section: Icon Only */}
        <Section title="Icon Only (Circle)" description="Icon-only button dengan circle shape">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button variant="primary" style="solid" iconOnly size="sm">
              <PlusIcon size={14} />
            </Button>
            <Button variant="positive" style="solid" iconOnly size="md">
              <HeartIcon />
            </Button>
            <Button variant="warning" style="solid" iconOnly size="lg">
              <TrashIcon size={20} />
            </Button>
            <Button variant="attention" style="smooth" iconOnly>
              <BellIcon />
            </Button>
            <Button variant="primary" style="ghost" iconOnly>
              <PlusIcon />
            </Button>
          </div>
        </Section>

        {/* Section: Action Buttons */}
        <Section title="Action Buttons" description='Button dengan icon "+" untuk aksi baru/tambah'>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <ActionButton variant="primary" style="solid">Add New</ActionButton>
            <ActionButton variant="positive" style="smooth">Create</ActionButton>
            <ActionButton variant="primary" style="ghost">New Item</ActionButton>
            <ActionButton variant="attention" style="raised">Add Task</ActionButton>
          </div>
        </Section>

        {/* Section: Interactive Demo */}
        <Section title="Interactive Demo" description="Button dengan state dan interaksi">
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '1rem', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>
                {count}
              </div>
              <p style={{ color: '#6b7280' }}>Counter Value</p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                variant="positive" 
                style="solid" 
                onClick={() => setCount(count + 1)}
              >
                <PlusIcon />
                Increment
              </Button>
              <Button 
                variant="warning" 
                style="solid" 
                onClick={() => setCount(count - 1)}
                disabled={count <= 0}
              >
                Decrement
              </Button>
              <Button 
                variant="primary" 
                style="ghost" 
                onClick={() => setCount(0)}
              >
                Reset
              </Button>
            </div>
          </div>
        </Section>

        {/* Section: All Combinations Grid */}
        <Section title="Complete Matrix" description="Semua kombinasi variant × style">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {['primary', 'warning', 'positive', 'attention'].map((variant) => (
              <div key={variant} style={{ 
                background: 'white', 
                padding: '1.5rem', 
                borderRadius: '0.75rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  color: '#111827', 
                  marginBottom: '1rem',
                  textTransform: 'capitalize'
                }}>
                  {variant}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <Button variant={variant} style="solid" size="sm">Solid</Button>
                  <Button variant={variant} style="smooth" size="sm">Smooth</Button>
                  <Button variant={variant} style="ghost" size="sm">Ghost</Button>
                  <Button variant={variant} style="raised" size="sm">Raised</Button>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Section: Disabled State */}
        <Section title="Disabled State" description="Button dengan state disabled">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="primary" disabled>Primary Disabled</Button>
            <Button variant="warning" disabled>Warning Disabled</Button>
            <Button variant="positive" disabled>Positive Disabled</Button>
            <Button variant="attention" style="smooth" disabled>Attention Disabled</Button>
          </div>
        </Section>

      </div>
    </div>
  )
}

// Helper component untuk section
function Section({ title, description, children }) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>
          {title}
        </h2>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
          {description}
        </p>
      </div>
      {children}
    </div>
  )
}
