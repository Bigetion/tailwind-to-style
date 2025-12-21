import React, { useState } from 'react'
import { useTwsx } from 'twsx-react'
import CodeBlock from '../components/CodeBlock'

export default function AnimationExamples() {
  const [animationTrigger, setAnimationTrigger] = useState(0)

  useTwsx({
    '.animation-showcase': [
      'bg-white rounded-lg shadow-md p-6 mb-6'
    ],
    '.animation-grid': [
      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'
    ],
    '.animation-demo': [
      'bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-dashed border-gray-300 text-center',
      {
        '.demo-element': [
          'w-16 h-16 mx-auto mb-4 rounded-lg transition-all duration-500',
          {
            '&.spin': 'animate-spin bg-blue-500',
            '&.pulse': 'animate-pulse bg-green-500',
            '&.bounce': 'animate-bounce bg-red-500',
            '&.fade-in': 'animate-fade-in bg-purple-500',
            '&.slide-up': 'animate-slide-up bg-orange-500',
            '&.zoom-in': 'animate-zoom-in bg-pink-500'
          }
        ],
        '.demo-title': 'font-semibold text-gray-800 mb-2',
        '.demo-desc': 'text-sm text-gray-600'
      }
    ],
    '.interactive-demo': [
      'bg-white rounded-xl shadow-lg p-8 border border-gray-200',
      {
        '.interactive-card': [
          'bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-lg p-6 mb-6 transition-all duration-300 cursor-pointer',
          {
            '&:hover': 'transform scale-105 shadow-xl from-brand-600 to-brand-700',
            '&:active': 'transform scale-95',
            '.card-title': 'text-xl font-bold mb-2',
            '.card-content': 'text-brand-100'
          }
        ],
        '.trigger-btn': [
          'px-6 py-3 bg-brand-500 text-white rounded-lg font-medium transition-all duration-200',
          {
            '&:hover': 'bg-brand-600 transform translateY(-1px) shadow-lg',
            '&:active': 'transform translateY(0) scale-95'
          }
        ]
      }
    ],
    '.staggered-list': [
      'space-y-3',
      {
        '.staggered-item': [
          'bg-white p-4 rounded-lg shadow-sm border border-gray-200 transform transition-all duration-500',
          {
            [`&.animate-${animationTrigger}`]: 'translate-x-0 opacity-100',
            [`&:not(.animate-${animationTrigger})`]: 'translate-x-8 opacity-0',
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

function AnimatedComponent() {
  useTwsx({
    '.animated-card': [
      'bg-white rounded-lg p-6 transition-all duration-300',
      {
        '&:hover': 'transform scale-105 shadow-lg',
        '.icon': 'animate-spin text-blue-500',
        '.content': 'animate-fade-in'
      }
    ]
  })

  return (
    <div className="animated-card">
      <div className="icon">🚀</div>
      <div className="content">Animated content</div>
    </div>
  )
}`

  const animations = [
    { name: 'spin', title: 'Spin', desc: 'Continuous rotation' },
    { name: 'pulse', title: 'Pulse', desc: 'Opacity animation' },
    { name: 'bounce', title: 'Bounce', desc: 'Bouncing motion' },
    { name: 'fade-in', title: 'Fade In', desc: 'Opacity transition' },
    { name: 'slide-up', title: 'Slide Up', desc: 'Slide from bottom' },
    { name: 'zoom-in', title: 'Zoom In', desc: 'Scale animation' }
  ]

  const triggerStaggered = () => {
    setAnimationTrigger(prev => prev + 1)
  }

  return (
    <div>
      <div className="animation-showcase">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">🎬 Animation Examples</h1>
        <p className="text-gray-600 mb-6">
          TWSX supports both built-in Tailwind animations and custom inline animations 
          for smooth, performant transitions.
        </p>
      </div>

      <div className="animation-grid">
        {animations.map((anim) => (
          <div key={anim.name} className="animation-demo">
            <div className={`demo-element ${anim.name}`}></div>
            <h3 className="demo-title">{anim.title}</h3>
            <p className="demo-desc">{anim.desc}</p>
          </div>
        ))}
      </div>

      <div className="interactive-demo">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🎮 Interactive Animations</h2>
        
        <div className="interactive-card">
          <h3 className="card-title">Hover & Click Me!</h3>
          <p className="card-content">
            This card demonstrates hover and active state animations
          </p>
        </div>

        <div className="mb-6">
          <button onClick={triggerStaggered} className="trigger-btn">
            🚀 Trigger Staggered Animation
          </button>
        </div>

        <div className="staggered-list">
          {[1, 2, 3, 4].map((item) => (
            <div 
              key={item} 
              className={`staggered-item animate-${animationTrigger}`}
            >
              <strong>Staggered Item {item}</strong>
              <p className="text-gray-600 text-sm mt-1">
                This item animates with a {(item - 1) * 100}ms delay
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="animation-showcase">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📝 Animation Code Example</h2>
        <CodeBlock 
          code={animationCode}
          title="Animation Hook Example"
          language="javascript"
        />
      </div>
    </div>
  )
}