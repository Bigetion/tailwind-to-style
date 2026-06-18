import React, { useState, useEffect } from 'react';
import { tw, cx, createSSRCollector } from 'tailwind-to-style';

// ── Demo styles ───────────────────────────────────────────────────────────────

const section      = tw('demo-section',  'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm');
const sectionTitle = tw('demo-title',    'text-xl font-semibold text-gray-900 mb-4');
const label        = tw('demo-label',    'text-sm text-gray-500 mb-3 font-medium');
const codeBlock    = tw('ssr-code',      'bg-gray-900 text-green-400 rounded-lg px-4 py-3 text-xs font-mono mt-3 overflow-x-auto whitespace-pre');

// ── tw.extractCSS() — live snapshot ──────────────────────────────────────────

function ExtractCSSSection() {
  const [css, setCss] = useState('');
  const [lineCount, setLineCount] = useState(0);
  const [source, setSource] = useState('dom');

  const refresh = () => {
    let extracted = '';

    if (source === 'dom') {
      // In-browser: read CSS directly from the injected <style> tags
      const styleTags = document.querySelectorAll('style[data-twsx-classname], style[id^="twsx"]');
      extracted = Array.from(styleTags).map(s => s.textContent).join('\n').trim();
      if (!extracted) {
        // fallback: try tw.extractCSS() (works if SSR collector is active)
        extracted = tw.extractCSS() || '';
      }
    } else {
      // SSR mode: tw.extractCSS() reads from the SSR collector
      extracted = tw.extractCSS() || '';
    }

    setCss(extracted);
    setLineCount(extracted ? extracted.split('\n').length : 0);
  };

  useEffect(() => { refresh(); }, [source]);

  return (
    <div className={section}>
      <h2 className={sectionTitle}>tw.extractCSS() — Snapshot All Generated CSS</h2>
      <p className={label}>
        <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>tw.extractCSS()</code> untuk
        SSR — extract semua CSS yang di-generate lalu embed ke HTML response.
        Di browser (SPA), CSS langsung inject ke DOM; gunakan tombol <strong>Read from DOM</strong> untuk melihat CSS yang sudah ter-inject.
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
        <button onClick={() => setSource('dom')}
          style={{ padding: '5px 12px', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer', border: '1px solid',
            background: source === 'dom' ? '#1e40af' : '#f3f4f6', color: source === 'dom' ? 'white' : '#374151',
            borderColor: source === 'dom' ? '#1e40af' : '#d1d5db' }}>
          Read from DOM (browser)
        </button>
        <button onClick={() => setSource('ssr')}
          style={{ padding: '5px 12px', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer', border: '1px solid',
            background: source === 'ssr' ? '#1e40af' : '#f3f4f6', color: source === 'ssr' ? 'white' : '#374151',
            borderColor: source === 'ssr' ? '#1e40af' : '#d1d5db' }}>
          tw.extractCSS() (SSR collector)
        </button>
      </div>

      {source === 'ssr' && (
        <div style={{ background: '#fefce8', border: '1px solid #fde68a', borderRadius: '8px', padding: '10px 14px', fontSize: '0.8rem', color: '#92400e', marginBottom: '10px' }}>
          <strong>Note:</strong> Di browser, SSR collector kosong karena CSS langsung inject ke DOM.
          <code>tw.extractCSS()</code> dipakai saat rendering di server (Next.js, Remix, Express) — tidak ada DOM di sana.
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'center' }}>
        <button onClick={refresh}
          style={{ padding: '7px 16px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', border: '1px solid #d1d5db', background: '#f3f4f6', color: '#374151' }}>
          Refresh Snapshot
        </button>
        <span style={{ fontSize: '0.78rem', color: '#6b7280' }}>
          {lineCount} lines · {(new TextEncoder().encode(css).length / 1024).toFixed(1)} KB
        </span>
      </div>

      <div style={{ maxHeight: '280px', overflow: 'auto', background: '#1e1e2e', borderRadius: '10px', padding: '14px' }}>
        <pre style={{ fontSize: '0.7rem', color: '#cdd6f4', margin: 0, fontFamily: 'monospace', lineHeight: 1.6 }}>
          {css || '(no CSS extracted yet)'}
        </pre>
      </div>

      <div className={codeBlock}>{
`// Server-side rendering workflow:
// 1. Render your app (tw() calls inject CSS into a collector)
const html = renderToString(<App />);

// 2. Extract all generated CSS
const css = tw.extractCSS();

// 3. Embed in your HTML response
const page = \`
  <html>
    <head>
      <style data-tws="">\${css}</style>
    </head>
    <body>\${html}</body>
  </html>
\`;`
      }</div>
    </div>
  );
}

