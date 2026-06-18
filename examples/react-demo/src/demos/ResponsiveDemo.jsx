import React, { useState } from 'react';
import { tw, cx } from 'tailwind-to-style';

// ── Demo styles ───────────────────────────────────────────────────────────────

const section      = tw('demo-section',   'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm');
const sectionTitle = tw('demo-title',     'text-xl font-semibold text-gray-900 mb-4');
const label        = tw('demo-label',     'text-sm text-gray-500 mb-3 font-medium');
const codeBlock    = tw('resp-code',      'bg-gray-900 text-green-400 rounded-lg px-4 py-3 text-xs font-mono mt-3 overflow-x-auto whitespace-pre');

// ── Pseudo-state components ───────────────────────────────────────────────────

const hoverCard = tw('hover-card',
  'p-4 rounded-xl border border-gray-200 bg-white cursor-pointer transition-all duration-200 ' +
  'hover:bg-blue-50 hover:border-blue-300 hover:shadow-md hover:scale-[1.02]'
);

const focusInput = tw('focus-input',
  'w-full px-4 py-2 rounded-lg border border-gray-300 text-sm outline-none transition-all duration-200 ' +
  'focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:shadow-sm'
);

const activeBtn = tw(
  'active-btn',
  'px-5 py-2.5 rounded-lg font-semibold text-sm bg-blue-600 text-white border-none cursor-pointer transition-all duration-150 ' +
  'hover:bg-blue-700 active:scale-95 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'
);

const disabledStyle = tw({
  name: 'disabled-field',
  base: 'px-4 py-2 rounded-lg border text-sm transition-all',
  variants: {
    disabled: {
      true:  'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-60',
      false: 'bg-white border-gray-300 text-gray-900 cursor-text',
    },
  },
  defaultVariants: { disabled: false },
});

// ── Group hover ───────────────────────────────────────────────────────────────

const groupContainer = tw('group-container', 'group flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors');
const groupIcon      = tw('group-icon',      'w-9 h-9 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 transition-colors group-hover:bg-blue-500 group-hover:text-white');
const groupLabel     = tw('group-label',     'text-sm font-semibold text-gray-700 transition-colors group-hover:text-blue-700');
const groupArrow     = tw('group-arrow',     'ml-auto text-gray-300 transition-all group-hover:text-blue-500 group-hover:translate-x-1');

// ── Responsive variants ───────────────────────────────────────────────────────
// tw() supports sm: md: lg: xl: prefixes natively

const responsiveGrid = tw('resp-grid',
  'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
);

const responsiveCard = tw('resp-card',
  'p-4 sm:p-5 lg:p-6 rounded-xl border border-gray-200 bg-white shadow-sm'
);

const responsiveText = tw('resp-text',
  'text-sm sm:text-base lg:text-lg font-semibold text-gray-900'
);

const responsiveBtn = tw('resp-btn',
  'w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-blue-600 text-white font-semibold text-sm sm:text-base border-none cursor-pointer transition-colors hover:bg-blue-700'
);

// ── Dark mode ─────────────────────────────────────────────────────────────────
// Uses tw() with dark: prefix — actual dark mode requires prefers-color-scheme or .dark class

const darkCard = tw('dark-card',
  'p-5 rounded-xl border transition-colors ' +
  'bg-white border-gray-200 text-gray-900 ' +
  'dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100'
);

const darkText = tw('dark-text', 'text-sm text-gray-500 dark:text-gray-400 mt-1');
const darkBtn  = tw('dark-btn',
  'mt-3 px-4 py-2 rounded-lg text-sm font-medium border-none cursor-pointer transition-colors ' +
  'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400'
);

// ── responsiveVariants via tw() object config ─────────────────────────────────

