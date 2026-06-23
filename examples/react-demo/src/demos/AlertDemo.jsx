import React from 'react';
import { tw } from 'tailwind-to-style';
import { Alert } from '../components/Alert';
import { Rocket, Shield, Bell, ArrowRight } from 'lucide-react';

const section = tw('demo-section', 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm');
const sectionTitle = tw('demo-title', 'text-xl font-semibold text-gray-900 mb-4');
const label = tw('demo-label', 'text-sm text-gray-500 mb-3 font-medium');
const stack = tw('demo-stack', 'flex flex-col gap-3');

export function AlertDemo() {
  return (
    <div>
      {/* Color Variants */}
      <div className={section}>
        <h2 className={sectionTitle}>Alert — Types</h2>
        <p className={label}>Four semantic alert types with matching icons</p>
        <div className={stack}>
          <Alert color="info" density="compact">
            A new software update is available. Check the changelog for details.
          </Alert>
          <Alert color="success" density="compact">
            Your payment has been processed successfully.
          </Alert>
          <Alert color="warning" density="compact">
            Your trial expires in 3 days. Upgrade to keep access.
          </Alert>
          <Alert color="error" density="compact">
            Failed to save changes. Please check your connection and try again.
          </Alert>
        </div>
      </div>

      {/* With Title */}
      <div className={section}>
        <h2 className={sectionTitle}>Alert — With Title</h2>
        <p className={label}>Title + description for more detailed messages</p>
        <div className={stack}>
          <Alert color="info" title="System Update" elevated>
            Version 4.0 is now available. It includes performance improvements and new features.
          </Alert>
          <Alert color="success" title="Order Confirmed" elevated>
            Your order #12345 has been confirmed and will ship within 24 hours.
          </Alert>
          <Alert color="warning" title="Storage Almost Full" elevated>
            You've used 90% of your storage. Consider upgrading your plan or deleting unused files.
          </Alert>
          <Alert color="error" title="Authentication Failed" elevated>
            Your session has expired. Please log in again to continue.
          </Alert>
        </div>
      </div>

      {/* Dismissible */}
      <div className={section}>
        <h2 className={sectionTitle}>Alert — Dismissible</h2>
        <p className={label}>Click the X to dismiss (disappears from DOM)</p>
        <div className={stack}>
          <Alert
            color="info"
            title="Tip"
            dismissible
            actions={
              <button type="button" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#dbeafe', color: '#1d4ed8', border: 'none', borderRadius: '999px', padding: '6px 10px', fontSize: '0.78rem', cursor: 'pointer' }}>
                Learn more <ArrowRight size={14} />
              </button>
            }
          >
            You can customize your dashboard layout in Settings → Appearance.
          </Alert>
          <Alert color="warning" dismissible density="compact">
            Your browser is outdated. Some features may not work correctly.
          </Alert>
          <Alert
            color="success"
            title="Welcome!"
            dismissible
            icon={<Bell size={18} color="#059669" />}
          >
            Thanks for joining! Get started by creating your first project.
          </Alert>
        </div>
      </div>

      {/* Custom Icons */}
      <div className={section}>
        <h2 className={sectionTitle}>Alert — Custom Icons</h2>
        <p className={label}>Override the default icon with any Lucide icon or a React element</p>
        <div className={stack}>
          <Alert color="info" icon={Rocket} title="New Feature" elevated>
            We just launched dark mode! Try it out in your settings.
          </Alert>
          <Alert color="warning" icon={Shield} title="Security Notice" elevated>
            Enable two-factor authentication for better account security.
          </Alert>
          <Alert color="success" icon={<Bell size={18} color="#059669" />} title="Notifications" elevated>
            You have 3 new notifications waiting for you.
          </Alert>
        </div>
      </div>
    </div>
  );
}
