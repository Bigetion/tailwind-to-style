import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}aspect`;

  const { spacing = {}, aspectRatio = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    // Generate aspect-ratio utilities (aspect-auto, aspect-square, aspect-video, etc.)
    let cssString = getCssByOptions(
      aspectRatio,
      (key, value) => {
        if (value === "custom_value") {
          return `
            ${prefix}-${key} {
              aspect-ratio: ${value};
            }
          `;
        }
        return `
          ${prefix}-${key} {
            aspect-ratio: ${value};
          }
        `;
      }
    );

    // Generate legacy aspect-h and aspect-w utilities
    cssString += getCssByOptions(
      spacing,
      (key) => `
          ${prefix}-h-${key} {
            --aspect-h: ${key};
          }
          ${prefix}-w-${key} {
            position: relative;
            padding-bottom: calc(var(--aspect-h) / var(--aspect-w) * 100%);
            --aspect-w: ${key};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
