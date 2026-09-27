import React from 'react';
import { cx } from 'tailwind-to-style/register';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ page, total, pageSize = 10, onChange }) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('…');
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
      if (page < totalPages - 2) pages.push('…');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <nav className="pagination">
      <button
        className="pagination-item"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
      >
        <ChevronLeft size={15} />
      </button>
      {getPages().map((p, i) =>
        p === '…'
          ? <span key={`e${i}`} className="pagination-ellipsis">…</span>
          : (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={p === page ? 'pagination-item-active' : 'pagination-item'}
            >
              {p}
            </button>
          )
      )}
      <button
        className="pagination-item"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
      >
        <ChevronRight size={15} />
      </button>
    </nav>
  );
}
