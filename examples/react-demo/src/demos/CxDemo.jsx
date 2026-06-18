import React, { useState } from 'react';
import { tw, cx } from 'tailwind-to-style';

// ── Demo styles ───────────────────────────────────────────────────────────────

const section      = tw('demo-section',   'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm');
const sectionTitle = tw('demo-title',     'text-xl font-semibold text-gray-900 mb-4');
const label        = tw('demo-label',     'text-sm text-gray-500 mb-3 font-medium');
const codeBlock    = tw('cx-code',        'bg-gray-900 text-green-400 rounded-lg px-4 py-3 text-xs font-mono mt-3 overflow-x-auto whitespace-pre');
const divider      = tw('demo-divider',   'border-t border-gray-100 my-4');

// ── Helpers ───────────────────────────────────────────────────────────────────

function ResultBadge({ value }) {
  return (
    <div style={{ background: '#f3f4f6', borderRadius: '8px', padding: '8px 12px', marginTop: '10px' }}>
      <span style={{ fontSize: '0.68rem', color: '#9ca3af', fontFamily: 'monospace' }}>Result: </span>
      <code style={{ fontSize: '0.75rem', color: '#1d4ed8', fontFamily: 'monospace', wordBreak: 'break-all' }}>{value}</code>
    </div>
  );
}

// ── Section 1: Strings ────────────────────────────────────────────────────────

function StringsSection() {
  const result = cx('bg-blue-500', 'text-white', 'rounded-lg', 'px-4 py-2');
  return (
    <div className={section}>
      <h2 className={sectionTitle}>cx() — Strings</h2>
      <p className={label}>Multiple string arguments are joined with spaces. Falsy values are skipped.</p>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
        <button style={{ padding: '8px 16px', borderRadius: '8px', background: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}
          className={cx('font-semibold', 'transition-all', 'hover:opacity-90')}>
          cx joined
        </button>
        <button className={cx('px-4 py-2 rounded-lg text-sm font-medium', false && 'bg-red-500', null, undefined, 'bg-emerald-500 text-white')}
          style={{ border: 'none', cursor: 'pointer' }}>
          falsy skipped
        </button>
      </div>

      <ResultBadge value={result} />

      <div className={codeBlock}>{
`cx('bg-blue-500', 'text-white', 'rounded-lg', 'px-4 py-2')
// → "bg-blue-500 text-white rounded-lg px-4 py-2"

// Falsy values are silently ignored
cx('base', false, null, undefined, 0, '', 'appended')
// → "base appended"`
      }</div>
    </div>
  );
}

// ── Section 2: Conditionals ───────────────────────────────────────────────────

function ConditionalsSection() {
  const [isActive, setIsActive]     = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading]   = useState(false);

  const btnClass = cx(
    'px-4 py-2 rounded-lg text-sm font-medium transition-all border-none cursor-pointer',
    isActive   && 'bg-blue-600 text-white',
    !isActive  && 'bg-gray-200 text-gray-700',
    isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    isLoading  && 'animate-pulse',
  );

  return (
    <div className={section}>
      <h2 className={sectionTitle}>cx() — Conditionals</h2>
      <p className={label}>Use <code>&amp;&amp;</code> short-circuit to conditionally include classes.</p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
        {[
          { label: 'Active', state: isActive, set: setIsActive },
          { label: 'Disabled', state: isDisabled, set: setIsDisabled },
          { label: 'Loading', state: isLoading, set: setIsLoading },
        ].map(({ label: l, state, set }) => (
          <label key={l} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.85rem', color: '#374151' }}>
            <input type="checkbox" checked={state} onChange={e => set(e.target.checked)} />
            {l}
          </label>
        ))}
      </div>

      <button className={btnClass}>
        {isLoading ? 'Loading…' : isActive ? 'Active' : 'Inactive'}
      </button>

      <ResultBadge value={btnClass} />

      <div className={codeBlock}>{
`const btnClass = cx(
  'px-4 py-2 rounded-lg text-sm font-medium transition-all border-none cursor-pointer',
  isActive   && 'bg-blue-600 text-white',
  !isActive  && 'bg-gray-200 text-gray-700',
  isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
  isLoading  && 'animate-pulse',
);`
      }</div>
    </div>
  );
}

