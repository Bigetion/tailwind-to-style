import React, { useState } from 'react';
import { twsxClassName } from 'tailwind-to-style';
import { ToastContainer, useToast } from '../components/Toast';
import { Button } from '../components/Button';
import { CheckCircle, XCircle, AlertTriangle, Info, Send, Trash2, Download, Bell } from 'lucide-react';

const section = twsxClassName({ name: 'demo-section', _: 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm' });
const sectionTitle = twsxClassName({ name: 'demo-title', _: 'text-xl font-semibold text-gray-900 mb-4' });
const label = twsxClassName({ name: 'demo-label', _: 'text-sm text-gray-500 mb-3 font-medium' });
const row = twsxClassName({ name: 'demo-row', _: 'flex flex-wrap items-center gap-3 mb-4' });
const divider = twsxClassName({ name: 'demo-divider', _: 'border-t border-gray-100 my-4' });

export function ToastDemo() {
  const { toasts, removeToast, success, error, warning, info } = useToast();
  const [position, setPosition] = useState('top-right');

  return (
    <div>
      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} position={position} />

      {/* Basic Types */}
      <div className={section}>
        <h2 className={sectionTitle}>Toast — Types</h2>
        <p className={label}>Click to trigger different toast types (auto-dismiss in 4s)</p>
        <div className={row}>
          <Button color="success" size="sm" leftIcon={<CheckCircle size={14} />} onClick={() => success('Success', 'Your changes have been saved.')}>
            Success
          </Button>
          <Button color="danger" size="sm" leftIcon={<XCircle size={14} />} onClick={() => error('Error', 'Something went wrong. Try again.')}>
            Error
          </Button>
          <Button color="secondary" size="sm" leftIcon={<AlertTriangle size={14} />} onClick={() => warning('Warning', 'Your session expires in 5 minutes.')}>
            Warning
          </Button>
          <Button color="outline" size="sm" leftIcon={<Info size={14} />} onClick={() => info('Info', 'A new version is available.')}>
            Info
          </Button>
        </div>
      </div>

      {/* Real-World Triggers */}
      <div className={section}>
        <h2 className={sectionTitle}>Toast — Real-World Scenarios</h2>
        <p className={label}>Common actions that trigger notifications</p>
        <div className={row}>
          <Button size="sm" leftIcon={<Send size={14} />} onClick={() => success('Message Sent', 'Your message has been delivered.')}>
            Send Message
          </Button>
          <Button size="sm" color="danger" leftIcon={<Trash2 size={14} />} onClick={() => error('Deleted', 'Item moved to trash.')}>
            Delete Item
          </Button>
          <Button size="sm" color="secondary" leftIcon={<Download size={14} />} onClick={() => info('Download Started', 'report-2026.pdf is downloading...')}>
            Download
          </Button>
          <Button size="sm" color="ghost" leftIcon={<Bell size={14} />} onClick={() => warning('Reminder', 'Meeting starts in 10 minutes.')}>
            Reminder
          </Button>
        </div>
      </div>

      {/* Position */}
      <div className={section}>
        <h2 className={sectionTitle}>Toast — Position</h2>
        <p className={label}>Change where toasts appear on screen</p>
        <div className={row}>
          {['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center'].map(pos => (
            <Button
              key={pos}
              size="xs"
              color={position === pos ? 'primary' : 'ghost'}
              onClick={() => { setPosition(pos); info(pos, 'Toast position changed'); }}
            >
              {pos}
            </Button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className={section}>
        <h2 className={sectionTitle}>Toast — Features</h2>
        <ul style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 2, paddingLeft: '1.5rem', listStyle: 'disc' }}>
          <li>Auto-dismiss after configurable duration (default 4s)</li>
          <li>Manual dismiss via close button</li>
          <li>6 position options</li>
          <li>Fade + slide entrance/exit animation</li>
          <li>useToast() hook for easy state management</li>
          <li>Stacks multiple toasts vertically</li>
        </ul>
      </div>
    </div>
  );
}
