import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}row-start`;

  const { gridRowStart = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      gridRowStart,
      (key, value) => `
          ${prefix}-${key} {
            grid-row-start: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
