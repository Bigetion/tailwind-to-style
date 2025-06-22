import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}flex`;

  const { flex = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      flex,
      (key, value) => `
          ${prefix}-${key} {
            flex: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
