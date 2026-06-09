import React, { useState } from 'react';
import { twsxClassName } from 'tailwind-to-style';
import { Input } from '../components/Input';
import { Mail, Lock, Search, Eye, EyeOff, User, Phone, AlertCircle, CheckCircle } from 'lucide-react';

const section = twsxClassName({ name: 'demo-section', _: 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm' });
const sectionTitle = twsxClassName({ name: 'demo-title', _: 'text-xl font-semibold text-gray-900 mb-4' });
const label = twsxClassName({ name: 'demo-label', _: 'text-sm text-gray-500 mb-3 font-medium' });
const divider = twsxClassName({ name: 'demo-divider', _: 'border-t border-gray-100 my-4' });
const grid = twsxClassName({ name: 'demo-grid', _: 'grid grid-cols-1 gap-4 max-w-md' });
const gridTwo = twsxClassName({ name: 'demo-grid-2', _: 'grid grid-cols-2 gap-4 max-w-lg' });

export function InputDemo() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const emailError = email && !email.includes('@') ? 'Please enter a valid email' : '';
  const emailSuccess = email && email.includes('@') ? 'Looks good!' : '';

  return (
    <div>
      {/* Basic */}
      <div className={section}>
        <h2 className={sectionTitle}>Input — Basic</h2>
        <p className={label}>Default inputs with labels and helper text</p>
        <div className={grid}>
          <Input label="Full Name" placeholder="John Doe" />
          <Input label="Email" placeholder="john@example.com" helperText="We'll never share your email." />
          <Input label="Password" type="password" placeholder="••••••••" />
        </div>
      </div>

      {/* States */}
      <div className={section}>
        <h2 className={sectionTitle}>Input — States</h2>
        <p className={label}>Error, success, and disabled states</p>
        <div className={grid}>
          <Input
            label="Email (live validation)"
            placeholder="type something..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            success={emailSuccess}
          />
          <Input label="Error State" value="bad-email" error="This email is already taken" />
          <Input label="Success State" value="available_username" success="Username is available!" />
          <Input label="Disabled" value="Can't edit this" disabled />
        </div>
      </div>

      {/* Sizes */}
      <div className={section}>
        <h2 className={sectionTitle}>Input — Sizes</h2>
        <p className={label}>Small, medium, and large</p>
        <div className={grid}>
          <Input size="sm" label="Small" placeholder="Small input" />
          <Input size="md" label="Medium (default)" placeholder="Medium input" />
          <Input size="lg" label="Large" placeholder="Large input" />
        </div>
      </div>

      {/* With Icons */}
      <div className={section}>
        <h2 className={sectionTitle}>Input — With Icons</h2>
        <p className={label}>Left and right icon slots</p>
        <div className={grid}>
          <Input
            label="Email"
            placeholder="you@example.com"
            leftIcon={<Mail size={16} />}
          />
          <Input
            label="Search"
            placeholder="Search..."
            leftIcon={<Search size={16} />}
          />
          <Input
            label="Phone"
            placeholder="+1 (555) 000-0000"
            leftIcon={<Phone size={16} />}
          />
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock size={16} />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, color: 'inherit', pointerEvents: 'auto' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />
        </div>
      </div>

      {/* Form Pattern */}
      <div className={section}>
        <h2 className={sectionTitle}>Input — Form Pattern</h2>
        <p className={label}>Typical sign-up form layout</p>
        <div style={{ maxWidth: '28rem' }}>
          <div className={gridTwo}>
            <Input label="First Name" placeholder="John" leftIcon={<User size={16} />} />
            <Input label="Last Name" placeholder="Doe" leftIcon={<User size={16} />} />
          </div>
          <div style={{ marginTop: '16px' }} className={grid}>
            <Input label="Email Address" placeholder="john@company.com" leftIcon={<Mail size={16} />} />
            <Input label="Password" type="password" placeholder="Min. 8 characters" leftIcon={<Lock size={16} />} helperText="Must contain uppercase, number, and special character." />
          </div>
        </div>
      </div>
    </div>
  );
}
