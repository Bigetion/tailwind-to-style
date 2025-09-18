import { generateCssString } from "../utils/index.js";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}border`;
  const customPrefix = `${globalPrefix}border-width`;
  const { borderWidth = {} } = theme;

  // DRY: Border width direction configurations
  const borderDirections = [
    {
      suffix: "",
      properties: {
        "border-style": "solid",
        "border-top-width": "${value}",
        "border-bottom-width": "${value}",
        "border-left-width": "${value}",
        "border-right-width": "${value}"
      }
    },
    {
      suffix: "-x",
      properties: {
        "border-left-width": "${value}",
        "border-right-width": "${value}"
      }
    },
    {
      suffix: "-y", 
      properties: {
        "border-top-width": "${value}",
        "border-bottom-width": "${value}"
      }
    },
    {
      suffix: "-s",
      properties: {
        "border-inline-start-width": "${value}"
      }
    },
    {
      suffix: "-e",
      properties: {
        "border-inline-end-width": "${value}"
      }
    },
    {
      suffix: "-t",
      properties: {
        "border-top-width": "${value}"
      }
    },
    {
      suffix: "-r",
      properties: {
        "border-right-width": "${value}"
      }
    },
    {
      suffix: "-b",
      properties: {
        "border-bottom-width": "${value}"
      }
    },
    {
      suffix: "-l",
      properties: {
        "border-left-width": "${value}"
      }
    }
  ];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(borderWidth, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";

      // Handle custom_value case
      if (value === "custom_value") {
        return `
          ${customPrefix}${key} {
            border-width: ${value};
          }
        `;
      }

      // Generate all directional classes
      return borderDirections
        .map(({ suffix, properties }) => {
          const className = `${prefix}${suffix}${key}`;
          const cssProps = Object.entries(properties)
            .map(([prop, val]) => `          ${prop}: ${val.replace('${value}', value)};`)
            .join('\n');
          
          return `
        ${className} {
${cssProps}
        }`;
        })
        .join('');
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
