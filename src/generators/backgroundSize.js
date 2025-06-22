import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}bg`;

  const { backgroundSize = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      backgroundSize,
      (key, value) => `
          ${prefix}-${key} {
            background-size: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
