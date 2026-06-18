import React, { useState } from 'react';
import { tw, cx } from 'tailwind-to-style';

// ── Demo styles ───────────────────────────────────────────────────────────────

const section      = tw('demo-section',  'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm');
const sectionTitle = tw('demo-title',    'text-xl font-semibold text-gray-900 mb-4');
const label        = tw('demo-label',    'text-sm text-gray-500 mb-3 font-medium');
const codeBlock    = tw('cv-code',       'bg-gray-900 text-green-400 rounded-lg px-4 py-3 text-xs font-mono mt-3 overflow-x-auto whitespace-pre');

// ═══════════════════════════════════════════════════════════════════════════════
// 1. compoundVariants — apply extra classes when MULTIPLE variants match
// ═══════════════════════════════════════════════════════════════════════════════

const alert = tw({
  name: 'alert',
  base: 'flex items-start gap-3 rounded-xl border px-4 py-3 text-sm',
  variants: {
    color: {
      blue:   'border-blue-200 bg-blue-50 text-blue-800',
      green:  'border-emerald-200 bg-emerald-50 text-emerald-800',
      red:    'border-red-200 bg-red-50 text-red-800',
      yellow: 'border-yellow-200 bg-yellow-50 text-yellow-800',
    },
    size: {
      sm:  'text-xs px-3 py-2',
      md:  'text-sm px-4 py-3',
      lg:  'text-base px-5 py-4',
    },
    outline: {
      true: 'bg-transparent',
    },
    dismissable: {
      true: 'pr-10 relative',
    },
  },
  // ← these classes ONLY apply when all listed variant conditions are met
  compoundVariants: [
    // bold border when outline + blue
    { color: 'blue',   outline: true, class: 'border-2 border-blue-400' },
    { color: 'green',  outline: true, class: 'border-2 border-emerald-400' },
    { color: 'red',    outline: true, class: 'border-2 border-red-400' },
    { color: 'yellow', outline: true, class: 'border-2 border-yellow-400' },
    // large+dismissable: bigger close button spacing
    { size: 'lg', dismissable: true, class: 'pr-14' },
  ],
  defaultVariants: { color: 'blue', size: 'md', outline: false, dismissable: false },
});

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Boolean variants — variant key maps to true/false
// ═══════════════════════════════════════════════════════════════════════════════

const pill = tw({
  name: 'pill',
  base: 'inline-flex items-center gap-1.5 rounded-full font-medium transition-all border',
  variants: {
    size: {
      sm: 'text-xs px-2.5 py-0.5',
      md: 'text-sm px-3 py-1',
      lg: 'text-base px-4 py-1.5',
    },
    active: {
      true:  'bg-blue-600 text-white border-blue-600 shadow-sm',
      false: 'bg-white text-gray-600 border-gray-300 hover:border-gray-400',
    },
    removable: {
      true: 'pr-1.5',
    },
  },
  defaultVariants: { size: 'md', active: false },
});

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Extend — compose variant configs
// ═══════════════════════════════════════════════════════════════════════════════
// Base button
const baseBtn = tw({
  name: 'base-btn',
  base: 'inline-flex items-center justify-center font-semibold rounded-lg border-none cursor-pointer transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-offset-2',
  variants: {
    size: {
      sm: 'text-xs px-3 py-1.5',
      md: 'text-sm px-4 py-2',
      lg: 'text-base px-6 py-3',
    },
  },
  defaultVariants: { size: 'md' },
});

// Extended — adds color variants on top of size
const extendedBtn = tw({
  name: 'extended-btn',
  base: 'inline-flex items-center justify-center font-semibold rounded-lg border-none cursor-pointer transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-offset-2',
  variants: {
    size: {
      sm: 'text-xs px-3 py-1.5',
      md: 'text-sm px-4 py-2',
      lg: 'text-base px-6 py-3',
    },
    color: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400',
      danger:  'bg-red-600 text-white hover:bg-red-700 focus:ring-red-400',
      success: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-400',
    },
    ghost: {
      true: 'bg-transparent border-2',
    },
  },
  compoundVariants: [
    { color: 'primary', ghost: true,  class: 'text-blue-600 border-blue-600 hover:bg-blue-50 focus:ring-blue-300' },
    { color: 'danger',  ghost: true,  class: 'text-red-600 border-red-600 hover:bg-red-50 focus:ring-red-300' },
    { color: 'success', ghost: true,  class: 'text-emerald-600 border-emerald-600 hover:bg-emerald-50 focus:ring-emerald-300' },
    { color: 'primary', size: 'lg', class: 'shadow-lg shadow-blue-500/25 active:scale-95' },
    { color: 'danger',  size: 'lg', class: 'shadow-lg shadow-red-500/25 active:scale-95'  },
  ],
  defaultVariants: { size: 'md', color: 'primary', ghost: false },
});

// ═══════════════════════════════════════════════════════════════════════════════
// 4. cx.with() advanced — component factories
// ═══════════════════════════════════════════════════════════════════════════════

