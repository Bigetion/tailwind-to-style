/**
 * tailwind-to-style/animations — Animation Presets & Utilities
 *
 * Provides pre-built animations and custom animation support
 * powered by the Web Animations API with CSS class injection fallback.
 *
 * @module tailwind-to-style/animations
 */

import { twsxClassName } from '../className/index.js';

// ============================================================================
// Animation Presets
// ============================================================================

const PRESETS = {
  fadeIn: {
    keyframes: [
      { opacity: '0' },
      { opacity: '1' },
    ],
    duration: '300ms',
    easing: 'ease-out',
  },
  fadeOut: {
    keyframes: [
      { opacity: '1' },
      { opacity: '0' },
    ],
    duration: '300ms',
    easing: 'ease-in',
  },
  slideInUp: {
    keyframes: [
      { transform: 'translateY(20px)', opacity: '0' },
      { transform: 'translateY(0)', opacity: '1' },
    ],
    duration: '400ms',
    easing: 'ease-out',
  },
  slideInDown: {
    keyframes: [
      { transform: 'translateY(-20px)', opacity: '0' },
      { transform: 'translateY(0)', opacity: '1' },
    ],
    duration: '400ms',
    easing: 'ease-out',
  },
  slideInLeft: {
    keyframes: [
      { transform: 'translateX(-20px)', opacity: '0' },
      { transform: 'translateX(0)', opacity: '1' },
    ],
    duration: '400ms',
    easing: 'ease-out',
  },
  slideInRight: {
    keyframes: [
      { transform: 'translateX(20px)', opacity: '0' },
      { transform: 'translateX(0)', opacity: '1' },
    ],
    duration: '400ms',
    easing: 'ease-out',
  },
  scaleIn: {
    keyframes: [
      { transform: 'scale(0.9)', opacity: '0' },
      { transform: 'scale(1)', opacity: '1' },
    ],
    duration: '300ms',
    easing: 'ease-out',
  },
  scaleOut: {
    keyframes: [
      { transform: 'scale(1)', opacity: '1' },
      { transform: 'scale(0.9)', opacity: '0' },
    ],
    duration: '300ms',
    easing: 'ease-in',
  },
  bounce: {
    keyframes: [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-10px)' },
      { transform: 'translateY(0)' },
      { transform: 'translateY(-5px)' },
      { transform: 'translateY(0)' },
    ],
    duration: '600ms',
    easing: 'ease-in-out',
  },
  shake: {
    keyframes: [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-5px)' },
      { transform: 'translateX(5px)' },
      { transform: 'translateX(-5px)' },
      { transform: 'translateX(5px)' },
      { transform: 'translateX(0)' },
    ],
    duration: '500ms',
    easing: 'ease-in-out',
  },
  pulse: {
    keyframes: [
      { transform: 'scale(1)' },
      { transform: 'scale(1.05)' },
      { transform: 'scale(1)' },
    ],
    duration: '600ms',
    easing: 'ease-in-out',
  },
  spin: {
    keyframes: [
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(360deg)' },
    ],
    duration: '1000ms',
    easing: 'linear',
    iterations: 'infinite',
  },
  ping: {
    keyframes: [
      { transform: 'scale(1)', opacity: '1' },
      { transform: 'scale(2)', opacity: '0' },
    ],
    duration: '1000ms',
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
    iterations: 'infinite',
  },
};

// Custom animation registry
const customAnimations = new Map();

// Injected keyframe style element
let styleElement = null;
let injectedKeyframes = new Set();

// ============================================================================
// Public API
// ============================================================================

/**
 * Apply an animation by name. Injects a CSS class with @keyframes and returns the className.
 *
 * @param {string} name - Animation preset name or custom animation name
 * @param {Object} [options] - Override options
 * @param {string} [options.duration] - Animation duration
 * @param {string} [options.easing] - Animation easing
 * @param {string} [options.delay] - Animation delay
 * @param {string|number} [options.iterations] - Iteration count
 * @param {string} [options.fillMode] - Animation fill mode (default: "both")
 * @returns {string} Class name with animation applied
 *
 * @example
 * import { animate } from 'tailwind-to-style/animations';
 *
 * const cls = animate('fadeIn');
 * element.className = cls; // applies fade-in animation via CSS class
 *
 * const cls2 = animate('slideInUp', { duration: '500ms', delay: '100ms' });
 */
