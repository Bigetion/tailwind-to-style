// Browser-only entry point (excludes Node.js optimization APIs)

// Core styling functions
export { tws, twsx } from './index.js';
export { tv } from './tv.js';
export { default as createConfig } from './config/index.js';

// Utilities that work in browser
export { default as PatternGenerator } from './patterns/index.js';

// Note: React hooks and optimization APIs are excluded from browser build
// - React hooks require React to be available in the environment
// - Optimization APIs require Node.js environment (fs, path, etc.)
