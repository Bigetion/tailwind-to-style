import { generateCssString } from "../utils/index.js";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}content`;

  const { content = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      content,
      (key, value) => `
          ${prefix}-${key} {
            content: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
