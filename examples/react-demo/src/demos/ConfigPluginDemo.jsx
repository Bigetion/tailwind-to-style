import React, { useState, useEffect } from 'react';
import { tw, cx } from 'tailwind-to-style';
import { tokenRegistry, createTheme, activateTheme, token } from 'tailwind-to-style/tokens';

// ── Demo styles ───────────────────────────────────────────────────────────────

const section      = tw('demo-section',  'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm');
const sectionTitle = tw('demo-title',    'text-xl font-semibold text-gray-900 mb-4');
const label        = tw('demo-label',    'text-sm text-gray-500 mb-3 font-medium');
const codeBlock    = tw('cfg-code',      'bg-gray-900 text-green-400 rounded-lg px-4 py-3 text-xs font-mono mt-3 overflow-x-auto whitespace-pre');

// ═══════════════════════════════════════════════════════════════════════════════
// tw.config() — global settings for tw()
// ═══════════════════════════════════════════════════════════════════════════════

// tw.config() adjusts prefix, hashing, and injection globally
// (called once at app startup — commented out so it doesn't affect the demo app)
// tw.config({ prefix: 'ui', hash: true, hashLength: 6, inject: true });

// ═══════════════════════════════════════════════════════════════════════════════
// Multi-theme setup with tokenRegistry + createTheme + activateTheme
// ═══════════════════════════════════════════════════════════════════════════════

