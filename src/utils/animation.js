/**
 * Unified Animation System
 * 
 * Consolidates three animation approaches into one API:
 * - CSS Transitions (simple property changes)
 * - CSS Keyframe Animations (complex multi-step)
 * - Web Animations API (programmatic control)
 * 
 * @module animation
 */

// ============================================================================
// Animation Presets
// ============================================================================

export const ANIMATION_PRESETS = {
  // Fade animations
  fadeIn: {
    keyframes: [
      { opacity: 0 },
      { opacity: 1 }
    ],
    options: { duration: 300, easing: 'ease-out', fill: 'forwards' }
  },
  fadeOut: {
    keyframes: [
      { opacity: 1 },
      { opacity: 0 }
    ],
    options: { duration: 300, easing: 'ease-out', fill: 'forwards' }
  },

  // Slide animations
  slideUp: {
    keyframes: [
      { transform: 'translateY(20px)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 }
    ],
    options: { duration: 400, easing: 'ease-out', fill: 'forwards' }
  },
  slideDown: {
    keyframes: [
      { transform: 'translateY(-20px)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 }
    ],
    options: { duration: 400, easing: 'ease-out', fill: 'forwards' }
  },
  slideLeft: {
    keyframes: [
      { transform: 'translateX(20px)', opacity: 0 },
      { transform: 'translateX(0)', opacity: 1 }
    ],
    options: { duration: 400, easing: 'ease-out', fill: 'forwards' }
  },
  slideRight: {
    keyframes: [
      { transform: 'translateX(-20px)', opacity: 0 },
      { transform: 'translateX(0)', opacity: 1 }
    ],
    options: { duration: 400, easing: 'ease-out', fill: 'forwards' }
  },

  // Scale animations
  zoomIn: {
    keyframes: [
      { transform: 'scale(0.8)', opacity: 0 },
      { transform: 'scale(1)', opacity: 1 }
    ],
    options: { duration: 300, easing: 'ease-out', fill: 'forwards' }
  },
  zoomOut: {
    keyframes: [
      { transform: 'scale(1)', opacity: 1 },
      { transform: 'scale(0.8)', opacity: 0 }
    ],
    options: { duration: 300, easing: 'ease-out', fill: 'forwards' }
  },

  // Bounce animations
  bounce: {
    keyframes: [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-20px)' },
      { transform: 'translateY(0)' },
      { transform: 'translateY(-10px)' },
      { transform: 'translateY(0)' }
    ],
    options: { duration: 600, easing: 'ease-out', fill: 'forwards' }
  },

  // Shake animation
  shake: {
    keyframes: [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-10px)' },
      { transform: 'translateX(10px)' },
      { transform: 'translateX(-10px)' },
      { transform: 'translateX(10px)' },
      { transform: 'translateX(0)' }
    ],
    options: { duration: 400, easing: 'ease-in-out', fill: 'forwards' }
  },

  // Pulse animation
  pulse: {
    keyframes: [
      { transform: 'scale(1)' },
      { transform: 'scale(1.05)' },
      { transform: 'scale(1)' }
    ],
    options: { duration: 300, easing: 'ease-in-out', fill: 'forwards' }
  },

  // Spin animation
  spin: {
    keyframes: [
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(360deg)' }
    ],
    options: { duration: 1000, easing: 'linear', iterations: Infinity }
  },

  // Flip animations
  flipX: {
    keyframes: [
      { transform: 'perspective(400px) rotateX(90deg)', opacity: 0 },
      { transform: 'perspective(400px) rotateX(0)', opacity: 1 }
    ],
    options: { duration: 500, easing: 'ease-out', fill: 'forwards' }
  },
  flipY: {
    keyframes: [
      { transform: 'perspective(400px) rotateY(90deg)', opacity: 0 },
      { transform: 'perspective(400px) rotateY(0)', opacity: 1 }
    ],
    options: { duration: 500, easing: 'ease-out', fill: 'forwards' }
  },

  // Enter/Exit pairs for components
  enterScale: {
    keyframes: [
      { transform: 'scale(0.95)', opacity: 0 },
      { transform: 'scale(1)', opacity: 1 }
    ],
    options: { duration: 200, easing: 'ease-out', fill: 'forwards' }
  },
  exitScale: {
    keyframes: [
      { transform: 'scale(1)', opacity: 1 },
      { transform: 'scale(0.95)', opacity: 0 }
    ],
    options: { duration: 150, easing: 'ease-in', fill: 'forwards' }
  },

  // Attention seekers
  wiggle: {
    keyframes: [
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(-3deg)' },
      { transform: 'rotate(3deg)' },
      { transform: 'rotate(-3deg)' },
      { transform: 'rotate(3deg)' },
      { transform: 'rotate(0deg)' }
    ],
    options: { duration: 500, easing: 'ease-in-out', fill: 'forwards' }
  },
  
  heartbeat: {
    keyframes: [
      { transform: 'scale(1)' },
      { transform: 'scale(1.15)' },
      { transform: 'scale(1)' },
      { transform: 'scale(1.15)' },
      { transform: 'scale(1)' }
    ],
    options: { duration: 800, easing: 'ease-in-out', fill: 'forwards' }
  },
};

