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

  const { animation = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    // Merge theme animations with inline animations
    const allAnimations = {
      ...animation,
      // Add inline animations to the mix
      ...Object.keys(INLINE_ANIMATIONS).reduce((acc, key) => {
        acc[key] = `inline-${key}`; // Special marker for inline animations
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
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
