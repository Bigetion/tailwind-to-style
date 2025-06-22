import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}size`;

  const { size = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      size,
      (key, value) => `
          ${prefix}-${key} {
            width: ${value};
            height: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