// ── createSSRCollector() ──────────────────────────────────────────────────────

function SSRCollectorSection() {
  const [collectorOutput, setCollectorOutput] = useState('');
  const [stats, setStats] = useState(null);
  const [mode, setMode] = useState('styleTag');

  const runDemo = () => {
    const ssr = createSSRCollector({ dedupe: true });

    // Simulate rendering components that use tw()
    // (In real SSR these would be called during renderToString)
    const simulated = [
      tw('flex items-center gap-4 p-4'),
      tw('bg-white rounded-xl border border-gray-200 shadow-sm'),
      tw('text-lg font-semibold text-gray-900'),
      tw('text-sm text-gray-500'),
      tw('px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'),
    ];

    const rawCSS   = ssr.extractRaw();
    const styleTag = ssr.extract({ id: 'tws-ssr' });
    const peeked   = ssr.peek ? ssr.peek() : rawCSS;
    const st       = ssr.getStats ? ssr.getStats() : { ruleCount: 0, uniqueCount: 0, totalSize: rawCSS.length };

    setCollectorOutput(mode === 'styleTag' ? styleTag : rawCSS);
    setStats(st);
  };

  useEffect(() => { runDemo(); }, [mode]);

  return (
    <div className={section}>
      <h2 className={sectionTitle}>createSSRCollector() — Fine-grained CSS Collection</h2>
      <p className={label}>
        <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>createSSRCollector(options)</code> gives you
        explicit control over collection: deduplication, minification, style tag wrapping, and stats.
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <button onClick={() => setMode('styleTag')}
          style={{ padding: '5px 12px', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer', border: '1px solid',
            background: mode === 'styleTag' ? '#1e40af' : '#f3f4f6', color: mode === 'styleTag' ? 'white' : '#374151',
            borderColor: mode === 'styleTag' ? '#1e40af' : '#d1d5db' }}>
          extract() → style tag
        </button>
        <button onClick={() => setMode('raw')}
          style={{ padding: '5px 12px', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer', border: '1px solid',
            background: mode === 'raw' ? '#1e40af' : '#f3f4f6', color: mode === 'raw' ? 'white' : '#374151',
            borderColor: mode === 'raw' ? '#1e40af' : '#d1d5db' }}>
          extractRaw() → CSS string
        </button>
      </div>

      {stats && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
          {[
            { label: 'Rules', value: stats.ruleCount ?? '–' },
            { label: 'Unique', value: stats.uniqueCount ?? '–' },
            { label: 'Size', value: `${((stats.totalSize || 0) / 1024).toFixed(2)} KB` },
          ].map(s => (
            <div key={s.label} style={{ background: '#f3f4f6', borderRadius: '8px', padding: '8px 14px', textAlign: 'center' }}>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: '#1e40af' }}>{s.value}</p>
              <p style={{ fontSize: '0.7rem', color: '#6b7280' }}>{s.label}</p>
            </div>
          ))}
        </div>
      )}

      <div style={{ maxHeight: '220px', overflow: 'auto', background: '#1e1e2e', borderRadius: '10px', padding: '14px' }}>
        <pre style={{ fontSize: '0.7rem', color: '#a6e3a1', margin: 0, fontFamily: 'monospace', lineHeight: 1.6 }}>
          {collectorOutput || '(running…)'}
        </pre>
      </div>

      <div className={codeBlock}>{
`import { createSSRCollector } from 'tailwind-to-style';

// Create a collector (options are optional)
const ssr = createSSRCollector({ dedupe: true, minify: false });

// Render your React app (all tw() calls are tracked)
const html = renderToString(<App />);

// Extract as raw CSS string
const rawCSS = ssr.extractRaw();

// OR extract wrapped in a <style> tag (ready to inject into <head>)
const styleTag = ssr.extract({ id: 'tws-ssr', nonce: cspNonce });

// Stats
const { ruleCount, uniqueCount, totalSize } = ssr.getStats();`
      }</div>
    </div>
  );
}

// ── Critical CSS extraction ───────────────────────────────────────────────────

