import React, { forwardRef } from 'react';
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

export const StatCard = forwardRef(function StatCard({
  label,
  value,
  subtext,
  trend,         // { direction: 'up'|'down'|'flat', value: '+12%', label: 'vs last month' }
  icon,          // Lucide icon element
  iconBg,        // icon background color
  variant,
  className,
  onClick,
  as,
  ...props
}, ref) {
  const variantProps = {};
  if (variant !== undefined) variantProps.variant = variant;

  const trendCfg = trend ? (trendColors[trend.direction] || trendColors.flat) : null;
  const TrendIcon = trendCfg?.icon;
  const RootTag = as || 'div';
  const isClickable = !!onClick;

  return (
    <RootTag
      {...props}
      ref={ref}
      className={cx(card(variantProps), className, isClickable && 'cursor-pointer hover:shadow-md transition-shadow')}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(e);
        }
      } : undefined}
    >
      <div className={tw('flex justify-between items-start')}>
        {/* Left: label + value + subtext */}
        <div className={tw('flex-1')}>
          <p className={statLabel}>{label}</p>
          <p className={statValue}>{value}</p>
          {subtext && <p className={statSubtext}>{subtext}</p>}
        </div>

        {/* Right: icon + trend */}
        <div className={tw('flex gap-2 items-start')}>
          {icon && (
            <div style={{ backgroundColor: iconBg || '#f3f4f6', borderRadius: '6px', padding: '6px', display: 'flex', alignItems: 'center' }}>
              {React.cloneElement(icon, { size: 18 })}
            </div>
          )}
          {trend && TrendIcon && (
            <div style={{ backgroundColor: trendCfg.bg, borderRadius: '6px', padding: '4px 6px', display: 'flex', alignItems: 'center', gap: '2px' }}>
              <TrendIcon size={14} color={trendCfg.text} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: trendCfg.text }}>{trend.value}</span>
            </div>
          )}
        </div>
      </div>
    </RootTag>
  );
});

/**
 * MiniStatCard — compact single-line metric
 */
export const MiniStatCard = forwardRef(function MiniStatCard({ label, value, color = '#3b82f6', className, onClick, ...props }, ref) {
  const isClickable = !!onClick;
  return (
    <div
      {...props}
      ref={ref}
      className={cx(card(), className, isClickable && 'cursor-pointer hover:shadow-md transition-shadow')}
      style={{ borderLeft: `4px solid ${color}`, paddingLeft: '16px' }}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(e);
        }
      } : undefined}
    >
      <p className={tw('text-xs text-gray-500 font-medium')}>{label}</p>
      <p className={tw('text-2xl font-bold text-gray-900 mt-0.5')}>{value}</p>
    </div>
  );
});
