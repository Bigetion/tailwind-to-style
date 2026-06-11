import React, { useState, useEffect, useRef } from 'react';
import { tw } from 'tailwind-to-style';
import { animate, defineAnimation, getAnimationNames, getPreset } from 'tailwind-to-style/animations';

// ── Demo styles ──────────────────────────────────────────────────────────────

const section = tw('demo-section', 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm');
const sectionTitle = tw('demo-title', 'text-xl font-semibold text-gray-900 mb-4');
const label = tw('demo-label', 'text-sm text-gray-500 mb-3 font-medium');

const codeBlock = tw(
  'anim-code',
  'bg-gray-900 text-green-400 rounded-lg px-4 py-3 text-xs font-mono mt-3 overflow-x-auto whitespace-pre',
);

const boxBase = tw(
  'anim-box',
  'w-16 h-16 rounded-xl bg-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-md cursor-pointer select-none',
);

// ── Register custom animations ───────────────────────────────────────────────

defineAnimation('wiggle', {
  keyframes: [
    { transform: 'rotate(0deg)' },
    { transform: 'rotate(-8deg)' },
    { transform: 'rotate(8deg)' },
    { transform: 'rotate(-4deg)' },
    { transform: 'rotate(4deg)' },
    { transform: 'rotate(0deg)' },
  ],
  duration: '500ms',
  easing: 'ease-in-out',
});

defineAnimation('rubberBand', {
  keyframes: [
    { transform: 'scale(1, 1)' },
    { transform: 'scale(1.25, 0.75)' },
    { transform: 'scale(0.75, 1.25)' },
    { transform: 'scale(1.15, 0.85)' },
    { transform: 'scale(0.95, 1.05)' },
    { transform: 'scale(1.05, 0.95)' },
    { transform: 'scale(1, 1)' },
  ],
  duration: '600ms',
  easing: 'ease-in-out',
});

// ── Preset lists ──────────────────────────────────────────────────────────────

const BUILTIN = [
  'fadeIn', 'fadeOut',
  'slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight',
  'scaleIn', 'scaleOut',
  'bounce', 'shake', 'pulse', 'spin', 'ping',
];

const CUSTOM = ['wiggle', 'rubberBand'];

// ── useAnimation hook — triggers Web Animations API directly ─────────────────
//
// `animate()` from the library injects @keyframes into <style> and returns a
// className. The issue with className-based replay: same class = browser won't
// restart. We use element.animate() (Web Animations API) directly for reliable
// replay — pulling keyframes + options from getPreset().

function useAnimation(name, options = {}) {
  const ref = useRef(null);

  const play = (overrides = {}) => {
    const preset = getPreset(name);
    if (!preset || !ref.current) return;

    const duration = parseInt(overrides.duration || options.duration || preset.duration || '300ms');
    const easing   = overrides.easing   || options.easing   || preset.easing   || 'ease';
    const delay    = parseInt(overrides.delay || options.delay || preset.delay || '0ms');
    const iterations = overrides.iterations || options.iterations || preset.iterations || 1;

    ref.current.animate(preset.keyframes, {
      duration,
      easing,
      delay,
      iterations: iterations === 'infinite' ? Infinity : Number(iterations),
      fill: 'both',
    });
  };

  return { ref, play };
}

// ── AnimPreview — click to replay via Web Animations API ─────────────────────

function AnimPreview({ name }) {
  const { ref, play } = useAnimation(name);

  // Auto-play on mount
  useEffect(() => { play(); }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '12px', background: '#f9fafb', borderRadius: '10px', minWidth: '90px' }}>
      <div
        ref={ref}
        className={boxBase}
        onClick={() => play()}
        title="Click to replay"
      >
        {name.slice(0, 3).toUpperCase()}
      </div>
      <span style={{ fontSize: '0.65rem', color: '#6b7280', textAlign: 'center', maxWidth: '80px', wordBreak: 'break-word' }}>{name}</span>
    </div>
  );
}

// ── Options playground ────────────────────────────────────────────────────────

