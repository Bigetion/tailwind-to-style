/**
 * Animation Generator
 * Generates animation utility classes with dynamic inline animations
 */

import { generateCssString } from "../utils/index.js";
import {
  INLINE_ANIMATIONS,
  animationToTransition,
} from "../utils/inlineAnimations.js";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}animate`;

  const { animation = {}, keyframes = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    // Generate keyframes first
    let keyframesCSS = "";
    for (const [name, keyframe] of Object.entries(keyframes)) {
      keyframesCSS += `@keyframes ${name} {\n`;
      for (const [percentage, styles] of Object.entries(keyframe)) {
        keyframesCSS += `  ${percentage} {\n`;
        for (const [prop, value] of Object.entries(styles)) {
          const cssProp = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
          keyframesCSS += `    ${cssProp}: ${value};\n`;
        }
        keyframesCSS += `  }\n`;
      }
      keyframesCSS += `}\n`;
    }

    // Merge theme animations with inline animations (but skip inline if keyframes exist)
    const allAnimations = {
      ...animation,
      // Add inline animations to the mix, but skip if keyframes version exists
      ...Object.keys(INLINE_ANIMATIONS).reduce((acc, key) => {
        // Check if keyframes version exists (both camelCase and kebab-case)
        const camelCaseKey = key.replace(/-([a-z])/g, (match, letter) =>
          letter.toUpperCase()
        );
        const hasKeyframes = keyframes[key] || keyframes[camelCaseKey];

        if (!hasKeyframes) {
          acc[key] = `inline-${key}`; // Special marker for inline animations
        }
        return acc;
      }, {}),
    };

    const cssString = getCssByOptions(allAnimations, (key, value) => {
      // Check if this is an inline animation
      if (value.startsWith("inline-")) {
        const animationKey = value.replace("inline-", "");
        const inlineAnimation = INLINE_ANIMATIONS[animationKey];

        if (inlineAnimation) {
          // Generate CSS for inline animation (initial state + transition)
          const transitionProps = animationToTransition(
            inlineAnimation.transition
          );
          const initialProps = inlineAnimation.initial;

          let css = `${prefix}-${key} {\n`;

          // Add initial state properties
          for (const [prop, val] of Object.entries(initialProps)) {
            const cssProp = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
            css += `  ${cssProp}: ${val};\n`;
          }

          // Add transition properties
          for (const [prop, val] of Object.entries(transitionProps)) {
            const cssProp = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
            css += `  ${cssProp}: ${val};\n`;
          }

          css += "}\n";

          // Add hover/active state for final animation
          css += `${prefix}-${key}:hover, ${prefix}-${key}.animate-active {\n`;
          for (const [prop, val] of Object.entries(inlineAnimation.final)) {
            const cssProp = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
            css += `  ${cssProp}: ${val};\n`;
          }
          css += "}\n";

          return css;
        }
      }

      // Fallback to traditional animation property
      return `
          ${prefix}-${key} {
            animation: ${value};
          }
        `;
    });

    // Combine keyframes and animation classes
    return keyframesCSS + cssString;
  }, configOptions);

  return responsiveCssString;
}
