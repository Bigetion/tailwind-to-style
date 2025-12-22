import React, { useState, useEffect } from 'react'
import { useTwsx } from 'twsx-react'
import ShowcaseSection from '../components/ShowcaseSection'

export default function AllAnimationsShowcase() {
  const [triggerStagger, setTriggerStagger] = useState(0)
  const [activeTab, setActiveTab] = useState('builtin')
  const [pulseActive, setPulseActive] = useState(true)
  const [sequenceStep, setSequenceStep] = useState(0)

  useTwsx({
    '.animation-showcase-container': 'space-y-8',
    
    // Tab Navigation
    '.tab-navigation': [
      'flex gap-2 mb-6 border-b border-slate-700 overflow-x-auto',
      {
        '.tab-button': [
          'px-4 py-2 text-sm font-medium text-slate-400 border-b-2 border-transparent transition-all duration-200 whitespace-nowrap',
          {
            '&:hover': 'text-slate-200',
            '&.active': 'text-blue-400 border-blue-400'
          }
        ]
      }
    ],

    // Built-in Animations Grid
    '.builtin-animations-grid': [
      'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4',
      {
        '.animation-card': [
          'bg-slate-800 rounded-lg p-6 text-center border border-slate-700 hover:border-slate-600 transition-colors duration-200',
          {
            '.animation-box': 'w-16 h-16 mx-auto mb-4 rounded-lg',
            '.animation-label': 'text-slate-300 text-sm font-medium mb-2',
            '.animation-description': 'text-slate-500 text-xs'
          }
        ]
      }
    ],

    // Spin Animation
    '.animate-spin-demo': [
      'bg-gradient-to-r from-blue-500 to-cyan-500 animate-spin'
    ],

    // Pulse Animation
    '.animate-pulse-demo': [
      'bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse'
    ],

    // Bounce Animation
    '.animate-bounce-demo': [
      'bg-gradient-to-r from-green-500 to-emerald-500 animate-bounce'
    ],

    // Ping Animation
    '.animate-ping-demo': [
      'bg-gradient-to-r from-red-500 to-orange-500 animate-ping'
    ],

    // Fade In Animation
    '.animate-fade-in-demo': [
      'bg-gradient-to-r from-violet-500 to-purple-500 animate-fade-in'
    ],

    // Slide Up Animation
    '.animate-slide-up-demo': [
      'bg-gradient-to-r from-amber-500 to-yellow-500 animate-slide-up'
    ],

    // Interactive Card Examples
    '.interactive-examples-grid': [
      'grid md:grid-cols-2 gap-6',
      {
        '.hover-card': [
          'bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl p-8 cursor-pointer transition-all duration-300 shadow-lg',
          {
            '&:hover': 'transform scale-105 shadow-2xl from-blue-700 to-purple-700 rotate-1',
            '&:active': 'transform scale-95',
            '.card-icon': 'text-4xl mb-3',
            '.card-title': 'text-2xl font-bold mb-2',
            '.card-description': 'text-blue-100 text-sm'
          }
        ],
        '.slide-card': [
          'bg-gradient-to-br from-green-600 to-teal-600 text-white rounded-xl p-8 cursor-pointer overflow-hidden relative transition-all duration-300',
          {
            '&:hover': 'shadow-2xl',
            '&:hover .slide-overlay': 'transform translate-y-0 opacity-100',
            '.slide-content': 'relative z-10',
            '.slide-overlay': [
              'absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8 transform translate-y-full opacity-0 transition-all duration-500',
              {
                '.overlay-text': 'text-white font-medium'
              }
            ],
            '.card-icon': 'text-4xl mb-3',
            '.card-title': 'text-2xl font-bold mb-2'
          }
        ]
      }
    ],

    // Transition Examples
    '.transition-examples': [
      'grid md:grid-cols-3 gap-4',
      {
        '.transition-box': [
          'bg-slate-800 rounded-lg p-6 border-2 border-slate-700 text-center cursor-pointer',
          {
            '.box-content': 'w-12 h-12 mx-auto mb-3 rounded-lg bg-blue-500',
            '.box-label': 'text-slate-300 text-sm font-medium',
            '&.duration-fast': {
              '.box-content': 'transition-all duration-150',
              '&:hover .box-content': 'transform rotate-180 scale-125'
            },
            '&.duration-medium': {
              '.box-content': 'transition-all duration-500',
              '&:hover .box-content': 'transform rotate-180 scale-125'
            },
            '&.duration-slow': {
              '.box-content': 'transition-all duration-1000',
              '&:hover .box-content': 'transform rotate-180 scale-125'
            }
          }
        ]
      }
    ],

    // Easing Examples
    '.easing-examples': [
      'space-y-4',
      {
        '.easing-row': [
          'bg-slate-800 rounded-lg p-4 cursor-pointer',
          {
            '.easing-track': 'bg-slate-700 rounded-full h-2 relative overflow-hidden',
            '.easing-ball': [
              'absolute left-0 top-0 w-8 h-8 -mt-3 rounded-full bg-blue-500 shadow-lg',
              {
                '&.ease-linear': 'transition-all duration-1000 ease-linear',
                '&.ease-in': 'transition-all duration-1000 ease-in',
                '&.ease-out': 'transition-all duration-1000 ease-out',
                '&.ease-in-out': 'transition-all duration-1000 ease-in-out'
              }
            ],
            '.easing-label': 'text-slate-300 text-sm font-medium mb-2',
            '&:hover .easing-ball': 'left-full -ml-8'
          }
        ]
      }
    ],

    // Staggered Animation
    '.staggered-container': [
      {
        '.stagger-button': [
          'px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium transition-all duration-200 mb-6',
          {
            '&:hover': 'from-blue-600 to-purple-600 shadow-lg transform scale-105',
            '&:active': 'transform scale-95'
          }
        ],
        '.staggered-list': [
          'space-y-3',
          {
            '.staggered-item': [
              'bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-xl border border-slate-600 transform transition-all duration-700',
              {
                [`&.animate-${triggerStagger}`]: 'translate-x-0 opacity-100 scale-100',
                [`&:not(.animate-${triggerStagger})`]: 'translate-x-12 opacity-0 scale-90',
                '&:nth-child(1)': 'transition-delay: 0ms',
                '&:nth-child(2)': 'transition-delay: 150ms',
                '&:nth-child(3)': 'transition-delay: 300ms',
                '&:nth-child(4)': 'transition-delay: 450ms',
                '&:nth-child(5)': 'transition-delay: 600ms',
                '.item-number': 'text-3xl font-bold text-blue-400 mb-2',
                '.item-title': 'text-lg font-semibold text-white mb-1',
                '.item-description': 'text-slate-400 text-sm'
              }
            ]
          }
        ]
      }
    ],

    // Loading Spinners
    '.spinner-grid': [
      'grid grid-cols-2 md:grid-cols-4 gap-6',
      {
        '.spinner-card': [
          'bg-slate-800 rounded-lg p-8 text-center border border-slate-700',
          {
            '.spinner': 'w-12 h-12 mx-auto mb-4',
            '.spinner-label': 'text-slate-300 text-sm',
            '.spinner-circle': [
              'w-full h-full border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin'
            ],
            '.spinner-dots': [
              'flex justify-center gap-2',
              {
                '.dot': [
                  'w-3 h-3 bg-blue-500 rounded-full',
                  {
                    '&:nth-child(1)': 'animate-bounce',
                    '&:nth-child(2)': 'animate-bounce delay-75',
                    '&:nth-child(3)': 'animate-bounce delay-150'
                  }
                ]
              }
            ],
            '.spinner-pulse': 'w-full h-full bg-blue-500 rounded-full animate-pulse',
            '.spinner-ping': [
              'relative w-full h-full',
              {
                '.ping-dot': 'absolute inset-0 bg-blue-500 rounded-full',
                '.ping-ring': 'absolute inset-0 bg-blue-500 rounded-full animate-ping'
              }
            ]
          }
        ]
      }
    ],

    // Sequence Animation
    '.sequence-container': [
      {
        '.sequence-button': [
          'px-6 py-3 bg-green-500 text-white rounded-lg font-medium transition-all duration-200 mb-6',
          {
            '&:hover': 'bg-green-600 shadow-lg',
            '&:active': 'transform scale-95'
          }
        ],
        '.sequence-boxes': [
          'grid grid-cols-4 gap-4',
          {
            '.sequence-box': [
              'h-24 rounded-lg transition-all duration-500',
              {
                '&.step-0': 'bg-slate-700 transform scale-100 opacity-50',
                '&.step-1': 'bg-blue-500 transform scale-110 opacity-100 shadow-lg',
                '&.step-2': 'bg-green-500 transform scale-110 opacity-100 shadow-lg',
                '&.step-3': 'bg-purple-500 transform scale-110 opacity-100 shadow-lg',
                '&.step-4': 'bg-orange-500 transform scale-110 opacity-100 shadow-lg'
              }
            ]
          }
        ]
      }
    ],

    // Pulse Control
    '.pulse-control': [
      {
        '.control-button': [
          'px-4 py-2 bg-slate-700 text-white rounded-lg text-sm font-medium transition-all duration-200 mb-4',
          {
            '&:hover': 'bg-slate-600',
            '&.active': 'bg-purple-500'
          }
        ],
        '.pulse-display': [
          'bg-slate-800 rounded-lg p-12 flex items-center justify-center',
          {
            '.pulse-circle': [
              'w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300',
              {
                '&.active': 'animate-pulse shadow-2xl'
              }
            ]
          }
        ]
      }
    ],

    // Combined Effects Grid
    '.combined-effects': [
      'grid md:grid-cols-2 lg:grid-cols-3 gap-6',
      {
        '.effect-card': [
          'bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 cursor-pointer',
          {
            '.effect-demo': 'mb-4 p-8 bg-slate-700 rounded-lg flex items-center justify-center',
            '.effect-icon': 'text-4xl transition-all duration-500',
            '.effect-name': 'text-white font-semibold mb-1',
            '.effect-desc': 'text-slate-400 text-sm',
            
            // Different hover effects
            '&.effect-rotate:hover .effect-icon': 'transform rotate-180',
            '&.effect-scale:hover .effect-icon': 'transform scale-150',
            '&.effect-skew:hover .effect-icon': 'transform skewY-12',
            '&.effect-translate:hover .effect-icon': 'transform translateY-4',
            '&.effect-3d:hover .effect-icon': 'transform rotateY-180',
            '&.effect-bounce:hover .effect-icon': 'animate-bounce',
            '&.effect-pulse:hover .effect-icon': 'animate-pulse',
            '&.effect-spin:hover .effect-icon': 'animate-spin',
            '&.effect-color:hover .effect-icon': 'text-blue-400',
            '&.effect-glow:hover': 'shadow-2xl shadow-blue-500/50',
            '&.effect-shake:hover .effect-icon': 'animate-bounce',
            '&.effect-float:hover .effect-icon': 'transform translateY-2'
          }
        ]
      }
    ]
  })

  useEffect(() => {
    if (sequenceStep > 0) {
      const timer = setTimeout(() => {
        setSequenceStep((prev) => (prev < 4 ? prev + 1 : 0))
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [sequenceStep])

  const tabs = [
    { id: 'builtin', label: '🎨 Built-in Animations' },
    { id: 'interactive', label: '✨ Interactive Effects' },
    { id: 'transitions', label: '⚡ Transitions & Timing' },
    { id: 'spinners', label: '🔄 Loading Spinners' },
    { id: 'advanced', label: '🚀 Advanced Examples' }
  ]

  const builtinAnimations = [
    { name: 'Spin', class: 'animate-spin-demo', desc: 'Continuous rotation' },
    { name: 'Pulse', class: 'animate-pulse-demo', desc: 'Gentle pulsing' },
    { name: 'Bounce', class: 'animate-bounce-demo', desc: 'Bouncing motion' },
    { name: 'Ping', class: 'animate-ping-demo', desc: 'Expanding rings' },
    { name: 'Fade In', class: 'animate-fade-in-demo', desc: 'Fade in effect' },
    { name: 'Slide Up', class: 'animate-slide-up-demo', desc: 'Slide upward' }
  ]

  const staggeredItems = [
    { title: 'Lightning Fast', desc: 'Instant page loads with optimized animations', icon: '⚡' },
    { title: 'Smooth Transitions', desc: 'Butter-smooth animations at 60fps', icon: '🎯' },
    { title: 'Easy to Use', desc: 'Simple API with powerful results', icon: '✨' },
    { title: 'Highly Customizable', desc: 'Tailor animations to your needs', icon: '🎨' },
    { title: 'Production Ready', desc: 'Battle-tested in real applications', icon: '🚀' }
  ]

  const combinedEffects = [
    { name: 'Rotate', class: 'effect-rotate', icon: '🔄', desc: 'Rotate on hover' },
    { name: 'Scale Up', class: 'effect-scale', icon: '📈', desc: 'Grow larger' },
    { name: 'Skew', class: 'effect-skew', icon: '📐', desc: 'Skew transformation' },
    { name: 'Translate', class: 'effect-translate', icon: '⬇️', desc: 'Move down' },
    { name: '3D Flip', class: 'effect-3d', icon: '🎴', desc: 'Flip in 3D space' },
    { name: 'Bounce', class: 'effect-bounce', icon: '⚽', desc: 'Bouncing motion' },
    { name: 'Pulse', class: 'effect-pulse', icon: '💓', desc: 'Pulsing effect' },
    { name: 'Spin', class: 'effect-spin', icon: '🌀', desc: 'Continuous spin' },
    { name: 'Color Change', class: 'effect-color', icon: '🎨', desc: 'Change color' },
    { name: 'Glow', class: 'effect-glow', icon: '✨', desc: 'Glowing shadow' },
    { name: 'Shake', class: 'effect-shake', icon: '📳', desc: 'Shaking motion' },
    { name: 'Float', class: 'effect-float', icon: '☁️', desc: 'Floating upward' }
  ]

  return (
    <div className="animation-showcase-container">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">🎬 Complete Animation Showcase</h1>
        <p className="text-slate-300 text-lg">
          Explore all animation features of TWSX - from built-in Tailwind animations to advanced 
          interactive effects, transitions, and loading states. All styled with twsx for maximum performance.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Built-in Animations Tab */}
      {activeTab === 'builtin' && (
        <>
          <ShowcaseSection
            title="Built-in Tailwind Animations"
            description="TWSX supports all standard Tailwind CSS animations out of the box."
            resizable={false}
          >
            <div className="builtin-animations-grid">
              {builtinAnimations.map((anim) => (
                <div key={anim.name} className="animation-card">
                  <div className={`animation-box ${anim.class}`}></div>
                  <div className="animation-label">{anim.name}</div>
                  <div className="animation-description">{anim.desc}</div>
                </div>
              ))}
            </div>
          </ShowcaseSection>

          <ShowcaseSection
            title="Control Animations Dynamically"
            description="Toggle animations on and off using state."
            resizable={false}
          >
            <div className="pulse-control">
              <button
                className={`control-button ${pulseActive ? 'active' : ''}`}
                onClick={() => setPulseActive(!pulseActive)}
              >
                {pulseActive ? '⏸️ Stop Pulse' : '▶️ Start Pulse'}
              </button>
              <div className="pulse-display">
                <div className={`pulse-circle ${pulseActive ? 'active' : ''}`}></div>
              </div>
            </div>
          </ShowcaseSection>
        </>
      )}

      {/* Interactive Effects Tab */}
      {activeTab === 'interactive' && (
        <>
          <ShowcaseSection
            title="Interactive Hover Cards"
            description="Create engaging hover effects with smooth transitions."
            resizable={true}
          >
            <div className="interactive-examples-grid">
              <div className="hover-card">
                <div className="card-icon">🎨</div>
                <h3 className="card-title">Scale & Rotate</h3>
                <p className="card-description">Hover to see the magic happen!</p>
              </div>
              
              <div className="slide-card">
                <div className="slide-content">
                  <div className="card-icon">🖼️</div>
                  <h3 className="card-title">Slide Overlay</h3>
                </div>
                <div className="slide-overlay">
                  <p className="overlay-text">Hidden content revealed on hover</p>
                </div>
              </div>
            </div>
          </ShowcaseSection>

          <ShowcaseSection
            title="Combined Effect Library"
            description="Mix and match different animation effects. Hover over each card to see the effect."
            resizable={false}
          >
            <div className="combined-effects">
              {combinedEffects.map((effect) => (
                <div key={effect.name} className={`effect-card ${effect.class}`}>
                  <div className="effect-demo">
                    <div className="effect-icon">{effect.icon}</div>
                  </div>
                  <div className="effect-name">{effect.name}</div>
                  <div className="effect-desc">{effect.desc}</div>
                </div>
              ))}
            </div>
          </ShowcaseSection>
        </>
      )}

      {/* Transitions & Timing Tab */}
      {activeTab === 'transitions' && (
        <>
          <ShowcaseSection
            title="Transition Durations"
            description="Different duration speeds for your animations. Hover over each box."
            resizable={false}
          >
            <div className="transition-examples">
              <div className="transition-box duration-fast">
                <div className="box-content"></div>
                <div className="box-label">Fast (150ms)</div>
              </div>
              <div className="transition-box duration-medium">
                <div className="box-content"></div>
                <div className="box-label">Medium (500ms)</div>
              </div>
              <div className="transition-box duration-slow">
                <div className="box-content"></div>
                <div className="box-label">Slow (1000ms)</div>
              </div>
            </div>
          </ShowcaseSection>

          <ShowcaseSection
            title="Easing Functions"
            description="Different timing functions change animation feel. Hover to see the ball move."
            resizable={false}
          >
            <div className="easing-examples">
              {['linear', 'in', 'out', 'in-out'].map((easing) => (
                <div key={easing} className="easing-row">
                  <div className="easing-label">ease-{easing}</div>
                  <div className="easing-track">
                    <div className={`easing-ball ease-${easing}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </ShowcaseSection>
        </>
      )}

      {/* Loading Spinners Tab */}
      {activeTab === 'spinners' && (
        <ShowcaseSection
          title="Loading Spinner Collection"
          description="Ready-to-use loading spinners with various animations."
          resizable={false}
        >
          <div className="spinner-grid">
            <div className="spinner-card">
              <div className="spinner">
                <div className="spinner-circle"></div>
              </div>
              <div className="spinner-label">Circle Spinner</div>
            </div>
            
            <div className="spinner-card">
              <div className="spinner">
                <div className="spinner-dots">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
              <div className="spinner-label">Bouncing Dots</div>
            </div>
            
            <div className="spinner-card">
              <div className="spinner">
                <div className="spinner-pulse"></div>
              </div>
              <div className="spinner-label">Pulse</div>
            </div>
            
            <div className="spinner-card">
              <div className="spinner">
                <div className="spinner-ping">
                  <div className="ping-dot"></div>
                  <div className="ping-ring"></div>
                </div>
              </div>
              <div className="spinner-label">Ping</div>
            </div>
          </div>
        </ShowcaseSection>
      )}

      {/* Advanced Examples Tab */}
      {activeTab === 'advanced' && (
        <>
          <ShowcaseSection
            title="Staggered List Animation"
            description="Create impressive staggered entrance animations with CSS delays."
            resizable={false}
          >
            <div className="staggered-container">
              <button
                className="stagger-button"
                onClick={() => setTriggerStagger(prev => prev + 1)}
              >
                🎬 Trigger Staggered Animation
              </button>
              
              <div className="staggered-list">
                {staggeredItems.map((item, index) => (
                  <div key={index} className={`staggered-item animate-${triggerStagger}`}>
                    <div className="item-number">{item.icon}</div>
                    <div className="item-title">{item.title}</div>
                    <div className="item-description">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </ShowcaseSection>

          <ShowcaseSection
            title="Sequential Animation"
            description="Animate elements in sequence with automatic timing."
            resizable={false}
          >
            <div className="sequence-container">
              <button
                className="sequence-button"
                onClick={() => setSequenceStep(sequenceStep === 0 ? 1 : 0)}
              >
                {sequenceStep === 0 ? '▶️ Start Sequence' : '⏹️ Reset'}
              </button>
              
              <div className="sequence-boxes">
                {[1, 2, 3, 4].map((num) => (
                  <div
                    key={num}
                    className={`sequence-box step-${sequenceStep >= num ? sequenceStep : 0}`}
                  ></div>
                ))}
              </div>
            </div>
          </ShowcaseSection>
        </>
      )}
    </div>
  )
}