const respButton = tw({
  name: 'resp-button',
  base: 'inline-flex items-center justify-center font-semibold rounded-lg border-none cursor-pointer transition-colors',
  variants: {
    size: {
      sm: 'text-xs px-3 py-1.5',
      md: 'text-sm px-4 py-2',
      lg: 'text-base px-6 py-3',
    },
    color: {
      blue:  'bg-blue-600 text-white hover:bg-blue-700',
      gray:  'bg-gray-200 text-gray-800 hover:bg-gray-300',
    },
  },
  responsiveVariants: ['size'],
  defaultVariants: { size: 'md', color: 'blue' },
});

// ── Main Demo ─────────────────────────────────────────────────────────────────

export function ResponsiveDemo() {
  const [disabled, setDisabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>

      {/* Pseudo-states */}
      <div className={section}>
        <h2 className={sectionTitle}>Pseudo-States — hover, focus, active, disabled</h2>
        <p className={label}>
          These only work with <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>tw()</code> (not <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>tws()</code>),
          because they inject real CSS with pseudo-class selectors.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '420px' }}>
          {/* hover */}
          <div className={hoverCard}>
            <p style={{ fontWeight: 600, fontSize: '0.9rem', color: '#374151' }}>hover: variant</p>
            <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '4px' }}>Hover me — bg, border, shadow, scale all change</p>
          </div>

          {/* focus */}
          <input className={focusInput} placeholder="focus: ring appears on focus" />

          {/* active */}
          <button className={activeBtn}>active: scales down on press</button>

          {/* disabled */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              className={disabledStyle({ disabled })}
              disabled={disabled}
              defaultValue="Field value"
              readOnly
            />
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
              <input type="checkbox" checked={disabled} onChange={e => setDisabled(e.target.checked)} />
              disabled
            </label>
          </div>
        </div>

        <div className={codeBlock}>{
`const btn = tw(
  'px-5 py-2.5 rounded-lg bg-blue-600 text-white ' +
  'hover:bg-blue-700 active:scale-95 active:bg-blue-800 ' +
  'focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'
);

// CSS injected:
// .tw-hover-bg-blue-700:hover { background-color: ... }
// .tw-active-scale-95:active { transform: scale(0.95) }
// .tw-focus-ring-2:focus { box-shadow: ... }`
        }</div>
      </div>

      {/* Group Hover */}
      <div className={section}>
        <h2 className={sectionTitle}>group-hover — Parent-triggered States</h2>
        <p className={label}>
          Add <code>group</code> to a parent, then use <code>group-hover:</code> on children.
          The child updates when the <em>parent</em> is hovered.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '360px' }}>
          {['Dashboard', 'Settings', 'Analytics'].map((item, i) => (
            <div key={item} className={groupContainer}>
              <div className={groupIcon}>
                {['⬛', '⚙️', '📊'][i]}
              </div>
              <div>
                <p className={groupLabel}>{item}</p>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Click to navigate</p>
              </div>
              <span className={groupArrow}>→</span>
            </div>
          ))}
        </div>

        <div className={codeBlock}>{
`// Parent gets 'group' class
const row = tw('group flex items-center gap-3 p-3 rounded-xl border hover:border-blue-300 hover:bg-blue-50');

// Children use group-hover:
const icon  = tw('... bg-gray-200 group-hover:bg-blue-500 group-hover:text-white');
const label = tw('... text-gray-700 group-hover:text-blue-700');
const arrow = tw('... text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1');`
        }</div>
      </div>

      {/* Responsive */}
      <div className={section}>
        <h2 className={sectionTitle}>Responsive Breakpoints — sm: md: lg: xl:</h2>
        <p className={label}>
          tw() supports all Tailwind responsive prefixes. Resize the window to see layout shifts.
        </p>

        <div className={responsiveGrid} style={{ marginBottom: '12px' }}>
          {['Card A', 'Card B', 'Card C'].map(c => (
            <div key={c} className={responsiveCard}>
              <h3 className={responsiveText}>{c}</h3>
              <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '4px' }}>
                <code>grid-cols-1</code> → <code>sm:grid-cols-2</code> → <code>lg:grid-cols-3</code>
              </p>
            </div>
          ))}
        </div>

        <button className={responsiveBtn}>
          w-full → sm:w-auto
        </button>

        <div className={codeBlock}>{
`// Responsive grid
const grid = tw('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4');

// Responsive padding
const card = tw('p-4 sm:p-5 lg:p-6 rounded-xl border bg-white');

// Responsive button (full-width mobile, auto on larger)
const btn  = tw('w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-blue-600 text-white');`
        }</div>
      </div>

      {/* responsiveVariants */}
      <div className={section}>
        <h2 className={sectionTitle}>responsiveVariants — Per-Breakpoint Variant Values</h2>
        <p className={label}>
          Enable <code>responsiveVariants: ['size']</code> in your tw() config, then pass an object
          like <code>{`{ initial: 'sm', md: 'lg' }`}</code> as the variant value.
        </p>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {/* Static variants */}
          <button className={respButton({ size: 'sm' })}>sm</button>
          <button className={respButton({ size: 'md' })}>md</button>
          <button className={respButton({ size: 'lg' })}>lg</button>
          {/* Responsive variant */}
          <button className={respButton({ size: { initial: 'sm', md: 'lg' }, color: 'gray' })}>
            sm → md:lg
          </button>
        </div>

        <div className={codeBlock}>{
`const btn = tw({
  name: 'resp-btn',
  base: 'inline-flex items-center rounded-lg font-semibold border-none cursor-pointer',
  variants: {
    size: { sm: 'text-xs px-3 py-1.5', md: 'text-sm px-4 py-2', lg: 'text-base px-6 py-3' },
    color: { blue: 'bg-blue-600 text-white', gray: 'bg-gray-200 text-gray-800' },
  },
  responsiveVariants: ['size'],  // ← enable responsive for 'size'
  defaultVariants: { size: 'md', color: 'blue' },
});

// Static
btn({ size: 'lg' })

// Responsive — different value per breakpoint
btn({ size: { initial: 'sm', md: 'lg' } })
// Generates: .resp-btn { /* sm classes */ } @media (min-width: 768px) { .resp-btn { /* lg classes */ } }`
        }</div>
      </div>

      {/* Dark mode */}
      <div className={section}>
        <h2 className={sectionTitle}>Dark Mode — dark: prefix</h2>
        <p className={label}>
          tw() supports <code>dark:</code> prefix. It targets <code>@media (prefers-color-scheme: dark)</code> or
          the <code>.dark</code> class on a parent (depending on Tailwind config).
          Toggle below to simulate with a manual class.
        </p>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '14px', fontSize: '0.85rem', fontWeight: 500 }}>
          <input type="checkbox" checked={darkMode} onChange={e => setDarkMode(e.target.checked)} />
          Simulate dark mode (adds .dark class)
        </label>

        <div className={darkMode ? 'dark' : ''} style={{ borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', padding: darkMode ? '16px' : '0', background: darkMode ? '#111827' : 'transparent', borderRadius: '12px' }}>
            {['Card A', 'Card B', 'Card C'].map(c => (
              <div key={c} className={darkCard}>
                <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{c}</p>
                <p className={darkText}>dark:bg-gray-800 dark:text-gray-100</p>
                <button className={darkBtn}>dark:bg-blue-500</button>
              </div>
            ))}
          </div>
        </div>

        <div className={codeBlock}>{
`const card = tw(
  'p-5 rounded-xl border transition-colors ' +
  'bg-white border-gray-200 text-gray-900 ' +           // light
  'dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100'  // dark
);

// CSS injected:
// .dark .tw-dark-bg-gray-800 { background-color: rgb(31, 41, 55) }
// OR @media (prefers-color-scheme: dark) { ... }`
        }</div>
      </div>

    </div>
  );
}
