/**
 * Transition Timing Function Generator
 * Generates transition-timing-function utility classes (ease)
 */

import { generateCssString } from "../utils/index.js";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}ease`;

  const { transitionTimingFunction = {} } = theme;

  const responsiveCssString = generateCssString(
    ({ getCssByOptions }) => {
      const cssString = getCssByOptions(transitionTimingFunction, (key, value) => {
        if (key === "DEFAULT") {
          return ""; // Skip DEFAULT for ease
        }
        return `
          ${prefix}-${key} {
            transition-timing-function: ${value};
          }
        `;
      });
      return cssString;
    },
    configOptions
  );

  return responsiveCssString;
}
