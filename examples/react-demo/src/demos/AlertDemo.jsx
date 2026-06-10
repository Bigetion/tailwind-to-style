import React from 'react';
import { tw } from 'tailwind-to-style';
import { Alert } from '../components/Alert';
import { Rocket, Shield, Bell } from 'lucide-react';

const section = tw({ name: 'demo-section', _: 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm' });
const sectionTitle = tw({ name: 'demo-title', _: 'text-xl font-semibold text-gray-900 mb-4' });
const label = tw({ name: 'demo-label', _: 'text-sm text-gray-500 mb-3 font-medium' });
const stack = tw({ name: 'demo-stack', _: 'flex flex-col gap-3' });

export function AlertDemo() {
  return (
    <div>
      {/* Color Variants */}
      <div className={section}>
        <h2 className={sectionTitle}>Alert — Types</h2>
        <p className={label}>Four semantic alert types with matching icons</p>
        <div className={stack}>
          <Alert color="info">
            A new software update is available. Check the changelog for details.
          </Alert>
          <Alert color="success">
            Your payment has been processed successfully.
          </Alert>
          <Alert color="warning">
            Your trial expires in 3 days. Upgrade to keep access.
          </Alert>
          <Alert color="error">
            Failed to save changes. Please check your connection and try again.
          </Alert>
        </div>
      </div>

      {/* With Title */}
      <div className={section}>
        <h2 className={sectionTitle}>Alert — With Title</h2>
        <p className={label}>Title + description for more detailed messages</p>
        <div className={stack}>
          <Alert color="info" title="System Update">
            Version 4.0 is now available. It includes performance improvements and new features.
          </Alert>
          <Alert color="success" title="Order Confirmed">
            Your order #12345 has been confirmed and will ship within 24 hours.
          </Alert>
          <Alert color="warning" title="Storage Almost Full">
            You've used 90% of your storage. Consider upgrading your plan or deleting unused files.
          </Alert>
          <Alert color="error" title="Authentication Failed">
            Your session has expired. Please log in again to continue.
          </Alert>
        </div>
      </div>

      {/* Dismissible */}
      <div className={section}>
        <h2 className={sectionTitle}>Alert — Dismissible</h2>
        <p className={label}>Click the X to dismiss (disappears from DOM)</p>
        <div className={stack}>
          <Alert color="info" title="Tip" dismissible>
            You can customize your dashboard layout in Settings → Appearance.
          </Alert>
          <Alert color="warning" dismissible>
            Your browser is outdated. Some features may not work correctly.
          </Alert>
          <Alert color="success" title="Welcome!" dismissible>
            Thanks for joining! Get started by creating your first project.
          </Alert>
        </div>
      </div>

      {/* Custom Icons */}
      <div className={section}>
        <h2 className={sectionTitle}>Alert — Custom Icons</h2>
        <p className={label}>Override the default icon with any Lucide icon</p>
        <div className={stack}>
          <Alert color="info" icon={Rocket} title="New Feature">
            We just launched dark mode! Try it out in your settings.
          </Alert>
          <Alert color="warning" icon={Shield} title="Security Notice">
            Enable two-factor authentication for better account security.
          </Alert>
          <Alert color="success" icon={Bell} title="Notifications">
            You have 3 new notifications waiting for you.
          </Alert>
        </div>
      </div>
    </div>
  );
}
