import { generateCssString } from "../utils/index.js";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}mix-blend`;

  const propertyOptions = [
    "normal",
    "multiply",
    "screen",
    "overlay",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "hue",
    "saturation",
    "color",
    "luminosity",
    "plus-lighter",
  ];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    let cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            mix-blend-mode: ${value};
          }
        `
    );
    cssString += getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix.replace("mix", "bg")}-${key} {
            background-blend-mode: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