const THEMES = {
  default: {
    colors: {
      primary:      '#2563eb',
      primaryLight: '#dbeafe',
      secondary:    '#64748b',
      accent:       '#7c3aed',
      accentLight:  '#ede9fe',
      surface:      '#ffffff',
      border:       '#e2e8f0',
      text:         '#0f172a',
      muted:        '#64748b',
      success:      '#059669',
      warning:      '#d97706',
      danger:       '#dc2626',
    },
    spacing: { sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem' },
    radius:  { sm: '0.25rem', md: '0.5rem', lg: '1rem', xl: '1.5rem' },
  },
  forest: {
    colors: {
      primary:      '#059669',
      primaryLight: '#d1fae5',
      secondary:    '#0284c7',
      accent:       '#d97706',
      accentLight:  '#fef3c7',
      surface:      '#f0fdf4',
      border:       '#bbf7d0',
      text:         '#064e3b',
      muted:        '#6b7280',
      success:      '#059669',
      warning:      '#d97706',
      danger:       '#dc2626',
    },
    spacing: { sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem' },
    radius:  { sm: '0.25rem', md: '0.5rem', lg: '1rem', xl: '1.5rem' },
  },
  rose: {
    colors: {
      primary:      '#e11d48',
      primaryLight: '#ffe4e6',
      secondary:    '#9f1239',
      accent:       '#f59e0b',
      accentLight:  '#fef3c7',
      surface:      '#fff1f2',
      border:       '#fecdd3',
      text:         '#881337',
      muted:        '#9f1239',
      success:      '#059669',
      warning:      '#d97706',
      danger:       '#dc2626',
    },
    spacing: { sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem' },
    radius:  { sm: '0.25rem', md: '0.5rem', lg: '1rem', xl: '1.5rem' },
  },
  midnight: {
    colors: {
      primary:      '#818cf8',
      primaryLight: '#312e81',
      secondary:    '#6366f1',
      accent:       '#f472b6',
      accentLight:  '#831843',
      surface:      '#1e1b4b',
      border:       '#312e81',
      text:         '#e0e7ff',
      muted:        '#a5b4fc',
      success:      '#34d399',
      warning:      '#fbbf24',
      danger:       '#f87171',
    },
    spacing: { sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem' },
    radius:  { sm: '0.25rem', md: '0.5rem', lg: '1rem', xl: '1.5rem' },
  },
};

// Register all themes upfront
Object.entries(THEMES).forEach(([name, tokens]) => {
  createTheme(structuredClone(tokens), { name });
});

// ── token() references — resolved at CSS-paint time ──────────────────────────

const themedBtn = tw({
  name: 'cfg-btn',
  base: 'inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold text-sm border-none cursor-pointer transition-all duration-200 select-none hover:opacity-90 active:scale-95',
  variants: {
    intent: {
      primary:   `bg-[${token('colors.primary')}] text-white`,
      secondary: `bg-[${token('colors.primaryLight')}] text-[${token('colors.primary')}]`,
      accent:    `bg-[${token('colors.accent')}] text-white`,
      ghost:     `bg-transparent text-[${token('colors.primary')}] border border-[${token('colors.border')}]`,
    },
  },
  defaultVariants: { intent: 'primary' },
});

const themedCard = tw('cfg-card',
  `bg-[${token('colors.surface')}] border border-[${token('colors.border')}] rounded-xl p-5 shadow-sm transition-colors duration-200`
);

const themedHeading = tw('cfg-heading',
  `text-base font-semibold text-[${token('colors.text')}]`
);

const themedMuted = tw('cfg-muted',
  `text-sm text-[${token('colors.muted')}] mt-1`
);

const themedBadge = tw({
  name: 'cfg-badge',
  base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
  variants: {
    type: {
      primary: `bg-[${token('colors.primaryLight')}] text-[${token('colors.primary')}]`,
      accent:  `bg-[${token('colors.accentLight')}] text-[${token('colors.accent')}]`,
      success: 'bg-emerald-100 text-emerald-700',
      warning: 'bg-yellow-100 text-yellow-700',
      danger:  'bg-red-100 text-red-700',
    },
  },
  defaultVariants: { type: 'primary' },
});

const themedInput = tw('cfg-input',
  `w-full px-3 py-2 rounded-lg border border-[${token('colors.border')}] bg-[${token('colors.surface')}] text-[${token('colors.text')}] text-sm outline-none focus:ring-2`
);

// ── Token Inspector ───────────────────────────────────────────────────────────

function TokenInspector({ tokens }) {
  const colors = tokens?.colors || {};
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '6px' }}>
      {Object.entries(colors).map(([key, value]) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 8px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ width: '18px', height: '18px', borderRadius: '4px', backgroundColor: value, border: '1px solid rgba(0,0,0,0.1)', flexShrink: 0 }} />
          <div style={{ overflow: 'hidden' }}>
            <p style={{ fontSize: '0.65rem', color: '#6b7280', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>colors.{key}</p>
            <p style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── tokenRegistry.subscribe demo ─────────────────────────────────────────────

function SubscriberDemo({ activeTheme }) {
  const [changeCount, setChangeCount] = useState(0);
  const [lastPrimary, setLastPrimary] = useState('');

  useEffect(() => {
    const unsub = tokenRegistry.subscribe((tokens) => {
      setChangeCount(c => c + 1);
      setLastPrimary(tokens?.colors?.primary || '');
    });
    return unsub; // cleanup on unmount
  }, []);

  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <div style={{ background: '#f3f4f6', borderRadius: '10px', padding: '12px 16px', minWidth: '140px' }}>
        <p style={{ fontSize: '0.7rem', color: '#6b7280' }}>Updates received</p>
        <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e40af' }}>{changeCount}</p>
      </div>
      <div style={{ background: '#f3f4f6', borderRadius: '10px', padding: '12px 16px', flex: 1 }}>
        <p style={{ fontSize: '0.7rem', color: '#6b7280', marginBottom: '4px' }}>Latest colors.primary</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: lastPrimary, border: '1px solid rgba(0,0,0,0.1)' }} />
          <code style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: '#374151' }}>{lastPrimary}</code>
        </div>
      </div>
    </div>
  );
}

// ── tw.config() — global settings ────────────────────────────────────────────