// ── Section 3: Object Syntax ──────────────────────────────────────────────────

function ObjectSyntaxSection() {
  const [variant, setVariant] = useState('primary');

  const result = cx('px-4 py-2 rounded-lg font-semibold text-sm transition-colors border-none cursor-pointer', {
    'bg-blue-600 text-white hover:bg-blue-700':     variant === 'primary',
    'bg-gray-200 text-gray-900 hover:bg-gray-300':  variant === 'secondary',
    'bg-red-600 text-white hover:bg-red-700':       variant === 'danger',
    'bg-emerald-600 text-white hover:bg-emerald-700': variant === 'success',
  });

  return (
    <div className={section}>
      <h2 className={sectionTitle}>cx() — Object Syntax</h2>
      <p className={label}>
        Object keys are class names, values are booleans (conditions). Only truthy keys are included.
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
        {['primary', 'secondary', 'danger', 'success'].map(v => (
          <button key={v} onClick={() => setVariant(v)}
            style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer', border: '1px solid',
              background: variant === v ? '#1e40af' : '#f3f4f6',
              color: variant === v ? 'white' : '#374151',
              borderColor: variant === v ? '#1e40af' : '#d1d5db' }}>
            {v}
          </button>
        ))}
      </div>

      <button className={result}>Object syntax button</button>

      <ResultBadge value={result} />

      <div className={codeBlock}>{
`cx('px-4 py-2 rounded-lg font-semibold text-sm transition-colors border-none cursor-pointer', {
  'bg-blue-600 text-white hover:bg-blue-700':      variant === 'primary',
  'bg-gray-200 text-gray-900 hover:bg-gray-300':   variant === 'secondary',
  'bg-red-600 text-white hover:bg-red-700':        variant === 'danger',
  'bg-emerald-600 text-white hover:bg-emerald-700': variant === 'success',
})`
      }</div>
    </div>
  );
}

// ── Section 4: Arrays ─────────────────────────────────────────────────────────

function ArraysSection() {
  const [showExtra, setShowExtra] = useState(true);

  const base   = ['px-4 py-2', 'rounded-lg', 'text-sm', 'font-medium'];
  const extras = showExtra ? ['ring-2', 'ring-blue-400', 'ring-offset-2'] : [];

  const result = cx(base, 'bg-indigo-600 text-white', extras);

  return (
    <div className={section}>
      <h2 className={sectionTitle}>cx() — Arrays</h2>
      <p className={label}>Pass arrays directly — they are flattened recursively. Nested arrays and conditionals work too.</p>

      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.85rem', marginBottom: '12px' }}>
        <input type="checkbox" checked={showExtra} onChange={e => setShowExtra(e.target.checked)} />
        Include ring classes (nested array)
      </label>

      <button className={result} style={{ border: 'none', cursor: 'pointer' }}>
        Array composed
      </button>

      <ResultBadge value={result} />

      <div className={codeBlock}>{
`const base   = ['px-4', 'py-2', 'rounded-lg', 'text-sm'];
const extras = showRing ? ['ring-2', 'ring-blue-400', 'ring-offset-2'] : [];

cx(base, 'bg-indigo-600 text-white', extras)
// → "px-4 py-2 rounded-lg text-sm bg-indigo-600 text-white ring-2 ring-blue-400 ring-offset-2"

// Nested arrays also work
cx(['a', ['b', ['c', 'd']]])
// → "a b c d"`
      }</div>
    </div>
  );
}

// ── Section 5: cx.with() ──────────────────────────────────────────────────────