function CustomOptionsDemo() {
  const [duration, setDuration]   = useState('400ms');
  const [easing, setEasing]       = useState('ease-out');
  const [delay, setDelay]         = useState('0ms');
  const { ref, play }             = useAnimation('slideInUp');

  const triggerPlay = () => play({ duration, easing, delay });

  // Auto-play on mount
  useEffect(() => { triggerPlay(); }, []);

  // Re-play when options change
  useEffect(() => { triggerPlay(); }, [duration, easing, delay]);

  // Build the animate() class for display purposes only
  const cls = animate('slideInUp', { duration, easing, delay });

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {[
          { label: 'Duration', value: duration, set: setDuration, opts: ['150ms', '300ms', '400ms', '600ms', '800ms', '1s'] },
          { label: 'Easing',   value: easing,   set: setEasing,   opts: ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'cubic-bezier(0.34,1.56,0.64,1)'] },
          { label: 'Delay',    value: delay,    set: setDelay,    opts: ['0ms', '100ms', '200ms', '300ms', '500ms'] },
        ].map(({ label: l, value, set, opts }) => (
          <div key={l}>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>{l}</p>
            <select value={value} onChange={e => set(e.target.value)} style={{ fontSize: '0.8rem', border: '1px solid #d1d5db', borderRadius: '6px', padding: '4px 8px' }}>
              {opts.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          ref={ref}
          className={boxBase}
          onClick={triggerPlay}
          title="Click to replay"
        >
          ▶
        </div>
        <div>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>animate() className (for reference):</p>
          <code style={{ fontSize: '0.72rem', background: '#f3f4f6', padding: '4px 8px', borderRadius: '6px', display: 'block', wordBreak: 'break-all' }}>{cls}</code>
          <p style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '4px' }}>Click box to replay</p>
        </div>
      </div>
    </div>
  );
}

// ── Main demo ─────────────────────────────────────────────────────────────────

export function AnimationsDemo() {
  return (
    <div>
      {/* Built-in presets */}
      <div className={section}>
        <h2 className={sectionTitle}>Animations — Built-in Presets</h2>
        <p className={label}>
          Click any box to replay. Uses <code style={{ fontSize: '0.85em', background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>getPreset()</code> +
          Web Animations API for reliable replay. <code style={{ fontSize: '0.85em', background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>animate(name)</code> injects @keyframes and returns a className.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {BUILTIN.map(name => <AnimPreview key={name} name={name} />)}
        </div>
        <div className={codeBlock}>{
`import { animate, getPreset } from 'tailwind-to-style/animations';

// Option A: className (CSS-based, one-shot on mount)
const cls = animate('slideInUp');
// → "anim-slideInUp-xxxxxxxx"  (injects @keyframes tws-anim-slideInUp)
<div className={cls}>...</div>

// Option B: Web Animations API (reliable replay)
const preset = getPreset('slideInUp');
element.animate(preset.keyframes, { duration: 400, easing: 'ease-out', fill: 'both' });`
        }</div>
      </div>

      {/* Custom animations */}
      <div className={section}>
        <h2 className={sectionTitle}>Animations — Custom (defineAnimation)</h2>
        <p className={label}>
          Register your own keyframes with <code style={{ fontSize: '0.85em', background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>defineAnimation()</code> — then use them just like built-ins.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {CUSTOM.map(name => <AnimPreview key={name} name={name} />)}
        </div>
        <div className={codeBlock}>{
`import { defineAnimation, animate } from 'tailwind-to-style/animations';

defineAnimation('wiggle', {
  keyframes: [
    { transform: 'rotate(0deg)' },
    { transform: 'rotate(-8deg)' },
    { transform: 'rotate(8deg)' },
    { transform: 'rotate(0deg)' },
  ],
  duration: '500ms',
  easing: 'ease-in-out',
});

const cls = animate('wiggle');  // works just like built-ins`
        }</div>
      </div>

      {/* Options playground */}
      <div className={section}>
        <h2 className={sectionTitle}>Animations — Options Playground</h2>
        <p className={label}>Override duration, easing, and delay per-call. Click box or change options to replay.</p>
        <CustomOptionsDemo />
        <div className={codeBlock}>{
`animate('slideInUp', {
  duration: '600ms',
  easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',  // spring-like overshoot
  delay: '200ms',
})`
        }</div>
      </div>

      {/* All available names */}
      <div className={section}>
        <h2 className={sectionTitle}>Animations — getAnimationNames()</h2>
        <p className={label}>Returns all registered names (built-in + custom).</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {getAnimationNames().map(name => (
            <span
              key={name}
              style={{
                fontSize: '0.75rem',
                background: CUSTOM.includes(name) ? '#ede9fe' : '#f3f4f6',
                color: CUSTOM.includes(name) ? '#7c3aed' : '#374151',
                padding: '2px 10px',
                borderRadius: '9999px',
                fontFamily: 'monospace',
              }}
            >
              {name}{CUSTOM.includes(name) ? ' ✦' : ''}
            </span>
          ))}
        </div>
        <p style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: '8px' }}>✦ custom registered with defineAnimation()</p>
      </div>
    </div>
  );
}
