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
  const [mode, setMode] = useState('styleTag');

  // Simulated SSR output — in a real server environment, createSSRCollector()
  // captures CSS from tw() calls made during renderToString(). Since we're
  // in a browser SPA, we show a representative simulation of the output.
  const simulatedRawCSS = `.tw-flex { display: flex; }
.tw-items-center { align-items: center; }
.tw-gap-4 { gap: 1rem; }
.tw-p-4 { padding: 1rem; }
.tw-bg-white { background-color: rgba(255, 255, 255, 1); }
.tw-rounded-xl { border-radius: 0.75rem; }
.tw-border { border-width: 1px; border-style: solid; }
.tw-shadow-sm { box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05); }
.tw-text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.tw-font-semibold { font-weight: 600; }
.tw-text-gray-900 { color: rgba(17, 24, 39, 1); }
.tw-text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.tw-text-gray-500 { color: rgba(107, 114, 128, 1); }
.tw-px-4 { padding-left: 1rem; padding-right: 1rem; }
.tw-py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.tw-bg-blue-600 { background-color: rgba(37, 99, 235, 1); }
.tw-text-white { color: rgba(255, 255, 255, 1); }
.tw-rounded-lg { border-radius: 0.5rem; }
.tw-hover-bg-blue-700:hover { background-color: rgba(29, 78, 216, 1); }`;

  const simulatedStyleTag = `<style id="tws-ssr" data-tws="">\n${simulatedRawCSS}\n</style>`;

  const output = mode === 'styleTag' ? simulatedStyleTag : simulatedRawCSS;
  const lineCount = output.split('\n').length;
  const sizeKB = (new TextEncoder().encode(output).length / 1024).toFixed(2);

  return (
    <div className={section}>
      <h2 className={sectionTitle}>createSSRCollector() — Fine-grained CSS Collection</h2>
      <p className={label}>
        <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>createSSRCollector(options)</code> dipakai
        di <strong>server</strong> untuk mengumpulkan CSS dari semua <code>tw()</code> calls selama <code>renderToString()</code>.
        Di bawah adalah simulasi output-nya.
      </p>

      {/* Browser context warning */}
      <div style={{ background: '#fefce8', border: '1px solid #fde68a', borderRadius: '8px', padding: '10px 14px', fontSize: '0.8rem', color: '#92400e', marginBottom: '12px' }}>
        <strong>⚠️ Konteks browser:</strong> Di SPA (browser), CSS langsung inject ke DOM — collector tidak menerima data.
        Fitur ini hanya aktif saat render di server (Node.js). Output di bawah adalah <strong>simulasi</strong> apa yang akan dihasilkan.
      </div>

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

      {/* Simulated stats */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
        {[
          { label: 'Rules',  value: simulatedRawCSS.split('\n').length },
          { label: 'Unique', value: simulatedRawCSS.split('\n').length },
          { label: 'Size',   value: `${sizeKB} KB` },
        ].map(s => (
          <div key={s.label} style={{ background: '#f3f4f6', borderRadius: '8px', padding: '8px 14px', textAlign: 'center' }}>
            <p style={{ fontSize: '1rem', fontWeight: 700, color: '#1e40af' }}>{s.value}</p>
            <p style={{ fontSize: '0.7rem', color: '#6b7280' }}>{s.label}</p>
          </div>
        ))}
        <div style={{ alignSelf: 'center', fontSize: '0.72rem', color: '#9ca3af', fontStyle: 'italic' }}>
          (simulated — run on server to get real values)
        </div>
      </div>

      <div style={{ maxHeight: '220px', overflow: 'auto', background: '#1e1e2e', borderRadius: '10px', padding: '14px' }}>
        <pre style={{ fontSize: '0.7rem', color: '#a6e3a1', margin: 0, fontFamily: 'monospace', lineHeight: 1.6 }}>
          {output}
        </pre>
      </div>

      <div className={codeBlock}>{
`import { createSSRCollector } from 'tailwind-to-style';

// 1. Buat collector SEBELUM render
const ssr = createSSRCollector({ dedupe: true, minify: false });

// 2. Render app di server — semua tw() calls ter-capture oleh collector
const html = renderToString(<App />);

// 3. Extract sebagai raw CSS string
const rawCSS = ssr.extractRaw();

// 4. ATAU extract wrapped dalam <style> tag (langsung inject ke <head>)
const styleTag = ssr.extract({ id: 'tws-ssr', nonce: cspNonce });

// 5. Stats
const { ruleCount, uniqueCount, totalSize } = ssr.getStats();

// 6. Embed ke HTML response
const page = \`
  <html>
    <head>\${styleTag}</head>
    <body>\${html}</body>
  </html>
\`;`
      }</div>
    </div>
  );
}

