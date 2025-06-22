import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}grow`;

  const { flexGrow = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      flexGrow,
      (key, value) => `
          ${key.toLowerCase() === "default" ? prefix : `${prefix}-${key}`} {
            flex-grow: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
