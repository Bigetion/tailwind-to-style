/**
 * Inline Animation System
 * Generate animation properties directly without keyframes
 */

/* eslint-disable no-undef */

/**
 * Convert animation config to inline transition properties
 */
export function animationToTransition(animationConfig) {
  const {
    property = "all",
    duration = 300,
    easing = "ease-out",
    delay = 0,
  } = animationConfig;

  return {
    transitionProperty: property,
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: easing,
    transitionDelay: `${delay}ms`,
  };
}

/**
 * Built-in animation configs that work with transitions
 */
export const INLINE_ANIMATIONS = {
  "fade-in": {
    initial: { opacity: 0 },
    final: { opacity: 1 },
    transition: { duration: 500, easing: "ease-out" },
  },

  "slide-up": {
    initial: { transform: "translateY(20px)", opacity: 0 },
    final: { transform: "translateY(0)", opacity: 1 },
    transition: { duration: 500, easing: "ease-out" },
  },

  "slide-down": {
    initial: { transform: "translateY(-20px)", opacity: 0 },
    final: { transform: "translateY(0)", opacity: 1 },
    transition: { duration: 500, easing: "ease-out" },
  },

  "zoom-in": {
    initial: { transform: "scale(0.8)", opacity: 0 },
    final: { transform: "scale(1)", opacity: 1 },
    transition: { duration: 400, easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
  },

  "zoom-out": {
    initial: { transform: "scale(1.2)", opacity: 0 },
    final: { transform: "scale(1)", opacity: 1 },
    transition: { duration: 400, easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
  },
};

/**
 * Apply inline animation to element
 */
export function applyInlineAnimation(element, animationName, options = {}) {
  if (!element || !INLINE_ANIMATIONS[animationName]) return null;

  const animation = INLINE_ANIMATIONS[animationName];
  const { autoStart = true, onComplete } = options;

  // Apply initial state
  Object.assign(element.style, animation.initial);

  // Apply transition properties
  const transitionProps = animationToTransition(animation.transition);
  Object.assign(element.style, transitionProps);

  if (autoStart) {
    // Trigger animation on next frame
    requestAnimationFrame(() => {
      Object.assign(element.style, animation.final);

      if (onComplete) {
        setTimeout(onComplete, animation.transition.duration);
      }
    });
  }

  return {
    start: () => Object.assign(element.style, animation.final),
    reset: () => Object.assign(element.style, animation.initial),
    animation,
  };
}

/**
 * Create custom inline animation
 */
export function createInlineAnimation(initial, final, transition = {}) {
  return {
    initial,
    final,
    transition: {
      duration: 300,
      easing: "ease-out",
      delay: 0,
      ...transition,
    },
  };
}

/**
 * Animate element with custom properties
 */
export function animateElement(element, fromProps, toProps, options = {}) {
  if (!element) return null;

  const {
    duration = 300,
    easing = "ease-out",
    delay = 0,
    onComplete,
  } = options;

  // Apply initial state
  Object.assign(element.style, fromProps);

  // Apply transition
  element.style.transition = `all ${duration}ms ${easing} ${delay}ms`;

  // Trigger animation
  requestAnimationFrame(() => {
    Object.assign(element.style, toProps);

    if (onComplete) {
      setTimeout(onComplete, duration + delay);
    }
  });

  return {
    element,
    duration: duration + delay,
  };
}

/**
 * Chain multiple animations
 */
export function chainAnimations(element, animations, options = {}) {
  if (!element || !animations.length) return Promise.resolve();

  const { onProgress } = options;
  let currentIndex = 0;

  return new Promise((resolve) => {
    function runNext() {
      if (currentIndex >= animations.length) {
        resolve();
        return;
      }

      const animation = animations[currentIndex];
      animateElement(element, animation.from, animation.to, {
        ...animation.options,
        onComplete: () => {
          if (onProgress) {
            onProgress(currentIndex, animations.length);
          }
          currentIndex++;
          runNext();
        },
      });
    }

    runNext();
  });
}

/**
 * Stagger animations for multiple elements
 */
export function staggerAnimations(elements, animationName, options = {}) {
  const { staggerDelay = 100, ...animationOptions } = options;

  return elements.map((element, index) => {
    return setTimeout(() => {
      applyInlineAnimation(element, animationName, animationOptions);
    }, index * staggerDelay);
  });
}
