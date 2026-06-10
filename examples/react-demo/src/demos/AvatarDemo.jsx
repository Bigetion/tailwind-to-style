import React from 'react';
import { tw } from 'tailwind-to-style';
import { Avatar, AvatarGroup } from '../components/Avatar';

const section = tw({ name: 'demo-section', _: 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm' });
const sectionTitle = tw({ name: 'demo-title', _: 'text-xl font-semibold text-gray-900 mb-4' });
const label = tw({ name: 'demo-label', _: 'text-sm text-gray-500 mb-3 font-medium' });
const row = tw({ name: 'demo-row', _: 'flex flex-wrap items-center gap-3 mb-4' });
const divider = tw({ name: 'demo-divider', _: 'border-t border-gray-100 my-4' });

export function AvatarDemo() {
  return (
    <div>
      {/* Sizes */}
      <div className={section}>
        <h2 className={sectionTitle}>Avatar — Sizes</h2>
        <p className={label}>From xs to 2xl with fallback initials</p>
        <div className={row}>
          <Avatar size="xs" name="Alice" />
          <Avatar size="sm" name="Bob" />
          <Avatar size="md" name="Carol Davis" />
          <Avatar size="lg" name="David" />
          <Avatar size="xl" name="Emily Fox" />
          <Avatar size="2xl" name="Frank Green" />
        </div>
      </div>

      {/* With Images */}
      <div className={section}>
        <h2 className={sectionTitle}>Avatar — With Images</h2>
        <p className={label}>When src is provided, shows image instead of initials</p>
        <div className={row}>
          <Avatar size="md" src="https://i.pravatar.cc/80?img=1" name="Alice" />
          <Avatar size="md" src="https://i.pravatar.cc/80?img=2" name="Bob" />
          <Avatar size="md" src="https://i.pravatar.cc/80?img=3" name="Carol" />
          <Avatar size="lg" src="https://i.pravatar.cc/96?img=4" name="David" />
          <Avatar size="xl" src="https://i.pravatar.cc/128?img=5" name="Emily" />
        </div>
      </div>

      {/* Shapes */}
      <div className={section}>
        <h2 className={sectionTitle}>Avatar — Shapes</h2>
        <p className={label}>Circle (default) vs square</p>
        <div className={row}>
          <Avatar size="lg" name="Circle" shape="circle" />
          <Avatar size="lg" name="Square" shape="square" />
          <Avatar size="lg" src="https://i.pravatar.cc/96?img=6" shape="circle" />
          <Avatar size="lg" src="https://i.pravatar.cc/96?img=7" shape="square" />
        </div>
      </div>

      {/* Status */}
      <div className={section}>
        <h2 className={sectionTitle}>Avatar — Status</h2>
        <p className={label}>Online status dot indicator</p>
        <div className={row}>
          <Avatar size="md" name="Online" status="online" />
          <Avatar size="md" name="Away" status="away" />
          <Avatar size="md" name="Busy" status="busy" />
          <Avatar size="md" name="Offline" status="offline" />
        </div>
        <div className={divider} />
        <p className={label}>Status with different sizes</p>
        <div className={row}>
          <Avatar size="sm" name="SM" status="online" />
          <Avatar size="md" name="MD" status="online" />
          <Avatar size="lg" name="LG" status="online" />
          <Avatar size="xl" name="XL" status="busy" />
        </div>
      </div>

      {/* Avatar Group */}
      <div className={section}>
        <h2 className={sectionTitle}>Avatar — Group</h2>
        <p className={label}>Stacked avatars with overflow count</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px' }}>Team (show all)</p>
            <AvatarGroup>
              <Avatar size="md" src="https://i.pravatar.cc/80?img=10" name="Alice" />
              <Avatar size="md" src="https://i.pravatar.cc/80?img=11" name="Bob" />
              <Avatar size="md" src="https://i.pravatar.cc/80?img=12" name="Carol" />
              <Avatar size="md" name="David E" />
            </AvatarGroup>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px' }}>Team (max 3, +4 overflow)</p>
            <AvatarGroup max={3}>
              <Avatar size="md" src="https://i.pravatar.cc/80?img=13" name="A" />
              <Avatar size="md" src="https://i.pravatar.cc/80?img=14" name="B" />
              <Avatar size="md" src="https://i.pravatar.cc/80?img=15" name="C" />
              <Avatar size="md" name="D" />
              <Avatar size="md" name="E" />
              <Avatar size="md" name="F" />
              <Avatar size="md" name="G" />
            </AvatarGroup>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px' }}>Large group</p>
            <AvatarGroup max={4} size="lg">
              <Avatar size="lg" src="https://i.pravatar.cc/96?img=20" name="Alice" />
              <Avatar size="lg" src="https://i.pravatar.cc/96?img=21" name="Bob" />
              <Avatar size="lg" src="https://i.pravatar.cc/96?img=22" name="Carol" />
              <Avatar size="lg" src="https://i.pravatar.cc/96?img=23" name="David" />
              <Avatar size="lg" name="Emily" />
              <Avatar size="lg" name="Frank" />
            </AvatarGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
