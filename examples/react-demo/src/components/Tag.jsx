import React from 'react';
import { tw, cx } from 'tailwind-to-style';
import { X } from 'lucide-react';

/**
 * Tag/Chip component — removable labels for filters and categorization.
 */
const tag = tw({
  name: 'tag',
  base: 'inline-flex items-center gap-1.5 font-medium rounded-full transition-colors duration-150 select-none',
  variants: {
    color: {
      gray:   'bg-gray-100 text-gray-700',
      blue:   'bg-blue-50 text-blue-700',
      green:  'bg-emerald-50 text-emerald-700',
      red:    'bg-red-50 text-red-700',
      yellow: 'bg-amber-50 text-amber-700',
      purple: 'bg-purple-50 text-purple-700',
      pink:   'bg-pink-50 text-pink-700',
      indigo: 'bg-indigo-50 text-indigo-700',
    },
    size: {
      sm: 'text-xs px-2.5 py-0.5',
      md: 'text-sm px-3 py-1',
      lg: 'text-base px-4 py-1.5',
    },
    variant: {
      solid: '',
      outline: 'bg-transparent border',
    },
    interactive: {
      true: 'cursor-pointer hover:opacity-80',
    },
  },
  compoundVariants: [
    { variant: 'outline', color: 'gray',   class: 'border-gray-300 text-gray-600' },
    { variant: 'outline', color: 'blue',   class: 'border-blue-300 text-blue-600' },
    { variant: 'outline', color: 'green',  class: 'border-emerald-300 text-emerald-600' },
    { variant: 'outline', color: 'red',    class: 'border-red-300 text-red-600' },
    { variant: 'outline', color: 'yellow', class: 'border-amber-300 text-amber-600' },
    { variant: 'outline', color: 'purple', class: 'border-purple-300 text-purple-600' },
  ],
  defaultVariants: { color: 'gray', size: 'md', variant: 'solid' },
});

const removeBtn = tw({
  name: 'tag-remove',
  base: 'inline-flex items-center justify-center rounded-full transition-colors duration-150 cursor-pointer',
  variants: {
    color: {
      gray:   'hover:bg-gray-300 text-gray-500',
      blue:   'hover:bg-blue-200 text-blue-500',
      green:  'hover:bg-emerald-200 text-emerald-500',
      red:    'hover:bg-red-200 text-red-500',
      yellow: 'hover:bg-amber-200 text-amber-500',
      purple: 'hover:bg-purple-200 text-purple-500',
      pink:   'hover:bg-pink-200 text-pink-500',
      indigo: 'hover:bg-indigo-200 text-indigo-500',
    },
    size: {
      sm: 'w-3.5 h-3.5',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    },
  },
  defaultVariants: { color: 'gray', size: 'md' },
});

export function Tag({
  children,
  color,
  size,
  variant,
  onRemove,
  onClick,
  leftIcon,
  className,
}) {
  const variantProps = {};
  if (color !== undefined) variantProps.color = color;
  if (size !== undefined) variantProps.size = size;
  if (variant !== undefined) variantProps.variant = variant;
  if (onClick) variantProps.interactive = true;

  const removeBtnProps = {};
  if (color !== undefined) removeBtnProps.color = color;
  if (size !== undefined) removeBtnProps.size = size;

  const iconSize = size === 'sm' ? 10 : size === 'lg' ? 14 : 12;
  const removeSize = size === 'sm' ? 8 : size === 'lg' ? 12 : 10;

  return (
    <span
      className={cx(tag(variantProps), className)}
      onClick={onClick}
    >
      {leftIcon && <span style={{ display: 'inline-flex' }}>{leftIcon}</span>}
      {children}
      {onRemove && (
        <button
          type="button"
          className={removeBtn(removeBtnProps)}
          onClick={e => { e.stopPropagation(); onRemove(); }}
          aria-label="Remove"
          style={{ background: 'none', border: 'none', padding: 0 }}
        >
          <X size={removeSize} strokeWidth={2.5} />
        </button>
      )}
    </span>
  );
}

/**
 * TagInput — input for adding tags dynamically
 */
export function TagInput({ tags, onAdd, onRemove, color, placeholder = 'Add tag...', maxTags }) {
  const [input, setInput] = React.useState('');

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault();
      if (!maxTags || tags.length < maxTags) {
        onAdd(input.trim());
        setInput('');
      }
    }
    if (e.key === 'Backspace' && !input && tags.length > 0) {
      onRemove(tags.length - 1);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        padding: '8px 12px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        background: '#fff',
        cursor: 'text',
        minHeight: '42px',
        alignItems: 'center',
      }}
      onClick={() => document.querySelector('.tag-input-field')?.focus()}
    >
      {tags.map((tag, i) => (
        <Tag key={i} color={color || 'blue'} size="sm" onRemove={() => onRemove(i)}>
          {tag}
        </Tag>
      ))}
      <input
        className="tag-input-field"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ''}
        style={{
          border: 'none',
          outline: 'none',
          fontSize: '0.875rem',
          color: '#374151',
          minWidth: '80px',
          flex: 1,
          background: 'transparent',
        }}
      />
    </div>
  );
}
