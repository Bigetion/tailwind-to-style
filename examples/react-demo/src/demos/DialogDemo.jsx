import React, { useState } from 'react';
import { twsxClassName } from 'tailwind-to-style';
import { Dialog } from '../components/Dialog';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { AlertTriangle, Trash2, Mail } from 'lucide-react';

const section = twsxClassName({ name: 'demo-section', _: 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm' });
const sectionTitle = twsxClassName({ name: 'demo-title', _: 'text-xl font-semibold text-gray-900 mb-4' });
const label = twsxClassName({ name: 'demo-label', _: 'text-sm text-gray-500 mb-3 font-medium' });
const row = twsxClassName({ name: 'demo-row', _: 'flex flex-wrap items-center gap-3' });

export function DialogDemo() {
  const [basic, setBasic] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState(false);
  const [large, setLarge] = useState(false);

  return (
    <div>
      {/* Triggers */}
      <div className={section}>
        <h2 className={sectionTitle}>Dialog — Variants</h2>
        <p className={label}>Click buttons to open different dialog types</p>
        <div className={row}>
          <Button onClick={() => setBasic(true)}>Basic Dialog</Button>
          <Button color="danger" onClick={() => setConfirm(true)} leftIcon={<Trash2 size={16} />}>Confirm Delete</Button>
          <Button color="secondary" onClick={() => setForm(true)} leftIcon={<Mail size={16} />}>Form Dialog</Button>
          <Button color="outline" onClick={() => setLarge(true)}>Large Dialog</Button>
        </div>
      </div>

      {/* Basic Dialog */}
      <Dialog
        open={basic}
        onClose={() => setBasic(false)}
        title="Basic Dialog"
        footer={
          <>
            <Button color="ghost" size="sm" onClick={() => setBasic(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setBasic(false)}>Got it</Button>
          </>
        }
      >
        <p style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: 1.6 }}>
          This is a basic dialog with a title, body content, and footer actions. 
          Click the backdrop, press Escape, or click a button to close.
        </p>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={confirm}
        onClose={() => setConfirm(false)}
        title="Delete Project"
        size="sm"
        footer={
          <>
            <Button color="ghost" size="sm" onClick={() => setConfirm(false)}>Cancel</Button>
            <Button color="danger" size="sm" leftIcon={<Trash2 size={14} />} onClick={() => setConfirm(false)}>Delete</Button>
          </>
        }
      >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AlertTriangle size={20} color="#dc2626" />
          </div>
          <div>
            <p style={{ color: '#111827', fontWeight: 500, fontSize: '0.875rem', marginBottom: '4px' }}>
              Are you sure you want to delete this project?
            </p>
            <p style={{ color: '#6b7280', fontSize: '0.8rem', lineHeight: 1.5 }}>
              This action cannot be undone. All data associated with this project will be permanently removed.
            </p>
          </div>
        </div>
      </Dialog>

      {/* Form Dialog */}
      <Dialog
        open={form}
        onClose={() => setForm(false)}
        title="Invite Team Member"
        footer={
          <>
            <Button color="ghost" size="sm" onClick={() => setForm(false)}>Cancel</Button>
            <Button size="sm" leftIcon={<Mail size={14} />} onClick={() => setForm(false)}>Send Invite</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input label="Email Address" placeholder="colleague@company.com" leftIcon={<Mail size={16} />} />
          <Input label="Role" placeholder="Editor" />
          <p style={{ color: '#6b7280', fontSize: '0.75rem' }}>
            An invitation email will be sent with instructions to join the team.
          </p>
        </div>
      </Dialog>

      {/* Large Dialog */}
      <Dialog
        open={large}
        onClose={() => setLarge(false)}
        title="Terms of Service"
        size="lg"
        footer={
          <>
            <Button color="ghost" size="sm" onClick={() => setLarge(false)}>Decline</Button>
            <Button size="sm" onClick={() => setLarge(false)}>Accept</Button>
          </>
        }
      >
        <div style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: 1.7 }}>
          <p style={{ marginBottom: '12px' }}>
            <strong>1. Acceptance of Terms</strong><br />
            By accessing and using this service, you accept and agree to be bound by the terms and conditions of this agreement.
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>2. Use License</strong><br />
            Permission is granted to temporarily use this service for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>3. Disclaimer</strong><br />
            The materials on this service are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties.
          </p>
          <p>
            <strong>4. Limitations</strong><br />
            In no event shall we be liable for any damages arising out of the use or inability to use the materials on this service.
          </p>
        </div>
      </Dialog>

      {/* Features */}
      <div className={section}>
        <h2 className={sectionTitle}>Dialog — Features</h2>
        <ul style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 2, paddingLeft: '1.5rem', listStyle: 'disc' }}>
          <li>Close on backdrop click</li>
          <li>Close on Escape key</li>
          <li>Body scroll locked when open</li>
          <li>Sizes: sm, md, lg, xl, full</li>
          <li>Slots: overlay, backdrop, content, header, body, footer</li>
          <li>Focus trap ready (add your own implementation)</li>
        </ul>
      </div>
    </div>
  );
}
