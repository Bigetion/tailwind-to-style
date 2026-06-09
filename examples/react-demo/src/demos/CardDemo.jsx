import React from 'react';
import { twsxClassName } from 'tailwind-to-style';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { MoreHorizontal, ExternalLink, Heart, MessageCircle, Share2, User, Calendar, MapPin } from 'lucide-react';

const section = twsxClassName({ name: 'demo-section', _: 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm' });
const sectionTitle = twsxClassName({ name: 'demo-title', _: 'text-xl font-semibold text-gray-900 mb-4' });
const label = twsxClassName({ name: 'demo-label', _: 'text-sm text-gray-500 mb-3 font-medium' });
const grid = twsxClassName({ name: 'demo-grid-3', _: 'grid grid-cols-1 gap-6' });
const gridTwo = twsxClassName({ name: 'demo-grid-2col', _: 'grid grid-cols-2 gap-6' });

export function CardDemo() {
  return (
    <div>
      {/* Basic Cards */}
      <div className={section}>
        <h2 className={sectionTitle}>Card — Basic</h2>
        <p className={label}>Simple cards with title, description, body, and footer</p>
        <div className={grid} style={{ maxWidth: '28rem' }}>
          <Card title="Card Title" description="A short description of this card">
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              This is the card body content. It can contain any React elements.
            </p>
          </Card>

          <Card
            title="With Footer"
            description="Card with action buttons in footer"
            footer={
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <Button color="ghost" size="sm">Cancel</Button>
                <Button size="sm">Save</Button>
              </div>
            }
          >
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Footer is perfect for action buttons, pagination, or metadata.
            </p>
          </Card>
        </div>
      </div>

      {/* Header Actions */}
      <div className={section}>
        <h2 className={sectionTitle}>Card — Header Actions</h2>
        <p className={label}>Cards with action buttons in the header</p>
        <div className={grid} style={{ maxWidth: '28rem' }}>
          <Card
            title="Team Members"
            description="Manage your team"
            headerAction={<Button size="xs" color="outline" leftIcon={<ExternalLink size={12} />}>View All</Button>}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Alice Johnson', 'Bob Smith', 'Carol White'].map(name => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={14} color="#6b7280" />
                  </div>
                  <span style={{ fontSize: '0.875rem', color: '#374151' }}>{name}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card
            title="Settings"
            headerAction={<Button size="xs" color="ghost" leftIcon={<MoreHorizontal size={16} />} />}
          >
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Header actions are useful for secondary controls like menus or links.
            </p>
          </Card>
        </div>
      </div>

      {/* Card Grid */}
      <div className={section}>
        <h2 className={sectionTitle}>Card — Grid Layout</h2>
        <p className={label}>Cards in a responsive grid</p>
        <div className={gridTwo}>
          {[
            { title: 'Revenue', value: '$45,231', change: '+20.1%', color: '#10b981' },
            { title: 'Users', value: '2,338', change: '+10.5%', color: '#3b82f6' },
            { title: 'Orders', value: '1,432', change: '-3.2%', color: '#ef4444' },
            { title: 'Conversion', value: '3.6%', change: '+4.1%', color: '#8b5cf6' },
          ].map(stat => (
            <Card key={stat.title} title={stat.title}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>{stat.value}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 500, color: stat.color }}>{stat.change}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Card with Form */}
      <div className={section}>
        <h2 className={sectionTitle}>Card — Form Pattern</h2>
        <p className={label}>Card as form container</p>
        <div style={{ maxWidth: '28rem' }}>
          <Card
            title="Create Event"
            description="Fill in the details below"
            footer={
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <Button color="ghost" size="sm">Cancel</Button>
                <Button size="sm" leftIcon={<Calendar size={14} />}>Create Event</Button>
              </div>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Input label="Event Name" placeholder="Team standup" />
              <Input label="Location" placeholder="Conference Room A" leftIcon={<MapPin size={16} />} />
              <Input label="Date" type="date" leftIcon={<Calendar size={16} />} />
            </div>
          </Card>
        </div>
      </div>

      {/* Social Card */}
      <div className={section}>
        <h2 className={sectionTitle}>Card — Social Pattern</h2>
        <p className={label}>Card used as a social media post</p>
        <div style={{ maxWidth: '28rem' }}>
          <Card noPadding>
            <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={18} color="#3b82f6" />
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#111827' }}>Sarah Connor</p>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>2 hours ago</p>
              </div>
            </div>
            <div style={{ padding: '0 24px 16px' }}>
              <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.6 }}>
                Just shipped v4 of tailwind-to-style! Zero-build runtime Tailwind CSS engine with variants, slots, and React bindings. Check it out 🚀
              </p>
            </div>
            <div style={{ padding: '12px 24px', borderTop: '1px solid #f3f4f6', display: 'flex', gap: '16px' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer' }}>
                <Heart size={14} /> 24
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer' }}>
                <MessageCircle size={14} /> 8
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer' }}>
                <Share2 size={14} /> Share
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
