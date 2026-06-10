import React, { useState, useRef } from 'react';
import { tw } from 'tailwind-to-style';
import { animate, defineAnimation, getAnimationNames, ANIMATION_PRESETS } from 'tailwind-to-style/animations';

// ── Demo styles ──────────────────────────────────────────────────────────────

const section = tw({ name: 'demo-section', _: 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm' });
const sectionTitle = tw({ name: 'demo-title', _: 'text-xl font-semibold text-gray-900 mb-4' });
const label = tw({ name: 'demo-label', _: 'text-sm text-gray-500 mb-3 font-medium' });

const animBtn = tw({
  name: 'anim-trigger-btn',
  base: 'px-3 py-1.5 text-sm font-medium rounded-lg border cursor-pointer transition-colors duration-150',
  variants: {
    active: {
      true:  'bg-blue-600 text-white border-blue-600',
      false: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
    },
  },
  defaultVariants: { active: false },
});

const previewBox = tw({
  name: 'anim-preview',
  _: 'w-16 h-16 rounded-xl bg-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-md',
});

const codeBlock = tw({
  name: 'anim-code',
  _: 'bg-gray-900 text-green-400 rounded-lg px-4 py-3 text-xs font-mono mt-3',
});

// ── Register a custom animation for the demo ─────────────────────────────────

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

// ── Built-in preset grid ──────────────────────────────────────────────────────

const BUILTIN = [
  'fadeIn', 'fadeOut',
  'slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight',
  'scaleIn', 'scaleOut',
  'bounce', 'shake', 'pulse', 'spin', 'ping',
];

const CUSTOM = ['wiggle', 'rubberBand'];

function AnimPreview({ name }) {
  const [key, setKey] = useState(0);
  const cls = animate(name);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '12px', background: '#f9fafb', borderRadius: '10px', minWidth: '90px' }}
    >
      <div
        key={key}
        className={previewBox + ' ' + cls}
        style={{ cursor: 'pointer' }}
        onClick={() => setKey(k => k + 1)}
        title="Click to replay"
      >
        {name.slice(0, 3).toUpperCase()}
      </div>
      <span style={{ fontSize: '0.65rem', color: '#6b7280', textAlign: 'center', maxWidth: '80px', wordBreak: 'break-word' }}>{name}</span>
    </div>
  );
}

// ── Options demo ──────────────────────────────────────────────────────────────

function CustomOptionsDemo() {
  const [duration, setDuration] = useState('400ms');
  const [easing, setEasing] = useState('ease-out');
  const [delay, setDelay] = useState('0ms');
  const [key, setKey] = useState(0);

  const cls = animate('slideInUp', { duration, easing, delay });

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <div>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>Duration</p>
          <select value={duration} onChange={e => setDuration(e.target.value)} style={{ fontSize: '0.8rem', border: '1px solid #d1d5db', borderRadius: '6px', padding: '4px 8px' }}>
            {['150ms', '300ms', '400ms', '600ms', '800ms', '1s'].map(v => <option key={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>Easing</p>
          <select value={easing} onChange={e => setEasing(e.target.value)} style={{ fontSize: '0.8rem', border: '1px solid #d1d5db', borderRadius: '6px', padding: '4px 8px' }}>
            {['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'cubic-bezier(0.34,1.56,0.64,1)'].map(v => <option key={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>Delay</p>
          <select value={delay} onChange={e => setDelay(e.target.value)} style={{ fontSize: '0.8rem', border: '1px solid #d1d5db', borderRadius: '6px', padding: '4px 8px' }}>
            {['0ms', '100ms', '200ms', '300ms', '500ms'].map(v => <option key={v}>{v}</option>)}
          </select>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          key={key}
          className={previewBox + ' ' + cls}
          style={{ cursor: 'pointer', flexShrink: 0 }}
          onClick={() => setKey(k => k + 1)}
          title="Click to replay"
        >
          ▶
        </div>
        <div>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>Generated className:</p>
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
        <p className={label}>Click any box to replay. Each uses <code style={{ fontSize: '0.85em', background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>animate(name)</code> which injects @keyframes and returns a className.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {BUILTIN.map(name => <AnimPreview key={name} name={name} />)}
        </div>
        <div className={codeBlock}>
          {`import { animate } from 'tailwind-to-style/animations';\n\nconst cls = animate('slideInUp');\n// → "anim-slideInUp-xxxxxxxx"\n// Auto-injects @keyframes tws-anim-slideInUp { ... }\n\n<div className={cls}>...</div>`}
        </div>
      </div>

      {/* Custom animations */}
      <div className={section}>
        <h2 className={sectionTitle}>Animations — Custom (defineAnimation)</h2>
        <p className={label}>Register your own keyframes with <code style={{ fontSize: '0.85em', background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>defineAnimation()</code> — then use them just like built-ins.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {CUSTOM.map(name => <AnimPreview key={name} name={name} />)}
        </div>
        <div className={codeBlock}>
          {`import { defineAnimation, animate } from 'tailwind-to-style/animations';\n\ndefineAnimation('wiggle', {\n  keyframes: [\n    { transform: 'rotate(0deg)' },\n    { transform: 'rotate(-8deg)' },\n    { transform: 'rotate(8deg)' },\n    { transform: 'rotate(0deg)' },\n  ],\n  duration: '500ms',\n  easing: 'ease-in-out',\n});\n\nconst cls = animate('wiggle');\n<div className={cls}>...</div>`}
        </div>
      </div>

      {/* Options playground */}
      <div className={section}>
        <h2 className={sectionTitle}>Animations — Options Playground</h2>
        <p className={label}>Override duration, easing, and delay per-call. Options are merged with the preset defaults.</p>
        <CustomOptionsDemo />
        <div className={codeBlock}>
          {`animate('slideInUp', {\n  duration: '600ms',\n  easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',\n  delay: '200ms',\n})`}
        </div>
      </div>

      {/* All available names */}
      <div className={section}>
        <h2 className={sectionTitle}>Animations — getAnimationNames()</h2>
        <p className={label}>Returns all registered names (built-in + custom).</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {getAnimationNames().map(name => (
            <span key={name} style={{ fontSize: '0.75rem', background: CUSTOM.includes(name) ? '#ede9fe' : '#f3f4f6', color: CUSTOM.includes(name) ? '#7c3aed' : '#374151', padding: '2px 10px', borderRadius: '9999px', fontFamily: 'monospace' }}>
              {name}{CUSTOM.includes(name) ? ' ✦' : ''}
            </span>
          ))}
        </div>
        <p style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: '8px' }}>✦ custom registered with defineAnimation()</p>
      </div>
    </div>
  );
}
