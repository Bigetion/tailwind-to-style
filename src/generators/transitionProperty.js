/**
 * Transition Property Generator
 * Generates transition-property utility classes
 */

import { generateCssString } from "../utils/index.js";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}transition`;

  const { transitionProperty = {} } = theme;

  const responsiveCssString = generateCssString(
    ({ getCssByOptions }) => {
      const cssString = getCssByOptions(transitionProperty, (key, value) => {
        if (key === "DEFAULT") {
          return `
            ${globalPrefix}transition {
              transition-property: ${value};
              transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
              transition-duration: 150ms;
            }
          `;
        }
        return `
          ${prefix}-${key} {
            transition-property: ${value};
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 150ms;
          }
        `;
      });
      return cssString;
    },
    configOptions
  );

  return responsiveCssString;
}
