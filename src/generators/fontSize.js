import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}text`;

  const { fontSize = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      fontSize,
      (key, value) => `
          ${prefix}-${key} {
            font-size: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
