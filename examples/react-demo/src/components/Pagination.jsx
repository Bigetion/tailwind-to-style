import React, { forwardRef } from 'react';
import { tw, cx } from 'tailwind-to-style';
import { MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { useControllableState } from './_core/componentUtils';

/**
 * Pagination — uses tw like other components.
 * colorScheme: 'blue' | 'outline' | 'minimal' | 'rounded'
 */

// Page button variants
const pageBtn = tw({
  name: 'page-btn',
  base: 'inline-flex items-center justify-center font-medium cursor-pointer select-none transition-colors duration-150',
  variants: {
    size: {
      sm: 'w-7 h-7 text-xs rounded',
      md: 'w-9 h-9 text-sm rounded-md',
      lg: 'w-11 h-11 text-base rounded-lg',
    },
    // Blue scheme
    blue_default: { true: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50' },
    blue_active:  { true: 'bg-blue-600 text-white border border-blue-600 hover:bg-blue-700' },
    // Outline scheme
    outline_default: { true: 'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50' },
    outline_active:  { true: 'bg-blue-600 text-white border border-blue-600 hover:bg-blue-700' },
    // Minimal scheme
    minimal_default: { true: 'bg-transparent text-gray-500 border border-transparent hover:bg-gray-100' },
    minimal_active:  { true: 'bg-blue-50 text-blue-600 border border-transparent font-semibold' },
    // Rounded scheme
    rounded_default: { true: 'bg-gray-100 text-gray-700 border border-transparent rounded-full hover:bg-gray-200' },
    rounded_active:  { true: 'bg-blue-600 text-white border border-blue-600 rounded-full hover:bg-blue-700' },
  },
  defaultVariants: { size: 'md' },
});

const navBtn = tw({
  name: 'page-nav',
  base: 'inline-flex items-center justify-center transition-colors duration-150 cursor-pointer text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md',
  variants: {
    size: {
      sm: 'w-7 h-7',
      md: 'w-9 h-9',
      lg: 'w-11 h-11',
    },
    disabled: {
      true: 'opacity-30 cursor-not-allowed pointer-events-none',
    },
  },
  defaultVariants: { size: 'md' },
});

function getPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}

export const Pagination = forwardRef(function Pagination({
  current,
  defaultCurrent = 1,
  onCurrentChange,
  total = 1,
  onChange,
  size = 'md',
  colorScheme = 'blue',
  className,
  ...props
}, ref) {
  const [currentPage, setCurrentPage] = useControllableState({
    value: current,
    defaultValue: defaultCurrent,
    onChange: onCurrentChange,
  });

  if (total <= 1) return null;

  const pages = getPages(currentPage, total);
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 18 : 16;

  const handleChange = (page) => {
    setCurrentPage(page);
    onChange?.(page);
  };

  function getPageClass(isActive) {
    const props = {};
    props[`${colorScheme}_${isActive ? 'active' : 'default'}`] = true;
    props.size = size;
    return pageBtn(props);
  }

  function getNavClass(disabled) {
    const props = { size };
    if (disabled) props.disabled = true;
    return navBtn(props);
  }

  return (
    <nav
      {...props}
      ref={ref}
      className={cx(tw('inline-flex items-center'), className)}
      style={{ gap: size === 'sm' ? '3px' : size === 'lg' ? '5px' : '4px' }}
      aria-label="Pagination"
    >
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => currentPage > 1 && handleChange(currentPage - 1)}
        className={getNavClass(currentPage === 1)}
        aria-label="Previous page"
      >
        <ChevronLeft size={iconSize} />
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span
            key={`el-${i}`}
            className={cx(tw('inline-flex items-center justify-center text-gray-400'), pageBtn({ size, minimal_default: true }))}
            aria-hidden="true"
          >
            <MoreHorizontal size={iconSize - 2} />
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => p !== currentPage && handleChange(p)}
            className={getPageClass(p === currentPage)}
            aria-current={p === currentPage ? 'page' : undefined}
            aria-label={`Page ${p}`}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        disabled={currentPage === total}
        onClick={() => currentPage < total && handleChange(currentPage + 1)}
        className={getNavClass(currentPage === total)}
        aria-label="Next page"
      >
        <ChevronRight size={iconSize} />
      </button>
    </nav>
  );
});
