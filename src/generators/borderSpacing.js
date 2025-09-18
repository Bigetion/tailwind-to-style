import { generateCssString } from "../utils/index.js";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}border-spacing`;
  const { borderSpacing = {} } = theme;

  // DRY: Border spacing axis configurations
  const spacingAxes = [
    { 
      suffix: "", 
      properties: { "border-spacing": "${value}" }
    },
    { 
      suffix: "-x", 
      properties: { 
        "--border-spacing-x": "${value}",
        "border-spacing": "var(--border-spacing-x) var(--border-spacing-y, 0)"
      }
    },
    { 
      suffix: "-y", 
      properties: { 
        "--border-spacing-y": "${value}",
        "border-spacing": "var(--border-spacing-x, 0) var(--border-spacing-y)"
      }
    }
  ];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(borderSpacing, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      
      return spacingAxes
        .map(({ suffix, properties }) => {
          const className = `${prefix}${suffix}${key}`;
          const cssProps = Object.entries(properties)
            .map(([prop, val]) => `            ${prop}: ${val.replace('${value}', value)};`)
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