const makeListItem = cx.with(
  tw('flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white transition-colors hover:bg-gray-50')
);

const makeTagBase = cx.with(tw('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold'));

// ── Main Demo ─────────────────────────────────────────────────────────────────

export function CompoundVariantsDemo() {
  const [alertColor, setAlertColor]     = useState('blue');
  const [alertSize, setAlertSize]       = useState('md');
  const [alertOutline, setAlertOutline] = useState(false);
  const [alertDismiss, setAlertDismiss] = useState(false);
  const [dismissed, setDismissed]       = useState(false);

  const [pillActive, setPillActive]   = useState([true, false, false]);
  const togglePill = i => setPillActive(p => p.map((v, idx) => idx === i ? !v : v));

  const [btnColor, setBtnColor] = useState('primary');
  const [btnSize, setBtnSize]   = useState('md');
  const [btnGhost, setBtnGhost] = useState(false);

  return (
    <div>

      {/* 1. compoundVariants */}
      <div className={section}>
        <h2 className={sectionTitle}>compoundVariants — Multi-condition Extra Classes</h2>
        <p className={label}>
          Compound variants apply <em>additional</em> classes only when <strong>all</strong> listed variant conditions match.
          Here: <code>outline+color</code> adds a thicker border; <code>size:lg+dismissable</code> adds extra right padding.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>color</p>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['blue', 'green', 'red', 'yellow'].map(c => (
                <button key={c} onClick={() => { setAlertColor(c); setDismissed(false); }}
                  style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer', border: '1px solid',
                    background: alertColor === c ? '#1e40af' : '#f3f4f6', color: alertColor === c ? 'white' : '#374151',
                    borderColor: alertColor === c ? '#1e40af' : '#d1d5db' }}>{c}</button>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>size</p>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['sm', 'md', 'lg'].map(s => (
                <button key={s} onClick={() => setAlertSize(s)}
                  style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer', border: '1px solid',
                    background: alertSize === s ? '#1e40af' : '#f3f4f6', color: alertSize === s ? 'white' : '#374151',
                    borderColor: alertSize === s ? '#1e40af' : '#d1d5db' }}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>modifiers</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '0.82rem' }}>
                <input type="checkbox" checked={alertOutline} onChange={e => setAlertOutline(e.target.checked)} />
                outline
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '0.82rem' }}>
                <input type="checkbox" checked={alertDismiss} onChange={e => { setAlertDismiss(e.target.checked); setDismissed(false); }} />
                dismissable
              </label>
            </div>
          </div>
        </div>

        {!dismissed ? (
          <div className={alert({ color: alertColor, size: alertSize, outline: alertOutline, dismissable: alertDismiss })}>
            <span style={{ flexShrink: 0, fontSize: '1rem' }}>
              {{ blue: 'ℹ️', green: '✅', red: '⚠️', yellow: '🔔' }[alertColor]}
            </span>
            <div>
              <p style={{ fontWeight: 600, marginBottom: '2px' }}>Alert — {alertColor} / {alertSize}{alertOutline ? ' / outline' : ''}{alertDismiss ? ' / dismissable' : ''}</p>
              <p style={{ opacity: 0.8 }}>compoundVariant adds thick border when outline+color match</p>
            </div>
            {alertDismiss && (
              <button onClick={() => setDismissed(true)}
                style={{ position: 'absolute', top: '8px', right: '8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', opacity: 0.5 }}>
                ✕
              </button>
            )}
          </div>
        ) : (
          <button onClick={() => setDismissed(false)}
            style={{ fontSize: '0.82rem', padding: '6px 14px', borderRadius: '8px', border: '1px solid #d1d5db', cursor: 'pointer', background: '#f9fafb' }}>
            Restore alert
          </button>
        )}

        <div className={codeBlock}>{
`const alert = tw({
  name: 'alert',
  base: 'flex items-start gap-3 rounded-xl border px-4 py-3 text-sm',
  variants: {
    color:      { blue: 'border-blue-200 bg-blue-50 text-blue-800', red: '...' },
    outline:    { true: 'bg-transparent' },
    dismissable:{ true: 'pr-10 relative' },
  },
  compoundVariants: [
    // Only applies when BOTH color:'blue' AND outline:true
    { color: 'blue', outline: true, class: 'border-2 border-blue-400' },
    // Only applies when size:'lg' AND dismissable:true
    { size: 'lg', dismissable: true, class: 'pr-14' },
  ],
});

alert({ color: 'blue' })               // no extra border
alert({ color: 'blue', outline: true }) // ← adds 'border-2 border-blue-400'`
        }</div>
      </div>

      {/* 2. Boolean variants */}
      <div className={section}>
        <h2 className={sectionTitle}>Boolean Variants — true/false keys</h2>
        <p className={label}>
          Any variant can have <code>true</code> and <code>false</code> as option keys.
          Pass a boolean prop directly: <code>{`pill({ active: true })`}</code>.
        </p>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {['React', 'TypeScript', 'Tailwind'].map((tag, i) => (
            <button
              key={tag}
              className={pill({ active: pillActive[i], removable: true })}
              onClick={() => togglePill(i)}
              style={{ border: 'none', cursor: 'pointer' }}
            >
              {tag}
              <span style={{ opacity: 0.6, fontSize: '0.75em', marginLeft: '2px' }}>
                {pillActive[i] ? '✕' : '+'}
              </span>
            </button>
          ))}
        </div>

        <div className={codeBlock}>{
`const pill = tw({
  name: 'pill',
  base: 'inline-flex items-center rounded-full font-medium border',
  variants: {
    active: {
      true:  'bg-blue-600 text-white border-blue-600',  // ← boolean true
      false: 'bg-white text-gray-600 border-gray-300',  // ← boolean false
    },
    removable: { true: 'pr-1.5' },
  },
  defaultVariants: { active: false },
});

pill({ active: true })  // → solid blue
pill({ active: false }) // → outlined (default)`
        }</div>
      </div>

      {/* 3. Extended config + compound variants */}
      <div className={section}>
        <h2 className={sectionTitle}>compoundVariants + ghost — Interaction of 3 Variants</h2>
        <p className={label}>
          Compound variants become powerful when combining 3+ variant axes.
          Here <code>color+ghost</code> switches to an outline style, and <code>color+size:lg</code> adds elevated shadow + active scale.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>color</p>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['primary', 'danger', 'success'].map(c => (
                <button key={c} onClick={() => setBtnColor(c)}
                  style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer', border: '1px solid',
                    background: btnColor === c ? '#1e40af' : '#f3f4f6', color: btnColor === c ? 'white' : '#374151',
                    borderColor: btnColor === c ? '#1e40af' : '#d1d5db' }}>{c}</button>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>size</p>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['sm', 'md', 'lg'].map(s => (
                <button key={s} onClick={() => setBtnSize(s)}
                  style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer', border: '1px solid',
                    background: btnSize === s ? '#1e40af' : '#f3f4f6', color: btnSize === s ? 'white' : '#374151',
                    borderColor: btnSize === s ? '#1e40af' : '#d1d5db' }}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>ghost</p>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
              <input type="checkbox" checked={btnGhost} onChange={e => setBtnGhost(e.target.checked)} />
              outline mode
            </label>
          </div>
        </div>

        <button className={extendedBtn({ color: btnColor, size: btnSize, ghost: btnGhost })}>
          {btnColor} / {btnSize}{btnGhost ? ' / ghost' : ''}
          {btnSize === 'lg' && !btnGhost ? ' (elevated shadow!)' : ''}
        </button>

        <div className={codeBlock}>{
`compoundVariants: [
  // ghost+color → outline style
  { color: 'primary', ghost: true, class: 'text-blue-600 border-blue-600 hover:bg-blue-50' },
  { color: 'danger',  ghost: true, class: 'text-red-600 border-red-600 hover:bg-red-50' },

  // color+lg → elevated shadow + press animation
  { color: 'primary', size: 'lg', class: 'shadow-lg shadow-blue-500/25 active:scale-95' },
  { color: 'danger',  size: 'lg', class: 'shadow-lg shadow-red-500/25 active:scale-95' },
]`
        }</div>
      </div>

      {/* 4. cx.with() factories */}
      <div className={section}>
        <h2 className={sectionTitle}>cx.with() — Advanced Component Factories</h2>
        <p className={label}>
          <code>cx.with()</code> creates reusable composition helpers. Build list items, tags, and other repeating
          patterns without duplicating base classes.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '400px', marginBottom: '12px' }}>
          {[
            { icon: '⭐', label: 'Stars', tag: 'Popular', tagColor: '#fef3c7', tagText: '#92400e' },
            { icon: '🔥', label: 'Trending',  tag: 'Hot', tagColor: '#fee2e2', tagText: '#991b1b' },
            { icon: '✅', label: 'Completed', tag: 'Done', tagColor: '#d1fae5', tagText: '#065f46' },
          ].map(item => (
            <div key={item.label} className={makeListItem()}>
              <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#374151', flex: 1 }}>{item.label}</span>
              <span className={makeTagBase()}
                style={{ background: item.tagColor, color: item.tagText }}>
                {item.tag}
              </span>
            </div>
          ))}
        </div>

        <div className={codeBlock}>{
`// cx.with() dengan tw() — CSS di-inject, layout ngefek
const makeListItem = cx.with(
  tw('flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50')
);

const makeTagBase = cx.with(tw('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold'));

// Use with zero duplication
<div className={makeListItem()}>...</div>
<div className={makeListItem(tw('border-blue-200 bg-blue-50'))}>...</div>  // override

<span className={makeTagBase()} style={{ background: '#fef3c7', color: '#92400e' }}>Popular</span>
<span className={makeTagBase()} style={{ background: '#fee2e2', color: '#991b1b' }}>Hot</span>`
        }</div>
      </div>

    </div>
  );
}
