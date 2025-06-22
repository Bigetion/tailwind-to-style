import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  let prefix = `${globalPrefix}auto-cols`;

  const { gridAutoColumns = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      gridAutoColumns,
      (key, value) => `
          ${prefix}-${key} {
            grid-auto-columns: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
