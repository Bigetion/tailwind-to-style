import React from 'react';
import { twsxClassName, cx } from 'tailwind-to-style';

/**
 * Table component — data table with slots.
 */
const table = twsxClassName({
  name: 'table',
  slots: {
    wrapper: 'overflow-x-auto rounded-lg border border-gray-200',
    table: 'w-full text-sm text-left',
    thead: 'bg-gray-50 border-b border-gray-200',
    th: 'px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider',
    tbody: '',
    tr: 'border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors',
    td: 'px-4 py-3 text-gray-700',
  },
});

const slots = table();

export function Table({
  columns,
  data,
  className,
  striped,
  compact,
}) {
  return (
    <div className={cx(slots.wrapper, className)}>
      <table className={slots.table}>
        <thead className={slots.thead}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={slots.th}
                style={{ width: col.width }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={slots.tbody}>
          {data.map((row, i) => (
            <tr
              key={row.id || i}
              className={slots.tr}
              style={striped && i % 2 === 1 ? { backgroundColor: '#f9fafb' } : undefined}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={slots.td}
                  style={compact ? { paddingTop: '8px', paddingBottom: '8px' } : undefined}
                >
                  {col.render ? col.render(row[col.key], row, i) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
