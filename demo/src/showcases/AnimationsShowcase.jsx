import React, { useState } from 'react'
import { useTwsx } from 'twsx-react'
import ShowcaseSection from '../components/ShowcaseSection'

export default function AnimationsShowcase() {
  const [triggerAnimation, setTriggerAnimation] = useState(0)

  useTwsx({
    '.animation-demo': [
      'bg-slate-800 rounded-lg p-6 text-center',
      {
        '.demo-element': [
          'w-16 h-16 mx-auto mb-4 rounded-lg transition-all duration-500',
          {
            '&.spin': 'animate-spin bg-blue-500',
            '&.pulse': 'animate-pulse bg-green-500', 
            '&.bounce': 'animate-bounce bg-red-500',
            '&.fade-in': 'animate-fade-in bg-purple-500',
            '&.slide-up': 'animate-slide-up bg-orange-500'
          }
        ],
        '.demo-label': 'text-slate-300 text-sm font-medium'
      }
    ],
    '.interactive-card': [
      'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6 cursor-pointer transition-all duration-300',
      {
        '&:hover': 'transform scale-105 shadow-xl from-blue-600 to-purple-700',
        '&:active': 'transform scale-95',
        '.card-title': 'text-xl font-bold mb-2',
        '.card-subtitle': 'text-blue-100'
      }
    ],
    '.staggered-list': [
      'space-y-3',
      {
        '.staggered-item': [
          'bg-slate-800 p-4 rounded-lg border border-slate-700 transform transition-all duration-500',
          {
            [`&.animate-${triggerAnimation}`]: 'translate-x-0 opacity-100',
            [`&:not(.animate-${triggerAnimation})`]: 'translate-x-8 opacity-50',
            '&:nth-child(1)': 'transition-delay: 0ms',
            '&:nth-child(2)': 'transition-delay: 100ms', 
            '&:nth-child(3)': 'transition-delay: 200ms',
            '&:nth-child(4)': 'transition-delay: 300ms'
          }
        ]
      }
    ]
  })

  const animationCode = `import { useTwsx } from 'twsx-react'

function AnimatedCard() {
  useTwsx({
    '.animated-card': [
      'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6 transition-all duration-300',
      {
        '&:hover': 'transform scale-105 shadow-xl',
        '&:active': 'transform scale-95',
        '.title': 'text-xl font-bold mb-2',
        '.subtitle': 'text-blue-100'
      }
    ]
  })

  return (
    <div className="animated-card">
      <h3 className="title">Interactive Card</h3>
      <p className="subtitle">Hover and click me!</p>
    </div>
  )
}`

  const staggeredCode = `import { useTwsx } from 'twsx-react'
import { useState } from 'react'

function StaggeredList() {
  const [trigger, setTrigger] = useState(0)
  
  useTwsx({
    '.staggered-item': [
      'bg-slate-800 p-4 rounded-lg transition-all duration-500',
      {
        [\`&.animate-\${trigger}\`]: 'translate-x-0 opacity-100',
        [\`&:not(.animate-\${trigger})\`]: 'translate-x-8 opacity-50',
        '&:nth-child(1)': 'transition-delay: 0ms',
        '&:nth-child(2)': 'transition-delay: 100ms',
        '&:nth-child(3)': 'transition-delay: 200ms'
      }
    ]
  })

  return (
    <div>
      <button onClick={() => setTrigger(prev => prev + 1)}>
        Trigger Animation
      </button>
      {items.map((item, i) => (
        <div key={i} className={\`staggered-item animate-\${trigger}\`}>
          {item}
        </div>
      ))}
    </div>
  )
}`

  const triggerStaggered = () => {
    setTriggerAnimation(prev => prev + 1)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Animations</h1>
        <p className="text-slate-300 text-lg">
          TWSX supports both built-in Tailwind animations and custom inline animations 
          for smooth, performant transitions without keyframes.
        </p>
      </div>

      <ShowcaseSection
        title="Built-in animations"
        description="Use Tailwind's built-in animation utilities like animate-spin, animate-pulse, and animate-bounce."
        resizable={false}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: 'spin', label: 'Spin' },
            { name: 'pulse', label: 'Pulse' },
            { name: 'bounce', label: 'Bounce' },
            { name: 'fade-in', label: 'Fade In' },
            { name: 'slide-up', label: 'Slide Up' }
          ].map((anim) => (
            <div key={anim.name} className="animation-demo">
              <div className={`demo-element ${anim.name}`}></div>
              <div className="demo-label">{anim.label}</div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Interactive hover effects"
        description="Create interactive components with hover and active states using CSS transitions."
        code={animationCode}
        resizable={true}
      >
        <div className="interactive-card">
          <h3 className="card-title">Interactive Card</h3>
          <p className="card-subtitle">Hover and click me!</p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Staggered animations"
        description="Create complex staggered animations with dynamic class names and CSS delays."
        code={staggeredCode}
        resizable={false}
      >
        <div>
          <button 
            onClick={triggerStaggered}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            🚀 Trigger Staggered Animation
          </button>
          
          <div className="staggered-list">
            {[1, 2, 3, 4].map((item) => (
              <div 
                key={item} 
                className={`staggered-item animate-${triggerAnimation}`}
              >
                <div className="font-medium text-white">Staggered Item {item}</div>
                <div className="text-slate-400 text-sm mt-1">
                  Animates with {(item - 1) * 100}ms delay
                </div>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>
    </div>
  )
}