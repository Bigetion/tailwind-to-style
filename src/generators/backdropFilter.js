import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix, vars = {} } = configOptions;

  const responsiveCssString = generateCssString(() => {
    const cssString = `
      ${prefix}backdrop-filter {
        ${vars.backdropFilter}
      }
      ${prefix}backdrop-filter-none {
        backdrop-filter: none;
      }
    `;
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
