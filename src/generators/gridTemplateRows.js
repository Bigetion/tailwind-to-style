import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  let prefix = `${globalPrefix}grid-rows`;

  const { gridTemplateRows = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    let cssString = getCssByOptions(
      gridTemplateRows,
      (key, value) => `
          ${prefix}-${key} {
            grid-template-rows: ${
              isNaN(value) ? value : `repeat(${value}, minmax(0, 1fr));`
            };
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
