import React, { useState } from 'react';
import { twsxClassName } from 'tailwind-to-style';
import { Toggle } from '../components/Toggle';

const section = twsxClassName({ name: 'demo-section', _: 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm' });
const sectionTitle = twsxClassName({ name: 'demo-title', _: 'text-xl font-semibold text-gray-900 mb-4' });
const label = twsxClassName({ name: 'demo-label', _: 'text-sm text-gray-500 mb-3 font-medium' });
const stack = twsxClassName({ name: 'demo-stack', _: 'flex flex-col gap-4' });
const row = twsxClassName({ name: 'demo-row', _: 'flex flex-wrap items-center gap-6 mb-4' });

export function ToggleDemo() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div>
      {/* Basic */}
      <div className={section}>
        <h2 className={sectionTitle}>Toggle — Basic</h2>
        <p className={label}>Click to toggle on/off</p>
        <div className={stack}>
          <Toggle
            checked={notifications}
            onChange={setNotifications}
            label="Notifications"
          />
          <Toggle
            checked={darkMode}
            onChange={setDarkMode}
            label="Dark Mode"
          />
          <Toggle
            checked={marketing}
            onChange={setMarketing}
            label="Marketing emails"
          />
        </div>
      </div>

      {/* With Description */}
      <div className={section}>
        <h2 className={sectionTitle}>Toggle — With Description</h2>
        <p className={label}>Label + helper text for context</p>
        <div className={stack}>
          <Toggle
            checked={autoSave}
            onChange={setAutoSave}
            label="Auto-save"
            description="Automatically save changes every 30 seconds"
          />
          <Toggle
            checked={notifications}
            onChange={setNotifications}
            label="Push notifications"
            description="Receive push notifications on your device"
          />
          <Toggle
            checked={false}
            onChange={() => {}}
            label="Two-factor authentication"
            description="Add an extra layer of security to your account"
            disabled
          />
        </div>
      </div>

      {/* Sizes */}
      <div className={section}>
        <h2 className={sectionTitle}>Toggle — Sizes</h2>
        <div className={row}>
          <Toggle size="sm" checked={true} onChange={() => {}} label="Small" />
          <Toggle size="md" checked={true} onChange={() => {}} label="Medium" />
          <Toggle size="lg" checked={true} onChange={() => {}} label="Large" />
        </div>
      </div>

      {/* Colors */}
      <div className={section}>
        <h2 className={sectionTitle}>Toggle — Colors</h2>
        <p className={label}>Custom track color when checked</p>
        <div className={row}>
          <Toggle color="blue" checked={true} onChange={() => {}} label="Blue" />
          <Toggle color="green" checked={true} onChange={() => {}} label="Green" />
          <Toggle color="red" checked={true} onChange={() => {}} label="Red" />
          <Toggle color="purple" checked={true} onChange={() => {}} label="Purple" />
          <Toggle color="amber" checked={true} onChange={() => {}} label="Amber" />
        </div>
      </div>

      {/* Disabled */}
      <div className={section}>
        <h2 className={sectionTitle}>Toggle — Disabled</h2>
        <div className={row}>
          <Toggle checked={false} onChange={() => {}} label="Off (disabled)" disabled />
          <Toggle checked={true} onChange={() => {}} label="On (disabled)" disabled />
        </div>
      </div>

      {/* Settings Pattern */}
      <div className={section}>
        <h2 className={sectionTitle}>Toggle — Settings Pattern</h2>
        <p className={label}>Typical settings page layout</p>
        <div style={{ maxWidth: '28rem', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          {[
            { label: 'Email notifications', desc: 'Get notified about account activity', state: notifications, setter: setNotifications },
            { label: 'Auto-save drafts', desc: 'Save drafts every 30 seconds', state: autoSave, setter: setAutoSave },
            { label: 'Dark mode', desc: 'Use dark theme across the app', state: darkMode, setter: setDarkMode },
            { label: 'Marketing emails', desc: 'Receive product updates and tips', state: marketing, setter: setMarketing },
          ].map((item, i) => (
            <div
              key={item.label}
              style={{
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: i > 0 ? '1px solid #f3f4f6' : undefined,
              }}
            >
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#111827' }}>{item.label}</p>
                <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>{item.desc}</p>
              </div>
              <Toggle checked={item.state} onChange={item.setter} size="sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
