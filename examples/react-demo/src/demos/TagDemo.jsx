import React, { useState } from 'react';
import { tw } from 'tailwind-to-style';
import { Tag, TagInput } from '../components/Tag';
import { Code, Pen, Globe, Zap } from 'lucide-react';

const section = tw({ name: 'demo-section', _: 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm' });
const sectionTitle = tw({ name: 'demo-title', _: 'text-xl font-semibold text-gray-900 mb-4' });
const label = tw({ name: 'demo-label', _: 'text-sm text-gray-500 mb-3 font-medium' });
const row = tw({ name: 'demo-row', _: 'flex flex-wrap items-center gap-2 mb-3' });
const divider = tw({ name: 'demo-divider', _: 'border-t border-gray-100 my-3' });

export function TagDemo() {
  const [techTags, setTechTags] = useState(['React', 'TypeScript', 'Tailwind']);
  const [filterTags, setFilterTags] = useState(['Design', 'Frontend', 'Remote']);
  const [customTags, setCustomTags] = useState([]);

  const removeTag = (setter) => (index) => setter(prev => prev.filter((_, i) => i !== index));

  return (
    <div>
      {/* Colors */}
      <div className={section}>
        <h2 className={sectionTitle}>Tag — Colors</h2>
        <p className={label}>Solid variant</p>
        <div className={row}>
          <Tag color="gray">Gray</Tag>
          <Tag color="blue">Blue</Tag>
          <Tag color="green">Green</Tag>
          <Tag color="red">Red</Tag>
          <Tag color="yellow">Yellow</Tag>
          <Tag color="purple">Purple</Tag>
          <Tag color="pink">Pink</Tag>
          <Tag color="indigo">Indigo</Tag>
        </div>
        <div className={divider} />
        <p className={label}>Outline variant</p>
        <div className={row}>
          <Tag color="gray" variant="outline">Gray</Tag>
          <Tag color="blue" variant="outline">Blue</Tag>
          <Tag color="green" variant="outline">Green</Tag>
          <Tag color="red" variant="outline">Red</Tag>
          <Tag color="yellow" variant="outline">Yellow</Tag>
          <Tag color="purple" variant="outline">Purple</Tag>
        </div>
      </div>

      {/* Sizes */}
      <div className={section}>
        <h2 className={sectionTitle}>Tag — Sizes</h2>
        <div className={row}>
          <Tag color="blue" size="sm">Small</Tag>
          <Tag color="blue" size="md">Medium</Tag>
          <Tag color="blue" size="lg">Large</Tag>
        </div>
      </div>

      {/* Removable */}
      <div className={section}>
        <h2 className={sectionTitle}>Tag — Removable</h2>
        <p className={label}>Click × to remove</p>
        <div className={row}>
          {techTags.map((t, i) => (
            <Tag key={t} color="blue" onRemove={() => setTechTags(prev => prev.filter((_, idx) => idx !== i))}>
              {t}
            </Tag>
          ))}
          {techTags.length === 0 && <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>All tags removed</span>}
        </div>
        <div className={row}>
          {filterTags.map((t, i) => (
            <Tag key={t} color="purple" variant="outline" onRemove={() => setFilterTags(prev => prev.filter((_, idx) => idx !== i))}>
              {t}
            </Tag>
          ))}
        </div>
      </div>

      {/* With Icons */}
      <div className={section}>
        <h2 className={sectionTitle}>Tag — With Icons</h2>
        <div className={row}>
          <Tag color="blue" leftIcon={<Code size={12} />}>Developer</Tag>
          <Tag color="purple" leftIcon={<Pen size={12} />}>Designer</Tag>
          <Tag color="green" leftIcon={<Globe size={12} />}>Remote</Tag>
          <Tag color="yellow" leftIcon={<Zap size={12} />}>Featured</Tag>
        </div>
        <div className={row}>
          <Tag color="blue" leftIcon={<Code size={12} />} onRemove={() => {}}>React</Tag>
          <Tag color="purple" leftIcon={<Pen size={12} />} onRemove={() => {}}>Figma</Tag>
          <Tag color="green" leftIcon={<Globe size={12} />} onRemove={() => {}}>Open Source</Tag>
        </div>
      </div>

      {/* TagInput */}
      <div className={section}>
        <h2 className={sectionTitle}>Tag — Tag Input</h2>
        <p className={label}>Press Enter or comma to add. Backspace to remove last. Max 8 tags.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '28rem' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '6px' }}>Blue tags</p>
            <TagInput
              tags={customTags}
              onAdd={(tag) => setCustomTags(prev => [...prev, tag])}
              onRemove={removeTag(setCustomTags)}
              color="blue"
              maxTags={8}
              placeholder="Add skills (press Enter)..."
            />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '6px' }}>Purple tags (preset)</p>
            <TagInput
              tags={['Product', 'UX', 'Strategy']}
              onAdd={() => {}}
              onRemove={() => {}}
              color="purple"
              placeholder="Type to add..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
