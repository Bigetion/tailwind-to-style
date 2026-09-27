import { register } from 'tailwind-to-style/register';

register('badge', {
  base: {
    tw: 'inline-flex items-center gap-1 font-semibold rounded-full',
    'font-size': '11px',
    padding: '2px 8px',
  },
  modifiers: {
    default:     { tw: 'bg-gray-100 text-gray-700' },
    primary:     { 'background-color': 'var(--c-brand-light)', color: 'var(--c-brand)' },
    success:     { 'background-color': 'var(--c-success-bg)',  color: 'var(--c-success)' },
    warning:     { 'background-color': 'var(--c-warning-bg)',  color: 'var(--c-warning)' },
    danger:      { 'background-color': 'var(--c-danger-bg)',   color: 'var(--c-danger)' },
    info:        { 'background-color': 'var(--c-info-bg)',     color: 'var(--c-info)' },
    outline:     { tw: 'bg-transparent border border-current text-gray-600' },
    dot:         { tw: 'rounded-full', width: '8px', height: '8px', padding: '0', 'flex-shrink': '0' },
    'dot-primary': { 'background-color': 'var(--c-brand)' },
    'dot-success': { 'background-color': 'var(--c-success)' },
    'dot-warning': { 'background-color': 'var(--c-warning)' },
    'dot-danger':  { 'background-color': 'var(--c-danger)' },
    sm: { 'font-size': '10px', padding: '1px 6px' },
    lg: { 'font-size': '12px', padding: '3px 10px' },
  },
});