// ============================================================================
// Easing Presets (Spring Physics & Custom)
// ============================================================================

export const EASING = {
  // Standard
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',

  // Spring-like (cubic-bezier approximations)
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  springLight: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  springMedium: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  springHeavy: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',

  // Smooth
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  smoothIn: 'cubic-bezier(0.4, 0, 1, 1)',
  smoothOut: 'cubic-bezier(0, 0, 0.2, 1)',

  // Expressive
  bounce: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  
  // Anticipation
  anticipate: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
  overshoot: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};

// ============================================================================
// Animation Controller
// ============================================================================

/**
 * Active animations registry for cancel/control
 */
const activeAnimations = new Map();

/**
 * Generate unique animation ID
 */
let animationCounter = 0;
function generateAnimId() {
  return `anim-${++animationCounter}-${Date.now()}`;
}

// ============================================================================
// Core Animation Function
// ============================================================================

/**
 * Apply animation to an element
 * 
 * @param {HTMLElement} element - Target element
 * @param {string|object} animation - Animation name or config
 * @param {object} options - Override options
 * @returns {AnimationController} Animation controller with play/pause/cancel
 * 
 * @example
 * // Using preset name
 * animate(element, 'fadeIn')
 * 
 * // Using preset with options override
 * animate(element, 'slideUp', { duration: 600 })
 * 
 * // Using custom keyframes
 * animate(element, {
 *   keyframes: [{ opacity: 0 }, { opacity: 1 }],
 *   options: { duration: 500 }
 * })
 * 
 * // With event callbacks
 * const ctrl = animate(element, 'fadeIn', {
 *   onStart: () => console.log('started'),
 *   onComplete: () => console.log('done'),
 *   onCancel: () => console.log('cancelled')
 * })
 * 
 * // Control animation
 * ctrl.pause()
 * ctrl.play()
 * ctrl.reverse()
 * ctrl.cancel()
 * await ctrl.finished
 */
export function animate(element, animation, options = {}) {
  // Extract callbacks from options
  const { 
    onStart, 
    onComplete, 
    onCancel,
    id: customId,
    ...animOptions 
  } = options;

  if (!element || typeof element.animate !== 'function') {
    console.warn('[animation] Element does not support Web Animations API');
    return createNullController();
  }

  let keyframes, finalOptions;

  // Resolve animation config
  if (typeof animation === 'string') {
    const preset = ANIMATION_PRESETS[animation];
    if (!preset) {
      console.warn(`[animation] Unknown preset: ${animation}`);
      return createNullController();
    }
    keyframes = preset.keyframes;
    finalOptions = { ...preset.options, ...animOptions };
  } else if (animation && animation.keyframes) {
    keyframes = animation.keyframes;
    finalOptions = { ...(animation.options || {}), ...animOptions };
  } else {
    console.warn('[animation] Invalid animation config');
    return createNullController();
  }

  // Resolve easing if using preset name
  if (typeof finalOptions.easing === 'string' && EASING[finalOptions.easing]) {
    finalOptions.easing = EASING[finalOptions.easing];
  }

  try {
    const anim = element.animate(keyframes, finalOptions);
    const id = customId || generateAnimId();

    // Register animation
    activeAnimations.set(id, anim);

    // Fire onStart callback
    if (onStart) {
      requestAnimationFrame(() => onStart(anim));
    }

    // Handle completion
    anim.finished
      .then(() => {
        activeAnimations.delete(id);
        if (onComplete) onComplete(anim);
      })
      .catch(() => {
        activeAnimations.delete(id);
        if (onCancel) onCancel(anim);
      });

    // Return controller
    return createController(anim, id, element, keyframes, finalOptions);
  } catch (err) {
    console.error('[animation] Failed to animate:', err);
    return createNullController();
  }
}

