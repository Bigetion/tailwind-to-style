import React, { useState } from 'react';
import { tw } from 'tailwind-to-style';
import { Select } from '../components/Select';

const section = tw('demo-section', 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm');
const sectionTitle = tw('demo-title', 'text-xl font-semibold text-gray-900 mb-4');
const label = tw('demo-label', 'text-sm text-gray-500 mb-3 font-medium');
const grid = tw('demo-grid', 'flex flex-col gap-4 max-w-sm');
const gridTwo = tw('demo-grid-2', 'grid grid-cols-2 gap-4 max-w-lg');

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
];

const roles = [
  { value: 'admin', label: 'Administrator' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
  { value: 'guest', label: 'Guest', disabled: true },
];

const techGroups = [
  {
    label: 'Frontend',
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'angular', label: 'Angular' },
    ],
  },
  {
    label: 'Backend',
    options: [
      { value: 'node', label: 'Node.js' },
      { value: 'python', label: 'Python' },
      { value: 'go', label: 'Go' },
      { value: 'rust', label: 'Rust' },
    ],
  },
  {
    label: 'Database',
    options: [
      { value: 'postgres', label: 'PostgreSQL' },
      { value: 'mysql', label: 'MySQL' },
      { value: 'mongo', label: 'MongoDB' },
    ],
  },
];

export function SelectDemo() {
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('editor');
  const [tech, setTech] = useState('react');

  const countryError = country === '' ? '' : '';

  return (
    <div>
      {/* Basic */}
      <div className={section}>
        <h2 className={sectionTitle}>Select — Basic</h2>
        <p className={label}>Simple selects with labels and placeholder</p>
        <div className={grid}>
          <Select
            label="Country"
            placeholder="Select a country..."
            options={countries}
            value={country}
            onChange={e => setCountry(e.target.value)}
            helperText="We'll use this for shipping."
          />
          <Select
            label="Role"
            options={roles}
            value={role}
            onChange={e => setRole(e.target.value)}
            helperText="Guest role is unavailable."
          />
        </div>
      </div>

      {/* States */}
      <div className={section}>
        <h2 className={sectionTitle}>Select — States</h2>
        <p className={label}>Default, error, success, and disabled</p>
        <div className={grid}>
          <Select label="Default" options={roles} value="editor" onChange={() => {}} />
          <Select label="Error" options={roles} value="viewer" onChange={() => {}} error="You don't have permission for this role." />
          <Select label="Success" options={roles} value="editor" onChange={() => {}} success="Role updated successfully!" />
          <Select label="Disabled" options={roles} value="admin" onChange={() => {}} disabled />
        </div>
      </div>

      {/* Sizes */}
      <div className={section}>
        <h2 className={sectionTitle}>Select — Sizes</h2>
        <div className={grid}>
          <Select size="sm" label="Small" options={countries} placeholder="Select..." onChange={() => {}} />
          <Select size="md" label="Medium (default)" options={countries} placeholder="Select..." onChange={() => {}} />
          <Select size="lg" label="Large" options={countries} placeholder="Select..." onChange={() => {}} />
        </div>
      </div>

      {/* Option Groups */}
      <div className={section}>
        <h2 className={sectionTitle}>Select — Option Groups</h2>
        <p className={label}>Group options with optgroup for better organization</p>
        <div className={grid}>
          <Select
            label="Tech Stack"
            groups={techGroups}
            value={tech}
            onChange={e => setTech(e.target.value)}
            helperText="Choose your primary technology."
          />
        </div>
      </div>

      {/* Form Pattern */}
      <div className={section}>
        <h2 className={sectionTitle}>Select — Form Pattern</h2>
        <p className={label}>Multiple selects in a form layout</p>
        <div className={gridTwo}>
          <Select label="Country" options={countries} placeholder="Select country..." onChange={() => {}} />
          <Select label="Role" options={roles} value="editor" onChange={() => {}} />
          <Select label="Timezone" options={[
            { value: 'utc', label: 'UTC+0 (London)' },
            { value: 'est', label: 'UTC-5 (New York)' },
            { value: 'pst', label: 'UTC-8 (Los Angeles)' },
            { value: 'jst', label: 'UTC+9 (Tokyo)' },
          ]} placeholder="Select timezone..." onChange={() => {}} />
          <Select label="Language" options={[
            { value: 'en', label: 'English' },
            { value: 'id', label: 'Indonesian' },
            { value: 'es', label: 'Spanish' },
            { value: 'fr', label: 'French' },
          ]} value="en" onChange={() => {}} />
        </div>
      </div>
    </div>
  );
}
