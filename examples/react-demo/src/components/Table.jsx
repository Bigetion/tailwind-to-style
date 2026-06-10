import React from 'react';
import { tw, cx } from 'tailwind-to-style';

/**
 * Table component — data table.
 *
 * density: 'default' | 'compact' | 'comfortable'
 * variant: 'default' | 'striped' | 'bordered'
 *
 * Styling strategy: structural classes via tw(), value-driven styles
 * (padding, colors) via inline style maps — the most reliable pattern
 * for dynamic values in this library.
 */

// ── Static structural class names ────────────────────────────────────────────

const wrapperCls   = tw({ name: 'tbl-wrapper', _: 'overflow-x-auto rounded-lg' });
const tableCls     = tw({ name: 'tbl-table',   _: 'w-full text-sm text-left' });
const theadCls     = tw({ name: 'tbl-thead',   _: 'border-b' });
const thBaseCls    = tw({ name: 'tbl-th',      _: 'text-xs font-semibold text-gray-600 uppercase tracking-wider text-left' });
const tbodyCls     = tw({ name: 'tbl-tbody',   _: '' });
const trBaseCls    = tw({ name: 'tbl-tr',      _: 'transition-colors duration-150' });
const tdBaseCls    = tw({ name: 'tbl-td',      _: 'text-gray-700 border-b border-gray-100' });

// ── Value maps (inline styles — guaranteed to work) ──────────────────────────

const DENSITY_PADDING = {
  compact:     { padding: '4px 12px' },
  default:     { padding: '12px 16px' },
  comfortable: { padding: '20px 24px' },
};

const VARIANT_STYLES = {
  default: {
    wrapper:    { border: '1px solid #e5e7eb' },
    thead:      { backgroundColor: '#f9fafb', borderColor: '#e5e7eb' },
    rowEven:    {},
    rowOdd:     {},
    rowHover:   '#f9fafb',
    thBorder:   {},
    tdBorder:   {},
  },
  striped: {
    wrapper:    { border: '1px solid #e5e7eb' },
    thead:      { backgroundColor: '#e0e7ff', borderColor: '#e5e7eb' },
    rowEven:    { backgroundColor: '#f0f4ff' },
    rowOdd:     { backgroundColor: '#ffffff' },
    rowHover:   '#dbeafe',
    thBorder:   {},
    tdBorder:   {},
  },
  bordered: {
    wrapper:    { border: '2px solid #d1d5db' },
    thead:      { backgroundColor: '#f9fafb', borderColor: '#d1d5db' },
    rowEven:    {},
    rowOdd:     {},
    rowHover:   '#f9fafb',
    thBorder:   { borderRight: '1px solid #e5e7eb' },
    tdBorder:   { borderRight: '1px solid #f3f4f6' },
  },
};

// ── Component ────────────────────────────────────────────────────────────────

export function Table({
  columns,
  data,
  density,
  variant,
  className,
  // legacy aliases
  striped,
  compact,
}) {
  // Legacy props take precedence if new props not explicitly set
  const resolvedVariant = variant !== undefined ? variant : striped ? 'striped' : 'default';
  const resolvedDensity = density !== undefined ? density : compact ? 'compact' : 'default';

  const vs = VARIANT_STYLES[resolvedVariant] ?? VARIANT_STYLES.default;
  const cellPadding = DENSITY_PADDING[resolvedDensity] ?? DENSITY_PADDING.default;

  return (
    <div className={cx(wrapperCls, className)} style={vs.wrapper}>
      <table className={tableCls}>
        <thead className={theadCls} style={vs.thead}>
          <tr>
            {columns.map((col, ci) => (
              <th
                key={col.key}
                className={thBaseCls}
                style={{
                  ...cellPadding,
                  width: col.width,
                  ...(ci < columns.length - 1 ? vs.thBorder : {}),
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={tbodyCls}>
          {data.map((row, i) => {
            const isEven = i % 2 === 1;
            const rowStyle = isEven ? vs.rowEven : vs.rowOdd;

            return (
              <tr
                key={row.id ?? i}
                className={trBaseCls}
                style={rowStyle}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = vs.rowHover; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = (isEven ? vs.rowEven : vs.rowOdd).backgroundColor ?? ''; }}
              >
                {columns.map((col, ci) => (
                  <td
                    key={col.key}
                    className={tdBaseCls}
                    style={{
                      ...cellPadding,
                      ...(ci < columns.length - 1 ? vs.tdBorder : {}),
                    }}
                  >
                    {col.render ? col.render(row[col.key], row, i) : row[col.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
