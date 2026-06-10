import React, { useState, useEffect } from 'react';
import { tw } from 'tailwind-to-style';
import { createTheme, token, tokenRegistry } from 'tailwind-to-style/tokens';
import { ThemeProvider, useTheme } from 'tailwind-to-style/react';
import { ThemedComponents } from '../components/ThemeShowcase';

// ── Theme definitions ────────────────────────────────────────────────────────

const THEMES = {
  blue: {
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
    },
  },
  emerald: {
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
    },
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
    },
  },
  slate: {
    colors: {
      primary:      '#475569',
      primaryLight: '#f1f5f9',
      secondary:    '#334155',
      accent:       '#6366f1',
      accentLight:  '#eef2ff',
      surface:      '#f8fafc',
      border:       '#e2e8f0',
      text:         '#0f172a',
      muted:        '#94a3b8',
    },
  },
  violet: {
    colors: {
      primary:      '#7c3aed',
      primaryLight: '#ede9fe',
      secondary:    '#6d28d9',
      accent:       '#ec4899',
      accentLight:  '#fce7f3',
      surface:      '#faf5ff',
      border:       '#ddd6fe',
      text:         '#2e1065',
      muted:        '#8b5cf6',
    },
  },
};

// ── Demo styles ──────────────────────────────────────────────────────────────

const section = tw({ name: 'demo-section', _: 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm' });
const sectionTitle = tw({ name: 'demo-title', _: 'text-xl font-semibold text-gray-900 mb-4' });
const label = tw({ name: 'demo-label', _: 'text-sm text-gray-500 mb-3 font-medium' });

const themeBtn = tw({
  name: 'theme-switcher-btn',
  base: 'px-4 py-1.5 rounded-full text-sm font-medium border-2 transition-all duration-200 cursor-pointer',
  variants: {
    active: {
      true:  'border-gray-900 text-gray-900 shadow-md scale-105',
      false: 'border-transparent text-gray-600 hover:border-gray-300',
    },
  },
  defaultVariants: { active: false },
});

// ── Token Inspector ──────────────────────────────────────────────────────────

function TokenInspector({ tokens }) {
  const colors = tokens?.colors || {};
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '8px' }}>
      {Object.entries(colors).map(([key, value]) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 10px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: value, border: '1px solid rgba(0,0,0,0.1)', flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: '0.7rem', color: '#6b7280', lineHeight: 1.2 }}>colors.{key}</p>
            <p style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#374151' }}>{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── CSS Var Inspector ────────────────────────────────────────────────────────

function CSSVarInspector({ themeName }) {
  const vars = Object.entries(THEMES[themeName]?.colors || {}).map(([key]) => ({
    var: `--tws-colors-${key}`,
    ref: `token('colors.${key}')`,
  }));

  return (
    <div style={{ background: '#1e1e2e', borderRadius: '10px', padding: '16px', overflowX: 'auto' }}>
      <p style={{ fontSize: '0.7rem', color: '#888', marginBottom: '8px', fontFamily: 'monospace' }}>/* Injected CSS custom properties */</p>
      <pre style={{ fontSize: '0.75rem', color: '#cdd6f4', margin: 0, fontFamily: 'monospace', lineHeight: 1.7 }}>
        {':root {\n'}
        {vars.map(v => `  ${v.var}: ...;\n`).join('')}
        {'}'}
      </pre>
      <p style={{ fontSize: '0.7rem', color: '#888', marginTop: '12px', marginBottom: '4px', fontFamily: 'monospace' }}>/* Reference in tw() */</p>
      <pre style={{ fontSize: '0.75rem', color: '#a6e3a1', margin: 0, fontFamily: 'monospace', lineHeight: 1.7 }}>
        {`tw({ _: 'bg-[${token('colors.primary')}]' })`}
      </pre>
    </div>
  );
}

// ── Inner consumer (uses useTheme) ───────────────────────────────────────────

function ThemeConsumer({ activeThemeName }) {
  const { tokens } = useTheme();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Live themed components */}
      <div className={section}>
        <h2 className={sectionTitle}>Live Themed Components</h2>
        <p className={label}>These components read from CSS custom properties — no re-render needed when theme changes</p>
        <ThemedComponents />
      </div>

      {/* Token inspector */}
      <div className={section}>
        <h2 className={sectionTitle}>Active Token Values</h2>
        <p className={label}>CSS custom properties currently injected on :root</p>
        <TokenInspector tokens={tokens} />
      </div>

      {/* CSS var code */}
      <div className={section}>
        <h2 className={sectionTitle}>Generated CSS Variables</h2>
        <p className={label}>What createTheme() injects, and how to reference them with token()</p>
        <CSSVarInspector themeName={activeThemeName} />
      </div>
    </div>
  );
}

// ── Main Demo ────────────────────────────────────────────────────────────────

export function ThemeDemo() {
  const [activeTheme, setActiveTheme] = useState('blue');

  // Apply theme on mount and on change
  useEffect(() => {
    createTheme(structuredClone(THEMES[activeTheme]), { name: activeTheme });
  }, [activeTheme]);

  return (
    <div>
      {/* Theme switcher */}
      <div className={section}>
        <h2 className={sectionTitle}>Tokens — Live Theme Switching</h2>
        <p className={label}>
          Select a theme — <code style={{ fontSize: '0.85em', background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>createTheme()</code> injects
          CSS custom properties on <code style={{ fontSize: '0.85em', background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>:root</code>.
          Components reference them via <code style={{ fontSize: '0.85em', background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>token()</code> — zero JS re-renders required.
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
          {Object.keys(THEMES).map((name) => (
            <button
              key={name}
              className={themeBtn({ active: activeTheme === name })}
              onClick={() => setActiveTheme(name)}
              style={{
                background: 'none',
                borderColor: activeTheme === name ? THEMES[name].colors.primary : 'transparent',
                color: activeTheme === name ? THEMES[name].colors.primary : '#4b5563',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: THEMES[name].colors.primary, display: 'inline-block' }} />
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ThemeProvider wraps the consumers */}
      <ThemeProvider theme={THEMES[activeTheme]} name={activeTheme}>
        <ThemeConsumer activeThemeName={activeTheme} />
      </ThemeProvider>

      {/* API reference */}
      <div className={section}>
        <h2 className={sectionTitle}>API Used</h2>
        <div style={{ background: '#1e1e2e', borderRadius: '10px', padding: '20px', overflowX: 'auto' }}>
          <pre style={{ fontSize: '0.78rem', color: '#cdd6f4', margin: 0, fontFamily: 'monospace', lineHeight: 1.8 }}>{
`import { createTheme, token } from 'tailwind-to-style/tokens';
import { ThemeProvider, useTheme } from 'tailwind-to-style/react';

// 1. Define tokens
const blueTheme = {
  colors: { primary: '#2563eb', surface: '#fff', ... }
};

// 2. Inject as CSS custom properties
createTheme(blueTheme, { name: 'blue' });
// → :root { --tws-colors-primary: #2563eb; ... }

// 3. Reference in tw() using token() helper
const btn = tw({
  name: 'btn',
  base: \`bg-[\${token('colors.primary')}] text-white\`,
});
// → bg-[var(--tws-colors-primary)]

// 4. Wrap your app with ThemeProvider for reactive updates
<ThemeProvider theme={blueTheme} name="blue">
  <App />
</ThemeProvider>

// 5. Read tokens in components
const { tokens, setTheme } = useTheme();`
          }</pre>
        </div>
      </div>
    </div>
  );
}
