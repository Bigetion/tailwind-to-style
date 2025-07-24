import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}shadow`;
  const customPrefix = `${globalPrefix}box-shadow`;

  const { boxShadowColor, boxShadow = {} } = theme;

  const responsiveCssString = generateCssString(
    ({ getCssByOptions, getCssByColors }) => {
      let cssString = getCssByOptions(boxShadow, (keyTmp, value) => {
        const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
        const valueSplit = value.split(" ");
        if (value === "custom_value") {
          return `
            ${customPrefix}${key} {
              box-shadow: ${value};
            }
          `;
        }
        return `
          ${prefix}${key} {
            --shadow: ${value};
            --shadow-colored: ${valueSplit
              .slice(0, 4)
              .join(" ")} var(--shadow-color);
            box-shadow: var(--ring-offset-shadow, 0 0 #0000),var(--ring-shadow, 0 0 #0000),var(--shadow);
          }
        `;
      });
      cssString += getCssByColors(boxShadowColor, (...colorArgs) => {
        const key = colorArgs[0];
        const rgbValue = colorArgs[2];
        let str = "";
        if (rgbValue) {
          str += `
            ${prefix}-${key} {
              --shadow-color: rgba(${rgbValue}, 0.5) !important;
              --shadow: var(--shadow-colored);
            }
          `;
        }
        return str;
      });
      return cssString;
    },
    configOptions
  );

  return responsiveCssString;
}
