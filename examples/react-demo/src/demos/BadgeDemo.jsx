import React from 'react';
import { tw } from 'tailwind-to-style';
import { Badge } from '../components/Badge';
import { Check, X, Clock, AlertTriangle, Zap, Star, ArrowUp, ArrowDown } from 'lucide-react';

const section = tw('demo-section', 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm');
const sectionTitle = tw('demo-title', 'text-xl font-semibold text-gray-900 mb-4');
const label = tw('demo-label', 'text-sm text-gray-500 mb-3 font-medium');
const row = tw('demo-row', 'flex flex-wrap items-center gap-2 mb-4');
const divider = tw('demo-divider', 'border-t border-gray-100 my-4');

export function BadgeDemo() {
  return (
    <div>
      {/* Colors */}
      <div className={section}>
        <h2 className={sectionTitle}>Badge — Colors</h2>
        <p className={label}>All color options (solid variant)</p>
        <div className={row}>
          <Badge color="gray">Gray</Badge>
          <Badge color="blue">Blue</Badge>
          <Badge color="green">Green</Badge>
          <Badge color="red">Red</Badge>
          <Badge color="yellow">Yellow</Badge>
          <Badge color="purple">Purple</Badge>
          <Badge color="pink">Pink</Badge>
          <Badge color="indigo">Indigo</Badge>
        </div>
        <div className={divider} />
        <p className={label}>Outline variant</p>
        <div className={row}>
          <Badge color="gray" variant="outline">Gray</Badge>
          <Badge color="blue" variant="outline">Blue</Badge>
          <Badge color="green" variant="outline">Green</Badge>
          <Badge color="red" variant="outline">Red</Badge>
          <Badge color="yellow" variant="outline">Yellow</Badge>
          <Badge color="purple" variant="outline">Purple</Badge>
        </div>
      </div>

      {/* Sizes */}
      <div className={section}>
        <h2 className={sectionTitle}>Badge — Sizes</h2>
        <div className={row}>
          <Badge size="sm" color="blue">Small</Badge>
          <Badge size="md" color="blue">Medium</Badge>
          <Badge size="lg" color="blue">Large</Badge>
        </div>
      </div>

      {/* With Dot */}
      <div className={section}>
        <h2 className={sectionTitle}>Badge — Status Dot</h2>
        <p className={label}>Dot indicator for live status</p>
        <div className={row}>
          <Badge color="green" dot>Online</Badge>
          <Badge color="yellow" dot>Away</Badge>
          <Badge color="red" dot>Busy</Badge>
          <Badge color="gray" dot>Offline</Badge>
        </div>
      </div>

      {/* With Icons */}
      <div className={section}>
        <h2 className={sectionTitle}>Badge — With Icons</h2>
        <p className={label}>Left and right icon support</p>
        <div className={row}>
          <Badge color="green" leftIcon={<Check size={12} />}>Approved</Badge>
          <Badge color="red" leftIcon={<X size={12} />}>Rejected</Badge>
          <Badge color="yellow" leftIcon={<Clock size={12} />}>Pending</Badge>
          <Badge color="purple" leftIcon={<Zap size={12} />}>New</Badge>
          <Badge color="blue" leftIcon={<Star size={12} />}>Featured</Badge>
          <Badge color="red" leftIcon={<AlertTriangle size={12} />}>Critical</Badge>
        </div>
        <div className={divider} />
        <p className={label}>With directional icons</p>
        <div className={row}>
          <Badge color="green" leftIcon={<ArrowUp size={12} />}>+12.5%</Badge>
          <Badge color="red" leftIcon={<ArrowDown size={12} />}>-3.2%</Badge>
          <Badge color="blue" rightIcon={<ArrowUp size={12} />}>Trending</Badge>
        </div>
      </div>

      {/* Real-World Patterns */}
      <div className={section}>
        <h2 className={sectionTitle}>Badge — Patterns</h2>
        <p className={label}>Common real-world usage</p>

        {/* Tag list */}
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '6px' }}>Tags</p>
          <div className={row}>
            <Badge color="blue" size="sm">React</Badge>
            <Badge color="purple" size="sm">TypeScript</Badge>
            <Badge color="green" size="sm">Tailwind</Badge>
            <Badge color="indigo" size="sm">CSS-in-JS</Badge>
            <Badge color="pink" size="sm">Runtime</Badge>
          </div>
        </div>

        {/* Status in context */}
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '6px' }}>Order statuses</p>
          <div className={row}>
            <Badge color="yellow" dot size="sm">Processing</Badge>
            <Badge color="blue" dot size="sm">Shipped</Badge>
            <Badge color="green" dot size="sm">Delivered</Badge>
            <Badge color="red" dot size="sm">Cancelled</Badge>
          </div>
        </div>

        {/* Version badges */}
        <div>
          <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '6px' }}>Version labels</p>
          <div className={row}>
            <Badge color="green" variant="outline" size="sm">v4.0.0</Badge>
            <Badge color="blue" variant="outline" size="sm">Stable</Badge>
            <Badge color="yellow" variant="outline" size="sm">Beta</Badge>
            <Badge color="red" variant="outline" size="sm">Deprecated</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
