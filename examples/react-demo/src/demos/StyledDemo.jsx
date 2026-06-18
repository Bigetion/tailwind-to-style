import React, { useState } from 'react';
import { tw, cx } from 'tailwind-to-style';
import { styled } from 'tailwind-to-style/react';

// ── Demo styles ───────────────────────────────────────────────────────────────

const section      = tw('demo-section',   'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm');
const sectionTitle = tw('demo-title',     'text-xl font-semibold text-gray-900 mb-4');
const label        = tw('demo-label',     'text-sm text-gray-500 mb-3 font-medium');
const codeBlock    = tw('styled-code',    'bg-gray-900 text-green-400 rounded-lg px-4 py-3 text-xs font-mono mt-3 overflow-x-auto whitespace-pre');

// ═══════════════════════════════════════════════════════════════════════════════
// styled() components
// ═══════════════════════════════════════════════════════════════════════════════

// 1. Basic styled element
const Box = styled('div', {
  name: 'styled-box',
  base: 'rounded-xl border p-4 transition-all',
  variants: {
    intent: {
      default: 'bg-white border-gray-200 text-gray-700',
      info:    'bg-blue-50 border-blue-200 text-blue-800',
      success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      danger:  'bg-red-50 border-red-200 text-red-800',
    },
    elevated: {
      true: 'shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    },
  },
  defaultVariants: { intent: 'default' },
});

// 2. Styled button with compound variants
const StyledButton = styled('button', {
  name: 'styled-btn',
  base: 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg border-none cursor-pointer select-none transition-all duration-200 hover:opacity-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2',
  variants: {
    color: {
      primary:   'bg-blue-600 text-white focus:ring-blue-400',
      secondary: 'bg-gray-200 text-gray-900 focus:ring-gray-400',
      danger:    'bg-red-600 text-white focus:ring-red-400',
      success:   'bg-emerald-600 text-white focus:ring-emerald-400',
      ghost:     'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
    },
    size: {
      sm: 'text-xs px-3 py-1.5',
      md: 'text-sm px-4 py-2',
      lg: 'text-base px-6 py-3',
    },
    fullWidth: {
      true: 'w-full',
    },
  },
  compoundVariants: [
    { color: 'primary', size: 'lg', class: 'shadow-lg shadow-blue-500/30' },
    { color: 'danger',  size: 'lg', class: 'shadow-lg shadow-red-500/30'  },
  ],
  defaultVariants: { color: 'primary', size: 'md' },
});

// 3. Styled anchor (extends a non-div element)
const StyledLink = styled('a', {
  name: 'styled-link',
  base: 'inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer no-underline',
  variants: {
    variant: {
      default: 'text-blue-600 hover:text-blue-800 hover:underline',
      muted:   'text-gray-500 hover:text-gray-800',
      danger:  'text-red-600 hover:text-red-800 hover:underline',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});

// 4. Styled badge (wraps a span)
const Badge = styled('span', {
  name: 'styled-badge',
  base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
  variants: {
    color: {
      gray:   'bg-gray-100 text-gray-700',
      blue:   'bg-blue-100 text-blue-700',
      green:  'bg-emerald-100 text-emerald-700',
      red:    'bg-red-100 text-red-700',
      yellow: 'bg-yellow-100 text-yellow-700',
      purple: 'bg-purple-100 text-purple-700',
    },
  },
  defaultVariants: { color: 'gray' },
});

// 5. Styled input
const StyledInput = styled('input', {
  name: 'styled-input',
  base: 'w-full px-4 py-2 rounded-lg border text-sm outline-none transition-all',
  variants: {
    state: {
      default: 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
      error:   'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100',
      success: 'border-emerald-400 bg-emerald-50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100',
    },
  },
  defaultVariants: { state: 'default' },
});

// 6. Styled wrapping a React component
function BaseCard({ className, children, ...props }) {
  return (
    <div className={cx('rounded-xl border overflow-hidden', className)} {...props}>
      {children}
    </div>
  );
}

const StyledCard = styled(BaseCard, {
  name: 'styled-card',
  base: 'shadow-sm transition-shadow',
  variants: {
    hover: {
      true: 'hover:shadow-md cursor-pointer',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: { hover: false, size: 'md' },
});

// ── Main Demo ─────────────────────────────────────────────────────────────────

export function StyledDemo() {
  const [btnColor, setBtnColor]   = useState('primary');
  const [btnSize, setBtnSize]     = useState('md');
  const [btnFull, setBtnFull]     = useState(false);
  const [inputState, setInputState] = useState('default');
  const [boxIntent, setBoxIntent] = useState('info');
  const [boxElevated, setBoxElevated] = useState(true);

  return (
    <div>

      {/* Intro */}
      <div className={section}>
        <h2 className={sectionTitle}>styled() — React Component Factory</h2>
        <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.7, marginBottom: '10px' }}>
          <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>styled(element, config)</code> creates
          a React component that accepts variant props and forwards all other props to the underlying element.
          It uses <code>forwardRef</code>, exposes a <code>.variants</code> selector, and sets a readable DevTools display name.
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Badge color="blue">forwardRef</Badge>
          <Badge color="green">variant props</Badge>
          <Badge color="purple">compound variants</Badge>
          <Badge color="yellow">HTML or React component</Badge>
          <Badge color="gray">.variants + .raw exposed</Badge>
        </div>
      </div>

      {/* Box variants */}
      <div className={section}>
        <h2 className={sectionTitle}>styled('div') — Box with intent + elevated variants</h2>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '14px' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>intent</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['default', 'info', 'success', 'warning', 'danger'].map(i => (
                <button key={i} onClick={() => setBoxIntent(i)}
                  style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer', border: '1px solid',
                    background: boxIntent === i ? '#1e40af' : '#f3f4f6', color: boxIntent === i ? 'white' : '#374151',
                    borderColor: boxIntent === i ? '#1e40af' : '#d1d5db' }}>
                  {i}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>elevated</p>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
              <input type="checkbox" checked={boxElevated} onChange={e => setBoxElevated(e.target.checked)} />
              shadow + hover lift
            </label>
          </div>
        </div>

        <Box intent={boxIntent} elevated={boxElevated}>
          <p style={{ fontWeight: 600, marginBottom: '4px' }}>styled Box — intent: {boxIntent}</p>
          <p style={{ fontSize: '0.85rem' }}>Variant props are separated from DOM props automatically.</p>
        </Box>

        <div className={codeBlock}>{
`import { styled } from 'tailwind-to-style/react';

const Box = styled('div', {
  name: 'styled-box',
  base: 'rounded-xl border p-4 transition-all',
  variants: {
    intent: {
      default: 'bg-white border-gray-200 text-gray-700',
      info:    'bg-blue-50 border-blue-200 text-blue-800',
      danger:  'bg-red-50 border-red-200 text-red-800',
    },
    elevated: { true: 'shadow-lg hover:shadow-xl hover:-translate-y-0.5' },
  },
  defaultVariants: { intent: 'default' },
});

// Usage — variant props handled, rest forwarded to <div>
<Box intent="info" elevated onClick={fn} className="my-4">
  Content
</Box>`
        }</div>
      </div>

      {/* Button */}
      <div className={section}>
        <h2 className={sectionTitle}>styled('button') — StyledButton with compound variants</h2>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '14px' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>color</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['primary', 'secondary', 'danger', 'success', 'ghost'].map(c => (
                <button key={c} onClick={() => setBtnColor(c)}
                  style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer', border: '1px solid',
                    background: btnColor === c ? '#1e40af' : '#f3f4f6', color: btnColor === c ? 'white' : '#374151',
                    borderColor: btnColor === c ? '#1e40af' : '#d1d5db' }}>
                  {c}
                </button>
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
                    borderColor: btnSize === s ? '#1e40af' : '#d1d5db' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>fullWidth</p>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
              <input type="checkbox" checked={btnFull} onChange={e => setBtnFull(e.target.checked)} />
              w-full
            </label>
          </div>
        </div>

        <div style={{ maxWidth: btnFull ? '100%' : '300px' }}>
          <StyledButton color={btnColor} size={btnSize} fullWidth={btnFull}>
            StyledButton ({btnColor} / {btnSize}{btnFull ? ' / full' : ''})
          </StyledButton>
        </div>

        <div className={codeBlock}>{
`const StyledButton = styled('button', {
  name: 'styled-btn',
  base: 'inline-flex items-center font-semibold rounded-lg border-none cursor-pointer transition-all active:scale-95',
  variants: {
    color: {
      primary: 'bg-blue-600 text-white focus:ring-blue-400',
      danger:  'bg-red-600 text-white focus:ring-red-400',
    },
    size: { sm: 'text-xs px-3 py-1.5', md: 'text-sm px-4 py-2', lg: 'text-base px-6 py-3' },
    fullWidth: { true: 'w-full' },
  },
  compoundVariants: [
    { color: 'primary', size: 'lg', class: 'shadow-lg shadow-blue-500/30' },
  ],
  defaultVariants: { color: 'primary', size: 'md' },
});

<StyledButton color="danger" size="lg" onClick={handleDelete}>Delete</StyledButton>`
        }</div>
      </div>

      {/* Input */}
      <div className={section}>
        <h2 className={sectionTitle}>styled('input') — StyledInput with state variants</h2>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {['default', 'error', 'success'].map(s => (
            <button key={s} onClick={() => setInputState(s)}
              style={{ padding: '4px 12px', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer', border: '1px solid',
                background: inputState === s ? '#1e40af' : '#f3f4f6', color: inputState === s ? 'white' : '#374151',
                borderColor: inputState === s ? '#1e40af' : '#d1d5db' }}>
              {s}
            </button>
          ))}
        </div>

        <div style={{ maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <StyledInput state={inputState} placeholder={`State: ${inputState}`} />
          {inputState === 'error'   && <p style={{ fontSize: '0.75rem', color: '#dc2626' }}>This field is required.</p>}
          {inputState === 'success' && <p style={{ fontSize: '0.75rem', color: '#059669' }}>Looks good!</p>}
        </div>

        <div className={codeBlock}>{
`const StyledInput = styled('input', {
  name: 'styled-input',
  base: 'w-full px-4 py-2 rounded-lg border text-sm outline-none transition-all',
  variants: {
    state: {
      default: 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
      error:   'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-100',
      success: 'border-emerald-400 bg-emerald-50 focus:ring-2 focus:ring-emerald-100',
    },
  },
  defaultVariants: { state: 'default' },
});

<StyledInput state={hasError ? 'error' : 'success'} placeholder="Email" />`
        }</div>
      </div>

      {/* Wrapping React component */}
      <div className={section}>
        <h2 className={sectionTitle}>styled(ReactComponent) — Wrap Existing Components</h2>
        <p className={label}>
          Pass any React component as the first argument. Variant classes are merged into its <code>className</code> prop.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <StyledCard hover className="overflow-hidden" style={{ width: '200px' }}>
            <div style={{ background: '#eff6ff', height: '80px' }} />
            <div style={{ padding: '12px' }}>
              <p style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>StyledCard</p>
              <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>Wraps BaseCard React component</p>
            </div>
          </StyledCard>
          <StyledCard style={{ width: '200px' }}>
            <div style={{ background: '#f0fdf4', height: '80px' }} />
            <div style={{ padding: '12px' }}>
              <p style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>No hover</p>
              <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>hover=false (default)</p>
            </div>
          </StyledCard>
        </div>

        <div className={codeBlock}>{
`// Wrap any React component that accepts className
function BaseCard({ className, children, ...props }) {
  return <div className={cx('rounded-xl border overflow-hidden', className)} {...props}>{children}</div>;
}

const StyledCard = styled(BaseCard, {
  name: 'styled-card',
  base: 'shadow-sm transition-shadow',
  variants: {
    hover: { true: 'hover:shadow-md cursor-pointer' },
  },
  defaultVariants: { hover: false },
});

<StyledCard hover onClick={fn}>...</StyledCard>`
        }</div>
      </div>

      {/* Links & badges */}
      <div className={section}>
        <h2 className={sectionTitle}>styled('a') + styled('span') — Links & Badges</h2>
        <p className={label}>Works on any HTML element. Here's <code>StyledLink</code> and <code>Badge</code>.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <StyledLink href="#" variant="default">Default link →</StyledLink>
            <StyledLink href="#" variant="muted">Muted link</StyledLink>
            <StyledLink href="#" variant="danger">Danger link</StyledLink>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Badge color="blue">TypeScript</Badge>
            <Badge color="green">React</Badge>
            <Badge color="red">Breaking</Badge>
            <Badge color="yellow">Beta</Badge>
            <Badge color="purple">New</Badge>
            <Badge>Default</Badge>
          </div>
        </div>
      </div>

    </div>
  );
}
