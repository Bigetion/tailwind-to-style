import React, { useState } from 'react';
import { tw, tws } from 'tailwind-to-style';

// ── Demo styles ───────────────────────────────────────────────────────────────

const section      = tw('demo-section',  'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm');
const sectionTitle = tw('demo-title',    'text-xl font-semibold text-gray-900 mb-4');
const label        = tw('demo-label',    'text-sm text-gray-500 mb-3 font-medium');
const codeBlock    = tw('tws-code',      'bg-gray-900 text-green-400 rounded-lg px-4 py-3 text-xs font-mono mt-3 overflow-x-auto whitespace-pre');

// ── Helper: render a key/value style output table ─────────────────────────────

function StyleOutput({ styles }) {
  const entries = Object.entries(styles);
  if (entries.length === 0) {
    return (
      <p style={{ color: '#9ca3af', fontSize: '0.8rem', fontStyle: 'italic' }}>
        No styles resolved — this class may be a layout/structural utility.
      </p>
    );
  }
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '8px' }}>
      <tbody>
        {entries.map(([k, v]) => (
          <tr key={k}>
            <td style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: '#6b7280', background: '#f3f4f6', padding: '3px 8px', borderRadius: '4px 0 0 4px', width: '45%', border: '1px solid #e5e7eb', borderRight: 'none' }}>{k}</td>
            <td style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: '#1d4ed8', background: '#eff6ff', padding: '3px 8px', borderRadius: '0 4px 4px 0', border: '1px solid #e5e7eb', borderLeft: 'none' }}>{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ── CSS String output renderer ─────────────────────────────────────────────────

function CSSStringOutput({ cssStr }) {
  if (!cssStr) {
    return <p style={{ color: '#9ca3af', fontSize: '0.78rem', fontStyle: 'italic' }}>No CSS output (layout/structural utility).</p>;
  }
  // Split into individual declarations for readability
  const lines = cssStr.split(';').map(s => s.trim()).filter(Boolean);
  return (
    <div style={{ marginTop: '6px' }}>
      {lines.map((line, i) => {
        const [prop, ...rest] = line.split(':');
        const val = rest.join(':').trim();
        return (
          <div key={i} style={{ display: 'flex', gap: '0', fontSize: '0.72rem', fontFamily: 'monospace', marginBottom: '2px' }}>
            <span style={{ color: '#6b7280', background: '#f3f4f6', padding: '2px 7px', borderRadius: '4px 0 0 4px', flexShrink: 0 }}>{prop?.trim()}</span>
            <span style={{ color: '#059669' }}><span style={{ color: '#374151' }}>:</span></span>
            <span style={{ color: '#1d4ed8', background: '#f0fdf4', padding: '2px 7px', borderRadius: '0 4px 4px 0', flex: 1 }}>{val}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── Playground ────────────────────────────────────────────────────────────────

const PLAYGROUND_PRESETS = [
  'bg-blue-500 text-white p-4 rounded-lg font-semibold',
  'text-2xl font-bold text-emerald-700',
  'shadow-xl rounded-2xl p-6 bg-white',
  'bg-red-500/70 text-white px-4 py-2 rounded-full',
  'w-[180px] h-[60px] bg-[#7c3aed] rounded-[12px]',
  'text-[1.4rem] font-bold text-[#0f172a]',
];

function TwsPlayground() {
  const [input, setInput] = useState(PLAYGROUND_PRESETS[0]);
  const [mode, setMode]   = useState('json');

  const styleObj = tws(input, true);
  const styleStr = tws(input, false);
  const hasOutput = Object.keys(styleObj).length > 0;

  return (
    <div>
      {/* Input row */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type Tailwind classes…"
          style={{ flex: 1, fontSize: '0.85rem', border: '1px solid #d1d5db', borderRadius: '8px', padding: '8px 12px', fontFamily: 'monospace', outline: 'none' }}
        />
        <select
          value={mode}
          onChange={e => setMode(e.target.value)}
          style={{ fontSize: '0.8rem', border: '1px solid #d1d5db', borderRadius: '8px', padding: '8px 10px' }}
        >
          <option value="json">JSON (object)</option>
          <option value="string">String (CSS)</option>
        </select>
      </div>

      {/* Presets */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
        {PLAYGROUND_PRESETS.map((p, i) => (
          <button key={i} onClick={() => setInput(p)}
            style={{ fontSize: '0.68rem', padding: '3px 10px', borderRadius: '6px', cursor: 'pointer', border: '1px solid #d1d5db',
              background: input === p ? '#1e40af' : '#f3f4f6', color: input === p ? 'white' : '#374151', fontFamily: 'monospace' }}>
            {i + 1}
          </button>
        ))}
        <span style={{ fontSize: '0.68rem', color: '#9ca3af', alignSelf: 'center' }}>click to load preset</span>
      </div>

      {/* Preview + output */}
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '16px', alignItems: 'start', background: '#f9fafb', borderRadius: '12px', padding: '16px' }}>
        {/* Live preview */}
        <div>
          <p style={{ fontSize: '0.68rem', color: '#9ca3af', marginBottom: '8px', textAlign: 'center' }}>Preview</p>
          <div style={{
            width: '80px', height: '80px', borderRadius: '10px', flexShrink: 0,
            border: '1px dashed #d1d5db',
            ...styleObj,
            // if tws returns no display or width, keep the box visible
            minWidth: '80px', minHeight: '80px',
          }} />
          {!hasOutput && (
            <p style={{ fontSize: '0.6rem', color: '#9ca3af', textAlign: 'center', marginTop: '4px', width: '80px' }}>no inline styles</p>
          )}
        </div>

        {/* Output */}
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: '0.68rem', color: '#9ca3af', marginBottom: '6px' }}>
            tws('{input.slice(0, 40)}{input.length > 40 ? '…' : ''}', {mode === 'json' ? 'true' : 'false'})
          </p>
          {mode === 'json'
            ? <StyleOutput styles={styleObj} />
            : <CSSStringOutput cssStr={styleStr} />
          }
        </div>
      </div>
    </div>
  );
}

// ── Main Demo ─────────────────────────────────────────────────────────────────

export function TwsDemo() {
  return (
    <div>

      {/* ── Mode 1: CSS String ─────────────────────────────────────────────── */}
      <div className={section}>
        <h2 className={sectionTitle}>tws() — CSS String Mode</h2>
        <p className={label}>
          <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>tws(classes)</code> converts Tailwind
          classes to a CSS inline-style <em>string</em>. Pass it directly to a <code>style=""</code> attribute or any non-React environment.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
          {[
            { cls: 'bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold', note: 'background + text + spacing + radius' },
            { cls: 'text-2xl font-bold text-gray-900', note: 'typography only' },
            { cls: 'shadow-md rounded-xl p-5 bg-white border border-gray-200', note: 'card-like box' },
          ].map(({ cls, note }) => {
            const styleObj = tws(cls, true);
            const entries = Object.entries(styleObj);
            return (
              <div key={cls} style={{ background: '#f9fafb', borderRadius: '10px', padding: '12px' }}>
                {/* Top row: preview + class name */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap' }}>
                  <div style={{ ...styleObj, minWidth: '64px', minHeight: '32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.8rem' }}>
                    Result
                  </div>
                  <code style={{ fontSize: '0.7rem', color: '#6b7280', wordBreak: 'break-all', flex: 1 }}>{cls}</code>
                  <span style={{ fontSize: '0.65rem', color: '#9ca3af', whiteSpace: 'nowrap' }}>{note}</span>
                </div>
                {/* Output table — each declaration on its own row */}
                {entries.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '2px 0' }}>
                    {entries.map(([k, v]) => (
                      <div key={k} style={{ display: 'contents' }}>
                        <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#6b7280', background: '#f3f4f6', padding: '2px 8px', borderRadius: '4px 0 0 4px', border: '1px solid #e5e7eb', borderRight: 'none', whiteSpace: 'nowrap' }}>{k}</span>
                        <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#059669', background: '#f0fdf4', padding: '2px 8px', borderRadius: '0 4px 4px 0', border: '1px solid #e5e7eb', borderLeft: 'none', wordBreak: 'break-word' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: '0.72rem', color: '#9ca3af', fontStyle: 'italic' }}>layout/structural class — no inline CSS properties</p>
                )}
              </div>
            );
          })}
        </div>

        <div className={codeBlock}>{
`import { tws } from 'tailwind-to-style';

// Returns a CSS inline-style string
const css = tws('bg-blue-500 text-white p-4 rounded-lg');
// → "background-color: rgba(59,130,246, 1); color: rgba(255,255,255, 1); padding: 1rem; border-radius: 0.5rem;"

// Use directly on any DOM element
element.style.cssText = tws('p-4 bg-white border rounded-xl');

// Works outside React too (vanilla JS, Vue, etc.)
<div style={tws('p-4 bg-white border rounded-xl')}>...</div>`
        }</div>
      </div>

      {/* ── Mode 2: JSON Object ───────────────────────────────────────────── */}
      <div className={section}>
        <h2 className={sectionTitle}>tws() — JSON Object Mode</h2>
        <p className={label}>
          Pass <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>true</code> as the second argument
          to get a React-compatible camelCase style object — spread it directly onto <code>style={'{...}'}</code>.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '14px' }}>
          {[
            { cls: 'bg-emerald-500 text-white rounded-full px-4 py-2 text-sm font-semibold', label: 'Badge' },
            { cls: 'shadow-lg rounded-2xl p-6 bg-white border border-gray-100', label: 'Card container' },
            { cls: 'text-3xl font-extrabold text-blue-600', label: 'Heading' },
          ].map(({ cls, label: l }) => {
            const style = tws(cls, true);
            const entries = Object.entries(style);
            return (
              <div key={l} style={{ background: '#f9fafb', borderRadius: '10px', padding: '12px' }}>
                {/* Preview row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                  <div style={{ ...style, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '60px', minHeight: '28px' }}>{l}</div>
                  <code style={{ fontSize: '0.68rem', color: '#6b7280', wordBreak: 'break-all', flex: 1 }}>{cls}</code>
                </div>
                {/* Two-column key/value grid — key fixed-width, value wraps freely */}
                {entries.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: '2px 0' }}>
                    {entries.map(([k, v]) => (
                      <div key={k} style={{ display: 'contents' }}>
                        <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#6b7280', background: '#f3f4f6', padding: '2px 8px', borderRadius: '4px 0 0 4px', border: '1px solid #e5e7eb', borderRight: 'none', whiteSpace: 'nowrap' }}>{k}</span>
                        <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#1d4ed8', background: '#eff6ff', padding: '2px 8px', borderRadius: '0 4px 4px 0', border: '1px solid #e5e7eb', borderLeft: 'none', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: '0.72rem', color: '#9ca3af', fontStyle: 'italic' }}>No styles resolved.</p>
                )}
              </div>
            );
          })}
        </div>

        <div className={codeBlock}>{
`// Second arg = true → camelCase style object for React
const style = tws('bg-blue-500 text-white p-4 rounded-lg', true);
// → {
//     backgroundColor: 'rgba(59,130,246, 1)',
//     color:           'rgba(255,255,255, 1)',
//     padding:         '1rem',
//     borderRadius:    '0.5rem',
//   }

// Spread directly onto style prop
<div style={tws('p-4 bg-white rounded-xl shadow-md', true)}>
  React-ready
</div>`
        }</div>
      </div>

      {/* ── Opacity Modifiers ─────────────────────────────────────────────── */}
      <div className={section}>
        <h2 className={sectionTitle}>tws() — Opacity Modifiers</h2>
        <p className={label}>
          The <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>class/N</code> syntax (e.g.{' '}
          <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>text-red-500/50</code>) applies
          alpha transparency. tws converts this to <code>rgba()</code> automatically.
        </p>

        {/* Background opacity scale */}
        <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
          bg-blue-600/N — background alpha scale
        </p>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {[10, 25, 50, 75, 90, 100].map(alpha => {
            const style = tws(`bg-blue-600/${alpha}`, true);
            const hasStyle = Object.keys(style).length > 0;
            return (
              <div key={alpha} style={{
                minWidth: '52px',
                padding: '8px 10px',
                borderRadius: '8px',
                textAlign: 'center',
                fontSize: '0.75rem',
                fontWeight: 600,
                border: '1px solid #e5e7eb',
                // fallback to manual rgba if tws returns empty (shouldn't in browser)
                ...(hasStyle ? style : { backgroundColor: `rgba(37, 99, 235, ${alpha / 100})` }),
                // ensure text is always readable
                color: alpha < 40 ? '#1e3a8a' : '#fff',
              }}>
                /{alpha}
              </div>
            );
          })}
        </div>

        {/* Text opacity */}
        <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
          Text color with opacity
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {[
            { cls: 'text-red-500/50',    label: 'text-red-500/50' },
            { cls: 'text-emerald-500/75',label: 'text-emerald-500/75' },
            { cls: 'text-purple-500/90', label: 'text-purple-500/90' },
          ].map(({ cls, label: l }) => {
            const style = tws(`text-2xl font-bold ${cls}`, true);
            return (
              <div key={cls}>
                <span style={style}>{l}</span>
                <p style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: '#9ca3af', marginTop: '4px' }}>
                  {style.color || '(not resolved in SSR)'}
                </p>
              </div>
            );
          })}
        </div>

        {/* Resolved output table */}
        <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
          Resolved style objects
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '10px', marginBottom: '12px' }}>
          {['bg-blue-600/50', 'text-red-500/75', 'border-gray-400/40'].map(cls => (
            <div key={cls} style={{ background: '#f9fafb', borderRadius: '8px', padding: '10px' }}>
              <p style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#374151', marginBottom: '6px', fontWeight: 600 }}>{cls}</p>
              <StyleOutput styles={tws(cls, true)} />
            </div>
          ))}
        </div>

        <div className={codeBlock}>{
`tws('bg-blue-600/50')      // → "background-color: rgba(37, 99, 235, 0.5);"
tws('text-red-500/75')     // → "color: rgba(239, 68, 68, 0.75);"
tws('border-gray-300/40')  // → "border-color: rgba(209, 213, 219, 0.4);"

// JSON mode
tws('bg-blue-600/50', true)
// → { backgroundColor: 'rgba(37, 99, 235, 0.5)' }

// Note: fractions (w-2/3, h-1/2) are NOT treated as opacity modifiers
tws('w-2/3')  // → "width: 66.666667%;" (fraction, not opacity)`
        }</div>
      </div>

      {/* ── Arbitrary Values ─────────────────────────────────────────────── */}
      <div className={section}>
        <h2 className={sectionTitle}>tws() — Arbitrary Values</h2>
        <p className={label}>
          Use <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>[value]</code> brackets to pass
          any CSS value directly. Works with any utility that has a corresponding CSS property.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px', marginBottom: '14px' }}>
          {[
            { cls: 'w-[200px] h-[80px] bg-[#4f46e5]',    label: 'Custom width + height + hex color' },
            { cls: 'text-[1.5rem] leading-[2.2rem] text-[#0f172a] font-bold', label: 'Custom font size + color' },
            { cls: 'rounded-[20px] p-[14px] bg-[#f0fdf4] border border-[#bbf7d0]', label: 'Custom radius + padding + color' },
            { cls: 'w-[120px] h-[120px] bg-[#7c3aed]',   label: 'Square with custom hex' },
          ].map(({ cls, label: l }) => {
            const style = tws(cls, true);
            const hasStyle = Object.keys(style).length > 0;
            return (
              <div key={cls} style={{ background: '#f9fafb', borderRadius: '10px', padding: '12px' }}>
                <p style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: '#6b7280', marginBottom: '8px', wordBreak: 'break-all' }}>
                  {l}
                </p>
                {hasStyle ? (
                  <div style={{ ...style, display: 'inline-block', minWidth: '40px', minHeight: '24px' }}>
                    {!style.color && <span style={{ fontSize: '0.7rem', color: '#374151' }}>Arbitrary</span>}
                  </div>
                ) : (
                  <div style={{ padding: '8px', background: '#fef3c7', borderRadius: '6px', fontSize: '0.72rem', color: '#92400e' }}>
                    Not resolved — may need browser context or unsupported arbitrary syntax
                  </div>
                )}
                <StyleOutput styles={style} />
              </div>
            );
          })}
        </div>

        <div className={codeBlock}>{
`// Arbitrary pixel values
tws('w-[200px] h-[80px]', true)
// → { width: '200px', height: '80px' }

// Arbitrary hex color
tws('bg-[#4f46e5] text-[#ffffff]', true)
// → { backgroundColor: '#4f46e5', color: '#ffffff' }

// Arbitrary font size
tws('text-[1.5rem] leading-[2rem]', true)
// → { fontSize: '1.5rem', lineHeight: '2rem' }

// Arbitrary border-radius
tws('rounded-[20px]', true)
// → { borderRadius: '20px' }

// Any valid CSS value works
tws('p-[14px]')           // → "padding: 14px;"
tws('mt-[-8px]')          // → "margin-top: -8px;"  (negative)
tws('opacity-[0.35]')     // → "opacity: 0.35;"`
        }</div>
      </div>

      {/* ── String vs JSON comparison ─────────────────────────────────────── */}
      <div className={section}>
        <h2 className={sectionTitle}>tws() — String vs JSON: Side-by-side</h2>
        <p className={label}>Both modes from the same input — pick whichever fits your use case.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[
            'bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold',
            'shadow-md rounded-xl border border-gray-200 p-5',
          ].map(cls => {
            const str = tws(cls);
            const obj = tws(cls, true);
            return (
              <div key={cls} style={{ background: '#f9fafb', borderRadius: '10px', padding: '12px' }}>
                <p style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#374151', marginBottom: '10px', fontWeight: 600, wordBreak: 'break-all' }}>
                  '{cls}'
                </p>
                <p style={{ fontSize: '0.68rem', fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}>String mode (convertToJson=false):</p>
                <p style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: '#059669', wordBreak: 'break-all', lineHeight: 1.5, marginBottom: '10px' }}>
                  {str || <em style={{ color: '#9ca3af' }}>empty</em>}
                </p>
                <p style={{ fontSize: '0.68rem', fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}>JSON mode (convertToJson=true):</p>
                <StyleOutput styles={obj} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Live Playground ───────────────────────────────────────────────── */}
      <div className={section}>
        <h2 className={sectionTitle}>tws() — Live Playground</h2>
        <p className={label}>
          Type any Tailwind classes. Click a preset number to load an example. Switch between JSON and CSS string output.
        </p>
        <TwsPlayground />
      </div>

      {/* ── Limitations ───────────────────────────────────────────────────── */}
      <div className={section}>
        <h2 className={sectionTitle}>tws() — When to Use & Limitations</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '14px' }}>
            <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#15803d', marginBottom: '10px' }}>✓ Best for</p>
            <ul style={{ fontSize: '0.8rem', color: '#166534', lineHeight: 2, paddingLeft: '16px', margin: 0 }}>
              <li>React <code>style</code> prop (inline styles)</li>
              <li>Vanilla JS / non-React environments</li>
              <li>Dynamic runtime styles from user input</li>
              <li>Server-rendered <code>style=""</code> attributes</li>
              <li>Opacity modifiers (<code>bg-blue/50</code>)</li>
              <li>Arbitrary CSS values (<code>w-[320px]</code>)</li>
            </ul>
          </div>
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '14px' }}>
            <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#dc2626', marginBottom: '10px' }}>✗ Not supported</p>
            <ul style={{ fontSize: '0.8rem', color: '#991b1b', lineHeight: 2, paddingLeft: '16px', margin: 0 }}>
              <li>Pseudo-classes (<code>hover:</code>, <code>focus:</code>)</li>
              <li>Responsive prefixes (<code>md:</code>, <code>lg:</code>)</li>
              <li>Dark mode (<code>dark:</code>)</li>
              <li>Group/peer states (<code>group-hover:</code>)</li>
            </ul>
            <div style={{ marginTop: '10px', background: '#fee2e2', borderRadius: '6px', padding: '8px 10px' }}>
              <p style={{ fontSize: '0.75rem', color: '#7f1d1d', fontWeight: 600 }}>→ Use <code>tw()</code> for these cases</p>
              <p style={{ fontSize: '0.72rem', color: '#991b1b', marginTop: '2px' }}>
                <code>tw()</code> injects real CSS with full selector support.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