function TwConfigSection() {
  const [prefix, setPrefix]   = useState('twsx');
  const [hash, setHash]       = useState(true);
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    // NOTE: In a real app you'd call this once at startup.
    // Calling it here is for demo purposes only.
    tw.config({ prefix, hash });
    setApplied(true);
    setTimeout(() => setApplied(false), 1500);
  };

  const exampleClass = tw('px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold');

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '14px', alignItems: 'flex-end' }}>
        <div>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>prefix</p>
          <input value={prefix} onChange={e => setPrefix(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.82rem', fontFamily: 'monospace', width: '100px' }} />
        </div>
        <div>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>hash</p>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.85rem', paddingBottom: '6px' }}>
            <input type="checkbox" checked={hash} onChange={e => setHash(e.target.checked)} />
            enabled
          </label>
        </div>
        <button onClick={handleApply}
          style={{ padding: '7px 16px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', border: 'none',
            background: applied ? '#059669' : '#1e40af', color: 'white', transition: 'background 0.2s' }}>
          {applied ? '✓ Applied' : 'Apply tw.config()'}
        </button>
      </div>
      <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '10px 14px' }}>
        <p style={{ fontSize: '0.72rem', color: '#6b7280', marginBottom: '4px' }}>Sample generated class name:</p>
        <code style={{ fontSize: '0.78rem', fontFamily: 'monospace', color: '#1d4ed8', wordBreak: 'break-all' }}>{exampleClass}</code>
      </div>
    </div>
  );
}

// ── Code samples (configure/plugin) — static reference ───────────────────────

function ConfigurePluginReference() {
  const [tab, setTab] = useState('configure');

  const samples = {
    configure: `// Available via src/index.js (full bundle, not v4 public API)
import { configure, getConfig } from 'tailwind-to-style';

configure({
  theme: {
    extend: {
      colors: {
        brand: { 50: '#eff6ff', 500: '#3b82f6', 900: '#1e3a8a' },
        neon:  { green: '#39ff14', pink: '#ff6ec7' },
      },
      spacing:      { '13': '3.25rem', '18': '4.5rem' },
      borderRadius: { '4xl': '2rem' },
    },
  },
});

// After configure(), use these in tw():
tw('bg-brand-500 text-neon-green rounded-4xl p-13')`,

    createPlugin: `import { createPlugin, configure } from 'tailwind-to-style';

const glassmorphismPlugin = createPlugin('glassmorphism', {
  utilities: {
    '.glass': {
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      backgroundColor: 'rgba(255,255,255,0.15)',
      border: '1px solid rgba(255,255,255,0.3)',
    },
    '.glass-dark': {
      backdropFilter: 'blur(12px)',
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
  },
});

configure({ plugins: [glassmorphismPlugin] });

// Now usable in tw():
<div className={tw('.glass rounded-xl p-6')}>...</div>`,

    createUtilityPlugin: `import { createUtilityPlugin, configure } from 'tailwind-to-style';

// Generates .gradient-sunset, .gradient-ocean, etc.
const gradientPlugin = createUtilityPlugin('gradient', {
  prefix: 'gradient',
  values: {
    sunset: 'linear-gradient(135deg, #f97316, #ec4899, #a855f7)',
    ocean:  'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)',
    forest: 'linear-gradient(135deg, #22c55e, #14b8a6, #3b82f6)',
  },
  formatter: (value) => ({ background: value }),
});

configure({ plugins: [gradientPlugin] });

tw('gradient-sunset rounded-xl p-6 text-white font-bold')`,
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
        {Object.keys(samples).map(k => (
          <button key={k} onClick={() => setTab(k)}
            style={{ padding: '5px 12px', borderRadius: '8px', fontSize: '0.78rem', cursor: 'pointer', border: '1px solid',
              background: tab === k ? '#1e40af' : '#f3f4f6', color: tab === k ? 'white' : '#374151',
              borderColor: tab === k ? '#1e40af' : '#d1d5db' }}>
            {k}()
          </button>
        ))}
      </div>
      <div style={{ background: '#1e1e2e', borderRadius: '10px', padding: '16px', overflowX: 'auto' }}>
        <pre style={{ fontSize: '0.75rem', color: '#a6e3a1', margin: 0, fontFamily: 'monospace', lineHeight: 1.7 }}>
          {samples[tab]}
        </pre>
      </div>
    </div>
  );
}