export function animate(name, options = {}) {
  const preset = customAnimations.get(name) || PRESETS[name];
  if (!preset) {
    throw new Error(`[tailwind-to-style/animations] Unknown animation: "${name}". Available: ${getAnimationNames().join(', ')}`);
  }

  const {
    duration = preset.duration || '300ms',
    easing = preset.easing || 'ease',
    delay = preset.delay || '0ms',
    iterations = preset.iterations || '1',
    fillMode = preset.fillMode || 'both',
  } = options;

  const keyframeName = `tws-anim-${name}`;

  // Inject keyframes if not already
  injectKeyframes(keyframeName, preset.keyframes);

  // Generate a CSS class with the animation property
  const animationValue = `${keyframeName} ${duration} ${easing} ${delay} ${iterations} ${fillMode}`;

  const className = twsxClassName({
    name: `anim-${name}`,
    _: `[animation:${animationValue.replace(/\s+/g, '_')}]`,
  });

  return className;
}

/**
 * Define a custom animation that can be used with animate().
 *
 * @param {string} name - Animation name
 * @param {Object} config - Animation configuration
 * @param {Array} config.keyframes - Array of keyframe objects
 * @param {string} [config.duration] - Default duration
 * @param {string} [config.easing] - Default easing
 * @param {string} [config.delay] - Default delay
 * @param {string|number} [config.iterations] - Default iteration count
 *
 * @example
 * defineAnimation('wiggle', {
 *   keyframes: [
 *     { transform: 'rotate(0deg)' },
 *     { transform: 'rotate(-3deg)' },
 *     { transform: 'rotate(3deg)' },
 *     { transform: 'rotate(0deg)' },
 *   ],
 *   duration: '300ms',
 *   easing: 'ease-in-out',
 * });
 *
 * animate('wiggle'); // Now works!
 */
export function defineAnimation(name, config) {
  if (!name || typeof name !== 'string') {
    throw new Error('[tailwind-to-style/animations] Animation name must be a non-empty string.');
  }
  if (!config || !Array.isArray(config.keyframes) || config.keyframes.length < 2) {
    throw new Error('[tailwind-to-style/animations] Animation config must have a keyframes array with at least 2 frames.');
  }
  customAnimations.set(name, config);
}

/**
 * Get all available animation names (built-in + custom).
 * @returns {string[]} Array of animation names
 */
export function getAnimationNames() {
  return [...Object.keys(PRESETS), ...customAnimations.keys()];
}

/**
 * Get a preset config by name.
 * @param {string} name - Preset name
 * @returns {Object|undefined} Preset config
 */
export function getPreset(name) {
  return customAnimations.get(name) || PRESETS[name] || undefined;
}

/**
 * Remove all injected animation keyframes and clear custom animations.
 */
export function clearAnimations() {
  customAnimations.clear();
  injectedKeyframes.clear();
  if (styleElement) {
    styleElement.textContent = '';
  }
}

// ============================================================================
// Internal Helpers
// ============================================================================

function injectKeyframes(name, keyframes) {
  if (injectedKeyframes.has(name)) return;
  if (typeof document === 'undefined') return;

  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.setAttribute('data-tws-animations', '');
    document.head.appendChild(styleElement);
  }

  const frames = keyframes
    .map((frame, i) => {
      const percent = keyframes.length === 1
        ? '100%'
        : `${Math.round((i / (keyframes.length - 1)) * 100)}%`;
      const props = Object.entries(frame)
        .map(([prop, val]) => `${camelToKebab(prop)}: ${val}`)
        .join('; ');
      return `  ${percent} { ${props}; }`;
    })
    .join('\n');

  const css = `@keyframes ${name} {\n${frames}\n}\n`;
  styleElement.textContent += css;
  injectedKeyframes.add(name);
}

function camelToKebab(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

// ============================================================================
// Exports
// ============================================================================

export { PRESETS as ANIMATION_PRESETS };
