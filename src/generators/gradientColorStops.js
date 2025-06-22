import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix, theme = {} } = configOptions;

  const { gradientColorStops = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByColors }) => {
    const cssString = getCssByColors(
      gradientColorStops,
      (key, value, rgbValue) => {
        let rgbFromPropertyValue =
          "--gradient-color-stops: var(--gradient-from-color),var(--gradient-to-color,rgba(255,255,255,0));";
        let rgbViaPropertyValue =
          "--gradient-color-stops: var(--gradient-from-color),var(--gradient-via-color),var(--gradient-to-color,rgba(255,255,255,0));";
        let rgbToPropertyValue =
          "--gradient-color-stops: var(--gradient-from-color),var(--gradient-to-color,rgba(255,255,255,0));";
        if (rgbValue) {
          rgbFromPropertyValue = `--gradient-color-stops: var(--gradient-from-color),var(--gradient-to-color,rgba(${rgbValue},0));`;
          rgbViaPropertyValue = `--gradient-color-stops: var(--gradient-from-color),var(--gradient-via-color),var(--gradient-to-color,rgba(${rgbValue},0));`;
          rgbToPropertyValue = `--gradient-color-stops: var(--gradient-from-color),var(--gradient-to-color,rgba(${rgbValue},0));`;
        }
        return `
            ${prefix}from-${key} {
              --gradient-from-color: ${value};${rgbFromPropertyValue}
            }
            ${prefix}via-${key} {
              --gradient-via-color: ${value};${rgbViaPropertyValue}
            }
            ${prefix}to-${key} {
              --gradient-to-color: ${value};${rgbToPropertyValue}
            }
          `;
      }
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
