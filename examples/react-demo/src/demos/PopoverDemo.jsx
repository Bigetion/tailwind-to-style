import React, { useState } from 'react';
import { tw } from 'tailwind-to-style';
import { Popover, PopoverHeader, PopoverBody, PopoverFooter } from '../components/Popover';
import { Button } from '../components/Button';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Toggle } from '../components/Toggle';
import {
  Info, Bell, Settings, LogOut, User, ChevronDown,
  Star, HelpCircle, ExternalLink, Copy
} from 'lucide-react';

const section = tw({ name: 'demo-section', _: 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm' });
const sectionTitle = tw({ name: 'demo-title', _: 'text-xl font-semibold text-gray-900 mb-4' });
const label = tw({ name: 'demo-label', _: 'text-sm text-gray-500 mb-4 font-medium' });
const row = tw({ name: 'demo-row', _: 'flex flex-wrap items-start gap-6' });

export function PopoverDemo() {
  const [notifs, setNotifs] = useState(true);

  return (
    <div>
      {/* Basic */}
      <div className={section}>
        <h2 className={sectionTitle}>Popover — Basic</h2>
        <p className={label}>Click trigger to open, click outside or press Escape to close</p>
        <div className={row}>
          <Popover
            trigger={<Button rightIcon={<ChevronDown size={14} />}>Info</Button>}
            position="bottom-start"
          >
            <PopoverBody>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Info size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                <p style={{ fontSize: '0.8rem', color: '#4b5563', lineHeight: 1.5 }}>
                  This is a popover with rich content. Unlike tooltips, popovers support interactive elements inside.
                </p>
              </div>
            </PopoverBody>
          </Popover>

          <Popover
            trigger={<Button color="outline" leftIcon={<HelpCircle size={16} />}>Help</Button>}
            position="bottom-start"
            width="260px"
          >
            <PopoverHeader>Getting Started</PopoverHeader>
            <PopoverBody>
              <p style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.6 }}>
                Welcome! Here are a few things to help you get started with the platform.
              </p>
            </PopoverBody>
            <PopoverFooter>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button size="xs" color="ghost" rightIcon={<ExternalLink size={11} />}>Docs</Button>
                <Button size="xs">Start Tour</Button>
              </div>
            </PopoverFooter>
          </Popover>
        </div>
      </div>

      {/* User Profile Popover */}
      <div className={section}>
        <h2 className={sectionTitle}>Popover — User Profile</h2>
        <div className={row}>
          <Popover
            trigger={
              <button
                type="button"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: '1px solid #e5e7eb', borderRadius: '9999px', padding: '4px 12px 4px 4px', cursor: 'pointer' }}
              >
                <Avatar size="sm" src="https://i.pravatar.cc/40?img=5" name="Sarah Connor" />
                <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>Sarah</span>
                <ChevronDown size={14} color="#9ca3af" />
              </button>
            }
            position="bottom-end"
            width="220px"
          >
            <PopoverBody>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                <Avatar size="md" src="https://i.pravatar.cc/80?img=5" name="Sarah Connor" />
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#111827' }}>Sarah Connor</p>
                  <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>sarah@acme.com</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                {[
                  { icon: <User size={14} />, label: 'Profile' },
                  { icon: <Settings size={14} />, label: 'Settings' },
                  { icon: <Bell size={14} />, label: 'Notifications' },
                ].map(item => (
                  <button
                    key={item.label}
                    type="button"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 6px', borderRadius: '6px', width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: '#374151' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    <span style={{ color: '#9ca3af' }}>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </PopoverBody>
            <PopoverFooter>
              <button
                type="button"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px', width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: '#dc2626', borderRadius: '6px' }}
                onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </PopoverFooter>
          </Popover>
        </div>
      </div>

      {/* Notification Popover */}
      <div className={section}>
        <h2 className={sectionTitle}>Popover — Notifications</h2>
        <div className={row}>
          <Popover
            trigger={
              <button type="button" style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '8px' }}>
                <Bell size={20} color="#374151" />
                <span style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', border: '2px solid white' }} />
              </button>
            }
            position="bottom-end"
            width="300px"
          >
            <PopoverHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Notifications
                <Badge color="red" size="sm">3 new</Badge>
              </div>
            </PopoverHeader>
            <div>
              {[
                { title: 'New comment on your post', time: '2m ago', unread: true },
                { title: 'Sarah invited you to a project', time: '1h ago', unread: true },
                { title: 'Your export is ready to download', time: '3h ago', unread: true },
                { title: 'Weekly digest available', time: 'Yesterday', unread: false },
              ].map((n, i) => (
                <div
                  key={i}
                  style={{ padding: '10px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start', borderBottom: i < 3 ? '1px solid #f3f4f6' : undefined, background: n.unread ? '#fffbeb' : undefined }}
                >
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: n.unread ? '#f59e0b' : 'transparent', marginTop: '5px', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: '0.8rem', color: '#374151', fontWeight: n.unread ? 500 : 400 }}>{n.title}</p>
                    <p style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '2px' }}>{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <PopoverFooter>
              <Button size="xs" color="ghost" style={{ width: '100%', justifyContent: 'center' }}>
                View all notifications
              </Button>
            </PopoverFooter>
          </Popover>
        </div>
      </div>

      {/* Settings Popover */}
      <div className={section}>
        <h2 className={sectionTitle}>Popover — Quick Settings</h2>
        <div className={row}>
          <Popover
            trigger={<Button color="ghost" leftIcon={<Settings size={16} />}>Settings</Button>}
            position="bottom-start"
            width="240px"
          >
            <PopoverHeader>Quick Settings</PopoverHeader>
            <PopoverBody>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: '#374151' }}>Notifications</span>
                  <Toggle size="sm" checked={notifs} onChange={setNotifs} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: '#374151' }}>Dark mode</span>
                  <Toggle size="sm" checked={false} onChange={() => {}} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: '#374151' }}>Auto-save</span>
                  <Toggle size="sm" checked={true} onChange={() => {}} />
                </div>
              </div>
            </PopoverBody>
          </Popover>
        </div>
      </div>
    </div>
  );
}
