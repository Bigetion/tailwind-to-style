/**
 * Transition Duration Generator
 * Generates transition-duration utility classes
 */

import { generateCssString } from "../utils/index.js";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}duration`;

  const { transitionDuration = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(transitionDuration, (key, value) => {
      return `
          ${prefix}-${key} {
            transition-duration: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
