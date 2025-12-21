import { useTwsx } from 'twsx-react'
import ShowcaseSection from '../components/ShowcaseSection'

export default function ColumnsShowcase() {
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

    // Column examples
    '.column-example': [
      'bg-slate-800 rounded-lg p-6',
      {
        '.column-content': [
          'text-slate-300 text-sm leading-relaxed',
          {
            '&.columns-1': 'columns-1',
            '&.columns-2': 'columns-2', 
            '&.columns-3': 'columns-3',
            '&.columns-4': 'columns-4',
            '&.columns-auto': 'columns-auto',
            '&.columns-3xs': 'columns-3xs',
            '&.columns-2xs': 'columns-2xs',
            '&.columns-xs': 'columns-xs',
            '&.columns-sm': 'columns-sm',
            '&.columns-md': 'columns-md',
            '&.columns-lg': 'columns-lg',
            '&.columns-xl': 'columns-xl'
          }
        ]
      }
    ],

    // Sample text styling
    '.sample-text': [
      'text-slate-300 text-sm leading-relaxed',
      {
        'p': 'mb-4',
        'strong': 'text-white font-semibold'
      }
    ],

    // Layout styles
    '.page-header': 'mb-8',
    '.page-title': 'text-3xl font-bold text-white mb-4',
    '.page-description': 'text-slate-300 text-lg',
    '.section-header': 'mb-12',
    '.section-title': 'text-2xl font-bold text-white mb-6',
    '.table-container': 'overflow-x-auto',
    '.demo-sections': 'space-y-8',
    '.demo-section': '',
    '.demo-label': 'text-sm font-medium text-slate-400 mb-3'
  })

  const basicCode = `<div class="columns-3 ...">
  <p>So I started to walk into the water...</p>
  <p>The sea was angry that day...</p>
  <p>Then, from out of nowhere...</p>
</div>`

  const countCode = `<div class="columns-1 ...">...</div>
<div class="columns-2 ...">...</div>
<div class="columns-3 ...">...</div>
<div class="columns-4 ...">...</div>`

  const widthCode = `<div class="columns-3xs ...">...</div>
<div class="columns-2xs ...">...</div>
<div class="columns-xs ...">...</div>
<div class="columns-sm ...">...</div>
<div class="columns-md ...">...</div>
<div class="columns-lg ...">...</div>
<div class="columns-xl ...">...</div>`

  const autoCode = `<div class="columns-auto ...">
  <p>So I started to walk into the water...</p>
  <p>The sea was angry that day...</p>
  <p>Then, from out of nowhere...</p>
</div>`

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Columns</h1>
        <p className="page-description">
          Utilities for controlling the number of columns within an element.
        </p>
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
                <td><span className="class-name">columns-1</span></td>
                <td><span className="properties">columns: 1;</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-2</span></td>
                <td><span className="properties">columns: 2;</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-3</span></td>
                <td><span className="properties">columns: 3;</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-4</span></td>
                <td><span className="properties">columns: 4;</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-5</span></td>
                <td><span className="properties">columns: 5;</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-6</span></td>
                <td><span className="properties">columns: 6;</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-7</span></td>
                <td><span className="properties">columns: 7;</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-8</span></td>
                <td><span className="properties">columns: 8;</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-9</span></td>
                <td><span className="properties">columns: 9;</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-10</span></td>
                <td><span className="properties">columns: 10;</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-11</span></td>
                <td><span className="properties">columns: 11;</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-12</span></td>
                <td><span className="properties">columns: 12;</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-auto</span></td>
                <td><span className="properties">columns: auto;</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-3xs</span></td>
                <td><span className="properties">columns: 16rem; /* 256px */</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-2xs</span></td>
                <td><span className="properties">columns: 18rem; /* 288px */</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-xs</span></td>
                <td><span className="properties">columns: 20rem; /* 320px */</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-sm</span></td>
                <td><span className="properties">columns: 24rem; /* 384px */</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-md</span></td>
                <td><span className="properties">columns: 28rem; /* 448px */</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-lg</span></td>
                <td><span className="properties">columns: 32rem; /* 512px */</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-xl</span></td>
                <td><span className="properties">columns: 36rem; /* 576px */</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-2xl</span></td>
                <td><span className="properties">columns: 42rem; /* 672px */</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-3xl</span></td>
                <td><span className="properties">columns: 48rem; /* 768px */</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-4xl</span></td>
                <td><span className="properties">columns: 56rem; /* 896px */</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-5xl</span></td>
                <td><span className="properties">columns: 64rem; /* 1024px */</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-6xl</span></td>
                <td><span className="properties">columns: 72rem; /* 1152px */</span></td>
              </tr>
              <tr>
                <td><span className="class-name">columns-7xl</span></td>
                <td><span className="properties">columns: 80rem; /* 1280px */</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Basic usage */}
      <ShowcaseSection
        title="Basic usage"
        description="Use the columns-{count} utilities to set the number of columns that should be created for the content within an element. The column width will be automatically calculated based on the container width."
        code={basicCode}
        resizable={true}
      >
        <div className="column-example">
          <div className="column-content columns-3">
            <div className="sample-text">
              <p><strong>So I started to walk into the water.</strong> I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.</p>
              
              <p><strong>The sea was angry that day, my friends</strong> - like an old man trying to send back soup in a deli. I got about fifty feet out and suddenly, the great beast appeared before me. I tell you he was ten stories high if he was a foot. As if sensing my presence, he let out a great bellow. I said, "Easy, big fella!"</p>
              
              <p><strong>And then, as I watched him struggling,</strong> I realized that something was obstructing its breathing. From where I was standing, I could see directly into the eye of the great fish. Then, from out of nowhere, a huge tidal wave lifted me, tossed me like a cork, and I found myself right on top of him - face to face with the blowhole.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Setting the number of columns */}
      <ShowcaseSection
        title="Setting the number of columns"
        description="Control the number of columns using the columns-{count} utilities."
        code={countCode}
        resizable={true}
      >
        <div className="demo-sections">
          <div className="demo-section">
            <h4 className="demo-label">columns-1</h4>
            <div className="column-example">
              <div className="column-content columns-1">
                <div className="sample-text">
                  <p>So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="demo-section">
            <h4 className="demo-label">columns-2</h4>
            <div className="column-example">
              <div className="column-content columns-2">
                <div className="sample-text">
                  <p>So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="demo-section">
            <h4 className="demo-label">columns-3</h4>
            <div className="column-example">
              <div className="column-content columns-3">
                <div className="sample-text">
                  <p>So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Setting the column width */}
      <ShowcaseSection
        title="Setting the column width"
        description="Use the columns-{width} utilities to set the ideal column width for the content within an element, with the number of columns (the count) automatically adjusting to accommodate that value."
        code={widthCode}
        resizable={true}
      >
        <div className="demo-sections">
          <div className="demo-section">
            <h4 className="demo-label">columns-xs</h4>
            <div className="column-example">
              <div className="column-content columns-xs">
                <div className="sample-text">
                  <p>So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.</p>
                  <p>The sea was angry that day, my friends - like an old man trying to send back soup in a deli. I got about fifty feet out and suddenly, the great beast appeared before me.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="demo-section">
            <h4 className="demo-label">columns-sm</h4>
            <div className="column-example">
              <div className="column-content columns-sm">
                <div className="sample-text">
                  <p>So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.</p>
                  <p>The sea was angry that day, my friends - like an old man trying to send back soup in a deli. I got about fifty feet out and suddenly, the great beast appeared before me.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="demo-section">
            <h4 className="demo-label">columns-lg</h4>
            <div className="column-example">
              <div className="column-content columns-lg">
                <div className="sample-text">
                  <p>So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.</p>
                  <p>The sea was angry that day, my friends - like an old man trying to send back soup in a deli. I got about fifty feet out and suddenly, the great beast appeared before me.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Auto columns */}
      <ShowcaseSection
        title="Auto columns"
        description="Use columns-auto to allow the browser to automatically determine both the number and width of the columns."
        code={autoCode}
        resizable={true}
      >
        <div className="column-example">
          <div className="column-content columns-auto">
            <div className="sample-text">
              <p><strong>So I started to walk into the water.</strong> I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.</p>
              
              <p><strong>The sea was angry that day, my friends</strong> - like an old man trying to send back soup in a deli. I got about fifty feet out and suddenly, the great beast appeared before me. I tell you he was ten stories high if he was a foot. As if sensing my presence, he let out a great bellow. I said, "Easy, big fella!"</p>
              
              <p><strong>And then, as I watched him struggling,</strong> I realized that something was obstructing its breathing. From where I was standing, I could see directly into the eye of the great fish. Then, from out of nowhere, a huge tidal wave lifted me, tossed me like a cork, and I found myself right on top of him - face to face with the blowhole.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  )
}