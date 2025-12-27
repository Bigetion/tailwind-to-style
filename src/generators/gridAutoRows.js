import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}auto-rows`;

  const { gridAutoRows = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      gridAutoRows,
      (key, value) => `
          ${prefix}-${key} {
            grid-auto-rows: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
