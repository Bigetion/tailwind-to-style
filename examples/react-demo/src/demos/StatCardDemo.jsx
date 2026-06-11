import React from 'react';
import { tw } from 'tailwind-to-style';
import { StatCard, MiniStatCard } from '../components/StatCard';
import {
  Users, DollarSign, ShoppingCart, TrendingUp,
  Activity, Eye, Star, Package
} from 'lucide-react';

const section = tw('demo-section', 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm');
const sectionTitle = tw('demo-title', 'text-xl font-semibold text-gray-900 mb-4');
const label = tw('demo-label', 'text-sm text-gray-500 mb-3 font-medium');
const grid2 = tw('stat-grid-2', 'grid grid-cols-2 gap-4');
const grid4 = tw('stat-grid-4', 'grid grid-cols-2 gap-4');

export function StatCardDemo() {
  return (
    <div>
      {/* Basic Metrics */}
      <div className={section}>
        <h2 className={sectionTitle}>StatCard — Dashboard Metrics</h2>
        <p className={label}>With trend indicators and icons</p>
        <div className={grid4}>
          <StatCard
            label="Total Revenue"
            value="$48,295"
            subtext="This month"
            trend={{ direction: 'up', value: '+20.1%', label: 'vs last month' }}
            icon={<DollarSign size={22} color="#3b82f6" />}
            iconBg="#eff6ff"
          />
          <StatCard
            label="Active Users"
            value="2,338"
            subtext="Registered accounts"
            trend={{ direction: 'up', value: '+10.5%', label: 'vs last month' }}
            icon={<Users size={22} color="#059669" />}
            iconBg="#d1fae5"
          />
          <StatCard
            label="New Orders"
            value="1,432"
            subtext="Awaiting fulfillment"
            trend={{ direction: 'down', value: '-3.2%', label: 'vs last month' }}
            icon={<ShoppingCart size={22} color="#dc2626" />}
            iconBg="#fee2e2"
          />
          <StatCard
            label="Conversion"
            value="3.6%"
            subtext="From 12,400 visits"
            trend={{ direction: 'flat', value: '0%', label: 'no change' }}
            icon={<TrendingUp size={22} color="#7c3aed" />}
            iconBg="#ede9fe"
          />
        </div>
      </div>

      {/* Without Icons */}
      <div className={section}>
        <h2 className={sectionTitle}>StatCard — Without Icons</h2>
        <p className={label}>Simple metric display</p>
        <div className={grid4}>
          <StatCard label="Page Views" value="94,832" trend={{ direction: 'up', value: '+8.2%' }} />
          <StatCard label="Bounce Rate" value="32.4%" trend={{ direction: 'down', value: '-1.8%' }} />
          <StatCard label="Avg. Session" value="3m 42s" trend={{ direction: 'up', value: '+12s' }} />
          <StatCard label="Satisfaction" value="4.8 ★" trend={{ direction: 'up', value: '+0.2' }} />
        </div>
      </div>

      {/* Mini Stat Cards */}
      <div className={section}>
        <h2 className={sectionTitle}>StatCard — Mini (Left Border)</h2>
        <p className={label}>Compact version for dense dashboards</p>
        <div className={grid4}>
          <MiniStatCard label="Total Sales" value="$12,430" color="#3b82f6" />
          <MiniStatCard label="New Users" value="842" color="#059669" />
          <MiniStatCard label="Issues" value="23" color="#dc2626" />
          <MiniStatCard label="Uptime" value="99.9%" color="#7c3aed" />
        </div>
      </div>

      {/* Full Dashboard Layout */}
      <div className={section}>
        <h2 className={sectionTitle}>StatCard — Dashboard Layout</h2>
        <p className={label}>Realistic admin dashboard section</p>
        <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontWeight: 700, color: '#111827' }}>Overview</h3>
            <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>June 2026 · <strong>+24% YoY</strong></span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
            <StatCard
              label="Monthly Revenue"
              value="$128,450"
              subtext="Target: $120,000"
              trend={{ direction: 'up', value: '+7.0%', label: 'above target' }}
              icon={<DollarSign size={20} color="#2563eb" />}
              iconBg="#dbeafe"
            />
            <StatCard
              label="Active Subscribers"
              value="8,492"
              subtext="Free: 4,231 · Pro: 4,261"
              trend={{ direction: 'up', value: '+432', label: 'this month' }}
              icon={<Users size={20} color="#059669" />}
              iconBg="#d1fae5"
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            <MiniStatCard label="API Calls" value="2.4M" color="#3b82f6" />
            <MiniStatCard label="Avg Latency" value="124ms" color="#059669" />
            <MiniStatCard label="Error Rate" value="0.02%" color="#ef4444" />
            <MiniStatCard label="Uptime" value="99.99%" color="#8b5cf6" />
          </div>
        </div>
      </div>
    </div>
  );
}
