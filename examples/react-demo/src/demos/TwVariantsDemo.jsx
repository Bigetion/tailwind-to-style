import React, { useState } from 'react';
import { tw, cx } from 'tailwind-to-style';

// ── Demo styles ───────────────────────────────────────────────────────────────

const section      = tw('demo-section',   'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm');
const sectionTitle = tw('demo-title',     'text-xl font-semibold text-gray-900 mb-4');
const label        = tw('demo-label',     'text-sm text-gray-500 mb-3 font-medium');
const codeBlock    = tw('tw-code',        'bg-gray-900 text-green-400 rounded-lg px-4 py-3 text-xs font-mono mt-3 overflow-x-auto whitespace-pre');

// ── Mode 1: Atomic String ─────────────────────────────────────────────────────
// tw('classes') — injects CSS, returns atomic class names (tw-* prefix)
// Supports hover, focus, responsive, dark mode — unlike tws()

const atomicBox = tw('flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400');

// ── Mode 2: Named Classes ─────────────────────────────────────────────────────
// tw('name', 'classes') — injects CSS under a readable named class

const card     = tw('feature-card',   'bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow');
const cardHead = tw('feature-card-h', 'text-base font-semibold text-gray-900 mb-1');
const cardBody = tw('feature-card-b', 'text-sm text-gray-500');

// ── Mode 3: Variants ──────────────────────────────────────────────────────────
// tw({ name, base, variants, compoundVariants, defaultVariants }) → selector fn

const chip = tw({
  name: 'chip',
  base: 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border cursor-default select-none',
  variants: {
    color: {
      blue:    'bg-blue-50 text-blue-700 border-blue-200',
      green:   'bg-emerald-50 text-emerald-700 border-emerald-200',
      red:     'bg-red-50 text-red-700 border-red-200',
      yellow:  'bg-yellow-50 text-yellow-700 border-yellow-200',
      purple:  'bg-purple-50 text-purple-700 border-purple-200',
      gray:    'bg-gray-100 text-gray-600 border-gray-200',
    },
    size: {
      sm: 'text-[0.65rem] px-2 py-0.5',
      md: 'text-xs px-3 py-1',
      lg: 'text-sm px-4 py-1.5',
    },
    dot: {
      true: '',
    },
  },
  compoundVariants: [
    { color: 'blue',   dot: true, class: "before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-blue-500" },
    { color: 'green',  dot: true, class: "before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-emerald-500" },
    { color: 'red',    dot: true, class: "before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-red-500" },
    { color: 'yellow', dot: true, class: "before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-yellow-500" },
  ],
  defaultVariants: { color: 'gray', size: 'md' },
});

// ── Mode 4: Slots ─────────────────────────────────────────────────────────────
// tw({ name, slots, variants }) → slot-generating fn
// Each call returns an object: { slot1: 'className', slot2: 'className' }

const panel = tw({
  name: 'panel',
  slots: {
    root:    'rounded-xl border overflow-hidden',
    header:  'flex items-center justify-between px-5 py-3 border-b font-semibold text-sm',
    body:    'px-5 py-4 text-sm text-gray-600',
    footer:  'px-5 py-3 border-t bg-gray-50 text-xs text-gray-500',
  },
  variants: {
    intent: {
      default: {
        root:   'bg-white border-gray-200 shadow-sm',
        header: 'bg-white text-gray-900 border-gray-100',
        footer: 'border-gray-100',
      },
      info: {
        root:   'bg-blue-50 border-blue-200',
        header: 'bg-blue-100 text-blue-900 border-blue-200',
        footer: 'border-blue-200 bg-blue-50 text-blue-600',
      },
      warning: {
        root:   'bg-yellow-50 border-yellow-300',
        header: 'bg-yellow-100 text-yellow-900 border-yellow-200',
        footer: 'border-yellow-200 bg-yellow-50 text-yellow-700',
      },
      success: {
        root:   'bg-emerald-50 border-emerald-200',
        header: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        footer: 'border-emerald-200 bg-emerald-50 text-emerald-700',
      },
    },
  },
  defaultVariants: { intent: 'default' },
});

