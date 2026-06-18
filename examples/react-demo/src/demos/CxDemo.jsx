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
  // cx() hanya join string — tw() yang inject CSS-nya
  const result = cx(
    tw('bg-blue-500'),
    tw('text-white'),
    tw('rounded-lg'),
    tw('px-4 py-2'),
  );

  return (
    <div className={section}>
      <h2 className={sectionTitle}>cx() — Strings</h2>
      <p className={label}>
        cx() hanya menggabungkan class names. Wrap setiap group dengan{' '}
        <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>tw()</code>{' '}
        agar CSS-nya di-inject ke DOM (tanpa Tailwind CSS terpasang).
      </p>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
        <button className={cx(tw('bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold border-none cursor-pointer transition-all'))}>
          cx joined
        </button>
        <button className={cx(
          tw('px-4 py-2 rounded-lg text-sm font-medium border-none cursor-pointer'),
          false && tw('bg-red-500'),
          tw('bg-emerald-500 text-white'),
        )}>
          falsy skipped
        </button>
      </div>

      <ResultBadge value={result} />

      <div className={codeBlock}>{
`// cx() hanya join string — tw() yang inject CSS-nya ke DOM
cx(tw('bg-blue-500'), tw('text-white'), tw('rounded-lg'), tw('px-4 py-2'))
// → "bg-blue-500 text-white rounded-lg px-4 py-2"

// Falsy values tetap diabaikan
cx(tw('base px-4 py-2'), false && tw('bg-red-500'), tw('bg-emerald-500 text-white'))
// → "base px-4 py-2 bg-emerald-500 text-white"`
      }</div>
    </div>
  );
}

// ── Section 2: Conditionals ───────────────────────────────────────────────────