// ── Main Demo ─────────────────────────────────────────────────────────────────

export function ConfigPluginDemo() {
  const [activeTheme, setActiveTheme] = useState('default');
  const [liveTokens, setLiveTokens]   = useState(THEMES.default);

  // Activate theme on change
  useEffect(() => {
    activateTheme(activeTheme);
    setLiveTokens(THEMES[activeTheme]);
  }, [activeTheme]);

  // tokenRegistry.set() — live single-token override
  const [primaryOverride, setPrimaryOverride] = useState('');
  const applyOverride = () => {
    if (primaryOverride) tokenRegistry.set('colors.primary', primaryOverride);
  };

  return (
    <div>

      {/* tw.config() */}
      <div className={section}>
        <h2 className={sectionTitle}>tw.config() — Global Settings</h2>
        <p className={label}>
          Configure the class name prefix, hashing, and auto-injection globally.
          Call once at app startup (e.g. in <code>main.jsx</code>).
        </p>
        <TwConfigSection />
        <div className={codeBlock}>{
`import { tw } from 'tailwind-to-style';

// At app startup — before any components render
tw.config({
  prefix:     'ui',       // default: 'twsx' — changes generated class prefix
  hash:       true,       // default: true   — include hash in class names
  hashLength: 6,          // default: 8      — hash length
  inject:     true,       // default: true   — auto-inject CSS on first use
});

// After this, tw() generates: "ui-flex ui-gap-3 ..." instead of "twsx-flex ..."
tw.clearCache();  // optionally clear if config changes at runtime`
        }</div>
      </div>

      {/* Multi-theme: createTheme + activateTheme */}
      <div className={section}>
        <h2 className={sectionTitle}>createTheme() + activateTheme() — Named Theme Registry</h2>
        <p className={label}>
          Register multiple named themes upfront with <code>createTheme(tokens, {'{ name }'})</code>,
          then switch between them instantly with <code>activateTheme(name)</code> — no re-render needed.
        </p>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {Object.keys(THEMES).map(name => (
            <button key={name} onClick={() => setActiveTheme(name)}
              style={{ padding: '6px 16px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer', border: '2px solid',
                background:   activeTheme === name ? THEMES[name].colors.primary : '#f3f4f6',
                color:        activeTheme === name ? 'white' : '#374151',
                borderColor:  activeTheme === name ? THEMES[name].colors.primary : '#d1d5db',
                transition:   'all 0.15s' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: THEMES[name].colors.primary, display: 'inline-block', border: '1px solid rgba(0,0,0,0.1)' }} />
                {name}
              </span>
            </button>
          ))}
        </div>

        {/* Live themed components */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginBottom: '14px' }}>
          <div className={themedCard}>
            <p className={themedHeading}>Themed Card</p>
            <p className={themedMuted}>Surface, border, text all from tokens.</p>
            <div style={{ marginTop: '10px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span className={themedBadge({ type: 'primary' })}>Primary</span>
              <span className={themedBadge({ type: 'accent' })}>Accent</span>
            </div>
          </div>
          <div className={themedCard}>
            <p className={themedHeading}>Actions</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
              <button className={themedBtn({ intent: 'primary' })}>Primary</button>
              <button className={themedBtn({ intent: 'secondary' })}>Secondary</button>
              <button className={themedBtn({ intent: 'ghost' })}>Ghost</button>
            </div>
          </div>
          <div className={themedCard}>
            <p className={themedHeading}>Input</p>
            <input className={themedInput} placeholder="Themed input field" style={{ marginTop: '10px' }} />
            <div style={{ marginTop: '8px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span className={themedBadge({ type: 'success' })}>Success</span>
              <span className={themedBadge({ type: 'warning' })}>Warning</span>
              <span className={themedBadge({ type: 'danger' })}>Danger</span>
            </div>
          </div>
        </div>

        <div className={codeBlock}>{
`import { createTheme, activateTheme, token } from 'tailwind-to-style/tokens';

// 1. Register themes at startup
createTheme({ colors: { primary: '#2563eb', surface: '#fff', ... } }, { name: 'default' });
createTheme({ colors: { primary: '#059669', surface: '#f0fdf4', ... } }, { name: 'forest' });
createTheme({ colors: { primary: '#818cf8', surface: '#1e1b4b', ... } }, { name: 'midnight' });

// 2. Reference tokens in tw() — resolved at CSS paint time (zero re-render)
const btn = tw({
  base: \`bg-[\${token('colors.primary')}] text-white\`,
});

// 3. Switch theme instantly — just re-injects CSS vars
activateTheme('forest');    // → all token() references update immediately
activateTheme('midnight'); `
        }</div>
      </div>

      {/* tokenRegistry direct API */}
      <div className={section}>
        <h2 className={sectionTitle}>tokenRegistry — Direct Programmatic Access</h2>
        <p className={label}>
          <code>tokenRegistry</code> gives fine-grained control: get/set individual tokens at runtime,
          subscribe to all changes, or dump the full token tree as CSS.
        </p>

        {/* Subscriber counter */}
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
          tokenRegistry.subscribe() — live update counter
        </p>
        <SubscriberDemo activeTheme={activeTheme} />

        {/* Single-token override */}
        <div style={{ marginTop: '14px', marginBottom: '14px' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
            tokenRegistry.set() — override a single token live
          </p>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="color"
              value={primaryOverride || THEMES[activeTheme].colors.primary}
              onChange={e => { setPrimaryOverride(e.target.value); tokenRegistry.set('colors.primary', e.target.value); }}
              style={{ width: '40px', height: '38px', borderRadius: '8px', border: '1px solid #d1d5db', cursor: 'pointer', padding: '2px' }}
            />
            <input
              value={primaryOverride}
              onChange={e => setPrimaryOverride(e.target.value)}
              placeholder="#hex or rgb(…)"
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.82rem', fontFamily: 'monospace', width: '160px' }}
            />
            <button onClick={applyOverride}
              style={{ padding: '7px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', border: 'none', background: '#1e40af', color: 'white' }}>
              Apply to primary
            </button>
            <button onClick={() => { setPrimaryOverride(''); activateTheme(activeTheme); }}
              style={{ padding: '7px 14px', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer', border: '1px solid #d1d5db', background: '#f3f4f6' }}>
              Reset
            </button>
          </div>
          <p style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: '6px' }}>
            Watch the themed components above update instantly — no re-render.
          </p>
        </div>

        {/* Token dump */}
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Active token values</p>
        <TokenInspector tokens={liveTokens} />

        <div className={codeBlock}>{
`import { tokenRegistry } from 'tailwind-to-style/tokens';

// get a single token
tokenRegistry.get('colors.primary')   // → '#2563eb'

// set a token at runtime — re-injects CSS immediately
tokenRegistry.set('colors.primary', '#7c3aed')

// subscribe to any change
const unsub = tokenRegistry.subscribe((allTokens) => {
  console.log('tokens updated:', allTokens.colors.primary);
});
unsub(); // cleanup

// dump as CSS custom properties string (useful for SSR)
const css = tokenRegistry.toCSS();
// → ":root { --tws-colors-primary: #7c3aed; ... }"

// get all tokens as plain object
const all = tokenRegistry.getAll();  // → { colors: {...}, spacing: {...} }

// clear all tokens
tokenRegistry.clear();`
        }</div>
      </div>

      {/* configure / createPlugin / createUtilityPlugin — reference */}
      <div className={section}>
        <h2 className={sectionTitle}>configure() + createPlugin() — Reference (Full Bundle API)</h2>
        <p style={{ fontSize: '0.82rem', color: '#4b5563', lineHeight: 1.7, marginBottom: '14px' }}>
          These APIs are available when using the <strong>full bundle</strong> (<code>tailwind-to-style/src</code>) and allow
          extending the built-in Tailwind theme with custom colors, spacing, and custom CSS utility classes.
          They are not part of the v4 public production bundle.
        </p>
        <ConfigurePluginReference />
      </div>

    </div>
  );
}