function CriticalCSSSection() {
  const [result, setResult] = useState(null);

  const runExtract = () => {
    const ssr = createSSRCollector({ dedupe: true });
    // Trigger some tw() calls to populate
    tw('flex items-center gap-4');
    tw('bg-white rounded-xl p-6 shadow-sm');
    tw('text-2xl font-bold text-gray-900');

    if (typeof ssr.extractCritical === 'function') {
      const r = ssr.extractCritical({ maxSize: 2048 });
      setResult(r);
    } else {
      setResult({ critical: ssr.extract(), rest: '', stats: { criticalSize: 0, criticalCount: 0, totalCount: 0 } });
    }
  };

  useEffect(() => { runExtract(); }, []);

  return (
    <div className={section}>
      <h2 className={sectionTitle}>extractCritical() — Above-the-fold CSS</h2>
      <p className={label}>
        Split CSS into critical (small, above-the-fold) and the rest.
        Embed critical inline, lazy-load the rest.
      </p>

      <button onClick={runExtract}
        style={{ padding: '7px 16px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', border: '1px solid #d1d5db', background: '#f3f4f6', marginBottom: '12px' }}>
        Run extractCritical()
      </button>

      {result && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, marginBottom: '6px' }}>
              Critical CSS ({result.stats?.criticalCount ?? 0} rules)
            </p>
            <div style={{ maxHeight: '140px', overflow: 'auto', background: '#1e1e2e', borderRadius: '8px', padding: '10px' }}>
              <pre style={{ fontSize: '0.68rem', color: '#a6e3a1', margin: 0, fontFamily: 'monospace', lineHeight: 1.5 }}>
                {result.critical || '(none)'}
              </pre>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600, marginBottom: '6px' }}>
              Deferred CSS ({result.stats?.totalCount ?? 0} total)
            </p>
            <div style={{ maxHeight: '140px', overflow: 'auto', background: '#1e1e2e', borderRadius: '8px', padding: '10px' }}>
              <pre style={{ fontSize: '0.68rem', color: '#cdd6f4', margin: 0, fontFamily: 'monospace', lineHeight: 1.5 }}>
                {result.rest || '(none — all critical)'}
              </pre>
            </div>
          </div>
        </div>
      )}

      <div className={codeBlock}>{
`const ssr = createSSRCollector({ dedupe: true });
const html = renderToString(<App />);

const { critical, rest, stats } = ssr.extractCritical({ maxSize: 4096 });

// Embed critical inline (no FOUC)
// Lazy-load rest (non-blocking)
const page = \`
  <head>
    <style id="tws-critical">\${critical}</style>
    <link rel="preload" as="style" href="/styles/tws.css">
  </head>
\`;`
      }</div>
    </div>
  );
}

// ── When to use SSR ───────────────────────────────────────────────────────────

function WhenToUseSection() {
  return (
    <div className={section}>
      <h2 className={sectionTitle}>SSR Summary — When and Why</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
        {[
          {
            title: 'Next.js / Remix',
            icon: '⚡',
            desc: 'Use tw.extractCSS() in getServerSideProps or loader, embed the result in the HTML head. Prevents FOUC on first load.',
            color: '#eff6ff',
            border: '#bfdbfe',
          },
          {
            title: 'Static Site Generation',
            icon: '📄',
            desc: 'At build time, render all pages, extract CSS per page, write to static files. Zero runtime overhead.',
            color: '#f0fdf4',
            border: '#bbf7d0',
          },
          {
            title: 'Critical CSS',
            icon: '🚀',
            desc: 'Use extractCritical() to inline above-the-fold CSS and defer the rest — improves LCP and CLS scores.',
            color: '#fefce8',
            border: '#fde68a',
          },
          {
            title: 'CSP / Nonce',
            icon: '🔒',
            desc: 'Pass a nonce to extract() — the output style tag will include it for Content Security Policy compliance.',
            color: '#faf5ff',
            border: '#ddd6fe',
          },
        ].map(item => (
          <div key={item.title} style={{ background: item.color, border: `1px solid ${item.border}`, borderRadius: '12px', padding: '14px' }}>
            <p style={{ fontSize: '1.3rem', marginBottom: '6px' }}>{item.icon}</p>
            <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '6px', color: '#111827' }}>{item.title}</p>
            <p style={{ fontSize: '0.8rem', color: '#374151', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Demo ─────────────────────────────────────────────────────────────────

export function SSRDemo() {
  return (
    <div>
      <ExtractCSSSection />
      <SSRCollectorSection />
      <CriticalCSSSection />
      <WhenToUseSection />
    </div>
  );
}
