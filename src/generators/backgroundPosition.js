import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}bg`;

  const { backgroundPosition = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      backgroundPosition,
      (key, value) => `
          ${prefix}-${key} {
            background-position: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
