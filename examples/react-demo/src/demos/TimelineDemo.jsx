import React from 'react';
import { tw } from 'tailwind-to-style';
import { Timeline } from '../components/Timeline';
import { Badge } from '../components/Badge';
import {
  CheckCircle, AlertCircle, Clock, XCircle,
  User, GitBranch, Star, Upload, MessageSquare, Settings
} from 'lucide-react';

const section = tw('demo-section', 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm');
const sectionTitle = tw('demo-title', 'text-xl font-semibold text-gray-900 mb-4');
const label = tw('demo-label', 'text-sm text-gray-500 mb-3 font-medium');
const gridTwo = tw('demo-grid-2', 'grid grid-cols-2 gap-8');

export function TimelineDemo() {
  return (
    <div>
      {/* Basic */}
      <div className={section}>
        <h2 className={sectionTitle}>Timeline — Basic</h2>
        <p className={label}>Simple event sequence</p>
        <div style={{ maxWidth: '32rem' }}>
          <Timeline
            items={[
              { title: 'Account Created', description: 'Your account was successfully created.', time: '2 days ago', color: 'green', icon: <CheckCircle /> },
              { title: 'Email Verified', description: 'Email address verified via confirmation link.', time: '2 days ago', color: 'blue', icon: <CheckCircle /> },
              { title: 'Profile Completed', description: 'Added name, avatar, and bio to profile.', time: '1 day ago', color: 'blue', icon: <User /> },
              { title: 'First Project Created', description: 'Created "My First App" project.', time: '6 hours ago', color: 'purple', icon: <Star /> },
              { title: 'Team Member Invited', description: 'Invited alice@example.com to join the team.', time: '2 hours ago', color: 'yellow', icon: <User /> },
            ]}
          />
        </div>
      </div>

      {/* Sizes */}
      <div className={section}>
        <h2 className={sectionTitle}>Timeline — Sizes</h2>
        <div className={gridTwo}>
          <div>
            <p className={label}>Small</p>
            <Timeline
              size="sm"
              items={[
                { title: 'PR #142 merged', time: '10m', color: 'green', icon: <GitBranch /> },
                { title: 'Tests passed', time: '12m', color: 'blue', icon: <CheckCircle /> },
                { title: 'Deployed to staging', time: '15m', color: 'purple', icon: <Upload /> },
              ]}
            />
          </div>
          <div>
            <p className={label}>Large</p>
            <Timeline
              size="lg"
              items={[
                { title: 'Order Placed', time: 'Jun 1', color: 'blue' },
                { title: 'Payment Confirmed', time: 'Jun 1', color: 'green' },
                { title: 'Shipped', time: 'Jun 3', color: 'purple' },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Status Colors */}
      <div className={section}>
        <h2 className={sectionTitle}>Timeline — Status Colors</h2>
        <div style={{ maxWidth: '32rem' }}>
          <Timeline
            items={[
              { title: 'Deployment Started', time: '14:32', color: 'blue', icon: <Upload /> },
              { title: 'Build Passed', time: '14:33', color: 'green', icon: <CheckCircle /> },
              { title: 'Tests Running', time: '14:34', color: 'yellow', icon: <Clock /> },
              { title: 'Security Scan Failed', time: '14:36', color: 'red', icon: <XCircle />, description: 'Vulnerability detected in dependency. Deployment blocked.' },
              { title: 'Rollback Initiated', time: '14:37', color: 'gray', icon: <AlertCircle /> },
            ]}
          />
        </div>
      </div>

      {/* Rich Content */}
      <div className={section}>
        <h2 className={sectionTitle}>Timeline — Rich Content</h2>
        <p className={label}>Timeline items with custom content</p>
        <div style={{ maxWidth: '32rem' }}>
          <Timeline
            items={[
              {
                title: 'Version 4.0 Released',
                time: 'Today',
                color: 'green',
                icon: <Star />,
                description: 'Major release with new unified API and React bindings.',
                content: (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                    <Badge color="green" size="sm">tw() API</Badge>
                    <Badge color="blue" size="sm">React bindings</Badge>
                    <Badge color="purple" size="sm">Design tokens</Badge>
                    <Badge color="yellow" size="sm">Animations</Badge>
                  </div>
                ),
              },
              {
                title: 'Code Review Requested',
                time: 'Yesterday',
                color: 'yellow',
                icon: <MessageSquare />,
                description: 'alice@example.com requested your review on PR #187.',
                content: (
                  <div style={{ marginTop: '8px', padding: '8px 12px', background: '#f9fafb', borderRadius: '8px', fontSize: '0.8rem', color: '#374151', border: '1px solid #e5e7eb' }}>
                    <strong>PR #187</strong>: feat: add Popover component with auto-placement
                  </div>
                ),
              },
              {
                title: 'Settings Updated',
                time: '3 days ago',
                color: 'gray',
                icon: <Settings />,
                description: 'Notification preferences updated.',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