function CxWithSection() {
  const [size, setSize]   = useState('md');
  const [color, setColor] = useState('primary');

  // cx.with() creates a bound helper with the base always applied
  const btn = cx.with(
    'inline-flex items-center justify-center rounded-lg font-semibold border-none cursor-pointer transition-colors select-none'
  );

  const sizeClasses  = { sm: 'text-xs px-3 py-1.5', md: 'text-sm px-4 py-2', lg: 'text-base px-6 py-3' };
  const colorClasses = {
    primary:   'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger:    'bg-red-600 text-white hover:bg-red-700',
  };

  const cls = btn(sizeClasses[size], colorClasses[color]);

  return (
    <div className={section}>
      <h2 className={sectionTitle}>cx.with() — Pre-bound Helper</h2>
      <p className={label}>
        <code>cx.with(...base)</code> returns a new cx function with base classes always prepended.
        Great for component-level class composition.
      </p>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '14px' }}>
        <div>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>Size</p>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['sm', 'md', 'lg'].map(s => (
              <button key={s} onClick={() => setSize(s)}
                style={{ padding: '3px 12px', borderRadius: '6px', fontSize: '0.78rem', cursor: 'pointer', border: '1px solid',
                  background: size === s ? '#1e40af' : '#f3f4f6', color: size === s ? 'white' : '#374151', borderColor: size === s ? '#1e40af' : '#d1d5db' }}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>Color</p>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['primary', 'secondary', 'danger'].map(c => (
              <button key={c} onClick={() => setColor(c)}
                style={{ padding: '3px 12px', borderRadius: '6px', fontSize: '0.78rem', cursor: 'pointer', border: '1px solid',
                  background: color === c ? '#1e40af' : '#f3f4f6', color: color === c ? 'white' : '#374151', borderColor: color === c ? '#1e40af' : '#d1d5db' }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button className={cls}>cx.with() button</button>

      <ResultBadge value={cls} />

      <div className={codeBlock}>{
`// Define once — base classes always applied
const btn = cx.with(
  'inline-flex items-center justify-center rounded-lg font-semibold border-none cursor-pointer transition-colors select-none'
);

// Call with additional classes per use-case
btn('text-sm px-4 py-2', 'bg-blue-600 text-white hover:bg-blue-700')
// → "inline-flex items-center justify-center ... text-sm px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"

btn('text-xs px-3 py-1.5', isDisabled && 'opacity-50 pointer-events-none')
// → "inline-flex items-center justify-center ... text-xs px-3 py-1.5"`
      }</div>
    </div>
  );
}

// ── Section 6: Mixed ──────────────────────────────────────────────────────────

function MixedSection() {
  const [state, setState] = useState({ hovered: false, focused: false, checked: false });

  const toggle = key => setState(s => ({ ...s, [key]: !s[key] }));

  const boxClass = cx(
    // string
    'w-12 h-12 rounded-xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-center',
    // conditional
    state.checked && 'bg-blue-600 border-blue-600 text-white',
    !state.checked && 'bg-white border-gray-300',
    // object
    { 'scale-110 shadow-lg': state.hovered, 'ring-2 ring-blue-400 ring-offset-1': state.focused },
    // array
    ['select-none', state.checked && 'font-bold'],
  );

  return (
    <div className={section}>
      <h2 className={sectionTitle}>cx() — Mixed (Strings + Conditionals + Objects + Arrays)</h2>
      <p className={label}>All input types can be freely combined in one call.</p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
        {Object.keys(state).map(k => (
          <label key={k} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
            <input type="checkbox" checked={state[k]} onChange={() => toggle(k)} />
            {k}
          </label>
        ))}
      </div>

      <div className={boxClass} onClick={() => toggle('checked')}>
        {state.checked ? '✓' : ''}
      </div>

      <ResultBadge value={boxClass} />

      <div className={codeBlock}>{
`cx(
  // 1. String — always applied
  'w-12 h-12 rounded-xl border-2 transition-all',

  // 2. Conditional — && short-circuit
  checked && 'bg-blue-600 border-blue-600 text-white',
  !checked && 'bg-white border-gray-300',

  // 3. Object — key=class, value=condition
  { 'scale-110 shadow-lg': hovered, 'ring-2 ring-blue-400': focused },

  // 4. Array — flattened, supports conditionals inside
  ['select-none', checked && 'font-bold'],
)`
      }</div>
    </div>
  );
}

// ── Main Demo ─────────────────────────────────────────────────────────────────

export function CxDemo() {
  return (
    <div>
      <StringsSection />
      <ConditionalsSection />
      <ObjectSyntaxSection />
      <ArraysSection />
      <CxWithSection />
      <MixedSection />
    </div>
  );
}
