/**
 * useTws — React hook for inline Tailwind styles.
 *
 * @module tailwind-to-style/react/useTws
 */

import React from 'react';
import { tws } from '../core/tws.js';

/**
 * React hook that converts Tailwind classes to inline style objects.
 * Memoized for performance — only recomputes when classes change.
 *
 * @param {string} classes - Tailwind class string
 * @returns {Object} Style object suitable for React's style prop
 *
 * @example
 * import { useTws } from 'tailwind-to-style/react';
 *
 * function Box({ classes }) {
 *   const style = useTws(classes);
 *   return <div style={style}>Styled Box</div>;
 * }
 *
 * // <Box classes="bg-blue-500 p-4 rounded-lg" />
 */
export function useTws(classes) {
  return React.useMemo(() => {
    if (!classes || typeof classes !== 'string') return {};
    return tws(classes, true);
  }, [classes]);
}
