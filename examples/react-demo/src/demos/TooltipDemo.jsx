import React from 'react';
import { twsxClassName } from 'tailwind-to-style';
import { Tooltip } from '../components/Tooltip';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Info, HelpCircle, Trash2, Download, Settings, Star } from 'lucide-react';

const section = twsxClassName({ name: 'demo-section', _: 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm' });
const sectionTitle = twsxClassName({ name: 'demo-title', _: 'text-xl font-semibold text-gray-900 mb-4' });
const label = twsxClassName({ name: 'demo-label', _: 'text-sm text-gray-500 mb-4 font-medium' });
const row = twsxClassName({ name: 'demo-row', _: 'flex flex-wrap items-center gap-4 mb-4' });

export function TooltipDemo() {
  return (
    <div>
      {/* Positions */}
      <div className={section}>
        <h2 className={sectionTitle}>Tooltip — Positions</h2>
        <p className={label}>Hover over buttons to see tooltips in 4 directions</p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', padding: '32px' }}>
          <Tooltip content="Left tooltip" position="left">
            <Button color="outline" size="sm">Left</Button>
          </Tooltip>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
            <Tooltip content="Top tooltip" position="top">
              <Button size="sm">Top</Button>
            </Tooltip>
            <Tooltip content="Bottom tooltip" position="bottom">
              <Button color="secondary" size="sm">Bottom</Button>
            </Tooltip>
          </div>
          <Tooltip content="Right tooltip" position="right">
            <Button color="outline" size="sm">Right</Button>
          </Tooltip>
        </div>
      </div>

      {/* On Different Elements */}
      <div className={section}>
        <h2 className={sectionTitle}>Tooltip — On Different Elements</h2>
        <p className={label}>Tooltips work on any element</p>
        <div className={row}>
          <Tooltip content="This is a primary action button" position="top">
            <Button leftIcon={<Download size={14} />}>Download</Button>
          </Tooltip>
          <Tooltip content="Remove this item permanently" position="top">
            <Button color="danger" leftIcon={<Trash2 size={14} />}>Delete</Button>
          </Tooltip>
          <Tooltip content="Adjust your preferences" position="top">
            <Button color="ghost" leftIcon={<Settings size={14} />} />
          </Tooltip>
          <Tooltip content="Pro feature — upgrade to access" position="top">
            <span>
              <Badge color="purple" leftIcon={<Star size={10} />}>Pro</Badge>
            </span>
          </Tooltip>
        </div>
        <div className={row}>
          <span style={{ fontSize: '0.875rem', color: '#374151' }}>
            Need help?{' '}
            <Tooltip content="Click to open the documentation in a new tab" position="right">
              <span style={{ display: 'inline-flex', cursor: 'help', color: '#9ca3af', verticalAlign: 'middle' }}>
                <HelpCircle size={16} />
              </span>
            </Tooltip>
          </span>
          <span style={{ fontSize: '0.875rem', color: '#374151' }}>
            Status:{' '}
            <Tooltip content="All systems operational. Last checked 2 minutes ago." position="top">
              <span style={{ display: 'inline-flex', cursor: 'default', color: '#10b981', verticalAlign: 'middle' }}>
                <Info size={16} />
              </span>
            </Tooltip>
          </span>
        </div>
      </div>

      {/* Delay */}
      <div className={section}>
        <h2 className={sectionTitle}>Tooltip — Delay Options</h2>
        <p className={label}>Control how quickly tooltip appears</p>
        <div className={row}>
          <Tooltip content="Appears instantly (0ms)" delay={0} position="top">
            <Button color="outline" size="sm">Instant</Button>
          </Tooltip>
          <Tooltip content="Default delay (200ms)" delay={200} position="top">
            <Button color="outline" size="sm">Default</Button>
          </Tooltip>
          <Tooltip content="Slow delay (600ms)" delay={600} position="top">
            <Button color="outline" size="sm">Slow</Button>
          </Tooltip>
        </div>
      </div>

      {/* Disabled */}
      <div className={section}>
        <h2 className={sectionTitle}>Tooltip — Disabled</h2>
        <p className={label}>Tooltip can be conditionally disabled</p>
        <div className={row}>
          <Tooltip content="This will never show" disabled position="top">
            <Button color="secondary" size="sm">No Tooltip (disabled)</Button>
          </Tooltip>
          <Tooltip content="This shows normally" position="top">
            <Button size="sm">Has Tooltip</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
