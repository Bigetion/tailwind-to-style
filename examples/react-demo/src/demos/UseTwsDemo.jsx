import React, { useState } from 'react';
import { tw } from 'tailwind-to-style';
import { useTws } from 'tailwind-to-style/react';

// ── Demo styles ───────────────────────────────────────────────────────────────

const section      = tw('demo-section',    'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm');
const sectionTitle = tw('demo-title',      'text-xl font-semibold text-gray-900 mb-4');
const label        = tw('demo-label',      'text-sm text-gray-500 mb-3 font-medium');
const codeBlock    = tw('usetws-code',     'bg-gray-900 text-green-400 rounded-lg px-4 py-3 text-xs font-mono mt-3 overflow-x-auto whitespace-pre');

// ── Helper: show style object output ─────────────────────────────────────────

function StyleInspector({ classes }) {
  const style = useTws(classes);
  const entries = Object.entries(style);
  return (
    <div style={{ marginTop: '10px' }}>
      <p style={{ fontSize: '0.7rem', color: '#9ca3af', fontFamily: 'monospace', marginBottom: '6px' }}>useTws('{classes}') →</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
        {entries.length === 0
          ? <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>No styles parsed</span>
          : entries.map(([k, v]) => (
              <div key={k} style={{ display: 'contents' }}>
                <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', background: '#f3f4f6', color: '#6b7280', padding: '2px 7px', borderRadius: '4px 0 0 4px' }}>{k}</span>
                <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', background: '#eff6ff', color: '#1d4ed8', padding: '2px 7px', borderRadius: '0 4px 4px 0' }}>{v}</span>
              </div>
            ))
        }
      </div>
    </div>
  );
}

// ── Dynamic style playground ──────────────────────────────────────────────────

const PRESETS = [
  'bg-blue-500 text-white p-4 rounded-lg font-semibold text-sm',
  'bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-2xl text-white font-bold',
  'text-4xl font-extrabold text-gray-900 leading-tight',
  'bg-emerald-100 text-emerald-800 p-3 rounded-lg border border-emerald-200 text-sm',
  'w-20 h-20 rounded-full bg-orange-400',
  'shadow-2xl rounded-3xl bg-white p-8',
];

