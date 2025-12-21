import React from 'react'
import { useTwsx } from 'twsx-react'
import ShowcaseSection from '../components/ShowcaseSection'

export default function AspectRatioShowcase() {
  useTwsx({
    // Class reference table styles
    '.class-table': [
      'w-full border-collapse',
      {
        'th, td': 'border border-slate-600 px-4 py-2 text-left',
        'th': 'bg-slate-800 text-slate-200 font-medium',
        'td': 'bg-slate-900 text-slate-300',
        '.class-name': 'text-sky-400 font-mono text-sm',
        '.properties': 'text-slate-300 font-mono text-sm'
      }
    ],

    // Basic example styles
    '.basic-example': [
      'bg-slate-800 rounded-lg p-6',
      {
        '.example-container': [
          'w-64 mx-auto',
          {
            '.example-image': [
              'aspect-square bg-slate-300 rounded-lg overflow-hidden',
              {
                'img': 'w-full h-full object-cover'
              }
            ]
          }
        ]
      }
    ],

    // Video example styles  
    '.video-example': [
      'bg-slate-800 rounded-lg p-6',
      {
        '.video-container': [
          'max-w-md mx-auto aspect-video bg-slate-900 rounded-lg overflow-hidden relative',
          {
            '.video-placeholder': [
              'w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center',
              {
                '.play-button': [
                  'w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-100 transition-all',
                  {
                    '.play-icon': 'w-0 h-0 border-l-6 border-l-slate-800 border-y-4 border-y-transparent ml-1'
                  }
                ]
              }
            ]
          }
        ]
      }
    ],

    // Custom ratios example
    '.custom-ratios': [
      'bg-slate-800 rounded-lg p-6 space-y-4',
      {
        '.ratio-demo': [
          'bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold',
          {
            '&.ratio-4-3': 'aspect-[4/3]',
            '&.ratio-16-9': 'aspect-video', 
            '&.ratio-21-9': 'aspect-[21/9]'
          }
        ]
      }
    ],

    // Arbitrary values example
    '.arbitrary-example': [
      'bg-slate-800 rounded-lg p-6 space-y-4',
      {
        '.arbitrary-demo': [
          'bg-gradient-to-r rounded-lg flex items-center justify-center text-white font-semibold text-sm',
          {
            '&.demo-1': 'aspect-[2/1] from-rose-500 to-pink-600',
            '&.demo-2': 'aspect-[5/4] from-blue-500 to-cyan-600', 
            '&.demo-3': 'aspect-[3/4] from-green-500 to-emerald-600'
          }
        ]
      }
    ]
  })

  const basicExampleCode = `<div class="w-64">
  <img class="aspect-square ..." src="..." alt="..." />
</div>`

  const videoExampleCode = `<iframe class="aspect-video ..." src="https://www.youtube.com/..."></iframe>`

  const customRatioCode = `<div class="aspect-[4/3] ...">
  <img src="..." alt="..." class="object-cover" />
</div>`

  const arbitraryCode = `<div class="aspect-[2/1] ..."></div>
<div class="aspect-[5/4] ..."></div>
<div class="aspect-[3/4] ..."></div>`

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Aspect Ratio</h1>
        <p className="text-slate-300 text-lg">
          Utilities for controlling the aspect ratio of an element.
        </p>
      </div>

      {/* Class Reference */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Class reference</h2>
        <div className="overflow-x-auto">
          <table className="class-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Properties</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="class-name">aspect-auto</span></td>
                <td><span className="properties">aspect-ratio: auto;</span></td>
              </tr>
              <tr>
                <td><span className="class-name">aspect-square</span></td>
                <td><span className="properties">aspect-ratio: 1 / 1;</span></td>
              </tr>
              <tr>
                <td><span className="class-name">aspect-video</span></td>
                <td><span className="properties">aspect-ratio: 16 / 9;</span></td>
              </tr>
              <tr>
                <td><span className="class-name">aspect-[4/3]</span></td>
                <td><span className="properties">aspect-ratio: 4 / 3;</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Basic usage */}
      <ShowcaseSection
        title="Basic usage"
        description="Use the aspect-{ratio} utilities to set the desired aspect ratio of an element."
        code={basicExampleCode}
        resizable={false}
      >
        <div className="basic-example">
          <div className="example-container">
            <div className="example-image">
              <img 
                src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?w=320&h=320&fit=crop&crop=faces" 
                alt="Woman"
              />
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Video aspect ratios */}
      <ShowcaseSection
        title="Video aspect ratios"
        description="Use aspect-video to embed responsive videos in your design."
        code={videoExampleCode}
        resizable={false}
      >
        <div className="video-example">
          <div className="video-container">
            <div className="video-placeholder">
              <div className="play-button">
                <div className="play-icon"></div>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Custom aspect ratios */}
      <ShowcaseSection
        title="Custom aspect ratios"
        description="Use aspect-[4/3] to give an element a custom aspect ratio."
        code={customRatioCode}
        resizable={false}
      >
        <div className="custom-ratios">
          <div className="ratio-demo ratio-4-3">4:3</div>
          <div className="ratio-demo ratio-16-9">16:9</div>
          <div className="ratio-demo ratio-21-9">21:9</div>
        </div>
      </ShowcaseSection>

      {/* Arbitrary value support */}
      <ShowcaseSection
        title="Arbitrary value support"
        description="If you need to use a one-off aspect ratio value that doesn't make sense to include in your theme, use square brackets to generate a property on the fly using any arbitrary value."
        code={arbitraryCode}
        resizable={false}
      >
        <div className="arbitrary-example">
          <div className="arbitrary-demo demo-1">2:1</div>
          <div className="arbitrary-demo demo-2">5:4</div>
          <div className="arbitrary-demo demo-3">3:4</div>
        </div>
      </ShowcaseSection>
    </div>
  )
}