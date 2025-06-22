import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}h`;

  const { height = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      height,
      (key, value) => `
          ${prefix}-${key} {
            height: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
