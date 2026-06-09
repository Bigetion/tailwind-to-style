import React from 'react';
import { twsxClassName } from 'tailwind-to-style';
import { Tabs } from '../components/Tabs';
import { Input } from '../components/Input';
import { User, Lock, Bell, CreditCard, Settings, Mail } from 'lucide-react';

const section = twsxClassName({ name: 'demo-section', _: 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm' });
const sectionTitle = twsxClassName({ name: 'demo-title', _: 'text-xl font-semibold text-gray-900 mb-4' });
const label = twsxClassName({ name: 'demo-label', _: 'text-sm text-gray-500 mb-3 font-medium' });

export function TabsDemo() {
  return (
    <div>
      {/* Underline (default) */}
      <div className={section}>
        <h2 className={sectionTitle}>Tabs — Underline (default)</h2>
        <p className={label}>Classic tab navigation with bottom border indicator</p>
        <Tabs
          items={[
            {
              label: 'Account',
              icon: <User size={14} />,
              content: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '24rem' }}>
                  <Input label="Full Name" placeholder="John Doe" />
                  <Input label="Email" placeholder="john@example.com" leftIcon={<Mail size={16} />} />
                </div>
              ),
            },
            {
              label: 'Security',
              icon: <Lock size={14} />,
              content: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '24rem' }}>
                  <Input label="Current Password" type="password" />
                  <Input label="New Password" type="password" />
                </div>
              ),
            },
            {
              label: 'Notifications',
              icon: <Bell size={14} />,
              count: 3,
              content: (
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Configure how and when you receive notifications.
                </p>
              ),
            },
          ]}
        />
      </div>

      {/* Pills */}
      <div className={section}>
        <h2 className={sectionTitle}>Tabs — Pills</h2>
        <p className={label}>Rounded pill-style tabs with background toggle</p>
        <Tabs
          variant="pills"
          items={[
            {
              label: 'Overview',
              content: (
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Dashboard overview with key metrics and recent activity.
                </p>
              ),
            },
            {
              label: 'Analytics',
              count: 12,
              content: (
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Detailed analytics with charts, graphs, and export options.
                </p>
              ),
            },
            {
              label: 'Reports',
              content: (
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Generated reports and scheduled report configurations.
                </p>
              ),
            },
            {
              label: 'Settings',
              content: (
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Manage dashboard preferences and data sources.
                </p>
              ),
            },
          ]}
        />
      </div>

      {/* Enclosed */}
      <div className={section}>
        <h2 className={sectionTitle}>Tabs — Enclosed</h2>
        <p className={label}>Card-style enclosed tabs (browser-tab look)</p>
        <Tabs
          variant="enclosed"
          items={[
            {
              label: 'Profile',
              icon: <User size={14} />,
              content: (
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Your public profile information visible to other users.
                </p>
              ),
            },
            {
              label: 'Billing',
              icon: <CreditCard size={14} />,
              content: (
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Manage your subscription, payment methods, and invoices.
                </p>
              ),
            },
            {
              label: 'Preferences',
              icon: <Settings size={14} />,
              content: (
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Language, timezone, and display preferences.
                </p>
              ),
            },
          ]}
        />
      </div>

      {/* With Counts */}
      <div className={section}>
        <h2 className={sectionTitle}>Tabs — With Badge Counts</h2>
        <p className={label}>Tabs can show notification counts</p>
        <Tabs
          items={[
            { label: 'All', count: 48, content: <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>All items listed here.</p> },
            { label: 'Active', count: 32, content: <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Active items only.</p> },
            { label: 'Draft', count: 12, content: <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Draft items pending review.</p> },
            { label: 'Archived', count: 4, content: <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Archived items.</p> },
          ]}
        />
      </div>
    </div>
  );
}