/**
 * Create animation controller with enhanced methods
 */
function createController(anim, id, element, keyframes, options) {
  return {
    id,
    animation: anim,
    
    get playState() { return anim.playState; },
    get currentTime() { return anim.currentTime; },
    set currentTime(t) { anim.currentTime = t; },
    get finished() { return anim.finished; },
    get pending() { return anim.pending; },
    
    play() { anim.play(); return this; },
    pause() { anim.pause(); return this; },
    cancel() { 
      anim.cancel(); 
      activeAnimations.delete(id);
      return this; 
    },
    finish() { anim.finish(); return this; },
    reverse() { anim.reverse(); return this; },
    
    // Seek to specific progress (0-1)
    seek(progress) {
      const duration = options.duration || 300;
      anim.currentTime = progress * duration;
      return this;
    },
    
    // Update playback rate
    setSpeed(rate) {
      anim.playbackRate = rate;
      return this;
    },
    
    // Replay animation from start
    replay() {
      anim.cancel();
      const newAnim = element.animate(keyframes, options);
      activeAnimations.set(id, newAnim);
      return createController(newAnim, id, element, keyframes, options);
    },
    
    // Wait for animation to finish
    then(resolve, reject) {
      return anim.finished.then(resolve, reject);
    },
  };
}

/**
 * Create null controller for error cases
 */
function createNullController() {
  const noop = () => {};
  const nullCtrl = {
    id: null,
    animation: null,
    playState: 'idle',
    currentTime: 0,
    finished: Promise.resolve(),
    pending: false,
    play: () => nullCtrl,
    pause: () => nullCtrl,
    cancel: () => nullCtrl,
    finish: () => nullCtrl,
    reverse: () => nullCtrl,
    seek: () => nullCtrl,
    setSpeed: () => nullCtrl,
    replay: () => nullCtrl,
    then: (resolve) => Promise.resolve().then(resolve),
  };
  return nullCtrl;
}

// ============================================================================
// Chain Animations
// ============================================================================

/**
 * Chain multiple animations sequentially
 * 
 * @param {HTMLElement} element - Target element
 * @param {Array} animations - Array of animation configs
 * @param {object} chainOptions - Chain options
 * @returns {ChainController} Controller for the chain
 * 
 * @example
 * // Basic chain
 * await chain(element, ['fadeIn', 'pulse', 'fadeOut'])
 * 
 * // With delays and options
 * const ctrl = chain(element, [
 *   'fadeIn',
 *   { name: 'pulse', delay: 100, options: { iterations: 2 } },
 *   'fadeOut'
 * ])
 * 
 * // Cancel chain
 * ctrl.cancel()
 */
export function chain(element, animations, chainOptions = {}) {
  const { onStepComplete, onComplete, onCancel } = chainOptions;
  
  let cancelled = false;
  let currentController = null;
  let currentStep = 0;

  const promise = (async () => {
    for (const anim of animations) {
      if (cancelled) break;
      
      let name, delay = 0, options = {};

      if (typeof anim === 'string') {
        name = anim;
      } else if (anim.name) {
        name = anim.name;
        delay = anim.delay || 0;
        options = anim.options || {};
      } else {
        name = anim;
      }

      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      if (cancelled) break;

      currentController = animate(element, name, options);
      if (currentController && currentController.animation) {
        await currentController.finished;
        if (onStepComplete) onStepComplete(currentStep, name);
      }
      currentStep++;
    }
    
    if (!cancelled && onComplete) onComplete();
  })();

  // Return chain controller
  return {
    get currentStep() { return currentStep; },
    get totalSteps() { return animations.length; },
    get progress() { return currentStep / animations.length; },
    
    cancel() {
      cancelled = true;
      if (currentController) currentController.cancel();
      if (onCancel) onCancel(currentStep);
    },
    
    finished: promise,
    then: (resolve, reject) => promise.then(resolve, reject),
  };
}

// ============================================================================
// Stagger Animations
// ============================================================================