// ── Component using slots ─────────────────────────────────────────────────────

function Panel({ intent, title, children, footer }) {
  const slots = panel({ intent });
  return (
    <div className={slots.root}>
      <div className={slots.header}>{title}</div>
      <div className={slots.body}>{children}</div>
      {footer && <div className={slots.footer}>{footer}</div>}
    </div>
  );
}

// ── Main Demo ─────────────────────────────────────────────────────────────────

export function TwVariantsDemo() {
  const [chipColor, setChipColor] = useState('blue');
  const [chipSize, setChipSize]   = useState('md');
  const [chipDot, setChipDot]     = useState(true);
  const [panelIntent, setPanelIntent] = useState('warning');

  return (
    <div>

      {/* Mode 1: Atomic String */}
      <div className={section}>
        <h2 className={sectionTitle}>tw() — Mode 1: Atomic String</h2>
        <p className={label}>
          <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>tw('classes')</code> injects
          CSS and returns atomic class names. Unlike{' '}
          <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>tws()</code>,
          this supports <code>hover:</code>, <code>focus:</code>, responsive breakpoints, etc.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
          <button className={atomicBox} style={{ border: 'none', cursor: 'pointer' }}>Atomic button</button>
          <button className={tw('px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium transition-colors')}
            style={{ border: 'none', cursor: 'pointer' }}>
            Hover me
          </button>
          <button className={tw('px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 text-sm font-medium transition-colors')}
            style={{ border: 'none', cursor: 'pointer' }}>
            Focus me (tab)
          </button>
        </div>

        <div className={codeBlock}>{
`import { tw } from 'tailwind-to-style';

// tw() returns atomic class names + injects real CSS
const cls = tw('flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700');
// → "tw-flex tw-items-center tw-gap-2 ... tw-hover-bg-blue-700"
// CSS is auto-injected: .tw-hover-bg-blue-700:hover { background-color: ... }

<button className={cls}>Click me</button>`
        }</div>
      </div>

      {/* Mode 2: Named Classes */}
      <div className={section}>
        <h2 className={sectionTitle}>tw() — Mode 2: Named Classes</h2>
        <p className={label}>
          <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>tw('name', 'classes')</code>
          {' '}injects CSS under a readable named class instead of atomic hashes. Ideal for reusable design tokens.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginBottom: '12px' }}>
          {['Feature A', 'Feature B', 'Feature C'].map(f => (
            <div key={f} className={card}>
              <h3 className={cardHead}>{f}</h3>
              <p className={cardBody}>Named classes keep your markup readable — the class name reflects intent, not a hash.</p>
            </div>
          ))}
        </div>

        <div className={codeBlock}>{
`// Named mode: tw('name', 'tailwind classes')
const card     = tw('feature-card',   'bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow');
const cardHead = tw('feature-card-h', 'text-base font-semibold text-gray-900 mb-1');
const cardBody = tw('feature-card-b', 'text-sm text-gray-500');

// The injected class is literally "feature-card", not a hash
<div className={card}>...</div>
// <div class="feature-card">  ← readable in devtools!`
        }</div>
      </div>

      {/* Mode 3: Variants */}
      <div className={section}>
        <h2 className={sectionTitle}>tw() — Mode 3: Variants (Object Config)</h2>
        <p className={label}>
          Pass a config object with <code>name</code>, <code>base</code>, <code>variants</code>, and optionally
          <code> compoundVariants</code> + <code>defaultVariants</code>. Returns a <em>selector function</em>.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>Color</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['blue', 'green', 'red', 'yellow', 'purple', 'gray'].map(c => (
                <button key={c} onClick={() => setChipColor(c)}
                  style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer', border: '1px solid',
                    background: chipColor === c ? '#1e40af' : '#f3f4f6', color: chipColor === c ? 'white' : '#374151',
                    borderColor: chipColor === c ? '#1e40af' : '#d1d5db' }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>Size</p>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['sm', 'md', 'lg'].map(s => (
                <button key={s} onClick={() => setChipSize(s)}
                  style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer', border: '1px solid',
                    background: chipSize === s ? '#1e40af' : '#f3f4f6', color: chipSize === s ? 'white' : '#374151',
                    borderColor: chipSize === s ? '#1e40af' : '#d1d5db' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>Dot</p>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
              <input type="checkbox" checked={chipDot} onChange={e => setChipDot(e.target.checked)} />
              compoundVariant dot
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span className={chip({ color: chipColor, size: chipSize, dot: chipDot })}>
            {chipColor} / {chipSize}{chipDot ? ' + dot' : ''}
          </span>
          <span className={chip({ color: 'blue' })}>Default size</span>
          <span className={chip({ color: 'green', dot: true })}>Active</span>
          <span className={chip({ color: 'red', size: 'sm' })}>Error</span>
        </div>

        <div className={codeBlock}>{
`const chip = tw({
  name: 'chip',
  base: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border',
  variants: {
    color: {
      blue:  'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      red:   'bg-red-50 text-red-700 border-red-200',
    },
    size: { sm: 'text-[0.65rem] px-2 py-0.5', md: 'text-xs px-3 py-1' },
    dot: { true: '' },
  },
  compoundVariants: [
    { color: 'blue', dot: true, class: "before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-blue-500" },
  ],
  defaultVariants: { color: 'gray', size: 'md' },
});

chip({ color: 'blue', size: 'lg', dot: true })  // → "chip chip--color-blue chip--size-lg ..."`
        }</div>
      </div>

      {/* Mode 4: Slots */}
      <div className={section}>
        <h2 className={sectionTitle}>tw() — Mode 4: Slots</h2>
        <p className={label}>
          Pass a <code>slots</code> object instead of <code>base</code> to style multi-part components.
          The selector function returns an object of class names keyed by slot.
        </p>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {['default', 'info', 'warning', 'success'].map(i => (
            <button key={i} onClick={() => setPanelIntent(i)}
              style={{ padding: '4px 14px', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer', border: '1px solid',
                background: panelIntent === i ? '#1e40af' : '#f3f4f6', color: panelIntent === i ? 'white' : '#374151',
                borderColor: panelIntent === i ? '#1e40af' : '#d1d5db' }}>
              {i}
            </button>
          ))}
        </div>

        <Panel
          intent={panelIntent}
          title={`${panelIntent.charAt(0).toUpperCase() + panelIntent.slice(1)} Panel`}
          footer="Footer text — also styled via slot"
        >
          This panel uses the <strong>slots</strong> feature. All sub-parts — root, header, body, footer — are styled in one call.
          Switch the intent to see coordinated color changes.
        </Panel>

        <div className={codeBlock}>{
`const panel = tw({
  name: 'panel',
  slots: {
    root:   'rounded-xl border overflow-hidden',
    header: 'flex items-center px-5 py-3 border-b font-semibold text-sm',
    body:   'px-5 py-4 text-sm text-gray-600',
    footer: 'px-5 py-3 border-t bg-gray-50 text-xs text-gray-500',
  },
  variants: {
    intent: {
      info: {
        root:   'bg-blue-50 border-blue-200',
        header: 'bg-blue-100 text-blue-900 border-blue-200',
        footer: 'border-blue-200 bg-blue-50 text-blue-600',
      },
    },
  },
  defaultVariants: { intent: 'default' },
});

// Returns an object of slot class names:
const slots = panel({ intent: 'info' });
// → { root: 'panel__root ...', header: 'panel__header ...', ... }

<div className={slots.root}>
  <div className={slots.header}>Title</div>
  <div className={slots.body}>Content</div>
  <div className={slots.footer}>Footer</div>
</div>`
        }</div>
      </div>

    </div>
  );
}
