import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}bg-opacity`;

  const { backgroundOpacity = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      backgroundOpacity,
      (key, value) => `
          ${prefix}-${key} {
            --bg-opacity: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