/**
 * Apply staggered animation to multiple elements
 * 
 * @param {HTMLElement[]|NodeList} elements - Target elements
 * @param {string|object} animation - Animation to apply
 * @param {object} options - Stagger options
 * @returns {StaggerController} Controller with waitAll
 * 
 * @example
 * // Basic stagger
 * stagger(listItems, 'slideUp', { delay: 50 })
 * 
 * // Wait for all to complete
 * await stagger(listItems, 'fadeIn', { delay: 30 }).waitAll()
 * 
 * // With callbacks
 * stagger(items, 'zoomIn', {
 *   delay: 40,
 *   onEach: (index) => console.log(`Item ${index} animated`),
 *   onAllComplete: () => console.log('All done!')
 * })
 */
export function stagger(elements, animation, options = {}) {
  const { 
    delay = 50, 
    from = 'start', // 'start' | 'end' | 'center' | 'random'
    onEach,
    onAllComplete,
    ...animOptions 
  } = options;
  
  let elementArray = Array.from(elements);
  
  // Apply stagger direction
  if (from === 'end') {
    elementArray = elementArray.reverse();
  } else if (from === 'center') {
    const mid = Math.floor(elementArray.length / 2);
    const reordered = [];
    for (let i = 0; i <= mid; i++) {
      if (elementArray[mid - i]) reordered.push({ el: elementArray[mid - i], dist: i });
      if (i !== 0 && elementArray[mid + i]) reordered.push({ el: elementArray[mid + i], dist: i });
    }
    reordered.sort((a, b) => a.dist - b.dist);
    elementArray = reordered.map(x => x.el);
  } else if (from === 'random') {
    elementArray = elementArray.sort(() => Math.random() - 0.5);
  }

  const controllers = [];

  elementArray.forEach((element, index) => {
    const staggeredOptions = {
      ...animOptions,
      delay: (animOptions.delay || 0) + (index * delay),
      onComplete: () => {
        if (onEach) onEach(index, element);
      }
    };

    const ctrl = animate(element, animation, staggeredOptions);
    if (ctrl) {
      controllers.push(ctrl);
    }
  });

  // Return stagger controller
  return {
    controllers,
    
    get count() { return controllers.length; },
    
    // Cancel all animations
    cancelAll() {
      controllers.forEach(ctrl => ctrl.cancel());
      return this;
    },
    
    // Pause all animations
    pauseAll() {
      controllers.forEach(ctrl => ctrl.pause());
      return this;
    },
    
    // Play all animations
    playAll() {
      controllers.forEach(ctrl => ctrl.play());
      return this;
    },
    
    // Reverse all animations
    reverseAll() {
      controllers.forEach(ctrl => ctrl.reverse());
      return this;
    },
    
    // Set speed for all
    setSpeedAll(rate) {
      controllers.forEach(ctrl => ctrl.setSpeed(rate));
      return this;
    },
    
    // Wait for all animations to complete
    async waitAll() {
      await Promise.all(controllers.map(c => c.finished));
      if (onAllComplete) onAllComplete();
    },
    
    // Promise interface
    then(resolve, reject) {
      return Promise.all(controllers.map(c => c.finished)).then(resolve, reject);
    },
  };
}

// ============================================================================
// CSS Keyframes Generator
// ============================================================================

let keyframeCounter = 0;
const injectedKeyframes = new Set();

/**
 * Create CSS keyframes and return animation CSS
 * 
 * @param {string} name - Keyframe name
 * @param {object} frames - Keyframe definitions
 * @returns {string} CSS animation value
 * 
 * @example
 * const animation = createKeyframes('myAnim', {
 *   '0%': { opacity: 0 },
 *   '50%': { opacity: 0.5 },
 *   '100%': { opacity: 1 }
 * })
 * // Returns: "myAnim 500ms ease-out forwards"
 */
export function createKeyframes(name, frames, options = {}) {
  const {
    duration = 500,
    easing = 'ease-out',
    fill = 'forwards',
    iterations = 1,
    inject = true
  } = options;

  const keyframeName = name || `anim-${++keyframeCounter}`;

  if (inject && typeof document !== 'undefined' && !injectedKeyframes.has(keyframeName)) {
    let css = `@keyframes ${keyframeName} {\n`;
    
    for (const [key, value] of Object.entries(frames)) {
      const props = Object.entries(value)
        .map(([k, v]) => `${camelToKebab(k)}: ${v}`)
        .join('; ');
      css += `  ${key} { ${props} }\n`;
    }
    css += '}';

    const style = document.createElement('style');
    style.textContent = css;
    style.setAttribute('data-animation', keyframeName);
    document.head.appendChild(style);

    injectedKeyframes.add(keyframeName);
  }

  const iterationValue = iterations === Infinity ? 'infinite' : iterations;
  return `${keyframeName} ${duration}ms ${easing} ${fill} ${iterationValue}`.trim();
}