function ConditionalsSection() {
  const [isActive, setIsActive]     = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading]   = useState(false);

  // Setiap group class di-wrap tw() agar CSS-nya ngefek
  const btnClass = cx(
    tw('px-4 py-2 rounded-lg text-sm font-medium transition-all border-none cursor-pointer'),
    isActive   && tw('bg-blue-600 text-white'),
    !isActive  && tw('bg-gray-200 text-gray-700'),
    isDisabled && tw('opacity-50 cursor-not-allowed pointer-events-none'),
    isLoading  && tw('animate-pulse'),
  );

  return (
    <div className={section}>
      <h2 className={sectionTitle}>cx() — Conditionals</h2>
      <p className={label}>
        Gunakan <code>&amp;&amp;</code> short-circuit untuk class kondisional.{' '}
        Tiap kondisi di-wrap <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>tw()</code>{' '}
        agar hanya CSS yang aktif yang di-inject.
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
        {[
          { label: 'Active',   state: isActive,   set: setIsActive },
          { label: 'Disabled', state: isDisabled, set: setIsDisabled },
          { label: 'Loading',  state: isLoading,  set: setIsLoading },
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
  tw('px-4 py-2 rounded-lg text-sm font-medium transition-all border-none cursor-pointer'),
  isActive   && tw('bg-blue-600 text-white'),
  !isActive  && tw('bg-gray-200 text-gray-700'),
  isDisabled && tw('opacity-50 cursor-not-allowed pointer-events-none'),
  isLoading  && tw('animate-pulse'),
);`
      }</div>
    </div>
  );
}

// ── Section 3: Object Syntax ──────────────────────────────────────────────────

function ObjectSyntaxSection() {
  const [variant, setVariant] = useState('danger');

  // Object syntax: key adalah tw() call (returns class string), value adalah kondisi
  const result = cx(
    tw('px-4 py-2 rounded-lg font-semibold text-sm transition-colors border-none cursor-pointer'),
    {
      [tw('bg-blue-600 text-white hover:bg-blue-700')]:      variant === 'primary',
      [tw('bg-gray-200 text-gray-900 hover:bg-gray-300')]:   variant === 'secondary',
      [tw('bg-red-600 text-white hover:bg-red-700')]:        variant === 'danger',
      [tw('bg-emerald-600 text-white hover:bg-emerald-700')]: variant === 'success',
    },
  );

  return (
    <div className={section}>
      <h2 className={sectionTitle}>cx() — Object Syntax</h2>
      <p className={label}>
        Object keys adalah class names (dari <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>tw()</code>),
        values adalah kondisi boolean. Hanya key yang truthy yang dimasukkan.
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
`cx(
  tw('px-4 py-2 rounded-lg font-semibold text-sm transition-colors border-none cursor-pointer'),
  {
    [tw('bg-blue-600 text-white hover:bg-blue-700')]:      variant === 'primary',
    [tw('bg-gray-200 text-gray-900 hover:bg-gray-300')]:   variant === 'secondary',
    [tw('bg-red-600 text-white hover:bg-red-700')]:        variant === 'danger',
    [tw('bg-emerald-600 text-white hover:bg-emerald-700')]: variant === 'success',
  },
)`
      }</div>
    </div>
  );
}

// ── Section 4: Arrays ─────────────────────────────────────────────────────────

function ArraysSection() {
  const [showExtra, setShowExtra] = useState(true);

  // Array berisi tw() calls, di-flatten oleh cx()
  const base   = [tw('px-4 py-2'), tw('rounded-lg'), tw('text-sm font-medium')];
  const extras = showExtra ? [tw('ring-2 ring-blue-400 ring-offset-2')] : [];

  const result = cx(base, tw('bg-indigo-600 text-white border-none cursor-pointer'), extras);

  return (
    <div className={section}>
      <h2 className={sectionTitle}>cx() — Arrays</h2>
      <p className={label}>
        Kirim array berisi <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>tw()</code> calls —
        cx() flatten secara rekursif. Cocok untuk menyusun class dari beberapa sumber.
      </p>

      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.85rem', marginBottom: '12px' }}>
        <input type="checkbox" checked={showExtra} onChange={e => setShowExtra(e.target.checked)} />
        Include ring classes (nested array)
      </label>

      <button className={result}>
        Array composed
      </button>

      <ResultBadge value={result} />

      <div className={codeBlock}>{
`const base   = [tw('px-4 py-2'), tw('rounded-lg'), tw('text-sm font-medium')];
const extras = showRing ? [tw('ring-2 ring-blue-400 ring-offset-2')] : [];

cx(base, tw('bg-indigo-600 text-white border-none cursor-pointer'), extras)
// → "px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white ... ring-2 ring-blue-400 ring-offset-2"

// Nested arrays juga work
cx([tw('a'), [tw('b'), [tw('c'), tw('d')]]])`
      }</div>
    </div>
  );
}

// ── Section 5: cx.with() ──────────────────────────────────────────────────────

function CxWithSection() {
  const [size, setSize]   = useState('lg');
  const [color, setColor] = useState('danger');

  // cx.with() menerima tw() call sebagai base — CSS-nya selalu di-inject
  const btn = cx.with(
    tw('inline-flex items-center justify-center rounded-lg font-semibold border-none cursor-pointer transition-colors select-none')
  );

  const sizeClasses  = {
    sm: tw('text-xs px-3 py-1.5'),
    md: tw('text-sm px-4 py-2'),
    lg: tw('text-base px-6 py-3'),
  };
  const colorClasses = {
    primary:   tw('bg-blue-600 text-white hover:bg-blue-700'),
    secondary: tw('bg-gray-200 text-gray-800 hover:bg-gray-300'),
    danger:    tw('bg-red-600 text-white hover:bg-red-700'),
  };

  const cls = btn(sizeClasses[size], colorClasses[color]);

  return (
    <div className={section}>
      <h2 className={sectionTitle}>cx.with() — Pre-bound Helper</h2>
      <p className={label}>
        <code>cx.with(tw(...))</code> returns cx function baru dengan base classes selalu di-prepend.
        Cocok untuk component-level class composition tanpa repeat base class.
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
`// Define once — base tw() selalu di-inject
const btn = cx.with(
  tw('inline-flex items-center justify-center rounded-lg font-semibold border-none cursor-pointer transition-colors select-none')
);

// Size & color maps pakai tw() agar CSS-nya terdaftar
const sizeClasses  = { sm: tw('text-xs px-3 py-1.5'), md: tw('text-sm px-4 py-2'), lg: tw('text-base px-6 py-3') };
const colorClasses = {
  primary:   tw('bg-blue-600 text-white hover:bg-blue-700'),
  secondary: tw('bg-gray-200 text-gray-800 hover:bg-gray-300'),
  danger:    tw('bg-red-600 text-white hover:bg-red-700'),
};

// Panggil sesuai kebutuhan
btn(sizeClasses[size], colorClasses[color])`
      }</div>
    </div>
  );
}

// ── Section 6: Mixed ──────────────────────────────────────────────────────────

function MixedSection() {
  const [state, setState] = useState({ hovered: false, focused: false, checked: false });

  const toggle = key => setState(s => ({ ...s, [key]: !s[key] }));

  // Semua input type cx() — tiap group pakai tw() agar CSS ngefek
  const boxClass = cx(
    // 1. String (via tw)
    tw('w-12 h-12 rounded-xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-center'),
    // 2. Conditional
    state.checked  && tw('bg-blue-600 border-blue-600 text-white'),
    !state.checked && tw('bg-white border-gray-300'),
    // 3. Object — key pakai tw()
    {
      [tw('scale-110 shadow-lg')]:              state.hovered,
      [tw('ring-2 ring-blue-400 ring-offset-1')]: state.focused,
    },
    // 4. Array
    [tw('select-none'), state.checked && tw('font-bold')],
  );

  return (
    <div className={section}>
      <h2 className={sectionTitle}>cx() — Mixed (Strings + Conditionals + Objects + Arrays)</h2>
      <p className={label}>Semua input type bisa dikombinasikan bebas dalam satu call, selama masing-masing di-wrap <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>tw()</code>.</p>

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
  // 1. tw() — selalu diterapkan, CSS di-inject
  tw('w-12 h-12 rounded-xl border-2 transition-all'),

  // 2. Conditional dengan tw()
  checked  && tw('bg-blue-600 border-blue-600 text-white'),
  !checked && tw('bg-white border-gray-300'),

  // 3. Object — key pakai computed tw()
  {
    [tw('scale-110 shadow-lg')]:               hovered,
    [tw('ring-2 ring-blue-400 ring-offset-1')]: focused,
  },

  // 4. Array — tw() di dalam array
  [tw('select-none'), checked && tw('font-bold')],
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
