import { generateCssString } from "../utils/index.js";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}rounded`;
  const { borderRadius = {} } = theme;

  // DRY: Border radius direction configurations
  const borderRadiusDirections = [
    { suffix: "", properties: ["border-radius"] },
    { suffix: "-s", properties: ["border-start-start-radius", "border-end-start-radius"] },
    { suffix: "-e", properties: ["border-start-end-radius", "border-end-end-radius"] },
    { suffix: "-t", properties: ["border-top-left-radius", "border-top-right-radius"] },
    { suffix: "-r", properties: ["border-top-right-radius", "border-bottom-right-radius"] },
    { suffix: "-b", properties: ["border-bottom-right-radius", "border-bottom-left-radius"] },
    { suffix: "-l", properties: ["border-top-left-radius", "border-bottom-left-radius"] },
    { suffix: "-ss", properties: ["border-start-start-radius"] },
    { suffix: "-se", properties: ["border-start-end-radius"] },
    { suffix: "-ee", properties: ["border-end-end-radius"] },
    { suffix: "-es", properties: ["border-end-start-radius"] },
    { suffix: "-tl", properties: ["border-top-left-radius"] },
    { suffix: "-tr", properties: ["border-top-right-radius"] },
    { suffix: "-br", properties: ["border-bottom-right-radius"] },
    { suffix: "-bl", properties: ["border-bottom-left-radius"] }
  ];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(borderRadius, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      
      return borderRadiusDirections
        .map(({ suffix, properties }) => {
          const className = `${prefix}${suffix}${key}`;
          const cssProperties = properties
            .map(prop => `            ${prop}: ${value};`)
            .join('\n');
          
          return `
          ${className} {
${cssProperties}
          }`;
        })
        .join('');
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