// ============================================================================
// Transition Helper
// ============================================================================

/**
 * Apply CSS transition to element
 * 
 * @param {HTMLElement} element - Target element
 * @param {object} properties - CSS properties to transition to
 * @param {object} options - Transition options
 * @returns {Promise<void>}
 * 
 * @example
 * transition(element, { opacity: 0, transform: 'scale(0.9)' }, { duration: 300 })
 */
export function transition(element, properties, options = {}) {
  const {
    duration = 300,
    easing = 'ease-out',
    delay = 0
  } = options;

  return new Promise(resolve => {
    const propNames = Object.keys(properties).map(camelToKebab);
    
    element.style.transition = propNames
      .map(prop => `${prop} ${duration}ms ${easing} ${delay}ms`)
      .join(', ');

    // Apply properties
    Object.assign(element.style, properties);

    // Wait for transition end
    const onEnd = () => {
      element.removeEventListener('transitionend', onEnd);
      resolve();
    };

    element.addEventListener('transitionend', onEnd);

    // Fallback timeout
    setTimeout(resolve, duration + delay + 50);
  });
}

// ============================================================================
// Utilities
// ============================================================================

function camelToKebab(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/**
 * Check if Web Animations API is supported
 */
export function isSupported() {
  return typeof Element !== 'undefined' && 
         typeof Element.prototype.animate === 'function';
}

/**
 * Clear injected keyframes
 */
export function clearKeyframes() {
  if (typeof document === 'undefined') return;
  
  injectedKeyframes.forEach(name => {
    const style = document.querySelector(`style[data-animation="${name}"]`);
    if (style) style.remove();
  });
  injectedKeyframes.clear();
}

/**
 * Cancel all active animations
 */
export function cancelAll() {
  activeAnimations.forEach((anim) => {
    try {
      anim.cancel();
    } catch (e) {
      // Ignore errors for already finished animations
    }
  });
  activeAnimations.clear();
}

/**
 * Get count of active animations
 */
export function getActiveCount() {
  return activeAnimations.size;
}

/**
 * Run multiple animations in parallel
 * 
 * @param {Array<{element: HTMLElement, animation: string|object, options?: object}>} configs
 * @returns {Promise<AnimationController[]>}
 * 
 * @example
 * await parallel([
 *   { element: el1, animation: 'fadeIn' },
 *   { element: el2, animation: 'slideUp', options: { duration: 500 } }
 * ])
 */
export async function parallel(configs) {
  const controllers = configs.map(({ element, animation: anim, options }) => 
    animate(element, anim, options)
  );
  
  await Promise.all(controllers.map(c => c.finished));
  
  return controllers;
}

/**
 * Create a custom animation preset
 * 
 * @param {string} name - Preset name
 * @param {object} config - Animation config
 * 
 * @example
 * registerPreset('myFade', {
 *   keyframes: [{ opacity: 0 }, { opacity: 1 }],
 *   options: { duration: 400, easing: 'spring' }
 * })
 * 
 * animate(element, 'myFade')
 */
export function registerPreset(name, config) {
  if (ANIMATION_PRESETS[name]) {
    console.warn(`[animation] Overwriting existing preset: ${name}`);
  }
  ANIMATION_PRESETS[name] = config;
}

/**
 * Get all available preset names
 */
export function getPresetNames() {
  return Object.keys(ANIMATION_PRESETS);
}

// ============================================================================
// Unified Export
// ============================================================================

export const animation = {
  // Core
  animate,
  chain,
  stagger,
  parallel,
  transition,

  // Keyframes
  createKeyframes,
  clearKeyframes,

  // Presets
  presets: ANIMATION_PRESETS,
  easing: EASING,
  registerPreset,
  getPresetNames,

  // Control
  cancelAll,
  getActiveCount,

  // Utils
  isSupported,
};

export default animation;