function DynamicPlayground() {
  const [input, setInput] = useState(PRESETS[0]);
  const style = useTws(input);

  return (
    <div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type Tailwind classes…"
        style={{ width: '100%', fontSize: '0.85rem', border: '1px solid #d1d5db', borderRadius: '8px', padding: '8px 12px', fontFamily: 'monospace', outline: 'none', marginBottom: '12px', boxSizing: 'border-box' }}
      />
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
        {PRESETS.map((p, i) => (
          <button key={i} onClick={() => setInput(p)}
            style={{ fontSize: '0.72rem', padding: '3px 10px', borderRadius: '6px', cursor: 'pointer', border: '1px solid #d1d5db', background: input === p ? '#1e40af' : '#f3f4f6', color: input === p ? 'white' : '#374151' }}>
            Preset {i + 1}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Live preview */}
        <div>
          <p style={{ fontSize: '0.72rem', color: '#9ca3af', marginBottom: '6px' }}>Live preview (style prop):</p>
          <div style={{ ...style, minWidth: style.width ? undefined : '80px', minHeight: style.height ? undefined : '40px' }} />
        </div>
        {/* Style object output */}
        <div style={{ flex: 1, minWidth: '220px' }}>
          <p style={{ fontSize: '0.72rem', color: '#9ca3af', marginBottom: '6px' }}>Resolved style object:</p>
          <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '10px' }}>
            {Object.entries(style).map(([k, v]) => (
              <div key={k} style={{ fontSize: '0.72rem', fontFamily: 'monospace', lineHeight: 1.7 }}>
                <span style={{ color: '#6b7280' }}>{k}: </span>
                <span style={{ color: '#1d4ed8' }}>"{v}"</span>
              </div>
            ))}
            {Object.keys(style).length === 0 && <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>No styles</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Component showcasing useTws ───────────────────────────────────────────────

function DynamicCard({ classes, title, children }) {
  const style = useTws(classes);
  return (
    <div style={style}>
      {title && <p style={{ fontWeight: 600, marginBottom: '4px' }}>{title}</p>}
      {children}
    </div>
  );
}

// ── Avatar using useTws for size ──────────────────────────────────────────────

const AVATAR_SIZES = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
};

const AVATAR_COLORS = ['bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500'];

function Avatar({ name, size = 'md', colorIdx = 0 }) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const style = useTws(`${AVATAR_SIZES[size]} ${AVATAR_COLORS[colorIdx]} text-white rounded-full font-bold flex items-center justify-center select-none`);
  return <div style={style}>{initials}</div>;
}

// ── Main Demo ─────────────────────────────────────────────────────────────────

export function UseTwsDemo() {
  const [avatarSize, setAvatarSize] = useState('md');

  return (
    <div>

      {/* What is useTws */}
      <div className={section}>
        <h2 className={sectionTitle}>useTws() — React Hook for Inline Styles</h2>
        <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.7, marginBottom: '10px' }}>
          <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>useTws(classes)</code> wraps{' '}
          <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>tws(classes, true)</code> in a{' '}
          <code>useMemo</code> — recomputes only when the class string changes. Returns a React-compatible
          style object for the <code>style</code> prop.
        </p>
        <div style={{ background: '#fefce8', border: '1px solid #fde68a', borderRadius: '10px', padding: '12px', fontSize: '0.82rem', color: '#92400e' }}>
          <strong>Note:</strong> Like <code>tws()</code>, pseudo-states (<code>hover:</code>, <code>focus:</code>) and
          responsive prefixes are <em>not</em> supported — those require <code>tw()</code> with CSS injection.
          Use <code>useTws()</code> for purely computational style values (colors, spacing, typography).
        </div>

        <div className={codeBlock}>{
`import { useTws } from 'tailwind-to-style/react';

function Box({ classes }) {
  const style = useTws(classes);   // memoized, recalc only when classes changes
  return <div style={style}>...</div>;
}

// Memoization example
const style1 = useTws('bg-blue-500 p-4');   // computed on first render
const style1 = useTws('bg-blue-500 p-4');   // ← returns same object (no recompute)
const style2 = useTws('bg-red-500 p-4');    // ← recomputes because string changed`
        }</div>
      </div>

      {/* Dynamic playground */}
      <div className={section}>
        <h2 className={sectionTitle}>useTws() — Live Playground</h2>
        <p className={label}>Type classes or pick a preset. The hook resolves them to a style object in real time.</p>
        <DynamicPlayground />
      </div>

      {/* Dynamic cards */}
      <div className={section}>
        <h2 className={sectionTitle}>useTws() — Dynamic Styles from Props</h2>
        <p className={label}>Pass a class string as a prop — useTws resolves it each time the prop changes.</p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <DynamicCard
            classes="bg-blue-50 border border-blue-200 rounded-xl p-5 text-blue-900"
            title="Info Card"
          >
            <p style={{ fontSize: '0.82rem' }}>Styled via <code>useTws(classes)</code> from the parent prop.</p>
          </DynamicCard>
          <DynamicCard
            classes="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-emerald-900"
            title="Success Card"
          >
            <p style={{ fontSize: '0.82rem' }}>Different card, same component, different prop.</p>
          </DynamicCard>
          <DynamicCard
            classes="bg-red-50 border border-red-200 rounded-xl p-5 text-red-900"
            title="Danger Card"
          >
            <p style={{ fontSize: '0.82rem' }}>Purely runtime — no build step needed.</p>
          </DynamicCard>
        </div>

        <div className={codeBlock}>{
`function DynamicCard({ classes, title, children }) {
  const style = useTws(classes);   // resolved from prop at runtime
  return (
    <div style={style}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

<DynamicCard classes="bg-blue-50 border border-blue-200 rounded-xl p-5" title="Info" />
<DynamicCard classes="bg-red-50 border border-red-200 rounded-xl p-5" title="Error" />`
        }</div>
      </div>

      {/* Avatar example */}
      <div className={section}>
        <h2 className={sectionTitle}>useTws() — Variant-driven Avatar</h2>
        <p className={label}>Pick a size — the size string is resolved to a style object via useTws.</p>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
          {Object.keys(AVATAR_SIZES).map(s => (
            <button key={s} onClick={() => setAvatarSize(s)}
              style={{ padding: '4px 12px', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer', border: '1px solid',
                background: avatarSize === s ? '#1e40af' : '#f3f4f6', color: avatarSize === s ? 'white' : '#374151',
                borderColor: avatarSize === s ? '#1e40af' : '#d1d5db' }}>
              {s}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {['Alice Johnson', 'Bob Smith', 'Carol White', 'Dave Brown'].map((name, i) => (
            <Avatar key={name} name={name} size={avatarSize} colorIdx={i} />
          ))}
        </div>

        <div className={codeBlock}>{
`const SIZES = {
  xs: 'w-6 h-6 text-xs',
  md: 'w-10 h-10 text-sm',
  xl: 'w-20 h-20 text-xl',
};

function Avatar({ name, size = 'md', color = 'bg-blue-500' }) {
  const style = useTws(\`\${SIZES[size]} \${color} text-white rounded-full font-bold\`);
  return <div style={style}>{initials(name)}</div>;
}`
        }</div>
      </div>

      {/* Style inspector */}
      <div className={section}>
        <h2 className={sectionTitle}>useTws() — Style Inspector</h2>
        <p className={label}>Shows what useTws resolves for various common patterns.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            'bg-blue-600/80 text-white p-4',
            'text-[1.25rem] leading-[1.75rem] tracking-tight',
            'w-[320px] h-[160px] rounded-[20px]',
          ].map(cls => (
            <div key={cls} style={{ background: '#f9fafb', borderRadius: '10px', padding: '12px' }}>
              <StyleInspector classes={cls} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
