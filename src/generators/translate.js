import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {}, vars = {} } = configOptions;

  const { translate = {} } = theme;

  Object.entries(translate).forEach(([key, value]) => {
    translate[`-${key}`] = `-${value}`.replace("--", "-");
  });

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(translate, (keyTmp, value) => {
      let prefix = `${globalPrefix}translate`;
      let key = keyTmp;
      if (`${key}`.indexOf("-") >= 0) {
        key = key.split("-").join("");
        prefix = `${globalPrefix}-translate`;
      }
      return `
          ${prefix}-x-${key} {
            --transform-translate-x: ${value};
            ${vars.transform}
          }
          ${prefix}-y-${key} {
            --transform-translate-y: ${value};
            ${vars.transform}
          }
        `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
