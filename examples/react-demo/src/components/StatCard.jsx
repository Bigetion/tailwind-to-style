import React from 'react';
import { tw, cx } from 'tailwind-to-style';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * StatCard component — metric/KPI display for dashboards.
 */
const card = tw({
  name: 'stat-card',
  base: 'rounded-xl border border-gray-200 bg-white p-5',
  variants: {
    variant: {
      default: 'shadow-sm',
      bordered: 'shadow-none',
      filled: 'border-transparent',
    },
  },
  defaultVariants: { variant: 'default' },
});

const statLabel = tw({ name: 'stat-label', _: 'text-sm font-medium text-gray-500' });
const statValue = tw({ name: 'stat-value', _: 'text-3xl font-bold text-gray-900 mt-1 tracking-tight' });
const statSubtext = tw({ name: 'stat-sub', _: 'text-xs text-gray-400 mt-0.5' });

const trendColors = {
  up:   { text: '#059669', bg: '#d1fae5', icon: TrendingUp },
  down: { text: '#dc2626', bg: '#fee2e2', icon: TrendingDown },
  flat: { text: '#6b7280', bg: '#f3f4f6', icon: Minus },
};

export function StatCard({
  label,
  value,
  subtext,
  trend,         // { direction: 'up'|'down'|'flat', value: '+12%', label: 'vs last month' }
  icon,          // Lucide icon element
  iconBg,        // icon background color
  variant,
  className,
}) {
  const variantProps = {};
  if (variant !== undefined) variantProps.variant = variant;

  const trendCfg = trend ? (trendColors[trend.direction] || trendColors.flat) : null;
  const TrendIcon = trendCfg?.icon;

  return (
    <div className={cx(card(variantProps), className)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className={statLabel}>{label}</p>
          <p className={statValue}>{value}</p>
          {subtext && <p className={statSubtext}>{subtext}</p>}
          {trend && trendCfg && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '8px', padding: '2px 8px', borderRadius: '9999px', backgroundColor: trendCfg.bg }}>
              <TrendIcon size={12} color={trendCfg.text} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: trendCfg.text }}>{trend.value}</span>
              {trend.label && <span style={{ fontSize: '0.7rem', color: trendCfg.text, opacity: 0.8 }}>{trend.label}</span>}
            </div>
          )}
        </div>
        {icon && (
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: iconBg || '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: '12px' }}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * MiniStatCard — compact single-line metric
 */
export function MiniStatCard({ label, value, color = '#3b82f6', className }) {
  return (
    <div
      className={cx(card(), className)}
      style={{ borderLeft: `4px solid ${color}`, paddingLeft: '16px' }}
    >
      <p style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500 }}>{label}</p>
      <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginTop: '2px' }}>{value}</p>
    </div>
  );
}
