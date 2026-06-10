import React, { useState } from 'react';
import { tw } from 'tailwind-to-style';
import { Checkbox, Radio, RadioGroup } from '../components/Checkbox';
import { Button } from '../components/Button';

const section = tw({ name: 'demo-section', _: 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm' });
const sectionTitle = tw({ name: 'demo-title', _: 'text-xl font-semibold text-gray-900 mb-4' });
const label = tw({ name: 'demo-label', _: 'text-sm text-gray-500 mb-3 font-medium' });
const stack = tw({ name: 'demo-stack', _: 'flex flex-col gap-3' });
const row = tw({ name: 'demo-row', _: 'flex flex-wrap items-center gap-6' });
const divider = tw({ name: 'demo-divider', _: 'border-t border-gray-100 my-4' });

export function CheckboxDemo() {
  const [checked, setChecked] = useState({ a: true, b: false, c: false, d: true });
  const [plan, setPlan] = useState('pro');
  const [features, setFeatures] = useState(['dark', 'notifications']);
  const [agreed, setAgreed] = useState(false);

  const toggleFeature = (val) => {
    setFeatures(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  };

  const allFeatures = ['dark', 'notifications', 'analytics', 'beta'];
  const allChecked = allFeatures.every(f => features.includes(f));
  const someChecked = allFeatures.some(f => features.includes(f)) && !allChecked;

  return (
    <div>
      {/* Basic Checkboxes */}
      <div className={section}>
        <h2 className={sectionTitle}>Checkbox — Basic</h2>
        <p className={label}>Single checkboxes with label and description</p>
        <div className={stack}>
          <Checkbox label="Receive email notifications" checked={checked.a} onChange={e => setChecked(p => ({ ...p, a: e.target.checked }))} />
          <Checkbox label="Enable dark mode" description="Switch the interface to dark theme." checked={checked.b} onChange={e => setChecked(p => ({ ...p, b: e.target.checked }))} />
          <Checkbox label="Share analytics" description="Help improve the product by sharing anonymous usage data." checked={checked.c} onChange={e => setChecked(p => ({ ...p, c: e.target.checked }))} />
          <Checkbox label="Auto-save drafts" checked={checked.d} onChange={e => setChecked(p => ({ ...p, d: e.target.checked }))} />
        </div>
      </div>

      {/* Indeterminate */}
      <div className={section}>
        <h2 className={sectionTitle}>Checkbox — Indeterminate (Select All)</h2>
        <p className={label}>Parent with indeterminate state when partially selected</p>
        <div className={stack}>
          <Checkbox
            label="Select all features"
            checked={allChecked}
            indeterminate={someChecked}
            onChange={() => setFeatures(allChecked ? [] : allFeatures)}
            style={{ fontWeight: 600 }}
          />
          <div style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { value: 'dark', label: 'Dark Mode' },
              { value: 'notifications', label: 'Notifications' },
              { value: 'analytics', label: 'Analytics' },
              { value: 'beta', label: 'Beta Features' },
            ].map(f => (
              <Checkbox key={f.value} label={f.label} checked={features.includes(f.value)} onChange={() => toggleFeature(f.value)} />
            ))}
          </div>
        </div>
      </div>

      {/* States */}
      <div className={section}>
        <h2 className={sectionTitle}>Checkbox — States</h2>
        <div className={row}>
          <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
          <Checkbox label="Checked" checked={true} onChange={() => {}} />
          <Checkbox label="Disabled off" checked={false} onChange={() => {}} disabled />
          <Checkbox label="Disabled on" checked={true} onChange={() => {}} disabled />
          <Checkbox label="Error" checked={false} onChange={() => {}} error="This field is required." />
        </div>
      </div>

      {/* Colors & Sizes */}
      <div className={section}>
        <h2 className={sectionTitle}>Checkbox — Colors & Sizes</h2>
        <p className={label}>Colors</p>
        <div className={row}>
          <Checkbox label="Blue" color="blue" checked={true} onChange={() => {}} />
          <Checkbox label="Green" color="green" checked={true} onChange={() => {}} />
          <Checkbox label="Red" color="red" checked={true} onChange={() => {}} />
          <Checkbox label="Purple" color="purple" checked={true} onChange={() => {}} />
        </div>
        <div className={divider} />
        <p className={label}>Sizes</p>
        <div className={row}>
          <Checkbox label="Small" size="sm" checked={true} onChange={() => {}} />
          <Checkbox label="Medium" size="md" checked={true} onChange={() => {}} />
          <Checkbox label="Large" size="lg" checked={true} onChange={() => {}} />
        </div>
      </div>

      {/* Radio Group */}
      <div className={section}>
        <h2 className={sectionTitle}>Radio — Plan Selection</h2>
        <div style={{ maxWidth: '28rem', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <RadioGroup
            label="Choose your plan"
            name="plan"
            value={plan}
            onChange={setPlan}
            options={[
              { value: 'free', label: 'Free', description: 'Up to 3 projects, 1GB storage.' },
              { value: 'pro', label: 'Pro — $12/mo', description: 'Unlimited projects, 50GB storage, priority support.' },
              { value: 'team', label: 'Team — $49/mo', description: 'Everything in Pro, plus team management and SSO.' },
            ]}
          />
          <RadioGroup
            label="Notification frequency"
            name="notif"
            value="daily"
            onChange={() => {}}
            options={[
              { value: 'realtime', label: 'Real-time' },
              { value: 'daily', label: 'Daily digest' },
              { value: 'weekly', label: 'Weekly summary' },
              { value: 'never', label: 'Never', disabled: true },
            ]}
          />
        </div>
      </div>

      {/* Terms Pattern */}
      <div className={section}>
        <h2 className={sectionTitle}>Checkbox — Terms & Conditions</h2>
        <div style={{ maxWidth: '28rem' }}>
          <Checkbox
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            label="I agree to the Terms of Service and Privacy Policy"
            description="By checking this box, you agree to our terms."
          />
          <div style={{ marginTop: '12px' }}>
            <Button disabled={!agreed} size="sm">Create Account</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
