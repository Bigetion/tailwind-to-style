import React from 'react';
import { twsxClassName } from 'tailwind-to-style';
import { Breadcrumb } from '../components/Breadcrumb';
import { Badge } from '../components/Badge';
import { Star } from 'lucide-react';

const section = twsxClassName({ name: 'demo-section', _: 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm' });
const sectionTitle = twsxClassName({ name: 'demo-title', _: 'text-xl font-semibold text-gray-900 mb-4' });
const label = twsxClassName({ name: 'demo-label', _: 'text-sm text-gray-500 mb-3 font-medium' });
const stack = twsxClassName({ name: 'demo-stack', _: 'flex flex-col gap-4' });

export function BreadcrumbDemo() {
  return (
    <div>
      {/* Basic */}
      <div className={section}>
        <h2 className={sectionTitle}>Breadcrumb — Basic</h2>
        <p className={label}>Simple path navigation</p>
        <div className={stack}>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'Electronics', href: '/products/electronics' },
              { label: 'Headphones' },
            ]}
          />
          <Breadcrumb
            items={[
              { label: 'Dashboard', href: '/' },
              { label: 'Settings' },
            ]}
          />
          <Breadcrumb
            items={[{ label: 'Home' }]}
          />
        </div>
      </div>

      {/* Separators */}
      <div className={section}>
        <h2 className={sectionTitle}>Breadcrumb — Separators</h2>
        <p className={label}>Chevron, slash, and dot separators</p>
        <div className={stack}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '6px' }}>Chevron (default)</p>
            <Breadcrumb separator="chevron" items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'Article' }]} />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '6px' }}>Slash</p>
            <Breadcrumb separator="slash" items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'Article' }]} />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '6px' }}>Dot</p>
            <Breadcrumb separator="dot" items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'Article' }]} />
          </div>
        </div>
      </div>

      {/* With Home Icon */}
      <div className={section}>
        <h2 className={sectionTitle}>Breadcrumb — With Home Icon</h2>
        <p className={label}>Adds home icon as first item automatically</p>
        <div className={stack}>
          <Breadcrumb
            showHome
            items={[
              { label: 'Settings', href: '/settings' },
              { label: 'Profile' },
            ]}
          />
          <Breadcrumb
            showHome
            separator="slash"
            items={[
              { label: 'Products', href: '/products' },
              { label: 'Electronics', href: '/products/electronics' },
              { label: 'Wireless Headphones Pro' },
            ]}
          />
        </div>
      </div>

      {/* Real-World Patterns */}
      <div className={section}>
        <h2 className={sectionTitle}>Breadcrumb — Real-World Patterns</h2>

        <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px' }}>E-commerce product page</p>
        <div style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px', marginBottom: '16px' }}>
          <Breadcrumb
            showHome
            separator="chevron"
            items={[
              { label: 'Electronics', href: '/electronics' },
              { label: 'Audio', href: '/electronics/audio' },
              { label: 'Headphones', href: '/electronics/audio/headphones' },
              { label: 'Sony WH-1000XM5' },
            ]}
          />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginTop: '12px' }}>Sony WH-1000XM5</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>4.8 (2,341 reviews)</span>
          </div>
        </div>

        <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px' }}>Admin dashboard</p>
        <div style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Breadcrumb
              showHome
              items={[
                { label: 'Users', href: '/admin/users' },
                { label: 'alice@example.com' },
              ]}
            />
            <Badge color="green" dot size="sm">Active</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
