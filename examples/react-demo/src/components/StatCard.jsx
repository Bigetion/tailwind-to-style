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

const statLabel = tw('stat-label', 'text-sm font-medium text-gray-500');
const statValue = tw('stat-value', 'text-3xl font-bold text-gray-900 mt-1 tracking-tight');
const statSubtext = tw('stat-sub', 'text-xs text-gray-400 mt-0.5');

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
      <div className={tw('flex justify-between items-start')}>
        <div className={tw('flex-1 min-w-0')}>
          <p className={statLabel}>{label}</p>
          <p className={statValue}>{value}</p>
          {subtext && <p className={statSubtext}>{subtext}</p>}
          {trend && trendCfg && (
            <div className={tw('inline-flex items-center gap-1 mt-2 rounded-full')} style={{ padding: '2px 8px', backgroundColor: trendCfg.bg }}>
              <TrendIcon size={12} color={trendCfg.text} />
              <span className={tw('text-xs font-semibold')} style={{ color: trendCfg.text }}>{trend.value}</span>
              {trend.label && <span className={tw('text-xs')} style={{ color: trendCfg.text, opacity: 0.8 }}>{trend.label}</span>}
            </div>
          )}
        </div>
        {icon && (
          <div className={tw('flex items-center justify-center shrink-0 rounded-xl')} style={{ width: '44px', height: '44px', backgroundColor: iconBg || '#eff6ff', marginLeft: '12px' }}>
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
      <p className={tw('text-xs text-gray-500 font-medium')}>{label}</p>
      <p className={tw('text-2xl font-bold text-gray-900 mt-0.5')}>{value}</p>
    </div>
  );
}