// ── Critical CSS extraction ───────────────────────────────────────────────────

// Simulated critical CSS split — represents what extractCritical() returns on server
const SIMULATED_CRITICAL = `.tw-flex { display: flex; }
.tw-items-center { align-items: center; }
.tw-bg-white { background-color: rgba(255, 255, 255, 1); }
.tw-rounded-xl { border-radius: 0.75rem; }
.tw-p-6 { padding: 1.5rem; }
.tw-text-2xl { font-size: 1.5rem; line-height: 2rem; }
.tw-font-bold { font-weight: 700; }
.tw-text-gray-900 { color: rgba(17, 24, 39, 1); }`;

const SIMULATED_DEFERRED = `.tw-shadow-sm { box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05); }
.tw-border { border-width: 1px; border-style: solid; }
.tw-border-gray-200 { border-color: rgba(229, 231, 235, 1); }
.tw-text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.tw-text-gray-500 { color: rgba(107, 114, 128, 1); }
.tw-px-4 { padding-left: 1rem; padding-right: 1rem; }
.tw-py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.tw-bg-blue-600 { background-color: rgba(37, 99, 235, 1); }
.tw-text-white { color: rgba(255, 255, 255, 1); }
.tw-rounded-lg { border-radius: 0.5rem; }
.tw-hover-bg-blue-700:hover { background-color: rgba(29, 78, 216, 1); }
.tw-transition-colors { transition-property: color, background-color, border-color; }`;

function CriticalCSSSection() {
  return (
    <div className={section}>
      <h2 className={sectionTitle}>extractCritical() — Above-the-fold CSS</h2>
      <p className={label}>
        Split CSS jadi dua bagian: <strong>critical</strong> (above-the-fold, embed inline) dan <strong>deferred</strong> (lazy-load).
        Berguna untuk optimasi LCP dan menghindari FOUC pada first load.
      </p>

      <div style={{ background: '#fefce8', border: '1px solid #fde68a', borderRadius: '8px', padding: '10px 14px', fontSize: '0.8rem', color: '#92400e', marginBottom: '12px' }}>
        <strong>⚠️ Konteks browser:</strong> Output di bawah adalah <strong>simulasi</strong> — di server, CSS akan di-split
        berdasarkan <code>maxSize</code> yang kamu tentukan. CSS terkecil masuk critical, sisanya deferred.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
        <div>
          <p style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, marginBottom: '6px' }}>
            Critical CSS ({SIMULATED_CRITICAL.split('\n').length} rules) — embed inline
          </p>
          <div style={{ maxHeight: '160px', overflow: 'auto', background: '#1e1e2e', borderRadius: '8px', padding: '10px' }}>
            <pre style={{ fontSize: '0.68rem', color: '#a6e3a1', margin: 0, fontFamily: 'monospace', lineHeight: 1.5 }}>
              {SIMULATED_CRITICAL}
            </pre>
          </div>
        </div>
        <div>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600, marginBottom: '6px' }}>
            Deferred CSS ({SIMULATED_DEFERRED.split('\n').length} rules) — lazy-load
          </p>
          <div style={{ maxHeight: '160px', overflow: 'auto', background: '#1e1e2e', borderRadius: '8px', padding: '10px' }}>
            <pre style={{ fontSize: '0.68rem', color: '#cdd6f4', margin: 0, fontFamily: 'monospace', lineHeight: 1.5 }}>
              {SIMULATED_DEFERRED}
            </pre>
          </div>
        </div>
      </div>

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
