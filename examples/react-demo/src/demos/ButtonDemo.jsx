import React, { useState } from 'react';
import { twsxClassName } from 'tailwind-to-style';
import { Button } from '../components/Button';
import {
  Plus, Trash2, Download, Send, Heart, Star,
  ChevronLeft, ChevronRight, Settings, LogOut,
  Save, Edit, Copy, Share2, Mail, Phone
} from 'lucide-react';

const section = twsxClassName({ name: 'demo-section', _: 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm' });
const sectionTitle = twsxClassName({ name: 'demo-title', _: 'text-xl font-semibold text-gray-900 mb-4' });
const row = twsxClassName({ name: 'demo-row', _: 'flex flex-wrap items-center gap-3 mb-4' });
const label = twsxClassName({ name: 'demo-label', _: 'text-sm text-gray-500 mb-2 font-medium' });
const divider = twsxClassName({ name: 'demo-divider', _: 'border-t border-gray-100 my-4' });

export function ButtonDemo() {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div>
      {/* Color Variants */}
      <div className={section}>
        <h2 className={sectionTitle}>Button — Color Variants</h2>
        <p className={label}>All available color options with hover states</p>
        <div className={row}>
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="danger">Danger</Button>
          <Button color="success">Success</Button>
          <Button color="ghost">Ghost</Button>
          <Button color="outline">Outline</Button>
        </div>
      </div>

      {/* With Icons */}
      <div className={section}>
        <h2 className={sectionTitle}>Button — With Icons</h2>
        <p className={label}>Left icon, right icon, and icon-only buttons</p>
        <div className={row}>
          <Button leftIcon={<Plus size={16} />}>Create New</Button>
          <Button color="danger" leftIcon={<Trash2 size={16} />}>Delete</Button>
          <Button color="success" leftIcon={<Download size={16} />}>Download</Button>
          <Button color="outline" rightIcon={<Send size={16} />}>Send</Button>
          <Button color="secondary" rightIcon={<ChevronRight size={16} />}>Next</Button>
        </div>
        <div className={divider} />
        <p className={label}>Icon-only buttons (square)</p>
        <div className={row}>
          <Button size="sm" leftIcon={<Heart size={16} />} />
          <Button size="sm" color="secondary" leftIcon={<Star size={16} />} />
          <Button size="sm" color="ghost" leftIcon={<Settings size={16} />} />
          <Button size="sm" color="danger" leftIcon={<Trash2 size={16} />} />
          <Button size="md" leftIcon={<Edit size={18} />} />
          <Button size="md" color="outline" leftIcon={<Copy size={18} />} />
          <Button size="lg" color="success" leftIcon={<Share2 size={20} />} />
        </div>
      </div>

      {/* Sizes */}
      <div className={section}>
        <h2 className={sectionTitle}>Button — Sizes</h2>
        <p className={label}>From xs to xl with icons</p>
        <div className={row}>
          <Button size="xs" leftIcon={<Mail size={12} />}>XS</Button>
          <Button size="sm" leftIcon={<Mail size={14} />}>Small</Button>
          <Button size="md" leftIcon={<Mail size={16} />}>Medium</Button>
          <Button size="lg" leftIcon={<Mail size={18} />}>Large</Button>
          <Button size="xl" leftIcon={<Mail size={20} />}>Extra Large</Button>
        </div>
      </div>

      {/* States */}
      <div className={section}>
        <h2 className={sectionTitle}>Button — States</h2>
        <p className={label}>Disabled and loading</p>
        <div className={row}>
          <Button disabled leftIcon={<Plus size={16} />}>Disabled</Button>
          <Button color="danger" disabled leftIcon={<Trash2 size={16} />}>Can't Delete</Button>
          <Button color="outline" disabled>Unavailable</Button>
        </div>
        <div className={divider} />
        <p className={label}>Loading — click to trigger</p>
        <div className={row}>
          <Button loading={loading} onClick={handleLoadingClick} leftIcon={<Save size={16} />}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button color="success" loading leftIcon={<Download size={16} />}>Downloading...</Button>
          <Button color="danger" loading>Deleting...</Button>
        </div>
      </div>

      {/* Interactive */}
      <div className={section}>
        <h2 className={sectionTitle}>Button — Interactive</h2>
        <p className={label}>Click counter — verify hover/active/focus work</p>
        <div className={row}>
          <Button onClick={() => setCount(c => c + 1)} leftIcon={<Plus size={16} />}>
            Count: {count}
          </Button>
          <Button color="secondary" size="sm" onClick={() => setCount(0)}>Reset</Button>
        </div>
        <p className={label} style={{ marginTop: '8px' }}>Try: hover (opacity), click (scale down), tab (focus ring)</p>
      </div>

      {/* Full Width */}
      <div className={section}>
        <h2 className={sectionTitle}>Button — Full Width</h2>
        <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Button fullWidth leftIcon={<Mail size={16} />}>Subscribe to Newsletter</Button>
          <Button fullWidth color="secondary" leftIcon={<Phone size={16} />}>Contact Support</Button>
          <Button fullWidth color="outline" leftIcon={<LogOut size={16} />}>Sign Out</Button>
        </div>
      </div>

      {/* Compound Variants */}
      <div className={section}>
        <h2 className={sectionTitle}>Button — Compound Variants</h2>
        <p className={label}>Large primary/danger → elevated shadow</p>
        <div className={row}>
          <Button color="primary" size="lg" leftIcon={<Send size={18} />}>Send Message</Button>
          <Button color="danger" size="lg" leftIcon={<Trash2 size={18} />}>Delete Account</Button>
          <Button color="success" size="lg" leftIcon={<Download size={18} />}>Download (no extra)</Button>
        </div>
      </div>

      {/* Action Bar Patterns */}
      <div className={section}>
        <h2 className={sectionTitle}>Button — Common Patterns</h2>
        <p className={label}>Dialog footer</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
          <Button color="ghost" size="sm">Cancel</Button>
          <Button color="secondary" size="sm" leftIcon={<Save size={14} />}>Save Draft</Button>
          <Button size="sm" leftIcon={<Send size={14} />}>Publish</Button>
        </div>
        <div className={divider} />
        <p className={label}>Pagination</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Button color="ghost" size="sm" leftIcon={<ChevronLeft size={16} />}>Prev</Button>
          <Button color="ghost" size="sm">1</Button>
          <Button color="primary" size="sm">2</Button>
          <Button color="ghost" size="sm">3</Button>
          <Button color="ghost" size="sm">...</Button>
          <Button color="ghost" size="sm">10</Button>
          <Button color="ghost" size="sm" rightIcon={<ChevronRight size={16} />}>Next</Button>
        </div>
      </div>
    </div>
  );
}
