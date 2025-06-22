import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  let prefix = `${globalPrefix}grid-cols`;

  const { gridTemplateColumns = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    let cssString = getCssByOptions(
      gridTemplateColumns,
      (key, value) => `
          ${prefix}-${key} {
            grid-template-columns: ${
              isNaN(value) ? value : `repeat(${value}, minmax(0, 1fr))`
            };
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
