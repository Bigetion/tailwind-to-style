import { register } from 'tailwind-to-style/register';

register('@keyframes spin',      { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } });
register('@keyframes fadeIn',    { from: { opacity: '0', transform: 'translateY(6px)' }, to: { opacity: '1', transform: 'translateY(0)' } });
register('@keyframes slideDown', { from: { opacity: '0', transform: 'scaleY(0.95)', 'transform-origin': 'top' }, to: { opacity: '1', transform: 'scaleY(1)', 'transform-origin': 'top' } });
register('@keyframes pulse',     { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.4' } });
register('@keyframes shimmer',   { from: { 'background-position': '-200% 0' }, to: { 'background-position': '200% 0' } });
register('@keyframes toastIn',   { from: { opacity: '0', transform: 'translateX(100%)' }, to: { opacity: '1', transform: 'translateX(0)' } });
register('@keyframes overlayIn', { from: { opacity: '0' }, to: { opacity: '1' } });
register('@keyframes dialogIn',  { from: { opacity: '0', transform: 'scale(.95) translateY(-8px)' }, to: { opacity: '1', transform: 'scale(1) translateY(0)' } });
