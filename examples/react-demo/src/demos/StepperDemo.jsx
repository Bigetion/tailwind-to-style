import React, { useState } from 'react';
import { tw } from 'tailwind-to-style';
import { Stepper } from '../components/Stepper';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { User, CreditCard, CheckCircle } from 'lucide-react';

const section = tw('demo-section', 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm');
const sectionTitle = tw('demo-title', 'text-xl font-semibold text-gray-900 mb-4');
const label = tw('demo-label', 'text-sm text-gray-500 mb-3 font-medium');
const divider = tw('demo-divider', 'border-t border-gray-100 my-4');

const checkoutSteps = [
  { label: 'Account', description: 'Create your account' },
  { label: 'Shipping', description: 'Delivery address' },
  { label: 'Payment', description: 'Payment method' },
  { label: 'Confirm', description: 'Review & place order' },
];

const onboardingSteps = [
  { label: 'Profile', description: 'Basic information' },
  { label: 'Preferences', description: 'Customize experience' },
  { label: 'Team', description: 'Invite members' },
  { label: 'Done', description: 'You\'re all set!' },
];

export function StepperDemo() {
  const [step, setStep] = useState(1);
  const [wizardStep, setWizardStep] = useState(0);

  return (
    <div>
      {/* Horizontal - Basic */}
      <div className={section}>
        <h2 className={sectionTitle}>Stepper — Horizontal</h2>
        <p className={label}>Click buttons to navigate</p>
        <Stepper steps={checkoutSteps} current={step} />
        <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
          <Button size="sm" color="ghost" disabled={step === 0} onClick={() => setStep(s => Math.max(0, s - 1))}>← Back</Button>
          <Button size="sm" disabled={step === checkoutSteps.length} onClick={() => setStep(s => Math.min(checkoutSteps.length, s + 1))}>
            {step >= checkoutSteps.length ? 'Complete' : 'Next →'}
          </Button>
        </div>
      </div>

      {/* Sizes */}
      <div className={section}>
        <h2 className={sectionTitle}>Stepper — Sizes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px' }}>Small</p>
            <Stepper steps={checkoutSteps} current={2} size="sm" />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px' }}>Medium (default)</p>
            <Stepper steps={checkoutSteps} current={2} size="md" />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px' }}>Large</p>
            <Stepper steps={checkoutSteps} current={2} size="lg" />
          </div>
        </div>
      </div>

      {/* Vertical */}
      <div className={section}>
        <h2 className={sectionTitle}>Stepper — Vertical</h2>
        <p className={label}>For sidebar or tall form flows</p>
        <div style={{ maxWidth: '20rem' }}>
          <Stepper steps={onboardingSteps} current={2} orientation="vertical" />
        </div>
      </div>

      {/* Error State */}
      <div className={section}>
        <h2 className={sectionTitle}>Stepper — Error State</h2>
        <p className={label}>Step with validation error</p>
        <Stepper
          current={2}
          steps={[
            { label: 'Account', description: 'Created successfully' },
            { label: 'Shipping', description: 'Address invalid', error: true },
            { label: 'Payment', description: 'Pending' },
            { label: 'Confirm', description: 'Review order' },
          ]}
        />
      </div>

      {/* Real Wizard */}
      <div className={section}>
        <h2 className={sectionTitle}>Stepper — Real Wizard Flow</h2>
        <p className={label}>Multi-step form with content per step</p>
        <Stepper
          steps={[
            { label: 'Personal Info' },
            { label: 'Preferences' },
            { label: 'Finish' },
          ]}
          current={wizardStep}
          style={{ marginBottom: '24px' }}
        />
        <div style={{ padding: '20px', background: '#f9fafb', borderRadius: '10px', minHeight: '160px' }}>
          {wizardStep === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '24rem' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Input label="First Name" placeholder="John" />
                <Input label="Last Name" placeholder="Doe" />
              </div>
              <Input label="Email" placeholder="john@example.com" />
            </div>
          )}
          {wizardStep === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '24rem' }}>
              <Select label="Role" options={[{ value: 'dev', label: 'Developer' }, { value: 'design', label: 'Designer' }, { value: 'pm', label: 'Product Manager' }]} placeholder="Select role..." onChange={() => {}} />
              <Select label="Team Size" options={[{ value: '1', label: 'Just me' }, { value: '2-10', label: '2–10' }, { value: '11+', label: '11+' }]} placeholder="Select size..." onChange={() => {}} />
            </div>
          )}
          {wizardStep === 2 && (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <CheckCircle size={48} color="#059669" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontWeight: 700, fontSize: '1.125rem', color: '#111827' }}>You're all set!</h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '4px' }}>Your account has been configured successfully.</p>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
          <Button size="sm" color="ghost" disabled={wizardStep === 0} onClick={() => setWizardStep(s => s - 1)}>← Back</Button>
          <Button size="sm" onClick={() => setWizardStep(s => Math.min(2, s + 1))}>
            {wizardStep === 2 ? 'Done' : 'Continue →'}
          </Button>
        </div>
      </div>
    </div>
  );
}
