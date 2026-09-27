import React from 'react';

export function Table({ columns, rows, emptyText = 'No data' }) {
  return (
    <div className="table">
      <table className="table-table">
        <thead className="table-thead">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="table-th" style={col.width ? { width: col.width } : undefined}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0
            ? <tr><td colSpan={columns.length} className="table-empty">{emptyText}</td></tr>
            : rows.map((row, ri) => (
              <tr key={ri} className={ri === rows.length - 1 ? 'table-tr table-tr-last' : 'table-tr'}>
                {columns.map((col, ci) => (
                  <td key={ci} className="table-td">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
