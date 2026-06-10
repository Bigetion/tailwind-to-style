import React, { useState } from 'react';
import { tw } from 'tailwind-to-style';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';

const section = tw('demo-section', 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm');
const sectionTitle = tw('demo-title', 'text-xl font-semibold text-gray-900 mb-4');
const label = tw('demo-label', 'text-sm text-gray-500 mb-3 font-medium');
const grid = tw('demo-grid', 'flex flex-col gap-4 max-w-lg');

export function TextareaDemo() {
  const [bio, setBio] = useState('');
  const [feedback, setFeedback] = useState('');
  const [notes, setNotes] = useState('This textarea auto-resizes as you type more content. Try adding multiple lines!');

  const bioError = bio.length > 0 && bio.length < 20 ? 'Bio must be at least 20 characters.' : '';
  const bioSuccess = bio.length >= 20 ? 'Looks great!' : '';

  return (
    <div>
      {/* Basic */}
      <div className={section}>
        <h2 className={sectionTitle}>Textarea — Basic</h2>
        <p className={label}>Labels, placeholder, helper text</p>
        <div className={grid}>
          <Textarea label="Message" placeholder="Write your message here..." rows={3} />
          <Textarea label="Description" placeholder="Describe your project..." helperText="Max 500 characters recommended." rows={4} />
        </div>
      </div>

      {/* States */}
      <div className={section}>
        <h2 className={sectionTitle}>Textarea — States</h2>
        <div className={grid}>
          <Textarea
            label="Bio (live validation)"
            placeholder="Tell us about yourself..."
            value={bio}
            onChange={e => setBio(e.target.value)}
            error={bioError}
            success={bioSuccess}
            rows={3}
          />
          <Textarea
            label="Error state"
            value="This has an issue."
            onChange={() => {}}
            error="Content contains restricted words."
            rows={2}
          />
          <Textarea
            label="Success state"
            value="Everything looks good here!"
            onChange={() => {}}
            success="Content approved."
            rows={2}
          />
          <Textarea
            label="Disabled"
            value="This content cannot be edited."
            onChange={() => {}}
            disabled
            rows={2}
          />
        </div>
      </div>

      {/* Sizes */}
      <div className={section}>
        <h2 className={sectionTitle}>Textarea — Sizes</h2>
        <div className={grid}>
          <Textarea size="sm" label="Small" placeholder="Small textarea..." rows={2} />
          <Textarea size="md" label="Medium (default)" placeholder="Medium textarea..." rows={3} />
          <Textarea size="lg" label="Large" placeholder="Large textarea..." rows={3} />
        </div>
      </div>

      {/* Character Count */}
      <div className={section}>
        <h2 className={sectionTitle}>Textarea — Character Count</h2>
        <p className={label}>With maxLength limit and counter</p>
        <div className={grid}>
          <Textarea
            label="Tweet"
            placeholder="What's happening?"
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            maxLength={280}
            rows={3}
          />
          <Textarea
            label="Short Bio"
            placeholder="Write a short bio..."
            value={bio}
            onChange={e => setBio(e.target.value)}
            maxLength={150}
            showCount
            rows={3}
            helperText="Tell others what you do."
          />
        </div>
      </div>

      {/* Auto-resize */}
      <div className={section}>
        <h2 className={sectionTitle}>Textarea — Auto-resize</h2>
        <p className={label}>Grows automatically as you type</p>
        <div className={grid}>
          <Textarea
            label="Notes (auto-resize)"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            autoResize
            helperText="This textarea grows as you add more text."
          />
        </div>
      </div>

      {/* Form Pattern */}
      <div className={section}>
        <h2 className={sectionTitle}>Textarea — Form Pattern</h2>
        <p className={label}>Contact form with textarea</p>
        <div style={{ maxWidth: '28rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Textarea
            label="Subject"
            placeholder="What is this regarding?"
            rows={1}
            size="sm"
          />
          <Textarea
            label="Message"
            placeholder="Describe your issue in detail..."
            rows={5}
            maxLength={1000}
            showCount
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <Button color="ghost" size="sm">Clear</Button>
            <Button size="sm">Send Message</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
