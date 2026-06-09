import React, { useState } from 'react';
import { tw } from 'tailwind-to-style';
import { Spinner, SpinnerOverlay } from '../components/Spinner';
import { Button } from '../components/Button';

const section = tw({ name: 'demo-section', _: 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm' });
const sectionTitle = tw({ name: 'demo-title', _: 'text-xl font-semibold text-gray-900 mb-4' });
const label = tw({ name: 'demo-label', _: 'text-sm text-gray-500 mb-3 font-medium' });
const row = tw({ name: 'demo-row', _: 'flex flex-wrap items-center gap-6 mb-4' });
const divider = tw({ name: 'demo-divider', _: 'border-t border-gray-100 my-4' });

export function SpinnerDemo() {
  const [loading, setLoading] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  return (
    <div>
      {/* Sizes */}
      <div className={section}>
        <h2 className={sectionTitle}>Spinner — Sizes</h2>
        <p className={label}>From xs to xl</p>
        <div className={row}>
          <Spinner size="xs" />
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner size="xl" />
        </div>
        <div className={row}>
          <Spinner size="xs" label="XS" />
          <Spinner size="sm" label="Small" />
          <Spinner size="md" label="Medium" />
          <Spinner size="lg" label="Large" />
        </div>
      </div>

      {/* Colors */}
      <div className={section}>
        <h2 className={sectionTitle}>Spinner — Colors</h2>
        <div className={row}>
          <Spinner color="blue" label="Blue" />
          <Spinner color="green" label="Green" />
          <Spinner color="red" label="Red" />
          <Spinner color="purple" label="Purple" />
          <Spinner color="gray" label="Gray" />
        </div>
        <div className={divider} />
        <p className={label}>On colored backgrounds</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { bg: '#2563eb', color: 'white', label: 'Processing...' },
            { bg: '#059669', color: 'white', label: 'Saving...' },
            { bg: '#dc2626', color: 'white', label: 'Deleting...' },
            { bg: '#7c3aed', color: 'white', label: 'Loading...' },
          ].map(item => (
            <div
              key={item.bg}
              style={{ padding: '10px 16px', borderRadius: '8px', background: item.bg, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Spinner color="white" size="sm" />
              <span style={{ fontSize: '0.875rem', color: 'white', fontWeight: 500 }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Button Loading State */}
      <div className={section}>
        <h2 className={sectionTitle}>Spinner — In Buttons</h2>
        <p className={label}>Inline spinner in button loading states</p>
        <div className={row}>
          <Button
            loading={loading}
            onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2500); }}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button color="secondary" loading={loading}>
            {loading ? 'Processing...' : 'Submit'}
          </Button>
          <Button color="danger" loading={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>

      {/* Container Overlay */}
      <div className={section}>
        <h2 className={sectionTitle}>Spinner — Container Overlay</h2>
        <p className={label}>Spinner overlay on a content container</p>
        <div style={{ position: 'relative', padding: '24px', border: '1px solid #e5e7eb', borderRadius: '12px', minHeight: '140px' }}>
          {overlayVisible && <SpinnerOverlay label="Loading data..." />}
          <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Sales Report Q2 2026</h3>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Revenue: $1,234,567</p>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Orders: 8,432</p>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Conversion: 3.8%</p>
          <Button
            size="sm"
            color="outline"
            style={{ marginTop: '12px' }}
            onClick={() => {
              setOverlayVisible(true);
              setTimeout(() => setOverlayVisible(false), 2000);
            }}
          >
            Refresh Data
          </Button>
        </div>
      </div>
    </div>
  );
}
