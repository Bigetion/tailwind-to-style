import React from 'react';
import { tw, cx } from 'tailwind-to-style';
import { token } from 'tailwind-to-style/tokens';

/**
 * ThemeShowcase — a set of components that consume CSS custom properties
 * injected by createTheme(). When the active theme changes, these components
 * update automatically because they reference CSS vars at paint time.
 *
 * Demonstrates:
 *   - token() helper → var(--tws-colors-primary)
 *   - CSS variable shorthand in arbitrary values → bg-[var(--tws-...)]
 */

// ── Themed button: background and ring pulled from CSS vars ─────────────────
const themedBtn = tw({
  name: 'theme-btn',
  base: 'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer select-none',
  variants: {
    intent: {
      primary: `bg-[${token('colors.primary')}] text-white hover:opacity-90 focus:ring-2`,
      secondary: `bg-[${token('colors.secondary')}] text-white hover:opacity-90`,
      surface: `bg-[${token('colors.surface')}] text-[${token('colors.text')}] border border-[${token('colors.border')}] hover:opacity-80`,
    },
  },
  defaultVariants: { intent: 'primary' },
});

// ── Themed card using token() references ────────────────────────────────────
const themedCard = tw({
  name: 'theme-card',
  _: `bg-[${token('colors.surface')}] border border-[${token('colors.border')}] rounded-xl p-5 shadow-sm`,
});

const themedHeading = tw({
  name: 'theme-heading',
  _: `text-lg font-semibold text-[${token('colors.text')}]`,
});

const themedSubtext = tw({
  name: 'theme-subtext',
  _: `text-sm text-[${token('colors.muted')}]`,
});

const themedBadge = tw({
  name: 'theme-badge',
  base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  variants: {
    color: {
      primary: `bg-[${token('colors.primaryLight')}] text-[${token('colors.primary')}]`,
      accent:  `bg-[${token('colors.accentLight')}]  text-[${token('colors.accent')}]`,
    },
  },
  defaultVariants: { color: 'primary' },
});

export function ThemedComponents() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Buttons */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button className={themedBtn({ intent: 'primary' })}>Primary Action</button>
        <button className={themedBtn({ intent: 'secondary' })}>Secondary</button>
        <button className={themedBtn({ intent: 'surface' })}>Surface</button>
      </div>

      {/* Card */}
      <div className={themedCard}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <h3 className={themedHeading}>Themed Card</h3>
          <span className={themedBadge({ color: 'primary' })}>Active</span>
        </div>
        <p className={themedSubtext}>
          All colors in this card — background, border, text, badge — are driven by
          CSS custom properties injected by <code style={{ fontSize: '0.8em', background: 'rgba(0,0,0,0.06)', padding: '1px 4px', borderRadius: '3px' }}>createTheme()</code>.
          Switch the theme above and watch them update instantly.
        </p>
        <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
          <span className={themedBadge({ color: 'primary' })}>Design Tokens</span>
          <span className={themedBadge({ color: 'accent' })}>Zero Rebuild</span>
        </div>
      </div>
    </div>
  );
}
