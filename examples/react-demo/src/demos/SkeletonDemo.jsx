import React, { useState, useEffect } from 'react';
import { tw } from 'tailwind-to-style';
import { Skeleton, SkeletonText, SkeletonCard } from '../components/Skeleton';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { RefreshCw } from 'lucide-react';

const section = tw({ name: 'demo-section', _: 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm' });
const sectionTitle = tw({ name: 'demo-title', _: 'text-xl font-semibold text-gray-900 mb-4' });
const label = tw({ name: 'demo-label', _: 'text-sm text-gray-500 mb-3 font-medium' });
const gridTwo = tw({ name: 'demo-grid-2', _: 'grid grid-cols-2 gap-4' });

export function SkeletonDemo() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => setLoaded(false), 3000);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <div>
      {/* Basic Shapes */}
      <div className={section}>
        <h2 className={sectionTitle}>Skeleton — Shapes</h2>
        <p className={label}>Line, circle, and rectangle variants</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '24rem' }}>
          <Skeleton height="16px" />
          <Skeleton height="16px" width="75%" />
          <Skeleton height="16px" width="50%" />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
            <Skeleton shape="circle" width="48px" height="48px" />
            <Skeleton shape="circle" width="40px" height="40px" />
            <Skeleton shape="circle" width="32px" height="32px" />
          </div>
          <Skeleton shape="rect" width="100%" height="120px" />
          <Skeleton shape="rect" width="100%" height="48px" />
        </div>
      </div>

      {/* Card Skeletons */}
      <div className={section}>
        <h2 className={sectionTitle}>Skeleton — Card Patterns</h2>
        <p className={label}>Common loading card layouts</p>
        <div className={gridTwo}>
          <SkeletonCard lines={3} />
          <SkeletonCard avatar lines={2} />
        </div>
      </div>

      {/* Profile Skeleton */}
      <div className={section}>
        <h2 className={sectionTitle}>Skeleton — Profile & List</h2>
        <div style={{ maxWidth: '28rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Profile header */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '16px', background: '#f9fafb', borderRadius: '12px' }}>
            <Skeleton shape="circle" width="64px" height="64px" />
            <div style={{ flex: 1 }}>
              <Skeleton height="18px" width="55%" style={{ marginBottom: '8px' }} />
              <Skeleton height="13px" width="40%" style={{ marginBottom: '6px' }} />
              <Skeleton height="13px" width="70%" />
            </div>
          </div>

          {/* List items */}
          {[1, 2, 3].map(i => (
            <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
              <Skeleton shape="circle" width="36px" height="36px" />
              <div style={{ flex: 1 }}>
                <Skeleton height="13px" width="60%" style={{ marginBottom: '6px' }} />
                <Skeleton height="11px" width="40%" />
              </div>
              <Skeleton shape="rect" width="60px" height="24px" />
            </div>
          ))}
        </div>
      </div>

      {/* Table Skeleton */}
      <div className={section}>
        <h2 className={sectionTitle}>Skeleton — Table</h2>
        <p className={label}>Table loading placeholder</p>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb', display: 'flex', gap: '16px' }}>
            {[120, 180, 100, 80].map((w, i) => (
              <Skeleton key={i} height="12px" width={`${w}px`} />
            ))}
          </div>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ padding: '14px 16px', borderBottom: i < 4 ? '1px solid #f3f4f6' : undefined, display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Skeleton shape="circle" width="28px" height="28px" />
              <Skeleton height="12px" width="120px" />
              <Skeleton height="12px" width="160px" />
              <Skeleton height="12px" width="80px" />
              <Skeleton shape="rect" height="22px" width="60px" />
            </div>
          ))}
        </div>
      </div>

      {/* Loading → Content transition */}
      <div className={section}>
        <h2 className={sectionTitle}>Skeleton → Content Transition</h2>
        <p className={label}>Simulates data loading (auto-resets after 3s)</p>
        <Button size="sm" leftIcon={<RefreshCw size={14} />} onClick={() => setLoaded(false)} style={{ marginBottom: '16px' }}>
          Reload
        </Button>
        <div style={{ maxWidth: '28rem' }}>
          {!loaded ? (
            <SkeletonCard avatar lines={3} />
          ) : (
            <div style={{ padding: '16px', background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Avatar size="md" src="https://i.pravatar.cc/80?img=5" name="Sarah Connor" />
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>Sarah Connor</p>
                  <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Product Designer · 2h ago</p>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.6 }}>
                Just shipped v4 of tailwind-to-style! Runtime Tailwind CSS engine with React bindings, design tokens, and zero build step. 🚀
              </p>
            </div>
          )}
          {!loaded && (
            <Button size="xs" color="ghost" style={{ marginTop: '8px' }} onClick={() => setLoaded(true)}>
              Simulate load complete →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
