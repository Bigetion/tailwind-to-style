/**
 * Dynamic Animation System
 * Uses CSS variables for dynamic keyframe generation
 */

/* eslint-disable no-undef */

let animationStyleElement = null;
let animationCounter = 0;

/**
 * Initialize dynamic animation style element
 */
function initAnimationStyleElement() {
  if (typeof document === "undefined") return null;

  if (!animationStyleElement) {
    animationStyleElement = document.createElement("style");
    animationStyleElement.id = "twsx-dynamic-animations";
    animationStyleElement.setAttribute("data-twsx", "dynamic-animations");
    document.head.appendChild(animationStyleElement);
  }

  return animationStyleElement;
}

/**
 * Generate dynamic keyframe with CSS variables
 */
function generateDynamicKeyframe(name, keyframeObj, variables = {}) {
  let css = `@keyframes ${name} {\n`;

  for (const [percentage, styles] of Object.entries(keyframeObj)) {
    css += `  ${percentage} {\n`;

    if (typeof styles === "object") {
      for (const [prop, value] of Object.entries(styles)) {
        const cssProp = prop.replace(/([A-Z])/g, "-$1").toLowerCase();

        // Replace variables in value
        let finalValue = value;
        for (const [varName, varValue] of Object.entries(variables)) {
          finalValue = finalValue.replace(
            new RegExp(`\\$\\{${varName}\\}`, "g"),
            varValue
          );
        }

        css += `    ${cssProp}: ${finalValue};\n`;
      }
    }

    css += "  }\n";
  }

  css += "}\n";
  return css;
}

/**
 * Create dynamic animation with parameters
 */
export function createDynamicAnimation(baseKeyframes, parameters = {}) {
  const animationId = `dynamic-anim-${++animationCounter}`;
  const styleElement = initAnimationStyleElement();

  if (!styleElement) return null;

  // Generate keyframes with parameters
  const keyframeCSS = generateDynamicKeyframe(
    animationId,
    baseKeyframes,
    parameters
  );
  styleElement.textContent += keyframeCSS;

  return animationId;
}

/**
 * Predefined dynamic animation templates
 */
export const DYNAMIC_TEMPLATES = {
  slideIn: {
    keyframes: {
      "0%": {
        transform: "translate${direction}(${distance})",
        opacity: "${startOpacity}",
      },
      "100%": {
        transform: "translate${direction}(0)",
        opacity: "${endOpacity}",
      },
    },
    defaults: {
      direction: "Y",
      distance: "20px",
      startOpacity: "0",
      endOpacity: "1",
    },
  },

  scale: {
    keyframes: {
      "0%": {
        transform: "scale(${startScale})",
        opacity: "${startOpacity}",
      },
      "100%": {
        transform: "scale(${endScale})",
        opacity: "${endOpacity}",
      },
    },
    defaults: {
      startScale: "0.8",
      endScale: "1",
      startOpacity: "0",
      endOpacity: "1",
    },
  },

  rotate: {
    keyframes: {
      "0%": { transform: "rotate(${startAngle})" },
      "100%": { transform: "rotate(${endAngle})" },
    },
    defaults: {
      startAngle: "0deg",
      endAngle: "360deg",
    },
  },

  colorShift: {
    keyframes: {
      "0%": {
        backgroundColor: "${startColor}",
        color: "${startTextColor}",
      },
      "100%": {
        backgroundColor: "${endColor}",
        color: "${endTextColor}",
      },
    },
    defaults: {
      startColor: "transparent",
      endColor: "#3b82f6",
      startTextColor: "inherit",
      endTextColor: "white",
    },
  },
};

/**
 * Create animation from template
 */
export function createTemplateAnimation(templateName, customParams = {}) {
  const template = DYNAMIC_TEMPLATES[templateName];
  if (!template) return null;

  const params = { ...template.defaults, ...customParams };
  return createDynamicAnimation(template.keyframes, params);
}

/**
 * Apply dynamic animation to element
 */
export function applyDynamicAnimation(
  element,
  templateName,
  params = {},
  duration = 500
) {
  if (!element) return null;

  const animationName = createTemplateAnimation(templateName, params);
  if (!animationName) return null;

  element.style.animation = `${animationName} ${duration}ms ease-out forwards`;
  return animationName;
}

/**
 * Batch create animations with different parameters
 */
export function createAnimationVariants(templateName, variants = []) {
  return variants.map((variant) => ({
    name: createTemplateAnimation(templateName, variant.params),
    ...variant,
  }));
}

/**
 * Clear all dynamic animations
 */
export function clearDynamicAnimations() {
  if (animationStyleElement) {
    animationStyleElement.textContent = "";
    animationCounter = 0;
  }
}
