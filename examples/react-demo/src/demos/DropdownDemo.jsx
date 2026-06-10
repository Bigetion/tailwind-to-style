import React, { useState } from 'react';
import { tw } from 'tailwind-to-style';
import { Dropdown } from '../components/Dropdown';
import { Button } from '../components/Button';
import {
  ChevronDown, User, Settings, LogOut, Trash2,
  Copy, Edit, Share2, Download, MoreHorizontal, Bell,
  Moon, Sun, Monitor, Globe, Lock
} from 'lucide-react';

const section = tw('demo-section', 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm');
const sectionTitle = tw('demo-title', 'text-xl font-semibold text-gray-900 mb-4');
const label = tw('demo-label', 'text-sm text-gray-500 mb-3 font-medium');
const row = tw('demo-row', 'flex flex-wrap items-start gap-6 mb-4');

export function DropdownDemo() {
  const [theme, setTheme] = useState('System');

  return (
    <div>
      {/* Basic */}
      <div className={section}>
        <h2 className={sectionTitle}>Dropdown — Basic Actions</h2>
        <p className={label}>Common action menus with icons and shortcuts</p>
        <div className={row}>
          <Dropdown
            trigger={<Button rightIcon={<ChevronDown size={14} />}>Actions</Button>}
            items={[
              { label: 'Edit', icon: <Edit size={14} />, shortcut: '⌘E', onClick: () => {} },
              { label: 'Duplicate', icon: <Copy size={14} />, shortcut: '⌘D', onClick: () => {} },
              { label: 'Share', icon: <Share2 size={14} />, onClick: () => {} },
              { label: 'Download', icon: <Download size={14} />, onClick: () => {} },
              { type: 'divider' },
              { label: 'Delete', icon: <Trash2 size={14} />, variant: 'danger', onClick: () => {} },
            ]}
          />

          <Dropdown
            trigger={
              <Button color="ghost" size="sm" leftIcon={<MoreHorizontal size={16} />} />
            }
            align="left"
            items={[
              { label: 'View Details', onClick: () => {} },
              { label: 'Edit Item', icon: <Edit size={14} />, onClick: () => {} },
              { label: 'Move to Folder', onClick: () => {} },
              { type: 'divider' },
              { label: 'Archive', onClick: () => {} },
              { label: 'Delete', icon: <Trash2 size={14} />, variant: 'danger', onClick: () => {} },
            ]}
          />
        </div>
      </div>

      {/* User Menu */}
      <div className={section}>
        <h2 className={sectionTitle}>Dropdown — User Menu</h2>
        <p className={label}>Profile/account navigation pattern</p>
        <div className={row}>
          <Dropdown
            trigger={
              <Button color="ghost" rightIcon={<ChevronDown size={14} />} leftIcon={<User size={16} />}>
                John Doe
              </Button>
            }
            align="left"
            items={[
              { type: 'label', label: 'My Account' },
              { label: 'Profile', icon: <User size={14} />, onClick: () => {} },
              { label: 'Settings', icon: <Settings size={14} />, shortcut: '⌘,', onClick: () => {} },
              { label: 'Notifications', icon: <Bell size={14} />, onClick: () => {} },
              { type: 'divider' },
              { label: 'Sign Out', icon: <LogOut size={14} />, variant: 'danger', onClick: () => {} },
            ]}
          />
        </div>
      </div>

      {/* Selection Dropdown */}
      <div className={section}>
        <h2 className={sectionTitle}>Dropdown — Selection</h2>
        <p className={label}>Active item with checkmark indicator</p>
        <div className={row}>
          <Dropdown
            trigger={
              <Button color="outline" rightIcon={<ChevronDown size={14} />} leftIcon={theme === 'Light' ? <Sun size={16} /> : theme === 'Dark' ? <Moon size={16} /> : <Monitor size={16} />}>
                {theme}
              </Button>
            }
            items={[
              { label: 'Light', icon: <Sun size={14} />, active: theme === 'Light', keepOpen: false, onClick: () => setTheme('Light') },
              { label: 'Dark', icon: <Moon size={14} />, active: theme === 'Dark', keepOpen: false, onClick: () => setTheme('Dark') },
              { label: 'System', icon: <Monitor size={14} />, active: theme === 'System', keepOpen: false, onClick: () => setTheme('System') },
            ]}
          />
        </div>
      </div>

      {/* Align Right */}
      <div className={section}>
        <h2 className={sectionTitle}>Dropdown — Right Aligned</h2>
        <p className={label}>Menu opens aligned to right edge of trigger</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Dropdown
            align="right"
            trigger={<Button size="sm" rightIcon={<ChevronDown size={14} />}>Options</Button>}
            items={[
              { label: 'Language', icon: <Globe size={14} />, onClick: () => {} },
              { label: 'Privacy', icon: <Lock size={14} />, onClick: () => {} },
              { label: 'Settings', icon: <Settings size={14} />, onClick: () => {} },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
