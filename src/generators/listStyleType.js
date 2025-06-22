import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}list`;

  const { listStyleType = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      listStyleType,
      (key, value) => `
          ${prefix}-${key} {
            list-style-type: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
