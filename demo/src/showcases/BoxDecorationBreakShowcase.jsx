import { useTwsx } from 'twsx-react'
import ShowcaseSection from '../components/ShowcaseSection'

export default function BoxDecorationBreakShowcase() {
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

    // Browser compatibility warning
    '.browser-warning': [
      'bg-amber-900 border border-amber-600 rounded-lg p-4 mb-8',
      {
        '.warning-title': 'text-amber-200 font-semibold mb-2 flex items-center',
        '.warning-icon': 'mr-2 text-amber-400',
        '.warning-text': 'text-amber-100 text-sm leading-relaxed',
        '.browser-list': 'text-amber-100 text-sm mt-2 ml-4',
        '.browser-item': 'mb-1'
      }
    ],

    // Layout styles
    '.page-header': 'mb-8',
    '.page-title': 'text-3xl font-bold text-white mb-4',
    '.page-description': 'text-slate-300 text-lg',
    '.section-header': 'mb-12',
    '.section-title': 'text-2xl font-bold text-white mb-6',
    '.table-container': 'overflow-x-auto',

    // Demo styles with enhanced visual differences
    '.demo-container': [
      'bg-slate-800 rounded-lg p-6',
      {
        '.demo-text': [
          'text-white text-xl font-bold leading-loose inline',
          {
            '&.slice-demo': [
              'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 border-8 border-yellow-400 rounded-2xl shadow-2xl',
              {
                '@css': {
                  'box-decoration-break': 'slice',
                  '-webkit-box-decoration-break': 'slice',
                  'display': 'inline',
                  'box-shadow': '0 0 20px rgba(255, 255, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.2)'
                }
              }
            ],
            '&.clone-demo': [
              'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 border-8 border-yellow-400 rounded-2xl shadow-2xl',
              {
                '@css': {
                  'box-decoration-break': 'clone',
                  '-webkit-box-decoration-break': 'clone',
                  'display': 'inline',
                  'box-shadow': '0 0 20px rgba(255, 255, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.2)'
                }
              }
            ]
          }
        ],
        '.demo-label': 'text-slate-400 text-sm font-medium mb-4',
        '.demo-note': 'text-slate-400 text-sm mt-4 p-3 bg-slate-700 rounded border-l-4 border-blue-400',
        '.demo-explanation': 'text-slate-300 text-sm mt-2 leading-relaxed'
      }
    ],

    // Visual comparison section
    '.comparison-container': [
      'bg-slate-800 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6',
      {
        '.comparison-item': [
          'bg-slate-700 rounded-lg p-4',
          {
            '.comparison-title': 'text-white font-semibold mb-3 text-center',
            '.comparison-demo': 'mb-3',
            '.comparison-explanation': 'text-slate-300 text-xs leading-relaxed'
          }
        ]
      }
    ],

    // Responsive demo
    '.responsive-demo': [
      'bg-slate-800 rounded-lg p-6',
      {
        '.responsive-text': [
          'text-white text-lg font-semibold leading-relaxed inline px-4 py-2 border-4 border-green-400 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600',
          {
            '@css': {
              'box-decoration-break': 'slice',
              '-webkit-box-decoration-break': 'slice',
              'display': 'inline'
            }
          }
        ]
      }
    ]
  })

  const basicExampleCode = `<span class="box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-2">
  Hello
  World
</span>`

  const cloneExampleCode = `<span class="box-decoration-clone bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-2">
  Hello
  World
</span>`

  const responsiveCode = `<span class="box-decoration-slice md:box-decoration-clone bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2">
  Hello
  World
</span>`

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Box Decoration Break</h1>
        <p className="page-description">
          Utilities for controlling how element fragments should be rendered across multiple lines, columns, or pages.
        </p>
      </div>

      {/* Browser Compatibility Warning */}
      <div className="browser-warning">
        <div className="warning-title">
          <span className="warning-icon">⚠️</span>
          Browser Compatibility Notice
        </div>
        <div className="warning-text">
          The <code>box-decoration-break</code> property has limited browser support and may not work as expected in all browsers:
        </div>
        <ul className="browser-list">
          <li className="browser-item">✅ <strong>Firefox:</strong> Full support</li>
          <li className="browser-item">❌ <strong>Chrome/Edge:</strong> Limited support (may not work)</li>
          <li className="browser-item">❌ <strong>Safari:</strong> Partial support with -webkit- prefix</li>
        </ul>
        <div className="warning-text">
          If the examples below look identical, your browser doesn't support this property. Try viewing in Firefox for the best experience.
        </div>
      </div>

      {/* Class Reference */}
      <div className="section-header">
        <h2 className="section-title">Class reference</h2>
        <div className="table-container">
          <table className="class-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Properties</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="class-name">box-decoration-slice</span></td>
                <td><span className="properties">box-decoration-break: slice;</span></td>
              </tr>
              <tr>
                <td><span className="class-name">box-decoration-clone</span></td>
                <td><span className="properties">box-decoration-break: clone;</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Comparison */}
      <ShowcaseSection
        title="Visual Comparison"
        description="Compare the difference between slice and clone behavior. The key difference is how borders, padding, and backgrounds are applied to text that wraps across multiple lines."
        code={basicExampleCode}
        resizable={false}
      >
        <div className="comparison-container">
          <div className="comparison-item">
            <div className="comparison-title">box-decoration-slice</div>
            <div className="comparison-demo">
              <span className="demo-text slice-demo">
                This text spans multiple<br />lines to demonstrate<br />the slice behavior
              </span>
            </div>
            <div className="comparison-explanation">
              <strong>Slice behavior:</strong> The border, background, and other decorations are applied as if the element is one continuous box that's been "sliced" where it breaks. Only the outer edges get the full decoration.
            </div>
          </div>
          
          <div className="comparison-item">
            <div className="comparison-title">box-decoration-clone</div>
            <div className="comparison-demo">
              <span className="demo-text clone-demo">
                This text spans multiple<br />lines to demonstrate<br />the clone behavior
              </span>
            </div>
            <div className="comparison-explanation">
              <strong>Clone behavior:</strong> Each line fragment gets its own complete set of decorations - borders, padding, background, etc. Each line looks like a separate "cloned" element.
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Basic example */}
      <ShowcaseSection
        title="Basic usage"
        description="Use box-decoration-slice (default) for continuous decoration across line breaks, or box-decoration-clone for individual decoration on each line fragment."
        code={basicExampleCode}
        resizable={false}
      >
        <div className="demo-container">
          <div className="demo-label">box-decoration-slice (default)</div>
          <span className="demo-text slice-demo">
            The quick brown fox jumps over the lazy dog and runs through the forest
          </span>
          <div className="demo-note">
            <strong>Expected behavior:</strong> Border and background appear continuous, with decorations only on the outer edges of the entire text block.
          </div>
        </div>
      </ShowcaseSection>

      {/* Clone example */}
      <ShowcaseSection
        title="Clone decoration"
        description="Use box-decoration-clone to give each line fragment its own complete set of decorations."
        code={cloneExampleCode}
        resizable={false}
      >
        <div className="demo-container">
          <div className="demo-label">box-decoration-clone</div>
          <span className="demo-text clone-demo">
            The quick brown fox jumps over the lazy dog and runs through the forest
          </span>
          <div className="demo-note">
            <strong>Expected behavior:</strong> Each line gets its own complete border, padding, background, and shadow - as if each line is a separate element.
          </div>
        </div>
      </ShowcaseSection>

      {/* Responsive design */}
      <ShowcaseSection
        title="Responsive design"
        description="Use responsive variants like md:box-decoration-clone to apply different box decoration break utilities at different breakpoints."
        code={responsiveCode}
        resizable={false}
      >
        <div className="responsive-demo">
          <div className="demo-label">box-decoration-slice md:box-decoration-clone</div>
          <span className="responsive-text">
            The quick brown fox jumps over the lazy dog and runs through the forest
          </span>
          <div className="demo-note">
            <strong>Browser Support Note:</strong> This property works best in Firefox. In Chrome/Edge, both slice and clone may appear identical due to limited browser support.
          </div>
        </div>
      </ShowcaseSection>
    </div>
  )
}