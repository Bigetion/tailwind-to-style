/**
 * Web Animations API Integration
 * Dynamic animations without keyframes injection
 */

/* eslint-disable no-undef */

/**
 * Built-in animation definitions using Web Animations API
 */
const BUILTIN_ANIMATIONS = {
  spin: {
    keyframes: [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    options: { duration: 1000, iterations: Infinity },
  },

  ping: {
    keyframes: [
      { transform: "scale(1)", opacity: 1 },
      { transform: "scale(2)", opacity: 0 },
    ],
    options: { duration: 1000, iterations: Infinity },
  },

  pulse: {
    keyframes: [{ opacity: 1 }, { opacity: 0.5 }, { opacity: 1 }],
    options: { duration: 2000, iterations: Infinity },
  },

  bounce: {
    keyframes: [
      {
        transform: "translateY(0)",
        animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
      },
      {
        transform: "translateY(-25%)",
        animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
      },
      {
        transform: "translateY(0)",
        animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
      },
    ],
    options: { duration: 1000, iterations: Infinity },
  },

  "fade-in": {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    options: { duration: 500, fill: "forwards" },
  },

  "slide-up": {
    keyframes: [
      { transform: "translateY(20px)", opacity: 0 },
      { transform: "translateY(0)", opacity: 1 },
    ],
    options: { duration: 500, fill: "forwards" },
  },
};

/**
 * Apply animation using Web Animations API
 */
export function applyWebAnimation(
  element,
  animationName,
  customAnimations = {}
) {
  if (!element || typeof element.animate !== "function") return null;

  const animation =
    BUILTIN_ANIMATIONS[animationName] || customAnimations[animationName];
  if (!animation) return null;

  return element.animate(animation.keyframes, animation.options);
}

/**
 * Create animation observer for elements with animation classes
 */
export function createAnimationObserver(customAnimations = {}) {
  if (typeof MutationObserver === "undefined") return null;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          processAnimationElements(node, customAnimations);
        }
      });

      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        processAnimationElements(mutation.target, customAnimations);
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  });

  return observer;
}

/**
 * Process elements for animation classes
 */
function processAnimationElements(element, customAnimations = {}) {
  if (!element.classList) return;

  const animationClasses = Array.from(element.classList)
    .filter((cls) => cls.startsWith("animate-"))
    .map((cls) => cls.replace("animate-", ""));

  animationClasses.forEach((animationName) => {
    applyWebAnimation(element, animationName, customAnimations);
  });
}

/**
 * Initialize web animations for existing elements
 */
export function initWebAnimations(customAnimations = {}) {
  if (typeof document === "undefined") return;

  // Process existing elements
  const animatedElements = document.querySelectorAll('[class*="animate-"]');
  animatedElements.forEach((element) => {
    processAnimationElements(element, customAnimations);
  });

  // Create observer for new elements
  return createAnimationObserver(customAnimations);
}
