/**
 * Transition Delay Generator
 * Generates transition-delay utility classes
 */

import { generateCssString } from "../utils/index.js";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}delay`;

  const { transitionDelay = {} } = theme;

  const responsiveCssString = generateCssString(
    ({ getCssByOptions }) => {
      const cssString = getCssByOptions(transitionDelay, (key, value) => {
        return `
          ${prefix}-${key} {
            transition-delay: ${value};
          }
        `;
      });
      return cssString;
    },
    configOptions
  );

  return responsiveCssString;
}
