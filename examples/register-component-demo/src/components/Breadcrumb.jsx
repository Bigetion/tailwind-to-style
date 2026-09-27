import React from 'react';
import { ChevronRight } from 'lucide-react';

export function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <div key={i} className="breadcrumb-item">
            {isLast
              ? <span className="breadcrumb-current">{item.label}</span>
              : <a href={item.href ?? '#'} className="breadcrumb-link">{item.label}</a>
            }
            {!isLast && <ChevronRight size={13} className="breadcrumb-separator" />}
          </div>
        );
      })}
    </nav>
  );
}
