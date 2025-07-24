import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}text`;
  const customPrefix = `${globalPrefix}text-size`;

  const { fontSize = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(fontSize, (key, value) => {
      if (value === "custom_value") {
        return `
            ${customPrefix}${key} {
              font-size: ${value};
            }
          `;
      }
      return `
          ${prefix}-${key} {
            font-size: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
