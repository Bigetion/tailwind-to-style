/**
 * Animation Generator
 * Generates animation utility classes
 * Note: Keyframes are defined in theme but not rendered here since inline styles
 * can't use @keyframes. The animation values should reference keyframe names that
 * are already defined in your global CSS.
 */

import { generateCssString } from "../utils/index.js";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}animate`;

  const { animation = {} } = theme;

  const responsiveCssString = generateCssString(
    ({ getCssByOptions }) => {
      const cssString = getCssByOptions(animation, (key, value) => {
        return `
          ${prefix}-${key} {
            animation: ${value};
          }
        `;
      });
      return cssString;
    },
    configOptions
  );

  return responsiveCssString;
}
