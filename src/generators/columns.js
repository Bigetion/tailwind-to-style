import { generateCssString } from "../utils/index.js";

export default function generator(configOptions = {}) {
  const { prefix, theme = {} } = configOptions;

  const { columns = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      columns,
      (key, value) => `
        ${prefix}columns-${key} {
          columns: ${value};
        }
      `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
