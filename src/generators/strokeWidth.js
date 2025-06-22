import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}stroke`;

  const { strokeWidth = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      strokeWidth,
      (key, value) => `
          ${prefix}-${key} {
            stroke-width: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
